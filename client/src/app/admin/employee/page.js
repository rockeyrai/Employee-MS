'use client';

import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmployeeForm = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const locationRef = useRef(null);
  const hireDateRef = useRef(null);
  const departmentRef = useRef(null);
  const phoneRef = useRef(null);
  const [employees, setEmployees] = useState([]);

  // Fetch employees
  const getData = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/employee`)
      .then((result) => {
        if (result.data && Array.isArray(result.data.data)) {
          setEmployees(result.data.data);
          console.log('Employees fetched:', result.data.data);
        } else {
          console.warn('The server sent unexpected data. Resetting employees.');
          setEmployees([]);
        }
      })
      .catch((err) => {
        console.error("Uh-oh! Couldn't fetch employees:", err.response || err);
        setEmployees([]);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const enteredName = nameRef.current?.value.trim();
    const enteredEmail = emailRef.current?.value.trim();
    const enteredLocation = locationRef.current?.value.trim();
    const enteredHireDate = hireDateRef.current?.value.trim();
    const enteredDepartment = departmentRef.current?.value.trim();
    const enteredPhone = phoneRef.current?.value.trim();

    if (!enteredName || !enteredEmail || !enteredLocation || !enteredHireDate || !enteredDepartment || !enteredPhone) {
      toast.warn('Please fill in all fields.');
      return;
    }

    try {
      console.log('Submitting new employee:', enteredName);

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/employee`, {
        name: enteredName,
        email: enteredEmail,
        location: enteredLocation,
        hire_date: enteredHireDate,
        department: enteredDepartment,
        phone: enteredPhone,
      });

      console.log('Full Server Response:', response);

      if (response.data.status === true) {
        toast.success(`🎉 ${response.data.message}`);
        nameRef.current.value = '';
        emailRef.current.value = '';
        locationRef.current.value = '';
        hireDateRef.current.value = '';
        departmentRef.current.value = '';
        phoneRef.current.value = '';
        getData(); // Refresh employee list
      } else {
        toast.error('Failed to add employee.');
      }
    } catch (error) {
      console.log('Error adding employee:', error);
      toast.error('Failed to add employee. Please try again.');
    }
  };

  const handleDelete = async (employeeId) => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/employee/${employeeId}`);

      console.log('Full Server Response:', response);

      if (response.data.status === true) {
        toast.success(`🎉 Employee deleted successfully.`);
        getData(); // Refresh employee list
      } else {
        toast.error('Failed to delete employee.');
      }
    } catch (error) {
      console.log('Error deleting employee:', error);
      toast.error('Failed to delete employee. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="mb-4">Add Employee</Button>
        </PopoverTrigger>
        <PopoverContent className="w-[40rem]">
          <form onSubmit={handleSubmit} className="space-y-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" ref={nameRef} placeholder="Employee Name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" ref={emailRef} placeholder="Employee Email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" ref={locationRef} placeholder="Employee Location" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hire_date">Hire Date</Label>
              <Input id="hire_date" type="date" ref={hireDateRef} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input id="department" ref={departmentRef} placeholder="Department" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" ref={phoneRef} placeholder="Phone Number" required />
            </div>
            <Button type="submit" className="w-full">Add Employee 🚀</Button>
          </form>
        </PopoverContent>
      </Popover>

      <Table>
        <TableCaption>List of Employees</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Hire Date</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.location}</TableCell>
                <TableCell>{employee.hire_date}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.phone}</TableCell>
                <TableCell>
                  <Button variant="destructive" onClick={() => handleDelete(employee.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center">No employees found. Add some to make it lively!</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default EmployeeForm;
