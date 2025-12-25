"use client";

import { Download, FileText, Copy } from "lucide-react";
import { jsPDF } from "jspdf";
import toast from "react-hot-toast";

interface ExportOptionsProps {
  content: string;
  filename?: string;
}

export default function ExportOptions({
  content,
  filename = "document",
}: ExportOptionsProps) {
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard!");
  };

  const handleExportTxt = () => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Exported as TXT!");
  };

  const handleExportPdf = () => {
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      const maxWidth = pageWidth - 2 * margin;

      // Split text into lines that fit the page width
      const lines = doc.splitTextToSize(content, maxWidth);

      let yPos = margin;
      const lineHeight = 7;

      lines.forEach((line: string, index: number) => {
        // Add new page if needed
        if (yPos + lineHeight > pageHeight - margin) {
          doc.addPage();
          yPos = margin;
        }

        doc.text(line, margin, yPos);
        yPos += lineHeight;
      });

      doc.save(`${filename}.pdf`);
      toast.success("Exported as PDF!");
    } catch (error) {
      console.error("PDF export error:", error);
      toast.error("Failed to export PDF");
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={handleCopyToClipboard}
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
      >
        <Copy className="w-4 h-4" />
        Copy
      </button>
      <button
        onClick={handleExportTxt}
        className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md"
      >
        <FileText className="w-4 h-4" />
        Export TXT
      </button>
      <button
        onClick={handleExportPdf}
        className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-md"
      >
        <Download className="w-4 h-4" />
        Export PDF
      </button>
    </div>
  );
}
