import { ref } from "vue";

export function useDebounce(func, wait) {
  const timeout = ref(null);

  const debounced = (...args) => {
    clearTimeout(timeout.value);
    timeout.value = setTimeout(() => func.apply(this, args), wait);
  };

  return debounced;
}
