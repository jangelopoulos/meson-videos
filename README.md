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

### `KymaDemo` — Kyma property marketplace walkthrough

A 56-second, 1920×1080 product demo of the Kyma site (international buyers investing in Greek property).
Source lives in `src/kyma/`, screenshots in `public/screens/`.

Scenes (each is also registered on its own under the `KymaDemo-Scenes` folder in Studio so it can be tweaked in isolation):

| Scene | What happens |
| --- | --- |
| `Intro` | Logo and headline on navy |
| `Home` | Desktop home: zoom into search, click goal chips, scroll to verified listings, click "See all" |
| `MapSearch` | Map/filter page: refine filters, area pins pulse, click a pin, open a listing card |
| `Listing` | Listing page: price panel, then spotlights on legal checks, yields, acquisition costs and Golden Visa |
| `Mobile` | Phone flow: home → tap Search → map → tap card → listing, then all three screens together |
| `Summary` | The five buyer questions the product answers, plus the qualified call-back line |
| `Outro` | Logo and one-line positioning |

Timings are keyframed per scene (`kf()` in `src/kyma/theme.ts`); durations are in `src/kyma/KymaDemo.tsx`.
Screenshot hotspots (chips, cards, pins) are expressed in original screenshot pixels multiplied by `K`, so swapping in a
new export of the same layout only needs the coordinates checked.

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
