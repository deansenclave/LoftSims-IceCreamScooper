# v1.8 Validation

Status: **IN VALIDATION**

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
