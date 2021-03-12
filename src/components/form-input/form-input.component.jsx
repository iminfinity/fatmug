
const FormInput = ({title, description, setDescription, setTitle}) => {
    return (
        <>
        <label>Title</label>
        <input 
            type="text"
            value={title}
            onChange={(event)=> setTitle(event.target.value)}
        />
        <label>Description</label>
        <textarea 
            rows="14"
            value={description}
            onChange={(event)=> setDescription(event.target.value)}
        ></textarea>
     </>   
    )
}

export default FormInput;