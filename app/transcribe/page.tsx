"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import VoiceRecorder from "@/components/VoiceRecorder";
import TemplateSelector from "@/components/TemplateSelector";
import TextEditor from "@/components/TextEditor";
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

  const handleTranscript = (text: string) => {
    if (!startTime) {
      setStartTime(Date.now());
    }
    setTranscript(text);
  };

  const handleTransform = () => {
    if (!transcript.trim()) {
      toast.error("Please record some speech first");
      return;
    }

    setIsTransforming(true);

    // Simulate async transformation (in production, call AI API)
    setTimeout(() => {
      const transformed = TextTransformer.transform(transcript, selectedType);
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
    }, 1000);
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

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Voice Recorder */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">
              Step 1: Record Your Voice
            </h2>
            <VoiceRecorder onTranscript={handleTranscript} />
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
