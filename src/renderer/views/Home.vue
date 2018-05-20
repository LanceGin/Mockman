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
      <el-aside class="apis">Apis</el-aside>
      <el-container>
        <el-main>Api Details</el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<style>
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
  }
  .feature .el-button:hover {
    background: #6E6E6E;
  }
  
  .el-aside {
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside.mocks {
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
    font-size: 22px;
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
    background: #246245;
    width: 200px !important;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
</style>
