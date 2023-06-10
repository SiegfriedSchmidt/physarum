import Draw from "./Draw";
import Agent from "./Agent";

export default class Simulation {
    readonly ctx: CanvasRenderingContext2D;
    readonly draw: Draw
    readonly width: number
    readonly height: number
    public agents: Agent[];
    public field: number[][];

    constructor(ctx: CanvasRenderingContext2D) {
        this.draw = new Draw(ctx)
        this.ctx = ctx
        this.ctx.canvas.width = window.innerWidth
        this.ctx.canvas.height = window.innerHeight
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.agents = []
        this.field = []
    }

    getTime() {
        return (new Date()).getMilliseconds()
    }

    getRandomValue(max: number, min = 0) {
        return Math.random() * (max - min) + min;
    }

    initField(sx: number, sy: number, value: any) {
        return new Array(sx).fill(value).map(() => new Array(sy).fill(value));
    }

    renderAgents() {
        this.agents.forEach(agent => {
            agent.update()
            this.draw.Circle(agent.x, agent.y, 5, 'white')
        })
    }

    renderPheromone() {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                if (this.field[x][y] != 0) {
                    this.draw.Rect(x, y, 1, 'rgba(0, 0, 0)')
                }
            }
        }
    }

    render() {
        this.renderAgents()
        const t = this.getTime()
        this.renderPheromone()
        console.log(this.getTime() - t)
    }

    update() {
        this.draw.fillScreen('black')
        this.render()
        requestAnimationFrame(() => this.update())
    }

    init() {
        this.field = this.initField(this.width, this.height, 0)
        for (let i = 0; i < 10000; i++) {
            this.agents.push(new Agent(this.getRandomValue(this.width), this.getRandomValue(this.height)))
        }
    }

    run() {
        console.log('Start', 'Resolution', this.width, this.height)
        this.init()
        this.update()
    }
}