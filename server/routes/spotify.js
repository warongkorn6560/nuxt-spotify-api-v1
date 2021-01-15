var express = require('express');
var router = express.Router();


var SpotifyWebApi = require('spotify-web-api-node');
scopes = ['user-read-private', 'user-read-email', 'playlist-modify-public', 'playlist-modify-private'];

require('dotenv').config();

var spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_API_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.CALLBACK_URL,
});

/* GET home page. */
router.get('/', (req,res) => {
  var html = spotifyApi.createAuthorizeURL(scopes)
  console.log(html)
  res.redirect(html+"&show_dialog=true")  
})


router.get('/callback', async (req,res) => {
  const { code } = req.query;
  console.log(code)
  try {
    var data = await spotifyApi.authorizationCodeGrant(code)
    const { access_token, refresh_token } = data.body;
    // spotifyApi.setAccessToken(access_token);
    // spotifyApi.setRefreshToken(refresh_token);
    res.redirect(`http://localhost:3000/token?access_token=${access_token}`);
  } catch(err) {
    res.redirect('/#/error/invalid token');
  }
});

router.get('/userinfo', async (req, res) => {
  const access_token = req.headers.access_token
  console.log(access_token)
  spotifyApi.setAccessToken(access_token)
    try {
      var user = await spotifyApi.getMe();
      var playlist = await spotifyApi.getUserPlaylists();
      // console.log(user.body);
      // res.status(200).send(user.body)
      // const json = JSON.stringify(user);
      const name = user.body.display_name;
      const email = user.body.email;
      const image = user.body.images[0].url;
      res.json({ email, image, name, playlist });
    } catch (err) {
      res.status(400).send(err)
    }
});

router.get('/playlist', async (req,res) => {
  try {
    var result = await spotifyApi.getUserPlaylists();
    // console.log(result.body);
    // res.status(200).send(result.body);
    // const text = JSON.stringify(result)
    // res.json({ result });
  } catch (err) {
    res.status(400).send(err)
  }
});

module.exports = router;
