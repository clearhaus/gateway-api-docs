---
title: "test-card-numbers"
date: 2022-04-13T12:37:22+02:00
anchor: "test-card-numbers"
weight: 210
---
## Test card numbers

For testing towards the test endpoint `gateway.test.clearhaus.com` please use PANs that are either **not** [Luhn-compliant](https://en.wikipedia.org/wiki/Luhn_algorithm), are one of the special test PANs 2221000000000009, 4111111111111111, 5000000000000004, or are Apple Pay test cards.

For PANs starting with 420000 and ending with 0000, and PANs starting with 555555 and ending with 4444, you can specify a valid status `code` as transaction amount to trigger the status; any other transaction amount will result in 40110.

When testing towards the test endpoint, the CSC 987—and only 987—is considered a match for all PANs.
