{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-parts.url = "github:hercules-ci/flake-parts";
    treefmt-nix.url = "github:numtide/treefmt-nix";
    devenv.url = "github:cachix/devenv";
    fenix.url = "github:nix-community/fenix";
    fenix.inputs.nixpkgs.follows = "nixpkgs";
    devenv-root = {
      url = "file+file:///dev/null";
      flake = false;
    };
  };
  outputs = inputs @ {
    flake-parts,
    devenv-root,
    nixpkgs,
    ...
  }:
    flake-parts.lib.mkFlake {inherit inputs;} {
      imports = [
        inputs.devenv.flakeModule
        inputs.treefmt-nix.flakeModule
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

          containers = pkgs.lib.mkForce {};
          devenv.root = let
            devenvRootFileContent = builtins.readFile devenv-root.outPath;
          in
            pkgs.lib.mkIf (devenvRootFileContent != "") devenvRootFileContent;
        };
      };
    };
}
