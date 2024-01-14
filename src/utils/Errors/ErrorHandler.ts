import { Response } from 'express';

class ErrorHandler {
  public async handleError(error: Error, res?: Response): Promise<void> {
    console.error('centrale:', error);

    res?.status(500).json({ msg: 'quelquechose a mal tourne' });
  }
}

const errorHandler = new ErrorHandler();

export { errorHandler };
