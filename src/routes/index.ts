import { Router, Request, Response } from 'express';

const router = Router();

// Handle GET request to the root path
router.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Express TypeScript Boilerplate!');
});

export default router;
