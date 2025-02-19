import React, { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { BsImage } from 'react-icons/bs';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://d006-114-10-45-252.ngrok-free.app',
  headers: {
    'Accept': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  }
});

const SetupMenuPage: React.FC = () => {
  const navigate = useNavigate();
  const [menuData, setMenuData] = useState({
    name: '',
    description: '',
    price: '',
    image: null as File | null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('name', menuData.name);
      formData.append('description', menuData.description);
      formData.append('price', menuData.price);
      formData.append('seller_id', '1');
      if (menuData.image) {
        formData.append('image', menuData.image);
      }

      await api.post('/api/menu', formData, {
        headers: {  
          'Content-Type': 'multipart/form-data'
        }
      });

      navigate('/menu');
    } catch (error) {
      setError('Gagal menyimpan menu. Silakan coba lagi.');
      console.error('Error saving menu:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 1024 * 1024) { // Max 1MB
      setMenuData(prev => ({ ...prev, image: file }));
    } else {
      setError('Ukuran gambar maksimal 1MB');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 overflow-x-hidden scrollbar-hide">
      {/* Header */}
      <div className="bg-white p-4 flex items-center space-x-4 shadow-sm">
        <button 
          onClick={() => navigate(-1)}
          className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
        >
          <IoIosArrowBack className="text-2xl text-gray-700" />
        </button>
        <h1 className="text-lg font-medium">Add new item</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-4 space-y-4 max-w-xl mx-auto overflow-y-auto scrollbar-hide">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">Nama Menu *</label>
          <input 
            type="text" 
            value={menuData.name}
            onChange={(e) => setMenuData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Masukkan nama menu"
            className="w-full p-3.5 rounded-xl border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
            required
          />
        </div>

        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center space-y-2 hover:border-blue-500 transition-colors cursor-pointer">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <BsImage className="text-3xl text-gray-400" />
            </div>
            <p className="text-sm text-gray-500">Upload foto menu (max 1MB)</p>
          </label>
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">Deskripsi Menu</label>
          <textarea 
            value={menuData.description}
            onChange={(e) => setMenuData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Masukkan deskripsi menu"
            className="w-full p-3.5 rounded-xl border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm min-h-[120px]"
          />
        </div>

        {/* Price */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">Harga Menu *</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">Rp</span>
            <input 
              type="text" 
              value={menuData.price}
              onChange={(e) => setMenuData(prev => ({ ...prev, price: e.target.value }))}
              placeholder="Masukkan harga menu"
              className="w-full p-3.5 pl-10 rounded-xl border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        
        <button 
          type="submit" 
          className="w-full bg-[#4CD964] text-white py-3.5 rounded-xl font-medium mt-6 hover:bg-[#44c359] transition-colors shadow-sm disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Menyimpan...' : 'Simpan Menu'}
        </button>
      </form>
    </div>
  );
};

export default SetupMenuPage;
