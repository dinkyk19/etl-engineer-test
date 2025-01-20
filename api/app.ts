import express, { Request, Response, NextFunction, Application } from 'express';
import { connectToDatabase } from '../sqlite';
import dotenv from 'dotenv';

import routes from './routes';
// import importData from '../etl/import';

// // Load environment variables from .env file
dotenv.config();
const port = process.env.PORT || 3000;

export default async function bootstrap(): Promise<Application> {

  const app: Application = express();
  try {

    // enable cors
    app.all('/*', function (req: Request, res: Response, next: NextFunction) {
      res.header("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers,crossdomain,withcredentials,Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Origin");
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      next();
    });

    // Middleware parses incoming requests with application/x-www-form-urlencoded payloads
    app.use(express.urlencoded({ extended: true })) // exnteded: true allows to parse nested object
    app.use(express.json({ limit: '100kb' })); //middleware parses incoming requests with application/json payloads and request pyload limit upto 100kb

    // DB connection initial and create tables if not exist. 
    const db = await connectToDatabase();

    // API Routes
    app.use('/', routes(db));

    // Import all csv file and load in the DB.
    // await importData('../csv/office_feed.csv', 'office', db)
    // await importData('../csv/member_feed.csv', 'member', db)
    // await importData('../csv/transaction_feed.csv', 'transaction', db)

  } catch (error) {
    console.error("error", error)
    process.exit(1); // Exit the process to avoid running in an unstable state
  }

  // Handle uncaught exceptions
  process.on('uncaughtException', (error: Error) => {
    console.error('Uncaught Exception:', error.message);
    console.error(error.stack);

    process.exit(1); // Exit to prevent the app from running in an inconsistent state
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (reason: unknown, promise: Promise<any>) => {
    console.error('Unhandled Rejection:', reason);

    // Optionally log the promise
    console.error('Promise:', promise);

    process.exit(1);
  });

  return app;
}

// If the file is run directly, start the server
if (require.main === module) {
  bootstrap().then(app => {
      app.listen(port, () => {
          console.info(`Server running on port ${port}`);
      });
  });
}