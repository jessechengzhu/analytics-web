<template>
  <div>
    <h1>注册</h1>
    <label>
      用户名<input v-model.lazy.trim="username"/>
      <span class="msg">{{usrMsg}}</span>
    </label><br>
    <label>
      密码<input v-model.lazy="password" :type="type"/>
      <span class="show-toggle" @click="showToggle">{{toggleText}}</span>
      <span class="msg">{{pswMsg}}</span>
    </label><br>
    <label>
      邮箱<input v-model.trim.lazy="email" type="email"/>
      <span class="msg">{{emlMsg}}</span>
    </label><br>
    <button @click="register">注册</button>
    <p>{{message}}</p>
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

      toggleText: '显示',
      toggleFlag: false,
      pswMsg: '',

      email: '',
      emlMsg: '',

      message: ''
    }
  },
  methods: {
    showToggle () {
      this.toggleFlag = !this.toggleFlag
      if (this.toggleFlag) {
        this.type = 'text'
        this.toggleText = '隐藏'
      } else {
        this.type = 'password'
        this.toggleText = '显示'
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
        this.emlMsg = '邮箱不能为空'
        return false
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
            this.message = '注册中...'
            return this.$store.dispatch('register', registerInfo)
          })
          .then(res => {
            this.message = res.message
            this.$router.push('/')
            this.$store.dispatch('getWebsites')
              .then(res=>{
                this.$store.commit('setCurrentWebsite', res.websites[0])
              })
            this.$emit('routerToHome')
          })
          .catch(err => {
            this.usrMsg = err.message || '×'
          })
          .catch(err => {
            this.message = err.message || ''
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
    this.$emit('routerTo',-1)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .show-toggle {
    cursor: pointer;
  }
</style>
