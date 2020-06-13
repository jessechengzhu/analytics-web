<template>
  <div>
    <div v-if="isAddWebsite" class="add">
      <div class="add-wrap ">
        <div class="title"><span>新增网站</span><span @click="isAddWebsite = false">&times</span></div>
        <div class="input">
          <label for="hostIpt">网站域名</label>
          <input type="text" id="hostIpt" placeholder="请输入网站域名" v-model="hostIpt">
        </div>
        <div class="describe">
          <p>1. jessezhu.cn 或 jessezhu.cn:8080</p>
          <p>2. www.jessezhu.cn 或 www.jessezhu.cn:8080</p>
          <p>3. analytics.jessezhu.cn 或 analytics.jessezhu.cn:8080</p>
        </div>
        <div class="input">
          <label for="indexIpt">网站首页</label>
          <input type="text" id="indexIpt" placeholder="请输入网站首页" v-model="indexIpt">
        </div>
        <div class="describe">
          <p>1. http://www.jessezhu.cn</p>
          <p>2. http://www.jessezhu.cn/index.html</p>
          <p>3. https://www.jessezhu.cn</p>
        </div>
        <div class="input">
          <label for="titleIpt">网站名称</label>
          <input type="text" id="titleIpt" placeholder="请输入网站名称" v-model="titleIpt">
        </div>
        <div class="button">
          <button class="sure" @click="visitor?alertWarning('不能更改演示账号哦～'):submitAddWebsite()">确定</button>
          <button class="cancel" @click="isAddWebsite = false">取消</button>
        </div>
      </div>
    </div>
    <div v-if="isEditWebsite" class="edit">
      <div class="edit-wrap ">
        <div class="title"><span>修改网站</span><span @click="isEditWebsite = false">&times</span></div>
        <div class="input">
          <label for="editHostIpt">网站域名</label>
          <input type="text" id="editHostIpt" placeholder="请输入新网站域名" v-model="editHostIpt">
        </div>
        <div class="describe">
          <p>1. jessezhu.cn 或 jessezhu.cn:8080</p>
          <p>2. www.jessezhu.cn 或 www.jessezhu.cn:8080</p>
          <p>3. analytics.jessezhu.cn 或 analytics.jessezhu.cn:8080</p>
        </div>
        <div class="input">
          <label for="editIndexIpt">网站首页</label>
          <input type="text" id="editIndexIpt" placeholder="请输入网站首页" v-model="editIndexIpt">
        </div>
        <div class="describe">
          <p>1. http://www.jessezhu.cn</p>
          <p>2. http://www.jessezhu.cn/index.html</p>
          <p>3. https://www.jessezhu.cn</p>
        </div>
        <div class="input">
          <label for="editTitleIpt">网站名称</label>
          <input type="text" id="editTitleIpt" placeholder="请输入网站名称" v-model="editTitleIpt">
        </div>
        <div class="button">
          <button class="sure" @click="visitor?alertWarning('不能更改演示账号哦～'):submitEditWebsite">确定</button>
          <button class="cancel" @click="isEditWebsite = false">取消</button>
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
    <div v-loading="loading">
      <h1 class="title">网站管理<a href="javascript:void(0)" @click="visitor?alertWarning('不能更改演示账号哦～'):(isAddWebsite = true)" class="add-btn">新增网站</a>
      </h1>
      <table class="manage">
        <thead>
        <tr>
          <td>网站域名</td>
          <td>网站名称</td>
          <td>网站首页</td>
          <td>代码安装状态</td>
          <td>操作</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(website,index) in websites" :key="website.id">
          <td>{{website.host}}</td>
          <td>{{website.title}}</td>
          <td>{{website.index_url}}</td>
          <td v-loading="!checkLoading[index]">
            <span :style="{color: checkRes[index]==='✖'?'darkred':'limegreen'}">{{checkRes[index]}}</span>
            <a href="javascript:void(0)" @click="checkCode(website,index)" title="刷新"><i class="fa fa-refresh"></i></a>
            <a href="javascript:void(0)" @click="setCode(website.config),showGetCode()">获取代码</a>
          </td>
          <td>
            <el-button
              size="mini"
              @click="visitor?alertWarning('不能更改演示账号哦～'):showEdit(website)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="visitor?alertWarning('不能更改演示账号哦～'):showDelete(website)">删除
            </el-button>
          </td>
        </tr>
        </tbody>
      </table>
      <p v-if="websites.length===0" style="text-align: center">你还没有添加网站，<a href="javascript:void(0);"
                                                                           @click="isAddWebsite=true">添加</a>以查看我的网站分析。
      </p>
    </div>
    <h1 class="title">用户管理</h1>
    <h2 class="title">密码修改</h2>
    <el-form :inline="true" :model="pswForm" status-icon ref="pswForm" class="demo-form-inline" :rules="pswRules">
      <el-form-item label="旧密码" prop="oldPsw">
        <el-input v-model="pswForm.oldPsw" placeholder="请输入旧密码"></el-input>
      </el-form-item>
      <el-form-item label="注册邮箱" prop="email">
        <el-input v-model.trim="pswForm.email" placeholder="请输入注册邮箱"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPsw">
        <el-input v-model="pswForm.newPsw" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="visitor?alertWarning('不能更改演示账号哦～'):submitPswForm('pswForm')">确定</el-button>
      </el-form-item>
    </el-form>
    <br>
  </div>
