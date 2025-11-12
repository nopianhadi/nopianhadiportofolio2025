import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectsApi } from '../../lib/api/projects';
import { articlesApi } from '../../lib/api/articles';
import { testimonialsApi } from '../../lib/api/testimonials';
import { supabase } from '../../lib/supabase';
import LogoutButton from './LogoutButton';

interface Stats {
  totalProjects: number;
  totalTestimonials: number;
  totalArticles: number;
  totalMessages: number;
  unreadMessages: number;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats>({
    totalProjects: 0,
    totalTestimonials: 0,
    totalArticles: 0,
    totalMessages: 0,
    unreadMessages: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // Fetch all data in parallel
        const [projects, articles, testimonials, messagesData, unreadData] = await Promise.all([
          projectsApi.getAll(),
          articlesApi.getAll(),
          testimonialsApi.getAll(),
          supabase.from('contact_messages').select('id', { count: 'exact', head: true }),
          supabase.from('contact_messages').select('id', { count: 'exact', head: true }).eq('status', 'Unread')
        ]);

        setStats({
          totalProjects: projects.length,
          totalTestimonials: testimonials.length,
          totalArticles: articles.length,
          totalMessages: messagesData.count || 0,
          unreadMessages: unreadData.count || 0
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.08)] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-sm text-gray-600 mt-1">Kelola konten portfolio Anda</p>
          </div>
          <div className="flex items-center gap-3">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-900 hover:text-gray-900 font-medium rounded-xl transition-all duration-200 hover:shadow-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Kembali ke Portfolio
            </Link>
            <LogoutButton />
          </div>
        </div>

        {/* Navigation Menu Bar */}
        <nav className="border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-1 overflow-x-auto">
              <Link
                to="/admin/dashboard"
                className="px-5 py-3 text-sm font-semibold text-gray-900 bg-gradient-to-b from-gray-50 to-gray-100 border-b-3 border-red-500 whitespace-nowrap rounded-t-lg shadow-sm"
              >
                📊 Dashboard
              </Link>
              <Link
                to="/admin/projects"
                className="px-5 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gradient-to-b hover:from-gray-50 hover:to-gray-100 border-b-3 border-transparent hover:border-blue-400 transition-all duration-200 whitespace-nowrap rounded-t-lg"
              >
                🎨 Proyek
              </Link>
              <Link
                to="/admin/testimonials"
                className="px-5 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gradient-to-b hover:from-gray-50 hover:to-gray-100 border-b-3 border-transparent hover:border-green-400 transition-all duration-200 whitespace-nowrap rounded-t-lg"
              >
                ⭐ Testimoni
              </Link>
              <Link
                to="/admin/articles"
                className="px-5 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gradient-to-b hover:from-gray-50 hover:to-gray-100 border-b-3 border-transparent hover:border-purple-400 transition-all duration-200 whitespace-nowrap rounded-t-lg"
              >
                ✍️ Artikel
              </Link>
              <Link
                to="/admin/messages"
                className="px-5 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gradient-to-b hover:from-gray-50 hover:to-gray-100 border-b-3 border-transparent hover:border-orange-400 transition-all duration-200 whitespace-nowrap rounded-t-lg relative"
              >
                📧 Pesan
                {stats.unreadMessages > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg animate-pulse">
                    {stats.unreadMessages}
                  </span>
                )}
              </Link>
              <Link
                to="/admin/settings"
                className="px-5 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gradient-to-b hover:from-gray-50 hover:to-gray-100 border-b-3 border-transparent hover:border-gray-400 transition-all duration-200 whitespace-nowrap rounded-t-lg"
              >
                ⚙️ Pengaturan
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-4 text-gray-600">Memuat statistik...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard title="Total Proyek" value={stats.totalProjects} icon="📁" color="from-blue-500 to-cyan-500" />
              <StatCard title="Testimoni" value={stats.totalTestimonials} icon="💬" color="from-green-500 to-emerald-500" />
              <StatCard title="Artikel" value={stats.totalArticles} icon="📝" color="from-purple-500 to-pink-500" />
              <StatCard 
                title="Pesan Kontak" 
                value={stats.totalMessages} 
                icon="📧" 
                color="from-orange-500 to-red-500" 
                note={stats.unreadMessages > 0 ? `${stats.unreadMessages} belum dibaca` : undefined}
              />
            </div>

            {/* Management Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ManagementCard
                title="Kelola Proyek"
                description="Tambah, edit, atau hapus project portfolio"
                link="/admin/projects"
                icon="🎨"
              />
              <ManagementCard
                title="Kelola Testimoni"
                description="Kelola testimonial dari klien"
                link="/admin/testimonials"
                icon="⭐"
              />
              <ManagementCard
                title="Kelola Artikel"
                description="Buat dan edit artikel blog"
                link="/admin/articles"
                icon="✍️"
              />
              <ManagementCard
                title="Pesan Kontak"
                description="Lihat dan balas pesan dari form kontak"
                link="/admin/messages"
                icon="📧"
                badge={stats.unreadMessages > 0 ? stats.unreadMessages : undefined}
              />
              <ManagementCard
                title="Pengaturan"
                description="Pengaturan profil dan website"
                link="/admin/settings"
                icon="⚙️"
              />
            </div>
          </>
        )}
      </main>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  icon: string;
  color: string;
  note?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, note }) => {
  return (
    <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] p-6 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-4xl font-bold text-gray-900 mt-2">{value}</p>
          {note && <p className="text-xs text-gray-400 mt-1 italic">{note}</p>}
        </div>
        <div className={`bg-gradient-to-br ${color} w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

interface ManagementCardProps {
  title: string;
  description: string;
  link: string;
  icon: string;
  badge?: number;
}

const ManagementCard: React.FC<ManagementCardProps> = ({ title, description, link, icon, badge }) => {
  return (
    <Link 
      to={link} 
      className="group bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] p-8 hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-2 relative border-2 border-transparent hover:border-red-500"
    >
      {badge && badge > 0 && (
        <div className="absolute top-4 right-4 bg-gradient-to-br from-red-500 to-red-600 text-white text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center shadow-lg animate-pulse">
          {badge}
        </div>
      )}
      <div className="flex items-start space-x-5">
        <div className="text-5xl group-hover:scale-125 group-hover:rotate-6 transition-all duration-300">{icon}</div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-500 transition-colors duration-200">{title}</h3>
          <p className="text-gray-600 leading-relaxed mb-4">{description}</p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-semibold rounded-xl group-hover:bg-red-500 transition-all duration-200 group-hover:shadow-lg">
            Kelola Sekarang
            <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AdminDashboard;
