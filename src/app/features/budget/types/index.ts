/**
 * Budget 관련 타입 정의
 *
 * Learning Points:
 * 1. TypeScript enum vs union type
 *    - enum: 런타임에 존재하는 객체 생성
 *    - union type: 컴파일 타임에만 존재, 더 가벼움
 * 2. 'as const' 패턴: 문자열 리터럴 타입으로 좁히기
 */

/**
 * 예산 항목 타입
 * - 'income': 수입
 * - 'expense': 지출
 */
export type BudgetType = 'income' | 'expense';

/**
 * 예산 카테고리
 * 확장 가능한 구조로 설계
 */
export type BudgetCategory = '회비' | '장소대관' | '용품구매' | '간식' | '기타';

/**
 * 예산 항목 인터페이스
 *
 * 설계 의도:
 * - id: 고유 식별자 (추후 DB 연동 시 number 또는 string)
 * - date: ISO 8601 형식 문자열 (YYYY-MM-DD)
 * - category: 분류를 위한 카테고리
 * - description: 상세 설명
 * - amount: 금액 (양수: 수입, 음수: 지출)
 * - type: 수입/지출 구분 (amount의 부호와 일치해야 함)
 */
export interface BudgetItem {
  id: number;
  date: string;
  category: BudgetCategory;
  description: string;
  amount: number;
  type: BudgetType;
}

/**
 * 예산 폼 입력 데이터
 * BudgetItem에서 id를 제외한 타입 (신규 생성 시 사용)
 */
export type BudgetFormData = Omit<BudgetItem, 'id'>;
