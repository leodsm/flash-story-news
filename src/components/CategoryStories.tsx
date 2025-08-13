import { Megaphone, Building2, MapPin, Globe2, Trophy } from "lucide-react";

const categories = [
  { key: "ultimas", label: "Últimas Notícias", icon: Megaphone, colorClass: "text-brand-red" },
  { key: "cidade", label: "Cidade", icon: Building2, colorClass: "text-brand-blue" },
  { key: "regiao", label: "Região", icon: MapPin, colorClass: "text-brand-orange" },
  { key: "brasil", label: "Brasil", icon: Globe2, colorClass: "text-brand-green" },
  { key: "esporte", label: "Esporte", icon: Trophy, colorClass: "text-brand-green" },
];

const CategoryStories = () => {
  return (
    <aside aria-label="Categorias" className="w-full">
      <div className="px-4 pt-3 pb-2 overflow-x-auto no-scrollbar">
        <ul className="flex items-start gap-4 snap-x snap-mandatory">
          {categories.map(({ key, label, icon: Icon, colorClass }) => (
            <li key={key} className="snap-start flex flex-col items-center w-20 shrink-0">
              <button className="p-[2px] rounded-full story-gradient hover:scale-105 transition-transform" aria-label={label}>
                <div className="h-16 w-16 rounded-full bg-background grid place-items-center border">
                  <Icon className={`h-7 w-7 ${colorClass}`} />
                </div>
              </button>
              <span className="mt-1.5 text-xs text-muted-foreground text-center leading-tight line-clamp-2">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default CategoryStories;
