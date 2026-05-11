"use client"

import React, { useState } from 'react'
import ThreeSixtyReviewForm from '@/components/performance/ThreeSixtyReviewForm'
import { motion } from 'framer-motion'
import { ArrowLeft, Sparkles, UserCircle } from 'lucide-react'
import NextLink from 'next/link'
import { Button } from '@/components/ui/button'

export default function ThreeSixtyReviewPage() {
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null)

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
      </div>

      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <NextLink href="/performance">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800">
                <ArrowLeft size={20} className="text-zinc-500" />
              </Button>
            </NextLink>
            <div>
              <h1 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                Q1 2024 Performance Workspace <Sparkles size={18} className="text-blue-500" />
              </h1>
              <p className="text-xs text-zinc-500 font-medium">360° Feedback Cycle • Ends in 12 days</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-zinc-100 dark:bg-zinc-900 p-1.5 rounded-full border border-zinc-200 dark:border-zinc-800">
             <div className="flex -space-x-2 px-2">
                {[1,2,3].map(i => (
                   <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-zinc-900 bg-zinc-200 dark:bg-zinc-800" />
                ))}
             </div>
             <span className="text-xs font-semibold px-2 pr-4 text-zinc-600 dark:text-zinc-400">4 Reviews Pending</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Sidebar - Target Selector */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400">Select Review Target</h2>
              <div className="space-y-2">
                {[
                  { name: 'Self Assessment', role: 'Product Designer', type: 'self', id: '1' },
                  { name: 'Sarah Ahmed', role: 'Lead Developer', type: 'manager', id: '2' },
                  { name: 'John Doe', role: 'UI Engineer', type: 'peer', id: '3' },
                  { name: 'Mona Aly', role: 'QA Analyst', type: 'peer', id: '4' },
                ].map((target) => (
                  <button
                    key={target.id}
                    onClick={() => setSelectedTarget(target.id)}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all ${
                      selectedTarget === target.id
                        ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20'
                        : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white hover:border-blue-500/50'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${selectedTarget === target.id ? 'bg-white/20' : 'bg-zinc-100 dark:bg-zinc-800'}`}>
                       <UserCircle size={20} />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold leading-none">{target.name}</p>
                      <p className={`text-[10px] mt-1 ${selectedTarget === target.id ? 'text-blue-100' : 'text-zinc-500'}`}>{target.role}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-600/5 border border-blue-600/20 space-y-3">
               <h3 className="text-xs font-bold text-blue-600 uppercase">Review Guidelines</h3>
               <ul className="text-[11px] text-zinc-600 dark:text-zinc-400 space-y-2 leading-relaxed">
                 <li>• Be objective and provide examples.</li>
                 <li>• Focus on growth and constructive feedback.</li>
                 <li>• All peer reviews are anonymized for the recipient.</li>
               </ul>
            </div>
          </aside>

          {/* Form Area */}
          <div className="lg:col-span-3">
             {selectedTarget ? (
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 key={selectedTarget}
               >
                 <ThreeSixtyReviewForm />
               </motion.div>
             ) : (
               <div className="h-[600px] flex flex-col items-center justify-center text-center space-y-4 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl bg-zinc-50/50 dark:bg-zinc-900/20">
                  <div className="p-6 bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-400">
                    <UserCircle size={48} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Choose a review target</h3>
                    <p className="text-zinc-500 text-sm max-w-xs mx-auto">Select yourself, a peer, or your manager from the sidebar to begin the evaluation process.</p>
                  </div>
               </div>
             )}
          </div>

        </div>
      </div>
    </main>
  )
}
