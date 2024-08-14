import { useParams } from "react-router-dom";
import logo from "../assets/logo.svg";
import { Share2 } from "lucide-react";
import { Messages } from "../components/messages";
import { Suspense } from "react";
import { CreateMessageForm } from "../components/create-message-form";

export function Room() {
  const { roomId } = useParams();

  if (!roomId) throw new Error("Must have a valid Room Id");

  return (
    <div className="mx-auto max-w-[640px] flex flex-col gap-6 py-10 px-4">
      <div className="flex gap-3 items-center px-3 ">
        <img className="h-10" height={70} width={50} src={logo} alt="logo" />
        <span className="text-sm text-zinc-500 truncate">
          Room Code {roomId}
        </span>

        <button
          type="submit"
          className="ml-auto bg-zinc-800 text-zinc-300 px-3 py-1.5 font-medium text-sm gap-1.5 flex items-center rounded-lg hover:bg-zinc-700"
        >
          Share
          <Share2 className="size-4" />
        </button>
      </div>
      <div className="h-px w-full bg-zinc-900" />
      <CreateMessageForm />
      <Suspense fallback={<p>Loading...</p>}>
        <Messages />
      </Suspense>
    </div>
  );
}
