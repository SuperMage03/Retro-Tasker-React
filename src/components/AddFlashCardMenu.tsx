import React, {useState} from 'react';
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";

type PropValues = {
    cardMenuOpen: boolean;
    createCard: (question: string, answer: string) => void;
};

type FormValues = {
    question: string;
    answer: string;
};

const AddFlashCardMenu = ({ cardMenuOpen, createCard }: PropValues) => {
    const { register, handleSubmit, reset } = useForm<FormValues>();

    const getStyle = () => {
        if (cardMenuOpen) {
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

    const onFormSubmit = (data: FormValues) => {
        createCard(data.question, data.answer);
        reset();
    };



    return(
        <Form className={"mb-3"} style={getStyle()} onSubmit={handleSubmit((data) => onFormSubmit(data))}>
            <Form.Group className={"mb-2"}>
                <Form.Label>Question</Form.Label>
                <Form.Control type="text" placeholder="Enter Question" {...register("question")} required />
            </Form.Group>
            <Form.Group className={"mb-3"}>
                <Form.Label>Answer</Form.Label>
                <Form.Control type="text" placeholder="Enter Answer" {...register("answer")} required />
            </Form.Group>

            <Button type={"submit"} variant={"success"}>Create</Button>
        </Form>
    );

}

export default AddFlashCardMenu;
