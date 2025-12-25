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
} from "lucide-react";

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
  return (
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

            <h3 className="font-bold text-gray-900 mb-2">{template.name}</h3>
            <p className="text-sm text-gray-600">{template.description}</p>

            {isSelected && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs font-medium text-blue-600">✓ Selected</p>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
