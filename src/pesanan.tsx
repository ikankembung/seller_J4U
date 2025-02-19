import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import burgerImg from './assets/burger.jpg';
import { BsCheck2Circle } from 'react-icons/bs';
import { FiClock, FiTruck } from 'react-icons/fi';

type OrderStatus = 'pending' | 'accepted' | 'delivering' | 'completed';

interface Order {
  id: string;
  customerName: string;
  items: {
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  total: number;
  status: OrderStatus;
  time: string;
  address: string;
}

const PesananPage: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = React.useState<Order[]>([
    {
      id: '1',
      customerName: 'John Doe',
      items: [
        {
          name: 'Burger Burgar',
          quantity: 2,
          price: 20000000,
          image: burgerImg
        }
      ],
      total: 40000000,
      status: 'pending',
      time: '10:30',
      address: 'Jl. Raya Kebon Jeruk No. 123, Jakarta Barat'
    }
  ]);

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'accepted': return 'bg-blue-500';
      case 'delivering': return 'bg-purple-500';
      case 'completed': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return 'Pesanan Masuk';
      case 'accepted': return 'Pesanan Diterima';
      case 'delivering': return 'Sedang Diantar';
      case 'completed': return 'Selesai';
      default: return '';
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
        <h1 className="text-lg font-medium">Pesanan</h1>
      </div>

      {/* Orders List */}
      <div className="p-4 space-y-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white rounded-2xl shadow-sm">
            {/* Order Header */}
            <div className="p-4 border-b">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{order.customerName}</span>
                <span className="text-sm text-gray-500">{order.time}</span>
              </div>
              <p className="text-sm text-gray-500">{order.address}</p>
            </div>

            {/* Order Items */}
            {order.items.map((item, index) => (
              <div key={index} className="p-4 flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-xl overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.quantity}x @ Rp {item.price.toLocaleString()}</p>
                </div>
              </div>
            ))}

            {/* Order Total */}
            <div className="px-4 py-3 border-t">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total</span>
                <span className="font-medium">Rp {order.total.toLocaleString()}</span>
              </div>
            </div>

            {/* Status Actions */}
            <div className="p-4 border-t">
              <div className="flex items-center justify-between">
                <div className={`px-3 py-1 rounded-full text-xs text-white ${getStatusColor(order.status)}`}>
                  {getStatusText(order.status)}
                </div>
                <div className="flex space-x-2">
                  {order.status === 'pending' && (
                    <button
                      onClick={() => handleStatusChange(order.id, 'accepted')}
                      className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-1"
                    >
                      <BsCheck2Circle className="text-lg" />
                      <span>Terima</span>
                    </button>
                  )}
                  {order.status === 'accepted' && (
                    <button
                      onClick={() => handleStatusChange(order.id, 'delivering')}
                      className="px-4 py-2 bg-purple-500 text-white text-sm rounded-lg hover:bg-purple-600 transition-colors flex items-center space-x-1"
                    >
                      <FiTruck className="text-lg" />
                      <span>Antar</span>
                    </button>
                  )}
                  {(order.status === 'accepted' || order.status === 'delivering') && (
                    <button
                      onClick={() => handleStatusChange(order.id, 'completed')}
                      className="px-4 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-1"
                    >
                      <BsCheck2Circle className="text-lg" />
                      <span>Selesai</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PesananPage;
