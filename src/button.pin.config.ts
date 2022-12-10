/**
* @module Pin
*/

import { Machine, IConfiguration } from "./machine.js";

import * as Pin from "./button.pin.metadata.js"

export * from "./button.pin.metadata.js"

export const Configuration: 
    IConfiguration<
        Pin.Attribute, 
        Pin.States, 
        Pin.Event> = {
    type:'parallel',
    states :{
        [Pin.Attribute.VISIBLE]:{
            initial: Pin.Visible.YES,
            states: {
                [Pin.Visible.YES]:{
                    on:{
                        [Pin.Event.ONHIDE]: {
                            target: Pin.Visible.NO,
                            actions: [Pin.Operation.HIDE]
                        }
                    }
                },
                [Pin.Visible.NO]:{
                    on:{
                        [Pin.Event.ONSHOW]: {
                            target: Pin.Visible.YES,
                            actions: [Pin.Operation.SHOW]
                        }
                    }
                }
            }
        },
        [Pin.Attribute.STATE]: {
            initial: Pin.State.OFF,
            states: {
                [Pin.State.OFF]:{
                    on: {
                        [Pin.Event.ONON]: {
                            target: Pin.State.ON,
                            actions:[Pin.Operation.ON]
                        },
                        [Pin.Event.ONTOGGLE]: {
                            target: Pin.State.ON,
                            actions:[Pin.Operation.ON]
                        }
                    }
                },
                [Pin.State.ON]:{
                    on: {
                        [Pin.Event.ONOFF]: {
                            target: Pin.State.OFF,
                            actions: [Pin.Operation.OFF]
                        },
                        [Pin.Event.ONTOGGLE]: {
                            target: Pin.State.OFF,
                            actions: [Pin.Operation.OFF]
                        }
                    }
                }
            }
        }
    },
    actions: {
        [Pin.Operation.HIDE]:   (
            machine: Machine<Pin.Attribute, Pin.States, Pin.Event>, 
            state) => 
                machine.emit(Pin.Event.ONHIDE, state),
        [Pin.Operation.SHOW]:   (
            machine: Machine<Pin.Attribute, Pin.States, Pin.Event>,
            state) => 
                machine.emit(Pin.Event.ONSHOW,state),
        [Pin.Operation.ON]:     (
            machine: Machine<Pin.Attribute, Pin.States, Pin.Event>,
            state) => 
                machine.emit(Pin.Event.ONON, state),
        [Pin.Operation.OFF]:    (
            machine: Machine<Pin.Attribute, Pin.States, Pin.Event>,
            state) => 
                machine.emit(Pin.Event.ONOFF, state)
    },
    gestures:[
        {
            event: Pin.Gesture.CLICK,
            operation: Pin.Operation.TOGGLE
        }
    ]
}
