const fs = require('fs');
const path = require('path');

const root = process.cwd();
const targets = [
  'pages/yves-rocher-reporting',
  'pages/yves-rocher',
  'components/yves-rocher-reporting',
  'components/yves-rocher',
  'lib/yves-rocher-reporting',
  'lib/yves-rocher',
  'data/yves-rocher-reporting',
  'data/yves-rocher',
];

for (const target of targets) {
  const fullPath = path.join(root, target);
  if (fs.existsSync(fullPath)) {
    fs.rmSync(fullPath, { recursive: true, force: true });
    console.log(`Removed ${target}`);
  }
}

const filesToPatch = ['components/Sidebar.js', 'components/Navigation.js', 'lib/navigation.js', 'pages/index.js'];
for (const rel of filesToPatch) {
  const fullPath = path.join(root, rel);
  if (!fs.existsSync(fullPath)) continue;
  let content = fs.readFileSync(fullPath, 'utf8');
  const original = content;
  content = content
    .replace(/.*yves-rocher-reporting.*\n?/gi, '')
    .replace(/.*Yves Rocher Reporting.*\n?/gi, '')
    .replace(/.*Yves Rocher.*\n?/gi, '');
  if (content !== original) {
    fs.writeFileSync(fullPath, content);
    console.log(`Patched ${rel}`);
  }
}

console.log('Customer Hub cleanup complete. Review navigation files before commit.');
