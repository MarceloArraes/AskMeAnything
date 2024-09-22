export async function getRooms() {
  const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/rooms`);
  const data: { ID: string; Theme: string }[] = await response.json();
  console.log("data1", data);
  return data;
}
