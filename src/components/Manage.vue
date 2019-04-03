<template>
  <div>
    <div v-if="isAddWebsite" class="add">
      <div class="add-wrap ">
        <div class="title"><span>新增网站</span><span @click="hideAddWebsite">&times</span></div>
        <div class="input">
          <label for="hostIpt">网站域名</label>
          <input type="text" id="hostIpt" placeholder="请输入网站域名" v-model="hostIpt">
        </div>
        <div class="describe">
          <p>可输入如下4种域名形式：</p>
          <p>1. 主域名（如：www.baidu.com）</p>
          <p>2. 二级域名（如：sub.baidu.com）</p>
          <p>3. 子目录（如：www.baidu.com/sub）</p>
          <p>4. wap站域名（如：wap.baidu.com)</p>
        </div>
        <div class="input">
          <label for="indexIpt">网站首页</label>
          <input type="text" id="indexIpt" placeholder="请输入网站首页" v-model="indexIpt">
        </div>
        <div class="input">
          <label for="titleIpt">网站名称</label>
          <input type="text" id="titleIpt" placeholder="请输入网站名称" v-model="titleIpt">
        </div>
        <div class="button">
          <button class="sure" @click="submitAddWebsite">确定</button>
          <button class="cancel" @click="hideAddWebsite">取消</button>
        </div>
      </div>
    </div>
    <div v-if="isGetCode" class="code">
      <div class="code-wrap ">
        <div class="title"><span>复制代码</span><span @click="hideGetCode">&times</span></div>
        <div class="code-content">
          <textarea id="code" v-html="code" readonly></textarea>
        </div>
        <div class="info">{{copyRes}}</div>
        <div class="button">
          <button class="copy" @click="copyGetCode">复制</button>
          <button class="cancel" @click="hideGetCode">关闭</button>
        </div>
      </div>
    </div>
    <div>
      <h1 class="title">网站管理<a href="javascript:void(0)" @click="showAddWebsite" class="add-btn">新增网站</a>
      </h1>
      <table class="manage">
        <thead>
        <tr>
          <td>网站域名</td>
          <td>网站名称</td>
          <td>网站首页</td>
          <td>代码状态</td>
          <td>操作</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(website,index) in websites" :key="website.id">
          <td>{{website.host}}</td>
          <td>{{website.title}}</td>
          <td>{{website.index_url}}</td>
          <td>{{checkRes[index]}}<a href="javascript:void(0)" @click="checkCode(website)">检查</a></td>
          <td><a href="javascript:void(0)" @click="setCode(website.config),showGetCode()">获取代码</a></td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import waCode from '../assets/waCode'
  import { mapState } from 'vuex'

  export default {
    name: 'Manage',
    data () {
      return {
        hostIpt: '',
        indexIpt: '',
        titleIpt: '',
        isAddWebsite: false,
        isGetCode: false,
        code: ``,
        copyRes: '',
        checkRes: []
      }
    },
    computed: mapState(['websites']),
    methods: {
      showAddWebsite () {
        this.isAddWebsite = true
      },
      hideAddWebsite () {
        this.isAddWebsite = false
      },
      submitAddWebsite () {
        const submitInfo = {host: this.hostIpt, index_url: this.indexIpt}
        this.$store.dispatch('addWebsite', submitInfo)
          .then(res => {
            this.isAddWebsite = false
            const websites = this.websites
            websites.push(res.website)
            this.$store.commit('setWebsites', websites)
            if (websites.length === 1) {
              this.$store.commit('setCurrentWebsite', websites[0])
            }
            this.hostIpt = ''
            this.indexIpt = ''
          })
          .catch(() => {
            alert('添加失败')
          })
      },

      setCode (config) {
        this.code = waCode(config)
      },
      showGetCode () {
        this.isGetCode = true
      },
      hideGetCode () {
        this.isGetCode = false
        this.copyRes = ''
      },
      copyGetCode () {
        const textarea = document.querySelector('#code')
        textarea.select()
        if (document.execCommand('copy')) {
          this.copyRes = '已复制到剪贴板'
        } else {
          this.copyRes = '复制失败，请手动复制'
        }
      },

      checkCode (website) {
        this.$store.dispatch('validateSite', website.id)
          .then(res => {
            alert(res.message)
          })
          .catch(err => alert('未检测到代码'))
      }
    },
    mounted () {
      this.$emit('routerTo', 3)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1.title {
    position: relative;
    color: #9c9c9c;
    font-size: 26px;
    font-weight: normal;
    font-family: "Arial", sans-serif;
  }

  h1 a.add-btn {
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    font-size: 16px;
    text-decoration: none;
    color: #fff;
    background: limegreen;
    padding: 10px;
  }

  /* 整个表格 */
  table.manage {
    width: 100%;
    box-shadow: 0 0 1px 1px rgba(0, 0, 0, .1);
    font-family: '微软雅黑', sans-serif;
    border-collapse: collapse;
    table-layout: fixed;
  }

  /* 每一列 */
  table.manage tr td {
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  /* 第n列 */
  table.manage tr td:nth-child(1) {
    /* 网站域名 */
  }

  table.manage tr td:nth-child(2) {
    /* 网站名称 */
  }

  table.manage tr td:nth-child(3) {
    /* 网站首页 */
  }

  table.manage tr td:nth-child(4) {
    /* 代码状态 */
    width: 64px;
  }

  table.manage tr td:nth-child(4) a {
    text-decoration: none;
    color: cornflowerblue;
  }

  table.manage tr td:nth-child(5) {
    /* 操作 */
    width: 128px;
  }

  table.manage tr td:nth-child(5) a {
    text-decoration: none;
    color: cornflowerblue;
  }

  /* 表头每一行 */
  table.manage thead tr {
    line-height: 50px;
    font-size: 14px;
    font-weight: 600;
    color: #333;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
    background: #f8f8f8;
  }

  /* 表体每一行 */
  table.manage tbody tr {
    line-height: 40px;
    font-size: 16px;
    color: #606060;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
  }

  table.manage tbody tr:hover {
    background: #eeeaff;
  }

  table.manage tbody tr:last-child {
    border: none;
  }

  /* 添加网站和获取代码小窗口 */
  div.add, div.code {
    position: fixed;
    width: 600px;
    background: #ffffff;
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, .1);
    overflow: hidden;
    top: 50%;
    left: 50%;
    border-radius: 5px;
    transform: translate(-50%, -50%);
    z-index: 15;
  }

  div.add-wrap, div.code-wrap {
    position: relative;
  }

  /* 按钮样式 */
  div.button {
    padding: 10px;
    text-align: right;
  }

  div.button button {
    width: 60px;
    height: 30px;
    margin-right: 10px;
    font-size: 14px;
  }
  div.button button:hover{
    cursor: pointer;
  }

  div.button .sure {
    background: #4f97e7;
    border: 1px solid #3085e3;
    color: #fff;
  }

  div.button .sure:hover {
    background: #82c0e7;
  }

  div.button .cancel {
    background: #fff;
    border: 1px solid #aaa;
    color: #333;
  }

  div.button .cancel:hover {
    background: #bbb;
  }

  div.button .copy {
    background: #4f97e7;
    border: 1px solid #3085e3;
    color: #fff;
  }

  div.button .copy:hover {
    background: #82c0e7;
  }

  /* 弹窗标题 */
  div.title {
    position: relative;
    background: linear-gradient(90deg, #6982e7, #e791bb);
  }

  div.title span:first-child {
    display: block;
    line-height: 30px;
    font-size: 16px;
    color: #f0f0f0;
    width: 100%;
    text-align: center;
  }

  div.title span:last-child {
    position: absolute;
    display: block;
    right: 0;
    top: 0;
    width: 30px;
    line-height: 30px;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    text-align: center;
    background: red;
  }

  div.title span:last-child:hover {
    cursor: pointer;
  }

  div.add-wrap .describe {
    padding-left: 95px;
  }

  div.add-wrap .describe p {
    margin: 0;
    font-size: 15px;
    color: #666;
  }
  div.add-wrap .input {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    padding: 15px;
  }

  div.add-wrap .input label {
    width: 80px;
    height: 20px;
    line-height: 20px;
    font-size: 16px;
    color: #333;
    flex-grow: 0;
  }

  div.add-wrap .input input {
    outline: none;
    padding: 1px 15px;
    border: 2px solid #8284ff;
    width: 350px;
    height: 20px;
    line-height: 20px;
    font-size: 15px;
    flex-grow: 1;
  }

  div.add-wrap .input input:focus {
    border: 2px solid #ff736b;
  }


  div.code-wrap {
    background: #fff;
  }

  div.code-wrap .code-content {
    width: 570px;
    height: 200px;
    padding: 15px;
    color: #333;
  }

  div.code-wrap .code-content textarea {
    outline: none;
    border: 1px solid #8284ff;
    width: 100%;
    height: 100%;
    font-size: 13px;
    font-weight: 500;
    line-height: 20px;
    background: #fff;
    resize: none;
  }
  div.code-wrap .code-content textarea:focus{
    border: 1px solid #ff736b;
  }

  div.code-wrap .info {
    position: absolute;
    bottom: 0;
    padding: 10px 15px;
    color: #f15755;
    font-size: 12px;
    line-height: 30px;
  }

</style>
