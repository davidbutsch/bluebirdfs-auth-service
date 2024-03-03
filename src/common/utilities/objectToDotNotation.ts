/**
 * Consume update args object for document and can handle infinite level nesting.
 * Returns object for leverage by $set in Mongoose update function.
 *
 * @param  args The object or array to  loop through
 * @param  prefix The prefix to fill the $set object
 * @returns
 */
export const objectToDotNotation = (args: any, prefix = "") =>
  Object.keys(args).reduce((acc: any, key) => {
    if (typeof args[key] === "object") {
      Object.assign(acc, objectToDotNotation(args[key], `${prefix}${key}.`));
    } else {
      acc[`${prefix}${key}`] = args[key];
    }

    return acc;
  }, {});
