import { jsxs, jsx } from 'react/jsx-runtime';
import React from 'react';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __spreadArray(to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
}

var WindowTitlebar = function (_a) {
    var title = _a.title, onClose = _a.onClose, onGrab = _a.onGrab;
    return (jsxs("div", __assign({ style: {
            height: 32,
            display: 'flex',
            padding: '0 8px',
            alignItems: 'center',
            background: 'gray'
        }, onMouseDown: onGrab }, { children: [jsx("p", __assign({ style: {
                    flex: 1,
                    margin: 0
                } }, { children: title }), void 0),
            jsx("div", { children: jsx("button", __assign({ onClick: onClose }, { children: "X" }), void 0) }, void 0)] }), void 0));
};

var WindowContent = function (props) {
    return (jsx("div", __assign({}, props, { children: props.children }), void 0));
};

var WindowFooter = function (_a) {
    _a.onResizeBegin; var onResize = _a.onResize; _a.onResizeEnd; var props = __rest(_a, ["onResizeBegin", "onResize", "onResizeEnd"]);
    var _b = React.useState(false), grabbed = _b[0], setGrabbed = _b[1];
    var _c = React.useState([0, 0]), cursor = _c[0], setCursor = _c[1];
    return (jsx("div", __assign({}, props, { style: {
            display: 'flex',
            justifyContent: 'flex-end'
        } }, { children: jsx("span", __assign({ onMouseDown: grab, onMouseLeave: release, onMouseUp: release, onMouseMove: resize }, { children: "..." }), void 0) }), void 0));
    function grab(_a) {
        var clientX = _a.clientX, clientY = _a.clientY;
        setGrabbed(true);
        setCursor([clientX, clientY]);
        console.log('window:footer:grab');
    }
    function release(_a) {
        _a.clientX; _a.clientY;
        setGrabbed(false);
        console.log('window:footer:release');
    }
    function resize(_a) {
        var clientX = _a.clientX, clientY = _a.clientY;
        if (!grabbed)
            return;
        console.log('window:footer:resize');
        var offset = [
            clientX - cursor[0],
            clientY - cursor[1]
        ];
        setCursor([clientX, clientY]);
        onResize && onResize(offset);
    }
};

var DesktopWindow = function (props) {
    var _a = React.useState(props.position), position = _a[0], setPosition = _a[1];
    var _b = React.useState(props.size), size = _b[0], setSize = _b[1];
    var _c = React.useState(false), draggable = _c[0], setDraggable = _c[1];
    var _d = React.useState([0, 0]), offset = _d[0], setOffset = _d[1];
    var _e = React.useState([0, 0]); _e[0]; var setResizePosition = _e[1];
    var title = props.title, focus = props.focus, destroy = props.destroy, beforeMove = props.beforeMove; props.beforeResize; props.children;
    React.useEffect(function () {
        console.log('size', size);
    }, [size]);
    return (jsxs("div", __assign({ className: "window window:" + title.toLowerCase(), onMouseUp: release, onMouseMove: drag, onMouseLeave: release, onClick: focus, style: {
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            left: position[0],
            top: position[1],
            width: size[0],
            height: size[1],
            border: '1px solid black'
        } }, { children: [jsx(DesktopWindow.Titlebar, { title: title, onGrab: grab, onClose: destroy }, void 0),
            jsx(DesktopWindow.Content, __assign({ style: { flex: 1 } }, { children: props.content }), void 0),
            jsx(DesktopWindow.Footer, { onResizeBegin: setResizePosition, onResizeEnd: function () { return setResizePosition([0, 0]); }, onResize: onResize }, void 0)] }), void 0));
    function onResize(_a) {
        var w = _a[0], h = _a[1];
        console.log('Resize', [w, h]);
        setSize([
            size[0] + w,
            size[1] + h
        ]);
    }
    function grab(_a) {
        var clientX = _a.clientX, clientY = _a.clientY;
        setOffset([
            position[0] - clientX,
            position[1] - clientY
        ]);
        setDraggable(true);
    }
    function release() {
        setDraggable(false);
    }
    function drag(_a) {
        var clientX = _a.clientX, clientY = _a.clientY;
        if (!draggable)
            return;
        var newPosition = [clientX + offset[0], clientY + offset[1]];
        setPosition(beforeMove ? beforeMove(newPosition) : newPosition);
    }
};
DesktopWindow.Titlebar = WindowTitlebar;
DesktopWindow.Content = WindowContent;
DesktopWindow.Footer = WindowFooter;

