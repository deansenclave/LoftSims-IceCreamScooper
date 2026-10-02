# v1.8 Validation

Status: **FAILED — visual evidence audit**

## Previous version failure — v1.7
v1.7 automated assertions reported PASS, but the visual evidence audit failed:
- screenshots visibly identified the application as v1.6 rather than v1.7;
- `02-overlap-knowledge-check.png` visibly displayed `FAIL K05 solid bowl excludes heap`;
- 32 automated assertions had only 14 screenshots;
- shared single-state screenshots could not independently establish every test claim.

## v1.8 correction
- visible application identity changed to v1.8;
- evidence generation is being changed to one named evidence record per test assertion;
- tests needing a transition use before/after evidence rather than a single ambiguous frame;
- automated PASS is only gate 1; evidence completeness is gate 2; visual inspection against each test statement is gate 3.

## Acceptance
v1.8 remains unvalidated until all three gates pass for every test.


## v1.8 visual audit result
Gate 1 (programmatic): PASS — 32/32 assertions reported true.
Gate 2 (evidence count): PASS — 32/32 named evidence files exist.
Gate 3 (visual audit): **FAIL**.

The individual evidence files were generated after the complete simulation had already run. Consequently, multiple different tests show the same final 61.9-second state rather than the state in which that assertion was exercised. Examples include `scoopUserMovable`, `contactBeforeCapture`, `releaseObserved`, `gravityObserved`, `scoopShapeFromContact`, `ballisticCatch`, and `bowlCarriesContents`. Their labels say result=true, but the displayed frame does not independently demonstrate the named behavior.

v1.8 is frozen as FAILED. The evidence timing/trace defect is corrected only in v1.9.
