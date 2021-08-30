import React, { useEffect, useRef } from 'react';
// @ts-ignore
import jsnes from "jsnes/dist/jsnes.min";
import NesSpeaker from "./NesSpeaker";
import NesFrameCaller from "./NesFrameCaller";

type propTypes = {
    romData: string | null;
};

const SCREEN_WIDTH = 256;
const SCREEN_HEIGHT = 240;
const FRAMEBUFFER_SIZE = SCREEN_WIDTH * SCREEN_HEIGHT;

let canvas_ctx: CanvasRenderingContext2D, image: ImageData;
let framebuffer_u8: Uint8ClampedArray, framebuffer_u32: Uint32Array;


const nes_init = (canvas: HTMLCanvasElement | null) => {
    // @ts-ignore
    canvas_ctx = canvas.getContext("2d");
    image = canvas_ctx.getImageData(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

    canvas_ctx.fillStyle = "black";
    canvas_ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

    // Allocate framebuffer array.
    let buffer = new ArrayBuffer(image.data.length);
    framebuffer_u8 = new Uint8ClampedArray(buffer);
    framebuffer_u32 = new Uint32Array(buffer);

    nesSpeaker.startSpeaker(nes.frame);
};

const nes_load_data = (canvas: HTMLCanvasElement | null, data: string | null) => {
    if (data) {
        nes_init(canvas);
        nes_boot(data);
    }
};

const setFrame = (framebuffer_24: Uint32Array) => {
    for (let i = 0; i < FRAMEBUFFER_SIZE; i++) {
        framebuffer_u32[i] = 0xFF000000 | framebuffer_24[i];
    }
};

const writeBuffer = () => {
    image.data.set(framebuffer_u8);
    canvas_ctx.putImageData(image, 0, 0);
};

const nes_boot = (rom_data: string) => {
    nes.loadROM(rom_data);
    nesFrameCaller.startFrameCaller(writeBuffer);
};

const ControlHandler = (player: number, controlFunction: Function, event: KeyboardEvent) => {
    switch (event.key) {
        case "w" || "W":
            controlFunction(player, jsnes.Controller.BUTTON_UP);
            break;
        case "a" || "A":
            controlFunction(player, jsnes.Controller.BUTTON_LEFT);
            break;
        case "s" || "S":
            controlFunction(player, jsnes.Controller.BUTTON_DOWN);
            break;
        case "d" || "D":
            controlFunction(player, jsnes.Controller.BUTTON_RIGHT);
            break;
        case "j" || "J":
            controlFunction(player, jsnes.Controller.BUTTON_A);
            break;
        case "k" || "K":
            controlFunction(player, jsnes.Controller.BUTTON_B);
            break;
        case "Tab":
            controlFunction(player, jsnes.Controller.BUTTON_SELECT);
            break;
        case "Enter":
            controlFunction(player, jsnes.Controller.BUTTON_START);
            break;
        default:
            break;
    }
};

const nesSpeaker = new NesSpeaker();
const nesFrameCaller = new NesFrameCaller();
const nes = new jsnes.NES({
    onFrame: setFrame,
    onAudioSample: nesSpeaker.writeSample,
    sampleRate: nesSpeaker.getSampleRate()
});


const NesEmulator = ({ romData }: propTypes) => {
    const canvas = useRef<HTMLCanvasElement>(null);

    useEffect(() => nes_load_data(canvas.current, romData), [romData]);

    document.addEventListener("keyup", evt => ControlHandler(1, nes.buttonUp, evt));
    document.addEventListener("keydown", evt => ControlHandler(1, nes.buttonDown, evt));

    return (
        <div className={"m-auto"}>
            <canvas
                width={SCREEN_WIDTH}
                height={SCREEN_HEIGHT}
                style={{width: "500px"}}
                ref={canvas}
            />
        </div>

    );
};

export default NesEmulator;
