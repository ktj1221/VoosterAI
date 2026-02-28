/**
 * BudgetList 컴포넌트
 *
 * 예산 항목 리스트를 표시하는 컨테이너 컴포넌트
 *
 * Learning Points:
 * 1. Container Component 패턴
 *    - BudgetItem들을 조합하여 리스트 구성
 *    - 이벤트 전달 (props drilling)
 * 2. Array.map()으로 동적 리스트 렌더링
 * 3. key prop의 중요성: React가 효율적으로 리렌더링하도록 고유 id 사용
 * 4. Empty state 처리: 데이터 없을 때 UX 고려
 */

import { BudgetItem } from './BudgetItem';
import type { BudgetItem as BudgetItemType } from '../types';

interface BudgetListProps {
  items: BudgetItemType[];
  onItemClick?: (item: BudgetItemType) => void;
}

export function BudgetList({ items, onItemClick }: BudgetListProps) {
  // Empty state: 데이터가 없을 때
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-gray-500">등록된 거래 내역이 없습니다.</p>
        <p className="mt-2 text-sm text-gray-400">
          우측 상단의 버튼을 눌러 거래를 추가해보세요.
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {items.map((item) => (
        <BudgetItem key={item.id} item={item} onClick={onItemClick} />
      ))}
    </div>
  );
}
