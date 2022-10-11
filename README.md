### Gateway API documentation

Build the Docker image:

```shell
./build/build.sh
```

Serve locally:

```shell
docker run --rm -it \
  --name gateway-api-docs \
  -p 1313:1313 \
  -v $PWD:/opt/clearhaus/gateway-api-docs \
  clearhaus/gateway-api-docs bash ./build/start.sh
```

Some files are statically made when starting the Hugo server.
- `.js` files
- `.css` files

To update these files run:
```shell
docker exec -it gateway-api-docs yarnpkg update_build
```
