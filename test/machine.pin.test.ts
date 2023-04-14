import { Machine } from  "../src/machine.js"

// Test Case: Pin
import { Configuration } from "../src/button.pin.config.js"
import * as Pin from "../src/button.pin.metadata.js";

describe('given Machine imported', () => {
    it('then Machine exist', () => {
        expect(Machine).toBeDefined()
    })
    describe('When new Machine()', () => {
        let machine: Machine<Pin.Attribute,Pin.States,Pin.Event>;
        beforeEach(() => {
            machine = new Machine<Pin.Attribute,Pin.States,Pin.Event>(Configuration)
        })
        it('then configuration should exist', () => {
            expect(machine.configuration).toBeDefined()
        })
        it('and configuration should be Configuration', () => { 
            expect(machine.configuration).toBe(Configuration)
        })
        it('and attributes should exist', () => {
            expect(machine.attributes).toBeDefined()
        })
        it('and attributes should equal keys in configuration.states', () => {
            const attributes = Object.keys(machine.configuration.states)
            expect(machine.attributes).toEqual(attributes)
        })
        it('and defaults should exist', () => {
            expect(machine.defaults).toBeDefined()
        })
        it('and defaults should not be empty', () => {
            expect(machine.defaults).not.toBe([])
        })
        it('and state should exist', () => {
            expect(machine.state).toBeDefined()
        })
        describe('given state exist', () => {
            let state
            beforeEach(() => {
                state = machine.state
            })
            it('then state[Attribute.VISIBLE] should exist', () => {
                expect(state[Pin.Attribute.VISIBLE]).toBeDefined()
            })
            it('and state[Attribute.STATE] should exist', () => {
                expect(state[Pin.Attribute.STATE]).toBeDefined()
            })
            describe('given state[Attribute.VISIBLE] exist', () => {
                it('then state[Attribute.VISIBLE] should equals Configuration.states[Attribute.VISIBLE].initial', () => {
                    expect(machine
                        .defaults
                        .find(attribute => 
                            attribute[Pin.Attribute.VISIBLE])
                        ?.[Pin.Attribute.VISIBLE])
                    .toBe(Configuration
                        .states[Pin.Attribute.VISIBLE]
                        ?.initial )
                })
                describe('and Attribute.VISIBLE Event listeners have been registered', () => {
                    let onhide, onshow;
                    beforeEach(() =>{
                        onhide = jasmine.createSpy('show');
                        onshow = jasmine.createSpy('show');
                        machine.on(Pin.Event.ONHIDE, onhide)
                        machine.on(Pin.Event.ONSHOW, onshow)
                    })
                    describe('when trigger(Event.ONHIDE)', () => {
                        beforeEach(() => {
                            machine.trigger(Pin.Event.ONHIDE)
                        })
                        it('then value[Attribute.VISIBLE] should be Visible.NO', () => {
                            expect(machine.value[Pin.Attribute.VISIBLE])
                            .toBe(Pin.Visible.NO)
                        })
                        it('and Event.ONHIDE listener should be called once', () => {
                            expect(onhide).toHaveBeenCalledTimes(1)
                        })
                        it('and Event.ONSHOW listener should not be called ', () => {
                            expect(onshow).not.toHaveBeenCalled()
                        })
                        describe('when trigger(Event.ONSHOW)', () => {
                            beforeEach(() => {
                                machine.trigger(Pin.Event.ONSHOW)
                            })
                            it('then value[Attribute.VISIBLE] should be Visible.YES', () => {
                                expect(machine.value[Pin.Attribute.VISIBLE])
                                .toBe(Pin.Visible.YES)
                            })
                            it('then Event.ONHIDE listener should be called once', () => {
                                expect(onhide).toHaveBeenCalledTimes(1)
                            })
                            it('then Event.ONSHOW listener should be called once ', () => {
                                expect(onshow).toHaveBeenCalledTimes(1)
                            })
                        })
                    })
                    describe('when trigger(Event.ONSHOW)', () => {
                        beforeEach(() => {
                            machine.trigger(Pin.Event.ONSHOW)
                        })
                        it('then value[Attribute.VISIBLE] should be Visible.YES', () => {
                            expect(machine.value[Pin.Attribute.VISIBLE])
                            .toBe(Pin.Visible.YES)
                        })
                        it('and Event.ONHIDE listener should not be called', () => {
                            expect(onhide).not.toHaveBeenCalled()
                        })
                        it('then Event.ONSHOW listener should not be called', () => {
                            expect(onshow).not.toHaveBeenCalled()
                        })
                        describe('when trigger(Event.ONHIDE)', () => {
                            beforeEach(() => {
                                machine.trigger(Pin.Event.ONHIDE)
                            })
                            it('then value[Attribute.VISIBLE] should be Visible.NO', () => {
                                expect(machine.value[Pin.Attribute.VISIBLE])
                                .toBe(Pin.Visible.NO)
                            })
                            it('and Event.ONHIDE listener should be called once', () => {
                                expect(onhide).toHaveBeenCalledTimes(1)
                            })
                            it('and Event.ONSHOW listener should not be called ', () => {
                                expect(onshow).not.toHaveBeenCalled()
                            })
                        })
                    })
                })
                
            })
            describe('given state[Attribute.STATE] exist', () => {
                it('then state[Attribute.STATE] should equals Configuration.states[Attribute.STATE].initial', () => {
                    expect(machine
                        .defaults
                        .find(attribute => 
                            attribute[Pin.Attribute.STATE])
                        ?.[Pin.Attribute.STATE])
                    .toBe(Configuration
                        .states[Pin.Attribute.STATE]
                        ?.initial )
                })
                describe('and Attribute.STATE Event listeners have been registered', () => {
                    let onon, onoff
                    beforeEach(() =>{
                        onon = jasmine.createSpy('onon');
                        onoff = jasmine.createSpy('onoff');
                        machine.on(Pin.Event.ONON, onon)
                        machine.on(Pin.Event.ONOFF, onoff)
                    })
                    describe('when trigger(Event.ONON)', () => {
                        let parameter
                        beforeEach(() => {
                            parameter = {value: 1}
                            machine.trigger(Pin.Event.ONON, parameter)
                        })
                        it('then value[Attribute.STATE] should be State.ON', () => {
                            expect(machine.value[Pin.Attribute.STATE])
                            .toBe(Pin.State.ON)
                        })
                        it('then Event.ONON listener should be called once',() => {
                            expect(onon).toHaveBeenCalledTimes(1)
                            expect(onon).toHaveBeenCalledWith("on", parameter)
                        })
                        it('then Event.ONOFF listener should not be called', () => {
                            expect(onoff).not.toHaveBeenCalled()
                        })
                        describe('when trigger(Event.ONON)', () => {
                            beforeEach(() => {
                                machine.trigger(Pin.Event.ONON)
                            })
                            it('then value[Attribute.STATE] should be State.ON', () => {
                                expect(machine.value[Pin.Attribute.STATE])
                                .toBe(Pin.State.ON)
                            })
                            it('then Event.ONON listener should be called once',() => {
                                expect(onon).toHaveBeenCalledTimes(1)
                            })
                            it('then Event.ONOFF listener should not be called', () => {
                                expect(onoff).not.toHaveBeenCalled()
                            })
                        })
                        describe('when trigger(Event.ONOFF)', () => {
                            beforeEach(() => {
                                machine.trigger(Pin.Event.ONOFF)
                            })
                            it('then value[Attribute.STATE] should be State.OFF', () => {
                                expect(machine.value[Pin.Attribute.STATE])
                                .toBe(Pin.State.OFF)
                            })
                            it('and Event.ONON listener should be called once', () => {
                                expect(onon).toHaveBeenCalledTimes(1)
                            })
                            it('then Event.ONOFF listener should not have been called', () => {
                                expect(onoff).toHaveBeenCalledTimes(1)
                            })
                        })
                        describe('when trigger(Event.ONTOGGLE', () => {
                            beforeEach(() => {
                                machine.trigger(Pin.Event.ONTOGGLE)
                            })
                            it('then value[Attribute.STATE] should be State.OFF', () => {
                                expect(machine.value[Pin.Attribute.STATE])
                                .toBe(Pin.State.OFF)
                            })
                            it('and Event.ONON listeners should be called once', () => {
                                expect(onon).toHaveBeenCalledTimes(1)
                            })
                            it('and Event.ONOFF listeners should be called once', () => {
                                expect(onoff).toHaveBeenCalledTimes(1)
                            })
                        })
                    })
                    describe('when trigger(Event.ONOFF)', () => {
                        beforeEach(() => {
                            machine.trigger(Pin.Event.ONOFF)
                        })
                        it('then value[Attribute.STATE] should be State.OFF', () => {
                            expect(machine.value[Pin.Attribute.STATE])
                            .toBe(Pin.State.OFF)
                        })
                        it('and Event.ONON listener should not be called', () => {
                            expect(onon).not.toHaveBeenCalled()
                        })
                        it('then Event.ONOFF listener should not be called', () => {
                            expect(onoff).not.toHaveBeenCalled()
                        })
                        describe('when trigger(Event.ONON)', () => {
                            beforeEach(() => {
                                machine.trigger(Pin.Event.ONON)
                            })
                            it('then value[Attribute.STATE] should be State.ON', () => {
                                expect(machine.value[Pin.Attribute.STATE])
                                .toBe(Pin.State.ON)
                            })
                            it('then Event.ONON listener should be called once', () => {
                                expect(onon).toHaveBeenCalledTimes(1)
                            })
                            it('then Event.ONOFF listener should not be called', () => {
                                expect(onoff).not.toHaveBeenCalled()
                            })
                        })
                        describe('when trigger(Event.ONOFF)', () => {
                            beforeEach(() => {
                                machine.trigger(Pin.Event.ONOFF)
                            })
                            it('then value[Attribute.STATE] should be State.OFF', () => {
                                expect(machine.value[Pin.Attribute.STATE])
                                .toBe(Pin.State.OFF)
                            })
                            it('then Event.ONON listener should be not be called', () => {
                                expect(onon).not.toHaveBeenCalled()
                            })
                            it('then Event.ONOFF listener should not be called', () => {
                                expect(onoff).not.toHaveBeenCalled()
                            })

                        })
                        describe('when trigger(Event.ONTOGGLE', () => {
                            beforeEach(() => {
                                machine.trigger(Pin.Event.ONTOGGLE)
                            })
                            it('then value[Attribute.STATE] should be State.ON', () => {
                                expect(machine.value[Pin.Attribute.STATE])
                                .toBe(Pin.State.ON)
                            })
                            it('then Event.ONON listener should be called once', () => {
                                expect(onon).toHaveBeenCalledTimes(1)
                            })
                            it('then Event.ONOFF listener should not be called', () => {
                                expect(onoff).not.toHaveBeenCalled()
                            })
                        })
                    })
                    describe('when trigger(Event.ONTOGGLE', () => {
                        beforeEach(() => {
                            machine.trigger(Pin.Event.ONTOGGLE)
                        })
                        it('then value[Attribute.STATE] should be State.ON', () => {
                            expect(machine.value[Pin.Attribute.STATE])
                            .toBe(Pin.State.ON)
                        })
                        it('then Event.ONON listener should be called once',() => {
                            expect(onon).toHaveBeenCalledTimes(1)
                        })
                        it('then Event.ONOFF listener should not be called', () => {
                            expect(onoff).not.toHaveBeenCalled()
                        })
                        describe('when trigger(Event.ONON)', () => {
                            beforeEach(() => {
                                machine.trigger(Pin.Event.ONON)
                            })
                            it('then value[Attribute.STATE] should be State.ON', () => {
                                expect(machine.value[Pin.Attribute.STATE])
                                .toBe(Pin.State.ON)
                            })
                            it('and Event.ONON listener should be called once', () => {
                                expect(onon).toHaveBeenCalledTimes(1)
                            })
                            it('then Event.ONOFF listener should not be called', () => {
                                expect(onoff).not.toHaveBeenCalled()
                            })
                        })
                        describe('when trigger(Event.ONOFF)', () => {
                            beforeEach(() => {
                                machine.trigger(Pin.Event.ONOFF)
                            })
                            it('then value[Attribute.STATE] should be State.OFF', () => {
                                expect(machine.value[Pin.Attribute.STATE])
                                .toBe(Pin.State.OFF)
                            })
                            it('and Event.ONON listener should be called once', () => {
                                expect(onon).toHaveBeenCalledTimes(1)
                            })
                            it('then Event.ONOFF listener should not be called', () => {
                                expect(onoff).toHaveBeenCalledTimes(1)
                            })
                        })
                        describe('when trigger(Event.ONTOGGLE', () => {
                            beforeEach(() => {
                                machine.trigger(Pin.Event.ONTOGGLE)
                            })
                            it('then value[Attribute.STATE] should be State.OFF', () => {
                                expect(machine.value[Pin.Attribute.STATE])
                                .toBe(Pin.State.OFF)
                            })
                            it('and Event.ONON listener should be called once', () => {
                                expect(onon).toHaveBeenCalledTimes(1)
                            })
                            it('then Event.ONOFF listener should be called once', () => {
                                expect(onoff).toHaveBeenCalledTimes(1)
                            })
                        })
                    })
                })
            })
        })
    })
})
