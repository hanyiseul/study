export type TimePayload = {
  label: string;
  epoch: number;
  iso: string;
};

export function makeTimePayload(label: string): TimePayload {
  const now = new Date();

  return {
    label,
    epoch: now.getTime(),
    iso: now.toISOString(),
  };
}