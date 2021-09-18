import { globalCounterSub } from "../__services__/message.service.js"

let count = 0

let globalCounter = globalCounterSub('imba-pod')

globalCounter.subscribe do(n)
	count = n
	imba.commit!

def decrement do globalCounter.update do(n) --n
def increment do globalCounter.update do(n) ++n

def app
	<article.Imba>
		<button.decrement @click=decrement> "–"
		<div.number> count
		<button.increment @click=increment> "+"

imba.mount app, document.querySelector("#imba-pod")

