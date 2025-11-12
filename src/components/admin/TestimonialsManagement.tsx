import React, { useEffect, useState } from 'react';
import AdminHeader from './AdminHeader';
import { testimonialsApi } from '../../lib/api/testimonials';
import type { Testimonial } from '../../lib/supabase';
import Toast from './Toast';

const TestimonialsManagement: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState<Partial<Testimonial>>({
    name: '',
    position: '',
    company: '',
    message: '',
    rating: 5,
    image: '',
    date: new Date().toISOString().split('T')[0],
    status: 'Pending'
  });

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const data = await testimonialsApi.getAll();
        if (!mounted) return;
        setTestimonials(data);
      } catch (e) {
        console.error('Failed to load testimonials', e);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus testimonial ini?')) return;
    try {
      await testimonialsApi.delete(id);
      setTestimonials(prev => prev.filter(t => t.id !== id));
      setToast({ message: 'Testimonial berhasil dihapus', type: 'success' });
    } catch (error) {
      console.error('Delete failed:', error);
      setToast({ message: 'Gagal menghapus testimonial', type: 'error' });
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData(testimonial);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingTestimonial(null);
    setFormData({
      name: '',
      position: '',
      company: '',
      message: '',
      rating: 5,
      image: '',
      date: new Date().toISOString().split('T')[0],
      status: 'Pending'
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingTestimonial) {
        const updated = await testimonialsApi.update(editingTestimonial.id, formData as Partial<Testimonial>);
        setTestimonials(prev => prev.map(t => (t.id === updated.id ? updated : t)));
        setToast({ message: 'Testimonial berhasil diupdate', type: 'success' });
      } else {
        const created = await testimonialsApi.create(formData as Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>);
        setTestimonials(prev => [created, ...prev]);
        setToast({ message: 'Testimonial berhasil ditambahkan', type: 'success' });
      }
      setShowModal(false);
      setEditingTestimonial(null);
    } catch (error) {
      console.error('Submit failed:', error);
      setToast({ message: 'Gagal menyimpan testimonial', type: 'error' });
    }
  };

  const renderStars = (rating: number) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      <AdminHeader 
        title="Kelola Testimonial"
        subtitle={`Total: ${testimonials.length} testimonial (${testimonials.filter(t => t.status === 'Published').length} Published, ${testimonials.filter(t => t.status === 'Pending').length} Pending)`}
        action={
          <button 
            onClick={handleAdd}
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            + Tambah Testimonial Baru
          </button>
        }
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full flex justify-center py-10 text-gray-500">Memuat data...</div>
          ) : testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.position}</p>
                    <p className="text-xs text-gray-400">{testimonial.company}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  testimonial.status === 'Published' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {testimonial.status}
                </span>
              </div>

              <div className="mb-3">
                <div className="text-yellow-400 text-sm mb-2">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-gray-600 text-sm line-clamp-3">{testimonial.message}</p>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-xs text-gray-400">{testimonial.date}</span>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleEdit(testimonial)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(testimonial.id)} 
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">
                {editingTestimonial ? 'Edit Testimonial' : 'Tambah Testimonial Baru'}
              </h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nama *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Posisi *</label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Perusahaan *</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pesan/Testimonial *</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Tulis testimonial dari klien..."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating *</label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                    <option value={4}>⭐⭐⭐⭐☆ (4 Stars)</option>
                    <option value={3}>⭐⭐⭐☆☆ (3 Stars)</option>
                    <option value={2}>⭐⭐☆☆☆ (2 Stars)</option>
                    <option value={1}>⭐☆☆☆☆ (1 Star)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Published' | 'Pending' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="Pending">Pending</option>
                    <option value="Published">Published</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Photo URL *</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal *</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold hover:from-green-700 hover:to-green-800"
                >
                  {editingTestimonial ? 'Update Testimonial' : 'Tambah Testimonial'}
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

export default TestimonialsManagement;
