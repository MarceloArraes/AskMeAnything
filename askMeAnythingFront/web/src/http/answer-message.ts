interface CreateMessageAnswearRequest {
  roomId: string;
  messageId: string;
  answerMessage: string;
}

// the problem starts in here.

export async function messageAnswear({
  messageId,
  roomId,
  answerMessage,
}: CreateMessageAnswearRequest) {
  const response = await fetch(
    `${
      import.meta.env.VITE_APP_API_URL
    }/rooms/${roomId}/messages/${messageId}/answer`,
    {
      method: "POST",
      body: JSON.stringify({
        answerMessage,
      }),
    }
  );
  const data: { id: string } = await response.json();
  console.log("data on messageAnswear", data);
  // return { messageId: data.id };
  return data;
}
