'use client';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import React, { useRef } from 'react';

const CategoryForm = () => {
  const categoryRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedCategory = categoryRef.current.value;
    e.preventDefault()
    axios.post(`${NEXT_PUBLIC_API_URL}/categroy`,selectedCategory)
    console.log('Form submitted:', selectedCategory);
    alert(`Form submitted: ${selectedCategory}`);
    // Add further form handling logic here
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="category" style={{ display: 'block', marginBottom: '0.5rem' }}>Category:</label>
        <select
          id="category"
          ref={categoryRef}
          defaultValue="default"
          required
          style={{ width: '100%', padding: '0.5rem' }}
        >
          <option value="default" disabled>Select a category</option>
          <option value="education">Education</option>
          <option value="health">Health</option>
          <option value="technology">Technology</option>
          <option value="finance">Finance</option>
        </select>
      </div>

      <Button type="submit" style={{ padding: '0.75rem', width: '100%' }}>Submit</Button>
    </form>
  );
};

export default CategoryForm;
