const path = require("node:path");
const sass = require("sass");

/**
 * @typedef {import('@11ty/eleventy/src/UserConfig')} EleventyConfig
 * @typedef {ReturnType<import('@11ty/eleventy/src/defaultConfig')>} EleventyReturnValue
 * @type {(eleventyConfig: EleventyConfig) => EleventyReturnValue}
 */
module.exports = function (eleventyConfig) {
  eleventyConfig.addTemplateFormats("scss");

  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",
    compile(inputContent, inputPath) {
      const parsed = path.parse(inputPath);
      if (parsed.name.startsWith("_")) {
        return;
      }

      const loadPaths = [parsed.dir || ".", this.config.dir.includes];
      console.log(loadPaths, this.config.dir, inputContent);
      const result = sass.compileString(inputContent, {
        loadPaths
      });
      console.log("OK")

      return (data) => {
        return result.css;
      };
    }
  });

  return {
    dir: {
      input: "src",
      output: "www",
    }
  };
};
