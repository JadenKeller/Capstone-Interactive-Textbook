export default function VectorLayout({ content, canvas }: { content: JSX.Element, canvas: JSX.Element }) {
	return (
		<div>
			{/* Wrap with required styles */}

			{/* Place content for chapter */}
			{content}

			{/* Place canvas for chapter */}
			{canvas}
		</div>
	)
}