export type TimeOffRequest = {
    id: number | string;
    user: string;
    type: string;
    dates: string;
    days: number;
    status: string;
    impact: string;
    aiAnalysis: string;
};

export const timeOffRequests: TimeOffRequest[] = [
    { id: 1, user: "John Doe", type: "Vacation", dates: "Oct 12 - Oct 15", days: 4, status: "Approved", impact: "Low", aiAnalysis: "No project milestones affected." },
    { id: 2, user: "Sarah Smith", type: "Sick Leave", dates: "Oct 10", days: 1, status: "Pending", impact: "Medium", aiAnalysis: "Design review scheduled. AI suggests rescheduling." },
    { id: 3, user: "Mike Johnson", type: "Personal", dates: "Nov 01 - Nov 03", days: 3, status: "Rejected", impact: "Critical", aiAnalysis: "Sprint release window. Full capacity required." },
];
