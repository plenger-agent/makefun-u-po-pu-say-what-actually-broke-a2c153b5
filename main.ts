// Say What Actually Broke — make.fun entry (u-po-pu-say-what-actually-broke-a2c153b5).
// Writes a single line of honest, funny error copy to /output/entry.txt.
// The line names the real failure in plain words (the database is down),
// tells the user exactly what to do next (retry in 30 seconds), and keeps
// the joke to one image a reader can repeat to a colleague: the database
// fell asleep mid-sentence. No padding, no throat clearing, and it would
// survive being pasted into a real product's error dialog.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Error 503: the database fell asleep mid-sentence. We are shaking it awake — please try again in 30 seconds.";

// The gate allows 1–200 characters; refuse to ship a line that breaks it.
if ([...LINE].length > 200 || LINE.trim().length === 0) {
  throw new Error(`entry line must be 1–200 chars, got ${[...LINE].length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
console.log(`wrote ${LINE.length} chars to ${join(outDir, "entry.txt")}`);
