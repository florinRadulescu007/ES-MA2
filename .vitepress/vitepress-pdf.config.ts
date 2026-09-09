import { defineUserConfig, type PageType } from 'vitepress-export-pdf'
import { deployBase as base } from './repo'

// Pages to include, in order, relative to the site base
const pages = [
  '',
  'pages/part2',
  'pages/part3',
  'pages/part4',
  'pages/part5',
  'pages/part6',
  'pages/exercises2',
  'pages/exercises3',
  'pages/exercises4',
  'pages/exercises5',
  'pages/exercises6',
]
const routes = pages.map((p) => `${base}${p === '' ? 'index' : p}.html`)

export default defineUserConfig({
  // GitHub's runners give Chrome no usable SUID sandbox, so it refuses to start
  puppeteerLaunchOptions: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },

  // Output file name
  outFile: 'MA2-2025.pdf',

  // Output directory (root of the built site)
  outDir: '.vitepress/dist',

  // Route patterns - specify which pages to include
  // Using glob patterns - exclude everything, then include what we want
  routePatterns: [
    '!/**',  // Exclude everything first
    ...routes,
  ],

  // PDF generation options
  pdfOptions: {
    // Page format
    format: 'A4',

    // Page margins
    margin: {
      top: '20mm',
      right: '15mm',
      bottom: '20mm',
      left: '15mm',
    },

    // Print background graphics
    printBackground: true,

    // Display header and footer
    displayHeaderFooter: false,
  },

  // Enable PDF outlines/bookmarks for navigation
  pdfOutlines: true,

  // Sort URLs - you can customize page order here
  sorter: (a: PageType, b: PageType) => {
    // Define custom order: index, parts 2-6, exercises 2-6
    const order = routes

    const indexA = order.indexOf(a.path)
    const indexB = order.indexOf(b.path)

    // If both found in order array, sort by position
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB
    }

    // If only one found, prioritize it
    if (indexA !== -1) return -1
    if (indexB !== -1) return 1

    // Otherwise use alphabetical
    return a.path.localeCompare(b.path)
  },
})
