import { Request, Response, Router } from 'express';
import { Database } from 'sqlite';

const router = Router();

export default (db: Database) => {

    router.get('/', async (req: Request, res: Response): Promise<any>=> {

        try {
            const params = [];
            let query = `SELECT member.memberkeynumeric, member.membercity, member.memberemail, expmember.membersecondaryemail, member.memberfirstname, member.memberfirstname,
            member.memberlastname,member. membermiddlename, member.membermobilephone, member.memberstateorprovince, member.memberstatus, member.officekeynumeric, member.officename, 
            Date(expmember.anniversarydate) as anniversarydate, strftime('%Y-%m-%d', REPLACE(expmember.joindate, '+00', '')) as joindate, Date(member.createdat) as 'Created Date' FROM member left join expmember on expmember.memberkeynumeric = member.memberkeynumeric`;

            // query filter
            if (req.query.id ) {
                params.push(Number(req.query.id))
                query += ` where member.memberkeynumeric = ?`
            } else if(req.query.office_id){
                query += ` where member.officekeynumeric = ?`
                params.push(Number(req.query.office_id))
            }

            const rows = await db.all(query, params)

            return res.status(200).json({
                message: "Member data fetch successfully.",
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
