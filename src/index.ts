import "./styles/main.css"
import Simulation from "./modules/Game";

const canvas = document.getElementsByTagName('canvas')[0]
const ctx = canvas.getContext('2d')
const simulation = new Simulation(ctx)
simulation.run()
