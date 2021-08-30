import { useEffect, useState, useCallback } from 'react';
import AddTaskMenu from "./components/AddTaskMenu";
import TaskMenuOpenBtn from "./components/TaskMenuOpenBtn";
import Task from "./components/Task";
import axios from "axios";

const TaskTracker = () => {
    const toggleTaskMenu = () => {
        setTaskMenuOpen(!taskMenuOpen);
    }

    const getTaskList = async () => {
        try {
            const promise = await axios.get(`${process.env.REACT_APP_SERVERDOMAIN}/user/tasks`);
            return promise.data;
        } catch (err) {
            alert(`${err} (Fail to access the server! Try again Later.)`);
            return [];
        }
    };

    const updateTaskList = useCallback(() => {
        getTaskList().then(data => setTaskList(data));
    }, []);


    const [ taskMenuOpen, setTaskMenuOpen ] = useState(false);
    const [ taskList, setTaskList ] = useState([]);


    useEffect(() => {
        document.title = "Task Tracker";
        updateTaskList();
    }, [updateTaskList]);


    return (
        <div className={"bg-light w-75 m-auto rounded p-2 overflow-hidden"} style={{maxWidth: "400px"}}>
            <div className={"d-flex px-2 pt-2 justify-content-between align-items-center"} style={{margin: "-0.5rem -0.5rem 0.5rem -0.5rem"}}>
                <h1 className={"text-warning"}>Task Tracker</h1>
                <TaskMenuOpenBtn taskMenuOpen={taskMenuOpen} toggleTaskMenu={toggleTaskMenu} />
            </div>

            <hr style={{margin: "0.5rem -0.5rem"}}/>

            <AddTaskMenu visible={taskMenuOpen} updateTaskList={updateTaskList} />

            <div className={"d-flex flex-column"}>
                {taskList.map((task: any) => {
                    return <Task key={task._id} id={task._id} taskName={task.taskName} taskTime={task.taskTime} updateTaskList={updateTaskList} />
                })}

            </div>
        </div>
    );

}

export default TaskTracker;
