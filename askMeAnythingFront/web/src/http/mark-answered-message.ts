interface MarkAsAnsweredRequest {
  roomId: string;
  messageId: string;
}

// http://localhost:8080/api/rooms/65e88e11-5ac3-4c06-aa31-95651049f035/messages/a1dca337-7f0d-4d3c-9aa5-cd9e68241ea6/answer

export async function markAnsweredMessage({
  messageId,
  roomId,
}: MarkAsAnsweredRequest) {
  await fetch(
    `${
      import.meta.env.VITE_APP_API_URL
    }/rooms/${roomId}/messages/${messageId}/answer`,
    {
      method: "PATCH",
    }
  );
}
