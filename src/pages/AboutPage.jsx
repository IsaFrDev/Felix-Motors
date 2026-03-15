import { Link } from 'react-router-dom';
import { Target, Shield, Globe } from 'lucide-react';

const stats = [
  { label: 'Vehicles Sold', value: '450+' },
  { label: 'Happy Clients', value: '380+' },
  { label: 'Luxury Brands', value: '12' },
  { label: 'Years Experience', value: '6' },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-gray-50 border-b border-gray-200 overflow-hidden">
        <div className="absolute inset-0 grid-lines" />
        <div className="relative max-w-7xl mx-auto px-6">
          <p className="section-label">Est. 2018</p>
          <h1 className="section-title text-gray-900 mb-6">
            Everything for the<br />
            <span className="text-felix-red italic">Extraordinary</span>
          </h1>
          <p className="font-body text-gray-500 max-w-2xl text-lg leading-relaxed">
            Felix Motors is Uzbekistan's premier destination for curated luxury vehicles. Founded on the principle of uncompromising quality, we connect the world's most discerning drivers with automotive masterpieces.
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-label">Our Philosophy</p>
              <h2 className="font-display text-4xl font-300 text-gray-900 mb-8">More Than a Dealership. <span className="text-felix-red italic">A Lifestyle.</span></h2>
              <div className="space-y-6">
                <p className="font-body text-gray-500 leading-relaxed">
                  We believe that the journey is just as important as the destination. Choosing a luxury vehicle is an intimate decision—one that reflects your ambitions, your style, and your appreciation for engineering excellence.
                </p>
                <p className="font-body text-gray-500 leading-relaxed">
                  At Felix Motors, we don't just sell cars; we curate experiences. From the moment you step into our showroom to the miles you drive across the country, we are your partners in the pursuit of automotive perfection.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800" alt="Detailing" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-[4/5] bg-gray-100 overflow-hidden mt-8">
                <img src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800" alt="Showroom" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Target, title: 'Uncompromising Quality', desc: 'Every car in our inventory is hand-selected and rigorously inspected to ensure it meets our elite standards.' },
              { icon: Shield, title: 'Absolute Integrity', desc: 'Transparency is our foundation. We provide full provenance and service history for every vehicle we offer.' },
              { icon: Globe, title: 'Global Sourcing', desc: 'Our extensive international network allows us to locate and deliver specific models from anywhere in the world.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center group">
                <div className="w-16 h-16 border border-felix-red/30 flex items-center justify-center mx-auto mb-6 group-hover:bg-felix-red/10 transition-colors duration-300">
                  <Icon size={24} className="text-felix-red" />
                </div>
                <h3 className="font-condensed font-600 text-gray-900 tracking-wide text-lg mb-4">{title}</h3>
                <p className="font-body text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white relative">
        <div className="absolute inset-0 grid-lines opacity-30" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map(s => (
              <div key={s.label} className="text-center">
                <p className="stat-number mb-2">{s.value}</p>
                <div className="w-8 h-px bg-felix-red mx-auto mb-3" />
                <p className="font-condensed text-xs text-gray-400 tracking-[0.2em] uppercase">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team CTA */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="section-label">The Team</p>
          <h2 className="font-display text-4xl md:text-5xl font-300 mb-8 italic">Meet the Experts Who Value Your Drive</h2>
          <p className="font-body text-white/60 mb-10 leading-relaxed">
            Our consultants are more than just sales representatives; they are automotive enthusiasts with deep knowledge and a passion for finding the right car for you.
          </p>
          <Link to="/contact" className="btn-primary">Connect with an Expert</Link>
        </div>
      </section>
    </div>
  );
}
