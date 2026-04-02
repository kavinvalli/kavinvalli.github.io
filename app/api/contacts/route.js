export async function GET(request) {
  const contactMediums = [
    {
      medium: "github",
      username: "kavinvalli",
      link: "https://github.com/kavinvalli",
    },
    {
      medium: "email",
      username: "mail@kavin.me",
      link: "mailto:mail@kavin.me",
    },
    {
      medium: "linkedin",
      username: "kavinvalli",
      link: "https://www.linkedin.com/in/kavinvalli/",
    },
    {
      medium: "twitter",
      username: "kavinvalli",
      link: "https://twitter.com/kavinvalli",
    },
  ];

  return Response.json(contactMediums, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
