"use client";
import { useState, useEffect } from "react";

import { useParams, useSearchParams } from "next/navigation";
import { useEmployees } from "@/lib/employee-context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { 
    User, Mail, Phone, MapPin, Briefcase, Calendar, FileText,
    CreditCard, HeartPulse, ShieldAlert, FileSpreadsheet, Download,
    CalendarDays, Edit2, PlusCircle, Check, X, Users, Laptop, Sparkles, LogOut, MoreHorizontal, AlertCircle,
    ShieldCheck, Trash2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { calculateLocalizedPayroll } from "@/lib/payroll-utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import CareerPathModal from "@/components/employees/CareerPathModal";
import { Brain } from "lucide-react";

export default function EmployeeProfilePage() {
    const { userRole } = useAuth();
    const { employees, updateEmployee } = useEmployees();
    const params = useParams();
    const router = useRouter();
    const employeeId = params.id as string;
    const currentEmployee = employees.find(e => e.id === employeeId);
    const [mounted, setMounted] = useState(false);

    const searchParams = useSearchParams();
    const initialTab = searchParams.get('tab') || "personal";
    const [activeTab, setActiveTab] = useState(initialTab);
    
    const [selectedEmployeeForCareer, setSelectedEmployeeForCareer] = useState<{ id: string, name: string } | null>(null);

    useEffect(() => {
        setMounted(true);
        if (initialTab) {
            setActiveTab(initialTab);
        }
    }, [initialTab]);

    // Leaves State
    const [leaveBalance, setLeaveBalance] = useState(21);
    const [isEditingBalance, setIsEditingBalance] = useState(false);
    const [newBalanceInput, setNewBalanceInput] = useState("21");
    
    const [leaveRequests, setLeaveRequests] = useState([
        { id: 1, type: "Annual Vacation", startDate: "2023-08-01", endDate: "2023-08-10", days: 10, status: "Approved" }
    ]);
    const [isAddingLeave, setIsAddingLeave] = useState(false);
    const [newLeave, setNewLeave] = useState({ type: "Annual Vacation", startDate: "", endDate: "", days: 1 });

    // Assets State
    const [employeeAssets, setEmployeeAssets] = useState<any[]>([]);
    const [isAssetsLoading, setIsAssetsLoading] = useState(true);
    const [isAddingAsset, setIsAddingAsset] = useState(false);
    const [newAsset, setNewAsset] = useState({ category: "Laptop", brand: "", serialNumber: "", notes: "" });

    useEffect(() => {
        const fetchAssets = async () => {
            try {
                const res = await fetch('/api/assets');
                if (res.ok) {
                    const data = await res.json();
                    setEmployeeAssets(data.filter((a: any) => a.employee?.id === employeeId));
                }
            } catch (err) {
                console.error(err);
            } finally {
                setIsAssetsLoading(false);
            }
        };
        if (employeeId) fetchAssets();
    }, [employeeId]);

    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editSection, setEditSection] = useState("");
    const [editRequestText, setEditRequestText] = useState("");

    const [directManager, setDirectManager] = useState(currentEmployee?.directManagerId || "");
    const [indirectManager, setIndirectManager] = useState(currentEmployee?.indirectManagerId || "");
    const [isEditingManagers, setIsEditingManagers] = useState(false);

    // Statutory State
    const [isGosiApplicable, setIsGosiApplicable] = useState(currentEmployee?.isGosiApplicable ?? true);
    const [isTaxApplicable, setIsTaxApplicable] = useState(currentEmployee?.isTaxApplicable ?? true);

    // Nationality State for Edit Dialog
    const [selectedNationality, setSelectedNationality] = useState(currentEmployee?.nationality || "Other");
    const [showStatutoryPrompt, setShowStatutoryPrompt] = useState(false);

    // Full Edit Form State (Admin Only)
    const [editForm, setEditForm] = useState({
        firstName: currentEmployee?.firstName || "",
        lastName: currentEmployee?.lastName || "",
        dateOfBirth: currentEmployee?.dateOfBirth || "",
        gender: currentEmployee?.gender || "",
        maritalStatus: currentEmployee?.maritalStatus || "",
        personalEmail: currentEmployee?.personalEmail || "",
        phone: currentEmployee?.phone || "",
        address: currentEmployee?.address || "",
        bankName: currentEmployee?.bankName || "",
        accountNumber: currentEmployee?.accountNumber || "",
        salary: currentEmployee?.salary?.toString() || "",
        emergencyContactName: currentEmployee?.emergencyContactName || "",
        emergencyContactRel: currentEmployee?.emergencyContactRel || "",
        emergencyContactPhone: currentEmployee?.emergencyContactPhone || "",
        role: currentEmployee?.role || "",
        department: currentEmployee?.department || "",
        status: currentEmployee?.status || "Active",
        email: currentEmployee?.email || "",
        housingAllowance: currentEmployee?.housingAllowance?.toString() || "",
        transportationAllowance: currentEmployee?.transportationAllowance?.toString() || "",
        otherAllowance: currentEmployee?.otherAllowance?.toString() || "",
        laptopAllowance: currentEmployee?.laptopAllowance?.toString() || "",
        overtime: currentEmployee?.overtime?.toString() || "",
        bonus: currentEmployee?.bonus?.toString() || "",
        currency: currentEmployee?.currency || "SAR",
    });

    const handleNationalityChange = (val: string) => {
        setSelectedNationality(val);
        if (val === 'Saudi' && !isGosiApplicable) {
            setShowStatutoryPrompt(true);
        } else {
            setShowStatutoryPrompt(false);
        }
    };

    const handleRequestEdit = (section: string) => {
        setEditSection(section);
        setEditRequestText("");
        if (section === "Personal Details" || section === "Contact Information" || section === "Financial & Salary" || section === "Emergency Contact") {
            setSelectedNationality(currentEmployee?.nationality || "Other");
            setEditForm({
                firstName: currentEmployee?.firstName || "",
                lastName: currentEmployee?.lastName || "",
                dateOfBirth: currentEmployee?.dateOfBirth || "",
                gender: currentEmployee?.gender || "",
                maritalStatus: currentEmployee?.maritalStatus || "",
                personalEmail: currentEmployee?.personalEmail || "",
                phone: currentEmployee?.phone || "",
                address: currentEmployee?.address || "",
                bankName: currentEmployee?.bankName || "",
                accountNumber: currentEmployee?.accountNumber || "",
                salary: currentEmployee?.salary?.toString() || "",
                emergencyContactName: currentEmployee?.emergencyContactName || "",
                emergencyContactRel: currentEmployee?.emergencyContactRel || "",
                emergencyContactPhone: currentEmployee?.emergencyContactPhone || "",
                role: currentEmployee?.role || "",
                department: currentEmployee?.department || "",
                status: currentEmployee?.status || "Active",
                email: currentEmployee?.email || "",
                housingAllowance: currentEmployee?.housingAllowance?.toString() || "",
                transportationAllowance: currentEmployee?.transportationAllowance?.toString() || "",
                otherAllowance: currentEmployee?.otherAllowance?.toString() || "",
                laptopAllowance: currentEmployee?.laptopAllowance?.toString() || "",
                overtime: currentEmployee?.overtime?.toString() || "",
                bonus: currentEmployee?.bonus?.toString() || "",
                currency: currentEmployee?.currency || "SAR",
            });
            setShowStatutoryPrompt(false);
        }
        setEditDialogOpen(true);
    };

    const submitEditRequest = () => {
        if (userRole !== 'admin' && !editRequestText.trim()) {
            toast.error("Please provide a description of the requested changes.");
            return;
        }
        setEditDialogOpen(false);
        if (userRole === 'admin') {
            if (currentEmployee) {
                updateEmployee(employeeId, {
                    ...editForm,
                    salary: editForm.salary ? Number(editForm.salary) : undefined,
                    housingAllowance: editForm.housingAllowance ? Number(editForm.housingAllowance) : undefined,
                    transportationAllowance: editForm.transportationAllowance ? Number(editForm.transportationAllowance) : undefined,
                    otherAllowance: editForm.otherAllowance ? Number(editForm.otherAllowance) : undefined,
                    laptopAllowance: editForm.laptopAllowance ? Number(editForm.laptopAllowance) : undefined,
                    overtime: editForm.overtime ? Number(editForm.overtime) : undefined,
                    bonus: editForm.bonus ? Number(editForm.bonus) : undefined,
                    nationality: selectedNationality as any,
                    isGosiApplicable: isGosiApplicable,
                    isTaxApplicable: isTaxApplicable,
                    currency: editForm.currency as any
                });
            }
            toast.success(`${editSection} updated successfully.`);
        } else {
            toast.success(`Change request for ${editSection} submitted successfully. HR will review it shortly.`);
        }
    };

    const handleSaveBalance = () => {
        setLeaveBalance(Number(newBalanceInput));
        setIsEditingBalance(false);
    };

    const handleAddLeave = () => {
        if (!newLeave.startDate || !newLeave.endDate) return;
        setLeaveRequests([
            ...leaveRequests, 
            { id: Date.now(), ...newLeave, status: "Approved" }
        ]);
        setIsAddingLeave(false);
        setNewLeave({ type: "Annual Vacation", startDate: "", endDate: "", days: 1 });
    };

    const handleAddAsset = async () => {
        if (!newAsset.category || !newAsset.serialNumber) {
            toast.error("Please fill in required fields");
            return;
        }

        try {
            const res = await fetch('/api/assets', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    name: newAsset.category, 
                    category: newAsset.category,
                    serialNumber: newAsset.serialNumber,
                    employeeId: employeeId,
                    status: "Pending Approval"
                })
            });

            if (res.ok) {
                const createdAsset = await res.json();
                setEmployeeAssets([createdAsset, ...employeeAssets]);
                setIsAddingAsset(false);
                setNewAsset({ category: "Laptop", brand: "", serialNumber: "", notes: "" });
                toast.success("Asset request submitted for approval");
            } else {
                toast.error("Failed to submit request");
            }
        } catch (err) {
            toast.error("An error occurred");
        }
    };

    const handleUpdateAssetStatus = async (assetId: string, status: string) => {
        try {
            const res = await fetch('/api/assets', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: assetId, status, employeeId: status === 'Rejected' ? null : employeeId })
            });
            if (res.ok) {
                const updated = await res.json();
                setEmployeeAssets(employeeAssets.map(a => a.id === assetId ? updated : a));
                toast.success(`Asset ${status === 'Assigned' ? 'accepted' : 'rejected'}`);
            } else {
                toast.error("Failed to update status");
            }
        } catch (err) {
            toast.error("Failed to update status");
        }
    };

    const handleLifecycleAction = async (type: "onboarding" | "offboarding") => {
        try {
            toast.promise(
                fetch(`/api/${type}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ employeeId, workflowId: type === 'onboarding' ? 'default_on' : 'default_off' })
                }),
                {
                    loading: `Initiating ${type}...`,
                    success: () => {
                        router.push(`/${type}`);
                        return `${type.charAt(0).toUpperCase() + type.slice(1)} initiated successfully!`;
                    },
                    error: `Failed to initiate ${type}. Make sure you have created workflow templates first.`
                }
            );
        } catch (err) {
            toast.error(`Error: ${err}`);
        }
    };

    if (!currentEmployee) {
        return notFound();
    }

    const isRenewalSoon = currentEmployee.contractRenewalDate ? (
        (new Date(currentEmployee.contractRenewalDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30.5) <= 2
    ) : false;

    const employee = currentEmployee; // Alias for ease of use in rest of component

    return (
        <div className="space-y-6">
            <CareerPathModal 
                isOpen={!!selectedEmployeeForCareer}
                onClose={() => setSelectedEmployeeForCareer(null)}
                employeeId={selectedEmployeeForCareer?.id || ""}
                employeeName={selectedEmployeeForCareer?.name || ""}
            />
            {/* Hero Section */}
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 flex flex-col md:flex-row items-center gap-6 shadow-sm">
                <Avatar className="h-24 w-24 border-4 border-zinc-50 dark:border-zinc-900 shadow-xl">
                    <AvatarImage src={employee.avatar || undefined} alt={employee.firstName} />
                    <AvatarFallback className="bg-blue-100 text-blue-700 text-3xl font-black">
                        {employee.firstName[0]}{employee.lastName[0]}
                    </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl font-black text-black dark:text-zinc-50">{employee.firstName} {employee.lastName}</h1>
                    <p className="text-zinc-500 font-medium flex items-center justify-center md:justify-start gap-2 mt-1">
                        <Briefcase size={14} /> {employee.role} · {employee.department}
                    </p>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-4">
                        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 border-none px-3 font-bold uppercase tracking-widest text-[10px]">
                            {employee.status}
                        </Badge>
                        <span className="text-xs text-zinc-400 flex items-center gap-1 font-medium">
                            <Calendar size={12} /> Joined {mounted ? new Date(employee.joinedDate).toLocaleDateString() : '...'}
                        </span>
                    </div>
                </div>
                <div className="flex gap-3 mt-4 md:mt-0">
                    <Button variant="outline" className="border-zinc-200 dark:border-zinc-800 rounded-full" asChild>
                        <Link href="/employees">Back to Team</Link>
                    </Button>
                    {userRole === 'admin' && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="secondary" className="rounded-full font-bold">
                                    Lifecycle <MoreHorizontal size={14} className="ml-2" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border-zinc-200 dark:border-zinc-800">
                                <DropdownMenuItem className="cursor-pointer gap-2 p-3 font-bold text-xs" onClick={() => handleLifecycleAction("onboarding")}>
                                    <Sparkles className="h-4 w-4 text-blue-500" /> Start Onboarding
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer gap-2 p-3 font-bold text-xs text-rose-600" onClick={() => handleLifecycleAction("offboarding")}>
                                    <LogOut className="h-4 w-4" /> Start Offboarding
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg shadow-blue-500/20">
                        <Mail className="mr-2 h-4 w-4" /> Message
                    </Button>
                </div>
            </div>

            {/* Content Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="bg-zinc-100/50 dark:bg-zinc-900/50 p-1 w-full justify-start rounded-full overflow-x-auto flex-nowrap border border-zinc-200 dark:border-zinc-800 mb-6 hidden-scrollbar">
                    <TabsTrigger value="personal" className="rounded-full px-6 font-bold text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:shadow-sm">Personal Info</TabsTrigger>
                    <TabsTrigger value="contact" className="rounded-full px-6 font-bold text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:shadow-sm">Contact</TabsTrigger>
                    {userRole === 'admin' && (
                        <TabsTrigger value="financial" className="rounded-full px-6 font-bold text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:shadow-sm">Financial</TabsTrigger>
                    )}
                    <TabsTrigger value="emergency" className="rounded-full px-6 font-bold text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:shadow-sm">Emergency</TabsTrigger>
                    <TabsTrigger value="managers" className="rounded-full px-6 font-bold text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:shadow-sm">Line Managers</TabsTrigger>
                    {userRole === 'admin' && (
                        <TabsTrigger value="contracts" className="rounded-full px-6 font-bold text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:shadow-sm">Contracts</TabsTrigger>
                    )}
                    <TabsTrigger value="documents" className="rounded-full px-6 font-bold text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:shadow-sm">Documents</TabsTrigger>
                    <TabsTrigger value="leaves" className="rounded-full px-6 font-bold text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:shadow-sm">Leaves</TabsTrigger>
                    <TabsTrigger value="assets" className="rounded-full px-6 font-bold text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:shadow-sm">Assets</TabsTrigger>
                    <TabsTrigger value="lifecycle" className="rounded-full px-6 font-bold text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:shadow-sm">Lifecycle</TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="mt-0">
                    <Card className="border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl shadow-xl">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-lg font-black flex items-center gap-2"><User className="text-blue-500" /> Personal Details</CardTitle>
                            <Button variant="ghost" size="sm" onClick={() => handleRequestEdit("Personal Details")} className="text-zinc-500 hover:text-blue-600">
                                <Edit2 size={14} className="mr-2" /> {userRole === 'admin' ? "Edit Details" : "Request Change"}
                            </Button>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Full Name</p>
                                <p className="font-medium text-black dark:text-zinc-50">{employee.firstName} {employee.lastName}</p>
                            </div>
                            <div>
                                <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Date of Birth</p>
                                <p className="font-medium text-black dark:text-zinc-50">{employee.dateOfBirth || "Not provided"}</p>
                            </div>
                            <div>
                                <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Gender</p>
                                <p className="font-medium text-black dark:text-zinc-50">{employee.gender || "Not provided"}</p>
                            </div>
                            <div>
                                <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Marital Status</p>
                                <p className="font-medium text-black dark:text-zinc-50">{employee.maritalStatus || "Not provided"}</p>
                            </div>
                            <div>
                                <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Nationality</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">
                                        {employee.nationality === 'Saudi' ? '🇸🇦' : employee.nationality === 'Egyptian' ? '🇪🇬' : '🌐'}
                                    </span>
                                    <p className="font-medium text-black dark:text-zinc-50">
                                        {employee.nationality === 'Saudi' ? 'Saudi Arabia' : employee.nationality === 'Egyptian' ? 'Egypt' : (employee.nationality || "Other")}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Personal Email</p>
                                <div className="flex items-center gap-2">
                                    <Mail size={14} className="text-zinc-400" />
                                    <p className="font-medium text-black dark:text-zinc-50">{employee.personalEmail || "Not provided"}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="contact" className="mt-0">
                    <Card className="border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl shadow-xl">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-lg font-black flex items-center gap-2"><MapPin className="text-amber-500" /> Contact Information</CardTitle>
                            <Button variant="ghost" size="sm" onClick={() => handleRequestEdit("Contact Information")} className="text-zinc-500 hover:text-amber-600">
                                <Edit2 size={14} className="mr-2" /> {userRole === 'admin' ? "Edit Contact" : "Request Change"}
                            </Button>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Email Address</p>
                                <div className="flex items-center gap-2">
                                    <Mail size={14} className="text-zinc-400" />
                                    <p className="font-medium text-black dark:text-zinc-50">{employee.email}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Phone Number</p>
                                <div className="flex items-center gap-2">
                                    <Phone size={14} className="text-zinc-400" />
                                    <p className="font-medium text-black dark:text-zinc-50">{employee.phone || "Not provided"}</p>
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Residential Address</p>
                                <p className="font-medium text-black dark:text-zinc-50">{employee.address || "Not provided"}</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {userRole === 'admin' && (
                    <TabsContent value="financial" className="mt-0">
                        <Card className="border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl shadow-xl">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-lg font-black flex items-center gap-2"><CreditCard className="text-emerald-500" /> Financial & Salary</CardTitle>
                                <Button variant="ghost" size="sm" onClick={() => handleRequestEdit("Financial & Salary")} className="text-zinc-500 hover:text-emerald-600">
                                    <Edit2 size={14} className="mr-2" /> {userRole === 'admin' ? "Edit Financials" : "Request Change"}
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-zinc-100 dark:border-zinc-800">
                                    <div>
                                        <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Bank Name</p>
                                        <p className="font-medium text-black dark:text-zinc-50">{employee.bankName || "Not provided"}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Account Number (IBAN)</p>
                                        <p className="font-medium text-black dark:text-zinc-50 font-mono tracking-wider">{employee.accountNumber || "Not provided"}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Salary Architecture</p>
                                        <Badge variant="outline" className="text-[10px] font-bold border-emerald-500/20 text-emerald-600">Dynamic Breakdown</Badge>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                                        <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                                            <p className="text-[9px] font-black text-zinc-400 uppercase mb-1">Currency</p>
                                            <p className="text-sm font-black text-blue-600 uppercase">{employee.currency || "SAR"}</p>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                                            <p className="text-[9px] font-black text-zinc-400 uppercase mb-1">Basic</p>
                                            <p className="text-sm font-black text-black dark:text-white">{employee.currency || "SAR"} {employee.salary?.toLocaleString()}</p>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                                            <p className="text-[9px] font-black text-emerald-600 uppercase mb-1">Housing</p>
                                            <p className="text-sm font-black text-emerald-700 dark:text-emerald-400">{employee.currency || "SAR"} {(employee.housingAllowance || 0).toLocaleString()}</p>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10">
                                            <p className="text-[9px] font-black text-blue-600 uppercase mb-1">Transport</p>
                                            <p className="text-sm font-black text-blue-700 dark:text-blue-400">{employee.currency || "SAR"} {(employee.transportationAllowance || 0).toLocaleString()}</p>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                                            <p className="text-[9px] font-black text-zinc-400 uppercase mb-1">Other</p>
                                            <p className="text-sm font-black text-black dark:text-white">{employee.currency || "SAR"} {(employee.otherAllowance || 0).toLocaleString()}</p>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                                            <p className="text-[9px] font-black text-zinc-400 uppercase mb-1">Laptop</p>
                                            <p className="text-sm font-black text-black dark:text-white">{employee.currency || "SAR"} {(employee.laptopAllowance || 0).toLocaleString()}</p>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                                            <p className="text-[9px] font-black text-zinc-400 uppercase mb-1">OT/Bonus</p>
                                            <p className="text-sm font-black text-black dark:text-white">{employee.currency || "SAR"} {((employee.overtime || 0) + (employee.bonus || 0)).toLocaleString()}</p>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
                                            <p className="text-[9px] font-black text-zinc-500 uppercase mb-1">Gross</p>
                                            <p className="text-sm font-black text-white">
                                                {employee.currency || "SAR"} {(
                                                    (employee.salary || 0) + 
                                                    (employee.housingAllowance || 0) + 
                                                    (employee.transportationAllowance || 0) + 
                                                    (employee.otherAllowance || 0) + 
                                                    (employee.laptopAllowance || 0) + 
                                                    (employee.overtime || 0) + 
                                                    (employee.bonus || 0)
                                                ).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Statutory Deductions Awareness */}
                                    <div className="p-5 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
                                        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Anticipated Deductions</p>
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="text-zinc-400 font-medium flex items-center gap-2">
                                                    <ShieldCheck size={14} className="text-rose-500" /> GOSI Contribution
                                                </span>
                                                <span className="text-rose-500 font-black">
                                                    {employee.isGosiApplicable ? `${employee.currency || "SAR"} ${(calculateLocalizedPayroll(employee.salary || 0, employee.nationality, true, false, { housing: employee.housingAllowance, transportation: employee.transportationAllowance, other: employee.otherAllowance, laptop: employee.laptopAllowance, overtime: employee.overtime, bonus: employee.bonus }).gosiEmployee).toLocaleString()}` : "Exempt"}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="text-zinc-400 font-medium flex items-center gap-2">
                                                    <FileSpreadsheet size={14} className="text-rose-500" /> Income Tax Intelligence
                                                </span>
                                                <span className="text-rose-500 font-black">
                                                    {employee.isTaxApplicable ? `${employee.currency || "SAR"} ${(calculateLocalizedPayroll(employee.salary || 0, employee.nationality, employee.isGosiApplicable, true, { housing: employee.housingAllowance, transportation: employee.transportationAllowance, other: employee.otherAllowance, laptop: employee.laptopAllowance, overtime: employee.overtime, bonus: employee.bonus }).incomeTax).toLocaleString()}` : "Exempt"}
                                                </span>
                                            </div>
                                            <div className="pt-2 border-t border-zinc-900 flex justify-between items-center">
                                                <span className="text-[10px] font-black text-zinc-300 uppercase">Estimated Net Disbursement</span>
                                                <span className="text-lg font-black text-emerald-500 tracking-tight">
                                                    {employee.currency || "SAR"} {(calculateLocalizedPayroll(employee.salary || 0, employee.nationality, employee.isGosiApplicable, employee.isTaxApplicable, { housing: employee.housingAllowance, transportation: employee.transportationAllowance, other: employee.otherAllowance, laptop: employee.laptopAllowance, overtime: employee.overtime, bonus: employee.bonus }).netSalary).toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Admin-Only Statutory Intelligence */}
                        <Card className="border-zinc-200 dark:border-zinc-800 bg-zinc-950 text-white overflow-hidden shadow-2xl mt-6 relative">
                            <div className="absolute top-0 right-0 p-8 opacity-5 rotate-12">
                                <ShieldCheck size={160} />
                            </div>
                            <CardHeader className="relative z-10">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg font-black flex items-center gap-2">
                                        <ShieldCheck className="text-blue-500" /> Statutory Intelligence
                                    </CardTitle>
                                    <Badge variant="outline" className="border-zinc-700 text-zinc-400 font-black text-[9px] uppercase tracking-widest">Admin Control</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="relative z-10 space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <button 
                                        onClick={() => {
                                            const newVal = !isGosiApplicable;
                                            setIsGosiApplicable(newVal);
                                            updateEmployee(employeeId, { isGosiApplicable: newVal });
                                            toast.success(`GOSI ${newVal ? 'activated' : 'deactivated'} for ${employee.firstName}`);
                                        }}
                                        className="p-5 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-3 text-left transition-all hover:border-blue-500/50 hover:bg-zinc-800/50 group w-full"
                                    >
                                        <div className="flex items-center justify-between">
                                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest group-hover:text-blue-500 transition-colors">GOSI Applicability</p>
                                            <Badge className={cn("border-none font-black text-[9px] uppercase transition-all", isGosiApplicable ? "bg-emerald-500/20 text-emerald-500" : "bg-rose-500/20 text-rose-500")}>
                                                {isGosiApplicable ? "Active" : "Inactive"}
                                            </Badge>
                                        </div>
                                        <p className="text-xs font-medium text-zinc-400 leading-relaxed">
                                            {employee.nationality === 'Saudi' 
                                                ? "Calculated at 9.75% (Employee) and 12% (Employer) for Saudi nationals."
                                                : "Expat hazard insurance calculated at 2% for employer contribution."}
                                        </p>
                                        <p className="text-[9px] font-black text-blue-500/40 uppercase tracking-widest pt-2 group-hover:text-blue-500 transition-colors">Click to Toggle</p>
                                    </button>

                                    <button 
                                        onClick={() => {
                                            const newVal = !isTaxApplicable;
                                            setIsTaxApplicable(newVal);
                                            updateEmployee(employeeId, { isTaxApplicable: newVal });
                                            toast.success(`Tax Intelligence ${newVal ? 'activated' : 'deactivated'} for ${employee.firstName}`);
                                        }}
                                        className="p-5 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-3 text-left transition-all hover:border-blue-500/50 hover:bg-zinc-800/50 group w-full"
                                    >
                                        <div className="flex items-center justify-between">
                                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest group-hover:text-blue-500 transition-colors">Tax Applicability</p>
                                            <Badge className={cn("border-none font-black text-[9px] uppercase transition-all", isTaxApplicable ? "bg-emerald-500/20 text-emerald-500" : "bg-rose-500/20 text-rose-500")}>
                                                {isTaxApplicable ? "Active" : "Inactive"}
                                            </Badge>
                                        </div>
                                        <p className="text-xs font-medium text-zinc-400 leading-relaxed">
                                            {employee.nationality === 'Egyptian' 
                                                ? "Applying monthly progressive income tax brackets (0% - 25%)."
                                                : "No standard income tax applied for this nationality profile."}
                                        </p>
                                        <p className="text-[9px] font-black text-blue-500/40 uppercase tracking-widest pt-2 group-hover:text-blue-500 transition-colors">Click to Toggle</p>
                                    </button>
                                </div>
                                <div className="p-4 rounded-2xl bg-blue-600/10 border border-blue-600/20 flex items-center gap-3">
                                    <AlertCircle className="text-blue-500" size={18} />
                                    <p className="text-[10px] font-bold text-blue-200">Changes to statutory applicability will reflect in the next payroll cycle automatically.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                )}

                <TabsContent value="emergency" className="mt-0">
                    <Card className="border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl shadow-xl border-t-4 border-t-rose-500">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-lg font-black flex items-center gap-2"><ShieldAlert className="text-rose-500" /> Emergency Contact</CardTitle>
                            <Button variant="ghost" size="sm" onClick={() => handleRequestEdit("Emergency Contact")} className="text-zinc-500 hover:text-rose-600">
                                <Edit2 size={14} className="mr-2" /> {userRole === 'admin' ? "Edit Contact" : "Request Change"}
                            </Button>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Contact Name</p>
                                <p className="font-medium text-black dark:text-zinc-50">{employee.emergencyContactName || "Not provided"}</p>
                            </div>
                            <div>
                                <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Relationship</p>
                                <p className="font-medium text-black dark:text-zinc-50">{employee.emergencyContactRel || "Not provided"}</p>
                            </div>
                            <div>
                                <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Emergency Phone</p>
                                <div className="flex items-center gap-2">
                                    <HeartPulse size={14} className="text-rose-500" />
                                    <p className="font-medium text-black dark:text-zinc-50">{employee.emergencyContactPhone || "Not provided"}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                
                <TabsContent value="managers" className="mt-0">
                    <Card className="border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl shadow-xl border-t-4 border-t-indigo-500">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-lg font-black flex items-center gap-2"><Users className="text-indigo-500" /> Line Managers</CardTitle>
                            {userRole === 'admin' && !isEditingManagers && (
                                <Button variant="ghost" size="sm" onClick={() => setIsEditingManagers(true)} className="text-zinc-500 hover:text-indigo-600">
                                    <Edit2 size={14} className="mr-2" /> Edit Managers
                                </Button>
                            )}
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Direct Manager</p>
                                    <p className="text-[10px] text-zinc-400 mb-3 leading-tight">Approves leaves, overtime requests, and handles related matters.</p>
                                    {isEditingManagers ? (
                                        <select 
                                            className="flex h-9 w-full rounded-md border border-zinc-200 bg-white px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
                                            value={directManager}
                                            onChange={(e) => setDirectManager(e.target.value)}
                                        >
                                            <option value="">Select Manager</option>
                                            {employees.filter(e => e.id !== employeeId).map(e => <option key={e.id} value={e.id}>{e.firstName} {e.lastName} - {e.role}</option>)}
                                        </select>
                                    ) : (
                                        <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-900/50 p-3 rounded-lg border border-zinc-100 dark:border-zinc-800/50">
                                            <Avatar className="h-10 w-10 border-2 border-white dark:border-zinc-950 shadow-sm">
                                                <AvatarImage src={employees.find(e => e.id === directManager)?.avatar || undefined} />
                                                <AvatarFallback className="bg-indigo-100 text-indigo-700 text-xs font-bold">
                                                    {employees.find(e => e.id === directManager)?.firstName?.[0] || '?'}{employees.find(e => e.id === directManager)?.lastName?.[0] || '?'}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-bold text-sm text-black dark:text-zinc-50 leading-none">
                                                    {directManager ? `${employees.find(e => e.id === directManager)?.firstName} ${employees.find(e => e.id === directManager)?.lastName}` : "Not assigned"}
                                                </p>
                                                {directManager && <p className="text-[10px] text-zinc-500 mt-1">{employees.find(e => e.id === directManager)?.role}</p>}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Indirect Manager</p>
                                    <p className="text-[10px] text-zinc-400 mb-3 leading-tight">For reference about requests and general organizational oversight.</p>
                                    {isEditingManagers ? (
                                        <select 
                                            className="flex h-9 w-full rounded-md border border-zinc-200 bg-white px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
                                            value={indirectManager}
                                            onChange={(e) => setIndirectManager(e.target.value)}
                                        >
                                            <option value="">Select Manager</option>
                                            {employees.filter(e => e.id !== employeeId).map(e => <option key={e.id} value={e.id}>{e.firstName} {e.lastName} - {e.role}</option>)}
                                        </select>
                                    ) : (
                                        <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-900/50 p-3 rounded-lg border border-zinc-100 dark:border-zinc-800/50">
                                            <Avatar className="h-10 w-10 border-2 border-white dark:border-zinc-950 shadow-sm">
                                                <AvatarImage src={employees.find(e => e.id === indirectManager)?.avatar || undefined} />
                                                <AvatarFallback className="bg-zinc-200 text-zinc-700 text-xs font-bold">
                                                    {employees.find(e => e.id === indirectManager)?.firstName?.[0] || '?'}{employees.find(e => e.id === indirectManager)?.lastName?.[0] || '?'}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-bold text-sm text-black dark:text-zinc-50 leading-none">
                                                    {indirectManager ? `${employees.find(e => e.id === indirectManager)?.firstName} ${employees.find(e => e.id === indirectManager)?.lastName}` : "Not assigned"}
                                                </p>
                                                {indirectManager && <p className="text-[10px] text-zinc-500 mt-1">{employees.find(e => e.id === indirectManager)?.role}</p>}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {isEditingManagers && (
                                <div className="col-span-1 md:col-span-2 flex justify-end gap-2 mt-2 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                                    <Button variant="outline" size="sm" onClick={() => setIsEditingManagers(false)}>Cancel</Button>
                                    <Button size="sm" onClick={() => { setIsEditingManagers(false); toast.success("Line managers updated successfully"); }} className="bg-indigo-600 hover:bg-indigo-700 text-white">Save Changes</Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
                
                {userRole === 'admin' && (
                    <TabsContent value="contracts" className="mt-0">
                    <Card className="border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-lg font-black flex items-center gap-2"><FileText className="text-indigo-500" /> Contracts & Agreements</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <div className="space-y-4">
                                <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-600">
                                            <FileText size={20} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm text-black dark:text-zinc-50 group-hover:text-indigo-600 transition-colors">Employment Contract (Full-Time)</p>
                                            <p className="text-xs text-zinc-500">Signed on {mounted ? new Date(employee.joinedDate).toLocaleDateString() : '...'} · Active</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" className="text-zinc-400 group-hover:text-indigo-600">
                                        <Download size={16} />
                                    </Button>
                                </div>

                                {employee.contractRenewalDate && (
                                    <div className={cn(
                                        "rounded-xl border p-6 space-y-4 transition-all duration-500",
                                        isRenewalSoon 
                                            ? "bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800 animate-pulse-subtle" 
                                            : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                                    )}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className={cn(
                                                    "p-2 rounded-lg",
                                                    isRenewalSoon ? "bg-amber-100 text-amber-600" : "bg-zinc-100 text-zinc-600"
                                                )}>
                                                    <Calendar size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Contract Renewal Date</p>
                                                    <p className="text-lg font-black text-black dark:text-white">
                                                        {mounted ? new Date(employee.contractRenewalDate).toLocaleDateString() : '...'}
                                                    </p>
                                                </div>
                                            </div>
                                            {isRenewalSoon && (
                                                <Badge className="bg-amber-500 text-white border-none font-bold animate-bounce">
                                                    RENEWAL SOON
                                                </Badge>
                                            )}
                                        </div>

                                        {isRenewalSoon && (
                                            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                                                <p className="text-xs text-amber-800 dark:text-amber-200 font-medium leading-relaxed">
                                                    <AlertCircle className="inline h-3 w-3 mr-1 mb-0.5" /> 
                                                    {userRole === 'admin' 
                                                        ? "This contract is due for renewal in less than 2 months. Please initiate the review process."
                                                        : "Your contract is due for renewal in less than 2 months. HR will reach out to you soon."
                                                    }
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                )}
                
                <TabsContent value="documents" className="mt-0">
                    <Card className="border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-lg font-black flex items-center gap-2"><FileSpreadsheet className="text-teal-500" /> Uploaded Documents</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[
                                { name: "National ID / Passport", date: "Jan 15, 2020", type: "PDF" },
                                { name: "Degree Certificate", date: "Jan 16, 2020", type: "PDF" },
                                { name: "Voided Check", date: "Jan 18, 2020", type: "Image" }
                            ].map((doc, i) => (
                                <div key={i} className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-600 font-black text-xs">
                                            {doc.type}
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm text-black dark:text-zinc-50 group-hover:text-teal-600 transition-colors">{doc.name}</p>
                                            <p className="text-xs text-zinc-500">Uploaded {doc.date}</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" className="text-zinc-400 group-hover:text-teal-600">
                                        <Download size={16} />
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="leaves" className="mt-0">
                    <div className="space-y-6">
                        <Card className="border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl shadow-xl">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-lg font-black flex items-center gap-2">
                                    <CalendarDays className="text-blue-500" /> Leave Balance
                                </CardTitle>
                                {userRole === 'admin' && !isEditingBalance && (
                                    <Button variant="ghost" size="sm" onClick={() => setIsEditingBalance(true)} className="text-zinc-500 hover:text-blue-600">
                                        <Edit2 size={14} className="mr-2" /> Edit Balance
                                    </Button>
                                )}
                            </CardHeader>
                            <CardContent>
                                {isEditingBalance ? (
                                    <div className="flex items-center gap-3">
                                        <Input 
                                            type="number" 
                                            value={newBalanceInput} 
                                            onChange={(e) => setNewBalanceInput(e.target.value)}
                                            className="w-24 text-lg font-black border-blue-500 focus-visible:ring-blue-500"
                                        />
                                        <span className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Days</span>
                                        <Button size="icon" className="bg-emerald-600 hover:bg-emerald-700 h-8 w-8 rounded-full shadow-lg ml-2" onClick={handleSaveBalance}>
                                            <Check size={14} />
                                        </Button>
                                        <Button size="icon" variant="outline" className="h-8 w-8 rounded-full border-zinc-200" onClick={() => setIsEditingBalance(false)}>
                                            <X size={14} className="text-zinc-500" />
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="flex items-end gap-2">
                                        <span className="text-4xl font-black text-black dark:text-white tracking-tighter">{leaveBalance}</span>
                                        <span className="text-zinc-500 font-bold uppercase tracking-widest text-xs mb-1.5">Days Available</span>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card className="border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl shadow-xl">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="text-lg font-black">Leave History</CardTitle>
                                {userRole === 'admin' && !isAddingLeave && (
                                    <Button size="sm" onClick={() => setIsAddingLeave(true)} className="bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg shadow-blue-500/20">
                                        <PlusCircle size={14} className="mr-2" /> Add Leave
                                    </Button>
                                )}
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {isAddingLeave && (
                                    <div className="rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/20 p-4 space-y-4 mb-6">
                                        <h4 className="font-black text-sm uppercase tracking-widest text-blue-600">Manual Entry</h4>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Type</label>
                                                <select 
                                                    className="flex h-9 w-full rounded-md border border-zinc-200 bg-white px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
                                                    value={newLeave.type}
                                                    onChange={(e) => setNewLeave({...newLeave, type: e.target.value})}
                                                >
                                                    <option>Annual Vacation</option>
                                                    <option>Sick Leave</option>
                                                    <option>Unpaid Leave</option>
                                                </select>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Start Date</label>
                                                <Input type="date" value={newLeave.startDate} onChange={(e) => setNewLeave({...newLeave, startDate: e.target.value})} className="h-9" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">End Date</label>
                                                <Input type="date" value={newLeave.endDate} onChange={(e) => setNewLeave({...newLeave, endDate: e.target.value})} className="h-9" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Days</label>
                                                <Input type="number" value={newLeave.days} onChange={(e) => setNewLeave({...newLeave, days: Number(e.target.value)})} className="h-9" />
                                            </div>
                                        </div>
                                        <div className="flex gap-2 justify-end mt-2">
                                            <Button variant="ghost" size="sm" onClick={() => setIsAddingLeave(false)}>Cancel</Button>
                                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleAddLeave}>Save Leave</Button>
                                        </div>
                                    </div>
                                )}

                                {leaveRequests.map((leave) => (
                                    <div key={leave.id} className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 flex flex-col md:flex-row items-start md:items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className={`h-10 w-10 rounded-full flex items-center justify-center font-black text-xs ${leave.type.includes('Sick') ? 'bg-amber-500/10 text-amber-600' : 'bg-emerald-500/10 text-emerald-600'}`}>
                                                {leave.days}D
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm text-black dark:text-zinc-50">{leave.type}</p>
                                                <p className="text-xs text-zinc-500">
                                                    {mounted ? `${new Date(leave.startDate).toLocaleDateString()} - ${new Date(leave.endDate).toLocaleDateString()}` : '...'}
                                                </p>
                                            </div>
                                        </div>
                                        <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 border-none px-3 font-bold uppercase tracking-widest text-[10px]">
                                            {leave.status}
                                        </Badge>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="assets" className="mt-0">
                    <Card className="border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl shadow-xl">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-lg font-black flex items-center gap-2"><Laptop className="text-blue-500" /> Company Assets</CardTitle>
                            {userRole === 'admin' && (
                                <Button size="sm" onClick={() => setIsAddingAsset(true)} className="bg-zinc-900 dark:bg-white text-white dark:text-black rounded-full shadow-lg">
                                    <PlusCircle size={14} className="mr-2" /> Assign Asset
                                </Button>
                            )}
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {isAddingAsset && (
                                <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-4 space-y-4 mb-6">
                                    <h4 className="font-black text-sm uppercase tracking-widest text-zinc-500">Assign New Asset</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="space-y-1">
                                            <Label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Category</Label>
                                            <select
                                                value={newAsset.category}
                                                onChange={(e) => setNewAsset({ ...newAsset, category: e.target.value })}
                                                className="w-full h-10 px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                            >
                                                <option value="Laptop">Laptop</option>
                                                <option value="Phone">Phone</option>
                                                <option value="Monitor">Monitor</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Brand</label>
                                            <Input placeholder="e.g. Apple, Dell" value={newAsset.brand} onChange={(e) => setNewAsset({...newAsset, brand: e.target.value})} />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Serial Number</label>
                                            <Input placeholder="e.g. SN-12345" value={newAsset.serialNumber} onChange={(e) => setNewAsset({...newAsset, serialNumber: e.target.value})} />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Notes (Optional)</label>
                                        <Textarea placeholder="Additional details, condition, or special instructions..." value={newAsset.notes} onChange={(e) => setNewAsset({...newAsset, notes: e.target.value})} className="h-20" />
                                    </div>
                                    <div className="flex gap-2 justify-end mt-2">
                                        <Button onClick={() => setIsAddingAsset(false)} variant="ghost" size="sm">Cancel</Button>
                                        <Button onClick={handleAddAsset} size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">Submit Request</Button>
                                    </div>
                                </div>
                            )}

                            {isAssetsLoading ? (
                                <div className="p-8 text-center text-zinc-500">Loading assets...</div>
                            ) : employeeAssets.length === 0 ? (
                                <div className="p-8 text-center text-zinc-500">No assets assigned or requested.</div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {employeeAssets.map((asset) => (
                                        <div key={asset.id} className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors group">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600">
                                                    <Laptop size={20} />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm text-black dark:text-zinc-50">{asset.name || asset.brand} {asset.category || asset.type}</p>
                                                    <p className="text-xs text-zinc-500">S/N: {asset.serialNumber}</p>
                                                    {asset.notes && (
                                                        <p className="text-[10px] text-zinc-400 mt-1 italic border-l-2 border-zinc-200 dark:border-zinc-800 pl-2">
                                                            {asset.notes}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2 items-end">
                                                <Badge className={cn(
                                                    "border-none px-3 font-bold uppercase tracking-widest text-[9px]",
                                                    asset.status === 'Assigned' ? "bg-emerald-500/10 text-emerald-600" :
                                                    asset.status === 'Pending Approval' ? "bg-amber-500/10 text-amber-600" :
                                                    asset.status === 'Rejected' ? "bg-rose-500/10 text-rose-600" :
                                                    "bg-zinc-500/10 text-zinc-600"
                                                )}>
                                                    {asset.status}
                                                </Badge>
                                                {asset.status === 'Pending Approval' && (
                                                    <div className="flex gap-1 mt-1">
                                                        <Button size="sm" variant="ghost" className="h-6 px-2 text-[10px] text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20" onClick={() => handleUpdateAssetStatus(asset.id, 'Assigned')}>Accept</Button>
                                                        <Button size="sm" variant="ghost" className="h-6 px-2 text-[10px] text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-900/20" onClick={() => handleUpdateAssetStatus(asset.id, 'Rejected')}>Reject</Button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="lifecycle" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* AI Intelligence Card */}
                        <Card className="border-zinc-200 dark:border-zinc-800 bg-zinc-950 text-white overflow-hidden shadow-2xl relative col-span-1 md:col-span-2">
                            <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
                                <Brain size={160} />
                            </div>
                            <CardHeader className="relative z-10">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-2xl bg-blue-600 flex items-center justify-center">
                                            <Sparkles size={20} className="text-white" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl font-black">AI Career Intelligence</CardTitle>
                                            <p className="text-xs text-zinc-400 font-medium">Predictive modeling for professional growth</p>
                                        </div>
                                    </div>
                                    <Badge className="bg-blue-600/20 text-blue-400 border-none text-[10px] font-black uppercase tracking-widest px-3">Advanced Analytics</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="relative z-10 pb-8">
                                <div className="max-w-2xl">
                                    <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                                        Analyze {employee.firstName}'s current role, technical stack, and performance history to generate a personalized career roadmap and identify specific skill gaps.
                                    </p>
                                    <Button 
                                        onClick={() => setSelectedEmployeeForCareer({ id: employee.id, name: `${employee.firstName} ${employee.lastName}` })}
                                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full font-black text-xs px-8 h-12 shadow-xl shadow-blue-500/20"
                                    >
                                        <Brain className="mr-2 h-4 w-4" /> Generate Career Roadmap
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Operational Actions */}
                        <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-xl">
                            <CardHeader>
                                <CardTitle className="text-lg font-black flex items-center gap-2"><Briefcase className="text-indigo-500" /> Operational Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button 
                                    variant="outline" 
                                    className="w-full justify-start gap-3 rounded-2xl h-14 font-bold border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                                    onClick={() => handleLifecycleAction("onboarding")}
                                >
                                    <Sparkles className="h-5 w-5 text-blue-500" /> 
                                    <div className="text-left">
                                        <p className="text-sm">Initiate Onboarding</p>
                                        <p className="text-[10px] text-zinc-400 font-medium">Reset workflow to day zero</p>
                                    </div>
                                </Button>
                                <Button 
                                    variant="outline" 
                                    className="w-full justify-start gap-3 rounded-2xl h-14 font-bold border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                                    onClick={() => toast.info("Security audit initiated")}
                                >
                                    <ShieldCheck className="h-5 w-5 text-emerald-500" /> 
                                    <div className="text-left">
                                        <p className="text-sm">Security Audit</p>
                                        <p className="text-[10px] text-zinc-400 font-medium">Verify access and compliance</p>
                                    </div>
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Critical Actions */}
                        <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-xl">
                            <CardHeader>
                                <CardTitle className="text-lg font-black flex items-center gap-2"><AlertCircle className="text-rose-500" /> Critical Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button 
                                    variant="outline" 
                                    className="w-full justify-start gap-3 rounded-2xl h-14 font-bold border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-rose-600 hover:text-rose-700 hover:border-rose-100"
                                    onClick={() => handleLifecycleAction("offboarding")}
                                >
                                    <LogOut className="h-5 w-5" /> 
                                    <div className="text-left">
                                        <p className="text-sm">Initiate Offboarding</p>
                                        <p className="text-[10px] text-zinc-400 font-medium">Formal exit process</p>
                                    </div>
                                </Button>
                                <Button 
                                    variant="outline" 
                                    className="w-full justify-start gap-3 rounded-2xl h-14 font-bold border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-500"
                                    onClick={() => toast.info("Termination flow placeholder")}
                                >
                                    <Trash2 className="h-5 w-5" /> 
                                    <div className="text-left">
                                        <p className="text-sm">Immediate Termination</p>
                                        <p className="text-[10px] text-zinc-400 font-medium">Emergency access revocation</p>
                                    </div>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

            </Tabs>

            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-[32px] border-none shadow-2xl p-0">
                    <div className="p-8">
                    <DialogHeader>
                        <DialogTitle>{userRole === 'admin' ? `Edit ${editSection}` : `Request Change: ${editSection}`}</DialogTitle>
                        <DialogDescription>
                            {userRole === 'admin' 
                                ? `As an administrator, you are making direct changes to this employee's ${editSection.toLowerCase()}.` 
                                : `Please describe the changes you would like to make to your ${editSection.toLowerCase()}. HR will review and update your profile accordingly.`}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                        {userRole === 'admin' && editSection === "Personal Details" && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">First Name</label>
                                        <Input value={editForm.firstName} onChange={(e) => setEditForm({...editForm, firstName: e.target.value})} className="h-10" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Last Name</label>
                                        <Input value={editForm.lastName} onChange={(e) => setEditForm({...editForm, lastName: e.target.value})} className="h-10" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Role</label>
                                        <Input value={editForm.role} onChange={(e) => setEditForm({...editForm, role: e.target.value})} className="h-10" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Department</label>
                                        <Input value={editForm.department} onChange={(e) => setEditForm({...editForm, department: e.target.value})} className="h-10" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Status</label>
                                        <select 
                                            className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
                                            value={editForm.status}
                                            onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                                        >
                                            <option value="Active">Active</option>
                                            <option value="On Leave">On Leave</option>
                                            <option value="Offboarded">Offboarded</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Date of Birth</label>
                                        <Input type="date" value={editForm.dateOfBirth} onChange={(e) => setEditForm({...editForm, dateOfBirth: e.target.value})} className="h-10" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Gender</label>
                                        <select 
                                            className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
                                            value={editForm.gender}
                                            onChange={(e) => setEditForm({...editForm, gender: e.target.value})}
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Marital Status</label>
                                        <select 
                                            className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
                                            value={editForm.maritalStatus}
                                            onChange={(e) => setEditForm({...editForm, maritalStatus: e.target.value})}
                                        >
                                            <option value="">Select Status</option>
                                            <option value="Single">Single</option>
                                            <option value="Married">Married</option>
                                            <option value="Divorced">Divorced</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-1 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Update Nationality</label>
                                    <select 
                                        className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
                                        value={selectedNationality}
                                        onChange={(e) => handleNationalityChange(e.target.value)}
                                    >
                                        <option value="Saudi">🇸🇦 Saudi Arabia</option>
                                        <option value="Egyptian">🇪🇬 Egypt</option>
                                        <option disabled>──────────</option>
                                        <option value="Jordanian">Jordanian</option>
                                        <option value="Lebanese">Lebanese</option>
                                        <option value="Emirati">Emirati</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                {showStatutoryPrompt && (
                                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-3 animate-in slide-in-from-top-2 duration-300">
                                        <div className="flex items-center gap-2">
                                            <ShieldCheck className="text-amber-500" size={16} />
                                            <p className="text-xs font-black text-amber-700 dark:text-amber-400 uppercase tracking-widest">Statutory Recommendation</p>
                                        </div>
                                        <p className="text-[11px] font-medium text-amber-800 dark:text-amber-200 leading-relaxed">
                                            You have selected **Saudi Arabia**. Typically, these members are applicable for GOSI. Would you like to activate GOSI for this user now?
                                        </p>
                                        <div className="flex gap-2">
                                            <Button 
                                                size="sm" 
                                                variant="secondary" 
                                                className="h-8 rounded-full bg-amber-500 text-white hover:bg-amber-600 font-bold text-[10px] px-4"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setIsGosiApplicable(true);
                                                    setShowStatutoryPrompt(false);
                                                    toast.success("GOSI applicability recommended and queued.");
                                                }}
                                            >
                                                Yes, Activate GOSI
                                            </Button>
                                            <Button 
                                                size="sm" 
                                                variant="ghost" 
                                                className="h-8 rounded-full text-amber-700 dark:text-amber-400 font-bold text-[10px] px-4 hover:bg-amber-500/10"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setShowStatutoryPrompt(false);
                                                }}
                                            >
                                                Skip for now
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {userRole === 'admin' && editSection === "Contact Information" && (
                            <div className="space-y-6">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Work Email Address</label>
                                    <Input value={editForm.email} onChange={(e) => setEditForm({...editForm, email: e.target.value})} className="h-10" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Phone Number</label>
                                    <Input value={editForm.phone} onChange={(e) => setEditForm({...editForm, phone: e.target.value})} className="h-10" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Residential Address</label>
                                    <Textarea value={editForm.address} onChange={(e) => setEditForm({...editForm, address: e.target.value})} className="h-24" />
                                </div>
                            </div>
                        )}

                        {userRole === 'admin' && editSection === "Financial & Salary" && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Bank Name</label>
                                        <Input value={editForm.bankName} onChange={(e) => setEditForm({...editForm, bankName: e.target.value})} className="h-10" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Account Number (IBAN)</label>
                                        <Input value={editForm.accountNumber} onChange={(e) => setEditForm({...editForm, accountNumber: e.target.value})} className="h-10 font-mono" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Preferred Currency</label>
                                        <select 
                                            className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
                                            value={editForm.currency}
                                            onChange={(e) => setEditForm({...editForm, currency: e.target.value as any})}
                                        >
                                            <option value="SAR">SAR - Saudi Riyal</option>
                                            <option value="EGP">EGP - Egyptian Pound</option>
                                            <option value="USD">USD - US Dollar</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div className="p-5 rounded-3xl bg-zinc-50 border border-zinc-200 space-y-6">
                                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Salary Architecture Editor</p>
                                    
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Basic Salary</label>
                                            <Input type="number" value={editForm.salary} onChange={(e) => setEditForm({...editForm, salary: e.target.value})} className="h-10 font-bold border-emerald-100" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Housing Allowance</label>
                                            <Input type="number" value={editForm.housingAllowance} onChange={(e) => setEditForm({...editForm, housingAllowance: e.target.value})} className="h-10 font-bold border-emerald-100" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Transportation</label>
                                            <Input type="number" value={editForm.transportationAllowance} onChange={(e) => setEditForm({...editForm, transportationAllowance: e.target.value})} className="h-10 font-bold border-blue-100" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Other Allowance</label>
                                            <Input type="number" value={editForm.otherAllowance} onChange={(e) => setEditForm({...editForm, otherAllowance: e.target.value})} className="h-10 font-bold" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Laptop</label>
                                            <Input type="number" value={editForm.laptopAllowance} onChange={(e) => setEditForm({...editForm, laptopAllowance: e.target.value})} className="h-10 font-bold" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Overtime</label>
                                            <Input type="number" value={editForm.overtime} onChange={(e) => setEditForm({...editForm, overtime: e.target.value})} className="h-10 font-bold" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Bonus</label>
                                            <Input type="number" value={editForm.bonus} onChange={(e) => setEditForm({...editForm, bonus: e.target.value})} className="h-10 font-bold" />
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-zinc-200 flex justify-between items-center">
                                        <p className="text-[10px] font-black text-zinc-600 uppercase">Calculated Gross</p>
                                        <p className="text-xl font-black text-emerald-600">
                                            SAR {(
                                                Number(editForm.salary || 0) + 
                                                Number(editForm.housingAllowance || 0) + 
                                                Number(editForm.transportationAllowance || 0) + 
                                                Number(editForm.otherAllowance || 0) + 
                                                Number(editForm.laptopAllowance || 0) + 
                                                Number(editForm.overtime || 0) + 
                                                Number(editForm.bonus || 0)
                                            ).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {userRole === 'admin' && editSection === "Emergency Contact" && (
                            <div className="space-y-6">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Contact Name</label>
                                    <Input value={editForm.emergencyContactName} onChange={(e) => setEditForm({...editForm, emergencyContactName: e.target.value})} className="h-10" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Relationship</label>
                                    <Input value={editForm.emergencyContactRel} onChange={(e) => setEditForm({...editForm, emergencyContactRel: e.target.value})} className="h-10" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Emergency Phone</label>
                                    <Input value={editForm.emergencyContactPhone} onChange={(e) => setEditForm({...editForm, emergencyContactPhone: e.target.value})} className="h-10" />
                                </div>
                            </div>
                        )}

                        {/* Standard User Request Box */}
                        {userRole !== 'admin' && (
                            <Textarea 
                                placeholder={`Example: Please update my ${editSection.toLowerCase()} to...`} 
                                className="min-h-[100px]"
                                value={editRequestText}
                                onChange={(e) => setEditRequestText(e.target.value)}
                            />
                        )}
                    </div>
                </div>
                <div className="p-8 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 flex justify-end gap-3">
                        <Button variant="outline" className="rounded-full px-6 font-bold" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
                        <Button 
                            className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest text-[10px] px-8 shadow-lg shadow-blue-500/20"
                            onClick={submitEditRequest}
                        >
                            {userRole === 'admin' ? "Save Changes" : "Submit Request"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
