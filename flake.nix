{
  description = "Gnome extension adding hotkeys for switching windows in the window list";
  inputs = {flake-utils.url = "github:numtide/flake-utils";};
  outputs = {
    self,
    nixpkgs,
    flake-utils,
  }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = nixpkgs.legacyPackages.${system};
    in {
      formatter = pkgs.alejandra;
      devShells.default = pkgs.mkShell {
        buildInputs = with pkgs; [
          nodePackages.typescript-language-server
          nodejs_20
          glib.dev
        ];
      };
    });
}
