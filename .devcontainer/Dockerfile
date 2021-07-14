# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.177.0/containers/rust/.devcontainer/base.Dockerfile
FROM mcr.microsoft.com/vscode/devcontainers/rust:0-1

# Install Zola
ARG zola_version=v0.13.0
RUN curl -LO https://github.com/getzola/zola/releases/download/${zola_version}/zola-${zola_version}-x86_64-unknown-linux-gnu.tar.gz \
  && tar xzfv zola-${zola_version}-x86_64-unknown-linux-gnu.tar.gz \
  && mv zola /usr/local/bin/