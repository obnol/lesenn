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

      <main className="flex flex-col items-center text-center gap-6 pt-36 sm:pt-48">
        <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight">read. track. repeat.</h1>

        <div className="text-lg text-gray-600 max-w-lg flex flex-col space-y-2">
          <h2>discover a better way to manage your reading.</h2>
          <h2>keep track of your progress, revisit your favorites.</h2>
          <h2>built for personal use with a simple and clean interface.</h2>
        </div>

        <Link href="/login" className="mt-4 px-6 py-3 bg-blue-500 text-white font-medium hover:bg-blue-600 transition">
          get started
        </Link>
      </main>

      <footer className="absolute bottom-8 text-xs text-gray-500">
        <div className="flex flex-col items-center gap-2">
          © {new Date().getFullYear()} lesenn. all rights reserved.
          <div className="flex flex-col sm:flex-row items-center gap-2 text-blue-500">
            <a href="https://x.com/obnol1" target="_blank">
              reach out to me on x
            </a>
            <span className="hidden sm:block">|</span>
            <a href="https://github.com/obnol/lesenn" target="_blank">
              view the source code
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
