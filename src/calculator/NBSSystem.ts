import NBSSystems from "../data/json/NBSSystems.json";

type NBSArea = {
    [key: string]: number
}

export class NBSSystem {
    runoffCoefficient: number
    name: string
    area: number;
    constructor(systemName: string, systemRunoffCoefficient: number) {
        this.name = systemName;
        this.runoffCoefficient = systemRunoffCoefficient;
        this.area = (JSON.parse(localStorage.getItem("nbsSystemsArea") ?? "{}") as NBSArea)[systemName] ?? 0;
    }
    setArea(area: number) {
        this.area = area;
        const storageObj: NBSArea = (JSON.parse(localStorage.getItem("nbsSystemsArea") ?? "{}") as NBSArea);
        storageObj[this.name] = area;
        localStorage.setItem("nbsSystemsArea", JSON.stringify(storageObj));
    }
    surfaceRunoff(monthlyRainfall: number) {
        return Math.round(this.area * this.runoffCoefficient * monthlyRainfall);
    }
}

export const allNBSSystems: Array<NBSSystem> = NBSSystems.map((system) => new NBSSystem(system.name, system.runofCoefficient));
