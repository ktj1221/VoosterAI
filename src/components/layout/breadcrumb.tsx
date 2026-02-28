'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

/**
 * Breadcrumb Component
 *
 * 현재 페이지의 계층 구조를 보여주는 브레드크럼
 * - 홈 아이콘으로 시작
 * - 각 단계는 화살표(→)로 연결
 * - 마지막 아이템은 현재 페이지 (링크 없음)
 *
 * @param items - 브레드크럼 아이템 배열
 */
export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center gap-2 text-sm">
        {/* 홈 아이콘 */}
        <li>
          <Link
            href="/dashboard"
            className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="대시보드로 이동"
          >
            <Home className="h-4 w-4" />
          </Link>
        </li>

        {/* 브레드크럼 아이템 */}
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-gray-400" />
              {isLast || !item.href ? (
                <span className="font-medium text-gray-900">{item.label}</span>
              ) : (
                <Link
                  href={item.href}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
