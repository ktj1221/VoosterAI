/**
 * Budget Page (예산 관리 페이지)
 *
 * User Journey:
 * 로그인 → 대시보드 진입 → '예산 관리' 메뉴 클릭 → 수입/지출 입력 → 저장 → 리스트 갱신
 *
 * Learning Points:
 * 1. 컴포넌트 조합 (Composition)
 *    - BudgetForm, BudgetList를 조합하여 페이지 구성
 * 2. 상태 관리 (useState)
 *    - items: 예산 항목 배열
 *    - showForm: 폼 표시 여부
 * 3. 이벤트 핸들링
 *    - 폼 제출 → 새 항목 추가 → 리스트 상단에 표시
 * 4. shadcn/ui Sheet: 모달/사이드 패널 (반응형)
 */

'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { BudgetForm } from './components/BudgetForm';
import { BudgetList } from './components/BudgetList';
import { INITIAL_BUDGET_ITEMS } from './data/mock-data';
import type { BudgetItem, BudgetFormData } from './types';

export default function BudgetPage() {
  // 상태 관리
  const [items, setItems] = useState<BudgetItem[]>(INITIAL_BUDGET_ITEMS);
  const [showForm, setShowForm] = useState(false);

  /**
   * 새 항목 추가 핸들러
   *
   * 로직:
   * 1. 새로운 ID 생성 (현재 최대값 + 1)
   * 2. 폼 데이터와 ID 결합
   * 3. 배열 맨 앞에 추가 (최신 항목이 상단에 표시)
   * 4. 폼 닫기
   */
  const handleAddItem = (data: BudgetFormData) => {
    const newId = items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1;
    const newItem: BudgetItem = {
      id: newId,
      ...data,
    };
    setItems([newItem, ...items]); // 배열 맨 앞에 추가
    setShowForm(false);
  };

  /**
   * 항목 클릭 핸들러
   * 요구사항: "항목 클릭 시 편집/삭제 모달 오픈"
   * 현재는 alert로 스캐폴딩만 구현
   */
  const handleItemClick = (item: BudgetItem) => {
    // TODO: 편집/삭제 모달 구현 (프롬프트에 명시되지 않아 스캐폴딩만)
    alert(`항목 ID ${item.id} 클릭됨 - 편집/삭제 기능은 추후 구현`);
  };

  // 통계 계산
  const totalIncome = items
    .filter((item) => item.type === 'income')
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpense = Math.abs(
    items
      .filter((item) => item.type === 'expense')
      .reduce((sum, item) => sum + item.amount, 0)
  );

  const balance = totalIncome - totalExpense;

  return (
    <MainLayout title="예산 관리" breadcrumbItems={[{ label: '예산 관리' }]}>
      <div className="space-y-6">
        {/* 예산 요약 카드 (3열 그리드) */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                현재 잔액
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary-600">
                {balance.toLocaleString('ko-KR')}원
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
              <div className="text-2xl font-bold text-accent-600">
                +{totalIncome.toLocaleString('ko-KR')}원
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
              <div className="text-2xl font-bold text-error">
                -{totalExpense.toLocaleString('ko-KR')}원
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 거래 내역 카드 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>거래 내역</CardTitle>
            <Button size="sm" onClick={() => setShowForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              거래 추가
            </Button>
          </CardHeader>
          <CardContent>
            <BudgetList items={items} onItemClick={handleItemClick} />
          </CardContent>
        </Card>
      </div>

      {/* 거래 추가 폼 (Sheet: 오른쪽에서 슬라이드) */}
      <Sheet open={showForm} onOpenChange={setShowForm}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>거래 추가</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <BudgetForm
              onSubmit={handleAddItem}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </SheetContent>
      </Sheet>
    </MainLayout>
  );
}
