import React, { useEffect } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { Switch } from '@headlessui/react';
import axios from 'axios';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [savePassword, setSavePassword] = React.useState(false);
  const [profileData, setProfileData] = React.useState(null);
  const token = localStorage.getItem('token');
  const sellerId = localStorage.getItem('sellerId');

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token || !sellerId) {
        console.error('No token or Seller ID found, redirecting to login.');
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(`https://d006-114-10-45-252.ngrok-free.app/data_sellers/${sellerId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfile();
  }, [token, sellerId, navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white p-4 flex items-center space-x-4">
        <button 
          onClick={() => navigate(-1)}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <IoIosArrowBack className="text-2xl text-gray-700" />
        </button>
        <h1 className="text-lg font-medium">Personal Profile</h1>
      </div>

      {/* Profile Content */}
      <div className="p-4 space-y-6">
        {/* Personal Info Section */}
        <div>
          <h2 className="text-sm font-medium mb-2">Personal Info</h2>
          <div className="bg-white rounded-lg space-y-4">
            <div className="p-4">
              <p className="text-sm text-gray-500">Name</p>
              <p className="text-sm">{profileData ? profileData.name : 'Loading...'}</p>
            </div>
            <div className="p-4 border-t">
              <p className="text-sm text-gray-500">Username</p>
              <p className="text-sm">Sultan</p>
            </div>
            <div className="p-4 border-t">
              <p className="text-sm text-gray-500">Role</p>
              <p className="text-sm">Penjual</p>
            </div>
          </div>
        </div>

        {/* Contact Info Section */}
        <div>
          <h2 className="text-sm font-medium mb-2">Contact Info</h2>
          <div className="bg-white rounded-lg">
            <button className="w-full p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-sm">sultansultin123@gmail.com</p>
              </div>
              <IoIosArrowForward className="text-gray-400" />
            </button>
            <button className="w-full p-4 flex items-center justify-between border-t">
              <div>
                <p className="text-sm text-gray-500">Number</p>
                <p className="text-sm">+62 822-5544-8877</p>
              </div>
              <IoIosArrowForward className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Password Section */}
        <div>
          <h2 className="text-sm font-medium mb-2">Password</h2>
          <div className="bg-white rounded-lg">
            <div className="p-4 flex items-center justify-between">
              <span className="text-sm">Save password</span>
              <Switch
                checked={savePassword}
                onChange={setSavePassword}
                className={`${
                  savePassword ? 'bg-[#4CD964]' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
              >
                <span
                  className={`${
                    savePassword ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
            </div>
            <button className="w-full p-4 flex items-center justify-between border-t">
              <span className="text-sm">Change password</span>
              <IoIosArrowForward className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <button className="w-full bg-red-500 text-white py-3 rounded-lg font-medium">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;