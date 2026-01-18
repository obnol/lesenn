import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Book Tracking App | Minimalist Reading Tracker",
  description: "A simple book tracking app that helps you manage your reading without distractions. Track books, monitor progress, and build better reading habits.",
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
          <h1 className="text-4xl sm:text-5xl font-extrabold">Book Tracking App</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A minimal book tracking app for people who want to focus on reading, not managing complex features.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">Why use a book tracking app?</h2>
          <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
            <p>
              A good book tracking app helps you remember what you&apos;ve read, track your progress on current books, and stay motivated to read more. The problem is, most book tracking apps do too much.
            </p>
            <p>
              They have social feeds, book recommendations, reading challenges, and endless settings. If you just want to track your books, these features are distractions, not benefits.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">Book tracking app vs Goodreads</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Goodreads is comprehensive</h3>
              <p className="text-muted-foreground">
                Goodreads has reviews, recommendations, social features, and millions of users. If you want to discover books and discuss them with others, Goodreads is great.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Lesenn is minimal</h3>
              <p className="text-muted-foreground">
                Lesenn focuses on one thing: helping you track your books. No reviews, no recommendations, no social features. Just a simple way to see what you&apos;re reading and what you&apos;ve finished.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Choose what fits</h3>
              <p className="text-muted-foreground">
                If you want a comprehensive book platform, use Goodreads. If you want a simple book tracking app that stays out of your way, try Lesenn.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">How to track books read</h2>
          <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
            <p>
              With Lesenn, tracking books is simple. Search for a book, add it to your library, and mark it as reading, finished, or want-to-read. Update your progress as you read, and see your reading statistics automatically calculated.
            </p>
            <p>
              You can filter by status, search by title or author, and sort your library however you want. Everything you need to manage your reading, nothing you don&apos;t.
            </p>
          </div>
        </section>

        <section className="space-y-6 bg-muted/50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold">Ready to start tracking your books?</h2>
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
