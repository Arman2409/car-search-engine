export interface PageTitleProps {
    title: string
}

export interface InputProps {
    placeholder: string
    value: string | number
    onChange: () => void
    type?: string
}