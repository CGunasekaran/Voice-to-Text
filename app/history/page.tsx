"use client";

import { useState, useEffect } from "react";
import { StorageService } from "@/lib/storage";
import { VoiceRecording } from "@/types";
import { Trash2, Eye, Download } from "lucide-react";
import { format } from "date-fns";
import toast from "react-hot-toast";
import ConfirmModal from "@/components/ConfirmModal";

export default function HistoryPage() {
  const [recordings, setRecordings] = useState<VoiceRecording[]>([]);
  const [selectedRecording, setSelectedRecording] =
    useState<VoiceRecording | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    id: string | null;
  }>({
    isOpen: false,
    id: null,
  });
  const [clearAllModal, setClearAllModal] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const data = StorageService.getAllRecordings();
    setRecordings(data);
    setStats(StorageService.getStats());
  };

  const handleDelete = (id: string) => {
    StorageService.deleteRecording(id);
    loadHistory();
    toast.success("Recording deleted");
  };

  const handleClearAll = () => {
    StorageService.clearAll();
    loadHistory();
    toast.success("History cleared");
  };

  const handleDownload = (recording: VoiceRecording) => {
    const blob = new Blob([recording.convertedText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${recording.type}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded!");
  };

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">
          Recording History
        </h1>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-blue-100/80 backdrop-blur-sm p-6 rounded-lg border border-blue-200/50 shadow-lg">
              <div className="text-3xl font-bold text-blue-600">
                {stats.totalRecordings}
              </div>
              <div className="text-gray-700">Total Recordings</div>
            </div>
            <div className="bg-purple-100/80 backdrop-blur-sm p-6 rounded-lg border border-purple-200/50 shadow-lg">
              <div className="text-3xl font-bold text-purple-600">
                {stats.totalWords.toLocaleString()}
              </div>
              <div className="text-gray-700">Total Words</div>
            </div>
            <div className="bg-green-100/80 backdrop-blur-sm p-6 rounded-lg border border-green-200/50 shadow-lg">
              <div className="text-3xl font-bold text-green-600">
                {Math.floor(stats.totalDuration / 60)}m
              </div>
              <div className="text-gray-700">Total Duration</div>
            </div>
            <div className="bg-red-100/80 backdrop-blur-sm p-6 rounded-lg border border-red-200/50 shadow-lg">
              <button
                onClick={() => setClearAllModal(true)}
                className="text-red-600 hover:text-red-700 font-medium"
              >
                Clear All
              </button>
            </div>
          </div>
        )}

        {/* Recordings List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {recordings.map((recording) => (
              <div
                key={recording.id}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-lg border border-white/30 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full mb-2">
                      {recording.type}
                    </span>
                    <p className="text-sm text-gray-600">
                      {format(
                        new Date(recording.timestamp),
                        "MMM dd, yyyy HH:mm"
                      )}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedRecording(recording)}
                      className="p-2 hover:bg-gray-100 rounded"
                    >
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleDownload(recording)}
                      className="p-2 hover:bg-gray-100 rounded"
                    >
                      <Download className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() =>
                        setDeleteModal({ isOpen: true, id: recording.id })
                      }
                      className="p-2 hover:bg-gray-100 rounded"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-700 line-clamp-3">
                  {recording.transcript}
                </p>
                <div className="mt-3 flex gap-4 text-xs text-gray-500">
                  <span>{recording.wordCount} words</span>
                  <span>•</span>
                  <span>{recording.duration}s</span>
                </div>
              </div>
            ))}

            {recordings.length === 0 && (
              <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-lg border border-white/30 shadow-lg">
                <p className="text-gray-700">No recordings yet</p>
              </div>
            )}
          </div>

          {/* Preview */}
          {selectedRecording && (
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg border border-white/30 shadow-lg sticky top-4">
              <h3 className="font-bold text-gray-900 mb-4">Preview</h3>
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap text-sm">
                  {selectedRecording.convertedText}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Confirm Modals */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onConfirm={() => deleteModal.id && handleDelete(deleteModal.id)}
        title="Delete Recording"
        message="Are you sure you want to delete this recording? This action cannot be undone."
        confirmText="Delete"
        isDanger={true}
      />

      <ConfirmModal
        isOpen={clearAllModal}
        onClose={() => setClearAllModal(false)}
        onConfirm={handleClearAll}
        title="Clear All History"
        message="Are you sure you want to clear all history? This will permanently delete all recordings and cannot be undone."
        confirmText="Clear All"
        isDanger={true}
      />
    </main>
  );
}
