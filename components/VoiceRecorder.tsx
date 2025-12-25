"use client";

import { useState, useEffect, useRef } from "react";
import { Mic, Square, Play, Pause } from "lucide-react";
import { SpeechRecognitionService } from "@/lib/speech-recognition";
import toast from "react-hot-toast";

interface VoiceRecorderProps {
  onTranscript: (text: string) => void;
  language?: string;
}

// Voice commands mapping
const voiceCommands: Record<string, string> = {
  "new paragraph": "\n\n",
  "new line": "\n",
  comma: ",",
  period: ".",
  "question mark": "?",
  "exclamation mark": "!",
  colon: ":",
  semicolon: ";",
  dash: "-",
  "open quote": '"',
  "close quote": '"',
};

export default function VoiceRecorder({
  onTranscript,
  language = "en-US",
}: VoiceRecorderProps) {
  const [isListening, setIsListening] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [duration, setDuration] = useState(0);
  const [isSupported, setIsSupported] = useState(true);
  const [lastCommand, setLastCommand] = useState("");

  const recognitionRef = useRef<SpeechRecognitionService | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Process voice commands
  const processText = (text: string): string => {
    let processed = text;

    // Check for voice commands
    Object.entries(voiceCommands).forEach(([command, symbol]) => {
      const regex = new RegExp(`\\b${command}\\b`, "gi");
      if (regex.test(processed)) {
        processed = processed.replace(regex, symbol);
        setLastCommand(command);
        setTimeout(() => setLastCommand(""), 2000);
      }
    });

    return processed;
  };

  useEffect(() => {
    recognitionRef.current = new SpeechRecognitionService();
    setIsSupported(recognitionRef.current.isAvailable());

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.setLanguage(language);
    }
  }, [language]);

  const startListening = () => {
    if (!recognitionRef.current) return;

    recognitionRef.current.start(
      (text, isFinal) => {
        const processedText = processText(text);

        if (isFinal) {
          setTranscript((prev) => prev + processedText);
          setInterimTranscript("");
          onTranscript(transcript + processedText);
        } else {
          setInterimTranscript(processedText);
        }
      },
      (error) => {
        toast.error(`Error: ${error}`);
        setIsListening(false);
      }
    );

    setIsListening(true);
    setDuration(0);

    // Start timer
    timerRef.current = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 1000);
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setIsListening(false);
    setIsPaused(false);

    // Send final transcript
    if (transcript || interimTranscript) {
      onTranscript(transcript + interimTranscript);
    }
  };

  const togglePause = () => {
    if (isPaused) {
      // Resume
      startListening();
      setIsPaused(false);
    } else {
      // Pause
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setIsPaused(true);
    }
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  if (!isSupported) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-800 font-medium">
          Speech recognition is not supported in your browser.
        </p>
        <p className="text-red-600 text-sm mt-2">
          Please use Chrome, Edge, or Safari for voice features.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      {/* Recording Controls */}
      <div className="flex flex-col items-center gap-6">
        {/* Microphone Button */}
        <div className="relative">
          <button
            onClick={isListening ? stopListening : startListening}
            className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${
              isListening
                ? "bg-red-600 hover:bg-red-700 animate-pulse"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white shadow-lg hover:shadow-xl`}
          >
            {isListening ? (
              <Square className="w-10 h-10" />
            ) : (
              <Mic className="w-10 h-10" />
            )}
          </button>

          {/* Pulse Animation */}
          {isListening && !isPaused && (
            <div className="absolute inset-0 rounded-full bg-red-600 opacity-25 animate-ping"></div>
          )}
        </div>

        {/* Status Text */}
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-900">
            {isListening
              ? isPaused
                ? "Paused"
                : "Listening..."
              : "Click to start recording"}
          </p>
          {isListening && (
            <p className="text-sm text-gray-600 mt-1">
              Duration: {formatDuration(duration)}
            </p>
          )}
          {lastCommand && (
            <div className="mt-2 inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium animate-pulse">
              Command: {lastCommand}
            </div>
          )}
        </div>

        {/* Pause/Resume Button */}
        {isListening && (
          <button
            onClick={togglePause}
            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            {isPaused ? (
              <>
                <Play className="w-4 h-4" />
                Resume
              </>
            ) : (
              <>
                <Pause className="w-4 h-4" />
                Pause
              </>
            )}
          </button>
        )}
      </div>

      {/* Live Transcript Preview */}
      {(transcript || interimTranscript) && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Live Transcript:
          </p>
          <p className="text-gray-900">
            {transcript}
            <span className="text-gray-500 italic">{interimTranscript}</span>
          </p>
        </div>
      )}

      {/* Voice Commands Help */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm font-semibold text-blue-900 mb-2">
          💡 Voice Commands:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-blue-700">
          <div>• "new paragraph"</div>
          <div>• "new line"</div>
          <div>• "comma"</div>
          <div>• "period"</div>
          <div>• "question mark"</div>
          <div>• "exclamation mark"</div>
        </div>
      </div>
    </div>
  );
}
