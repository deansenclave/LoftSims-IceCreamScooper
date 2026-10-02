# v2.1 Validation
Status: **FAILED — frozen**

## v2.0 correction carried into v2.1
Premature floor-spill classification was relaxed so a valid bowl intersection could complete before a falling scoop was classified as spilled.

## Full rerun result
The full suite was rerun from zero.
- ballisticCatch: PASS
- bowlCarriesContents: PASS
- noRealityViolation: FAIL
- noPlaceholderRealityGates: FAIL
- final live K10 release continuity: FAIL

At the long-run checkpoint one scoop remained in flight while 29 had spilled and one was deposited. The existing K10 formula incorrectly required every historical release to have already reached deposit/spill accounting, so it generated a false live failure while a legitimate falling body was still active.

v2.1 is frozen. Correction moves to v2.2.
