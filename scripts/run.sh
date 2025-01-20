#!/bin/bash

# Create or reset the database 
# NOTE - re-running this script will erase 
# whatever data is on there and reseed it with sample data. 
rm -f sqlite/database.db
sqlite3 sqlite/database.db < schema.sql

echo "Database schema and sample data loaded successfully."

