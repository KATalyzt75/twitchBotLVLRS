console.clear()

const fetch = require("node-fetch"); // I use this because the normal fetch no works on Node-js (Yeah, i'm a noob, lol)
const tmi = require("tmi.js"); // Twitch Chat Bot Library

const botUsername = 'exampleBotName' // Bot UserName (You can use your own account... Or create other for this bot)
const botOauthToken = 'oauth:x0x0x0x0x0x0x0' // Steps to get the ouath token: https://twitchapps.com/tmi/ > Connect > Connect to your Account > Copy oaut:xxxxxxxxxxxxxx
const channelList = ['exampleTargetName'] // ['channel1','channel2',...]

const options = {
  options: { // This object allow you to see all events/commands from TMI
    debug: true,
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

  if (context["room-id"] === "TargetStreamID") { // It exec the code in a specific stream (If you don't know that info, see the last line!)
    if (command === "!lvl") { // Specify the name of the command
      const skillName = msjArr.pop(); // Get Skill ID
      const rSN = msjArr.join(" "); // Get RuneScapeName

      // Dictionary

      let skillId = 
      ["overall", "over", "all", "total", "tot", "todas", "todos"].includes(skillName) ? 0 :
      ["attack", "att", "atk", "ataque"].includes(skillName) ? 1 :
      ["defence", "def", "defensa"].includes(skillName) ? 2 :
      ["strength", "str", "fuerza", "puño", "mano", "daño"].includes(skillName) ? 3 :
      ["hitpoints", "hit", "hp", "vida", "amor"].includes(skillName) ? 4 :
      ["ranged", "range", "rang", "rango"].includes(skillName) ? 5 :
      ["prayer", "pray", "oracion", "orar", "estrella", "strella", "prisma"].includes(skillName) ? 6 :
      ["magic", "mage", "magia"].includes(skillName) ? 7 :
      ["cooking", "cook", "cock", "cocking", "cocina", "cocinar", "ck"].includes(skillName) ? 8 :
      ["woodcutting", "wc", "leñador", "talador"].includes(skillName) ? 9 :
      ["fletching", "flet", "fleching"].includes(skillName) ? 10 :
      ["fishing", "fish", "pescar", "pesca"].includes(skillName) ? 11 :
      ["firemaking", "fm", "fuego", "fogata"].includes(skillName) ? 12 :
      ["crafting", "craft", "minecraft", "artesano", "artesania"].includes(skillName) ? 13 :
      ["smithing", "smith", "herreria"].includes(skillName) ? 14 :
      ["mining", "min", "mineria", "minar"].includes(skillName) ? 15 :
      ["herblore", "herb", "weed", "hierva", "hierba", "planta"].includes(skillName) ? 16 :
      ["agility", "agi", "agilidad"].includes(skillName) ? 17 :
      ["thieving", "thiev", "robar", "ladron", "turro", "flaite", "domestico", "malandro"].includes(skillName) ? 18 :
      ["slayer", "slay", "asesino", "asenino", "matador", "calavera"].includes(skillName) ? 19 :
      ["farming", "farm", "regadera", "cosechar", "plantar", "granjero", "granjer"].includes(skillName) ? 20 :
      ["runecrafting", "rc", "runecraft", "runas", "autism", "autismo", "autista"].includes(skillName) ? 21 :
      ["hunter", "hunt", "cazar", "casar", "caceria", "cazador", "casador"].includes(skillName) ? 22 :
      ["construction", "const", "carpintero", "obrero", "carpinteria", "construir", "construccion", "construcion", "construsion"].includes(skillName) ? 23 :
      "ERROR";

      respuesta(rSN, skillId);

      function respuesta(rSN, skillId) {
        if (skillId === "ERROR") {
          return client.say(
            user,
            `@${context["display-name"]} ERROR: Skill not found! BibleThump` // You can modify this message
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
                `@${context["display-name"]} the statistics of ${rSN} are = Level ${data.data.skill}: ${data.data.level} || Experience: ${data.data.xp_format} || Rank: ${data.data.rank}` // You can modify this message
              );
            } catch (error) {
              client.say(
                user,
                `@${context["display-name"]} ERROR: RSN not found! BibleThump` // You can modify this message
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

/* 
client.on("chat", (user, context) => {
  console.log(`Channel ID of ${user}: ${context["room-id"]}`)
}) 
 */ // Uncomment this (and /*) to get Channel ID