"use client"; // Error components must be Client Components

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center pt-6 ">
      <h2 className="font-Bold mx-auto mb-4 text-3xl">
        We are currently unavaliable
      </h2>
      <button
        className="rounded-md bg-gold p-3 text-lg text-black"
        onClick={() => reset()}
      >
        try again
      </button>
    </div>
  );
}
