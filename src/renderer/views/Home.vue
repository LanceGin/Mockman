<template>
  <el-container>
    <el-header class="button-group">
      <div class="brand">
        <img src="../assets/logo.png">
        <p>Mockman</p>
      </div>
      <div class="feature">
        <el-tabs v-model="activePanel">
          <el-tab-pane label="BUILDER" name="builder"></el-tab-pane>
          <el-tab-pane label="LOGGER" name="logger"></el-tab-pane>
        </el-tabs>
        <!-- TODO
        <el-button size="small">Builder</el-button>
        <el-button size="small">Loger</el-button>
        -->
        <el-button size="small" @click="handleOuterClick('docs')">Docs</el-button>
        <el-button size="small" @click="handleOuterClick('feedback')">Feedback</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside class="mocks">
        <div class="mock-list">
          <div class="mock-item" v-for="mock in mocks">
            <div v-if="mock === undefined"></div>
            <div v-else>
              <!-- context menu start -->
              <context-menu :ref="`CM${mock.id}`">
                <ul>
                  <li @click="handleRemoveMock(mock)">Remove</li>
                </ul>
              </context-menu>
              <!-- context menu end -->
              <el-tooltip :content="mock.content" placement="right" :visible-arrow="false">
                <el-button circle class="active" v-if="mock.id === activeMock.id" @click.native.right="handleContextMenu($event, mock)">{{ mock.name }}</el-button>
                <el-button circle v-else @click="switchActiveMock(mock)" @click.native.right="handleContextMenu($event, mock)">{{ mock.name }}</el-button>
              </el-tooltip>
            </div>
          </div>
        </div>
        <div class="add-btn">
          <el-tooltip content="New Mock Server" placement="right" :visible-arrow="false">
            <el-button class="add-btn" icon="el-icon-plus" circle @click="handleNewMock"></el-button>
          </el-tooltip>
        </div>
      </el-aside>

      <template class="builder" v-if="activePanel === 'builder'">
        <el-aside class="apis">
          <div class="mock-info" v-if="activeMock === undefined"></div>
          <div class="mock-info" v-else>
            <div>
              <el-input v-model="activeMock.content" @blur="handleUpdateMock" class="mock-name" placeholder="Server Name"></el-input>
              <el-tooltip v-if="activeMock.status === 'running'" content="Stop Server" placement="top-end" :visible-arrow="false">
                <el-button
                  key="serverStatus"
                  class="running"
                  type="text"
                  icon="el-icon-loading"
                  @click="handleServer">
                </el-button>
              </el-tooltip>
              <el-tooltip v-else-if="activeMock.status === 'forRefresh'" content="Refresh Server" placement="top-end" :visible-arrow="false">
                <el-button
                  key="serverStatus"
                  class="for-refresh"
                  type="text"
                  icon="el-icon-refresh"
                  @click="handleServer">
                </el-button>
              </el-tooltip>
              <el-tooltip v-else content="Start Server" placement="top-end" :visible-arrow="false">
                <el-button
                  key="serverStatus"
                  class="stop"
                  type="text"
                  icon="el-icon-caret-right"
                  @click="handleServer">
                </el-button>
              </el-tooltip>
              <el-tooltip v-if="activeMock.isHttps === true" content="Disable HTTPS" placement="top-end" :visible-arrow="false">
                <el-button
                  key="isHttps"
                  class="is-https on"
                  type="text"
                  icon="el-icon-gin el-icon-gin-https"
                  @click="handleHttps">
                </el-button>
              </el-tooltip>
              <el-tooltip v-else content="Enable HTTPS" placement="top-end" :visible-arrow="false">
                <el-button
                  key="isHttps"
                  class="is-https off"
                  type="text"
                  icon="el-icon-gin el-icon-gin-https"
                  @click="handleHttps">
                </el-button>
              </el-tooltip>
              <!-- <el-dropdown class="stop" trigger="click">
                <span class="el-dropdown-link">
                  <i class="el-icon-gin el-icon-gin-https"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <el-checkbox v-model="activeMock.isHttps">Enable Https</el-checkbox>
                  </el-dropdown-item>·
                </el-dropdown-menu>
              </el-dropdown> -->
            </div>
            <div>
              <span class="host">localhost :</span>
              <el-input v-model="activeMock.port" @blur="handleUpdateMock" class="port" placeholder="Port"></el-input>
              <span class="sign">/</span>
              <el-input v-model="activeMock.prefix" @blur="handleUpdateMock" class="prefix" placeholder="Prefix"></el-input>
            </div>
          </div>
          <div class="empty-mock" v-if="activeMock === undefined"></div>
          <div v-else>
            <div class="api-header">
              <span class="note">Api</span>
              <el-button type="text" icon="el-icon-plus" @click="handleNewApi"></el-button>
            </div>

            <!-- TODO: classify the apis to diffrent tags -->
            <!-- <el-collapse v-model="activeNames" @change="handleChange">
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
            </el-collapse> -->

            <div v-for="api in apis" :class="`single-req ${activeApi.id === api.id ? 'avtive' : ''}`" @click="switchActiveApi(api)">
              <span :class="`req-type ${api.method}`">{{ api.method.toUpperCase() }}</span>
              <span class="req-route">/{{ api.path }}</span>
              <span>
                <el-button
                  type="text"
                  size="mini"
                  class="api-delete"
                  @click.stop="handleRemoveApi(api)"><i class="el-icon-close"></i></el-button>
              </span>
            </div>

          </div>
        </el-aside>
        <el-container>
          <el-main class="api-detail" v-if="activeApi === undefined">
            <div class="empty-api"></div>
          </el-main>
          <el-main class="api-detail" v-else>
            <div class="api-info">
              <div>
                <el-dropdown trigger="click" placement="bottom" class="type" @command="handleReqType">
                  <span class="el-dropdown-link">
                    {{ activeApi.method.toUpperCase() }}<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown" class="http-method">
                    <el-dropdown-item v-for="item in httpMethod" :key="item.name" :command="item.command">{{ item.name }}</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <span class="sign">/</span>
                <el-input v-model="activeApi.path" class="path" placeholder="path" @blur="handleUpdateApi"></el-input>
                <el-dropdown trigger="click" placement="bottom" class="status" @command="handleResCode">
                  <span class="el-dropdown-link">
                    {{ activeApi.resCode }}<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown" class="res-code">
                    <el-dropdown-item v-for="item in resCode" :key="item.command" :command="item.command">{{ item.command }}</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <span class="time-title">TIME</span>
                <el-input
                  placeholder="0"
                  class="time"
                  type="number"
                  v-model="activeApi.latency"
                  @blur="handleUpdateApi">
                </el-input>
                <span>ms</span>
              </div>
            </div>
            <div class="req-res">
              <el-tabs v-model="activeHttp" @tab-click="handleHttpClick">
                <el-tab-pane label="REQUEST" name="request" class="request">
                  <el-tabs v-model="activeReq" @tab-click="handleReqClick">
                    <!-- dynamic params panel start -->
                    <el-tab-pane label="Params" name="params" class="params">
                      <el-form label-width="100px" class="demo-dynamic">
                        <el-form-item
                          v-for= "(param, index) in activeApi.request.params"
                          :key="index"
                          :prop="activeApi.request.params[index].value">
                          <el-input v-model="param.key" class="key" @blur="handleUpdateApi">
                            <template slot="prepend">
                              <el-checkbox-button size="mini" v-model="param.required" @change="handleUpdateApi"><i class="el-icon-circle-check"></i></el-checkbox-button>
                            </template>
                            <el-button slot="append" icon="el-icon-close" @click.prevent="removeReqParam(param, 'params')"></el-button>
                          </el-input>
                        </el-form-item>

                        <el-form-item
                          key="addBtn"
                          prop="newParam">
                          <el-input v-model="dynamicReqParam.key" class="key">
                            <template slot="prepend">
                              <el-checkbox-button size="mini" v-model="dynamicReqParam.required"><i class="el-icon-circle-check"></i></el-checkbox-button>
                            </template>
                            <el-button slot="append" icon="el-icon-plus" @click.prevent="addReqParam('params')"></el-button>
                          </el-input>
                        </el-form-item>
                      </el-form>
                    </el-tab-pane>
                    <!-- dynamic params panel end -->
                    <!-- dynamic body panel start -->
                    <el-tab-pane label="Body" name="body" class="params body">
                      <el-form label-width="100px" class="demo-dynamic">
                        <el-form-item
                          v-for= "(param, index) in activeApi.request.body"
                          :key="index"
                          :prop="activeApi.request.body[index].value">
                          <el-input v-model="param.key" class="key" @blur="handleUpdateApi">
                            <template slot="prepend">
                              <el-checkbox-button size="mini" v-model="param.required" @change="handleUpdateApi"><i class="el-icon-circle-check"></i></el-checkbox-button>
                            </template>
                            <el-button slot="append" icon="el-icon-close" @click.prevent="removeReqParam(param, 'body')"></el-button>
                          </el-input>
                        </el-form-item>

                        <el-form-item
                          key="addBtn"
                          prop="newParam">
                          <el-input v-model="dynamicReqParam.key" class="key">
                            <template slot="prepend">
                              <el-checkbox-button size="mini" v-model="dynamicReqParam.required"><i class="el-icon-circle-check"></i></el-checkbox-button>
                            </template>
                            <el-button slot="append" icon="el-icon-plus" @click.prevent="addReqParam('body')"></el-button>
                          </el-input>
                        </el-form-item>
                      </el-form>
                    </el-tab-pane>
                    <!-- dynamic body panel end -->
                    <!-- dynamic header panel start -->
                    <el-tab-pane label="Headers" name="header" class="params headers">
                      <el-form label-width="100px" class="demo-dynamic">
                        <el-form-item
                          v-for= "(param, index) in activeApi.request.headers"
                          :key="index"
                          :prop="activeApi.request.headers[index].value">
                          <el-input v-model="param.key" class="key" @blur="handleUpdateApi">
                            <template slot="prepend">
                              <el-checkbox-button size="mini" v-model="param.required" @change="handleUpdateApi"><i class="el-icon-circle-check"></i></el-checkbox-button>
                            </template>
                            <el-button slot="append" icon="el-icon-close" @click.prevent="removeReqParam(param, 'headers')"></el-button>
                          </el-input>
                        </el-form-item>

                        <el-form-item
                          key="addBtn"
                          prop="newParam">
                          <el-input v-model="dynamicReqParam.key" class="key">
                            <template slot="prepend">
                              <el-checkbox-button size="mini" v-model="dynamicReqParam.required"><i class="el-icon-circle-check"></i></el-checkbox-button>
                            </template>
                            <el-button slot="append" icon="el-icon-plus" @click.prevent="addReqParam('headers')"></el-button>
                          </el-input>
                        </el-form-item>
                      </el-form>
                    </el-tab-pane>
                    <!-- dynamic header panel end -->
                  </el-tabs>
                </el-tab-pane>
                <el-tab-pane label="RESPONSE" name="response" class="response">
                  <el-tabs v-model="activeRes" @tab-click="handleResClick">
                    <el-tab-pane label="Body" name="body" class="editor-container">
                      <json-editor
                        ref="resBody"
                        v-model="activeApi.response.body.value"
                        @blur="handleUpdateApi">
                      </json-editor>
                    </el-tab-pane>
                    <el-tab-pane label="Cookies" name="cookies" class="params cookies">
                      <el-form label-width="100px" class="demo-dynamic">
                        <el-form-item
                          v-for= "(param, index) in activeApi.response.cookies"
                          :key="index"
                          :prop="activeApi.response.cookies[index].value">
                          <el-input v-model="param.key" class="key" @blur="handleUpdateApi">
                            <template slot="prepend">
                              <el-checkbox-button size="mini" v-model="param.required" @change="handleUpdateApi"><i class="el-icon-circle-check"></i></el-checkbox-button>
                            </template>
                          </el-input>
                          <el-input v-model="param.value" class="value" @blur="handleUpdateApi">
                            <el-button slot="append" icon="el-icon-close" @click.prevent="removeResParam(param, 'cookies')"></el-button>
                          </el-input>
                        </el-form-item>

                        <el-form-item
                          key="addBtn"
                          prop="newParam">
                          <el-input v-model="dynamicResParam.key" class="key">
                            <template slot="prepend">
                              <el-checkbox-button size="mini" v-model="dynamicResParam.required"><i class="el-icon-circle-check"></i></el-checkbox-button>
                            </template>
                          </el-input>
                          <el-input v-model="dynamicResParam.value" class="value">
                            <el-button slot="append" icon="el-icon-plus" @click.prevent="addResParam('cookies')"></el-button>
                          </el-input>
                        </el-form-item>
                      </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="Headers" name="header" class="params headers">
                      <el-form label-width="100px" class="demo-dynamic">
                        <el-form-item
                          v-for= "(param, index) in activeApi.response.headers"
                          :key="index"
                          :prop="activeApi.response.headers[index].value">
                          <el-input v-model="param.key" class="key" @blur="handleUpdateApi">
                            <template slot="prepend">
                              <el-checkbox-button size="mini" v-model="param.required" @change="handleUpdateApi"><i class="el-icon-circle-check"></i></el-checkbox-button>
                            </template>
                          </el-input>
                          <el-input v-model="param.value" class="value" @blur="handleUpdateApi">
                            <el-button slot="append" icon="el-icon-close" @click.prevent="removeResParam(param, 'headers')"></el-button>
                          </el-input>
                        </el-form-item>

                        <el-form-item
                          key="addBtn"
                          prop="newParam">
                          <el-input v-model="dynamicResParam.key" class="key">
                            <template slot="prepend">
                              <el-checkbox-button size="mini" v-model="dynamicResParam.required"><i class="el-icon-circle-check"></i></el-checkbox-button>
                            </template>
                          </el-input>
                          <el-input v-model="dynamicResParam.value" class="value">
                            <el-button slot="append" icon="el-icon-plus" @click.prevent="addResParam('headers')"></el-button>
                          </el-input>
                        </el-form-item>
                      </el-form>
                    </el-tab-pane>
                  </el-tabs>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-main>
        </el-container>
      </template>
      <template class="logger" v-else>
        <el-main class="logger">
          <el-collapse v-model="activeLog">
            <el-collapse-item
              v-for="item in activeMock.serviceLog"
              :name="item.index">
              <template slot="title">
                <span :class="`req-type ${item.req.method.toLowerCase()}`">{{ item.req.method }}</span>
                <span class="path">{{ item.req.headers.host + item.req.originalUrl }}</span>
                <span class="time">{{ item.req.startedAt.toLocaleTimeString() }}</span>
                <span class="code">{{ item.res.statusCode }}</span>
                <span class="duration">{{ `${item.req.endAt - item.req.startedAt} ms` }}</span>
              </template>
              <el-tabs>
                <el-tab-pane label="Request Headers">
                  <pre>{{ item.req.headers }}</pre>
                </el-tab-pane>
                <el-tab-pane label="Request Body">
                  <pre>{{ item.req.body }}</pre>
                </el-tab-pane>
                <el-tab-pane label="Response Headers">
                  <pre>{{ item.res._headers }}</pre>
                </el-tab-pane>
                <el-tab-pane label="Response Body">
                  <pre>{{ item.res.resData }}</pre>
                </el-tab-pane>
              </el-tabs>
            </el-collapse-item>
          </el-collapse>
        </el-main>
      </template>

    </el-container>
  </el-container>
