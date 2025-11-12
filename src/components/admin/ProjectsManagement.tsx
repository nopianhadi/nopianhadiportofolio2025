import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import { projectsApi } from '../../lib/api/projects';
import type { Project } from '../../lib/supabase';
import Toast from './Toast';

const ProjectsManagement: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    client: '',
    year: new Date().getFullYear().toString(),
    category: '',
    hero_image: '',
    overview: '',
    challenge: '',
    solution: '',
    results: [],
    technologies: [],
    duration: '',
    role: '',
    images: [],
    video: '',
    live_demo: '',
    source_code: '',
    status: 'Draft',
    testimonial_quote: '',
    testimonial_author: '',
    testimonial_position: ''
  });

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const data = await projectsApi.getAll();
        if (!mounted) return;
        setProjects(data);
      } catch (e) {
        console.error('Failed to load projects', e);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus project ini?')) return;
    try {
      await projectsApi.delete(id);
      setProjects(prev => prev.filter(p => p.id !== id));
      setToast({ message: 'Project berhasil dihapus', type: 'success' });
    } catch (error) {
      console.error('Delete failed:', error);
      setToast({ message: 'Gagal menghapus project', type: 'error' });
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData(project);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      client: '',
      year: new Date().getFullYear().toString(),
      category: '',
      hero_image: '',
      overview: '',
      challenge: '',
      solution: '',
      results: [],
      technologies: [],
      duration: '',
      role: '',
      images: [],
      video: '',
      live_demo: '',
      source_code: '',
      status: 'Draft',
      testimonial_quote: '',
      testimonial_author: '',
      testimonial_position: ''
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProject) {
        const updated = await projectsApi.update(editingProject.id, formData as Partial<Project>);
        setProjects(prev => prev.map(p => (p.id === updated.id ? updated : p)));
        setToast({ message: 'Project berhasil diupdate', type: 'success' });
      } else {
        const created = await projectsApi.create(formData as Omit<Project, 'id' | 'created_at' | 'updated_at'>);
        setProjects(prev => [created, ...prev]);
        setToast({ message: 'Project berhasil ditambahkan', type: 'success' });
      }
      setShowModal(false);
      setEditingProject(null);
    } catch (error) {
      console.error('Submit failed:', error);
      setToast({ message: 'Gagal menyimpan project', type: 'error' });
    }
  };

  const handleTechChange = (tech: string) => {
    const techs = tech.split(',').map(t => t.trim()).filter(t => t);
    setFormData({ ...formData, technologies: techs });
  };

  const handleResultsChange = (results: string) => {
    const resultArray = results.split('\n').map(r => r.trim()).filter(r => r);
    setFormData({ ...formData, results: resultArray });
  };

  const handleImagesChange = (images: string) => {
    const imageArray = images.split('\n').map(i => i.trim()).filter(i => i);
    setFormData({ ...formData, images: imageArray });
  };

  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      <AdminHeader 
        title="Kelola Project"
        subtitle={`Total: ${projects.length} project (${projects.filter(p => p.status === 'Published').length} Published, ${projects.filter(p => p.status === 'Draft').length} Draft)`}
        action={
          <button 
            onClick={handleAdd}
            className="bg-linear-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            + Tambah Project Baru
          </button>
        }
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Proyek</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Klien</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Kategori</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Tahun</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center text-gray-500 py-8">Memuat data...</td>
                  </tr>
                ) : projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img src={project.hero_image} alt={project.title} className="w-14 h-14 rounded-2xl object-cover mr-4 shadow-sm" />
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{project.title}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{project.role}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">{project.client}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{project.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1.5 text-xs font-semibold rounded-full ${
                        project.status === 'Published' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{project.year}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-3">
                      <button 
                        onClick={() => handleEdit(project)}
                        className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(project.id)} 
                        className="text-red-600 hover:text-red-700 font-semibold transition-colors"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-100 px-6 py-5 flex justify-between items-center rounded-t-3xl">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingProject ? 'Edit Project' : 'Tambah Project Baru'}
              </h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 text-3xl leading-none transition-colors"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Basic Info */}
              <div className="pb-4 border-b">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Informasi Dasar</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Judul Project *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Klien *</label>
                      <input
                        type="text"
                        value={formData.client}
                        onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tahun *</label>
                      <input
                        type="text"
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        placeholder="2024"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Kategori *</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="">Pilih Kategori</option>
                        <option value="Web Application">Web Application</option>
                        <option value="Web Portal">Web Portal</option>
                        <option value="Nonprofit Website">Nonprofit Website</option>
                        <option value="Portfolio Website">Portfolio Website</option>
                        <option value="Company Profile">Company Profile</option>
                        <option value="Company Website">Company Website</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Durasi *</label>
                      <input
                        type="text"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        placeholder="4 bulan"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Peran *</label>
                      <input
                        type="text"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        placeholder="Lead Developer"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Published' | 'Draft' })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="Draft">Draft</option>
                      <option value="Published">Published</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="pb-4 border-b">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Konten Project</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ringkasan *</label>
                    <textarea
                      value={formData.overview}
                      onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                      rows={3}
                      placeholder="Deskripsi singkat tentang project..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tantangan *</label>
                    <textarea
                      value={formData.challenge}
                      onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                      rows={3}
                      placeholder="Tantangan yang dihadapi..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Solusi *</label>
                    <textarea
                      value={formData.solution}
                      onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                      rows={3}
                      placeholder="Solusi yang diterapkan..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hasil (satu per baris) *</label>
                    <textarea
                      value={formData.results?.join('\n')}
                      onChange={(e) => handleResultsChange(e.target.value)}
                      rows={4}
                      placeholder="500K+ pengguna aktif&#10;99.9% uptime&#10;4.8/5 rating"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Technical */}
              <div className="pb-4 border-b">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Detail Teknis</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Teknologi (pisahkan dengan koma) *</label>
                    <input
                      type="text"
                      value={formData.technologies?.join(', ')}
                      onChange={(e) => handleTechChange(e.target.value)}
                      placeholder="React, TypeScript, Tailwind CSS, AWS"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">URL Gambar Hero *</label>
                    <input
                      type="url"
                      value={formData.hero_image}
                      onChange={(e) => setFormData({ ...formData, hero_image: e.target.value })}
                      placeholder="https://example.com/hero.jpg"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gambar Galeri (satu URL per baris)</label>
                    <textarea
                      value={formData.images?.join('\n')}
                      onChange={(e) => handleImagesChange(e.target.value)}
                      rows={3}
                      placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Links */}
              <div className="pb-4 border-b">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Tautan (Opsional)</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">URL Demo Langsung</label>
                    <input
                      type="url"
                      value={formData.live_demo}
                      onChange={(e) => setFormData({ ...formData, live_demo: e.target.value })}
                      placeholder="https://demo.example.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">URL Source Code</label>
                    <input
                      type="url"
                      value={formData.source_code}
                      onChange={(e) => setFormData({ ...formData, source_code: e.target.value })}
                      placeholder="https://github.com/username/repo"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">URL Video (YouTube embed)</label>
                    <input
                      type="url"
                      value={formData.video}
                      onChange={(e) => setFormData({ ...formData, video: e.target.value })}
                      placeholder="https://www.youtube.com/embed/..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Testimonial */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Testimoni (Opsional)</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Kutipan</label>
                    <textarea
                      value={formData.testimonial_quote}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        testimonial_quote: e.target.value 
                      })}
                      rows={2}
                      placeholder="Testimoni klien..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Penulis</label>
                      <input
                        type="text"
                        value={formData.testimonial_author}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          testimonial_author: e.target.value 
                        })}
                        placeholder="John Doe"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Posisi</label>
                      <input
                        type="text"
                        value={formData.testimonial_position}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          testimonial_position: e.target.value 
                        })}
                        placeholder="CEO, Perusahaan"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-8 py-3 border-2 border-gray-200 rounded-full text-gray-700 font-semibold hover:bg-gray-50 transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-linear-to-r from-red-500 to-orange-500 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  {editingProject ? 'Update Project' : 'Tambah Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
        
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default ProjectsManagement;