</template>

<script>
import waCode from '../assets/waCode'
import { mapState } from 'vuex'

export default {
  name: 'Manage',
  data () {
    let validateOldPsw = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('旧密码不能为空'))
      } else {
        callback()
      }
    }
    let validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('旧邮箱不能为空'))
      } else {
        callback()
      }
    }
    let validateNewPsw = (rule, value, callback) => {
      const reg = /^[\x20-\x7E]*$/ // 包含所有ASCII字符（含空格）
      if (value.length < 6 || value.length > 16) {
        callback(new Error('密码长度在6-16之间'))
      } else if (!reg.test(value)) {
        callback(new Error('密码不能包含特殊字符'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      hostIpt: '',
      indexIpt: '',
      titleIpt: '',
      isAddWebsite: false,
      isGetCode: false,
      code: ``,
      copyRes: '',
      checkRes: [],
      checkLoading: [],
      /* 修改网站 */
      tmpWebsite: null,
      tmpId: 0,
      editHostIpt: '',
      editIndexIpt: '',
      editTitleIpt: '',
      isEditWebsite: false,
      isDeleteWebsite: false,
      /* 修改密码 */
      pswRules: {
        oldPsw: [
          {validator: validateOldPsw, trigger: 'blur'}
        ],
        email: [
          {validator: validateEmail, trigger: 'blur'}
        ],
        newPsw: [
          {validator: validateNewPsw, trigger: 'blur'}
        ]
      },
      pswForm: {
        oldPsw: '',
        newPsw: '',
        email: ''
      }
    }
  },
  computed: mapState(['currentWebsite', 'websites', 'visitor']),
  methods: {
    validateHost (val) {
      const reg = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/
      if (reg.test(val)) {
        return true
      } else {
        this.$emit('addNotification', '域名格式不正确', '请输入正确的域名')
        return false
      }
    },
    validateIndex (val) {
      const reg = /^(?=^.{3,255}$)http(s)?:\/\/?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*([\?&]\w+=\w*)*$/
      if (reg.test(val)) {
        return true
      } else {
        this.$emit('addNotification', '首页地址格式不正确', '请输入正确的首页地址')
        return false
      }
    },
    validateTitle (val) {
      if (val.length <= 20) {
        return true
      } else {
        this.$emit('addNotification', '标题名称不正确', '网站名称长度不要超过20')
        return false
      }
    },
    submitAddWebsite () {
      if (this.validateHost(this.hostIpt) && this.validateIndex(this.indexIpt) && this.validateTitle(this.titleIpt)) {
        this.loading = true
        const submitInfo = {host: this.hostIpt, index_url: this.indexIpt, title: this.titleIpt}
        this.$store.dispatch('addWebsite', submitInfo)
          .then(res => {
            this.loading = false
            this.isAddWebsite = false
            const websites = this.websites
            websites.push(res.website)
            this.$store.commit('setWebsites', websites)
            if (websites.length === 1) {
              this.$store.commit('setCurrentWebsite', websites[0])
            }
            this.hostIpt = ''
            this.indexIpt = ''
            this.titleIpt = ''
            this.$emit('addNotification', '成功', '添加成功')
          })
          .catch(() => {
            this.loading = false
            this.$emit('addNotification', '错误', '添加失败')
          })
      }
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
    checkAllCode () {
      for (let i in this.websites) {
        this.$store.dispatch('validateSite', this.websites[i].id)
          .then(res => {
            this.$set(this.checkRes, i, '✔')
            this.$set(this.checkLoading, i, true)
          })
          .catch(err => {
            this.$set(this.checkRes, i, '✖')
            this.$set(this.checkLoading, i, true)
          })
      }
    },
    checkCode (website, index) {
      this.$set(this.checkLoading, index, false)
      this.$store.dispatch('validateSite', website.id)
        .then(res => {
          this.$set(this.checkLoading, index, true)
          this.$set(this.checkRes, index, '✔')
        })
        .catch(err => {
          this.$set(this.checkLoading, index, true)
          this.$set(this.checkRes, index, '✖')
        })
    },
    showEdit (website) {
      this.tmpWebsite = website
      this.editHostIpt = website.host
      this.editIndexIpt = website.index_url
      this.editTitleIpt = website.title
      this.isEditWebsite = true
    },
    submitEditWebsite () {
      if (this.validateHost(this.editHostIpt) && this.validateIndex(this.editIndexIpt) && this.validateTitle(this.editTitleIpt)) {
        this.loading = true
        this.tmpWebsite.host = this.editHostIpt
        this.tmpWebsite.index_url = this.editIndexIpt
        this.tmpWebsite.title = this.editTitleIpt
        this.$store.dispatch('editWebsite', this.tmpWebsite)
          .then(res => {
            return this.$store.dispatch('getWebsites')
          })
          .then(res => {
            this.$emit('addNotification', '修改成功')
            this.isEditWebsite = false
            this.loading = false
            this.websites.forEach(website => {
              if (website.id === this.currentWebsite.id) {
                this.$store.commit('setCurrentWebsite', website)
              }
            })
          })
          .catch(() => {})
          .catch(() => {
            this.loading = false
            this.$emit('addNotification', '修改失败')
          })
      }
    },
    showDelete (website) {
      this.$confirm('此操作将永久删除该网站，该网站所有数据将被清除，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        this.$store.dispatch('deleteWebsite', website.config)
          .then(res => {
            this.loading = false
            let tmpWebsites = this.websites
            tmpWebsites.splice(tmpWebsites.indexOf(website), 1)
            this.$store.commit('setWebsites', tmpWebsites)
            if (this.currentWebsite.id === website.id) {
              if (this.websites.length !== 0) {
                this.$store.commit('setCurrentWebsite', this.websites[0])
              } else {
                this.$store.commit('setCurrentWebsite', null)
              }
            }
            this.$emit('addNotification', '删除成功')
          })
          .catch(() => {
            this.loading = false
            this.$emit('addNotification', '删除失败')
          })
      }).catch(() => {})
    },
    submitPswForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const changeInfo = {
            oldPsw: this.pswForm.oldPsw,
            email: this.pswForm.email,
            newPsw: this.pswForm.newPsw,
            username: this.$store.state.user.username
          }
          this.$store.dispatch('changePassword', changeInfo)
            .then(res => {
              this.showUserOperation = false
              this.showSelect = false
              this.selectInfo = '全部网站数据'
              this.$store.commit('clearUser')
              this.$emit('addNotification', '', '密码修改成功，请重新登录')
              this.$router.replace('/login')
            })
            .catch(err => {
              if (err.message === '旧密码错误') {
                this.$emit('addNotification', '', '旧密码错误')
              } else if (err.message === '注册邮箱错误') {
                this.$emit('addNotification', '', '注册邮箱错误')
              } else {
                this.$emit('addNotification', '', '其他错误')
              }
            })
        } else {
          return false
        }
      })
    },
    alertWarning (text) {
      alert(text)
    }
  },
  watch: {
    websites () {
      this.checkAllCode()
    }
  },
  mounted () {
    this.$emit('routerTo', 3)
    this.checkAllCode()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1.title {
    margin: 20px 0;
    line-height: 36px;
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
    padding: 5px 10px;
  }

  h2.title {
    margin: 18px 0;
    line-height: 30px;
    font-size: 22px;
    color: #9c9c9c;
    font-weight: normal;
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
    width: 160px;
  }

  table.manage tr td:nth-child(4) a {
    text-decoration: none;
    color: cornflowerblue;
  }

  table.manage tr td:nth-child(5) {
    /* 操作 */
    width: 160px;
  }

  table.manage tr td:nth-child(5) button:last-child {
    margin-left: 0px;
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

  table.manage tbody tr:last-child {
    border: none;
  }

  /* 添加网站和获取代码和修改代码小窗口 */
  div.add, div.code, div.edit {
    position: fixed;
    width: 60%;
    background: #ffffff;
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, .1);
    overflow: hidden;
    top: 50%;
    left: 50%;
    border-radius: 5px;
    transform: translate(-50%, -50%);
    z-index: 15;
  }

  div.add-wrap, div.code-wrap， div.edit-wrap {
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

  div.button button:hover {
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

  div.describe {
    padding-left: 95px;
  }

  div.describe p {
    margin: 0;
    font-size: 15px;
    color: #666;
  }

  div.input {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    padding: 15px;
  }

  div.input label {
    width: 80px;
    height: 20px;
    line-height: 20px;
    font-size: 16px;
    color: #333;
    flex-grow: 0;
  }

  div.input input {
    outline: none;
    padding: 1px 15px;
    border: 2px solid #8284ff;
    width: 350px;
    height: 20px;
    line-height: 20px;
    font-size: 15px;
    flex-grow: 1;
  }

  div.input input:focus {
    border: 2px solid #ff736b;
  }

  div.code-wrap {
    background: #fff;
  }

  div.code-wrap .code-content {
    height: 150px;
    padding: 10px 15px 10px 10px;
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

  div.code-wrap .code-content textarea:focus {
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
