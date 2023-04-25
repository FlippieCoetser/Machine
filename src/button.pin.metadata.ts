/**
 * @module Pin
 */

/**
 * HTML Attributes available to set
 * @category Metadata: Attributes
 */
export const Attribute = {
  TEMPLATE: "templateId",
  VISIBLE: "visible",
  STATE: "state",
} as const;
export type Attributes = (typeof Attribute)[keyof typeof Attribute];

/**
 * Attribute only visible when set to NO
 * @category Metadata: State
 */
export const Visible = {
  YES: "yes",
  NO: "no",
} as const;
export type Visibility = (typeof Visible)[keyof typeof Visible];

/**
 * @category Metadata: State
 */
export const State = {
  ON: "on",
  OFF: "off",
} as const;
export type States = (typeof State)[keyof typeof State];

/**
 * @category Metadata: Behavior
 */
export const Event = {
  ONHIDE: "onhide",
  ONSHOW: "onshow",
  ONON: "onon",
  ONOFF: "onoff",
  ONTOGGLE: "ontoggle",
} as const;
export type Events = (typeof Event)[keyof typeof Event];

/**
 * @category Metadata: Behavior
 */
export const Operation = {
  ON: "on",
  OFF: "off",
  TOGGLE: "toggle",
  SHOW: "show",
  HIDE: "hide",
} as const;
export type Operations = (typeof Operation)[keyof typeof Operation];

/**
 * @category Metadata: Behavior
 */
export const Gesture = {
  CLICK: "click",
} as const;
export type Gestures = (typeof Gesture)[keyof typeof Gesture];
