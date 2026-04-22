export type Post = {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  publishedAt: string;
  ogImage: string;
};

export const posts: Post[] = [
  {
    id: '1',
    title: 'Next.js Metadata API 입문',
    summary: '정적 metadata와 동적 generateMetadata의 차이를 학습한다.',
    content:
      '이 글은 Next.js App Router에서 Metadata API를 사용하는 기본 구조를 설명한다.',
    author: '김민수',
    publishedAt: '2026-04-21',
    ogImage: '/og/post-1.png'
  },
  {
    id: '2',
    title: '검색엔진을 위한 robots와 sitemap 구성',
    summary: '검색엔진 크롤링과 사이트맵 구성을 코드로 관리한다.',
    content:
      '이 글은 robots.ts와 sitemap.ts를 통해 검색엔진 친화적 구조를 만드는 방법을 설명한다.',
    author: '이서연',
    publishedAt: '2026-04-21',
    ogImage: '/og/post-2.png'
  },
  {
    id: '3',
    title: 'Open Graph 이미지 실전 적용',
    summary: '실제 대표 이미지 파일을 각 페이지에 연결하는 방법을 학습한다.',
    content:
      '이 글은 정적 이미지 파일을 이용해 Open Graph와 Twitter 카드를 설정하는 방법을 설명한다.',
    author: '박지훈',
    publishedAt: '2026-04-21',
    ogImage: '/og/post-3.png'
  }
];

export function getPostById(id: string) {
  return posts.find((post) => post.id === id);
}