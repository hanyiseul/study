export function toAmount(value: unknown) {
  const amount = Number(value);

  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error('유효한 금액이 아닙니다.');
  }

  return amount;
}

export function ensureActiveStatus(status: string) {
  if (status !== 'active') {
    throw new Error('비활성화된 계좌입니다.');
  }
}