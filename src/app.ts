import express, { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index.js';
import { fileURLToPath } from 'url';
const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Route setup
app.use('/', indexRouter);

// Catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

// Error handler
app.use(
  (
    err: createError.HttpError,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    res.status(err.status || 500).json({
      message: err.message,
      error: req.app.get('env') === 'development' ? err : {}
    });
  }
);

export default app;
