This repository contains solved Project Euler problems.

Script location
- scripts/generate_problems.js

Requirements
- Node.js v12+ (recommended v14+)

What it does
- Fetches problem statements from Project Euler and writes each problem into a folder next to the repo root.
- Each folder is named with a padded problem number and slugified title (e.g. `07-10-001st-prime`).
- Writes a `README.md` containing the problem title, link, and the minimal/problem content.

Important notes
- The script uses the "minimal" endpoint (`https://projecteuler.net/minimal=<id>`) to extract the problem text.
- The script sets a browser-like User-Agent header to improve compatibility.
- Existing folders are preserved; an existing `README.md` will be overwritten.
- Be respectful of Project Euler's site: don't run large scrapes too frequently.

Usage (Windows)

PowerShell
```
# Fetch first 10 problems
node .\scripts\generate_problems.js --limit 10

# Fetch first 20 (short flag)
node .\scripts\generate_problems.js -n 20

# Fetch a single problem (example: problem 7)
node .\scripts\generate_problems.js --problem 7
# or
node .\scripts\generate_problems.js -p 7
```

Command Prompt
```
node scripts\generate_problems.js --limit 10
node scripts\generate_problems.js -n 20
node scripts\generate_problems.js --problem 7
node scripts\generate_problems.js -p 7
```

Options
- --limit N, -n N
  - Only fetch and create the first N problems (useful for testing).
  - If omitted, the script will attempt to fetch all problems found in the archives.
- --problem N, -p N
  - Fetch and create only the single problem N (title + minimal content).

Output
- The script creates folders adjacent to the repository root (one per problem) and writes `README.md` files inside them.

Troubleshooting
- Network errors: retry; temporary network issues or rate limits may cause fetch failures.
- Permission errors: run the terminal with appropriate permissions or change the working directory.
- If a page structure changes on projecteuler.net the script's HTML extraction may fail; check console logs for parsing errors.

Example
- Create folder for problem 7:
  node .\scripts\generate_problems.js -p 7
  -> Creates `07-<slug-of-title>` with `README.md` containing the problem statement.

License & Respect
- Use responsibly and in accordance with Project Euler's terms of use.
