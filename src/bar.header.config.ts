import { Attribute } from "./bar.header.metadata.js";
import { Visible } from "./bar.header.metadata.js";
import { State } from "./bar.header.metadata.js";
import { Orientation } from "./bar.header.metadata.js";
import { Window } from "./bar.header.metadata.js";
import { Event } from "./bar.header.metadata.js";
import { Operation } from "./bar.header.metadata.js";

export const Configuration = {
  type: "parallel",
  states: {
    [Attribute.VISIBLE]: {
      initial: Visible.YES,
      states: {
        [Visible.YES]: {
          on: {
            [Event.ONHIDE]: {
              target: Visible.NO,
              actions: [Operation.HIDE],
            },
          },
        },
        [Visible.NO]: {
          on: {
            [Event.ONSHOW]: {
              target: Visible.YES,
              actions: [Operation.SHOW],
            },
          },
        },
      },
    },
    [Attribute.ORIENTATION]: {
      initial: Orientation.HORIZONTAL,
      states: {
        [Orientation.HORIZONTAL]: {
          on: {},
        },
        [Orientation.VERTICAL]: {
          on: {},
        },
      },
    },
    [Attribute.STATE]: {
      initial: State.UNPINNED,
      states: {
        [State.UNPINNED]: {
          on: {
            [Event.ONPIN]: {
              target: State.PINNED,
              actions: [Operation.PIN],
            },
          },
        },
        [State.PINNED]: {
          on: {
            [Event.ONUNPIN]: {
              target: State.UNPINNED,
              actions: [Operation.UNPIN],
            },
          },
        },
      },
    },
    [Attribute.WINDOW]: {
      initial: Window.NORMAL,
      states: {
        [Window.NORMAL]: {
          on: {
            [Event.ONMINIMIZE]: {
              target: Window.MINIMIZED,
              actions: [Operation.MINIMIZE],
            },
            [Event.ONMAXIMIZE]: {
              target: Window.MAXIMIZED,
              actions: [Operation.MAXIMIZE],
            },
            [Event.ONCLOSE]: {
              target: Window.CLOSED,
              actions: [Operation.CLOSE],
            },
          },
        },
        [Window.MINIMIZED]: {
          on: {
            [Event.ONRESTORE]: {
              target: Window.NORMAL,
              actions: [Operation.RESTORE],
            },
            [Event.ONCLOSE]: {
              target: Window.CLOSED,
              actions: [Operation.CLOSE],
            },
          },
        },
        [Window.MAXIMIZED]: {
          on: {
            [Event.ONMINIMIZE]: {
              target: Window.MINIMIZED,
              actions: [Operation.MINIMIZE],
            },
            [Event.ONRESTORE]: {
              target: Window.NORMAL,
              actions: [Operation.RESTORE],
            },
            [Event.ONCLOSE]: {
              target: Window.CLOSED,
              actions: [Operation.CLOSE],
            },
          },
        },
        [Window.CLOSED]: {
          on: {},
        },
      },
    },
  },
  actions: {
    [Operation.HIDE]: (context, event) => {
      console.log("hide");
    },
    [Operation.SHOW]: (context, event) => {
      console.log("show");
    },
    [Operation.PIN]: (context, event) => {
      console.log("pin");
    },
    [Operation.UNPIN]: (context, event) => {
      console.log("unpin");
    },
    [Operation.MINIMIZE]: (context, event) => {
      console.log("minimize");
    },
    [Operation.MAXIMIZE]: (context, event) => {
      console.log("maximize");
    },
    [Operation.RESTORE]: (context, event) => {
      console.log("restore");
    },
    [Operation.CLOSE]: (context, event) => {
      console.log("closed");
    },
  },
};
