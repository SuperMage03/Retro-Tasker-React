import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

type propTypes = {
    getPlayTime: () => Promise<number>;
};

const HomePage = ({ getPlayTime }: propTypes) => {
    const [ playTime, setPlayTime ] = useState(0);

    useEffect(() => {
        document.title = "Home Page";
        getPlayTime().then(data => setPlayTime(data));
    }, [getPlayTime]);

    return (
        <div className={"bg-light w-75 m-auto rounded p-2 overflow-hidden"} style={{maxWidth: "400px"}}>
            <header className={"p-1"}>
                <h1 className={"mb-0 text-warning"}>Retro Tasker</h1>
                <h5 className={"mb-0 text-secondary"}>NES Play Time: {Math.ceil(playTime / 60)}</h5>
            </header>
            <hr style={{margin: "0.5rem -0.5rem"}}/>

            <div className={"d-flex flex-column"}>
                <Button variant={"primary"} size={"lg"} className={"d-block my-2"} href={"/task-tracker"}>
                    Task Tracker
                </Button>
                <Button variant={"primary"} size={"lg"} className={"d-block my-2"} href={"/flash-card"}>
                    Flash Card
                </Button>
                <Button variant={"primary"} size={"lg"} className={"d-block my-2"} href={"/nes-emulator"}>
                    NES Emulator
                </Button>
                <Button variant={"primary"} size={"lg"} className={"d-block my-2"} href={"/instructions"}>
                    Instructions
                </Button>
            </div>
        </div>
    );
}

export default HomePage;
