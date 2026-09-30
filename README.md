# Remotion video

<p align="center">
  <a href="https://github.com/remotion-dev/logo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-dark.apng">
      <img alt="Animated Remotion Logo" src="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-light.gif">
    </picture>
  </a>
</p>

Welcome to your Remotion project!

## Videos in this repo

### `KymaDemo` — Kyma property marketplace film

A 60-second, 1920×1080 cinematic product film for Kyma (international buyers investing in Greek property).
Source lives in `src/kyma/`. Original screenshots are in `public/screens/`; photos and UI cards cropped from them
are in `public/kyma/`.

Look and feel: Aegean navy, champagne gold and ivory; Cormorant Garamond for editorial titles and Source Sans 3
(the product's UI font); film grain, vignette, letterboxing and drifting gold light.

Scenes (each is also registered on its own under the `KymaDemo-Scenes` folder in Studio):

| Scene | What happens |
| --- | --- |
| `Opening` | Letterbox opens on an aerial of the coast; "The Aegean, without the guesswork." |
| `Reveal` | A 3D laptop rises and its lid opens, the screen powers on, a phone swings in, verified facts float off |
| `Search` | Typing a location and tapping goal chips; the chips lift off the glass into a filter stack, then the verified listing cards rise out of the screen |
| `MapGreece` | Greece as a constellation of towns on a tilting 3D plane; gold light columns rise per area, height = price per m² |
| `Listing` | The villa photo, full bleed, shrinks into the phone; then the five buyer questions burst out of the phone as cards from the real listing page (legal scan, yield and cost counters, a Golden Visa seal, vetted partners) |
| `CallBack` | Gold arcs from buyer cities to Greece with live local clocks; phone notifications for a booked call-back and a qualified enquiry |
| `Everywhere` | A slow orbit around laptop and phones on a glossy floor |
| `Finale` | Sunset, logo and positioning line; the letterbox closes |

Building blocks: `devices.tsx` (3D `Laptop` with hinged lid and keyboard deck, titanium `Phone`, `Stage`),
`fx.tsx` (grain, dust, light sweeps, backdrop, letterbox), `type.tsx` (masked line reveals, chapter titles),
`ui.tsx` (glass chips, icons). Timings are keyframed per scene with `prog()`/`kf()` from `theme.ts`;
scene durations are in `KymaDemo.tsx`.

Render it with:

```console
npx remotion render KymaDemo out/kyma-demo.mp4
```

## Commands

**Install Dependencies**

```console
npm i
```

**Start Preview**

```console
npm run dev
```

**Render video**

```console
npx remotion render
```

**Upgrade Remotion**

```console
npx remotion upgrade
```

## Docs

Get started with Remotion by reading the [fundamentals page](https://www.remotion.dev/docs/the-fundamentals).

## Help

We provide help on our [Discord server](https://discord.gg/6VzzNDwUwV).

## Issues

Found an issue with Remotion? [File an issue here](https://github.com/remotion-dev/remotion/issues/new).

## License

Note that for some entities a company license is needed. [Read the terms here](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).
