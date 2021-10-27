import Terminal from "../components/Terminal";

import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>
        kavinvalli:$ <span className={styles.help}>type help to start</span>
      </h1>
      <p>
        Visit{" "}
        <a href="https://n.kavin.me" target="_blank" rel="noreferrer">
          Normal website
        </a>
      </p>

      <Terminal />
    </div>
  );
}
