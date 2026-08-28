import React from 'react';
import { useToast } from '../context/ToastContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 max-w-md w-full pointer-events-none">
      {toasts.map((toast) => {
        let Icon: React.ElementType = Info;
        let bgClass = 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800';
        let iconColor = 'text-blue-600 dark:text-blue-400';
        let textColor = 'text-blue-900 dark:text-blue-100';

        if (toast.type === 'success') {
          Icon = CheckCircle2;
          bgClass = 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800';
          iconColor = 'text-emerald-600 dark:text-emerald-400';
          textColor = 'text-emerald-900 dark:text-emerald-100';
        } else if (toast.type === 'error') {
          Icon = AlertCircle;
          bgClass = 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800';
          iconColor = 'text-rose-600 dark:text-rose-400';
          textColor = 'text-rose-900 dark:text-rose-100';
        } else if (toast.type === 'warning') {
          Icon = AlertTriangle;
          bgClass = 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800';
          iconColor = 'text-amber-600 dark:text-amber-400';
          textColor = 'text-amber-900 dark:text-amber-100';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-lg border shadow-lg backdrop-blur-sm transition-all duration-200 animate-in fade-in slide-in-from-bottom-3 ${bgClass}`}
          >
            <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconColor}`} />
            <div className={`flex-1 text-sm font-medium leading-relaxed ${textColor}`}>
              {toast.text}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
