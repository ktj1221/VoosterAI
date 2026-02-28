/**
 * BudgetItem 컴포넌트
 *
 * 개별 예산 항목을 표시하는 프레젠테이셔널 컴포넌트
 *
 * Learning Points:
 * 1. Presentational Component 패턴
 *    - 데이터 표시만 담당 (비즈니스 로직 없음)
 *    - props로 데이터와 이벤트 핸들러 받기
 * 2. 조건부 스타일링: 수입/지출에 따라 색상 변경
 * 3. Tailwind CSS 유틸리티 클래스 활용
 */

import { Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { BudgetItem as BudgetItemType } from '../types';

interface BudgetItemProps {
  item: BudgetItemType;
  onClick?: (item: BudgetItemType) => void;
}

/**
 * 숫자를 한국 통화 형식으로 포맷
 */
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(Math.abs(amount)); // 절대값 사용 (부호는 따로 표시)
};

export function BudgetItem({ item, onClick }: BudgetItemProps) {
  const isIncome = item.type === 'income';

  return (
    <div
      onClick={() => onClick?.(item)}
      className="flex items-center justify-between border-b border-gray-100 py-3 transition-colors hover:bg-gray-50 cursor-pointer"
    >
      {/* 왼쪽: 날짜 + 카테고리 */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span>{item.date}</span>
        </div>
        <Badge variant={isIncome ? 'default' : 'secondary'}>
          {item.category}
        </Badge>
      </div>

      {/* 중앙: 설명 */}
      <div className="flex-1 px-4">
        <p className="text-sm text-gray-900">{item.description}</p>
      </div>

      {/* 오른쪽: 금액 */}
      <div
        className={`text-right text-sm font-semibold ${
          isIncome ? 'text-accent-600' : 'text-error'
        }`}
      >
        {isIncome ? '+' : '-'}
        {formatCurrency(item.amount)}
      </div>
    </div>
  );
}
