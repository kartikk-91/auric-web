import { ChatMessage } from "@/lib/data";
import ThemeCard from "./theme-card";
import Image from "next/image";


interface ChatBubbleProps {
  message: ChatMessage;
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === "user";
  const isWelcome = message.id === "welcome";

  if (isWelcome) {
    return (
      <div className="flex items-start gap-3 mb-6">
        <AuricAvatar />
        <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-100 max-w-md">
          {message.content.split("\n").map((line, i) => (
            <p key={i} className={i === 0 ? "text-base font-semibold text-gray-800" : "text-sm text-gray-500 mt-0.5"}>
              {line}
            </p>
          ))}
        </div>
      </div>
    );
  }

  if (isUser) {
    return (
      <div className="flex justify-end mb-4">
        <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-sm shadow-sm">
          <p className="text-sm">{message.content}</p>
          {message.timestamp && (
            <p className="text-xs text-blue-200 mt-1 text-right">{message.timestamp} ✓</p>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-start gap-3 mb-6">
      <AuricAvatar />
      <div className="flex-1 max-w-lg">
        <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-700 mb-3">{message.content}</p>
          {message.themes && (
            <div>
              {message.themes.map((theme, i) => (
                <ThemeCard key={theme.id} theme={theme} index={i} />
              ))}
            </div>
          )}
        </div>
        {message.timestamp && (
          <p className="text-xs text-gray-400 mt-1 ml-1">{message.timestamp}</p>
        )}
      </div>
    </div>
  );
}

function AuricAvatar() {
  return (
    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
      <Image
        src={'/emblem-transparent.png'}
        alt="auric"
        width={20}
        height={20}
      />
    </div>
  );
}
