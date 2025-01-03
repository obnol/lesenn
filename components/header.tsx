import { LogOut } from "./log-out";

export function Header() {
  return (
    <header className="flex justify-between items-center py-4 border-b border-gray-200">
      <div className="flex items-center gap-2">
        <p className="font-bold text-2xl">lesenn</p>
      </div>

      <LogOut />
    </header>
  );
}
