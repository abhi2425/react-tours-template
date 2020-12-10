import React, { useEffect, useState } from "react";
import "./Tours.css"
import Loading from "./../../Components/Loading/Loading";
import Tour from "../../Components/Tour/Tour";
import Axios from "axios";
const url = "https://course-api.com/react-tours-project";

function tours() {
    const [loading, setLoading] = useState(true);
    const [tours, setTours] = useState([]);
    const [error, setError] = useState(false)

    const fetchTours = () => {
        setLoading(true)
        Axios.get(url)
            .then((res) => {
                setLoading(false);
                setTours(res.data);

            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                setError(true)
            });
    }

    useEffect(() => {
        fetchTours()
        return () => console.log(tours)
    }, []);

    const removeTourHandler = (id, index) => {
        const updatedTours = tours.filter(tour => tour.id !== id)
        // const updatedTours = tours
        // updatedTours.splice(index, 1)   //-->This is not Working and don't know why??
        console.log(updatedTours)
        setTours(updatedTours)
        console.log("clicked!!", index)
    }

    if (loading) {
        return (
            <div>
                <Loading />
            </div>
        );
    }
    if (error) {
        return (
            <header className="title">
                <h1>Sorry ! Network Problem</h1>
            </header>
        )
    }
    if (tours.length === 0) {
        return (
            <header className="title">
                <h1>No Tours Available!</h1>
                <button className="refresh" onClick={() => fetchTours()}>Refresh!</button>
            </header>
        )
    }
    else {

        const updatedTours = tours
        const Tours = updatedTours.map((tour, tourIndex) => {
            return (
                <Tour key={tour.id}
                    tour={tour}
                    removeTour={() => removeTourHandler(tour.id, tourIndex)}
                />
            )
        })
        return (
            <main className="tours">
                <header className="title">
                    <h1>Our Tours</h1>
                    <div className="underline"></div>
                </header>
                <section>
                    {Tours}
                </section>
            </main>
        );
    }
};
export default tours;
