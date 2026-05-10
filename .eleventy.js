module.exports = function(eleventyConfig) {
  // Passthrough copy
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  // Date format filter
  eleventyConfig.addFilter("dateFormat", function(date) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
  });

  // Date to ISO filter
  eleventyConfig.addFilter("dateToISO", function(date) {
    return new Date(date).toISOString().split("T")[0];
  });

  // Blog posts collection
  eleventyConfig.addCollection("blog", function(collection) {
    return collection
      .getFilteredByGlob("src/blog/posts/*.md")
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  });

  return {
    dir: {
      input: "src",
      output: "_site"
    },
    templateFormats: ["njk", "md", "json"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
