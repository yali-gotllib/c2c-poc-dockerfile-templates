# Known Vulnerabilities - Multi-Stage Build PoC

This repository demonstrates a scenario where **default C2C correlation fails** 
but **search_repositories can still find the vulnerable code**.

## Multi-Stage Build Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│ Stage 1: builder (node:14-alpine)                               │
│   - Installs vulnerable dependencies                            │
│   - lodash@4.17.20, express@4.17.1                              │
│   - THIS STAGE IS NOT IN THE FINAL IMAGE                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ COPY --from=builder
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ Stage 2: runtime (node:20-alpine)                               │
│   - Different base image = different layer signatures           │
│   - Still contains vulnerable node_modules                      │
│   - DEFAULT C2C CANNOT CORRELATE (no matching layers)           │
└─────────────────────────────────────────────────────────────────┘
```

## Why Default C2C Fails

1. **Layer Mismatch**: Final image has `node:20-alpine` base, not `node:14-alpine`
2. **No CI/CD Trace**: Image built locally, no GitHub Actions pipeline
3. **Docker Correlation Rule**: Can't match - Dockerfile says `node:14-alpine`, 
   but deployed image has `node:20-alpine` layers

## How search_repositories Finds It

Even though C2C fails, the Green Agent can use `search_repositories` to find:

| Search Query | Finds |
|--------------|-------|
| `"lodash" "4.17.20" org:yali-gotllib` | package.json with vulnerable version |
| `"express" "4.17.1" org:yali-gotllib` | package.json |
| `"c2c-poc-app" filename:Dockerfile` | This Dockerfile |
| `"node:14-alpine" filename:Dockerfile` | This Dockerfile (text match) |

## Vulnerabilities Still Present in Runtime Image

### NPM Dependencies (copied from builder)
- **lodash@4.17.20**: CVE-2021-23337 (Command Injection), CVE-2020-28500
- **express@4.17.1**: Multiple vulnerabilities
- **qs@6.7.0**: CVE-2022-24999 (Prototype Pollution)

### Why They're Still Vulnerable
The `COPY --from=builder /app/node_modules` copies the vulnerable packages
to the runtime image, even though the base image is different.
