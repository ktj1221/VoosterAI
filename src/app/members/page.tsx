'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, UserPlus, Mail, Phone, CheckCircle2, XCircle } from 'lucide-react';

/**
 * Members Page
 *
 * 회원 관리 페이지
 * - 회원 목록 테이블
 * - 회비 납부 상태 추적
 * - 검색 및 필터 기능 (목업 UI)
 *
 * Learning Points:
 * 1. 테이블 레이아웃: 회원 정보를 구조화된 테이블로 표시
 * 2. 상태 표시: Badge로 납부/미납 상태를 명확히 구분
 * 3. 검색 UI: Input + 아이콘으로 직관적인 검색 인터페이스
 */

// 더미 데이터: 회원 목록
const members = [
  {
    id: 1,
    name: '김철수',
    email: 'chulsoo@example.com',
    phone: '010-1234-5678',
    joinDate: '2024-01-15',
    paymentStatus: 'paid' as const,
    role: '회원',
  },
  {
    id: 2,
    name: '박영희',
    email: 'younghee@example.com',
    phone: '010-2345-6789',
    joinDate: '2024-02-20',
    paymentStatus: 'paid' as const,
    role: '회원',
  },
  {
    id: 3,
    name: '이민수',
    email: 'minsu@example.com',
    phone: '010-3456-7890',
    joinDate: '2024-03-10',
    paymentStatus: 'unpaid' as const,
    role: '회원',
  },
  {
    id: 4,
    name: '최지훈',
    email: 'jihoon@example.com',
    phone: '010-4567-8901',
    joinDate: '2024-04-05',
    paymentStatus: 'paid' as const,
    role: '회원',
  },
  {
    id: 5,
    name: '강민지',
    email: 'minji@example.com',
    phone: '010-5678-9012',
    joinDate: '2024-05-12',
    paymentStatus: 'paid' as const,
    role: '회원',
  },
  {
    id: 6,
    name: '정수현',
    email: 'soohyun@example.com',
    phone: '010-6789-0123',
    joinDate: '2024-06-18',
    paymentStatus: 'unpaid' as const,
    role: '회원',
  },
  {
    id: 7,
    name: '한서연',
    email: 'seoyeon@example.com',
    phone: '010-7890-1234',
    joinDate: '2024-07-22',
    paymentStatus: 'paid' as const,
    role: '회원',
  },
  {
    id: 8,
    name: '조현우',
    email: 'hyunwoo@example.com',
    phone: '010-8901-2345',
    joinDate: '2024-08-30',
    paymentStatus: 'unpaid' as const,
    role: '회원',
  },
  {
    id: 9,
    name: '송지아',
    email: 'jia@example.com',
    phone: '010-9012-3456',
    joinDate: '2024-09-14',
    paymentStatus: 'paid' as const,
    role: '회원',
  },
  {
    id: 10,
    name: '홍길동',
    email: 'gildong@example.com',
    phone: '010-0123-4567',
    joinDate: '2023-12-01',
    paymentStatus: 'paid' as const,
    role: '총무',
  },
];

// 통계 계산
const totalMembers = members.length;
const paidMembers = members.filter((m) => m.paymentStatus === 'paid').length;
const unpaidMembers = members.filter((m) => m.paymentStatus === 'unpaid').length;

/**
 * 날짜를 한국어 형식으로 포맷
 */
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

export default function MembersPage() {
  return (
    <MainLayout
      title="회원 관리"
      breadcrumbItems={[{ label: '회원 관리' }]}
    >
      <div className="space-y-6">
        {/* 통계 요약 */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  {totalMembers}명
                </div>
                <div className="mt-1 text-sm text-gray-600">전체 회원</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-600">
                  {paidMembers}명
                </div>
                <div className="mt-1 text-sm text-gray-600">회비 납부</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-error">
                  {unpaidMembers}명
                </div>
                <div className="mt-1 text-sm text-gray-600">회비 미납</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 검색 및 액션 */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* 검색 입력 */}
              <div className="relative flex-1 sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="회원 이름, 이메일 검색..."
                  className="pl-10"
                />
              </div>

              {/* 액션 버튼 */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  필터
                </Button>
                <Button size="sm">
                  <UserPlus className="mr-2 h-4 w-4" />
                  회원 추가
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 회원 목록 테이블 */}
        <Card>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="pb-3 text-left text-sm font-semibold text-gray-700">
                      이름
                    </th>
                    <th className="pb-3 text-left text-sm font-semibold text-gray-700">
                      연락처
                    </th>
                    <th className="pb-3 text-left text-sm font-semibold text-gray-700">
                      가입일
                    </th>
                    <th className="pb-3 text-left text-sm font-semibold text-gray-700">
                      역할
                    </th>
                    <th className="pb-3 text-left text-sm font-semibold text-gray-700">
                      납부 상태
                    </th>
                    <th className="pb-3 text-right text-sm font-semibold text-gray-700">
                      액션
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member) => (
                    <tr
                      key={member.id}
                      className="border-b border-gray-100 transition-colors hover:bg-gray-50"
                    >
                      {/* 이름 */}
                      <td className="py-4">
                        <div>
                          <div className="font-medium text-gray-900">
                            {member.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {member.email}
                          </div>
                        </div>
                      </td>

                      {/* 연락처 */}
                      <td className="py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="h-4 w-4 text-gray-400" />
                          {member.phone}
                        </div>
                      </td>

                      {/* 가입일 */}
                      <td className="py-4 text-sm text-gray-600">
                        {formatDate(member.joinDate)}
                      </td>

                      {/* 역할 */}
                      <td className="py-4">
                        <Badge
                          variant={
                            member.role === '총무' ? 'default' : 'secondary'
                          }
                        >
                          {member.role}
                        </Badge>
                      </td>

                      {/* 납부 상태 */}
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          {member.paymentStatus === 'paid' ? (
                            <>
                              <CheckCircle2 className="h-4 w-4 text-accent-600" />
                              <span className="text-sm font-medium text-accent-600">
                                납부 완료
                              </span>
                            </>
                          ) : (
                            <>
                              <XCircle className="h-4 w-4 text-error" />
                              <span className="text-sm font-medium text-error">
                                미납
                              </span>
                            </>
                          )}
                        </div>
                      </td>

                      {/* 액션 */}
                      <td className="py-4 text-right">
                        {member.paymentStatus === 'unpaid' && (
                          <Button variant="ghost" size="sm">
                            <Mail className="mr-2 h-4 w-4" />
                            알림 발송
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
