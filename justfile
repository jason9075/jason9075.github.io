set shell := ["bash", "-euo", "pipefail", "-c"]

default:
    @just --list

# Start live-reload dev server on port 8080
dev:
    live-server --port=8080 --open=.

# Validate HTML (requires html-validator-cli in PATH, optional)
lint:
    @command -v html-validator >/dev/null 2>&1 && html-validator --file index.html || echo "html-validator not found, skipping"

# Commit all changes and push to GitHub Pages
deploy message="chore: update site":
    git add -A
    git commit -m "{{message}}"
    git push origin master
