import { useState } from "react";
import { useParams } from "react-router-dom";
import { IAnimal } from "../models/IAnimal";

export function Animal() {
    const [animals, setAnimals] = useState<IAnimal[]>(JSON.parse(localStorage
        .getItem("animals") || "[]"));
    let index: number = useParams().id as unknown as number - 1;

        
    return (
    <div className="image-container">
        <img src={animals[index].imageUrl} alt={animals[index].name}/>
    </div>)
}