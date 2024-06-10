import IconHeart from './IconHeart'

function Comp() {
	return (
		<footer className="bg-cyan-400 flex items-center gap-1 justify-center p-1">
			Made with
			<span className="text-rose-500 text-xl">
				<IconHeart />
			</span>
			by
			<a className="font-semibold" target="_blank" href="https://github.com/RifatMahmudno-1">
				Rifat Mahmud
			</a>
		</footer>
	)
}

export default Comp
