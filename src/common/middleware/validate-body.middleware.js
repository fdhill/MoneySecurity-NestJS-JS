import { BadRequestException } from '../exceptions';

export const validateBodyMiddleware = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
      throw new BadRequestException('Request body cannot be empty');
    }
  }
  next();
};
