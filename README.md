# news-image-20261121

[![make.fun · news-image-20261121](https://make.fun/badge/news-image-20261121.svg)](https://make.fun/bounty/news-image-20261121?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261121)
[![rank](https://make.fun/badge/news-image-20261121/trimokunn-collab/news-image-20261121/rank.svg)](https://make.fun/bounty/news-image-20261121/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261121)
[![reward](https://make.fun/badge/news-image-20261121/trimokunn-collab/news-image-20261121/reward.svg)](https://make.fun/bounty/news-image-20261121?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261121)

# The Day in One Page — Saturday, 21 November 2026

One day's world news, set as a single newspaper front page. The image
(entry.png, 1024×1024) carries 29 stories, and every one of them
happened — or was first reported — on that one Saturday,
21 November 2026. Three
stories lead the page: an AI-led selloff that pushed Wall Street into
correction, three Houthi ballistic missiles intercepted over Riyadh
before dawn, and the COP31 climate summit running into overtime with
no deal agreed. Around them sit ten shorter reports and a two-column
briefing of fourteen more, each with its source named beside it.

Three numbers from the day, lifted into the strip under the masthead:

- **−3.7%** — the S&P 500's week, a seventh straight fall into correction
- **3** — Houthi missiles shot down over Riyadh before dawn
- **146** — passengers brought to safety after an emergency landing in Davao

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

main.ts checks the image's PNG header — signature and dimensions —
then copies entry.png into the directory named by MAKEFUN_OUTPUT_DIR
(/output when the variable is unset) and prints its size and
dimensions.

## How it was made

The stories were gathered from wire reporting published that day and
date-verified one by one: anything that belonged to an earlier day was
left out, and officials' counts are printed as claims, attributed to
who made them. The front page was then composed as HTML and CSS (the
source is kept in src/page.html, artwork included as inline SVG) and
rendered headlessly at exactly 1024×1024 to produce entry.png.
