export async function GET() {
  const users = [
    {
      id: 1,
      name: "John Doe",
      username: "john",
      createdAt: "2021-09-08",
    },
    {
      id: 2,
      name: "Jane Doe",
      username: "jane",
      createdAt: "2021-09-08",
    },
    {
      id: 3,
      name: "John Doe",
      username: "john",
      createdAt: "2021-09-08",
    },
  ];
  return Response.json(users);
}
