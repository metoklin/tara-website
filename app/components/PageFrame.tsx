import type { ReactNode } from 'react';
import { SiteFooter, SiteHeader } from './SiteChrome';

export function PageFrame({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
