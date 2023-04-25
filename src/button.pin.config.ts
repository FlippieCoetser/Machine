/**
 * @module Pin
 */

import { Machine } from "./machine.js";

import { Attribute, Attributes } from "./button.pin.metadata.js";
import { Visible } from "./button.pin.metadata.js";
import { State } from "./button.pin.metadata.js";
import { Event, Events } from "./button.pin.metadata.js";
import { Operation } from "./button.pin.metadata.js";
import { Gesture } from "./button.pin.metadata.js";

export * from "./button.pin.metadata.js";

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
    [Attribute.STATE]: {
      initial: State.OFF,
      states: {
        [State.OFF]: {
          on: {
            [Event.ONON]: {
              target: State.ON,
              actions: [Operation.ON],
            },
            [Event.ONTOGGLE]: {
              target: State.ON,
              actions: [Operation.ON],
            },
          },
        },
        [State.ON]: {
          on: {
            [Event.ONOFF]: {
              target: State.OFF,
              actions: [Operation.OFF],
            },
            [Event.ONTOGGLE]: {
              target: State.OFF,
              actions: [Operation.OFF],
            },
          },
        },
      },
    },
  },
  actions: {
    [Operation.HIDE]: (machine: Machine<Attributes, Events>, state, ...args) =>
      machine.emit(Event.ONHIDE, state, ...args),
    [Operation.SHOW]: (machine: Machine<Attributes, Events>, state, ...args) =>
      machine.emit(Event.ONSHOW, state, ...args),
    [Operation.ON]: (machine: Machine<Attributes, Events>, state, ...args) =>
      machine.emit(Event.ONON, state, ...args),
    [Operation.OFF]: (machine: Machine<Attributes, Events>, state, ...args) =>
      machine.emit(Event.ONOFF, state, ...args),
  },
  gestures: [
    {
      event: Gesture.CLICK,
      operation: Operation.TOGGLE,
    },
  ],
};
