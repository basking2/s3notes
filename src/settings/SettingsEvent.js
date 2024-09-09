// The name of the need password event type.
export const needPasswordEventType = "needSettingsPassword"

// The need password event type instance.
export const NeedPasswordEvent = new CustomEvent(needPasswordEventType, { bubbles: true, detail: {}})

// A function to dispatch the need password event.
export function dispatchNeedPasswordEvent(elem, callback) {
    NeedPasswordEvent.onPassword = callback
    return elem.dispatchEvent(NeedPasswordEvent)
}


