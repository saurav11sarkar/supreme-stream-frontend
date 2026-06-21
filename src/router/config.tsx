import type { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

const HomePage = lazy(() => import('../pages/home/page'));
const ServicesPage = lazy(() => import('../pages/services/page'));
const AboutPage = lazy(() => import('../pages/about/page'));
const ContactPage = lazy(() => import('../pages/contact/page'));
const TermsPage = lazy(() => import('../pages/terms/page'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));
const PaymentSuccessPage = lazy(() => import('../pages/payment-success/page'));
const PaymentCancelledPage = lazy(() => import('../pages/payment-cancelled/page'));
const PayServiceDayPage = lazy(() => import('../pages/pay-service-day/page'));

import QuotePage from '../pages/quote/page';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/services',
    element: <ServicesPage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
  {
    path: '/quote',
    element: <QuotePage />,
  },
  {
    path: '/terms',
    element: <TermsPage />,
  },
  {
    path: '/payment-success',
    element: <PaymentSuccessPage />,
  },
  {
    path: '/payment-cancelled',
    element: <PaymentCancelledPage />,
  },
  {
    path: '/pay-service-day',
    element: <PayServiceDayPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
];

export default routes;
