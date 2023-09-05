import * as Progress from '@radix-ui/react-progress';

interface ProgressBarProps{
  progress:number
}

export function ProgressBar(props:ProgressBarProps){

  return(
    <Progress.Root className="h-3 rounded-xl bg-zinc-700 w-full mt-4">
      <Progress.Indicator 
          className="h-3 rounded-xl bg-green-600 w-3/4"
          aria-valuenow={props.progress}
          style={{
            width:`${props.progress}%`
          }}
      />
    </Progress.Root>
  )
}