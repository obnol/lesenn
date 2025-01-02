import Link from "next/link";

export default function Page() {
  return (
    <div className="flex justify-between">
      <p>landing page</p>
      <Link href="/login">login</Link>
    </div>
  );
}
