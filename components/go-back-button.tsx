import Link from "next/link";

type Props = {
  href?: string;
};

export function GoBackButton({ href }: Props) {
  return (
    <Link href={href || "/"} passHref>
      <p className="text-blue-600 hover:underline">← go back</p>
    </Link>
  );
}
