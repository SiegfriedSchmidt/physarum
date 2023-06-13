import Simulation from "./Simulation";

export interface vecInterface {
    sensor: { angle: number, len: number }
    move: { angle: number, len: number }
}

export default class {
    readonly insaneThreshold: number;
    readonly insaneTime: number;
    readonly vec: vecInterface[]
    readonly simulation: Simulation;
    public x: number;
    public y: number;
    public angleView: number;
    public insaneStep: number;
    public insaneState: boolean;

    constructor(x: number, y: number, insaneThreshold: number, insaneTime: number, vec: vecInterface[], simulation: Simulation) {
        this.x = x;
        this.y = y;
        this.insaneThreshold = insaneThreshold
        this.insaneTime = insaneTime
        this.vec = vec
        this.insaneStep = 0
        this.insaneState = false
        this.angleView = 0
        this.simulation = simulation
    }

    getPheromoneVal(x: number, y: number) {
        const color = this.simulation.ctx.getImageData(x, y, 1, 1).data
        return color[1]
    }

    update() {
        const pheromone = this.getPheromoneVal(this.x, this.y)
        if (pheromone > this.insaneThreshold && !this.insaneState) {
            this.insaneState = true
        }

        const pheromoneCount: number[] = []
        for (let i = 0; i < this.vec.length; i++) {
            const sensorAngle = this.vec[i].sensor.angle + this.angleView
            const dx = Math.cos(sensorAngle) * this.vec[i].sensor.len
            const dy = Math.sin(sensorAngle) * this.vec[i].sensor.len

            const x = (this.x + dx + this.simulation.width) % this.simulation.width
            const y = (this.y + dy + this.simulation.height) % this.simulation.height

            pheromoneCount.push(this.getPheromoneVal(x, y))
        }

        let dirIndex;
        if (this.insaneState) {
            dirIndex = pheromoneCount.indexOf(Math.min(...pheromoneCount))
            if (++this.insaneStep >= this.insaneTime) {
                this.insaneStep = 0
                this.insaneState = false
            }
        } else {
            dirIndex = pheromoneCount.indexOf(Math.max(...pheromoneCount))
        }

        const moveAngle = this.vec[dirIndex].move.angle + this.simulation.twistingAngle + this.angleView
        this.angleView = moveAngle

        const dx = Math.cos(moveAngle) * this.vec[dirIndex].move.len + this.simulation.getWobblingValue()
        const dy = Math.sin(moveAngle) * this.vec[dirIndex].move.len + this.simulation.getWobblingValue()

        this.x = (this.x + dx + this.simulation.width) % this.simulation.width
        this.y = (this.y + dy + this.simulation.height) % this.simulation.height
    }
}