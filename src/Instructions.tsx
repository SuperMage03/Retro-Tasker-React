const Instructions = () => {
    return (
        <div className={"bg-light w-75 m-auto rounded p-2 overflow-hidden"} style={{maxWidth: "400px"}}>
            <h1 className={"p-1 mb-0 text-warning"}>INSTRUCTIONS</h1>
            <hr style={{margin: "0.5rem -0.5rem"}}/>

            <ul className={"text-secondary"}>
                <li>Use the Task Tracker Tool to set up Tasks, when the time is up, there are 5 minutes of grace period of claiming the reward for playing the NES for 3 minutes.</li>
                <li>The Flash Card Tool is to add Flash Card and click on the card to flip it.</li>
                <li>NES control: WASD for D-PAD, <br/>J: Button A, K: Button B, <br/>E: Reload ROM, <br/>Enter: Start, Tab: Select.</li>
            </ul>
        </div>
    );
};

export default Instructions;
