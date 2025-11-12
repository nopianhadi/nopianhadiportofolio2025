import React, { useEffect, useState } from 'react';
import AdminHeader from './AdminHeader';
import { articlesApi } from '../../lib/api/articles';
import type { Article } from '../../lib/supabase';
import Toast from './Toast';

const ArticlesManagement: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [formData, setFormData] = useState<Partial<Article>>({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    status: 'Draft',
    date: new Date().toISOString().split('T')[0],
    image: '',
    author: 'Nopian Hadi',
    tags: [],
    read_time: ''
  });

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const data = await articlesApi.getAll();
        if (!mounted) return;
        setArticles(data);
      } catch (e) {
        console.error('Failed to load articles', e);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus artikel ini?')) return;
    try {
      await articlesApi.delete(id);
      setArticles(prev => prev.filter(a => a.id !== id));
      setToast({ message: 'Artikel berhasil dihapus', type: 'success' });
    } catch (error) {
      console.error('Delete failed:', error);
      setToast({ message: 'Gagal menghapus artikel', type: 'error' });
    }
  };

  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setFormData(article);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingArticle(null);
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      status: 'Draft',
      date: new Date().toISOString().split('T')[0],
      image: '',
      author: 'Nopian Hadi',
      tags: [],
      read_time: ''
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingArticle) {
        const updated = await articlesApi.update(editingArticle.id, formData as Partial<Article>);
        setArticles(prev => prev.map(a => (a.id === updated.id ? updated : a)));
        setToast({ message: 'Artikel berhasil diupdate', type: 'success' });
      } else {
        const created = await articlesApi.create(formData as Omit<Article, 'id' | 'created_at' | 'updated_at'>);
        setArticles(prev => [created, ...prev]);
        setToast({ message: 'Artikel berhasil ditambahkan', type: 'success' });
      }
      setShowModal(false);
      setEditingArticle(null);
    } catch (error) {
      console.error('Submit failed:', error);
      setToast({ message: 'Gagal menyimpan artikel', type: 'error' });
    }
  };

  const handleTagsChange = (tags: string) => {
    const tagArray = tags.split(',').map(t => t.trim()).filter(t => t);
    setFormData({ ...formData, tags: tagArray });
  };

  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      <AdminHeader 
        title="Kelola Artikel"
        subtitle={`Total: ${articles.length} artikel (${articles.filter(a => a.status === 'Published').length} Published, ${articles.filter(a => a.status === 'Draft').length} Draft)`}
        action={
          <button 
            onClick={handleAdd}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            + Tambah Artikel Baru
          </button>
        }
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="grid grid-cols-1 gap-6">
          {loading ? (
            <div className="col-span-full flex justify-center py-10 text-gray-500">Memuat data...</div>
          ) : articles.map((article) => (
            <div key={article.id} className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1">
              <div className="flex flex-col md:flex-row">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full md:w-64 h-48 object-cover rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none"
                />
                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{article.title}</h3>
                      <p className="text-gray-600 text-sm mb-3 leading-relaxed">{article.excerpt}</p>
                    </div>
                    <span className={`px-3 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap ml-4 ${
                      article.status === 'Published' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {article.status}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span>📁 {article.category}</span>
                      <span>📅 {article.date}</span>
                      <span>⏱️ {article.read_time}</span>
                      <span>✍️ {article.author}</span>
                    </div>
                    <div className="flex space-x-3">
                      <button 
                        onClick={() => handleEdit(article)}
                        className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(article.id)} 
                        className="text-red-600 hover:text-red-700 font-semibold transition-colors"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-100 px-6 py-5 flex justify-between items-center rounded-t-3xl">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingArticle ? 'Edit Artikel' : 'Tambah Artikel Baru'}
              </h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 text-3xl leading-none transition-colors"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Judul Artikel *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt/Ringkasan *</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Ringkasan singkat artikel (1-2 kalimat)"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Konten Artikel *</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={8}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Tulis konten artikel lengkap di sini..."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kategori *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  >
                    <option value="">Pilih Kategori</option>
                    <option value="Tutorial">Tutorial</option>
                    <option value="Tips & Trik">Tips & Trik</option>
                    <option value="Desain">Desain</option>
                    <option value="Pengembangan">Pengembangan</option>
                    <option value="Berita">Berita</option>
                    <option value="Studi Kasus">Studi Kasus</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Published' | 'Draft' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  >
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Penulis *</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Waktu Baca *</label>
                  <input
                    type="text"
                    value={formData.read_time}
                    onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                    placeholder="contoh: 5 menit"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL *</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags (pisahkan dengan koma) *</label>
                <input
                  type="text"
                  value={formData.tags?.join(', ')}
                  onChange={(e) => handleTagsChange(e.target.value)}
                  placeholder="React, JavaScript, Tutorial"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Publikasi *</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
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
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  {editingArticle ? 'Update Artikel' : 'Tambah Artikel'}
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

export default ArticlesManagement;
