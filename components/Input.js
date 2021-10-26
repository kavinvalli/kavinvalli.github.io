import { useEffect, useState, useRef } from "react";
import styles from "./Input.module.css";

// const useFocus = () => {
//   const htmlElRef = useRef(null);
//   const setFocus = () => {
//     htmlElRef.current && htmlElRef.current.focus();
//   };

//   console.log("here");

//   return [htmlElRef, setFocus];
// };

export default function Input({ command, onSubmit }) {
  const [_command, setCommand] = useState(command ? command : "");
  // const [inputRef, setInputRef] = useFocus();

  // useEffect(() => {
  //   if (!command) return setInputRef();
  // }, [command, setInputRef]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCommand("");
    return onSubmit(_command);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="command">
        <span style={{ color: "#ff9e64" }}>λ</span> ::{" "}
        <span style={{ color: "var(--primary)" }}>~</span>{" "}
        <span style={{ color: "var(--secondary)" }}>&gt;&gt;</span>
      </label>

      <input
        type="text"
        className={styles.input}
        value={_command}
        onChange={(e) => setCommand(e.target.value)}
        disabled={command ? true : false}
        ref={(input) => input && !command && input.focus()}
        autoFocus={command === ""}
      />
    </form>
  );
}
