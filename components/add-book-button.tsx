"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { AddBookForm } from "./add-book-form";
import { Button } from "./ui/button";

export function AddBookButton() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  function handleClose() {
    setOpen(false);
  }

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>add book</Button>
        </DialogTrigger>
        <DialogContent className="max-w-[455px]">
          <DialogHeader>
            <DialogTitle>add book to your library</DialogTitle>
          </DialogHeader>
          <AddBookForm onSuccess={handleClose} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>add book</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>add book to your library</DrawerTitle>
        </DrawerHeader>
        <AddBookForm className="p-4" onSuccess={handleClose} />
      </DrawerContent>
    </Drawer>
  );
}
