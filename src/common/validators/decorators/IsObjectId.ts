import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from "class-validator";

import { Types } from "mongoose";

export function IsObjectId(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "IsObjectId",

      target: object.constructor,
      propertyName: propertyName,
      constraints: [IsObjectId],
      options: validationOptions,
      validator: {
        validate: (value: any) => Types.ObjectId.isValid(value),
        defaultMessage: (args: ValidationArguments) =>
          `${args.property} must be a ObjectId`,
      },
    });
  };
}
