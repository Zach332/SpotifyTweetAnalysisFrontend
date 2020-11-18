import React, { useState, useEffect } from 'react';
import Welcome from './Welcome'
import Track from './Track'
import Spinner from './Spinner'

function App() {
    const [tracks, setTracks] = useState([])
    const [status, setStatus] = React.useState("loading")

    useEffect(() => {
        fetch('https://zach33.pythonanywhere.com/songs').then(res => res.json()).then(data => {
            console.log(data)
            setTracks(data.tracks)
        }).then(() => {
            setStatus("success")
        })
    }, []);

    if(status == "loading") {
        return <Spinner />
    }

    return (
        <div className="App">
            <header className="App-header">
                <Welcome />
                <div className="container">
                    <div className="row">
                        {tracks.map(track => <Track key={track.id} track={track} />)}
                    </div>
                </div>
            </header>
        </div>
    );
}

export default App;