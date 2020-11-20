import React, { useState, useEffect } from 'react';
import Welcome from './Welcome'
import Track from './Track'
import Spinner from './Spinner'
import axios from 'axios'
import { toQuery, toParams } from './Routing'

function App() {
    const [tracks, setTracks] = useState([])
    const [input, setInput] = useState("")
    const [code, setCode] = useState("")
    const [status, setStatus] = React.useState("none")

    const handleInputChange = (event) => {
        const target = event.target;
        setInput(target.value);
    }
    
    useEffect(() => {
        const params = toParams(window.location.search.replace(/^\?/, ''))
        if (params.code) {
            setStatus("authorized")
            setCode(params.code)
        }
    }, [])

    const search = toQuery({
        client_id: '12c531c380a24222bbb136f06402c9ee',
        response_type: 'code',
        redirect_uri: 'https://zach332.github.io/TweetSoundtrack/',
        scope: "user-top-read"
    });
    
    const onCLick = () => {
        window.location.href = 'https://accounts.spotify.com/authorize?'+search
    }

    const handleSubmit = (event) => {
        setStatus("loading")
        console.log(input)
        console.log(code)
        axios.get('https://zach33.pythonanywhere.com/songs', {
            params: {
                twitterAccount: input,
                code: code
            }
        })
        .then(response => {
            console.log(response)
            setTracks(response.data.tracks)
        }).then(() => {
            setStatus("success")
        })
        event.preventDefault()
    }

    if(status == "loading") {
        return <Spinner />
    }

    return (
        <div className="App">
            <header className="App-header">
                <Welcome />
                <div className="col-md-12 text-center" style={{paddingBottom: "25%"}}>
                    <button type="btn btn-primary" onClick={onCLick} className="btn btn-outline-primary btn-lg">
                        Login to Spotify
                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-box-arrow-in-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"></path>
                            <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"></path>
                        </svg>
                    </button>
                    
                </div>
                <div className="response" style={{paddingLeft:"10%", 
                paddingRight:"10%", 
                textAlign:"center", 
                fontSize:"30px", 
                paddingBottom: "5%"}}>
                    Thanks, we've grabbed your listening information. Now let us know a Twitter user you want to 🎶vibe🎶 with.</div>
                <div className="mx-auto" style={{paddingBottom: "45%"}}>
                    <form className="py-4" onSubmit={handleSubmit} style={{width: "100%", 
                    padding:"30%"}}>
                        <div className="form-group row">
                           <label htmlFor="content">Twitter account</label>
                            <input className="form-control" id="content" type="text" placeholder="nytimes" onChange={handleInputChange}></input>
                        </div>
                        <button type="submit" className="btn btn-primary">Generate playlist</button>
                    </form>
                </div>
                <div className="welcome" style={{fontSize:"50px", 
                fontWeight:"bold"}}>
                    Welcome, Lu Feng.</div>
                <div className="welcome" style={{fontSize:"25px"}}>We've curated the below playlist for you based on the Twitter username you provided and your listening habits.</div>
                <br></br>
                <button type="btn btn-primary" onClick={(e) => {
      e.preventDefault();
      window.location.href='http://spotify.com/logout';
      }} className="btn btn-outline-primary btn-lg">
                        Not you?
                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-box" fill="currentColor">
                            <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"></path>
                            <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"></path>
                        </svg>
                    </button>
                <div className="container">
                    <div className="row" style={{paddingBottom: "50%"}}>
                        {tracks.map(track => <Track key={track.id} track={track} />)}
                    </div>
                </div>
            </header>
        </div>
    );
}

export default App;