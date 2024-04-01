import React, { useEffect, useState } from 'react';

function App() {
  // State for all the species in backendData and juste  on in selectedSpecis
  const [backendData, setBackendData] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState(null);

  // State for the mistralApi 

  useEffect(() => {
    // We get the species data from the backend 
    fetch("/species")
      .then(res => res.json())  // Transform it to be sure its JSON
      .then(data => {
        setBackendData(data);
      })
      .catch(error => {
        console.error("Error fetching species data:", error);
      });
  }, []);

  // When the user select a species, we update the selectedSpecies
  const SpeciesChange = (event) => {
    const speciesName = event.target.value;
    const selectedSpecies = backendData.find(species => species.commonNames.includes(speciesName));
    setSelectedSpecies(selectedSpecies);
  };

  return (
    <div>
      <h1>Species:</h1>
       {/* We create a dropdown list with all the commonNames of the species */}
      <select onChange={SpeciesChange}>
        <option value="">Select a species</option>
        {backendData.map((item, index) => (
          <option key={index} value={item.commonNames[0]}>{item.commonNames[0]}</option>
        ))}
      </select>

      {/* We display the information of the selected species */}
      {selectedSpecies && (
        <div>
          <h2>{selectedSpecies.commonNames[0]}</h2>
          <p>Scientific Name: {selectedSpecies.scientificNameWithoutAuthor}</p>
          <p>Authorship: {selectedSpecies.scientificNameAuthorship}</p>
          <p>GBIF ID: {selectedSpecies.gbifId}</p>
          <p>POWO ID: {selectedSpecies.powoId}</p>
          <p>IUCN Category: {selectedSpecies.iucnCategory}</p>
        </div>
      )}
    </div>
  );
}

export default App;
