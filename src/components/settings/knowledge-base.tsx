"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FileText, Loader2, Trash2, UploadCloud, AlertCircle, Database, Clock } from "lucide-react";

type KnowledgeDocument = {
  document_id: string;
  name: string;
  type: string;
  uploadedAt: string;
};

const TYPE_STYLES: Record<string, string> = {
  pdf: "bg-red-50 text-red-600",
  docx: "bg-blue-50 text-blue-600",
  doc: "bg-blue-50 text-blue-600",
  txt: "bg-gray-100 text-gray-600",
  md: "bg-purple-50 text-purple-600",
  csv: "bg-emerald-50 text-emerald-600",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function KnowledgeBase() {
  const [documents, setDocuments] = useState<KnowledgeDocument[] | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const loadDocuments = useCallback(async () => {
    try {
      const res = await fetch("/api/knowledge/documents");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setDocuments(data.documents);
    } catch {
      setError("Couldn't load your knowledge documents.");
      setDocuments([]);
    }
  }, []);

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

  const uploadFile = useCallback(
    async (file: File) => {
      setError(null);
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/knowledge/upload", { method: "POST", body: formData });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Upload failed.");
        await loadDocuments();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed.");
      } finally {
        setUploading(false);
      }
    },
    [loadDocuments]
  );

  const handleDelete = async (documentId: string) => {
    setDeletingId(documentId);
    setError(null);
    try {
      const res = await fetch(`/api/knowledge/documents/${documentId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete document.");
      setDocuments((prev) => prev?.filter((d) => d.document_id !== documentId) ?? null);
    } catch {
      setError("Couldn't delete that document. Try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };

  const lastUpload = documents && documents.length > 0 ? formatDate(documents[0].uploadedAt) : "—";

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <StatCard
          icon={Database}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          label="Documents indexed"
          value={documents === null ? "—" : String(documents.length)}
        />
        <StatCard
          icon={Clock}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
          label="Last upload"
          value={lastUpload}
        />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-base font-semibold text-gray-900">Knowledge base</h2>
      </div>
      <p className="text-sm text-gray-500 mb-5">
        Upload policies, FAQs, or any company documents. AuricBot uses these to answer questions
        about your business.
      </p>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-10 text-center cursor-pointer transition-colors ${
          isDragging ? "border-blue-500 bg-blue-50/50" : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx,.doc,.txt,.md,.csv"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) uploadFile(file);
            e.target.value = "";
          }}
        />
        {uploading ? (
          <>
            <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
            <p className="text-sm font-medium text-gray-700">Uploading...</p>
          </>
        ) : (
          <>
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
              <UploadCloud className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-sm font-medium text-gray-700">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-400">PDF, DOCX, TXT, MD, or CSV — up to 20MB</p>
          </>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 mt-4 text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      <div className="mt-6">
        {documents === null ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-14 rounded-xl bg-gray-50 animate-pulse" />
            ))}
          </div>
        ) : documents.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-gray-400">No documents uploaded yet.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {documents.map((doc) => (
              <li key={doc.document_id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      TYPE_STYLES[doc.type] ?? "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                    <p className="text-xs text-gray-400">
                      {doc.type.toUpperCase()} · Uploaded {formatDate(doc.uploadedAt)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(doc.document_id)}
                  disabled={deletingId === doc.document_id}
                  className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                  aria-label={`Delete ${doc.name}`}
                >
                  {deletingId === doc.document_id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  iconBg,
  iconColor,
  label,
  value,
}: {
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-3">
      <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}>
        <Icon className={`w-4.5 h-4.5 ${iconColor}`} />
      </div>
      <div>
        <p className="text-lg font-semibold text-gray-900 leading-tight">{value}</p>
        <p className="text-xs text-gray-500">{label}</p>
      </div>
    </div>
  );
}