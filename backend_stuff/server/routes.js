var sheets = require('./sheets.js');
const config = require('./config');

sheets();
module.exports = function(app) {

  app.get('/',
		function(req, res){
			// render index
      sheets.filterData( function(result){
  			res.end( JSON.stringify({ head : config.dataHead, data: result}) );
      });
		}
	);

  app.get('/export',
    function(req, res){
      sheets.exportData( function(result){
        res.end(JSON.stringify(result));
      });
    }
  );

  app.get('/rating',
    function(req, res){
      if(req.query.name){
        sheets.getRating(req.query.name, function(result){
    			res.end( JSON.stringify(result) );
        });
      }else{
        res.end("Error");
      }
    }
  )

  app.post('/rating',
    function(req, res){
      if(req.body.name){
        sheets.addRating(req.body.name,parseInt(req.body.point));
        res.end("Success");
      }else{
        res.end("Error");
      }
    }
  )

  app.get('/upload',
    function(req, res){
      res.sendFile(__dirname + '/upload.html');
    }
  );

  app.get('/uploadold',
    function(req, res){
      res.sendFile(__dirname + '/uploadold.html');
    }
  );

  app.post('/upload',
    function(req, res){
      //console.log(JSON.stringify(req.file) + " " + req.body.pass);
      if(req.body.pass==config.uploadPassword&&req.file&&req.file.mimetype=='text/plain'){
        sheets.importData(req.file);
        res.sendFile(__dirname + '/success.html');
      }else{
        res.sendFile(__dirname + '/failed.html');
      }
    }
  );

  app.post('/uploadold',
    function(req, res){
      //console.log(JSON.stringify(req.file) + " " + req.body.pass);
      if(req.body.pass==config.uploadPassword&&req.file&&req.file.mimetype=='text/plain'){
        sheets.importOld(req.file);
        res.sendFile(__dirname + '/success.html');
      }else{
        res.sendFile(__dirname + '/failed.html');
      }
    }
  );

};
