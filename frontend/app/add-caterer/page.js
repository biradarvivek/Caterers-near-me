"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import Link from "next/link";

export default function AddCatererPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    pricePerPlate: "",
    cuisines: "",
    rating: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (formData.location.trim().length < 2) {
      newErrors.location = "Location is required";
    }

    if (!formData.pricePerPlate || Number(formData.pricePerPlate) <= 0) {
      newErrors.pricePerPlate = "Price must be greater than 0";
    }

    if (!formData.cuisines.trim()) {
      newErrors.cuisines = "At least one cuisine is required";
    }

    const rating = Number(formData.rating);

    if (!rating || rating < 1 || rating > 5) {
      newErrors.rating = "Rating must be between 1 and 5";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/caterers`, {
        name: formData.name,
        location: formData.location,
        pricePerPlate: Number(formData.pricePerPlate),
        cuisines: formData.cuisines.split(",").map((item) => item.trim()),
        rating: Number(formData.rating),
      });

      router.push("/caterers");
      router.refresh();

      router.push("/caterers");
    } catch (error) {
      console.error(error);

      alert("Failed to add caterer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center p-6">
      <div className="w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Add Caterer</h1>

          <Link
            href="/caterers"
            className="p-2 rounded-lg hover:bg-stone-800 transition"
          >
            <X size={24} />
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Caterer Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-stone-800 border border-stone-700"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-stone-800 border border-stone-700"
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">{errors.location}</p>
          )}

          <input
            type="number"
            name="pricePerPlate"
            placeholder="Price Per Plate"
            value={formData.pricePerPlate}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-stone-800 border border-stone-700"
          />
          {errors.pricePerPlate && (
            <p className="text-red-500 text-sm mt-1">{errors.pricePerPlate}</p>
          )}

          <input
            type="text"
            name="cuisines"
            placeholder="North Indian, Chinese"
            value={formData.cuisines}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-stone-800 border border-stone-700"
          />
          {errors.cuisines && (
            <p className="text-red-500 text-sm mt-1">{errors.cuisines}</p>
          )}

          <input
            type="number"
            step="0.1"
            min="1"
            max="5"
            name="rating"
            placeholder="Rating (1-5)"
            value={formData.rating}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-stone-800 border border-stone-700"
          />
          {errors.rating && (
            <p className="text-red-500 text-sm mt-1">{errors.rating}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 text-black font-bold py-3 rounded-lg hover:bg-amber-400 transition"
          >
            {loading ? "Adding..." : "Add Caterer"}
          </button>
        </form>
      </div>
    </div>
  );
}
