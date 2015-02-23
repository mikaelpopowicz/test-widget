var args = arguments[0] || {};

var fontIconLoader = require("icomoonlib");
var autIcon = fontIconLoader.getIcon("panacea","users",35,{color:Alloy.CFG.Colors.IconGrey});

var data = {
	id: args.id,
	categorie: args.categorie,
	libelle: args.libelle,
	auteur: args.auteur,
	dateNews: args.dateNews,
	dateMaj: args.dateMaj,
	content: args.content
};

$.newsItem.data = data;
$.newsItemL.text = data.libelle;
$.imgAut.image = autIcon;
$.newsAut.text = data.auteur;
$.newsDate.text = data.dateNews; 