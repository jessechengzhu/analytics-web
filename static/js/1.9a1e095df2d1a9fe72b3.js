webpackJsonp([1],{"1t9j":function(t,e){},"2Bxi":function(t,e,a){t.exports=a.p+"static/img/2.6ece896.jpg"},k9Qt:function(t,e,a){t.exports=a.p+"static/img/6.742c267.jpg"},lO7g:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("Dd8w"),n=a.n(i),r=a("NYxO"),s={name:"Home",data:function(){return{overview:[],loading:!0}},computed:n()({},Object(r.b)(["user"])),methods:{getOverview:function(){var t=this;this.$store.dispatch("getOverview").then(function(e){t.loading=!1,t.overview=e.overview}).catch(function(){})},toAnalytics:function(t){this.$store.commit("setCurrentWebsite",t),this.$router.push("/analytics")}},mounted:function(){this.$emit("routerTo",0),this.getOverview(),waTag("conversion","登录转化","首页",1),waTag("conversion","注册转化","首页",1),waTag("event","主页","访问","访问主页")}},c={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[t.user?i("el-row",[i("el-col",[i("h1",{staticClass:"title"},[t._v("网站总览")]),t._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{data:t.overview},on:{"row-click":t.toAnalytics}},[i("el-table-column",{attrs:{prop:"name",label:"网站名称"}}),t._v(" "),i("el-table-column",{attrs:{align:"center",prop:"pv",label:"今日浏览量(PV)"}}),t._v(" "),i("el-table-column",{attrs:{align:"center",prop:"uv",label:"今日流量(UV)"}}),t._v(" "),i("el-table-column",{attrs:{align:"center",prop:"ad",label:"今日平均访问时长"}}),t._v(" "),i("el-table-column",{attrs:{align:"center",prop:"ol",label:"实时在线人数"}})],1),t._v(" "),0===t.overview.length?i("p",{staticStyle:{"text-align":"center"}},[t._v("空空如也，快去\n        "),i("router-link",{attrs:{to:"/manage"}},[t._v("获取")]),t._v("\n        属于自己的网站分析吧。\n      ")],1):t._e()],1)],1):i("el-row",[i("el-col",[i("h1",{staticClass:"head"},[t._v("这里是我的毕业设计——用户行为分析平台")]),t._v(" "),i("h3",{staticClass:"introduce"},[t._v("一个中文网站流量分析平台，为网站的精细化运营决策提供数据支持，进而有效提高企业的投资回报率。来自"),i("em",[t._v("15级")]),t._v(" "),i("a",{staticStyle:{color:"#40acdb"},attrs:{href:"http://www.ntu.edu.cn/",target:"_blank"}},[t._v("南通大学")]),t._v(" "),i("a",{staticStyle:{color:"#40acdb"},attrs:{href:"http://cs.ntu.edu.cn/",target:"_blank"}},[t._v("信息科学技术学院（原计算机科学与技术学院）")]),t._v(" "),i("span",{staticStyle:{color:"#40acdb"}},[t._v("网络工程专业")]),t._v(" "),i("a",{staticStyle:{color:"#40acdb"},attrs:{href:"https://zhu.xj.cn/",target:"_blank"}},[t._v("朱星杰")]),t._v("\n        同学的开发，指导老师："),i("span",{staticStyle:{color:"#40acdb"}},[t._v("陈森博")]),t._v("。")]),t._v(" "),i("h3",{staticClass:"introduce"},[t._v("【更新】嘿嘿，我已经毕业啦，当时这玩意算是超低配版“百度统计”，勉强能用。现在已将服务端全部下掉了，目前都是模拟数据哦~")]),t._v(" "),i("h3",{staticClass:"introduce"},[i("router-link",{staticStyle:{color:"darkred","font-weight":"600"},attrs:{to:"/login"}},[t._v("开始吧")])],1),t._v(" "),i("h3",{staticClass:"introduce"},[t._v("提供演示账号：用户名 admin    密码 123456  部分效果如折线图因缺少数据可能得不到展示")])])],1),t._v(" "),i("el-row",[i("el-col",[i("h1",{staticClass:"title"},[t._v("操作指南")]),t._v(" "),i("ol",[i("li",[i("h4",[t._v("添加一个网站")]),t._v(" "),i("p",[t._v("点击左侧管理进入管理页面，点击右上角新增网站按钮，依次输入自己网站的域名、首页地址和标题（可选）。")]),t._v(" "),i("img",{attrs:{src:a("tGse"),alt:"1"}}),t._v(" "),i("img",{attrs:{src:a("2Bxi"),alt:"2"}})]),t._v(" "),i("li",[i("h4",[t._v("代码安装")]),t._v(" "),i("p",[t._v("点击获取代码，即可获取带有属于自己网站唯一跟踪ID的JS埋点代码，将这段代码添加到网站全部页面的<head>标签中。")]),t._v(" "),i("p",[t._v("\n            代码安装完毕后，可以通过点击刷新按钮重新检测代码安装状态，本功能通过抓取网站页面，分析是否安装了正确的统计代码，所以若您的网站打开速度较慢，或者限制程序抓取网页，会导致系统无法判断，但不影响网站正常分析。")]),t._v(" "),i("img",{attrs:{src:a("lQgp"),alt:"3"}}),t._v(" "),i("img",{attrs:{src:a("poA4"),alt:"4"}}),t._v(" "),i("img",{attrs:{src:a("vGcb"),alt:"5"}})]),t._v(" "),i("li",[i("h4",[t._v("一切准备就绪")]),t._v(" "),i("p",[t._v("等一段时间，当你的网站有一定的访问量时，你就可以看到我们为您的网站收集到的数据了，若您添加了多个网站，你可以在上方选择查看哪一个网站。")]),t._v(" "),i("img",{attrs:{src:a("k9Qt"),alt:"6"}})])]),t._v(" "),i("p",{staticClass:"footer"},[t._v("©Jesse Zhu  "),i("a",{attrs:{href:"http://www.miitbeian.gov.cn/",target:"_blank"}},[t._v("苏ICP备19002725号")])])])],1)],1)},staticRenderFns:[]};var l=a("VU/8")(s,c,!1,function(t){a("1t9j")},"data-v-7bc0241c",null);e.default=l.exports},lQgp:function(t,e,a){t.exports=a.p+"static/img/3.9066e7c.jpg"},poA4:function(t,e,a){t.exports=a.p+"static/img/4.a104312.jpg"},tGse:function(t,e,a){t.exports=a.p+"static/img/1.342d770.jpg"},vGcb:function(t,e,a){t.exports=a.p+"static/img/5.69861ac.jpg"}});
//# sourceMappingURL=1.9a1e095df2d1a9fe72b3.js.map