console.clear()

const fetch = require("node-fetch"); // I use this because the normal fetch no works on Node-js (Yeah, i'm a noob, lol)
const tmi = require("tmi.js"); // Twitch Chat Bot Library
const skill = require("../twitchBotLVLRS/skills.json"); // Get Skill ID with JSON
const config = require("./config.json"); // Params

const botUsername = config["botUsername"];
const botOauthToken = config["botOauthToken"];
const channelList = config["channelList"];
const channelID = config["osrsID"];
const getChannelID = config["getID"];
const debugSwitch = config["debug"];

const options = { // This object allow you to see all events/commands from TMI
  options: {
    debug: debugSwitch,
  },
  connection: {
    reconnect: true,
  },
  identity: {
    username: botUsername, 
    password: botOauthToken, 
  },
  channels: channelList,
};

const client = new tmi.client(options);

client.connect();

client.on("chat", (user, context, msj, self) => {
  if (self) return; // If he sends a message himself, he ignores it.
  const msjArr = msj.toLowerCase().trim().split(" "); // Divide the complete string to an array.
  const command = msjArr.shift(); // Get Command ID

  //  globalUserVariables
  const useCfg = {
    thisUser: context["display-name"]
  }
  //

  if (context["room-id"] === channelID) { // It exec the code in a specific stream (If you don't know that info, see the last line!)
    if (command === "!lvl") { // Specify the name of the command
      const skillName = msjArr.pop(); // Get Skill ID
      const rSN = msjArr.join(" "); // Get RuneScapeName

      let skillId;
      if (skillName in skill[0]){
        skillId = skill[0][`${skillName}`];
      } else {
        skillId = "ERROR"
      }

      respuesta(rSN, skillId);

      function respuesta(rSN, skillId) {
        if (skillId === "ERROR") {
          return client.say(
            user,
            toLiteral(config["skillNotFoundMsg"],useCfg)
          );
        }
        const actDate = Math.floor(+new Date() / 1000);
        fetch(
          `https://templeosrs.com/api/player_stats.php?player=${rSN}&skill=${skillId}`
        )
          .then((response) => response.json())
          .then((data) => {
            try {
              const dateResult = actDate - data.data.info["Last checked unix"];
              if (dateResult > 960) {
                fetch(
                  `https://templeosrs.com/php/add_datapoint.php?player=${rSN}`
                ).then((response) => response);
              } else {
                ("");
              }
              client.say(
                user,
                toLiteral(config["responseMsg"],{
                thisUser: context["display-name"],
                rsn: rSN,
                skill: data.data.skill,
                level: data.data.level,
                xp: data.data.xp_format,
                rank: data.data.rank})
              );
            } catch (error) {
              client.say(
                user,
                toLiteral(config["rsnNotFoundMsg"],useCfg)
              );
            }
          });
      }
    }
  } else {
    // You can add a 'else if' if you need add a command
    return; // This 'else return' is used to prevent the bot from taking any message as a command (MUST ALWAYS GO TO THE END OF COMMANDS)
  }
});

if (getChannelID) {
  client.on("chat", (user, context) => {
    console.log(`Channel ID of ${user}: ${context["room-id"]}`)
  })
}

// Usefull Functions

function toLiteral(expression, valueObj) {
  const templateMatcher = /\${\s?([^{}\s]*)\s?}/g;
  let text = expression.replace(templateMatcher, (substring, value, index) => {
    value = valueObj[value];
    return value;
  });
  return text
}