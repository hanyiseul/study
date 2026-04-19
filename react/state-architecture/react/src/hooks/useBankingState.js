import useStore from '../store';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createTransaction,
  fetchAccount,
  fetchTransactions
} from '../api/bankingApi';

export function useBankingState() {
  const queryClient = useQueryClient();
  const { theme, toggleTheme, form, setForm } = useStore();

  // 계좌 요약 데이터를 서버에서 조회
  const accountQuery = useQuery({
    queryKey: ['account'],
    queryFn: fetchAccount,
    staleTime: 5000 // 캐시이름
  });

  // 거래 내역을 서버에서 조회
  const transactionsQuery = useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
    staleTime: 5000
  });

  // 거래 등록 요청을 서버로 전송
  // 등록이 성공하면 거래 목록을 다시 조회
  const createMutation = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] }); // 등록 이후 서버 기준으로 거래 목록을 다시 가져옴
    }
  });

  function handleChange(event) {
    setForm(event.target.name, event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    createMutation.mutate({
      sender_name: form.sender_name,
      amount: Number(form.amount)
    });
  }

  return {
    theme,
    toggleTheme,
    form,
    handleChange,
    handleSubmit,
    accountQuery,
    transactionsQuery,
    createMutation
  };
}