
const ImageUploader = ({uploadRef, handleFile, imageSrc}) => {
    return(
        <>
            <div>
                <input
                    type="file"
                    ref={uploadRef}
                    onChange={handleFile}
                    multiple={false}
                />
            </div>
            <div>
                {
                    imageSrc ? ( <img src={imageSrc} alt="" />) : null
                }
            </div>
        </>
    )
}

export default ImageUploader;