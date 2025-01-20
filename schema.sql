CREATE TABLE IF NOT EXISTS office(
  officekeynumeric bigint NOT NULL
  , modificationtimestamp timestamp with time zone NOT NULL
  , sourcesystemmodificationtimestamp timestamp with time zone NOT NULL
  , officename text
  , officephone text
  , officestateorprovince text
  , officestatus text
  , CONSTRAINT office_pkey PRIMARY KEY (officekeynumeric)
);

CREATE TABLE IF NOT EXISTS member (
  memberkeynumeric INTEGER NOT NULL,
  modificationtimestamp TEXT NOT NULL,
  membercity TEXT,
  memberemail TEXT,
  memberfirstname TEXT,
  memberfullname TEXT,
  memberlastname TEXT,
  memberloginid TEXT,
  membermiddlename TEXT,
  membermobilephone TEXT,
  memberstateorprovince TEXT,
  memberstatus TEXT NOT NULL,
  sourcesystemmodificationtimestamp TEXT NOT NULL,
  officekeynumeric INTEGER,
  officemlsid TEXT,
  officename TEXT,
  PRIMARY KEY (memberkeynumeric),
  FOREIGN KEY (officekeynumeric) REFERENCES office(officekeynumeric) ON DELETE SET NULL
);


CREATE TABLE IF NOT EXISTS expmember (
  memberkeynumeric INTEGER NOT NULL,
  mentormemberkeynumeric INTEGER,
  modificationtimestamp TEXT NOT NULL,
  sourcesystemmodificationtimestamp TEXT,
  anniversarydate TEXT,
  joindate TEXT,
  membersecondaryemail TEXT,
  isinteam INTEGER, -- Use INTEGER to store boolean values (0 = false, 1 = true)
  mentorfeepercentage INTEGER,
  numberofmentorfeestopay INTEGER,
  alreadypayedmentorfees INTEGER,
  historicalmentorfeecount INTEGER,
  PRIMARY KEY (memberkeynumeric),
  FOREIGN KEY (memberkeynumeric) REFERENCES member(memberkeynumeric) ON DELETE CASCADE,
  FOREIGN KEY (mentormemberkeynumeric) REFERENCES member(memberkeynumeric) ON DELETE SET NULL
);


CREATE TABLE IF NOT EXISTS "transaction" (
  transactionkeynumeric INTEGER NOT NULL,
  modificationtimestamp TEXT NOT NULL,
  transactionnumber TEXT NOT NULL,
  sourcesystemmodificationtimestamp TEXT,
  lifecyclestatus TEXT,
  salesprice REAL,
  listprice REAL,
  addressfull TEXT,
  stateorprovince TEXT,
  PRIMARY KEY (transactionkeynumeric)
);

CREATE TABLE IF NOT EXISTS "transactionreport" (
  transactionreportkeynumeric INTEGER PRIMARY KEY,
  modificationtimestamp TEXT NOT NULL,
  sourcesystemmodificationtimestamp TEXT,
  transactionkeynumeric INTEGER NOT NULL,
  memberkeynumeric INTEGER,
  propertyaddress TEXT,
  salespricevolume REAL,
  lifecyclestatus TEXT,
  isreferral INTEGER, -- Use INTEGER for boolean values (0 = false, 1 = true)
  isoutsidereferral INTEGER, -- Use INTEGER for boolean values (0 = false, 1 = true)
  unitsseller REAL,
  unitsbuyer REAL,
  FOREIGN KEY (memberkeynumeric) REFERENCES member(memberkeynumeric) ON DELETE SET NULL,
  FOREIGN KEY (transactionkeynumeric) REFERENCES "transaction"(transactionkeynumeric) ON DELETE CASCADE
);


-- -- Insert records into the office table
INSERT INTO office (officekeynumeric, modificationtimestamp, sourcesystemmodificationtimestamp, officename, officephone, officestateorprovince, officestatus) VALUES
(1, '2023-01-15 09:34:21+00', '2023-01-15 09:34:21+00', 'Alpha Realty', '123-456-7890', 'CA', 'Active');

-- -- Insert records into the member table
INSERT INTO member (memberkeynumeric, modificationtimestamp, membercity, memberemail, memberfirstname, memberfullname, memberlastname, memberloginid, membermiddlename, membermobilephone, memberstateorprovince, memberstatus, sourcesystemmodificationtimestamp, officekeynumeric, officemlsid, officename) VALUES
(1, '2024-01-12 11:22:33+00', 'New York', 'brad.jameson@example.com', 'Brad', NULL, 'Jameson', 'bjameson', 'T.', '123-456-7890', 'NY', 'Active', '2024-01-12 11:22:33+00', 1, 'MLS001', 'Alpha Realty');

-- -- Insert records into the expmember table
INSERT INTO expmember (memberkeynumeric, mentormemberkeynumeric, modificationtimestamp, sourcesystemmodificationtimestamp, anniversarydate, joindate, membersecondaryemail, isinteam, mentorfeepercentage, numberofmentorfeestopay, alreadypayedmentorfees, historicalmentorfeecount) VALUES
(1, NULL, '2023-03-14 12:45:56+00', '2023-03-14 12:45:56+00', '2023-02-12', '2023-01-11 08:23:45+00', 'brad.jameson@example.com', TRUE, 10, 5, 3, 2);


INSERT INTO "transaction" (transactionkeynumeric, modificationtimestamp, transactionnumber, sourcesystemmodificationtimestamp, lifecyclestatus, salesprice, listprice, addressfull, stateorprovince)
VALUES
(1, '2023-06-15 10:00:00+00', 'TXN00001', '2024-06-15 10:00:00+00', 'Completed', 350000.00, 360000.00, '123 Maple Street, Springfield', 'IL');

INSERT INTO transactionreport (transactionreportkeynumeric,  modificationtimestamp,  sourcesystemmodificationtimestamp,  transactionkeynumeric,  memberkeynumeric,  propertyaddress,  salespricevolume,  lifecyclestatus,  isreferral,  isoutsidereferral,  unitsseller,  unitsbuyer)
VALUES
(1, '2023-07-15 14:23:00+00', '2023-07-15 14:23:00+00', 1, 1, '123 Maple Street, Springfield', 350000.00, 'Completed', TRUE, FALSE, 1.00000000, 0.00000000);