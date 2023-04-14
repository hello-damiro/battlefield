// LECCTURE CODE FROM LearnCode.academy
// https://www.youtube.com/watch?v=nQRXi1SVOow&list=PLoYCgNOIyGABs-wDaaxChu82q_xQgUb4f&index=4
// https://gist.github.com/learncodeacademy/777349747d8382bfb722

/* This code is creating an object called `events` with three methods: `on`, `off`, and `emit`.
These methods allow for event handling in JavaScript. The `on` method adds a function to an
array of functions associated with a given event name. The `off` method removes a function
from the array of functions associated with a given event name. The `emit` method calls all
functions associated with a given event name and passes in data as an argument. This code is
using the module pattern to create a namespace for event handling functions. */
export let events = {
    events: {},
    on: function (eventName, fn) {
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(fn);
    },
    off: function (eventName, fn) {
        if (this.events[eventName]) {
            for (let i = 0; i < this.events[eventName].length; i++) {
                if (this.events[eventName][i] === fn) {
                    this.events[eventName].splice(i, 1);
                    break;
                }
            }
        }
    },
    emit: function (eventName, data) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(function (fn) {
                fn(data);
            });
        }
    },
};
