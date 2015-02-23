var args = arguments[0] || {};

var loader = require("loader");

$.newsList.addEventListener("click", function(e) {
	var params = {
		data: e.row.data,
		name: "News"
	};
	Alloy.createController("newsDetail", params).newsDetail.open();
});

function myRefresher(e) {
	loader.get({
		callbackFunction: function(argsNews) {
			if (argsNews !== null) {
				var rows = [];
				for (var i = 0; i < argsNews.result; ++i) {
					var row = Alloy.createController("newsRow", argsNews.data[i]).getView("newsItem");
					rows.push(row);
				}
				$.newsList.setData(rows);
				e.hide(); // or call e.done() if there are no more rows
      		} else {
        		e.error();
      		}
		},
		url: Alloy.CFG.Urls.baseURL + Alloy.CFG.Urls.getAllNews
	});
 	e.hide();
}

$.ptr.refresh();