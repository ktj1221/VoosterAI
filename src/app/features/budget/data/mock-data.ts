/**
 * 예산 관리 목업 데이터
 *
 * Learning Points:
 * 1. 'as const' assertion: 타입을 리터럴로 좁혀서 타입 안전성 향상
 * 2. Mock data 패턴: 백엔드 API 없이 프론트엔드 개발 가능
 * 3. 실제 사용 시나리오를 반영한 테스트 데이터 설계
 */

import type { BudgetItem } from '../types';

/**
 * 초기 예산 항목 목록
 *
 * 데이터 특징:
 * - 최신 항목이 상단에 오도록 날짜 역순 정렬
 * - 실제 동호회 운영 시나리오 반영 (회비, 지출 등)
 * - amount는 수입(+), 지출(-)으로 구분
 */
export const INITIAL_BUDGET_ITEMS: BudgetItem[] = [
  {
    id: 1,
    date: '2026-02-28',
    category: '회비',
    description: '2월 회비 - 김철수',
    amount: 50000,
    type: 'income',
  },
  {
    id: 2,
    date: '2026-02-27',
    category: '장소대관',
    description: '정기모임 장소 대관료',
    amount: -150000,
    type: 'expense',
  },
  {
    id: 3,
    date: '2026-02-26',
    category: '회비',
    description: '2월 회비 - 박영희',
    amount: 50000,
    type: 'income',
  },
  {
    id: 4,
    date: '2026-02-25',
    category: '용품구매',
    description: '동호회 티셔츠 제작',
    amount: -320000,
    type: 'expense',
  },
  {
    id: 5,
    date: '2026-02-24',
    category: '회비',
    description: '2월 회비 - 이민수',
    amount: 50000,
    type: 'income',
  },
] as const;

/**
 * 카테고리 목록
 * Select 컴포넌트 등에서 사용
 */
export const BUDGET_CATEGORIES = [
  '회비',
  '장소대관',
  '용품구매',
  '간식',
  '기타',
] as const;
