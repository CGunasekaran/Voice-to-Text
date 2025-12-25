"use client";

import { Globe } from "lucide-react";

export const supportedLanguages = [
  { code: "en-US", name: "English", nativeName: "English" },
  { code: "es-ES", name: "Spanish", nativeName: "Español" },
  { code: "fr-FR", name: "French", nativeName: "Français" },
  { code: "de-DE", name: "German", nativeName: "Deutsch" },
  { code: "it-IT", name: "Italian", nativeName: "Italiano" },
  { code: "pt-BR", name: "Portuguese", nativeName: "Português" },
  { code: "ru-RU", name: "Russian", nativeName: "Русский" },
  { code: "ja-JP", name: "Japanese", nativeName: "日本語" },
  { code: "ko-KR", name: "Korean", nativeName: "한국어" },
  { code: "zh-CN", name: "Chinese (Simplified)", nativeName: "简体中文" },
  { code: "zh-TW", name: "Chinese (Traditional)", nativeName: "繁體中文" },
  { code: "ar-SA", name: "Arabic", nativeName: "العربية" },
  { code: "hi-IN", name: "Hindi", nativeName: "हिन्दी" },
  { code: "ta-IN", name: "Tamil", nativeName: "தமிழ்" },
  { code: "te-IN", name: "Telugu", nativeName: "తెలుగు" },
  { code: "kn-IN", name: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "ml-IN", name: "Malayalam", nativeName: "മലയാളം" },
  { code: "bn-IN", name: "Bengali", nativeName: "বাংলা" },
];

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

export default function LanguageSelector({
  selectedLanguage,
  onLanguageChange,
}: LanguageSelectorProps) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20">
      <div className="flex items-center gap-2 mb-3">
        <Globe className="w-5 h-5 text-white" />
        <label className="text-sm font-medium text-white">
          Speech Recognition Language
        </label>
      </div>
      <select
        value={selectedLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer"
      >
        {supportedLanguages.map((lang) => (
          <option key={lang.code} value={lang.code} className="bg-gray-800">
            {lang.nativeName} ({lang.name})
          </option>
        ))}
      </select>
      <p className="text-xs text-gray-300 mt-2">
        Select the language you'll be speaking in
      </p>
    </div>
  );
}
