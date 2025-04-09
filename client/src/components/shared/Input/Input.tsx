import type { InputProps } from "../../../types/components/shared/props";

const Input = ({
    placeholder,
    value,
    onChange,
    type
}: InputProps) => {
    return (
       <input
         className="w-[300px] h-[70px]" 
         placeholder={placeholder}
         value={value}
         onChange={onChange}
         type={type}
       />
    )
}

export default Input;