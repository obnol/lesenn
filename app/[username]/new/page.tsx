import { AddBookForm } from "@/components/add-book-form";
import { GoBackButton } from "@/components/go-back-button";

export default function Page() {
  return (
    <div className="flex flex-col gap-8">
      <GoBackButton />

      <AddBookForm />
    </div>
  );
}
