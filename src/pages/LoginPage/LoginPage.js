import './LoginPage.css';
import GoogleButton from "react-google-button";
import { UserAuth } from "../../context/AuthContext";
import { Link } from 'react-router-dom';


function LoginPage() {
    const { googleSignIn } = UserAuth();
    const { user, logOut } = UserAuth();

    // Funktion zum Einloggen mit Google
    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error);
        }
    };

    // Funktion zum Ausloggen
    const handleSignOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="loginDiv">
            {/* Willkommensnachricht wird nur angezeigt, wenn ein Nutzer eingeloggt ist */}
            <h1 className="loginHeading" >Willkommen, {user?.displayName}</h1>
            {/* Es wird entweder der Ausloggen-Button oder der Google-Login-Button angezeigt, je nachdem, ob ein Nutzer eingeloggt ist oder nicht */}
            {user?.displayName ? <button className='loginBtn' onClick={handleSignOut}>Ausloggen</button> : <GoogleButton className='loginGoogleBtn' onClick={handleGoogleSignIn} />}
            <p>mit dem Login akzeptierst du unsere <Link to="/datenschutz">Datenschutzerklärung</Link></p>
        </div>
    );
}


export default LoginPage;