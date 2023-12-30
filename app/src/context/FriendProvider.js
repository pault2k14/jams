import { createContext,useMemo, useState, useContext } from 'react'
import { FaB, FaJ } from "react-icons/fa6";

const FriendsContext = createContext()
FriendsContext.displayName = 'ValueContext'

const initialFriends = [
    {
        name: "Bob Smith",
        profileImage: <span><FaB size={100} style={{backgroundColor:'blue', color:'white', borderRadius:'40%'}}/></span>,
        mediumProfileImage: <span><FaB size={50} style={{backgroundColor:'blue', color:'white', borderRadius:'40%'}}/></span>,
        miniProfileImage: <span><FaB size={25} style={{backgroundColor:'blue', color:'white', borderRadius:'40%'}}/></span>,
        friends: 403,
        mutualFriends: 5,
        posts: [
            {
                timestamp: 1702311165413,
                content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            },
            {
                timestamp: 1700511165413,
                content: "Until recently, the prevailing view assumed lorem ipsum was born as a nonsense text. “It's not Latin, though it looks like it, and it actually says nothing,” Before & After magazine answered a curious reader, “Its ‘words’ loosely approximate the frequency with which letters occur in English, which is why at a glance it looks pretty real.”"
            }
        ]
    },
    {
        name: "Jim Johnson",
        profileImage: <span><FaJ size={100} style={{backgroundColor:'green', color:'white', borderRadius:'40%'}}/></span>,
        mediumProfileImage: <span><FaJ size={50} style={{backgroundColor:'green', color:'white', borderRadius:'40%'}}/></span>,
        miniProfileImage: <span><FaJ size={25} style={{backgroundColor:'green', color:'white', borderRadius:'40%'}}/></span>,
        friends: 72,
        mutualFriends: 2,
        posts: [
            {
                timestamp: 1701911165413,
                content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            },
            {
                timestamp: 1701311165413,
                content: "Until recently, the prevailing view assumed lorem ipsum was born as a nonsense text. “It's not Latin, though it looks like it, and it actually says nothing,” Before & After magazine answered a curious reader, “Its ‘words’ loosely approximate the frequency with which letters occur in English, which is why at a glance it looks pretty real.”"
            }
        ]
    }
]

export const useFriends = () => {
    const context = useContext(FriendsContext)
    if (context === undefined) {
        throw new Error('useFriends must be used within a FriendsProvider')       }
    return context
}
const FriendsProvider = ({ children }) => {
    const [friends, setFriends] = useState(initialFriends)
    const friendsObject = useMemo(() => {
        return { friends, setFriends }
    }, [friends, setFriends])
    return <FriendsContext.Provider value={friendsObject}>{children}</FriendsContext.Provider>
}
export default FriendsProvider