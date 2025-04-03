import express, {NextFunction, Request, Response} from "express";
import cors from "cors";
import { config } from "./config/config";
import {ApiError, InternalError, NotFoundError} from "./core/error";
import './database'
import routes from './routes';
import {ErrorType} from "./core/error/enums";

const app = express();

const { FRONTEND_PUBLIC_URL } = config;

app.use(express.json({ limit: '10mb' }));

app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));

app.use('/', routes);



app.use((req, res, next) => next(new NotFoundError()));


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
        ApiError.handle(err, res);
        if (err.type === ErrorType.INTERNAL)
            console.error(
                `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
            );
    } else {
        console.error(
            `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
        );
        console.error(err);
        ApiError.handle(new InternalError(), res);
    }
});

export default app;
