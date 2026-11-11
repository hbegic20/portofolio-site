import { Fragment, type ReactNode } from "react";

// key | string | number | boolean/null — enough for pretty-printed JSON.
const token =
  /("(?:\\.|[^"\\])*")(\s*:)?|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)|\b(true|false|null)\b/g;

/** Tiny JSON highlighter using the code tokens; no dependency, no innerHTML. */
export function JsonView({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(token)) {
    const i = m.index ?? 0;
    if (i > last) parts.push(text.slice(last, i));
    const [whole, str, colon, num, lit] = m;
    if (str && colon) {
      parts.push(<span className="text-code-fn">{str}</span>, colon);
    } else if (str) {
      parts.push(<span className="text-code-str">{str}</span>);
    } else if (num) {
      parts.push(<span className="text-accent">{num}</span>);
    } else if (lit) {
      parts.push(<span className="text-code-kw">{lit}</span>);
    } else {
      parts.push(whole);
    }
    last = i + whole.length;
  }
  parts.push(text.slice(last));

  return (
    <>
      {parts.map((p, i) => (
        <Fragment key={i}>{p}</Fragment>
      ))}
    </>
  );
}
