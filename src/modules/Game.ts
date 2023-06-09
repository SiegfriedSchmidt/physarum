import Draw from "./Draw";
import Cube from "./Cube";

export default class Game {
    readonly ctx: CanvasRenderingContext2D;
    readonly draw: Draw
    frames: number
    readonly width: number
    readonly height: number
    private readonly cubes: Cube[];

    constructor(ctx: CanvasRenderingContext2D) {
        this.draw = new Draw(ctx)
        this.ctx = ctx
        this.frames = 0
        this.ctx.canvas.width = window.innerWidth
        this.ctx.canvas.height = window.innerHeight
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.cubes = []
    }

    getTime() {
        return (new Date()).getMilliseconds()
    }

    render() {
        this.cubes.forEach(cube => {
            cube.update()
            cube.render()
        })
    }

    update() {
        this.draw.fillScreen('white')
        this.render()
        this.frames++;
        requestAnimationFrame(() => this.update())
    }

    init() {
        for (let i = 0; i < 1024; i++) {
            const color = `rgb(${i / 4},${(Math.sin(i) + 1) * 128},${(1024 - i) / 4})`
            this.cubes.push(new Cube(this, 0.01, 20, i / 1000 * Math.PI / 2 + 1.5 * Math.PI, 50, color))
        }
    }

    run() {
        console.log('Start')
        this.init()
        this.update()
    }
}