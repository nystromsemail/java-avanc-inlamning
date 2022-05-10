import { isPropertySignature } from "typescript";
import { StyledButton } from "../styles/StyledButton";

interface IPrintAnimalProps {
    feed(i: number): void;
}

export function PrintAnimal(props: IPrintAnimalProps) {

    function handleClick() {
        props.feed(0); // i det här testfallet, matar djur nr 0
    }
    return (<>
        <StyledButton onClick={handleClick}>Mata</StyledButton>
    </>)
}