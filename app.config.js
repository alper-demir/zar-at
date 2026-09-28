// The A52 test APK only needs ARM64. Keep regular preview and Play builds universal.
module.exports = ({ config }) => ({
  ...config,
  plugins:
    process.env.ZAR_BUILD_ARM64_ONLY === '1'
      ? [
          ...(config.plugins ?? []),
          ['expo-build-properties', { android: { buildArchs: ['arm64-v8a'] } }],
        ]
      : config.plugins,
});
