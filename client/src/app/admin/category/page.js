'use client';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

const CategoryForm = () => {
  const categoryRef = useRef();
  const [category, setCategory] = useState([])

  useEffect(()=>{
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/category`)
    .then(result =>{
      console.log(result.data)
    }).catch(err => console.log(err))
  },[])


  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredCategory = categoryRef.current.value.trim();

    if (!enteredCategory) {
      alert('Please enter a category');
      return;
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/category`, {
        category: enteredCategory,
      });

      console.log('Form submitted:', response.data);
      alert('Category added successfully');
      categoryRef.current.value = ''; // Clear the input field after submission
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to add category. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="category" style={{ display: 'block', marginBottom: '0.5rem' }}>Category:</label>
        <input
          type="text"
          id="category"
          ref={categoryRef}
          placeholder="Enter category"
          required
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </div>

      <Button type="submit" style={{ padding: '0.75rem', width: '100%' }}>Submit</Button>
    </form>
  );
};

export default CategoryForm;
