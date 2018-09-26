# <img alt="Mockman" width="150" height="150" src="http://orhcxc3kd.bkt.clouddn.com/256x256.png"/>

> `Mockman` is a powerful and convenient tool that helps you to manage and start mock servers locally.
> 
> With the app, you can easily configure the routes, request format and response of a mock server

## Screenshots

![Mockman](http://orhcxc3kd.bkt.clouddn.com/mockman-main.png)

## Features

> None

## Todos

### Server

- [x] ipcMain && ipcRender communication
- [x] dababase support
- [x] create a new mock
- [x] update a mock
- [x] remove a mock
- [x] query a mock info
- [x] create an api
- [x] update an api
- [x] remove an api
- [x] query an api info
- [x] start an express server with a mock config
- [ ] handle errors while starting the server

### Client

- [x] brand header dislay
- [x] mock sider display
- [x] mock-detail and api-list display
- [x] api-detail display
- [x] create a new mock
- [x] update a mock
- [x] remove a mock
- [x] query a mock info
- [x] create an api
- [x] update an api
- [x] remove an api
- [x] query an api info
- [x] request params check list
- [x] response k-v input group
- [x] response code editor
- [ ] add blur event to jsonEditor
- [ ] group the apis with tag
- [ ] check the conflict of all mocks



## License

[![license](https://img.shields.io/github/license/lancegin/mockman.svg)]()

## Contribute

### Dev

``` bash
# install dependencies
yarn

# rebuild sqlite3 
yarn run rebuild # !!!!!important!!!!!

# serve with hot reload at localhost:9080
yarn run dev 

# run unit tests
yarn test 

# lint all JS/Vue component files in `src/`
yarn run lint 

```

### Build

``` bash
# install native dependencies through `native.sh`
./native.sh

# serve with hot reload at localhost:9080
npm run dev 

# build mockman
npm run build

# run unit tests
npm test 

# lint all JS/Vue component files in `src/`
npm run lint 

```

---
