import { useParams } from "react-router-dom"

const Conversation = () => {

    const userId = useParams().id
    
    return (
        <div>
            conversation
        </div>
    )
}

export default Conversation
