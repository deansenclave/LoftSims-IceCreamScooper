# v1.9 Validation
Status: **FAILED — visual audit**

## What failed in v1.8
Programmatic assertions passed and 32 named files existed, but visual audit showed that test-specific evidence was captured too late. Many files displayed the same final 61.9-second state and therefore did not visually prove their named test.

## v1.9 fix
Evidence is captured at the moment each test is exercised. Transition tests receive BEFORE and AFTER frames. State tests receive a frame from the tested state. Evidence generation is no longer deferred until the end of the run.

## Acceptance
1. Full programmatic regression passes.
2. Every test has correctly timed evidence.
3. Every evidence item is visually inspected against its test statement.
Any failure freezes v1.9 and moves the correction to v1.10.


## v1.9 result
Gate 1: PASS — 32/32 programmatic assertions.
Gate 2: PASS — test-time evidence exists, including before/after pairs for movement tests.
Gate 3: **FAIL — visual audit**.

The evidence timing defect from v1.8 is fixed. However, the visual audit still shows unacceptable physical/material behavior:
- captured/released ice cream is a small spiky/star-like blob rather than a plausible cohesive scoopful;
- the long-run state visibly shows a spilled blob hanging below the heap/floor boundary while the live panel still reports all K01–K10 PASS;
- therefore the current reality gates still fail to detect a visible geometry/material defect.

v1.9 is frozen as FAILED. Correction moves to v2.0 and requires both material-shape correction and a gate that detects unsupported/boundary-crossing spilled geometry.
