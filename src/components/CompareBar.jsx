import React from 'react';
import { Link } from 'react-router-dom';
import { X, GitCompare } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function CompareBar() {
  const { compareList, toggleCompare, cars } = useApp();

  if (compareList.length === 0) return null;

  const compareCars = compareList.map(id => cars.find(c => c.id === id)).filter(Boolean);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <GitCompare size={16} className="text-felix-red" />
          <span className="font-condensed text-sm text-gray-500 tracking-widest uppercase">Compare</span>
        </div>

        <div className="flex items-center gap-4 flex-1 justify-center">
          {compareCars.map(car => (
            <div key={car.id} className="flex items-center gap-2 bg-gray-50 px-3 py-2 border border-gray-200">
              <img src={car.images[0]} alt={car.model} className="w-10 h-7 object-cover" />
              <div>
                <p className="font-condensed text-xs text-gray-900 leading-none">{car.brand}</p>
                <p className="font-body text-xs text-gray-500">{car.model}</p>
              </div>
              <button
                onClick={() => toggleCompare(car.id)}
                className="text-gray-400 hover:text-felix-red transition-colors ml-1"
              >
                <X size={12} />
              </button>
            </div>
          ))}

          {compareList.length < 3 && (
            <div className="flex items-center gap-2 border border-dashed border-gray-300 px-6 py-2">
              <span className="font-body text-xs text-gray-400">+ Add car</span>
            </div>
          )}
        </div>

        <Link
          to={`/compare?ids=${compareList.join(',')}`}
          className={`btn-primary text-xs py-2 px-6 ${compareList.length < 2 ? 'opacity-50 pointer-events-none' : ''}`}
        >
          Compare Now
        </Link>
      </div>
    </div>
  );
}
