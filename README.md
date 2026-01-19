### Gateway API documentation

Build the Docker image:

```shell
./build/build.sh
```

Serve locally:

```shell
./build/start.sh
```

Some files are statically made when starting the Hugo server.
- `.js` files
- `.css` files

To update these files run:
```shell
docker exec -it gateway-api-docs yarn update_build
```
