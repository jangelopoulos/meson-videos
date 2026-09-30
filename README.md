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

### `KymaDemo` — Kyma 20-second product film

A 20-second, 1920×1080 film for Kyma (international buyers investing in Greek property), shot as one
continuous camera move with no crossfades. Source lives in `src/kyma/film/`; screenshots in `public/screens/`,
the villa photo and listing card crop in `public/kyma/`.

| Time | What happens |
| --- | --- |
| 0–2 s | Opens tight on the home page's aerial photo with the title; the camera pulls back to reveal the site on a laptop |
| 2–5.5 s | Cursor toggles "Verified only", presses Search, the page scrolls to the verified listings, a card lifts on hover and is clicked |
| 5.5–7 s | The card's villa photo flies out of the laptop into the phone's listing as the laptop slides away |
| 7–14 s | Legal checks tick through; tap Net yield to open a sheet with growing yield bars; tap Costs (line items stack to the total) and Visa |
| 14–16 s | Sticky Enquire bar, tap, "Requested", call-back notification drops in |
| 16–20 s | The notification's app icon grows into the Kyma logo and the positioning line |

All beat timings live in `T` in `film/layout.ts`, with the camera path in `camera()`.
Captions beside the phone are in `film/Captions.tsx`.

Render it with:

```console
npx remotion render KymaDemo out/kyma-20s.mp4
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
