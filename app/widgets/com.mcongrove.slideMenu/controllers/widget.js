/**
 * The slide menu widget
 * 
 * @class Widgets.com.mcongrove.slideMenu
 */
var sections = [];
var nodes = [];
var color;
var currentRow = null;

/**
 * Initializes the slide menu
 * @param {Object} _params
 * @param {Array} _params.nodes The nodes (menu items) to show in the side menu as defined by the JSON configuration file
 * @param {Object} _params.color The colors for the menu
 * @param {String} _params.color.headingBackground The background color for menu headers
 * @param {String} _params.color.headingText The text color for menu headers
 */
$.init = function(_params) {
	sections = [];
	nodes = [];
	color = typeof _params.color !== "undefined" ? _params.color : null;

	// Creates a TableViewSection for each tab with a menuHeader property
	buildSections(_params.nodes);

	if(sections.length > 0) {
		var currentSection = -1;
	}

	for(var i = 0; i < _params.nodes.length; i++) {
		// Iterates through the created sections
		if(_params.nodes[i].menuHeader) {
			currentSection++;
		}

		var tab = Ti.UI.createTableViewRow({
			id: _params.nodes[i].id,
			selectedImg: _params.nodes[i].imageB,
			img: _params.nodes[i].image,
			height: "50",
			backgroundcolor: "#111",
			backgroundSelectedColor: Alloy.CFG.Colors.MainColor_DarkLite
		});
		
		Ti.API.log("Menu[" + i + "] : " + _params.nodes[i].title);
		var label = Ti.UI.createLabel({
			id: "text" + i,
			text: _params.nodes[i].title,
			top: "5",
			left: "55",
			width: Ti.UI.SIZE,
			height: "40",
			font: {
				fontSize: "20",
				fontFamily: "Monda-Regular"
			},
			color: "#FFF",
			touchEnabled: true
		});

		if(_params.nodes[i].image) {
			var icon = Ti.UI.createImageView({
				image: _params.nodes[i].image,
				width: "30",
				height: "30",
				top: "10",
				left: "15",
				touchEnabled: false,
				preventDefaultImage: true
			});
			tab.add(icon);		
			Ti.API.log("Add icon menu");	
		}

		tab.add(label);

		if(sections.length > 0) {
			sections[currentSection].add(tab);

			// If the last tab has been created and added to a section or
			// the next tab is a new header, append the current section to the TableView
			if(i + 1 !== _params.nodes.length) {
				if(_params.nodes[i + 1].menuHeader) {
					$.Nodes.appendSection(sections[currentSection]);
				}
			} else {
				$.Nodes.appendSection(sections[currentSection]);
			}
		} else {
			nodes.push(tab);
		}
	}

	if(nodes.length > 0) {
		$.Nodes.setData(nodes);
	}

	// We have to remove before adding to make sure we're not duplicating
	$.Nodes.removeEventListener("click", handleClick);
	$.Nodes.addEventListener("click", handleClick);
};

/**
 * Handles a click event on the nodes container
 * @param {Object} _event The event
 */
function handleClick(_event) {
	if(typeof _event.index !== "undefined") {
		$.setIndex(_event.index);
	}
};

/**
 * Builds out the table sections
 * @param {Object} _nodes The tab items to show in the side menu
 * @private
 */
function buildSections(_nodes) {
	for(var i = 0; i < _nodes.length; i++) {
		// Assigns special menuHeader styling
		if(_nodes[i].menuHeader) {
			var header = Ti.UI.createView({
				top: "0dp",
				height: "47dp",
				width: Ti.UI.FILL,
				backgroundColor: color.headingBackground
			});

			var headerText = Ti.UI.createLabel({
				text: _nodes[i].menuHeader,
				top: "0dp",
				bottom:"3dp",
				left: "13dp",
				height: "47dp",
				font: {
					fontSize: "18dp",
					fontWeight: "HelveticaNeue-Light",
					fontFamily: "Monda-Regular"
				},
				color: color.headingText,
				touchEnabled: false,
				verticalAlignment: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
				isHeader: true
			});

			header.add(headerText);

			var section = Ti.UI.createTableViewSection({
				headerView: header
			});

			sections.push(section);
		}
	}
};

function toggleLabel(row) {
	
}

/**
 * Clears all items from the side menu
 */
$.clear = function() {
	$.Nodes.setData([]);
	$.Nodes.removeAllChildren();
};

/**
 * Sets the indexed item as active
 * @param {Object} _index The index of the item to show as active
 */
$.setIndex = function(_index) {
	Ti.API.log("setIndex(" + _index + ")");
	if (null == currentRow)
	{
		currentRow = _index;
		$.Nodes.getData()[0].getRows()[currentRow].getChildren()[0].image = $.Nodes.getData()[0].getRows()[currentRow].selectedImg;
		$.Nodes.getData()[0].getRows()[currentRow].getChildren()[1].color = "#FFF";
	}
		
	if (currentRow.id != _index)
	{
		$.Nodes.getData()[0].getRows()[currentRow].getChildren()[0].image = $.Nodes.getData()[0].getRows()[currentRow].img;
		$.Nodes.getData()[0].getRows()[currentRow].getChildren()[1].color = "#FFF";
		$.Nodes.getData()[0].getRows()[_index].getChildren()[0].image = $.Nodes.getData()[0].getRows()[_index].selectedImg;
		$.Nodes.getData()[0].getRows()[_index].getChildren()[1].color = Alloy.CFG.Colors.MainColor;
		$.Nodes.selectRow(_index);
		currentRow = _index;
	}
};

// Move the UI down if iOS7+
if(OS_IOS && parseInt(Ti.Platform.version.split(".")[0], 10) >= 7) {
	$.Nodes.top = "20dp";
}