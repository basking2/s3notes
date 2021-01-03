/**
 * Emits an event named "ssds-auth-error" that bubbles up the DOM.
 * 
 * This may be handled by listening for v-on:ssds-auth-error.
 * 
 * @param {*} vueComponent The vue component that generates the error. It's $el will be used as the target.
 * @param {*} message An object (often a string) that is assigned to the event as the `message` field.
 */
export function dispatchAuthError(vueComponent, message = "Authentication error.") {
    var event = new Event('auth-error', {bubbles: true})
    event.message = message
    vueComponent.$el.dispatchEvent(event)
}

export function dispatchAlert(vueComponent, alertType, message) {
    var event = new Event('alert-message', { bubbles: true })
    if (message) {
        event.message = message
        event.alertType = alertType
    } else {
        event.message = alertType
        event.alertType = 'error'
    }
    vueComponent.$el.dispatchEvent(event)
}

export default {
    dispatchAuthError,
    dispatchAlert
}