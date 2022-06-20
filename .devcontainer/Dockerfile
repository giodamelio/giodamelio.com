# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.236.0/containers/rust/.devcontainer/base.Dockerfile

# [Choice] Debian OS version (use bullseye on local arm64/Apple Silicon): buster, bullseye
ARG VARIANT="buster"
FROM mcr.microsoft.com/vscode/devcontainers/rust:0-${VARIANT}

# Install Zola
ARG zola_version=v0.15.3
RUN curl -LO https://github.com/getzola/zola/releases/download/${zola_version}/zola-${zola_version}-x86_64-unknown-linux-gnu.tar.gz \
  && tar xzfv zola-${zola_version}-x86_64-unknown-linux-gnu.tar.gz \
  && mv zola /usr/local/bin/
