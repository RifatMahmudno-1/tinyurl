import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import CompLoading from '@/components/CompLoading'
import CompNotFound from '@/components/CompNotFound'
import CompError from '@/components/CompError'
import IconCopy from '@/components/IconCopy'

function IntComp({ url }: { url: string }) {
	const [seconds, setSeconds] = useState(5)

	useEffect(() => {
		const interval = setInterval(() => {
			setSeconds(s => {
				if (s > 0) return s - 1
				clearInterval(interval)
				globalThis.location.href = url
				return s
			})
		}, 1000)

		return () => clearInterval(interval)
	}, [])

	return (
		<p>
			You will be redirected to the following url in <span className="text-red-500 font-semibold text-lg">{seconds}</span> seconds
		</p>
	)
}

function Page() {
	const { short_url } = useParams()
	const [loading, setLoading] = useState(true)
	const [notFound, setNotFound] = useState(false)
	const [error, setError] = useState(false)
	const [data, setData] = useState({ actual_url: '', createdAt: null })
	const [copied, setCopied] = useState(false)
	const [reFetch, setReFetch] = useState(true)

	function copy() {
		globalThis.navigator.clipboard.writeText(data.actual_url)
		setCopied(true)
	}

	async function errorRemove() {
		setLoading(true)
		setNotFound(false)
		setError(false)
		setData({ actual_url: '', createdAt: null })
		setCopied(false)
		setReFetch(r => !r)
	}

	async function getData() {
		if (!short_url || short_url.length < 8 || short_url.length > 16) {
			setLoading(false)
			setNotFound(true)
			return
		}

		try {
			const got = await fetch('/link', { method: 'POST', body: JSON.stringify({ short_url }), headers: { 'content-type': 'application/json' } })

			if (!got.ok) {
				if (got.status === 404) setNotFound(true)
				else setError(true)
			} else {
				const json = await got.json()
				if (!json?.actual_url || !json?.createdAt) setError(true)
				else setData({ actual_url: json.actual_url, createdAt: json.createdAt })
			}
		} catch (e) {
			setError(true)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		getData()
	}, [reFetch])

	return (
		<div className="bg-cyan-200 p-4 grid justify-items-center items-center">
			{loading ? (
				<CompLoading />
			) : error ? (
				<CompError errorRemove={errorRemove} />
			) : notFound ? (
				<CompNotFound />
			) : (
				<div className="bg-cyan-300 w-full max-w-[30rem] p-2 rounded grid justify-items-center gap-2 shadow-md">
					<IntComp url={data.actual_url} />
					<div className="bg-white rounded w-full break-all px-2 max-h-[10rem] overflow-auto text-center select-all">{data.actual_url}</div>
					{copied ? (
						<p className="text-lime-600">Copied to the clipboard</p>
					) : (
						<button type="button" onClick={copy} className="bg-cyan-400 shadow-md rounded px-2 py flex items-center gap-2">
							<IconCopy /> Copy
						</button>
					)}
					<div className="flex gap-2">
						<button type="button" className="bg-cyan-400 shadow-md rounded px-2 py-1" onClick={() => globalThis.history.back()}>
							Go Back
						</button>
						<button type="button" className="bg-cyan-400 shadow-md rounded px-2 py-1" onClick={() => (globalThis.location.href = data.actual_url)}>
							Go Now
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default Page
