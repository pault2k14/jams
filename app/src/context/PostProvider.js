import { createContext,useMemo, useState, useContext } from 'react'
import {FaB, FaP} from "react-icons/fa6";
const PostContext = createContext()
PostContext.displayName = 'ValueContext'

const initialPosts = [{
    name: "Paul Thompson",
    profileImage: <span><FaP size={100} style={{backgroundColor:'blue', color:'white', borderRadius:'40%'}}/></span>,
    mediumProfileImage: <span><FaP size={50} style={{backgroundColor:'blue', color:'white', borderRadius:'40%'}}/></span>,
    miniProfileImage: <span><FaP size={25} style={{backgroundColor:'blue', color:'white', borderRadius:'40%'}}/></span>,
    friends: 251,
    posts: [
        {
            timestamp: 1702111165413,
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            timestamp: 1701111165413,
            content: "Until recently, the prevailing view assumed lorem ipsum was born as a nonsense text. “It's not Latin, though it looks like it, and it actually says nothing,” Before & After magazine answered a curious reader, “Its ‘words’ loosely approximate the frequency with which letters occur in English, which is why at a glance it looks pretty real.”"
        }
]}];

export const usePost = () => {
    const context = useContext(PostContext)
    if (context === undefined) {
        throw new Error('usePost must be used within a PostProvider')       }
    return context
}
const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState(initialPosts)
    const postObject = useMemo(() => {
        return { posts, setPosts }
    }, [posts, setPosts])
    return <PostContext.Provider value={postObject}>{children}  </PostContext.Provider>
}
export default PostProvider