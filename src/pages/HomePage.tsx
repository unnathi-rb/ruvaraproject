import React, { useEffect, useState, useContext } from 'react';
import MasonryGrid from '../components/home/MasonryGrid';
import AddImageModal from '../components/home/AddImageModal';
import { ArtItem } from '../types';
import axios from 'axios';
import { io, Socket } from 'socket.io-client';
import { UserContext } from '../context/UserContext';

export default function HomePage() {
  const [artItems, setArtItems] = useState<ArtItem[]>([]);
  const [userArtItems, setUserArtItems] = useState<ArtItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  const userContext = useContext(UserContext);
  const currentUser = userContext?.currentUser;

  // Fetch all artworks
  const fetchArtworks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/artworks');
      setArtItems(res.data);
    } catch (err) {
      console.error('Error fetching artworks:', err);
    }
  };

  // Fetch only current user artworks (for profile count)
  const fetchUserArtworks = async () => {
    if (!currentUser?.id) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/artworks?userId=${currentUser.id}`);
      setUserArtItems(res.data);
    } catch (err) {
      console.error('Error fetching user artworks:', err);
    }
  };
  // Add new artwork
const handleAddArtwork = async (newItem: ArtItem) => {
  if (!currentUser || !currentUser.id) {
    console.error('No current user found. Cannot add artwork.');
    return;
  }
  try {
    await axios.post('http://localhost:5000/api/artworks', {
      ...newItem,
      userId: currentUser.id,  // 👈 now valid, matches ArtItem
    });
    // WebSocket will sync automatically
  } catch (err) {
    console.error('Error adding artwork:', err);
  }
};


  useEffect(() => {
    fetchArtworks();
    fetchUserArtworks();

    // Initialize WebSocket
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    newSocket.on('new-artwork', (art: ArtItem) => {
      setArtItems((prev) => [art, ...prev]);
      if (currentUser && art.userId === currentUser.id) {
        setUserArtItems((prev) => [art, ...prev]);
      }
    });

    newSocket.on('update-artwork', (updatedArt: ArtItem) => {
      setArtItems((prev) =>
        prev.map((item) => (item.id === updatedArt.id ? updatedArt : item))
      );
      if (currentUser && updatedArt.userId === currentUser.id) {
        setUserArtItems((prev) =>
          prev.map((item) => (item.id === updatedArt.id ? updatedArt : item))
        );
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, [currentUser?.id]);

  // Save/bookmark artwork
  const handleSave = async (id: string) => {
    if (!currentUser?.id) return;
    try {
      const res = await axios.patch(`http://localhost:5000/api/artworks/${id}/save`, {
        userId: currentUser.id,
      });
      setArtItems((prev) =>
        prev.map((item) => (item.id === id ? res.data : item))
      );
      // If the saved artwork belongs to current user, update userArtItems too
      if (userArtItems.find((item) => item.id === id)) {
        setUserArtItems((prev) =>
          prev.map((item) => (item.id === id ? res.data : item))
        );
      }
    } catch (err) {
      console.error('Error saving artwork:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-red-50">

      {/* User artwork count */}
      {currentUser && (
        <p className="px-6 text-gray-700 mb-4">
          You have posted <span className="font-semibold">{userArtItems.length}</span> artworks
        </p>
      )}

      {/* Artwork feed */}
      <div className="pt-2 pb-16 px-6">
        <MasonryGrid items={artItems} onSave={handleSave} />
      </div>

      {/* Add Artwork Modal */}
      {currentUser && (
        <AddImageModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          socket={socket}
          userId={currentUser.id}
        />
      )}
    </div>
  );
}
