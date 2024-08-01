import { auth } from "@/_firebase/config";


export async function SigninAuthentication(email:string, password:string){

    try {
        const userCredentials = await auth.createUserWithEmailAndPassword(email, password)
        if(userCredentials.user){
            return userCredentials.user
        }else{
            return null
        }
    } catch (error) {
        
    }
}


