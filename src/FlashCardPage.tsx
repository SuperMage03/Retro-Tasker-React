import React, {useState} from 'react';
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import AddFlashCardMenu from "./components/AddFlashCardMenu";
import Button from "react-bootstrap/Button";
import FlashCard from "./components/FlashCard";

const FlashCardPage = () => {
    const [cardMenuOpen, setCardMenuOpen] = useState(false);
    const [cards, setCards] = useState<Array<Array<String>>>([]);

    const toggleMenu = () => {
        setCardMenuOpen(!cardMenuOpen);
    };

    const createCard = (question: string, answer: string) => {
        const newCard = [ question, answer ];
        setCards([...cards, newCard]);
    };

    return (
        <Container className={"p-2 bg-light rounded my-3"} fluid={"sm"}>
            <Row>
                <Col className={"d-flex align-items-center justify-content-between py-1"}>
                    <h1 className={"mb-0 text-warning"}>Flash Card</h1>
                    {!cardMenuOpen && <Button className={"h-100"} style={{width: "10%", minWidth: "4.5rem"}} variant={"success"} onClick={toggleMenu}>Open</Button>}
                    { cardMenuOpen && <Button className={"h-100"} style={{width: "10%", minWidth: "4.5rem"}} variant={"danger"} onClick={toggleMenu}>Close</Button>}
                </Col>
            </Row>

            <Row><Col><hr /></Col></Row>

            <Row>
                <Col><AddFlashCardMenu cardMenuOpen={cardMenuOpen} createCard={createCard} /></Col>
            </Row>

            <Row>
                <Col className={"d-flex flex-wrap justify-content-center"}>
                    {cards.map((card, index) => {
                        return <FlashCard key={`Card${index}`} CardInfo={card} />
                    })}
                </Col>
            </Row>
        </Container>

    );
};

export default FlashCardPage;
