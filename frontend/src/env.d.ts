/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** Set to "1" to allow local E2E testing on NixOS */
  readonly CHROMIUM_ONLY?: string;
  readonly PUBLIC_GA_MEASUREMENT_ID: string;
}
