
interface ButtonProps{
  text : string;
  className: string;
  handleOnClick?:any;
}

export function Button({text, className, handleOnClick}:ButtonProps){
  return(
    <button onClick={handleOnClick} className={className}>{text}</button>
  )
}