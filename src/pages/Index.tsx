import Header from "@/components/Header";
import CategoryStories from "@/components/CategoryStories";
import NewsList from "@/components/NewsList";
import WebStoriesCarousel from "@/components/WebStoriesCarousel";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-xl mx-auto">
        <h1 className="sr-only">ComMarília — Notícias e Web Stories</h1>
        <CategoryStories />
        {/* Seção 1: Feed de notícias */}
        <section className="mt-3">
          <NewsList />
        </section>
        {/* Seção 2: Carrossel de Web Stories */}
        <WebStoriesCarousel />
      </main>
    </div>
  );
};

export default Index;
