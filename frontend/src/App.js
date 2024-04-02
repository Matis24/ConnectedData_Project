import React, { useEffect, useState } from 'react';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';



function App() {
  // State for all the species in backendData and just the one selected
  const [backendData, setBackendData] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [speciesID, setSpeciesID] = useState(null);
  // State for the mistralApi 
  const [mistralData, setMistralData] = useState(null);
  // State for the map and location
  const [locationData, setLocationData] = useState(null);


  // We get the species data from the backend 
  useEffect(() => {
    fetch("/species")
      .then(res => res.json())  // Transform it to be sure its JSON
      .then(data => {
        setBackendData(data);
      })
      .catch(error => {
        console.error("Error fetching species data:", error);
      });

  }, []);


  // When the user select a species, we update the selectedSpecies and the speciesID
  const SpeciesChange = (event) => {
    const speciesName = event.target.value;
    // Chosen species in the list
    const selectedSpecies = backendData.find(species => species.scientificNameWithoutAuthor.includes(speciesName));
    setSelectedSpecies(selectedSpecies);
    // Species Id for Mistral and location
    const speciesID = selectedSpecies.gbifId.toString();
    setSpeciesID(speciesID);
    // We reset the mistral data
    setMistralData(null);
    // We reset the map
    setLocationData(null);
  };


  // We get the mistral data from the backend
  useEffect(() => {
    if (speciesID) {
      fetch(`/species/${speciesID}/mistral`)
        .then(res => res.json()) 
        .then(data => {
          setMistralData(data);
        })
        .catch(error => {
          console.error("Error fetching mistral data:", error);
        });
    }
  }, [speciesID]);


  // Import the location of the species
  useEffect(() => {  
   if (speciesID) {
      fetch(`/species/${speciesID}/location`)
        .then(res => res.json()) 
        .then(data => {
          // Transform data to match leaflet marker format
          const locationData = {
            lat: parseFloat(data['http://rs.tdwg.org/dwc/terms/verbatimLatitude']),
            lng: parseFloat(data['http://rs.tdwg.org/dwc/terms/verbatimLongitude']),
            locality: data['http://rs.tdwg.org/dwc/terms/locality'],
            scientificName: data['http://rs.tdwg.org/dwc/terms/scientificName']
          };
          setLocationData(locationData);
        })
        .catch(error => {
          console.error("Error fetching GBIF data:", error);
        });
    }
  }, [speciesID]);
 


  return (
    <div id="content">
      <div id="species">
        {/* We create a dropdown list with all the scientific Names of the species */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h1 style={{ marginRight: '20px' }}>Select a Species :</h1>
          <select defaultValue="" onChange={SpeciesChange}>
          <option disabled value=""> Select a species </option>
            {/* There is all the scientific name of each species without the null one */}
            {backendData.map((item, index) => (
              item.scientificNameWithoutAuthor.length > 0 && (
                <option key={index} value={item.scientificNameWithoutAuthor}>
                  {item.scientificNameWithoutAuthor}
                </option>
              )
            ))}
          </select>
        </div>

        {/* We display the information of the selected species */}
        {selectedSpecies && (
          <div className='species-info'>
            <h2>{selectedSpecies.scientificNameWithoutAuthor}</h2>
            <p>Common Name: {selectedSpecies.commonNames[0]} - {selectedSpecies.commonNames[1]} - {selectedSpecies.commonNames[2]}</p>
            <p>Authorship: {selectedSpecies.scientificNameAuthorship}</p>
            <p>GBIF ID: {selectedSpecies.gbifId}</p>
            <p>POWO ID: {selectedSpecies.powoId}</p>
          </div>
        )}

        {/* Mistral response */}
        {selectedSpecies && mistralData === null && <p>Loading...</p>}
        {selectedSpecies && mistralData && (
          <div className='mistral-res'>
            <h2>Response from Mistral:</h2>
            <p>{mistralData.choices[0].message.content}</p>
          </div>
        )}
      </div>
      {/* Add the map */}
      <div id="map">
        {locationData === null && <p>Map not available</p>}
        {locationData && (
          <MapContainer center={[locationData.lat, locationData.lng]} zoom={5} style={{ height: "60vh", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {locationData && (
              <Marker position={[locationData.lat, locationData.lng]}>
                <Popup>
                  <strong>Locality:</strong> {locationData.locality}<br />
                  <strong>Scientific Name:</strong> {locationData.scientificName}
                </Popup>
              </Marker>
            )}
          </MapContainer>
        )}
      </div>
    </div>
  );
}

export default App;
