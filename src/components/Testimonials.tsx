import React, { useState, useEffect } from 'react';
import { QuoteIcon, AuthorIcon1, AuthorIcon2, AuthorIcon3 } from './icons/InfoIcons';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import Floating3DIcon from './Floating3DIcon';
import { testimonialsApi } from '../lib/api/testimonials';
import { Testimonial } from '../lib/supabase';
import { PLACEHOLDER_IMAGES, handleImageError } from '../utils/imageFallback';

const authorIcons = [AuthorIcon1, AuthorIcon2, AuthorIcon3];
const bgColors = ["bg-rose-200", "bg-amber-200", "bg-cyan-200"];

const Testimonials: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await testimonialsApi.getPublished();
        setTestimonials(data);
      } catch (error) {
        console.error('Failed to fetch testimonials:', error);
        setError('Gagal memuat testimonial. Silakan refresh halaman.');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <section id="testimonials" className="bg-white py-32 relative overflow-hidden" style={{ minHeight: '2000px' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat testimonial...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="testimonials" className="bg-white py-32 relative overflow-hidden" style={{ minHeight: '2000px' }}>
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-6 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800"
          >
            Refresh Halaman
          </button>
        </div>
      </section>
    );
  }

  // Show message if no testimonials
  if (testimonials.length === 0) {
    return (
      <section id="testimonials" className="bg-white py-32 relative overflow-hidden" style={{ minHeight: '2000px' }}>
        <div className="text-center">
          <div className="text-gray-400 text-xl mb-4">📝</div>
          <p className="text-gray-600">Belum ada testimonial yang dipublikasikan.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="bg-white py-16 md:py-32 relative overflow-hidden min-h-[1000px] md:min-h-[2000px]" ref={ref as React.RefObject<HTMLElement>}>
      <Floating3DIcon position="center" delay={200} iconType="alt" />
      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-16 xl:px-24 relative z-10">
        <div className="text-center mb-12 md:mb-24 transition-all duration-600 ease-out opacity-100 translate-y-0">
          <h2 className="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight">Apa Kata Rekan Kerja Saya</h2>
          <p className="text-[10px] md:text-sm text-gray-400 mt-1 md:mt-2">({testimonials.length} testimonial dimuat)</p>
        </div>
        <div className="relative max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => {
            const AuthorIcon = authorIcons[index % authorIcons.length];
            const bgColor = bgColors[index % bgColors.length];
            
            return (
              <div 
                key={testimonial.id} 
                className={`sticky flex flex-col md:flex-row bg-white border-2 border-gray-100 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden mb-6 md:mb-8 transition-all duration-600 ease-out hover:shadow-3xl hover:scale-[1.02] cursor-pointer opacity-100 translate-y-0`}
                style={{ 
                  top: `${80 + index * 20}px`,
                  transitionDelay: `${index * 100}ms`,
                  height: 'auto',
                  minHeight: '300px',
                  zIndex: testimonials.length - index
                }}
              >
                <div className="w-full md:w-1/2 p-5 md:p-8 lg:p-10 xl:p-12 flex flex-col justify-center">
                  <QuoteIcon className="w-10 h-10 md:w-16 md:h-16 text-gray-200 mb-4 md:mb-6"/>
                  <h3 className="font-bold text-sm md:text-lg lg:text-xl mb-2 md:mb-3 leading-tight">{testimonial.name} - {testimonial.position}</h3>
                  <p className="text-gray-600 text-[11px] md:text-sm mb-4 md:mb-6 flex-grow leading-relaxed">{testimonial.message}</p>
                  <div className="flex items-center gap-3 md:gap-5 mt-auto">
                    <div className="w-10 h-10 md:w-14 md:h-14 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                       {React.createElement(AuthorIcon, { className: "w-5 h-5 md:w-7 md:h-7 text-gray-700" })}
                    </div>
                    <div>
                      <p className="font-semibold text-xs md:text-base">{testimonial.name}</p>
                      <p className="text-gray-500 text-[10px] md:text-sm">{testimonial.position} - {testimonial.company}</p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 overflow-hidden h-48 md:h-auto">
                  <div className={`p-4 md:p-6 h-full ${bgColor} flex items-center justify-center`}>
                    <img 
                      src={testimonial.image || PLACEHOLDER_IMAGES.testimonial} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover rounded-xl md:rounded-2xl transition-transform duration-300 ease-out group-hover:scale-105"
                      onError={(e) => handleImageError(e, 'testimonial')}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-8 md:mt-16 pt-6 md:pt-8 transition-all duration-600 ease-out opacity-100 translate-y-0">
            <a href="#" className="inline-block bg-gray-200 text-gray-800 text-xs md:text-base font-semibold px-5 py-2.5 md:px-8 md:py-4 rounded-full hover:bg-gray-300 hover:shadow-lg transition-all duration-300 ease-out hover:scale-110 active:scale-95">
                Baca di LinkedIn
            </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;