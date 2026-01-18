import { Book } from "@/lib/supabase/queries";

type Props = {
  books: Book[];
};

export function ReadingStatistics({ books }: Props) {
  const totalBooks = books.length;
  const finishedBooks = books.filter((book) => book.is_finished).length;
  const readingBooks = books.filter((book) => book.is_reading && !book.is_finished).length;
  const wantToReadBooks = books.filter((book) => !book.is_reading && !book.is_finished).length;

  const totalPages = books.reduce((sum, book) => {
    if (book.is_finished) {
      return sum + (book.page_count || 0);
    }
    return sum;
  }, 0);

  const currentlyReadingPages = books.reduce((sum, book) => {
    if (book.is_reading && !book.is_finished && book.progress_type === "page") {
      return sum + (book.progress || 0);
    }
    return sum;
  }, 0);

  if (totalBooks === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-4 gap-2 p-2 bg-gray-50 rounded-lg">
      <div className="flex flex-col items-center text-center">
        <p className="text-xs text-muted-foreground">total</p>
        <p className="text-lg font-bold">{totalBooks}</p>
      </div>
      <div className="flex flex-col items-center text-center">
        <p className="text-xs text-muted-foreground">finished</p>
        <p className="text-lg font-bold">{finishedBooks}</p>
      </div>
      <div className="flex flex-col items-center text-center">
        <p className="text-xs text-muted-foreground">reading</p>
        <p className="text-lg font-bold">{readingBooks}</p>
      </div>
      <div className="flex flex-col items-center text-center">
        <p className="text-xs text-muted-foreground">pages</p>
        <p className="text-lg font-bold">{totalPages.toLocaleString()}</p>
      </div>
    </div>
  );
}
