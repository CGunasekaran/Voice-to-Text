import { ConversionType, TransformOptions } from '@/types';
import { templates } from '@/data/templates';

export class TextTransformer {
  // Simple rule-based transformation (can be enhanced with AI API)
  static transform(
    text: string,
    type: ConversionType,
    options?: TransformOptions
  ): string {
    const template = templates.find((t) => t.id === type);
    if (!template) return text;

    switch (type) {
      case 'transcription':
        return this.formatTranscription(text);
      case 'story':
        return this.generateStory(text, options);
      case 'email':
        return this.generateEmail(text, options);
      case 'letter':
        return this.generateLetter(text, options);
      case 'blog':
        return this.generateBlog(text, options);
      case 'notes':
        return this.generateNotes(text);
      case 'todo':
        return this.generateTodo(text);
      case 'social':
        return this.generateSocialPost(text);
      default:
        return text;
    }
  }

  private static formatTranscription(text: string): string {
    // Add punctuation and capitalize
    let formatted = text.trim();
    formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);
    
    // Add period if missing
    if (!/[.!?]$/.test(formatted)) {
      formatted += '.';
    }
    
    return formatted;
  }

  private static generateStory(text: string, options?: TransformOptions): string {
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim());
    
    let story = '# The Story\n\n';
    
    sentences.forEach((sentence, index) => {
      const trimmed = sentence.trim();
      if (trimmed) {
        if (index === 0) {
          story += `Once upon a time, ${trimmed.toLowerCase()}. `;
        } else {
          story += `${trimmed}. `;
        }
      }
    });

    story += '\n\nThe End.';
    
    return story;
  }

  private static generateEmail(text: string, options?: TransformOptions): string {
    const tone = options?.tone || 'professional';
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim());
    
    let email = 'Subject: ';
    
    // Generate subject from first sentence
    if (sentences[0]) {
      const words = sentences[0].trim().split(' ');
      email += words.slice(0, 6).join(' ') + '\n\n';
    } else {
      email += 'Important Message\n\n';
    }

    // Greeting
    email += tone === 'casual' ? 'Hi,\n\n' : 'Dear [Recipient],\n\n';

    // Body
    email += 'I hope this email finds you well.\n\n';
    sentences.forEach((sentence) => {
      email += sentence.trim() + '. ';
    });
    email += '\n\n';

    // Closing
    if (tone === 'casual') {
      email += 'Thanks,\n[Your Name]';
    } else {
      email += 'Best regards,\n[Your Name]';
    }

    return email;
  }

  private static generateLetter(text: string, options?: TransformOptions): string {
    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    let letter = `${today}\n\n`;
    letter += '[Recipient Name]\n';
    letter += '[Address]\n\n';
    letter += 'Dear [Recipient],\n\n';
    letter += text.trim();
    
    if (!/[.!?]$/.test(letter)) {
      letter += '.';
    }
    
    letter += '\n\n';
    letter += 'Sincerely,\n\n';
    letter += '[Your Name]';

    return letter;
  }

  private static generateBlog(text: string, options?: TransformOptions): string {
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim());
    
    let blog = '# ';
    
    // Title from first sentence
    if (sentences[0]) {
      const title = sentences[0].trim();
      blog += title.charAt(0).toUpperCase() + title.slice(1) + '\n\n';
    }

    // Introduction
    blog += '## Introduction\n\n';
    blog += sentences.slice(0, 2).join('. ') + '.\n\n';

    // Main content
    blog += '## Main Points\n\n';
    sentences.slice(2).forEach((sentence, index) => {
      blog += `${sentence.trim()}.\n\n`;
    });

    // Conclusion
    blog += '## Conclusion\n\n';
    blog += 'Thank you for reading! Share your thoughts in the comments below.';

    return blog;
  }

  private static generateNotes(text: string): string {
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim());
    
    let notes = '# Meeting Notes\n\n';
    notes += `**Date:** ${new Date().toLocaleDateString()}\n\n`;
    notes += '## Key Points\n\n';
    
    sentences.forEach((sentence) => {
      notes += `- ${sentence.trim()}\n`;
    });

    notes += '\n## Action Items\n\n';
    notes += '- [ ] Follow up on discussed items\n';

    return notes;
  }

  private static generateTodo(text: string): string {
    const items = text.split(/[,;]|and/).filter((s) => s.trim());
    
    let todo = '# Todo List\n\n';
    todo += `**Created:** ${new Date().toLocaleDateString()}\n\n`;
    todo += '## Tasks\n\n';
    
    items.forEach((item) => {
      todo += `- [ ] ${item.trim()}\n`;
    });

    return todo;
  }

  private static generateSocialPost(text: string): string {
    let post = text.trim();
    
    // Add emojis
    post = '✨ ' + post;
    
    if (!/[.!?]$/.test(post)) {
      post += '!';
    }

    post += '\n\n';
    
    // Add hashtags
    const words = text.toLowerCase().split(' ');
    const hashtags = words
      .filter((w) => w.length > 4)
      .slice(0, 3)
      .map((w) => '#' + w.charAt(0).toUpperCase() + w.slice(1));
    
    post += hashtags.join(' ');

    return post;
  }
}
