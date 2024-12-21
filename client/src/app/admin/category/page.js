'use client';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

const CategoryForm = () => {
  const categoryRef = useRef();
  const [categories, setCategories] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Handle hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Fetch categories
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/category`)
      .then((result) => {
        if (result.data && Array.isArray(result.data.data)) {
          setCategories(result.data.data);
        } else {
          console.warn('Invalid category data:', result.data);
          setCategories([]);
        }
      })
      .catch((err) => {
        console.error('Error fetching categories:', err);
        setCategories([]);
      });
  }, []);

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

      alert('Category added successfully');
      categoryRef.current.value = ''; // Clear input field

      // Add new category to state
      setCategories((prevCategories) => [
        ...prevCategories,
        { id: response.data.data.id, name: enteredCategory },
      ]);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to add category. Please try again.');
    }
  };

  if (!isHydrated) {
    return null; // Prevent rendering during hydration
  }

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      {/* Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="category" style={{ display: 'block', marginBottom: '0.5rem' }}>
            Category:
          </label>
          <input
            type="text"
            id="category"
            ref={categoryRef}
            placeholder="Enter category"
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <Button type="submit" style={{ padding: '0.75rem', width: '100%' }}>
          Submit
        </Button>
      </form>

      {/* Category List */}
      <div>
        <h2>Categories</h2>
        {categories.length > 0 ? (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {categories.map((category) => (
              <li
                key={category?.id || Math.random()}
                style={{
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  marginBottom: '0.5rem',
                  borderRadius: '4px',
                }}
              >
                <strong>ID:</strong> {category?.id || 'N/A'} <br />
                <strong>Name:</strong> {category?.name || 'Unknown'}
              </li>
            ))}
          </ul>
        ) : (
          <p>No categories found.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryForm;
