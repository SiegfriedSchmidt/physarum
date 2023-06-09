import "./styles/main.css"
import Game from "./modules/Game";

const canvas = document.getElementsByTagName('canvas')[0]
const ctx = canvas.getContext('2d')
const game = new Game(ctx)
game.run()
