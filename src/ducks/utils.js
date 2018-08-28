export const tempDucksUtils = null;

export const actionCreator = type =>
  Object.assign(
    payload => ({
      type,
      payload,
    }),
    { type },
  );
