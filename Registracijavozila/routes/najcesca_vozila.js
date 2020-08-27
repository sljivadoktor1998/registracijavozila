var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const con = mysql.createConnection({
    host: 'localhost', user: 'root', database: 'registracijavozila', port:3308

});
/* GET home page. */
router.get('/', function(req, res, next) {

let sql=`SELECT COUNT(id) AS broj, Marka_Model, Snaga_Motora, Cena,Zapremina_Motora FROM registrovana_vozila GROUP BY Marka_Model ORDER BY COUNT(id) DESC`;

    async function pokreni() {

        let rez=await pokrenisql(sql);
        console.log(rez);
        res.render('najcesca_vozila',{auto:rez});

    }

    pokreni();







});



function pokrenisql(sql){
    return  new Promise((resolve, reject) => {

        con.query(sql, function (err, result) {
            if (err) {
                console.log(err.message);
                reject(err.message);
            }

            resolve(result);

        });

    });

}

module.exports = router;
