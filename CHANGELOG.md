# Changelog

## v1.1.0

### Features

- Slow six course ends for courses and touches
- Siril generation now triggers proof to confirm the length for export
- Customisable starts for touches
- Visibility of new features (starts and six types) disabled by default

### Bugfixes

- Extra sixes can display six heads as well as six ends
- Frequency of touch updates reduced to stop viewport scrolling when redrawing
- Importing a touch now resets falseness, music, etc.
- Exported touch now directly importable (fixed rendering issue)
- Changing the stage now resets falseness, music, etc.

### Improvements

- Standardised use of first/last/head/end in method names
- Simplified six templates
- Refactored inheritance structure for `Course` and `Touch`
- Tidied `AbstractBlock` tests
- Six type and notation now marked `readonly`
- Updated dependency versions
- `gulp watch` now checks for template changes
- (Trivial) added missing test dependency
- Slight tweaks to touch display layout in MBD_style pricker

## v1.0.0

First release
