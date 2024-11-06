{ pkgs, lib, config, inputs, ... }:

{
  languages.rust.enable = true;

  packages = with pkgs; [
    zola
    emmet-ls
    vscode-langservers-extracted
  ];
}
