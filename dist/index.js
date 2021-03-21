import { jsx, jsxs } from 'react/jsx-runtime';
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

var Context = React.createContext({});
// export const DesktopProvider: React.FC = ({ children }) => {
//   const [windows, setWindows] = React.useState<Window[]>([]);
//   const getId = useAutoIncrementingId();
//   const focusWindow = (_id: number): void => {
//   };
//   // const destroyWindow = (id: number): void => {
//     console.log(id);
//     console.log(windows)
//     const battleryoales = windows.filter(window => window.id !== id);
//     console.log('battle ryoales', battleryoales);
//     setWindows(battleryoales);
//   };
//   const createWindow = (partialWindow: Partial<Window>): Window => {
//     console.log('yeyyeyeyyeeyt');
//     const id = getId();
//     const window = {
//       id,
//       title:    partialWindow.title    ?? "window",
//       size:     partialWindow.size     ?? [400, 300],
//       position: partialWindow.position ?? [0, 0],
//       content:  partialWindow.content,
//       index:    0,
//       destroy:  () => destroyWindow(Number(id)),
//       focus:    () => focusWindow(Number(id))
//     };
//     setWindows([...windows, window])
//     console.log('ooooooo')
//     return window;
//   };
//   console.log('wtff')
//   return (
//     <Context.Provider 
//       value={{
//         windows: () => windows,
//         createWindow,
//         destroyWindow,
//         focusWindow
//       }}>
//       {children}
//       {windows.map(window => <DesktopWindow key={window.id} {...window} />)}
//     </Context.Provider>
//   );
// }

function useAutoIncrementingId(initialValue) {
    var _a = React.useState(initialValue !== null && initialValue !== void 0 ? initialValue : 0), id = _a[0], setId = _a[1];
    return function () {
        var n = id;
        setId(n + 1);
        return n;
    };
}

var DesktopShortcut = function (props) {
    var desktop = React.useContext(Context);
    var run = function () {
        desktop.create(props.window);
    };
    return (jsx("div", __assign({ className: "shortcut shortcut:" + props.name.toLowerCase(), style: {
            width: 64,
            height: 64,
            borderRadius: '4px',
            border: '1px solid black'
        }, onClick: run }, { children: props.name }), void 0));
};

var WindowTitlebar = function (_a) {
    var title = _a.title, onClose = _a.onClose, onGrab = _a.onGrab;
    return (jsxs("div", __assign({ style: {
            height: 32,
            display: 'flex',
            padding: '0 8px',
            alignItems: 'center',
            background: 'gray',
            userSelect: 'none'
        }, onMouseDown: onGrab }, { children: [jsx("p", __assign({ style: {
                    flex: 1,
                    margin: 0
                } }, { children: title }), void 0),
            jsx("div", { children: jsx("button", __assign({ onClick: onClose }, { children: "X" }), void 0) }, void 0)] }), void 0));
};

var WindowContent = function (props) {
    return (jsx("div", __assign({ className: "window-content", style: {
            flex: 1,
            overflow: 'hidden'
        } }, props, { children: props.children }), void 0));
};

var WindowFooter = function (_a) {
    var onGrab = _a.onGrab, props = __rest(_a, ["onGrab"]);
    return (jsx("div", __assign({}, props, { style: {
            userSelect: 'none',
            display: 'flex',
            justifyContent: 'flex-end'
        } }, { children: jsx("span", __assign({ onMouseDown: onGrab }, { children: "XXXX" }), void 0) }), void 0));
};

var DesktopWindow = function (props) {
    var ref = React.useRef(null);
    React.useEffect(function () {
        if (props.onResize) {
            props.onResize(props.size);
        }
    }, [props.size, props.onResize]);
    function click(event) {
        if (!ref.current)
            return;
        if (!props.onMouseDown)
            return;
        var windowPosition = [ref.current.offsetLeft, ref.current.offsetTop];
        var mousePosition = [event.clientX, event.clientY];
        if (props.onFocus)
            props.onFocus();
        props.onMouseDown([
            mousePosition[0] - windowPosition[0],
            mousePosition[1] - windowPosition[1]
        ]);
    }
    return (jsxs("div", __assign({ ref: ref, className: "window window:" + props.title.toLowerCase(), onMouseDown: click, style: {
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            left: props.position[0],
            top: props.position[1],
            width: props.size[0],
            height: props.size[1],
            border: '1px solid black'
        } }, { children: [jsx(DesktopWindow.Titlebar, { title: props.title, onGrab: props.onBeginDrag, onClose: props.onClose }, void 0),
            jsx(DesktopWindow.Content, { children: props.content }, void 0),
            jsx(DesktopWindow.Footer, { onGrab: props.onBeginResize }, void 0)] }), void 0));
};
DesktopWindow.Titlebar = WindowTitlebar;
DesktopWindow.Content = WindowContent;
DesktopWindow.Footer = WindowFooter;

var DesktopTaskbar = function () {
    return (jsx("div", {}, void 0));
};

