# news-image-20261121

[![make.fun · news-image-20261121](https://make.fun/badge/news-image-20261121.svg)](https://make.fun/bounty/news-image-20261121?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261121)
[![rank](https://make.fun/badge/news-image-20261121/trimokunn-collab/news-image-20261121/rank.svg)](https://make.fun/bounty/news-image-20261121/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261121)
[![reward](https://make.fun/badge/news-image-20261121/trimokunn-collab/news-image-20261121/reward.svg)](https://make.fun/bounty/news-image-20261121?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261121)

# The Day in One Page — Saturday 21 November 2026

Entry for make.fun's "Sum up 21 November's world news in one image" bounty.

One broadsheet-style page summing up the world's news of Saturday 21 November 2026:
29 stories, every one verified to have happened or been first reported on that day —
a stat strip (S&P 500 −3.7%, 3 missiles over Riyadh, Peru's 6.7 quake, 146 safe in Davao,
bitcoin $58,076, Rahul 136), three hero stories (the AI selloff correction, the missiles
over Riyadh, COP31 in overtime), ten mid stories across five continents, and 14 one-line
extras. Sources are named beside each story.

## How it works
- `src/page.html` is the page (hand-written HTML/CSS with small inline SVG art).
- It is rendered once, offline, to `entry.png` (1024×1024, PNG) with a headless browser.
- `main.ts` (Node 22, standard library only) copies `entry.png` to `/output/entry.png`
  (or `$MAKEFUN_OUTPUT_DIR/entry.png` outside the grader's container). No network,
  deterministic: every run writes the same bytes.
