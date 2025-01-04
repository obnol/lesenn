"use client";

import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { GoogleBook, GoogleBooksResponse } from "@/lib/types";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "./ui/drawer";
import { AddBookForm } from "./add-book-form";

export function BookSearch() {
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>(query);
  const [results, setResults] = useState<GoogleBook[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<GoogleBook | null>(null); // Track the selected book
  const [open, setOpen] = useState<boolean>(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    const fetchBooks = async () => {
      if (!debouncedQuery) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(debouncedQuery)}&maxResults=25&key=${
            process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY
          }`
        );
        const data: GoogleBooksResponse = await response.json();

        if (data.items) {
          setResults(data.items);
        } else {
          setResults([]);
        }
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [debouncedQuery]);

  function handleClick(book: GoogleBook) {
    setSelectedBook(book);
    setOpen(true);
  }

  function handleClose() {
    setSelectedBook(null);
    setOpen(false);
  }

  return (
    <div className="flex flex-col gap-4">
      <Input placeholder="search book" value={query} onChange={(e) => setQuery(e.target.value)} />
      {loading && <p>loading...</p>}
      {!loading && results.length > 0 && (
        <div className="flex flex-col gap-2">
          {results.map((book, index) => (
            <div key={`${book.id}-${index}`} className="flex gap-4 p-2 hover:bg-gray-100 select-none" onClick={() => handleClick(book)}>
              {book.volumeInfo.imageLinks?.thumbnail && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} style={{ width: "36px", height: "auto" }} />
              )}
              <div className="flex flex-col overflow-hidden">
                <p className="font-semibold text-ellipsis overflow-hidden whitespace-nowrap">{book.volumeInfo.title}</p>
                {book.volumeInfo.authors && <p className="text-sm text-muted-foreground italic">{book.volumeInfo.authors.join(", ")}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
      {!loading && debouncedQuery && results.length === 0 && <p>no results found</p>}

      {isDesktop ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-[455px]">
            <DialogHeader>
              <DialogTitle>add book to your library</DialogTitle>
            </DialogHeader>
            {selectedBook && <AddBookForm book={selectedBook} onSuccess={handleClose} />}
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>add book to your library</DrawerTitle>
            </DrawerHeader>
            {selectedBook && <AddBookForm book={selectedBook} className="p-4" onSuccess={handleClose} />}
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
}
