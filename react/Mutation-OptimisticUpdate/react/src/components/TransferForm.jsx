import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTransfer } from '../api/transfersApi';

function TransferForm() {
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    sender_name: '',
    receiver_name: '',
    amount: '',
    transfer_type: '계좌이체'
  });

  const mutation = useMutation({
    mutationFn: createTransfer,

    onMutate: async function (newData) {
      await queryClient.cancelQueries({ queryKey: ['transfers'] });

      const previousTransfers = queryClient.getQueryData(['transfers']);

      queryClient.setQueryData(['transfers'], function (old) {
        return [
          {
            id: Date.now(),
            sender_name: newData.sender_name,
            receiver_name: newData.receiver_name,
            amount: newData.amount,
            transfer_type: newData.transfer_type,
            status: '처리중',
            created_at: '요청 중'
          },
          ...(old || []) //기존 데이터가 없으면 빈배열을 복사해라
        ];
      });

      return { previousTransfers };
    },

    onError: function (error, newData, context) {
      queryClient.setQueryData(['transfers'], context.previousTransfers);
    },

    onSettled: function () {
      queryClient.invalidateQueries({ queryKey: ['transfers'] });
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
      amount: Number(form.amount)
    });

    setForm({
      sender_name: '',
      receiver_name: '',
      amount: '',
      transfer_type: '계좌이체'
    });
  }

  return (
    <div className="panel">
      <h2>거래 등록</h2>

      <form onSubmit={handleSubmit} className="transfer-form">
        <input
          type="text"
          name="sender_name"
          value={form.sender_name}
          onChange={handleChange}
          placeholder="보내는 사람"
        />

        <input
          type="text"
          name="receiver_name"
          value={form.receiver_name}
          onChange={handleChange}
          placeholder="받는 사람"
        />

        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="금액"
        />

        <select
          name="transfer_type"
          value={form.transfer_type}
          onChange={handleChange}
        >
          <option value="계좌이체">계좌이체</option>
          <option value="자동이체">자동이체</option>
          <option value="예약이체">예약이체</option>
        </select>

        <button type="submit" className="action-button">
          거래 등록
        </button>
      </form>

      {mutation.isPending && (
        <p className="status">서버에 거래를 등록하는 중입니다.</p>
      )}

      {mutation.isError && (
        <p className="status error">{mutation.error.message}</p>
      )}
    </div>
  );
}

export default TransferForm;