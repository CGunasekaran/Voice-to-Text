import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: NextRequest) {
  try {
    const {
      text,
      type,
      customPrompt,
      tone = "professional",
    } = await request.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompts: Record<string, string> = {
      story:
        "Transform the following speech into a creative, engaging story with proper narrative structure, descriptions, and dialogue:",
      email:
        "Transform the following speech into a professional email with proper formatting, greeting, body, and closing:",
      blog: "Transform the following speech into a well-structured blog post with engaging introduction, body paragraphs, and conclusion:",
      notes:
        "Transform the following speech into well-organized, structured notes with bullet points and clear sections:",
      letter:
        "Transform the following speech into a formal letter with proper formatting, greeting, body, and closing:",
      transcription:
        "Transcribe and clean up the following speech with proper punctuation and formatting:",
    };

    // Use custom prompt if provided, otherwise use built-in prompts
    let prompt = customPrompt || prompts[type] || prompts.transcription;

    // Add tone instruction
    prompt = `${prompt} Use a ${tone} tone and writing style.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: prompt,
        },
        {
          role: "user",
          content: text,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const transformedText = completion.choices[0]?.message?.content || "";

    return NextResponse.json({ transformedText });
  } catch (error) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { error: "Failed to transform text" },
      { status: 500 }
    );
  }
}
