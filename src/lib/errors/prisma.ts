export function handlePrismaError(
  error: unknown
) {

  const prismaError =
    error as {
      code?: string;
    };

  switch (
    prismaError?.code
  ) {
    case "P2002":
      return {
        status: 409,
        message:
          "Feedback already submitted",
      };

    case "P2025":
      return {
        status: 404,
        message:
          "Invalid form or company",
      };

    default:
      return {
        status: 500,
        message:
          "Internal server error",
      };
  }
}