import {Button, Div, PanelHeader} from "@vkontakte/vkui";
import {useEffect, useRef, useState} from "react";
import bridge from "@vkontakte/vk-bridge";

function App() {
    const [state, setState] = useState([false, false, false, false, false, false, false, false]);
    const trackRef = useRef();
    useEffect(() => {
        trackRef.current = state;
        const currentNum = {num: 0};
        const int = setInterval(() => {
            bridge.send("VKWebAppFlashSetLevel", {"level": trackRef.current[currentNum.num] ? 1 : 0});
            currentNum.num++;
            if (currentNum.num >= 8) {
                currentNum.num = 0;
            }
        }, 1000);
        return () => {
            bridge.send("VKWebAppFlashSetLevel", {"level": 0});
            clearInterval(int);
        };
    }, [])
    return <Div>
        {state.map((_, idx) => <Button key={idx} onClick={() => {
            const s = [...state];
            s[idx] = !s[idx];
            setState(s);
            trackRef.current = s;
        }} style={{backgroundColor: state[idx] ? 'red' : 'green'}}>{idx}</Button>)}
    </Div>
}

export default App;
