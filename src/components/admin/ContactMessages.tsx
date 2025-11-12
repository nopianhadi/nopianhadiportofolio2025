import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import AdminHeader from './AdminHeader';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'Unread' | 'Read' | 'Replied' | 'Archived';
  created_at: string;
  updated_at: string;
}

const ContactMessages: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: ContactMessage['status']) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      
      setMessages(messages.map(msg => 
        msg.id === id ? { ...msg, status: newStatus } : msg
      ));
      
      if (selectedMessage?.id === id) {
        setSelectedMessage({ ...selectedMessage, status: newStatus });
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('Yakin ingin menghapus pesan ini?')) return;
    
    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setMessages(messages.filter(msg => msg.id !== id));
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const filteredMessages = messages.filter(msg => {
    if (filter === 'all') return true;
    return msg.status.toLowerCase() === filter.toLowerCase();
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Unread': return 'bg-blue-100 text-blue-800';
      case 'Read': return 'bg-yellow-100 text-yellow-800';
      case 'Replied': return 'bg-green-100 text-green-800';
      case 'Archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSubjectLabel = (subject: string) => {
    const labels: { [key: string]: string } = {
      'web-development': 'Web Development',
      'ui-ux-design': 'UI/UX Design',
      'consulting': 'Consulting',
      'other': 'Lainnya'
    };
    return labels[subject] || subject;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const stats = {
    total: messages.length,
    unread: messages.filter(m => m.status === 'Unread').length,
    read: messages.filter(m => m.status === 'Read').length,
    replied: messages.filter(m => m.status === 'Replied').length,
    archived: messages.filter(m => m.status === 'Archived').length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6F6F6]">
        <AdminHeader title="Pesan Kontak" subtitle="Kelola pesan dari form kontak website" />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-500">Loading...</div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      <AdminHeader title="Pesan Kontak" subtitle="Kelola pesan dari form kontak website" />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-sm text-gray-600">Total</div>
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-200">
            <div className="text-sm text-blue-600">Belum Dibaca</div>
            <div className="text-2xl font-bold text-blue-900">{stats.unread}</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg shadow-sm border border-yellow-200">
            <div className="text-sm text-yellow-600">Sudah Dibaca</div>
            <div className="text-2xl font-bold text-yellow-900">{stats.read}</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg shadow-sm border border-green-200">
            <div className="text-sm text-green-600">Dibalas</div>
            <div className="text-2xl font-bold text-green-900">{stats.replied}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-sm text-gray-600">Diarsipkan</div>
            <div className="text-2xl font-bold text-gray-900">{stats.archived}</div>
          </div>
        </div>

        {/* Filter */}
        <div className="flex gap-3 flex-wrap mb-6">
          {['all', 'unread', 'read', 'replied', 'archived'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 ${
                filter === f
                  ? 'bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-900 hover:shadow-md'
              }`}
            >
              {f === 'all' ? '📋 Semua' : f === 'unread' ? '🔵 Belum Dibaca' : f === 'read' ? '🟡 Sudah Dibaca' : f === 'replied' ? '🟢 Dibalas' : '📦 Diarsipkan'}
            </button>
          ))}
        </div>

        {/* Messages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Messages List */}
          <div className="space-y-4">
            {filteredMessages.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center text-gray-500">
                Tidak ada pesan
              </div>
            ) : (
              filteredMessages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => {
                    setSelectedMessage(message);
                    if (message.status === 'Unread') {
                      updateStatus(message.id, 'Read');
                    }
                  }}
                  className={`bg-white p-4 rounded-lg shadow-sm border-2 cursor-pointer transition-all hover:shadow-md ${
                    selectedMessage?.id === message.id
                      ? 'border-gray-900'
                      : 'border-gray-200'
                  } ${message.status === 'Unread' ? 'bg-blue-50' : ''}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{message.name}</h3>
                      <p className="text-sm text-gray-600">{message.email}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(message.status)}`}>
                      {message.status}
                    </span>
                  </div>
                  <div className="mb-2">
                    <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {getSubjectLabel(message.subject)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 line-clamp-2 mb-2">{message.message}</p>
                  <p className="text-xs text-gray-500">{formatDate(message.created_at)}</p>
                </div>
              ))
            )}
          </div>

          {/* Message Detail */}
          <div className="lg:sticky lg:top-24 h-fit">
            {selectedMessage ? (
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedMessage.name}</h2>
                    <a href={`mailto:${selectedMessage.email}`} className="text-blue-600 hover:underline">
                      {selectedMessage.email}
                    </a>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedMessage.status)}`}>
                    {selectedMessage.status}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-gray-600 mb-1">Subjek</div>
                  <div className="font-medium text-gray-900">{getSubjectLabel(selectedMessage.subject)}</div>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-gray-600 mb-1">Pesan</div>
                  <div className="text-gray-900 whitespace-pre-wrap">{selectedMessage.message}</div>
                </div>

                <div className="mb-6 text-sm text-gray-500">
                  <div>Dikirim: {formatDate(selectedMessage.created_at)}</div>
                  {selectedMessage.updated_at !== selectedMessage.created_at && (
                    <div>Diupdate: {formatDate(selectedMessage.updated_at)}</div>
                  )}
                </div>

                {/* Actions */}
                <div className="space-y-4">
                  <div className="text-sm font-bold text-gray-800 mb-3">Ubah Status</div>
                  <div className="grid grid-cols-2 gap-3">
                    {(['Unread', 'Read', 'Replied', 'Archived'] as const).map((status) => (
                      <button
                        key={status}
                        onClick={() => updateStatus(selectedMessage.id, status)}
                        disabled={selectedMessage.status === status}
                        className={`px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                          selectedMessage.status === status
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-2 border-gray-200'
                            : 'bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:from-gray-800 hover:to-gray-700 shadow-md hover:shadow-lg hover:scale-105'
                        }`}
                      >
                        {status === 'Unread' ? '🔵 Unread' : status === 'Read' ? '🟡 Read' : status === 'Replied' ? '🟢 Replied' : '📦 Archived'}
                      </button>
                    ))}
                  </div>

                  <div className="pt-4 border-t-2 border-gray-200 space-y-3">
                    <a
                      href={`mailto:${selectedMessage.email}?subject=Re: ${getSubjectLabel(selectedMessage.subject)}`}
                      className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Balas via Email
                    </a>
                    <button
                      onClick={() => deleteMessage(selectedMessage.id)}
                      className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Hapus Pesan
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center text-gray-500">
                Pilih pesan untuk melihat detail
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactMessages;
