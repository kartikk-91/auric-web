"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

type SendMessageInput = {
  chatId: string;
  message: string;
};

async function getCompanyId() {
  const session =
    await auth();

  if (
    !session?.user?.c_id
  ) {
    throw new Error(
      "Unauthorized"
    );
  }

  return session.user.c_id;
}

export async function createAskAuricChat() {
  try {
    const c_id =
      await getCompanyId();

    const chat =
      await prisma.askAuricChat.create(
        {
          data: {
            c_id,
            title:
              "New Chat",
          },
        }
      );

    revalidatePath(
      "/ask-auric"
    );

    return {
      success: true,
      data: chat,
    };
  } catch (error) {
    console.error(
      "Create chat error:",
      error
    );

    return {
      success: false,
      error:
        "Failed to create chat",
    };
  }
}

export async function getAskAuricChats() {
  try {
    const c_id =
      await getCompanyId();

    const chats =
      await prisma.askAuricChat.findMany(
        {
          where: {
            c_id,
          },
          include: {
            _count: {
              select: {
                messages: true,
              },
            },
          },
          orderBy: {
            updatedAt:
              "desc",
          },
        }
      );

    return {
      success: true,
      data: chats,
    };
  } catch (error) {
    console.error(
      "Get chats error:",
      error
    );

    return {
      success: false,
      error:
        "Failed to fetch chats",
    };
  }
}

export async function getAskAuricMessages(
  chatId: string
) {
  try {
    const c_id =
      await getCompanyId();


    const chat =
      await prisma.askAuricChat.findFirst(
        {
          where: {
            chatId,
            c_id,
          },
        }
      );

    if (!chat) {
      throw new Error(
        "Unauthorized access"
      );
    }

    const messages =
      await prisma.askAuricMessage.findMany(
        {
          where: {
            chatId,
          },
          orderBy: {
            createdAt:
              "asc",
          },
        }
      );

    return {
      success: true,
      data: messages,
    };
  } catch (error) {
    console.error(
      "Get messages error:",
      error
    );

    return {
      success: false,
      error:
        "Failed to fetch messages",
    };
  }
}

export async function sendAskAuricMessage({
  chatId,
  message,
}: SendMessageInput) {
  try {
    const c_id =
      await getCompanyId();


    const chat =
      await prisma.askAuricChat.findFirst(
        {
          where: {
            chatId,
            c_id,
          },
        }
      );

    if (!chat) {
      throw new Error(
        "Unauthorized access"
      );
    }


    const userMessage =
      await prisma.askAuricMessage.create(
        {
          data: {
            chatId,
            role:
              "user",
            content:
              message,
          },
        }
      );


    const messageCount =
      await prisma.askAuricMessage.count(
        {
          where: {
            chatId,
          },
        }
      );

    if (
      messageCount ===
      1
    ) {
      await prisma.askAuricChat.update(
        {
          where: {
            chatId,
          },
          data: {
            title:
              message.slice(
                0,
                50
              ),
          },
        }
      );
    }


    const lowerText =
      message.toLowerCase();

    const aiText =
      lowerText.includes(
        "pain"
      ) ||
      lowerText.includes(
        "problem"
      )
        ? "Based on your feedback analysis, customers mainly complain about onboarding friction, delayed support response, pricing confusion, and usability issues."
        : "I've analyzed your feedback trends. Could you tell me what specific insight you'd like to explore?";

    const assistantMessage =
      await prisma.askAuricMessage.create(
        {
          data: {
            chatId,
            role:
              "assistant",
            content:
              aiText,
            metadata: {
              mocked: true,
            },
          },
        }
      );

    await prisma.askAuricChat.update(
      {
        where: {
          chatId,
        },
        data: {
          updatedAt:
            new Date(),
        },
      }
    );

    revalidatePath(
      "/ask-auric"
    );

    return {
      success: true,
      data: {
        userMessage,
        assistantMessage,
      },
    };
  } catch (error) {
    console.error(
      "Send message error:",
      error
    );

    return {
      success: false,
      error:
        "Failed to send message",
    };
  }
}

export async function deleteAskAuricChat(
  chatId: string
) {
  try {
    const c_id =
      await getCompanyId();

    await prisma.askAuricChat.deleteMany(
      {
        where: {
          chatId,
          c_id,
        },
      }
    );

    revalidatePath(
      "/ask-auric"
    );

    return {
      success: true,
    };
  } catch (error) {
    console.error(
      "Delete chat error:",
      error
    );

    return {
      success: false,
      error:
        "Failed to delete chat",
    };
  }
}

export async function clearAskAuricHistory() {
  try {
    const c_id =
      await getCompanyId();

    await prisma.askAuricChat.deleteMany(
      {
        where: {
          c_id,
        },
      }
    );

    revalidatePath(
      "/ask-auric"
    );

    return {
      success: true,
    };
  } catch (error) {
    console.error(
      "Clear history error:",
      error
    );

    return {
      success: false,
      error:
        "Failed to clear history",
    };
  }
}