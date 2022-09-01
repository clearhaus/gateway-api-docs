---
title: "Accounts_and_keys"
date: 2022-04-12T13:56:31+02:00
anchor: "accounts_and_keys"
weight: 30
---
## Accounts and keys
There are two types of accounts:

- A merchant account belongs to a merchant.
- A partner account belongs to you, i.e. a partner being tech-wise integrated into the transaction API.

Merchant accounts can process transactions whereas partner accounts cannot.

An API key (UUIDv4) points to an account (either a merchant account or a partner account). An account can have multiple API keys pointing to it; this allows for easy rolling of API keys. A merchant account usually uses one API key.

API keys can have an expire date. API keys can be enabled or disabled. For merchant accounts, these details can be observed in the Clearhaus Dashboard.

A partner account API key can be a signing API key, meaning that it has a verification key for verifying request signatures. This verification key is the public part of an RSA key pair; the RSA key pair is generated by the partner. The public part, the verification key, is communicated to Clearhaus during the technical integration.

Only partner accounts have signing API keys.