</template>

<script>
  // import http method
  import httpMethod from '@/utils/httpMethod';
  import resCode from '@/utils/resCode';
  import ss from '@/utils/serverService';
  import jsonEditor from '@/components/jsonEditor';
  import contextMenu from '@/components/contextMenu';

  // require ipcRenderer
  import { ipcRenderer } from 'electron';

  export default {
    name: 'home',
    components: { jsonEditor, contextMenu },
    data() {
      return {
        // active tab
        activePanel: 'builder',
        activeHttp: 'request',
        activeReq: 'params',
        activeRes: 'body',
        activeLog: ['1'],
        // activeNames: [],
        // mock data
        mocks: [],
        activeMock: {},
        // http-method and rescode list
        httpMethod: null,
        resCode: null,
        // api data
        apis: [],
        activeApi: {
          id: 1,
          mockId: 1,
          method: 'get',
          path: 'mockman',
          resCode: '200 - OK',
          latency: '0',
          request: {
            params: [],
            body: [],
            headers: [],
          },
          response: {
            body: { type: 'json', value: 'null' },
            cookies: [],
            headers: [],
          },
        },
        dynamicReqParam: {
          key: '',
          required: true,
        },
        dynamicResParam: {
          key: '',
          value: '',
          required: true,
        },
      };
    },
    mounted() {
      this.httpMethod = httpMethod;
      this.resCode = resCode;

      // get mocks
      this.mocks = ipcRenderer.sendSync('getMockList');
      this.activeMock = this.mocks[0];

      // get api
      if (this.activeMock !== undefined) {
        this.apis = ipcRenderer.sendSync('getApiList', this.activeMock.id);
      } else {
        this.apis = [];
      }
      this.activeApi = this.apis[0];

      // force update the el-tabs while the logger changed
      this.$on('loggerUpdate', () => {
        this.$forceUpdate();
      });
    },
    methods: {
      // update service status
      updateServiceStatus() {
        if (this.activeMock.status === 'running') {
          this.activeMock.status = 'forRefresh';
          this.$forceUpdate();
        }
      },
      // initial the dynamic params
      initDynamicReqParam() {
        this.dynamicReqParam = {
          key: '',
          required: true,
        };
      },
      initDynamicResParam() {
        this.dynamicResParam = {
          key: '',
          required: true,
        };
      },
      // fresh the code-editor
      freshCodeEditor() {
        window.setTimeout(() => {
          this.$refs.resBody.refresh();
        });
      },
      // handle outer click
      handleOuterClick(pos) {
        const shell = require('electron').shell;
        switch (pos) {
          case 'docs':
            shell.openExternal('https://github.com/LanceGin/Mockman');
            break;
          case 'feedback':
            shell.openExternal('https://github.com/LanceGin/Mockman/issues');
            break;
          default:
            break;
        }
      },
      // switch active mock
      switchActiveMock(mock) {
        this.activeMock = mock;
        this.apis = ipcRenderer.sendSync('getApiList', this.activeMock.id);
        this.activeApi = this.apis[0];
      },
      // switch active api
      switchActiveApi(api) {
        this.activeApi = api;
      },
      // contextmenu
      handleContextMenu(e, mock) {
        const ref = `CM${mock.id}`;
        this.$refs[ref][0].open(e);
      },
      // handleChange(val) {
      //   console.log(111, val);
      // },
      // start or stop server service
      handleServer() {
        const conf = this.activeMock;
        conf.apis = this.apis;
        if (conf.status === 'running') {
          ss.stop(conf);
        } else if (conf.status === 'forRefresh') {
          ss.stop(conf);
          ss.start(conf, this);
        } else {
          ss.start(conf, this);
        }
        this.$forceUpdate();
      },
      handleHttps() {
        const s = this.activeMock.isHttps;
        if (s === undefined || s === false) {
          this.activeMock.isHttps = true;
        } else {
          this.activeMock.isHttps = false;
        }
        this.updateServiceStatus();
        this.$forceUpdate();
      },
      handleHttpClick() {
        this.initDynamicResParam();
        this.initDynamicReqParam();
        this.freshCodeEditor();
      },
      handleReqClick() {
        this.initDynamicReqParam();
      },
      handleResClick() {
        this.initDynamicResParam();
        this.freshCodeEditor();
      },
      // handle change http request type
      handleReqType(command) {
        this.activeApi.method = command;
        this.handleUpdateApi();
      },
      // handle change response code
      handleResCode(command) {
        this.activeApi.resCode = command;
        this.handleUpdateApi();
      },
      // request params block handler
      removeReqParam(item, subReq) {
        const index = this.activeApi.request[subReq].indexOf(item);
        if (index !== -1) {
          this.activeApi.request[subReq].splice(index, 1);
          this.handleUpdateApi();
        }
      },
      addReqParam(subReq) {
        this.activeApi.request[subReq].push(this.dynamicReqParam);
        this.handleUpdateApi();
        this.dynamicReqParam = {
          key: '',
          required: true,
        };
      },
      // response params block handler
      removeResParam(item, subRes) {
        const index = this.activeApi.response[subRes].indexOf(item);
        if (index !== -1) {
          this.activeApi.response[subRes].splice(index, 1);
          this.handleUpdateApi();
        }
      },
      addResParam(subRes) {
        this.activeApi.response[subRes].push(this.dynamicResParam);
        this.handleUpdateApi();
        this.dynamicResParam = {
          key: '',
          required: true,
        };
      },
      // create a new mock
      handleNewMock() {
        let signal = ipcRenderer.sendSync('newMock');
        while (signal === 'success') {
          const newMockList = ipcRenderer.sendSync('getMockList');
          this.mocks.push(newMockList[newMockList.length - 1]);
          this.activeMock = this.mocks[this.mocks.length - 1];
          this.handleNewApi();
          this.apis = ipcRenderer.sendSync('getApiList', this.activeMock.id);
          signal = 'done';
        }
      },
      // update a mock
      handleUpdateMock() {
        let signal = ipcRenderer.sendSync('updateMock', this.activeMock);
        while (signal === 'success') {
          this.mocks.map((mock) => {
            if (mock.id === this.activeMock.id) {
              mock = this.activeMock;
            }
            return mock;
          });
          this.activeMock.name = this.activeMock.content.slice(0, 1);
          // update service status
          this.updateServiceStatus();
          signal = 'done';
        }
      },
      // remove a mock
      handleRemoveMock(mock) {
        let signal = ipcRenderer.sendSync('removeMock', mock);
        while (signal === 'success') {
          if (this.mocks.length > 1) {
            this.mocks.splice(this.mocks.indexOf(mock), 1);
            if (mock.id === this.activeMock.id) {
              this.activeMock = this.mocks[this.mocks.length - 1];
              this.apis = ipcRenderer.sendSync('getApiList', this.activeMock.id);
              this.activeApi = this.apis[0];
            }
          } else {
            this.mocks = [];
            this.apis = [];
            this.activeMock = this.mocks[0];
            this.activeApi = this.apis[0];
          }
          signal = 'done';
        }
      },
      // create a new api
      handleNewApi() {
        let signal = ipcRenderer.sendSync('newApi', this.activeMock.id);
        while (signal === 'success') {
          this.apis = ipcRenderer.sendSync('getApiList', this.activeMock.id);
          this.activeApi = this.apis[this.apis.length - 1];
          signal = 'done';
          // update service status
          this.updateServiceStatus();
        }
      },
      // update an api
      handleUpdateApi() {
        let signal = ipcRenderer.sendSync('updateApi', this.activeApi);
        while (signal === 'success') {
          signal = 'done';
          // update service status
          this.updateServiceStatus();
        }
      },
      // remove an api
      handleRemoveApi(api) {
        let signal = ipcRenderer.sendSync('removeApi', api);
        while (signal === 'success') {
          if (this.apis.length > 1) {
            this.apis.splice(this.apis.indexOf(api), 1);
            if (api.id === this.activeApi.id) {
              this.activeApi = this.apis[this.apis.length - 1];
            }
          } else {
            this.apis = [];
            this.activeApi = this.apis[0];
          }
          signal = 'done';
          // update service status
          this.updateServiceStatus();
        }
      },
    },
  };
