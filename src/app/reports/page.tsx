'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Share2, FileText, TrendingUp, Calendar } from 'lucide-react';

/**
 * Reports Page
 *
 * 보고서 관리 페이지
 * - 자동 생성된 예산 보고서 목록
 * - 월별, 분기별, 연도별 보고서 필터
 * - 다운로드 및 공유 기능 (목업)
 *
 * Learning Points:
 * 1. 필터 버튼 그룹: 버튼 variant로 활성/비활성 상태 표시
 * 2. 카드 레이아웃: 보고서 정보를 구조화된 카드로 표시
 * 3. 액션 버튼: 다운로드/공유 등 주요 액션을 명확히 표시
 */

// 더미 데이터: 보고서
const reports = [
  {
    id: 1,
    title: '2026년 2월 월간 보고서',
    type: 'monthly',
    period: '2026-02',
    createdAt: '2026-02-28T23:59:00',
    income: 2500000,
    expense: 1850000,
    balance: 650000,
    status: 'completed',
  },
  {
    id: 2,
    title: '2026년 1월 월간 보고서',
    type: 'monthly',
    period: '2026-01',
    createdAt: '2026-01-31T23:59:00',
    income: 2300000,
    expense: 1500000,
    balance: 800000,
    status: 'completed',
  },
  {
    id: 3,
    title: '2026년 1분기 보고서',
    type: 'quarterly',
    period: '2026-Q1',
    createdAt: '2026-02-28T23:59:00',
    income: 4800000,
    expense: 3350000,
    balance: 1450000,
    status: 'in_progress',
  },
  {
    id: 4,
    title: '2025년 12월 월간 보고서',
    type: 'monthly',
    period: '2025-12',
    createdAt: '2025-12-31T23:59:00',
    income: 2100000,
    expense: 1750000,
    balance: 350000,
    status: 'completed',
  },
  {
    id: 5,
    title: '2025년 4분기 보고서',
    type: 'quarterly',
    period: '2025-Q4',
    createdAt: '2025-12-31T23:59:00',
    income: 6500000,
    expense: 5200000,
    balance: 1300000,
    status: 'completed',
  },
  {
    id: 6,
    title: '2025년 연간 보고서',
    type: 'annual',
    period: '2025',
    createdAt: '2025-12-31T23:59:00',
    income: 25000000,
    expense: 19500000,
    balance: 5500000,
    status: 'completed',
  },
];

/**
 * 숫자를 한국 통화 형식으로 포맷
 */
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(amount);
};

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

export default function ReportsPage() {
  return (
    <MainLayout
      title="보고서"
      breadcrumbItems={[{ label: '보고서' }]}
    >
      <div className="space-y-6">
        {/* 헤더 */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">예산 보고서</h1>
            <p className="mt-1 text-sm text-gray-500">
              자동 생성된 예산 보고서를 확인하고 다운로드하세요
            </p>
          </div>

          {/* 필터 버튼 그룹 */}
          <div className="flex gap-2">
            <Button variant="default" size="sm">
              전체
            </Button>
            <Button variant="outline" size="sm">
              월간
            </Button>
            <Button variant="outline" size="sm">
              분기
            </Button>
            <Button variant="outline" size="sm">
              연간
            </Button>
          </div>
        </div>

        {/* 보고서 카드 그리드 */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reports.map((report) => {
            const profitRate =
              report.income > 0
                ? ((report.balance / report.income) * 100).toFixed(1)
                : '0.0';

            return (
              <Card
                key={report.id}
                className="transition-shadow hover:shadow-md"
              >
                <CardHeader>
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2">
                      <FileText className="mt-1 h-5 w-5 text-primary-600" />
                      <CardTitle className="text-base leading-tight">
                        {report.title}
                      </CardTitle>
                    </div>
                    <Badge
                      variant={
                        report.status === 'completed' ? 'default' : 'secondary'
                      }
                    >
                      {report.status === 'completed' ? '완료' : '진행중'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    {formatDate(report.createdAt)}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* 요약 정보 */}
                  <div className="space-y-2 rounded-lg bg-gray-50 p-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">총 수입</span>
                      <span className="font-semibold text-accent-600">
                        {formatCurrency(report.income)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">총 지출</span>
                      <span className="font-semibold text-error">
                        {formatCurrency(report.expense)}
                      </span>
                    </div>
                    <div className="border-t border-gray-200 pt-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-900">잔액</span>
                        <span className="font-bold text-primary-600">
                          {formatCurrency(report.balance)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 수익률 */}
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-accent-600" />
                    <span className="text-gray-600">수익률:</span>
                    <span className="font-semibold text-accent-600">
                      {profitRate}%
                    </span>
                  </div>

                  {/* 액션 버튼 */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      disabled={report.status !== 'completed'}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      다운로드
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={report.status !== 'completed'}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
}
