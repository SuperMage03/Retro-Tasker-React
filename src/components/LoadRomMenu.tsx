import {Button, Form} from "react-bootstrap";
import {useForm} from "react-hook-form";
import React, {useState} from "react";

type FormValues = {
    nesRomList: FileList;
};

type propTypes = {
    setROMData: (data: string) => void;
    playTime: number;
};

const LoadRomMenu = ({setROMData, playTime}: propTypes) => {
    const {register, handleSubmit} = useForm<FormValues>();
    const [fileError, setFileError] = useState<String>("");

    const verifyFile = (data: FormValues) => {
        if (playTime === 0) {
            setFileError("No Time Left! Do more task!");
            return;
        }


        const romFile = data.nesRomList[0];
        if (!romFile) {
            setFileError("No ROM selected!");
            return;
        }

        const extension = romFile.name.split(".").pop();

        if (!extension || extension.toLowerCase() !== "nes") {
            setFileError("Make sure the extension is nes type!");
            return;
        }


        const romPath = URL.createObjectURL(romFile);
        const req = new XMLHttpRequest();
        req.open("GET", romPath);
        req.overrideMimeType("text/plain; charset=x-user-defined");
        req.onerror = () => {
            alert("Error when reading the ROM!");
            setFileError("Try again!");
        };

        req.onload = () => {
            if (req.status === 200) {
                const romData = req.responseText;
                if (romData.slice(0, 4) !== "NES") {
                    setFileError("This ROM is not an NES ROM!");
                }
                else {
                    setROMData(romData);
                }
            } else if (req.status === 0) {
                alert("Error when reading the ROM!")
                setFileError("Try again!");
            } else {
                alert("Error when reading the ROM!");
                setFileError("Try again!");
            }
        };

        req.send();
    };


    return (
        <div className={"m-auto p-2 rounded w-75 bg-light"} style={{maxWidth: "400px"}}>
            <h1 className={"p-1 mb-0 text-warning"}>Play Time: {Math.ceil(playTime / 60)}</h1>
            <hr style={{margin: "0.5rem -0.5rem"}}/>

            <Form className={"needs-validation"} onSubmit={handleSubmit((data) => verifyFile(data))} noValidate={true}>
                <Form.Group className={"mb-3"}>
                    <Form.Label>Choose a NES ROM File</Form.Label>
                    <Form.Control type={"file"} {...register("nesRomList")} className={`${fileError.length ? "is-invalid": ""}`} onChange={() => setFileError("")} />
                    <div className="invalid-feedback">{fileError}</div>
                </Form.Group>

                <Button type={"submit"} variant={"primary"}>Load ROM</Button>
            </Form>
        </div>
    );
};

export default LoadRomMenu;
