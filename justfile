@_list:
  just --list

develop:
  zellij --layout zellij_layout.yaml

zola:
  zola serve -p 2223

tailwind:
  tailwindcss --input css/base.css --output static/css/base.css --watch
