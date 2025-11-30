This repository contains solved Project Euler problems.

To generate folders and `README.md` files for each Project Euler problem (using the site's archives):

Requirements
- Node.js (v12+)

Usage
1. From repo root run:

```
node scripts\\generate_problems.js --limit 10
```

- `--limit N` will only fetch and create the first N problems (useful for testing).
- Omit `--limit` to fetch all problems in the archives (this can take time).

Notes
- The script uses the minimal problem HTML endpoint (`/minimal=<id>`) to extract the problem statement.
- Folders are created as `NN-title-slug` (padded `NN` depends on the problem number).
- Existing folders are preserved (script will overwrite `README.md` if present).
