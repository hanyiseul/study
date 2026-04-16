import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTicket } from '../api/ticketsApi';

function TicketForm() {
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    customer_name: '',
    title: '',
    content: ''
  });

  const mutation = useMutation({
    mutationFn: createTicket,

    onSuccess: function () {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });

      setForm({
        customer_name: '',
        title: '',
        content: ''
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
      customer_name: form.customer_name,
      title: form.title,
      content: form.content
    });
  }

  return (
    <div className="panel">
      <h2>문의 등록</h2>

      <form onSubmit={handleSubmit} className="ticket-form">
        <input
          type="text"
          name="customer_name"
          value={form.customer_name}
          onChange={handleChange}
          placeholder="고객명"
        />

        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="문의 제목"
        />

        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="문의 내용"
          rows="5"
        />

        <button
          type="submit"
          className="action-button"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? '등록 중...' : '문의 등록'}
        </button>
      </form>

      {mutation.isPending && (
        <p className="status">서버에 문의를 등록하는 중입니다.</p>
      )}

      {mutation.isError && (
        <p className="status error">{mutation.error.message}</p>
      )}

      {mutation.isSuccess && (
        <p className="status success">
          문의 등록이 완료되었고 최신 목록을 다시 조회했습니다.
        </p>
      )}
    </div>
  );
}

export default TicketForm;