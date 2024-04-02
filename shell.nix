{ pkgs ? import <nixpkgs> { } }:
/**
 * If you are using NixOS, be sure `@playwright/test` in `./package.json`
 * is pinned to the same version of `playwright-driver` in nixpkgs.
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
