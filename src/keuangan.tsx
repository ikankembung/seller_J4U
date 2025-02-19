import React from 'react';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { GiReceiveMoney } from 'react-icons/gi';

const KeuanganPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 overflow-x-hidden scrollbar-hide">
      {/* Header with Back Button */}
      <div className="bg-white p-4 flex items-center space-x-4 shadow-sm">
        <button 
          onClick={() => navigate(-1)}
          className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
        >
          <IoIosArrowBack className="text-2xl text-gray-700" />
        </button>
        <h1 className="text-lg font-medium">Keuangan</h1>
      </div>

      {/* Transaction List */}
      <div className="flex-1 p-4">
        <div className="space-y-3">
          {/* Transaction Item */}
          <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                  <IoIosArrowForward className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Pembayaran</h3>
                  <p className="text-xs text-gray-500">1 Januari 2024, 08:25</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-green-600 font-semibold">+ Rp. 5.000</span>
              </div>
            </div>
          </div>

          {/* Transaction Item */}
          <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                  <IoIosArrowForward className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Kantin Opat - Burger Burger</h3>
                  <p className="text-xs text-gray-500">1 Januari 2024, 08:25</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-green-600 font-semibold">+ Rp. 30.000</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Total Income Section */}
      <div className="bg-white p-4 shadow-sm border-t">
        <div className="container mx-auto px-4">
          <div className="flex justify-end">
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="flex items-center justify-end space-x-2 mb-1">
                  <p className="text-sm text-gray-500">Total Pemasukan</p>
                  <div className="bg-gray-100 px-2.5 py-0.5 rounded-full">
                    <span className="text-xs text-gray-600">Januari 2024</span>
                  </div>
                </div>
                <div className="flex items-baseline justify-end space-x-1">
                  <span className="text-sm text-gray-500">Rp</span>
                  <p className="text-2xl font-bold text-green-600">35.000</p>
                </div>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <GiReceiveMoney className="text-xl text-green-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeuanganPage;
