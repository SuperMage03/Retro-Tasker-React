class NesSpeaker {
    AUDIO_BUFFERING: number;
    SAMPLE_COUNT: number;
    SAMPLE_MASK: number;
    audio_samples_L: Float32Array;
    audio_samples_R: Float32Array;
    audio_write_cursor: number;
    audio_read_cursor: number;
    script_processor: ScriptProcessorNode | null;
    audio_ctx: AudioContext | null;
    generateFrame: any;

    constructor() {
        this.generateFrame = null;
        this.AUDIO_BUFFERING = 512;
        this.SAMPLE_COUNT = 4 * 1024;
        this.SAMPLE_MASK = this.SAMPLE_COUNT - 1;
        this.audio_samples_L = new Float32Array(this.SAMPLE_COUNT);
        this.audio_samples_R = new Float32Array(this.SAMPLE_COUNT);
        this.audio_write_cursor = 0;
        this.audio_read_cursor = 0;
        this.script_processor = null;
        this.audio_ctx = null;
    }

    startSpeaker(generateFrame: any) {
        this.generateFrame = generateFrame;

        this.audio_ctx = new window.AudioContext();
        let audio_ctx = this.audio_ctx;
        document.addEventListener('click', () => {
            audio_ctx.resume();
        });

        this.script_processor = this.audio_ctx.createScriptProcessor(this.AUDIO_BUFFERING, 0, 2);
        this.script_processor.onaudioprocess = this.audio_callback;
        this.script_processor.connect(this.audio_ctx.destination);
    }



    stopSpeaker() {
        if (this.script_processor) {
            if (!this.audio_ctx) { return; }
            this.script_processor.disconnect(this.audio_ctx.destination);
            this.script_processor.onaudioprocess = null;
            this.script_processor = null;
        }
        if (this.audio_ctx) {
            this.audio_ctx.close().catch();
            this.audio_ctx = null;
        }
    }

    getSampleRate() {
        if (!window.AudioContext) {
            return 44100;
        }
        let myCtx = new window.AudioContext();
        let sampleRate = myCtx.sampleRate;
        myCtx.close();
        return sampleRate;
    }


    audio_remain() {
        return (this.audio_write_cursor - this.audio_read_cursor) & this.SAMPLE_MASK;
    }


    writeSample = (leftChannelData: number, rightChannelData: number) => {
        this.audio_samples_L[this.audio_write_cursor] = leftChannelData;
        this.audio_samples_R[this.audio_write_cursor] = rightChannelData;
        this.audio_write_cursor = (this.audio_write_cursor + 1) & this.SAMPLE_MASK;
    }

    audio_callback = (event: any) => {
        let dst = event.outputBuffer;
        let len = dst.length;

        // Attempt to avoid buffer underruns.
        if (this.audio_remain() < this.AUDIO_BUFFERING) {
            this.generateFrame();
        }

        let dst_l = dst.getChannelData(0);
        let dst_r = dst.getChannelData(1);
        for (let i = 0; i < len; i++) {
            let src_idx = (this.audio_read_cursor + i) & this.SAMPLE_MASK;
            dst_l[i] = this.audio_samples_L[src_idx];
            dst_r[i] = this.audio_samples_R[src_idx];
        }

        this.audio_read_cursor = (this.audio_read_cursor + len) & this.SAMPLE_MASK;
    }



}

export default NesSpeaker;
