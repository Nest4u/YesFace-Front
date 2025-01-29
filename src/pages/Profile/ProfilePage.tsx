import React, { useState } from 'react';

import { authAPI } from '../../api/auth';

import OrderHistory from './components/OrderHistory';
import UserInfo from './components/UserInfo';
import AddressBook from './components/AddressBook';

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('info');
  const user = authAPI.getCurrentUser();

  if (!user) {
    return <div>Please login to view your profile</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-1/4">
          <nav className="flex flex-col gap-2">
            <button
              className={`p-2 text-left rounded ${activeTab === 'info' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
              onClick={() => setActiveTab('info')}
            >
              Personal Information
            </button>
            <button
              className={`p-2 text-left rounded ${activeTab === 'orders' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
              onClick={() => setActiveTab('orders')}
            >
              Order History
            </button>
            <button
              className={`p-2 text-left rounded ${activeTab === 'addresses' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
              onClick={() => setActiveTab('addresses')}
            >
              Address Book
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4">
          {activeTab === 'info' && <UserInfo user={user} />}
          {activeTab === 'orders' && <OrderHistory userId={user.id} />}
          {activeTab === 'addresses' && <AddressBook userId={user.id} />}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
