import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { X, ArrowLeft, GitCompare, Zap, Fuel, Gauge, Settings, Shield, Award } from 'lucide-react';

export default function ComparePage() {
  const [searchParams] = useSearchParams();
  const { cars, toggleCompare } = useApp();
  
  const ids = searchParams.get('ids')?.split(',').map(Number) || [];
  const compareCars = ids.map(id => cars.find(c => c.id === id)).filter(Boolean);

  const formatPrice = (p) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(p);

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-12">
          <div>
            <Link to="/cars" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-condensed text-xs tracking-widest uppercase transition-colors mb-4">
              <ArrowLeft size={14} /> Back to Inventory
            </Link>
            <h1 className="section-title text-gray-900 font-light">
              Compare <span className="text-felix-red italic">Vehicles</span>
            </h1>
          </div>
          <div className="bg-gray-50 border border-gray-200 px-6 py-4 flex items-center gap-4">
            <GitCompare size={20} className="text-felix-red" />
            <div>
              <p className="font-condensed text-xs text-gray-400 tracking-widest uppercase">Comparison Mode</p>
              <p className="font-body text-sm text-gray-900 font-500">{compareCars.length} vehicles selected</p>
            </div>
          </div>
        </div>

        {compareCars.length === 0 ? (
          <div className="py-24 text-center border-2 border-dashed border-gray-100">
            <h3 className="font-display text-2xl font-300 text-gray-400 mb-6">No vehicles selected for comparison</h3>
            <Link to="/cars" className="btn-primary">Browse Vehicles</Link>
          </div>
        ) : (
          <div className="overflow-x-auto pb-8">
            <div className="min-w-[800px]">
              <div className="grid grid-cols-4 border-b border-gray-200 pb-8">
                <div className="col-span-1" />
                {compareCars.map(car => (
                  <div key={car.id} className="px-4 relative group">
                    <button 
                      onClick={() => toggleCompare(car.id)}
                      className="absolute -top-4 right-0 w-8 h-8 bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-felix-red transition-all"
                    >
                      <X size={14} />
                    </button>
                    <img src={car.images[0]} alt={car.model} className="w-full aspect-video object-cover mb-4 border border-gray-100" />
                    <p className="section-label mb-1">{car.brand}</p>
                    <h3 className="font-display text-xl text-gray-900 mb-2">{car.model}</h3>
                    <p className="font-display text-2xl text-felix-red">{formatPrice(car.price)}</p>
                  </div>
                ))}
              </div>

              {[
                { label: 'Basic Info', specs: [
                  { name: 'Year', key: 'year' },
                  { name: 'Category', key: 'category', transform: v => v.replace('-', ' ') },
                  { name: 'Status', key: 'status' },
                  { name: 'Color', key: 'color' },
                ]},
                { label: 'Performance', specs: [
                  { name: 'Engine', key: 'engine' },
                  { name: 'Power', key: 'power' },
                  { name: 'Torque', key: 'torque' },
                  { name: 'Acceleration', key: 'acceleration' },
                  { name: 'Transmission', key: 'transmission' },
                  { name: 'Fuel Type', key: 'fuel' },
                  { name: 'Top Speed', nested: 'specs', key: 'topSpeed' },
                ]},
                { label: 'Details', specs: [
                  { name: 'Mileage', key: 'mileage', transform: v => `${v.toLocaleString()} km` },
                  { name: 'Doors', nested: 'specs', key: 'doors' },
                  { name: 'Seats', nested: 'specs', key: 'seats' },
                  { name: 'Weight', nested: 'specs', key: 'weight' },
                ]},
              ].map(section => (
                <div key={section.label}>
                  <div className="bg-gray-50 border-y border-gray-200 px-6 py-3">
                    <h4 className="font-condensed text-xs text-gray-400 tracking-[0.2em] uppercase font-600">{section.label}</h4>
                  </div>
                  {section.specs.map((spec, i) => (
                    <div key={spec.name} className={`grid grid-cols-4 px-6 py-4 border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                      <div className="font-condensed text-xs text-gray-400 tracking-wider uppercase">{spec.name}</div>
                      {compareCars.map(car => {
                        let val = spec.nested ? car[spec.nested][spec.key] : car[spec.key];
                        if (spec.transform) val = spec.transform(val);
                        return (
                          <div key={car.id} className="px-4 font-body text-sm text-gray-900 font-500">
                            {val}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              ))}

              <div className="grid grid-cols-4 px-6 py-12">
                <div className="col-span-1" />
                {compareCars.map(car => (
                  <div key={car.id} className="px-4">
                    <Link to={`/cars/${car.id}`} className="btn-primary w-full justify-center text-xs">View Details</Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
