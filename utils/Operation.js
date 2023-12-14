const connectionString = require('./ConnectionString');
const sql = require('mssql');
async function executeQuery(query) {
    try {
        // Connect to the database
        await sql.connect(connectionString);
        console.log("Connected to the database");

        // Execute the query
        const result = await sql.query(query);
        // console.log(result.recordset); // Access the result rows
        // Close the connection (optional)
        await sql.close();
        return result;
    } catch (err) {
        console.error("Error executing query:", err);
        throw err;
    }
}
module.exports = {
    executeQuery: executeQuery
};
