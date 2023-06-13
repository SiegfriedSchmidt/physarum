import Draw from "./Draw";
import Agent from "./Agent";
import {vecInterface} from "./Agent";

interface sensorMoveInterface {
    sensorAngRange: { v1: number, v2: number }
    sensorLenRange: { v1: number, v2: number }
    moveAngRange: { v1: number, v2: number }
    moveLenRange: { v1: number, v2: number }
}

function getTime() {
    return (new Date()).getMilliseconds()
}

function getRandomValue(v1: number, v2 = 0) {
    const max = Math.max(v1, v2)
    const min = Math.min(v1, v2)
    return Math.random() * (max - min) + min;
}

function radians(angle: number) {
    return angle / 180 * Math.PI
}

export default class Simulation {
    readonly ctx: CanvasRenderingContext2D;
    readonly draw: Draw
    readonly width: number
    readonly height: number
    readonly sensorMove: sensorMoveInterface[]
    private agents: Agent[];
    private info_fps: HTMLElement;
    public pheromone: number
    public wobbling: number
    public twistingAngle: number
    public insaneThresholdRange: { v1: number, v2: number }
    public insaneTimeRange: { v1: number, v2: number }

    constructor(ctx: CanvasRenderingContext2D, info_fps: HTMLElement) {
        this.ctx = ctx
        this.draw = new Draw(ctx)
        this.ctx.canvas.width = window.innerWidth
        this.ctx.canvas.height = window.innerHeight
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.agents = []
        this.info_fps = info_fps

        this.pheromone = 0.04
        this.wobbling = 0.3
        this.twistingAngle = -10
        this.insaneThresholdRange = {v1: 250, v2: 280}
        this.insaneTimeRange = {v1: 10, v2: 20}
        this.sensorMove = [
            {
                sensorAngRange: {v1: -30, v2: -60},
                sensorLenRange: {v1: 30, v2: 30},
                moveAngRange: {v1: -30, v2: -40},
                moveLenRange: {v1: 1, v2: 2}
            },
            {
                sensorAngRange: {v1: -40, v2: 0},
                sensorLenRange: {v1: 30, v2: 30},
                moveAngRange: {v1: -15, v2: 15},
                moveLenRange: {v1: 1, v2: 2}
            },
            {
                sensorAngRange: {v1: 60, v2: 90},
                sensorLenRange: {v1: 30, v2: 30},
                moveAngRange: {v1: 60, v2: 90},
                moveLenRange: {v1: 1, v2: 2}
            },
        ]
    }

    getWobblingValue() {
        return getRandomValue(-this.wobbling, this.wobbling)
    }

    renderAgents() {
        this.agents.forEach(agent => {
            agent.update()
            this.draw.Circle(agent.x, agent.y, 1, 'white')
        })
    }

    render() {
        this.renderAgents()
    }

    update() {
        const t = getTime()
        this.draw.fillScreen(`rgba(0,0,0,${this.pheromone})`)
        this.render()
        this.info_fps.textContent = `${Math.round(getTime() - t)}`
        requestAnimationFrame(() => this.update())
    }

    getSensorVectors(sensorMove: sensorMoveInterface[]) {
        const vec: vecInterface[] = []
        sensorMove.forEach(({sensorAngRange, sensorLenRange, moveAngRange, moveLenRange}) => {
            const sensorAng = radians(getRandomValue(sensorAngRange.v1, sensorAngRange.v2))
            const sensorLen = getRandomValue(sensorLenRange.v1, sensorLenRange.v2)
            const moveAng = radians(getRandomValue(moveAngRange.v1, moveAngRange.v2))
            const moveLen = getRandomValue(moveLenRange.v1, moveLenRange.v2)
            vec.push({sensor: {angle: sensorAng, len: sensorLen}, move: {angle: moveAng, len: moveLen}})
        })
        return vec
    }

    init() {
        this.twistingAngle = radians(this.twistingAngle)
        this.draw.fillScreen('rgb(12, 12, 12)')
        for (let i = 0; i < 30000; i++) {
            const vec = this.getSensorVectors(this.sensorMove)
            this.agents.push(
                new Agent(
                    getRandomValue(400, this.width - 400),
                    getRandomValue(200, this.height - 200),
                    getRandomValue(this.insaneThresholdRange.v1, this.insaneThresholdRange.v2),
                    getRandomValue(this.insaneTimeRange.v1, this.insaneTimeRange.v2),
                    vec,
                    this
                )
            )
        }
    }

    run() {
        console.log('Start', 'Resolution', this.width, this.height)
        this.init()
        this.update()
    }
}