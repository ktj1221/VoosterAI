'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Root Page (/)
 *
 * 루트 경로에 접근 시 로그인 페이지로 리다이렉트
 *
 * Learning Point:
 * - Next.js App Router에서 useRouter와 useEffect를 사용한 클라이언트 사이드 리다이렉션
 * - 실제 프로덕션에서는 인증 상태에 따라 /dashboard 또는 /login으로 분기
 */
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // 목업: 항상 로그인 페이지로 리다이렉트
    // 실제 구현 시: 인증 상태 확인 후 조건부 리다이렉트
    router.push('/login');
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent"></div>
        <p className="mt-4 text-gray-600">로딩 중...</p>
      </div>
    </div>
  );
}
