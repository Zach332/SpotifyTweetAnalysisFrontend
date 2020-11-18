import React from 'react'

export default function Track({track}) {
    return (
        <a href={track.external_urls.spotify} target="_blank" className="list-group-item list-group-item-action m-1 rounded border" style={{width: 250}}>
            <div style={{width: 200}}>
                <img src={track.album.images[1].url} className="card-img-top"></img>
                <div className="card-body">
                    <h5 className="mb-1">{track.name}</h5>
                    <small className="text-muted">{track.album.artists[0].name}</small>
                </div>
            </div>
        </a>
    )
}
