import { BookSearch } from "@/components/book-search";
import { GoBackButton } from "@/components/go-back-button";
import { use } from "react";

type Params = Promise<{ username: string }>;

type Props = {
  params: Params;
};

export default function Page(props: Props) {
  const params = use(props.params);
  const { username } = params;

  return (
    <div className="flex flex-col gap-8">
      <GoBackButton href={`/${username}`} />

      <BookSearch />
    </div>
  );
}
