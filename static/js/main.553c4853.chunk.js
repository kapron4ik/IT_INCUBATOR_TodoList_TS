(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{64:function(e,t,a){e.exports=a(77)},69:function(e,t,a){},70:function(e,t,a){},77:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),l=a(8),c=a.n(l);a(69),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(70);var r=a(26),o=a(123),s=a(113),u=a(114),d=i.a.memo((function(e){console.log("AddItemForm called");var t=Object(n.useState)(""),a=Object(r.a)(t,2),l=a[0],c=a[1],d=Object(n.useState)(null),m=Object(r.a)(d,2),T=m[0],f=m[1],O=function(){var t=l.trim();""!==t?(e.addItem(t),c("")):f("Title is requaired")};return i.a.createElement("div",null,i.a.createElement(o.a,{variant:"outlined",error:!!T,label:"Title",helperText:T,size:"small",value:l,onChange:function(e){c(e.currentTarget.value),f(null)},onKeyDown:function(e){"Enter"===e.key&&O(),"Escape"===e.key&&c("")}}),i.a.createElement(s.a,{color:"primary",size:"small",onClick:O},i.a.createElement(u.a,null)))})),m=i.a.memo((function(e){console.log("EditableSpan is called");var t=Object(n.useState)(!1),a=Object(r.a)(t,2),l=a[0],c=a[1],s=Object(n.useState)(""),u=Object(r.a)(s,2),d=u[0],m=u[1];return l?i.a.createElement(o.a,{variant:"outlined",size:"small",value:d,onBlur:function(){c(!1),e.onChangeTitle(d)},onChange:function(e){m(e.currentTarget.value)},autoFocus:!0}):i.a.createElement("span",{onDoubleClick:function(){c(!0),m(e.title)}},e.title)})),T=a(115),f=a(116),O=a(125),b=i.a.memo((function(e){var t=Object(n.useCallback)((function(t){e.changeTaskTitle(e.task.id,t,e.todolistId)}),[e.changeTaskTitle,e.task.id,e.todolistId]);return i.a.createElement("li",{key:e.task.id,className:e.task.isDone?"is-done":""},i.a.createElement(O.a,{onChange:function(t){return e.changeTaskStatus(e.task.id,t.currentTarget.checked,e.todolistId)},checked:e.task.isDone,color:"primary"}),i.a.createElement(m,{title:e.task.title,onChangeTitle:t}),i.a.createElement(s.a,{onClick:function(){return e.removeTask(e.task.id,e.todolistId)}},i.a.createElement(T.a,null)))})),k=i.a.memo((function(e){console.log("Todolist is called");var t=Object(n.useCallback)((function(){e.changeFilter("all",e.id)}),[e.changeFilter,e.id]),a=Object(n.useCallback)((function(){e.changeFilter("active",e.id)}),[e.changeFilter,e.id]),l=Object(n.useCallback)((function(){e.changeFilter("completed",e.id)}),[e.changeFilter,e.id]),c=Object(n.useCallback)((function(t){e.addTask(t,e.id)}),[e.addTask,e.id]),r=Object(n.useCallback)((function(t){e.changeTodoListTitle(e.id,t)}),[e.changeTodoListTitle,e.id]),o=e.tasks;return"active"===e.filter&&(o=e.tasks.filter((function(e){return!e.isDone}))),"completed"===e.filter&&(o=e.tasks.filter((function(e){return e.isDone}))),i.a.createElement("div",null,i.a.createElement("h3",null,i.a.createElement(m,{title:e.title,onChangeTitle:r}),i.a.createElement(s.a,{onClick:function(){e.removeTodoList(e.id)}},i.a.createElement(T.a,null))),i.a.createElement(d,{addItem:c}),i.a.createElement("ul",{style:{listStyle:"none",paddingLeft:"0"}},o.map((function(t){return i.a.createElement(b,{key:t.id,todolistId:e.id,task:t,removeTask:e.removeTask,changeTaskStatus:e.changeTaskStatus,changeTaskTitle:e.changeTaskTitle})}))),i.a.createElement("div",null,i.a.createElement(f.a,{onClick:t,color:"all"===e.filter?"primary":"default",variant:"all"===e.filter?"contained":"outlined",size:"small"},"All"),i.a.createElement(f.a,{onClick:a,color:"active"===e.filter?"primary":"default",variant:"active"===e.filter?"contained":"outlined",size:"small"},"Active"),i.a.createElement(f.a,{onClick:l,color:"completed"===e.filter?"primary":"default",variant:"completed"===e.filter?"contained":"outlined",size:"small"},"Completed")))})),E=a(124),v=a(117),D=a(120),g=a(118),h=a(119),j=a(121),I=a(122),p=a(78),C=a(27),L=[],S=a(37),y=a(14),A={},w=a(25);var F=function(){console.log("App is called"),Object(E.a)(),Object(E.a)();var e=Object(w.c)((function(e){return e.todolists})),t=Object(w.c)((function(e){return e.tasks})),a=Object(w.b)(),l=Object(n.useCallback)((function(e,t){var n=function(e,t){return{type:"REMOVE-TASK",taskID:e,todoListID:t}}(e,t);a(n)}),[a]),c=Object(n.useCallback)((function(e,t){var n=function(e,t){return{type:"ADD-TASK",title:e,todoListID:t}}(e,t);a(n)}),[a]),r=Object(n.useCallback)((function(e,t){var n={type:"CHANGE-TODOLIST-FILTER",id:t,filter:e};a(n)}),[a]),o=Object(n.useCallback)((function(e,t,n){var i=function(e,t,a){return{type:"CHANGE-TASK-STATUS",taskID:e,isDone:t,todoListID:a}}(e,t,n);a(i)}),[a]),u=Object(n.useCallback)((function(e,t,n){var i=function(e,t,a){return{type:"CHANGE-TASK-TITTLE",taskID:e,title:t,todoListID:a}}(e,t,n);a(i)}),[a]),m=Object(n.useCallback)((function(e){var n={type:"REMOVE-TODOLIST",id:e};delete t[e],a(n)}),[a]),T=Object(n.useCallback)((function(e,t){var n={type:"CHANGE-TODOLIST-TITLE",id:e,title:t};a(n)}),[a]),O=Object(n.useCallback)((function(e){var t={type:"ADD-TODOLIST",title:e,todolistID:Object(E.a)()};a(t)}),[a]);return i.a.createElement("div",{className:"App"},i.a.createElement(v.a,{position:"static"},i.a.createElement(g.a,null,i.a.createElement(s.a,{edge:"start",color:"inherit","aria-label":"menu"},i.a.createElement(h.a,null)),i.a.createElement(D.a,{variant:"h6"},"News"),i.a.createElement(f.a,{color:"inherit"},"Login"))),i.a.createElement(j.a,{fixed:!0},i.a.createElement(I.a,{container:!0,style:{padding:"20px"}},i.a.createElement(d,{addItem:O})),i.a.createElement(I.a,{container:!0,spacing:3},e.map((function(e){var a=t[e.id];return i.a.createElement(I.a,{key:e.id},i.a.createElement(p.a,{elevation:3,style:{padding:"15px",marginRight:"15px"}},i.a.createElement(k,{key:e.id,id:e.id,title:e.title,tasks:a,removeTask:l,addTask:c,changeFilter:r,changeTaskStatus:o,changeTaskTitle:u,filter:e.filter,removeTodoList:m,changeTodoListTitle:T})))})))))},N=a(32),K=Object(N.b)({tasks:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:A,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"REMOVE-TASK":return e[t.todoListID]=e[t.todoListID].filter((function(e){return e.id!==t.taskID})),Object(y.a)({},e);case"ADD-TASK":var a={id:Object(E.a)(),title:t.title,isDone:!1};return e[t.todoListID]=[a].concat(Object(C.a)(e[t.todoListID])),Object(y.a)({},e);case"CHANGE-TASK-STATUS":var n=e[t.todoListID];return e[t.todoListID]=n.map((function(e){return e.id===t.taskID?Object(y.a)(Object(y.a)({},e),{},{isDone:t.isDone}):e})),Object(y.a)({},e);case"CHANGE-TASK-TITTLE":var i=e[t.todoListID];return e[t.todoListID]=i.map((function(e){return e.id===t.taskID?Object(y.a)(Object(y.a)({},e),{},{title:t.title}):e})),Object(y.a)({},e);case"ADD-TODOLIST":return Object(y.a)(Object(y.a)({},e),{},Object(S.a)({},t.todolistID,[]));case"REMOVE-TODOLIST":return delete e[t.id],Object(y.a)({},e);default:return e}},todolists:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:L,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"REMOVE-TODOLIST":return e.filter((function(e){return e.id!==t.id}));case"ADD-TODOLIST":var a={id:t.todolistID,title:t.title,filter:"all"};return[a].concat(Object(C.a)(e));case"CHANGE-TODOLIST-TITLE":var n=e.find((function(e){return e.id===t.id}));return n&&(n.title=t.title),Object(C.a)(e);case"CHANGE-TODOLIST-FILTER":var i=e.find((function(e){return e.id==t.id}));return i&&(i.filter=t.filter),Object(C.a)(e);default:return e}}}),G=Object(N.c)(K);window.store=G,c.a.render(i.a.createElement(w.a,{store:G},i.a.createElement(F,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[64,1,2]]]);
//# sourceMappingURL=main.553c4853.chunk.js.map