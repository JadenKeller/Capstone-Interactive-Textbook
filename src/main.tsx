import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LandingPage from 'pages/landing_page';
import VectorOpChapter from 'pages/lessons/vector_operations/index.tsx';
import MatrixChapter from 'pages/lessons/matrices/index.tsx';
import VectorChapter from 'pages/lessons/vectors/index.tsx';

const router = createBrowserRouter([
	{
		path: "/",
		element: <LandingPage />,
	},
	{
		path: "lesson/vectors",
		element: <VectorChapter />
	},
	{
		path: "lesson/vector-operations",
		element: <VectorOpChapter />
	},
	{
		path: "lesson/matrices",
		element: <MatrixChapter />
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
)
