var args = arguments[0] || {};

var fontIconLoader = require("icomoonlib");
var leftIcon = fontIconLoader.getIcon("panacea","arrow-left5",35,{color:Alloy.CFG.Colors.IconWhite});

$.iconLeft.image = leftIcon;
$.iconLeft.width = "35";
$.iconLeft.height = "35";

$.iconLeft.addEventListener("click", function() {
	$.newsDetail.close();
});

$.mainTitle.text = args.name;

var head = '<head>'
	+ '<meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, width=device-width">'
	+ '<style>img{width: 100%;display: block; height: auto;}</style></head>';

var content = $.UI.create("WebView", {
	html:  head + args.data.content,
	borderRadius: "1",
	enableZoomControls : false,
	scalesPageToFit: true
});

/*
$.newsContent.onresize= function(){
    document.getElementById("component").style.height = $.newsContent.innerHeight + 'px';
};
 */

$.newsDetail.add(content);