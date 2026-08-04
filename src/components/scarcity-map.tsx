import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Activity, ShieldAlert, CheckCircle2, TrendingDown } from "lucide-react";

// Mock Data for Scarcity Map
const DEPARTMENTS = ["Engineering", "Design", "HR", "Sales", "Operations"];
const WEEKS = ["W1 (Oct 1 - Oct 7)", "W2 (Oct 8 - Oct 14)", "W3 (Oct 15 - Oct 21)", "W4 (Oct 22 - Oct 28)"];

type RiskLevel = "Low" | "Moderate" | "High";

const HEATMAP_DATA: Record<string, { risk: RiskLevel, detail: string }[]> = {
    "Engineering": [
        { risk: "Low", detail: "Optimal capacity. 0 Engineers on leave." },
        { risk: "High", detail: "Critical Scarcity. 3 Senior Engineers on leave (Ahmed, Yusuf, Mahmoud). 60% capacity reduction." },
        { risk: "Low", detail: "Optimal capacity. 1 Engineer on leave." },
        { risk: "Moderate", detail: "Moderate Scarcity. 2 Engineers on leave." }
    ],
    "Design": [
        { risk: "Moderate", detail: "Moderate Scarcity. Lead Designer (Mohamed) on leave." },
        { risk: "Low", detail: "Optimal capacity. Full team available." },
        { risk: "Low", detail: "Optimal capacity. Full team available." },
        { risk: "Low", detail: "Optimal capacity. Full team available." }
    ],
    "HR": [
        { risk: "Low", detail: "Optimal capacity. Full team available." },
        { risk: "Low", detail: "Optimal capacity. Full team available." },
        { risk: "High", detail: "Critical Scarcity. VP of People (Rania) and HR Specialist (Noha) on leave." },
        { risk: "Low", detail: "Optimal capacity. Full team available." }
    ],
    "Sales": [
        { risk: "Low", detail: "Optimal capacity. Full team available." },
        { risk: "Moderate", detail: "Moderate Scarcity. 2 Account Executives off." },
        { risk: "Moderate", detail: "Moderate Scarcity. Sales Director off." },
        { risk: "High", detail: "Critical Scarcity. 5 Sales members off simultaneously." }
    ],
    "Operations": [
        { risk: "Low", detail: "Optimal capacity. Full team available." },
        { risk: "Low", detail: "Optimal capacity. Full team available." },
        { risk: "Low", detail: "Optimal capacity. Full team available." },
        { risk: "Low", detail: "Optimal capacity. Full team available." }
    ]
};

// Colors mapping
const getBgColor = (risk: RiskLevel) => {
    switch (risk) {
        case "High": return "bg-rose-500/20 hover:bg-rose-500/40 border-rose-500/50";
        case "Moderate": return "bg-amber-500/20 hover:bg-amber-500/40 border-amber-500/50";
        case "Low": return "bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/30";
    }
}

export function ScarcityMap() {
    const [hoveredCell, setHoveredCell] = useState<{ dept: string, weekIndex: number } | null>(null);

    return (
        <div className="flex flex-col gap-6 text-left">
            <div className="flex justify-between items-start pr-12">
                <div>
                    <h3 className="text-xl font-black text-black dark:text-zinc-50 tracking-tighter">Capacity Risk Map</h3>
                    <p className="text-sm text-zinc-500 mt-1">AI-modeled scarcity risk based on scheduled time-off for Q4.</p>
                </div>
                <div className="flex gap-2 mt-1">
                    <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-none rounded-full px-3 py-1 text-xs font-black">Optimal</Badge>
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-none rounded-full px-3 py-1 text-xs font-black">Moderate</Badge>
                    <Badge variant="outline" className="bg-rose-500/10 text-rose-600 border-none rounded-full px-3 py-1 text-xs font-black">Critical Risk</Badge>
                </div>
            </div>

            <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden bg-white/50 dark:bg-zinc-950/50 shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                            <th className="p-4 text-xs font-black tracking-widest text-zinc-500 uppercase w-1/4">Department</th>
                            {WEEKS.map((week, i) => (
                                <th key={i} className="p-4 text-xs font-black tracking-widest text-zinc-500 uppercase text-center w-[18.75%]">{week}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {DEPARTMENTS.map((dept) => (
                            <tr key={dept} className="border-b border-zinc-200 dark:border-zinc-800 last:border-0">
                                <td className="p-4 font-bold text-sm text-black dark:text-zinc-50">
                                    {dept}
                                </td>
                                {HEATMAP_DATA[dept].map((cell, weekIndex) => (
                                    <td key={weekIndex} className="p-2 relative group h-20">
                                        <div 
                                            className={`w-full h-full rounded-xl border ${getBgColor(cell.risk)} transition-all duration-300 cursor-crosshair flex items-center justify-center relative`}
                                            onMouseEnter={() => setHoveredCell({ dept, weekIndex })}
                                            onMouseLeave={() => setHoveredCell(null)}
                                        >
                                            {cell.risk === "High" && <TrendingDown className="h-5 w-5 text-rose-600 opacity-60 group-hover:opacity-100 transition-opacity" />}
                                            {cell.risk === "Moderate" && <Activity className="h-5 w-5 text-amber-600 opacity-60 group-hover:opacity-100 transition-opacity" />}
                                            {cell.risk === "Low" && <CheckCircle2 className="h-5 w-5 text-emerald-600 opacity-40 group-hover:opacity-100 transition-opacity" />}
                                        </div>

                                        {hoveredCell?.dept === dept && hoveredCell?.weekIndex === weekIndex && (
                                            <div className={`absolute z-50 ${dept === "Engineering" ? "top-full mt-2" : "bottom-full mb-2"} left-1/2 -translate-x-1/2 w-56 bg-zinc-950 dark:bg-white text-white dark:text-black rounded-xl p-3 shadow-2xl pointer-events-none animate-in fade-in zoom-in duration-200`}>
                                                <div className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">{dept} - {WEEKS[weekIndex].split(" ")[0]}</div>
                                                <div className="text-xs font-medium leading-relaxed">
                                                    {cell.detail}
                                                </div>
                                            </div>
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className="bg-blue-50/50 dark:bg-blue-900/20 rounded-2xl p-4 border border-blue-100 dark:border-blue-900/30 flex items-start gap-4 shadow-sm">
                <div className="bg-blue-500 rounded-full p-2 text-white shrink-0 mt-0.5">
                    <ShieldAlert size={16} />
                </div>
                <div>
                    <h4 className="text-sm font-bold text-blue-900 dark:text-blue-100 mb-1">AI Recommendation</h4>
                    <p className="text-xs text-blue-800/80 dark:text-blue-200/80 leading-relaxed">
                        High scarcity detected in Engineering for Week 2. AI suggests rejecting non-urgent pending time-off requests for backend engineers during this period, or temporarily pulling resources from the secondary talent pool.
                    </p>
                </div>
            </div>
        </div>
    );
}
