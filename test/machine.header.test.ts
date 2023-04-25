import { Machine } from "../src/machine.js";

// Test Case: Header Component
import { Configuration } from "../src/bar.header.config.js";
import { Attribute, Attributes } from "../src/bar.header.metadata.js";
import { Visible } from "../src/bar.header.metadata.js";
import { State } from "../src/bar.header.metadata.js";
import { Window } from "../src/bar.header.metadata.js";
import { Event, Events } from "../src/bar.header.metadata.js";
import * as Component from "../src/bar.header.metadata.js";

describe("given Machine imported", () => {
  it("then Machine exist", () => {
    expect(Machine).toBeDefined();
  });
  describe("when new Machine()", () => {
    let machine: Machine<Attributes, Events>;
    beforeEach(() => {
      machine = new Machine<Attributes, Events>(Configuration);
    });
    it("then configuration should equal Configuration", () => {
      expect(machine.configuration).toEqual(Configuration);
    });
    it("and initialSates should not be empty", () => {
      expect(machine.defaults).not.toBe([]);
    });
    describe("given initialStates is not empty", () => {
      it("then initialStates should contain entry for Attribute.VISIBLE", () => {
        expect(
          machine.defaults.find((attribute) => attribute[Attribute.VISIBLE])
        ).toBeDefined();
      });
      it("then initialStates should contain entry for Attribute.ORIENTATION", () => {
        expect(
          machine.defaults.find((attribute) => attribute[Attribute.ORIENTATION])
        ).toBeDefined();
      });
      it("then initialStates should contain entry for Attribute.STATE", () => {
        expect(
          machine.defaults.find((attribute) => attribute[Attribute.STATE])
        ).toBeDefined();
      });
      it("then initialStates should contain entry for Attribute.WINDOW", () => {
        expect(
          machine.defaults.find((attribute) => attribute[Attribute.WINDOW])
        ).toBeDefined();
      });
      describe("given Attribute.VISIBLE entry in initialStates exist", () => {
        it("then Attribute.VISIBLE should equals Configuration.states[Attribute.VISIBLE]", () => {
          expect(
            machine.defaults.find(
              (attribute) => attribute[Attribute.VISIBLE]
            )?.[Attribute.VISIBLE]
          ).toBe(Configuration.states[Attribute.VISIBLE]?.initial);
        });
        describe("when send(Event.ONHIDE)", () => {
          beforeEach(() => {
            machine.trigger(Event.ONHIDE);
          });
          it("then state[Attribute.VISIBLE] should be Visible.NO", () => {
            expect(machine.state[Attribute.VISIBLE]).toBe(Visible.NO);
          });
          describe("When send(Event.ONSHOW)", () => {
            beforeEach(() => {
              machine.trigger(Event.ONSHOW);
            });
            it("then state[Attribute.VISIBLE] should be Visible.YES", () => {
              expect(machine.state[Attribute.VISIBLE]).toBe(Visible.YES);
            });
          });
        });
      });
      describe("given Attribute.ORIENTATION entry in initialStates exist", () => {
        it("then Attribute.ORIENTATION should equals Configuration.states[Attribute.ORIENTATION]", () => {
          expect(
            machine.defaults.find(
              (attribute) => attribute[Attribute.ORIENTATION]
            )?.[Attribute.ORIENTATION]
          ).toBe(Configuration.states[Attribute.ORIENTATION]?.initial);
        });
      });
      describe("given Attribute.STATE entry in initialStates exist", () => {
        it("then Attribute.STATE should equals Configuration.states[Attribute.STATE]", () => {
          expect(
            machine.defaults.find((attribute) => attribute[Attribute.STATE])?.[
              Attribute.STATE
            ]
          ).toBe(Configuration.states[Attribute.STATE]?.initial);
        });
        describe("when send(Event.ONPIN)", () => {
          let event: Events;
          beforeEach(() => {
            event = Event.ONPIN;
            machine.trigger(Event.ONPIN);
          });
          it("then state[Attribute.STATE] should be State.PINNED", () => {
            expect(machine.state[Attribute.STATE]).toBe(State.PINNED);
          });
          describe("when send(Event.ONUNPIN) ", () => {
            beforeEach(() => {
              machine.trigger(Event.ONUNPIN);
            });
            it("then state[Attribute.STATE] should be State.UNPINNED", () => {
              expect(machine.state[Attribute.STATE]).toBe(State.UNPINNED);
            });
          });
        });
      });
      describe("given Attribute.WINDOW entry in initialStates exist", () => {
        it("then Attribute.WINDOW should equals Configuration.states[Attribute.WINDOW]", () => {
          expect(
            machine.defaults.find((attribute) => attribute[Attribute.WINDOW])?.[
              Attribute.WINDOW
            ]
          ).toBe(Configuration.states[Attribute.WINDOW]?.initial);
        });
        describe("when send(Event.ONMINIMIZE)", () => {
          beforeEach(() => {
            machine.trigger(Event.ONMINIMIZE);
          });
          it("Then state[Header.Attribute.WINDOW] should be Header.Window.MINIMIZED", () => {
            expect(machine.state[Attribute.WINDOW]).toBe(Window.MINIMIZED);
          });
          describe("When send(Header.Event.ONMAXIMIZE)", () => {
            beforeEach(() => {
              machine.trigger(Event.ONMAXIMIZE);
            });
            it("Then state[Header.Attribute.WINDOW] should not be Header.Window.MAXIMIZED", () => {
              expect(machine.state[Attribute.WINDOW]).not.toBe(
                Window.MAXIMIZED
              );
            });
          });
          describe("When send(Header.Event.ONRESTORE)", () => {
            beforeEach(() => {
              machine.trigger(Event.ONRESTORE);
            });
            it("Then state[Header.Attribute.WINDOW] should be Header.Window.NORMAL", () => {
              expect(machine.state[Attribute.WINDOW]).toBe(Window.NORMAL);
            });
          });
          describe("When send(Header.Event.ONCLOSE)", () => {
            beforeEach(() => {
              machine.trigger(Event.ONCLOSE);
            });
            it("Then state[Header.Attribute.WINDOW] should be Header.Window.CLOSED", () => {
              expect(machine.state[Attribute.WINDOW]).toBe(Window.CLOSED);
            });
          });
        });
        describe("when send(Event.ONMAXIMIZE)", () => {
          beforeEach(() => {
            machine.trigger(Event.ONMAXIMIZE);
          });
          it("Then state[Header.Attribute.WINDOW] should be Header.Window.MAXIMIZED", () => {
            expect(machine.state[Attribute.WINDOW]).toBe(Window.MAXIMIZED);
          });
          describe("When send(Header.Event.ONMINIMIZE)", () => {
            beforeEach(() => {
              machine.trigger(Event.ONMINIMIZE);
            });
            it("Then state[Header.Attribute.WINDOW] should be Header.Window.MINIMIZED", () => {
              expect(machine.state[Attribute.WINDOW]).toBe(Window.MINIMIZED);
            });
          });
          describe("When send(Header.Event.ONRESTORE)", () => {
            beforeEach(() => {
              machine.trigger(Event.ONRESTORE);
            });
            it("Then state[Header.Attribute.WINDOW] should be Header.Window.NORMAL", () => {
              expect(machine.state[Attribute.WINDOW]).toBe(Window.NORMAL);
            });
          });
          describe("When send(Header.Event.ONCLOSE)", () => {
            beforeEach(() => {
              machine.trigger(Event.ONCLOSE);
            });
            it("Then state[Header.Attribute.WINDOW] should be Header.Window.CLOSED", () => {
              expect(machine.state[Attribute.WINDOW]).toBe(Window.CLOSED);
            });
          });
        });
        describe("When send(Event.ONRESTORE)", () => {
          beforeEach(() => {
            machine.trigger(Event.ONRESTORE);
          });
          it("Then state[Attribute.WINDOW] should be Window.NORMAL", () => {
            expect(machine.state[Attribute.WINDOW]).toBe(Window.NORMAL);
          });
          describe("When send(Event.ONMINIMIZE)", () => {
            beforeEach(() => {
              machine.trigger(Event.ONMINIMIZE);
            });
            it("Then state[Attribute.WINDOW] should be Window.MINIMIZED", () => {
              expect(machine.state[Attribute.WINDOW]).toBe(Window.MINIMIZED);
            });
          });
          describe("When send(Event.ONMAXIMIZE)", () => {
            beforeEach(() => {
              machine.trigger(Event.ONMAXIMIZE);
            });
            it("Then state[Attribute.WINDOW] should be Window.MAXIMIZED", () => {
              expect(machine.state[Attribute.WINDOW]).toBe(Window.MAXIMIZED);
            });
          });
          describe("When send(Event.ONCLOSE)", () => {
            beforeEach(() => {
              machine.trigger(Event.ONCLOSE);
            });
            it("Then state[Attribute.WINDOW] should be Window.CLOSED", () => {
              expect(machine.state[Attribute.WINDOW]).toBe(Window.CLOSED);
            });
          });
        });
        describe("When send(Event.ONCLOSE)", () => {
          beforeEach(() => {
            machine.trigger(Event.ONCLOSE);
          });
          it("Then state[Attribute.WINDOW] should be Window.CLOSED", () => {
            expect(machine.state[Attribute.WINDOW]).toBe(Window.CLOSED);
          });
          describe("When send(Event.ONMINIMIZE)", () => {
            beforeEach(() => {
              machine.trigger(Event.ONMINIMIZE);
            });
            it("Then state[Attribute.WINDOW] should not be Window.MINIMIZED", () => {
              expect(machine.state[Attribute.WINDOW]).not.toBe(
                Window.MINIMIZED
              );
            });
          });
          describe("When send(Event.ONMAXIMIZE)", () => {
            beforeEach(() => {
              machine.trigger(Event.ONMAXIMIZE);
            });
            it("Then state[Attribute.WINDOW] should not be Window.MAXIMIZED", () => {
              expect(machine.state[Attribute.WINDOW]).not.toBe(
                Window.MAXIMIZED
              );
            });
          });
          describe("When send(Event.ONRESTORE)", () => {
            beforeEach(() => {
              machine.trigger(Event.ONMAXIMIZE);
            });
            it("Then state[Attribute.WINDOW] should not be Window.NORMAL", () => {
              expect(machine.state[Attribute.WINDOW]).not.toBe(Window.NORMAL);
            });
          });
        });
      });
    });
  });
});
