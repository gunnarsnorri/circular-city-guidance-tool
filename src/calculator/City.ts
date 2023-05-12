import Berlin from "../data/json/cities/Berlin.json";
import Copenhagen from "../data/json/cities/Copenhagen.json";
import Istanbul from "../data/json/cities/Istanbul.json";
import Lisbon from "../data/json/cities/Lisbon.json";
import Rome from "../data/json/cities/Rome.json";
import TelAviv from "../data/json/cities/TelAviv.json";
import Vienna from "../data/json/cities/Vienna.json";

interface CityData {
    "ET0_hor": number;
    "ET0_west": number;
    "ET0_south": number;
    "ET0_north": number;
    "ET0_east": number;
}

interface cities {
    [key: string]: Array<CityData>
}

export const allCityData: cities = {
    "Berlin": Berlin,
    "Copenhagen": Copenhagen,
    "Istanbul": Istanbul,
    "Lisbon": Lisbon,
    "Rome": Rome,
    "TelAviv": TelAviv,
    "Vienna": Vienna
}
