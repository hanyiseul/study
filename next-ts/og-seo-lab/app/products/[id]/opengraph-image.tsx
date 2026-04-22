import { ImageResponse } from 'next/og';
import { getProductById } from '@/lib/products';

export const alt = '상품 상세 공유 이미지';
export const size = {
  width: 1200,
  height: 630
};
export const contentType = 'image/png';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Image({ params }: Props) { // params : promise 형태로 전달됨
  const { id } = await params;
  const product = getProductById(id);

  const title = product ? product.name : '존재하지 않는 상품';
  const summary = product ? product.summary : '상품 정보를 찾을 수 없습니다.';
  const rate = product ? product.interestRate : '-';

  return new ImageResponse( // 이미지로 렌더링해서 응답
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background:
            'linear-gradient(135deg, rgb(49,46,129), rgb(14,116,144))',
          color: 'white',
          padding: '70px'
        }}
      >
        <div style={{ fontSize: 28 }}>My Finance Service Product</div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: '24px'
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 30, lineHeight: 1.4 }}>{summary}</div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 28
          }}
        >
          <div>상품 상세 페이지</div>
          <div>{rate}</div>
        </div>
      </div>
    ),
    size
  );
}