# Zar At

Zar At is a Turkish and English Android dice roller built with React Native and Expo. It supports one or two six-sided dice, animated rolls, sound and haptics, local appearance settings, roll history, and optional one-time Premium features.

## Requirements

- Node.js compatible with the installed Expo SDK
- npm
- Expo Go for basic development, or an Android development build for native purchase testing

## Start the app

```sh
npm install
npx expo start
```

Use the Expo CLI prompts to open the app on an Android device or emulator.

## Quality checks

```sh
npm run typecheck
npm run lint
npm test
```

## Android builds

Build profiles are defined in `eas.json`:

- `development` for a development client
- `preview` for an installable APK
- `preview-a52` for ARM64 device checks
- `production` for the Play Store Android App Bundle

Run builds with EAS CLI after signing in to the configured Expo account, for example:

```sh
npx eas build --platform android --profile preview
```

Production Google Play Billing requires a configured Play Console product and license tester. Expo Go uses the mock purchase flow.

## Project notes

- Product scope and architecture: `AGENTS.md`
- Phase plan: `IMPLEMENTATION_PLAN.md`
- Store setup: `STORE_RELEASE_GUIDE.md`
- Privacy policy source: `docs/privacy-policy.html`
- Store listing assets: `store-assets/`
