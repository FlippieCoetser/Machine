/**
 * HTML Attributes available to set
 * @category Metadata: Attributes
 */
export enum Attribute {
    TEMPLATE = 'templateId',
    VISIBLE = 'visible',
    ORIENTATION = 'orientation',
    STATE = 'state', 
    WINDOW = 'window'
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
export enum Orientation {
    HORIZONTAL = 'horizontal',
    VERTICAL = 'vertical'
}

/**
* @category Metadata: State
*/
export enum State {
    PINNED = 'pinned',
    UNPINNED = 'unpinned'
}

/**
 * @category Metadata: State
 */
export enum Window {
    MINIMIZED = 'minimized',
    MAXIMIZED = 'maximized',
    NORMAL = 'normal',
    CLOSED = 'closed'
}

/**
* @category Metadata: State
*/
export type States = Visible | Orientation | State | Window

/**
* @category Metadata: Behavior
*/
export enum Event {
    ONHIDE = 'onhide',
    ONSHOW = 'onshow',
    ONPIN = 'onpin',
    ONUNPIN = 'onunpin',
    ONMINIMIZE = 'onminimize',
    ONMAXIMIZE = 'onmaximize',
    ONRESTORE = 'onrestore',
    ONCLOSE = 'onclose'
}

/**
* @category Metadata: Behavior
*/
export enum Operation {
    SHOW = 'show',
    HIDE = 'hide',
    PIN = 'pin',
    UNPIN = 'unpin',
    MINIMIZE = 'minimize',
    MAXIMIZE = 'maximize',
    RESTORE = 'restore',
    CLOSE = 'close'
}