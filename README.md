# <img alt="Mockman" width="150" height="150" src="http://orhcxc3kd.bkt.clouddn.com/256x256.png"/>

[中文文档](./README_zh.md)

![](https://img.shields.io/github/repo-size/lancegin/mockman.svg)
![](https://img.shields.io/github/release/lancegin/mockman.svg)
![](https://img.shields.io/github/last-commit/lancegin/mockman.svg)
[![Build Status](https://travis-ci.org/LanceGin/Mockman.svg?branch=master)](https://travis-ci.org/LanceGin/Mockman)
[![Build status](https://ci.appveyor.com/api/projects/status/9hktw5nvhbh44wtm?svg=true)](https://ci.appveyor.com/project/LanceGin/mockman)

> `Mockman` is a powerful and convenient tool that helps you to manage and start mock servers locally.
> 
> With the app, you can easily configure the routes, request format and response of a mock server

## Screenshot

![Mockman](https://i.loli.net/2018/11/03/5bdd4dd2bf440.png)
![Logger](https://i.loli.net/2018/11/03/5bdd4deac142f.png)

## Usage

![Feature](http://orhcxc3kd.bkt.clouddn.com/mockman-preview.jpg)

1. Create your mock server - `click the add button`
2. Configure the `name`, `port` and `prefix` of your move server, make sure the port is not in use, or Mockman will give you a error notification.
3. Add some apis for your mock server.
4. Configure the `method`, `route`, `response code`, `latency`, `required request options` and `reponse data` of each api.
5. Start the server - `click the start button`.
6. After all, you can test your api locally.

> Where will your api data be stored?
> 
> > Your data will be stored as a `sqlite file` absolutely on your local, the path will be different on different operation system. 
> 
> > * `%APPDATA%`  for Windows
> > * `$XDG_CONFIG_HOME or ~/.config` for Linux
> > * `~/Library/Application Support` for macOS
> 
> Be attention before you start https server
> 
> > * Mockman is using `self-signed-certification` to create https server
> > * Install [rootCA](https://github.com/LanceGin/Mockman/releases/download/1.0.5/rootCA.pem) on your client and trust it before you send https requests
> 

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
- [x] handle errors while starting the server

### Client

- [x] brand header display
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
- [x] add blur event to jsonEditor
- [x] add a log panel to show the logs of an active mock server process
- [x] add https support
- [ ] group the apis with tag
- [ ] check the conflict of all mocks
- [ ] Export/Import mock or api configurations



## License

[![license](https://img.shields.io/github/license/lancegin/mockman.svg)]()

## Contribute

``` bash
# install the dependencies 
npm install

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
