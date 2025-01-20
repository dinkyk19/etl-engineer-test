export interface ITransactionTransformData {
    transactionkeynumeric: number;
    transactionkeynumeric_2: number;
    modificationtimestamp: string;
    modificationtimestamp_2: string;
    transactionnumber: string;
    sourcesystemmodificationtimestamp: string;
    sourcesystemmodificationtimestamp_2: string;
    lifecyclestatus: string;
    lifecyclestatus_2: string;
    salesprice: string;
    listprice: string;
    addressfull: string;
    stateorprovince: string;
    transactionreportkeynumeric: number;
    memberkeynumeric: number;
    propertyaddress: string;
    salespricevolume: string;
    isreferral: number
}

export type TransformTransactionDataRow = [number, string, string, string, string, string, string, string, string];
export type TransformTransactionReportDataRow = [number, string, string, number, number, string, string, string, number];
