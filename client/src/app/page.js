'use client';

import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={async (values, actions) => {
            try {
              const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/login`,
                values,
                { withCredentials: true }
              );
          
              // Check if the response indicates success
              if (response.data.loginStatus) {
                toast.success('Login successful!', {
                  position: "top-right",
                  autoClose: 3000,
                });
                console.log('Login successful:', response.data);
                router.push('/admin')
              
                // Handle success (e.g., navigate to another page)
              } else {
                toast.error('Login failed! Invalid credentials.', {
                  position: "top-right",
                  autoClose: 3000,
                });
              }
            } catch (error) {
              toast.error('Login failed! Please check your credentials.', {
                position: "top-right",
                autoClose: 3000,
              });
              console.error('Login failed:', error);
            } finally {
              actions.setSubmitting(false);
            }
          }}
          
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                     autoComplete="email"
                  />
                  {errors.email && touched.email && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.email}</AlertDescription>
                    </Alert>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />
                  {errors.password && touched.password && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.password}</AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </Button>
              </CardFooter>
            </Form>
          )}
        </Formik>
      </Card>
      <ToastContainer />
    </div>
  );
}
