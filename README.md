# Pinax explainer video

A ~45 second motion graphic explainer for Pinax (pinax.ai), built with Remotion, React and TypeScript.

| Composition              | Size      | FPS |
| ------------------------ | --------- | --- |
| `PinaxExplainer`         | 1920x1080 | 30  |
| `PinaxExplainerVertical` | 1080x1920 | 30  |

Both compositions use the same scene components. The layout switches on the video's aspect ratio (`src/lib/layout.ts`).

## Commands

```console
npm i
npx remotion studio
npx remotion render PinaxExplainer out/PinaxExplainer.mp4
npx remotion render PinaxExplainerVertical out/PinaxExplainerVertical.mp4
```

## Where things live

- `src/brand.ts`: colours, fonts, type sizes, scene lengths, beats and all on-screen copy. Edit this first.
- `src/timeline.ts`: scene order and transitions; computes the total duration.
- `src/scenes/`: one component per scene (Hook, Problem, Cost, Connect, AiAtWork, MakeItStick, Outro).
- `src/components/`: `Gear`, `Mechanism`, `AppTile`, `Callout`, `PinaxWordmark`, `Headline`, `Icon`, `Person`, `PriceTag`.
- `src/lib/gears.ts`: gear-train maths. Meshing gears turn in opposite directions at speeds inversely proportional to their tooth counts, phased so teeth sit in gaps.
- `public/brand/`: reference SVGs of the wordmark. The video renders the wordmark live with `PinaxWordmark`.

Background music: uncomment the `<Audio>` placeholder in `src/PinaxExplainer.tsx` and run `npx remotion add @remotion/media`.
