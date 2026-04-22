import { ImageResponse } from 'next/og';

export const alt = '회사 소개 공유 이미지';
export const size = {
  width: 1200,
  height: 630
};
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background:
            'linear-gradient(135deg, rgb(30,41,59), rgb(16,185,129))',
          color: 'white',
          padding: '80px'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 30, marginBottom: 20 }}>My Finance Service</div>
          <div style={{ fontSize: 76, fontWeight: 700 }}>회사 소개</div>
          <div style={{ fontSize: 30, marginTop: 24 }}>
            신뢰 기반 디지털 금융 서비스
          </div>
        </div>
      </div>
    ),
    size
  );
}