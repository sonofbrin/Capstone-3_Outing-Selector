import axios from "axios";
import React from "react";
import { baseUrl } from "../../Shared/baseUrl";
import OutingDetail from "./OutingDetail";

export default function GuestOuting(props) {

    const [outing, setOuting] = React.useState(null);

    React.useEffect(() => {
        const url = baseUrl + "/guest";
        const idParam = { params: {id: props.guestId}};

        axios.get(url, idParam).then(response => {
            setOuting(response.data);
        })
    }, [])

    return (
        <div>
            <p>Showing guest id: {props.guestId}</p>
            {outing !== null && (
                <OutingDetail outing={outing} />
            )}
        </div>
    )
}