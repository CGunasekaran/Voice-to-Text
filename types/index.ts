export type ConversionType =
  | 'transcription'
  | 'story'
  | 'email'
  | 'letter'
  | 'blog'
  | 'notes'
  | 'todo'
  | 'social';

export interface VoiceRecording {
  id: string;
  transcript: string;
  convertedText: string;
  type: ConversionType;
  timestamp: string;
  duration: number;
  wordCount: number;
  language: string;
}

export interface Template {
  id: ConversionType;
  name: string;
  description: string;
  icon: string;
  color: string;
  prompt: string;
  placeholder: string;
  features: string[];
  example: {
    input: string;
    output: string;
  };
}

export interface RecognitionState {
  isListening: boolean;
  transcript: string;
  interimTranscript: string;
  error: string | null;
}

export interface ExportFormat {
  type: 'txt' | 'pdf' | 'docx' | 'html' | 'md';
  name: string;
  icon: string;
}

export interface TransformOptions {
  tone?: 'formal' | 'casual' | 'professional' | 'friendly';
  length?: 'short' | 'medium' | 'long';
  style?: string;
}
