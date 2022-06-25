# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.236.0/containers/rust/.devcontainer/base.Dockerfile

# [Choice] Debian OS version (use bullseye on local arm64/Apple Silicon): buster, bullseye
ARG VARIANT="buster"
FROM mcr.microsoft.com/vscode/devcontainers/rust:0-${VARIANT}

# Install Just
ARG just_version=1.2.0
RUN curl -LO https://github.com/casey/just/releases/download/${just_version}/just-${just_version}-x86_64-unknown-linux-musl.tar.gz \
  && tar xzfv just-${just_version}-x86_64-unknown-linux-musl.tar.gz \
  && mv just /usr/local/bin

# Install Zellij
ARG zellij_version=v0.30.0
RUN curl -LO https://github.com/zellij-org/zellij/releases/download/${zellij_version}/zellij-x86_64-unknown-linux-musl.tar.gz \
  && tar xzfv zellij-x86_64-unknown-linux-musl.tar.gz \
  && mv zellij /usr/local/bin

# Install Tailwind
ARG tailwind_version=v3.1.3
RUN curl -LO https://github.com/tailwindlabs/tailwindcss/releases/download/${tailwind_version}/tailwindcss-linux-x64 \
  && chmod 755 tailwindcss-linux-x64 \
  && mv tailwindcss-linux-x64 /usr/local/bin/tailwindcss

# Install Zola
ARG zola_version=v0.15.3
RUN curl -LO https://github.com/getzola/zola/releases/download/${zola_version}/zola-${zola_version}-x86_64-unknown-linux-gnu.tar.gz \
  && tar xzfv zola-${zola_version}-x86_64-unknown-linux-gnu.tar.gz \
  && mv zola /usr/local/bin/
