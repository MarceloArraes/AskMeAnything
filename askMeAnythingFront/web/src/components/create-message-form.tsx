import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { createMessage } from "../http/create-message";
import { useParams } from "react-router-dom";
import { SyntheticEvent, useState } from "react";

export function CreateMessageForm() {
  const { roomId } = useParams();
  const [message, setMessage] = useState<string>();

  if (!roomId)
    throw new Error("Messages components must be used within room page");

  const createMessageAction = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (!message) return;

    try {
      await createMessage({ message, roomId });
    } catch (error) {
      console.log("error", error);
      toast.error("Fail to create question");
    }
  };

  return (
    <form
      onSubmit={createMessageAction}
      className="flex items-center gap-2 bg-zinc-800 border p-2 rounded-xl border-zinc-600 ring-orange-400 ring-offset-2 ring-offset-zinc-800 focus-within:ring-1"
    >
      <input
        type="text"
        name="theme"
        onChange={(event) => setMessage(event.target.value)}
        placeholder="What is your question?"
        className="flex-1 text-sm bg-transparent mx-2 outline-none placeholder:text-zinc-500 text-zinc-100 "
        autoComplete="off"
      />
      <button
        type="submit"
        className="bg-orange-400 text-orange-950 px-3 py-1.5 font-medium text-sm gap-1.5 flex items-center rounded-lg hover:bg-orange-500"
      >
        Create Question
        <ArrowRight className="size-4" />
      </button>
    </form>
  );
}
