import Vue from 'vue'
import Router from 'vue-router'
import AuthLayout from '../components/auth/AuthLayout'
import AppLayout from '../components/admin/AppLayout'

Vue.use(Router);

const EmptyParentComponent = {
    template: '<router-view></router-view>',
}

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '*',
            redirect: { name: 'dashboard' },
        },
        {
            path: '/auth',
            component: AuthLayout,
            children: [
                {
                    name: 'login',
                    path: 'login',
                    component: () => import('../components/auth/login/Login.vue'),
                },
                {
                    name: 'signup',
                    path: 'signup',
                    component: () => import('../components/auth/signup/Signup.vue'),
                },
                {
                    name: 'recover-password',
                    path: 'recover-password',
                    component: () => import('../components/auth/recover-password/RecoverPassword.vue'),
                },
                {
                    name: 'new-password',
                    path: 'new-password',
                    component: () => import('../components/auth/new-password/NewPassword.vue'),
                },
                {
                    path: '',
                    redirect: { name: 'login' },
                },
            ],
        },
        {
            name: 'Admin',
            path: '/admin',
            component: AppLayout,
            children: [
                {
                    name: 'dashboard',
                    path: 'dashboard',
                    component: () => import('../components/dashboard/Dashboard.vue'),
                    default: true,
                },
                {
                    name: 'pages',
                    path: 'pages',
                    component: EmptyParentComponent,
                    children: [
                        {
                            name: '404-pages',
                            path: '404-pages',
                            component: () => import('../components/pages/404-pages/404PagesPage'),
                        },
                    ],
                }
            ],
        },
        {
            path: '/articles',
            component: AppLayout,
            children: [
                {
                    name: 'export-articles',
                    path: 'export',
                    component: () => import('../components/articles/Export.vue')
                },
                {
                    name: 'list-articles',
                    path: 'list',
                    component: () => import('../components/articles/List.vue')
                },
                {
                    name: 'list-normalized-articles',
                    path: 'normalized',
                    component: () => import('../components/normalizedArticles/List.vue')
                }
            ],
        },
        {
            path: '/wordcloud',
            component: AppLayout,
            children: [
                {
                    name: 'wordcloud-date',
                    path: '/wordcloud/byDate',
                    component: () => import('../components/wordcloud/WordCloudDate.vue')
                },
                {
                    name: 'wordcloud-site',
                    path: '/wordcloud/bySite',
                    component: () => import('../components/wordcloud/WordCloudSite.vue')
                },
                {
                    name: 'global-words',
                    path: '/wordcloud/globalwords',
                    component: () => import('../components/wordcloud/GlobalWord.vue')
                }
            ]
        },
    ]
})
