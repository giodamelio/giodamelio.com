{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-parts.url = "github:hercules-ci/flake-parts";
    devenv.url = "github:cachix/devenv";
    fenix.url = "github:nix-community/fenix";
    fenix.inputs.nixpkgs.follows = "nixpkgs";
  };
  outputs = inputs@{ flake-parts, nixpkgs, ... }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      imports = [
        inputs.devenv.flakeModule
      ];
      systems = nixpkgs.lib.systems.flakeExposed;

      perSystem = { config, self', inputs', pkgs, system, ... }: {
        packages.zola = pkgs.callPackage ./zola.nix { inherit inputs; };

        devenv.shells.default = {
          languages.rust = {
            enable = true;
            channel = "nightly";
          };

          packages = [
            config.packages.zola
            pkgs.emmet-ls
            pkgs.vscode-langservers-extracted
          ];
        };
      };
    };
}

