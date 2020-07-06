import React, { useState } from 'react';
import ListGroupItem from 'react-bootstrap/ListGroupItem'

function MapLocationList(props) {
    let { onMouseOver, onMouseOut, title } = props;
    const [state, setstate] = useState(false);

    return (
        <ListGroupItem action

            variant={state?"primary":undefined}

            onMouseOver={
                () => {
                    onMouseOver();
                    setstate(true)
                }
            }
            onMouseOut={
                () => {
                    onMouseOut();
                    setstate(false);
                }
            }>
            {title}
        </ListGroupItem>
    )
}

export default MapLocationList
