import React from "react";
import './Footer.css'
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";

const Footer = () => {
    return (
        <footer id="footer">
            <div className="leftFooter">
                <h4>download our app</h4>
                <p>download app for ios and mobile phone</p>
                <img src={appStore} alt="App Store" />
                <img src={playStore} alt="Play Store" />
            </div>
            <div className="midFooter">
                <h1>Hamza Cod3$</h1>
                <p>hamza is a good coder</p>
                <p>CopyRights 2022 &copy; hamzaCod3$</p>
            </div>
            <div className="rightFooter">
                <h4>Follow Us</h4>
                <a href="#">Instagram</a>
                <a href="#">YouTube</a>
                <a href="#">Facebook</a>
            </div>
        </footer>
    );
};

export default Footer;
