import { Heart, MessageCircle, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="w-full sticky top-0 z-30 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b" aria-label="Topo do site">
      <div className="container py-3 flex items-center justify-between">
        <a href="/" className="inline-flex items-center gap-2" aria-label="ComMarília - Página inicial">
          <div className="h-8 w-8 rounded-lg story-gradient" aria-hidden>
            <div className="h-full w-full rounded-lg bg-background" />
          </div>
          <span className="font-display text-2xl font-bold gradient-text">ComMarília</span>
        </a>
        <nav aria-label="Ações" className="flex items-center gap-2">
          <Button variant="secondary" size="icon" className="rounded-full" aria-label="Curtir">
            <Heart className="h-5 w-5 text-brand-red" />
          </Button>
          <Button variant="secondary" size="icon" className="rounded-full" aria-label="Comentar">
            <MessageCircle className="h-5 w-5 text-brand-blue" />
          </Button>
          <Button variant="secondary" size="icon" className="rounded-full" aria-label="Compartilhar">
            <Share2 className="h-5 w-5 text-brand-green" />
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
