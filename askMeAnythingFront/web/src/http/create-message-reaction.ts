interface CreateMessageReactionRequest {
  roomId: string;
  messageId: string;
}

export async function messageReact({
  messageId,
  roomId,
}: CreateMessageReactionRequest) {
  const response = await fetch(
    `${
      import.meta.env.VITE_APP_API_URL
    }/rooms/${roomId}/messages/${messageId}/react`,
    {
      method: "PATCH",
    }
  );
  const data: { id: string } = await response.json();

  return { messageId: data.id };
}
