import React, { useState } from 'react';

interface ContactInfoProps {
  onComplete: (data: any) => void;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="First Name"
          className="p-2 border rounded"
          value={formData.firstName}
          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          className="p-2 border rounded"
          value={formData.lastName}
          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
          required
        />
      </div>
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        required
      />
      <input
        type="tel"
        placeholder="Phone"
        className="w-full p-2 border rounded"
        value={formData.phone}
        onChange={(e) => setFormData({...formData, phone: e.target.value})}
        required
      />
      <input
        type="text"
        placeholder="Address"
        className="w-full p-2 border rounded"
        value={formData.address}
        onChange={(e) => setFormData({...formData, address: e.target.value})}
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="City"
          className="p-2 border rounded"
          value={formData.city}
          onChange={(e) => setFormData({...formData, city: e.target.value})}
          required
        />
        <input
          type="text"
          placeholder="ZIP Code"
          className="p-2 border rounded"
          value={formData.zipCode}
          onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
          required
        />
      </div>
      <button 
        type="submit"
        className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark"
      >
        Continue to Delivery
      </button>
    </form>
  );
};

export default ContactInfo;
