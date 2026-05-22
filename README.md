# Mosaic

A Pebble Time Steel (Basalt) watchface that renders a 45×45 pixel mosaic of Van Gogh's *The Starry Night* as the watch background, with the time overlaid in LECO bold at the bottom.

## Modes

| Setting | Description |
|---|---|
| **Color** (default) | Full 64-color Pebble palette, Van Gogh Starry Night mosaic |
| **Grayscale** | 4-level Pebble-native dithered rendering of the same image |

## Layout

- 45×45 grid filling the full 144×168px Basalt screen
- Column widths: 36 cells × 3px + 9 cells × 4px = 144px
- Row heights: 12 cells × 3px + 33 cells × 4px = 168px
- Time: LECO 26 bold, bottom-right, configurable color (white / yellow / black)

## CloudPebble Setup

1. Create new project → **Pebble SDK 3**, platform **basalt**, type **Watchface**
2. Add `src/main.c` as **C file**
3. Add `src/index.js` as **PebbleKit JS**
4. In **Settings**, tick **Is Configurable**
5. In **Message Keys**, set **Manual** mode:
   - `display_mode` = 0
   - `time_color` = 1
6. Build and install via Pebble app

## Git workflow

```
git clone <this-repo>
# In CloudPebble: Settings → Source Control → Add remote → push/pull
```

## Files

```
mosaic-watchface/
├── src/
│   ├── main.c       — full watchface with embedded mosaic grids
│   └── index.js     — PebbleKit JS config page
├── package.json     — CloudPebble project manifest
└── README.md
```
