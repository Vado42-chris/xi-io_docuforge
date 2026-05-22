#!/usr/bin/env node
import fs from 'node:fs';

function assertIncludes(filePath, expected, message) {
  const content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes(expected)) {
    console.error(`Accessibility check failed: ${message}`);
    console.error(`File: ${filePath}`);
    console.error(`Expected: ${expected}`);
    process.exit(1);
  }
}

function assertCountAtLeast(filePath, pattern, expectedCount, message) {
  const content = fs.readFileSync(filePath, 'utf8');
  const count = (content.match(pattern) ?? []).length;
  if (count < expectedCount) {
    console.error(`Accessibility check failed: ${message}`);
    console.error(`File: ${filePath}`);
    console.error(`Expected at least ${expectedCount}, found ${count}`);
    process.exit(1);
  }
}

assertIncludes('src/components/df/DfFormSearchBar.tsx', 'htmlFor="form-search"', 'library search input must have a linked visible label');
assertIncludes('src/components/df/DfFormSearchBar.tsx', 'id="form-search"', 'library search input must expose the expected id');
assertIncludes('src/components/xi/XiAppShell.tsx', 'aria-current={currentPath === item.href ? \'page\' : undefined}', 'active navigation item must expose aria-current page');
assertIncludes('src/styles/app.css', ':focus-visible', 'global focus-visible rule must exist');
assertIncludes('src/styles/tokens.css', '--xi-color-focus', 'focus color token must exist');
assertIncludes('src/styles/tokens.css', '--xi-focus-ring', 'focus ring token must exist');
assertIncludes('.storybook/main.ts', '@storybook/addon-a11y', 'Storybook a11y addon must remain configured');
assertIncludes('.storybook/preview.ts', 'a11y', 'Storybook preview must include a11y parameters');
assertIncludes('src/components/df/DfUploadDeclaration.tsx', 'Public submission blocked', 'upload flow must keep explicit blocked-state warning copy');
assertIncludes('src/components/df/DfUploadDeclaration.tsx', 'aria-label="Upload declaration workflow"', 'upload workflow must have a named section');
assertCountAtLeast('src/components/df/DfUploadDeclaration.tsx', /<fieldset/g, 5, 'upload declaration must use fieldsets for grouped inputs');
assertCountAtLeast('src/components/df/DfUploadDeclaration.tsx', /<legend>/g, 5, 'upload declaration fieldsets must have legends');
assertCountAtLeast('src/components/df/DfUploadDeclaration.tsx', /<label/g, 8, 'upload declaration must keep visible labels for controls');
assertIncludes('docs/framework/accessibility-standard-v1.md', 'Accessibility is a product requirement', 'accessibility standard must preserve product-level requirement language');
assertIncludes('docs/ux/keyboard-paths-library-and-upload-v1.md', '`/library` keyboard path', 'keyboard path doc must cover library route');
assertIncludes('docs/ux/keyboard-paths-library-and-upload-v1.md', '`/upload` keyboard path', 'keyboard path doc must cover upload route');

console.log('DocuForge static accessibility foundation check passed.');
