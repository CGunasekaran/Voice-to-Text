"use client";

import Link from "next/link";
import { templates } from "@/data/templates";
import {
  Mic2,
  Zap,
  Globe,
  Shield,
  ArrowRight,
  CheckCircle,
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

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/30 rounded-2xl mb-6">
              <Mic2 className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Voice to Text AI
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Transform your voice into perfectly formatted text for any purpose
              - stories, emails, letters, blogs, and more!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/transcribe"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl"
              >
                Start Recording
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
            </div>

            {/* Supported Languages */}
            <div className="mt-12 pt-8 border-t border-white/20">
              <p className="text-sm text-blue-100 mb-4">Supported Languages:</p>
              <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
                {[
                  { name: "English", native: "English", color: "bg-blue-200" },
                  { name: "Tamil", native: "தமிழ்", color: "bg-purple-200" },
                  { name: "Telugu", native: "తెలుగు", color: "bg-cyan-200" },
                  { name: "Kannada", native: "ಕನ್ನಡ", color: "bg-yellow-200" },
                  {
                    name: "Malayalam",
                    native: "മലയാളം",
                    color: "bg-green-200",
                  },
                  { name: "Hindi", native: "हिन्दी", color: "bg-amber-200" },
                ].map((lang) => (
                  <span
                    key={lang.name}
                    className={`px-4 py-2 ${lang.color} backdrop-blur-sm rounded-full text-sm font-medium text-gray-800 border border-white/50 hover:scale-105 transition-all shadow-md`}
                  >
                    {lang.native}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose VoiceToText AI?
            </h2>
            <p className="text-xl text-white/90">
              Powered by advanced AI to understand context and intent
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-blue-100/80 backdrop-blur-sm rounded-xl shadow-lg border border-blue-200/50">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Real-time Processing
              </h3>
              <p className="text-gray-600">
                See your words appear instantly as you speak with accurate
                transcription
              </p>
            </div>

            <div className="text-center p-8 bg-purple-100/80 backdrop-blur-sm rounded-xl shadow-lg border border-purple-200/50">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Multi-Language Support
              </h3>
              <p className="text-gray-600">
                Speak in your preferred language and get accurate transcriptions
              </p>
            </div>

            <div className="text-center p-8 bg-green-100/80 backdrop-blur-sm rounded-xl shadow-lg border border-green-200/50">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Privacy First
              </h3>
              <p className="text-gray-600">
                All processing happens in your browser. Your voice data never
                leaves your device
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Templates */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Multiple Templates
            </h2>
            <p className="text-xl text-white/90">
              Choose the perfect format for your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.slice(0, 8).map((template) => {
              const Icon = iconMap[template.icon];
              return (
                <Link
                  key={template.id}
                  href={`/transcribe?type=${template.id}`}
                  className={`backdrop-blur-sm p-6 rounded-xl border hover:shadow-xl transition-all group ${
                    template.color === "blue"
                      ? "bg-blue-100/80 border-blue-200/50 hover:bg-blue-100/90"
                      : template.color === "purple"
                      ? "bg-purple-100/80 border-purple-200/50 hover:bg-purple-100/90"
                      : template.color === "green"
                      ? "bg-green-100/80 border-green-200/50 hover:bg-green-100/90"
                      : template.color === "orange"
                      ? "bg-orange-100/80 border-orange-200/50 hover:bg-orange-100/90"
                      : template.color === "pink"
                      ? "bg-pink-100/80 border-pink-200/50 hover:bg-pink-100/90"
                      : template.color === "cyan"
                      ? "bg-cyan-100/80 border-cyan-200/50 hover:bg-cyan-100/90"
                      : template.color === "red"
                      ? "bg-red-100/80 border-red-200/50 hover:bg-red-100/90"
                      : "bg-indigo-100/80 border-indigo-200/50 hover:bg-indigo-100/90"
                  }`}
                >
                  <div className="mb-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${
                        template.color === "blue"
                          ? "from-blue-500 to-blue-600"
                          : template.color === "purple"
                          ? "from-purple-500 to-purple-600"
                          : template.color === "green"
                          ? "from-green-500 to-green-600"
                          : template.color === "orange"
                          ? "from-orange-500 to-orange-600"
                          : template.color === "pink"
                          ? "from-pink-500 to-pink-600"
                          : template.color === "cyan"
                          ? "from-cyan-500 to-cyan-600"
                          : template.color === "red"
                          ? "from-red-500 to-red-600"
                          : "from-indigo-500 to-indigo-600"
                      } rounded-lg flex items-center justify-center`}
                    >
                      {Icon && <Icon className="w-6 h-6 text-white" />}
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600">
                    {template.name}
                  </h3>
                  <p className="text-sm text-gray-700">
                    {template.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                    1
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Choose Your Template
                  </h3>
                  <p className="text-white/80">
                    Select from story, email, letter, blog, notes, or simple
                    transcription
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                    2
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Start Speaking
                  </h3>
                  <p className="text-white/80">
                    Click the microphone and speak naturally. See your words
                    appear in real-time
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                    3
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    AI Transforms Your Text
                  </h3>
                  <p className="text-white/80">
                    Our AI formats your speech into the perfect structure for
                    your chosen template
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                    4
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Edit & Export
                  </h3>
                  <p className="text-white/80">
                    Refine your text and export as TXT, PDF, or copy to
                    clipboard
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Voice?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Start creating professional content with just your voice in seconds
          </p>
          <Link
            href="/transcribe"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all shadow-lg"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
