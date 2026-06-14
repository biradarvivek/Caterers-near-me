import { MapPin, Star, IndianRupee } from "lucide-react";

export default function CatererCard({ caterer }) {
  return (
    <div className="group relative bg-stone-900/80 backdrop-blur-sm border border-stone-800 rounded-2xl p-6 hover:border-amber-500/50 hover:shadow-[0_8px_30px_rgb(245,158,11,0.12)] hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="absolute top-5 right-5 bg-stone-950/80 border border-stone-700 px-2.5 py-1.5 rounded-lg flex items-center gap-1 shadow-sm backdrop-blur-md">
        <Star size={14} className="text-amber-500" fill="currentColor" />
        <span className="text-stone-200 font-bold text-sm tracking-wide">
          {caterer.rating}
        </span>
      </div>

      <h2 className="text-2xl font-bold text-stone-100 group-hover:text-amber-400 transition-colors pr-14 leading-tight">
        {caterer.name}
      </h2>

      <p className="text-stone-400 text-sm mt-2 flex items-center gap-2 font-medium">
        <MapPin size={16} className="text-stone-500" />
        {caterer.location}
      </p>

      <div className="mt-6 mb-6 flex items-center gap-1">
        <IndianRupee size={24} className="text-amber-500" />

        <span className="text-3xl font-extrabold text-amber-500">
          {caterer.pricePerPlate}
        </span>

        <span className="text-stone-500 text-sm font-medium tracking-wide">
          / plate
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mt-auto pt-5 border-t border-stone-800/80">
        {caterer.cuisines.map((cuisine) => (
          <span
            key={cuisine}
            className="px-3 py-1 rounded-full text-xs font-semibold bg-stone-800/50 text-stone-300 border border-stone-700/50 group-hover:border-stone-600 transition-colors"
          >
            {cuisine}
          </span>
        ))}
      </div>
    </div>
  );
}
