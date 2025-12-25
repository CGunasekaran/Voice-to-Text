"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EmailPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/transcribe?type=email");
  }, [router]);

  return null;
}
