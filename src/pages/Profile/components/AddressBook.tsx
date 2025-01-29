import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Address {
  id: number;
  attributes: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
  }
}

interface AddressBookProps {
  userId: string;
}

const AddressBook: React.FC<AddressBookProps> = ({ userId }) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    postalCode: '',
    country: '',
    isDefault: false
  });

  useEffect(() => {
    fetchAddresses();
  }, [userId]);

  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem('jwt');
      const response = await axios.get(
        `http://localhost:1337/api/addresses?filters[user][id]=${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAddresses(response.data.data);
    } catch (error) {
      console.error('Failed to fetch addresses:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('jwt');
      await axios.post(
        'http://localhost:1337/api/addresses',
        {
          data: {
            ...newAddress,
            user: userId
          }
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsAdding(false);
      fetchAddresses();
    } catch (error) {
      console.error('Failed to add address:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Address Book</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Add New Address
        </button>
      </div>

      {isAdding ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600">Street</label>
            <input
              type="text"
              value={newAddress.street}
              onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600">City</label>
            <input
              type="text"
              value={newAddress.city}
              onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600">Postal Code</label>
            <input
              type="text"
              value={newAddress.postalCode}
              onChange={(e) => setNewAddress({...newAddress, postalCode: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600">Country</label>
            <input
              type="text"
              value={newAddress.country}
              onChange={(e) => setNewAddress({...newAddress, country: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={newAddress.isDefault}
              onChange={(e) => setNewAddress({...newAddress, isDefault: e.target.checked})}
              id="isDefault"
            />
            <label htmlFor="isDefault">Set as default address</label>
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded"
            >
              Save Address
            </button>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {addresses.map((address) => (
            <div key={address.id} className="border p-4 rounded">
              <div className="flex justify-between items-start">
                <div>
                  <p>{address.attributes.street}</p>
                  <p>{address.attributes.city}, {address.attributes.postalCode}</p>
                  <p>{address.attributes.country}</p>
                </div>
                {address.attributes.isDefault && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    Default
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressBook;
