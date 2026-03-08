"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="container">
      <h1 style={{ fontSize: "48px" }}>
        Be <span style={{ color: "#a3ff12" }}>Anyone.</span>
      </h1>
      <h1 style={{ fontSize: "48px", color: "#b57cff" }}>
        Say Everything.
      </h1>

      <p>
        Anonynmi is a safe space to share, to feel, and to heal —
        completely anonymously.
      </p>

      <button onClick={() => router.push("/dashboard")}>
        Start Anonymously →
      </button>
    </div>
  );
}