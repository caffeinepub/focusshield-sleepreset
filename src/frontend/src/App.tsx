import { createRouter, RouterProvider, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { useEffect } from 'react';
import AppLayout from './components/Layout/AppLayout';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import FocusModePage from './pages/FocusModePage';
import SleepModePage from './pages/SleepModePage';
import DietPlanPage from './pages/DietPlanPage';
import InsightsPage from './pages/InsightsPage';
import PrivacyPage from './pages/PrivacyPage';
import { useActor } from './hooks/useActor';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { Toaster } from './components/ui/sonner';
import { ThemeProvider } from 'next-themes';

const rootRoute = createRootRoute({
  component: () => (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: DashboardPage,
});

const onboardingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/onboarding',
  component: OnboardingPage,
});

const focusRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/focus',
  component: FocusModePage,
});

const sleepRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/sleep',
  component: SleepModePage,
});

const dietRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/diet',
  component: DietPlanPage,
});

const insightsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/insights',
  component: InsightsPage,
});

const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/privacy',
  component: PrivacyPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  onboardingRoute,
  focusRoute,
  sleepRoute,
  dietRoute,
  insightsRoute,
  privacyRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  const { identity } = useInternetIdentity();
  const { actor } = useActor();

  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
