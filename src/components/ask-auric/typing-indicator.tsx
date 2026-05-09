import Image from "next/image";

export default function TypingIndicator() {
  return (
    <div className="mb-4 flex items-start gap-2 sm:gap-3">

      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-100 bg-white shadow-sm">
        <Image
          src="/emblem-transparent.png"
          alt="auric"
          width={20}
          height={20}
          className="object-contain"
        />
      </div>


      <div className="rounded-2xl rounded-tl-sm border border-gray-100 bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400"
              style={{
                animationDelay: `${i * 150}ms`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}