---
title: "Signing_requests"
date: 2022-04-12T14:29:19+02:00
anchor: "signing-requests"
weight: 35
---

## Signing requests

POST requests must be signed. Other requests can optionally be signed.

The signature is an RSA signature of the HTTP body; it is represented in hex. The partner account is identified by the partner’s signing API key. Both the partner’s signing API key and the RSA signature must be provided in a {{% highlight_text %}} Signature {{% /highlight_text %}}  header together with {{% highlight_text %}} RS256-hex {{% /highlight_text %}}:
```
Signature: <partner-signing-api-key> RS256-hex <signature>
```

{{% notice %}}**Notice:** If the signature header is included, it must hold a correct signature, otherwise the transaction will fail.{{% /notice %}}
