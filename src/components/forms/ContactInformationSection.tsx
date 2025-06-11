
import React, { useState } from 'react';
import { CategoryHeader } from '../ui/CategoryHeader';
import { FormInput } from '../ui/FormInput';

export const ContactInformationSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <section className="box-border m-0 p-0">
      <CategoryHeader
        title="Contact Information"
        description="Your Documents and confirmation will be sent here"
      />
      
      <div className="box-border grid grid-cols-1 md:grid-cols-2 gap-6 m-0 p-0">
        <FormInput
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChange={setEmail}
        />
        <FormInput
          label="Phone Number"
          placeholder="Enter your phone number"
          value={phone}
          onChange={setPhone}
        />
      </div>
    </section>
  );
};
