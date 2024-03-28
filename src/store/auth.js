// this let us create our store
// because we will define our initial values,
// reducer name, reducer function
// the name could be 'create Store' instead of "createSlice"
import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from "react-toastify";

const url ="https://26222.fullstack.clarusway.com";

 const authSlice = createSlice({
    name:"auth",

    initialState:{
        // currentuser is assigned the value "username " stored in session
        // storage if it exists. if not, it is set to "false"
        currentUser: sessionStorage.getItem("username") || false,
        // token is assigned the value of "token" stored in session storage
        // if it exists. the "atob" function is used to decode this token from 
        // Base64 encoding to its original form

        //  This code is checking if there is a token and 
        // username stored in the session storage, and if so,
        //  it retrieves and decodes the token. However, 
        //  it does not create a new token for each username.
        //   Tokens are typically generated during the authentication 
        //   process when a user logs in and are associated with that
        //    specific user's session. This code provide is focused 
        //    on retrieving and using an existing token, not creating
        //     new tokens.

//         const base64Data = "SGVsbG8sIFdvcmxkIQ==";
// const binaryData = atob(base64Data);

// Now, 'binaryData' contains the decoded binary data
// such as "hello" or somethignelse
        token: sessionStorage.getItem("token") && atob(sessionStorage.getItem("token")),
        first_name :'',
        last_name:'',
        email:'',
    },
    // REDUCERS, AS THE NAME SUGGESTS,
    // TAKE IN TWO THINGS : PREVIOUS STATE AND AN ACTION
    // THEN THEY REDUCE IT(READ IT RETURN) TO ONE ENTITY: 
    // THE NEW UPDATED INSTANCE OF STATE
    // SO REDUCERS ARE BASICLLY PURE JS FUNCTION WHICH TAKE IN THE 
    // PREVIOUS STATE AND AN ACTION AND RETURN THE NEWLY UPDATED STATE

    reducers:{
        auth(state,action){
            state.currentUser = action.payload.username;
            state.token = action.payload.token;
            state.first_name = action.payload.first_name;
            state.last_name = action.payload.last_name;
            state.email = action.payload.email;
        }
    }
})
export const register = (userInfo, navigate) =>{
    return async (dispatch)=>{
        try{
            const res = await axios.post(`${url}/account/register/`, userInfo)
            // short circuiting
            if(!res.data.token) throw new Error('Something went wrong')
            const payload = {
                token: res.data.token,
                currentUser: res.data.username,
                last_name: res.data?.user?.last_name,
                email: res.data?.user?.email,
                first_name: res.data?.user?.first_name,
              };
        // authSlice is coming from above that we have created to store updated states
        // action is special property that is created by redux for us
        // in the action we have an "auth " which we created above as name in the authSlice
        // payload is the object we have created in line 65 
        // which gets the data from our response/post
        dispatch(authSlice.actions.auth(payload));
        
        // we are using setItem to use this user information in different page
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("username", res.data.username);
        sessionStorage.setItem("first_name", res.data.first_name);
        sessionStorage.setItem("last_name", res.data.last_name);
        sessionStorage.setItem("email", res.data.email);
        toast.success("Registration sucessesful!!")
        navigate('/stock/profile')
        
        }catch(error){
            toast.error(error.response.data)
        }
    }
}
export const login = (userInfo, navigate)=>{

    return async(dispatch)=>{
        try{
              // this end point is cpming from backEnd so we just write on it
              // in here the backEnd guy is decided to use
              // /account/auth/login
            const res = await axios.post(`${url}/account/auth/login/`, userInfo);
            // we are checking the " key " for log in auth
            // for regsiter, we have sued "token", which very simaler to "key"
            // it will save this "key" under the 'token' that we have created fro registartion

            if(!res.data.key) throw new Error("Something went wrong ");

            const payload={
                token      : res.data.key,
                currentUser: res.data.user.username
              }
              dispatch(authSlice.actions.auth(payload))
              sessionStorage.setItem("token", res.data.key)
              sessionStorage.setItem("username" , res.data.username)
              sessionStorage.setItem("first_name" , res.data.user.fisrt_name)
              sessionStorage.setItem("last_name" , res.data.user.last_name)
              sessionStorage.setItem("email" , res.data.email)
              sessionStorage.setItem("admin" , res.data.user.is_superuser)
              toast.success("User loggedin sucessesful!!")
              navigate('/stock/dashboard')
        }catch(error){
            toast.error("Something went wromg when trying to login")
        }
    }
}

export const logout=(navigate)=>{
    return async(dispatch)=>{
        try{
        //     In the logout function, you use atob to decode the token because the token
        //      is stored in session storage as a Base64-encoded string (likely for security reasons).
        //     You use the decoded token to include it in the Authorization header for the logout
        //     request to the server.
        //    The purpose of including the token in the Authorization header is to authenticate 
        //    the user's identity and let the server know which user is logging out.

            const token = atob(sessionStorage.getItem("token"));
            console.log("LOGGIN OUTT")
            const res = await axios.post(`${url}/account/auth/logout/`,{
                headers:{
                    Authorization: `Token ${token}`,
                }
            })
            // if (res.status === 200) { ... }: This checks if the HTTP response status code is 200,
            //  which indicates a successful password change. If it's successful, it displays a success toast message.
            if(res.status === 200){
                dispatch(authSlice.actions.auth({ token: false, currentUser: false }));
                sessionStorage.clear();
                toast.success("User successfully Logged out!");
                navigate("/");
            }
        }catch(error){
            toast.error("User couldn't logout")
        }
    }

}

export const changePassword=(newPass)=>{
    return async(dispatch)=>{
        try{
            const token = sessionStorage.getItem('token')
            const res = await axios(`${url}/account/auth/password/change`,{
                method:"POST",
                headers:{
                    Authorization :`Token ${token}`,
                    "Content-Type": "application/json",
                },
                data: newPass,
            })
            if(res.status === 200){
                toast.success("Password Changed")
            }

        }catch(error){
            toast.error(error.message)
        }
    }
}

export default authSlice.reducer;