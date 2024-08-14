import { ArrowRight } from "lucide-react";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { createRoom } from "../http/create-room";
import { toast } from "sonner";

export function CreateRoom() {
  const navigate = useNavigate();
  const handleCreateRoom = async (data: FormData) => {
    const theme = data.get("theme")?.toString();

    if (!theme) {
      toast.error("No theme");
      return;
    }

    try {
      const { roomId } = await createRoom({ theme });

      navigate(`/room/${roomId}`);
    } catch (error) {
      console.log("error", error);
      toast.error("Fail to create room");
    }

    console.log("Theme", theme);
  };

  return (
    <main className="h-screen flex items-center justify-center">
      <div className="max-w-[458px] flex flex-col gap-6">
        <img className="h-10" height={70} width={50} src={logo} alt="logo" />
        <p className="leading-relaxed text-zinc-300 text-center">
          Create your room
        </p>
        <form
          action={handleCreateRoom}
          className="flex items-center gap-2 bg-zinc-800 border p-2 rounded-xl border-zinc-600 ring-orange-400 ring-offset-2 ring-offset-zinc-800 focus-within:ring-1"
        >
          <input
            type="text"
            name="theme"
            placeholder="Name of Room"
            className="flex-1 text-sm bg-transparent mx-2 outline-none placeholder:text-zinc-500 text-zinc-100 "
            autoComplete="off"
          />
          <button
            type="submit"
            className="bg-orange-400 text-orange-950 px-3 py-1.5 font-medium text-sm gap-1.5 flex items-center rounded-lg hover:bg-orange-500"
          >
            Criar Sala
            <ArrowRight className="size-4" />
          </button>
        </form>
      </div>
    </main>
  );
}
