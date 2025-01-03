import { AddBookButton } from "@/components/add-book-button";
import { BookList } from "@/components/book-list";
import { getUserLibrary } from "@/lib/supabase/queries/cached-queries";

type Params = Promise<{ username: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { username } = await params;

  return {
    title: `${username}'s library`,
  };
}

export default async function Page() {
  const books = await getUserLibrary();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <p className="font-bold text-2xl">library</p>
        <AddBookButton />
      </div>

      <BookList books={books?.data} />
    </div>
  );
}
