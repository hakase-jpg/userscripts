// ==UserScript==
// @name         skribbl+
// @namespace    https://vukky.ga
// @version      0.4.1
// @description  skribbl+ is a combination of all the Skribbl userscripts that I have previously created.
// @author       Vukky
// @match        http*://skribbl.io/*
// @updateURL    https://raw.githubusercontent.com/Vukky123/userscripts/main/skribbl/skribblplus.user.js
// @require      https://openuserjs.org/src/libs/sizzle/GM_config.js
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function() {
    'use strict';
    GM_registerMenuCommand("skribbl+: Settings", opencfg);
    function opencfg() {
        GM_config.open();
    }
    GM_config.init(
        {
          'id': 'skribblplus',
          'title': "skribbl+ 0.4.0",
          'fields':
          {
            'removeavatars':
            {
              'label': 'Remove avatars',
              'section': ['Avatar Customization', 'Customize the Skribbl avatars.'],
              'type': 'checkbox',
              'default': false
            },
            'crownsforall':
            {
              'label': "Give all avatars a crown (refresh to disable)",
              'type': 'checkbox',
              'default': false
            },
            'crownsfornone':
            {
              'label': "Remove crowns from avatars (refresh to disable)",
              'type': 'checkbox',
              'default': false
            },
            'removeavatarbodies':
            {
              'label': "Remove all bodies from avatars",
              'type': 'checkbox',
              'default': false
            },
            'donttypemore':
            {
              'label': 'Enable Don\'t Type More',
              'section': ['Don\'t Type More', 'Don\'t type more than the actual length of the word.'],
              'type': 'checkbox',
              'default': false
            },
            'donttypemorecharacters':
            {
              'label': 'How many extra characters?',
              'type': 'unsigned int',
              'min': 0,
              'default': 1
            },
            'removechat':
            {
              'label': "Remove the chat (but why?)",
              'section': ['Misc', 'Various other features.'],
              'type': 'checkbox',
              'default': false
            },
            'deletechatmessages':
            {
              'label': 'Delete individual chat messages',
              'type': 'checkbox',
              'default': false
            },
            'urlshortcuts':
            {
              'label': "URL shortcuts (skribbl.io/?play, skribbl.io/?create)",
              'type': 'checkbox',
              'default': false
            },
            'noexplanations':
            {
              'label': "Hide About and How to Play",
              'type': 'checkbox',
              'default': false
            },
            'language':
            {
              'label': "Skribbl.io UI language",
              'type': 'radio',
              'options': ['English', 'Norwegian'],
              'default': 'English'
            },
          },
          'css': "#skribblplus .section_header_holder { text-align: center; }",
          'events': {
            'open': function() {
                function removeAvatarsDisabler() {
                    var crownsforall = GM_config.get('crownsforall', true);
                    var crownsfornone = GM_config.get('crownsfornone', true);
                    var removeavatarbodies = GM_config.get('removeavatarbodies', true);
                    if(crownsforall == false && removeavatarbodies == false && crownsfornone == false) {
                        GM_config.fields['removeavatars'].node.disabled = false
                    } else {
                        GM_config.fields['removeavatars'].node.disabled = true
                    }
                }
                var crownsfornone = GM_config.get('crownsfornone', true);
                var crownsforall = GM_config.get('crownsfornone', true);
                if(crownsfornone == false) {
                    GM_config.fields['crownsforall'].node.disabled = false
                } else {
                    GM_config.fields['crownsforall'].node.disabled = true
                }
                if(crownsforall == false) {
                    GM_config.fields['crownsforall'].node.disabled = false
                } else {
                    GM_config.fields['crownsforall'].node.disabled = true
                }
                var removechat = GM_config.get('removechat', true);
                var deletechatmessages = GM_config.get('deletechatmessages', true);
                if(removechat == false) {
                    GM_config.fields['deletechatmessages'].node.disabled = false
                } else {
                    GM_config.fields['deletechatmessages'].node.disabled = true
                }
                if(deletechatmessages == false) {
                    GM_config.fields['removechat'].node.disabled = false
                } else {
                    GM_config.fields['removechat'].node.disabled = true
                }
                removeAvatarsDisabler();
                GM_config.fields['removeavatars'].node.addEventListener('change', function () {
                    var removeavatars = GM_config.get('removeavatars', true);
                    if(removeavatars == false) {
                        GM_config.fields['crownsforall'].node.disabled = false
                        GM_config.fields['crownsfornone'].node.disabled = false
                        GM_config.fields['removeavatarbodies'].node.disabled = false
                    } else {
                        GM_config.fields['crownsforall'].node.disabled = true
                        GM_config.fields['crownsfornone'].node.disabled = true
                        GM_config.fields['removeavatarbodies'].node.disabled = true
                    }
                }, false);
                GM_config.fields['crownsforall'].node.addEventListener('change', function () {
                    var crownsforall = GM_config.get('crownsforall', true);
                    removeAvatarsDisabler();
                    if(crownsforall == false) {
                        GM_config.fields['crownsfornone'].node.disabled = false
                    } else {
                        GM_config.fields['crownsfornone'].node.disabled = true
                    }
                }, false);
                GM_config.fields['crownsfornone'].node.addEventListener('change', function () {
                    var crownsfornone = GM_config.get('crownsfornone', true);
                    removeAvatarsDisabler();
                    if(crownsfornone == false) {
                        GM_config.fields['crownsforall'].node.disabled = false
                    } else {
                        GM_config.fields['crownsforall'].node.disabled = true
                    }
                }, false);
                GM_config.fields['removeavatarbodies'].node.addEventListener('change', function () {
                    var crownsforall = GM_config.get('crownsforall', true);
                    var removeavatarbodies = GM_config.get('removeavatarbodies', true);
                    if(crownsforall == false && removeavatarbodies == false) {
                        GM_config.fields['removeavatars'].node.disabled = false
                    } else {
                        GM_config.fields['removeavatars'].node.disabled = true
                    }
                }, false);
                GM_config.fields['removechat'].node.addEventListener('change', function () {
                    var removechat = GM_config.get('removechat', true);
                    if(removechat == false) {
                        GM_config.fields['deletechatmessages'].node.disabled = false
                    } else {
                        GM_config.fields['deletechatmessages'].node.disabled = true
                    }
                }, false);
                GM_config.fields['deletechatmessages'].node.addEventListener('change', function () {
                    var deletechatmessages = GM_config.get('deletechatmessages', true);
                    if(deletechatmessages == false) {
                        GM_config.fields['removechat'].node.disabled = false
                    } else {
                        GM_config.fields['removechat'].node.disabled = true
                    }
                }, false);
            },
            'reset': function() {
                GM_config.save();
                GM_config.close();
                GM_config.open();
            }
          }
    });

    setInterval(() => {
        var lang_play, lang_lobby_play, lang_create_private_room, lang_delete_message, lang_rounds, lang_language, lang_invite_your_friends, lang_players, lang_contact, lang_result, lang_score, lang_you, lang_round, lang_round_of, lang_settings, lang_copy;
        switch(GM_config.get('language')) {
            case "English":
                lang_play = "Play!",
                lang_lobby_play = "Start Game"
                lang_create_private_room = "Create Private Room",
                lang_delete_message = "Delete this message",
                lang_rounds = "Rounds",
                lang_language = "Language",
                lang_invite_your_friends = "Invite your friends!",
                lang_players = "Players",
                lang_contact = "Contact",
                lang_result = "Result"
                lang_score = "Score:",
                lang_you = "You",
                lang_round = "Round",
                lang_round_of = "of",
                lang_settings = "Settings",
                lang_copy = "Copy"
                break;
            case "Norwegian":
                lang_play = "Spill!",
                lang_lobby_play = "Start Spill"
                lang_create_private_room = "Lag Privat Rom",
                lang_delete_message = "Slett denne meldingen",
                lang_rounds = "Runder",
                lang_language = "Språk",
                lang_invite_your_friends = "Inviter vennene dine!",
                lang_players = "Spillere",
                lang_contact = "Kontakt",
                lang_result = "Resultat",
                lang_score = "Poeng:",
                lang_you = "Deg",
                lang_round = "Runde",
                lang_round_of = "av",
                lang_settings = "Innstillinger",
                lang_copy = "Kopier"
                break;
        }
        document.getElementById("formLogin").childNodes[2].id = "buttonLoginPlay"
        document.getElementById("buttonLoginPlay").innerText = lang_play
        document.getElementById("buttonLoginCreatePrivate").innerText = lang_create_private_room
        document.getElementById("buttonLobbyPlay").innerText = lang_lobby_play
        document.getElementsByClassName("containerSettings")[0].childNodes[0].childNodes[0].innerText = lang_rounds
        document.getElementsByClassName("containerSettings")[0].childNodes[2].childNodes[0].innerText = lang_language
        document.getElementsByClassName("invite-container")[0].childNodes[0].innerText = lang_invite_your_friends
        document.getElementsByClassName("lobbySection")[0].childNodes[0].innerText = lang_players
        document.getElementsByClassName("lobbySectionSettings")[0].childNodes[0].innerText = lang_settings
        document.getElementById("inviteCopyButton").innerText = lang_copy
        document.getElementsByClassName("you")[0].innerText = lang_you
        document.getElementById("tos").childNodes[0].innerText = lang_contact
        if(document.getElementById("overlay").childNodes[0].childNodes[0].innerText == "Result") {
            document.getElementById("overlay").childNodes[0].childNodes[0].innerText = lang_result
        } else if (document.getElementById("overlay").childNodes[0].childNodes[0].innerText.startsWith("Round")) {
            document.getElementById("overlay").childNodes[0].childNodes[0].innerText = lang_round + " " + document.getElementById("overlay").childNodes[0].childNodes[0].innerText.match(/\d+/g)[0]
        }
        var scores = document.getElementsByClassName("score")
        for (let i = 0; i < scores.length; i++) {
            const score = scores[i];
            if(score.innerText == "" && !score.parentNode.parentNode.id.startsWith("player") || score.parentNode.parentNode.id == "") continue;
            score.innerText = lang_score + " " + score.innerText.replace( /^\D+/g, '')
        }
        var names = document.getElementsByClassName("name")
        for (let i = 0; i < names.length; i++) {
            const name = names[i];
            if(name.innerText == "" || !name.innerText.endsWith(")")) continue;
            name.innerText = name.innerText.split('(')[0].trim() + " (" + lang_you + ")"
        }
        if(document.getElementById("round").innerText.match(/\d+/g) != null) {
            document.getElementById("round").innerText = lang_round + " " + document.getElementById("round").innerText.match(/\d+/g)[0] + " " + lang_round_of + " " + document.getElementById("round").innerText.match(/\d+/g)[1]
        }

        if(GM_config.get('removeavatars') == true) {
            var avatars = document.getElementsByClassName("avatar");
            for (let i = 0; i < avatars.length; i++) {
                const avatar = avatars[i];
                avatar.style.display = 'none';
            }
            var avatarContainers = document.getElementsByClassName("avatarContainer");
            for (let i = 0; i < avatarContainers.length; i++) {
                const avatarContainer = avatarContainers[i];
                avatarContainer.style.display = 'none';
            }
            document.getElementById("loginAvatarCustomizeContainer").style.display = 'none';
            document.getElementById("logoAvatarContainer").style.display = 'none';
        } else if (GM_config.get('removeavatars') == false) {
            var avatars = document.getElementsByClassName("avatar");
            for (let i = 0; i < avatars.length; i++) {
                const avatar = avatars[i];
                if(avatar.id == "logoAvatarDummy") continue;
                avatar.style.display = '';
            }
            var avatarContainers = document.getElementsByClassName("avatarContainer");
            for (let i = 0; i < avatarContainers.length; i++) {
                const avatarContainer = avatarContainers[i];
                avatarContainer.style.display = '';
            }
            document.getElementById("loginAvatarCustomizeContainer").style.display = '';
            document.getElementById("logoAvatarContainer").style.display = '';
        }

        if(GM_config.get('crownsforall') == true) {
            var crowns = document.getElementsByClassName("owner");
            for (let i = 0; i < crowns.length; i++) {
                const crown = crowns[i];
                crown.style.display = "";
            }
        }

        if(GM_config.get('crownsfornone') == true) {
            var crowns = document.getElementsByClassName("owner");
            for (let i = 0; i < crowns.length; i++) {
                const crown = crowns[i];
                crown.style.display = "none";
            }
        }

        if(GM_config.get('removeavatarbodies') == true) {
            var bodies = document.getElementsByClassName("color");
            for (let i = 0; i < bodies.length; i++) {
                const body = bodies[i];
                body.style.display = "none";
            }

            var avatarArrows = document.getElementsByClassName("avatarArrow");
            for (let i = 0; i < avatarArrows.length; i++) {
                const avatarArrow = avatarArrows[i];
                if(avatarArrow.className.startsWith("avatarArrow avatarArrow") && avatarArrow.attributes[1].value == "0") {
                    avatarArrow.style.display = "none";
                }
            }
        } else if (GM_config.get('removeavatarbodies') == false) {
            var bodies = document.getElementsByClassName("color");
            for (let i = 0; i < bodies.length; i++) {
                const body = bodies[i];
                body.style.display = "";
            }

            var avatarArrows = document.getElementsByClassName("avatarArrow");
            for (let i = 0; i < avatarArrows.length; i++) {
                const avatarArrow = avatarArrows[i];
                if(avatarArrow.className.startsWith("avatarArrow avatarArrow") && avatarArrow.attributes[1].value == "0") {
                    avatarArrow.style.display = "";
                }
            }
        }

        if(GM_config.get('deletechatmessages') == true) {
            // Some of this code is from https://github.com/Sv443/skribbl.io-plus.
            // Copyright (c) 2018 Sv443 / Sven Fehler
            var deleteButton = "<span id='del_msg' style='font-weight: bold; color: red; cursor: pointer;' title='" + lang_delete_message + "'>X</span> ";
            var messages = document.getElementById("boxMessages").childNodes;
            for (let i = 0; i < messages.length; i++) {
                const message = messages[i].innerHTML;
                if(message == undefined) break;
                if(messages[i].querySelector("#del_msg") == null) {
                    messages[i].innerHTML = deleteButton + message
                    messages[i].querySelector("#del_msg").addEventListener("click", function(){this.parentNode.remove();});
                }
            }
        } else if (GM_config.get('deletechatmessages') == false) {
            var messages = document.getElementById("boxMessages").childNodes;
            for (let i = 0; i < messages.length; i++) {
                if(messages[i].querySelector("#del_msg") != null) {
                    messages[i].querySelector("#del_msg").remove();
                }
            }
        }

        if(GM_config.get('urlshortcuts') == true) {
            if(document.getElementById("screenLogin").style.display != "none") {
                if(location.search == "?play") {
                    document.getElementById("formLogin").getElementsByTagName("button")[0].click();
                    document.getElementById("containerLogoBig").style.display = ""
                } else if (location.search == "?create") {
                    document.getElementById("formLogin").getElementsByTagName("button")[1].click();
                    document.getElementById("containerLogoBig").style.display = ""
                }
            }
        }

        if(GM_config.get('removechat') == true) {
            document.getElementById("boxMessages").style.display = "none";
        } else if (GM_config.get('removechat') == false) {
            if(document.getElementById("screenGame").style.display == "") {
                document.getElementById("boxMessages").style.display = "";
            }
        }

        var wordLength = document.getElementById("currentWord").textContent.length;
        if(GM_config.get('donttypemore') == true && !wordLength == 0) {
            var maxLength;
            maxLength = wordLength + GM_config.get('donttypemorecharacters')
            document.getElementById("inputChat").setAttribute("maxlength", maxLength);
            document.getElementById("inputChat").setAttribute("placeholder", "Type your guess here... (max " + maxLength + " characters)");
        } else {
            document.getElementById("inputChat").setAttribute("maxlength", "100");
            document.getElementById("inputChat").setAttribute("placeholder", "Type your guess here...");
        }

        if(GM_config.get('noexplanations') == true) {
            document.getElementById("tabUpdate").style.display = "none";
            document.getElementById("tabAbout").style.display = "none";
            document.getElementById("tabHow").style.display = "none";
        } else if (GM_config.get('noexplanations') == false) {
            document.getElementById("tabUpdate").style.display = "";
            document.getElementById("tabAbout").style.display = "";
            document.getElementById("tabHow").style.display = "";
        }
    }, 100);
})();