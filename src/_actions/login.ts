import { auth } from "@/_firebase/config";


export async function LoginAuthenticate(email:string, password:string){

    try {
        const userCredentials = await auth.signInWithEmailAndPassword(email, password)
        if(userCredentials.user){
            return userCredentials.user
        }else{
            return null
        }
    } catch (error) {
        
    }
}


