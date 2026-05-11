"use client"

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Users, Shield, Rocket, Info, ChevronRight } from "lucide-react"
import { toast } from "sonner"

interface LaunchReviewCycleModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LaunchReviewCycleModal({ isOpen, onClose }: LaunchReviewCycleModalProps) {
  const [step, setStep] = useState(1)

  const handleLaunch = () => {
    toast.success("Q2 360 Review Cycle Launched successfully!")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden border-none bg-white dark:bg-zinc-950">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Rocket size={120} />
          </div>
          <DialogHeader>
            <DialogTitle className="text-2xl font-black tracking-tighter text-white">Launch Review Cycle</DialogTitle>
            <DialogDescription className="text-blue-100 font-medium">
              Configure the parameters for the upcoming 360° performance evaluation.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-8 space-y-6">
          {step === 1 && (
             <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase text-zinc-500">Cycle Name</Label>
                    <Input placeholder="e.g. Q2 2024 Performance Review" className="rounded-xl border-zinc-200 dark:border-zinc-800" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase text-zinc-500">Review Type</Label>
                    <div className="flex gap-2">
                       <Button variant="outline" size="sm" className="rounded-full bg-blue-50 border-blue-200 text-blue-600 font-bold text-[10px]">360 FEEDBACK</Button>
                       <Button variant="ghost" size="sm" className="rounded-full text-zinc-400 font-bold text-[10px]">ANNUAL KPI</Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase text-zinc-500">Start Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                      <Input type="date" className="pl-10 rounded-xl border-zinc-200 dark:border-zinc-800" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase text-zinc-500">End Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                      <Input type="date" className="pl-10 rounded-xl border-zinc-200 dark:border-zinc-800" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                   <Label className="text-xs font-bold uppercase text-zinc-500">Description & Goals</Label>
                   <Textarea placeholder="Explain the purpose of this review cycle to the employees..." className="min-h-[100px] rounded-xl border-zinc-200 dark:border-zinc-800 resize-none" />
                </div>
             </div>
          )}

          {step === 2 && (
             <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <div className="space-y-3">
                   <div className="flex items-center gap-2">
                      <Users className="text-blue-600" size={18} />
                      <Label className="text-sm font-bold">Assignees (Who will be reviewed?)</Label>
                   </div>
                   <div className="grid grid-cols-3 gap-2">
                      {['All Employees', 'Engineering', 'Product', 'Sales', 'Marketing', 'HR'].map(dept => (
                        <Button key={dept} variant="outline" className="text-[10px] font-bold rounded-xl border-zinc-200 dark:border-zinc-800 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200">
                          {dept}
                        </Button>
                      ))}
                   </div>
                </div>

                <div className="space-y-3">
                   <div className="flex items-center gap-2">
                      <Shield className="text-indigo-600" size={18} />
                      <Label className="text-sm font-bold">Reviewing Managers</Label>
                   </div>
                   <div className="p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 space-y-2">
                      <div className="flex items-center justify-between">
                         <span className="text-xs font-medium text-zinc-500">Automatic pairing based on org chart</span>
                         <Badge className="bg-emerald-500/10 text-emerald-600 border-none text-[9px]">ENABLED</Badge>
                      </div>
                      <p className="text-[10px] text-zinc-400 leading-relaxed">
                        Managers will be automatically assigned to review their direct reports. You can manually override these in the next step.
                      </p>
                   </div>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-200 dark:border-amber-900/30 flex gap-3">
                   <Info className="text-amber-600 shrink-0" size={18} />
                   <p className="text-[11px] text-amber-700 dark:text-amber-400 font-medium">
                     Once launched, invitations will be sent to all 24 assignees. The AI will monitor submission rates and send reminders 48h before the deadline.
                   </p>
                </div>
             </div>
          )}
        </div>

        <DialogFooter className="p-8 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex w-full gap-3">
            <Button variant="ghost" className="flex-1 rounded-xl font-bold" onClick={onClose}>Discard</Button>
            {step === 1 ? (
              <Button className="flex-1 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-black rounded-xl font-bold" onClick={() => setStep(2)}>
                Next: Assignees <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20" onClick={handleLaunch}>
                Launch Cycle Now
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
