'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Wallet,
  Bell,
  FileText,
  Users,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

/**
 * 네비게이션 메뉴 아이템 정의
 * - label: 메뉴 이름
 * - href: 라우트 경로
 * - icon: Lucide 아이콘 컴포넌트
 */
const navigationItems = [
  {
    label: '대시보드',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: '예산 관리',
    href: '/features/budget',
    icon: Wallet,
  },
  {
    label: '공지사항',
    href: '/announcements',
    icon: Bell,
  },
  {
    label: '보고서',
    href: '/reports',
    icon: FileText,
  },
  {
    label: '회원 관리',
    href: '/members',
    icon: Users,
  },
];

/**
 * AppSidebar Component
 *
 * 애플리케이션의 메인 네비게이션 사이드바
 * - 모바일: 토글 가능한 오버레이 사이드바
 * - 데스크탑: 고정된 왼쪽 사이드바
 *
 * @param isOpen - 모바일에서 사이드바 열림/닫힘 상태
 * @param onClose - 사이드바 닫기 핸들러 (모바일용)
 */
export function AppSidebar({ isOpen = true, onClose }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* 모바일 오버레이 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* 사이드바 */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-full w-64 transform bg-white transition-transform duration-300 ease-in-out lg:sticky lg:z-0 lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col border-r border-gray-200">
          {/* 헤더 */}
          <div className="flex h-16 items-center justify-between border-b border-gray-200 px-6">
            <h1 className="text-xl font-bold text-primary-600">Vooster</h1>
            {/* 모바일 닫기 버튼 */}
            <button
              onClick={onClose}
              className="lg:hidden text-gray-500 hover:text-gray-700"
              aria-label="사이드바 닫기"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* 네비게이션 메뉴 */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* 푸터 (사용자 정보) */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                <span className="text-sm font-semibold">총무</span>
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium text-gray-900">홍길동</p>
                <p className="text-xs text-gray-500 truncate">treasurer@club.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
