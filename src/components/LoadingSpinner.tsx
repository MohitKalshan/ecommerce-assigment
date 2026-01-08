export function LoadingSpinner() {
  return (
    <div className="flex flex-col justify-center items-center min-h-[400px] space-y-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p className="text-slate-400 font-medium animate-pulse">
        Loading amazing products...
      </p>
    </div>
  );
}
