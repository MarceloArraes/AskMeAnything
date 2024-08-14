interface RemoveMessageReactionRequest {
  roomId: string;
  messageId: string;
}

export async function removeMessage({
  messageId,
  roomId,
}: RemoveMessageReactionRequest) {
  const response = await fetch(
    `${
      import.meta.env.VITE_APP_API_URL
    }/rooms/${roomId}/messages/${messageId}/react`,
    {
      method: "DELETE",
    }
  );
  const data: { id: string } = await response.json();

  return { messageId: data.id };
}
