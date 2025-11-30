const https = require('https');
const fs = require('fs');
const path = require('path');

function httpGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function slugify(s) {
  return s.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^[-]+|[-]+$/g, '');
}

function padNumber(n) {
  if (n < 100) return String(n).padStart(2, '0');
  return String(n).padStart(3, '0');
}

function htmlToMarkdownMinimal(html) {
  // Keep math delimiters ($...$), convert <p> to paragraphs, strip other tags simply
  let s = html.replace(/<p[^>]*>/g, '\n\n').replace(/<\/p>/g, '\n\n');
  // collapse multiple blank lines into a single blank line (two newlines)
  s = s.replace(/\n{3,}/g, '\n\n');
  // remove remaining tags
  s = s.replace(/<[^>]+>/g, '');
  // unescape common HTML entities
  s = s.replace(/&nbsp;/g, ' ')
       .replace(/&lt;/g, '<')
       .replace(/&gt;/g, '>')
       .replace(/&amp;/g, '&');
  // trim
  return s.trim();
}

async function collectArchive() {
  let page = 1;
  const problems = new Map();

  while (true) {
    const url = `https://projecteuler.net/archives;page=${page}`;
    console.log('Fetching', url);
    let body;
    try {
      body = await httpGet(url);
    } catch (err) {
      console.error('Failed to fetch', url, err.message || err);
      break;
    }

    // match anchors that reference problem pages, e.g. href="/problem=123" or href="problem=123"
    const re = /href="[^"]*problem=(\d+)[^"]*">\s*([^<]+?)\s*<\/a>/g;
    let m, found = 0;
    while ((m = re.exec(body)) !== null) {
      const id = Number(m[1]);
      const title = m[2].trim();
      if (!problems.has(id)) {
        problems.set(id, title);
      }
      found++;
    }

    if (found === 0) break;
    page++;
    // safety: avoid infinite loop
    if (page > 2000) break;
  }

  // return array sorted by id
  return Array.from(problems.entries()).sort((a,b) => a[0] - b[0]);
}

async function fetchProblemMinimal(id) {
  const url = `https://projecteuler.net/minimal=${id}`;
  try {
    const body = await httpGet(url);
    return body;
  } catch (err) {
    console.error('Error fetching problem', id, err.message || err);
    return null;
  }
}

async function fetchProblemTitle(id) {
  // Try fetching the full problem page and extracting the <h2> title
  const url = `https://projecteuler.net/problem=${id}`;
  try {
    const body = await httpGet(url);
    // Look for <h2>Title</h2>
    let m = body.match(/<h2[^>]*>\s*([^<]+?)\s*<\/h2>/i);
    if (m && m[1]) return m[1].trim();
    // fallback: <title>Title - Project Euler</title>
    m = body.match(/<title>\s*([^<]+?)\s*-\s*Project Euler\s*<\/title>/i);
    if (m && m[1]) return m[1].trim();
    return `Problem ${id}`;
  } catch (err) {
    console.error('Error fetching title for', id, err.message || err);
    return `Problem ${id}`;
  }
}

async function main() {
  const argv = process.argv.slice(2);
  let limit = 0; // 0 = all
  let singleProblem = 0;
  for (let i=0;i<argv.length;i++) {
    if (argv[i] === '--limit' && argv[i+1]) { limit = Number(argv[i+1]); }
    if (argv[i] === '-n' && argv[i+1]) { limit = Number(argv[i+1]); }
    if ((argv[i] === '--problem' || argv[i] === '-p') && argv[i+1]) { singleProblem = Number(argv[i+1]); }
  }

  if (singleProblem > 0) {
    const id = singleProblem;
    const title = await fetchProblemTitle(id);
    const minimal = await fetchProblemMinimal(id);
    if (!minimal) {
      console.error('No content for problem', id);
      return;
    }
    const content = htmlToMarkdownMinimal(minimal);
    const pad = padNumber(id);
    const slug = slugify(title);
    const folderName = `${pad}-${slug}`;
    const folderPath = path.join(__dirname, '..', folderName);
    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });
    const readme = `# Problem ${id}: ${title}\n\n- https://projecteuler.net/problem=${id}\n\n${content}\n`;
    fs.writeFileSync(path.join(folderPath, 'README.md'), readme, 'utf8');
    console.log('Wrote', folderPath);
    console.log('Done. Created 1 folder.');
    return;
  }

  const problems = await collectArchive();
  console.log('Found', problems.length, 'problems in archives');

  const toProcess = (limit > 0) ? problems.slice(0, limit) : problems;

  for (const [id, title] of toProcess) {
    try {
      const minimal = await fetchProblemMinimal(id);
      if (!minimal) continue;

      const content = htmlToMarkdownMinimal(minimal);
      const pad = padNumber(id);
      const slug = slugify(title);
      const folderName = `${pad}-${slug}`;
      const folderPath = path.join(__dirname, '..', folderName);

      if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });

      const readme = `# Problem ${id}: ${title}\n\n- https://projecteuler.net/problem=${id}\n\n${content}\n`;
      fs.writeFileSync(path.join(folderPath, 'README.md'), readme, 'utf8');
      console.log('Wrote', folderPath);
    } catch (err) {
      console.error('Error processing', id, err.message || err);
    }
  }

  console.log('Done. Created', (limit>0? Math.min(limit, problems.length):problems.length), 'folders (or skipped existing).');
}

main().catch(err => { console.error(err); process.exit(1); });
