module.exports = {
    resolve: {
      fallback: { 
      "url": require.resolve("url/"),
      "http": require.resolve("stream-http"),
      "https": false,
      "zlib": false,
      "stream": false,
      "util": false 
    }
    }
    // resolve: {
    // fallback: {
    //     //"fs": false,
    //     //"tls": false,
    //     //"net": false,
    //     //"path": false,
    //     "zlib": false,
    //     "http": false,
    //     "https": false,
    //     "stream": false,
    //     //"crypto": false,
    //     //"crypto-browserify": require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify 
    //   } 
    // }
  };


// const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

// module.exports = {
//     // Other rules...
//     plugins: [
//         new NodePolyfillPlugin()
//     ]
// }