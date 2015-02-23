var fontIconLoader = require("icomoonlib");
var loader = require("loader");
var loading = require('loadingWindow');

var sideMenuIcon = fontIconLoader.getIcon("panacea","navicon",35,{color:Alloy.CFG.Colors.IconWhite});
var homeIcon = fontIconLoader.getIcon("panacea","home",35,{color:Alloy.CFG.Colors.IconWhite});
var newsIcon = fontIconLoader.getIcon("panacea","new",35,{color:Alloy.CFG.Colors.IconWhite});
var concoursIcon = fontIconLoader.getIcon("panacea","star",35,{color:Alloy.CFG.Colors.IconWhite});
var progIcon = fontIconLoader.getIcon("panacea","list",35,{color:Alloy.CFG.Colors.IconWhite});
var aboutIcon = fontIconLoader.getIcon("panacea","info-circle",35,{color:Alloy.CFG.Colors.IconWhite});

var homeIconB = fontIconLoader.getIcon("panacea","home",35,{color:Alloy.CFG.Colors.MainColor});
var newsIconB = fontIconLoader.getIcon("panacea","new",35,{color:Alloy.CFG.Colors.MainColor});
var concoursIconB = fontIconLoader.getIcon("panacea","star",35,{color:Alloy.CFG.Colors.MainColor});
var progIconB = fontIconLoader.getIcon("panacea","list",35,{color:Alloy.CFG.Colors.MainColor});
var aboutIconB = fontIconLoader.getIcon("panacea","info-circle",35,{color:Alloy.CFG.Colors.MainColor});

var currentSection;

if (sideMenuIcon == null)
	Ti.API.log("get icon doesn't work !'");
else
	Ti.API.log("get icon works !");

$.imgSideMenu.image = sideMenuIcon;
$.imgSideMenu.width = "35";
$.imgSideMenu.height = "35";

var menuNodes = [
	{
		id : Alloy.Globals.MENU_HOME,
		title : "Home",//Alloy.CFG.Languages.lblHome,
		image : homeIcon,
		imageB: homeIconB
	}, 
	{
		id : Alloy.Globals.MENU_NEWS,
		title : "News",//Alloy.CFG.Languages.lblSwitchShop,
		image : newsIcon,
		imageB: newsIconB
	}
];

function handleMenuClick(_event) {
	if ( typeof _event.row.id !== "undefined") {
		if (currentSection != _event.row.id)
		{
			currentSection = _event.row.id;
			openScreen(_event.row.id, true);
		}
		else
			$.drawer["toggleLeftWindow"]();
	}
}

function openScreen(rowID, opened) {
	var params = null;
	var controller = null;
	switch (rowID) {
		case Alloy.Globals.MENU_HOME:
			controller = "home";
			break;
		case Alloy.Globals.MENU_NEWS:
			controller = "news";
			params = {
				name: "News"
			};
			break;
		default:
			Ti.API.log("Failed with " + rowID);
	}
	if (null != controller)
	{
		if (null != params)
			loadContentView(controller, params);
		else
			loadContentView(controller);
	}
	if (opened)
		$.drawer["toggleLeftWindow"]();
}

var loadContentView = function(viewName, args) {
	var contentView = Alloy.createController(viewName, args).getView();
	$.content.removeAllChildren();
	$.content.add(contentView);
	if(null != args) {
		$.mainTitle.text = args.name;
	} else {
		$.mainTitle.text = Alloy.CFG.Languages.appName;
	}
};

function initSlideMenu(nodes) {
	
	$.SlideMenu.init({
		nodes : nodes,
		color : {
			headingBackground : "#000",
			headingText : "#FFF"
		}
	});
	$.SlideMenu.setIndex(Alloy.Globals.MENU_HOME);
	currentSection = Alloy.Globals.MENU_HOME;
	$.SlideMenu.Nodes.addEventListener("click", handleMenuClick);
}

$.imgSideMenu.addEventListener("click", function() {
	$.drawer["toggleLeftWindow"]();
});

$.drawer.addEventListener("open", function() {
	initSlideMenu(menuNodes);
	openScreen(Alloy.Globals.MENU_HOME, false);
});

Ti.App.addEventListener("app:handleHomeClick", function(_event) {
	Ti.API.log("Handle event menuID :" + _event.menuID);
	var section = parseInt(_event.menuID);
	currentSection = section;
	$.SlideMenu.setIndex(section);
	openScreen(section, false);
});

$.drawer.open();