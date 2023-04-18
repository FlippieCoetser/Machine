/**
* Finite State Machine add on for Web Components
* @module Machine
*/

import { Event as Emitter } from "@browser-modules/events"

export interface IConfiguration<
    Attributes extends string, 
    States extends string,
    Events extends string> {
    type: string
    states: {
        [attribute in Attributes]?: {
            initial?: string
            states: {
                [state in States]?: {
                    on: {
                        [event in Events]?: {
                            target: States,
                            actions?: any[]
                        }
                    }
                }
            }
        }
    }
    actions?: any
    gestures?: any
}

export type IValue<Attributes extends string, States extends string> = {[key in Attributes]: States;}

export class Machine<
    Attributes extends string, 
    States extends string,
    Events extends string> extends Emitter {

    private _default;
    private _state: IValue<Attributes, States>
    private _cache;

    public configuration: IConfiguration<Attributes, States, Events>

    constructor(configuration: IConfiguration<Attributes,States,Events>) {
        super()
        this.configuration = configuration
        this.initialize()
    }

    private initialize = () => this._initializeState()

    private _initializeState = () => {
        this._state = this._transformDefaults()
    }

    private _isValidEvent = (event: Events): boolean => 
        this.events.find(item => item.event[event]) !== undefined
    
    private _target = (event: Events) =>
        this.events.find(item => item.event[event])

    private _targetAttribute = (event: Events) =>
        this._target(event)?.attribute

    private _targetState = (event: Events) =>
        this._target(event)?.event[event].target

    // helper functions to transform and merge an Array into an Object
    private _mergeObjects = (previous, current) => 
        Object.assign(previous, current)

    private _transformDefaults = ()   => 
        this.defaults.reduce(this._mergeObjects,{})

    private _updateState = (event: Events) => 
        this.state[this._targetAttribute(event)] = this._targetState(event)

    private _getEvents = (attribute) => ({
        attribute: attribute,
        event: this
            .configuration
            .states[attribute]
            .states[this.state[attribute]]
            .on})

    private _getEventConfiguration = (event) => 
        this.attributes
            .map(attribute => 
                this.configuration
                    .states[attribute]
                    .states[this.state[attribute]]
                    .on)
            .find(item => item[event])
            ?.[event]

    private _invokeActions = (actions, state, ...args) => 
        actions.forEach(action => 
            this.configuration
                .actions[action](this, state, ...args))

    private before = (event: Events) => {
    }
    private after = (event: Events) => {
    }

    get state() {
        return this._state
    }

    get attributes() { 
        return Object.keys(this.configuration.states)
    }
    get events() {
        return this
            .attributes.map(this._getEvents)
    }
    get defaults(): any[] {
        return this
            .attributes
            .map((attribute) => 
                {
                    let hasInitialState = this.configuration.states[attribute]?.initial
                    if(hasInitialState) {  
                        return {[attribute]: this.configuration.states[attribute]?.initial}
                    }
                })
    }

    public trigger = (event: Events, ...args) => { 
        const isValidEvent = this._isValidEvent(event)

        if(isValidEvent) {
            this.before(event)
            let {actions, target: state} = this._getEventConfiguration(event)
            this._updateState(event);
            this._invokeActions(actions, state, ...args)
            this.after(event)
            return true
        }
        return false
    }
}