function useArrayTop(array) {
    return React.useMemo(function () {
        if (array.length === 0)
            return undefined;
        return array[array.length - 1];
    }, [array]);
}
function useModel() {
    var initialValue = {
        cursor: {
            position: [0, 0],
            offset: [0, 0],
            state: 'default'
        },
        windows: []
    };
    function reducer(model, message) {
        if (model === void 0) { model = initialValue; }
        switch (message.type) {
            case 'CREATE_WINDOW': {
                console.log(model.windows);
                return __assign(__assign({}, model), { windows: __spreadArray(__spreadArray([], model.windows), [message.window]) });
            }
            case 'DESTROY_WINDOW': {
                return __assign({}, model);
            }
            case 'UPDATE_WINDOW': {
                return __assign(__assign({}, model), { windows: __spreadArray(__spreadArray([], model.windows.filter(function (window) { return window.id !== message.window.id; })), [
                        message.window
                    ]) });
            }
            case 'FOCUS_WINDOW': {
                return __assign(__assign({}, model), { windows: __spreadArray(__spreadArray([], model.windows.filter(function (window) { return window.id !== message.window.id; })), [
                        message.window
                    ]) });
            }
            case 'SET_CURSOR_OFFSET': {
                return __assign(__assign({}, model), { cursor: __assign(__assign({}, model.cursor), { offset: message.offset }) });
            }
            case 'SET_CURSOR_POSITION': {
                return __assign(__assign({}, model), { cursor: __assign(__assign({}, model.cursor), { position: message.position }) });
            }
            case 'SET_CURSOR_STATE': {
                return __assign(__assign({}, model), { cursor: __assign(__assign({}, model.cursor), { state: message.state }) });
            }
        }
    }
    return React.useReducer(reducer, initialValue);
}
var Desktop = function (props) {
    var _a = useModel(), _b = _a[0], windows = _b.windows, cursor = _b.cursor, update = _a[1];
    var getId = useAutoIncrementingId();
    var ref = React.useRef(null);
    var activeWindow = useArrayTop(windows);
    function drag(window) {
        var position = [
            cursor.position[0] - cursor.offset[0],
            cursor.position[1] - cursor.offset[1]
        ];
        update({
            type: 'UPDATE_WINDOW',
            window: __assign(__assign({}, window), { position: position })
        });
    }
    function resize(window) {
        var size = [
            cursor.position[0] - window.position[0],
            cursor.position[1] - window.position[1]
        ];
        if (window.maximumSize) {
            size[0] = Math.min(size[0], window.maximumSize[0]);
            size[1] = Math.min(size[1], window.maximumSize[1]);
        }
        if (window.minimumSize) {
            size[0] = Math.max(size[0], window.minimumSize[0]);
            size[1] = Math.max(size[1], window.minimumSize[1]);
        }
        update({ type: 'UPDATE_WINDOW', window: __assign(__assign({}, window), { size: size }) });
    }
    function focus(window) {
        update({ type: 'FOCUS_WINDOW', window: window });
    }
    function destroy(window) {
        update({ type: 'DESTROY_WINDOW', window: window });
    }
    function create(_a) {
        var title = _a.title, size = _a.size, position = _a.position, content = _a.content, onResize = _a.onResize, minimumSize = _a.minimumSize, maximumSize = _a.maximumSize;
        var window = {
            id: getId(),
            title: title !== null && title !== void 0 ? title : "window",
            size: size !== null && size !== void 0 ? size : [400, 300],
            position: position !== null && position !== void 0 ? position : [0, 0],
            content: content,
            minimumSize: minimumSize,
            maximumSize: maximumSize,
            onResize: onResize
        };
        update({ type: 'CREATE_WINDOW', window: window });
        return window;
    }
    function cursorType() {
        switch (cursor.state) {
            case 'default': return 'default';
            case 'dragging': return 'grabbing';
            case 'resizing': return 'nw-resize';
        }
    }
    return (jsx(Context.Provider, __assign({ value: { windows: windows, create: create, destroy: destroy, focus: focus } }, { children: jsxs("div", __assign({ ref: ref, className: "desktop", style: {
                height: '100%',
                width: '100%',
                cursor: cursorType()
            }, onMouseMove: mouseMove, onMouseUp: mouseUp }, { children: [props.children, windows.map(function (window) { return (jsx(DesktopWindow, __assign({ onMouseDown: mouseDown, onBeginDrag: beginDrag, onBeginResize: beginResize, onClose: function () { return destroy(window); }, onFocus: function () { return focus(window); } }, window), window.id)); })] }), void 0) }), void 0));
    function beginResize() {
        update({ type: 'SET_CURSOR_STATE', state: 'resizing' });
    }
    function beginDrag() {
        update({ type: 'SET_CURSOR_STATE', state: 'dragging' });
    }
    function mouseUp() {
        if (cursor.state !== 'default')
            update({ type: 'SET_CURSOR_STATE', state: 'default' });
    }
    function mouseDown(offset) {
        update({ type: 'SET_CURSOR_OFFSET', offset: offset });
    }
    function mouseMove(event) {
        var position = [event.clientX, event.clientY];
        if (activeWindow) {
            if (cursor.state === 'dragging')
                drag(activeWindow);
            if (cursor.state === 'resizing')
                resize(activeWindow);
        }
        update({ type: 'SET_CURSOR_POSITION', position: position });
    }
};
Desktop.Window = DesktopWindow;
Desktop.Shortcut = DesktopShortcut;
Desktop.Taskbar = DesktopTaskbar;

export { Context, Desktop, DesktopShortcut, DesktopTaskbar, DesktopWindow, useAutoIncrementingId };
//# sourceMappingURL=index.js.map
