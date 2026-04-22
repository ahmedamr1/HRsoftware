"use client"

import { Building2, Plus, Search, Sparkles, Brain, Users, TrendingDown, ShieldAlert, Activity, Calendar as CalendarIcon, Zap, ArrowUpRight, CheckCircle2, Info, Clock, Trophy, MessageSquare, ClipboardList, TrendingUp } from "lucide-react";
import { Button as UIButton } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth-context";

export default function Dashboard() {
  const { userRole, logout } = useAuth();
  const isAdmin = userRole === "admin";

  const [tasks, setTasks] = useState([
    { id: 1, text: isAdmin ? "Approve Q1 Budget" : "Submit Expense Report", category: isAdmin ? "Finance" : "Admin", priority: "High" },
    { id: 2, text: isAdmin ? "Sign Employment Contract" : "Update Project Docs", category: isAdmin ? "Legal" : "Engineering", priority: "Medium" },
    { id: 3, text: isAdmin ? "Review Engineering Performance" : "Finalize Sprint Tasks", category: isAdmin ? "Talent" : "Development", priority: "High" },
  ]);

  const [searchMode, setSearchMode] = useState<"standard" | "ai">("standard");
  const [aiAnalysisVisible, setAiAnalysisVisible] = useState(true);

  const handleAction = (msg: string) => {
    toast.success(msg);
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
    toast.success("Task completed!");
  };

  const adminStats = [
    { title: "Total Talent", value: "124", change: "+12%", icon: Users, color: "blue" },
    { title: "Open Roles", value: "8", change: "+2", icon: Brain, color: "emerald" },
    { title: "Active Leaves", value: "15", change: "4 today", icon: CalendarIcon, color: "orange" },
    { title: "Turnover", value: "2.4%", change: "-0.5%", icon: Activity, color: "red" },
    { title: "Satisfaction", value: "4.8", change: "+0.1", icon: Zap, color: "yellow" },
    { title: "Growth Index", value: "4.7", change: "+0.2", icon: ArrowUpRight, color: "purple" },
  ];

  const employeeStats = [
    { title: "Hours This Week", value: "38.5", change: "On Track", icon: Clock, color: "blue" },
    { title: "Pending Tasks", value: "3", change: "2 Due Today", icon: CheckCircle2, color: "rose" },
    { title: "Remaining PTO", value: "14 Days", change: "Expiring soon", icon: CalendarIcon, color: "orange" },
    { title: "Performance", value: "4.9", change: "Top 5%", icon: Trophy, color: "yellow" },
    { title: "Current Sprint", value: "Sync Phase", change: "82%", icon: Zap, color: "purple" },
    { title: "Next 1-on-1", value: "Tomorrow", change: "2:00 PM", icon: MessageSquare, color: "emerald" },
  ];

  const activeStats = isAdmin ? adminStats : employeeStats;

  return (
    <div className="space-y-6 text-left pb-10">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-3xl font-black tracking-tighter text-black dark:text-zinc-50">
              {isAdmin ? "Operational Hub" : "Personal Workspace"}
            </h2>
            <Badge className="bg-blue-600 text-white border-none text-[10px] font-black uppercase tracking-widest px-2 py-0.5">AI Native</Badge>
          </div>
          <p className="text-zinc-500 dark:text-zinc-400">
            {isAdmin
              ? "Strategic oversight powered by continuous intelligence."
              : "Your personal performance and growth telemetry."}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative group flex-1 md:flex-none">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {searchMode === "ai" ? <Sparkles size={14} className="text-blue-500 animate-pulse" /> : <Search size={14} className="text-zinc-400" />}
            </div>
            <input
              placeholder={searchMode === "ai" ? "Ask AI: 'When is my next leave?'" : "Search files..."}
              className={`pl-10 pr-20 py-2 text-xs rounded-full border transition-all w-full md:w-80 outline-none ${searchMode === "ai" ? 'border-blue-500/50 bg-blue-50/20 dark:bg-blue-900/10 ring-2 ring-blue-500/20' : 'border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md'}`}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <UIButton
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchMode(searchMode === "standard" ? "ai" : "standard");
                  toast.info(searchMode === "standard" ? "AI Search Mode Enabled" : "Standard Search Enabled");
                }}
                className={`h-7 px-2 rounded-full text-[9px] font-black uppercase tracking-tighter ${searchMode === "ai" ? 'bg-blue-600 text-white hover:bg-blue-700' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
              >
                {searchMode === "ai" ? "AI Mode" : "Ask AI"}
              </UIButton>
            </div>
          </div>
          {isAdmin && (
            <UIButton
              onClick={() => handleAction("Opening new hire portal...")}
              className="bg-zinc-950 dark:bg-zinc-50 text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-xl border-none px-5 text-xs font-bold uppercase tracking-widest h-10 transition-all active:scale-95"
            >
              <Plus className="mr-2 h-3 w-3" /> New Hire
            </UIButton>
          )}
        </div>
      </div>

      <AnimatePresence>
        {aiAnalysisVisible && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <Card className="bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5 border-blue-500/20 dark:border-blue-500/10 shadow-inner relative">
              <div className="absolute top-2 right-2 flex gap-2">
                <UIButton variant="ghost" size="icon" className="h-6 w-6 text-zinc-400 hover:text-blue-500" onClick={() => handleAction("Refreshing insights...")}>
                  <Activity size={12} />
                </UIButton>
                <UIButton variant="ghost" size="icon" className="h-6 w-6 text-zinc-400 hover:text-rose-500" onClick={() => setAiAnalysisVisible(false)}>
                  <Info size={12} />
                </UIButton>
              </div>
              <CardContent className="p-4 flex items-start gap-4">
                <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shrink-0">
                  <Brain size={20} />
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-black tracking-tight text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                      {isAdmin ? "Morning Intelligence Brief" : "Personal Career Intelligence"}
                    </h3>
                    <Badge variant="outline" className="text-[8px] border-blue-200 dark:border-blue-800 text-blue-500 py-0 h-4">Predictive</Badge>
                  </div>
                  {isAdmin ? (
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-black dark:text-zinc-50">
                          <Users size={12} className="text-zinc-400" /> Capacity Alert
                        </div>
                        <p className="text-[11px] text-zinc-500 leading-tight italic">"Engineering capacity is down to 68% next Friday. Consider moving the UI Review to Wednesday."</p>
                      </div>
                      <div className="space-y-1 border-x border-zinc-100 dark:border-zinc-800 px-4">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-black dark:text-zinc-50">
                          <TrendingDown size={12} className="text-emerald-500" /> Retention Win
                        </div>
                        <p className="text-[11px] text-zinc-500 leading-tight italic">"Sentiment in Design team improved by 14% after the new equity rollout. Risk levels are now 'Low'."</p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-black dark:text-zinc-50">
                          <ShieldAlert size={12} className="text-rose-500" /> Compliance Gap
                        </div>
                        <p className="text-[11px] text-zinc-500 leading-tight italic">"3 Senior Engineers have expired certifications. AI generated re-certification tasks for them."</p>
                      </div>
                    </div>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-black dark:text-zinc-50">
                          <Zap size={12} className="text-blue-500" /> Skill Catalyst
                        </div>
                        <p className="text-[11px] text-zinc-500 leading-tight italic">"Your Python expertise matches 92% of upcoming Senior Dev roles. We've added a 'Design Patterns' course to your growth track."</p>
                      </div>
                      <div className="space-y-1 border-x border-zinc-100 dark:border-zinc-800 px-4">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-black dark:text-zinc-50">
                          <Trophy size={12} className="text-amber-500" /> High Velocity
                        </div>
                        <p className="text-[11px] text-zinc-500 leading-tight italic">"You closed 12 tickets this sprint, 20% above your average. Great momentum heading into the quarterly review."</p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-black dark:text-zinc-50">
                          <CalendarIcon size={12} className="text-indigo-500" /> Wellbeing Guard
                        </div>
                        <p className="text-[11px] text-zinc-500 leading-tight italic">"You haven't taken a break in 4 hours. AI recommends a 10m 'Focus Rest' now to maintain peak performance."</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        {activeStats.map((stat, i) => (
          <Card key={i} className="group relative border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md shadow-sm hover:shadow-md transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3">
              <CardTitle className="text-[10px] font-black tracking-widest text-zinc-500 uppercase">{stat.title}</CardTitle>
              <stat.icon size={12} className="text-zinc-400" />
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="text-xl font-black text-black dark:text-zinc-50 tracking-tighter">{stat.value}</div>
              <div className="flex items-center gap-1 mt-1">
                <span className={`text-[10px] font-bold ${stat.change.startsWith('+') || stat.change.includes('On') || stat.change.includes('Top') ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {stat.change}
                </span>
                <Sparkles size={10} className="text-blue-500/40 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Left Column: Calendar & Priority Actions */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden">
            <div className="bg-blue-600 h-1 w-full" />
            <CardHeader className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex flex-row items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 font-black uppercase text-sm tracking-tighter text-black dark:text-zinc-50">
                  <CalendarIcon size={14} className="text-blue-600" /> {isAdmin ? "Smart Calendar" : "My Schedule"}
                </div>
                <CardDescription className="text-[10px]">AI-optimized scheduling & events.</CardDescription>
              </div>
              <Badge variant="outline" className="text-[10px] font-black tracking-widest bg-zinc-50 dark:bg-zinc-900 border-none">FEB 2024</Badge>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {[
                { date: "12", day: "MON", event: isAdmin ? "Project Synapse Review" : "Frontend Sync", type: "Meeting", color: "blue", ai: "Conflict detected" },
                { date: "14", day: "WED", event: isAdmin ? "Alex Riva Onboarding" : "Mentorship Hour", type: "Session", color: "emerald", ai: "No conflicts" },
                { date: "15", day: "THU", event: isAdmin ? "Engineering All-hands" : "Sprint Retrospective", type: "Townhall", color: "purple", ai: "High importance" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-xl border border-transparent hover:border-zinc-100 dark:hover:border-zinc-800 transition-all cursor-pointer group">
                  <div className={`h-10 w-10 rounded-xl bg-${item.color}-500/10 flex flex-col items-center justify-center border border-${item.color}-500/10`}>
                    <span className={`text-[10px] font-black text-${item.color}-600 dark:text-${item.color}-400 leading-none`}>{item.day}</span>
                    <span className={`text-sm font-black text-${item.color}-600 dark:text-${item.color}-400`}>{item.date}</span>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-black text-black dark:text-zinc-50 truncate">{item.event}</p>
                      {item.ai.includes("Conflict") && <Sparkles size={10} className="text-amber-500" />}
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-[10px] text-zinc-500 uppercase font-medium">{item.type}</p>
                      <span className="text-[8px] text-blue-500/70 font-bold italic">{item.ai}</span>
                    </div>
                  </div>
                </div>
              ))}
              <UIButton variant="ghost" className="w-full text-[10px] h-auto p-0 font-black uppercase tracking-widest text-blue-600 dark:text-blue-400" onClick={() => handleAction("AI resolving schedule conflicts...")}>
                Auto-resolve Conflicts →
              </UIButton>
            </CardContent>
          </Card>

          <Card className="bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-xl">
            <CardHeader className="p-4 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-1.5">
                <CardTitle className="text-sm font-black uppercase tracking-tighter text-black dark:text-zinc-50">AI Suggested Tasks</CardTitle>
                <Sparkles size={12} className="text-blue-500" />
              </div>
              <CardDescription className="text-[10px]">Intelligent task prioritization.</CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 rounded-xl bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 group transition-all hover:scale-[1.02]">
                  <div className="flex items-center gap-3">
                    <div
                      onClick={() => removeTask(task.id)}
                      className="h-5 w-5 rounded-full border-2 border-zinc-200 dark:border-zinc-800 flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors"
                    >
                      <div className="h-2 w-2 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-black dark:text-zinc-50">{task.text}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={`text-[8px] font-black h-4 px-1 ${task.priority === 'High' ? 'bg-rose-500/10 text-rose-500' : 'bg-orange-500/10 text-orange-500'} border-none uppercase`}>
                          {task.priority}
                        </Badge>
                        <span className="text-[8px] text-zinc-400 font-bold uppercase tracking-widest">{task.category}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Center/Right Column: Contextual Insights */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Contextual History/Activity */}
            <Card className="bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden h-full">
              <CardHeader className="p-4 bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800">
                <CardTitle className="text-sm font-black uppercase tracking-tighter text-black dark:text-zinc-50">
                  {isAdmin ? "Pulse Audit" : "My Recognition"}
                </CardTitle>
                <CardDescription className="text-[10px]">
                  {isAdmin ? "Real-time system events." : "Achievements and feedback."}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {isAdmin ? (
                    [
                      { user: "Sarah Smith", action: "approved leave for", target: "John Doe", time: "2m ago", icon: CheckCircle2 },
                      { user: "System", action: "generated payroll for", target: "February", time: "1h ago", icon: Zap },
                      { user: "HR Bot", action: "screened 12 new", target: "candidates", time: "3h ago", icon: Brain },
                      { user: "Jessica T.", action: "updated", target: "Org Chart", time: "5h ago", icon: Activity },
                    ].map((activity, i) => (
                      <div key={i} className="flex items-center justify-between p-4 hover:bg-zinc-100/30 dark:hover:bg-zinc-800/30 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                            <activity.icon size={14} className="text-blue-500" />
                          </div>
                          <div>
                            <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-tight">
                              <span className="font-black text-black dark:text-zinc-50">{activity.user}</span> {activity.action} <span className="font-black text-black dark:text-zinc-50">{activity.target}</span>
                            </p>
                            <p className="text-[9px] font-bold text-zinc-400 uppercase mt-0.5">{activity.time}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    [
                      { user: "Marcus", action: "endorsed your", target: "React skills", time: "1d ago", icon: Trophy },
                      { user: "System", action: "confirmed your", target: "Bonus payment", time: "2d ago", icon: Zap },
                      { user: "HR Bot", action: "updated your", target: "Level 4 certification", time: "3d ago", icon: ShieldAlert },
                      { user: "Jessica T.", action: "gave feedback on", target: "UI Refactor", time: "4d ago", icon: MessageSquare },
                    ].map((activity, i) => (
                      <div key={i} className="flex items-center justify-between p-4 hover:bg-zinc-100/30 dark:hover:bg-zinc-800/30 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                            <activity.icon size={14} className="text-emerald-500" />
                          </div>
                          <div>
                            <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-tight">
                              <span className="font-black text-black dark:text-zinc-50">{activity.user}</span> {activity.action} <span className="font-black text-black dark:text-zinc-50">{activity.target}</span>
                            </p>
                            <p className="text-[9px] font-bold text-zinc-400 uppercase mt-0.5">{activity.time}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <UIButton variant="ghost" className="w-full text-[10px] font-black uppercase tracking-widest text-zinc-400 h-10 hover:text-blue-500">
                  {isAdmin ? "Full AI Audit Trace" : "View All Successes"}
                </UIButton>
              </CardContent>
            </Card>

            {/* Contextual Progress/Pulse */}
            <Card className="bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-xl h-full">
              <CardHeader className="p-4 bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800">
                <CardTitle className="text-sm font-black uppercase tracking-tighter text-black dark:text-zinc-50">
                  {isAdmin ? "Company Sentiment" : "Skill Proficiency"}
                </CardTitle>
                <CardDescription className="text-[10px]">
                  {isAdmin ? "Real-time engagement analysis." : "AI analysis of your talent stack."}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <div className={`text-center ${isAdmin ? 'bg-emerald-500/10' : 'bg-blue-500/10'} p-2 rounded-2xl flex-1 mr-2`}>
                    <p className={`text-[10px] font-black uppercase ${isAdmin ? 'text-emerald-600' : 'text-blue-600'}`}>
                      {isAdmin ? "Health" : "Top Skill"}
                    </p>
                    <p className={`text-lg font-black ${isAdmin ? 'text-emerald-600' : 'text-blue-600'} tracking-tighter`}>
                      {isAdmin ? "Excellent" : "React/TS"}
                    </p>
                  </div>
                  <div className={`text-center ${isAdmin ? 'bg-blue-500/10' : 'bg-emerald-500/10'} p-2 rounded-2xl flex-1 ml-2`}>
                    <p className={`text-[10px] font-black uppercase ${isAdmin ? 'text-blue-600' : 'text-emerald-600'}`}>
                      {isAdmin ? "Engagement" : "Growth"}
                    </p>
                    <p className={`text-lg font-black ${isAdmin ? 'text-blue-600' : 'text-emerald-600'} tracking-tighter`}>
                      {isAdmin ? "84%" : "+18%"}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {isAdmin ? (
                    [
                      { name: "Maria Garcia", milestone: "Retention Risk", sub: "Very Low", icon: ShieldAlert, color: "emerald" },
                      { name: "Engineering", milestone: "Burnout Risk", sub: "Potential", icon: Activity, color: "amber" },
                      { name: "Design Team", milestone: "Collaboration", sub: "Peak Efficiency", icon: Zap, color: "blue" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 group cursor-pointer border-b border-zinc-50 dark:border-zinc-900 pb-2 last:border-none">
                        <div className={`h-8 w-8 rounded-xl bg-${item.color}-500/10 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <item.icon size={14} className={`text-${item.color}-500`} />
                        </div>
                        <div>
                          <p className="text-[11px] font-black text-black dark:text-zinc-50">{item.name}</p>
                          <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-tighter">{item.milestone} • {item.sub}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    [
                      { name: "UI/UX Architecture", milestone: "Advanced", sub: "Mastery Level", icon: Sparkles, color: "purple" },
                      { name: "Cloud Strategy", milestone: "Intermediate", sub: "Learning Path", icon: Brain, color: "blue" },
                      { name: "Team Leadership", milestone: "Emerging", sub: "Next Growth Milestone", icon: Users, color: "orange" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 group cursor-pointer border-b border-zinc-50 dark:border-zinc-900 pb-2 last:border-none">
                        <div className={`h-8 w-8 rounded-xl bg-${item.color}-500/10 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <item.icon size={14} className={`text-${item.color}-500`} />
                        </div>
                        <div>
                          <p className="text-[11px] font-black text-black dark:text-zinc-50">{item.name}</p>
                          <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-tighter">{item.milestone} • {item.sub}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-zinc-950 dark:bg-white text-white dark:text-black shadow-2xl overflow-hidden group">
            <CardHeader className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-black tracking-tighter uppercase">
                    {isAdmin ? "AI Talent Projection" : "Performance Velocity"}
                  </CardTitle>
                  <CardDescription className="text-zinc-400 dark:text-zinc-500 text-[10px]">
                    {isAdmin ? "Projected headcount vs. Hiring velocity." : "Your efficiency vs. quarterly benchmarks."}
                  </CardDescription>
                </div>
                <Sparkles className="text-blue-500 animate-pulse" />
              </div>
            </CardHeader>
            <CardContent className="h-32 flex items-end gap-1 px-4 pb-4">
              {[40, 60, 45, 90, 65, 80, 50, 85, 95, 70, 75, 100].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-blue-600 to-indigo-400 rounded-t-sm transition-all duration-500 group-hover:opacity-80 relative"
                  style={{ height: `${h}%` }}
                >
                  {i === 11 && <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] font-black bg-blue-600 text-white px-1 rounded shadow-lg">TARGET</div>}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
