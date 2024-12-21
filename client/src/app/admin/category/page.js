'use client';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CategoryForm = () => {
  const categoryRef = useRef();
  const [categories, setCategories] = useState([]);

  // Fetch categories
  const getData = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/category`)
      .then((result) => {
        if (result.data && Array.isArray(result.data.data)) {
          const validCategories = result.data.data.filter(
            (category) => category && typeof category.id !== 'undefined' && category.name
          );
          setCategories(validCategories);
          console.log('Categories fetched:', validCategories);
        } else {
          console.warn("The server sent us some funky data. Let's reset the categories.");
          setCategories([]);
        }
      })
      .catch((err) => {
        console.error("Uh-oh! Couldn't fetch categories:", err.response || err);
        setCategories([]);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredCategory = categoryRef.current.value.trim();

    if (!enteredCategory) {
      toast.warn('Please enter a category name.');
      return;
    }

    try {
      console.log('Submitting new category:', enteredCategory);

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/category`, {
        category: enteredCategory,
      });

      console.log('Full Server Response:', response);

      // Check if the response status is true and handle accordingly
      if (response.data?.status === true) {
        const message = response.data.message;
        toast.success(`🎉 ${message}`);

        // Fetch the updated categories
        getData();
        categoryRef.current.value = ''; // Clear the input field after successful submission
      } else {
        throw new Error('Unexpected response from the server.');
      }
    } catch (error) {
      console.log('Error adding category:', error.response || error);
      toast.error(
        error.response?.data?.message ||
        'Failed to add category. Please check the server or try again.'
      );
    }
  };

  // Handle delete category
  const handleDelete = async (categoryId) => {
    try {
      console.log('Deleting category with ID:', categoryId);

      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/category/${categoryId}`);

      if (response.data?.status === true) {
        toast.success('Category deleted successfully');
        // Refresh the category list after deletion
        getData();
      } else {
        toast.error('Failed to delete category.');
      }
    } catch (error) {
      console.log('Error deleting category:', error.response || error);
      toast.error('Failed to delete category. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      {/* A category form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="category" style={{ display: 'block', marginBottom: '0.5rem' }}>
            Add a new category:
          </label>
          <input
            type="text"
            id="category"
            ref={categoryRef}
            placeholder="E.g., Super Cool Category"
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <Button type="submit" style={{ padding: '0.75rem', width: '100%' }}>
          Add Category 🚀
        </Button>
      </form>

      {/* Display the categories */}
      <div>
        <h2>Categories</h2>
        {categories.length > 0 ? (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {categories.map((category) => (
              <li
                key={category.id}
                style={{
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  marginBottom: '0.5rem',
                  borderRadius: '4px',
                  display:'flex',
                  justifyContent: 'space-between',
                  alignItems:'center'
                }}
              >
                <div><strong>Name:</strong> {category.name}</div>
                <Button
                  onClick={() => handleDelete(category.id)}
                  style={{ marginLeft: '1rem', padding: '0.25rem 0.5rem' }}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No categories found. Add some and make this page less boring!</p>
        )}
      </div>

      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default CategoryForm;
