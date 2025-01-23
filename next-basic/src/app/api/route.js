export async function GET() {
  console.log("This message from API");

  return Response.json({ message: "Thiserer message from API" });
}
