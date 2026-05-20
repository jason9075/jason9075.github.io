{
  description = "jason9075.github.io — personal site";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
      in {
        devShells.default = pkgs.mkShell {
          name = "personal-site";
          packages = with pkgs; [
            nodejs_22
            bun
            just
            git
          ];

          shellHook = ''
            echo "personal-site dev shell"
            echo "  just install  — install npm deps"
            echo "  just dev      — start Vite dev server on :8080"
            echo "  just build    — production build to dist/"
            echo "  just preview  — preview production build"
          '';
        };
      });
}
