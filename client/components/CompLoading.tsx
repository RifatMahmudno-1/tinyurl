import IconLoading from './IconLoading'

function Component() {
	return (
		<div className="bg-cyan-300 w-full max-w-[30rem] p-2 rounded grid justify-items-center gap-2 shadow-md">
			<div className="flex gap-2 items-center">
				<IconLoading />
				Loading
			</div>
			<p>Please wait while loading</p>
		</div>
	)
}

export default Component
