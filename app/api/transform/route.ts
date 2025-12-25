import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { text, type } = await request.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    // Simple transformation logic (can be replaced with AI service)
    let transformedText = text;

    switch (type) {
      case "story":
        transformedText = `Once upon a time, ${text.toLowerCase()}. The end.`;
        break;
      case "email":
        transformedText = `Dear Sir/Madam,\n\n${text}\n\nBest regards,\n[Your Name]`;
        break;
      case "blog":
        transformedText = `# Blog Post\n\n${text}\n\n## Conclusion\n\nThank you for reading!`;
        break;
      case "notes":
        const sentences = text.split(/[.!?]+/).filter((s: string) => s.trim());
        transformedText = sentences
          .map((s: string) => `• ${s.trim()}`)
          .join("\n");
        break;
      case "letter":
        transformedText = `Dear [Recipient],\n\n${text}\n\nSincerely,\n[Your Name]`;
        break;
      default:
        transformedText = text;
    }

    return NextResponse.json({ transformedText });
  } catch (error) {
    console.error("Transform error:", error);
    return NextResponse.json(
      { error: "Failed to transform text" },
      { status: 500 }
    );
  }
}
