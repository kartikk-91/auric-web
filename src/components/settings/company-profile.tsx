"use client";

import { useEffect, useRef, useState } from "react";
import { Building2, Loader2, Camera, Check, AlertCircle } from "lucide-react";

type Company = {
  c_id: string;
  cname: string;
  phoneNumber: string;
  address: string;
  logoUrl: string | null;
  description: string | null;
  website: string | null;
};

export default function CompanyProfile() {
  const [company, setCompany] = useState<Company | null>(null);
  const [form, setForm] = useState({
    cname: "",
    phoneNumber: "",
    address: "",
    description: "",
    website: "",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/company");
        if (!res.ok) throw new Error();
        const data: Company = await res.json();
        setCompany(data);
        setForm({
          cname: data.cname ?? "",
          phoneNumber: data.phoneNumber ?? "",
          address: data.address ?? "",
          description: data.description ?? "",
          website: data.website ?? "",
        });
      } catch {
        setError("Couldn't load your company profile.");
      }
    })();
  }, []);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/company", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save changes.");
      setCompany(data);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setUploadingLogo(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/company/logo", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to upload logo.");
      setCompany((prev) => (prev ? { ...prev, logoUrl: data.logoUrl } : prev));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload logo.");
    } finally {
      setUploadingLogo(false);
    }
  };

  if (!company) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">
        <div className="animate-pulse">
          <div className="h-4 w-32 sm:w-40 bg-gray-100 rounded mb-2" />
          <div className="h-3 w-48 sm:w-64 bg-gray-100 rounded mb-6" />

          <div className="flex items-center gap-4 mb-6">
            <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-gray-100 shrink-0" />
            <div className="space-y-2">
              <div className="h-3 w-16 bg-gray-100 rounded" />
              <div className="h-2.5 w-36 bg-gray-100 rounded" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="space-y-1.5">
              <div className="h-2.5 w-20 bg-gray-100 rounded" />
              <div className="h-9 bg-gray-100 rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <div className="h-2.5 w-24 bg-gray-100 rounded" />
              <div className="h-9 bg-gray-100 rounded-xl" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="space-y-1.5">
              <div className="h-2.5 w-16 bg-gray-100 rounded" />
              <div className="h-9 bg-gray-100 rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <div className="h-2.5 w-14 bg-gray-100 rounded" />
              <div className="h-9 bg-gray-100 rounded-xl" />
            </div>
          </div>

          <div className="space-y-1.5 mb-6">
            <div className="h-2.5 w-24 bg-gray-100 rounded" />
            <div className="h-20 bg-gray-100 rounded-xl" />
          </div>

          <div className="flex justify-end">
            <div className="h-10 w-32 bg-gray-100 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">
      <h2 className="text-base font-semibold text-gray-900 mb-1">Company profile</h2>
      <p className="text-sm text-gray-500 mb-6">
        This information helps AuricBot describe your company accurately.
      </p>

      
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-blue-50 border border-gray-100 flex items-center justify-center overflow-hidden">
            {company.logoUrl ? (
              <img src={company.logoUrl} alt="Company logo" className="w-full h-full object-cover" />
            ) : (
              <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            )}
          </div>
          <button
            onClick={() => logoInputRef.current?.click()}
            className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-sm hover:bg-blue-700 transition-colors"
            aria-label="Change logo"
          >
            {uploadingLogo ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <Camera className="w-3 h-3" />
            )}
          </button>
          <input
            ref={logoInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            className="hidden"
            onChange={handleLogoChange}
          />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">Logo</p>
          <p className="text-xs text-gray-400 truncate">PNG, JPG, WEBP, or SVG — up to 2MB</p>
        </div>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <Field label="Company name">
          <input
            value={form.cname}
            onChange={(e) => handleChange("cname", e.target.value)}
            maxLength={255}
            className="input"
          />
        </Field>
        <Field label="Phone number">
          <input
            value={form.phoneNumber}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
            maxLength={20}
            className="input"
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <Field label="Address">
          <input
            value={form.address}
            onChange={(e) => handleChange("address", e.target.value)}
            maxLength={255}
            className="input"
          />
        </Field>
        <Field label="Website">
          <input
            value={form.website}
            onChange={(e) => handleChange("website", e.target.value)}
            maxLength={255}
            placeholder="https://"
            className="input"
          />
        </Field>
      </div>

      <Field label="Description">
        <textarea
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
          maxLength={255}
          rows={3}
          placeholder="What does your company do?"
          className="input resize-none"
        />
        <p className="text-xs text-gray-400 mt-1 text-right">{form.description.length}/255</p>
      </Field>

      {error && (
        <div className="flex items-center gap-2 mt-2 text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-end gap-3 mt-6">
        {saved && (
          <span className="flex items-center gap-1 text-sm text-emerald-600">
            <Check className="w-4 h-4" /> Saved
          </span>
        )}
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors disabled:opacity-60"
        >
          {saving && <Loader2 className="w-4 h-4 animate-spin" />}
          Save changes
        </button>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          border: 1px solid #e5e7eb;
          border-radius: 0.75rem;
          padding: 0.5rem 0.75rem;
          font-size: 16px;
          color: #111827;
          outline: none;
          transition: border-color 0.15s;
        }
        .input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }
        @media (min-width: 640px) {
          .input {
            font-size: 0.875rem;
          }
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1.5">{label}</label>
      {children}
    </div>
  );
}