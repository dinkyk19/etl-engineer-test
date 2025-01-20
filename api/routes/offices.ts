import { Request, Response, Router } from 'express';
import { Database } from 'sqlite';

const router = Router();

export default (db: Database) => {

    router.get('/', async (req: Request, res: Response): Promise<any> =>  {

        try {
            const params = [];
            let query = `SELECT officekeynumeric, officename as 'Office Name', officestateorprovince as 'Office State/proviance',
                officestatus as 'Office Status', Date(createdat) as 'Created Date', Date(modifiedat) as 'Modified Date' FROM office`;

            // if status value is other then active/inactive then throw error
            if (req.query.status && req.query.status !== "active" && req.query.status !== "inactive") {
               return res.status(400).json({
                    message: 'Office status is not proper. It should be actve/inactive',
                    error: true
                });
            }

            // Query filter to check status condition dynamically
            if (req.query.status) {
                query += ` where LOWER(officestatus)=?`
                params.push(req.query.status)
            }

            // db.all use to run select query
            const rows = await db.all(query, params)

            return res.status(200).json({
                message: "Office data fetch successfully.",
                rows
            });

        } catch (error) {
            const err = error as Error
            return res.status(500).json({
                error: true,
                message: err.message
            })
        }
    });

    return router;
};
