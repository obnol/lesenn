import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center">
      <header className="flex justify-between items-center w-full mx-auto">
        <p className="text-2xl font-bold">lesenn</p>
        <Link href="/login" className="text-blue-500">
          login
        </Link>
      </header>

      <main className="flex flex-col items-center text-center gap-6 pt-48">
        <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">read. track. repeat.</h1>

        <p className="text-lg text-gray-600 max-w-md">
          discover a better way to manage your reading. keep track of your progress, revisit your favorites. <br />
          built for personal use with a simple and clean interface.
        </p>

        <Link href="/login" className="mt-4 px-6 py-3 bg-blue-500 text-white font-medium hover:bg-blue-600 transition">
          get started
        </Link>
      </main>

      <footer className="absolute bottom-8 text-xs text-gray-500">
        <div className="flex flex-col items-center gap-2">
          © {new Date().getFullYear()} lesenn. all rights reserved.
          <a href="https://x.com/obnol1" target="_blank" className="text-blue-500">
            reach out to me on x
          </a>
        </div>
      </footer>
    </div>
  );
}
