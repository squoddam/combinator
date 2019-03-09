export const log = (...args) => {
  if (args.length === 2) {
    const [message, value] = args;
    return console.log(message, value), value;
  }

  return console.log(args[0]), args[0];
};
