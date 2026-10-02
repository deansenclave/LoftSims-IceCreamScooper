# v2.4 Validation
Status: **FAILED — frozen**

Fresh regression run 37072736885 isolated one failure: boundaryIntegrity. K01-K10 all passed, including corrected K10.

Fresh review found the floor-spill lifecycle allowed a falling contour to cross y=455 before it was removed. v2.5 replaces that lifecycle with an explicit floor collision: when the contour first reaches the floor it is clamped to the boundary and removed from the active falling state. This prevents a visually impossible below-floor frame.
