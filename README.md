# C2C PoC Dockerfile Templates

This repository contains intentionally vulnerable Dockerfile templates for security testing and Wiz Code-to-Cloud (C2C) proof of concept demonstrations.

## Purpose

This repository is designed to:
- Validate Wiz vulnerability scanning capabilities
- Test CI/CD security pipeline integration
- Demonstrate detection of known CVEs in container images
- Provide training materials for security teams

## Contents

### templates/app/
A simple Node.js application with known vulnerabilities:
- **Base Image**: `node:14-alpine` (EOL, contains multiple CVEs)
- **Dependencies**: Outdated versions of express and lodash with known vulnerabilities

## Usage

```bash
cd templates/app
docker build -t c2c-poc-app .
docker run -p 3000:3000 c2c-poc-app
```

## Security Notice

**WARNING**: This repository intentionally contains vulnerable code and dependencies. 

- DO NOT deploy to production
- DO NOT use as a template for real applications
- Use ONLY for security testing and training purposes

## Known Vulnerabilities

See [VULNERABILITIES.md](./VULNERABILITIES.md) for a complete list of known CVEs.

## License

For internal security testing only.
