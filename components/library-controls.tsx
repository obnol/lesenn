"use client";

import { useState, useMemo, useEffect } from "react";
import { Input } from "./ui/input";
import { Book } from "@/lib/supabase/queries";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { Button } from "./ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { Filter } from "lucide-react";

type FilterStatus = "all" | "reading" | "finished" | "want-to-read";
type SortOption = "date-added-desc" | "date-added-asc" | "title-asc" | "title-desc" | "status";

type Props = {
  books: Book[];
  onFilteredBooksChange: (books: Book[]) => void;
};

export function LibraryControls({ books, onFilteredBooksChange }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [sortOption, setSortOption] = useState<SortOption>("date-added-desc");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const filteredAndSortedBooks = useMemo(() => {
    let filtered = [...books];

    // Apply status filter
    if (filterStatus === "reading") {
      filtered = filtered.filter((book) => book.is_reading && !book.is_finished);
    } else if (filterStatus === "finished") {
      filtered = filtered.filter((book) => book.is_finished);
    } else if (filterStatus === "want-to-read") {
      filtered = filtered.filter((book) => !book.is_reading && !book.is_finished);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(query) ||
          book.authors.some((author) => author.toLowerCase().includes(query))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortOption) {
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        case "date-added-asc":
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case "date-added-desc":
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case "status":
          // Reading first, then finished, then want to read
          if (a.is_reading && !a.is_finished) return -1;
          if (b.is_reading && !b.is_finished) return 1;
          if (a.is_finished) return -1;
          if (b.is_finished) return 1;
          return 0;
        default:
          return 0;
      }
    });

    return filtered;
  }, [books, filterStatus, searchQuery, sortOption]);

  // Notify parent component of filtered books
  useEffect(() => {
    onFilteredBooksChange(filteredAndSortedBooks);
  }, [filteredAndSortedBooks, onFilteredBooksChange]);

  const filterAndSortContent = (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">filter</p>
        <ToggleGroup
          type="single"
          value={filterStatus}
          onValueChange={(value) => setFilterStatus((value || "all") as FilterStatus)}
          className="justify-start flex-wrap"
        >
          <ToggleGroupItem value="all" aria-label="All books" className="text-xs px-3 py-1.5">
            all
          </ToggleGroupItem>
          <ToggleGroupItem value="reading" aria-label="Reading" className="text-xs px-3 py-1.5">
            reading
          </ToggleGroupItem>
          <ToggleGroupItem value="finished" aria-label="Finished" className="text-xs px-3 py-1.5">
            finished
          </ToggleGroupItem>
          <ToggleGroupItem value="want-to-read" aria-label="Want to read" className="text-xs px-3 py-1.5">
            want to read
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">sort</p>
        <ToggleGroup
          type="single"
          value={sortOption}
          onValueChange={(value) => setSortOption((value || "date-added-desc") as SortOption)}
          className="justify-start flex-wrap"
        >
          <ToggleGroupItem value="date-added-desc" aria-label="Newest first" className="text-xs px-3 py-1.5">
            newest
          </ToggleGroupItem>
          <ToggleGroupItem value="date-added-asc" aria-label="Oldest first" className="text-xs px-3 py-1.5">
            oldest
          </ToggleGroupItem>
          <ToggleGroupItem value="title-asc" aria-label="Title A-Z" className="text-xs px-3 py-1.5">
            a-z
          </ToggleGroupItem>
          <ToggleGroupItem value="title-desc" aria-label="Title Z-A" className="text-xs px-3 py-1.5">
            z-a
          </ToggleGroupItem>
          <ToggleGroupItem value="status" aria-label="By status" className="text-xs px-3 py-1.5">
            status
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-2">
      {/* Search */}
      <div className="flex gap-2">
        <Input
          placeholder="search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-9 flex-1"
        />
        {!isDesktop && (
          <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
            <DrawerTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 px-3">
                <Filter className="h-4 w-4" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>filter & sort</DrawerTitle>
              </DrawerHeader>
              <div className="p-4 pb-6" style={{ paddingBottom: `calc(1.5rem + env(safe-area-inset-bottom))` }}>
                {filterAndSortContent}
              </div>
            </DrawerContent>
          </Drawer>
        )}
      </div>

      {/* Filter and Sort - Only visible on desktop */}
      {isDesktop && filterAndSortContent}
    </div>
  );
}
