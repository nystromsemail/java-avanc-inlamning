import { useState } from "react";
import { useParams } from "react-router-dom";
import { IAnimal } from "../models/IAnimal";
import { StyledButton } from "../styles/StyledButton";

interface IAnimalProps {
    update(animals: IAnimal[]): void;
}

export function Animal(props: IAnimalProps) {
    const [animals, setAnimals] = useState<IAnimal[]>(JSON.parse(localStorage
        .getItem("animals") || "[]"));
    const index: number = useParams().id as unknown as number - 1;

    function handleClick() {
        animals[index].isFed = true;
        animals[index].lastFed = Date();
        props.update([...animals]);
    }

    let fedTag = <></>;
    let timeNow = Date.parse(Date()); // tid i millisekunder

    if (!animals[index].isFed) {
        fedTag = <>
            <div>{animals[index].name} har inte blivit matad än!</div>
            <StyledButton onClick={handleClick}>Mata {animals[index].name}</StyledButton>
        </>
    } else {
        console.log("Now: ", timeNow);
        console.log("Fed: ", Date.parse(animals[index].lastFed));
        
        let totDiffS = (timeNow - Date.parse(animals[index].lastFed))/1000; // total time difference in seconds
        console.log(totDiffS);
        let totDiffM = Math.floor(totDiffS / 60); // total time difference in minutes
        let diffH = Math.floor(totDiffM / 60); // time difference in hours
        let diffM = totDiffM - (diffH * 60);
        let diffS = totDiffS - (diffM * 60) - (diffH * 60 * 60);
        let hTag, mTag = <></>;
        let sTag = <>{diffS} sekunder</>;
        if (diffH > 0) hTag = <>{diffH} timmar </>;
        if (diffM > 0) mTag = <>{diffM} minuter</>;
        fedTag = <>
            <div>{animals[index].name} blev senast matad {animals[index].lastFed},</div>
            <div>vilket var {hTag} {mTag} {sTag} sedan</div>
        </>
    }
        
    return (
        <div className="animal">
            <div className="animal-card">
                <div className="half">
                    <img className="single-image"
                    src={animals[index].imageUrl}
                    alt={animals[index].name}/>
                    <div className="image-text">{animals[index].longDescription}</div>
                </div>
                <div className="half">
                    <div className="short-description">
                        <h1>Det här är {animals[index].name}</h1>
                        <h4>{animals[index].shortDescription}</h4>
                        {fedTag}
                    </div>
                </div>
            </div>
            
        </div>
    )
}