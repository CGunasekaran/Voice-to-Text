"use client";

import { useState, useEffect } from "react";
import { ConversionType } from "@/types";
import { templates } from "@/data/templates";
import {
  Mic,
  Book,
  Mail,
  FileText,
  Newspaper,
  Clipboard,
  CheckSquare,
  Share2,
  Plus,
} from "lucide-react";
import Link from "next/link";

interface CustomTemplate {
  id: string;
  name: string;
  prompt: string;
  description: string;
  color: string;
}

const iconMap: Record<string, any> = {
  mic: Mic,
  book: Book,
  mail: Mail,
  "file-text": FileText,
  newspaper: Newspaper,
  clipboard: Clipboard,
  "check-square": CheckSquare,
  "share-2": Share2,
};

const colorMap: Record<string, string> = {
  blue: "from-blue-500 to-blue-600",
  purple: "from-purple-500 to-purple-600",
  green: "from-green-500 to-green-600",
  orange: "from-orange-500 to-orange-600",
  pink: "from-pink-500 to-pink-600",
  cyan: "from-cyan-500 to-cyan-600",
  red: "from-red-500 to-red-600",
  indigo: "from-indigo-500 to-indigo-600",
};

const bgColorMap: Record<string, string> = {
  blue: "bg-blue-50",
  purple: "bg-purple-50",
  green: "bg-green-50",
  orange: "bg-orange-50",
  pink: "bg-pink-50",
  cyan: "bg-cyan-50",
  red: "bg-red-50",
  indigo: "bg-indigo-50",
};

interface TemplateSelectorProps {
  selected: ConversionType;
  onSelect: (type: ConversionType) => void;
}

export default function TemplateSelector({
  selected,
  onSelect,
}: TemplateSelectorProps) {
  const [customTemplates, setCustomTemplates] = useState<CustomTemplate[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("customTemplates");
    if (saved) {
      setCustomTemplates(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="space-y-4">
      {/* Built-in Templates */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-3">
          Built-in Templates
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {templates.map((template) => {
            const Icon = iconMap[template.icon];
            const isSelected = selected === template.id;

            return (
              <button
                key={template.id}
                onClick={() => onSelect(template.id)}
                className={`text-left p-6 rounded-xl border-2 transition-all ${
                  bgColorMap[template.color]
                } ${
                  isSelected
                    ? "border-blue-600 shadow-lg scale-105"
                    : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${
                    colorMap[template.color]
                  } flex items-center justify-center mb-4`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="font-semibold text-gray-900 mb-2">
                  {template.name}
                </h3>
                <p className="text-sm text-gray-600">{template.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Templates */}
      {customTemplates.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Your Custom Templates
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {customTemplates.map((template) => {
              const isSelected = selected === (template.id as ConversionType);

              return (
                <button
                  key={template.id}
                  onClick={() => onSelect(template.id as ConversionType)}
                  className={`text-left p-6 rounded-xl border-2 transition-all bg-white ${
                    isSelected
                      ? "border-blue-600 shadow-lg scale-105"
                      : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-lg ${template.color} flex items-center justify-center mb-4`}
                  >
                    <div className="w-6 h-6 bg-white/30 rounded" />
                  </div>

                  <h3 className="font-semibold text-gray-900 mb-2">
                    {template.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {template.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Create Template Button */}
      <div className="flex justify-center pt-4">
        <Link
          href="/templates"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-lg text-white rounded-lg hover:bg-white/20 transition-all border border-white/20"
        >
          <Plus className="w-5 h-5" />
          Create Custom Template
        </Link>
      </div>
    </div>
  );
}
