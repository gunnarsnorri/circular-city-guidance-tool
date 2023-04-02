import Africa from "./regions/Africa.json";
import Austria from "./regions/Austria.json";
import Denmark from "./regions/Denmark.json";
import France from "./regions/France.json";
import Germany from "./regions/Germany.json";
import India from "./regions/India.json";
import Italy from "./regions/Italy.json";
import Portugal from "./regions/Portugal.json";
import Switzerland from "./regions/Switzerland.json";
import UK from "./regions/UK.json";

interface regionData {
    monthlyRainfall?: Array<number>;
    wasteWater?: number;
    greyWater?: number;
    blackWater?: number;
    yellowWater?: number;
    brownWater?: number;
}

interface regions {
    [key: string]: regionData
}

export const allRegionData: regions = {
    "Africa": Africa,
    "Austria": Austria,
    "Denmark": Denmark,
    "France": France,
    "Germany": Germany,
    "India": India,
    "Italy": Italy,
    "Portugal": Portugal,
    "Switzerland": Switzerland,
    "UK": UK
}
