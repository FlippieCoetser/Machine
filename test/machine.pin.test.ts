import { Machine } from "../src/machine.js";

// Test Case: Pin
import { Configuration } from "../src/button.pin.config.js";
import { Attribute, Attributes } from "../src/button.pin.metadata.js";
import { Visible } from "../src/button.pin.metadata.js";
import { State } from "../src/button.pin.metadata.js";
import { Event, Events } from "../src/button.pin.metadata.js";

describe("given Machine imported", () => {
  it("then Machine exist", () => {
    expect(Machine).toBeDefined();
  });
  describe("When new Machine()", () => {
    let machine: Machine<Attributes, Events>;
    beforeEach(() => {
      machine = new Machine<Attributes, Events>(Configuration);
    });
    it("then configuration should exist", () => {
      expect(machine.configuration).toBeDefined();
    });
    it("and configuration should be Configuration", () => {
      expect(machine.configuration).toBe(Configuration);
    });
    it("and attributes should exist", () => {
      expect(machine.attributes).toBeDefined();
    });
    it("and attributes should equal keys in configuration.states", () => {
      const attributes = Object.keys(machine.configuration.states);
      expect(machine.attributes).toEqual(attributes);
    });
    it("and defaults should exist", () => {
      expect(machine.defaults).toBeDefined();
    });
    it("and defaults should not be empty", () => {
      expect(machine.defaults).not.toBe([]);
    });
    it("and state should exist", () => {
      expect(machine.state).toBeDefined();
    });
    describe("given state exist", () => {
      let state;
      beforeEach(() => {
        state = machine.state;
      });
      it("then state[Attribute.VISIBLE] should exist", () => {
        expect(state[Attribute.VISIBLE]).toBeDefined();
      });
      it("and state[Attribute.STATE] should exist", () => {
        expect(state[Attribute.STATE]).toBeDefined();
      });
      describe("given state[Attribute.VISIBLE] exist", () => {
        it("then state[Attribute.VISIBLE] should equals Configuration.states[Attribute.VISIBLE].initial", () => {
          expect(
            machine.defaults.find(
              (attribute) => attribute[Attribute.VISIBLE]
            )?.[Attribute.VISIBLE]
          ).toBe(Configuration.states[Attribute.VISIBLE]?.initial);
        });
        describe("and Attribute.VISIBLE Event listeners have been registered", () => {
          let onhide, onshow;
          beforeEach(() => {
            onhide = jasmine.createSpy("show");
            onshow = jasmine.createSpy("show");
            machine.on(Event.ONHIDE, onhide);
            machine.on(Event.ONSHOW, onshow);
          });
          describe("when trigger(Event.ONHIDE)", () => {
            beforeEach(() => {
              machine.trigger(Event.ONHIDE);
            });
            it("then state[Attribute.VISIBLE] should be Visible.NO", () => {
              expect(machine.state[Attribute.VISIBLE]).toBe(Visible.NO);
            });
            it("and Event.ONHIDE listener should be called once", () => {
              expect(onhide).toHaveBeenCalledTimes(1);
            });
            it("and Event.ONSHOW listener should not be called ", () => {
              expect(onshow).not.toHaveBeenCalled();
            });
            describe("when trigger(Event.ONSHOW)", () => {
              beforeEach(() => {
                machine.trigger(Event.ONSHOW);
              });
              it("then state[Attribute.VISIBLE] should be Visible.YES", () => {
                expect(machine.state[Attribute.VISIBLE]).toBe(Visible.YES);
              });
              it("then Event.ONHIDE listener should be called once", () => {
                expect(onhide).toHaveBeenCalledTimes(1);
              });
              it("then Event.ONSHOW listener should be called once ", () => {
                expect(onshow).toHaveBeenCalledTimes(1);
              });
            });
          });
          describe("when trigger(Event.ONSHOW)", () => {
            beforeEach(() => {
              machine.trigger(Event.ONSHOW);
            });
            it("then state[Attribute.VISIBLE] should be Visible.YES", () => {
              expect(machine.state[Attribute.VISIBLE]).toBe(Visible.YES);
            });
            it("and Event.ONHIDE listener should not be called", () => {
              expect(onhide).not.toHaveBeenCalled();
            });
            it("then Event.ONSHOW listener should not be called", () => {
              expect(onshow).not.toHaveBeenCalled();
            });
            describe("when trigger(Event.ONHIDE)", () => {
              beforeEach(() => {
                machine.trigger(Event.ONHIDE);
              });
              it("then state[Attribute.VISIBLE] should be Visible.NO", () => {
                expect(machine.state[Attribute.VISIBLE]).toBe(Visible.NO);
              });
              it("and Event.ONHIDE listener should be called once", () => {
                expect(onhide).toHaveBeenCalledTimes(1);
              });
              it("and Event.ONSHOW listener should not be called ", () => {
                expect(onshow).not.toHaveBeenCalled();
              });
            });
          });
        });
      });
      describe("given state[Attribute.STATE] exist", () => {
        it("then state[Attribute.STATE] should equals Configuration.states[Attribute.STATE].initial", () => {
          expect(
            machine.defaults.find((attribute) => attribute[Attribute.STATE])?.[
              Attribute.STATE
            ]
          ).toBe(Configuration.states[Attribute.STATE]?.initial);
        });
        describe("and Attribute.STATE Event listeners have been registered", () => {
          let onon, onoff;
          beforeEach(() => {
            onon = jasmine.createSpy("onon");
            onoff = jasmine.createSpy("onoff");
            machine.on(Event.ONON, onon);
            machine.on(Event.ONOFF, onoff);
          });
          describe("when trigger(Event.ONON)", () => {
            let parameter;
            beforeEach(() => {
              parameter = { value: 1 };
              machine.trigger(Event.ONON, parameter);
            });
            it("then state[Attribute.STATE] should be State.ON", () => {
              expect(machine.state[Attribute.STATE]).toBe(State.ON);
            });
            it("then Event.ONON listener should be called once", () => {
              expect(onon).toHaveBeenCalledTimes(1);
              expect(onon).toHaveBeenCalledWith("on", parameter);
            });
            it("then Event.ONOFF listener should not be called", () => {
              expect(onoff).not.toHaveBeenCalled();
            });
            describe("when trigger(Event.ONON)", () => {
              beforeEach(() => {
                machine.trigger(Event.ONON);
              });
              it("then state[Attribute.STATE] should be State.ON", () => {
                expect(machine.state[Attribute.STATE]).toBe(State.ON);
              });
              it("then Event.ONON listener should be called once", () => {
                expect(onon).toHaveBeenCalledTimes(1);
              });
              it("then Event.ONOFF listener should not be called", () => {
                expect(onoff).not.toHaveBeenCalled();
              });
            });
            describe("when trigger(Event.ONOFF)", () => {
              beforeEach(() => {
                machine.trigger(Event.ONOFF);
              });
              it("then state[Attribute.STATE] should be State.OFF", () => {
                expect(machine.state[Attribute.STATE]).toBe(State.OFF);
              });
              it("and Event.ONON listener should be called once", () => {
                expect(onon).toHaveBeenCalledTimes(1);
              });
              it("then Event.ONOFF listener should not have been called", () => {
                expect(onoff).toHaveBeenCalledTimes(1);
              });
            });
            describe("when trigger(Event.ONTOGGLE", () => {
              beforeEach(() => {
                machine.trigger(Event.ONTOGGLE);
              });
              it("then state[Attribute.STATE] should be State.OFF", () => {
                expect(machine.state[Attribute.STATE]).toBe(State.OFF);
              });
              it("and Event.ONON listeners should be called once", () => {
                expect(onon).toHaveBeenCalledTimes(1);
              });
              it("and Event.ONOFF listeners should be called once", () => {
                expect(onoff).toHaveBeenCalledTimes(1);
              });
            });
          });
          describe("when trigger(Event.ONOFF)", () => {
            beforeEach(() => {
              machine.trigger(Event.ONOFF);
            });
            it("then state[Attribute.STATE] should be State.OFF", () => {
              expect(machine.state[Attribute.STATE]).toBe(State.OFF);
            });
            it("and Event.ONON listener should not be called", () => {
              expect(onon).not.toHaveBeenCalled();
            });
            it("then Event.ONOFF listener should not be called", () => {
              expect(onoff).not.toHaveBeenCalled();
            });
            describe("when trigger(Event.ONON)", () => {
              beforeEach(() => {
                machine.trigger(Event.ONON);
              });
              it("then state[Attribute.STATE] should be State.ON", () => {
                expect(machine.state[Attribute.STATE]).toBe(State.ON);
              });
              it("then Event.ONON listener should be called once", () => {
                expect(onon).toHaveBeenCalledTimes(1);
              });
              it("then Event.ONOFF listener should not be called", () => {
                expect(onoff).not.toHaveBeenCalled();
              });
            });
            describe("when trigger(Event.ONOFF)", () => {
              beforeEach(() => {
                machine.trigger(Event.ONOFF);
              });
              it("then state[Attribute.STATE] should be State.OFF", () => {
                expect(machine.state[Attribute.STATE]).toBe(State.OFF);
              });
              it("then Event.ONON listener should be not be called", () => {
                expect(onon).not.toHaveBeenCalled();
              });
              it("then Event.ONOFF listener should not be called", () => {
                expect(onoff).not.toHaveBeenCalled();
              });
            });
            describe("when trigger(Event.ONTOGGLE", () => {
              beforeEach(() => {
                machine.trigger(Event.ONTOGGLE);
              });
              it("then state[Attribute.STATE] should be State.ON", () => {
                expect(machine.state[Attribute.STATE]).toBe(State.ON);
              });
              it("then Event.ONON listener should be called once", () => {
                expect(onon).toHaveBeenCalledTimes(1);
              });
              it("then Event.ONOFF listener should not be called", () => {
                expect(onoff).not.toHaveBeenCalled();
              });
            });
          });
          describe("when trigger(Event.ONTOGGLE", () => {
            beforeEach(() => {
              machine.trigger(Event.ONTOGGLE);
            });
            it("then state[Attribute.STATE] should be State.ON", () => {
              expect(machine.state[Attribute.STATE]).toBe(State.ON);
            });
            it("then Event.ONON listener should be called once", () => {
              expect(onon).toHaveBeenCalledTimes(1);
            });
            it("then Event.ONOFF listener should not be called", () => {
              expect(onoff).not.toHaveBeenCalled();
            });
            describe("when trigger(Event.ONON)", () => {
              beforeEach(() => {
                machine.trigger(Event.ONON);
              });
              it("then state[Attribute.STATE] should be State.ON", () => {
                expect(machine.state[Attribute.STATE]).toBe(State.ON);
              });
              it("and Event.ONON listener should be called once", () => {
                expect(onon).toHaveBeenCalledTimes(1);
              });
              it("then Event.ONOFF listener should not be called", () => {
                expect(onoff).not.toHaveBeenCalled();
              });
            });
            describe("when trigger(Event.ONOFF)", () => {
              beforeEach(() => {
                machine.trigger(Event.ONOFF);
              });
              it("then state[Attribute.STATE] should be State.OFF", () => {
                expect(machine.state[Attribute.STATE]).toBe(State.OFF);
              });
              it("and Event.ONON listener should be called once", () => {
                expect(onon).toHaveBeenCalledTimes(1);
              });
              it("then Event.ONOFF listener should not be called", () => {
                expect(onoff).toHaveBeenCalledTimes(1);
              });
            });
            describe("when trigger(Event.ONTOGGLE", () => {
              beforeEach(() => {
                machine.trigger(Event.ONTOGGLE);
              });
              it("then state[Attribute.STATE] should be State.OFF", () => {
                expect(machine.state[Attribute.STATE]).toBe(State.OFF);
              });
              it("and Event.ONON listener should be called once", () => {
                expect(onon).toHaveBeenCalledTimes(1);
              });
              it("then Event.ONOFF listener should be called once", () => {
                expect(onoff).toHaveBeenCalledTimes(1);
              });
            });
          });
        });
      });
    });
  });
});
