'use client';

import { useState } from 'react';
import { Copy, Download, Wand2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface TextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  onTransform?: () => void;
  isTransforming?: boolean;
}

export default function TextEditor({
  content,
  onChange,
  placeholder = 'Your text will appear here...',
  onTransform,
  isTransforming = false,
}: TextEditorProps) {
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    onChange(text);
    
    // Update stats
    const words = text.trim().split(/\s+/).filter((w) => w.length > 0);
    setWordCount(words.length);
    setCharCount(text.length);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success('Copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy');
    }
  };

  const downloadAsText = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `voice-to-text-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Downloaded!');
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>{wordCount} words</span>
          <span>•</span>
          <span>{charCount} characters</span>
        </div>

        <div className="flex items-center gap-2">
          {onTransform && (
            <button
              onClick={onTransform}
              disabled={isTransforming || !content}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <Wand2 className="w-4 h-4" />
              {isTransforming ? 'Transforming...' : 'Transform'}
            </button>
          )}

          <button
            onClick={copyToClipboard}
            disabled={!content}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Copy to clipboard"
          >
            <Copy className="w-5 h-5 text-gray-600" />
          </button>

          <button
            onClick={downloadAsText}
            disabled={!content}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Download as text"
          >
            <Download className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Editor */}
      <textarea
        value={content}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full h-96 p-6 font-mono text-gray-900 resize-none focus:outline-none"
      />
    </div>
  );
}
