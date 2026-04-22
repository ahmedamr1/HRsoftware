import { NextResponse } from 'next/server';

// In a real implementation, this would use the Gemini API 
// to extract text from a PDF/Image and score it against a job description.

export async function POST(req: Request) {
    try {
        const { resumeUrl, jobDescription } = await req.json();

        // Simulating AI Processing Delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Mock AI Analysis Results
        const mockAnalysis = {
            score: Math.floor(Math.random() * 40) + 60, // 60-100 range
            summary: "Candidate shows strong experience in React and Node.js. Matches 85% of core requirements. Recommended for technical interview.",
            topSkills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
        };

        return NextResponse.json(mockAnalysis);
    } catch (error) {
        return NextResponse.json({ error: "Failed to parse resume" }, { status: 500 });
    }
}
