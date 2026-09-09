import { defineConfig } from "vitepress";
import mdImplicitFigures from "markdown-it-implicit-figures";
import mdSuperscript from "markdown-it-sup";
import MarkdownIt from "markdown-it";
import mdContainer from "markdown-it-container";
import { repoSlug, deployBase } from "./repo";

const courseParts = [
  "Mathematical reasoning",
  "Higher dimension",
  "Extrema",
  "Line integrals",
  "Multiple integrals",
  "Surface integrals",
];

const figuresSetup = {
  figcaption: "title",
};

const containerSetup = function (
  md: MarkdownIt,
  name: String,
  heading: String,
  format: "tip" | "info" | "warning" | "danger"
) {
  return [
    name,
    {
      render: function (tokens, idx, _options, env) {
        const token = tokens[idx];
        const info = token.info.trim().slice(name.length).trim();
        const attrs = md.renderer.renderAttrs(token);
        const headerString = `${heading} ${info ? `(${info})` : ""}`;
        if (token.nesting === 1) {
          const title = md.renderInline(headerString, {
            references: env.references,
          });
          return `<div class="${format} custom-block"${attrs}><p class="custom-block-title">${title}</p>\n`;
        } else return `</div>\n`;
      },
    },
  ];
};

export default defineConfig({
  lang: "en-GB",
  title: "Mathematical Analysis 2",
  description: "Course material for Mathematical Analysis 2 (2025-26)",
  base: deployBase,

  head: [
    ["link", { rel: "shortcut icon", href: "/favicon.png", type: "image/png" }],
  ],

  lastUpdated: true,
  cleanUrls: false,

  // Markdown that lives in the working tree but is not course content.
  srcExclude: [
    "venv/**",
    ".venv/**",
    "**/readme.md",
    "**/README.md",
    "**/license.md",
    "**/LICENSE.md",
  ],

  markdown: {
    math: true,
    config: (md) => {
      md.use(mdImplicitFigures, figuresSetup)
        .use(mdSuperscript)
        .use(mdContainer, ...containerSetup(md, "theorem", "Theorem", "tip"))
        .use(
          mdContainer,
          ...containerSetup(md, "definition", "Definition", "tip")
        );
    },
  },

  themeConfig: {
    nav: [
      { text: "Overview", link: "/" },
      // { text: "Lecture notes", link: "/pages/part1" },
    ],

    sidebar: [
      { text: "Overview", link: "/" },
      { text: "Evaluation", link: "/pages/evaluation" },
      { text: "Lecture diary", link: "/pages/diary" },
      {
        text: "Lecture notes",
        items: Array.from(Array(6), (_, n) => ({
          text: `${n}. ${courseParts[n]}`,
          link: `/pages/part${n + 1}`,
        })),
        collapsed: false,
      },
      {
        text: "Exercises",
        items: Array.from(Array(6), (_, n) => ({
          text: `${n}. ${courseParts[n]}`,
          link: `/pages/exercises${n + 1}`,
        })),
        collapsed: false,
      },
      // { text: "Mini-projects", link: "pages/project" },
    ],

    ...(repoSlug
      ? {
          editLink: {
            pattern: `https://github.com/${repoSlug}/edit/main/:path`,
            text: "Edit this page on GitHub",
          },
        }
      : {}),

    search: {
      provider: "local",
    },

    ...(repoSlug
      ? {
          socialLinks: [
            { icon: "github", link: `https://github.com/${repoSlug}/` },
          ],
        }
      : {}),

    lastUpdated: {
      text: "Updated at",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "short",
      },
    },

    footer: {
      message:
        'Released under the <a href="https://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 License</a>',
      copyright:
        'Copyright © 2026',
    },
  },
});
