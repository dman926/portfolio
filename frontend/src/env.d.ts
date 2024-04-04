/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly CHROMIUM_ONLY?: string;
  readonly PUBLIC_GA_MEASUREMENT_ID: string;
}