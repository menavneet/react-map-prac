import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import MapLocationList from './MapLocationList'


const getMakerIconForState = function (state) {
    switch (`${state}`) {
        case "0": return "http://maps.google.com/mapfiles/kml/paddle/blu-blank.png";
        case "1": return "http://maps.google.com/mapfiles/kml/paddle/grn-blank.png";
        case "3": return "http://maps.google.com/mapfiles/kml/paddle/ylw-blank.png";
        default: return "http://maps.google.com/mapfiles/kml/paddle/red-circle.png";
    }


}
const test = [
    { lat: 25.4358, lng: 81.8463, state: 0, title: "Location 1", active: false },
    { lat: 25.4357, lng: 81.8464, state: 1, title: "Location 2", active: false },
    { lat: 25.4356, lng: 81.8465, state: 3, title: "Location 3", active: false },
]


const getMapMaker = function ({ lat, lng, state, title, map ,index}) {
    if (typeof title === 'undefined') {
        title = `State ${state}`;
    }
    var myLatLng = { lat, lng };

    var marker = new window.google.maps.Marker({
        position: myLatLng,
        map: map,
        title: title,

    });


    infoWindowsArray[index]=new window.google.maps.InfoWindow({
        content: `<h4>${title}</h4>`
    })


    let makerIcon = getMakerIconForState(state);
    marker.setIcon(makerIcon);

    marker.addListener('mouseover', function () {
        openInfoWindow(index);
        // infoWindowsArray[index].open(map, marker)
    })
    marker.addListener('mouseout', function () {
        closeInfoWindow(index);
        // infoWindowsArray[index].close(map, marker)
    })

    return marker;
}

const letSay = function () {
    console.log("Great This work too");
}

let markers=[];
let infoWindowsArray=[];
let map;

window.initMap = function () {
    console.log("Its working")
    var myLatLng = { lat: 25.4358, lng: 81.8463 };

    map = new window.google.maps.Map(document.getElementById("map"), {
        zoom: 19,
        center: myLatLng
    });

    markers = test.map((item,index) => getMapMaker({ ...item, map ,index}))

    letSay();
}

function openInfoWindow(indexOfMaker){
    test[indexOfMaker].active=true;
    infoWindowsArray[indexOfMaker].open(map, markers[indexOfMaker]);
}
function closeInfoWindow(indexOfMaker){
    test[indexOfMaker].active=false;
    infoWindowsArray[indexOfMaker].close(map, markers[indexOfMaker]);
}

function MapPanel() {
    return (
        <Container fluid >
            <Row>
                <Col md={2} style={{ backgroundColor: "#f0f0f0" }}>
                    <ListGroup>
                        {test.map((item,index) => <MapLocationList action 
                        onMouseOver={()=>{
                            openInfoWindow(index);
                        }}
                        
                        onMouseOut={()=>{
                            closeInfoWindow(index);
                        }}

                        title = {item.title}
                        >{item.title}</MapLocationList>)}
                    </ListGroup>
                </Col>
                <Col auto="true">
                    <div id="map" />
                </Col>
            </Row>
        </Container>
    )
}

export default MapPanel
