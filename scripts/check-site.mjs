import { readdir, readFile, stat } from "node:fs/promises";
import { dirname, extname, join, normalize, relative, resolve } from "node:path";

const root = process.cwd();
const errors = [];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name === ".git" || entry.name === "node_modules") continue;

    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

function getAttributes(html, name) {
  const pattern = new RegExp(`\\b${name}=["']([^"']+)["']`, "gi");
  return [...html.matchAll(pattern)].map((match) => match[1]);
}

async function localTargetExists(htmlFile, reference) {
  const clean = reference.split("#")[0].split("?")[0];
  if (!clean) return true;

  const candidate = resolve(dirname(htmlFile), clean);
  const relativePath = relative(root, candidate);
  if (relativePath.startsWith("..")) {
    errors.push(`${relative(root, htmlFile)} points outside the site: ${reference}`);
    return false;
  }

  try {
    const target = await stat(candidate);
    if (target.isDirectory()) {
      await stat(join(candidate, "index.html"));
    }
    return true;
  } catch {
    errors.push(`${relative(root, htmlFile)} has a missing local reference: ${reference}`);
    return false;
  }
}

const files = await walk(root);
const htmlFiles = files.filter((file) => extname(file).toLowerCase() === ".html");

for (const htmlFile of htmlFiles) {
  const html = await readFile(htmlFile, "utf8");
  const ids = getAttributes(html, "id");
  const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];

  if (duplicateIds.length) {
    errors.push(`${relative(root, htmlFile)} has duplicate IDs: ${duplicateIds.join(", ")}`);
  }

  const references = [...getAttributes(html, "href"), ...getAttributes(html, "src")];
  for (const reference of references) {
    if (
      reference.startsWith("#") ||
      reference.startsWith("mailto:") ||
      reference.startsWith("tel:") ||
      reference.startsWith("http://") ||
      reference.startsWith("https://") ||
      reference.startsWith("data:")
    ) {
      continue;
    }

    if (reference.startsWith("/")) {
      errors.push(`${relative(root, htmlFile)} uses a root-absolute reference: ${reference}`);
      continue;
    }

    await localTargetExists(htmlFile, normalize(reference));
  }
}

if (!htmlFiles.some((file) => relative(root, file) === "index.html")) {
  errors.push("The site root is missing index.html");
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Checked ${htmlFiles.length} HTML pages and all local references passed.`);
}
