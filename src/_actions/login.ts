import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


export async function Autheticate(email:string, password:string){
    const auth = getAuth()

    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password)
        
    } catch (error) {
        
    }
}


