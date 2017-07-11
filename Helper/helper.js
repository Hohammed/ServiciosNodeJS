/*configures*/
var config = require('./config').config

/*helper*/
var sql = require('mssql')

function query(procedure, parameters, callBackOk, callBackError) {
    sql.connect(config).then(function () {
        var request = new sql.Request()
        parameters.forEach(function (item) {
            request.input(item.name, item.value)
        })
        request.execute(procedure).then(function (recordSet) {
            callBackOk(recordSet.recordset)
            sql.close()
        }).catch(function (err) {
            
            callBackError(err)
            sql.close()
        })
    }).catch(function (err) {
        callBackError(err)
        sql.close()
    })
}

function transaction(procedure, parameters, callBackOk, callBackError) {
    sql.connect(config).then(function () {
        var request = new sql.Request()
        parameters.forEach(function (item) {
            request.input(item.name, item.value)
        })
        request.execute(procedure).then(function (recordSet) {
            callBackOk(recordSet.rowsAffected)
            sql.close()
        }).catch(function (err) {
            callBackError(err)
            sql.close()
        })
    }).catch(function (err) {
        callBackError(err)
        sql.close()
    })
}

exports.query = query
exports.transaction = transaction