export default function handler(req, res) {
  if (req.method === "GET") {
    const contactMediums = [
      {
        medium: "github",
        username: "kavin25",
        link: "https://github.com/kavin25",
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
