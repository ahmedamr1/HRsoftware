import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { employees as mockEmployees } from '@/app/employees/data';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // 1. Fetch employee
        // For the demo/local environment, we use the mock data array as the source of truth.
        // This ensures the feature works even without a live database connection.
        const employee = mockEmployees.find(e => e.id === id);

        if (!employee) {
            return NextResponse.json({ error: 'Employee not found' }, { status: 404 });
        }

        const apiKey = process.env.GEMINI_API_KEY;

        // 2. Fallback to mock data if API key is missing
        if (!apiKey) {
            console.warn('GEMINI_API_KEY is missing. Using mock response.');
            return NextResponse.json(getMockCareerPath(employee.role, employee.skills));
        }

        // 3. Initialize Gemini
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

        const prompt = `
            You are an expert HR Strategist and Career Coach. 
            Analyze the following employee profile and suggest the next 3 logical career milestones (roles) they should aim for within a tech company, along with the specific skills they are currently missing for those roles.

            Employee Profile:
            - Current Role: ${employee.role}
            - Department: ${employee.department}
            - Current Skills: ${employee.skills.join(', ') || 'Not specified'}
            - Bio/Summary: ${employee.summary || 'None'}

            Response Format (JSON only):
            {
                "milestones": [
                    {
                        "role": "Role Name",
                        "timeframe": "1-2 years",
                        "description": "Short description of what this role entails.",
                        "missingSkills": ["Skill 1", "Skill 2"]
                    },
                    ... (total 3)
                ],
                "summary": "A brief overview of their potential growth path."
            }
        `;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        
        // Clean up markdown if AI returns it
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        const data = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(responseText);

        return NextResponse.json(data);

    } catch (error: any) {
        console.error('Career Path Error:', error);
        return NextResponse.json({ error: 'Failed to generate career path', details: error.message }, { status: 500 });
    }
}

function getMockCareerPath(role: string, skills: string[] = []) {
    return {
        milestones: [
            {
                role: `Senior ${role}`,
                timeframe: "1-2 years",
                description: "Taking more ownership of projects and mentoring junior team members.",
                missingSkills: ["Leadership", "Strategic Planning", "Advanced Architecture"]
            },
            {
                role: role.includes('Engineer') ? "Staff Engineer" : "Principal Manager",
                timeframe: "3-5 years",
                description: "High-level strategic impact across multiple teams or departments.",
                missingSkills: ["Cross-functional Coordination", "System Scalability", "Budget Management"]
            },
            {
                role: "Director / VP",
                timeframe: "5-10 years",
                description: "Executive leadership role defining the vision for the entire department.",
                missingSkills: ["Executive Communication", "Organizational Design", "Market Intelligence"]
            }
        ],
        summary: "Based on your current trajectory, you are well-positioned for leadership roles in the near future."
    };
}
