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
    const hungryTime: number = 3; // det ska gå att mata djuret efter 3 timmar
    const hungryWarning: number = 4; // varningsnotis efter 4 timmar

    function handleClick() {
        animals[index].isFed = true;
        animals[index].lastFed = Date();
        props.update([...animals]);
    }

    let diffH: number = 0; // initialvärde, hur många timmar sedan djuret matades
    let feedTag, timeTag = <></>;
    let timeNow = Date.parse(Date()); // tid i millisekunder

    if (!animals[index].isFed) {
        feedTag = <>
            <div>{animals[index].name} har inte blivit matad än!</div>
            <StyledButton onClick={handleClick}>Mata {animals[index].name}</StyledButton>
        </>
    } else {

            // tidsmatematik-magi
        let totDiffS = Math.floor((timeNow - Date.parse(animals[index].lastFed))/1000);
        // total time difference in seconds
        let totDiffM = Math.floor(totDiffS / 60); // total time difference in minutes
        diffH = Math.floor(totDiffM / 60); // time difference in hours
        let diffM = totDiffM - (diffH * 60);
        let diffS = totDiffS - (diffM * 60) - (diffH * 60 * 60);
        let hTag, mTag = <></>;
        if (diffH > 0) hTag = <>{diffH} timmar </>;
        if (diffM > 0) mTag = <>{diffM} minuter</>;
        let sTag = <>{diffS} sekunder</>;
        if (diffH > 0 || diffM > 0) sTag = <>och {sTag}</>
        // lägger till "och" om det finns hela timmar eller minuter
        timeTag = <>
            <div>{animals[index].name} blev senast matad {animals[index].lastFed},</div>
            <div>vilket var {hTag} {mTag} {sTag} sedan.</div>
        </>
        feedTag = <>
            <div className="feedTag">{animals[index].name} är mätt!</div>
            <StyledButton disabled>Mata {animals[index].name}</StyledButton>
        </>
        if (diffH > hungryTime) {
            feedTag = <>
                <div className="feedTag">{animals[index].name} är hungrig igen!</div>
                <StyledButton onClick={handleClick}>Mata {animals[index].name}</StyledButton>
            </>
        }
    }

    feedTag = <>
        {timeTag}
        {feedTag}
    </>
        
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
                        {feedTag}
                    </div>
                </div>
            </div>
            
        </div>
    )
}