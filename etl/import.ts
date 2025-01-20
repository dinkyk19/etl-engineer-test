import fs from 'fs';
import csvParser from 'csv-parser';
import path from 'path';
import { transformOfficeData, transformMemberData, transformTransactionData } from './transform';
import { Database } from 'sqlite';
import dotenv from 'dotenv';

import { IMemberExpmemberTransformData, IOfficeTransformData, ITransactionTransformData } from './interfaces';
import { connectToDatabase } from '../sqlite';

dotenv.config()

const processData = (csvDataPath: string, fileType: string, db: Database) => {
    return new Promise((resolve, reject) => {
        const officeData: IOfficeTransformData[] = []
        const memberData: IMemberExpmemberTransformData[] = []
        const transactionData: ITransactionTransformData[] = []

        const csvFilePath = path.join(__dirname, csvDataPath);
        const headers: string[] = [];
        // parse the CSV file office_feed, member_feed, transaction_feed. 
        // TODO: In future for large dataset, read file in chunks and pagination logic like wil read file 0-99, 100-199, so on until reach the end limit
        fs.createReadStream(csvFilePath)
            .pipe(csvParser({
                mapHeaders: ({ header, index }) => {
                    if (headers.includes(header)) {
                        headers.push(`${header}_2`)
                        return `${header}_2`;
                    }
                    headers.push(header)
                    return header;
                },
            }))
            .on('data', (item) => {
                if (fileType === "office") {
                    item.officekeynumeric = Number(item.officekeynumeric)
                    officeData.push(item);
                } else if (fileType === "member") {
                    item.officekeynumeric = Number(item.officekeynumeric)
                    item.mentormemberkeynumeric = Number(item.mentormemberkeynumeric)
                    item.mentorfeepercentage = Number(item.mentorfeepercentage)
                    item.numberofmentorfeestopay = Number(item.numberofmentorfeestopay)
                    item.isinteam = item.isinteam === 't' ? true : false
                    if (item.alreadypayedmentorfees) item.alreadypayedmentorfees = Number(item.alreadypayedmentorfees)
                    if (item.historicalmentorfeecount) item.historicalmentorfeecount = Number(item.historicalmentorfeecount)
                    memberData.push(item)
                } else if (fileType === "transaction") {
                    item.isreferral = item.isreferral === 't' ? true : false;
                    item.transactionkeynumeric = Number(item.transactionkeynumeric);
                    item.transactionkeynumeric_2 = Number(item[`transactionkeynumeric_2`]);
                    item.transactionreportkeynumeric = Number(item.transactionreportkeynumeric);
                    item.memberkeynumeric = Number(item.memberkeynumeric);
                    if (item.salesprice) item.salesprice = '$' + item.salesprice;
                    item.listprice = '$' + item.listprice;
                    if (item.salespricevolume) item.salespricevolume = '$' + item.salespricevolume;
                    transactionData.push(item)
                }

            })
            .on('end', async () => {
                if (fileType === "office") {
                    await transformOfficeData(officeData, db)
                } else if (fileType === 'member') {
                    await transformMemberData(memberData, db)
                } else if (fileType === 'transaction') {
                    await transformTransactionData(transactionData, db)
                }
                resolve(true);
            })

            .on('error', (error) => {
                reject(error);
            });
    });
};


async function processImportFile(){
    try{
        // DB Connection initizled. 
        const db = await connectToDatabase();
        
        // Import all csv file and load in the DB. 
        await processData('../csv/office_feed.csv', 'office', db)
        await processData('../csv/member_feed.csv', 'member', db)
        await processData('../csv/transaction_feed.csv', 'transaction', db)
        console.log("successfully imported")
    }catch(error){
        console.error(error) 
    }
}
// processImportFile function initial when npm run import command run from CLI and import all the 3 files in the DB. 
processImportFile()

// export function because we can also initial import process when server start. I comment out that logic in app.js
export default processData