function useAutoIncrementingId(initialValue) {
    var _a = React.useState(initialValue !== null && initialValue !== void 0 ? initialValue : 0), id = _a[0], setId = _a[1];
    return function () {
        var n = id;
        setId(n + 1);
        return n;
    };
}

var Context = React.createContext({});
var DesktopProvider = function (_a) {
    var children = _a.children;
    var _b = React.useState([]), windows = _b[0], setWindows = _b[1];
    var getId = useAutoIncrementingId();
    function focusWindow(_id) {
    }
    function destroyWindow(id) {
        console.log(id);
        console.log(windows);
        var battleryoales = windows.filter(function (window) { return window.id !== id; });
        console.log('battle ryoales', battleryoales);
        setWindows(battleryoales);
    }
    function createWindow(partialWindow) {
        var _a, _b, _c;
        console.log('yeyyeyeyyeeyt');
        var id = getId();
        var window = {
            id: id,
            title: (_a = partialWindow.title) !== null && _a !== void 0 ? _a : "window",
            size: (_b = partialWindow.size) !== null && _b !== void 0 ? _b : [400, 300],
            position: (_c = partialWindow.position) !== null && _c !== void 0 ? _c : [0, 0],
            content: partialWindow.content,
            index: 0,
            destroy: function () { return destroyWindow(Number(id)); },
            focus: function () { return focusWindow(); }
        };
        setWindows(__spreadArray(__spreadArray([], windows), [window]));
        console.log('ooooooo');
        return window;
    }
    console.log('wtff');
    return (jsxs(Context.Provider, __assign({ value: {
            windows: windows,
            createWindow: createWindow,
            destroyWindow: destroyWindow,
            focusWindow: focusWindow
        } }, { children: [children, windows.map(function (window) { return jsx(DesktopWindow, __assign({}, window), window.id); })] }), void 0));
};

function useDesktop() {
    return React.useContext(Context);
}

var DesktopShortcut = function (props) {
    var desktop = useDesktop();
    var run = function () {
        console.log('wtf');
        desktop.createWindow(props.window);
        console.log(desktop.windows);
    };
    return (jsx("div", __assign({ className: "shortcut shortcut:" + props.name.toLowerCase(), style: {
            width: 64,
            height: 64,
            borderRadius: '4px',
            border: '1px solid black'
        }, onClick: function () { return run(); } }, { children: props.name }), void 0));
};

var DesktopTaskbar = function () {
    return (jsx("div", {}, void 0));
};

var Desktop = function (props) {
    var desktop = useDesktop();
    return (jsxs("div", __assign({ className: "desktop", style: {
            display: 'grid',
            width: '100%',
            height: '100%',
            overflow: 'hidden'
        } }, { children: [props.children, desktop.windows.map(function (window) {
                console.log(window.id);
                return (jsxs("div", { children: [jsx("p", { children: "shit" }, void 0),
                        jsx(Desktop.Window, __assign({}, window, { children: window.content }), void 0)] }, window.id));
            })] }), void 0));
};
Desktop.Window = DesktopWindow;
Desktop.Shortcut = DesktopShortcut;
Desktop.Taskbar = DesktopTaskbar;

export { Context, Desktop, DesktopProvider, DesktopShortcut, DesktopTaskbar, DesktopWindow, useDesktop };
//# sourceMappingURL=index.js.map
