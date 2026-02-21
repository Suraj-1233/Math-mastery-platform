
'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';

interface SubmissionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isSubmitting: boolean;
    stats: {
        answered: number;
        marked: number;
        total: number;
    };
}

export function SubmissionModal({ isOpen, onClose, onConfirm, isSubmitting, stats }: SubmissionModalProps) {
    if (!isOpen) return null;

    const unanswered = stats.total - stats.answered;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-secondary/60 backdrop-blur-sm"
                />

                {/* Modal Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
                >
                    {/* Header Decorative Bar */}
                    <div className="h-2 w-full bg-error" />

                    <div className="p-8 pb-10">
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute right-6 top-6 rounded-full p-2 text-muted hover:bg-muted-light transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        {/* Icon & Title */}
                        <div className="mb-6 flex flex-col items-center text-center">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-error-light text-error">
                                <AlertCircle className="h-10 w-10" />
                            </div>
                            <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">Final Submission</h2>
                            <p className="mt-2 text-sm font-medium text-muted">Are you ready to finish your test?</p>
                        </div>

                        {/* Summary Stats */}
                        <div className="mb-8 grid grid-cols-2 gap-3">
                            <div className="rounded-2xl bg-muted-light/50 p-4 border border-border/50 text-center">
                                <span className="block text-[10px] font-bold uppercase tracking-widest text-muted mb-1">Answered</span>
                                <span className="text-xl font-black text-success">{stats.answered}</span>
                            </div>
                            <div className="rounded-2xl bg-muted-light/50 p-4 border border-border/50 text-center">
                                <span className="block text-[10px] font-bold uppercase tracking-widest text-muted mb-1">Not Answered</span>
                                <span className="text-xl font-black text-error">{unanswered}</span>
                            </div>
                        </div>

                        {/* Warning Message */}
                        <div className="mb-8 rounded-2xl bg-warning-light p-4 border border-warning/20">
                            <p className="text-xs font-bold text-warning-dark leading-relaxed">
                                ⚠️ You cannot return to the test once submitted. All marked questions will be treated as {stats.answered > 0 ? 'final answers' : 'not answered'}.
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={onConfirm}
                                disabled={isSubmitting}
                                className="btn btn-secondary py-4 text-base font-bold rounded-2xl shadow-lg hover:shadow-xl active:scale-95 transition-all"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                        Submitting...
                                    </span>
                                ) : (
                                    'Yes, Submit Test'
                                )}
                            </button>
                            <button
                                onClick={onClose}
                                disabled={isSubmitting}
                                className="btn btn-ghost py-4 text-base font-bold rounded-2xl text-muted"
                            >
                                Back to Questions
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
