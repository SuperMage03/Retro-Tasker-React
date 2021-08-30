import Button from "react-bootstrap/Button";

type propTypes = {
    taskMenuOpen: boolean;
    toggleTaskMenu: () => void;
};

const TaskMenuOpenBtn = ({ taskMenuOpen, toggleTaskMenu }: propTypes) => {
    if (!taskMenuOpen) {
        return <Button variant={"success"} onClick={toggleTaskMenu}>Add</Button>;
    }

    return <Button variant={"danger"} onClick={toggleTaskMenu}>Close</Button>;
}

export default TaskMenuOpenBtn;