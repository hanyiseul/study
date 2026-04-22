export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <section>
      <h1>상품 상세 페이지</h1>
      <p>상품 ID: {params.id}</p>
    </section>
  );
}