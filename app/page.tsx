/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track your reading progress without distractions",
  description: "Lesenn is a minimalist reading tracker that helps you track your reading progress without distractions. Focus on reading, not managing complex features.",
};

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex justify-between items-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-2xl font-bold">lesenn</p>
        <Link href="/login">
          <Button variant="ghost" size="sm">
            login
          </Button>
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center">
        {/* Hero Section */}
        <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              Track your reading progress without distractions
            </h1>

            <div className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto space-y-3">
              <p>discover a better way to manage your reading journey.</p>
              <p>keep track of your progress, celebrate your achievements, and revisit your favorites.</p>
            </div>

            <div className="pt-4">
              <Link href="/login">
                <Button size="lg" className="text-base px-8 py-6">
                  get started
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="flex flex-col gap-16 sm:gap-24">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="flex-1 space-y-4">
                <h2 className="text-2xl sm:text-3xl font-semibold">track your reading progress</h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  easily mark books as reading, track your progress by pages or percentage, and celebrate finishing each one.
                </p>
              </div>
              <div className="flex-1">
                <img 
                  src="/edit-book.webp" 
                  alt="Progress tracking feature" 
                  className="rounded-lg shadow-xl w-full border border-border" 
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
              <div className="flex-1 space-y-4">
                <h2 className="text-2xl sm:text-3xl font-semibold">search and add books</h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  find books from a vast library using google books and add them to your collection with a single click.
                </p>
              </div>
              <div className="flex-1">
                <img 
                  src="/add-new-book-search.webp" 
                  alt="Book search feature" 
                  className="rounded-lg shadow-xl w-full border border-border" 
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="flex-1 space-y-4">
                <h2 className="text-2xl sm:text-3xl font-semibold">manage your library</h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  view all your books in one place with reading statistics, filter by status, and organize your collection your way.
                </p>
              </div>
              <div className="flex-1">
                <img 
                  src="/library.webp" 
                  alt="Library management feature" 
                  className="rounded-lg shadow-xl w-full border border-border" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <div className="space-y-6 bg-muted/50 rounded-lg p-8 sm:p-12">
            <h2 className="text-2xl sm:text-3xl font-semibold">ready to start tracking your reading?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              join lesenn and take control of your reading journey today.
            </p>
            <div className="pt-4">
              <Link href="/login">
                <Button size="lg" className="text-base px-8 py-6">
                  get started
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t border-border mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center gap-3 text-xs sm:text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} lesenn. all rights reserved.</p>
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <a 
                href="https://x.com/obnol1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                reach out to me on x
              </a>
              <span className="hidden sm:block">•</span>
              <a 
                href="https://github.com/obnol/lesenn" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                view the source code
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
