const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const episodesDir = path.join(root, 'series/skillbook/episodes');
const episodes = [
  'ep-001-plan-mode.html',
  'ep-002-design.html',
  'ep-003-ai2ui.html',
];

const requiredRanges = [
  '[0, 2200]',
  '[2200, 5000]',
  '[5000, 10200]',
  '[10200, 15000]',
  '[15000, 24000]',
];

let failed = false;

function fail(file, message) {
  failed = true;
  console.error(`${file}: ${message}`);
}

for (const file of episodes) {
  const full = path.join(episodesDir, file);
  const html = fs.readFileSync(full, 'utf8');
  const script = html.match(/<script>([\s\S]*)<\/script>/);

  if (!script) {
    fail(file, 'missing inline script');
    continue;
  }

  try {
    new Function(script[1]);
  } catch (error) {
    fail(file, `script syntax error: ${error.message}`);
  }

  if (!html.includes('--T:24000')) fail(file, 'missing CSS --T:24000');
  if (!html.includes('const T = 24000')) fail(file, 'missing JS const T = 24000');

  for (const range of requiredRanges) {
    if (!html.includes(range)) fail(file, `missing range ${range}`);
  }

  const sceneCount = (html.match(/class="scene/g) || []).length;
  if (sceneCount !== 5) fail(file, `expected 5 scenes, found ${sceneCount}`);

  if (!html.includes('verdent-logo-ink.svg')) fail(file, 'missing Verdent SVG logo reference');
  if (!html.includes('class="fade"')) fail(file, 'missing fade layer');
  if (!html.includes('class="transition-sweep"')) fail(file, 'missing transition sweep');

  const blockingPseudoText = /content:"(DESIGN|BRIEF|SYSTEM|TOKENS|READY|IMAGE|SCAN|BUILD|RUN|SHIP|RUNNING|AI2UI COMPILE|DESIGN MODE OUTPUT)"/;
  if (blockingPseudoText.test(html)) fail(file, 'contains large blocking pseudo-text content');

  console.log(`${file}: ok`);
}

if (failed) process.exit(1);
