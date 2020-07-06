let
  pkgs = import <nixpkgs> {};
in
pkgs.mkShell {
  buildInputs = [
    pkgs.libsass
    pkgs.openssl
    pkgs.pkgconfig
  ];
}
