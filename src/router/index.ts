import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/user',
      redirect: '/user/list',
      children: [
        {
          path: 'list',
          name: 'user-list',
          component: () => import('@/pages/user/List.vue'),
        },
        {
          path: 'new',
          name: 'user-new',
          component: () => import('@/pages/user/New.vue'),
        },
        {
          path: 'group/new',
          name: 'group-new',
          component: () => import('@/pages/user/NewGroup.vue'),
        },
      ],
    },
    {
      path: '/product',
      redirect: '/product/list',
      children: [
        {
          path: 'list',
          name: 'product-list',
          component: () => import('@/pages/product/List.vue'),
        },
      ],
    },
    {
      path: '/order',
      redirect: '/order/list',
      children: [
        {
          path: 'list',
          name: 'order-list',
          component: () => import('@/pages/order/List.vue'),
        },
      ],
    },
    {
      path: '/payment',
      redirect: '/payment/list',
      children: [
        {
          path: 'list',
          name: 'payment-list',
          component: () => import('@/pages/payment/List.vue'),
        },
      ],
    },
    {
      path: '/shipment',
      redirect: '/shipment/list',
      children: [
        {
          path: 'list',
          name: 'shipment-list',
          component: () => import('@/pages/shipment/List.vue'),
        },
      ],
    },
    {
      path: '/carrier',
      redirect: '/carrier/list',
      children: [
        {
          path: 'list',
          name: 'carrier-list',
          component: () => import('@/pages/carrier/List.vue'),
        },
        {
          path: 'new',
          name: 'carrier-new',
          component: () => import('@/pages/carrier/New.vue'),
        },
      ],
    },
    {
      path: '/admin',
      redirect: '/admin/list',
      children: [
        {
          path: 'list',
          name: 'admin-list',
          component: () => import('@/pages/admin/List.vue'),
        },
        {
          path: 'new',
          name: 'admin-new',
          component: () => import('@/pages/admin/New.vue'),
        },
      ],
    },
  ],
})

export default router
