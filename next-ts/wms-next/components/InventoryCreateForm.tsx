'use client';

import { useState } from 'react';
import type { UseMutationResult } from '@tanstack/react-query';
import type { CreateInventoryItemInput } from '../lib/inventoryApi';

type Props = {
  mutation: UseMutationResult<
    any,
    Error,
    CreateInventoryItemInput,
    { previousInventory?: any[] }
  >;
};

const initialForm: CreateInventoryItemInput = {
  productInitial: '',
  productName: '',
  category: '일반',
  status: '입고예정',
  location: '',
  storagePeriod: '',
  inboundDate: '',
  outboundDueDate: '',
  expectedAmount: '',
};

export default function InventoryCreateForm({ mutation }: Props) {
  const [form, setForm] = useState<CreateInventoryItemInput>(initialForm);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;

    setForm(function (prev) {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    mutation.mutate(form, {
      onSuccess: function () {
        setForm(initialForm);
      },
    });
  }

  return (
    <section className="inventory-panel create-form-panel">
      <h3 className="inventory-panel-title">재고 등록</h3>

      <form className="inventory-create-form" onSubmit={handleSubmit}>
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
          placeholder="상품 이름"
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

        <button
          type="submit"
          className="hero-button"
          disabled={mutation.isPending}
        >
          재고 등록
        </button>
      </form>
    </section>
  );
}