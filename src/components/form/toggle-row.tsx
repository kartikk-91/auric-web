function ToggleRow({ label, value, onChange }:any) {
  return (
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium">{label}</label>

      <button
        onClick={onChange}
        className={`relative h-6 w-11 rounded-full ${
          value ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 bg-white rounded-full transition ${
            value ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}