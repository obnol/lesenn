import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { Button } from "./ui/button";
import { deleteBookAction } from "@/actions/delete-book.action";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

type Props = {
  bookId: string;
  onSuccess: () => void;
};

export function DeleteBookButton({ bookId, onSuccess }: Props) {
  const [open, setOpen] = useState(false);
  const deleteBook = useAction(deleteBookAction, {
    onError: () => {
      toast.error("something went wrong please try again");
    },
    onSuccess: () => {
      setOpen(false);
      onSuccess();
      toast.success("book deleted successfully");
    },
  });

  function handleConfirm() {
    deleteBook.execute({ bookId });
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="destructive">
        remove from library
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>remove book from library</DialogTitle>
            <DialogDescription>
              are you sure you want to remove this book from your library? this action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)} disabled={deleteBook.status === "executing"}>
              cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirm} disabled={deleteBook.status === "executing"}>
              {deleteBook.status === "executing" ? (
                <>
                  <Loader className="h-4 w-4 animate-spin mr-2" />
                  removing...
                </>
              ) : (
                "remove"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
