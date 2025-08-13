import { WP_API, WP_BASE_URL } from "@/config/wp";

export type WPPost = {
  id: number;
  date: string;
  link: string;
  title: { rendered: string };
  excerpt?: { rendered: string };
  _embedded?: any;
};

export type WPStory = {
  id: number;
  title: { rendered: string };
  link: string;
  featured_media?: number;
  _embedded?: any;
};

export type SimplePost = {
  id: number | string;
  title: string;
  subtitle?: string;
  category?: string;
  image: string;
  link: string;
};

export type SimpleStory = {
  id: number | string;
  title: string;
  category?: string;
  image: string;
  link: string;
};

export const stripHtml = (html?: string) =>
  html ? html.replace(/<[^>]*>?/gm, "").trim() : "";

const getFeaturedImage = (item: any): string | undefined => {
  const media = item?._embedded?.["wp:featuredmedia"]?.[0];
  return media?.source_url || media?.media_details?.sizes?.medium_large?.source_url;
};

const getFirstCategory = (item: any): string | undefined => {
  const term = item?._embedded?.["wp:term"]?.[0]?.[0];
  return term?.name;
};

// Generic fetch with graceful fallback to sample data
async function safeJson(url: string) {
  if (!WP_BASE_URL || WP_BASE_URL.includes("example.com")) throw new Error("WP URL not configured");
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function fetchLatestPosts(page = 1, perPage = 10): Promise<SimplePost[]> {
  try {
    const data: WPPost[] = await safeJson(WP_API.posts(page, perPage));
    return data.map((p) => ({
      id: p.id,
      title: stripHtml(p.title?.rendered),
      subtitle: stripHtml(p.excerpt?.rendered),
      category: getFirstCategory(p),
      image: getFeaturedImage(p) || placeholderImg(),
      link: p.link,
    }));
  } catch {
    // fallback mock data to keep UI pretty in preview
    return samplePosts(page, perPage);
  }
}

export async function fetchWebStories(perPage = 8): Promise<SimpleStory[]> {
  try {
    // try v2
    const v2: WPStory[] = await safeJson(WP_API.webStoriesV2(perPage));
    return v2.map((s) => ({
      id: s.id,
      title: stripHtml(s.title?.rendered),
      category: getFirstCategory(s),
      image: getFeaturedImage(s) || placeholderImg(),
      link: s.link,
    }));
  } catch {
    try {
      const v1: WPStory[] = await safeJson(WP_API.webStoriesV1(perPage));
      return v1.map((s) => ({
        id: s.id,
        title: stripHtml((s as any).title?.rendered ?? (s as any).title ?? "Story"),
        image: getFeaturedImage(s) || placeholderImg(),
        link: (s as any).link ?? `${WP_BASE_URL}`,
      }));
    } catch {
      return sampleStories();
    }
  }
}

function placeholderImg(index?: number) {
  const id = index ?? Math.floor(Math.random() * 10) + 1;
  return `https://images.unsplash.com/photo-150${id}00?auto=format&fit=crop&w=1200&q=60`;
}

function samplePosts(page: number, perPage: number): SimplePost[] {
  const base = [
    {
      title: "Incêndio atinge prédio comercial no centro",
      subtitle: "Fogo começou no início da noite; bombeiros estão no local",
      category: "Últimas Notícias",
    },
    {
      title: "Prefeitura anuncia obras em vias importantes",
      subtitle: "Melhorias previstas para começar no próximo mês",
      category: "Cidade",
    },
    {
      title: "Safra de milho deve crescer neste ano",
      subtitle: "Produção do grão deve ter alta de 20%",
      category: "Região",
    },
    {
      title: "Time vence fora de casa e se afasta do Z-4",
      subtitle: "Equipe sobe para o 12º lugar na tabela",
      category: "Esporte",
    },
  ];
  return Array.from({ length: perPage }, (_, i) => {
    const b = base[(i + (page - 1) * perPage) % base.length];
    return {
      id: `${page}-${i}`,
      title: b.title,
      subtitle: b.subtitle,
      category: b.category,
      image: placeholderImg(i),
      link: "#",
    };
  });
}

function sampleStories(): SimpleStory[] {
  const cats = ["Últimas", "Cidade", "Região", "Brasil", "Esporte"];
  return Array.from({ length: 8 }, (_, i) => ({
    id: `s-${i}`,
    title: [
      "Prédio desaba em construção e deixa feridos",
      "Proposta de plano diretor entra em votação",
      "Alunos da rede municipal voltam às aulas",
      "Chuva causa estragos na região",
    ][i % 4],
    category: cats[i % cats.length],
    image: placeholderImg(i + 1),
    link: "#",
  }));
}
