import { useState } from 'react';

function InventoryCreateForm({ mutation }) {
  const [form, setForm] = useState({
    productInitial: '',
    productName: '',
    category: '일반',
    status: '입고예정',
    location: '',
    storagePeriod: '',
    inboundDate: '',
    outboundDueDate: '',
    expectedAmount: ''
  });

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    mutation.mutate({
      ...form,
      expectedAmount: Number(form.expectedAmount)
    });

    setForm({
      productInitial: '',
      productName: '',
      category: '일반',
      status: '입고예정',
      location: '',
      storagePeriod: '',
      inboundDate: '',
      outboundDueDate: '',
      expectedAmount: ''
    });
  }

  return (
    <section className="inventory-panel create-form-panel">
      <h3 className="inventory-panel-title">재고 등록</h3>

      <form onSubmit={handleSubmit} className="inventory-create-form">
        <input
          name="productInitial"
          value={form.productInitial}
          onChange={handleChange}
          placeholder="상품 이니셜"
        />

        <input
          name="productName"
          value={form.productName}
          onChange={handleChange}
          placeholder="상품명"
        />

        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="보관 위치"
        />

        <input
          name="storagePeriod"
          value={form.storagePeriod}
          onChange={handleChange}
          placeholder="보관 기간"
        />

        <input
          type="date"
          name="inboundDate"
          value={form.inboundDate}
          onChange={handleChange}
        />

        <input
          type="date"
          name="outboundDueDate"
          value={form.outboundDueDate}
          onChange={handleChange}
        />

        <input
          type="number"
          name="expectedAmount"
          value={form.expectedAmount}
          onChange={handleChange}
          placeholder="정산 예정 금액"
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          <option value="일반">일반</option>
          <option value="냉장">냉장</option>
        </select>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="입고예정">입고예정</option>
          <option value="입고완료">입고완료</option>
          <option value="출고예정">출고예정</option>
          <option value="출고완료">출고완료</option>
        </select>

        <button type="submit" className="hero-button">
          재고 등록
        </button>
      </form>
    </section>
  );
}

export default InventoryCreateForm;