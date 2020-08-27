var express = require('express');
var router = express.Router();
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
};
var cena="          ";
/* GET home page. */
router.get('/', function(req, res, next) {

  if(req.cookies["cena"]!=undefined){

    cena={
      cena:req.cookies["cena"],
    };
   res.clearCookie("cena");
  }else{
    cena={
      cena:"",
    };
  }
  res.render('index',{cena:cena,data:data});
  data.godiste='';
  data.zapremina='';
});

router.post('/provericenu', function(req, res, next) {
  data.godiste=req.body.godiste;
  data.zapremina=req.body.zapremina;
  res.cookie('cena',CenaReg(req.body.godiste,req.body.zapremina));

res.redirect('/index');
});




function CenaReg(godiste,zapremina){
  var yyyy=new Date().getFullYear();
  console.log(yyyy);
  let cena=0;
  popust=0;
  zapremina=parseInt(zapremina);
  var godine= parseInt(yyyy)-    parseInt(godiste);

  if(zapremina<=1150){
    cena=1270;
  }else if(zapremina>1150&&zapremina<=1300){
    cena=2480;
  }else if(zapremina>1300&&zapremina<=1600){
    cena=5470;;
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

  return  cena-procenat;

}


module.exports = router;
