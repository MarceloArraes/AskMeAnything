import { ArrowUp } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { messageReact } from "../http/create-message-reaction";
import { messageAnswear } from "../http/answer-message";
import { toast } from "sonner";
import { removeMessage } from "../http/remove-message-reaction";

interface MessageProps {
  text?: string;
  amountOfReactions?: number;
  answered?: boolean;
  messageId: string;
  answer: string;
}

export function Message({
  text = "",
  amountOfReactions = 0,
  answer = "",
  answered = false,
  messageId,
}: MessageProps) {
  const { roomId } = useParams();
  const [hasReacted, setHasReacted] = useState(false);
  const [messageAnswer, setMessageAnswer] = useState(answer);

  if (!roomId)
    throw new Error("Messages components must be used within room page");

  const handeReactToMessage = async () => {
    if (!roomId) return;

    try {
      setHasReacted((prev) => !prev);

      await messageReact({ messageId, roomId });
    } catch (error) {
      console.log("error", error);
      toast.error("Error reacting to message");
    }
  };

  const handeAnswerMessage = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!roomId) return;
    event.preventDefault();
    setMessageAnswer(event.target.value);
    try {
      await messageAnswear({
        messageId,
        roomId,
        answerMessage: event.target.value,
      });
    } catch (error) {
      console.log("error", error);
      toast.error("Error reacting to message");
    }
  };

  const handeDesreactToMessage = async () => {
    if (!roomId) return;

    try {
      setHasReacted((prev) => !prev);

      await removeMessage({ messageId, roomId });
    } catch (error) {
      console.log("error", error);
      toast.error("Error taking out reaction to message");
    }
  };

  return (
    <li
      data-answered={answered}
      className="ml-4 leading-relaxed text-zinc-100 data-[answered=true]:opacity-50 data-[answered=true]:pointer-events-none"
    >
      {text}
      <input
        className="flex items-center gap-2 text-zinc-300 text-sm mt-2"
        value={messageAnswer ?? ""}
        onChange={handeAnswerMessage}
      />
      {hasReacted ? (
        <button
          type="button"
          onClick={handeDesreactToMessage}
          className="hover:text-orange-500 mt-3 flex items-center gap-2 text-orange-400 text-sm font-medium"
        >
          <ArrowUp className="size-4" />
          Like question ({amountOfReactions})
        </button>
      ) : (
        <button
          type="button"
          onClick={handeReactToMessage}
          className="hover:text-zinc-300  mt-3 flex items-center gap-2 text-zinc-400 text-sm font-medium"
        >
          <ArrowUp className="size-4" />
          Like question ({amountOfReactions})
        </button>
      )}
    </li>
  );
}
