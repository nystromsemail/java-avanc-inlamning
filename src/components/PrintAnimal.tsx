import { useState } from "react";
import { Link } from "react-router-dom";
import { IAnimal } from "../models/IAnimal";
import "./../styles/Animals.css"

export function PrintAnimal() {
    const [animals, setAnimals] = useState<IAnimal[]>(JSON.parse(localStorage
        .getItem("animals") || "[]"));
    
    return (
        <div className="animals">
            {animals.map((animal) => {
                return (
                    <div key={animal.id} className="animals-card">
                        <div>                            
                            <Link to={"/animal/" + animal.id} className="link">
                                <div>{animal.name}</div>
                                <div className="image-container">
                                    <img src={animal.imageUrl}
                                    alt={animal.name}
                                    className="image"/>
                                </div>
                            </Link>                            
                            <span className="short-description">{animal.shortDescription}</span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}