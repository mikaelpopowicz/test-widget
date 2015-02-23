var args = arguments[0] || {};

$.homeC.addEventListener("click", function(e) {
	Ti.API.log(JSON.stringify(e));
	Ti.API.log(e.source.getApiName());
	if (e.source.getApiName() == "Ti.UI.Button")
	{
		Ti.API.log("Fire event app:handleHomeClick : " + e.source.menuID);
		Ti.App.fireEvent("app:handleHomeClick", e.source);
	}
		
});

$.homeC.addEventListener("touchstart", function(e) {
	if (e.source.getApiName() == "Ti.UI.Button")
	{
		Ti.API.log(JSON.stringify(e.source));
		Ti.API.log(e.source.backgroundColor);
		e.source.backgroundColor = Alloy.CFG.Colors.MainLite;
	}
});

$.homeC.addEventListener("touchcancel", function(e) {
	if (e.source.getApiName() == "Ti.UI.Button")
	{
		e.source.backgroundColor = Alloy.CFG.Colors.MainColor;
	}
});

$.homeC.addEventListener("touchend", function(e) {
	if (e.source.getApiName() == "Ti.UI.Button")
	{
		e.source.backgroundColor = Alloy.CFG.Colors.MainColor;
	}
});

//Test de commits