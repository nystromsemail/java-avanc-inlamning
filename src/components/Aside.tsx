import { useState } from "react"
import { Link } from "react-router-dom";
import { IAnimal } from "../models/IAnimal"

export function Aside() {
    const [animals, setAnimals] = useState<IAnimal[]>(JSON.parse(localStorage.getItem("animals") || "[]"));
    const hungryWarning: number = 4; // varningsnotis efter 4 timmar
    let timeNow: number = Date.parse(Date());

    let hungryAnimals: IAnimal[] = [];
    // funktionen nedan kollar om djuret aldrig blivit matat eller om det gått
    // mer än 4 timmar sedan djuret matats och läggs i så fall till listan hungryAnimals
    animals.map((animal) => {
        if (animal.isFed === false) {
            hungryAnimals = [...hungryAnimals, animal];
        } else if ((Date.parse(animal.lastFed) - timeNow) / (1000 * 60 * 60) > 
        hungryWarning) { // om skillnad i tid i timmar är större än hungryWarning
            hungryAnimals = [...hungryAnimals, animal];
        }
        return 0;
    })

    return (<>
        <div>Följande djur är jättehungriga:</div>
        {hungryAnimals.map((animal) => {
            return (
                <div key={animal.id}>
                    <Link to={"/animal/" + animal.id}>
                        <div>{animal.name}</div>
                    </Link>
                </div>
            )
        })}
    </>)
}