import { createRouter, createWebHistory } from 'vue-router';
import UserAdmin from './components/UserAdmin.vue';
import UserDetail from './components/UserDetail.vue';
import UserEdit from './components/UserEdit.vue';

const routes = [
    {
        path: '/',
        name: 'UserAdmin',
        component: UserAdmin
    },
    {
        path: '/user/:id',
        name: 'UserDetail',
        component: UserDetail,
        props: true
    },
    {
        path: '/user/:id/edit',
        name: 'UserEdit',
        component: UserEdit,
        props: true
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
