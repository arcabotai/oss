import Link from "next/link";

export default function NotFound() {
  return <main className="not-found"><p className="eyebrow">404 / NO RECORD</p><h1>This path left no receipt.</h1><Link className="button" href="/">Return to the index</Link></main>;
}
