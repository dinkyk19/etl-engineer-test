import { Database } from "sqlite";
import { insertExpMemberDataBulk, insertMemberDataBulk, insertOfficeDataBulk, insertTransactionDataBulk, insertTransactionReportDataBulk } from './load'
import { IMemberExpmemberTransformData, IOfficeTransformData, ITransactionTransformData, TransformDataRow, TransformExpMemberDataRow, TransformMemberDataRow, TransformTransactionDataRow, TransformTransactionReportDataRow } from "./interfaces";

// transform data into the form that we store in the DB. 

const transformOfficeData = async (data: IOfficeTransformData[], db: Database) => {
    try {
        const currentTimestamp = new Date().toISOString();
        const transformData: TransformDataRow[] = [];
        data.forEach((element: IOfficeTransformData) => {
            transformData.push([element.id, element.name, element.officephone, element.state, element.status, currentTimestamp, currentTimestamp])
        });

        await insertOfficeDataBulk(transformData, db)
    } catch (error) {
        console.error(`Error generated during office data inseration. >>>> ${error}`)
    }
}

const transformMemberData = async (data: IMemberExpmemberTransformData[], db: Database) => {
    try {
        const transformMemberData: TransformMemberDataRow[] = [];
        const transformExpMemberData: TransformExpMemberDataRow[] = [];
        data.forEach((element: IMemberExpmemberTransformData) => {
            transformMemberData.push([
                element.memberkeynumeric,
                element.modificationtimestamp,
                element.membercity,
                element.memberemail,
                element.memberfirstname,
                element.memberfullname,
                element.memberlastname,
                element.memberloginid,
                element.membermiddlename,
                element.membermobilephone,
                element.memberstateorprovince,
                element.memberstatus,
                element.sourcesystemmodificationtimestamp,
                element.officekeynumeric,
                element.officemlsid,
                element.officename,
            ])
            transformExpMemberData.push([
                element.memberkeynumeric,
                element.mentormemberkeynumeric,
                element.modificationtimestamp_2,
                element.sourcesystemmodificationtimestamp_2,
                element.anniversarydate,
                element.joindate,
                element.membersecondaryemail,
                element.isinteam,
                element.mentorfeepercentage,
                element.numberofmentorfeestopay,
                element.alreadypayedmentorfees,
                element.historicalmentorfeecount,
            ])
        });
       await Promise.all([
            insertMemberDataBulk(transformMemberData, db),
            insertExpMemberDataBulk(transformExpMemberData, db)
        ])

    } catch (error) {
        console.error(`Error generated during member data inseration. >>>> ${error}`)
    }
}
const transformTransactionData = async (data: ITransactionTransformData[], db: Database) => {
    try {
        const transformTrasactionData: TransformTransactionDataRow[] = [];
        const transformTransactionreportData: TransformTransactionReportDataRow[] = [];
        data.forEach((element: ITransactionTransformData) => {
            transformTrasactionData.push([
                element.transactionkeynumeric,
                element.modificationtimestamp,
                element.transactionnumber,
                element.sourcesystemmodificationtimestamp,
                element.lifecyclestatus,
                element.salesprice,
                element.listprice,
                element.addressfull,
                element.stateorprovince,
            ])
            transformTransactionreportData.push([
                element.transactionreportkeynumeric,
                element.modificationtimestamp_2,
                element.sourcesystemmodificationtimestamp_2,
                element.transactionkeynumeric_2,
                element.memberkeynumeric,
                element.propertyaddress,
                element.salespricevolume,
                element.lifecyclestatus_2,
                element.isreferral,
            ])
        });
        await Promise.all([
            insertTransactionDataBulk(transformTrasactionData, db),
            insertTransactionReportDataBulk(transformTransactionreportData, db)
        ])

    } catch (error) {
        console.error(`Error generated during transaction data inseration. >>>> ${error}`)
    }
}

export { transformOfficeData, transformMemberData, transformTransactionData }