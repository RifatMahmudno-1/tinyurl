import { FormEvent, useState, ChangeEvent } from 'react'
import IconLoading from '@/components/IconLoading'
import CompError from '@/components/CompError'
import CompShowUrl from '@/components/CompShowUrl'

function Page() {
	const [url, setUrl] = useState('')
	const [busy, setBusy] = useState(false)
	const [showError, setShowError] = useState(false)
	const [shortUrl, setShortUrl] = useState('')

	function inputChange(e: ChangeEvent<HTMLInputElement>) {
		setUrl(e.target.value)
		try {
			new URL(e.target.value)
			e.target.setCustomValidity('')
		} catch {
			e.target.setCustomValidity('Must be a valid Link/URL')
		}
	}

	function reset() {
		setUrl('')
		setBusy(false)
		setShowError(false)
		setShortUrl('')
	}

	function errorRemove() {
		setBusy(false)
		setShowError(false)
	}

	async function submit(ev: FormEvent) {
		ev.preventDefault()
		if (busy) return
		setBusy(true)
		try {
			const got = await fetch('/link', {
				method: 'PUT',
				body: JSON.stringify({
					url: url
				}),
				headers: {
					'content-type': 'application/json'
				}
			})

			if (!got.ok) return setShowError(true)

			const json = await got.json()
			if (!json?.short_url) return setShowError(true)
			return setShortUrl(`${globalThis.location.origin}/${json.short_url}`)
		} catch {
			return setShowError(true)
		}
	}

	return (
		<div className="w-full min-h-[100dvh] bg-cyan-200 p-4 grid justify-items-center items-center" onSubmit={submit}>
			{showError ? (
				<CompError errorRemove={errorRemove} />
			) : shortUrl ? (
				<CompShowUrl reset={reset} shortUrl={shortUrl} />
			) : (
				<form className="w-full max-w-[30rem] bg-cyan-300 grid gap-2 p-2 rounded shadow-md">
					<label htmlFor="url">Enter the Link/URL below:</label>
					<input type="text" id="url" className="rounded px-1 bg-white" placeholder="Link/URL" spellCheck="false" required minLength={4} maxLength={2000} disabled={busy} onChange={inputChange} value={url} />
					{busy ? (
						<div className="justify-self-center flex items-center gap-1">
							<IconLoading /> <span>Please wait</span>
						</div>
					) : (
						<button type="submit" className="rounded px-2 py-1 bg-cyan-400 justify-self-center shadow-sm hover:shadow-md transition-shadow" disabled={busy}>
							Submit
						</button>
					)}
				</form>
			)}
		</div>
	)
}

export default Page
