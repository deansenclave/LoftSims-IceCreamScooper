# v2.0 Validation
Status: **FAILED — frozen**

## Corrections attempted from v1.9
- replaced spiky harmonic scoop contour with a smoothed contact-derived contour;
- added mild area-preserving fall deformation;
- removed unsupported falling geometry at the floor boundary;
- tightened the live boundary/release gate.

## Full rerun result
The complete v2.0 suite was run from zero. It failed before visual acceptance:
- ballisticCatch: FAIL
- bowlCarriesContents: FAIL
- remaining reported assertions: PASS
- because the catch failed, bowl-content movement could not be established.

v2.0 is frozen. The correction moves to v2.1. No v2.0 visual-validation claim is made.
