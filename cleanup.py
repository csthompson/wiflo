import couchdb

couch = couchdb.Server('http://wiflo_admin:blowfish@db.wiflo.org:5984/')
db = couch['wiflo_current-users']
map = '''function(doc) {
			  function addMinutes(date, minutes) {
			    return new Date(date.getTime() + minutes*60000);
			  }
			  var userTime = new Date(doc.timestamp);
			  var expireTime = addMinutes(userTime, 1);
			  var nowTime = new Date();
			  if(nowTime >= expireTime)
			      emit(doc._id, null);
			}'''
for row in db.query(map):
	db.delete(db.get(row.key))
