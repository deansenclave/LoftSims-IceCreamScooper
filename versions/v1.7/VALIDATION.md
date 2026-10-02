# v1.7 Validation

Status: **PASSED**

## Result
Full regression validation completed successfully in GitHub Actions run **#2 / 37067383202**.

- Test report identity: v1.7
- JavaScript/page errors: none
- All explicit regression assertions: PASS
- K01–K10 reality checks: PASS
- Shape-from-contact gate: PASS
- Perfect-circle rejection gate: PASS
- Bowl catch/carry/support: PASS
- Gravity, conservation, contact transfer and long-run checks: PASS

## Evidence
All generated evidence is contained in `versions/v1.7/test-evidence/`:

01 initial separated world; 01a moved scoop integrity; 01b moved bowl integrity; 02 overlap detection; 03 contact before capture; 04 cohesive capture/cavity; 05 release continuity; 06 gravity fall; 07 first natural outcome; 08 deliberate miss/no attraction; 09 ballistic catch/no attraction; 10 bowl-content translation; 11 bowl/heap exclusion; 12 long-run reality state; plus `TEST-REPORT.json`.

## Development history
v1.6 was not accepted after visual review exposed unacceptable scoop morphology and subsequent regression iterations failed. v1.7 replaced the circular proxy with contact-derived asymmetric scoop geometry and reran the complete suite with new version-contained evidence.

## Acceptance
v1.7 is the first version in this progression recorded as PASSED under the full-regression + version-contained-evidence rule.
