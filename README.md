# custos-demo-gateway

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Docker build

```
docker build -t apachecustos/emcenter-gateway-portal . 
docker push apachecustos/emcenter-gateway-portal

ssh airavata@scigap09.sciencegateways.iu.edu 

docker-compose down
docker image rm apachecustos/emcenter-gateway-portal
docker-compose up -d
```