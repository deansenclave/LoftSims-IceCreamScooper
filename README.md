# LoftSims Ice Cream Scooper

Knowledge-driven LoftSims simulation for an ice-cream scoop interacting with a moving ice-cream heap, gravity, a collection bowl, and melt/settling behavior.

**Credit: Sudheendra Pai**

## LoftSims Development Principle

Encode applicable prior knowledge about the modeled world first, let behavior emerge from those constraints, test the resulting behavior against that knowledge, and refine the model when the outcome violates known reality. The simulation must not manufacture the desired result.

## Versioning

- Start at **v1.0**.
- Every development revision is preserved in a new version folder and increments by **0.1**: v1.1, v1.2, v1.3, ...
- Existing version folders are never overwritten.
- When a revision is explicitly approved as "looks good", it is promoted to the next major release line.
- Development continues from that approved baseline without deleting prior releases.

## Incremental Version History

### v1.0 — Baseline

- Initial persistent-contour Ice Cream Scooper LoftSim.
- Moving cohesive ice-cream heap.
- Rotating scoop head.
- Gravity/release concept.
- Bowl collection and melt/settling controls.
- Draggable scoop and bowl.

### v1.1 — Contact and Stability Revision

- Refined scoop/heap contact behavior.
- Worked on gravity stability and retained deposited scoops.
- Reduced the earlier upward-launch instability when successive scoops contacted bowl contents.
- Exposed remaining geometry problems: artificial heap boundary, fragmented capture/release, and unrealistic bowl interaction.

### v1.2 — Continuous Heap and Persistent Contour

- Replaced the hard vertical heap cutoff with a continuous rounded leading contour through the scoop working region.
- Changed scoop contact detection to operate against the actual heap footprint.
- Added progressive scoop filling from contact geometry.
- Preserved the captured contour through carry, release, fall, and deposit stages.
- Moved the default bowl clear of the heap/scoop working region.
- Added melt-driven contour relaxation.
- Prevented the earlier deposited-scoop upward-launch failure.
- Added evidence-capture infrastructure.

#### v1.2 limitation discovered by evidence review

v1.2 used predetermined bowl settlement offsets and added a forced rightward release component. Those mechanisms could produce apparently successful bowl collection without the complete physical trajectory causing that result. Therefore v1.2 is retained as a development revision, but its bowl-collection behavior is not treated as physically validated.

### v1.3 — Knowledge-Invariant Physics

v1.3 changes the simulation from outcome-oriented placement to knowledge-constrained behavior.

- Removed predetermined bowl landing slots.
- Removed bowl-directed/forced rightward release velocity.
- Defined the 2D world explicitly: screen down represents the Earth/gravity direction; screen up represents higher elevation.
- Release velocity is derived from the instantaneous tangential motion of the rotating scoop.
- After release, gravity acts downward on unsupported ice cream.
- Bowl collection occurs only when the actual falling contour intersects a supporting bowl/deposit surface.
- A trajectory that misses the bowl is recorded as spilled rather than redirected into the bowl.
- Added material-state accounting:
  - captured
  - carried
  - falling
  - deposited in bowl
  - spilled
- Added the invariant:
  **captured = carried + falling + bowl + spilled**
- Added live reality/invariant checks for downward gravity, finite/non-teleporting geometry, material accounting, absence of bowl attraction, and absence of predetermined landing slots.
- Added a 60-second Chromium functional-test harness and GitHub Actions workflow.

#### v1.3 validation status

The v1.3 simulation code and test infrastructure are present. Generated v1.3 test screenshots/results have **not yet been committed**, so v1.3 must not be described as test-validated until those results exist and are reviewed.



### v1.4 — Bowl-Containment Revision

- Added rigid translation of already-supported bowl contents when the bowl is dragged.
- Added evidence-producing functional validation.
- Automated assertions passed, but later visual/prior-knowledge review exposed a physically impossible bowl/heap overlap, an artificial heap cliff, and weak capture geometry.
- v1.4 is therefore preserved as a development revision, not treated as reality-validated.

### v1.5 — Knowledge-Derived Reality Validation

