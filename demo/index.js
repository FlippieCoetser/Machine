import { Machine } from '@browser-modules/machine';
console.log('machine loaded')

import { Configuration, Event } from '../lib/button.pin.config.js'

var machine = new Machine(Configuration)

machine.on(Event.ONHIDE, () => {console.log('trigger Event.ONHIDE')})
machine.trigger(Event.ONHIDE)
