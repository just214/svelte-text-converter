import { writable } from "svelte/store";

const createCopy = () => {
  const { subscribe, set } = writable(false);

  return {
    subscribe,
    copy: el => {
      /* Select the text field */
      el.select();
      /* Copy the text inside the text field */
      document.execCommand("copy");
      set(true);
      setTimeout(() => {
        set(false);
      }, 500);
    }
  };
};

export const copied = createCopy();
