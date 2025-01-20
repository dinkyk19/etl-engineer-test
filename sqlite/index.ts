import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
// Enable verbose mode for debugging (optional)
sqlite3.verbose();

// Initialize the database connection
const connectToDatabase = async (): Promise<Database<sqlite3.Database, sqlite3.Statement>> => {
    try {
        const dbName = process.env.DATABASE_PATH;
        if (!dbName) {
            throw new Error('Database_path is not mention in the .env file');
        }

        const db = await open({
            filename: dbName, // Specify the database file
            driver: sqlite3.Database,
        });
        console.log('Database connected sucessfully.');
        await createTables(db);
        return db;

    } catch (error) {
        console.error(error);
        throw new Error('Error while connecting DB');
    }
};

const createTables = async (db: Database) => {
    const tableDefinitions = [
        {
            name: 'office',
            columns: [
                'officekeynumeric bigint NOT NULL',
                'modificationtimestamp timestamp with time zone NOT NULL',
                'sourcesystemmodificationtimestamp timestamp with time zone NOT NULL',
                'officename text',
                'officephone text',
                'officestateorprovince text',
                'officestatus text',
                'createdat DATETIME DEFAULT CURRENT_TIMESTAMP', // Added createdat column
                'modifiedat DATETIME DEFAULT CURRENT_TIMESTAMP', // Added modifiedat column
                'CONSTRAINT office_pkey PRIMARY KEY (officekeynumeric)'
            ],
        },
        {
            name: 'member',
            columns: [
                'memberkeynumeric INTEGER NOT NULL',
                'modificationtimestamp TEXT NOT NULL',
                'membercity TEXT',
                'memberemail TEXT',
                'memberfirstname TEXT',
                'memberfullname TEXT',
                'memberlastname TEXT',
                'memberloginid TEXT',
                'membermiddlename TEXT',
                'membermobilephone TEXT',
                'memberstateorprovince TEXT',
                'memberstatus TEXT NOT NULL',
                'sourcesystemmodificationtimestamp TEXT NOT NULL',
                'officekeynumeric INTEGER',
                'officemlsid TEXT',
                'officename TEXT',
                'createdat DATETIME DEFAULT CURRENT_TIMESTAMP', // Added createat column
                'modifiedat DATETIME DEFAULT CURRENT_TIMESTAMP', // Added modifiedat column
                'PRIMARY KEY (memberkeynumeric)',
                'FOREIGN KEY (officekeynumeric) REFERENCES office(officekeynumeric) ON DELETE SET NULL'
            ],
        },
        {
            name: 'expmember',
            columns: [
                'memberkeynumeric INTEGER NOT NULL',
                'mentormemberkeynumeric INTEGER',
                'modificationtimestamp TEXT NOT NULL',
                'sourcesystemmodificationtimestamp TEXT',
                'anniversarydate TEXT',
                'joindate TEXT',
                'membersecondaryemail TEXT',
                'isinteam INTEGER', //Use INTEGER to store boolean values(0 = false, 1 = true)
                'mentorfeepercentage INTEGER',
                'numberofmentorfeestopay INTEGER',
                'alreadypayedmentorfees INTEGER',
                'historicalmentorfeecount INTEGER',
                'createdat DATETIME DEFAULT CURRENT_TIMESTAMP', // Added createdat column
                'modifiedat DATETIME DEFAULT CURRENT_TIMESTAMP', // Added modifiedat column
                'PRIMARY KEY(memberkeynumeric)',
                'FOREIGN KEY(memberkeynumeric) REFERENCES member(memberkeynumeric) ON DELETE CASCADE',
                'FOREIGN KEY(mentormemberkeynumeric) REFERENCES member(memberkeynumeric) ON DELETE SET NULL'
            ],
        },
        {
            name: `"transaction"`,
            columns: [
                'transactionkeynumeric INTEGER NOT NULL',
                'modificationtimestamp TEXT NOT NULL',
                'transactionnumber TEXT NOT NULL',
                'sourcesystemmodificationtimestamp TEXT',
                'lifecyclestatus TEXT',
                'salesprice REAL',
                'listprice REAL',
                'addressfull TEXT',
                'stateorprovince TEXT',
                'createdat DATETIME DEFAULT CURRENT_TIMESTAMP', // Added createat column
                'modifiedat DATETIME DEFAULT CURRENT_TIMESTAMP', // Added modifiedat column
                'PRIMARY KEY(transactionkeynumeric)'
            ],
        },
        {
            name: 'transactionreport',
            columns: [
                'transactionreportkeynumeric INTEGER PRIMARY KEY',
                'modificationtimestamp TEXT NOT NULL',
                'sourcesystemmodificationtimestamp TEXT',
                'transactionkeynumeric INTEGER NOT NULL',
                'memberkeynumeric INTEGER',
                'propertyaddress TEXT',
                'salespricevolume REAL',
                'lifecyclestatus TEXT',
                'isreferral INTEGER', // Use INTEGER for boolean values (0 = false, 1 = true)
                'isoutsidereferral INTEGER', // Use INTEGER for boolean values (0 = false, 1 = true)
                'unitsseller REAL',
                'unitsbuyer REAL',
                'createdat DATETIME DEFAULT CURRENT_TIMESTAMP', // Added createat column
                'modifiedat DATETIME DEFAULT CURRENT_TIMESTAMP', // Added modifiedat column
                'FOREIGN KEY (memberkeynumeric) REFERENCES member(memberkeynumeric) ON DELETE SET NULL',
                'FOREIGN KEY (transactionkeynumeric) REFERENCES "transaction"(transactionkeynumeric) ON DELETE CASCADE'
            ],
        },
    ];

    await Promise.all(tableDefinitions.map(table => createTable(table)))

    async function createTable(table: any) {
        try {
            const createTableSQL = `CREATE TABLE IF NOT EXISTS ${table.name} (${table.columns.join(', ')});`;
            await db.run(createTableSQL);
            console.log(`Table ${table.name} is created successfully.`);
        } catch (error) {
            console.error(`Error creating table ${table.name}:`, error);
        }
    }
};


export { connectToDatabase };