<template>
  <el-container>
    <el-header class="button-group">
      <div class="brand">
        <img src="../assets/logo.png">
        <p>Mockman</p>
      </div>
      <div class="feature">
        <el-button size="small">Import</el-button>
        <el-button size="small">Export</el-button>
        <el-button size="small">Docs</el-button>
        <el-button size="small">Feedback</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside class="mocks">
        <div class="mock-list">
          <div class="mock-item">
            <el-button circle>M</el-button>
          </div>
          <div class="mock-item">
            <el-button circle>O</el-button>
          </div>
          <div class="mock-item">
            <el-button circle>C</el-button>
          </div>
          <div class="mock-item">
            <el-button circle>K</el-button>
          </div>
          <div class="mock-item">
            <el-button circle>M</el-button>
          </div>
          <div class="mock-item">
            <el-button circle>A</el-button>
          </div>
          <div class="mock-item">
            <el-button circle>N</el-button>
          </div>
        </div>
        <div class="add-btn">
          <el-button class="add-btn" icon="el-icon-plus" circle></el-button>
        </div>
      </el-aside>
      <el-aside class="apis">
        <div class="mock-info">
          <div>
            <el-input value="MockServer" class="mock-name" placeholder="Server Name"></el-input>
            <el-button type="text" icon="el-icon-caret-right"></el-button>
          </div>
          <div>
            <span class="host">localhost :</span>
            <el-input value="3001" class="port" placeholder="Port"></el-input>
            <span class="sign">/</span>
            <el-input value="" class="prefix" placeholder="Prefix"></el-input>
          </div>
        </div>
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item name="1">
            <template slot="title">
              <i class="header-icon el-icon-menu"></i><span style="margin-left: 5px">Tag-01</span>
            </template>
            <div class="sub-req">
              <span class="req-type get">GET</span>
              <span class="req-route">/mockman</span>
            </div>
            <div class="sub-req">
              <span class="req-type delete">DELETE</span>
              <span class="req-route">/mockman</span>
            </div>
            <div class="sub-req">
              <span class="req-type post">POST</span>
              <span class="req-route">/mockman</span>
            </div>
          </el-collapse-item>
          <el-collapse-item name="2">
            <template slot="title">
              <i class="header-icon el-icon-menu"></i><span style="margin-left: 5px">Tag-02</span>
            </template>
            <div class="sub-req">
              <span class="req-type put">PUT</span>
              <span class="req-route">/mockman</span>
            </div>
            <div class="sub-req">
              <span class="req-type patch">PATCH</span>
              <span class="req-route">/mockman</span>
            </div>
            <div class="sub-req">
              <span class="req-type options">OPTIONS</span>
              <span class="req-route">/mockman</span>
            </div>
          </el-collapse-item>
        </el-collapse>
        <div class="single-req">
          <span class="req-type get">GET</span>
          <span class="req-route">/mockman</span>
        </div>
        <div class="single-req">
          <span class="req-type post">POST</span>
          <span class="req-route">/mockman</span>
        </div>
        <div class="single-req">
          <span class="req-type delete">DELETE</span>
          <span class="req-route">/mockman</span>
        </div>
      </el-aside>
      <el-container>
        <el-main>Api Details</el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        activeNames: ['1'],
      };
    },
    methods: {
      handleChange(val) {
        console.log(val);
      },
    },
  };
</script>

