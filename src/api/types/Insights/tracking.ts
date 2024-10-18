export interface Waypoint {
    GPSLatitude: string;
    GPSLongitude: string;
    WaypointTime: string;
}

export interface VehicleTracker {
    VendorLocationID: number;
    VendorLocationName: string;
    DriverName: string;
    DeliveryPlanNO: string;
    DeliveryPlanStatusID: number;
    DeliveryPlanStatusName: string;
    VendorLocationStatusID: number;
    CurrentLatitude: string;
    CurrentLongitude: string;
    CurrentSpeed: number;
    AverageSpeed: number;
    TrackerTime: string;
    WaypointsArray: Waypoint[];
    StoppageArray: any[];
}

export interface HeatmapData {
    Latitude: string;
    Longitude: string;
    Density: number;
}
