set shell := ["bash", "-euo", "pipefail", "-c"]

default:
    @just --list

# Install npm dependencies
install:
    npm install --ignore-scripts

# Start Vite dev server on port 8080
dev:
    @[ -d node_modules ] || npm install --ignore-scripts
    node --require ./scripts/fix-noexec.cjs ./node_modules/vite/bin/vite.js --port 8080

# Build for production (output: dist/)
build:
    @[ -d node_modules ] || npm install --ignore-scripts
    node --require ./scripts/fix-noexec.cjs ./node_modules/vite/bin/vite.js build

# Preview the production build
preview: build
    node --require ./scripts/fix-noexec.cjs ./node_modules/vite/bin/vite.js preview --port 8080

# Remove build artifacts and node_modules
clean:
    rm -rf dist node_modules
