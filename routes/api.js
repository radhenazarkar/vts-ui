/*
 * Serve JSON to our AngularJS client
 */

var MongoClient = require('mongodb').MongoClient,
    db;

MongoClient.connect('mongodb://mongo2.tfs.tfs:27017/vts', function(err, dbc) {
    if(err) throw err;
    db = dbc;
});

module.exports = function(app) { 
	
	// login
	app.post('/api/login', function(req, res) {
		var params = req.body;
		if(params.email == "a@a.com" && params.password == "123" ){
			return res.send({status: "success", response_data: {
				username: "a",
				email: "a@a.com"
			}});
		}
		return res.send({status: "error", error_desc: "Invalid email id"});
	});

	// logout
 	app.get('/api/logout', function(req, res) {
 		return res.send({status: "success"});
 	});

	// Get Drive Details
 	app.get('/api/get-drivers', function(req, res) {
		var state = req.query.state || "Free";
			db.collection('device_logs').find({"state": state, isBlocked: "false"}, {limit:100, fields:{latitude: 1, longitude: 1, state: 1}}).toArray(function(err, docs) {
			  if(!err){
			  	console.log('Api called -> '+docs);
			    return res.send(docs);
			  }else
			    return res.send([]);
			});
    });
	
}
