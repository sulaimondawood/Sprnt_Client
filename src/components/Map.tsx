import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  pickupCoords?: [number, number];
  dropoffCoords?: [number, number];
  driverCoords?: [number, number];
  showRoute?: boolean;
  interactive?: boolean;
  onPickupSelect?: (coords: [number, number], address: string) => void;
  onDropoffSelect?: (coords: [number, number], address: string) => void;
  className?: string;
}

const Map: React.FC<MapProps> = ({
  pickupCoords,
  dropoffCoords,
  driverCoords,
  showRoute = false,
  interactive = true,
  onPickupSelect,
  className = "h-[400px]",
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const pickupMarker = useRef<L.Marker | null>(null);
  const dropoffMarker = useRef<L.Marker | null>(null);
  const driverMarker = useRef<L.Marker | null>(null);
  const routeLayer = useRef<L.Polyline | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  // Create custom icons
  const createPickupIcon = () =>
    L.divIcon({
      className: "pickup-marker",
      html: `<div class="w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
             <div class="w-2 h-2 bg-white rounded-full"></div>
           </div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

  const createDropoffIcon = () =>
    L.divIcon({
      className: "dropoff-marker",
      html: `<div class="w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
             <div class="w-2 h-2 bg-white rounded-full"></div>
           </div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

  const createDriverIcon = () =>
    L.divIcon({
      className: "driver-marker",
      html: `<div class="relative">
             <div class="w-10 h-10 bg-primary rounded-full border-4 border-white shadow-lg flex items-center justify-center animate-pulse">
               <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
               </svg>
             </div>
             <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary/30 rounded-full animate-ping"></div>
           </div>`,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });

  // Reverse geocode using OpenStreetMap Nominatim
  const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
      );
      const data = await response.json();
      return data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    } catch {
      return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    }
  };

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = L.map(mapContainer.current, {
      center: [6.5244, 3.3792], // Lagos, Nigeria (lat, lng for Leaflet)
      zoom: 12,
      zoomControl: true,
    });

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map.current);

    // Add click handler for interactive mode
    if (interactive && onPickupSelect) {
      map.current.on("click", async (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        const address = await reverseGeocode(lat, lng);
        onPickupSelect([lng, lat], address); // Return as [lng, lat] to match existing API
      });
    }

    setIsMapReady(true);

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [interactive, onPickupSelect]);

  // Update pickup marker
  useEffect(() => {
    if (!map.current || !isMapReady) return;

    if (pickupCoords) {
      const latLng: L.LatLngExpression = [pickupCoords[1], pickupCoords[0]]; // Convert [lng, lat] to [lat, lng]

      if (pickupMarker.current) {
        pickupMarker.current.setLatLng(latLng);
      } else {
        pickupMarker.current = L.marker(latLng, {
          icon: createPickupIcon(),
        }).addTo(map.current);
      }
    }
  }, [pickupCoords, isMapReady]);

  // Update dropoff marker
  useEffect(() => {
    if (!map.current || !isMapReady) return;

    if (dropoffCoords) {
      const latLng: L.LatLngExpression = [dropoffCoords[1], dropoffCoords[0]]; // Convert [lng, lat] to [lat, lng]

      if (dropoffMarker.current) {
        dropoffMarker.current.setLatLng(latLng);
      } else {
        dropoffMarker.current = L.marker(latLng, {
          icon: createDropoffIcon(),
        }).addTo(map.current);
      }

      // Fit bounds to show both markers
      if (pickupCoords && dropoffCoords) {
        const bounds = L.latLngBounds(
          [pickupCoords[1], pickupCoords[0]],
          [dropoffCoords[1], dropoffCoords[0]],
        );
        map.current.fitBounds(bounds, { padding: [80, 80] });
      }
    }
  }, [dropoffCoords, pickupCoords, isMapReady]);

  // Update driver marker
  useEffect(() => {
    if (!map.current || !isMapReady) return;

    if (driverCoords) {
      const latLng: L.LatLngExpression = [driverCoords[1], driverCoords[0]]; // Convert [lng, lat] to [lat, lng]

      if (driverMarker.current) {
        driverMarker.current.setLatLng(latLng);
      } else {
        driverMarker.current = L.marker(latLng, {
          icon: createDriverIcon(),
        }).addTo(map.current);
      }
    }
  }, [driverCoords, isMapReady]);

  // Draw route using OSRM (Open Source Routing Machine)
  useEffect(() => {
    if (
      !map.current ||
      !isMapReady ||
      !showRoute ||
      !pickupCoords ||
      !dropoffCoords
    )
      return;

    const drawRoute = async () => {
      try {
        // OSRM expects coordinates as lng,lat
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${pickupCoords[0]},${pickupCoords[1]};${dropoffCoords[0]},${dropoffCoords[1]}?overview=full&geometries=geojson`,
        );
        const data = await response.json();
        const route = data.routes[0]?.geometry;

        if (route && map.current) {
          // Remove existing route
          if (routeLayer.current) {
            map.current.removeLayer(routeLayer.current);
          }

          // Convert GeoJSON coordinates to Leaflet format [lat, lng]
          const coordinates = route.coordinates.map(
            (coord: [number, number]) => [coord[1], coord[0]],
          );

          routeLayer.current = L.polyline(coordinates, {
            color: "#3b82f6",
            weight: 5,
            opacity: 0.8,
          }).addTo(map.current);
        }
      } catch (error) {
        console.error("Error fetching route:", error);
      }
    };

    drawRoute();
  }, [pickupCoords, dropoffCoords, showRoute, isMapReady]);

  return (
    <div className={`relative ${className} rounded-xl overflow-hidden`}>
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default Map;
