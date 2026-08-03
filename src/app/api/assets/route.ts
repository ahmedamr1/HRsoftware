import { NextResponse } from "next/server";

const MOCK_ASSETS = [
    {
        id: "ast_1",
        name: "MacBook Pro 16\"",
        brand: "Apple",
        category: "Laptop",
        serialNumber: "MWP22LL/A",
        status: "Assigned",
        assignedAt: "2023-01-15T00:00:00Z",
        employee: {
            id: "2",
            firstName: "Sarah",
            lastName: "Jenkins",
            avatar: "https://i.pravatar.cc/150?u=sarah"
        }
    },
    {
        id: "ast_2",
        name: "Dell XPS 15",
        brand: "Dell",
        category: "Laptop",
        serialNumber: "DXPS15-2023-A1",
        status: "Assigned",
        assignedAt: "2024-03-10T00:00:00Z",
        employee: {
            id: "4",
            firstName: "Emily",
            lastName: "Chen",
            avatar: "https://i.pravatar.cc/150?u=emily"
        }
    },
    {
        id: "ast_3",
        name: "Office Keys",
        brand: "Generic",
        category: "Keys",
        serialNumber: "KEY-001",
        status: "In Inventory",
        assignedAt: null,
        employee: null
    },
    {
        id: "ast_4",
        name: "iPhone 14 Pro",
        brand: "Apple",
        category: "Phone",
        serialNumber: "IP14P-9921",
        status: "Assigned",
        assignedAt: "2023-11-05T00:00:00Z",
        employee: {
            id: "1",
            firstName: "Admin",
            lastName: "User",
            avatar: "https://i.pravatar.cc/150?u=admin"
        }
    },
    {
        id: "ast_5",
        name: "Building Access Badge",
        brand: "HID",
        category: "Badge",
        serialNumber: "BDG-88219",
        status: "Damaged",
        assignedAt: null,
        employee: null
    }
];

export async function GET() {
    // Return mock data instead of Prisma to avoid 500 errors when DB is not connected
    return NextResponse.json(MOCK_ASSETS);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, serialNumber, category, employeeId, status } = body;
        
        // Mock creation
        const newAsset = {
            id: `ast_${Date.now()}`,
            name,
            serialNumber,
            category,
            status: status || "In Inventory",
            assignedAt: employeeId ? new Date().toISOString() : null,
            employee: employeeId ? {
                id: employeeId,
                firstName: "Mock",
                lastName: "User",
                avatar: ""
            } : null
        };

        return NextResponse.json(newAsset);
    } catch (error: any) {
        return NextResponse.json({ error: "Failed to create asset." }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        const { id, employeeId, status } = body;

        // Mock update
        const updatedAsset = {
            id,
            name: "Mock Updated Asset",
            category: "Laptop",
            serialNumber: "MOCK-123",
            status: status,
            assignedAt: employeeId ? new Date().toISOString() : null,
            employee: employeeId === null ? null : {
                id: employeeId,
                firstName: "Mock",
                lastName: "User",
                avatar: ""
            }
        };

        return NextResponse.json(updatedAsset);
    } catch (error: any) {
        return NextResponse.json({ error: "Failed to update asset." }, { status: 500 });
    }
}
