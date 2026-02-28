'use client';

import { useState } from 'react';
import { AppSidebar } from './app-sidebar';
import { AppHeader } from './app-header';
import { Breadcrumb } from './breadcrumb';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
  breadcrumbItems?: BreadcrumbItem[];
}

/**
 * MainLayout Component
 *
 * 인증된 사용자를 위한 메인 레이아웃
 * - 왼쪽: 사이드바 (네비게이션)
 * - 상단: 헤더 (타이틀, 알림, 설정)
 * - 중앙: 콘텐츠 영역 (페이지 내용)
 *
 * 반응형 동작:
 * - 모바일: 사이드바는 토글 가능한 오버레이
 * - 데스크탑: 사이드바는 고정된 왼쪽 패널
 *
 * @param children - 페이지 콘텐츠
 * @param title - 페이지 제목 (헤더에 표시)
 * @param breadcrumbItems - 브레드크럼 아이템 배열
 */
export function MainLayout({
  children,
  title,
  breadcrumbItems,
}: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* 사이드바 */}
      <AppSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* 메인 콘텐츠 영역 */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* 헤더 */}
        <AppHeader
          onMenuClick={() => setSidebarOpen(true)}
          title={title}
        />

        {/* 콘텐츠 */}
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-4 lg:p-6">
            {/* 브레드크럼 */}
            {breadcrumbItems && breadcrumbItems.length > 0 && (
              <Breadcrumb items={breadcrumbItems} />
            )}

            {/* 페이지 콘텐츠 */}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
