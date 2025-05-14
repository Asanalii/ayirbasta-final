import React, { useState, useMemo } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
// import PlacesAutocomplete from "./PlacesAutocomplete";

export default function AddressInput({
  coordinates,
  setCoordinates,
  address,
  setAddress,
}) {
  const center = useMemo(() => ({ lat: 48.210033, lng: 16.363449 }), []);
  const [selected, setSelected] = useState(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDoCi31rZtCU2yZyDtYKskScWmw8i6Vld8",
    libraries: ["places"],
  });
  if (!isLoaded) return <div>Loading ...</div>;
  return (
    <div>
      <div>
        <PlacesAutocomplete
          setSelected={setSelected}
          coordinates={coordinates}
          setCoordinates={setCoordinates}
          setAddress={setAddress}
          address={address}
        />
      </div>
      <GoogleMap
        zoom={12}
        center={center}
        mapContainerClassName="map-container-offer"
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
    </div>
  );
}

const PlacesAutocomplete = ({
  setSelected,
  coordinates,
  setCoordinates,
  setAddress,
  address,
}) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions;

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
    setCoordinates(getLatLng(results[0]));
  };
  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setAddress(e.target.value);
        }}
        disabled={!ready}
        className="combobox-input"
        placeholder={`${address}`}
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};
