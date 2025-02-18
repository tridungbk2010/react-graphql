import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";

interface Item {
  id: number;
  title: string;
}

const ITEMS = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  title: "Title " + (i + 1),
}));

function genUID(): string {
  return Math.random().toString(36).substring(2, 8);
}

function genItems(length: number): string[] {
  return new Array(length).fill(0).map(genUID);
}

const WINDOW_HEIGHT = 400;
const ITEM_HEIGHT = 50;
const OVER_SCAN = 3;

const InfiniteScroll: React.FC = () => {
  const loaderRef = useRef<HTMLButtonElement | null>(null);
  const [items, setItems] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const [scrollTop, setScrollTop] = useState(0);

  const loadMoreCallback = useCallback(() => {
    const newItems = genItems(10);
    setItems((prev) => [...prev, ...newItems]);
  }, []);

  useEffect(() => {
    loadMoreCallback();
  }, []);

  const startIndex = Math.floor(scrollTop / ITEM_HEIGHT);
  const endIndex = Math.ceil((startIndex + WINDOW_HEIGHT) / ITEM_HEIGHT);

  console.log(startIndex, endIndex);

  const scrollCallback = useCallback((evt: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(evt.currentTarget.scrollTop);
  }, []);

  const visibleItems = useMemo(() => {
    return items.slice(startIndex, endIndex);
  }, [startIndex, endIndex]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          console.log("loading...");
          // loadMoreCallback();
        }
      },
      {
        threshold: 1,
      }
    );

    observer.observe(loaderRef.current!);
  }, []);

  return (
    <div className="wrapper">
      <section
        ref={containerRef}
        className="list-items"
        onScroll={scrollCallback}
        style={{
          height: WINDOW_HEIGHT,
          overflow: "auto",
        }}
      >
        {visibleItems.map((item, index) => (
          <div
            className="item"
            key={item}
            style={{
              height: ITEM_HEIGHT,
            }}
          >
            {"Title " + (index + 1)}
          </div>
        ))}
        <button ref={loaderRef} className="loadmore">
          Load more
        </button>
      </section>
    </div>
  );
};

export default InfiniteScroll;
