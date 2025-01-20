import { Database } from "sqlite";
import { TransformDataRow, TransformExpMemberDataRow, TransformMemberDataRow, TransformTransactionDataRow, TransformTransactionReportDataRow } from "./interfaces";

// Bulk Insert data in the DB

const insertOfficeDataBulk = async (data: TransformDataRow[], db: Database) => {
    const insertQuery = await db.prepare(`
       INSERT OR IGNORE INTO "office" (
       officekeynumeric,
       officename,
       officephone,
       officestateorprovince,
       officestatus,
       modificationtimestamp,
       sourcesystemmodificationtimestamp
      ) Values (?, Trim(?), ?, TRIM(?), TRIM(?), TRIM(?), TRIM(?))
    `)

    for (const row of data) {
        await insertQuery.run(...row);
    }

    await insertQuery.finalize();
    console.log('Bulk office data loaded successfully.');
}

const insertMemberDataBulk = async (data: TransformMemberDataRow[], db: Database) => {
    const insertQuery = await db.prepare(`
       INSERT OR IGNORE INTO member (
       memberkeynumeric,
       modificationtimestamp,
       membercity,
       memberemail,
       memberfirstname,
       memberfullname,
       memberlastname,
       memberloginid,
       membermiddlename,
       membermobilephone,
       memberstateorprovince,
       memberstatus,
       sourcesystemmodificationtimestamp,
       officekeynumeric,
       officemlsid,
       officename
      ) Values (?, TRIM(?), TRIM(?), TRIM(?), TRIM(?), TRIM(?), TRIM(?), TRIM(?), TRIM(?), TRIM(?), TRIM(?), TRIM(?) , TRIM(?), ?, TRIM(?), TRIM(?))
    `)

    for (const row of data) {
        await insertQuery.run(...row);
    }

    await insertQuery.finalize();
    console.log('Bulk member data loaded successfully.');
}

const insertExpMemberDataBulk = async (data: TransformExpMemberDataRow[], db: Database) => {
    const insertQuery = await db.prepare(`
       INSERT OR IGNORE INTO expmember (
        memberkeynumeric,
        mentormemberkeynumeric,
        modificationtimestamp,
        sourcesystemmodificationtimestamp,
        anniversarydate,
        joindate,
        membersecondaryemail,
        isinteam,
        mentorfeepercentage,
        numberofmentorfeestopay,
        alreadypayedmentorfees,
        historicalmentorfeecount
      ) Values (?, ?, TRIM(?), TRIM(?), TRIM(?), TRIM(?), TRIM(?), ?, ?, TRIM(?), TRIM(?), TRIM(?))
    `)

    for (const row of data) {
        await insertQuery.run(...row);
    }

    await insertQuery.finalize();
    console.log('Bulk expmember data loaded successfully.');
}

const insertTransactionDataBulk = async (data: TransformTransactionDataRow[], db: Database) => {
    const insertQuery = await db.prepare(`
        INSERT OR IGNORE INTO "transaction" (
        transactionkeynumeric,
        modificationtimestamp,
        transactionnumber,
        sourcesystemmodificationtimestamp,
        lifecyclestatus,
        salesprice,
        listprice,
        addressfull,
        stateorprovince
      ) Values (?, TRIM(?), TRIM(?), TRIM(?), TRIM(?), TRIM(?), TRIM(?), TRIM(?), TRIM(?))
    `)

    for (const row of data) {
        await insertQuery.run(...row);
    }

    await insertQuery.finalize();
    console.log('Bulk transaction data loaded successfully.');
}

const insertTransactionReportDataBulk = async (data: TransformTransactionReportDataRow[], db: Database) => {
    const insertQuery = await db.prepare(`
        INSERT OR IGNORE INTO transactionreport (
        transactionreportkeynumeric,
        modificationtimestamp,
        sourcesystemmodificationtimestamp,
        transactionkeynumeric,
        memberkeynumeric,
        propertyaddress,
        salespricevolume,
        lifecyclestatus,
        isreferral
      ) Values (?, TRIM(?), TRIM(?), ?, ?, TRIM(?), TRIM(?), TRIM(?), ?)
    `)

    for (const row of data) {
        await insertQuery.run(...row);
    }

    await insertQuery.finalize();
    console.log('Bulk transaction report data loaded successfully.');
}

export { insertOfficeDataBulk, insertMemberDataBulk, insertExpMemberDataBulk, insertTransactionDataBulk, insertTransactionReportDataBulk }