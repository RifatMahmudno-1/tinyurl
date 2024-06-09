import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, useRoutes } from 'react-router-dom'
import routes from '~react-pages'
import '@/assets/tailwind.css'
import CompLoading from './components/CompLoading'

function Loading() {
	return (
		<div className="bg-cyan-200 w-full min-h-[100dvh] p-4 grid justify-items-center items-center">
			<CompLoading />
		</div>
	)
}

function App() {
	return <Suspense fallback={<Loading />}>{useRoutes(routes)}</Suspense>
}

createRoot(document.getElementById('root') as HTMLDivElement).render(
	<StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</StrictMode>
)
