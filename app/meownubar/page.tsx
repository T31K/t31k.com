'use client';

import { useState } from 'react';
import axios from 'axios';

function Page() {
  const [formData, setFormData] = useState({
    email: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://submit-form.com/0ng3QA8F3', formData);
      console.log('Form submitted successfully:', response.data);
      setSuccessMessage("Meow! We'll let you know!");
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-black font-mono text-center">MeownuBar</h1>
      <p className="text-xl font-bold text-black font-mono text-center">Get a cat in your menubar</p>
      <img
        src="/cat.png"
        className="w-1/2 mx-auto"
        alt="meownu"
      />

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="mx-auto block !font-mono py-2 px-4 rounded-full w-2/3 text-center"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-full mx-auto block !font-mono mt-4"
        >
          remind me when it's out
        </button>
      </form>
      {successMessage && <p className="text-green-500 text-center mt-4">{successMessage}</p>}
    </div>
  );
}

export default Page;
