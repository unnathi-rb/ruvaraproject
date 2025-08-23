import React, { useEffect, useState } from 'react';
import MasonryGrid from '../components/home/MasonryGrid';
import AddImageModal from '../components/home/AddImageModal';
import { ArtItem } from '../types';
import axios from 'axios';
import { io, Socket } from 'socket.io-client';

export default function HomePage() {
  const [artItems, setArtItems] = useState<ArtItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  // Fetch artworks from MongoDB
  const fetchArtworks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/artworks');
      setArtItems(res.data);
    } catch (err) {
      console.error('Error fetching artworks:', err);
    }
  };

  useEffect(() => {
    fetchArtworks();

    // Connect to WebSocket
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    // Listen for new artworks
    newSocket.on('new-artwork', (art: ArtItem) => {
      setArtItems((prev) => [art, ...prev]);
    });

    // Listen for updates (like save/bookmark toggle)
    newSocket.on('update-artwork', (updatedArt: ArtItem) => {
      setArtItems((prev) =>
        prev.map((item) => (item.id === updatedArt.id ? updatedArt : item))
      );
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Toggle save/bookmark
  const handleSave = async (_id: string) => {
    try {
      const res = await axios.patch(`http://localhost:5000/api/artworks/${_id}/save`);
      setArtItems((prev) =>
        prev.map((item) => (item.id === _id ? res.data : item))
      );
    } catch (err) {
      console.error('Error toggling save:', err);
    }
  };

  // Add new artwork
  const handleAddArtwork = async (newItem: ArtItem) => {
    try {
      await axios.post('http://localhost:5000/api/artworks', newItem);
      // No need to update state manually, Socket.IO will handle it
    } catch (err) {
      console.error('Error adding artwork:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-red-50">
      

      <div className="pt-2 pb-16 px-6">
        <MasonryGrid items={artItems} onSave={handleSave} />
      </div>

      <AddImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddArtwork}
      />
    </div>
  );
}
