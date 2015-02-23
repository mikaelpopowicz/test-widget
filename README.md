# Test case for the [pullToRefresh](https://github.com/FokkeZB/nl.fokkezb.pullToRefresh) widget.
[![Appcelerator Titanium](http://www-static.appcelerator.com/badges/titanium-git-badge-sq.png)](http://appcelerator.com/titanium/) [![Appcelerator Alloy](http://www-static.appcelerator.com/badges/alloy-git-badge-sq.png)](http://appcelerator.com/alloy/)

The app use also the [drawer](https://github.com/FokkeZB/nl.fokkezb.drawer) widget.
This is a sample app to check news from an api.
The targeted Android sdk is 19.


## Reproduce the issue [*App crash #39*](https://github.com/FokkeZB/nl.fokkezb.pullToRefresh/issues/39)

There is a **News** section which can be reach by the slide menu or the button on the home view.

In the **views/news.xml** a Ti.UI.View wraps the widget. To reproduce the bug just remove it and let the widget at the lop level of this view.
This view takes place in the center view of the drawer which is a Ti.UI.View on Android platform.
