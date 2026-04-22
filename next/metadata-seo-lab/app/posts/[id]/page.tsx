import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostById } from '@/lib/posts';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = getPostById(id);

  if (!post) {
    return {
      title: '게시글 없음',
      description: '존재하지 않는 게시글입니다.',
      robots: {
        index: false,
        follow: false
      }
    };
  }

  return {
    title: post.title,
    description: post.summary,
    alternates: {
      canonical: `/posts/${post.id}`
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `/posts/${post.id}`,
      siteName: 'SEO Lab',
      type: 'article',
      images: [
        {
          url: post.ogImage,
          width: 1200,
          height: 630,
          alt: post.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: [post.ogImage]
    }
  };
}

export default async function PostDetailPage({ params }: Props) {
  const { id } = await params;
  const post = getPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <section className="card">
      <span className="badge">동적 상세 페이지</span>
      <h2>{post.title}</h2>
      <p>{post.summary}</p>
      <p>{post.content}</p>
      <p>
        <strong>작성자:</strong> {post.author}
      </p>
      <p>
        <strong>게시일:</strong> {post.publishedAt}
      </p>
      <p className="muted">
        이 페이지는 generateMetadata로 게시글별 메타데이터를 동적으로 생성한다.
      </p>
    </section>
  );
}