<style>
  /* common style */
  body {
    margin: 0;
  }

  .el-container {
    height: 100%;
  }

  .el-header.button-group {
    height: 50px !important;
    background-color: #464646;
    color: #fff;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37);
    line-height: 50px;
    text-align: right;
  }
  .brand img {
    float: left;
    width: 30px;
    margin-top: 10px;
  }
  .brand p {
    float: left;
    margin: 0;
    margin-left: 10px;
  }
  .feature {
    font-size: 12px;
  }
  .feature .el-button {
    background: #5B5B5B;
    color: #fff;
    border: 0;
    transition: background .25s ease;
  }
  .feature .el-button:hover {
    background: #6E6E6E;
  }
  
  .el-aside {
    color: #333;
  }

  .el-aside.mocks {
    text-align: center;
    background: #202225;
    width: 70px !important;
    overflow-y: scroll;
  }
  .el-aside.mocks .mock-list {
    margin-top: 20px;
  }
  .el-aside.mocks .mock-item {
    height: 60px;
  }
  .el-aside.mocks .mock-item .el-button {
    width: 50px;
    height: 50px;
    border: 0;
    background: #2f3136;
    color: #fff;
    font-size: 16px;
    font-weight: 300;
    transition: border-radius .25s ease, background .25s ease;
  }
  .el-aside.mocks .mock-item .el-button:hover {
    background: rgb(114, 137, 218);
    border-radius: 15px;
  }
  .el-aside.mocks .add-btn .el-button {
    width: 50px;
    height: 50px;
    border: 1px dashed #535559;
    background: transparent;
    color: #535559;
    font-size: 22px;
    font-weight: 300;
    transition: border-color .25s ease,color .25s ease;
  }
  .el-aside.mocks .add-btn .el-button:hover {
    border: 1px dashed #fff;
    color: hsla(0,0%,100%,.75);
    background: transparent;
  }

  .el-aside.apis {
    background: #2f3136;
    width: 260px !important;
  }
  .el-aside.apis .mock-info {
    box-shadow: 0 1px 0 rgba(0,0,0,.2), 0 2px 0 rgba(0,0,0,.06);
    box-sizing: border-box;
    color: #fff;
    text-align: right;
    padding: 0 10px;
  }
  .el-aside.apis .mock-info .el-button--text {
    padding: 0;
    font-size: 20px;
    color: #67c23a;
  }
  .el-aside.apis .mock-info div {
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    color: #c0c3cb;
  }
  .el-aside.apis .mock-info div:first-child {
    border-bottom: 1px solid #36393f;
  }
  .el-aside.apis .mock-info div .mock-name {
    float: left;
    width: 160px;
  }
  .el-aside.apis .mock-info div .mock-name .el-input__inner {
    background: transparent;
    border: 0;
    height: 50px;
    line-height: 50px;
    padding: 0;
    color: #c0c3cb;
  }
  .el-aside.apis .mock-info div .mock-name .el-input__inner::-webkit-input-placeholder {
    color: #72767d;
  }
  .el-aside.apis .mock-info div .host,
  .el-aside.apis .mock-info div .port,
  .el-aside.apis .mock-info div .sign,
  .el-aside.apis .mock-info div .prefix {
    float: left;
  }
  .el-aside.apis .mock-info div .host,
  .el-aside.apis .mock-info div .sign {
    cursor: default;
  }
  .el-aside.apis .mock-info div .sign {
    display: inline-block;
    padding: 0 5px;
  }
  .el-aside.apis .mock-info div .port {
    width: 50px;
  }
  .el-aside.apis .mock-info div .port .el-input__inner {
    padding: 0 2px;
    background: transparent;
    border: 0;
    color: #c0c3cb;
  }
  .el-aside.apis .mock-info div .port .el-input__inner::-webkit-input-placeholder {
    color: #72767d;
  }
  .el-aside.apis .mock-info div .prefix {
    width: 80px;
  }
  .el-aside.apis .mock-info div .prefix .el-input__inner {
    padding: 0 2px;
    background: transparent;
    border: 0;
    color: #c0c3cb;
  }
  .el-aside.apis .mock-info div .prefix .el-input__inner::-webkit-input-placeholder {
    color: #72767d;
  }
  .el-aside.apis .el-collapse {
    padding-left: 10px;
    padding-right: 10px;
    border: 0;
  }
  .el-aside.apis .el-collapse .el-collapse-item .el-collapse-item__header {
    background: transparent;
    color: #72767d;
    height: 30px;
    line-height: 30px;
    border-bottom: 0;
    transition: color .25s ease;
  }
  .el-aside.apis .el-collapse .el-collapse-item .el-collapse-item__header:hover {
    color: #B9BBBE;
  }
  .el-aside.apis .el-collapse .el-collapse-item .el-collapse-item__arrow {
    line-height: 30px;
  }
  .el-aside.apis .el-collapse .el-collapse-item .el-collapse-item__wrap {
    background: transparent;
    border-bottom: 0;
  }
  .el-aside.apis .el-collapse .el-collapse-item .el-collapse-item__content {
    color: #fff;
    padding-bottom: 0;
  }
  .el-aside.apis .el-collapse .el-collapse-item .sub-req {
    height: 30px;
    line-height: 30px;
    padding-left: 10px;
    padding-right: 10px;
    transition: background .25s ease;
  }
  .el-aside.apis .el-collapse .el-collapse-item .sub-req:hover {
    background: rgba(79,84,92,.6);
    cursor: pointer;
  }
  .el-aside.apis .el-collapse .el-collapse-item .sub-req .req-type {
    display: inline-block;
    width: 60px;
    color: #72767d;
  }
  .el-aside.apis .el-collapse .el-collapse-item .sub-req .req-route {
    color: #72767d;
  }
  .el-aside.apis .single-req {
    height: 30px;
    line-height: 30px;
    color: #72767d;
    font-size: 13px;
    padding-left: 10px;
    padding-right: 10px;
    transition: background .25s ease;
  }
  .el-aside.apis .single-req:hover {
    background: rgba(79,84,92,.6);
    cursor: pointer;
  }
  .el-aside.apis .single-req .req-type {
    display: inline-block;
    width: 60px;
    color: #72767d;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  /* request type color */
  .req-type.get {
    color: rgb(114, 137, 218) !important;
  }
  .req-type.post {
    color: #49cc90 !important;
  }
  .req-type.delete {
    color: #f93e3e !important;
  }
  .req-type.put {
    color: #fca130 !important;
  }
  .req-type.patch {
    color: #50e3c2 !important;
  }
  .req-type.options {
    color: #50e3c2 !important;
  }
  
</style>
