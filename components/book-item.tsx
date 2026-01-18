"use client";

import { useState } from "react";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { Book } from "@/lib/supabase/queries";
import { EditBookForm } from "./edit-book-form";
import { Loader } from "lucide-react";

type Props = {
  book: Book;
};

export function BookItem({ book }: Props) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  function handleClose() {
    setOpen(false);
  }

  const content = (
    <div className="flex justify-between items-center hover:bg-gray-100 p-2 select-none gap-4">
      <div className="flex gap-3 flex-1 min-w-0">
        {book.image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={book.image_url}
            alt={book.title}
            className="w-12 h-auto flex-shrink-0 object-cover rounded"
            style={{ maxHeight: "72px" }}
          />
        )}
        <div className="min-w-0 flex-1">
          <p className="font-semibold">{book.title}</p>
          <p className="text-sm text-muted-foreground italic">{book.authors.join(", ")}</p>
        </div>
      </div>

      <div className="flex flex-col text-sm text-muted-foreground items-end flex-shrink-0">
        {book.is_reading ? (
          <div className="flex items-center space-x-2">
            <Loader className="w-4 h-4" />
            {book.progress_type === "page" && book.page_count > 0 ? (
              <span>{(((book.progress || 0) / book.page_count) * 100).toFixed(0)}%</span>
            ) : book.progress_type === "percentage" && book.progress ? (
              <span>{book.progress}%</span>
            ) : null}
          </div>
        ) : book.is_finished ? (
          <p>read</p>
        ) : null}
      </div>
    </div>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{content}</DialogTrigger>
        <DialogContent className="max-w-[455px]">
          <DialogHeader>
            <div className="flex gap-4 items-start">
              {book.image_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={book.image_url}
                  alt={book.title}
                  className="w-24 h-auto flex-shrink-0 object-cover rounded"
                  style={{ maxHeight: "144px" }}
                />
              )}
              <div className="flex-1 min-w-0">
                <DialogTitle className="mb-1">{book.title}</DialogTitle>
                <p className="text-sm text-muted-foreground italic">{book.authors.join(", ")}</p>
              </div>
            </div>
          </DialogHeader>
          <EditBookForm onSuccess={handleClose} book={book} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{content}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <div className="flex gap-4 items-start">
            {book.image_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={book.image_url}
                alt={book.title}
                className="w-20 h-auto flex-shrink-0 object-cover rounded"
                style={{ maxHeight: "120px" }}
              />
            )}
            <div className="flex-1 min-w-0">
              <DrawerTitle className="mb-1">{book.title}</DrawerTitle>
              <p className="text-sm text-muted-foreground italic">{book.authors.join(", ")}</p>
            </div>
          </div>
        </DrawerHeader>
        <div className="p-4">
          <EditBookForm onSuccess={handleClose} book={book} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
