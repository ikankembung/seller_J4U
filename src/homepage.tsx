import React from 'react';
import { IoAnalytics } from 'react-icons/io5';
import { FiClipboard } from 'react-icons/fi';
import { CgProfile } from 'react-icons/cg';
import { GiReceiveMoney } from 'react-icons/gi';
import { BiFoodMenu } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { Switch } from '@headlessui/react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(true);
  const [isDeliveryEnabled, setIsDeliveryEnabled] = React.useState(true);
  const [showProfile, setShowProfile] = React.useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 relative overflow-x-hidden">
      {/* Header */}
      <div className="bg-white p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <button 
              className="p-2 hover:bg-gray-100 rounded-full"
              onClick={() => setShowProfile(true)}
            >
              <CgProfile className="text-2xl text-gray-700" />
            </button>
            <div>
              <h1 className="text-2xl font-bold">Hallo Sultan</h1>
              <p className="text-gray-500">Toko Bayu, Tokyo</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Delivery Switch */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Antar</span>
              <Switch
                checked={isDeliveryEnabled}
                onChange={setIsDeliveryEnabled}
                className={`${
                  isDeliveryEnabled ? 'bg-[#4CD964]' : 'bg-gray-200'
                } relative inline-flex h-8 w-20 items-center rounded-full transition-colors focus:outline-none`}
              >
                <span className="sr-only">Toggle delivery status</span>
                <span
                  className={`
                    ${isDeliveryEnabled ? 'translate-x-12' : 'translate-x-1'}
                    inline-block h-6 w-6 transform rounded-full bg-white transition-transform
                  `}
                />
                <span 
                  className={`
                    absolute text-xs font-medium
                    ${isDeliveryEnabled ? 'left-3 text-white' : 'right-3 text-white'}
                  `}
                >
                  {isDeliveryEnabled ? 'Aktif' : 'Mati'}
                </span>
              </Switch>
            </div>

            {/* Store Status Switch */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Toko</span>
              <Switch
                checked={isOpen}
                onChange={setIsOpen}
                className={`${
                  isOpen ? 'bg-[#4CD964]' : 'bg-red-500'
                } relative inline-flex h-8 w-20 items-center rounded-full transition-colors focus:outline-none`}
              >
                <span className="sr-only">Toggle store status</span>
                <span
                  className={`
                    ${isOpen ? 'translate-x-12' : 'translate-x-1'}
                    inline-block h-6 w-6 transform rounded-full bg-white transition-transform
                  `}
                />
                <span 
                  className={`
                    absolute text-xs font-medium
                    ${isOpen ? 'left-3 text-white' : 'right-3 text-white'}
                  `}
                >
                  {isOpen ? 'Buka' : 'Tutup'}
                </span>
              </Switch>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Icons Section */}
      <div className="grid grid-cols-4 gap-4 p-4 bg-white rounded-lg shadow-sm mx-4 mt-4">
        <MenuItem 
          icon={<FiClipboard />} 
          label="Pesanan" 
          onClick={() => navigate('/pesanan')}
        />
        <MenuItem 
          icon={<BiFoodMenu />} 
          label="Menu" 
          onClick={() => navigate('/menu')}
        />
        <MenuItem 
          icon={<GiReceiveMoney />} 
          label="Keuangan" 
          onClick={() => navigate('/keuangan')}
        />
        <MenuItem 
          icon={<IoAnalytics />} 
          label="Analisis"
          onClick={() => navigate('/analisis')} 
        />
      </div>

      {/* Setup Menu Section */}
      <div className="bg-white rounded-lg shadow-sm mx-4 mt-4 p-4 hover:shadow-md transition-shadow duration-200">
        <div 
          className="flex items-center space-x-3 cursor-pointer group px-2"
          onClick={() => navigate('/setupmenu')}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white transform transition-all duration-200 group-hover:scale-105 group-hover:shadow-md group-hover:from-[#FFD700] group-hover:to-[#FFB700]">
            <BiFoodMenu className="text-xl" />
          </div>
          <div className="flex-1">
            <h2 className="font-semibold group-hover:text-[#FFD700] transition-colors duration-200">Tambah Menu</h2>
            <p className="text-sm text-gray-500">Atur menu Anda di sini</p>
          </div>
        </div>
      </div>

      {/* Profile Popup */}
      {showProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute left-0 top-0 bottom-0 w-full max-w-md bg-[#F6F6F6] flex flex-col animate-slide-right">
            {/* Profile Header */}
            <div className="bg-white px-4 py-3 flex items-center space-x-4 sticky top-0 z-10 shadow-sm">
              <button 
                onClick={() => setShowProfile(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <IoIosArrowBack className="text-2xl text-gray-700" />
              </button>
              <h1 className="text-lg font-medium">Personal Profile</h1>
            </div>

            {/* Profile Content - Scrollable Area */}
            <div className="flex-1 overflow-y-auto scrollbar-hide">
              <div className="p-4 space-y-6">
                {/* Personal Info Section */}
                <div>
                  <h2 className="text-[13px] font-medium text-gray-900 mb-3">Personal Info</h2>
                  <div className="bg-white rounded-xl divide-y divide-gray-100">
                    <div className="px-4 py-3.5">
                      <p className="text-xs text-gray-400">Name</p>
                      <p className="text-[13px] text-gray-900 mt-0.5">sultanbayu123@gmail.com</p>
                    </div>
                    <div className="px-4 py-3.5">
                      <p className="text-xs text-gray-400">Username</p>
                      <p className="text-[13px] text-gray-900 mt-0.5">sultanbayu123@gmail.com</p>
                    </div>
                    <div className="px-4 py-3.5">
                      <p className="text-xs text-gray-400">Role</p>
                      <p className="text-[13px] text-gray-900 mt-0.5">Admin</p>
                    </div>
                  </div>
                </div>

                {/* Contact Info Section */}
                <div>
                  <h2 className="text-[13px] font-medium text-gray-900 mb-3">Contact Info</h2>
                  <div className="bg-white rounded-xl overflow-hidden">
                    <div className="divide-y divide-gray-100">
                      <div className="px-4 py-3.5 flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-xs text-gray-400">Email</p>
                          <p className="text-[13px] text-gray-900 mt-0.5 truncate pr-4">sultanbayu123@gmail.com</p>
                        </div>
                        <IoIosArrowForward className="text-gray-400 flex-shrink-0" />
                      </div>
                      <div className="px-4 py-3.5 flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-xs text-gray-400">Number</p>
                          <p className="text-[13px] text-gray-900 mt-0.5 truncate pr-4">+62 822-5544-8877</p>
                        </div>
                        <IoIosArrowForward className="text-gray-400 flex-shrink-0" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2.5 pt-4 pb-6">
                  <button className="w-full bg-red-500 text-white py-3 rounded-xl font-medium text-sm hover:bg-red-600 transition-colors">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Menu Item Component
const MenuItem: React.FC<{ 
  icon: React.ReactNode; 
  label: string;
  onClick?: () => void;
}> = ({ icon, label, onClick }) => {
  return (
    <div 
      className="flex flex-col items-center justify-center p-3 cursor-pointer group" 
      onClick={onClick}
    >
      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-2xl mb-2 shadow-md transform transition-all duration-200 group-hover:shadow-lg group-hover:scale-105 group-hover:from-[#FFD700] group-hover:to-[#FFB700]">
        {icon}
      </div>
      <span className="text-sm font-medium text-gray-700 group-hover:text-[#FFD700] transition-colors duration-200">{label}</span>
    </div>
  );
};

export default HomePage;
