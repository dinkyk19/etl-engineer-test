export interface IMemberExpmemberTransformData {
    memberkeynumeric: number;
    modificationtimestamp: string;
    modificationtimestamp_2: string;
    membercity: string;
    memberemail: string;
    memberfirstname: string;
    memberfullname: string;
    memberlastname: string;
    memberloginid: string;
    membermiddlename: string;
    membermobilephone: string;
    memberstateorprovince: string;
    memberstatus: string;
    sourcesystemmodificationtimestamp: string;
    sourcesystemmodificationtimestamp_2: string;
    officekeynumeric: number;
    officemlsid: string;
    officename: string;
    mentormemberkeynumeric: number;
    anniversarydate: string;
    joindate: string;
    membersecondaryemail: string;
    isinteam: 0 | 1;
    mentorfeepercentage: number;
    numberofmentorfeestopay: number;
    alreadypayedmentorfees?: number;
    historicalmentorfeecount?: number;
}

export type TransformMemberDataRow = [number, string, string, string, string, string, string, string, string, string, string, string, string, number, string, string];

export type TransformExpMemberDataRow = [number, number, string, string, string, string, string, number, number, number, number | undefined, number | undefined];
