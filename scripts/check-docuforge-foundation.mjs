#!/usr/bin/env node
import fs from 'node:fs';

const requiredFiles = [
  'README.md',
  'AGENTS.md',
  'docs/execution-sequence.md',
  'docs/product/docuforge-product-brief.md',
  'docs/framework/form-template-field-identity-standard-v1.md',
  'docs/framework/document-security-and-permissions-standard-v1.md',
  'docs/schemas/form-library-record.schema.md',
  'docs/schemas/form-template.schema.md',
  'docs/workflows/upload-declaration-workflow-v1.md',
  'docs/workflows/admin-review-queue-states-v1.md'
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

console.log(`DocuForge foundation check passed (${requiredFiles.length} files).`);
