"use client";

import { useState } from "react";
import { Book } from "@/lib/supabase/queries";
import { BookItem } from "./book-item";
import { LibraryControls } from "./library-controls";
import { ReadingStatistics } from "./reading-statistics";

type Props = {
  books?: Book[] | null;
};

export function BookList({ books }: Props) {
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books || []);

  if (!books || books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center pt-24 gap-4 text-center">
        <p className="text-lg font-semibold">your library is empty</p>
        <p className="text-sm text-muted-foreground max-w-md">
          start building your collection by searching for and adding your first book
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 w-full">
      <ReadingStatistics books={books} />
      <LibraryControls books={books} onFilteredBooksChange={setFilteredBooks} />
      {filteredBooks.length > 0 ? (
        <div className="flex flex-col gap-8 w-full">
          {filteredBooks.map((book) => (
            <BookItem key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center pt-24 gap-2 text-center">
          <p className="text-lg font-semibold">no books match your filters</p>
          <p className="text-sm text-muted-foreground">try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
