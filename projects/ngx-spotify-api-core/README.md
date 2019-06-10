# @ngx-spotify-api/core
## Introduction
This module was written to use the Spotify-Api type-save inside an angular application.
If there are issues please tell me, so I can fix them.

## Supprted Endpoints

### Albums
 * Get an Album
 * Get an Album's Tracks
 * Get Several Albums
 
### Artists
 * Get an Artist
 * Get an Artist's Albums
 * Get an Artist's Top Tracks
 * Get an Artist's Related Artists
 * Get Several Artists

### Browse
 * Get a Category
 * Get a Category's Playlists
 * Get a List of Categories
 * Get a List of Featured Playlists
 * Get a List of New Releases
 * ~~Get Recommendations Based on Seeds~~ (coming in a future release)
 
### Follow
 * Check if Current User Follows Artists or Users
 * Check if Users Follow a Playlist
 * Follow Artists or Users
 * Follow a Playlist
 * Get User's Followed Artists
 * Unfollow Artists or Users
 * Unfollow a Playlist
 
### Library
 * Check User's Saved Albums
 * Check User's Saved Tracks
 * Get Current User's Saved Albums
 * Get a User's Saved Tracks
 * Remove Albums for Current User
 * Remove User's Saved Tracks
 * Save Albums for Current User
 * Save Tracks for User

### Personalization
 * 	Get a User's Top Artists
 * 	Get a User's Top Tracks
 
### Player
 * Get a User's Available Devices
 * Get Information About The User's Current Playback
 * Get Current User's Recently Played Tracks
 * Get the User's Currently Playing Track
 * Pause a User's Playback
 * Seek To Position In Currently Playing Track
 * Set Repeat Mode On User’s Playback
 * Set Volume For User's Playback
 * Skip User’s Playback To Next Track
 * Skip User’s Playback To Previous Track
 * Start/Resume a User's Playback
 * Toggle Shuffle For User’s Playback
 * Transfer a User's Playback
 
### Playlists
 * Add Tracks to a Playlist
 * Change a Playlist's Details
 * Create a Playlist
 * Get a List of Current User's Playlists
 * Get a List of a User's Playlists
 * Get a Playlist Cover Image
 * Get a Playlist
 * Get a Playlist's Tracks
 * Remove Tracks from a Playlist
 * Reorder a Playlist's Tracks
 * Replace a Playlist's Tracks
 * Upload a Custom Playlist Cover Image
 
### Search
 * Search for an Item
 
### Tracks
 * Get Audio Analysis for a Track
 * Get Audio Features for a Track
 * Get Audio Features for Several Tracks
 * Get Several Tracks
 * Get a Track
 
### Users Profile
 * Get Current User's Profile
 * Get a User's Profile

## Getting Started
### Installation
With npm:
```
    npm install --save @ngx-spotify-api/core
```
With yarn:
```
    yarn add @ngx-spotify-api/core
```
### Init
```angular2
@NgModule({
  ...
  imports: [
    ...
    NgxSpotifyApiModule
  ],
  ...
})
```

### Configuration
This is an example configuration
```angular2
import {of} from 'rxjs';
...
@NgModule({
  ...
  imports: [
    ...
    NgxSpotifyApiModule.forRoot({
      api: {
        baseUrl: ''
      },
      authorization: {
        storagePrefix: 'ngx-spotify-api-',
        accessToken: () => of('<your-access-token>')
      }
    })
  ],
  ...
})
export class AppModule { }
```
