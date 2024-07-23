import { Props } from "./Form";
import { useState, useEffect } from "react";
import WatchesParts from "./WatchesParts";

interface PropsArr {
  watches: Props[]
  watchesDelete: (item: Props) => void
}

export default function Watches({watches, watchesDelete}: PropsArr) {

  const [time, setTime] = useState(WatchesParts());
  const {hours, minutes, seconds} = time;
  console.log(time)

  const watchesView = (timeZone: string) => {
    let hoursTZ = hours + Number(timeZone);
    hoursTZ > 23 ? hoursTZ = hoursTZ - 24 : hoursTZ;
    let newHoursTZ, newMinutes, newSeconds;
    minutes < 10 ? newMinutes = '0' + minutes : newMinutes = minutes;
    seconds < 10 ? newSeconds = '0' + seconds : newSeconds = seconds;
    hoursTZ < 10 ? newHoursTZ = '0' + hoursTZ : newHoursTZ = hoursTZ;
    return newHoursTZ + ':' + newMinutes + ':' + newSeconds;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(WatchesParts())
    }, 1000)
    
    return () => clearInterval(interval);
  }, [])
  
  return (
    <div className="watches">
        {watches.map(item => (
          <div className="watches_item" key={item.id}>
            <div className="watches_title">{item.title}</div>
            <div className="watches_view">{watchesView(item.timeZone)}</div>
            <button className="watches_delete" onClick={() => watchesDelete(item)}>✘</button>
          </div>
        ))}
    </div>
  )
}

