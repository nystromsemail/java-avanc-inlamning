import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { IAnimal } from "../models/IAnimal";
import { About } from "../pages/About";
import { Contact } from "../pages/Contact";
import { Layout } from "../pages/Layout";
import { NotFound } from "../pages/NotFound";
import { PrintAnimal } from "./PrintAnimal";

export function Animals() {
    const [animals, setAnimals] = useState<IAnimal[]>([]);

    // kör en gång vid första laddning av sidan för att hämta ur localStorage
    // ansätter en tom lista om parametern inte finns i localStorage
    useEffect(() => {
        if (animals.length !==0) return;
        getFromLocalStorage();
    })

    // hämtar djur från API om listan (fortfarande) är tom
    useEffect(() => {
        if (animals.length !==0) return;
        axios
            .get<IAnimal[]>("https://animals.azurewebsites.net/api/animals")
            .then((response) => {
                updateAnimals(response.data);
            })
    });

    function updateAnimals(anim: IAnimal[]) {
        saveToLocalStorage([...anim]);
        setAnimals([...anim]);
    }

    function saveToLocalStorage(anim: IAnimal[]) {
        localStorage.setItem("animals", JSON.stringify(anim))
    }

    function getFromLocalStorage() {
        let tempAnimals: IAnimal[] = JSON.parse(localStorage.getItem("animals") || "[]");
        setAnimals([...tempAnimals]);
    }
    
    function feedAnimal(i: number) {
        animals[i].isFed = true;
        updateAnimals([...animals])
    }
    

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                <Route index element={<PrintAnimal feed={feedAnimal}/>}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/contact" element={<Contact />}></Route>
                <Route path="/animal/:id" element={<About />}></Route>
                <Route path="/*" element={<NotFound />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}