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

  const router = useRouter();
  const { message } = error;
  const canShow = [
    "Cannot get information from that",
  ];
  const isShow = canShow.includes(message);

  return (
    <div className="flex flex-col items-center pt-6 ">
      <h2 className="font-Bold mx-auto mb-4 text-3xl">
        {isShow ? message : "Something went wrong!"}
      </h2>
      {isShow && (
        <button
          className="rounded-md bg-gold p-3 text-lg text-black"
          onClick={() => router.back()}
        >
          Go back
        </button>
      )}
      {!isShow && (
        <div className="flex gap-5">
          <button className="rounded-md bg-gold p-3 text-lg text-black" onClick={() => router.back()}>Go back</button>
          <button className="rounded-md bg-gold p-3 text-lg text-black" onClick={() => reset()}>Try again</button>
        </div>
      )}
    </div>
  );
}
