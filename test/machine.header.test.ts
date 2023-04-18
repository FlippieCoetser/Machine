import { Machine } from  "../src/machine.js"

// Test Case: Header Component
import { Configuration } from "../src/bar.header.config.js"
import * as Component from "../src/bar.header.metadata.js";

describe('given Machine imported', () => {
    it('then Machine exist', () => {
        expect(Machine).toBeDefined()
    })
    describe('when new Machine()', () => {
        let machine: Machine<
            Component.Attribute, 
            Component.States, 
            Component.Event>;
        beforeEach(() => {
            machine = new Machine<
                Component.Attribute, 
                Component.States, 
                Component.Event>(Configuration)
        })
        it('then configuration should equal Configuration', () => {
            expect(machine.configuration).toEqual(Configuration)
        })
        it('and initialSates should not be empty', () => {
            expect(machine.defaults).not.toBe([])
        })
        describe('given initialStates is not empty', () => {
            it('then initialStates should contain entry for Attribute.VISIBLE', () => {
                expect(machine
                    .defaults
                    .find(attribute => 
                        attribute[Component.Attribute.VISIBLE]))
                .toBeDefined()
            })
            it('then initialStates should contain entry for Attribute.ORIENTATION', () => {
                expect(machine
                    .defaults
                    .find(attribute => 
                        attribute[Component.Attribute.ORIENTATION]))
                .toBeDefined()
            })
            it('then initialStates should contain entry for Attribute.STATE', () => {
                expect(machine
                    .defaults
                    .find(attribute => 
                        attribute[Component.Attribute.STATE]))
                .toBeDefined()
            })
            it('then initialStates should contain entry for Attribute.WINDOW', () => {
                expect(machine
                    .defaults
                    .find(attribute => 
                        attribute[Component.Attribute.WINDOW]))
                .toBeDefined()
            })
            describe('given Attribute.VISIBLE entry in initialStates exist', () => {
                it('then Attribute.VISIBLE should equals Configuration.states[Attribute.VISIBLE]', () => {
                    expect(machine
                        .defaults
                        .find(attribute => 
                            attribute[Component.Attribute.VISIBLE])
                        ?.[Component.Attribute.VISIBLE])
                    .toBe(Configuration
                        .states[Component.Attribute.VISIBLE]
                        ?.initial )
                })
                describe('when send(Event.ONHIDE)', () => {
                    beforeEach(() => {
                        machine.trigger(Component.Event.ONHIDE)
                    })
                    it('then state[Attribute.VISIBLE] should be Visible.NO', () => {
                        expect(machine.state[Component.Attribute.VISIBLE])
                        .toBe(Component.Visible.NO)
                    })
                    describe('When send(Event.ONSHOW)', () => {
                        beforeEach(() => {
                            machine.trigger(Component.Event.ONSHOW)
                        })
                        it('then state[Attribute.VISIBLE] should be Visible.YES', () => {
                            expect(machine.state[Component.Attribute.VISIBLE])
                            .toBe(Component.Visible.YES)
                        })
                    })
                })
            })
            describe('given Attribute.ORIENTATION entry in initialStates exist', () => {
                it('then Attribute.ORIENTATION should equals Configuration.states[Attribute.ORIENTATION]', () => {
                    expect(machine
                        .defaults
                        .find(attribute => 
                            attribute[Component.Attribute.ORIENTATION])
                        ?.[Component.Attribute.ORIENTATION])
                    .toBe(Configuration
                        .states[Component.Attribute.ORIENTATION]
                        ?.initial )
                })
            })
            describe('given Attribute.STATE entry in initialStates exist', () => {
                it('then Attribute.STATE should equals Configuration.states[Attribute.STATE]', () => {
                    expect(machine
                        .defaults
                        .find(attribute => 
                            attribute[Component.Attribute.STATE])
                        ?.[Component.Attribute.STATE])
                    .toBe(Configuration
                        .states[Component.Attribute.STATE]
                        ?.initial )
                })
                describe('when send(Event.ONPIN)', () => {
                    let event: Component.Event;
                    beforeEach(() => {
                        event = Component.Event.ONPIN 
                        machine.trigger(Component.Event.ONPIN)
                    })
                    it('then state[Attribute.STATE] should be State.PINNED', () => {
                        expect(machine.state[Component.Attribute.STATE])
                        .toBe(Component.State.PINNED)
                    })
                    describe('when send(Event.ONUNPIN) ', () => {
                        beforeEach(() => {
                            machine.trigger(Component.Event.ONUNPIN)
                        })
                        it('then state[Attribute.STATE] should be State.UNPINNED', () => {
                            expect(machine.state[Component.Attribute.STATE])
                            .toBe(Component.State.UNPINNED)
                        })  
                    })
                })

            })
            describe('given Attribute.WINDOW entry in initialStates exist', () => {
                it('then Attribute.WINDOW should equals Configuration.states[Attribute.WINDOW]', () => {
                    expect(machine
                        .defaults
                        .find(attribute => 
                            attribute[Component.Attribute.WINDOW])
                        ?.[Component.Attribute.WINDOW])
                    .toBe(Configuration
                        .states[Component.Attribute.WINDOW]
                        ?.initial )
                })
                describe('when send(Event.ONMINIMIZE)', () => {
                    beforeEach(() => {
                        machine.trigger(Component.Event.ONMINIMIZE)
                    })
                    it('Then state[Header.Attribute.WINDOW] should be Header.Window.MINIMIZED', () => {
                        expect(machine.state[Component.Attribute.WINDOW]).toBe(Component.Window.MINIMIZED)
                    })
                    describe('When send(Header.Event.ONMAXIMIZE)', () => {
                        beforeEach(() => {
                            machine.trigger(Component.Event.ONMAXIMIZE)
                        })
                        it('Then state[Header.Attribute.WINDOW] should not be Header.Window.MAXIMIZED', () => {
                            expect(machine.state[Component.Attribute.WINDOW]).not.toBe(Component.Window.MAXIMIZED)
                        })
                    })
                    describe('When send(Header.Event.ONRESTORE)', () => {
                        beforeEach(() => {
                            machine.trigger(Component.Event.ONRESTORE)
                        })
                        it('Then state[Header.Attribute.WINDOW] should be Header.Window.NORMAL', () => {
                            expect(machine.state[Component.Attribute.WINDOW]).toBe(Component.Window.NORMAL)
                        })
                    })
                    describe('When send(Header.Event.ONCLOSE)', () => {
                        beforeEach(() => {
                            machine.trigger(Component.Event.ONCLOSE)
                        })
                        it('Then state[Header.Attribute.WINDOW] should be Header.Window.CLOSED', () => {
                            expect(machine.state[Component.Attribute.WINDOW]).toBe(Component.Window.CLOSED)
                        })
                    })
                })
                describe('when send(Event.ONMAXIMIZE)', () => {
                    beforeEach(() => {
                        machine.trigger(Component.Event.ONMAXIMIZE)
                    })
                    it('Then state[Header.Attribute.WINDOW] should be Header.Window.MAXIMIZED', () => {
                        expect(machine.state[Component.Attribute.WINDOW]).toBe(Component.Window.MAXIMIZED)
                    })
                    describe('When send(Header.Event.ONMINIMIZE)', () => {
                        beforeEach(() => {
                            machine.trigger(Component.Event.ONMINIMIZE)
                        })
                        it('Then state[Header.Attribute.WINDOW] should be Header.Window.MINIMIZED', () => {
                            expect(machine.state[Component.Attribute.WINDOW]).toBe(Component.Window.MINIMIZED)
                        })
                    })
                    describe('When send(Header.Event.ONRESTORE)', () => {
                        beforeEach(() => {
                            machine.trigger(Component.Event.ONRESTORE)
                        })
                        it('Then state[Header.Attribute.WINDOW] should be Header.Window.NORMAL', () => {
                            expect(machine.state[Component.Attribute.WINDOW]).toBe(Component.Window.NORMAL)
                        })
                    })
                    describe('When send(Header.Event.ONCLOSE)', () => {
                        beforeEach(() => {
                            machine.trigger(Component.Event.ONCLOSE)
                        })
                        it('Then state[Header.Attribute.WINDOW] should be Header.Window.CLOSED', () => {
                            expect(machine.state[Component.Attribute.WINDOW]).toBe(Component.Window.CLOSED)
                        })
                    })
                })
                describe('When send(Event.ONRESTORE)', () => {
                    beforeEach(() => {
                        machine.trigger(Component.Event.ONRESTORE)
                    })
                    it('Then state[Attribute.WINDOW] should be Window.NORMAL', () => {
                        expect(machine.state[Component.Attribute.WINDOW]).toBe(Component.Window.NORMAL)
                    })
                    describe('When send(Event.ONMINIMIZE)', () => {
                        beforeEach(() => {
                            machine.trigger(Component.Event.ONMINIMIZE)
                        })
                        it('Then state[Attribute.WINDOW] should be Window.MINIMIZED', () => {
                            expect(machine.state[Component.Attribute.WINDOW]).toBe(Component.Window.MINIMIZED)
                        })
                    })
                    describe('When send(Event.ONMAXIMIZE)', () => {
                        beforeEach(() => {
                            machine.trigger(Component.Event.ONMAXIMIZE)
                        })
                        it('Then state[Attribute.WINDOW] should be Window.MAXIMIZED', () => {
                            expect(machine.state[Component.Attribute.WINDOW]).toBe(Component.Window.MAXIMIZED)
                        })
                    })
                    describe('When send(Event.ONCLOSE)', () => {
                        beforeEach(() => {
                            machine.trigger(Component.Event.ONCLOSE)
                        })
                        it('Then state[Attribute.WINDOW] should be Window.CLOSED', () => {
                            expect(machine.state[Component.Attribute.WINDOW]).toBe(Component.Window.CLOSED)
                        })
                    })
                })
                describe('When send(Event.ONCLOSE)', () => {
                    beforeEach(() => {
                        machine.trigger(Component.Event.ONCLOSE)
                    })
                    it('Then state[Attribute.WINDOW] should be Window.CLOSED', () => {
                        expect(machine.state[Component.Attribute.WINDOW]).toBe(Component.Window.CLOSED)
                    })
                    describe('When send(Event.ONMINIMIZE)', () => {
                        beforeEach(() => {
                            machine.trigger(Component.Event.ONMINIMIZE)
                        })
                        it('Then state[Attribute.WINDOW] should not be Window.MINIMIZED', () => {
                            expect(machine.state[Component.Attribute.WINDOW]).not.toBe(Component.Window.MINIMIZED)
                        })
                    })
                    describe('When send(Event.ONMAXIMIZE)', () => {
                        beforeEach(() => {
                            machine.trigger(Component.Event.ONMAXIMIZE)
                        })
                        it('Then state[Attribute.WINDOW] should not be Window.MAXIMIZED', () => {
                            expect(machine.state[Component.Attribute.WINDOW]).not.toBe(Component.Window.MAXIMIZED)
                        })
                    })
                    describe('When send(Event.ONRESTORE)', () => {
                        beforeEach(() => {
                            machine.trigger(Component.Event.ONMAXIMIZE)
                        })
                        it('Then state[Attribute.WINDOW] should not be Window.NORMAL', () => {
                            expect(machine.state[Component.Attribute.WINDOW]).not.toBe(Component.Window.NORMAL)
                        })
                    })
                })
            })  
        })
    })
})
