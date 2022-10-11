---
title: "Transaction status codes table"
date: 2022-04-13T12:37:22+02:00
anchor: "transaction-status-codes-table"
weight: 195
---
| Status   | code  | Meaning                            | Auth | Capture | Refund | Void | Credit |
| -------- | ----- | ---------------------------------- | ---- | ------- | ------ | ---- | ------ |
| Approved | 20000 | Approved                           | ✓    | ✓       | ✓      | ✓    | ✓      |
| Declined | 40000 | General input error                | ✓    | ✓       | ✓      | ✓    | ✓      |
|          | 40110 | Invalid card number                | ✓    |         |        |      | ✓      |
|          | 40111 | Unsupported card scheme            | ✓    |         |        |      | ✓      |
|          | 40120 | Invalid CSC                        | ✓    |         |        |      |        |
|          | 40130 | Invalid expire date                | ✓    |         |        |      | ✓      |
|          | 40135 | Card expired                       | ✓    |         |        |      | ✓      |
|          | 40140 | Invalid currency                   | ✓    |         |        |      | ✓      |
|          | 40150 | Invalid text on statement          | ✓    | ✓       | ✓      |      | ✓      |
|          | 40200 | Clearhaus rule violation           | ✓    | ✓       | ✓      | ✓    | ✓      |
|          | 40300 | 3-D Secure problem                 | ✓    |         |        |      |        |
|          | 40310 | 3-D Secure authentication failure  | ✓    |         |        |      |        |
|          | 40400 | Backend problem                    | ✓    |         |        | ✓    | ✓      |
|          | 40410 | Declined by issuer or card scheme  | ✓    |         |        | ✓    | ✓      |
|          | 40411 | Card restricted                    | ✓    |         |        |      | ✓      |
|          | 40412 | Card lost or stolen                | ✓    |         |        |      | ✓      |
|          | 40413 | Insufficient funds                 | ✓    |         |        |      | ✓      |
|          | 40414 | Suspected fraud                    | ✓    |         |        |      | ✓      |
|          | 40415 | Amount limit exceeded              | ✓    |         |        |      | ✓      |
|          | 40416 | Additional authentication required | ✓    |         |        |      | ✓      |
|          | 40420 | Merchant blocked by cardholder     | ✓    |         |        |      | ✓      |
|          | 50000 | Clearhaus error                    | ✓    | ✓       | ✓      | ✓    | ✓      |
