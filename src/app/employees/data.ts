export type Employee = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    department: string;
    status: 'Active' | 'On Leave' | 'Terminated';
    avatar?: string;
    joinedDate: string;
};

export const employees: Employee[] = [
    {
        id: "1",
        firstName: "Sarah",
        lastName: "Smith",
        email: "sarah.smith@example.com",
        role: "Product Manager",
        department: "Product",
        status: "Active",
        joinedDate: "2023-01-15",
    },
    {
        id: "2",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        role: "Software Engineer",
        department: "Engineering",
        status: "On Leave",
        joinedDate: "2023-03-10",
    },
    {
        id: "3",
        firstName: "Mike",
        lastName: "Johnson",
        email: "mike.j@example.com",
        role: "Designer",
        department: "Design",
        status: "Active",
        joinedDate: "2023-06-20",
    },
    {
        id: "4",
        firstName: "Emily",
        lastName: "Davis",
        email: "emily.d@example.com",
        role: "HR Specialist",
        department: "HR",
        status: "Active",
        joinedDate: "2022-11-05",
    },
    {
        id: "5",
        firstName: "Alex",
        lastName: "Wilson",
        email: "alex.w@example.com",
        role: "Software Engineer",
        department: "Engineering",
        status: "Active",
        joinedDate: "2023-09-01",
    },
];
