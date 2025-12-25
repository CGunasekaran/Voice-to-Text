import { VoiceRecording } from '@/types';

const STORAGE_KEY = 'voice_recordings';

export class StorageService {
  static saveRecording(recording: VoiceRecording): void {
    const recordings = this.getAllRecordings();
    recordings.unshift(recording);
    
    // Keep only last 50 recordings
    const limited = recordings.slice(0, 50);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(limited));
  }

  static getAllRecordings(): VoiceRecording[] {
    if (typeof window === 'undefined') return [];
    
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  static getRecordingById(id: string): VoiceRecording | null {
    const recordings = this.getAllRecordings();
    return recordings.find((r) => r.id === id) || null;
  }

  static deleteRecording(id: string): void {
    const recordings = this.getAllRecordings();
    const filtered = recordings.filter((r) => r.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }

  static clearAll(): void {
    localStorage.removeItem(STORAGE_KEY);
  }

  static getStats() {
    const recordings = this.getAllRecordings();
    
    return {
      totalRecordings: recordings.length,
      totalWords: recordings.reduce((sum, r) => sum + r.wordCount, 0),
      totalDuration: recordings.reduce((sum, r) => sum + r.duration, 0),
      byType: recordings.reduce((acc, r) => {
        acc[r.type] = (acc[r.type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
    };
  }
}
