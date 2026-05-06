interface FormInputProps {
  icon: React.ReactNode;
  placeholder: string;
  type?: string;
  error?: string;
  registration: any;
  disabled?: boolean;
  rightEl?: React.ReactNode;
}


export function FormInput({
  icon,
  placeholder,
  type = "text",
  error,
  registration,
  disabled,
  rightEl
}: FormInputProps) {
  return (
    <div>
      <div className={`flex items-center gap-3 border rounded-xl px-4 py-3 bg-white transition-all duration-200 ${error
          ? "border-red-300 focus-within:border-red-400 focus-within:ring-2 focus-within:ring-red-100"
          : "border-slate-200 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100"
        }`}>
        <span className="text-slate-400 shrink-0">{icon}</span>
        <input
          {...registration}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 text-sm text-slate-700 placeholder-slate-400 outline-none bg-transparent disabled:opacity-50"
        />
        {rightEl && <span className="text-slate-400 shrink-0">{rightEl}</span>}
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}