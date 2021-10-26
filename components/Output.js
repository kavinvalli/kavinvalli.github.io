export default function Output({ output }) {
  return output ? <p dangerouslySetInnerHTML={{ __html: output }}></p> : <></>;
}
