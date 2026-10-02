# v2.3 Validation
Status: **FAILED — frozen**

Fresh full regression run: 37071951363.

## Fresh code review finding
The v2.3 K10 patch still coupled two different requirements:
- release/matter continuity; and
- global floor/boundary geometry.

The reported state was internally conserved: captured 31 = deposited 1 + spilled 29 + falling 1. Therefore the continuity portion was not the failing behavior. K10 was false because the separate `bounds` predicate was ANDed into K10.

This duplicated responsibilities already covered elsewhere and made K10 report a release-continuity failure for an unrelated geometry condition.

## Refactor decision
v2.3 is frozen. The next version separates invariants by responsibility instead of patching the reported symptom. K10 will test release continuity only. Boundary/support integrity remains independently tested and visually audited.
