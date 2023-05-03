import Africa from "../data/json/regions/Africa.json";
import Austria from "../data/json/regions/Austria.json";
import Denmark from "../data/json/regions/Denmark.json";
import France from "../data/json/regions/France.json";
import Germany from "../data/json/regions/Germany.json";
import India from "../data/json/regions/India.json";
import Italy from "../data/json/regions/Italy.json";
import Portugal from "../data/json/regions/Portugal.json";
import Switzerland from "../data/json/regions/Switzerland.json";
import UK from "../data/json/regions/UK.json";

interface regionData {
    monthlyRainfall?: Array<number>;
    wasteWater?: number;
    greyWater?: number;
    blackWater?: number;
    yellowWater?: number;
    brownWater?: number;
    kitchenWaste?: number;
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
