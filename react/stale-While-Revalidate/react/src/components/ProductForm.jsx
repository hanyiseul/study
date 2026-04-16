import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct } from '../api/productsApi';

function ProductForm() {
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    product_name: '',
    category: '예금',
    price: '',
    risk_level: '낮음'
  });

  const mutation = useMutation({
    mutationFn: createProduct,

    onSuccess: function () {
      queryClient.invalidateQueries({ queryKey: ['products'] });

      setForm({
        product_name: '',
        category: '예금',
        price: '',
        risk_level: '낮음'
      });
    }
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    mutation.mutate({
      ...form,
      price: Number(form.price)
    });
  }

  return (
    <div className="panel">
      <h2>상품 등록</h2>

      <form onSubmit={handleSubmit} className="product-form">
        <input
          type="text"
          name="product_name"
          value={form.product_name}
          onChange={handleChange}
          placeholder="상품명"
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          <option value="예금">예금</option>
          <option value="채권">채권</option>
          <option value="펀드">펀드</option>
        </select>

        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="금액"
        />

        <select
          name="risk_level"
          value={form.risk_level}
          onChange={handleChange}
        >
          <option value="낮음">낮음</option>
          <option value="중간">중간</option>
          <option value="높음">높음</option>
        </select>

        <button
          type="submit"
          className="action-button"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? '등록 중...' : '상품 등록'}
        </button>
      </form>

      {mutation.isPending && (
        <p className="status">서버에 상품을 등록하는 중입니다.</p>
      )}

      {mutation.isError && (
        <p className="status error">{mutation.error.message}</p>
      )}

      {mutation.isSuccess && (
        <p className="status success">
          상품 등록이 완료되었고 캐시를 무효화하여 최신 데이터를 다시 조회했습니다.
        </p>
      )}
    </div>
  );
}

export default ProductForm;