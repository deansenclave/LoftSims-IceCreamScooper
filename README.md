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

## Test Infrastructure

- v1.2 evidence capture: `tests/capture-v12-evidence.mjs`
- v1.2 workflow: `.github/workflows/v12-evidence.yml`
- v1.3 reality-invariant test: `tests/test-v13.mjs`
- v1.3 workflow: `.github/workflows/v13-reality-test.yml`
- v1.4 closed-loop test: `tests/test-v14.mjs`
- v1.4 workflow: `.github/workflows/v14-validation.yml`
- v1.5 knowledge-derived test: `tests/test-v15.mjs`
- v1.5 workflow: `.github/workflows/v15-validation.yml`

Expected v1.3 generated evidence location:

`versions/v1.3/test-evidence/`

## Current Development Status

Current development revision: **v1.5**

v1.5 passed the defined executable knowledge/reality suite in GitHub Actions run **37064246082**, with evidence under `versions/v1.5/test-evidence/`. Validation is scoped to the encoded/tested knowledge; future real-world comparisons can expose additional missing knowledge and drive further refinement.
