(this["webpackJsonpreal-speak"]=this["webpackJsonpreal-speak"]||[]).push([[0],{210:function(e,t,n){e.exports=n(489)},215:function(e,t,n){},230:function(e,t){},232:function(e,t){},243:function(e,t){},245:function(e,t){},261:function(e,t){},269:function(e,t){function n(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}n.keys=function(){return[]},n.resolve=n,e.exports=n,n.id=269},276:function(e,t){},277:function(e,t){function n(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}n.keys=function(){return[]},n.resolve=n,e.exports=n,n.id=277},312:function(e,t){},313:function(e,t){},395:function(e,t){},489:function(e,t,n){"use strict";n.r(t);var a=n(2),c=n.n(a),r=n(207),u=n.n(r),s=(n(215),n(17));var o=function(e){return c.a.createElement("div",null,c.a.createElement("button",{className:"chat-button",onClick:function(){e.setCurrentView("signup")}},"Send a message"))};var i=function(e){var t=Object(a.useState)(""),n=Object(s.a)(t,2),r=n[0],u=n[1];return c.a.createElement("div",{className:"form-container"},c.a.createElement("h1",null,"Let's Talk"),c.a.createElement("form",{onSubmit:function(t){t.preventDefault(),e.onSubmit(r)},className:"form"},c.a.createElement("label",{htmlFor:"email"},"What is your email?"),c.a.createElement("input",{type:"email",name:"username",onChange:function(e){var t=e.target.value;u(t)},className:"input"}),c.a.createElement("button",{className:"submit"},"Submit")))},l=n(209),m=n(109);var f=function(e){return c.a.createElement("ul",{className:"message-list"},e.messages.map((function(e,t){return c.a.createElement("li",{key:t},c.a.createElement("h4",{className:"message-sender"},e.senderId),c.a.createElement("p",{className:"message-text"},e.text))})),c.a.createElement("li",null))};var d=function(e){var t=Object(a.useState)(""),n=Object(s.a)(t,2),r=n[0],u=n[1];return c.a.createElement("form",{onSubmit:function(t){t.preventDefault(),e.onSubmit(r),u("")},className:"input-field"},c.a.createElement("input",{className:"message-input",type:"text",onChange:function(e){var t=e.target.value;u(t)},value:r}),c.a.createElement("input",{className:"message-submit",type:"submit",value:"send"}))};var b=function(e){var t=Object(a.useState)(null),n=Object(s.a)(t,2),r=n[0],u=n[1],o=Object(a.useState)({users:[]}),i=Object(s.a)(o,2),b=i[0],p=i[1],v=Object(a.useState)([]),h=Object(s.a)(v,2),E=h[0],O=h[1],g=Object(a.useState)([]),j=Object(s.a)(g,2),N=(j[0],j[1]);return Object(a.useEffect)((function(){new m.ChatManager({instanceLocator:"v1:us1:e7565616-0e2a-4936-9ada-394d97403d4d",userId:e.currentId,tokenProvider:new m.TokenProvider({url:"https://us1.pusherplatform.io/services/chatkit_token_provider/v1/e7565616-0e2a-4936-9ada-394d97403d4d/token"})}).connect().then((function(e){return u(e),e.subscribeToRoom({roomId:"20f9a93b-ec42-4b89-97a1-cd982d68c35f",messageLimit:100,hooks:{onMessage:function(e){O((function(t){return[].concat(Object(l.a)(t),[e])}))}}})})).then((function(e){p(e),N(e.userIds)})).catch((function(e){return console.log(e)}))}),[]),c.a.createElement("div",null,c.a.createElement("h2",{className:"header"},"Hi There, Ask us anything"),c.a.createElement(f,{messages:E}),c.a.createElement(d,{className:"input-field",onSubmit:function(e){r.sendMessage({text:e,roomId:b.id}).catch((function(e){return console.error("error",e)}))}}))},p=n(208),v=new(n.n(p).a)({instanceLocator:"v1:us1:e7565616-0e2a-4936-9ada-394d97403d4d",key:"b14bbfb8-c59b-4bba-9749-85c6422a7f69:UdGZBwJpaM5UXJle7RFOFXuaZJrzOpqwvWmFLtcGbvg="});var h=function(){var e=Object(a.useState)("signup"),t=Object(s.a)(e,2),n=t[0],r=t[1],u=Object(a.useState)(""),l=Object(s.a)(u,2),m=l[0],f=l[1],d=Object(a.useState)(""),p=Object(s.a)(d,2),h=(p[0],p[1]),E="";return"ChatMessage"===n?E=c.a.createElement(o,{setCurrentView:r}):"signup"===n?E=c.a.createElement(i,{onSubmit:function(e){v.createUser({id:e,name:e}).then((function(t){h(e),f(e),r("chatApp")})).catch((function(t){400===t.status?(h(e),f(e),r("chatApp")):console.log(t.status)}))}}):"chatApp"===n&&(E=c.a.createElement(b,{currentId:m})),c.a.createElement("div",{className:"App"},E)};u.a.render(c.a.createElement(h,null),document.getElementById("root"))}},[[210,1,2]]]);
//# sourceMappingURL=main.9602dc9c.chunk.js.map