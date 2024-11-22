{ pkgs, lib, config, inputs, system, ... }: let
  zola = pkgs.callPackage ./zola.nix { inherit inputs; };
in {
  languages.rust = {
    enable = true;
    channel = "nightly";
  };

  packages = [
    zola
    pkgs.emmet-ls
    pkgs.vscode-langservers-extracted
  ];
  
  outputs.zola = zola;
}
