import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Track Reading Progress | Simple Reading Log App",
  description: "Track your reading progress effortlessly. Monitor pages read, percentage completed, and build better reading habits with a minimalist tracking tool.",
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
          <h1 className="text-4xl sm:text-5xl font-extrabold">Track Reading Progress</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A simple system to track your reading progress without the complexity.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">Why track reading progress?</h2>
          <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
            <p>
              Tracking your reading progress helps you build consistency. When you see how many pages you&apos;ve read or how close you are to finishing a book, you&apos;re more likely to keep going.
            </p>
            <p>
              But tracking shouldn&apos;t be complicated. You don&apos;t need complex analytics or gamification. You just need to know where you are in each book.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">How to track reading progress</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Choose your method</h3>
              <p className="text-muted-foreground">
                Track by pages or by percentage. Some people prefer seeing &quot;page 150 of 300&quot; while others prefer &quot;50% complete&quot;. Choose what works for you.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Update regularly</h3>
              <p className="text-muted-foreground">
                Make it a habit to update your progress when you finish a reading session. This takes seconds but keeps your tracker accurate and motivates you to read more.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Keep it simple</h3>
              <p className="text-muted-foreground">
                Don&apos;t overthink it. The goal is to read more, not to perfect your tracking system. A simple reading log is better than a complex system you don&apos;t use.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">Minimalist reading log</h2>
          <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
            <p>
              Most reading trackers are full of features you don&apos;t need. Lesenn is different. We built a minimalist reading log that focuses on one thing: helping you track your reading progress.
            </p>
            <p>
              No social features. No recommendations. No clutter. Just your books, your progress, and your stats. This is exactly why I built Lesenn.
            </p>
          </div>
        </section>

        <section className="space-y-6 bg-muted/50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold">Ready to track your reading progress?</h2>
          <p className="text-muted-foreground">
            Start using Lesenn today and build better reading habits.
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
