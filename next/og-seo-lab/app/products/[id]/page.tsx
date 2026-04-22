// * metadata와 generateMetadata를 동시에 export 하면 안됨 *
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductById } from '@/lib/products';

type Props = {
  params: Promise<{ id: string }>;
};

 // URL 파라미터별로 다른 제목과 설명 반환
export async function generateMetadata({ // 동적 라우트 파라미터를 받을 수 있음
  params
}: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return {
      title: '상품 없음',
      description: '존재하지 않는 상품입니다.'
    };
  }

  return {
    title: product.name,
    description: product.summary,
    openGraph: {
      title: product.name,
      description: product.summary,
      url: `/products/${product.id}`,
      siteName: 'My Finance Service',
      type: 'article'
    }
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <section className="card">
      <span className="badge">상품 상세 페이지</span>
      <h2>{product.name}</h2>
      <p>{product.summary}</p>
      <p>{product.description}</p>
      <p>
        <strong>기본 금리:</strong> {product.interestRate}
      </p>
      <p className="muted">
        이 페이지는 <code>generateMetadata</code>와 세그먼트 전용
        <code>opengraph-image.tsx</code>를 함께 사용한다.
      </p>
    </section>
  );
}