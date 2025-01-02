import { AddBookButton } from "@/components/add-book-button";
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
        <p className="font-bold text-xl">library</p>
        <AddBookButton />
      </div>

      {books?.data?.length ? (
        <div className="flex flex-col gap-8">
          {books.data.map((book) => (
            <div key={book.id}>
              <p className="font-semibold">{book.title}</p>
              <p className="text-sm text-muted-foreground">{book.authors}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>no books</div>
      )}
    </div>
  );
}
