<template>
  <div>
    <div v-show="isAddWebsite||isGetCode" class="dark-bg" :style="{width: darkBgWidth,height: darkBgHeight}"></div>
    <div v-if="isAddWebsite" class="add">
      <div class="add-wrap ">
        <div class="title clear"><span>新增网站</span><span @click="hideAddWebsite">X</span></div>
        <div class="input">
          <label for="hostIpt">网站域名</label>
          <input type="text" id="hostIpt" placeholder="请输入网站域名" v-model="hostIpt">
          <div class="describe">
            <p>可输入如下4种域名形式：</p>
            <p>1. 主域名（如：www.baidu.com）</p>
            <p>2. 二级域名（如：sub.baidu.com）</p>
            <p>3. 子目录（如：www.baidu.com/sub）</p>
            <p>4. wap站域名（如：wap.baidu.com)</p>
          </div>
        </div>
        <div class="input">
          <label for="indexIpt">网站首页</label>
          <input type="text" id="indexIpt" placeholder="请输入网站首页" v-model="indexIpt">
        </div>
        <div class="button">
          <button class="sure" @click="submitAddWebsite">确定</button>
          <button class="cancel" @click="hideAddWebsite">取消</button>
        </div>
      </div>
    </div>
    <div v-if="isGetCode" class="code">
      <div class="code-wrap ">
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
      <h1>网站列表</h1>
      <ul>
        <li v-for="website in websites" :key="website.id">
          {{website.host}}
          <a href="javascript:void(0);" @click="setCode(website.config),showGetCode()">获取代码</a>
          <a href="javascript:void(0);" @click="checkCode(website)">代码检查</a>
        </li>
      </ul>
      <button @click="showAddWebsite">添加一个网站</button>
    </div>
  </div>
</template>

<script>
  import waCode from '../assets/waCode'

  export default {
    name: 'Manage',
    data () {
      return {
        darkBgWidth: '0',
        darkBgHeight: '0',
        hostIpt: '',
        indexIpt: '',
        isAddWebsite: false,
        websites: [],
        isGetCode: false,
        code: ``,
        copyRes: '',
        checkRes: []
      }
    },
    methods: {
      initDarkBgWH () {
        this.darkBgWidth = document.body.scrollWidth + 'px'
        this.darkBgHeight = document.body.scrollHeight + 'px'
        window.addEventListener('resize', () => {
          this.darkBgWidth = document.body.scrollWidth + 'px'
          this.darkBgHeight = document.body.scrollHeight + 'px'
        })
      },

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
            this.websites.push(res.website)
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
      },

      getWebsites () {
        this.$store.dispatch('getWebsites')
          .then(res => { this.websites = res.websites })
      }
    },
    mounted () {
      this.$emit('showSelect')
      this.initDarkBgWH()
      this.getWebsites()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .dark-bg {
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, .5);
  }

  .add, .code {
    position: fixed;
    width: 600px;
    background: #ffffff;
    overflow: hidden;
    top: 50%;
    left: 50%;
    border-radius: 5px;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .add .add-wrap, .code .code-wrap {
    position: relative;
  }

  .button {
    padding: 10px;
    text-align: right;
  }

  .button button {
    width: 60px;
    height: 30px;
    margin-right: 10px;
    font-size: 14px;
  }

  .button .sure {
    background: #4f97e7;
    border: 1px solid #3085e3;
    color: #fff;
  }

  .button .sure:hover {
    background: #82c0e7;
  }

  .button .cancel {
    background: #fff;
    border: 1px solid #aaa;
    color: #333;
  }

  .button .cancel:hover {
    background: #bbb;
  }

  .button .copy {
    background: #4f97e7;
    border: 1px solid #3085e3;
    color: #fff;
  }

  .button .copy:hover {
    background: #82c0e7;
  }

  .add-wrap .title {
    position: relative;
    background: #ccc;
  }

  .add-wrap .title span:first-child {
    line-height: 30px;
    font-size: 16px;
    color: #333;
    width: 100%;
    text-align: center;
    float: left;
  }

  .add-wrap .title span:last-child {
    position: absolute;
    width: 30px;
    height: 30px;
    background: red;
    right: 0;
  }

  .add-wrap .input {
    padding: 15px;
  }

  .add-wrap .input .describe {
    padding-left: 90px;
    padding-top: 10px;
  }

  .add-wrap .input .describe p {
    margin: 0;
    font-size: 15px;
    color: #666;
  }

  .add-wrap label {
    display: inline-block;
    width: 80px;
    height: 20px;
    line-height: 20px;
    font-size: 16px;
    color: #333;
  }

  .add-wrap input {
    outline: none;
    padding: 1px 15px;
    border: 2px solid #8284ff;
    width: 350px;
    height: 20px;
    line-height: 20px;
    font-size: 15px;
  }

  .add-wrap input:focus {
    border: 2px solid #ff736b;
  }

  .code-wrap {
    background: #f8f8f8;
  }

  .code-wrap .code-content {
    width: 570px;
    height: 200px;
    padding: 15px;
    color: #333;
  }

  .code-wrap .code-content textarea {
    outline: none;
    border: none;
    width: 100%;
    height: 100%;
    font-size: 13px;
    font-weight: 500;
    line-height: 20px;
    background: #f8f8f8;
    resize: none;
  }

  .code-wrap .info {
    position: absolute;
    bottom: 0;
    padding: 10px 15px;
    color: #f15755;
    font-size: 12px;
    line-height: 30px;
  }

</style>
