# v1.9 Validation
Status: **IN VALIDATION**

## What failed in v1.8
Programmatic assertions passed and 32 named files existed, but visual audit showed that test-specific evidence was captured too late. Many files displayed the same final 61.9-second state and therefore did not visually prove their named test.

## v1.9 fix
Evidence is captured at the moment each test is exercised. Transition tests receive BEFORE and AFTER frames. State tests receive a frame from the tested state. Evidence generation is no longer deferred until the end of the run.

## Acceptance
1. Full programmatic regression passes.
2. Every test has correctly timed evidence.
3. Every evidence item is visually inspected against its test statement.
Any failure freezes v1.9 and moves the correction to v1.10.
