### Developer documentation

```shell
# build the docker image
docker build -t gateway-api-docs --file build/Dockerfile . 
```

```shell
# serve locally
docker run --rm -it \
--name gateway-api-docs \
-p 1313:1313 \
-v $PWD:/opt/clearhaus/gateway-api-docs \
gateway-api-docs
```

Some files a statically made when starting the hugo server.
- `.js` files
- `.css` files

To update these files run:
```shell
docker exec -it gateway-api-docs yarn update_build 
```
