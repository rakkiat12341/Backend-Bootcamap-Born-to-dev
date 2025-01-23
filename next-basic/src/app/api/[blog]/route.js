export async function GET(request, { params }) {
  console.log(params.blog);
  return Response.json({ message: params.blog, eie: "eie" });
}
