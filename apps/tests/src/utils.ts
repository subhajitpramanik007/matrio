export {
  GameEventsRequest,
  GameEventsResponse,
} from "../../wss/src/types/index.ts";

export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function completePromise<T extends any>(
  func: () => T
): Promise<T> {
  return new Promise<T>((resolve) => {
    const result = func();
    resolve(result);
  });
}

export async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
