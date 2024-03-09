import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import MatrixTransformations from 'pages/lessons/matrices/MatrixTranformations/MatrixTransformations.tsx';
import PlusMinus from 'pages/lessons/vector_operations/dot_product/PlusMinus/PlusMinus.tsx';

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},

	{
		path: "lesson/vector-operations/dot-product/plus-minus",
		element: <PlusMinus />
	},
	{
		path: "lesson/matrix/transformations",
		element: <MatrixTransformations />
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
)
