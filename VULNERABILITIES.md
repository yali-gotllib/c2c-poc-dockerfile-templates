# Known Vulnerabilities

This repository intentionally uses vulnerable dependencies for security testing purposes.

## Base Image: node:14-alpine

Node.js 14 reached End-of-Life on April 30, 2023. The base image contains multiple known CVEs:

### Node.js CVEs
- **CVE-2023-32002** - Permission Model bypass via Module._load (High)
- **CVE-2023-32006** - Permission Model bypass via Module.constructor.prototype.require (High)
- **CVE-2023-32559** - Permissions bypass via process.binding (High)
- **CVE-2023-30590** - HTTP header manipulation vulnerability (Medium)
- **CVE-2023-30589** - HTTP Request Smuggling (Medium)
- **CVE-2023-30581** - mainModule.__proto__ bypass of experimental policy mechanism (High)

### Alpine Linux CVEs
- **CVE-2022-48174** - BusyBox ash vulnerability (Critical)
- **CVE-2023-42363** - Use-after-free in awk (Medium)
- **CVE-2023-42364** - Use-after-free in awk (Medium)
- **CVE-2023-42365** - Use-after-free in awk (Medium)

## NPM Dependencies

### lodash 4.17.20
- **CVE-2021-23337** - Command Injection in lodash (High)
- **CVE-2020-28500** - Regular Expression Denial of Service (ReDoS) (Medium)

### express 4.17.1
- **CVE-2024-29041** - Open redirect vulnerability (Medium)
- **CVE-2022-24999** - Prototype pollution in qs (High)

## Purpose

These vulnerabilities are intentionally included for:
1. Security scanner validation (Wiz C2C PoC)
2. CI/CD pipeline security testing
3. Developer training on vulnerability detection

## Warning

DO NOT use this configuration in production environments.
