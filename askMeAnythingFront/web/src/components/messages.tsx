import { useParams } from "react-router-dom";
import { Message } from "./message";
// import { use } from "react";
import { getRoomMessages } from "../http/get-room-messages";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMessagesWebsockets } from "../hooks/use-messages-websockets";

export function Messages() {
  const { roomId } = useParams();

  if (!roomId) {
    throw new Error("Messages component must be used within room page");
  }

  // const { messages } = use(getRoomMessages({ roomId }));

  const { data } = useSuspenseQuery({
    queryKey: ["messages", roomId],
    queryFn: () => getRoomMessages({ roomId }),
  });

  useMessagesWebsockets({ roomId });

  const sortedMessages = data.messages.sort(
    (a, b) => b.amountOfReactions - a.amountOfReactions
  );

  if (!data?.messages) return;
  console.log("data.messages", data);
  return (
    <ol className="space-y-8 list-decimal list-outside px-3">
      {sortedMessages.map((item) => (
        <Message
          key={item.id}
          messageId={item.id}
          answer={item.answearMessage}
          amountOfReactions={item.amountOfReactions}
          text={item.text}
          answered={item.answered}
        />
      ))}
    </ol>
  );
}
