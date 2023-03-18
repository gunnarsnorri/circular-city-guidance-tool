export abstract class NBSSystem {
    abstract runoffCoefficient: number
    abstract name: String
    area: number;
    constructor() {
        this.area = 0;
    }
    setArea(area: number) {
        this.area = area;
    }
    surfaceRunoff(monthlyRainfall: number) {
        return Math.round(this.area * this.runoffCoefficient * monthlyRainfall);
    }
}

export class GreenRoof extends NBSSystem {
    runoffCoefficient: number;
    name: String;
    constructor() {
        super()
        this.runoffCoefficient = 0.3;
        this.name = "Green Roof"
    }
}

export class ImperviousArea extends NBSSystem {
    runoffCoefficient: number;
    name: String;
    constructor() {
        super()
        this.name = "Impervious Area"
        this.runoffCoefficient = 0.8;
    }
}

export class PerviousArea extends NBSSystem {
    runoffCoefficient: number;
    name: String;
    constructor() {
        super()
        this.name = "Pervious Area"
        this.runoffCoefficient = 0.15;
    }
}

export const allNBSSystems: Array<NBSSystem> = [new GreenRoof(), new ImperviousArea(), new PerviousArea()]
