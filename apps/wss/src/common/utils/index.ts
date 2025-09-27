export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function returnAfterComplete(callback: () => void, ms?: number) {
  setImmediate(() => {
    if (ms) {
      setTimeout(() => {
        callback();
      }, ms);
    } else {
      callback();
    }
  });
}
