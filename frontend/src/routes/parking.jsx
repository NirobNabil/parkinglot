

const Button = ({cam_name}) => {

    const get_file = async () => {
        const response = await fetch('http://127.0.0.1:5000/parking', {
            method: 'POST',
            body: JSON.stringify({cam_name}),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        // Create a link element and click it to start the download
        const link = document.createElement('a');
        link.href = url;
        link.download = cam_name + ".mp4";  // Filename for download
        document.body.appendChild(link); // Required for Firefox
        link.click();
        link.remove(); // Clean up the link element

        // Clean up the URL object
        window.URL.revokeObjectURL(url);

    }

    return (
        <button style={{"cursor": "pointer"}} onClick={get_file} >{cam_name}</button>
    )
}


const Parking = () => {
    return (
        <div style={{'display': 'flex', 'flexDirection': 'column', 'gap': '1rem'}} >
            <Button cam_name={"camera1"} />
            <Button cam_name={"camera2"} />
            <Button cam_name={"camera3"} />
        </div>
    )
}

export default Parking