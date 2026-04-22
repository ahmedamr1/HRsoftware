"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { employees } from "../data";
import { toast } from "sonner";

export default function AddEmployeePage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        role: "",
        department: ""
    });

    const handleSave = () => {
        if (!formData.firstName || !formData.lastName || !formData.email) {
            toast.error("Please fill in all required fields (First Name, Last Name, Email).");
            return;
        }

        const newEmployee = {
            id: `emp-${Date.now()}`,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            role: formData.role || "Employee",
            department: formData.department || "General",
            status: "Active" as const,
            joinedDate: new Date().toISOString().split('T')[0]
        };

        employees.unshift(newEmployee); // Add to beginning of list
        toast.success("Employee added successfully!");
        router.push("/employees");
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6 text-left">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/employees">
                        <ChevronLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <h2 className="text-3xl font-bold tracking-tight">Add Employee</h2>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Employee Details</CardTitle>
                    <CardDescription>
                        Enter the personal and professional details of the new employee.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input 
                                id="firstName" 
                                placeholder="John" 
                                value={formData.firstName}
                                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input 
                                id="lastName" 
                                placeholder="Doe" 
                                value={formData.lastName}
                                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                            id="email" 
                            type="email" 
                            placeholder="john.doe@variable.co" 
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="role">Role</Label>
                            <Input 
                                id="role" 
                                placeholder="Software Engineer" 
                                value={formData.role}
                                onChange={(e) => setFormData({...formData, role: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="department">Department</Label>
                            <Input 
                                id="department" 
                                placeholder="Engineering" 
                                value={formData.department}
                                onChange={(e) => setFormData({...formData, department: e.target.value})}
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-4">
                    <Button variant="outline" asChild>
                        <Link href="/employees">Cancel</Link>
                    </Button>
                    <Button onClick={handleSave}>Save Employee</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
