"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import CatererCard from "../../components/CatererCard";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function CaterersPage() {
  const [caterers, setCaterers] = useState([]);
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("");

  const fetchCaterers = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/caterers`,
        {
          params: {
            search,
            maxPrice,
            sort,
          },
        },
      );

      setCaterers(response.data);
    } catch (error) {
      console.error("Error fetching caterers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchCaterers();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search, maxPrice, sort]);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-200 py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-amber-500/30 selection:text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent pb-2">
            Caterers Near Me
          </h1>
          <p className="text-stone-400 mt-4 text-lg max-w-2xl mx-auto font-medium">
            Discover and book the finest culinary experts for your weddings,
            parties, and exclusive events.
          </p>
        </div>
        <div className="flex justify-end mb-6">
          <Link
            href="/add-caterer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 text-stone-950 font-semibold hover:bg-amber-400 transition-all duration-300 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40"
          >
            <Plus size={18} strokeWidth={2.5} />
            Add Caterer
          </Link>
        </div>

        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 mb-12 shadow-lg shadow-black/50 backdrop-blur-md flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by caterer name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-3.5 rounded-xl border border-stone-700 bg-stone-950 text-stone-100 placeholder-stone-500 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
          />

          <input
            type="number"
            placeholder="Max Price (₹)"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full md:w-48 p-3.5 rounded-xl border border-stone-700 bg-stone-950 text-stone-100 placeholder-stone-500 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
          />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full md:w-56 p-3.5 rounded-xl border border-stone-700 bg-stone-950 text-stone-100 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all appearance-none cursor-pointer"
          >
            <option value="" className="text-stone-400">
              Sort By: Recommended
            </option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-stone-400">
            <div className="w-10 h-10 border-4 border-stone-800 border-t-amber-500 rounded-full animate-spin mb-4"></div>
            <p className="text-lg font-medium tracking-wide animate-pulse">
              Curating caterers...
            </p>
          </div>
        ) : caterers.length === 0 ? (
          <div className="text-center py-20 bg-stone-900/50 rounded-2xl border border-stone-800 border-dashed">
            <p className="text-stone-400 text-xl font-medium mb-2">
              No caterers found
            </p>
            <p className="text-stone-500 text-sm">
              Try adjusting your filters or searching for a different name.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caterers.map((caterer) => (
              <CatererCard key={caterer._id} caterer={caterer} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
