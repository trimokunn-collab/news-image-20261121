# news-image-20261121

[![make.fun · news-image-20261121](https://make.fun/badge/news-image-20261121.svg)](https://make.fun/bounty/news-image-20261121?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261121)
[![rank](https://make.fun/badge/news-image-20261121/trimokunn-collab/news-image-20261121/rank.svg)](https://make.fun/bounty/news-image-20261121/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261121)
[![reward](https://make.fun/badge/news-image-20261121/trimokunn-collab/news-image-20261121/reward.svg)](https://make.fun/bounty/news-image-20261121?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261121)

# The Day in One Page — Saturday, 21 November 2026

One square image, one whole day of the world. The picture is a broadsheet newspaper front page carrying 29 verified stories, every one of which happened — or was first reported — on Saturday 21 November 2026, and not a day earlier or later.

Three stories lead the page. Wall Street slid into correction as an AI-led selloff knocked 3.7% off the S&P 500 across its seventh straight losing session. Before dawn, Saudi-led air defences intercepted three Houthi ballistic missiles over Riyadh, with no casualties. And in Antalya, nearly 200 countries at COP31 ran past their deadline still deadlocked, after the draft deal dropped all mention of fossil fuels. Around them sit a stat strip (a 6.7 quake in Peru, 146 people safe after an emergency landing in Davao, bitcoin at $58,076, KL Rahul's 136 in Wellington), ten more stories from around the world, and a dense "Also Today" column for everything else the day produced.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` checks the bundled `entry.png` before shipping it — a genuine PNG signature, sane dimensions, no side over 1024 pixels, and a file size a real broadsheet could actually have — then copies it to the output directory (`MAKEFUN_OUTPUT_DIR`, or `/output` when that is unset).

## How it was made

The stories were gathered from wire reporting across the day and date-checked one by one: each item had to belong to 21 November 2026 itself, not to the day before or to a running story's older chapters. The page was then composed as a single self-contained HTML/CSS broadsheet (`src/page.html`, no external assets) and rendered headlessly at exactly 1024×1024 to produce `entry.png`. At run time the program validates the PNG before copying it, so a damaged or oversized image fails loudly instead of being shipped.
