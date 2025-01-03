import { useAction } from "next-safe-action/hooks";
import { Button } from "./ui/button";
import { deleteBookAction } from "@/actions/delete-book.action";
import { toast } from "sonner";
import { Loader } from "lucide-react";

type Props = {
  bookId: string;
  onSuccess: () => void;
};

export function DeleteBookButton({ bookId, onSuccess }: Props) {
  const deleteBook = useAction(deleteBookAction, {
    onError: () => {
      toast.error("something went wrong please try again");
    },
    onSuccess: () => {
      onSuccess();
      toast.success("book deleted successfully");
    },
  });

  function handleClick() {
    deleteBook.execute({ bookId });
  }

  return (
    <Button onClick={handleClick} variant="destructive" disabled={deleteBook.status === "executing"}>
      {deleteBook.status === "executing" ? <Loader className="h-4 w-4 animate-spin" /> : <span>remove from library</span>}
    </Button>
  );
}
