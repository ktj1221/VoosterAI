'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Calendar, CheckCircle2, Clock } from 'lucide-react';

/**
 * Announcements Page
 *
 * 공지사항 관리 페이지
 * - 공지사항 카드 목록
 * - 확인/미확인 상태 추적
 * - 공지사항 작성 버튼 (목업)
 *
 * Learning Points:
 * 1. Card 그리드 레이아웃: 반응형 그리드로 카드 배치
 * 2. 상태 시각화: Badge와 아이콘으로 확인 상태 표시
 * 3. 날짜 포맷팅: Intl.DateTimeFormat으로 한국어 날짜 표시
 */

// 더미 데이터: 공지사항
const announcements = [
  {
    id: 1,
    title: '3월 정기모임 안내',
    content:
      '3월 정기모임은 3월 15일(토) 오후 2시, 강남구 OO센터에서 진행됩니다. 많은 참여 부탁드립니다.',
    date: '2026-02-26T18:00:00',
    readCount: 42,
    totalMembers: 45,
    isPinned: true,
  },
  {
    id: 2,
    title: '2월 회비 납부 안내',
    content:
      '2월 회비 납부 기한이 2월 28일까지입니다. 아직 납부하지 않으신 회원님들은 서둘러 주세요.',
    date: '2026-02-20T10:30:00',
    readCount: 38,
    totalMembers: 45,
    isPinned: false,
  },
  {
    id: 3,
    title: '동호회 티셔츠 디자인 투표',
    content:
      '동호회 티셔츠 디자인 3가지 중 마음에 드는 디자인에 투표해주세요. 투표는 3월 5일까지입니다.',
    date: '2026-02-18T14:15:00',
    readCount: 35,
    totalMembers: 45,
    isPinned: false,
  },
  {
    id: 4,
    title: '신입 회원 환영 공지',
    content:
      '이번 달 새로 가입하신 김민수, 이지은 회원님을 환영합니다! 많은 관심과 응원 부탁드립니다.',
    date: '2026-02-15T09:00:00',
    readCount: 40,
    totalMembers: 45,
    isPinned: false,
  },
  {
    id: 5,
    title: '연례 총회 일정 공지',
    content:
      '2026년 연례 총회가 4월 20일(일) 오후 3시에 열립니다. 모든 회원님들의 참석 부탁드립니다.',
    date: '2026-02-10T16:45:00',
    readCount: 45,
    totalMembers: 45,
    isPinned: false,
  },
  {
    id: 6,
    title: '동호회 행사 사진 공유',
    content:
      '지난 주말 진행된 동호회 행사 사진을 공유합니다. 아래 링크에서 확인하실 수 있습니다.',
    date: '2026-02-08T11:20:00',
    readCount: 41,
    totalMembers: 45,
    isPinned: false,
  },
];

/**
 * 날짜를 한국어 형식으로 포맷
 */
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export default function AnnouncementsPage() {
  return (
    <MainLayout
      title="공지사항"
      breadcrumbItems={[{ label: '공지사항' }]}
    >
      <div className="space-y-6">
        {/* 헤더: 제목 및 작성 버튼 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">공지사항</h1>
            <p className="mt-1 text-sm text-gray-500">
              회원들에게 중요한 소식을 전달하세요
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            공지 작성
          </Button>
        </div>

        {/* 공지사항 카드 그리드 */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {announcements.map((announcement) => {
            const readPercentage = Math.round(
              (announcement.readCount / announcement.totalMembers) * 100
            );
            const isFullyRead = announcement.readCount === announcement.totalMembers;

            return (
              <Card
                key={announcement.id}
                className={`transition-shadow hover:shadow-md ${
                  announcement.isPinned ? 'border-primary-300 border-2' : ''
                }`}
              >
                <CardHeader>
                  <div className="mb-2 flex items-start justify-between">
                    <CardTitle className="text-lg">
                      {announcement.title}
                    </CardTitle>
                    {announcement.isPinned && (
                      <Badge variant="default" className="shrink-0">
                        고정
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    {formatDate(announcement.date)}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="line-clamp-3 text-sm text-gray-600">
                    {announcement.content}
                  </p>

                  {/* 확인 상태 */}
                  <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                    <div className="flex items-center gap-2">
                      {isFullyRead ? (
                        <CheckCircle2 className="h-4 w-4 text-accent-600" />
                      ) : (
                        <Clock className="h-4 w-4 text-warning" />
                      )}
                      <span className="text-xs font-medium text-gray-700">
                        확인 상태
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-900">
                        {announcement.readCount}/{announcement.totalMembers}
                      </div>
                      <div className="text-xs text-gray-500">
                        {readPercentage}%
                      </div>
                    </div>
                  </div>

                  {/* 액션 버튼 */}
                  <Button variant="outline" className="w-full" size="sm">
                    자세히 보기
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
}
