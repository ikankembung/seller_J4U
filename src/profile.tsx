import React, { useEffect } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = React.useState<any>(null);
  const token = localStorage.getItem('token');
  const sellerId = localStorage.getItem('seller_id');

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
              <p className="text-sm">{profileData ? profileData.seller_name : 'Loading...'}</p>
            </div>
            <div className="p-4 border-t">
              <p className="text-sm text-gray-500">Number</p>
              <p className="text-sm">{profileData ? profileData.contact_info : 'Loading...'}</p>
            </div>
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