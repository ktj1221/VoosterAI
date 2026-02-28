'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, ArrowDownToLine, ArrowUpFromLine, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

/**
 * Budget Page
 *
 * 예산 관리 페이지
 * - 잔액 요약: 총 잔액, 총 수입, 총 지출
 * - 거래 내역 테이블: 날짜, 카테고리, 내용, 금액
 * - 거래 추가 버튼 (목업)
 *
 * Learning Points:
 * 1. 테이블 구조: semantic HTML로 접근성 향상 (thead, tbody, th, td)
 * 2. 조건부 스타일링: 수입/지출에 따라 다른 색상 적용
 * 3. Badge 컴포넌트: 카테고리 시각화
 */

// 더미 데이터: 거래 내역
const transactions = [
  {
    id: 1,
    date: '2026-02-28',
    category: '회비',
    description: '2월 회비 - 김철수',
    amount: 50000,
    type: 'income' as const,
  },
  {
    id: 2,
    date: '2026-02-27',
    category: '장소대관',
    description: '정기모임 장소 대관료',
    amount: -150000,
    type: 'expense' as const,
  },
  {
    id: 3,
    date: '2026-02-26',
    category: '회비',
    description: '2월 회비 - 박영희',
    amount: 50000,
    type: 'income' as const,
  },
  {
    id: 4,
    date: '2026-02-25',
    category: '용품구매',
    description: '동호회 티셔츠 제작',
    amount: -320000,
    type: 'expense' as const,
  },
  {
    id: 5,
    date: '2026-02-24',
    category: '회비',
    description: '2월 회비 - 이민수',
    amount: 50000,
    type: 'income' as const,
  },
  {
    id: 6,
    date: '2026-02-23',
    category: '간식',
    description: '정기모임 다과비',
    amount: -45000,
    type: 'expense' as const,
  },
  {
    id: 7,
    date: '2026-02-22',
    category: '회비',
    description: '2월 회비 - 최지훈',
    amount: 50000,
    type: 'income' as const,
  },
  {
    id: 8,
    date: '2026-02-21',
    category: '회비',
    description: '2월 회비 - 강민지',
    amount: 50000,
    type: 'income' as const,
  },
];

// 계산: 총 수입, 총 지출, 잔액
const totalIncome = transactions
  .filter((t) => t.type === 'income')
  .reduce((sum, t) => sum + t.amount, 0);

const totalExpense = Math.abs(
  transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)
);

const balance = totalIncome - totalExpense;

/**
 * 숫자를 한국 통화 형식으로 포맷
 */
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(amount);
};

export default function BudgetPage() {
  return (
    <MainLayout
      title="예산 관리"
      breadcrumbItems={[{ label: '예산 관리' }]}
    >
      <div className="space-y-6">
        {/* 예산 요약 카드 */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                현재 잔액
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary-600">
                {formatCurrency(balance)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                총 수입
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <ArrowDownToLine className="h-5 w-5 text-accent-600" />
                <div className="text-2xl font-bold text-accent-600">
                  {formatCurrency(totalIncome)}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                총 지출
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <ArrowUpFromLine className="h-5 w-5 text-error" />
                <div className="text-2xl font-bold text-error">
                  {formatCurrency(totalExpense)}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 거래 내역 테이블 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>거래 내역</CardTitle>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              거래 추가
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="pb-3 text-left text-sm font-semibold text-gray-700">
                      날짜
                    </th>
                    <th className="pb-3 text-left text-sm font-semibold text-gray-700">
                      카테고리
                    </th>
                    <th className="pb-3 text-left text-sm font-semibold text-gray-700">
                      내용
                    </th>
                    <th className="pb-3 text-right text-sm font-semibold text-gray-700">
                      금액
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="border-b border-gray-100 transition-colors hover:bg-gray-50"
                    >
                      <td className="py-3 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          {transaction.date}
                        </div>
                      </td>
                      <td className="py-3">
                        <Badge
                          variant={
                            transaction.type === 'income'
                              ? 'default'
                              : 'secondary'
                          }
                        >
                          {transaction.category}
                        </Badge>
                      </td>
                      <td className="py-3 text-sm text-gray-900">
                        {transaction.description}
                      </td>
                      <td className="py-3 text-right">
                        <span
                          className={`text-sm font-semibold ${
                            transaction.type === 'income'
                              ? 'text-accent-600'
                              : 'text-error'
                          }`}
                        >
                          {transaction.type === 'income' ? '+' : ''}
                          {formatCurrency(transaction.amount)}
                        </span>
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
