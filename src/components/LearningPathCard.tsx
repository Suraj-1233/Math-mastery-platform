'use client';

import React, { useState } from 'react';
import { LearningPath } from '@/data/learningPaths';
import { motion, AnimatePresence } from 'framer-motion';

interface LearningPathCardProps {
    path: LearningPath;
}

export default function LearningPathCard({ path }: LearningPathCardProps) {
    const [expanded, setExpanded] = useState(false);

    // Calculate total duration (sum of steps) - approximate
    const totalSteps = path.steps.length;

    return (
        <motion.div
            layout
            className="card-premium overflow-hidden flex flex-col h-full cursor-pointer hover:border-primary/50"
            onClick={() => setExpanded(!expanded)}
        >
            {/* Header */}
            <div className="p-6 transition-colors group">
                <div className="flex justify-between items-start mb-4">
                    <span className="badge badge-primary">
                        {path.difficulty} Path
                    </span>
                    <span className="text-xs text-muted badge badge-outline">
                        {path.totalDuration}m
                    </span>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {path.topic} Mastery
                </h3>
                <p className="text-muted text-sm mb-4 leading-relaxed">
                    {path.description}
                </p>

                {/* Progress Visual */}
                <div className="flex items-center gap-3">
                    <div className="flex-grow h-2 bg-muted-light rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-0 transition-all"></div> {/* 0% progress initially */}
                    </div>
                    <span className="text-xs text-muted font-medium font-mono">0/{totalSteps} Steps</span>
                </div>
            </div>

            {/* Expanded Steps */}
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-surface border-t border-border"
                    >
                        <div className="p-6 space-y-6">
                            {path.steps.map((step, idx) => (
                                <div key={idx} className="relative pl-8 border-l-2 border-border last:border-l-transparent pb-6 last:pb-0">
                                    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-surface border-2 border-primary"></div>

                                    <h4 className="text-foreground font-semibold text-sm mb-1">
                                        Step {step.step}: {step.name}
                                    </h4>
                                    <p className="text-muted text-xs mb-3 leading-relaxed">
                                        {step.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 text-xs font-medium">
                                        <span className="badge badge-outline">
                                            ⏱️ {step.duration}
                                        </span>
                                        <span className="badge badge-primary">
                                            🎯 {step.type}
                                        </span>
                                    </div>

                                    {/* Action Button */}
                                    <button className="mt-4 btn btn-outline btn-sm w-full">
                                        Start Step
                                    </button>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Footer Action */}
            {!expanded && (
                <div className="p-4 bg-muted-light/30 text-center border-t border-border mt-auto">
                    <span className="text-sm font-semibold text-primary transition-colors">
                        View Full Roadmap 👇
                    </span>
                </div>
            )}
        </motion.div>
    );
}
