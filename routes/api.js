/*
 * Serve JSON to our AngularJS client
 */

var MongoClient = require('mongodb').MongoClient,
    db;

MongoClient.connect('mongodb://mongo2.tfs.tfs:27017/vts', function(err, dbc) {
    if(err) throw err;
    db = dbc;
});

/*
exports.name = function (req, res) {
	var t = [],
		state = req.query.state;
	
	if( state == 1){
		t.push({
	    	"latitude":13.074127563815,
	    	"longitude":77.779769897461,
	    	state: 1
	    });
	}
	if(state == 2){
		t.push({
	    	"latitude":13.079143861039,
	    	"longitude":77.796249389648,
	    	state: 2
	    });
	}
	
  res.json({
    status: "success",
    locations: t
  });
};
*/

module.exports = function(app) { 
	
	app.get('/api/name', function(req, res) {
	
		var t = [],
		state = req.query.state;
	
		if( state == 1){
			t.push({
		    	"latitude":13.074127563815,
		    	"longitude":77.779769897461,
		    	state: 1
		    });
		}
		if(state == 2){
			t.push({
		    	"latitude":13.079143861039,
		    	"longitude":77.796249389648,
		    	state: 2
		    });
		}
	
	  res.json({
	    status: "success",
	    locations: t
	  });
	});

      app.get('/api/get-drivers', function(req, res) {
	var state = req.query.state || "Free";
	db.collection('device_logs').find({"state": state, isBlocked: "false"}, {limit:100, fields:{latitude: 1, longitude: 1, state: 1}}).toArray(function(err, docs) {
	  if(!err)
	    return res.send(docs);
	  else
	    return res.send([]);
	});

      });
	
}
