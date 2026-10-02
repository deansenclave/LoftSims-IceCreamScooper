# v1.7 Validation Progress

Status: IN VALIDATION — not released.

## Why v1.7 exists
v1.6 testing exposed visible and functional defects. Each failed iteration is retained as evidence rather than overwritten.

## Previous failure — v1.6 run #11
Passed: bowl catch, bowl carry, moved-content support, gravity, conservation, heap smoothness, non-circular proxy gate, and K01–K10.

Failed:
- `scoopShapeFromContact`

Meaning: the release/catch correction worked, but the captured scoop geometry still did not vary enough from a synthetic regular shape.

## v1.7 correction
- Preserve geometry derived from actual scoop/ice-cream contact.
- Increase natural asymmetry of the captured mass.
- Reduce vertical symmetry so the scoopful cannot resemble a manufactured disk/ellipse.
- Keep the v1.6 bowl trajectory correction that passed run #11.

## Acceptance
v1.7 is not accepted until the full automated suite passes and the generated visual evidence is inspected for the original shape/fall defects.
