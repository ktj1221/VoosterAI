'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * Login Page
 *
 * 비인증 사용자를 위한 로그인 페이지
 * - 이메일과 비밀번호 입력 폼
 * - 목업 로그인 (실제 인증 없음)
 * - 로그인 성공 시 /dashboard로 리다이렉트
 *
 * Learning Point:
 * - 폼 상태 관리는 useState로 간단하게 처리 (목업이므로 react-hook-form 불필요)
 * - shadcn/ui의 Card 컴포넌트로 깔끔한 로그인 UI 구성
 * - Next.js의 useRouter로 클라이언트 사이드 네비게이션
 */
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  /**
   * 목업 로그인 핸들러
   * - 실제 API 호출 없이 0.5초 딜레이 후 대시보드로 이동
   * - 프로덕션에서는 Supabase Auth 등을 사용할 예정
   */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // 목업 로딩 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 500));

    // 대시보드로 리다이렉트
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
            <span className="text-2xl font-bold text-primary-600">V</span>
          </div>
          <CardTitle className="text-2xl font-bold">Vooster에 오신 것을 환영합니다</CardTitle>
          <CardDescription>
            동호회 예산 관리 및 공지 통합 플랫폼
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {/* 이메일 입력 */}
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="treasurer@club.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            {/* 비밀번호 입력 */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">비밀번호</Label>
                <a
                  href="#"
                  className="text-sm text-primary-600 hover:text-primary-700 hover:underline"
                >
                  비밀번호 찾기
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            {/* 로그인 버튼 */}
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </Button>

            {/* 회원가입 링크 */}
            <p className="text-center text-sm text-gray-600">
              계정이 없으신가요?{' '}
              <a
                href="#"
                className="font-medium text-primary-600 hover:text-primary-700 hover:underline"
              >
                회원가입
              </a>
            </p>
          </form>

          {/* 목업 안내 */}
          <div className="mt-6 rounded-lg bg-accent-50 p-3">
            <p className="text-xs text-accent-800">
              <strong>목업 모드:</strong> 아무 이메일/비밀번호로 로그인 가능합니다.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
