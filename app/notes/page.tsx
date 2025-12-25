"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotesPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/transcribe?type=notes");
  }, [router]);

  return null;
}
