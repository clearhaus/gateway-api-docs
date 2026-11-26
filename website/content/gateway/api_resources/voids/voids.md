---
title: "Voids"
date: 2022-04-13T12:37:22+02:00
anchor: "voids"
weight: 275
---
## Voids
To release reserved money on a cardholder’s bank account you make a new void resource. A reservation usually lasts for at least seven days depending on the issuing bank and is then automatically released.
```shell
POST https://gateway.clearhaus.com/authorizations/:id/voids
```
##### Parameters
No parameters are needed to make a new void transaction.

{{% notice %}}
**Notice**: A void cannot be made if the authorization age is 30 days or more. 
{{% /notice %}}
