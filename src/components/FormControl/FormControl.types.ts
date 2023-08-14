export type AutoComplete = "cc-csc" | "cc-exp" | "cc-exp-month" | "cc-exp-year" | "cc-number" | "email" | "name" | "password" | "postal-code" | "street-address" | "tel" | "username" | "off" | undefined;
export type KeyfolderType =
    "default"
    | "email-address"
    | "numeric"
    | "phone-pad"
    | "number-pad"
    | "decimal-pad"
    | "visible-password"
    | "ascii-capable"
    | "numbers-and-punctuation"
    | "url"
    | "name-phone-pad"
    | "twitter"
    | "web-search"
    | undefined
export type AutoCapitalizeType = "sentences" | "none" | "words" | "characters" | undefined
export type FormControlType = {
    value: string,
    isValid: boolean,
    inputName: string,
    placeholder: string,
    inputHandler: (key: string, value: string, isValid: boolean) => void,
    label?: string,
    multiline?: boolean,
    keyboardType?: KeyfolderType,
    autoCapitalize?: AutoCapitalizeType,
    autoComplete?: AutoComplete,
    autoCorrect?: boolean
    required?: boolean
    email?: boolean
    min?: number
    max?: number
    minLength?: number
    maxLength?: number
    secureTextEntry?: boolean
    numberOfLines?: number
    onInputCheck?: false | ((value: string) => Promise<{ isValid: boolean, errorMessage: string }>)
}

export type FormControlReducerType = {
    type: string,
    value?: string,
    isValid?: boolean
}