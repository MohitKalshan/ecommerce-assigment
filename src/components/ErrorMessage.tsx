import { AlertTriangle } from "lucide-react";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
      <div className="glass-card p-10 max-w-md w-full">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-50 rounded-full mb-6">
          <AlertTriangle className="h-8 w-8 text-rose-500" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">
          Something went wrong
        </h2>
        <p className="text-slate-500 mb-8">{message}</p>
        {onRetry && (
          <button onClick={onRetry} className="btn-primary w-full">
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
