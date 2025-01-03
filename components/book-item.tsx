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
    <div className="flex justify-between items-center hover:bg-gray-100 p-2 rounded-md">
      <div>
        <p className="font-semibold">{book.title}</p>
        <p className="text-sm text-muted-foreground italic">{book.authors.join(", ")}</p>
      </div>

      <div className="flex flex-col text-sm text-muted-foreground items-end">
        {book.is_reading ? (
          <div className="flex items-center space-x-2">
            <Loader className="w-4 h-4" />
            <span>{(((book.progress || 0) / book.page_count) * 100).toFixed(0)}%</span>
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
            <DialogTitle>{book.title}</DialogTitle>
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
          <DrawerTitle>{book.title}</DrawerTitle>
        </DrawerHeader>
        <div className="p-4">
          <EditBookForm onSuccess={handleClose} book={book} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
