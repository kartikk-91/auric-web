"use client";

import { useEffect, useState } from "react";

import {
  clearAskAuricHistory,
  createAskAuricChat,
  deleteAskAuricChat,
  getAskAuricChats,
  getAskAuricMessages,
  sendAskAuricMessage,
} from "@/app/actions/ask-auric";

type Chat = {
  chatId: string;
  c_id: string;
  title: string | null;
  createdAt: Date;
  updatedAt: Date;
  _count?: {
    messages: number;
  };
};

export type Message = {
  messageId: string;
  chatId: string;
  role: string;
  content: string;
  metadata?: unknown;
  createdAt: Date;
};

function sleep(ms: number) {
  return new Promise((resolve) =>
    setTimeout(resolve, ms)
  );
}

export function useAskAuric() {
  const [chats, setChats] =
    useState<Chat[]>([]);

  const [
    activeChatId,
    setActiveChatId,
  ] = useState("");

  const [messages, setMessages] =
    useState<Message[]>([]);

  const [loadingChats, setLoadingChats] =
    useState(true);

  const [
    sendingMessage,
    setSendingMessage,
  ] = useState(false);

  const loadChats =
    async () => {
      try {
        setLoadingChats(
          true
        );

        const result =
          await getAskAuricChats();

        if (
          result.success &&
          result.data
        ) {
          setChats(
            result.data
          );

          if (
            result.data
              .length > 0 &&
            !activeChatId
          ) {
            setActiveChatId(
              result.data[0]
                .chatId
            );
          }
        }
      } finally {
        setLoadingChats(
          false
        );
      }
    };

  const loadMessages =
    async (
      chatId: string
    ) => {
      const result =
        await getAskAuricMessages(
          chatId
        );

      if (
        result.success &&
        result.data
      ) {
        setMessages(
          result.data
        );
      }
    };

  const createChat =
    async () => {
      const result =
        await createAskAuricChat();

      if (
        result.success &&
        result.data
      ) {
        const newChat =
          result.data;

        setChats(
          (prev) => [
            newChat,
            ...prev,
          ]
        );

        setActiveChatId(
          newChat.chatId
        );

        setMessages([]);
      }
    };

  const sendMessage =
  async (
    text: string
  ) => {
    if (!activeChatId)
      return;

    setSendingMessage(
      true
    );

    const now =
      new Date();


    const optimisticUserMessage: Message =
      {
        messageId: `temp-user-${Date.now()}`,
        chatId:
          activeChatId,
        role: "user",
        content: text,
        createdAt:
          now,
      };

    setMessages(
      (prev) => [
        ...prev,
        optimisticUserMessage,
      ]
    );

    try {
   
      await sleep(300);

      const result =
        await sendAskAuricMessage(
          {
            chatId:
              activeChatId,
            message:
              text,
          }
        );

      if (
        result.success &&
        result.data
      ) {

        const lower =
          text.toLowerCase();

        let aiContent =
          "";

        if (
          lower.includes(
            "pain"
          ) ||
          lower.includes(
            "problem"
          )
        ) {
          aiContent = `Based on recent feedback, three major pain points stand out:\n\n1. Onboarding friction — users mention confusion during first-time setup.\n\n2. Delayed support responses — multiple reviews reference slow resolution times.\n\n3. Pricing clarity — customers appear uncertain about feature access across plans.\n\nThis suggests the strongest improvements may come from reducing activation friction and improving communication.`;
        } else if (
          lower.includes(
            "sentiment"
          )
        ) {
          aiContent = `Your overall customer sentiment appears moderately positive, but there are clear frustration spikes around onboarding and support experiences.\n\nPositive mentions mostly revolve around product quality and usability, while negative feedback is concentrated around waiting times and unclear expectations.`;
        } else if (
          lower.includes(
            "trend"
          )
        ) {
          aiContent = `Recent feedback trends suggest an increase in feature requests and usability concerns over time.\n\nCustomer satisfaction appears stable, but engagement-related complaints have increased compared to previous periods.`;
        } else {
          aiContent = `I've analyzed your feedback data and found a few meaningful patterns.\n\nCould you tell me whether you'd like insights around sentiment, pain points, customer satisfaction, or emerging trends?`;
        }


        const streamingId =
          `temp-ai-${Date.now()}`;

        const typingMessage: Message =
          {
            messageId:
              streamingId,
            chatId:
              activeChatId,
            role:
              "assistant",
            content:
              "__typing__",
            createdAt:
              new Date(),
          };

        setMessages(
          (prev) => [
            ...prev,
            typingMessage,
          ]
        );


        let current =
          "";

        for (
          let i = 0;
          i <
          aiContent.length;
          i++
        ) {
          current +=
            aiContent[
              i
            ];

          setMessages(
            (
              prev
            ) =>
              prev.map(
                (
                  msg
                ) =>
                  msg.messageId ===
                  streamingId
                    ? {
                        ...msg,
                        content:
                          current,
                      }
                    : msg
              )
          );

          await sleep(
            7
          );
        }


        const freshMessages =
          await getAskAuricMessages(
            activeChatId
          );

        if (
          freshMessages.success &&
          freshMessages.data
        ) {
          setMessages(
            freshMessages.data
          );
        }

        await loadChats();
      }
    } finally {
      setSendingMessage(
        false
      );
    }
  };

  const deleteChat =
    async (
      chatId: string
    ) => {
      await deleteAskAuricChat(
        chatId
      );

      setChats(
        (prev) =>
          prev.filter(
            (
              chat
            ) =>
              chat.chatId !==
              chatId
          )
      );

      if (
        activeChatId ===
        chatId
      ) {
        setActiveChatId(
          ""
        );

        setMessages(
          []
        );
      }
    };

  const clearHistory =
    async () => {
      await clearAskAuricHistory();

      setChats([]);
      setMessages([]);
      setActiveChatId(
        ""
      );
    };

  useEffect(() => {
    loadChats();
  }, []);

  useEffect(() => {
    if (
      activeChatId
    ) {
      loadMessages(
        activeChatId
      );
    }
  }, [
    activeChatId,
  ]);

  return {
    chats,
    messages,

    activeChatId,
    setActiveChatId,

    loadingChats,
    sendingMessage,

    createChat,
    sendMessage,

    deleteChat,
    clearHistory,
  };
}