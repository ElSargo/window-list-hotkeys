/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import Meta from 'gi://Meta';
import Shell from 'gi://Shell';

export default class WindowListHotkeysExtension extends Extension {
  enable() {
    this.settings = this.getSettings("org.gnome.shell.extensions.windowlisthotkeys");
    this.active_binds = [];
    for (let i = 1; i < 10; i++) {
      let key = "activate-window-" + i;
      this.active_binds.push(key);
      Main.wm.addKeybinding(key, this.settings,
        Meta.KeyBindingFlags.IGNORE_AUTOREPEAT,
        Shell.ActionMode.NORMAL | Shell.ActionMode.OVERVIEW,
        () => {
          activate_window(i - 1);
        }
      );
    };
  }

  disable() {
    this.active_binds.forEach((key, _) => {
      Main.wm.removeKeybinding(key);
    });
    this.settings = null;
  }
}

function activate_window(index) {
  global.get_workspace_manager().get_active_workspace().list_windows().sort((a1, a2) => {
    return a1.get_stable_sequence() - a2.get_stable_sequence();
  })[index].activate(0);
}
