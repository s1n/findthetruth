export default function (eleventyConfig) {
  // Copy static assets straight through to the output.
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  // Watch CSS so the dev server reloads on style changes.
  eleventyConfig.addWatchTarget("src/assets/css/");

  // Slugify a label for use in a URL (shared by templates and collections).
  const slugify = (str) =>
    String(str)
      .toLowerCase()
      .replace(/["'\u2019]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  eleventyConfig.addFilter("slug", slugify);

  // Every distinct topic across lore pages, each with the pages carrying it.
  // Shape: [{ name, slug, pages: [...] }], sorted by name.
  eleventyConfig.addCollection("topics", (api) => {
    const map = new Map();
    for (const item of api.getFilteredByTag("lore")) {
      for (const topic of item.data.topics || []) {
        if (!map.has(topic)) map.set(topic, []);
        map.get(topic).push(item);
      }
    }
    return [...map.entries()]
      .map(([name, pages]) => ({ name, slug: slugify(name), pages }))
      .sort((a, b) => a.name.localeCompare(b.name));
  });

  // Every distinct source (pack/book), each with its pages.
  eleventyConfig.addCollection("sources", (api) => {
    const map = new Map();
    for (const item of api.getFilteredByTag("lore")) {
      const src = item.data.source;
      if (!src) continue;
      if (!map.has(src)) map.set(src, []);
      map.get(src).push(item);
    }
    return [...map.entries()]
      .map(([name, pages]) => ({ name, slug: slugify(name), pages }))
      .sort((a, b) => a.name.localeCompare(b.name));
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"],
  };
}
