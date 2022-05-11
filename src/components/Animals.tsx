import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { IAnimal } from "../models/IAnimal";
import { About } from "../pages/About";
import { Contact } from "../pages/Contact";
import { Layout } from "../pages/Layout";
import { NotFound } from "../pages/NotFound";
import { Animal } from "./Animal";
import { PrintAnimal } from "./PrintAnimal";

export function Animals() {
    // hämtar djur från localStorage eller sätter till []
    const [animals, setAnimals] = useState<IAnimal[]>(JSON.parse(localStorage.getItem("animals") || "[]"));

    // hämtar djur från API om listan är tom
    useEffect(() => {
        if (animals.length !==0) return;
        axios
            .get<IAnimal[]>("https://animals.azurewebsites.net/api/animals")
            .then((response) => {
                updateAnimals(response.data)
            })
    }, [])

    function updateAnimals(anim: IAnimal[]) {
        saveToLocalStorage([...anim]);
        setAnimals([...anim]);
    }

    function saveToLocalStorage(anim: IAnimal[]) {
        localStorage.setItem("animals", JSON.stringify(anim))
    }
    
    
    
    console.log("Innan return: ", animals);
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                <Route index element={<PrintAnimal />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/contact" element={<Contact />}></Route>
                <Route path="/animal/:id" element={<Animal update={updateAnimals}/>}></Route>
                <Route path="/*" element={<NotFound />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}