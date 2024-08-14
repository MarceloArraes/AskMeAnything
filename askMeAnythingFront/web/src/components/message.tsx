import { ArrowUp } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { messageReact } from "../http/create-message-reaction";
import { toast } from "sonner";
import { removeMessage } from "../http/remove-message-reaction";

interface MessageProps {
  text?: string;
  amountOfReactions?: number;
  answered?: boolean;
  messageId: string;
}

export function Message({
  text = "",
  amountOfReactions = 0,
  answered = false,
  messageId,
}: MessageProps) {
  const { roomId } = useParams();
  const [hasReacted, setHasReacted] = useState(false);

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
