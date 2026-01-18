import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Reading Tracker | Simple & Minimalist Book Tracking",
  description: "Track your reading progress with a simple, minimalist reading tracker. No distractions, just focus on your books. Start tracking for free.",
};

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex justify-between items-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link href="/" className="text-2xl font-bold">
          lesenn
        </Link>
        <Link href="/login">
          <Button variant="ghost" size="sm">
            login
          </Button>
        </Link>
      </header>

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <section className="space-y-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold">Reading Tracker</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A simple, minimalist reading tracker for people who want to focus on books, not features.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">Why track your reading?</h2>
          <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
            <p>
              Tracking what you read helps you stay accountable to your reading goals. Whether you want to read 10 books a year or 100, having a clear view of your progress keeps you motivated.
            </p>
            <p>
              But most reading trackers are overwhelming. They have social features, recommendations, challenges, and endless settings. If you just want to track your reading progress, you don&apos;t need all that.
            </p>
            <p>
              Lesenn is different. We built a reading tracker that does one thing well: helps you track your books without getting in your way.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">How Lesenn works</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Search and add books</h3>
              <p className="text-muted-foreground">
                Find books using Google Books and add them to your library with one click. No manual data entry needed.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Track your progress</h3>
              <p className="text-muted-foreground">
                Mark books as reading, track progress by pages or percentage, and see your stats at a glance.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Stay focused</h3>
              <p className="text-muted-foreground">
                No social feeds, no recommendations, no clutter. Just your books and your progress.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">Who is Lesenn for?</h2>
          <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
            <p>
              Lesenn is for readers who want simplicity. If you&apos;ve tried Goodreads and found it too overwhelming, or if you&apos;ve used spreadsheets and found them too manual, Lesenn might be for you.
            </p>
            <p>
              This is exactly why I built Lesenn. I wanted a reading tracker that stayed out of my way so I could focus on what matters: reading more books.
            </p>
          </div>
        </section>

        <section className="space-y-6 bg-muted/50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold">Ready to start tracking your reading?</h2>
          <p className="text-muted-foreground">
            Join Lesenn and take control of your reading journey today.
          </p>
          <Link href="/login">
            <Button size="lg" className="text-base px-8 py-6">
              Start tracking for free
            </Button>
          </Link>
        </section>
      </main>
    </div>
  );
}
