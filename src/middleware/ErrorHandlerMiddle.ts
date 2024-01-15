import { Request, Response, NextFunction } from 'express';
import { errorHandler } from '../utils';

const errorHandlerMiddle = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('err', err);
  await errorHandler.handleError(err, res);
};

export { errorHandlerMiddle };
