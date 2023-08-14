import React, {useState} from "react";
import Webcam from "react-webcam";
import "./App.css";

// IMAGE URL
// TIME CAPTURED

function App() {
	const webcamRef = React.useRef(null);
	const [capturedImage, setCapturedImage] = useState(null);

	console.log(capturedImage);

	const captureImage = () => {
		const imageSrc = webcamRef.current.getScreenshot();
		setCapturedImage(imageSrc);

		console.log(webcamRef.current);
	};

	const retakeImage = () => {
		setCapturedImage(null);
	};

	const sendImage = async () => {
		// API - https://api.imgbb.com/1/upload
		// KEY - 6a235cc2b047e7963e70cfeadeabd6bd

		try {
			const base64Image = capturedImage.split(",")[1];

			const formData = new FormData();
			formData.append("image", base64Image);

			const response = await fetch(
				`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}&name=test-2`,
				{
					method: "POST",
					body: formData,
				}
			);

			if (response.ok) {
				const data = await response.json();
				console.log("Image uploaded:", data);
				// You can handle the response data here, such as displaying a link to the uploaded image.
			} else {
				console.error("Error uploading image");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-2xl font-semibold mb-4">Webcam Face Capture</h1>
			<div className="w-full max-w-lg bg-gray-100 p-4 rounded-md shadow-md">
				{capturedImage ? (
					<>
						<img src={capturedImage} alt="Captured" className="mb-2" />
						<button
							onClick={retakeImage}
							className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
						>
							Retake
						</button>
						<button
							className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
							onClick={sendImage}
						>
							Submit
						</button>
					</>
				) : (
					<>
						<div className="relative">
							<Webcam
								audio={false}
								mirrored={true}
								ref={webcamRef}
								screenshotFormat="image/jpeg"
								className="mb-2"
							/>
						</div>
						<button
							onClick={captureImage}
							className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
						>
							Capture
						</button>
					</>
				)}
			</div>
		</div>
	);
}

export default App;
