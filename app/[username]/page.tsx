import { BookList } from "@/components/book-list";
import { getUserLibrary } from "@/lib/supabase/queries/cached-queries";
import Link from "next/link";

type Params = Promise<{ username: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { username } = await params;

  return {
    title: `${username}'s library`,
  };
}

type Props = {
  params: Params;
};

export default async function Page({ params }: Props) {
  const { username } = await params;
  const books = await getUserLibrary();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-end">
        <Link href={`/${username}/new`} className="text-blue-500">
          add book
        </Link>
      </div>

      <BookList books={books?.data} />
    </div>
  );
}
