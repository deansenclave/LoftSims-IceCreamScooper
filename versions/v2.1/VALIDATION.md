# v2.1 Validation
Status: **IN VALIDATION**

## v2.0 failure
The new boundary protection removed a falling scoop as soon as its lowest point touched y=455. That happened before the bowl-intersection logic could complete a valid catch, causing ballisticCatch and bowlCarriesContents to fail.

## v2.1 correction
A falling scoop is now classified as floor-spilled only after the complete cohesive contour has passed the floor boundary. Bowl intersection remains evaluated first. This preserves the boundary fix without prematurely deleting a valid bowl-crossing trajectory.

Full 32-test regression, evidence capture, and 32/32 visual audit are required before acceptance.
