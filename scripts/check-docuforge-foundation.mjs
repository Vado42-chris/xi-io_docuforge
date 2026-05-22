#!/usr/bin/env node
import fs from 'node:fs';

const requiredFiles = [
  'README.md',
  'AGENTS.md',
  'package.json',
  'index.html',
  'tsconfig.json',
  'tsconfig.app.json',
  'vite.config.ts',
  'docs/execution-sequence.md',
  'docs/product/docuforge-product-brief.md',
  'docs/framework/form-template-field-identity-standard-v1.md',
  'docs/framework/document-security-and-permissions-standard-v1.md',
  'docs/schemas/form-library-record.schema.md',
  'docs/schemas/form-template.schema.md',
  'docs/workflows/upload-declaration-workflow-v1.md',
  'docs/workflows/admin-review-queue-states-v1.md',
  'src/main.tsx',
  'src/App.tsx',
  'src/domain/forms.ts',
  'src/data/seedForms.ts',
  'src/components/xi/XiAppShell.tsx',
  'src/components/xi/XiBadge.tsx',
  'src/components/xi/XiButton.tsx',
  'src/components/xi/XiEmptyState.tsx',
  'src/components/xi/XiNotice.tsx',
  'src/components/xi/XiPageHeader.tsx',
  'src/components/df/DfFormSearchBar.tsx',
  'src/components/df/DfLibraryResults.tsx',
  'src/pages/DfLibraryPage.tsx',
  'src/pages/PlaceholderPage.tsx',
  'src/styles/tokens.css',
  'src/styles/app.css'
];

const missing = requiredFiles.filter((filePath) => !fs.existsSync(filePath));

if (missing.length > 0) {
  console.error('DocuForge foundation check failed. Missing files:');
  for (const filePath of missing) {
    console.error(`- ${filePath}`);
  }
  process.exit(1);
}

const forbiddenPatterns = [/ghp_/i, /github_pat_/i, /gho_/i, /ghu_/i, /ghs_/i];
for (const filePath of requiredFiles) {
  const content = fs.readFileSync(filePath, 'utf8');
  for (const pattern of forbiddenPatterns) {
    if (pattern.test(content)) {
      console.error(`DocuForge foundation check failed. Token-like secret pattern found in ${filePath}.`);
      process.exit(1);
    }
  }
}

const appSource = fs.readFileSync('src/App.tsx', 'utf8');
const requiredRoutes = [`'/library'`, `'/upload'`, `'/review'`, `'/admin'`];
const missingRoutes = requiredRoutes.filter((route) => !appSource.includes(route));

if (missingRoutes.length > 0) {
  console.error('DocuForge foundation check failed. Missing route scaffold entries:');
  for (const route of missingRoutes) {
    console.error(`- ${route}`);
  }
  process.exit(1);
}

const tokenSource = fs.readFileSync('src/styles/tokens.css', 'utf8');
const requiredTokens = [
  '--xi-space-4',
  '--xi-font-sans',
  '--xi-color-surface',
  '--xi-color-border',
  '--xi-color-focus',
  '--xi-color-warning',
  '--xi-color-danger'
];
const missingTokens = requiredTokens.filter((token) => !tokenSource.includes(token));

if (missingTokens.length > 0) {
  console.error('DocuForge foundation check failed. Missing xi-io token bridge entries:');
  for (const token of missingTokens) {
    console.error(`- ${token}`);
  }
  process.exit(1);
}

console.log(`DocuForge foundation check passed (${requiredFiles.length} files).`);
