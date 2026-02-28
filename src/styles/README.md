# 디자인 시스템 가이드

## 📖 개요

이 디렉토리는 CBRP(그룹예산마스터) 프로젝트의 디자인 시스템 토큰을 관리합니다.

## 🎨 컬러 팔레트

### Primary (파랑 - Blue)
**용도**: 주요 액션, 링크, 강조 요소
- 메인 컬러: `#3B82F6`
- 사용 예시: 버튼, 탭, 링크

```tsx
// Tailwind 클래스 사용
<button className="bg-primary-500 text-white">확인</button>

// 또는 CSS 변수 사용 (shadcn/ui 컴포넌트)
<Button>확인</Button>  // 자동으로 primary 컬러 적용
```

### Secondary (보라 - Violet)
**용도**: 보조 액션, 서브 정보
- 메인 컬러: `#8B5CF6`
- 사용 예시: 보조 버튼, 배지

```tsx
<button className="bg-secondary-500 text-white">취소</button>
```

### Accent (에메랄드 - Emerald)
**용도**: 성공 메시지, 하이라이트, 알림
- 메인 컬러: `#10B981`
- 사용 예시: 성공 알림, 배지, 강조 표시

```tsx
<div className="bg-accent-500 text-white">성공적으로 저장되었습니다</div>
```

### Grayscale
**용도**: 텍스트, 배경, 테두리
```tsx
// 텍스트
<p className="text-gray-900">주요 텍스트</p>
<p className="text-gray-500">보조 텍스트</p>

// 배경
<div className="bg-gray-50">연한 배경</div>
<div className="bg-gray-100">카드 배경</div>

// 테두리
<div className="border border-gray-300">테두리</div>
```

### Semantic Colors
**용도**: 상태 표시
```tsx
<div className="text-success">성공</div>
<div className="text-warning">경고</div>
<div className="text-error">오류</div>
<div className="text-info">정보</div>
```

## ✍️ 타이포그래피

### 폰트 패밀리
- **Sans**: Pretendard (한글 최적화)
- **Mono**: JetBrains Mono (코드용)

```tsx
<p className="font-sans">일반 텍스트</p>
<code className="font-mono">코드 텍스트</code>
```

### 텍스트 스타일

#### Heading
```tsx
<h1 className="text-4xl font-bold">H1 제목</h1>
<h2 className="text-3xl font-bold">H2 제목</h2>
<h3 className="text-2xl font-semibold">H3 제목</h3>
<h4 className="text-xl font-semibold">H4 제목</h4>
<h5 className="text-lg font-medium">H5 제목</h5>
<h6 className="text-base font-medium">H6 제목</h6>
```

#### Body
```tsx
<p className="text-base leading-relaxed">기본 본문 텍스트</p>
<p className="text-lg leading-relaxed">큰 본문 텍스트</p>
<p className="text-sm leading-normal">작은 본문 텍스트</p>
```

#### Caption & Label
```tsx
<span className="text-xs">캡션 텍스트</span>
<label className="text-sm font-medium">레이블</label>
```

## 🔧 TypeScript로 직접 사용

디자인 토큰을 TypeScript 코드에서 직접 사용할 수 있습니다:

```tsx
import { primary, typography, spacing } from '@/styles/design-tokens';

// 인라인 스타일로 사용
const buttonStyle = {
  backgroundColor: primary[500],
  fontSize: typography.body.fontSize,
  padding: `${spacing[2]} ${spacing[4]}`,
};

// 조건부 스타일
const getStatusColor = (status: string) => {
  return status === 'success' ? semantic.success : semantic.error;
};
```

## 📐 간격 시스템

8px 기준 간격 시스템:

```tsx
// Padding
<div className="p-2">8px</div>
<div className="p-4">16px</div>
<div className="p-6">24px</div>

// Margin
<div className="m-2">8px</div>
<div className="m-4">16px</div>
<div className="m-6">24px</div>

// Gap (Flexbox/Grid)
<div className="flex gap-4">16px 간격</div>
```

## 🎯 Best Practices

### 1. 일관성 유지
```tsx
// ✅ Good - 디자인 토큰 사용
<button className="bg-primary-500 text-white">확인</button>

// ❌ Bad - 직접 색상 코드 사용
<button className="bg-[#3B82F6] text-white">확인</button>
```

### 2. Semantic 컬러 활용
```tsx
// ✅ Good - 의미를 담은 컬러 사용
<Alert variant="success">저장 완료</Alert>

// ❌ Bad - primary를 성공 메시지에 사용
<Alert variant="primary">저장 완료</Alert>
```

### 3. 타이포그래피 계층 준수
```tsx
// ✅ Good - 명확한 계층 구조
<h1 className="text-4xl font-bold">페이지 제목</h1>
<h2 className="text-3xl font-bold">섹션 제목</h2>
<p className="text-base">본문</p>

// ❌ Bad - 일관성 없는 크기
<h1 className="text-2xl">페이지 제목</h1>
<h2 className="text-4xl">섹션 제목</h2>
```

### 4. 다크모드 고려
```tsx
// ✅ Good - CSS 변수 사용 (자동 다크모드 대응)
<div className="bg-background text-foreground">
  자동으로 다크모드 적용
</div>

// ⚠️ 주의 - 직접 색상 사용 시 다크모드 별도 처리 필요
<div className="bg-white dark:bg-gray-900">
  다크모드 수동 처리
</div>
```

## 🎨 Tailwind CSS 통합

모든 디자인 토큰은 `tailwind.config.ts`에 통합되어 있습니다:

```tsx
// 자동완성 지원
<div className="bg-primary-500" />    // ✅ 자동완성됨
<div className="text-gray-900" />     // ✅ 자동완성됨
<div className="font-sans" />         // ✅ 자동완성됨
```

## 📚 참고 자료

- [Tailwind CSS 문서](https://tailwindcss.com)
- [shadcn/ui 컴포넌트](https://ui.shadcn.com)
- [Pretendard 폰트](https://github.com/orioncactus/pretendard)
