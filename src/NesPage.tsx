import { useEffect, useState } from 'react';
import LoadRomMenu from "./components/LoadRomMenu";
import NesEmulator from "./components/NesEmulator";
import axios from "axios";


type propTypes = {
    getPlayTime: () => Promise<number>;
};

let romData: string | null = null;

const NesPage = ({ getPlayTime }: propTypes) => {
    const [ isPlaying, setIsPlaying ] = useState(false);
    const [ playTime, setPlayTime ] = useState(0);

    useEffect(() => {
        getPlayTime().then(data => setPlayTime(data));
        setInterval(() => {
            getPlayTime().then(data => setPlayTime(data));
        }, 1000);
    }, [getPlayTime]);

    useEffect(() => {
        if (isPlaying) {
            axios.delete(`${process.env.REACT_APP_SERVERDOMAIN}/user/delete-time`)
                .catch((err) => {
                    alert(err.message);
                });

            setInterval(() => {
                axios.delete(`${process.env.REACT_APP_SERVERDOMAIN}/user/delete-time`)
                    .catch((err) => {
                        alert(err.message);
                    });
            }, 1000);
        }
    }, [isPlaying]);

    useEffect(() => {
        if (playTime === 0 && isPlaying) {
            setIsPlaying(false);
        }
    }, [playTime, isPlaying]);

    const setROMData = (nesROMData: string) => {
        romData = nesROMData;
        setIsPlaying(true);
    };

    useEffect(() => {
        document.title = "NES Emulator";
    }, []);

    return (
        <>
            {!isPlaying && <LoadRomMenu setROMData={setROMData} playTime={playTime} />}
            { isPlaying && <NesEmulator romData={romData} />}
        </>
    );
};

export default NesPage;