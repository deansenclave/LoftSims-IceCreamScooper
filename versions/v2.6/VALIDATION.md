# v2.6 Validation
Status: **FAILED — frozen**

Failed: ballisticCatch, bowlCarriesContents. Final state: 31 captured, 31 spilled, 0 deposited. The floor/bowl collision lifecycle still prevented valid settlement.

v2.7 refactors collision ordering explicitly: bowl settlement is evaluated first; only unsupported matter then reaches floor-spill handling.
