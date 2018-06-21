import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

var routes = [
    {
        path: '/',
        component: resolve => require(['../components/HelloWorld.vue'], resolve),
        // children: [
        //     {
        //         path: '/home',
        //         component: resolve => require(['../views/Home'], resolve)
        //     }
        // ]
    },
    {
    	path: '/index',
    	component: resolve => require(['../components/index.vue'], resolve),
    },
     {
        path: '/me',
        component: resolve => require(['../components/Me.vue'], resolve),
    },
                {
        path: '/dayDream',
        component: resolve => require(['../components/DayDream.vue'], resolve),
    },
                {
        path: '/note',
        component: resolve => require(['../components/Note.vue'], resolve),
    },
                {
        path: '/time',
        component: resolve => require(['../components/Time.vue'], resolve),
    },
    
    {
      path:'/demo',
      component:resolve=>require(['../components/demo.vue'],resolve),
     }
    ,
     {
      path:'/demo2',
      component:resolve=>require(['../components/demo2.vue'],resolve),
     }
]
// router.beforeEach((to, from, next) => {
//     /* 路由发生变化修改页面title */
//     if (to.meta.title) {
//         document.title = to.meta.title
//     }
//     next()
// })
export default new Router({
    mode: 'history',
    routes: routes
})


