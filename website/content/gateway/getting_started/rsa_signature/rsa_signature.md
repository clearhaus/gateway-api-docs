---
title: "Rsa_signature"
date: 2022-04-12T14:46:29+02:00
anchor: "rsa-signature"
weight: 40
---
#### RSA signature
The RSA signature is an {{% highlight_text %}} RSASSA-PKCS1-v1_5 v{{% /highlight_text %}} signature of the body. It is represented in hex.

If the signing API key is {{% highlight_text %}}4390aec7-f76a-4c2f-8597-c87c2d06cb4f {{% /highlight_text %}}, the signing private key (in PEM format) is

```
-----BEGIN RSA PRIVATE KEY-----
MIIBOwIBAAJBALYK0zmwuYkH3YWcFNLLddx5cwDxEY7Gi1xITuQqRrU4yD3uSw+J
WYKknb4Tbndb6iEHY+e6gIGD+49TojnNeIUCAwEAAQJARyuYRRe4kcBHdPL+mSL+
Y0IAGkAlUyKAXYXPghidKD/v/oLrFaZWALGM2clv6UoYYpPnInSgbcud4sTcfeUm
QQIhAN2JZ2qv0WGcbIopBpwpQ5jDxMGVkmkVVUEWWABGF8+pAiEA0lySxTELZm8b
Gx9UEDRghN+Qv/OuIKFldu1Ba4f8W30CIQCaQFIBtunTTVdF28r+cLzgYW9eWwbW
pEP4TdZ4WlW6AQIhAMDCTUdeUpjxlH/87BXROORozAXocBW8bvJUI486U5ctAiAd
InviQqJd1KTGRDmWIGrE5YACVmW2JSszD9t5VKxkAA==
-----END RSA PRIVATE KEY-----
```
and the body is
```
amount=2050&currency=EUR&ip=1.1.1.1&card[pan]=4111111111111111&card[expire_month]=06&card[expire_year]=2022&card[csc]=123
```
then the {{% highlight_text %}} Signature {{% /highlight_text %}} header should be
```
Signature: 4390aec7-f76a-4c2f-8597-c87c2d06cb4f RS256-hex 7ae0e14d35b2a15a7ff812a1899d7f0a5d28063f0c276081876a51fc3773f499459f944f8b57c6e0e76b47c218b20ebaad7c6250dcd1804dd19c87fb7f1216ba
```
In Ruby, you can calculate the {{% highlight_text %}} RS256 {{% /highlight_text %}} hex signature using
```ruby
key = OpenSSL::PKey::RSA.new(key_in_pem_string)
key.sign(OpenSSL::Digest.new('sha256'), body).unpack('H*').first
```
