export default function (eleventyConfig) {
  // Passthrough copy
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/llms.txt");

  // Date formatting filter
  eleventyConfig.addFilter("dateFormat", function (date) {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  });

  // ISO date filter
  eleventyConfig.addFilter("dateToISO", function (date) {
    return date.toISOString().split("T")[0];
  });

  // Blog collection
  eleventyConfig.addCollection("blog", function (collection) {
    return collection
      .getFilteredByGlob("src/blog/posts/*.md")
      .sort((a, b) => b.date - a.date);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
    },
    templateFormats: ["njk", "md"],
    markdownTemplateEngine: "njk",
  };
}
