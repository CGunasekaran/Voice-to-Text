"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function StoryPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/transcribe?type=story");
  }, [router]);

  return null;
}
