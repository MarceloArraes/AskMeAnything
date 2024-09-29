# AskMeAnything

## Things to remember

- use ml-auto on tailwind to let some element on the top right corner keeping the responsiveness.
- Instead of managing what came from a useQuery request on a local State, its better to edit the 'data' using setQueryData, that centralize things and avoid the need of an refetch(even though im not sure how to delete the element i just added without the id that is created on the backend.).
- use this data props of native html to change the tailwind properties:

  ````<li
      data-answered={answered}
      className="data-[answered=true]:opacity-50 data-[answered=true]:pointer-events-none" /> ```
  ````

- useSuspenseQuery instead of useQuery with the suspense option for simplicity;
- use more this type of interface declaration:
  `queryClient.setQueryData<GetRoomMessagesResponse>`
- this is an optional form of type declaration that can give flexibility without losing the information:

  ````type webHookMessage =
  | { kind: "message_created"; value: { id: string; message: string } }
  | {
  kind: "message_reaction_increased";
  value: { id: string; count: number };
  }
  | { kind: "message_reaction_decreased"; value: { id: string; count: number } }
  | { kind: "message_answered"; value: { id: string } };```
  ````

Test the connection with the backend:
curl <http://localhost:8080/api/your-endpoint>
