# Test case for the [pullToRefresh](https://github.com/FokkeZB/nl.fokkezb.pullToRefresh) widget.

The app use also the [drawer](https://github.com/FokkeZB/nl.fokkezb.drawer) widget.

There is a **News** section which can be reach by the slide menu or the button on the home view.

In the **views/news.xml** a View wraps the widget. To reproduce the bug just remove it and let the widget at the lop level of this view.
This view takes place in the center view of the drawer.
