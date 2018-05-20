<template>
  <el-container>
    <el-header class="button-group">Button Group</el-header>
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
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-aside.mocks {
    background: #D3DCE6;
    width: 100px !important;
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
