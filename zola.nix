{ inputs, pkgs, lib }: let
  system = pkgs.stdenv.system;
  rust_toolchain = inputs.fenix.packages.${system}.minimal.toolchain;
  rust_platform = pkgs.makeRustPlatform {
    cargo = rust_toolchain;
    rustc = rust_toolchain;
  };
  zola_rev = "7099772dbd1a377ab98914ef624f0a0a32d1161f";
  zola = rust_platform.buildRustPackage rec {
    pname = "zola";
    version = zola_rev;

    src = pkgs.fetchFromGitHub {
      owner = "getzola";
      repo = "zola";
      rev = zola_rev;
      hash = "sha256-SarxJyZEwsrFL70z7y3WhcAfieJOCqUY6AO73+ZbqBs=";
    };

    cargoHash = "sha256-e1yUKjp2G7p1VtyvJ5YTRMVCmbSIKX+yVHaeCqcxaH4=";

    nativeBuildInputs = with pkgs; [
      pkg-config
      installShellFiles
    ];

    buildInputs = with pkgs; [
      oniguruma
    ] ++ lib.optionals pkgs.stdenv.hostPlatform.isDarwin (with pkgs.darwin.apple_sdk.frameworks; [
      CoreServices SystemConfiguration
    ]);

    RUSTONIG_SYSTEM_LIBONIG = true;

    postInstall = lib.optionalString (pkgs.stdenv.buildPlatform.canExecute pkgs.stdenv.hostPlatform) ''
      installShellCompletion --cmd zola \
        --bash <($out/bin/zola completion bash) \
        --fish <($out/bin/zola completion fish) \
        --zsh <($out/bin/zola completion zsh)
    '';

    passthru.tests.version = pkgs.testers.testVersion { package = zola; };

    meta = with lib; {
      description = "Fast static site generator with everything built-in";
      mainProgram = "zola";
      homepage = "https://www.getzola.org/";
      changelog = "https://github.com/getzola/zola/raw/v${version}/CHANGELOG.md";
      license = licenses.mit;
      maintainers = with maintainers; [ dandellion dywedir _0x4A6F ];
    };
  };
in zola
