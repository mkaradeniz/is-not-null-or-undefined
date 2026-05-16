import { execFile as execFileCallback } from 'node:child_process';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';

const execFile = promisify(execFileCallback);
const repoRoot = process.cwd();
const tempDirectory = await mkdtemp(path.join(tmpdir(), 'is-not-null-or-undefined-package-'));

const run = async (command, args, options = {}) => {
  try {
    const { stdout } = await execFile(command, args, {
      cwd: repoRoot,
      maxBuffer: 10 * 1024 * 1024,
      ...options,
    });

    return stdout;
  } catch (error) {
    if (error.stdout) {
      console.error(error.stdout);
    }

    if (error.stderr) {
      console.error(error.stderr);
    }

    throw error;
  }
};

try {
  const packOutput = await run('npm', ['pack', '--ignore-scripts', '--json', '--pack-destination', tempDirectory]);
  const [packedPackage] = JSON.parse(packOutput);
  const tarballPath = path.join(tempDirectory, packedPackage.filename);

  await writeFile(
    path.join(tempDirectory, 'package.json'),
    JSON.stringify({
      name: 'is-not-null-or-undefined-consumer-test',
      private: true,
      type: 'module',
    }),
  );

  await run('npm', ['install', '--ignore-scripts', tarballPath, 'typescript@^6.0.3', '@types/react@^19.2.14'], {
    cwd: tempDirectory,
  });

  await writeFile(
    path.join(tempDirectory, 'runtime.mjs'),
    `
import {
  isNotNullOrUndefined,
  isNotNullOrUndefinedAndNotBlank,
} from 'is-not-null-or-undefined';
import { hasRenderableNode } from 'is-not-null-or-undefined/react';

const rootModule = await import('is-not-null-or-undefined');

if ('default' in rootModule) {
  throw new Error('Unexpected default export.');
}

if (!isNotNullOrUndefined(0)) {
  throw new Error('Root import failed.');
}

if (isNotNullOrUndefinedAndNotBlank('   ')) {
  throw new Error('Blank string check failed.');
}

if (!hasRenderableNode(new Set([false, [null, 0]]))) {
  throw new Error('React subpath iterable check failed.');
}

if (hasRenderableNode(new Set([false, true, '', null, undefined]))) {
  throw new Error('React subpath non-renderable iterable check failed.');
}
`,
  );

  await writeFile(
    path.join(tempDirectory, 'types.ts'),
    `
import type { ReactNode } from 'react';

import {
  isNotNullOrUndefined,
  isNotNullOrUndefinedAndNotBlank,
} from 'is-not-null-or-undefined';
import { hasRenderableNode } from 'is-not-null-or-undefined/react';

const nullable = 'value' as string | null | undefined;

if (isNotNullOrUndefined(nullable)) {
  const narrowed: string = nullable;
  void narrowed;
}

const unknownValue = 'value' as unknown;

if (isNotNullOrUndefined(unknownValue)) {
  const narrowed: NonNullable<unknown> = unknownValue;
  void narrowed;
}

const blank = ' value ' as string | null | undefined;

if (isNotNullOrUndefinedAndNotBlank(blank)) {
  const narrowed: string = blank;
  void narrowed;
}

const node: ReactNode = [null, 'value'];
const hasNode: boolean = hasRenderableNode(node);
void hasNode;
`,
  );

  await run('node', ['runtime.mjs'], { cwd: tempDirectory });
  await run(
    path.join(tempDirectory, 'node_modules', '.bin', 'tsc'),
    ['--noEmit', '--strict', '--target', 'ES2022', '--module', 'NodeNext', '--moduleResolution', 'NodeNext', 'types.ts'],
    { cwd: tempDirectory },
  );
} finally {
  await rm(tempDirectory, { force: true, recursive: true });
}
