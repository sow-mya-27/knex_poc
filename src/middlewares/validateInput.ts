import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

function validateInput(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  };
}

export default validateInput;
