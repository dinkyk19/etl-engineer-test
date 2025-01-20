import { Request, Response, Router, NextFunction } from 'express';
import { Database } from 'sqlite';

const router = Router();

export default (db: Database) => {

    router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<any> => {

        try {
            const params = [];
            let query = `Select "transaction".transactionkeynumeric, "transaction".transactionnumber, "transaction".lifecyclestatus, "transaction".salesprice, 
            "transaction".listprice, "transaction".addressfull, "transaction".stateorprovince, transactionreport.isreferral FROM "transaction" inner join transactionreport on "transaction"."transactionkeynumeric" = transactionreport.transactionkeynumeric`;

            // Query filters
            if (req.query.transaction_id) {
                params.push(Number(req.query.transaction_id))
                query += ` where "transaction".transactionkeynumeric = ?`
            } else if (req.query.member_id) {
                query += ` where "transactionreport".memberkeynumeric = ?`
                params.push(Number(req.query.member_id))
            } else {
                return res.status(400).json({
                    message: "member_id or transaction_id is require to get transaction data.",
                    error: true
                });
            }

            const rows = await db.all(query, params)

           return res.status(200).json({
                message: "Transaction data fetch successfully.",
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
