# Download and install

In a console with git and Node.js installed (You can find that on Google)

- git clone https://github.com/KATalyzt75/twitchBotLVLRS<br>
- cd twitchBotLVLRS<br>
- sudo npm i -D<br>
- npm run app OR RUN.bat (In Windows)<br>
  
# Configurations:
For this, you have two files, Config.json and Skills.json:
  
## config.json
  - BotUsername = Place the name of your bot account <br>
  - BotOauthToken = You can see your code by loggin into [this page](https://twitchapps.com/tmi/) with your bot account<br>
  - ChannelList = Is an array, you can write any channel or channels separated by commas ["Channel1","Channel2","Channel3"],<br>
  - OSRSid = Your channel ID, if you don't know what is the id, enable debug with true and getID in true, run the bot and write a message in your twitch chat (This is for the bot to focus on a specific channel.)<br>
  - Debug = True (ON) / False (OFF) (See all messages in the console) <br>
  - GetID = Return your channel ID<br>
  - Custom messages for your lenguage or your style. Compatible with variables<br>
  
### Variables for config.json in the last three lines (Custom messages)
  - ${thisUser} = Person who executed the command (All messages can use this var)<br>
  ##### Only in "responseMsg":
  - ${rsn} = Returns the RSN passed by parameter<br>
  - ${skill} = Returns the Skill passed by parameter<br>
  - ${level} = Returns the Level for the Skill<br>
  - ${xp} = Returns the Experience for the Skill<br>
  - ${rank} = Returns the Rank for the Skill<br>
  
## skills.json
This is simple, you can add synonyms or translations, whatever you like. If the line you add is NOT the last one, you should put a comma at the end of it, and if it is the last one, you should not have it.<br>
