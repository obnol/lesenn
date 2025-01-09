/* eslint-disable @next/next/no-img-element */
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

      <main className="flex flex-col items-center text-center gap-12 pt-36 sm:pt-48">
        <div className="space-y-6">
          <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight">read. track. repeat.</h1>

          <div className="text-lg text-gray-600 max-w-lg flex flex-col space-y-2">
            <p>discover a better way to manage your reading.</p>
            <p>keep track of your progress, revisit your favorites.</p>
            <p>built for personal use with a simple and clean interface.</p>
          </div>

          <Link href="/login" className="inline-block mt-4 px-6 py-3 bg-blue-500 text-white font-medium hover:bg-blue-600 transition">
            get started
          </Link>
        </div>

        <div className="flex flex-col gap-24 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-left space-y-4">
              <h2 className="text-xl font-semibold">track your reading progress</h2>
              <p className="text-gray-600">easily mark books as reading, track page progress, and celebrate finishing them.</p>
            </div>
            <div className="flex-1">
              <img src="/edit-book.webp" alt="Progress tracking feature" className="rounded-lg shadow-lg w-full" />
            </div>
          </div>

          <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            <div className="flex-1 text-left space-y-4">
              <h2 className="text-xl font-semibold">search and add books</h2>
              <p className="text-gray-600">find books from a vast library and add them to your collection with a single click.</p>
            </div>
            <div className="flex-1">
              <img src="/add-new-book-search.webp" alt="Book search feature" className="rounded-lg shadow-lg w-full" />
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-left space-y-4">
              <h2 className="text-xl font-semibold">manage your library</h2>
              <p className="text-gray-600">view all your books in one place with their current reading status and progress.</p>
            </div>
            <div className="flex-1">
              <img src="/library.webp" alt="Library management feature" className="rounded-lg shadow-lg w-full" />
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-24 mb-8 text-xs text-gray-500">
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
