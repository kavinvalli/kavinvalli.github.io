import { socials } from "../../../lib/socials";

export async function GET() {
  const contactMediums = socials.map((s) => ({
    medium: s.medium.toLowerCase(),
    username: s.username,
    link: s.link,
  }));

  return Response.json(contactMediums, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
