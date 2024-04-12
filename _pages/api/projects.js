import Cors from "cors";
import runMiddleware from "../../utils/runMiddleware";

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD"],
});

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
  if (req.method === "GET") {
    const projects = [
      {
        name: "Liberty: Experience the ISS like never before.",
        description:
          "A browser based 3D visualisation of the International Space Station in Realtime which won us second place in the NASA Space Apps Regional Round among 90+ teams.",
        stack: ["Typescript", "NextJS", "Rust", "WASM"],
        link: "https://space-apps-eosin.vercel.app",
        image: "ndss.png",
        largeImage: "liberty-lg.png",
      },
      {
        name: "New Delhi Space Society Website",
        description:
          "I designed and developed New Delhi Space Society’s Website - A chapter of the National Space Society",
        stack: ["Typescript", "NextJS"],
        link: "https://new-delhi-space-society.github.io/",
        image: "ndss.png",
        largeImage: "ndss-lg.png",
      },
      {
        name: "Wunderkind - DPS Goethe Quiz",
        description:
          "Helped in creating a platform (website) for a quiz conducted by Goethe Institut in collaboration DPS Society. The platform was used by over 9000 students in 2 iterations of the quiz and boasted a 99% availability rating. The platform was orchestrated at minimal cost to the operators and used cutting-edge web technology.",
        stack: ["PHP", "Laravel", "Typescript", "ReactJS"],
        link: "https://dpsgoethequiz.com",
        image: "cognizer.png",
      },
      {
        name: "Cognizer",
        description:
          "A Chrome Extension that allows you to connect with people during and also soon after the conference or meet ends. Second Runner's up at Code Warriors soBig.s Hackathon 2021",
        stack: ["Javascript", "NodeJS", "Adonis", "Chrome Extension API"],
        link: "https://cognizer.kavin.me/",
        image: "cognizer.png",
      },
      {
        name: "Sudocrypt v11.0",
        description:
          "I developed the platform for Sudocrypt v11.0, a cryptic hunt organized by Exun Clan. It had over 1.5k participants and more than 50k attempts over the course of two days.",
        stack: ["PHP", "Laravel", "Typescript", "ReactJS"],
        link: "https://github.com/kavinvalli/sudocrypt-v11",
        image: "sudocrypt.png",
      },
      {
        name: "CBSE Rebrand",
        description:
          "Rebranded CBSE Platform made using AdonisJS for CORE 2021. Creative Winners",
        stack: ["Javascript", "NodeJS", "Adonis"],
        link: "https://github.com/kavinvalli/core-cbse-rebrand-2021",
        image: "cbse.png",
      },
      {
        name: "Discord Task Manager Bot",
        description:
          "A Task Manager Bot you can add to your discord servers (created with the help of the Discord API)",
        stack: ["Javascript", "NodeJS"],
        link: "https://task-manager-bot.github.io",
        image: "task-bot.png",
      },
      {
        name: "Cricket VSCode Extension",
        description:
          "A VSCode Extension to show Cricket News and LiveScores from inside the editor",
        stack: ["Javascript"],
        link: "https://github.com/kavin25/cricket-vscode-extension",
        image: "cricket-vscode.png",
      },
    ];

    return res.json(projects);
  } else {
    return res.status(400).json({ message: "Only GET request allowed" });
  }
}
