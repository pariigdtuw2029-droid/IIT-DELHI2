# Sentinel-SDK Member 1 Documentation

## 1. Overview
**Role:** ArmorClaw + Governance + Architecture Lead  
**Responsibilities:**  
- Define policies  
- Implement enforcement logic  
- Integrate ArmorClaw SDK  
- Ensure structured intents are validated and blocked if necessary  

This documentation explains how the Sentinel-SDK policy is loaded, evaluated, and enforced.

---

## 2. Intent Model
**Intents** are structured JSON objects that describe the requested action by any agent. Example:

```json
{
  "toolName": "send_payment",
  "directory": "src",
  "amount": 2000
}