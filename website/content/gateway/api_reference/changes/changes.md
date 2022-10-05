---
title: "changes"
date: 2022-04-13T12:37:22+02:00
anchor: "changes"
weight: 220
---
## Changes

Follow coming changes on the [source code repository](https://github.com/clearhaus/gateway-api-docs).

Sorted by descending timestamp

#### Deprecation and phase-out of 3-D Secure version 1
Both Visa and Mastercard are phasing out 3-D Secure version 1 (3DSv1) in favour
of 3-D Secure version 2 (3DSv2). As a consequence, we are deprecating 3DSv1
which will effectively stop working with schemes mid-October; 2022-10-18 for
Mastercard and 2022-10-14 for Visa. The `[3dsecure][v1]` authentication method
and the `[pares]` parameters will be removed any time after 2022-10-18.

#### Accept travel data
[Travel data](#travel-data) can be [supplied for a capture](#captures) as of 2022-02-11.


#### Removing VES from supported currencies
The currency VES will not be supported after 2021-10-01T04:00:00Z.


#### Update authorization parameters
Replace `recurring` with `series[type]=recurring` and add `series[previous]` as a way of pointing to the previous-in-series authorization (either via a Clearhaus authorization ID or via raw scheme values).

Add also two optional parameters `credential_on_file` and `initiator` to allow for explicitly specifying if credential on file is being stored or used, and if the transaction is merchant or cardholder initiated.


#### Support for multiple signatures removed
Support for multiple signatures for request signing will be removed any time after 2020-10-31.

#### 3-D Secure version 2 supported
Starting 2020-07-08 support for 3-D Secure version 2 has been added. See 3-D Secure and Authentication: [3dsecure].


#### Deprecate `threed_secure` response element
The response element `threed_secure` is now deprecated; it will be available at least until 2021-02-15.

#### Optional name on card parameter added

Starting 2020-03-03 the optional parameter `card[name]` may be used to provide the name on the card for credits. Depending on card scheme and merchant category, the name might be necessary for approval.

#### Request signing becomes mandatory
In the first quarter of 2020 signing of POST requests will become mandatory. We will work together with clients to ensure their requests are compliant before introducing enforcement of the requirement in the transaction gateway.
