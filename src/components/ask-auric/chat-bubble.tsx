import { ChatMessage } from "@/lib/data";
import ThemeCard from "./theme-card";
import Image from "next/image";

interface ChatBubbleProps {
  message: ChatMessage;
}

export default function ChatBubble({
  message,
}: ChatBubbleProps) {
  const isUser =
    message.role ===
    "user";

  const isWelcome =
    message.id ===
    "welcome";

  const isTyping =
    message.content ===
    "__typing__";


  if (isWelcome) {
    return (
      <div className="mb-6 flex items-start gap-3">
        <AuricAvatar />

        <div className="max-w-[88%] rounded-3xl rounded-tl-md border border-gray-100 bg-white px-4 py-3 shadow-sm sm:max-w-md">
          {message.content
            .split("\n")
            .map(
              (
                line,
                i
              ) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "text-sm font-semibold text-gray-900 sm:text-base"
                      : "mt-1 text-sm leading-relaxed text-gray-500"
                  }
                >
                  {line}
                </p>
              )
            )}
        </div>
      </div>
    );
  }


  if (isUser) {
    return (
      <div className="mb-5 flex justify-end">
        <div className="max-w-[90%] sm:max-w-[75%] lg:max-w-[65%] rounded-[24px] rounded-br-md bg-blue-600 px-4 py-3 text-white shadow-sm">
          <p className="whitespace-pre-wrap wrap-break-word text-sm leading-7">
            {message.content}
          </p>

          {message.timestamp && (
            <p className="mt-1 text-right text-[11px] text-blue-200">
              {
                message.timestamp
              }
            </p>
          )}
        </div>
      </div>
    );
  }


  return (
    <div className="mb-6 flex items-start gap-3">
      <AuricAvatar />

      <div className="min-w-0 max-w-full flex-1 sm:max-w-[85%] lg:max-w-[75%]">
        <div className="rounded-[24px] rounded-tl-md border border-gray-100 bg-white px-4 py-3 shadow-sm transition-all duration-200">

          {isTyping ? (
            <div className="flex items-center gap-1 py-2">
              {[0, 1, 2].map(
                (i) => (
                  <span
                    key={i}
                    className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                    style={{
                      animationDelay: `${i * 150}ms`,
                    }}
                  />
                )
              )}
            </div>
          ) : (
            <>
              <div className="prose prose-sm max-w-none prose-p:my-0 prose-strong:text-gray-900">
                <p className="whitespace-pre-wrap wrap-break-word text-sm leading-7 text-gray-700">
                  {
                    message.content
                  }
                </p>
              </div>

              {message.themes &&
                message
                  .themes
                  .length >
                  0 && (
                  <div className="mt-3 space-y-1 border-t border-gray-100 pt-2">
                    {message.themes.map(
                      (
                        theme,
                        i
                      ) => (
                        <ThemeCard
                          key={
                            theme.id
                          }
                          theme={
                            theme
                          }
                          index={
                            i
                          }
                        />
                      )
                    )}
                  </div>
                )}
            </>
          )}
        </div>

        {message.timestamp &&
          !isTyping && (
            <p className="ml-2 mt-1 text-[11px] text-gray-400">
              {
                message.timestamp
              }
            </p>
          )}
      </div>
    </div>
  );
}

function AuricAvatar() {
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-100 bg-white shadow-sm">
      <Image
        src="/emblem-transparent.png"
        alt="auric"
        width={20}
        height={20}
        className="object-contain"
      />
    </div>
  );
}