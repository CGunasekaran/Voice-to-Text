# 🎙️ VoiceToText AI

Transform your voice into perfectly formatted text using AI-powered speech recognition and OpenAI GPT-4. Create stories, emails, blog posts, notes, letters, and more with just your voice!

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black)
![React](https://img.shields.io/badge/React-19.2.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

## ✨ Features

### 🤖 AI-Powered Transformation
- **OpenAI GPT-4 Integration** - Advanced text transformation with context-aware AI
- **Custom Templates** - Create and manage your own transformation templates with custom prompts
- **Tone Adjustment** - Choose from Professional, Casual, Formal, or Friendly tones
- **Built-in Templates** - 6 pre-configured templates (Story, Email, Blog, Notes, Letter, Transcription)

### 🎤 Voice Recognition
- **Real-time Speech-to-Text** - Instant transcription as you speak
- **18 Language Support** - English, Spanish, French, German, Italian, Portuguese, Russian, Japanese, Korean, Chinese, Arabic, Hindi, Tamil, Telugu, Kannada, Malayalam, Bengali, and more
- **Voice Commands** - Control punctuation and formatting with voice ("new paragraph", "comma", "period", etc.)
- **Live Transcript Preview** - See your words appear in real-time

### 📄 Export & Sharing
- **PDF Export** - Generate professional PDFs with automatic page breaks
- **TXT Export** - Download plain text files
- **Copy to Clipboard** - One-click copying for easy sharing
- **History Tracking** - View and manage all your recordings with word count and duration

### 🎨 Modern UI/UX
- **Gradient Backgrounds** - Beautiful blue-to-indigo gradient design
- **Glass-morphism Effects** - Modern frosted glass UI elements
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Dark Theme** - Eye-friendly dark mode throughout

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenAI API key (for AI transformations)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/voice-to-text-ai.git
cd voice-to-text-ai
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 🎯 How to Use

1. **Select a Template** - Choose from built-in templates or create your own
2. **Choose Tone** - Pick Professional, Casual, Formal, or Friendly
3. **Select Language** - Choose your speaking language from 18 supported languages
4. **Start Recording** - Click the microphone button and start speaking
5. **Use Voice Commands** - Say "comma", "period", "new paragraph" for formatting
6. **Transform with AI** - Click Transform to enhance with GPT-4
7. **Export** - Download as PDF, TXT, or copy to clipboard

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.1 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **AI**: OpenAI GPT-4 API
- **Icons**: Lucide React
- **PDF Generation**: jsPDF
- **Notifications**: React Hot Toast
- **Date Formatting**: date-fns

## 📁 Project Structure

```
voice-to-text-ai/
├── app/
│   ├── api/
│   │   ├── openai/          # OpenAI integration endpoint
│   │   └── transform/       # Fallback transformation
│   ├── transcribe/          # Main recording page
│   ├── history/             # Recording history
│   ├── templates/           # Custom template manager
│   └── page.tsx             # Landing page
├── components/
│   ├── VoiceRecorder.tsx    # Speech recognition component
│   ├── TextEditor.tsx       # Text editing component
│   ├── ExportOptions.tsx    # Export functionality
│   ├── TemplateSelector.tsx # Template selection
│   ├── LanguageSelector.tsx # Language selection
│   ├── Header.tsx           # Navigation header
│   └── Footer.tsx           # Footer with credits
├── lib/
│   ├── speech-recognition.ts # Web Speech API wrapper
│   ├── storage.ts           # LocalStorage management
│   └── text-transformer.ts  # Fallback transformer
└── types/
    └── index.ts             # TypeScript type definitions
```

## 🌍 Supported Languages

English, Spanish, French, German, Italian, Portuguese, Russian, Japanese, Korean, Chinese (Simplified & Traditional), Arabic, Hindi, Tamil, Telugu, Kannada, Malayalam, Bengali

## 🎨 Voice Commands

- `new paragraph` - Add double line break
- `new line` - Add single line break
- `comma` - Insert comma
- `period` - Insert period
- `question mark` - Insert ?
- `exclamation mark` - Insert !
- `colon` - Insert :
- `semicolon` - Insert ;

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Developer

Created by [Gunasekaran](https://gunasekaran-portfolio.vercel.app/)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- OpenAI for GPT-4 API
- Web Speech API for speech recognition
- All open-source contributors

---

Built with ❤️ using Next.js and AI
