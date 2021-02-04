import "./ImageLinkForm.styles.css"

const ImageLinkForm = ({imageLinkFormChange, submit}) => {
    return(
        <div>
            <p className = 'f3'>
                {'This Magic Brain will detect faces in your pictures. Give it a try!'}
                {" example url: https://i2-prod.mirror.co.uk/incoming/article14334083.ece/ALTERNATES/s615/3_Beautiful-girl-with-a-gentle-smile.jpg"}
            </p>
            <div className = "center">
                <div className = 'center pa4 br3 shadow-5 form'> 
                    <input 
                        className = 'f4 pa2 w-70 center' 
                        type = "tex" 
                        onChange = {imageLinkFormChange}
                    />
                    <button 
                        className = 'w-30 grow f4 link ph3 pv2 dib white bg-light-purple' 
                        onClick = {submit}
                        >Detect
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;