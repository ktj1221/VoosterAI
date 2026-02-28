'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, Users, Bell, TrendingUp, TrendingDown, Plus } from 'lucide-react';

/**
 * Dashboard Page
 *
 * 총무를 위한 메인 대시보드
 * - 주요 지표 카드: 현재 잔액, 회원 수, 미확인 공지
 * - 최근 활동 내역
 * - 빠른 액션 버튼
 *
 * Learning Points:
 * 1. 더미 데이터는 컴포넌트 상단에 상수로 정의 (나중에 API로 교체 용이)
 * 2. Grid 레이아웃으로 반응형 카드 배치 (모바일 1열, 태블릿 2열, 데스크탑 3열)
 * 3. Lucide React 아이콘으로 시각적 요소 강화
 */

// 더미 데이터: 주요 지표
const stats = [
  {
    title: '현재 잔액',
    value: '₩2,450,000',
    change: '+12.5%',
    changeType: 'positive' as const,
    icon: Wallet,
    color: 'text-primary-600',
    bgColor: 'bg-primary-50',
  },
  {
    title: '전체 회원',
    value: '45명',
    change: '+3명',
    changeType: 'positive' as const,
    icon: Users,
    color: 'text-secondary-600',
    bgColor: 'bg-secondary-50',
  },
  {
    title: '미확인 공지',
    value: '8건',
    change: '-2건',
    changeType: 'negative' as const,
    icon: Bell,
    color: 'text-accent-600',
    bgColor: 'bg-accent-50',
  },
];

// 더미 데이터: 최근 활동
const recentActivities = [
  {
    id: 1,
    type: 'income',
    title: '회비 입금 - 김철수',
    amount: '+50,000원',
    date: '2026-02-28',
    time: '14:30',
  },
  {
    id: 2,
    type: 'expense',
    title: '정기모임 장소 대관',
    amount: '-150,000원',
    date: '2026-02-27',
    time: '10:15',
  },
  {
    id: 3,
    type: 'announcement',
    title: '3월 정기모임 공지 발송',
    amount: '',
    date: '2026-02-26',
    time: '18:00',
  },
  {
    id: 4,
    type: 'income',
    title: '회비 입금 - 박영희',
    amount: '+50,000원',
    date: '2026-02-25',
    time: '09:20',
  },
  {
    id: 5,
    type: 'expense',
    title: '동호회 티셔츠 제작',
    amount: '-320,000원',
    date: '2026-02-24',
    time: '15:45',
  },
];

export default function DashboardPage() {
  return (
    <MainLayout
      title="대시보드"
      breadcrumbItems={[{ label: '대시보드' }]}
    >
      <div className="space-y-6">
        {/* 주요 지표 카드 그리드 */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const isPositive = stat.changeType === 'positive';

            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </CardTitle>
                  <div className={`${stat.bgColor} rounded-full p-2`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-sm">
                    {isPositive ? (
                      <TrendingUp className="h-4 w-4 text-accent-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-gray-500" />
                    )}
                    <span
                      className={
                        isPositive ? 'text-accent-600' : 'text-gray-500'
                      }
                    >
                      {stat.change}
                    </span>
                    <span className="text-gray-500">지난달 대비</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* 최근 활동 및 빠른 액션 */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* 최근 활동 */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>최근 활동</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {activity.date} {activity.time}
                      </p>
                    </div>
                    {activity.amount && (
                      <span
                        className={`text-sm font-semibold ${
                          activity.type === 'income'
                            ? 'text-accent-600'
                            : 'text-error'
                        }`}
                      >
                        {activity.amount}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 빠른 액션 */}
          <Card>
            <CardHeader>
              <CardTitle>빠른 액션</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                수입/지출 추가
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Bell className="mr-2 h-4 w-4" />
                공지사항 작성
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                회원 관리
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Wallet className="mr-2 h-4 w-4" />
                보고서 생성
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
