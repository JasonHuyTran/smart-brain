import "./FaceRecognition.styles.css"

const displayBoxes = (boxes) => {
    let key = 0;
    return boxes.map((box) => {
        key++;
        return <div key = {key} className = 'bounding-box' style = {{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>;
    })

}

const FaceRecognition = ({imageUrl, boxes}) => {
    return(
        <div className = 'center ma'>
            <div className = 'absolute mt2'>
                <img id = "inputimage" alt = '' src = {imageUrl} width = '500px' height = 'auto'/>
                {displayBoxes(boxes)}
            </div>
        </div>
    )
}

export default FaceRecognition;