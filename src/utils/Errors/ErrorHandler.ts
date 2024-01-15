import { Response } from 'express';
import { AppError } from './AppError';
import { errorManagement } from './errorManagement';

class ErrorHandler {
  public async handleError(error: AppError, res?: Response): Promise<void> {
    console.error('centrale:', error);
    if (error.commonType === errorManagement.commonErrors.notFound) {
      res?.status(404).json({ msg: error.message });
      return;
    }
    if (
      error.commonType === errorManagement.commonErrors.entreeInvalide ||
      error.commonType === errorManagement.commonErrors.misconfiguration ||
      error.commonType === errorManagement.commonErrors.horsDesLimites
    ) {
      res?.status(403).json({ msg: error.message });
      return;
    }
    res?.status(500).json({ msg: 'quelquechose a mal tourne' });
  }
}

const errorHandler = new ErrorHandler();

export { errorHandler };
