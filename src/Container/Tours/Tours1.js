import React, { Component } from 'react'
import "./Tours.css"
import Loading from "../../Components/Loading/Loading";
import Tour from "../../Components/Tour/Tour";
import Axios from "axios";
const url = "https://course-api.com/react-tours-project";

class Tours extends Component {
    state = {
        tours: [],
        loading: true,
        error: false
    }
    fetchTours = () => {
        this.setState({
            loading: true
        })
        Axios.get(url)
            .then((res) => {
                this.setState({
                    loading: false,
                    tours: res.data
                })
            })
            .catch((error) => {
                console.log(error.message);
                this.setState({
                    loading: false,
                    error: true
                })
            });
    }
    componentDidMount() {
        this.fetchTours()
    }
    removeTourHandler = (id, index) => {
        // const updatedTours = tours.filter(tour => tour.id !== id)
        const updatedTours = this.state.tours
        updatedTours.splice(index, 1)    //-->But,works properly here
        this.setState({
            tours: updatedTours
        })
        console.log("clicked!!", index)
    }
    render() {
        if (this.state.loading) {
            return (
                <div>
                    <Loading />
                </div>
            );
        }
        if (this.state.error) {
            return (
                <header className="title">
                    <h1>Sorry ! Network Problem</h1>
                </header>
            )
        }
        if (this.state.tours.length === 0) {
            return (
                <header className="title">
                    <h1>No Tours Available!</h1>
                    <button className="refresh" onClick={() => this.fetchTours()}>Refresh!</button>
                </header>
            )
        }
        else {
            const updatedTours = this.state.tours
            const Tours = updatedTours.map((tour, tourIndex) => {
                return (
                    <Tour key={tour.id}
                        tour={tour}
                        removeTour={() => this.removeTourHandler(tour.id, tourIndex)}
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
    }
}
export default Tours