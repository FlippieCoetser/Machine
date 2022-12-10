/**
* @module Pin
*/

/**
 * HTML Attributes available to set
 * @category Metadata: Attributes
 */
export enum Attribute {
    TEMPLATE = 'templateId',
    VISIBLE = 'visible',
    STATE = 'state'
}

/**
 * Attribute only visible when set to NO
 * @category Metadata: State
 */
export enum Visible {
    NO = 'no',
    YES = 'yes'
}

/**
* @category Metadata: State
*/
export enum State {
    ON = 'on',
    OFF = 'off'
}

/**
* @category Metadata: State
*/
export type States = State | Visible

/**
* @category Metadata: Behavior
*/
export enum Event {
    ONHIDE = 'onhide',
    ONSHOW = 'onshow', 
    ONON = 'onon', 
    ONOFF = 'onoff',
    ONTOGGLE = 'ontoggle'
}

/**
* @category Metadata: Behavior
*/
export enum Operation {
    ON = 'on', 
    OFF = 'off', 
    TOGGLE = 'toggle', 
    SHOW = 'show',
    HIDE = 'hide'
}

/**
* @category Metadata: Behavior
*/
export enum Gesture {
    CLICK = 'click'
}