import Cors from "cors";
import runMiddleware from "../../utils/runMiddleware";

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD"],
});

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
  if (req.method === "GET") {
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
        medium: "facebook",
        username: "kavin.valli.25",
        link: "https://www.facebook.com/kavin.valli.25/",
      },
      {
        medium: "linkedin",
        username: "kavinvalli",
        link: "https://www.linkedin.com/in/kavinvalli/",
      },
    ];

    res.json(contactMediums);
  } else {
    return res.status(400).json({ message: "Only GET request allowed" });
  }
}
