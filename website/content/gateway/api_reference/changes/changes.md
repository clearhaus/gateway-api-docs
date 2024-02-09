---
title: "changes"
date: 2022-04-13T12:37:22+02:00
anchor: "changes"
weight: 220
---
## Changes

Follow coming changes on the [source code repository](https://github.com/clearhaus/gateway-api-docs).

Sorted by descending timestamp.

#### Addition of `sca_exemption` parameter
Starting 2024-02-09, the `sca_exemption` parameter is available for
authorizations and debits.

#### Addition of `3dsecure` sub-dictionary to `googlepay` payment method
Starting 2023-12-11, 3-D Secure authentication details can be added to a Google
Pay authorization and debit.

#### Addition of marketplace interregional retailer indicator to captures and capture refunds
A `marketplace` concept has been added to captures and capture refunds. The
`marketplace[interregional_retailer]` parameter is required if the merchant is
a marketplace.

#### Addition of recipient to debits
The `recipient` concept has been added to debits. The
`recipient[account_number]` and `recipient[name]` parameters are now required
for merchant accounts with Business Application Identifier (BAI)
Account-to-Account (AA) from 2023-07-31.

#### Removal of deprecated parameters
We are removing several parameters that have been deprecated for an extended
period of time. We promise that the following parameters are functional until
2023-05-01T00:00:00Z but give no guarantees thereafter.

* Request parameter `recurring`. Please use `series[]` instead.
* Request parameters `card[pares]`, `mobilepayonline[pares]` and
  `[3dsecure][v1]` since 3DSv1 is being fully sunset 2023-04-15.
* Response parameter `threed_secure`, since 3DSv1 is being sunset fully on 2023-04-15.

#### Icelandic Krona (ISK) exponent change
ISK changes exponent from 2 to exponent 0.
Transactions in ISK will be declined between 2023-04-13T19:00:00Z (Thursday
evening) and 2023-04-17T08:00:00Z (Monday morning) (both inclusive); before this
timespan, the exponent is 2; after the timespan, the exponent is 0.

#### Debits and debit refunds resources added
Starting 2023-02-01, [debits](#debits) and [debit refunds](#debit_refunds) resources are available.

#### Croatian Kuna (HRK) changes to Euro (EUR)
Due to the [accession of Croatia to the euro area on
2023-01-01](https://www.ecb.europa.eu/press/pr/date/2022/html/ecb.pr220712~b97dd38de3.en.html),
HRK will become an invalid currency. Please notice the deadlines communicated in
the partner bulletin of Q4 2022.

#### Deprecation and phase-out of 3-D Secure version 1
Both Visa and Mastercard are phasing out 3-D Secure version 1 (3DSv1) in favour
of 3-D Secure version 2 (3DSv2). As a consequence, we are deprecating 3DSv1
which will effectively stop working with schemes mid-October; 2022-10-18 for
Mastercard and 2022-10-14 for Visa. The `[3dsecure][v1]` authentication method
and the `[pares]` parameters will be removed any time after 2022-10-18.

#### Payment method for token frameworks
The payment method `token` has been added on 2022-10-07.
Please see [Method: token](#method-token) for an introduction.

#### Change SLL currency to SLE
The currency SLL has been changed to SLE on 2022-10-07.

#### Accept travel data
[Travel data](#travel-data) can be [supplied for a capture](#captures) as of 2022-02-11.
