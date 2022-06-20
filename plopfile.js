const path = require("path");
const fg = require("fast-glob");

// Generates a list of projects (folder that has an index.html)
const getPrototypes = async function () {
  const entries = await fg(["*/index.html"]);

  const prototypes = entries.map(path.dirname);

  return { prototypes };
};

module.exports = function (plop) {
  plop.setGenerator("prototype", {
    description: "Generates new prototype",
    prompts: [
      {
        type: "input",
        name: "dir",
        message: "Directory name:",
        validate: function (input) {
          if (input.includes(" ")) {
            return `Should be dash or underscore separated.`;
          }
          return true;
        },
      },
    ],
    actions: [
      {
        type: "add",
        templateFile: ".plop-templates/prototype-index.html.hbs",
        path: "{{dir}}/index.html",
      },
      {
        type: "add",
        templateFile: ".plop-templates/prototype-style.css",
        path: "{{dir}}/style.css",
      },
      {
        type: "add",
        templateFile: ".plop-templates/prototype-main.js.hbs",
        path: "{{dir}}/main.js",
      },
    ],
  });

  plop.setGenerator("index", {
    description: "Generates index.html",
    prompts: [],
    actions: [
      {
        type: "add",
        force: true,
        templateFile: ".plop-templates/index.html.hbs",
        data: getPrototypes,
        path: "index.html",
      },
    ],
  });
};
