
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

// Define the form schema using Zod
const lecturerSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  department: z.string().min(2, { message: 'Department is required' }),
  employeeId: z.string().min(2, { message: 'Employee ID is required' }),
});

type LecturerFormValues = z.infer<typeof lecturerSchema>;

const LecturerManagement = () => {
  const [lecturers, setLecturers] = useState<LecturerFormValues[]>([
    {
      name: 'John Doe',
      email: 'john.doe@tut.ac.za',
      department: 'Computer Science',
      employeeId: 'EMP001',
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@tut.ac.za',
      department: 'Information Technology',
      employeeId: 'EMP002',
    },
  ]);

  const form = useForm<LecturerFormValues>({
    resolver: zodResolver(lecturerSchema),
    defaultValues: {
      name: '',
      email: '',
      department: '',
      employeeId: '',
    },
  });

  const onSubmit = (values: LecturerFormValues) => {
    // Add the new lecturer to the list
    setLecturers([...lecturers, values]);
    
    // Reset the form
    form.reset();
    
    // Show success toast
    toast({
      title: 'Lecturer added',
      description: `${values.name} has been added successfully.`,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Lecturer</CardTitle>
          <CardDescription>
            Add a new lecturer to the system. All fields are required.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="john.doe@tut.ac.za" 
                        type="email"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <Input placeholder="Computer Science" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="employeeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employee ID</FormLabel>
                    <FormControl>
                      <Input placeholder="EMP001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="mt-4">Add Lecturer</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Lecturers</CardTitle>
          <CardDescription>
            List of all lecturers currently in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">Name</th>
                  <th scope="col" className="px-6 py-3">Email</th>
                  <th scope="col" className="px-6 py-3">Department</th>
                  <th scope="col" className="px-6 py-3">Employee ID</th>
                </tr>
              </thead>
              <tbody>
                {lecturers.map((lecturer, index) => (
                  <tr key={index} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{lecturer.name}</td>
                    <td className="px-6 py-4">{lecturer.email}</td>
                    <td className="px-6 py-4">{lecturer.department}</td>
                    <td className="px-6 py-4">{lecturer.employeeId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LecturerManagement;
