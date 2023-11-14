export const sleep = (msec: number) =>
  new Promise<void>((resolve) => setTimeout(() => resolve(), msec));
