interface GetRoomMessagesRequest {
  roomId: string;
}

interface messageData {
  ID: string;
  RoomID: string;
  Message: string;
  ReactionCount: number;
  Answered: boolean;
  AnswearMessage: string;
}

export interface GetRoomMessagesResponse {
  messages: messageForFront[];
}

export interface messageForFront {
  id: string;
  roomId: string;
  text: string;
  amountOfReactions: number;
  answered: boolean;
  answearMessage: string;
}

export async function getRoomMessages({
  roomId,
}: GetRoomMessagesRequest): Promise<GetRoomMessagesResponse> {
  // console.log("env", import.meta.env.VITE_APP_API_URL);
  const response = await fetch(
    `${import.meta.env.VITE_APP_API_URL}/rooms/${roomId}/messages`
    // http://localhost:8080/api/rooms/:room_id/messages
  );
  const data: messageData[] = await response.json();

  return {
    messages: data.map((item) => {
      return {
        id: item.ID,
        roomId: item.RoomID,
        text: item.Message,
        amountOfReactions: item.ReactionCount,
        answered: item.Answered,
        answearMessage: item.AnswearMessage,
      } as messageForFront;
    }),
  };
}
