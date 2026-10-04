# meson-videos

Remotion projects for Meson clients.

## AgentPhone · 30-second intro

A 30.0s, 30fps looping product intro, built from the *AgentPhone Motion Brief*
and `AgentPhone-30s-intro-script.md`. The screens are rebuilt from the brief's
HTML markup (not the PNGs), so every element animates with the brief's three
helpers: `enter`, `pop` and `draw`.

| Composition | Size | Notes |
|---|---|---|
| `AgentPhone-Intro` | 1920×1080 | Voiceover version (short supers) |
| `AgentPhone-Intro-Muted` | 1920×1080 | Muted-feed version (longer supers carry the story) |
| `AgentPhone-Intro-Vertical` | 1080×1920 | Reels / TikTok / Stories crop |
| `AgentPhone-Intro-Vertical-Muted` | 1080×1920 | Vertical, muted feeds |
| `AgentPhone-Shots/*` | 1920×1080 | Each shot on its own, for review |

**Timing.** Cuts sit on a 124 BPM grid (62 beats = exactly 900 frames), see
`src/agentphone/theme.ts`. The music drop lands at 0:07, the lift at 0:17 and
the final hit on the wordmark at 0:28. The last frame equals the first
(handset circle on `#0c1410`), so the video loops cleanly.

**Audio.** No audio is bundled. Put the files in `public/audio/` and set the
`voiceover` and `music` props (for example `"audio/voiceover.wav"`) in
`src/Root.tsx` or in the Studio props panel. The muted variants ignore the
voiceover.

**Waitlist URL.** Change `url` in `src/Root.tsx` (currently the placeholder
`agentphone.com.au`).

### Layout

```
src/agentphone/
  Intro.tsx      main timeline + super cues (VO and muted)
  theme.ts       brand tokens, beat grid, cut points
  lib/           motion helpers, camera/stage, wordmark, supers, fonts
  screens/       the brief's screens as React, with motion beats added
  shots/         one file per shot: stage, camera keys, inserts
public/fonts/    Geist + Geist Mono (OFL), from the brief bundle
```

## Commands

```console
npm i
npm run dev                                   # Remotion Studio
npx remotion render AgentPhone-Intro          # render a composition
npx remotion render AgentPhone-Intro-Vertical
```
