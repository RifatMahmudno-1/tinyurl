function Component({ errorRemove }: { errorRemove: Function }) {
	return (
		<div className="bg-cyan-300 w-full max-w-[30rem] p-2 rounded grid justify-items-center gap-2 shadow-md">
			<p>Some Errors have occured. Please try again</p>
			<button className="bg-cyan-400 px-2 py-1 rounded" onClick={() => errorRemove()}>
				Okay
			</button>
		</div>
	)
}

export default Component
