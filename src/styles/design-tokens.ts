/**
 * Design Tokens
 *
 * 디자인 시스템의 핵심 토큰을 정의합니다.
 * 컬러 팔레트, 타이포그래피, 간격 등 디자인의 기본 단위를 관리합니다.
 */

// ============================================
// Color Palette
// ============================================

/**
 * 브랜드 메인 컬러
 * 주요 액션 버튼, 링크, 강조 요소에 사용
 */
export const primary = {
  DEFAULT: '#3B82F6', // Blue 500 - 신뢰감과 안정감을 주는 블루
  50: '#EFF6FF',
  100: '#DBEAFE',
  200: '#BFDBFE',
  300: '#93C5FD',
  400: '#60A5FA',
  500: '#3B82F6',
  600: '#2563EB',
  700: '#1D4ED8',
  800: '#1E40AF',
  900: '#1E3A8A',
} as const;

/**
 * 보조 컬러
 * 서브 액션, 보조 정보 표시에 사용
 */
export const secondary = {
  DEFAULT: '#8B5CF6', // Violet 500 - 창의성과 혁신을 나타내는 바이올렛
  50: '#F5F3FF',
  100: '#EDE9FE',
  200: '#DDD6FE',
  300: '#C4B5FD',
  400: '#A78BFA',
  500: '#8B5CF6',
  600: '#7C3AED',
  700: '#6D28D9',
  800: '#5B21B6',
  900: '#4C1D95',
} as const;

/**
 * 강조 컬러
 * 알림, 배지, 하이라이트에 사용
 */
export const accent = {
  DEFAULT: '#10B981', // Emerald 500 - 성공과 긍정을 나타내는 에메랄드
  50: '#ECFDF5',
  100: '#D1FAE5',
  200: '#A7F3D0',
  300: '#6EE7B7',
  400: '#34D399',
  500: '#10B981',
  600: '#059669',
  700: '#047857',
  800: '#065F46',
  900: '#064E3B',
} as const;

/**
 * Grayscale 컬러
 * 텍스트, 배경, 테두리 등 기본 UI 요소에 사용
 */
export const grayscale = {
  black: '#000000',
  900: '#111827',    // 진한 회색 (주요 텍스트)
  800: '#1F2937',
  700: '#374151',
  600: '#4B5563',
  500: '#6B7280',    // 중간 회색 (보조 텍스트)
  400: '#9CA3AF',
  300: '#D1D5DB',    // 연한 회색 (테두리)
  200: '#E5E7EB',
  100: '#F3F4F6',    // 매우 연한 회색 (배경)
  50: '#F9FAFB',
  white: '#FFFFFF',
} as const;

/**
 * Semantic Colors
 * 의미를 담은 컬러 (성공, 경고, 에러 등)
 */
export const semantic = {
  success: '#10B981',   // accent.DEFAULT와 동일
  warning: '#F59E0B',   // Amber 500
  error: '#EF4444',     // Red 500
  info: '#3B82F6',      // primary.DEFAULT와 동일
} as const;

// ============================================
// Typography
// ============================================

/**
 * 폰트 패밀리
 * Pretendard: 한글 최적화 폰트
 */
export const fontFamily = {
  sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', 'sans-serif'],
  mono: ['JetBrains Mono', 'Consolas', 'Monaco', 'monospace'],
} as const;

/**
 * 폰트 크기
 * rem 단위 사용 (1rem = 16px 기준)
 */
export const fontSize = {
  xs: '0.75rem',      // 12px
  sm: '0.875rem',     // 14px
  base: '1rem',       // 16px
  lg: '1.125rem',     // 18px
  xl: '1.25rem',      // 20px
  '2xl': '1.5rem',    // 24px
  '3xl': '1.875rem',  // 30px
  '4xl': '2.25rem',   // 36px
  '5xl': '3rem',      // 48px
  '6xl': '3.75rem',   // 60px
} as const;

/**
 * 폰트 굵기
 */
export const fontWeight = {
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
} as const;

/**
 * 줄 높이 (line-height)
 */
export const lineHeight = {
  none: '1',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2',
} as const;

/**
 * 타이포그래피 프리셋
 * 자주 사용되는 텍스트 스타일 조합
 */
export const typography = {
  h1: {
    fontSize: fontSize['4xl'],
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.tight,
    letterSpacing: '-0.02em',
  },
  h2: {
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.tight,
    letterSpacing: '-0.01em',
  },
  h3: {
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.snug,
    letterSpacing: '-0.01em',
  },
  h4: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.snug,
  },
  h5: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.normal,
  },
  h6: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.normal,
  },
  body: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.relaxed,
  },
  bodyLarge: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.relaxed,
  },
  bodySmall: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.normal,
  },
  caption: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.normal,
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.normal,
  },
} as const;

// ============================================
// Spacing
// ============================================

/**
 * 간격 시스템 (8px 기준)
 */
export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
} as const;

// ============================================
// Border Radius
// ============================================

export const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  base: '0.25rem',  // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  full: '9999px',
} as const;

// ============================================
// Type Exports
// ============================================

export type ColorPalette = typeof primary;
export type FontFamily = typeof fontFamily;
export type FontSize = typeof fontSize;
export type FontWeight = typeof fontWeight;
export type LineHeight = typeof lineHeight;
export type Typography = typeof typography;
export type Spacing = typeof spacing;
export type BorderRadius = typeof borderRadius;
