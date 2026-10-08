import { Router } from 'express';

export const createUserRoutes = (userController) => {
  const router = Router();

  router.get('/', (req, res) => userController.findAll());
  router.get('/:id', (req, res) => userController.findOne(req));
  router.post('/', (req, res) => userController.create(req));
  router.put('/:id', (req, res) => userController.update(req));
  router.delete('/:id', (req, res) => userController.delete(req));

  return router;
};
