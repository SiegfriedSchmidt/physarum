import Simulation from "./Simulation";


export default class {
    public x: number;
    public y: number;
    public vx: number;
    public vy: number;
    private simulation: Simulation;

    constructor(x: number, y: number, vx: number, vy: number, simulation: Simulation) {
        this.x = x;
        this.y = y;
        this.vx = vx
        this.vy = vy
        this.simulation = simulation
    }

    update() {
        this.x = (this.x + this.vx) % this.simulation.width;
        this.y = (this.y + this.vy) % this.simulation.height;
    }
}