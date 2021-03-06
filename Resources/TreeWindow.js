var path = Ti.UI.currentWindow.path || 'Titanium';

var rows = [];

var db = Ti.Database.open('cache.sqlite');
var query = 'SELECT * FROM entries WHERE parent = ? ' + (path == 'Titanium' ? 'OR parent = ""' : '')+' ORDER BY name';
Ti.API.info(query.replace('?', path));
var row = db.execute(query, path);

rows.push({
	title: path == 'Titanium' ? 'Titanium' : 'Module description',
	fullName: path,
	hasDetail: true
});

while(row.isValidRow()) {
	rows.push({
		title: row.fieldByName('name'), 
		path: row.fieldByName('name'), 
		parentName: row.fieldByName('parent'),
		fullName: row.fieldByName('fullname'),
		hasChild: row.fieldByName('hasChild')
	});
	row.next();
}

var table = Ti.UI.createTableView({data: rows, filterAttribute: 'title'});
// if(index) {
// 	table.index = index;
// }
table.addEventListener('click', function(e) {
	Ti.App.fireEvent('treeWindow:click', {path: e.rowData.fullName, fullName: e.rowData.path || e.rowData.fullName, hasChild: e.row.hasChild});
});
Ti.UI.currentWindow.add(table);

