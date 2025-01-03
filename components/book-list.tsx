import { Book } from "@/lib/supabase/queries";
import { BookItem } from "./book-item";

type Props = {
  books?: Book[] | null;
};

export function BookList({ books }: Props) {
  return books?.length ? (
    <div className="flex flex-col gap-8 w-full">
      {books.map((book) => (
        <BookItem key={book.id} book={book} />
      ))}
    </div>
  ) : (
    <div>no books</div>
  );
}
