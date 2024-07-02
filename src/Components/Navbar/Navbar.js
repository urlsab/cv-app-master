import './Navbar.css';
import React, {useEffect} from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import { useAuthState } from "react-firebase-hooks/auth";
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { auth } from '../../config/firebase.config';
// import { useUserAuth } from '../../Context/UserAuthContext';
import { signOut } from "firebase/auth";

const Navbar = () => {

    useEffect(() => {
        const viewport = document.querySelector('meta[name=viewport]');
        viewport.setAttribute('content', 'width=device-width, initial-scale=0.45');
    }, []);

    // const { logOut } = useUserAuth();
    // const { getCv } = useUserAuth();
    
    //const [cv, setCv] = useState([]);
    
    const [user] = useAuthState(auth);

    //const userName = createContext(user);

    const navigate = useNavigate();

    const handleLogout = () => {
        console.log(user);
        console.log(auth);
        alert(`Logout ${user.email} account ?`)
        // logOut();
        setTimeout(() => {
            signOut(auth).then(() => {
                console.log(auth);
                navigate("/logout");
                console.log("Signed out successfully")
            }).catch((error) => {
                console.log(error);
            });
          }, 2000);

    }

    return (

        <>
               
            <AppBar style={{background:"linear-gradient(162deg, rgb(99, 88, 80) 0%, rgb(54, 108, 158) 70%)"}} position="sticky" color="default">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <NavLink to="/postInputs" exact="true"><NoteAddIcon sx={{mr:"4px"}}/>CREATE CV</NavLink>
                        <NavLink to="/allResumes" exact="true"><ManageAccountsIcon sx={{mr:"4px"}}/>MY AREA</NavLink>
                        {/* <NavLink to="/examples" exact="true"><CollectionsIcon sx={{mr:"4px"}}/>EXAMPLES</NavLink> */}
                        <NavLink to="/logout" exact="true" onClick={handleLogout}><LogoutIcon sx={{mr:"4px"}}/>LOGOUT</NavLink>
                        {/* maybe add: <NavLink to="/allResumes/:id" exact="true"><b>See Your Resume</b></NavLink> */}
                    </Toolbar>   
                </Container>
            </AppBar>

        </>

    );

};

export default Navbar;

// handle logout with create context
    // const handleLogout = async () => {
    //     try {
    //         getCv();
    //         cv.map((el, i) =>  ( <p key={cv[i]}> {cv[i].info.userName} </p> ) ) 
    //       await logOut();
    //       console.log(user.email);
          
    //       // navigate("/");
    //     } catch (error) {
    //       console.log(error.message);
    //     }
    //   };