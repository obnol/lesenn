import { Header } from "@/components/header";

export default async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col gap-4">
      <Header />
      {children}
    </div>
  );
}
