import "./App.css";
import { useState } from "react";
import { ProfileTab } from "./views/ProfileTab";
import { ProfilePage } from "./views/ProfilePage";

function App() {
    const [editingProfile, setEditingProfile] = useState(false);

    const scrollRight = () => {
        setEditingProfile(true);
    };

    const scrollLeft = () => {
        setEditingProfile(false);
    };

    return (
        <div className="appContainer">
            <div className={`profileTab ${editingProfile ? "slideOut" : ""}`}>
                <ProfileTab onEditProfile={scrollRight} />
            </div>
            <div className={`profilePage ${editingProfile ? "slideIn" : ""}`}>
                <ProfilePage onBackButton={scrollLeft} />
            </div>
        </div>
    );
}

export default App;