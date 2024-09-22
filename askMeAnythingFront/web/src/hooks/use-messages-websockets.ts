import { useEffect } from "react";
import {
  messageForFront,
  GetRoomMessagesResponse,
} from "../http/get-room-messages";
// import { queryClient } from "../lib/react-query";
import { useQueryClient } from "@tanstack/react-query";

interface UseMessagesWebsocketsParams {
  roomId: string;
}
type webHookMessage =
  | { kind: "message_created"; value: { id: string; message: string } }
  | {
      kind: "message_reaction_increased";
      value: { id: string; count: number };
    }
  | { kind: "message_reaction_decreased"; value: { id: string; count: number } }
  | { kind: "message_answered"; value: { id: string } }
  | {
      kind: "message_answer_created";
      value: { id: string; answearMessage: string };
    };

export function useMessagesWebsockets({ roomId }: UseMessagesWebsocketsParams) {
  const queryClient = useQueryClient();
  useEffect(() => {
    const webSocket = new WebSocket(`ws://localhost:8080/subscribe/${roomId}`);

    webSocket.onopen = () => {
      console.log("websocket connected!");
    };

    webSocket.onclose = () => {
      console.log("websocket connection closed");
    };

    webSocket.onmessage = (event) => {
      const data: webHookMessage = JSON.parse(event.data);
      console.log("DATA form websocket", data);
      switch (data.kind) {
        // going in this one when it should not.
        case "message_created":
          queryClient.setQueryData(
            ["messages", roomId],
            (state: { messages: messageForFront[] }) => {
              console.log("state ", state);
              return {
                messages: [
                  ...state.messages,
                  {
                    id: data.value.id,
                    text: data.value.message,
                    amountOfReactions: 0,
                    answered: false,
                  },
                ],
              };
            }
          );
          break;
        case "message_reaction_increased":
          queryClient.setQueryData<GetRoomMessagesResponse>(
            ["messages", roomId],
            (state) => {
              console.log("state ", state);
              if (!state) {
                return {
                  messages: [],
                };
              }
              return {
                messages: [
                  ...state.messages.map((message: messageForFront) => {
                    if (message.id == data.value.id) {
                      return {
                        ...message,
                        amountOfReactions: message.amountOfReactions + 1,
                      };
                    }
                    return message;
                  }),
                ],
              };
            }
          );
          break;
        case "message_reaction_decreased":
          queryClient.setQueryData<GetRoomMessagesResponse>(
            ["messages", roomId],
            (state) => {
              console.log("state ", state);
              if (!state) {
                return {
                  messages: [],
                };
              }
              return {
                messages: [
                  ...state.messages.map((message: messageForFront) => {
                    if (message.id == data.value.id) {
                      return {
                        ...message,
                        amountOfReactions: message.amountOfReactions - 1,
                      };
                    }
                    return message;
                  }),
                ],
              };
            }
          );
          break;
        case "message_answered":
          queryClient.setQueryData<GetRoomMessagesResponse>(
            ["messages", roomId],
            (state) => {
              console.log("state ", state);
              if (!state) {
                return {
                  messages: [],
                };
              }
              return {
                messages: [
                  ...state.messages.map((message: messageForFront) => {
                    if (message.id == data.value.id) {
                      return {
                        ...message,
                        answered: true,
                      };
                    }
                    return message;
                  }),
                ],
              };
            }
          );
          break;
        case "message_answer_created":
          queryClient.setQueryData<GetRoomMessagesResponse>(
            ["messages", roomId],
            (state) => {
              console.log("state ", state);
              if (!state) {
                return {
                  messages: [],
                };
              }
              return {
                messages: [
                  ...state.messages.map((message: messageForFront) => {
                    if (message.id == data.value.id) {
                      return {
                        ...message,
                      };
                    }
                    return message;
                  }),
                ],
              };
            }
          );
          break;
        default:
          break;
      }

      console.log("websocket event", data);
    };

    return () => {
      webSocket.close();
    };
  }, [roomId, queryClient]);
}
