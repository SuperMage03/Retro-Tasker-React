class NesFrameCaller {
    generateFrame: any;
    writeBuffer: any;
    running: boolean;
    requestID: number;

    constructor() {
        this.generateFrame = null;
        this.writeBuffer = null;
        this.running = true;
        this.requestID = 0;
    }

    startFrameCaller(writeBuffer: any)  {
        this.writeBuffer = writeBuffer;
        this.running = true;
        this.requestAnimationFrame();
    }

    stopFrameCaller() {
        this.running = false;
        if (this.requestID) { window.cancelAnimationFrame(this.requestID); }
    }

    requestAnimationFrame() {
        this.requestID = window.requestAnimationFrame(this.onAnimationFrame);
    }

    onAnimationFrame = () => {
        this.requestAnimationFrame();
        this.writeBuffer();
    };
}

export default NesFrameCaller;
