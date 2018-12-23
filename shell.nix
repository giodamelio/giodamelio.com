{ pkgs ? import <nixpkgs> {} }:
pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs-10_x
  ];
  shellHook = ''
  '';
}
