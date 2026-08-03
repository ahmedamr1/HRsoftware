import { NextResponse } from "next/server";
import { employees } from "@/app/employees/data";

// Use a global variable to persist mock state across API requests during development
const globalForMock = globalThis as unknown as { mockAssets: any[] | undefined };

if (!globalForMock.mockAssets) {
    globalForMock.mockAssets = employees.map((emp) => ({
        id: `ast_${emp.id}`,
        name: "Laptop",
        brand: "Apple",
        category: "Laptop",
        serialNumber: `MWP22LL/A-${emp.id}`,
        status: "Assigned",
        notes: "Space Gray, 16GB RAM",
        assignedAt: emp.joinedDate ? new Date(emp.joinedDate).toISOString() : "2023-01-01T00:00:00Z",
        employee: {
            id: emp.id,
            firstName: emp.firstName,
            lastName: emp.lastName,
            avatar: emp.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${emp.firstName}`
        }
    }));
}

export async function GET() {
    return NextResponse.json(globalForMock.mockAssets);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, serialNumber, category, employeeId, status, assignedAt } = body;
        
        // Lookup employee for mock response
        const emp = employeeId ? employees.find(e => e.id === employeeId) : null;
        
        // Mock creation
        const newAsset = {
            id: `ast_${Date.now()}`,
            name,
            serialNumber,
            category,
            status: status || "In Inventory",
            assignedAt: employeeId ? (assignedAt ? new Date(assignedAt).toISOString() : new Date().toISOString()) : null,
            employee: emp ? {
                id: emp.id,
                firstName: emp.firstName,
                lastName: emp.lastName,
                avatar: emp.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${emp.firstName}`
            } : null
        };

        if (globalForMock.mockAssets) {
            globalForMock.mockAssets = [newAsset, ...globalForMock.mockAssets];
        }

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
        let updatedAsset = null;
        if (globalForMock.mockAssets) {
            globalForMock.mockAssets = globalForMock.mockAssets.map(asset => {
                if (asset.id === id) {
                    updatedAsset = {
                        ...asset,
                        status: status,
                        assignedAt: employeeId ? new Date().toISOString() : asset.assignedAt,
                        employee: employeeId === null ? null : (employeeId ? employees.find(e => e.id === employeeId) : asset.employee)
                    };
                    return updatedAsset;
                }
                return asset;
            });
        }

        return NextResponse.json(updatedAsset || { error: "Not found" });
    } catch (error: any) {
        return NextResponse.json({ error: "Failed to update asset." }, { status: 500 });
    }
}
