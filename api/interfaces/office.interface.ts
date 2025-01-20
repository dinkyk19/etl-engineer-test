export interface IOfficeResponse {
    message: string;
    error?: boolean;
    rows?: [{
        officekeynumeric: number;
        "Office Name": string;
        "Office State/proviance": string;
        "Office Status": string;
        "Created Date": string;
        "Modified Date": string;
    }]
}