import { IConfiguration } from "./machine.js";

import * as Header from "./bar.header.metadata.js"

export const Configuration: 
    IConfiguration<
        Header.Attribute,
        Header.States,
        Header.Event> = {
    type: 'parallel',
    states :{
        [Header.Attribute.VISIBLE]:{
            initial: Header.Visible.YES,
            states: {
                [Header.Visible.YES]:{
                    on:{
                        [Header.Event.ONHIDE]: {
                            target: Header.Visible.NO,
                            actions: [Header.Operation.HIDE]
                        }
                    }
                },
                [Header.Visible.NO]:{
                    on:{
                        [Header.Event.ONSHOW]: {
                            target: Header.Visible.YES,
                            actions: [Header.Operation.SHOW]
                        }
                    }
                }
            }
        },
        [Header.Attribute.ORIENTATION]:{
            initial: Header.Orientation.HORIZONTAL,
            states: {
                [Header.Orientation.HORIZONTAL]: {
                    on: {

                    }
                },
                [Header.Orientation.VERTICAL]: {
                    on: {

                    }
                }
            }
        },
        [Header.Attribute.STATE]: {
            initial: Header.State.UNPINNED,
            states: {
                [Header.State.UNPINNED]: {
                    on: {
                        [Header.Event.ONPIN]: {
                            target: Header.State.PINNED,
                            actions: [Header.Operation.PIN]
                        }
                    }
                },
                [Header.State.PINNED]: {
                    on: {
                        [Header.Event.ONUNPIN]: {
                            target: Header.State.UNPINNED,
                            actions: [Header.Operation.UNPIN]
                        }
                    }
                }
            }
        },
        [Header.Attribute.WINDOW]:{ 
            initial: Header.Window.NORMAL,
            states: {
                [Header.Window.NORMAL]: {
                    on: {
                        [Header.Event.ONMINIMIZE]: {
                            target: Header.Window.MINIMIZED,
                            actions: [Header.Operation.MINIMIZE]
                        },
                        [Header.Event.ONMAXIMIZE]: {
                            target: Header.Window.MAXIMIZED,
                            actions: [Header.Operation.MAXIMIZE]
                        },
                        [Header.Event.ONCLOSE]: {
                            target: Header.Window.CLOSED,
                            actions: [Header.Operation.CLOSE]
                        }
                    }
                },
                [Header.Window.MINIMIZED]: {
                    on: {
                        [Header.Event.ONRESTORE]: {
                            target: Header.Window.NORMAL,
                            actions: [Header.Operation.RESTORE]
                        },
                        [Header.Event.ONCLOSE]: {
                            target: Header.Window.CLOSED,
                            actions: [Header.Operation.CLOSE]
                        }
                    }
                },
                [Header.Window.MAXIMIZED]: {
                    on: {
                        [Header.Event.ONMINIMIZE]: {
                            target: Header.Window.MINIMIZED,
                            actions: [Header.Operation.MINIMIZE]
                        },
                        [Header.Event.ONRESTORE]: {
                            target: Header.Window.NORMAL,
                            actions: [Header.Operation.RESTORE]
                        },
                        [Header.Event.ONCLOSE]: {
                            target: Header.Window.CLOSED,
                            actions: [Header.Operation.CLOSE]
                        }
                    }
                },
                [Header.Window.CLOSED]: {
                    on:{}
                }
            } 
        }
    },
    actions: {
        [Header.Operation.HIDE]:(context, event) => { console.log('hide') },
        [Header.Operation.SHOW]:(context, event) => { console.log('show') },
        [Header.Operation.PIN]:(context, event) => { console.log('pin') },
        [Header.Operation.UNPIN]:(context, event) => { console.log('unpin') },
        [Header.Operation.MINIMIZE]:(context, event) => { console.log('minimize') },
        [Header.Operation.MAXIMIZE]:(context, event) => { console.log('maximize') },
        [Header.Operation.RESTORE]:(context, event) => { console.log('restore') },
        [Header.Operation.CLOSE]:(context, event) => { console.log('closed') }
    }
}