# A Sailor's Guide to the Galaxy — Roadmap

Cross-device source of truth for what's built, what's next, and what's parked.

## Done

- **Infrastructure rename** (September 2026) — GitHub repo renamed
  `TSqu4red/clsa-learn-to-sail` → `TSqu4red/sailors-reference` (GitHub redirects
  the old repo URL; Vercel tracks the repo by ID so deploys are unaffected).
  Vercel project renamed to `sailors-reference` to match. The old
  clsa-learn-to-sail.vercel.app domain MUST stay attached to the project — old
  share links and the scorekeeper's browser-stored race days live under it.
  Personal-site project card updated (name, description, new URL).
- **New URL** (August 2026) — https://sailors-reference.vercel.app added as a
  second production domain on the same Vercel project. The old
  clsa-learn-to-sail.vercel.app stays live so existing share links, bookmarks,
  and the scorekeeper's browser-stored race days keep working (scoring data is
  per-URL — whoever keeps score should stick to one URL, or migrate once via
  share links). Hand out the new URL going forward.
- **Rebrand to "A Sailor's Guide to the Galaxy"** (August 2026) — EC feedback: the
  club is a volunteer organization with no licensed instructors and must not
  present itself as offering instruction; the site is also un-branded from CLSA so
  it can serve any club. Site name changed everywhere (Learn to Sail page renamed
  "Sailing Basics"); Cowan-specific content kept (the club is the venue).
  Instruction pointer added atop Sailing Basics (ASA / US Sailing links); as-is
  disclaimer footer on every page. File names and URLs unchanged. SW `VERSION`
  bumped to `clsa-v3`.

- **Series Scorer** (July 2026) — Low Point System per RRS Appendix A on the Race Day
  page: throwouts, scoring codes (DNF, DNS, DSQ, DNE…), A8 tie-breaks. State lives in
  `localStorage` under `clsa-race-scoring`.
- **Mobile fixes** — app bar + nav drawer on small screens, Points of Sail slider
  under the boat, drawer display/toggle repairs.
- **Race day records + CSV** (August 2026) — series/fleet/date metadata on the scorer;
  "Save this race day" archives full results (grid + standings) to `localStorage`
  under `clsa-race-archive`, with load / per-day CSV / delete; "Download results (CSV)"
  exports current standings with raw race entries including codes.
- **Multi-fleet scoring** (August 2026) — per-boat Fleet column in the scorer grid;
  each fleet is placed and scored as its own regatta (entrants+1 codes, throwouts,
  A8 tie-breaks all within the fleet). Standings group by fleet; CSV gains a Fleet
  column; archive winner shows first place per fleet.
- **Share-a-link results** (August 2026) — "Share results (link)" packs the whole race
  day (gzip → base64url) into the page URL hash; recipients see a read-only results
  card on their phones and can save a copy to their own archive. No backend; uses the
  phone share sheet where available, clipboard otherwise.
- **Season standings + easier grid editing** (August 2026) — "Season standings" under
  the archive merges all saved race days of a series into one score (boats matched by
  name across days, DNC for a boat absent a whole day, throwouts from the scorer's
  setting), with season CSV and share link. Also − Boat / − Race buttons beside the
  + buttons.
- **Scoring on its own page** (August 2026) — everything scorer-related moved from
  the Race Day page to `scoring.html` (same localStorage keys, so browser data
  carried over untouched). Race Day keeps a pointer card, and old
  `racecourse.html#day=…` share links redirect to `scoring.html` preserving the
  hash. SW `VERSION` bumped to `clsa-v2` with `scoring.html` precached.
- **Offline service worker** (August 2026) — `sw.js` precaches all four pages,
  network-first with cache fallback for same-origin GETs; weather API passes through.
  **Bump `VERSION` in `sw.js` on any deploy that should invalidate cached pages.**

## Next up

- **Align scorer with the club's paper form** (Race-Form-3): relabel Boat →
  "Boat / Sail #" (club records sail numbers); pre-seed the fleet autocomplete with
  the club's seven fleets (Thistle, Highlander, MC Scow, Lightning, Snipe,
  Flying Scot, Laser/Handicap); add optional Recorder and Conditions/notes fields
  (course sailed, wind) saved into the archive record and CSV.
- **Per-fleet rigging pages** — blocked on photos/steps from fleet captains.
- **Header-less embed variants** for the ClubExpress integration — pending board
  approval.

## How the club actually scores (from the scorekeeper's 2026 Scoring.xlsx, read Aug 2026)

One sheet per fleet (Thistle, Highlander, MC Scow, Snipe, Flying Scot, Lightning,
plus one-off event sheets like the Hornich Club Championship). Skippers listed by
NAME + sail number. The year is divided into series: Spring, Memorial Day, Summer,
4th of July, August, Labor Day, Fall — plus a season-wide summary (2026: 60 races
total, 24 to qualify).

Two series types:
- **Holiday regattas** (Memorial Day, 4th July, Labor Day): ~5 races over 2 days,
  all races scored, no discards, TOTAL low points, Pos for everyone.
- **Season series** (Spring/Summer/August/Fall, 2-3 races per Sunday): columns
  Races Sailed / Discards / Races Scored / Total Points / **Ave Points** / Pos.
  Ranked by AVERAGE points per scored race; a **To Qualify** minimum (e.g. 5 of
  Spring's 10) — under it you're listed but unranked. **Missed races are simply
  blank — no DNC penalty.** Attendance is handled by averaging + the qualify
  minimum, NOT penalty points. (This answers the old season-throwout question:
  the club does not use worst-N throwouts for the season; it averages.)

Cell markings: lowercase "d" (e.g. "2d") = that race discarded, excluded from the
total; uppercase "D" (e.g. "9D") = counts in Races Sailed but not in Races Scored
(duty or DNF — meaning unconfirmed); "C" column header = cancelled race; yellow
highlight = unknown (assigned score?); #N/A = sail-number lookup miss against a
roster.

## Open questions (need answers from the club / PRC)

- **Meaning of the cell codes**: is uppercase "D" race-committee duty credit or
  DNF? What do the yellow-highlighted scores mean? Are discards ("d") picked by a
  rule (how many per races sailed?) or marked by the scorekeeper's judgment?
- **Handicap (corrected-time) scoring** — the paper form's Laser/Handicap column
  records Class + finish Time (Portsmouth-style corrected time), but the 2026
  workbook has NO handicap sheet — is that fleet actually being scored? If the app
  should score it: standard US Sailing Portsmouth numbers, or club ratings?
- **Rebuild the app's season scoring to the club model?** The app currently does
  RRS-style DNC-penalty totals with worst-N throwouts; the club uses average
  points + qualify minimum with d/D/C markings. Confirm the app should switch to
  (or offer) the club's average-points model before rebuilding.

## Parked

- **Shared/synced standings (permanent results page)** — the club asked (Aug 2026);
  share-a-link covers the immediate need. A live results page on the site still needs
  a small backend (Vercel KV/Blob + publish PIN); revisit if the club wants a lasting
  archive every visitor can browse.

## Workflow notes

- The chat sandbox cannot push; the repo is the only source of truth — commit
  everything that matters.
- Vercel auto-deploys from `main`.
