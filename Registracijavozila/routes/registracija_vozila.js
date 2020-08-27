var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var HP = [
    '25kW (34KS)',
'35kW (48KS)',
'44kW (60KS)',
'55kW (75KS)',
'66kW (90KS)',
'74kW (101KS)',
'80kW (109KS)',
'85kW (116KS)',
'96kW (131KS)',
'110kW (150KS)',
'147kW (200KS)',
'184kW (250KS)',
'222kW (302KS)',
'262kW (356KS)',
'294kW (402KS)',
'333kW (453Ks)',

];

var data={
    zapremina:'',
    godiste:'',
    ime:'',
    marka:'',
    adresa:'',
    vrsta:'',
    snaga:'',
    tablice:''
};
let warning={
    warning:''
};

const con = mysql.createConnection({
    host: 'localhost', user: 'root', database: 'registracijavozila', port:3308

});
/**
 * @return {number}
 */
function CenaReg(godiste,zapremina){
    console.log("ovde ide gas "+godiste+" "+zapremina);
    var yyyy=new Date().getFullYear();
    console.log(yyyy);
    let cena=0;
    popust=0;
    zapremina=parseInt(zapremina);
    var godine= parseInt(yyyy)-parseInt(godiste);

    if(zapremina<=1150){
        cena=1270;
    }else if(zapremina>1150&&zapremina<=1300){
        cena=2480;
    }else if(zapremina>1300&&zapremina<=1600){
        cena=5470;
    }else if(zapremina>1600&&zapremina<=2000){
        cena=11210;
    }else if(zapremina>2000&&zapremina<=2500){
        cena=55380;
    }else if(zapremina>2500&&zapremina<=3000){
        cena=112220;
    }else if(zapremina>3000){
        cena=231930;
    }

    if(godine>=5&&godine<8){
      popust=15;
    }else if(godine>=8&&godine<10){
        popust=25;
    }else if(godine>=10&&godine<=20){
        popust=40;
    }else if(godine>20){
        popust=80;
    }

    var procenat = (cena/100)*popust;

     return cena-procenat;
}


router.get('/', function(req, res, next) {

    if(req.query.zapremina){
        data.zapremina= req.query.zapremina;
   data.godiste= req.query.godiste;
    }else{

    }
    res.render('registracija_vozila',{hp:HP,data:data,warning:warning});
    warning.warning='';
});




router.get('/registruj', function(req, res, next) {
    var d = new Date();
    var day,month,year;
    day=d.getDate();
    month=d.getMonth()+1;
    year=d.getFullYear()+1;


 let cenaa=CenaReg(parseInt(req.query.Godiste),parseInt(req.query.Zapremina));

    let sql = "INSERT INTO registrovana_vozila (Marka_Model,Vrsta_Vozila,Godiste,Snaga_Motora,Zapremina_Motora,Cena,Ime_Prezime,Adresa,datumVazenja,tablice) VALUES (";
    sql += "'" + req.query.MarkaModel+ "', ";
    sql += "'" + req.query.Vrsta + "', ";
    sql += "'" + req.query.Godiste + "', ";
    sql += "'" + req.query.Snaga + "', ";
    sql += "'" + req.query.Zapremina + "', ";
    sql += "'" + cenaa+ "', ";
    sql += "'" + req.query.ImePrezime + "', ";
    sql += "'" + req.query.Adresa + "', ";
    sql += "'" + year+'-'+ month+'-'+day+ "', ";
    sql += "'" + req.query.Tablice.toLowerCase() + "' ";
    sql += ");";

    let sqlCheck = `SELECT count(*)  AS provera FROM registrovana_vozila WHERE tablice='${req.query.Tablice.toLowerCase()}';`;
    async function pokreni() {

        let proveriT=await pokrenisql(sqlCheck);
        if(proveriT[0].provera==0){


        try {
            await pokrenisql(sql);
            warning.warning='Vase vozilo je registrovano do '+year+'-'+ month+'-'+day+', cena registracije iznosi '+cenaa;
        } catch (error) {



        }
        }else{
            let sqlD=`SELECT datumVazenja FROM registrovana_vozila WHERE tablice='${req.query.Tablice.toLowerCase()}';`;
            let proveriD=await pokrenisql(sqlD);
            let datum1= new Date(proveriD[0].datumVazenja);
    if(datum1<d){
        let sqlU=`Update registrovana_vozila set datumVazenja='${ year+'-'+ month+'-'+day}', Cena='${cenaa}' WHERE tablice='${req.query.Tablice.toLowerCase()}';`;
        await pokrenisql(sqlU);

        warning.warning='Vase vozilo je registrovano';
    }else{
        warning.warning='Ne mozete vozilo s ovim tablicama registrovati, registracija vazi do '+datum1.getDate()+'-'+(parseInt(datum1.getMonth())+1)+'-'+datum1.getFullYear();

    }

        }
        res.redirect('/registracija_vozila');

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

