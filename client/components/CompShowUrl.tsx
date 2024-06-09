import { useState } from 'react'
import IconCopy from './IconCopy'

function Component({ reset, shortUrl }: { reset: Function; shortUrl: string }) {
	const [copied, setCopied] = useState(false)

	function copy() {
		globalThis.navigator.clipboard.writeText(shortUrl)
		setCopied(true)
	}

	return (
		<div className="bg-cyan-300 w-full max-w-[30rem] p-2 rounded grid justify-items-center gap-2 shadow-md">
			<p>The shortened URL/Link is:</p>
			<div className="grid grid-cols-[1fr_auto] gap-2 items-center">
				<p className="bg-white px-2 rounded break-all select-all">{shortUrl}</p>
				{!copied ? (
					<button onClick={copy}>
						<IconCopy />
					</button>
				) : null}
			</div>
			{copied ? <p className="text-lime-600">Copied to the clipboard</p> : null}
			<button className="bg-cyan-400 px-2 rounded shadow-sm hover:shadow-md transition-shadow" onClick={() => reset()}>
				Short Another
			</button>
		</div>
	)
}

export default Component
