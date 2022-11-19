import axios from "axios";
import React from "react";
import { baseUrl } from "../../Shared/baseUrl";
import OutingCard from "./OutingCard";
import OutingDetail from "./OutingDetail";

export default function Outing(props) {

    const [outings, setOutings] = React.useState([]);
    const [selectedOuting, setSelectedOuting] = React.useState(null);

    React.useEffect(() => {

        const config = {
            headers: {
                Authorization: `Bearer ${props.userToken}`
            }
        }
        axios.get(baseUrl + '/outing', config)
            .then( response => {
                setOutings(response.data)
            })
    }, [])

    function selectOuting(id) {
        setSelectedOuting( outings.find( outing => {
            return outing.id === id;
        }))
    }

    const outingElements = outings.map(outing => {
        return (
            <OutingCard key={outing.id} outing={outing} clickHandler={() => selectOuting(outing.id)}/>
        )
    })

    function EmptyDetail() {
        return (
            <div>
                <h1>No Outing Selected.</h1>
                <h2>Select an outing or create a new one.</h2>
            </div>
        )
    }

    return (
        <div>
            <div className="sidebar">
                {outingElements}
            </div>
            <div>
                {selectedOuting ? <OutingDetail outing={selectedOuting} /> : <EmptyDetail />}
            </div>
        </div>
    )
}