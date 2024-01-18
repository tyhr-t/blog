export default function handler(req, res) {
  console.log(req.cookies.get("test"))

  console.log("REQ HEADERS", req.headers)
  console.log("REQ COOKIES", req.cookies)
  res.status(200).json({ message: "Hello from Next.js!" })
}
