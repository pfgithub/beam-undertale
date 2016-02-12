var Beam = require('beam-client-node');
var Tetris = require('beam-interactive-node');
var rjs = require('robotjs');

var stream = parseInt(process.env.STREAM);
var username = process.env.USER;
var password = process.env.PASSWORD;

var beam = new Beam();
beam.use('password', {
    username: username,
    password: password
}).attempt().then(function () {
    return beam.game.join(stream);
}).then(function (res) {
    var details = {
        remote: res.body.address,
        channel: stream,
        key: res.body.key
    };
    var robot = new Tetris.Robot(details);
    robot.handshake(function(err){if(err){throw err;}});
var dir = {left:false,right:false,up:false,down:false};
var time = 0;
    robot.on('report', function (report) {
        time += 1;
        if(time == 2){
          time = 0;
        report.tactile.forEach(function(reportobj){
            if(reportobj.holding > 0)console.log('report',reportobj.holding);
            switch (reportobj.id){
              case 0: // Interact
                if(reportobj.holding > 0) console.log('Interact', reportobj.holding);
                rjs.keyToggle("enter",reportobj.holding == 0 ? "up" : "down");
              break;
              case 1: // Skip/Back
                if(reportobj.holding > 0) console.log('Skip', reportobj.holding);
                rjs.keyToggle("x",reportobj.holding == 0 ? "up" : "down");
              break;
              case 2: // Menu
                if(reportobj.holding > 0) console.log('Menu', reportobj.holding);
                rjs.keyToggle("c",reportobj.holding == 0 ? "up" : "down");
              break;
              case 3: // Up
                if(reportobj.holding > 0) console.log('Up', reportobj.holding);
                rjs.keyToggle("up",reportobj.holding == 0 ? "up" : "down");
              break;
              case 4: // Left
                if(reportobj.holding > 0) console.log('Left', reportobj.holding);
                rjs.keyToggle("left",reportobj.holding == 0 ? "up" : "down");
              break;
              case 5: // Down
                if(reportobj.holding > 0) console.log('Down', reportobj.holding);
                rjs.keyToggle("down",reportobj.holding == 0 ? "up" : "down");
              break;
              case 6: // Right
                if(reportobj.holding > 0) console.log('Right', reportobj.holding);
                rjs.keyToggle("right",reportobj.holding == 0 ? "up" : "down");
              break;
            }
        });
      }
    });
});
