// 파일 기반 메타데이터 규칙
import { ImageResponse } from 'next/og';

export const alt = 'My Finance Service 메인 공유 이미지';
export const size = {
  width: 1200,
  height: 630
};
export const contentType = 'image/png';

// 빌드 시점 또는 요청 시점에 이미지 생성
export default function Image() {
  return new ImageResponse( // OG 이미지를 코드로 생성
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          background:
            'linear-gradient(135deg, rgb(15,23,42), rgb(37,99,235))',
          color: 'white',
          padding: '80px'
        }}
      >
        <div style={{ fontSize: 32, marginBottom: 24 }}>My Finance Service</div>
        <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.2 }}>
          온라인 금융 서비스
        </div>
        <div style={{ fontSize: 32, marginTop: 24 }}>
          계좌 조회 · 이체 · 거래 내역 확인
        </div>
      </div>
    ),
    size
  );
}