</script>

<style>
  /* common style */
  body {
    margin: 0;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type="number"]{
    -moz-appearance: textfield;
  }
  .editor-container {
    position: relative;
    height: 100%;
  }
  .cm-s-monokai.CodeMirror {
    height: calc(100vh - 250px);
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
  .feature .el-tabs {
    width: 180px;
    float: left;
    margin-left: calc((100vw - 180px) / 2 - 115px);
  }
  .feature .el-tabs .el-tabs__header {
    box-shadow: 0 1px 0 rgba(0,0,0,.2), 0 2px 0 rgba(0,0,0,.06);
    box-sizing: border-box;
  }
  .feature .el-tabs .el-tabs__nav-wrap::after {
    height: 0;
  }
  .feature .el-tabs .el-tabs__item {
    color: #fff;
  }
  .feature .el-tabs .el-tabs__item:hover,
  .feature .el-tabs .el-tabs__item.is-active {
    color: #33c6c5;
  }
  .feature .el-tabs .el-tabs__active-bar {
    background: #33c6c5;
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
  .el-aside::-webkit-scrollbar {
    display: none;
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
  .el-aside.mocks .mock-item .el-button.active {
    background: #33c6c5;
    border-radius: 15px;
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
    margin-bottom: 20px;
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
  .el-aside.apis .empty-mock {
    height: 300px;
    width: 170px;
    margin: 5vh auto;
    background: url('../assets/mock-error.png') no-repeat;
    background-size: contain;
  }
  .el-aside.apis .mock-info {
    box-shadow: 0 1px 0 rgba(0,0,0,.2), 0 2px 0 rgba(0,0,0,.06);
    box-sizing: border-box;
    color: #fff;
    text-align: right;
    padding: 0 10px;
  }
  .el-aside.apis .mock-info .el-button--text.running {
    padding: 0;
    font-size: 20px;
    color: #ff3c3c;
  }
  .el-aside.apis .mock-info .el-button--text.for-refresh {
    padding: 0;
    font-size: 20px;
    color: #f77b20;
  }
  .el-aside.apis .mock-info .el-button--text.stop {
    padding: 0;
    font-size: 20px;
    color: #67c23a;
  }
  .el-aside.apis .mock-info .el-button--text.is-https.off {
    padding: 0;
    font-size: 20px;
    color: #c0c3cb;
    margin-left: 4px;
  }
  .el-aside.apis .mock-info .el-button--text.is-https.on {
    padding: 0;
    font-size: 20px;
    color: #f77b20;
    margin-left: 4px;
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
  /*.el-aside.apis .el-collapse {
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
  }*/
  .el-aside.apis .single-req {
    height: 30px;
    line-height: 30px;
    color: #72767d;
    font-size: 13px;
    padding-left: 10px;
    padding-right: 10px;
    transition: background .25s ease;
  }
  .el-aside.apis .single-req .api-delete {
    display: none;
    float: right;
    color: #72767d;
    font-weight: 500;
    transition: color .25s ease;
  }
  .el-aside.apis .single-req:hover {
    background: rgba(79,84,92,.6);
    cursor: pointer;
  }
  .el-aside.apis .single-req.avtive {
    background: rgba(79,84,92,.6);
    cursor: pointer;
  }
  .el-aside.apis .single-req:hover .api-delete {
    display: block;
  }
  .el-aside.apis .single-req:hover .api-delete:hover {
    color: #B9BBBE;
  }
  .el-aside.apis .single-req .req-type {
    display: inline-block;
    overflow: hidden;
    width: 60px;
    color: #72767d;
  }
  .el-aside.apis .single-req .req-route {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 150px;
  }
  
  .el-main {
    display: block;
    background-color: #36393e;
    color: #fff;
    padding: 0 0;
  }
  .el-main.api-detail .empty-api {
    height: 300px;
    width: 170px;
    margin: 5vh auto;
    background: url('../assets/api-error.png') #36393e no-repeat;
    background-size: contain;
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
    width: 60px;
  }
  .el-main.api-detail .api-info div .time .el-input__inner {
    background: transparent;
    border: 0;
    width: 60px;
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
    height: calc(100vh - 180px);
    overflow-y: scroll;
    border-radius: 5px;
  }
  .el-main.api-detail .req-res .el-tabs__content .el-tabs .el-tabs__header {
    box-shadow: none;
    border-bottom: 1px solid hsla(0,0%,100%,.1);
  }
  .el-main.api-detail .req-res .el-tabs__content .el-tabs .el-tabs__content {
    height: calc(100vh - 265px);
  }
  .el-main.api-detail .req-res .el-tabs__content .el-form.demo-dynamic .el-form-item {
    margin-bottom: 6px;
  }
  .el-main.api-detail .req-res .el-tabs__content .el-form.demo-dynamic .el-form-item__content {
    margin-left: 0!important;
  }
  .el-main.api-detail .req-res .request .params .key {
    width: 100%;
    float: left;
  }
  .el-main.api-detail .req-res .response .params .key {
    width: 48%;
    float: left;
  }
  .el-main.api-detail .req-res .request .params .key .el-input-group__prepend,
  .el-main.api-detail .req-res .response .params .key .el-input-group__prepend {
    border-radius: 0;
    padding: 0 10px;
    background: transparent;
    border: 0;
  }
  .el-main.api-detail .req-res .response .params .value {
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
  .el-main.api-detail .req-res .response .params .key .el-input__inner,
  .el-main.api-detail .req-res .response .params .value .el-input__inner {
    border-radius: 0;
    background: transparent;
    border: 0;
    border-bottom: 1px solid #606266;
    color: #dcdfe6;
    height: 26px;
    line-height: 26px;
  }

  .el-main.logger {
    border: 0;
    background: #2f3136;
  }
  .el-main.logger .el-collapse {
    border: 0;
  }
  .el-main.logger .el-collapse .el-collapse-item__header {
    padding: 0 20px;
    background: transparent;
    color: #c0c3cb;
    height: 34px;
    line-height: 34px;
    border-bottom: 1px solid #36393f
  }
  .el-main.logger .el-collapse .el-collapse-item__header .el-collapse-item__arrow {
    line-height: 34px;
  }
  .el-main.logger .el-collapse .el-collapse-item__header .req-type {
    width: 50px;
    display: inline-block;
    overflow: hidden;
  }
  .el-main.logger .el-collapse .el-collapse-item__header .path {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 600px;
    white-space: nowrap;
  }
  .el-main.logger .el-collapse .el-collapse-item__header .time,
  .el-main.logger .el-collapse .el-collapse-item__header .code,
  .el-main.logger .el-collapse .el-collapse-item__header .duration {
    display: inline-block;
    float: right;
    margin-right: 20px;
  }
  .el-main.logger .el-collapse .el-collapse-item__wrap {
    background: transparent;
    border-bottom: 0;
    padding: 0 20px;
    box-shadow: 0 1px 0 rgba(0,0,0,.2), 0 2px 0 rgba(0,0,0,.06);
    box-sizing: border-box;
  }
  .el-main.logger .el-collapse .el-collapse-item__wrap .el-tabs__nav-wrap::after {
    height: 0;
  }
  .el-main.logger .el-collapse .el-collapse-item__wrap .el-tabs__active-bar {
    background: #33c6c5;
    height: 1px;
  }
  .el-main.logger .el-collapse .el-collapse-item__wrap .el-tabs__item {
    color: #c0c3cb;
    font-size: 12px;
    height: 30px;
    line-height: 30px;
  }
  .el-main.logger .el-collapse .el-collapse-item__wrap .el-tabs__item:hover,
  .el-main.logger .el-collapse .el-collapse-item__wrap .el-tabs__item.is-active {
    color: #33c6c5;
  }
  .el-main.logger .el-collapse .el-collapse-item__wrap .el-tabs__content {
    color: #c0c3cb;
    background: rgba(79,84,92,.6);
    padding: 10px 10px;
    border-radius: 5px;
  }

  /* request type color */
  .req-type.get {
    color: #33c6c5 !important;
  }
  .req-type.post {
    color: #f77b20 !important;
  }
  .req-type.head {
    color: #5bcba0 !important;
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
  
</style>
