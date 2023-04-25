/**
 * HTML Attributes available to set
 * @category Metadata: Attributes
 */
export const Attribute = {
  TEMPLATE: "templateId",
  VISIBLE: "visible",
  ORIENTATION: "orientation",
  STATE: "state",
  WINDOW: "window",
} as const;
export type Attributes = (typeof Attribute)[keyof typeof Attribute];

/**
 * Attribute only visible when set to NO
 * @category Metadata: State
 */
export const Visible = {
  NO: "no",
  YES: "yes",
} as const;
export type Visibility = (typeof Visible)[keyof typeof Visible];

/**
 * @category Metadata: State
 */
export const Orientation = {
  HORIZONTAL: "horizontal",
  VERTICAL: "vertical",
} as const;
export type Orientations = (typeof Orientation)[keyof typeof Orientation];

/**
 * @category Metadata: State
 */
export const State = {
  PINNED: "pinned",
  UNPINNED: "unpinned",
} as const;
export type States = (typeof State)[keyof typeof State];

/**
 * @category Metadata: State
 */
export const Window = {
  MINIMIZED: "minimized",
  MAXIMIZED: "maximized",
  NORMAL: "normal",
  CLOSED: "closed",
} as const;
export type Windows = (typeof Window)[keyof typeof Window];

/**
 * @category Metadata: Behavior
 */
export const Event = {
  ONHIDE: "onhide",
  ONSHOW: "onshow",
  ONPIN: "onpin",
  ONUNPIN: "onunpin",
  ONMINIMIZE: "onminimize",
  ONMAXIMIZE: "onmaximize",
  ONRESTORE: "onrestore",
  ONCLOSE: "onclose",
} as const;
export type Events = (typeof Event)[keyof typeof Event];

/**
 * @category Metadata: Behavior
 */
export const Operation = {
  SHOW: "show",
  HIDE: "hide",
  PIN: "pin",
  UNPIN: "unpin",
  MINIMIZE: "minimize",
  MAXIMIZE: "maximize",
  RESTORE: "restore",
  CLOSE: "close",
} as const;
export type Operations = (typeof Operation)[keyof typeof Operation];
