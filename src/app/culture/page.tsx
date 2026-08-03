"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
    Heart, TrendingUp, Users, MessageSquare, 
    Smile, Star, Zap, Brain, PieChart, BarChart2,
    Calendar, Quote, Sparkles, Target, ArrowUpRight,
    CheckCircle2, AlertCircle, Send, PlusCircle, X
} from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth-context";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function CulturePulsePage() {
    const { userRole } = useAuth();
    const isAdmin = userRole === "admin";
    const [selectedTab, setSelectedTab] = useState(isAdmin ? "overview" : "surveys");
    const [isSurveyModalOpen, setIsSurveyModalOpen] = useState(false);
    const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
    const [surveyStep, setSurveyStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Template Builder State
    const [templateData, setTemplateData] = useState({
        title: "",
        description: "",
        launchDate: "",
        deadline: "",
        questions: [
            { id: 1, text: "", type: "rating", isMandatory: true }
        ]
    });

    const [surveyAnswers, setSurveyAnswers] = useState({
        satisfaction: "",
        communication: "",
        recognition: "",
        environment: "",
        feedback: ""
    });

    const engagementData = [
        { label: "Participation", value: 88, change: "+4%" },
        { label: "Satisfaction", value: 4.2, change: "+0.3" },
        { label: "eNPS", value: 42, change: "+12" },
    ];

    const surveyResults = [
        { category: "Work-Life Balance", score: 85, status: "Healthy" },
        { category: "Manager Support", score: 78, status: "Stable" },
        { category: "Growth Opportunities", score: 62, status: "Needs Attention" },
        { category: "Company Alignment", score: 91, status: "Excellent" },
    ];

    const oneOnOneInsights = [
        { 
            date: "May 12, 2026", 
            employee: "Alex Rivera", 
            insight: "Highly motivated by recent project ownership. Needs more clarity on promotion path.",
            sentiment: "Positive"
        },
        { 
            date: "May 10, 2026", 
            employee: "Sarah Chen", 
            insight: "Expressed burnout concerns due to overtime. Suggesting workload redistribution.",
            sentiment: "Warning"
        },
    ];

    const handleSurveySubmit = () => {
        if (!surveyAnswers.satisfaction || !surveyAnswers.communication || !surveyAnswers.recognition || !surveyAnswers.environment) {
            toast.error("Please answer all required questions.");
            return;
        }
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSurveyModalOpen(false);
            toast.success("Thank you! Your survey response has been submitted.", {
                icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            });
        }, 1500);
    };

    const addQuestion = () => {
        setTemplateData({
            ...templateData,
            questions: [
                ...templateData.questions,
                { id: Date.now(), text: "", type: "rating", isMandatory: true }
            ]
        });
    };

    const removeQuestion = (id: number) => {
        if (templateData.questions.length === 1) return;
        setTemplateData({
            ...templateData,
            questions: templateData.questions.filter(q => q.id !== id)
        });
    };

    const updateQuestion = (id: number, field: string, value: any) => {
        setTemplateData({
            ...templateData,
            questions: templateData.questions.map(q => q.id === id ? { ...q, [field]: value } : q)
        });
    };

    const handleSaveTemplate = () => {
        if (!templateData.title || templateData.questions.some(q => !q.text)) {
            toast.error("Please fill in the title and all question texts.");
            return;
        }
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsTemplateModalOpen(false);
            toast.success("Survey Template created and scheduled successfully!", {
                icon: <Sparkles className="h-4 w-4 text-blue-500" />
            });
        }, 1500);
    };

    const recommendations = [
        { title: "Team Building Day", type: "Culture", impact: "High", description: "Low social scores in Marketing suggest a need for non-work interaction." },
        { title: "Recognition Program", type: "Engagement", impact: "Medium", description: "Recognition scores are dipping. Implement a peer-to-peer kudos system." },
        { title: "Manager Training", type: "Support", impact: "High", description: "Some teams report lower support scores. Focus on empathetic leadership coaching." }
    ];

    if (isTemplateModalOpen) {
        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="rounded-full bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200"
                            onClick={() => setIsTemplateModalOpen(false)}
                        >
                            <ArrowUpRight className="rotate-[225deg]" />
                        </Button>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Badge className="bg-blue-500/10 text-blue-600 border-none font-bold text-[10px]">CREATOR STUDIO</Badge>
                                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Culture & Pulse</span>
                            </div>
                            <h1 className="text-3xl font-black tracking-tight">Create Survey Template</h1>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="ghost" className="rounded-full font-bold" onClick={() => setIsTemplateModalOpen(false)}>Discard</Button>
                        <Button 
                            className="bg-zinc-950 text-white hover:bg-black dark:bg-white dark:text-black dark:hover:bg-zinc-200 rounded-full font-black px-10 h-12 shadow-xl"
                            onClick={handleSaveTemplate}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Creating..." : "Save & Schedule Template"} <Sparkles size={16} className="ml-2 text-blue-400" />
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Questions List */}
                        <Card className="border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl shadow-xl overflow-hidden">
                            <div className="p-8 border-b border-zinc-100 dark:border-zinc-900 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50">
                                <div>
                                    <h4 className="font-black text-xl">Survey Questions</h4>
                                    <p className="text-xs text-zinc-500 font-medium mt-1">Design the pulse points for your team.</p>
                                </div>
                                <Button variant="outline" size="sm" className="rounded-full font-bold border-zinc-200 bg-white dark:bg-zinc-900" onClick={addQuestion}>
                                    <PlusCircle size={14} className="mr-2 text-blue-600" /> Add Question
                                </Button>
                            </div>
                            <CardContent className="p-8 space-y-6">
                                {templateData.questions.map((q, index) => (
                                    <div key={q.id} className="p-6 border border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-900/40 rounded-2xl relative group transition-all hover:shadow-md">
                                        <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className="absolute top-4 right-4 h-8 w-8 text-zinc-400 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={() => removeQuestion(q.id)}
                                        >
                                            <X size={14} />
                                        </Button>
                                        
                                        <div className="grid gap-6">
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2">
                                                    <span className="h-6 w-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-black">{index + 1}</span>
                                                    <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Question Content</Label>
                                                </div>
                                                <Input 
                                                    placeholder="e.g. How satisfied are you with the current team collaboration?" 
                                                    className="font-bold text-lg border-none bg-zinc-50 dark:bg-zinc-950 shadow-inner rounded-xl h-14 px-6"
                                                    value={q.text}
                                                    onChange={(e) => updateQuestion(q.id, 'text', e.target.value)}
                                                />
                                            </div>

                                            <div className="flex flex-wrap items-center gap-8 pt-2">
                                                <div className="space-y-2">
                                                    <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Question Type</Label>
                                                    <div className="flex p-1 bg-zinc-100 dark:bg-zinc-900 rounded-xl w-fit">
                                                        <Button 
                                                            variant="ghost" 
                                                            size="sm" 
                                                            className={cn("h-8 px-4 text-[10px] font-black rounded-lg transition-all", q.type === 'rating' ? "bg-white dark:bg-zinc-800 shadow-sm text-blue-600" : "text-zinc-500")}
                                                            onClick={() => updateQuestion(q.id, 'type', 'rating')}
                                                        >
                                                            GRADING (1-5)
                                                        </Button>
                                                        <Button 
                                                            variant="ghost" 
                                                            size="sm" 
                                                            className={cn("h-8 px-4 text-[10px] font-black rounded-lg transition-all", q.type === 'text' ? "bg-white dark:bg-zinc-800 shadow-sm text-blue-600" : "text-zinc-500")}
                                                            onClick={() => updateQuestion(q.id, 'type', 'text')}
                                                        >
                                                            OPEN TEXT
                                                        </Button>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Requirement</Label>
                                                    <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl w-fit">
                                                        <Button 
                                                            variant="ghost" 
                                                            size="sm" 
                                                            className={cn("h-8 px-4 text-[10px] font-black rounded-lg transition-all", q.isMandatory ? "bg-blue-600 text-white shadow-sm" : "text-zinc-500")}
                                                            onClick={() => updateQuestion(q.id, 'isMandatory', true)}
                                                        >
                                                            MANDATORY
                                                        </Button>
                                                        <Button 
                                                            variant="ghost" 
                                                            size="sm" 
                                                            className={cn("h-8 px-4 text-[10px] font-black rounded-lg transition-all", !q.isMandatory ? "bg-white dark:bg-zinc-800 shadow-sm text-zinc-900 dark:text-zinc-50" : "text-zinc-500")}
                                                            onClick={() => updateQuestion(q.id, 'isMandatory', false)}
                                                        >
                                                            OPTIONAL
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        {/* Settings Panel */}
                        <Card className="border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl shadow-xl overflow-hidden sticky top-24">
                            <CardHeader className="bg-zinc-900 text-white p-6">
                                <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                                    <Target className="text-blue-400" /> Campaign Settings
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Survey Title</Label>
                                    <Input 
                                        placeholder="e.g. Q3 Growth & Innovation Pulse" 
                                        className="rounded-xl border-zinc-200 dark:border-zinc-800"
                                        value={templateData.title}
                                        onChange={(e) => setTemplateData({...templateData, title: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Launch Date</Label>
                                    <Input 
                                        type="date" 
                                        className="rounded-xl border-zinc-200 dark:border-zinc-800"
                                        value={templateData.launchDate}
                                        onChange={(e) => setTemplateData({...templateData, launchDate: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Deadline</Label>
                                    <Input 
                                        type="date" 
                                        className="rounded-xl border-zinc-200 dark:border-zinc-800"
                                        value={templateData.deadline}
                                        onChange={(e) => setTemplateData({...templateData, deadline: e.target.value})}
                                    />
                                </div>
                                <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 space-y-2">
                                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Pro Tip</p>
                                    <p className="text-[10px] text-zinc-500 leading-relaxed">
                                        Surveys launched on Tuesdays generally see 20% higher participation rates.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 text-left">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8 text-white shadow-2xl">
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-white/20 backdrop-blur-md rounded-xl">
                            <Heart className="h-6 w-6 text-white" fill="white" />
                        </div>
                        <Badge className="bg-white/20 text-white border-none font-bold">Q2 LIVE PULSE</Badge>
                    </div>
                    <h1 className="text-4xl font-black tracking-tight mb-2">Culture & Pulse</h1>
                    <p className="text-indigo-100 max-w-xl font-medium">
                        Real-time intelligence on your organization's health, happiness, and engagement levels.
                    </p>
                    {isAdmin && (
                        <Button 
                            className="mt-6 bg-white text-indigo-600 hover:bg-indigo-50 font-black rounded-full px-8 py-6 h-auto shadow-xl shadow-indigo-900/20"
                            onClick={() => setIsTemplateModalOpen(true)}
                        >
                            <PlusCircle className="mr-2" /> Create New Survey Template
                        </Button>
                    )}
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 p-12 opacity-20 pointer-events-none">
                    <Brain size={240} className="text-white" />
                </div>
            </div>

            {/* High-Level Stats - Admin Only */}
            {isAdmin && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {engagementData.map((stat, i) => (
                        <Card key={i} className="bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden group">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <p className="text-xs font-black uppercase tracking-widest text-zinc-500">{stat.label}</p>
                                    <Badge className="bg-emerald-500/10 text-emerald-600 border-none flex items-center gap-1 font-bold">
                                        {stat.change} <TrendingUp size={10} />
                                    </Badge>
                                </div>
                                <div className="flex items-end gap-2">
                                    <span className="text-4xl font-black tracking-tighter">{stat.value}{stat.label === 'Satisfaction' ? '/5' : (stat.label === 'eNPS' ? '' : '%')}</span>
                                    <div className="h-2 w-24 bg-zinc-100 dark:bg-zinc-800 rounded-full mb-2 overflow-hidden">
                                        <div 
                                            className="h-full bg-indigo-500 transition-all duration-1000" 
                                            style={{ width: `${stat.label === 'Satisfaction' ? (stat.value / 5) * 100 : (stat.label === 'eNPS' ? stat.value : stat.value)}%` }} 
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            <Tabs defaultValue="overview" className="w-full" onValueChange={setSelectedTab}>
                <TabsList className="bg-zinc-100/50 dark:bg-zinc-900/50 p-1 rounded-2xl border border-zinc-200 dark:border-zinc-800 mb-8 w-fit">
                    {isAdmin && <TabsTrigger value="overview" className="rounded-xl px-6 font-bold">Analytics</TabsTrigger>}
                    <TabsTrigger value="surveys" className="rounded-xl px-6 font-bold">{isAdmin ? "Surveys" : "My Participation"}</TabsTrigger>
                    {isAdmin && <TabsTrigger value="feedback" className="rounded-xl px-6 font-bold">1:1 Feedback</TabsTrigger>}
                    <TabsTrigger value="recognition" className="rounded-xl px-6 font-bold">Recognition</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                    {isAdmin && (
                        <Card className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-2xl border-none overflow-hidden relative">
                            <CardContent className="p-8">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-black">Admin Recommendation Engine</h3>
                                        <p className="text-blue-100 text-sm max-w-lg">Our AI has analyzed the latest 240 responses. Here are your priority actions for this month.</p>
                                    </div>
                                    <Button className="bg-white text-blue-700 hover:bg-zinc-100 font-bold rounded-full">
                                        Export Full Audit
                                    </Button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 relative z-10">
                                    {recommendations.map((rec, i) => (
                                        <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 group hover:bg-white/20 transition-all">
                                            <div className="flex items-center justify-between mb-2">
                                                <Badge className="bg-white/20 text-white border-none text-[10px]">{rec.type}</Badge>
                                                <span className="text-[10px] font-black uppercase text-blue-200">Impact: {rec.impact}</span>
                                            </div>
                                            <h5 className="font-bold text-sm mb-1">{rec.title}</h5>
                                            <p className="text-[10px] text-blue-100 leading-relaxed">{rec.description}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="absolute -bottom-10 -right-10 opacity-10 pointer-events-none">
                                    <Sparkles size={200} />
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 shadow-xl">
                            <CardHeader>
                                <CardTitle className="text-lg font-black flex items-center gap-2">
                                    <Sparkles className="text-amber-500 h-5 w-5" /> Culture AI Insights
                                </CardTitle>
                                <CardDescription>Predictive analysis based on multi-channel data.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
                                    <h4 className="font-bold text-sm text-indigo-600 mb-1 flex items-center gap-2">
                                        Collaboration Peak <ArrowUpRight size={14} />
                                    </h4>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                        Cross-departmental collaboration is at an all-time high in the Engineering & Design pods. Synergy score is up by 22% this month.
                                    </p>
                                </div>
                                <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/10 relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-rose-500" />
                                    <h4 className="font-bold text-sm text-rose-600 mb-1 flex items-center gap-2">
                                        Burnout Risk Alert <Zap size={14} />
                                    </h4>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                        Detected higher-than-average late-night activity in Marketing. Suggesting a wellness day or priority reassessment.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 shadow-xl">
                            <CardHeader>
                                <CardTitle className="text-lg font-black flex items-center gap-2">
                                    <PieChart className="text-blue-500 h-5 w-5" /> Engagement Breakdown
                                </CardTitle>
                                <CardDescription>Key drivers of satisfaction across the team.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-5">
                                {surveyResults.map((item, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex justify-between text-xs font-bold">
                                            <span className="text-zinc-500 uppercase tracking-widest">{item.category}</span>
                                            <span className={item.status === 'Needs Attention' ? 'text-rose-500' : 'text-emerald-500'}>{item.score}%</span>
                                        </div>
                                        <Progress value={item.score} className={`h-1.5 ${item.status === 'Needs Attention' ? 'bg-rose-100 dark:bg-rose-900/20' : 'bg-emerald-100 dark:bg-emerald-900/20'}`} />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="surveys" className="space-y-6">
                    {!isAdmin && (
                        <Card className="bg-blue-600 text-white shadow-2xl border-none mb-6 relative overflow-hidden">
                            <CardContent className="p-8 flex items-center justify-between gap-6 relative z-10">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <AlertCircle className="h-5 w-5" />
                                        <h3 className="text-xl font-black tracking-tight">Pending Survey</h3>
                                    </div>
                                    <p className="text-blue-100 text-sm max-w-lg">Your voice matters. Please take 2 minutes to complete the May Satisfaction Pulse.</p>
                                </div>
                                <Button className="bg-white text-blue-600 hover:bg-zinc-100 font-black rounded-full px-8" onClick={() => setIsSurveyModalOpen(true)}>
                                    Start Now
                                </Button>
                            </CardContent>
                            <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
                                <MessageSquare size={120} />
                            </div>
                        </Card>
                    )}

                    <div className="grid gap-6 md:grid-cols-3">
                        {isAdmin ? (
                            <Card className="bg-zinc-950 text-white shadow-2xl overflow-hidden relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-transparent pointer-events-none" />
                                <CardHeader>
                                    <Badge className="w-fit mb-2 bg-indigo-500 text-white border-none">ACTIVE</Badge>
                                    <CardTitle className="font-black text-xl">May Satisfaction Pulse</CardTitle>
                                    <CardDescription className="text-zinc-400">Ends in 3 days • 240 responses</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button 
                                        className="w-full bg-white text-zinc-950 hover:bg-zinc-100 font-black rounded-full"
                                        onClick={() => setIsTemplateModalOpen(true)}
                                    >
                                        Create Template
                                    </Button>
                                </CardContent>
                            </Card>
                        ) : (
                            <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden">
                                <CardHeader>
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle2 className="text-emerald-500 h-4 w-4" />
                                        <Badge variant="outline" className="text-[10px] font-bold">COMPLETED</Badge>
                                    </div>
                                    <CardTitle className="font-black text-lg">April Wellness Check</CardTitle>
                                    <CardDescription>Submitted on April 15, 2026</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-xs text-zinc-500">Your feedback has been anonymized and included in the April culture report.</p>
                                </CardContent>
                            </Card>
                        )}

                        {isAdmin && (
                            <Card className="bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 shadow-xl border-dashed border-2 flex flex-col items-center justify-center p-6 text-center">
                                <div className="h-12 w-12 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mb-4 text-zinc-400">
                                    <PlusCircle size={24} />
                                </div>
                                <h4 className="font-bold mb-1">New Survey</h4>
                                <p className="text-xs text-zinc-500 mb-4">Create a custom poll or pulse check.</p>
                                <Button variant="outline" className="rounded-xl font-bold text-xs" onClick={() => setIsTemplateModalOpen(true)}>
                                    Create Template
                                </Button>
                            </Card>
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="feedback" className="space-y-6">
                    <Card className="bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 shadow-xl">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-lg font-black flex items-center gap-2">
                                    <Quote className="text-indigo-500 h-5 w-5" /> 1:1 Intelligence
                                </CardTitle>
                                <CardDescription>Key takeaways from HR and Manager syncs.</CardDescription>
                            </div>
                            <Button size="sm" variant="outline" className="rounded-full border-zinc-200 dark:border-zinc-800 font-bold">
                                <Calendar size={14} className="mr-2" /> Log Sync
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {oneOnOneInsights.map((log, i) => (
                                <div key={i} className="p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:border-indigo-500/30 transition-all group">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8">
                                                <AvatarFallback className="bg-zinc-100 text-[10px] font-black">{log.employee[0]}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h5 className="text-sm font-black">{log.employee}</h5>
                                                <p className="text-[10px] text-zinc-400">{log.date}</p>
                                            </div>
                                        </div>
                                        <Badge className={`border-none font-black text-[9px] ${log.sentiment === 'Positive' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'}`}>
                                            {log.sentiment.toUpperCase()}
                                        </Badge>
                                    </div>
                                    <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed italic">
                                        "{log.insight}"
                                    </p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="recognition" className="space-y-6">
                    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                        <div className="h-20 w-20 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center">
                            <Star size={40} fill="currentColor" />
                        </div>
                        <h3 className="text-2xl font-black tracking-tighter">Wall of Appreciation</h3>
                        <p className="text-zinc-500 max-w-sm text-sm">A dedicated space for team members to celebrate each other's wins and core values.</p>
                        <Button className="bg-amber-500 hover:bg-amber-600 text-white font-black rounded-full px-8">
                            Give Shoutout
                        </Button>
                    </div>
                </TabsContent>
            </Tabs>

            {/* Survey Modal */}
            <Dialog open={isSurveyModalOpen} onOpenChange={setIsSurveyModalOpen}>
                <DialogContent className="max-w-2xl bg-white dark:bg-zinc-950 p-0 overflow-hidden rounded-3xl border-none shadow-2xl">
                    <div className="bg-blue-600 p-8 text-white">
                        <DialogHeader className="relative">
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                className="absolute -top-4 -right-4 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                                onClick={() => setIsSurveyModalOpen(false)}
                            >
                                <X size={20} />
                            </Button>
                            <div className="flex items-center gap-3 mb-2">
                                <Smile className="h-8 w-8" />
                                <Badge className="bg-white/20 text-white border-none font-bold">MONTHLY PULSE</Badge>
                            </div>
                            <DialogTitle className="text-3xl font-black tracking-tight">Monthly Satisfaction Survey</DialogTitle>
                            <DialogDescription className="text-blue-100 text-lg">
                                Your anonymous feedback helps us build a better workplace.
                            </DialogDescription>
                        </DialogHeader>
                    </div>

                    <div className="p-8 space-y-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
                        {/* Q1 */}
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-black text-lg leading-tight">Overall Satisfaction | الرضا العام</h4>
                                <p className="text-sm text-zinc-500 font-medium mt-1">How satisfied are you with your current role and work environment? | ما مدى رضاك عن دورك الحالي وبيئة العمل؟</p>
                            </div>
                            <RadioGroup 
                                className="flex justify-between gap-2" 
                                value={surveyAnswers.satisfaction} 
                                onValueChange={(val) => setSurveyAnswers({...surveyAnswers, satisfaction: val})}
                            >
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <div key={num} className="flex flex-col items-center gap-2">
                                        <RadioGroupItem value={num.toString()} id={`sat-${num}`} className="sr-only" />
                                        <Label
                                            htmlFor={`sat-${num}`}
                                            className={cn(
                                                "h-12 w-12 rounded-2xl flex items-center justify-center text-lg font-black cursor-pointer transition-all border-2",
                                                surveyAnswers.satisfaction === num.toString() 
                                                    ? "bg-blue-600 text-white border-blue-600 scale-110 shadow-lg" 
                                                    : "bg-zinc-50 dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 text-zinc-500 hover:border-blue-300"
                                            )}
                                        >
                                            {num}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>

                        {/* Q2 */}
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-black text-lg leading-tight">Communication & Support | التواصل والدعم</h4>
                                <p className="text-sm text-zinc-500 font-medium mt-1">Do you feel supported by your manager and team? | هل تشعر بالدعم من مديرك وفريقك؟</p>
                            </div>
                            <RadioGroup 
                                className="flex justify-between gap-2" 
                                value={surveyAnswers.communication} 
                                onValueChange={(val) => setSurveyAnswers({...surveyAnswers, communication: val})}
                            >
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <div key={num} className="flex flex-col items-center gap-2">
                                        <RadioGroupItem value={num.toString()} id={`comm-${num}`} className="sr-only" />
                                        <Label
                                            htmlFor={`comm-${num}`}
                                            className={cn(
                                                "h-12 w-12 rounded-2xl flex items-center justify-center text-lg font-black cursor-pointer transition-all border-2",
                                                surveyAnswers.communication === num.toString() 
                                                    ? "bg-blue-600 text-white border-blue-600 scale-110 shadow-lg" 
                                                    : "bg-zinc-50 dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 text-zinc-500 hover:border-blue-300"
                                            )}
                                        >
                                            {num}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>

                        {/* Q3 */}
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-black text-lg leading-tight">Recognition & Growth | التقدير والنمو</h4>
                                <p className="text-sm text-zinc-500 font-medium mt-1">Do you feel recognized for your contributions and see opportunities for growth? | هل تشعر بالتقدير لمساهماتك وترى فرصًا للنمو؟</p>
                            </div>
                            <RadioGroup 
                                className="flex justify-between gap-2" 
                                value={surveyAnswers.recognition} 
                                onValueChange={(val) => setSurveyAnswers({...surveyAnswers, recognition: val})}
                            >
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <div key={num} className="flex flex-col items-center gap-2">
                                        <RadioGroupItem value={num.toString()} id={`rec-${num}`} className="sr-only" />
                                        <Label
                                            htmlFor={`rec-${num}`}
                                            className={cn(
                                                "h-12 w-12 rounded-2xl flex items-center justify-center text-lg font-black cursor-pointer transition-all border-2",
                                                surveyAnswers.recognition === num.toString() 
                                                    ? "bg-blue-600 text-white border-blue-600 scale-110 shadow-lg" 
                                                    : "bg-zinc-50 dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 text-zinc-500 hover:border-blue-300"
                                            )}
                                        >
                                            {num}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>

                        {/* Q4 */}
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-black text-lg leading-tight">Workplace Environment | بيئة العمل</h4>
                                <p className="text-sm text-zinc-500 font-medium mt-1">How would you rate the overall workplace culture and environment? | كيف تقيم ثقافة وبيئة العمل بشكل عام؟</p>
                            </div>
                            <RadioGroup 
                                className="flex justify-between gap-2" 
                                value={surveyAnswers.environment} 
                                onValueChange={(val) => setSurveyAnswers({...surveyAnswers, environment: val})}
                            >
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <div key={num} className="flex flex-col items-center gap-2">
                                        <RadioGroupItem value={num.toString()} id={`env-${num}`} className="sr-only" />
                                        <Label
                                            htmlFor={`env-${num}`}
                                            className={cn(
                                                "h-12 w-12 rounded-2xl flex items-center justify-center text-lg font-black cursor-pointer transition-all border-2",
                                                surveyAnswers.environment === num.toString() 
                                                    ? "bg-blue-600 text-white border-blue-600 scale-110 shadow-lg" 
                                                    : "bg-zinc-50 dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 text-zinc-500 hover:border-blue-300"
                                            )}
                                        >
                                            {num}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>

                        {/* Q5 */}
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-black text-lg leading-tight">Open Feedback | تعليقات مفتوحة</h4>
                                <p className="text-sm text-zinc-500 font-medium mt-1">Any suggestions or concerns you’d like to share? | هل لديك أي اقتراحات أو مخاوف تود مشاركتها؟</p>
                            </div>
                            <Textarea 
                                placeholder="Your thoughts..." 
                                className="min-h-[120px] rounded-2xl border-zinc-200 dark:border-zinc-800"
                                value={surveyAnswers.feedback}
                                onChange={(e) => setSurveyAnswers({...surveyAnswers, feedback: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="p-8 border-t border-zinc-100 dark:border-zinc-900 flex justify-end gap-3 bg-zinc-50/50 dark:bg-zinc-900/20">
                        <Button variant="ghost" className="rounded-full font-bold" onClick={() => setIsSurveyModalOpen(false)}>Cancel</Button>
                        <Button 
                            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full font-black px-10 h-12 shadow-xl shadow-blue-500/20"
                            onClick={handleSurveySubmit}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : "Submit Survey"} <Send size={16} className="ml-2" />
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

