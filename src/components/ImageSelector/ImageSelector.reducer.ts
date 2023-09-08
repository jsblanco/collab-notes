export const ADD_PICTURE = 'ADD_PICTURE';
export const REMOVE_PICTURE = 'REMOVE_PICTURE';
export const FORM_RESET = 'FORM_RESET';
type StateType = { value: string[], isValid: boolean, isTouched: boolean }
type ActionType = { type: string, value?: string }

export const imageSelectorReducer = (state: StateType, a: ActionType) => {
    let updatedValues, updatedValidities;
    switch (a.type) {
        case ADD_PICTURE:
            updatedValues = [...state.value]
            updatedValues.push('' + a.value)
            return {
                ...state,
                value: updatedValues,
                isValid: true,
                isTouched: true
            }
        case REMOVE_PICTURE:
            updatedValues = state.value.filter(img => img !== a.value)
            updatedValidities = !!updatedValues.length
            return {
                value: updatedValues,
                isValid: updatedValidities,
                isTouched: true
            }
        case FORM_RESET:
            return {value: [], isValid: false, isTouched: false}
        default:
            return {...state};
    }
}
