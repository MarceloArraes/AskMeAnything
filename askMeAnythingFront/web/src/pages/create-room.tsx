import { ArrowRight } from "lucide-react";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { createRoom } from "../http/create-room";
import { toast } from "sonner";
import { SyntheticEvent, useState } from "react";
import { getRooms } from "../http/get-all-rooms";
import { useSuspenseQuery } from "@tanstack/react-query";
import RoomList from "../components/room-list";
import Button from "../components/button";

export function CreateRoom() {
  const [theme, setTheme] = useState<string>("");
  const navigate = useNavigate();

  const { data } = useSuspenseQuery({
    queryKey: ["rooms"],
    queryFn: () => getRooms(),
  });

  const handleCreateRoom = async (event: SyntheticEvent) => {
    event.preventDefault();
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
  const handleEnterRoom = (roomId: string) => {
    navigate(`/room/${roomId}`);
  };

  return (
    <main className="h-screen flex items-center justify-center">
      <div className="max-w-[458px] flex flex-col gap-6">
        <div className="relative h-20 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-radial from-orange-400 to-transparent blur-lg"></div>
          <img
            className="relative h-10 mt-5 ml-auto mr-auto"
            src={logo}
            alt="logo"
          />
        </div>
        <p className="leading-relaxed text-zinc-300 text-center font-bold">
          Create your room
        </p>
        <form
          onSubmit={handleCreateRoom}
          className="flex items-center gap-2 bg-zinc-800 border p-2 rounded-xl border-zinc-600 ring-orange-400 ring-offset-2 ring-offset-zinc-800 focus-within:ring-1"
        >
          <input
            type="text"
            name="theme"
            value={theme}
            onChange={(value) => setTheme(value.target.value.toString())}
            placeholder="Name of Room"
            className="flex-1 text-sm bg-transparent mx-2 outline-none placeholder:text-zinc-500 text-zinc-100"
            autoComplete="off"
          />
          <Button>
            Criar Sala
            <ArrowRight className="size-4" />
          </Button>
        </form>
        <RoomList rooms={data} onEnterRoom={handleEnterRoom} />
      </div>
    </main>
  );
}
