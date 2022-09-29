---
title: "Status message"
date: 2022-04-13T12:37:22+02:00
anchor: "status-message"
weight: 200
---
#### Status messages

A status message may be included in the response when you create a new transaction. The status message can be used for debugging and may include a more specific error message.

Status messages should be shown to the merchant.

Examples:

```json
{
    "status": {
        "code": 40000,
        "message": "parameter 'amount' is required"
    }
}

{
    "status": {
        "code": 40200,
        "message": "amount > 100 EUR and (not strongly authenticated)"
    }
}

{
    "status": {
        "code": 40200,
        "message": "not (fully 3dsecure or subsequent recurring)"
    }
}
```
