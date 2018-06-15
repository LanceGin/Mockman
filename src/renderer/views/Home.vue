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
          <div class="mock-item" v-for="mock in mocks">
            <el-tooltip :content="mock.content" placement="right" :visible-arrow="false">
              <el-button circle>{{ mock.name }}</el-button>
            </el-tooltip>
          </div>
        </div>
        <div class="add-btn">
          <el-tooltip content="New Mock Server" placement="right" :visible-arrow="false">
            <el-button class="add-btn" icon="el-icon-plus" circle></el-button>
          </el-tooltip>
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
        <div>
          <div class="api-header">
            <span class="note">Api</span>
            <el-button type="text" icon="el-icon-plus"></el-button>
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
        </div>
      </el-aside>
      <el-container>
        <el-main class="api-detail">
          <div class="api-info">
            <div>
              <el-dropdown trigger="click" placement="bottom" class="type" @command="handleReqType">
                <span class="el-dropdown-link">
                  {{ apiDetails.method.toUpperCase() }}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" class="http-method">
                  <el-dropdown-item v-for="item in httpMethod" :command="item.command">{{ item.name }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <span class="sign">/</span>
              <el-input :value="apiDetails.path" class="path" placeholder="path"></el-input>
              <el-dropdown trigger="click" placement="bottom" class="status" @command="handleResCode">
                <span class="el-dropdown-link">
                  {{ apiDetails.resCode }}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" class="res-code">
                  <el-dropdown-item v-for="item in resCode" :command="item.command">{{ item.command }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <span class="time-title">TIME</span>
              <el-input
                placeholder="0"
                class="time"
                :value="apiDetails.latency">
              </el-input>
              <span>ms</span>
            </div>
          </div>
          <div class="req-res">
            <el-tabs v-model="activeHttp" @tab-click="handleHttpClick">
              <el-tab-pane label="REQUEST" name="request" class="request">
                <el-tabs v-model="activeReq" @tab-click="handleReqClick">
                  <el-tab-pane label="Params" name="params" class="params">

                    <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
                      <el-form-item prop="email">
                        <el-input v-model="dynamicValidateForm.email" class="key">
                          <template slot="prepend">
                            <el-checkbox-button size="mini" v-model="checked"><i class="el-icon-circle-check"></i></el-checkbox-button>
                          </template>
                        </el-input>
                        <el-input v-model="dynamicValidateForm.email" class="value">
                          <el-button slot="append" icon="el-icon-close"></el-button>
                        </el-input>
                      </el-form-item>
                      <el-form-item prop="email">
                        <el-input v-model="dynamicValidateForm.email" class="key">
                          <template slot="prepend">
                            <el-checkbox-button size="mini" v-model="checked"><i class="el-icon-circle-check"></i></el-checkbox-button>
                          </template>
                        </el-input>
                        <el-input v-model="dynamicValidateForm.email" class="value">
                          <el-button slot="append" icon="el-icon-close"></el-button>
                        </el-input>
                      </el-form-item>
                      <el-form-item prop="email">
                        <el-input v-model="dynamicValidateForm.email" class="key">
                          <template slot="prepend">
                            <el-checkbox-button size="mini" v-model="checked"><i class="el-icon-circle-check"></i></el-checkbox-button>
                          </template>
                        </el-input>
                        <el-input v-model="dynamicValidateForm.email" class="value">
                          <el-button slot="append" icon="el-icon-close"></el-button>
                        </el-input>
                      </el-form-item>
                      <!-- <el-form-item v-for="(domain, index) in dynamicValidateForm.domains" :label="'域名'" :key="domain.key" :prop="'domains.' + index + '.value'" >
                        <el-input v-model="domain.value"></el-input><el-button @click.prevent="removeDomain(domain)">删除</el-button>
                      </el-form-item> -->
                      <!-- <el-form-item>
                        <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
                        <el-button @click="addDomain">新增域名</el-button>
                        <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
                      </el-form-item> -->
                    </el-form>

                  </el-tab-pane>
                  <el-tab-pane label="Body" name="body">Body</el-tab-pane>
                  <el-tab-pane label="Headers" name="header">Headers</el-tab-pane>
                </el-tabs>
              </el-tab-pane>
              <el-tab-pane label="RESPONSE" name="response">
                <el-tabs v-model="activeRes" @tab-click="handleResClick">
                  <el-tab-pane label="Body" name="body">Body</el-tab-pane>
                  <el-tab-pane label="Cookies" name="cookies">Cookies</el-tab-pane>
                  <el-tab-pane label="Headers" name="header">Headers</el-tab-pane>
                </el-tabs>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
  // import http method
  import httpMethod from '@/utils/http-method';
  import resCode from '@/utils/res-code';

  export default {
    name: 'home',
    data() {
      return {
        activeNames: ['1'],
        mocks: [
          { name: 'M', content: 'MockServer' },
          { name: 'O', content: 'MockServer' },
          { name: 'C', content: 'MockServer' },
          { name: 'K', content: 'MockServer' },
          { name: 'M', content: 'MockServer' },
          { name: 'A', content: 'MockServer' },
          { name: 'N', content: 'MockServer' },
        ],
        httpMethod: null,
        resCode: null,
        activeHttp: 'request',
        activeReq: 'params',
        activeRes: 'body',
        apiDetails: {
          method: 'get',
          path: 'mockman',
          resCode: '200 - OK',
          latency: '0',
          request: {
            params: [{ key: '', required: true }],
            body: [{ key: '', required: true }],
            headers: [{ key: '', required: true }],
          },
          response: {
            body: { type: 'json', value: '' },
            cookies: [{ key: '', value: '' }],
            headers: [{ key: '', value: '' }],
          },
        },
        dynamicValidateForm: {
          domains: [{
            value: '',
          }],
          email: '',
        },
        checked: true,
      };
    },
    mounted() {
      this.httpMethod = httpMethod;
      this.resCode = resCode;
    },
    methods: {
      handleChange(val) {
        console.log(val);
      },
      handleHttpClick(tab, event) {
        console.log(tab, event);
      },
      handleReqClick(tab, event) {
        console.log(tab, event);
      },
      handleResClick(tab, event) {
        console.log(tab, event);
      },
      // handle change http request type
      handleReqType(command) {
        this.apiDetails.method = command;
      },
      // handle change response code
      handleResCode(command) {
        this.apiDetails.resCode = command;
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      removeDomain(item) {
        const index = this.dynamicValidateForm.domains.indexOf(item);
        if (index !== -1) {
          this.dynamicValidateForm.domains.splice(index, 1);
        }
      },
      addDomain() {
        this.dynamicValidateForm.domains.push({
          value: '',
          key: Date.now(),
        });
      },
    },
  };
</script>

<style>
  /* common style */
  body {
    margin: 0;
  }
  .el-tooltip__popper.is-dark {
    background: #000;
  }
  .el-dropdown-menu.el-popper.res-code {
    top: 100px;
    height: calc(100vh - 200px);
    overflow: scroll;
  }
  .el-dropdown-menu.el-popper.http-method .popper__arrow {
    display: none;
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
    background: #33c6c5;
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
  .el-aside.apis .api-header {
    padding: 0 10px;
    text-align: right;
    color: #fff;
    height: 40px;
    line-height: 40px;
  }
  .el-aside.apis .api-header .note {
    color: #72767d;
    font-size: 12px;
    font-weight: 500;
    float: left;
  }
  .el-aside.apis .api-header .el-button {
    color: #72767d;
    font-weight: 500;
    transition: color .25s ease;
  }
  .el-aside.apis .api-header .el-button:hover{
    color: #B9BBBE;
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
    display: block;
    background-color: #36393e;
    color: #fff;
    padding: 0 0;
  }
  .el-main.api-detail .api-info {
    text-align: right;
    padding: 0 20px;
  }
  .el-main.api-detail .api-info div {
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    color: #c0c3cb;
  }
  .el-main.api-detail .api-info div:first-child {
    border-bottom: 1px solid #45474b;
  }
  .el-main.api-detail .api-info div .type,
  .el-main.api-detail .api-info div .sign,
  .el-main.api-detail .api-info div .path {
    float: left;
  }
  .el-main.api-detail .api-info div .type {
    width: 100px;
    text-align: center;
  }
  .el-main.api-detail .api-info div .sign {
    margin-left: 2px;
  }
  .el-main.api-detail .api-info div .path {
    width: 260px;
    margin-left: 2px;
  }
  .el-main.api-detail .api-info div .path .el-input__inner {
    background: transparent;
    border: 0;
    color: #c0c3cb;
  }
  .el-main.api-detail .api-info div .path .el-input__inner::-webkit-input-placeholder {
    color: #72767d;
  }
  .el-main.api-detail .api-info div .time-title {
    margin-left: 20px;
  }
  .el-main.api-detail .api-info div .time {
    width: 40px;
  }
  .el-main.api-detail .api-info div .time .el-input__inner {
    background: transparent;
    border: 0;
    width: 40px;
    padding: 0 5px;
    color: #c0c3cb;
  }
  .el-main.api-detail .api-info div .time .el-input__inner::-webkit-input-placeholder {
    color: #72767d;
  }
  .el-main.api-detail .req-res .el-tabs__header {
    padding: 0 20px;
    box-shadow: 0 1px 0 rgba(0,0,0,.2), 0 2px 0 rgba(0,0,0,.06);
    box-sizing: border-box;
  }
  .el-main.api-detail .req-res .el-tabs__content {
    padding: 0 20px;
  }
  .el-main.api-detail .req-res .el-tabs__nav-wrap::after {
    height: 0;
  }
  .el-main.api-detail .req-res .el-tabs__item {
    height: 50px;
    line-height: 50px;
    color: #c0c3cb;
  }
  .el-main.api-detail .req-res .el-tabs__item:hover,
  .el-main.api-detail .req-res .el-tabs__item.is-active {
    color: #33c6c5;
  }
  .el-main.api-detail .req-res .el-tabs__active-bar {
    background: #33c6c5;
  }

  .el-main.api-detail .req-res .el-tabs__content .el-tabs {
    background: hsla(218,5%,47%,.3);
    height: calc(100vh - 200px);
    overflow-y: scroll;
    border-radius: 5px;
    padding-bottom: 20px;
  }
  .el-main.api-detail .req-res .el-tabs__content .el-tabs .el-tabs__header {
    box-shadow: none;
    border-bottom: 1px solid hsla(0,0%,100%,.1);
  }
  .el-main.api-detail .req-res .el-tabs__content .el-form.demo-dynamic .el-form-item {
    margin-bottom: 6px;
  }
  .el-main.api-detail .req-res .el-tabs__content .el-form.demo-dynamic .el-form-item__content {
    margin-left: 0!important;
  }
  .el-main.api-detail .req-res .request .params .key {
    width: 48%;
    float: left;
  }
  .el-main.api-detail .req-res .request .params .key .el-input-group__prepend {
    border-radius: 0;
    padding: 0 10px;
    background: transparent;
    border: 0;
  }
  .el-main.api-detail .req-res .request .params .value {
    width: 48%;
    float: right;
  }
  .el-main.api-detail .req-res .el-checkbox-button__inner,
  .el-main.api-detail .req-res .el-input-group__append {
    border-radius: 0;
    padding: 0 10px;
    background: transparent;
    border: 0;
  }
  .el-main.api-detail .req-res .el-checkbox-button__inner:hover,
  .el-main.api-detail .req-res .el-input-group__append:hover {
    color: #dcdfe6;
  }
  .el-main.api-detail .req-res .request .params .key .el-input__inner,
  .el-main.api-detail .req-res .request .params .value .el-input__inner {
    border-radius: 0;
    background: transparent;
    border: 0;
    border-bottom: 1px solid #606266;
    color: #dcdfe6;
    height: 26px;
    line-height: 26px;
  }

  /* request type color */
  .req-type.get {
    color: #33c6c5 !important;
  }
  .req-type.post {
    color: #f77b20 !important;
  }
  .req-type.delete {
    color: #ff3c3c !important;
  }
  .req-type.put {
    color: #8787eb !important;
  }
  .req-type.patch {
    color: #59a3f0 !important;
  }
  .req-type.options {
    color: #5bcba0 !important;
  }
  
</style>
