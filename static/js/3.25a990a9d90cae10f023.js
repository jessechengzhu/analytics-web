webpackJsonp([3],{dIqY:function(s,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={name:"Register",data:function(){return{username:"",usrMsg:"",password:"",type:"password",toggleFlag:!1,pswMsg:"",email:"",emlMsg:"",message:"",loading:!1}},methods:{showToggle:function(){this.toggleFlag=!this.toggleFlag,this.toggleFlag?this.type="text":this.type="password"},validateUsr:function(s){return s.length<3||s.length>10?(this.usrMsg="用户名长度在3到10个字符",!1):s.indexOf(" ")>=0?(this.usrMsg="用户名中间不能有空格",!1):(this.usrMsg="✔",!0)},validatePsw:function(s){return s.length<6||s.length>16?(this.pswMsg="密码长度在6-16之间",!1):/^[\x20-\x7E]*$/.test(s)?(this.pswMsg="✔",!0):(this.pswMsg="密码不能特殊字符",!1)},validateEml:function(s){var e=new RegExp("^[a-zA-Z0-9][\\w\\.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\\w\\.-]*[a-zA-Z0-9]\\.[a-zA-Z][a-zA-Z\\.]*[a-zA-Z]$");return 0===s.length||(e.test(s)?(this.emlMsg="✔",!0):(this.emlMsg="邮箱格式不正确",!1))},register:function(){var s=this,e=this.validateUsr(this.username),t=this.validatePsw(this.password),a=this.validateEml(this.email);if(e&&t&&a){var i={username:this.username,password:this.password,email:this.email};this.$store.dispatch("validateUsername",this.username).then(function(e){return s.usrMsg="✔",s.loading=!0,s.$store.dispatch("register",i)}).then(function(e){s.message=e.message,s.$router.push("/"),s.$store.dispatch("getWebsites").then(function(e){s.$store.commit("setCurrentWebsite",e.websites[0])}),s.$emit("routerToHome")}).catch(function(e){s.usrMsg=e.message||"×",s.loading=!1}).catch(function(e){s.message=e.message||"",s.loading=!1})}}},watch:{username:function(s){var e=this;this.validateUsr(s)&&this.$store.dispatch("validateUsername",s).then(function(){e.usrMsg="✔"}).catch(function(s){e.usrMsg=s.message||"×"})},password:function(s){this.validatePsw(s)},email:function(s){this.validateEml(s)}},mounted:function(){waTag("conversion","注册转化","注册页",2),this.$emit("routerTo",-1)}},i={render:function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("div",{staticClass:"register-wrap"},[t("h1",{staticClass:"title"},[s._v("注册")]),s._v(" "),t("div",{staticClass:"input"},[t("label",{attrs:{for:"usrIpt"}},[s._v("用户名")]),s._v(" "),t("input",{directives:[{name:"model",rawName:"v-model.lazy.trim",value:s.username,expression:"username",modifiers:{lazy:!0,trim:!0}}],attrs:{id:"usrIpt"},domProps:{value:s.username},on:{change:function(e){s.username=e.target.value.trim()},blur:function(e){return s.$forceUpdate()}}}),s._v(" "),t("span",{staticClass:"msg"},[s._v(s._s(s.usrMsg))])]),s._v(" "),t("div",{staticClass:"input"},[t("label",{attrs:{for:"pswIpt"}},[s._v("密码")]),s._v(" "),t("input",{directives:[{name:"model",rawName:"v-model.lazy",value:s.password,expression:"password",modifiers:{lazy:!0}}],attrs:{type:s.type,id:"pswIpt"},domProps:{value:s.password},on:{change:function(e){s.password=e.target.value}}}),s._v(" "),t("span",{staticClass:"msg"},[s._v(s._s(s.pswMsg))])]),s._v(" "),t("div",{staticClass:"input"},[t("label",{attrs:{for:"emailIpt"}},[s._v("邮箱")]),s._v(" "),t("input",{directives:[{name:"model",rawName:"v-model.trim.lazy",value:s.email,expression:"email",modifiers:{trim:!0,lazy:!0}}],attrs:{type:"email",id:"emailIpt"},domProps:{value:s.email},on:{change:function(e){s.email=e.target.value.trim()},blur:function(e){return s.$forceUpdate()}}}),s._v(" "),t("span",{staticClass:"msg"},[s._v(s._s(s.emlMsg))])]),s._v(" "),t("a",{staticClass:"register-btn",attrs:{href:"javascript:void(0)"},on:{click:s.register}},[s._v("注册")]),s._v(" "),t("div",{directives:[{name:"loading",rawName:"v-loading",value:s.loading,expression:"loading"}],staticClass:"message"},[s._v(s._s(s.message))])])},staticRenderFns:[]};var r=t("VU/8")(a,i,!1,function(s){t("m+Gb")},"data-v-dfc9fbcc",null);e.default=r.exports},"m+Gb":function(s,e){}});
//# sourceMappingURL=3.25a990a9d90cae10f023.js.map