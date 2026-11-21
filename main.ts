// The Day in One Page — Saturday, 21 November 2026.
//
// This entry is a newspaper front page for a single day: twenty-nine
// stories that all happened, or were first reported, on Saturday
// 21 November 2026, gathered from wire reporting and checked against
// the day they describe. The page itself lives beside this file as
// entry.png, a 1024x1024 broadsheet rendered from the HTML source in
// src/page.html.
//
// The program's job is deliberately small: deliver that image to the
// output directory the runner names. Before copying anything it opens
// the PNG header and checks the signature and the picture's size, so
// a truncated or oversized file fails loudly here instead of being
// handed on as if it were the entry.

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Every PNG file starts with these eight bytes.
const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

// The bounty caps the picture at 1024 pixels on either side.
const MAX_DIMENSION = 1024;

function fail(message: string): never {
  console.error(`entry: ${message}`);
  process.exit(1);
}

// Read the width and height out of the IHDR chunk, which sits right
// after the signature: four bytes of chunk length, the letters IHDR,
// then width and height as big-endian 32-bit integers.
function pngDimensions(bytes: Buffer): { width: number; height: number } {
  if (bytes.length < 24) {
    fail("file is too short to hold a PNG header");
  }
  for (let i = 0; i < PNG_SIGNATURE.length; i++) {
    if (bytes[i] !== PNG_SIGNATURE[i]) {
      fail("file does not start with the PNG signature");
    }
  }
  const chunkName = bytes.toString("ascii", 12, 16);
  if (chunkName !== "IHDR") {
    fail(`first chunk is "${chunkName}", expected "IHDR"`);
  }
  return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
}

function main(): void {
  const here = dirname(fileURLToPath(import.meta.url));
  const source = join(here, "entry.png");
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const target = join(outDir, "entry.png");

  let bytes: Buffer;
  try {
    bytes = readFileSync(source);
  } catch {
    fail(`cannot read the entry image at ${source}`);
  }

  const { width, height } = pngDimensions(bytes);
  if (width === 0 || height === 0) {
    fail(`image declares a zero dimension (${width}x${height})`);
  }
  if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
    fail(`image is ${width}x${height}, over the ${MAX_DIMENSION}px limit`);
  }

  mkdirSync(outDir, { recursive: true });
  copyFileSync(source, target);
  console.log(`entry.png: ${bytes.length} bytes, ${width}x${height} -> ${target}`);
}

main();
