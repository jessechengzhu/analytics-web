<template>
  <div class="register-wrap">
    <h1 class="title">注册</h1>
    <div class="input">
      <label for="usrIpt">用户名</label>
      <input v-model.lazy.trim="username" id="usrIpt"/>
      <span class="msg">{{usrMsg}}</span>
    </div>
    <div class="input">
      <label for="pswIpt">密码</label>
      <input v-model.lazy="password" :type="type" id="pswIpt"/>
      <span class="msg">{{pswMsg}}</span>
    </div>
    <div class="input">
      <label for="emailIpt">邮箱</label>
      <input v-model.trim.lazy="email" type="email" id="emailIpt"/>
      <span class="msg">{{emlMsg}}</span>
    </div>
    <a class="register-btn" @click="register" href="javascript:void(0)">注册</a>
    <div class="message" v-loading="loading">{{message}}</div>
  </div>
</template>

<script>

export default {
  name: 'Register',
  data () {
    return {
      username: '',
      usrMsg: '',

      password: '',
      type: 'password',
      toggleFlag: false,
      pswMsg: '',

      email: '',
      emlMsg: '',

      message: '',
      loading: false
    }
  },
  methods: {
    showToggle () {
      this.toggleFlag = !this.toggleFlag
      if (this.toggleFlag) {
        this.type = 'text'
      } else {
        this.type = 'password'
      }
    },
    validateUsr (val) {
      // ^xxx$ 以xxx为起点和终点，表示始终应为xxx
      // const reg=/^[^ ]+$/;  //不包含1个或1个以上的空格
      if (val.length < 3 || val.length > 10) {
        this.usrMsg = '用户名长度在3到10个字符'
        return false
      } else if (val.indexOf(' ') >= 0) {
        this.usrMsg = '用户名中间不能有空格'
        return false
      } else {
        this.usrMsg = '✔'
        return true
      }
    },
    validatePsw (val) {
      const reg = /^[\x20-\x7E]*$/ // 包含所有ASCII字符（含空格）
      if (val.length < 6 || val.length > 16) {
        this.pswMsg = '密码长度在6-16之间'
        return false
      } else if (!reg.test(val)) {
        this.pswMsg = '密码不能特殊字符'
        return false
      } else {
        this.pswMsg = '✔'
        return true
      }
    },
    validateEml (val) {
      // 邮箱格式
      const reg = new RegExp('^[a-zA-Z0-9][\\w\\.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\\w\\.-]*[a-zA-Z0-9]\\.[a-zA-Z][a-zA-Z\\.]*[a-zA-Z]$')
      if (val.length === 0) {
        // this.emlMsg = '邮箱不能为空'
        return true
      } else if (!reg.test(val)) {
        this.emlMsg = '邮箱格式不正确'
        return false
      } else {
        this.emlMsg = '✔'
        return true
      }
    },
    register () {
      let a = this.validateUsr(this.username)
      let b = this.validatePsw(this.password)
      let c = this.validateEml(this.email)
      // 验证各个字段是否格式正确
      if (a && b && c) {
        const registerInfo = {
          username: this.username,
          password: this.password,
          email: this.email
        }
        this.$store.dispatch('validateUsername', this.username)
          .then(res => {
            this.usrMsg = '✔'
            this.loading = true
            return this.$store.dispatch('register', registerInfo)
          })
          .then(res => {
            this.message = res.message
            this.$router.push('/')
            this.$store.dispatch('getWebsites')
              .then(res => {
                this.$store.commit('setCurrentWebsite', res.websites[0])
              })
            this.$emit('routerToHome')
          })
          .catch(err => {
            this.usrMsg = err.message || '×'
            this.loading = false
          })
          .catch(err => {
            this.message = err.message || ''
            this.loading = false
          })
      }
    }
  },
  watch: { // 字段trim后发生改变了并触发了blur事件（lazy），进行一次验证
    username (val) {
      if (this.validateUsr(val)) {
        this.$store.dispatch('validateUsername', val)
          .then(() => {
            this.usrMsg = '✔'
          })
          .catch(err => {
            this.usrMsg = err.message || '×'
          })
      }
    },
    password (val) {
      this.validatePsw(val)
    },
    email (val) {
      this.validateEml(val)
    }
  },
  mounted () {
    waTag('conversion', '注册转化', '注册页', 2)
    this.$emit('routerTo', -1)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div.register-wrap {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
  }

  h1.title {
    margin: 20px 0;
    color: #9c9c9c;
    line-height: 36px;
    font-size: 26px;
    font-weight: normal;
    font-family: "Arial", sans-serif;
  }

  div.input {
    position: relative;
    padding: 10px;
  }

  div.input label {
    display: inline-block;
    width: 64px;
    line-height: 36px;
    font-size: 16px;
    color: #666666;
    font-weight: bold;
  }

  div.input input {
    display: inline-block;
    padding-left: 10px;
    padding-right: 26px;
    width: 200px;
    height: 30px;
    color: #777777;
  }

  div.input i.show-toggle {
    position: absolute;
    top: 18px;
    right: 16px;
    cursor: pointer;
  }

  div.input .msg {
    position: absolute;
    display: block;
    white-space: nowrap;
    color: darkred;
    font-weight: bold;
    font-size: 14px;
    left: 330px;
    top: 18px;
  }

  a.register-btn {
    text-decoration: none;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
    background: dodgerblue;
    padding: 10px 15px;
    border-radius: 8px;
  }

  a.register-btn + div.message {
    width: 100%;
    height: 50px;
    color: darkred;
    font-weight: bold;
    font-size: 14px;
    line-height: 50px;
    text-align: center;
  }

</style>
