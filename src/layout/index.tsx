'use client';
import React from 'react';
import { publicRoutes } from '@/constants';
import { usePathname } from 'next/navigation';
import PrivateLayout from './private-layout';

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPublicRoute = publicRoutes.includes(pathname);

  if (isPublicRoute) {
    return <>{children}</>;
  }

  return <PrivateLayout>{children}</PrivateLayout>;
}

export default LayoutProvider;
