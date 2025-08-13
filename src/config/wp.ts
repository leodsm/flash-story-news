export const WP_BASE_URL = "https://example.com"; // Substitua pelo domínio do seu WordPress (ex: https://comarilia.com)

export const WP_API = {
  posts: (page = 1, perPage = 10) =>
    `${WP_BASE_URL}/wp-json/wp/v2/posts?per_page=${perPage}&page=${page}&_embed=1`,
  categories: `${WP_BASE_URL}/wp-json/wp/v2/categories?per_page=50`,
  // Web Stories (Google Web Stories plugin)
  webStoriesV2: (perPage = 10) =>
    `${WP_BASE_URL}/wp-json/wp/v2/web-story?per_page=${perPage}&_embed=1`,
  // Fallback endpoint (older plugin versions)
  webStoriesV1: (perPage = 10) =>
    `${WP_BASE_URL}/wp-json/web-stories/v1/web-story?per_page=${perPage}`,
};
