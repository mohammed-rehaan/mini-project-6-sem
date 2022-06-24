export const timeout = function (sec) {
    return new Promise((_, rej) => {
      setTimeout(() => {
        rej(new Error("ERR_INTERNET_ERROR"));
      }, sec * 1000);
    });
  };