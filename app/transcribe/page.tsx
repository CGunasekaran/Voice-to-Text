"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import VoiceRecorder from "@/components/VoiceRecorder";
import TemplateSelector from "@/components/TemplateSelector";
import TextEditor from "@/components/TextEditor";
import LanguageSelector from "@/components/LanguageSelector";
import { ConversionType } from "@/types";
import { TextTransformer } from "@/lib/text-transformer";
import { StorageService } from "@/lib/storage";
import toast from "react-hot-toast";

function TranscribeContent() {
  const searchParams = useSearchParams();
  const initialType =
    (searchParams.get("type") as ConversionType) || "transcription";

  const [selectedType, setSelectedType] = useState<ConversionType>(initialType);
  const [transcript, setTranscript] = useState("");
  const [transformedText, setTransformedText] = useState("");
  const [isTransforming, setIsTransforming] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [selectedTone, setSelectedTone] = useState<string>("professional");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en-US");

  const toneOptions = [
    { value: "professional", label: "Professional", icon: "💼" },
    { value: "casual", label: "Casual", icon: "😊" },
    { value: "formal", label: "Formal", icon: "🎩" },
    { value: "friendly", label: "Friendly", icon: "🤝" },
  ];

  const handleTranscript = (text: string) => {
    if (!startTime) {
      setStartTime(Date.now());
    }
    setTranscript(text);
  };

  const handleTransform = async () => {
    if (!transcript.trim()) {
      toast.error("Please record some speech first");
      return;
    }

    setIsTransforming(true);

    try {
      // Check if it's a custom template
      const customTemplates = JSON.parse(
        localStorage.getItem("customTemplates") || "[]"
      );
      const customTemplate = customTemplates.find(
        (t: any) => t.id === selectedType
      );

      // Call OpenAI API for transformation
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: transcript,
          type: selectedType,
          customPrompt: customTemplate?.prompt,
          tone: selectedTone,
        }),
      });

      if (!response.ok) {
        throw new Error("Transformation failed");
      }

      const data = await response.json();
      const transformed = data.transformedText;

      setTransformedText(transformed);

      // Save to history
      const duration = startTime
        ? Math.floor((Date.now() - startTime) / 1000)
        : 0;
      const words = transcript.split(/\s+/).filter((w) => w.length > 0).length;

      StorageService.saveRecording({
        id: crypto.randomUUID(),
        transcript,
        convertedText: transformed,
        type: selectedType,
        timestamp: new Date().toISOString(),
        duration,
        wordCount: words,
        language: "en-US",
      });

      setIsTransforming(false);
      toast.success("Text transformed successfully!");
    } catch (error) {
      console.error("Transformation error:", error);
      // Fallback to local transformation if API fails
      const transformed = TextTransformer.transform(transcript, selectedType);
      setTransformedText(transformed);
      setIsTransforming(false);
      toast.error("AI transformation unavailable, using basic transformation");
    }
  };

  const handleTypeChange = (type: ConversionType) => {
    setSelectedType(type);
    setTransformedText("");
  };

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Voice to Text Converter
          </h1>
          <p className="text-white/80">
            Select a template and start speaking to create your content
          </p>
        </div>

        {/* Template Selector */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Choose Template</h2>
          <TemplateSelector
            selected={selectedType}
            onSelect={handleTypeChange}
          />
        </div>

        {/* Tone Selector */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Select Tone</h2>
          <div className="flex flex-wrap gap-3">
            {toneOptions.map((tone) => (
              <button
                key={tone.value}
                onClick={() => setSelectedTone(tone.value)}
                className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  selectedTone === tone.value
                    ? "bg-white text-purple-600 shadow-lg scale-105"
                    : "bg-white/10 backdrop-blur-lg text-white border border-white/20 hover:bg-white/20"
                }`}
              >
                <span className="text-xl">{tone.icon}</span>
                {tone.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Voice Recorder */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">
              Step 1: Record Your Voice
            </h2>
            <LanguageSelector
              selectedLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
            />
            <VoiceRecorder
              onTranscript={handleTranscript}
              language={selectedLanguage}
            />
          </div>

          {/* Transformed Text */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">
              Step 2: Review & Edit
            </h2>
            <TextEditor
              content={transformedText || transcript}
              onChange={setTransformedText}
              placeholder={
                transcript
                  ? 'Click "Transform" to convert your speech...'
                  : "Start recording to see your text here..."
              }
              onTransform={handleTransform}
              isTransforming={isTransforming}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default function TranscribePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <TranscribeContent />
    </Suspense>
  );
}
