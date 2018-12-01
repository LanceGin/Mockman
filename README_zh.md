# <img alt="Mockman" width="150" height="150" src="http://orhcxc3kd.bkt.clouddn.com/256x256.png"/>

[README](./README.md)

![](https://img.shields.io/github/repo-size/lancegin/mockman.svg)
![](https://img.shields.io/github/release/lancegin/mockman.svg)
![](https://img.shields.io/github/last-commit/lancegin/mockman.svg)
[![Build Status](https://travis-ci.org/LanceGin/Mockman.svg?branch=master)](https://travis-ci.org/LanceGin/Mockman)
[![Build status](https://ci.appveyor.com/api/projects/status/9hktw5nvhbh44wtm?svg=true)](https://ci.appveyor.com/project/LanceGin/mockman)

> `Mockman` 是一款强大且方便的用来本地开启和管理Mock服务的跨平台开源工具
> 
> 凭借Mockman，你只需要简单的配置Mock服务的本地运行端口、路由、请求格式以及返回数据，即可开启自己的Mock服务

## 截图

![Mockman](https://i.loli.net/2018/11/03/5bdd4dd2bf440.png)
![Logger](https://i.loli.net/2018/11/03/5bdd4deac142f.png)

## 使用

![Feature](http://orhcxc3kd.bkt.clouddn.com/mockman-preview.jpg)

1. 创建一个Mock服务 - `点击添加按钮`
2. 配置Mock服务的`名字`、`端口`以及`通用前缀`，注意端口不能被占用，否则开启服务的过程中应用会有错误通知
3. 给Mock服务创建一系列api接口
4. 配置每个api的`请求方式`，`路由地址`，`http响应码`，`延时时间`，`请求格式`以及`返回数据`
5. 启动服务 - `点击绿色箭头`
6. 至此，服务启动成功，即可请求Mock数据

> Mock服务的api数据将会存储在哪？
> 
> > 所有数据都将会在完全在本地以`sqlite`的形式进行存储，存储的地址因平台不同而不同：
> 
> > * `%APPDATA%`  for Windows
> > * `$XDG_CONFIG_HOME or ~/.config` for Linux
> > * `~/Library/Application Support` for macOS
> 
> 关于https需要注意的点
> 
> > * Mockman的https服务使用的是`自签名证书`
> > * 在客户端请求mockman的https服务之前，需要安装[根证书](https://github.com/LanceGin/Mockman/releases/download/1.0.5/rootCA.pem)并信任
> 

## Todos

### 主进程

- [x] 主进程以及渲染进程间ipc通信
- [x] 本地数据库支持
- [x] 创建mock服务
- [x] 更新mock服务
- [x] 删除mock服务
- [x] 获取mock服务信息
- [x] 创建api
- [x] 更新api
- [x] 删除api
- [x] 获取api信息
- [x] 基于mock服务的配置开启本地服务（express）
- [x] 启动express服务中处理错误

### 渲染进程

- [x] 公用header
- [x] mock服务显示边栏
- [x] mock服务详情以及api列表显示边栏
- [x] api详情显示
- [x] 创建mock服务
- [x] 更新mock服务
- [x] 删除mock服务
- [x] 获取mock服务信息
- [x] 创建api
- [x] 更新api
- [x] 删除api
- [x] 获取api信息
- [x] 请求参数checkbox
- [x] 返回数据key-value键值对
- [x] http响应码编辑
- [x] jsonEditor组件暴露blur事件
- [x] 添加日志面板显示已开启的mock服务的请求日志
- [x] 增加https支持
- [ ] 通过标签给api进行分类
- [ ] 检查所有mock服务的冲突
- [ ] 导出/导入mock或者api配置



## 协议

[![license](https://img.shields.io/github/license/lancegin/mockman.svg)]()

## 贡献

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
