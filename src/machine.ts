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

export type IValue<
    Attributes extends string, 
    States extends string> = {
        [key in Attributes]: States;
    }

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
    
    private initialize = () => {
        this._loadState()
        this._cacheState()
    }
    private _loadState = (): IValue<Attributes, States> => 
        this._state = this._transformDefaults()

    private _cacheState = () => { 
        this._cache = this._transformDefaults()
    }

    private _isValidEvent = (event: Events): boolean => 
        this.events.find(item => item.event[event]) !== undefined
    
    private _target = (event: Events) =>
        this.events.find(item => item.event[event])

    private _targetAttribute = (event: Events) =>
        this._target(event)!.attribute
    
    private _targetState = (event: Events) =>
        this._target(event)?.event[event].target

    // helper functions to transform and merge an Array into an Object
    private _mergeObjects = (previous, current) => 
        Object.assign(previous, current)

    private _transformArrayToObject = (): IValue<Attributes, States> =>
        this.defaults.reduce(this._mergeObjects,{})
    
    private _transformDefaults = ():  IValue<Attributes, States> => 
        this._transformArrayToObject()

    private _updateState = (event: Events) => 
        (this.value[this._targetAttribute(event)] = this._targetState(event))

    private _updateCache = (event) => {
        (this._cache[this._targetAttribute(event)] = this._targetState(event)) 
    } 
        
    private _getEvent = (attribute) => ({
        attribute: attribute,
        event: this
            .configuration
            .states[attribute]
            .states[this.value[attribute]]
            .on})
    
    private _getEvents = (targetEvent) => 
        this.attributes
            .map(attribute => 
                this.configuration
                    .states[attribute]
                    .states[this.value[attribute]]
                    .on)
            .find(item => item[targetEvent])
            ?.[targetEvent]
    
    private _executeActions = (event: Events,...args) => {
        const events = this._getEvents(event)
        events.actions?.forEach(item => 
                this.configuration
                    .actions[item](this, events.target, ...args))
        }

    private before = (event: Events) => {
    }
    private after = (event: Events) => {
    }

    get state() {
        return this._state
    }

    get value():IValue<Attributes, States> {
        return this._state
    }
    get attributes() { 
        return Object.keys(this.configuration.states)
    }
    get events() {
        return this
            .attributes.map(this._getEvent)
    }
    get defaults() {
        return this
            .attributes
            .map((attribute) => 
                ({[attribute]: this.configuration.states[attribute]?.initial}))
    }
    get cache() {
        return this._cache
    }
    public trigger = (event: Events, ...args) => { 
        const isValid = this._isValidEvent(event)
        if(isValid) {
            this.before(event)
            this._updateCache(event);
            this._executeActions(event, ...args);
            this._updateState(event);
            this.after(event)
            return true
        }
        return false
    }
}