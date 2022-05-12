import { useState } from "react"
import { Link } from "react-router-dom";
import { IAnimal } from "../models/IAnimal"
import { StyledButton } from "../styles/StyledButton";

export function Aside() {
    const [animals, setAnimals] = useState<IAnimal[]>(
        JSON.parse(localStorage.getItem("animals") || "[]"));
    const hungryWarning: number = 4; // varningsnotis efter 4 timmar
    const [hungryAnimals, setHungryAnimals] = useState<IAnimal[]>(checkOnAnimals())

    function clickHandler() {
        window.location.reload();
    }

    function checkOnAnimals() {
        // funktionen kollar om det gått mer än {hungryWarning} timmar sedan djuret
        // matats och lägger i så fall till i listan hungries 
        let timeNow: number = Date.parse(Date());
        let hungries: IAnimal[] = [];
        animals.map((animal) => {
            if ((timeNow - Date.parse(animal.lastFed)) / (1000 * 60 * 60) > 
            hungryWarning) { 
                hungries = [...hungries, animal];
            }
            return;
        }) 
        return hungries;
    }
    
    return (<>
        <div>Följande djur är jättehungriga:</div>
        <StyledButton onClick={clickHandler} style={{width: "50%"}}>Uppdatera listan</StyledButton>
        <li className="aside-list">
            {hungryAnimals.map((animal) => {
                return (
                    <div key={animal.id}>
                        <Link to={"/animal/" + animal.id}>
                            <div>{animal.name}</div>
                        </Link>
                    </div>
                )
            })}
        </li>
    </>)
}