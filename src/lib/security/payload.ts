const MAX_PAYLOAD_SIZE =
  200 * 1024;

export function validatePayload(
  data: unknown
) {
  const size =
    Buffer.byteLength(
      JSON.stringify(data)
    );

  return (
    size <=
    MAX_PAYLOAD_SIZE
  );
}