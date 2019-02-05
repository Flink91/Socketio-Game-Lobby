(function(e){function t(t){for(var n,a,s=t[0],c=t[1],l=t[2],A=0,u=[];A<s.length;A++)a=s[A],r[a]&&u.push(r[a][0]),r[a]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);m&&m(t);while(u.length)u.shift()();return i.push.apply(i,l||[]),o()}function o(){for(var e,t=0;t<i.length;t++){for(var o=i[t],n=!0,a=1;a<o.length;a++){var s=o[a];0!==r[s]&&(n=!1)}n&&(i.splice(t--,1),e=c(c.s=o[0]))}return e}var n={},a={app:0},r={app:0},i=[];function s(e){return c.p+"js/"+({about:"about",game:"game",room:"room"}[e]||e)+"."+{about:"bc18978e",game:"4045745f",room:"24ba7e4b"}[e]+".js"}function c(t){if(n[t])return n[t].exports;var o=n[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,c),o.l=!0,o.exports}c.e=function(e){var t=[],o={game:1,room:1};a[e]?t.push(a[e]):0!==a[e]&&o[e]&&t.push(a[e]=new Promise(function(t,o){for(var n="css/"+({about:"about",game:"game",room:"room"}[e]||e)+"."+{about:"31d6cfe0",game:"70e62f38",room:"dae4f16b"}[e]+".css",r=c.p+n,i=document.getElementsByTagName("link"),s=0;s<i.length;s++){var l=i[s],A=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(A===n||A===r))return t()}var u=document.getElementsByTagName("style");for(s=0;s<u.length;s++){l=u[s],A=l.getAttribute("data-href");if(A===n||A===r)return t()}var m=document.createElement("link");m.rel="stylesheet",m.type="text/css",m.onload=t,m.onerror=function(t){var n=t&&t.target&&t.target.src||r,i=new Error("Loading CSS chunk "+e+" failed.\n("+n+")");i.request=n,delete a[e],m.parentNode.removeChild(m),o(i)},m.href=r;var d=document.getElementsByTagName("head")[0];d.appendChild(m)}).then(function(){a[e]=0}));var n=r[e];if(0!==n)if(n)t.push(n[2]);else{var i=new Promise(function(t,o){n=r[e]=[t,o]});t.push(n[2]=i);var l,A=document.createElement("script");A.charset="utf-8",A.timeout=120,c.nc&&A.setAttribute("nonce",c.nc),A.src=s(e),l=function(t){A.onerror=A.onload=null,clearTimeout(u);var o=r[e];if(0!==o){if(o){var n=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src,i=new Error("Loading chunk "+e+" failed.\n("+n+": "+a+")");i.type=n,i.request=a,o[1](i)}r[e]=void 0}};var u=setTimeout(function(){l({type:"timeout",target:A})},12e4);A.onerror=A.onload=l,document.head.appendChild(A)}return Promise.all(t)},c.m=e,c.c=n,c.d=function(e,t,o){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(c.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)c.d(o,n,function(t){return e[t]}.bind(null,n));return o},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/",c.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],A=l.push.bind(l);l.push=t,l=l.slice();for(var u=0;u<l.length;u++)t(l[u]);var m=A;i.push([0,"chunk-vendors"]),o()})({0:function(e,t,o){e.exports=o("56d7")},"0c23":function(e,t){e.exports="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAEAAAAAAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCACAAIYDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD5nooor8DP9oAooooAKKKKACiiigBQ2KNxpKKACiiigAozRRQA7fxRvptFArIkBzRUdFAuUKKKKCgooooAKKKKACiiigAooooAKKKKACiiigAooooAKKAuaKAHsOKZTnNNoFEKKKKBhRRRQAUUUUAFFFFABTkHNNp6nigUhCdxo8ukb71PoJuMYbTSU5+tNoLHI1FNoqeUnlBj81FFFUUFOUZWm05DzQJiFdtJUjdKjoBBRTgMim0DCiiigApU+9SUA4NADyuTS0gbNLmgzGv1ptOc02gtBRSqN1FFx3EooooAKclNp6jAoJkLTWXNOooJI88UUrcNSUGgUUUUAFFFFABQDiiigAJzRRRQA5WxRTaKVhWCiiimMMVIOlN34FOHSgmQUZzQeRTSmKCQfpTaevApaCuYj60VIOajPWgadwooooGFFFFABRRRQAUUUUAFFFFABUg6VHRnFAmrjy2KQvmm0UBYN1FFFAwooooAKKKKACiiigAooooAULuopUOKKnUnUbRRRVFBRRRQAUUUUAFFFAGaACil2GjYaAuJRS7DRtNAXEopdppCMUAFFFFADo6KWFck0UrES3P/2Q=="},"15dc":function(e,t,o){},"1c3d":function(e,t,o){},"1cd9":function(e,t,o){"use strict";var n=o("1c3d"),a=o.n(n);a.a},2761:function(e,t,o){},"2b2a":function(e,t,o){},"404e":function(e,t,o){"use strict";var n=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("v-layout",{attrs:{row:"","justify-center":""}},[o("v-dialog",{attrs:{"max-width":"600px"},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[o("v-card",[o("v-toolbar",{attrs:{dense:"",color:"primary",dark:""}},[o("v-toolbar-title",[e._v("New Room")])],1),o("v-card-text",[o("v-container",{attrs:{"grid-list":"","xs-12":""}},[o("v-layout",{attrs:{wrap:""}},[o("v-form",{ref:"form",staticClass:"join-form",attrs:{"lazy-validation":""},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[o("v-subheader",{staticClass:"pl-0"},[e._v("Room name")]),o("v-text-field",{attrs:{rules:e.nameRules,counter:30,label:"Name",required:""},model:{value:e.roomName,callback:function(t){e.roomName=t},expression:"roomName"}}),o("v-subheader",{staticClass:"pl-0"},[e._v("Room size")]),o("v-slider",{attrs:{"always-dirty":"",ticks:"","tick-size":"3","tick-labels":e.ticksLabels,"thumb-label":"always",max:8,min:2},model:{value:e.slider,callback:function(t){e.slider=t},expression:"slider"}}),o("v-select",{attrs:{items:e.games,label:"Game",solo:"",rules:e.gameSelectRules},model:{value:e.gameSelect,callback:function(t){e.gameSelect=t},expression:"gameSelect"}}),o("v-btn",{attrs:{disabled:!e.valid},on:{click:e.submit}},[e._v("Create and join")]),e._v("\n              "+e._s(e.gameSelect)+"\n            ")],1)],1)],1)],1)],1)],1)],1)},a=[],r=(o("a481"),o("cadf"),o("551c"),o("097d"),{props:["show"],data:function(){return{dialog:!1,valid:!0,games:["Connect 4","Connect 4","Connect 4"],gameSelect:null,gameSelectRules:[function(e){return!!e||"A Game must be selected"}],roomName:"",nameRules:[function(e){return!!e||"Name is required"},function(e){return e&&e.length<=30||"Name must be less than 30 characters"},function(e){return e&&e.replace(/\s/g,"").length>0||"Name cannot be only spaces"}],slider:2,ticksLabels:["2","3","4","5","6","7","8"]}},methods:{submit:function(){this.$refs.form.validate()&&this.sendHost()},sendHost:function(){var e=this;this.$socket.emit("HOST",this.roomName,this.slider,this.gameSelect,function(t){e.clear(),e.dialog=!1,e.$router.push({name:"room",params:{roomID:t}})})},clear:function(){this.$refs.form.reset()}},watch:{show:function(){this.dialog=!0}}}),i=r,s=(o("7ee7"),o("2877")),c=o("6544"),l=o.n(c),A=o("8336"),u=o("b0af"),m=o("99d9"),d=o("a523"),f=o("169a"),g=o("4bd4"),p=o("a722"),h=o("b56d"),v=o("ba0d"),b=o("e0c7"),w=o("2677"),C=o("71d9"),K=o("2a7f"),E=Object(s["a"])(i,n,a,!1,null,"37a83fae",null);E.options.__file="CreateRoomModal.vue";t["a"]=E.exports;l()(E,{VBtn:A["a"],VCard:u["a"],VCardText:m["b"],VContainer:d["a"],VDialog:f["a"],VForm:g["a"],VLayout:p["a"],VSelect:h["a"],VSlider:v["a"],VSubheader:b["a"],VTextField:w["a"],VToolbar:C["a"],VToolbarTitle:K["a"]})},4791:function(e,t,o){"use strict";var n=o("f1e4"),a=o.n(n);a.a},"56d7":function(e,t,o){"use strict";o.r(t);o("cadf"),o("551c"),o("097d");var n=o("2b0e"),a=o("ce5b"),r=o.n(a),i=o("bb71");o("da64");n["default"].use(i["a"],{iconfont:"md"});var s=o("2f62"),c={connected:!1,loading:!1,info:null,error:null},l={info:function(e){return e.info},loading:function(e){return e.loading}},A={setLoading:function(e,t){e.loading=t},setInfo:function(e,t){e.error=t},clearInfo:function(e){e.info=null},SOCKET_connect:function(e){console.log("%c socket_connect","color:green"),e.connected=!0,e.info={message:"Connected!",type:"success",time:"4000"}},SOCKET_disconnect:function(e){console.log("%c socket_disconnect","color:orange"),e.connected=!1},SOCKET_reconnect:function(){console.log("%c socket_connect_error","color:orange")},SOCKET_reconnect_attempt:function(){console.log("%c socket_reconnecting","color:orange")},SOCKET_reconnecting:function(e){console.log("%c socket_reconnect_attempt","color:orange"),e.info={message:"Disconnected. Trying to reconnect...",type:"error"}},SOCKET_reconnect_error:function(){console.log("%c socket_reconnect_error","color:red")},SOCKET_connect_error:function(){console.log("%c socket_connect_timeout","color:red")},SOCKET_connect_timeout:function(){console.log("%c socket_connect_timeout","color:red")},SOCKET_connecting:function(){console.log("%c socket_connecting","color:orange")},SOCKET_ERROR:function(e,t){console.log("%c socket_error","color:red"),e.info=t}},u={clearInfo:function(e){var t=e.commit;t("clearInfo")}},m={state:c,getters:l,mutations:A,actions:u},d=(o("7514"),o("7f7f"),o("8c4f")),f=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("app-join-modal"),e.name?o("v-container",{attrs:{"grid-list-sm":""}},[o("v-layout",{attrs:{row:"",wrap:""}},[o("v-flex",{attrs:{xs12:"",sm8:"",lg9:""}},[o("app-room-list")],1),o("v-flex",{attrs:{xs12:"",sm4:"",lg3:""}},[o("app-joining-list")],1)],1)],1):e._e()],1)},g=[],p=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("v-layout",{attrs:{row:"","justify-center":""}},[o("v-dialog",{attrs:{value:e.dialog,persistent:"","max-width":"600px"}},[o("v-card",[o("v-toolbar",{attrs:{dense:"",color:"primary",dark:""}},[o("v-toolbar-title",[e._v("Pick a name and a color!")])],1),o("v-card-text",[o("v-container",{staticClass:"py-0",attrs:{"grid-list":"","xs-12":""}},[o("v-layout",{attrs:{wrap:""}},[o("v-flex",{attrs:{xs12:""}},[o("v-form",{ref:"form",staticClass:"join-form",attrs:{"lazy-validation":""},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[o("v-text-field",{attrs:{rules:e.nameRules,counter:10,label:"Name","single-line":"",solo:"",required:""},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),o("app-avatar-picker",{on:{color:e.getColor}}),o("v-checkbox",{attrs:{rules:[function(e){return!!e||"You must agree to continue!"}],label:"Do you agree to the terms and conditions?",required:""},model:{value:e.checkbox,callback:function(t){e.checkbox=t},expression:"checkbox"}}),o("v-btn",{attrs:{disabled:!e.valid,block:"",large:""},on:{click:e.submit}},[e._v("Join")])],1)],1)],1)],1)],1),o("v-flex",{attrs:{xs12:""}},[o("v-expansion-panel",{staticClass:"terms"},[o("v-expansion-panel-content",[o("div",{attrs:{slot:"header"},slot:"header"},[e._v("Terms and conditions")]),o("v-card",[o("v-card-text",[e._v("Put your terms and condititons here.\n                "),o("ul",[o("li",[e._v("Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.")]),o("li",[e._v("From time to time this website may also include links to other websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).")])])])],1)],1)],1)],1)],1)],1)],1)},h=[],v=(o("a481"),function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("v-container",[o("v-layout",{attrs:{"align-center":"","justify-center":"",row:"","fill-height":""}},[o("v-flex",{attrs:{"text-xs-right":""}},[o("v-btn",{attrs:{fab:"",small:""},on:{click:e.prevColor}},[o("v-icon",[e._v("keyboard_arrow_left")])],1)],1),o("v-flex",{attrs:{"text-xs-center":""}},[o("div",{staticClass:"square",style:{"background-color":e.colors[e.color]}})]),o("v-flex",{attrs:{"text-xs-left":""}},[o("v-btn",{attrs:{fab:"",small:""},on:{click:e.nextColor}},[o("v-icon",[e._v("keyboard_arrow_right")])],1)],1)],1)],1)}),b=[],w={data:function(){return{colors:["#FF0000","#C13F3F","#EEB70C","#7F6900","#2CFC60","#110754","#8A0499","#300242","#0000FF","#3F6022","#4f02ff","#9B0BB5","#0B0003"],color:Math.floor(13*Math.random())}},methods:{nextColor:function(){this.color>=this.colors.length-1?this.color=0:this.color++,this.submit()},prevColor:function(){0==this.color?this.color=this.colors.length-1:this.color--,this.submit()},submit:function(){this.$emit("color",this.colors[this.color])}},created:function(){this.submit()}},C=w,K=(o("87e6"),o("2877")),E=o("6544"),R=o.n(E),B=o("8336"),F=o("a523"),_=o("0e8f"),D=o("132d"),U=o("a722"),k=Object(K["a"])(C,v,b,!1,null,"4d8d8ce6",null);k.options.__file="AvatarPicker.vue";var M=k.exports;R()(k,{VBtn:B["a"],VContainer:F["a"],VFlex:_["a"],VIcon:D["a"],VLayout:U["a"]});var x={data:function(){return{dialog:!1,valid:!0,name:"",nameRules:[function(e){return!!e||"Name is required"},function(e){return e&&e.length<=10||"Name must be less than 10 characters"},function(e){return e&&e.replace(/\s/g,"").length>0||"Name cannot be only spaces"}],color:"",checkbox:!1}},computed:{username:function(){return this.$store.getters.name},error:function(){return window.scrollTo(0,0),this.$store.getters.error}},created:function(){this.dialog=null==this.$store.getters.name},methods:{getColor:function(e){this.color=e},submit:function(){this.$refs.form.validate()&&(this.$socket.emit("NEW_USER",{username:this.name,color:this.color}),this.clear(),this.dialog=!1)},clear:function(){this.$refs.form.reset()}},components:{"app-avatar-picker":M}},y=x,Q=(o("f693"),o("b0af")),S=o("99d9"),T=o("ac7c"),V=o("169a"),O=o("cd55"),I=o("49e2"),N=o("4bd4"),j=o("2677"),H=o("71d9"),P=o("2a7f"),G=Object(K["a"])(y,p,h,!1,null,"0eebc340",null);G.options.__file="JoinModal.vue";var J=G.exports;R()(G,{VBtn:B["a"],VCard:Q["a"],VCardText:S["b"],VCheckbox:T["a"],VContainer:F["a"],VDialog:V["a"],VExpansionPanel:O["a"],VExpansionPanelContent:I["a"],VFlex:_["a"],VForm:N["a"],VLayout:U["a"],VTextField:j["a"],VToolbar:H["a"],VToolbarTitle:P["a"]});var Y=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("v-layout",{attrs:{row:""}},[o("v-flex",{attrs:{xs12:""}},[o("v-card",[o("v-toolbar",{attrs:{dense:"",dark:"",color:"primary"}},[o("v-toolbar-title",[e._v("Rooms")]),o("v-spacer"),o("v-btn",{attrs:{icon:""}},[o("v-icon",{on:{click:e.showCreateRoomModal}},[e._v("add")])],1)],1),o("app-create-room-modal",{attrs:{show:e.showRoomModal}}),!e.rooms||e.rooms.length<=0?o("div",{staticClass:"placeholder"},[o("p",[e._v("No rooms yet")]),o("v-btn",{on:{click:e.showCreateRoomModal}},[e._v("Create the first one!")])],1):o("div",[o("v-list",{attrs:{"two-line":""}},[e._l(e.rooms,function(t,n){return[t.header?o("v-subheader",{key:t.header},[e._v(e._s(t.header))]):e._e(),o("v-divider",{key:n}),o("v-list-tile",{key:t.readableName,attrs:{avatar:""}},[o("v-list-tile-avatar",[o("img",{attrs:{src:e.images[t.game.replace(/\s/g,"")]}})]),o("v-list-tile-content",[o("v-list-tile-title",[e._v(e._s(t.readableName)+" (Host: "+e._s(t.clients[0].name)+")")]),o("v-list-tile-sub-title",[e._v(e._s(t.game)+" "+e._s(t.clients.length)+"/"+e._s(t.size))])],1),o("v-btn",{on:{click:function(o){e.joinRoom(t.id)}}},[e._v("Join")])],1)]})],2)],1)],1)],1)],1)},Z=[],L=o("404e"),W={data:function(){return{showRoomModal:!1,images:{JustChat:o("0c23"),Default:o("8901"),ConnectWhat:o("da0e")}}},computed:{rooms:function(){return this.$store.getters.rooms}},methods:{joinRoom:function(e){var t=this;null!=e&&void 0!=e||alert("something went wrong..."),this.$socket.emit("JOIN",e,function(){t.$router.push({name:"room",params:{roomID:e}})})},showCreateRoomModal:function(){var e=this;this.showRoomModal=!1,setTimeout(function(){e.showRoomModal=!0},0)}},components:{"app-create-room-modal":L["a"]}},q=W,z=(o("1cd9"),o("ce7e")),$=o("8860"),X=o("ba95"),ee=o("c954"),te=o("5d23"),oe=o("9910"),ne=o("e0c7"),ae=Object(K["a"])(q,Y,Z,!1,null,"42e5e3ca",null);ae.options.__file="RoomList.vue";var re=ae.exports;R()(ae,{VBtn:B["a"],VCard:Q["a"],VDivider:z["a"],VFlex:_["a"],VIcon:D["a"],VLayout:U["a"],VList:$["a"],VListTile:X["a"],VListTileAvatar:ee["a"],VListTileContent:te["a"],VListTileSubTitle:te["b"],VListTileTitle:te["c"],VSpacer:oe["a"],VSubheader:ne["a"],VToolbar:H["a"],VToolbarTitle:P["a"]});var ie=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("v-layout",{attrs:{row:""}},[o("v-flex",{attrs:{xs12:""}},[o("v-card",{staticClass:"joining-card"},[o("v-toolbar",{attrs:{dense:"",color:"white"}},[o("v-toolbar-title",[e._v("People joining")])],1),o("v-card-text",{staticClass:"joining-card-text"},e._l(e.last10BroadcastMessages,function(t,n){return o("div",{key:n,staticClass:"users"},[o("p",{staticClass:"new-user",style:[t.disconnected?{color:"grey",fontStyle:"italic"}:{color:t.color}]},[o("span",{staticClass:"font-weight-bold"},[e._v("\n              "+e._s(t.name)+"\n              "),t.disconnected?o("span",[e._v("dis")]):e._e(),e._v("connected\n            ")])])])}),0)],1)],1)],1)},se=[],ce=o("2909"),le={data:function(){return{users:[]}},computed:{last10BroadcastMessages:function(){return this.$store.getters.last10BroadcastMessages}},methods:{},mounted:function(){var e=this;this.$socket.on("NEW_USER",function(t){e.users=[].concat(Object(ce["a"])(e.users),[t])})}},Ae=le,ue=(o("4791"),Object(K["a"])(Ae,ie,se,!1,null,"0de533fb",null));ue.options.__file="JoiningList.vue";var me=ue.exports;R()(ue,{VCard:Q["a"],VCardText:S["b"],VFlex:_["a"],VLayout:U["a"],VToolbar:H["a"],VToolbarTitle:P["a"]});var de={data:function(){return{}},computed:{name:function(){return this.$store.getters.name}},sockets:{connect:function(){}},components:{"app-join-modal":J,"app-room-list":re,"app-joining-list":me}},fe=de,ge=Object(K["a"])(fe,f,g,!1,null,null,null);ge.options.__file="Rooms.vue";var pe=ge.exports;R()(ge,{VContainer:F["a"],VFlex:_["a"],VLayout:U["a"]}),n["default"].use(d["a"]);var he=new d["a"]({routes:[{path:"/",name:"home",component:pe},{path:"/about",name:"about",component:function(){return o.e("about").then(o.bind(null,"f820"))}},{params:["roomID"],path:"/room/:roomID",name:"room",component:function(){return o.e("room").then(o.bind(null,"3ab1"))}},{params:["gameID"],path:"/game/:gameID",name:"game",component:function(){return o.e("game").then(o.bind(null,"7d36"))}}]}),ve={name:null,color:null,users:[],broadcastMessages:[],rooms:null,messages:[],room:null,isHost:!1},be={conncected:function(e){return e.connected},name:function(e){return e.name},isHost:function(e){return e.isHost},rooms:function(e){return e.rooms},room:function(e){return e.room},users:function(e){return e.users},messages:function(e){return e.messages},last5Users:function(e){return e.users.length<=5?e.users:e.users.slice(-5)},last10BroadcastMessages:function(e){return e.broadcastMessages.length<=10?e.broadcastMessages:e.broadcastMessages.slice(-10)},isAllReady:function(e){return e.room.clients.filter(function(e){return!1===e.ready}).length<=1&&e.room.clients.length>1}},we={SOCKET_USER_DISCONNECTED:function(e,t){if(console.log("%c socket_on_user_disconnected","color:green"),console.log(t),console.log(e.users),t){var o=e.users.find(function(e){return e.id===t.id}),n=e.users.indexOf(o);e.users.splice(n,1),t.disconnected=!0,e.broadcastMessages.push(t)}},SOCKET_JOINED_SERVER:function(e,t){console.log("%c socket_on_joined_server","color:green"),e.name=t.username,e.color=t.color},SOCKET_NEW_USER:function(e,t){console.log("%c socket_on_new_user","color:green"),e.users.push(t),e.broadcastMessages.push(t)},SOCKET_HOST:function(e){console.log("%c socket_host","color:green"),e.isHost=!0},SOCKET_JOIN:function(e,t){console.log("%c socket_join","color:green"),e.room=t.room},SOCKET_GET_ROOM_INFO:function(e,t){e.room=t},SOCKET_UPDATE_ROOMS:function(e,t){console.log("%c socket_update_rooms"+t,"color:green");var o=[];for(var n in t)t.hasOwnProperty(n)&&o.push(t[n]);e.rooms=o,console.log(e.rooms)},SOCKET_CHAT_MESSAGE:function(e,t){console.log("%c socket_chat_message","color:green"),e.messages.push(t)},setUser:function(e,t){e.user=t},clearMessages:function(e){e.messages=[]}},Ce={SOCKET_KICKED:function(e,t){var o=e.state,n=(e.commit,e.rootState);console.log("%c socket_kicked","color:green"),o.room=null,o.messages=[],n.general.info={message:"You were kicked from the room",type:"warning",time:"4000"},he.push("/")}},Ke={state:ve,getters:be,mutations:we,actions:Ce},Ee={currentPlayer:null,boardState:[],options:[],isRunning:!0,winner:null},Re={game:function(e){return e.game},winner:function(e){return e.winner},board:function(e){return e.boardState},currentPlayer:function(e){return e.currentPlayer}},Be={setCurrentPlayer:function(e,t){e.currentPlayer=t},setBoard:function(e,t){e.boardState=t},clearGame:function(e){e.boardState=[],e.currentPlayer=null,e.isRunning=!1,e.winner=null},endGame:function(e,t){-1==t?alert("Draw! \n Returning to Lobby..."):(alert(e.currentPlayer.name+" won!\n Returning to Lobby..."),he.go(-1))},setWinner:function(e,t){e.winner=t},setRunning:function(e,t){e.isRunning=t},SOCKET_END_GAME:function(e,t){e.winner=t.winner,e.isRunning=!1}},Fe={SOCKET_GAME_TURN:function(e,t){var o=e.commit;o("setBoard",t[0]),o("setCurrentPlayer",t[1])},SOCKET_END_GAME:function(e,t){var o=e.commit;o("setBoard",t[0]),setTimeout(function(){o("endGame",t[1]),o("clearGame")},100)},SOCKET_START_GAME:function(e,t){e.state;var o=e.commit,n=e.rootState;console.log("%c socket_start_game","color:green"),he.push({name:"game",params:{gameID:n.user.room.id}}),o("setRunning",!0),o("setBoard",[[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]]),o("setCurrentPlayer",t[1])}},_e={state:Ee,getters:Re,mutations:Be,actions:Fe};n["default"].use(s["a"]);var De=new s["a"].Store({state:{},mutations:{},actions:{},modules:{general:m,user:Ke,game:_e}}),Ue=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("v-app",[["room","game"].indexOf(e.$route.name)>-1?e._e():o("v-toolbar",{attrs:{app:""}},[o("v-toolbar-title",{staticClass:"headline text-uppercase"},[o("span",[e._v("Chat Rooms ")]),o("span",{staticClass:"font-weight-light"},[e._v("with SocketIO & Vue")])]),o("v-spacer"),o("v-btn",{attrs:{flat:"",to:"/about"}},[e._v("About")])],1),o("v-content",[o("router-view"),e.info?o("v-layout",{attrs:{row:""}},[o("v-flex",{attrs:{xs12:""}},[o("app-toast",{attrs:{text:e.info.message,type:e.info.type,time:e.info.time}})],1)],1):e._e()],1)],1)},ke=[],Me={data:function(){return{}},computed:{info:function(){return window.scrollTo(0,0),this.$store.getters.info}}},xe=Me,ye=o("7496"),Qe=o("549c"),Se=Object(K["a"])(xe,Ue,ke,!1,null,null,null);Se.options.__file="App.vue";var Te=Se.exports;R()(Se,{VApp:ye["a"],VBtn:B["a"],VContent:Qe["a"],VFlex:_["a"],VLayout:U["a"],VSpacer:oe["a"],VToolbar:H["a"],VToolbarTitle:P["a"]});var Ve=o("5132"),Oe=o.n(Ve),Ie=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("v-snackbar",{staticClass:"myAlert",attrs:{value:!0,color:e.type,timeout:e.timeout},on:{input:e.onClose}},[e._v("\n  "+e._s(e.text)+"\n  "),o("v-btn",{attrs:{flat:"",fab:""},on:{click:e.onClose}},[o("v-icon",[e._v("close")])],1)],1)},Ne=[],je={props:["text","type","time"],data:function(){return{timeout:0}},created:function(){this.time&&(this.timeout=this.time)},methods:{onClose:function(){this.$store.dispatch("clearInfo"),this.$emit("dismissed")}}},He=je,Pe=(o("a13b"),o("2db4")),Ge=Object(K["a"])(He,Ie,Ne,!1,null,null,null);Ge.options.__file="Toast.vue";var Je=Ge.exports;R()(Ge,{VBtn:B["a"],VIcon:D["a"],VSnackbar:Pe["a"]});var Ye=o("123d"),Ze=o.n(Ye);n["default"].use(Ze.a),n["default"].config.productionTip=!1,n["default"].use(r.a,{theme:{primary:"#3f51b5",secondary:"#f44336",accent:"#ffc107",error:"#ff5722",warning:"#ff9800",info:"#00bcd4",success:"#8bc34a"}}),n["default"].use(new Oe.a({debug:!0,connection:"".concat(window.location.host),vuex:{store:De,actionPrefix:"SOCKET_",mutationPrefix:"SOCKET_"}})),n["default"].component("app-toast",Je),new n["default"]({store:De,router:he,render:function(e){return e(Te)},created:function(){this.$router.push("/"),this.$store.commit("setLoading",!1)},watch:{}}).$mount("#app")},"7ee7":function(e,t,o){"use strict";var n=o("2761"),a=o.n(n);a.a},"87e6":function(e,t,o){"use strict";var n=o("e9a4"),a=o.n(n);a.a},8901:function(e,t){e.exports="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAEAAAAAAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCACAAIYDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9Bcj0oz7UgooAUEUlFFACgZpKVe/0pKACiiigAI3UmwUtAoAKKKKACiiigAooooAVjmikooAKKKKACiigDNACr3+lJSrSUAHaijtRQAUUUUAFFFGM0AFHaiigA60UClPT8qAEooJxRQAxT81Ppi/ep9BUgpV60lGaCQHWil/h/GkoAO1FFFABRmiigAzTR9806gUACjbRRTtvy0ANU5FFNT7tOoBkdFSUUFcwg4FLR3ooJCkIyaWjvQAKNq/jRTW6inUDCgLmms2Gp1Ahdho2GkooAXYaR+FooIyKACnbqarbqXA9aAE7/hRR3ooABRSM22igLC0UUUAHamx06hBtFAwprrmn5HpRkelAhKKF+7RQAUDrRRQAUUUUAFB5FFFABQelFFADfLyKKkTrRQPmY2iijrQIKKTyaUjFABRR1FNKUACdadUdFBXKSUVHUlAmrBmiiigQUUUUAFFFGM0AGcUUpFFACUUUUAAGKD8y0UUAIrZpaKKACiijNABRRRQAGijrRQAUUUUAFAOKKKAG+aaKCmKKCtB1FFFBIZooooAKO9FFABniiijOKACik3CjcKAFopNwo3igBaKTcKWgAooooAYy7aKWSig0R//Z"},a13b:function(e,t,o){"use strict";var n=o("2b2a"),a=o.n(n);a.a},da0e:function(e,t){e.exports="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAEAAAAAAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCACAAIYDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD5PHFBGKC+M00tk1/odrc+DBzkU2iiqAKKKKACiiigB23jrQo4600HFOVsClYA8ujZShs0EZpgIqZoKYFOHFBGRQAgORS0U0nFKwDi2KKKKXKVddhrjmkIxSk/zoUbjVEibDikxg09zhaZmgBQuaXZTQcGpB0oAjIxRTn60ijg0AJRRRQAU5DxTQM09V2igBaKKKAA0EZoooAaGopGGDRQA8jNJjHSlooAa1Np7dKZQAVIvSo6evSgBH+9QRhKXHzUMu4UAMoAzTlXFOAxQAAYFFFFABRRRQAd6KKM0AMY80UDk0UAPooopANfpTac/Sm0wCpBwKagyadQAUAkCiigAooooAKKKKACiiigAoooJ4oAai0U4dKKLgAbNGc1HTkGaAB+lNqQjNNK80ACD5adQBgUUAFFFFABRRRQAE4FAoYZFIvSgBaBQTxRQAUj9KWmv0oAXzPloplFKyAMcUA8UpFJTAVTg05WyaZTo6AHUUUUAFFFFABRRRQAE8UnVaVulC9KAAcCiiigApr9KdSP92gBlFFFAB2opScUhoAKeowKZUgoAKKKKACiiigAooooAKKKKACijNG6gApH+7S5pGOVoAZRRRQAUrcUYxSE5NADkHNO701OlDtQAb+acDmo6KAHZ+anBs0w9KVDzQA6iiigBrnFOHSkK5NLjFABikxS0HgUAMakzxTm6U2gAooooA//2Q=="},e9a4:function(e,t,o){},f1e4:function(e,t,o){},f693:function(e,t,o){"use strict";var n=o("15dc"),a=o.n(n);a.a}});
//# sourceMappingURL=app.3992d775.js.map