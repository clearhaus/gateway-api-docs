### Gateway API documentation

Build the Docker image:

```shell
docker build -t gateway-api-docs --file build/Dockerfile . 
```

Serve locally:

```shell
docker run --rm -it \
  --name gateway-api-docs \
  -p 1313:1313 \
  -v $PWD:/opt/clearhaus/gateway-api-docs \
  gateway-api-docs
```

Some files are statically made when starting the Hugo server.
- `.js` files
- `.css` files

To update these files run:
```shell
docker exec -it gateway-api-docs yarn update_build 
```