- Added solid-body bowl/heap exclusion.
- Reworked the heap nose into a smooth cohesive free surface.
- Bound scoop cavities to moving heap material coordinates rather than fixed screen coordinates.
- Limited capture to one physical scoop event per rotation.
- Derived captured-mass position from actual scoop/heap contact so release momentum comes from the mass offset from the rotation axis.
- Changed release to a gravity-facing scoop orientation rather than a bowl-directed velocity.
- Added real ballistic miss and catch tests: misses spill; catches require actual trajectory/bowl intersection.
- Added deposit support, bowl overflow behavior, and non-coincident deposit validation.
- Added executable reality gates for gravity, finite geometry/no teleportation, conservation, contact-before-capture, solid exclusion, free-surface/cavity slope, cohesive capture, no attraction, no landing slots, and release continuity.
- Added 12 per-behavior evidence screenshots plus `TEST-REPORT.json`.
- Final GitHub Actions run **37064246082** passed all v1.5 knowledge-derived tests.
- The generated evidence was visually inspected after the automated run; this visual gate caught and drove additional refinements before the final passing run.

### v1.6 — Regression Expansion and Visual Failure Discovery

- Expanded movable-object, material, gravity, conservation, bowl-support, and long-run checks.
- Automated runs exposed multiple regressions during refinement.
- A later user-visible review exposed unacceptable scoop morphology despite an earlier green run.
- v1.6 is therefore retained as a development/diagnostic revision and is **not an accepted validated release**.
- The failure history led to explicit shape checks that reject a perfect circular proxy and require contact-derived scoop geometry.

### v1.7 — Full Regression + Version-Contained Evidence

- Rebuilds the captured scoopful from actual scoop/ice-cream contact geometry rather than a circular proxy.
- Retains the corrected physical release path and bowl interaction from the v1.6 development cycle.
- Adds capture-time morphology checks.
- Runs the complete regression suite for the version rather than inheriting previous passes.
- Generates screenshots and `TEST-REPORT.json` into `versions/v1.7/test-evidence/`.
- Uses `versions/v1.7/VALIDATION.md` to record the previous failure, correction, and acceptance status.
- **Status: PASSED.** Full regression validation succeeded in GitHub Actions run **37067383202** with version-contained screenshots and `TEST-REPORT.json`.

## Release / Validation Rule

Every progressive version is tested independently against the complete scenario suite. A previous version's successful tests are not inherited.

A version can be marked **PASSED / validated** only when:

1. every automated regression test succeeds;
2. no required reality/invariant check fails during the tested scenarios;
3. generated evidence corresponds to the scenario being asserted;
4. all required evidence screenshots and the machine-readable test report are stored inside that version;
5. the evidence is reviewed for visible defects that numerical checks can miss; and
6. the version's validation document records the final result.

If any check or evidence review fails, that version remains a failed/development revision. The failure and correction are documented and development continues in the next version.

## Test Infrastructure

- v1.2 evidence capture: `tests/capture-v12-evidence.mjs`
- v1.2 workflow: `.github/workflows/v12-evidence.yml`
- v1.3 reality-invariant test: `tests/test-v13.mjs`
- v1.3 workflow: `.github/workflows/v13-reality-test.yml`
- v1.4 closed-loop test: `tests/test-v14.mjs`
- v1.4 workflow: `.github/workflows/v14-validation.yml`
- v1.5 knowledge-derived test: `tests/test-v15.mjs`
- v1.5 workflow: `.github/workflows/v15-validation.yml`
- v1.6 regression test: `tests/test-v16.mjs`
- v1.6 workflow: `.github/workflows/v16-validation.yml`
- v1.7 full regression test: `tests/test-v17.mjs`
- v1.7 workflow: `.github/workflows/v17-validation.yml`

Expected v1.3 generated evidence location:

`versions/v1.3/test-evidence/`

## Current Development Status

Current development revision: **v1.7**

v1.6 is not the accepted baseline because subsequent visual review exposed an unacceptable scoop-shape defect. v1.7 completed the full regression suite successfully in GitHub Actions run **37067383202**. Its test report identifies v1.7, all explicit assertions and K01–K10 pass, and the complete screenshot/report evidence set is stored under `versions/v1.7/test-evidence/`.
