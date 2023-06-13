import "./styles/main.css"
import Simulation from "./modules/Simulation";

// const info_pos = document.getElementById('pos')
// const info_color = document.getElementById('color')
const info_fps = document.getElementById('fps')
const canvas = document.getElementsByTagName('canvas')[0]
const ctx = canvas.getContext('2d', { willReadFrequently: true })
const simulation = new Simulation(ctx, info_fps)
simulation.run()

// window.addEventListener('mousemove', (e) => {
//     info_pos.textContent = `${e.x} ${e.y}`
//     info_color.textContent = `${ctx.getImageData(e.x, e.y, 1, 1).data}`
// })
