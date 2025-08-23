import React, { useState } from "react";

interface ProductUploadProps {
  onProductAdded?: () => void; // 👈 optional callback
}

export default function ProductUpload({ onProductAdded }: ProductUploadProps) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
    exportReady: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setForm({
      ...form,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price),
        }),
      });

      if (!res.ok) throw new Error("Failed to upload product");
      const data = await res.json();
      alert("✅ Product uploaded successfully!");
      console.log("Saved:", data);

      // reset form
      setForm({
        name: "",
        description: "",
        price: "",
        category: "",
        imageUrl: "",
        exportReady: false,
      });

      // ✅ trigger callback so parent can refresh product list
      if (onProductAdded) {
        onProductAdded();
      }
    } catch (err) {
      console.error("Error uploading product:", err);
      alert("❌ Error uploading product");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />
      <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" required />
      <input name="category" value={form.category} onChange={handleChange} placeholder="Category" required />
      <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="Image URL" />
      <label>
        <input type="checkbox" name="exportReady" checked={form.exportReady} onChange={handleChange} />
        Export Ready
      </label>
      <button type="submit">Upload Product</button>
    </form>
  );
}
