import React, {useEffect} from 'react';
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";

type propTypes = {
    taskName: string;
    taskTime: string;
    id: string;
    updateTaskList: () => void;
};

const Task = (props: propTypes) => {
    const deleteTask = () => {
        axios.delete(`${process.env.REACT_APP_SERVERDOMAIN}/user/delete-task/${props.id}`)
            .then(() => props.updateTaskList())
            .catch((err) => {
                if (err.response.status === 404) {
                    alert("The task doesn't exist or has been deleted already!");
                }
                else {
                    alert(err.message);
                }
            });
    };

    const checkInTask = () => {
        axios.delete(`${process.env.REACT_APP_SERVERDOMAIN}/user/checkin-task/${props.id}`)
            .then(() => props.updateTaskList())
            .catch((err) => {
                if (err.response.status === 404) {
                    alert("The task doesn't exist or has been deleted already!");
                }
                else {
                    alert(err.message);
                }
            });
    };

    const getStatusBarClass = () => {
        if (taskStatus === 0) { return "bg-success" }
        if (taskStatus === 1) { return "bg-danger"; }
        return "bg-info";
    };

    const taskInfo = { taskName: props.taskName, taskTime: props.taskTime };
    const [ taskStatus, setTaskStatus ] = useState(0);


    useEffect(() => {
        const checkStatus = () => {
            const curTime = Math.floor(Date.now() / 1000 / 60);
            const taskTime = Math.floor(new Date(props.taskTime).getTime() / 1000 / 60);

            // 0, not happened
            if (curTime - taskTime < 0) {
                setTaskStatus(0);
            }
            // 1, passed the check-in period
            else if (curTime - taskTime > 5) {
                setTaskStatus(1);
            }
            // With in the check-in period
            else {
                setTaskStatus(2);
            }
        };

        checkStatus();
        setInterval(checkStatus, 1000);
    }, [props.taskTime]);


    return (
        <div className={"w-100 d-flex my-1"}>
            <div className={getStatusBarClass()} style={{width: "6px"}} />
            <div className={"py-1 ps-4 pe-2 d-flex justify-content-between"} style={{width: "calc(100% - 6px)", backgroundColor: "lightgray"}}>
                <div className={"d-flex flex-column justify-content-between"}>
                    <h5 className={"mb-0"}>{taskInfo.taskName}</h5>
                    <p className={"mb-0"}>{new Date(props.taskTime).toLocaleString("en-US")}</p>
                </div>

                <div className={"d-flex flex-column justify-content-between align-items-center"}>
                    <h5 className={"mb-0"}>
                        <FontAwesomeIcon icon={faTimes} className={"text-danger"} style={{cursor: "pointer"}} onClick={deleteTask} />
                    </h5>

                    <h6 className={"mb-0 pb-1"}>
                        <FontAwesomeIcon icon={faCheck} className={"text-success"} style={
                            {
                                visibility: taskStatus === 2 ? "visible" : "hidden",
                                pointerEvents: taskStatus === 2 ? "auto" : "none",
                                cursor: "pointer"
                            }
                        } onClick={checkInTask}/>
                    </h6>
                </div>

            </div>
        </div>
    );
};

export default Task;