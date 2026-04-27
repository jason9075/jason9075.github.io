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
            just
            live-server
            git
          ];

          shellHook = ''
            echo "🌐 personal-site dev shell"
            echo "  just dev    — start live-server on :8080"
            echo "  just deploy — commit & push to GitHub Pages"
          '';
        };
      });
}
