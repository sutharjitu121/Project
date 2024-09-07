const db = require('../config/database');
var async = require('async'), moment = require('moment'), QueryBuilder = require('datatable');

var common = {
    select: function (table) {
        return db.query(`select * from ${table}`);
    },
    selectWhere: function (table, where) {
        return db.query(`select * from ${table} where ${where}`);
    },
    query: function (query) {
        return db.query(query);
    },
    CustomQuery: function (query) {
        return db.query(query);
    },
    CustomQueryList: function (table, idfield, valuefield, where) {
        return db.query(`SELECT ${idfield},${valuefield} FROM ${table} WHERE ${where} ORDER BY ${valuefield} ASC`);
    },
    queryBuilder: function (query, params = []) {
        return db.query(query, params);
    },
    insert: function (table, data) {
        return db.query(`Insert Into ${table} SET ?`, [data]);
    },
    // insert: function (table, data) {
    //     db.query(`Insert Into ${table} SET ?`, [data], function (err, result) {
    //         console.log("ASD",result);
    //         return result.insertId;
    //     });
    // },
    update: function (table, where, data) {
        return db.query(`UPDATE ${table} SET ? where ${where}`, [data]);
    },
    delete: function (table, where) {
        return db.query(`Delete from ${table} Where ${where}`);
    },
    getTableData: function (option, query, callback) {
        var queryBuilder = new QueryBuilder(option);

        // Build an object of SQL statements
        var queries = queryBuilder.buildQuery(query);
        //console.log(queries);
        async.parallel(
            {
                recordsTotal: function (cb) {
                    db.query(queries.recordsTotal, cb);
                },
                select: function (cb) {
                    //console.log("Query", queries.select);
                    db.query(queries.select, cb);
                }
            },
            function (err, results) {
                callback(err, queryBuilder.parseResponse(results));
            }
        );
    },
}

module.exports = common;