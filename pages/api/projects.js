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
        name: "Enship Website",
        description:
          "I designed and developed the website for my school’s entrepreneurship club - Enship",
        stack: ["Javascript", "NextJS"],
        link: "https://enship-club.github.io/",
        image: "enship.jpeg",
        largeImage: "enship-lg.png",
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
        name: "Exun Notifications Platform (Cannot share code/link)",
        description:
          "Notification management and realtime notification platform built with NodeJS and Express. Used to send push notifications to the Exun 2020 App during the 25th International Tech Symposium, Exun 2020",
        stack: ["Javascript", "NodeJS", "Express"],
        link: "https://exunclan.com",
        image: "exun.png",
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
        name: "Job Application Portal",
        description:
          "[e-Lite 2020] Complete solution for applying to new and managing existing jobs of the KoolKidsKlub (fluff)",
        stack: ["Python", "Django"],
        link: "https://github.com/kavin25/koolkidsexun",
        image: "kke.jpeg",
      },
      {
        name: "Trivy",
        description:
          "Airbnb for Tour Guides. Explore the city with people who know it the best. Finalist in XINO's Exquisite hackathon.",
        stack: ["Python", "Django"],
        link: "https://github.com/kavin25/Xino-Hackathon2020",
        image: "trivy.png",
      },
      {
        name: "Ambulify Landing Page",
        description:
          'The landing page for "Ambulify", a product created at Innovate@trix 2021 competition',
        stack: ["Javascript", "NextJS"],
        link: "https://github.com/kavin25/innovate-trix-2021-static",
        image: "ambulify.png",
      },
      {
        name: "DPS Notices Tracker Discord Bot",
        description:
          "A Discord bot to track my school's notices and send a discord msg when it's been updated",
        stack: ["Python"],
        link: "https://github.com/kavin25/dps-notices-discord",
        image: "dps.jpeg",
      },
      {
        name: "DPS Notices Tracker Email Bot",
        description:
          "A bot to track my school's notices and send an email when it's been updated",
        stack: ["Python"],
        link: "https://github.com/kavin25/dps-notices-discord",
        image: "dps.jpeg",
      },
      {
        name: "Snapix",
        description:
          "A landing page (and discussion section), for a Video Editing Software. Winner of Script@trix 2020",
        stack: ["Python", "Django"],
        link: "https://github.com/kavin25/scriptatrix20",
        image: "snapix.png",
      },
      {
        name: "Cricket VSCode Extension",
        description:
          "A VSCode Extension to show Cricket News and LiveScores from inside the editor",
        stack: ["Javascript"],
        link: "https://github.com/kavin25/cricket-vscode-extension",
        image: "cricket-vscode.png",
      },
      {
        name: "URL Shortener",
        description:
          "A URL Shortener written in NodeJS and Express with MongoDB",
        stack: ["Javascript", "NodeJS", "Express"],
        link: "https://github.com/kavin25/url-shortener",
        image: "url.png",
      },
      {
        name: "FourEss Games",
        description: "A screenshare based quiz app for friends and family",
        stack: ["Python", "Django"],
        link: "https://github.com/kavin25/jeopardyquiz-with-django",
        image: "quiz.png",
      },
    ];

    return res.json(projects);
  } else {
    return res.status(400).json({ message: "Only GET request allowed" });
  }
}
