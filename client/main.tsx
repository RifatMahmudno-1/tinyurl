import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, useRoutes } from 'react-router-dom'
import routes from '~react-pages'
import '@/assets/tailwind.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

function App() {
	return (
		<div className="w-full min-h-[100dvh] grid grid-rows-[auto_1fr_auto]">
			<Header />
			{useRoutes(routes)}
			<Footer />
		</div>
	)
}

createRoot(document.getElementById('root') as HTMLDivElement).render(
	<StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</StrictMode>
)
