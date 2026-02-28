/**
 * BudgetForm 컴포넌트
 *
 * 수입/지출 항목을 추가하는 폼 컴포넌트
 *
 * Learning Points:
 * 1. react-hook-form: 성능 최적화된 폼 관리 라이브러리
 *    - useForm: 폼 상태 관리
 *    - handleSubmit: 유효성 검사 + 제출 처리
 * 2. zod: TypeScript 우선 스키마 검증 라이브러리
 *    - 런타임 타입 체크 + 유효성 검사
 * 3. shadcn/ui Form 컴포넌트: 접근성(a11y) 자동 처리
 * 4. Controlled Component: React가 input 값을 제어
 */

'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { BUDGET_CATEGORIES } from '../data/mock-data';
import type { BudgetFormData } from '../types';

/**
 * Zod 스키마 정의
 *
 * 유효성 검사 규칙:
 * - date: 문자열, 필수
 * - category: 정의된 카테고리 중 하나
 * - description: 최소 1자 이상
 * - amount: 숫자, 0 초과
 * - type: 'income' 또는 'expense'
 */
const budgetFormSchema = z.object({
  date: z.string().min(1, { message: '날짜를 입력해주세요.' }),
  category: z.enum(['회비', '장소대관', '용품구매', '간식', '기타'], {
    required_error: '카테고리를 선택해주세요.',
  }),
  description: z.string().min(1, { message: '설명을 입력해주세요.' }),
  amount: z.coerce
    .number({ invalid_type_error: '숫자를 입력해주세요.' })
    .positive({ message: '0보다 큰 금액을 입력해주세요.' }),
  type: z.enum(['income', 'expense'], {
    required_error: '수입/지출을 선택해주세요.',
  }),
});

interface BudgetFormProps {
  onSubmit: (data: BudgetFormData) => void;
  onCancel?: () => void;
}

export function BudgetForm({ onSubmit, onCancel }: BudgetFormProps) {
  const form = useForm<BudgetFormData>({
    resolver: zodResolver(budgetFormSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0], // 오늘 날짜 (YYYY-MM-DD)
      category: '회비',
      description: '',
      amount: 0,
      type: 'income',
    },
  });

  /**
   * 폼 제출 핸들러
   * - react-hook-form이 유효성 검사 후 이 함수 호출
   * - type에 따라 amount 부호 조정 (지출: 음수)
   */
  const handleFormSubmit = (data: BudgetFormData) => {
    const processedData: BudgetFormData = {
      ...data,
      amount: data.type === 'expense' ? -Math.abs(data.amount) : Math.abs(data.amount),
    };
    onSubmit(processedData);
    form.reset(); // 폼 초기화
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* 날짜 필드 */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>날짜</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 수입/지출 선택 */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>구분</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="수입/지출 선택" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="income">수입</SelectItem>
                  <SelectItem value="expense">지출</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 카테고리 선택 */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>카테고리</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="카테고리 선택" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {BUDGET_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 금액 입력 */}
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>금액</FormLabel>
              <FormControl>
                <Input type="number" placeholder="금액을 입력하세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 설명 입력 */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>설명</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="거래 내용을 입력하세요"
                  className="resize-none"
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 버튼 그룹 */}
        <div className="flex gap-2 pt-4">
          <Button type="submit" className="flex-1">
            저장
          </Button>
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              취소
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
