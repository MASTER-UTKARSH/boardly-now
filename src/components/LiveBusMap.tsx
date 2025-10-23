import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { MapPin } from "lucide-react";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 28.6139, // Delhi (example coordinates)
  lng: 77.2090,
};

const LiveBusMap = () => {
  const [busLocation, setBusLocation] = useState(defaultCenter);
  const [pickupLocation] = useState({
    lat: 28.6129,
    lng: 77.2295,
  });

  // Simulate bus movement (replace with real tracking data)
  useEffect(() => {
    const interval = setInterval(() => {
      setBusLocation((prev) => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001,
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="w-full h-full bg-secondary rounded-xl flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
          <p className="text-sm">Google Maps API key required</p>
        </div>
      </div>
    );
  }

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={busLocation}
        zoom={14}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: [
            {
              featureType: "all",
              elementType: "geometry",
              stylers: [{ color: "#1a1f2e" }],
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#0ea5e9" }],
            },
          ],
        }}
      >
        {/* Bus marker */}
        <Marker
          position={busLocation}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: "#06b6d4",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 2,
          }}
          title="Bus Location"
        />
        
        {/* Pickup point marker */}
        <Marker
          position={pickupLocation}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#f97316",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 2,
          }}
          title="Pickup Point"
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default LiveBusMap;
