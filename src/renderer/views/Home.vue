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
      <el-aside class="mocks">Mocks</el-aside>
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
    line-height: 200px;
  }

  .el-aside.mocks {
    background: #F3F3F3;
    width: 70px !important;
    overflow-y: scroll;
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
