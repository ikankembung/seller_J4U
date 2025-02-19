import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { BsArrowUp, BsArrowDown } from 'react-icons/bs';
import burgerImg from './assets/burger.jpg';

interface SalesData {
  id: string;
  name: string;
  image: string;
  totalSold: number;
  revenue: number;
  trend: 'up' | 'down' | 'stable';
  percentage: number;
}

const AnalisisPage: React.FC = () => {
  const navigate = useNavigate();
  
  const salesData: SalesData[] = [
    {
      id: '1',
      name: 'Burger Burgar',
      image: burgerImg,
      totalSold: 150,
      revenue: 3000000,
      trend: 'up',
      percentage: 15
    },
    {
      id: '2',
      name: 'Chicken Burger',
      image: burgerImg,
      totalSold: 120,
      revenue: 2400000,
      trend: 'down',
      percentage: 5
    },
    // Tambahkan data menu lainnya di sini
  ];

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
        <h1 className="text-lg font-medium">Analisis Penjualan</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 p-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Total Penjualan</p>
          <p className="text-2xl font-bold">270</p>
          <p className="text-xs text-green-500 mt-2 flex items-center">
            <BsArrowUp className="mr-1" />
            10% dari bulan lalu
          </p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Total Pendapatan</p>
          <p className="text-2xl font-bold">Rp 5.4M</p>
          <p className="text-xs text-green-500 mt-2 flex items-center">
            <BsArrowUp className="mr-1" />
            12% dari bulan lalu
          </p>
        </div>
      </div>

      {/* Sales Rankings */}
      <div className="p-4">
        <h2 className="text-lg font-medium mb-4">Peringkat Menu</h2>
        <div className="space-y-4">
          {salesData.sort((a, b) => b.totalSold - a.totalSold).map((item, index) => (
            <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center space-x-4">
                {/* Ranking Number */}
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-medium">{index + 1}</span>
                </div>
                
                {/* Product Image */}
                <div className="w-16 h-16 bg-gray-200 rounded-xl overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Product Info */}
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <div className="flex items-center justify-between mt-1">
                    <div>
                      <p className="text-sm text-gray-500">Terjual: {item.totalSold}</p>
                      <p className="text-sm text-gray-500">Rp {item.revenue.toLocaleString()}</p>
                    </div>
                    <div className={`flex items-center ${
                      item.trend === 'up' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {item.trend === 'up' ? <BsArrowUp /> : <BsArrowDown />}
                      <span className="text-sm ml-1">{item.percentage}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalisisPage;
