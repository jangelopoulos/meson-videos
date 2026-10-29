# Pinax videos

Motion graphics for Pinax (pinax.ai), built with Remotion, React and TypeScript.

| Composition              | Size      | What                                   |
| ------------------------ | --------- | -------------------------------------- |
| `PinaxAd`                | 1920x1080 | 45s beat-locked launch ad (120 BPM)    |
| `PinaxAdVertical`        | 1080x1920 | Same ad, mobile layout                 |
| `PinaxExplainer`         | 1920x1080 | Earlier 47s explainer (`src/explainer`) |
| `PinaxExplainerVertical` | 1080x1920 | Earlier explainer, mobile layout       |

## Commands

```console
npm i
npx remotion studio
npx remotion render PinaxAd out/PinaxAd.mp4
npx remotion render PinaxAdVertical out/PinaxAdVertical.mp4
```

## The ad

- `src/brand.ts`: tempo (`BPM`, `FRAMES_PER_BEAT`, `beats()`), colours, glass settings, fonts, type sizes, the SaaS name and price lists, the cluster groupings, all copy, the beat sheet (`shots`) and audio hit points. Edit this first.
- `src/PinaxAd.tsx`: plays `shots` in order as hard cuts.
- `src/scenes/Act1.tsx` to `Act4.tsx`: one component per shot. `Shot.tsx` adds the camera push, grain and vignette.
- `src/components/`: `GlassCard`, `SaasTile`, `KineticHeadline`, `ChatWindow`, `Avatar`, `DataStream`, `Dashboard`, `PinaxWordmark`, `Padlock`, `Grain`, `Flash`.
- Tile positions and the vortex use Remotion's seeded `random()`, so every render is identical.

Background music: uncomment the `<Audio>` placeholder in `src/PinaxAd.tsx`, run `npx remotion add @remotion/media`, and line the track up with `hitPoints` in `src/brand.ts`.

`public/brand/` holds reference SVGs of the wordmark; the videos render it live with `PinaxWordmark`.
