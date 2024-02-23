import ISO6391 from "iso-639-1";
import { ValidateFn } from "mongoose";

export const validateISO6381: ValidateFn<any> = (value) =>
  ISO6391.validate(value);
