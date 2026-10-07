import { Fragment } from "react";

/* Rendert *accent*, **vet** en \n (regeleinde) uit vertaalde teksten */
export default function Rich({ text, vars }: { text: string; vars?: Record<string, string> }) {
  let s = text;
  if (vars) for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, v);
  return (
    <>
      {s.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\n)/).map((part, i) => {
        if (part === "\n") return <br key={i} />;
        if (part.startsWith("**") && part.endsWith("**")) return <b key={i}>{part.slice(2, -2)}</b>;
        if (part.startsWith("*") && part.endsWith("*") && part.length > 2) return <span key={i} className="accent">{part.slice(1, -1)}</span>;
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
