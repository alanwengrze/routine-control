import { ReactHTMLElement } from "react";

interface InputProps{
  placeholder?: string;
  type: string;
  value?: any;
  onChange?:any;
  name?: string;
  children?:string;
}

export function Input({placeholder, type, value, name, children, onChange}:InputProps){
  return(
    <input 
      type={type} 
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-md border border-gray-400 text-black my-2"
      value={value}
      name={name}
      title={children}
      onChange={onChange}
      />
  )
}