import React, {useState} from 'react';
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import axios from "axios";

type FormValues = {
    taskName: string;
    taskTime: Date;
};

const AddTaskMenu = (props: any) => {
    const { register, handleSubmit, reset } = useForm<FormValues>();
    const [ validationClass, setValidationClass ] = useState({taskName: true, taskTime: true});

    const checkDate = (date: Date) => {
        const inputDate = new Date(date);
        const curDate = Date.now();
        return Math.floor(inputDate.getTime() / 1000 / 60) > Math.floor(curDate / 1000 / 60);
    };

    const checkName = (name: string) => {
        return (name !== "" && name != null);
    };

    const addTask = async (data: FormValues) => {
        setValidationClass({ taskName: checkName(data.taskName), taskTime: checkDate(data.taskTime) });

        if (checkName(data.taskName) && checkDate(data.taskTime)) {
            axios({
                method: "post",
                url: `${process.env.REACT_APP_SERVERDOMAIN}/user/create-task`,
                data: {
                    taskName: data.taskName,
                    taskTime: data.taskTime
                }
            }).then(() => {
                props.updateTaskList();
                reset();
            });
        }
    };

    const checkDateInputClass = () => {
        return !validationClass.taskTime ? "is-invalid" : "";
    };

    const checkNameInputClass = () => {
        return !validationClass.taskName ? "is-invalid" : "";
    };

    const getStyle = () => {
        if (props.visible) {
            return {
                maxHeight: "1000px",
                transform: "scaleY(1)",
                transformOrigin: "top",
                transition: "transform 200ms ease-in-out, max-height 200ms ease-in-out"
            }
        }

        return {
            maxHeight: "0",
            transform: "scaleY(0)",
            transformOrigin: "top",
            transition: "transform 200ms ease-in-out, max-height 200ms ease-in-out"
        }
    };

    const dateInputOnChange = () => {
        setValidationClass({taskName: validationClass.taskName, taskTime: true});
    };


    const nameInputOnChange = () => {
        setValidationClass({taskName: true, taskTime: validationClass.taskTime});
    };


    return(
        <Form className={"mb-3 needs-validation"} style={getStyle()} onSubmit={handleSubmit((data) => addTask(data))} noValidate={true}>
            <Form.Group className={"mb-3"}>
                <Form.Label>Task Name</Form.Label>
                <Form.Control id="name-input-field" type="text" placeholder="Enter Task Name" {...register("taskName")} onChange={nameInputOnChange} className={checkNameInputClass()} required />
                <div className="invalid-feedback">Please Enter a Name</div>
            </Form.Group>

            <Form.Group className={"mb-3"}>
                <Form.Label>Day & Time</Form.Label>
                <Form.Control id="date-input-field" type="datetime-local" {...register("taskTime")} onChange={dateInputOnChange} className={checkDateInputClass()} required />
                <div className="invalid-feedback">Please Enter Future Time</div>
            </Form.Group>

            <Button type={"submit"} variant={"success"} className={"w-100"}>Add Task</Button>
        </Form>
    );

}

export default AddTaskMenu;