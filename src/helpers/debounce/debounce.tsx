type FuncType<T> = (...args: any[]) => Promise<T>;

function debounce<T>(func: FuncType<T>, delay: number): FuncType<T> {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (...args: any[]): Promise<T> {
    clearTimeout(timeoutId);
    return new Promise((resolve, reject) => {
      timeoutId = setTimeout(async () => {
        try {
          const result = await func(...args);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, delay);
    });
  };
}
