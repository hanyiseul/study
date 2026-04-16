export async function fetchProducts() {
  const response = await fetch('/api/products');

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || '상품 목록 조회 실패');
  }

  return await response.json();
}

export async function createProduct(productData) {
  const response = await fetch('/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(productData)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || '상품 등록 실패');
  }

  return await response.json();
}