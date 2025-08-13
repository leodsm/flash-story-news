import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { fetchWebStories, SimpleStory } from "@/utils/wordpress";

const StoryCard = ({ story, onOpen }: { story: SimpleStory; onOpen: () => void }) => (
  <button
    onClick={onOpen}
    className="relative overflow-hidden rounded-2xl h-56 w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
    aria-label={`Abrir Web Story: ${story.title}`}
  >
    <img src={story.image} alt={story.title} loading="lazy" className="h-full w-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
    {story.category && (
      <span className="absolute top-2 left-2 text-[10px] font-semibold uppercase tracking-wide px-2 py-1 rounded-md bg-brand-orange text-primary-foreground">
        {story.category}
      </span>
    )}
    <h3 className="absolute bottom-2 left-2 right-2 font-display text-primary-foreground font-semibold text-lg leading-snug drop-shadow">
      {story.title}
    </h3>
  </button>
);

const WebStoriesCarousel = () => {
  const [stories, setStories] = React.useState<SimpleStory[]>([]);
  const [open, setOpen] = React.useState(false);
  const [activeUrl, setActiveUrl] = React.useState<string | undefined>(undefined);
  const [activeCat, setActiveCat] = React.useState<string>("Todos");

  React.useEffect(() => {
    fetchWebStories(8).then(setStories);
  }, []);

  const categories = React.useMemo(() => {
    const set = new Set<string>();
    stories.forEach((s) => { if (s.category) set.add(s.category); });
    return ["Todos", ...Array.from(set)];
  }, [stories]);

  const filtered = React.useMemo(
    () => (activeCat === "Todos" ? stories : stories.filter((s) => s.category === activeCat)),
    [stories, activeCat]
  );

  return (
    <section aria-labelledby="stories-title" className="px-2 mt-6">
      <div className="flex items-center justify-between px-2 mb-2">
        <h2 id="stories-title" className="font-display text-xl font-bold">Web Stories</h2>
      </div>
      <Carousel className="w-full">
        <CarouselContent className="-ml-2">
          {filtered.map((s) => (
            <CarouselItem key={s.id} className="basis-4/5 sm:basis-1/2 lg:basis-1/3 pl-2">
              <StoryCard story={s} onOpen={() => { setActiveUrl(s.link); setOpen(true); }} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl aspect-[9/16] p-0 overflow-hidden">
          {activeUrl ? (
            <iframe
              src={activeUrl}
              title="Web Story"
              className="w-full h-full"
              allowFullScreen
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default WebStoriesCarousel;
