export default function Output({ output }) {
  return output ? <div dangerouslySetInnerHTML={{ __html: output }}></div> : null;
}
