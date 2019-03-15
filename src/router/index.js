import Vue from 'vue';
import Router from 'vue-router';

const Index = resolve => {
    require.ensure(['../components/index.vue'], () => {
        resolve(require('../components/index.vue'))
    })
}

Vue.use(Router);

var routes = [

    {
        path: '/',
        component: resolve => require(['../components/DayDream.vue'], resolve),
        // children: [
        //     {
        //         path: '/home',
        //         component: resolve => require(['../views/Home'], resolve)
        //     }
        // ]
    },
     { path: '/index', component: Index, name: 'Index' },,
     {
        path: '/me',
        component: resolve => require(['../components/Me.vue'], resolve),
    },
                {
        path: '/dayDream',
        component: resolve => require(['../components/DayDream.vue'], resolve),
    },
                {
        path: '/timeZone',
        component: resolve => require(['../components/TimeZone.vue'], resolve),
    },
                {
        path: '/time',
        component: resolve => require(['../components/Time.vue'], resolve),
    },
]
// router.beforeEach((to, from, next) => {
//     /* 路由发生变化修改页面title */
//     if (to.meta.title) {
//         document.title = to.meta.title
//     }
//     next()
// })
export default new Router({
    // mode: 'history',
    routes: routes
})


