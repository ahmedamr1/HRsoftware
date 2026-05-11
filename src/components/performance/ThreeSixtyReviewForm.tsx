"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Target, Users, Briefcase, ChevronRight, ChevronLeft, Save, Send, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

type ReviewType = 'self' | 'peer' | 'manager'

interface Competency {
  name: string
  description: string
  rating: number
}

export default function ThreeSixtyReviewForm() {
  const [reviewType, setReviewType] = useState<ReviewType>('self')
  const [step, setStep] = useState(1)
  const [ratings, setRatings] = useState<Record<string, number>>({})
  
  const competencies: Competency[] = [
    { name: 'Communication', description: 'Effectiveness in sharing information and active listening.', rating: 0 },
    { name: 'Technical Excellence', description: 'Mastery of role-specific tools and methodologies.', rating: 0 },
    { name: 'Collaboration', description: 'Ability to work effectively within and across teams.', rating: 0 },
    { name: 'Problem Solving', description: 'Critical thinking and finding innovative solutions.', rating: 0 },
    ...(reviewType === 'manager' ? [{ name: 'Strategic Vision', description: 'Ability to align team goals with company objectives.', rating: 0 }] : []),
    ...(reviewType === 'manager' ? [{ name: 'Mentorship', description: 'Commitment to developing team members.', rating: 0 }] : []),
  ]

  const handleRating = (name: string, rating: number) => {
    setRatings(prev => ({ ...prev, [name]: rating }))
  }

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Type Selector */}
      <div className="flex justify-center gap-4">
        {(['self', 'peer', 'manager'] as ReviewType[]).map((type) => (
          <button
            key={type}
            onClick={() => { setReviewType(type); setStep(1); }}
            className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all duration-300 w-40 ${
              reviewType === type 
                ? 'bg-blue-600/10 border-blue-600 shadow-lg shadow-blue-600/20' 
                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300'
            }`}
          >
            <div className={`p-3 rounded-full ${reviewType === type ? 'bg-blue-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'}`}>
              {type === 'self' && <Target size={24} />}
              {type === 'peer' && <Users size={24} />}
              {type === 'manager' && <Briefcase size={24} />}
            </div>
            <span className={`text-sm font-semibold capitalize ${reviewType === type ? 'text-blue-600' : 'text-zinc-500'}`}>
              {type} Review
            </span>
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="relative h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${(step / 3) * 100}%` }}
          className="absolute top-0 left-0 h-full bg-blue-600"
        />
      </div>

      <Card className="p-8 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden min-h-[500px]">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">Core Competencies</h3>
                <p className="text-zinc-500 dark:text-zinc-400 mt-1">Rate the proficiency level for this quarter.</p>
              </div>

              <div className="grid gap-6">
                {competencies.map((comp) => (
                  <div key={comp.name} className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 flex items-center justify-between group">
                    <div className="max-w-md">
                      <h4 className="font-semibold text-zinc-900 dark:text-white">{comp.name}</h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">{comp.description}</p>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => handleRating(comp.name, star)}
                          className="p-1 transition-transform hover:scale-125"
                        >
                          <Star
                            size={20}
                            fill={star <= (ratings[comp.name] || 0) ? "#EAB308" : "none"}
                            className={star <= (ratings[comp.name] || 0) ? "text-yellow-500" : "text-zinc-300 dark:text-zinc-700"}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                  {reviewType === 'self' ? 'Key Achievements' : 'Observed Impact'}
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 mt-1">
                  {reviewType === 'self' 
                    ? 'What were your most significant contributions this quarter?' 
                    : `What impact has this ${reviewType} had on the team's success?`}
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    {reviewType === 'self' ? 'Top 3 Accomplishments' : 'Key Strengths Observed'}
                  </label>
                  <textarea 
                    className="w-full h-32 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:ring-2 focus:ring-blue-600 outline-none resize-none transition-all"
                    placeholder="Provide specific examples..."
                  />
                </div>

                {reviewType === 'peer' && (
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Team Collaboration</label>
                    <textarea 
                      className="w-full h-32 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:ring-2 focus:ring-blue-600 outline-none resize-none transition-all"
                      placeholder="How does this person support their teammates?"
                    />
                  </div>
                )}

                {reviewType === 'manager' && (
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Guidance & Support</label>
                    <textarea 
                      className="w-full h-32 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:ring-2 focus:ring-blue-600 outline-none resize-none transition-all"
                      placeholder="How effectively does this manager provide direction and feedback?"
                    />
                  </div>
                )}

                <div className="flex items-center gap-2 text-amber-600 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-200 dark:border-amber-900/30">
                  <AlertCircle size={16} />
                  <span className="text-xs font-medium">Focus on specific metrics and outcomes where possible.</span>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">Growth & Development</h3>
                <p className="text-zinc-500 dark:text-zinc-400 mt-1">Identify areas for improvement and future goals.</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    {reviewType === 'self' ? 'Development Goals' : 'Constructive Feedback'}
                  </label>
                  <textarea 
                    className="w-full h-32 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:ring-2 focus:ring-blue-600 outline-none resize-none transition-all"
                    placeholder={reviewType === 'self' ? "What skills would you like to develop?" : "What is one thing this person could do differently to be more effective?"}
                  />
                </div>

                {reviewType === 'manager' && (
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Communication & Culture</label>
                    <textarea 
                      className="w-full h-32 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:ring-2 focus:ring-blue-600 outline-none resize-none transition-all"
                      placeholder="Suggestions for improving team communication or culture..."
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Next Quarter Focus</label>
                  <textarea 
                    className="w-full h-32 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:ring-2 focus:ring-blue-600 outline-none resize-none transition-all"
                    placeholder="Specific objectives for the next 3 months..."
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      <div className="flex justify-between items-center px-4">
        <Button 
          variant="outline" 
          onClick={prevStep}
          disabled={step === 1}
          className="rounded-xl px-8 h-12 transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <div className="flex gap-3">
          <Button 
            variant="ghost" 
            className="rounded-xl px-8 h-12 text-zinc-500 hover:text-blue-600"
          >
            <Save className="mr-2 h-4 w-4" /> Save Draft
          </Button>
          
          {step < 3 ? (
            <Button 
              onClick={nextStep}
              className="rounded-xl px-8 h-12 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/30"
            >
              Continue <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button 
              className="rounded-xl px-8 h-12 bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/30"
            >
              Submit Review <Send className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
