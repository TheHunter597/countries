function debounce(func: Function, delay: number) {
  let timer: any;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func();
    }, delay);
  };
}

export default debounce;
