{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-parts.url = "github:hercules-ci/flake-parts";
    make-shell.url = "github:nicknovitski/make-shell";
    treefmt-nix.url = "github:numtide/treefmt-nix";
    fenix.url = "github:nix-community/fenix";
    fenix.inputs.nixpkgs.follows = "nixpkgs";
  };
  outputs = inputs @ {
    flake-parts,
    nixpkgs,
    ...
  }:
    flake-parts.lib.mkFlake {inherit inputs;} {
      imports = [
        inputs.treefmt-nix.flakeModule
        inputs.make-shell.flakeModules.default
      ];
      systems = nixpkgs.lib.systems.flakeExposed;

      perSystem = {
        config,
        self',
        inputs',
        pkgs,
        system,
        ...
      }: {
        packages.zola = pkgs.callPackage ./zola.nix {inherit inputs;};

        treefmt = {
          projectRootFile = "flake.nix";

          programs.actionlint.enable = true;
          programs.alejandra.enable = true;
        };

        make-shells.default = {
          packages = [
            config.packages.zola
            pkgs.emmet-ls
            pkgs.vscode-langservers-extracted
          ];
        };
      };
    };
}
