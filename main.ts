// The Day in One Page — entrypoint.
//
// The entry is a single finished image, entry.png, sitting beside this
// file: a broadsheet front page that packs the verified world news of
// Saturday 21 November 2026 into one 1024x1024 square. This program's
// whole job is to deliver those exact bytes to the output directory.
//
// It validates before it copies. The image is the entire entry, so a
// truncated, mislabelled or oversized file would silently sink it;
// checking the PNG signature and the IHDR dimensions up front turns
// that kind of damage into a loud, immediate failure instead.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// The eight bytes every PNG file begins with.
const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

// The bounty caps the image at 1024 pixels on a side.
const MAX_DIMENSION = 1024;

// A real 1024x1024 broadsheet runs to hundreds of kilobytes. Anything
// under a kilobyte is a stub or a truncated write, never the entry.
const MIN_PLAUSIBLE_BYTES = 1024;

function fail(message: string): never {
  console.error(`entry: ${message}`);
  process.exit(1);
}

function readDimensions(bytes: Buffer): { width: number; height: number } {
  // Signature first: 8 bytes, fixed values.
  if (bytes.length < PNG_SIGNATURE.length) {
    fail(`file is only ${bytes.length} bytes, too short to be a PNG`);
  }
  for (let i = 0; i < PNG_SIGNATURE.length; i++) {
    if (bytes[i] !== PNG_SIGNATURE[i]) {
      fail('file does not start with the PNG signature');
    }
  }

  // The first chunk after the signature must be the IHDR: a 4-byte
  // length, the literal type "IHDR", then width and height as
  // big-endian 32-bit integers.
  if (bytes.length < 24) {
    fail('file ends before the IHDR chunk is complete');
  }
  if (bytes.toString('ascii', 12, 16) !== 'IHDR') {
    fail('first chunk is not IHDR, so this is not a well-formed PNG');
  }
  return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
}

function main(): void {
  const here = dirname(fileURLToPath(import.meta.url));
  const source = join(here, 'entry.png');
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
  const target = join(outDir, 'entry.png');

  let bytes: Buffer;
  try {
    bytes = readFileSync(source);
  } catch {
    fail(`could not read ${source}`);
  }

  const { width, height } = readDimensions(bytes);
  if (bytes.length < MIN_PLAUSIBLE_BYTES) {
    fail(`file is only ${bytes.length} bytes, far too small to be the broadsheet`);
  }
  if (width === 0 || height === 0) {
    fail(`nonsense dimensions ${width}x${height}`);
  }
  if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
    fail(`image is ${width}x${height}, over the ${MAX_DIMENSION}px limit`);
  }

  mkdirSync(outDir, { recursive: true });
  writeFileSync(target, bytes);
  console.log(`entry.png: ${bytes.length} bytes, ${width}x${height} -> ${target}`);
}

main();
