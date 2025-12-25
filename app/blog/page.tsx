"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BlogPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/transcribe?type=blog");
  }, [router]);

  return null;
}
