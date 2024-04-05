{ pkgs ? import <nixpkgs> { } }:
/**
 * If you are using NixOS, be sure `@playwright/test` in `./frontend/package.json`
 * is pinned to the same version of `playwright-driver` in nixpkgs for E2E tests.
 */
pkgs.mkShell {
  packages = with pkgs; [
    playwright-driver.browsers
  ];

  shellHook = ''
    export PLAYWRIGHT_BROWSERS_PATH=${pkgs.playwright-driver.browsers}
    export PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS=true
  '';
}
