"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LetterPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/transcribe?type=letter");
  }, [router]);

  return null;
}
