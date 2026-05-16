---
name: publish-package
description: Publish and release the is-not-null-or-undefined package.
---

# Package Publishing

1. For every user-facing package behavior change, run `pnpm run changeset` and choose the semver bump.
2. Do not add a changeset for docs-only, test-only, CI-only, or internal refactor changes unless published package behavior changes.
3. Run `pnpm install`, then `pnpm run verify`.
4. Commit the change and push `main`.
5. The `publish.yml` workflow opens or updates a `chore(release): version package` PR when changesets exist.
6. Merge the version package PR to publish through npm Trusted Publishing.
7. Create or confirm the publish environment:
   `gh api --method PUT repos/mkaradeniz/is-not-null-or-undefined/environments/npm-publish`
8. Ensure npm Trusted Publishing is configured for the package:
   - Repository: `mkaradeniz/is-not-null-or-undefined`
   - Workflow filename: `publish.yml`
   - Environment: `npm-publish`

Do not use npm tokens for established package releases; publish via GitHub Actions OIDC.

Releases use the package tag format `is-not-null-or-undefined@2.0.0`. Do not create repo-wide `v*` release tags.

The workflow runs on Node 22 and upgrades npm for Trusted Publishing. Keep `.nvmrc` on the newest Node 22 version used by the repo, while `engines.node` should stay at the minimum Node version required for npm OIDC unless package runtime requirements change.
