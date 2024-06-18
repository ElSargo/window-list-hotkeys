#!/bin/sh -e

glib-compile-schemas schemas/

export G_MESSAGES_DEBUG=all
export MUTTER_DEBUG_DUMMY_MODE_SPECS=1366x768

display=wayland-$RANDOM
env WAYLAND_DISPLAY=$display dbus-run-session gnome-shell --wayland-display=$display --nested --wayland
