'use client';

import { Menu, Bell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AppHeaderProps {
  onMenuClick?: () => void;
  title?: string;
}

/**
 * AppHeader Component
 *
 * 애플리케이션의 상단 헤더
 * - 모바일: 메뉴 토글 버튼 표시
 * - 데스크탑: 페이지 제목과 액션 버튼 표시
 *
 * @param onMenuClick - 모바일 메뉴 버튼 클릭 핸들러
 * @param title - 현재 페이지 제목 (선택사항)
 */
export function AppHeader({ onMenuClick, title }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-30 h-16 border-b border-gray-200 bg-white">
      <div className="flex h-full items-center justify-between px-4 lg:px-6">
        {/* 왼쪽: 모바일 메뉴 버튼 */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="lg:hidden"
            aria-label="메뉴 열기"
          >
            <Menu className="h-6 w-6" />
          </Button>
          {title && (
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          )}
        </div>

        {/* 오른쪽: 알림 및 설정 */}
        <div className="flex items-center gap-2">
          {/* 알림 버튼 */}
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="알림"
          >
            <Bell className="h-5 w-5" />
            {/* 알림 배지 (mockup) */}
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-error" />
          </Button>

          {/* 설정 버튼 */}
          <Button variant="ghost" size="icon" aria-label="설정">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
