// src/components/RoomList.tsx
import React from "react";
import Button from "./button";

interface Room {
  ID: string;
  Theme: string;
}

interface RoomListProps {
  rooms: Room[];
  onEnterRoom: (roomId: string) => void;
}

const RoomList: React.FC<RoomListProps> = ({ rooms, onEnterRoom }) => {
  return (
    <div className="rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Available Rooms</h2>
      <ul className="space-y-2">
        {rooms.map((room) => (
          <li
            key={room.ID}
            className="border p-2 flex justify-between items-center rounded-xl border-zinc-600 ring-orange-400 ring-offset-2 ring-offset-zinc-800 focus-within:ring-1"
          >
            <span className="placeholder:text-zinc-500 text-zinc-200 font-medium">
              {room.Theme}
            </span>
            <Button onClick={() => onEnterRoom(room.ID)}>Enter Room</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
