import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { PageSkeleton } from '../common/Skeleton';
import AnnouncementBar from './AnnouncementBar';
import Header from './Header';
import Footer from './Footer';

export default function MainLayout() {
  const { pathname } = useLocation();
  return (
    <div className="flex min-h-dvh flex-col">
      <AnnouncementBar />
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        {/* Re-keyed per page so each page fades in gently */}
        <div key={pathname} className="ts-page-enter"><Suspense fallback={<PageSkeleton />}><Outlet /></Suspense></div>
      </main>
      <Footer />
    </div>
  );
}
