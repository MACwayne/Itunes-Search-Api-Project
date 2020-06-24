const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const albums = require('./albums')
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {

    
    if (Object.keys(req.query).length !== 0) {

        //Find song by id
        if (req.query.songID !== undefined) {
            var found = null
            for (var album of albums) {
                for (var item of album.results) {
                    if (item.wrapperType === "track") {
                        if (item.trackId === parseInt(req.query.songID)) {
                            found = item
                            break
                        }
                    }
                }
            }

            if (found === null) {
                res.send("Unable to find songID: " + req.query.songID)
            } else {
                res.send(found)
            }
        }

        // Find songs by name
        if (req.query.songName !== undefined) {
            var found = []
            for (var album of albums) {
                for (var item of album.results) {
                    if (item.wrapperType === "track") {
                        if (item.trackName.includes(req.query.songName)) {
                            found.push(item)
                        }
                    }
                }
            }

            if (found === []) {
                res.send("Unable to find any songs with name: " + req.query.songName)
            } else {
                res.send(found)
            }
        }

        // Find songs by album id (collection id)
        if (req.query.albumID !== undefined) {
            var found = null
            for (var album of albums) {
                for (var item of album.results) {
                    if (item.wrapperType === "track") {
                        console.log(item.collectionId)
                        if (item.collectionId === parseInt(req.query.albumID)) {
                            if (found === null) {
                                found = []
                            }
                            found.push(item)
                        }
                    }
                }
            }
            
            if (found === null) {
                res.send("Unable to find albumID: " + req.query.albumID)
            } else {
                res.send(found)
            }
        }

        // Find songs by album name (collection name)
         if (req.query.albumName !== undefined) {
            var found = null
            for (var album of albums) {
                for (var item of album.results) {
                    if (item.wrapperType === "track") {
                        if (item.collectionName.includes(req.query.albumName)) {
                            if (found === null) {
                                found = []
                            }
                         found.push(item)
                        }
                    }
                }
            }

            if (found === null) {
                res.send("Unable to find any song in an album  with name: " + req.query.albumName)
            } else {
                res.send(found)
            }
        }

        // Find song by artist id
        if (req.query.artistID !== undefined) {
            var found = null
            for (var album of albums) {
                for (var item of album.results) {
                    if (item.wrapperType === "track") {
                        console.log(item.collectionId)
                        if (item.artistId === parseInt(req.query.artistID)) {
                            if (found === null) {
                                found = []
                            }
                            found.push(item)
                        }
                    }
                }
            }
            
            if (found === null) {
                res.send("Unable to find artistID: " + req.query.artistID)
            } else {
                res.send(found)
            }
        }

        // Find song by artist name
        if (req.query.artistName !== undefined) {
            var found = null
            for (var album of albums) {
                for (var item of album.results) {
                    if (item.wrapperType === "track") {
                        if (item.artistName.includes(req.query.artistName)) {
                            if (found === null) {
                                found = []
                            }
                         found.push(item)
                        }
                    }
                }
            }

            if (found === null) {
                res.send("Unable to find any songs from artist: " + req.query.albumName)
            } else {
                res.send(found)
            }
        }

    // List all songs
    } else {
        var songList = []
        for (var album of albums) {
            for (var item of album.results) {
                if (item.wrapperType === "track") {
                    songList.push({"artist": item.artistName, "album": item.albumName, "track": item.trackName})
                }
            }
        }

        res.send(songList)
    }

})

// Update song information by id
app.post('/update', (req, res) => {
    /* POST user data using the request body */
     let songID = req.body.songID
     let trackName = req.body.trackName

     // Validate supplied body
     var valid = true

     if (songID === undefined) {
         valid = false
     }

     if (trackName === undefined) {
        valid = false
    }

    if (valid) {
        var found = null
        for (var album of albums) {
            for (var item of album.results) {
                if (item.wrapperType === "track") {
                    if (item.trackId === parseInt(songID)) { 
                        item.trackName = trackName
                        found = item 
                        break
                    }
                }
            }
        }

        if (found === null) {
            res.send("Unable to find songID: " + songID)
        } else {
            res.send(found)
        }
    } else {
        res.status(400).send("invalid input")
    }

})


// Delete a song by id
app.delete('/delete', (req, res) => {
    /* POST user data using the request body */
     let songID = req.query.songID

     // Validate supplied body
     var valid = true

     if (songID === undefined) {
         valid = false
     }

    if (valid) {
        var found = null
        for (var album of albums) {
            for (var index in album.results) {
                if (album.results[index].wrapperType === "track") {
                    if (album.results[index].trackId === parseInt(songID)) { 
                        album.results.splice(index, 1)
                        found = album
                        break
                    }
                }
            }
        }

        if (found === null) {
            res.send("Unable to find & delete songID: " + songID)
        } else {
            res.send(found)
        }
    } else {
        res.status(400).send("invalid input")
    }

})


// Add a new song
app.post('/add', (req, res) => {
    /* POST user data using the request body */
     let songID = req.body.songID
     let albumID = req.body.albumID
     let artistName = req.body.artistName
     let artistID = req.body.artistID
     let trackName = req.body.trackName

     // Validate supplied body
     var valid = true

     if (songID === undefined) {
         valid = false
     }

     if (albumID === undefined) {
        valid = false
    }

    if (artistName === undefined) {
        valid = false
    }

    if (artistID === undefined) {
        valid = false
    }

    if (trackName === undefined) {
        valid = false
    }

    if (valid) {
        var found = null
        var albumfound = null
        for (var album of albums) {
            for (var item of album.results) {
                if (item.wrapperType === "collection") {
                    if (item.collectionId === parseInt(albumID)) {
                        album.results.push({
                            "wrapperType": "track",
                            "kind": "song",
                            "artistId": parseInt(artistID),
                            "collectionId": parseInt(albumID),
                            "trackId": parseInt(songID),
                            "trackName": trackName,
                        }) 
                        albumfound = true
                    }
                }
            }
        }

        if (albumfound === null) {
            console.log(artistID + " " + albumID + " " + songID + " " + trackName + " " + artistName)
            albums.push(
                {
                    results: [
                        {
                            "wrapperType": "collection",
                            "collectionType": "Album",
                            "artistId": parseInt(artistID),
                            "collectionId": parseInt(albumID),
                            "artistName": artistName,
                        }, 
                        {
                            "wrapperType": "track",
                            "kind": "song",
                            "artistId": parseInt(artistID),
                            "collectionId": parseInt(albumID),
                            "trackId": parseInt(songID),
                            "trackName": trackName,
                            "artistName": artistName,
                        }
                    ]
                }
            )
            albumfound = true
        }

        if (albumfound === true) {
            res.send("added new album and song")
        } else if (found === null) {
            res.send("Unable to find songID: " + songID)
        } else {
            res.send(found)
        }
    } else {
        res.status(400).send("invalid input")
    }

})


const port = 3003
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
