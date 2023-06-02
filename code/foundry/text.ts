import { random } from '../core';
import { CosmosUtils } from '../engine';
import { battler, choicer, pager, world } from '../mantle';
import save from '../save';

const text = {
   a_foundry: {
      plot_call: {
         a: [
            '<32>{#p/event}* Ring, ring...',
            '<18>{#p/papyrus}THIS IS PAPYRUS.',
            '<18>{#p/papyrus}{#f/5}DESPITE MY BEST EFFORTS TO SWAY HER OPINION...',
            '<18>{#p/papyrus}{#f/5}UNDYNE STILL WANTS TO KILL YOU.',
            '<18>{#p/papyrus}{#f/0}BUT... WORRY NOT!\nFOR I, THE GREAT PAPYRUS...',
            '<18>{#p/papyrus}{#f/9}HAVE A FOOLPROOF PLAN TO SAVE YOU!',
            "<18>{#p/papyrus}{#f/0}ALL YOU HAVE TO DO IS TELL ME WHAT YOU'RE WEARING.",
            choicer.create('* (Tell him?)', 8, 7, 'Yes', 'No')
         ],
         a1: [
            "<32>{#p/human}* (You tell Papyrus what you're wearing.)",
            '<18>{#p/papyrus}{#f/0}GOT IT, THANK YOU VERY MUCH!',
            '<18>{#p/papyrus}{#f/0}PAPYRUS OUT!'
         ],
         a2: [
            '<32>{#p/human}* (You choose not to tell.)',
            '<18>{#p/papyrus}{#f/5}TRUST ISSUES, HUH?',
            "<18>{#p/papyrus}{#f/4}LOOKS LIKE I'LL HAVE TO RESORT TO PLAN B...",
            '<18>{#p/papyrus}{#f/0}PAPYRUS OUT!'
         ],
         b: () => [
            '<32>{#p/event}* Ring, ring...',
            '<18>{#p/papyrus}THIS IS PAPYRUS.',
            '<18>{#p/papyrus}REMEMBER WHEN I ASKED YOU ABOUT CLOTHES?',
            ...(save.data.b.f_state_papclothes
               ? [
                    '<18>{#p/papyrus}{#f/0}WELL, IT TURNS OUT YOUR ANSWER...',
                    "<18>{#p/papyrus}{#f/6}DIDN'T COME THROUGH VERY WELL ON THE PHONE.",
                    '<18>{#p/papyrus}{#f/0}I TRIED VERY HARD TO UNDERSTAND, BUT...'
                 ]
               : [
                    '<18>{#p/papyrus}{#f/0}WELL, IT TURNS OUT YOUR LACK OF TRUST...',
                    '<18>{#p/papyrus}{#f/9}WAS EXACTLY WHAT I NEEDED TO SAVE YOU!',
                    '<18>{#p/papyrus}{#f/0}AT FIRST, I TRIED GOING OFF MEMORY, BUT...'
                 ]),
            '<18>{#p/papyrus}{#f/5}IN THE END, I HAD TO MAKE SOMETHING UP IN MY REPORT.',
            '<18>{#p/papyrus}{#f/0}NOW, UNDYNE IS GOOD AT KNOWING WHEN I LIE.',
            '<18>{#p/papyrus}{#f/4}BUT THE FACT THAT I WAS TRULY UNCERTAIN...',
            '<18>{#p/papyrus}{#f/9}MEANT SHE HAD NO IDEA IF I WAS LYING OR NOT!',
            '<18>{#p/papyrus}{#f/0}WHILE CHASING YOU, THIS CAUSED HER TO HESITATE...',
            '<18>{#p/papyrus}{#f/0}AND THUS, YOUR LIFE WAS SAVED!',
            '<18>{#p/papyrus}{#f/9}NYEH HEH HEH!\nI KNEW THIS PLAN WOULD WORK.',
            '<18>{#p/papyrus}{#f/0}PAPYRUS OUT!'
         ]
      },
      secretcall: [
         '<32>{#s/phone}{#p/event}* Ring, ring...',
         '<18>{#p/papyrus}{#f/9}PSST, THIS IS PAPYRUS!',
         '<18>{#f/0}AT THE MOMENT, I AM STILL HIDING IN MY SAFE PLACE.',
         "<18>{#f/4}I HOPE YOU'RE NOT GETTING INTO TROUBLE...",
         '<18>{#f/4}BECAUSE IF YOU ARE...',
         "<19>{#f/9}I'D HAVE TO COME OVER THERE AND DO SOMETHING ABOUT IT!",
         "<18>{#f/6}...WHICH I CAN'T DO, BECAUSE OF THE CURRENT SITUATION.",
         "<18>{#f/7}SO DON'T GET INTO ANY TROUBLE!",
         '<18>{#f/5}...',
         '<18>{#f/5}PAPYRUS OUT...',
         '<32>{#s/equip}{#p/event}* Click...'
      ],
      undynehouse1: [ "<32>{#p/narrator}* It's locked." ],
      undynehouse2: [ "<32>{#p/narrator}* It's literally on fire.\n* You're not getting in there." ],
      deathReaction: {
         f_asriel: [ '<32>{#p/narrator}* Here, of all places...' ],
         f_dummy: [
            '<32>{#p/monster}{#npc/a}* Fatal energy signature detected.',
            '<32>* Name... Undyne.',
            '<32>* Relationship status... "acquaintance."',
            '<32>* Last interaction... asked about humans.',
            '<32>* Time to compensate for loss...',
            '<32>* Indeterminate.'
         ],
         f_village: [ '<32>{#p/tem}{#npc/a}* Welp.', '<32>* That happened.' ],
         f_hub: [
            "<32>{#p/monster}{#npc/a}* Wh...\n* What've you done!?",
            "<32>* Ole' Gerson's not gonna be a happy camper after that one..."
         ],
         f_bird: [
            '<32>{#p/narrator}* This small bird is in shock after witnessing a travesty.',
            '<32>* It no longer wants to carry you across the gap.'
         ],
         f_undyne: [
            '<32>{#p/monster}* No.\n* No!\n* NO!!!',
            '<32>* What. Have. You. DONE???',
            '<32>* She was...',
            '<32>* She was my FAVORITE bully!\n* How dare you take her away from me like that!?'
         ],
         // each line of this is processed one-at-a-time
         f_blooky: [
            '<32>{#p/monster}{#npc/a}* Did you hear about Undyne?',
            '<32>{#p/monster}{#npc/a}* Oh, not at all!',
            "<32>{#p/monster}{#npc/a}* I heard she's doing well.",
            '<32>{#p/monster}{#npc/a}* Sounds good to me!',
            '<32>{#p/monster}{#npc/a}* Undyne will never die.',
            '<32>{#p/monster}{#npc/a}* Yessir!'
         ],
         f_snail: () => [
            '<32>{#p/monster}* ...',
            save.data.b.f_state_thundersnail_win
               ? "<32>* I'll make sure you NEVER win another game of Thundersnail."
               : "<32>* I'll make sure you NEVER win a game of Thundersnail."
         ],
         f_napstablook: [
            "<32>{#p/narrator}* Looks like Napstablook won't be the only ghost living in this house anymore."
         ]
      },
      fallenfish: [ "<32>{#p/narrator}* She's in shock." ],
      fallenfish2: [ "<32>{#p/narrator}* She's fallen down.\n* Permanently." ],
      finalfish1: [ '<25>{#p/undyne}{#f/19}* Ngah...' ],
      finalfish2: [ '<25>{#p/undyne}{#f/19}* Stupid...\n* Malfunction...' ],
      watercooler1: [
         "<32>{#p/narrator}* It's a cooler full of electro- dampening fluid.",
         choicer.create('* (Get a cup?)', 8, 7, 'Yes', 'No')
      ],
      watercooler2a: [ '<32>{#p/human}* (You now hold a cup of the electro-dampening fluid.)' ],
      watercooler2b: [ '<32>{#p/human}* (You let the cooler be.)' ],
      watercooler3: [ '<32>{#p/narrator}* You already have a cup.' ],
      noTem: () =>
         world.population === 0
            ? [ "<32>{*}{#p/tem}* Where do you think you're going.{^999}" ]
            : [ "<32>{*}{#p/tem}* oh no, it's a... FISHES!!!{^999}" ],
      noTortoise: [ '<32>{*}{#p/monster}* Run while ya still can, kid!{^999}' ],
      artifact1: [ '<32>{#p/human}* (You got the legendary artifact.)', '<32>{#p/narrator}* That was too easy...' ],
      artifact2: [ "<32>{#p/human}* (You're carrying too much to take that.)" ],
      jumpsuit1: [ '<32>{#p/human}* (You got the jumpsuit.)' ],
      jumpsuit2: [ "<32>{#p/human}* (You're carrying too much to take that.)" ],
      boots1: [ '<32>{#p/human}* (You got the hoverboots.)' ],
      boots2: [ "<32>{#p/human}* (You're carrying too much to take that.)" ],
      artifact3: [
         '<32>{#p/narrator}* There is a writ inscribed on the pedastal.',
         '<32>* "Two halves, split by the ivories."',
         '<32>* "If Asriel\'s is your left, then whose is your right?',
         '<32>* "And what is their melody?"'
      ],
      astrofood1: () =>
         [
            [
               '<32>{#p/narrator}* There are three bars of licorice in the cooler.',
               choicer.create('* (Take one?)', 8, 7, 'Yes', 'No')
            ],
            [
               '<32>{#p/narrator}* There are two bars of licorice left in the cooler.',
               choicer.create('* (Take one?)', 8, 7, 'Yes', 'No')
            ],
            [
               '<32>{#p/narrator}* There is one bar of licorice left in the cooler.',
               choicer.create('* (Take it?)', 8, 7, 'Yes', 'No')
            ]
         ][save.data.n.state_foundry_astrofood],
      astrofood2: [ '<32>{#p/human}* (You got the Licorice Bar.)' ],
      astrofood3: [ "<32>{#p/human}* (You're carrying too much.)" ],
      astrofood4: () =>
         save.data.n.state_foundry_astrofood < 2
            ? [ '<32>{#p/human}* (You decide not to take one.)' ]
            : [ '<32>{#p/human}* (You decide not to take it.)' ],
      astrofood5: [ '<32>{#p/narrator}* The cooler is empty.' ],
      bird1: [
         '<32>{#p/narrator}* This small bird wants to give you a ride.',
         choicer.create("* (Accept the bird's offer?)", 8, 7, 'Yes', 'No')
      ],
      bird2: [
         '<32>{#p/narrator}* This small bird wants to give you a ride.',
         choicer.create("* (Accept the bird's offer?)", 8, 7, 'Yes', 'No')
      ],
      blookdate1: () =>
         world.sad_ghost
            ? [
                 '<32>{#p/napstablook}* oh...\n* hi there...',
                 "<32>* sorry, i...\n* wasn't expecting you to follow me here.",
                 '<32>* uh...\n* make yourself at home...?'
              ]
            : [
                 '<32>{#p/napstablook}* oh...\n* you actually came...',
                 "<32>* sorry, i...\n* wasn't expecting that.",
                 "<32>* it's not much, but make yourself at home."
              ],
      blookdate2: () => [
         ...(world.sad_ghost
            ? [ '<32>{#p/napstablook}* oh... you want my food...', '<32>* let me see what i have...' ]
            : [ '<32>{#p/napstablook}* are you hungry?', '<32>* i think i have something in the fridge...' ])
      ],
      blookdate2x: [
         '<32>{#p/human}* (You inspect the fridge.)',
         "<32>{#p/narrator}* It's difficult to make out what's inside."
      ],
      blookdate3: [
         "<32>{#p/napstablook}* it's a ghost sandwhich...",
         '<32>* do you want to try it...',
         choicer.create('* (Take a bite?)', 8, 7, 'Yes', 'No')
      ],
      blookdate4a: [
         '<32>{#p/human}* (You attempt to bite into the ghost sandwhich.)',
         '<32>{#p/human}* (You phase right through it.)',
         '<32>{#p/napstablook}* oh...',
         '<32>* nevermind...'
      ],
      blookdate4b: [ '<32>{#p/napstablook}* oh...........' ],
      blookdate5: [
         '<32>{#p/napstablook}* after a great meal i like to lie on the ground and feel like garbage...',
         "<32>* it's a family tradition...",
         '<32>* do you want...\n* ...to join me...?',
         choicer.create('* (What do you say?)', 8, 7, 'Yes', 'No')
      ],
      blookdate6a: [ '<32>{#p/napstablook}* okay...\n* follow my lead...' ],
      blookdate6b: [ '<32>{#p/napstablook}* oh...........\n* ...........', "<32>* i'll just be outside then..." ],
      blookdate7: [
         "<32>{#p/napstablook}* here we go...\n* you'll lie down as long as you don't move.",
         '<32>* so...\n* only move around when you want to get up, i guess.'
      ],
      blookdate8: [ '<32>{#p/napstablook}* well, that was nice...', '<32>* thank you...' ],
      blookdate8x: [ '<32>{#p/napstablook}* well, that was fast...', '<32>* uh... thanks?' ],
      blookdate9: [
         "<32>{#p/napstablook}* i'll be outside...\n* feel free to join me...\n* or not...",
         "<32>* it's up to you..."
      ],
      blookmusic1: () => [
         '<32>{#p/narrator}* There is currently no music playing.',
         `<99>{#p/human}* (Play a song?)\n{!}     Spooktune       Spookwave\n     Spookwaltz      Cancel{#c/1/5/5}`
      ],
      blookmusic1x: [ '<32>{#p/narrator}* There is currently no music playing.' ],
      blookmusic2: () => [
         [
            '<32>{#p/narrator}* Currently playing "Spooktune"',
            '<32>{#p/narrator}* Currently playing "Spookwave"',
            '<32>{#p/narrator}* Currently playing "Spookwaltz"'
         ][save.data.n.state_foundry_blookmusic - 1],
         choicer.create('* (Stop playback?)', 8, 7, 'Yes', 'No')
      ],
      blookmusic2x: () => [
         [
            '<32>{#p/narrator}* Currently playing "Spooktune"',
            '<32>{#p/narrator}* Currently playing "Spookwave"',
            '<32>{#p/narrator}* Currently playing "Spookwaltz"'
         ][save.data.n.state_foundry_blookmusic - 1]
      ],
      blookmusic3a: [
         '<32>{#p/napstablook}* oh...\n* a classic spooktune...',
         "<32>* they really don't make music like this anymore..."
      ],
      blookmusic3b: [ '<32>{#p/napstablook}* dang, that ambience...', "<32>* it's like my whole body is being spooked" ],
      blookmusic3c: [
         "<32>{#p/napstablook}* this one's kinda slow...",
         "<32>* but once you get into the groove, it's pretty good"
      ],
      blookmusic3d: [
         '<32>{#p/napstablook}* hey...\n* you really like listening to that old playlist, huh?',
         "<32>* heh...\n* that's very nice of you...\n* thank you..."
      ],
      blooksnail1: pager.create(
         'limit',
         [
            "<32>{#p/napstablook}* do you want to play a game?\n* it's called thundersnail.",
            '<32>* the snails will race, and if the yellow snail wins, you win.',
            "<32>* it's 10G to play.",
            choicer.create('* (Play Thundersnail?)', 8, 7, 'Yes', 'No')
         ],
         [
            '<32>{#p/napstablook}* did you change your mind?',
            choicer.create('* (Play Thundersnail?)', 8, 7, 'Yes', 'No')
         ]
      ),
      blooksnail1i: [
         '<32>{#p/napstablook}* do you want to play again?',
         choicer.create('* (Play Thundersnail?)', 8, 7, 'Yes', 'No')
      ],
      blooksnail2a: [
         "<32>{#p/napstablook}* um...\n* you don't have enough money?",
         "<32>* n-no, you can still play, don't worry about it..."
      ],
      blooksnail2b: [ '<32>{#p/napstablook}* oh...........' ],
      blooksnail2b0: [ '<32>{#p/napstablook}* alright...........' ],
      blooksnail3: [ '<32>{#p/napstablook}* okay...\n* press [Z] repeatedly to encourage your snail.', '<32>* ready?' ],
      blooksnail3i: [ '<32>{#p/napstablook}* okay...\n* remember, you can always encourage your snail.', '<32>* ready?' ],
      blooksnail4a: [
         '<32>{#p/napstablook}* you won... congratulations.',
         '<32>{#s/equip}* as a prize, you get 15G.',
         "<32>* i hope it's enough..."
      ],
      blooksnail4b: [
         '<32>{#p/napstablook}* your snail lost by a thin margin.',
         '<32>* wait...\n* the snail is under the false belief that it won...',
         '<32>* oh no... the snail is going to be sad...',
         "<32>* here, i'll just give you some money...\n* act like you won...",
         '<32>{#s/equip}{#p/human}* (You got 30G.)'
      ],
      blooksnail4c: [
         '<32>{#p/napstablook}* oh...........\n* you both tried your best...',
         '<32>* the snail looks discouraged...',
         "<32>* i guess her best wasn't good enough...",
         '<32>* oh...........'
      ],
      blooksnail4d: [
         '<32>{#p/napstablook}* oh...........\n* looks like you encouraged your snail a little too much...',
         '<32>* all that pressure to succeed...\n* really got to her...',
         '<32>* oh...........'
      ],
      blooksnail4e: [
         '<32>{#p/napstablook}* oh...........\n* looks like you encouraged your snail too much...',
         "<32>* she won't even look at you...",
         '<32>* oh...........'
      ],
      blooksnail4f: [
         '<32>{#p/napstablook}* oh...........\n* looks like you encouraged your snail way too much...',
         "<32>* now she's... just gone...",
         '<32>* oh...........'
      ],
      blooksnailX: {
         a: '3...',
         b: '2...',
         c: '1...',
         d: 'GO!',
         e: 'RACE END'
      },
      blooksorry1: [
         '<32>{#p/napstablook}* ...?',
         "<32>* you...\n* you're...",
         '<32>* ...are you sure?',
         choicer.create('* (What do you say?)', 8, 7, 'Yes', 'No')
      ],
      blooksorry2: [
         '<32>{#p/napstablook}* i...',
         "<32>* i never thought you'd...",
         '<32>* ...um...',
         '<32>* ...are you absolutely sure?',
         choicer.create('* (What do you say?)', 8, 7, 'Yes', 'No')
      ],
      blooksorry3: [
         '<32>{#p/napstablook}* you...',
         "<32>* you really mean it, don't you?",
         '<32>* ...\n* heh...',
         '<32>* okay...',
         "<32>* i'll try to forget about what you did before..."
      ],
      blooksorryX: [ '<32>{#p/napstablook}* oh...........\n* ...........\n* ...........' ],
      blooksorryY: [ '<32>{#p/napstablook}* ...' ],
      blooktouch1: () =>
         world.sad_ghost
            ? [
                 '<32>{#p/napstablook}* what do you want...',
                 choicer.create('* (What do you say?)', 8, 7, 'Sorry', 'Nothing')
              ]
            : [
                 '<32>{#p/napstablook}* oh, do you need anything?',
                 choicer.create('* (What do you say?)', 8, 7, 'Hug', 'Sleep', 'Music', 'Nothing')
              ],
      blooktouch2a1: [
         '<32>{#p/napstablook}* you... want to...\n* umm...',
         '<32>* you want me to give you a hug?',
         "<32>* well...\n* if it'll make you happy...",
         '<32>{#p/narrator}* Napstablook attempts to give you a big hug.',
         '<32>* They pass right through you.',
         '<32>{#p/napstablook}* oh...........',
         "<32>* i guess...........\n* i can't do it..........."
      ],
      blooktouch2a2: [
         "<32>{#p/napstablook}* you really need a hug, don't you...",
         "<32>* i'm sorry...\n* i wish i could..."
      ],
      blooktouch2b1: [
         '<32>{#p/napstablook}* do you need a place to sleep?',
         "<32>* umm... i don't really have a bed in here...",
         '<32>* hmm...',
         "<32>* go to the fridge and see if there's anything to eat...",
         '<32>* after that, we can lie down on the ground...',
         "<32>* you'll see..."
      ],
      blooktouch2b2: [ '<32>{#p/napstablook}* remember\n* the fridge...' ],
      blooktouch2c1: [
         "<32>{#p/napstablook}* if you wanna listen to music, there's some on my stereo...",
         '<32>* feel free to take a look...\n* or not...'
      ],
      blooktouch2c2: [
         '<32>{#p/napstablook}* is the stereo...\n* ...not to your liking...',
         "<32>* maybe...\n* i could show you a new song i've been working on...",
         "<32>* it's way different than my usual stuff...",
         '<32>* do you want to hear it?',
         choicer.create('* (What do you say?)', 8, 7, 'Yes', 'No')
      ],
      blooktouch2c2x: [
         '<32>{#p/napstablook}* want to hear my new song?',
         choicer.create('* (What do you say?)', 8, 7, 'Yes', 'No')
      ],
      blooktouch2c3a: [ '<32>{#p/napstablook}* oh...\n* well, let me know if you change your mind...' ],
      blooktouch2c3b: [ '<32>{#p/napstablook}* okay...\n* let me put it on...' ],
      blooktouch2c4: [
         '<32>{#p/napstablook}* so... what did you think?',
         choicer.create('* (What do you say?)', 8, 7, 'Good', 'Bad')
      ],
      blooktouch2c5a: [
         "<32>{#p/napstablook}* oh?\n* it's not bad?",
         '<32>* oh-\n* umm... thank you...',
         "<32>* i'll...\n* i'll tell you when it's done!",
         '<32>* heh...'
      ],
      blooktouch2c5b: [ '<32>{#p/napstablook}* oh...\n* i knew it...' ],
      blooktouch2d1: [ "<32>{#p/napstablook}* sorry...\n* that's all the music i have for now..." ],
      blooktouch2d2: [ "<32>{#p/napstablook}* sorry...\n* i don't really wanna talk about that right now..." ],
      blookyard1: pager.create(
         'limit',
         () =>
            save.storage.inventory.contents.includes('tvm_mewmew')
               ? [
                    '<32>{#p/napstablook}* you can keep your mew mew doll',
                    '<32>{#p/napstablook}* thanks for not being helpful, i guess......'
                 ]
               : 65 <= save.data.n.plot
               ? save.data.b.a_state_hapstablook
                  ? [
                       '<32>{#p/napstablook}* hey... thanks for all the help back there...',
                       "<32>{#p/napstablook}* i don't know how things would've gone without you......"
                    ]
                  : [ '<32>{#p/napstablook}* with every day that goes by, i feel a little farther away from happiness.' ]
               : 63 <= save.data.n.plot && save.data.b.a_state_hapstablook
               ? [
                    "<32>{#p/napstablook}* you're probably wondering about mettaton's intervention, right?",
                    "<32>{#p/napstablook}* don't worry, it's still happening...",
                    '<32>{#p/napstablook}* i just came back here to keep an eye on my snail farm...'
                 ]
               : 60 <= save.data.n.plot
               ? [
                    "<32>{#p/napstablook}* being a contestant on one of mettaton's shows was a dream come true...",
                    "<32>* i wonder if i'll ever get to do it again"
                 ]
               : 49 <= save.data.n.plot
               ? [
                    "<32>{#p/napstablook}* oh... you're back in the foundry now?",
                    '<32>* dang, you sure do get around',
                    '<32>* ...',
                    '<32>* i guess i do too...',
                    "<32>* but, i'm kind of incorporeal, so it's not that impressive for me"
                 ]
               : [
                    '<32>{#p/napstablook}* welcome to blook family snail farm...',
                    "<32>* ...yeah.\n* i'm the only employee.",
                    ...(world.population < 4
                       ? [
                            "<32>* hey, that's weird...",
                            '<32>* my snails disappeared...',
                            "<32>* maybe they're just done with me, it's... something that i've feared..."
                         ]
                       : [
                            '<32>* this place used to get a lot of business...',
                            '<32>* but our main customer disappeared one day...',
                            "<32>* now it's just some hairy guy who shows up once in a while..."
                         ])
                 ],
         () =>
            save.storage.inventory.contents.includes('tvm_mewmew')
               ? [ '<32>{#p/napstablook}* ............' ]
               : 65 <= save.data.n.plot
               ? save.data.b.a_state_hapstablook
                  ? [ "<32>{#p/napstablook}* isn't it intriguing how stuff works out sometimes?" ]
                  : [ '<32>{#p/napstablook}* sorry', "<32>* it's been a rough day........." ]
               : 63 <= save.data.n.plot && save.data.b.a_state_hapstablook
               ? [
                    '<32>{#p/napstablook}* oh, and, thanks for coming to check on me...',
                    '<32>* it makes me feel a little better knowing i have another friend who cares about me.'
                 ]
               : 60 <= save.data.n.plot
               ? [ "<32>{#p/napstablook}* hopefully next time he's a little nicer to the contestants........." ]
               : 49 <= save.data.n.plot
               ? [
                    '<32>{#p/napstablook}* oh yeah, i saw you on that talent show earlier...',
                    ...(save.data.n.state_aerialis_talentfails === 0
                       ? [
                            "<32>{#p/napstablook}* that was quite a performance... you didn't even mess up once",
                            '<32>* where did you learn to sing and dance like that?',
                            "<32>* i don't know if i'll ever be able to do that......"
                         ]
                       : save.data.n.state_aerialis_talentfails < 15
                       ? [
                            "<32>{#p/napstablook}* even if your performance wasn't perfect, you did pretty good",
                            "<32>* most of mettaton's contestants don't even make it halfway...",
                            '<32>* including me......'
                         ]
                       : [
                            "<32>{#p/napstablook}* even if your performance wasn't the greatest, i could tell you were trying your best",
                            '<32>* and besides, you made it to the end, right?',
                            '<32>* unlike me, in the past......'
                         ])
                 ]
               : world.population < 4
               ? [
                    "<32>{#p/napstablook}* oh hey...\n* that rhymed, didn't it...",
                    '<32>* i might make a song about my snails to pass the time...'
                 ]
               : [
                    '<32>{#p/napstablook}* a friend of mine recently told me it was the king...',
                    "<32>* but that can't be true\n* he wouldn't even know me..."
                 ],
         [ '<32>{#p/napstablook}* i wish i had more to say...' ]
      ),
      candy1: [
         '<32>{#p/narrator}* Synthesize something with the vending machine?',
         choicer.create('* (What will you make?)', 8, 7, 'Rations', 'Water', 'TZN', 'Nothing')
      ],
      candy2: [ '<32>{#p/human}* (You got the $(x).)' ],
      candy3: [ choicer.create('* (Buy the $(x) for $(y)G?)', 8, 7, 'Yes', 'No') ],
      candy4: [ "<32>{#p/human}* (You don't have enough G.)" ],
      candy5: [ '<32>{#p/human}* (You decide not to pay.)' ],
      candy6: [ "<32>{#p/human}* (You're carrying too much.)" ],
      candy7: [ '<32>{#p/human}* (You decide not to make anything.)' ],
      cornered0: [ '<32>{#p/undyne}{#i/60}* Behind you.' ],
      cornered1: [
         '<32>{#p/undyne}* Seven.',
         '<32>* Seven human SOULs and this world will be transformed.',
         '<32>* Six.',
         "<32>* That's how many we have right now.",
         '<32>* Are we clear?',
         '<32>* Through your seventh and final SOUL, freedom will finally be ours.',
         '<32>* YOU, human, are the ONLY thing standing in our way.',
         "<32>* I'll give you one chance, and one chance only.",
         '<32>* Give up your SOUL...',
         "<32>* ...or I'll tear it from your body.",
         choicer.create('* (Give up your SOUL?)', 8, 7, 'No', 'Yes')
      ],
      cornered2: [
         '<32>{#p/undyne}* ...',
         '<32>* Wait.\n* What?',
         choicer.create('* (Give up your SOUL?)', 8, 7, 'No', 'Yes')
      ],
      cornered3: [
         '<32>{#p/undyne}* ...',
         "<32>* You're not seriously going to- {%}",
         choicer.create('* (Give up your SOUL?)', 8, 7, 'No', 'Yes')
      ],
      cornered3a: [ '<32>{#p/undyne}* ...', choicer.create('* (Give up your SOUL?)', 8, 7, 'No', 'Yes') ],
      cornered4: [ '<32>{#p/undyne}* ...', "<32>* That's what I thought." ],
      cornered5: [
         '<25>{#p/kidding}{#f/1}* YO, you did it!!!\n* Undyne is RIGHT in front of you!!!',
         "<25>* You've got front row seats to her fight!!!"
      ],
      cornered6: [ '<25>{#p/kidd}{#f/4}* ...wait.', "<25>{#f/4}* Who's she fighting???" ],
      cornered7: [ "<25>{#p/kidd}{#f/4}{*}* Hey! You aren't gonna tell my p-parents about this, are you?{^999}" ],
      cornered8: () =>
         save.data.n.plot > 46
            ? [
                 '<32>{#p/undyne}{#npc/a}* Listen kiddo, I need to talk to your parents.',
                 '<32>* Can you tell me where they are?',
                 "<32>{#p/kidd}* Undyne, I...\n* I-I can't...",
                 "<32>{#p/undyne}* Kiddo...\n* You're crying...",
                 '<32>{#s/echostop}{#p/event}{#npc}* Signal end.'
              ]
            : world.genocide
            ? [
                 '<32>{#p/undyne}{#npc/a}* Behind you.',
                 '<32>{#p/alphys}* ...?',
                 "<32>{#p/undyne}* Alphys, if we don't evacuate people in lines, nobody's going to fit through.",
                 '<32>{#p/undyne}* They gotta be behind you.',
                 '<32>{#p/alphys}* Y-yeah, I know...\n* Sorry...',
                 '<32>{#s/echostop}{#p/event}{#npc}* Signal end.'
              ]
            : [
                 '<32>{#p/undyne}{#npc/a}* Behind you.',
                 '<32>{#p/alphys}* ...!',
                 '<32>{#p/undyne}* Heheh, did I scare ya?',
                 '<32>{#p/alphys}* Undyne... knock it off...!',
                 '<32>{#p/undyne}* Pfft, no deal.',
                 '<32>{#s/echostop}{#p/event}{#npc}* Signal end.'
              ],
      cornered9: [ '<32>{#p/undyne}* ...', "<32>{#p/undyne}* I'll be there right away." ],
      cornered10: [ '<32>{#p/undyne}* (Stupid spiders...)' ],
      cornered11: [ "<32>{#p/undyne}* This isn't over, punk.", "<32>* We'll be seeing each other again REAL soon." ],
      dummy1a: () =>
         save.data.n.state_wastelands_dummy === 2
            ? [ "<32>{#p/monster}* HA!\n* Of course you'd run away.", '<32>* Whatever, DUMMY.' ]
            : [ '<32>{#p/monster}* You DARE enter my territory and WALK PAST me?', '<32>* FOOL!' ],
      dummy1b: () =>
         save.data.n.state_wastelands_dummy === 1
            ? [ '<32>{#p/monster}* Too intimidated to fight...?', '<32>* I see how it is.' ]
            : [ '<32>{#p/monster}* You DARE enter my territory and STARE at me?', '<32>* FOOL!' ],
      dummy1c: () =>
         save.data.n.state_wastelands_dummy === 1
            ? [ '<32>{#p/monster}* I thought you might do that.', '<32>* Predictable.\n* Predictable!\n* PREDICTABLE!!!' ]
            : [
                 '<32>{#p/monster}* Well well well, I see you have a fighting spirit.',
                 "<32>* Not that it'll do you much good when I STOMP you!"
              ],
      dummy2: () => [
         '<32>{#p/monster}* Those ELITE bozos failed to take your SOUL, but they lack something I have in SPADES!',
         "<32>* That's right, human...\n* I'm INCORPOREAL!",
         '<32>* I am a ghost that lives inside a dummy!',
         '<32>* My cousin also lived inside a dummy, UNTIL...!',
         ...(save.data.b.toriel_phone
            ? [
                 '<32>* Until...!',
                 '<32>* Until...',
                 '<32>{#x1}* ...well, actually, they left it on their own accord...',
                 '<32>* Apparently, this really nice woman decided to take care of them in the OUTLANDS?',
                 '<32>* They said a human helped her feel better.',
                 "<32>* That was you, wasn't it?",
                 '<32>* ...shucks.\n* I guess you can go peacefully...'
              ]
            : [
                 '<32>* YOU CAME ALONG!!!',
                 ...(save.data.b.genocide
                    ? [
                         '<32>* Not only did YOUR actions cause them to leave their home...',
                         '<32>* But now all of their neighbors are gone, too!',
                         '<32>* Despicable.\n* Despicable!\n* DESPICABLE!!!',
                         "<32>{#x1}* You're the worst person I've ever met!\n* I've NEVER been more mad!!!",
                         '<32>{#x2}* Guooooohhhh!!!!\n* My mannequin levels are going OFF THE CHARTS!!!'
                      ]
                    : save.data.n.state_wastelands_dummy === 3
                    ? [
                         '<32>* YOU... you...',
                         '<32>* Shucks!\n* You were really boring!',
                         '<32>* They got annoyed and flew away like any self-respecting spectre.',
                         '<32>* Well then.\n* Well then!\n* WELL THEN!',
                         "<32>* I guess I'll just have to entertain MYSELF!",
                         "<32>* Buckle up, sleepyhead!\n* It's time to put on a show!"
                      ]
                    : save.data.n.state_wastelands_dummy === 4
                    ? [
                         '<32>* YOU... you...',
                         '<32>* Shucks!\n* You were really nice!',
                         '<32>* So nice, in fact, that after your encounter, they developed a HUGGING addiction!!',
                         '<32>* In desperation, they left their body, hoping to get their fix from me.',
                         "<32>* They know I have haphephobia, but they won't quit asking me!\n* It's INFURIATING!",
                         "<32>* You'll SUFFER for this, HUMAN!!!!"
                      ]
                    : [
                         ...(save.data.n.state_wastelands_dummy === 0
                            ? [
                                 '<32>* When you talked with them, they were hoping for a nice chat...',
                                 '<32>* But the things you said...!',
                                 '<32>* Horrible.\n* Shocking!\n* UNBELIEVABLE!',
                                 '<32>* You spooked them right out of their dummy!',
                                 '<32>* Grr...'
                              ]
                            : save.data.n.state_wastelands_dummy === 1
                            ? [
                                 '<32>* Us ghosts spend our whole lives looking for a proper vessel.',
                                 '<32>* Slowly, slowly, we grow closer to our new bodies, until one day...',
                                 '<32>* We too maybe become corporeal beings, able to laugh, love, and dance like any other.',
                                 "<32>* But YOU!!!\n* My cousin's future...\n* You snatched it all away!",
                                 '<32>* Uraaahhhhh!!!'
                              ]
                            : save.data.n.state_wastelands_dummy === 2
                            ? [
                                 '<32>* They were a shy sort.\n* Living a lonely life in the OUTLANDS...',
                                 '<32>* They saw you and HOPED you might TALK to them.',
                                 '<32>* But NO!\n* You ran away!',
                                 '<32>* Pathetic.\n* Pathetic!\n* PATHETIC!!!',
                                 "<32>* Nobody breaks my cousin's HEART and GETS AWAY with it!"
                              ]
                            : save.data.n.state_wastelands_dummy === 5
                            ? [
                                 '<32>* When you first showed up, they were so excited to talk...',
                                 '<32>* And then you went and SLAPPED them in the FACE!',
                                 '<32>* Not just once.\n* Not just twice!',
                                 '<32>* But THREE TIMES!!',
                                 '<32>* How AWFUL do you have to BE!?'
                              ]
                            : save.data.n.state_wastelands_dummy === 6
                            ? [
                                 '<32>* My cousin is a nice fellow.',
                                 "<32>* But that doesn't mean you can just GO AROUND and FLIRT with them!",
                                 '<32>* Your stupid advances weirded them out SO MUCH...',
                                 "<32>* ...they just couldn't take it anymore!!",
                                 '<32>* Disgusting.\n* Disgusting!\n* DISGUSTING!!!'
                              ]
                            : []),
                         "<32>* You'll DIE for this, HUMAN!!!!"
                      ])
              ])
      ],
      dummy3: [
         '<32>{#p/monster}* ...?',
         '<32>* This...\n* This feeling...?',
         '<32>{#x3}* Eureka.\n* Eureka!\n* EUREKA!!!',
         '<32>* Human.\n* That moment of unbridled emotion.',
         '<32>* It allowed me to finally fuse with my body!',
         "<32>* I'm fully corporeal now!\n* Am I... dreaming?\n* Is this real???",
         "<32>* Well, in return, I guess I won't stomp you.",
         "<32>* How's that sound?"
      ],
      dummy4: () =>
         world.sad_ghost
            ? [
                 "<32>{#p/napstablook}* well...\n* i'm going to head home now...",
                 '<32>* just warning you...',
                 "<32>* so you don't accidentally follow me to my house...",
                 "<32>* you probably wouldn't like that..."
              ]
            : save.data.b.toriel_phone
            ? [
                 '<32>{#p/napstablook}* hey...\n* noticed you were coming this way...',
                 '<32>* i was actually about to head home...',
                 '<32>* so... um...\n* feel free to "come with" if you want...',
                 '<32>* but no pressure...',
                 "<32>* i understand if you're busy...",
                 "<32>* it's fine...",
                 '<32>* no worries...',
                 "<32>* just thought i'd offer..."
              ]
            : [
                 "<32>{#p/napstablook}* well...\n* i'm going to head home now...",
                 '<32>* oh... um...\n* feel free to "come with" if you want...',
                 '<32>* but no pressure...',
                 "<32>* i understand if you're busy...",
                 "<32>* it's fine...",
                 '<32>* no worries...',
                 "<32>* just thought i'd offer..."
              ],
      dummypunch1: [
         "<32>{#p/narrator}* It's a training dummy.\n* Are you gonna beat it up?",
         choicer.create('* (Beat up the dummy?)', 8, 7, 'No', 'Yes')
      ],
      dummypunch2a: [ '<32>{#p/human}* (You left the dummy be.)' ],
      dummypunch2b: () =>
         world.genocide || save.data.n.kills > 8 || save.data.n.bully > 8
            ? [ '<32>{#p/human}* (You went to town on the dummy.)', '<32>{#p/narrator}* How does it feel?' ]
            : save.data.n.kills > 4 || save.data.n.bully > 4
            ? [
                 '<32>{#p/human}* (You punched the dummy.)',
                 '<32>{#p/narrator}* As if that was actually going to accomplish anything.'
              ]
            : [ '<32>{#p/human}* (You slapped the dummy.)', '<32>{#p/narrator}* You probably feel bad.' ],
      dummypunch3: [ "<32>{#p/narrator}* It's a beat-up training dummy." ],
      genotext: {
         asrielCorner: [
            "<25>{#p/asriel2}{#f/8}* That's weird...",
            "<25>{#p/asriel2}{#f/6}* The side door's open.",
            '<25>{#p/asriel2}{#f/7}* Well, only one way forward, so...\n* Okay, I guess.'
         ],
         asgoreMK1: [
            '<25>{#p/kidd}{#f/7}* Woah, is that... no way...',
            "<25>{#f/1}* It's the KING!",
            '<25>* King Asgore, dude!\n* What the heck are you doing way out here!?',
            '<25>{#p/asgore1}{#f/3}* ...',
            '<25>{#f/3}* It is... a long story.',
            '<25>{#p/kidd}{#f/4}* Oh...',
            '<25>{#f/1}* Well, you can tell me!',
            '<25>{#p/asgore1}{#f/7}* Heh.\n* No, I cannot.',
            '<25>{#f/6}* But I can ask you a question.',
            '<25>{#p/kidd}{#f/3}* ...?',
            '<25>{#p/asgore1}{#f/7}* Has this human been a good friend to you?',
            '<25>{#p/kidd}{#f/1}* Well... yeah!',
            '<25>{#f/4}* But, there was this other kid with them...',
            "<25>{#f/8}* He wasn't as friendly.",
            "<25>{#p/asgore1}{#f/1}* So it's him, then.\n* Just him...",
            '<25>{#p/kidd}{#f/4}* Huh?',
            '<25>{#p/asgore1}{#f/6}* Erm, never mind.\n* I should not trouble you with this.',
            '<25>{#f/3}* As for you, human...',
            '<25>{#f/2}* You and that "other kid" have done a lot of damage.',
            '<25>{#f/1}* Countless monsters are... well, you know.',
            '<25>{#p/kidd}{#f/4}* ...huh?',
            '<25>{#p/asgore1}{#f/7}* Nothing, nothing.\n* I just...',
            '<25>{#f/5}* I want to believe that there is more to you than... this.',
            '<25>{#f/5}* That, maybe somehow... Papyrus was right.',
            "<25>{#f/6}* If he's chosen to abandon you...",
            '<25>* Then this could be your chance to start anew.',
            "<25>{#p/kidd}{#f/1}* And I'll help them!",
            '<25>{#p/asgore1}{#f/6}* Heh, perhaps you can, little one.\n* Perhaps you can.',
            '<25>{#f/5}* Since we last met, I have been thinking very hard about everything.',
            '<25>{#f/2}* It is difficult to say it, but...\n* He is too far gone.',
            '<25>{#f/2}* My son... he will never be whole again.',
            "<25>{#p/kidd}{#f/4}* I'm just gonna let you guys talk about this...",
            '<25>{#p/asgore1}{#f/1}* No, no, that is alright. We were just about to end it.',
            '<25>{#f/1}* Think about my words carefully, human.',
            '<25>{#f/1}* That is all I ask.'
         ],
         asgoreMK2: [
            "<25>{#p/kidd}{#f/2}* Woah... he's AMAZING!",
            "<25>{#f/1}* I've heard stories about the king's speeches, but WOW!",
            '<25>{#f/3}* I wish he was MY dad...'
         ],
         asgoreFinal1: [
            '<25>{#p/asgore1}{#i/50}{#f/15}* So you still ended up with him in the end...',
            '<25>{#p/asriel2}{#f/7}* Them and I are inseperable, Asgore.\n* You should know that.',
            '<25>{#p/asgore1}{#i/50}{#f/15}* Oh, yeah, of course.\n* Um, w-what are you doing with that kid?',
            "<25>{#p/asriel2}{#f/7}* That's honestly none of your business.",
            '<25>{#p/asgore1}{#i/50}{#f/15}* (Ugh... shoulda seen that coming...)',
            '<25>{#p/asriel2}{#f/6}* But to summarize...\n* We\'re uh, going on a little "trip."',
            "<25>{#f/6}* Just the three of us.\n* And, well, YOU'RE not invited, Asgore.",
            '<25>{#p/asgore1}{#i/50}{#f/15}* D-do I look like I want to be invited??',
            '<25>{#p/asriel2}{#f/6}* Fair point.',
            '<25>{#p/asgore1}{#i/50}{#f/15}* Honestly, I just wanted to... check on you.',
            '<25>* And, now that I have d-done so, I... think that will be all.',
            "<25>{#p/asriel2}{#f/10}* You're stuttering...",
            '<25>{#p/asgore1}{#i/50}{#f/15}* Uh, g-gotta go!'
         ],
         asgoreFinal2: [ '<25>{#p/asriel2}{#f/10}* ???' ],
         asriel31: () =>
            [ [ '<25>{#p/asriel2}{#f/3}* What an innocent kid...' ], [ '<25>{#p/asriel2}{#f/4}* So innocent...' ] ][
               Math.min(save.flag.n.ga_asriel31++, 1)
            ],
         asriel32: () => [
            ...(save.flag.n.ga_asriel32++ < 1 ? [ '<25>{#p/asriel2}{#f/6}* Oh boy... here we go.' ] : []),
            '<25>{#p/asgore1}{#f/15}* ...',
            '<25>{#f/16}* I see you have ignored my advice.',
            '<25>{#p/asriel2}{#f/3}* Yup.',
            '<25>{#p/asgore1}{#f/1}* ...',
            '<25>{#f/16}* You know, I have been wondering.',
            '<25>{#f/16}* You may not claim to be my son now, but you were...',
            '<25>{#f/15}* Once upon a time.',
            '<25>{#p/asriel2}{#f/10}* And your point is?',
            '<25>{#p/asgore1}{#f/12}* Well...\n* What changed?',
            '<25>{#f/12}* What made you into this... stranger... standing here now?',
            '<26>{#p/asriel2}{#f/6}* You REALLY wanna know?',
            '<26>{#p/asgore1}{#f/1}* ...',
            '<26>{#p/asriel2}{#f/6}* Be honest.',
            '<26>{#p/asgore1}{#f/1}* ...\n* Well, no...\n* Not really...',
            "<26>{#p/asriel2}{#f/7}* Tch.\n* Now that's more like the Asgore I know.",
            "<26>{#f/4}* You'd rather pretend everything's juuuust fine, ain't that right?",
            "<26>{#f/3}* Well, guess what, pal.\n* You're overdue for a wakeup call.",
            "<26>{#f/8}* (I'd give ya one right now if you weren't a freakin' hologram...)",
            '<26>{#p/asgore1}{#f/12}* I heard that.',
            '<26>{#p/asriel2}{#f/4}* ...',
            '<26>{#p/asgore1}{#f/15}* You know... sometimes I wonder how I got here.',
            '<25>{#f/16}* No homeworld... no family... trapped here by the humans...',
            '<25>{#f/15}* And now, my kingdom is going to burn and all I can do is watch.',
            "<25>{#p/asriel2}{#f/3}* If you're asking ME for insight, you must be really desperate.",
            '<25>{#f/4}* Small word of advice...',
            "<25>{#f/1}* Next time, don't get your children killed.",
            '<25>{#p/asgore1}{#f/2}* ...',
            '<25>{#f/4}* Heh...\n* You say that as if...',
            '<25>{#f/2}* ...',
            '<25>{#f/6}* You know what, Asriel?\n* Forget it.',
            "<25>{#f/7}* Because you're right...",
            '<25>{#f/5}* Reasoning with you is a total waste of time.',
            "<25>{#p/asriel2}{#f/9}* ...wow.\n* I'm impressed.",
            '<25>{#f/1}* You finally said something intelligent for once.',
            '<25>{#p/asgore1}{#f/1}* ...',
            "<25>{#p/asriel2}{#f/10}* So, what now? What's next for the aspiring king?",
            '<25>{#p/asgore1}{#f/15}* To be honest?',
            '<25>{#f/15}* ...',
            '<25>{#f/16}* I have no idea, Asriel.'
         ],
         asriel33: () =>
            [ [ "<25>{#p/asriel2}{#f/10}* Well, he's mad." ], [ '<25>{#p/asriel2}{#f/10}* Heh.' ] ][
               Math.min(save.flag.n.ga_asriel33++, 1)
            ],
         asriel34x: [ '<25>{#p/asriel2}{#f/3}* Hey, stop here.' ],
         asriel35: () =>
            save.flag.n.undying > 0
               ? [
                    [
                       '<25>{#p/asriel2}{#f/6}* Well, here we are again, $(name).',
                       "<25>{#f/7}* ...I know Undyne won't die when the kid hits her.",
                       "<25>{#f/3}* But from what I can see, it's our best way forward for now.",
                       "<25>{#f/4}* So uh, let's stick to the script, okay?"
                    ],
                    [ '<25>{#p/asriel2}{#f/3}* Remember, stick to the script.' ]
                 ][Math.min(save.flag.n.ga_asrielUndying++, 1)]
               : [
                    [
                       '<25>{#p/asriel2}{#f/5}* Howdy, $(name)!',
                       '<25>{#f/2}* Did you miss me?',
                       "<25>{#f/1}* I see you've parted ways with your friend.",
                       '<25>{#f/13}* You must be so lonely...',
                       "<25>{#f/4}* Well.\n* Don't you worry.",
                       '<25>{#f/3}* I think I may just have the solution.'
                    ],
                    [ "<25>{#p/asriel2}{#f/6}* I've returned, $(name).", "<25>{#f/7}* ...let's not waste any more time." ]
                 ][Math.min(save.flag.n.ga_asriel35++, 1)],
         asriel36: [ '<25>{#p/asriel2}{#f/5}* Yoo-hoo!' ],
         asriel37: () => [
            '<25>{#p/asriel2}{#f/3}* Aw...',
            "<25>{#f/1}* You'd do anything for me, wouldn't ya?",
            '<25>{#p/kidd}{#f/9}* M-hm...'
         ],
         asriel38: () => [
            ...[
               [
                  // Let's go catch a fish.
                  '<25>{#p/asriel2}{#f/3}* Well, whaddaya think?',
                  "<25>{#f/4}* They weren't easy to get a hold of, you know.",
                  ...(save.data.n.state_foundry_muffet === 1
                     ? [
                          '<25>{#f/8}* They kept saying they wanted to be forgotten...',
                          '<25>{#f/10}* Geez, $(name).\n* What did you do to them while I was gone?'
                       ]
                     : [
                          "<25>{#f/8}* They wouldn't stop asking me where you were...",
                          '<25>{#f/10}* Geez, $(name).\n* What were you two doing while I was gone?'
                       ]),
                  "<25>{#f/3}* Well y'know, just uh...\n* Think of it as a gift.\n* For being so helpful.",
                  '<25>{#p/kidd}{#f/12}* Helpful...?',
                  '<25>{#p/asriel2}{#f/8}* ...'
               ],
               [ "<25>{#p/asriel2}{#f/3}* Well, at least that's outta the way now." ]
            ][Math.min(save.flag.n.ga_asriel38++, 1)]
         ],
         asriel39: [
            '<25>{#p/asriel2}{#f/6}* Hey, kid...\n* Can you do me a favor?',
            '<25>{#p/kidd}{#f/9}* ...?',
            '<25>{#p/asriel2}{#f/6}* Solve the puzzle.'
         ],
         asriel40: () =>
            save.flag.n.ga_asriel40++ < 1
               ? [
                    '<25>{#p/asriel2}{#f/10}* Done already?',
                    '<25>{#f/9}* ...',
                    '<25>{#f/3}* See $(name), this is the potential monsters deny themselves.',
                    '<25>{#f/4}* Hope, fear, empathy...\n* They cling to these pointless emotions.',
                    '<25>{#f/3}* Under MY guidance, their mind has been unlocked. Untethered.',
                    "<25>{#f/13}* Shame more monsters don't have implants..."
                 ]
               : [ '<25>{#p/asriel2}{#f/1}* Right on time.' ],
         asriel41: [ '<25>{#p/asriel2}{#f/3}* Perfect.' ],
         asriel42: [ "<25>{#p/asriel2}{#f/1}* If we keep this up, we'll be over and done with in no time." ],
         asriel43: () =>
            [
               [
                  "<25>{#p/asriel2}{#f/16}* It's over, $(name)...",
                  "<25>{#f/3}* We've done it.",
                  '<25>{#f/2}* That IDIOT captain...',
                  '<25>{#f/15}* Did she REALLY think she stood a chance?',
                  save.flag.n.undying > 2
                     ? '<25>{#f/8}* Granted, it took us a few runs...'
                     : save.flag.n.undying > 1
                     ? '<25>{#f/8}* Granted, it took us an extra run...'
                     : '<25>{#f/8}* Granted, she did put up a valiant stand...',
                  '<25>{#f/6}* But in the end, we both knew what was destined to happen.',
                  '<25>{#f/1}* And now, finally...\n* It has.'
               ],
               [
                  '<25>{#p/asriel2}{#f/3}* Man, if only that victory felt as good as it did the first time.',
                  '<25>{#f/2}* Oh well.'
               ],
               [ '<25>{#p/asriel2}{#f/6}* Killing Undyne is quickly becoming our hobby.' ],
               [ '<25>{#p/asriel2}{#f/6}* ...' ]
            ][Math.min(save.flag.n.ga_asriel43++, 3)],
         asriel44: [ '<25>{#p/asriel2}{#f/13}* Uh, you can take the lead, $(name).' ],
         asriel45: [
            '<25>{#p/asriel2}{#f/13}* Oh, $(name)...{%40}',
            "<25>{#f/13}* I can't express how grateful I am for all your help.{%40}",
            "<25>{#f/4}* This body might not be perfect, but for what it's worth...?{%40}",
            "<25>{#f/3}* I won't miss being a stupid talking starling.{%40}"
         ],
         asrielElite1: () =>
            [
               [
                  '<25>{#p/asriel2}{#f/3}* Pfft, "ELITE" squad?\n* More like DEFEAT squad.',
                  '<25>{#f/1}* They do seem to be pretty good at dying...'
               ],
               []
            ][Math.min(save.flag.n.ga_asrielElite1++, 1)],
         asrielHug1: [ '<25>{#p/asriel2}{#f/13}* ...' ],
         asrielHug2: [ '<25>{*}{#p/asriel2}{#f/13}* $(name)...{^100}{%}' ],
         asrielHug3: [ '<25>{#p/asriel2}{#f/13}* Uh...\n* Thanks, $(name).' ],
         // rule 34!!!!!!!!!!!!!!!!!!!!!!!!!!1
         asriel34: [
            "<25>{#p/asriel2}{#f/3}* I've gotta take care of some things, so I'll leave you two alone.",
            '<25>{#p/kidd}{#f/3}* Will you be back?\n* You gotta tell me more about Undyne...',
            "<25>{#p/asriel2}{#f/1}* I promised, didn't I?",
            "<25>{#f/2}* Don't worry.\n* I'll be back before you know it.",
            '<25>{#p/kidd}{#f/4}* Okay...'
         ],
         kidd1: [
            '<25>{#p/kidd}{#f/4}* What did he say your name was?\n* $(name)...?',
            '<25>{#f/3}* Well $(name), just between you and me, he kinda makes me feel...',
            '<25>{#f/4}* Uncomfortable.'
         ],
         kidd2: [
            '<25>{#p/kidd}{#f/11}* ...!',
            '<25>{#p/asriel2}{#f/4}* I saw her too.',
            '<25>{#f/1}* You excited?',
            '<25>{#p/kidd}{#f/9}* I...\n* Guess so...',
            '<25>{#p/asriel2}{#f/8}* Yeah, yeah...'
         ],
         kiddFinal1: () => [
            '<25>{#p/kidd}{#f/9}* Um...',
            '<25>{#p/asriel2}{#f/10}* ...?',
            '<25>{#f/6}* ...let me guess.\n* Doubts?',
            '<25>{#p/kidd}{#f/12}* .........',
            "<25>{#p/asriel2}{#f/4}* Listen, kid.\n* Your precious Undyne?\n* She's no hero.",
            '<25>{#f/3}* The REAL heroes in this world are people that can THINK.',
            save.flag.n.ga_asrielKiddFinal1++ < 1
               ? '<25>{#f/1}* People like...\n* Well, not like her.'
               : '<25>{#f/1}* People unlike her.',
            '<25>{#p/kidd}{#f/9}* ...',
            '<25>* ...you say that...'
         ],
         kiddFinal2: [
            '<25>{#p/asriel2}{#f/1}* Doubts or not, I KNOW you can do it.',
            '<25>{#p/kidd}{#f/9}* ...',
            '<25>{#p/asriel2}{#f/1}* You wanted to get stronger, right?\n* Well, this is how.',
            "<25>{#p/kidd}{#f/12}* B-but...\n* It's Undyne...",
            "<25>{#p/asriel2}{#f/13}* Undyne, schmundyne...\n* You really look up to her, don'tcha?",
            "<25>{#f/6}* Don't worry.\n* You'll find another role model.",
            '<25>{#p/kidd}{#f/9}* I...',
            '<25>{#f/9}* I h-hope so...'
         ],
         kiddFinal3: () => [
            '<25>{#p/kidd}{#f/9}* ...',
            "<25>{#f/10}* Undyne won't die.",
            '<25>* Even if I do this, she...',
            "<25>* She'll be fine.\n* She'll be strong...",
            ...(save.flag.n.ga_asrielKiddFinal3a < 1
               ? [ '<25>{#p/asriel2}{#f/8}* (Yeah, whatever makes you feel better...)' ]
               : []),
            "<25>{#p/kidd}{#f/9}* 'Cause like...\n* She's... stronger than any other monster...",
            "<25>{#f/10}* She's {@fill:#ff0}determined{@fill:#fff}...",
            ...(save.flag.n.ga_asrielKiddFinal3a++ < 1
               ? [ '<25>{#p/asriel2}{#f/10}* Uh... okay?\n* (Golly, what is this kid on about?)' ]
               : save.flag.n.undying > 0 && save.flag.n.ga_asrielKiddFinal3b++ < 1
               ? [ '<25>{#p/asriel2}{#f/8}* (How did they KNOW?)' ]
               : [ '<25>{#p/asriel2}{#f/10}* ...' ])
         ],
         kiddFinal4: [ '<32>{#p/asriel2}{#f/6}* There she is.' ],
         kiddFinal5: [ '<32>{#f/6}* Now.', '<32>{#f/7}* ...' ],
         kiddFinal6: [ '<32>{*}{#p/asriel2}{#f/14}* Do it.{%100}' ],
         kiddFinal7: [
            '<25>{#p/kidd}{#f/12}* ...',
            '<25>{#p/undyne}{#f/13}* What the HELL?\n* What are you doing all the way out here!?',
            '<25>{#f/13}* And why does your eye look like- {%}'
         ],
         bombshell1: [
            '<32>{*}{#p/alphys}* Talking... starling...?',
            '<32>{*}* But that experiment...\n* It f-failed...',
            '<32>{*}* Unless...'
         ],
         bombshell2: [ '<32>{*}* No...', '<32>{*}{@random:1.1,1.1}* No...' ],
         bombshell3: [
            '<32>{*}{@random:1.1,1.1}* Toriel...\n* Sans...\n* Papyrus...',
            '<32>{*}{@random:1.1,1.1}* Undyne...',
            "<32>{*}{@random:1.1,1.1}* It's all m-my fault...",
            '<32>{*}{@random:1.1,1.1}{#i/60}* Oh... g-god...'
         ],
         bombshell4: [ "<32>{*}{@random:1.1,1.1}{#i/80}* I've killed you all..." ]
      },
      kiddbridge1: [ '<25>{#p/kidd}{#f/1}* Yo!' ],
      kiddbridge2: [
         "<25>{#p/kidd}{#f/1}* I know I'm not meant to be here, but I wanted to ask you...",
         "<25>{#f/4}* Man, I've never had to ask anyone this before...",
         '<25>{#f/3}* Umm...',
         '<25>{#f/4}* Well, Undyne told me to "stay away from that human."',
         '<25>{#f/4}* So, like, umm... I guess that makes us enemies now?',
         '<25>{#f/2}* But I kinda stink at that, haha.',
         '<25>{#f/1}* Yo, say something mean so we can be enemies?',
         '<25>{#f/1}* Please?',
         choicer.create('* (What do you say?)', 8, 7, 'No', 'Yes')
      ],
      kiddbridge3a: () =>
         save.data.b.oops
            ? [
                 '<25>{#p/kidd}{#f/4}* Yo, what?\n* So I have to do it?',
                 '<25>{#f/5}* Here goes nothing...',
                 '<25>{#f/4}* Y... yo...\n* I...',
                 "<25>{#f/1}* I think you're UGLY.",
                 '<25>{#f/1}* ...',
                 "<25>{#f/4}* Man, I... I'm such a turd.",
                 "<25>{#f/5}* I'm... gonna go home now."
              ]
            : [
                 '<25>{#p/kidd}{#f/4}* Yo, what?\n* So I have to do it?',
                 '<25>{#f/5}* Here goes- {%}',
                 "<32>{#p/narrator}* No.\n* You don't have to do it.",
                 '<25>{#p/kidding}{#f/7}* (What?)\n* (What was that?)',
                 '<32>{#p/narrator}* Listen to me.',
                 '<25>{#p/kidding}{#f/7}* (W... who are you!?)',
                 '<32>{#p/narrator}* Someone who wants to do the right thing, for once.',
                 '<25>{#p/kidding}{#f/7}* (But... Undyne said- {%}',
                 "<32>{#p/narrator}* Undyne doesn't know this human like you, think about it!",
                 '<25>{#p/kidding}{#f/4}* (...)\n* (...I guess...)',
                 "<32>{#p/narrator}* Everyone's different.\n* Humans have a past, but THEY'RE not part of it.",
                 '<32>* So instead of being mean...',
                 '<32>* You could be kind.',
                 '<32>* Instead of making it worse...',
                 '<25>{#p/kidding}{#f/3}* (I could make it better?)',
                 "<32>{#p/narrator}* Heh.\n* That's the spirit.",
                 '<25>{#p/kidding}{#f/3}* (Okay...)',
                 '<25>* (Well, here goes nothing.)',
                 '<25>{#p/kidd}{#f/3}* Yo, um...',
                 "<25>* I don't wanna be mean.",
                 '<25>{#f/1}* I actually think that...',
                 "<25>* You're one of the coolest people I've ever met!",
                 "<25>{#f/4}* Undyne says all humans are bad, but she doesn't know you...",
                 "<25>{#f/3}* Just because you're a human...",
                 "<25>* ...doesn't mean we need to be enemies... right?",
                 "<25>{#f/1}* So... I'm glad we could be friends!\n* T... take that, Undyne!",
                 '<25>* Haha.',
                 '<25>{#f/3}* Well, I kinda gotta go home now...',
                 "<25>* ...but maybe we'll see each other again?",
                 '<25>* So...\n* Until next time...',
                 '<25>{#f/1}* See ya, dude!'
              ],
      kiddbridge3b: [
         '<32>{#p/human}* (You said something mean to Monster Kid.)',
         '<25>{#p/kidd}{#f/4}* Huh...?',
         "<25>{#f/3}* Yo, THAT's your idea of something mean?",
         '<25>{#f/2}* My friends say that to me ALL THE TIME!',
         '<25>{#f/1}* Guess I have to do it, haha.',
         '<25>{#f/3}* Y... yo...\n* I...',
         "<25>{#f/3}* I think you're UGLY.",
         '<25>{#f/3}* ...',
         "<25>{#f/4}* Man, I... I'm such a turd.",
         "<25>{#f/5}* I'm... gonna go home now."
      ],
      kiddbridge4: [ '<25>{#p/kidding}{#f/7}* Yo, w-w-wait!\n* Help! I tripped on a grav-switch!' ],
      kiddbridge4a: [ '<25>{#p/kidding}{#f/7}* Wh-what are you standing around for?\n* Get over here, dude!{%20}' ],
      kiddbridge4b: [ "<25>{#p/kidding}{#f/7}{*}* I...\n* I can't hold on!{^20}{%}" ],
      kiddbridge5: [
         '<25>{#p/kidd}{#f/4}* Y... y... yo... dude...',
         '<25>* If...\n* If y-you wanna hurt them...',
         "<25>* You're gonna have to get through me, first."
      ],
      kiddbridge6: [
         "<25>{#p/kidd}{#f/3}* She's gone...",
         '<25>{#f/1}* Yo, you really saved my skin.',
         '<25>{#f/6}* Guess being enemies was just a thought, haha.',
         "<25>{#f/1}* We'll just have to be friends instead!",
         '<25>{#f/2}* ...man, I should REALLY go home...',
         '<25>{#f/1}* I...\n* I bet my parents are worried sick about me!'
      ],
      kiddbridge7: [ '<25>{#p/kidd}{#f/1}* Later, dude!' ],
      kiddbridge8: [
         '<32>{#p/kidd}* Undyne...\n* You....\n* You saved me!',
         '<32>* Huh?\n* They ran away?',
         "<32>* Yo, you're wrong...",
         '<32>* They went to get help!',
         "<32>* They'll be back any second!!",
         '<32>* ...',
         "<32>* O-okay, I'll go home..."
      ],
      kiddbridgeX: (charged: boolean) => [
         '<32>{#p/kidd}* Undyne...',
         '<32>* You saved me...?',
         '<32>* Yo... I...\n* I thought I was a goner.\n* Haha...',
         '<32>* ...wait, are you okay?\n* It looks like you hit the ceiling pretty hard...',
         '<32>* Th-this is my fault.\n* I should have stayed away from them, like you said.',
         charged
            ? '<32>* They just went straight to fight you instead of helping me...'
            : '<32>* They just stood there...\n* Watching...\n* Waiting for me to disappear.',
         '<32>* I was so scared, and you...',
         "<32>* What?\n* You're gonna go fight them now?",
         '<32>* But you look hurt...\n* You should rest, haha...',
         '<32>* ...',
         "<32>* W-warriors don't rest, huh?",
         "<32>* Undyne...\n* You're really cool."
      ],
      kiddStatue: [
         '<25>{#p/kidd}{#f/1}* Yo, I remember this place!',
         '<25>{#f/3}* My, uh, Mom took me here one time, haha.',
         "<25>{#f/1}* If we both stand on a switch, it lights up.\n* Isn't that awesome!?"
      ],
      madfish1: () => [
         ...(save.flag.n.ga_asrielUndyneX++ < 1 ? [ '<25>{#p/asriel2}{#f/8}* Over-dramatic speech incomi- {%}' ] : []),
         '<32>{#p/undyne}* You.',
         '<32>* Y{#x1}ou think you can just waltz around, MURDERING all those innocent monsters?',
         '<32>* Well guess what, punks.',
         '<32>* That ends NOW.',
         '<32>* You may have gotten p{#x2}ast those lousy guards in Starton, but let me tell you...',
         "<32>* O{#x3}nce my ELITE squad nails you, you're in for a world of hurt."
      ],
      madfish2: [
         '<32>* Nothing to say?\n* Feh.',
         "<32>* I d{#x4}on't have time to deal with you right now, Alphys needs my help evacuating people.",
         "<32>* Fuhuhu...\n* H{#x5}ave fun trying to progress.\n* You won't get far."
      ],
      muffet1: () =>
         world.genocide
            ? [ '<32>{#p/monster}* Ahuhuhuhu...', '<32>* Tell her she should increase my payout next time.' ]
            : [ '<32>{#p/monster}* Ahuhuhuhu...', '<32>* That was fun!\n* See you again, dearies!' ],
      muffet2: () =>
         world.genocide
            ? [ "<25>{#p/kidd}{#f/4}* Yo... she's weird." ]
            : [ '<25>{#p/kidd}{#f/4}* Yo... that was not fun at ALL.' ],
      muffetGeno1: () =>
         save.data.n.state_foundry_kidddeath < 1
            ? [ '<25>{#p/kidd}{#f/4}* Yo...\n* What just happened?', '<25>* Did she... {%}' ]
            : [
                 '<25>{#p/kidd}{#f/4}* Yo... did she just...',
                 '<25>* How come monsters keep disappearing like that? {%}'
              ],
      muffetGeno1x: [ "<32>{#p/monster}* She's dead, {#x1}kid." ],
      muffetGeno2: [
         "<25>{#p/kidd}{#f/7}* N-no...\n* I didn't mean...",
         "<25>{#f/7}* S-she's not... no...\n* She was...",
         "<25>{#f/4}* No, it...\n* It c-can't be...",
         '<25>{#f/4}* She was just...',
         '<25>{#f/8}* Just...'
      ],
      muffetGeno3: [ '<25>{#f/8}* ...', '<25>{#f/8}* ...what have I done...' ],
      mushroomdance1: [ '<32>{#p/monster}* Mushroom dance\n* Mushroom dance\n* Whatever could it mean' ],
      mushroomdance2: () =>
         world.trueKills > 9 || world.population === 0
            ? save.data.b.f_state_mushroomdanceGeno
               ? [ "<32>{#p/monster}* It means... don't talk to me." ]
               : [
                    "<32>{#p/monster}* It means you've lived a life of sin.",
                    ...(save.data.b.f_state_mushroomdance ? [ "<32>* Wait.\n* Weren't you nicer before?" ] : [])
                 ]
            : save.data.b.f_state_mushroomdance
            ? [
                 '<32>{#p/monster}* If only I could see the world beyond.',
                 '<32>* But even if the force field was destroyed, how would I leave...?',
                 ...(save.data.b.oops ? [] : [ '<32>* Even you might not be able to help me...' ])
              ]
            : [
                 '<32>{#p/monster}* It symbolizes my inner torment, trapped here by my hyphae.',
                 '<32>* My struggle to pull away.\n* My struggle to escape.\n* But alas, to no avail.'
              ],
      musicbox: [
         '<18>{#p/asriel1}{#i/60}It sounds like it came from over here...',
         "<18>Oh! You've fallen down, haven't you...",
         '<18>Are you okay?',
         '<18>Here, get up...',
         '<18>...',
         '<18>$(name), huh?',
         "<18>That's a nice name.",
         '<18>{*}{#x1}{#p/asriel3}{#i/300}My name is       {%}'
      ],
      npcinter: {
         f_shortsy: pager.create(
            'limit',
            () =>
               save.data.n.plot < 48
                  ? [
                       '<32>{#p/monster}{#npc/a}* My buddy Longsy and I want to build a new bridge to impress the king.',
                       "<32>* It'll be the straightest, most sturdy bridge you've ever seen.",
                       "<32>* I'll make sure of it!"
                    ]
                  : [
                       '<32>{#p/monster}{#npc/a}* Take a look at our newest bridge.',
                       '<32>* Longsy and I figure this will be enough to impress the king...',
                       "<32>* It needs to be if we're going to work alongside him!"
                    ],
            () =>
               save.data.n.plot < 48
                  ? [ "<32>{#p/monster}{#npc/a}* I'm set on doing nothing less than the best.\n* That's just how I am." ]
                  : [
                       "<32>{#p/monster}{#npc/a}* No need to thank us, it's only a community service.\n* That's just what I do."
                    ]
         ),
         f_longsy: pager.create(
            'limit',
            () =>
               save.data.n.plot < 48
                  ? [
                       '<32>{#p/monster}{#npc/a}* My friend Shortsy and I plan to build a bridge.',
                       "<32>* He's got his reasons, but personally, I'm just tired of using that unstable raft.",
                       "<32>* Let's hope we can do something a little better than that."
                    ]
                  : [
                       "<32>{#p/monster}{#npc/a}* How'd you like our bridge?\n* Was it stable?\n* Was it gravitationally secure?",
                       "<32>* Well, Shortsy said it's fine, and they're kinda the expert here.",
                       "<32>* I'm mostly just here to carry around the tools!"
                    ],
            () =>
               save.data.n.plot < 48
                  ? [ "<32>{#p/monster}{#npc/a}* Instability and I don't get along very well.\n* That's just how I am." ]
                  : [
                       "<32>{#p/monster}{#npc/a}* Don't get it twisted.\n* I'm a fantastic tool-toter.\n* That's just what I do."
                    ]
         ),
         f_echoLobby: [
            '<32>{#p/story}{#npc/a}* Recursion matrix... active.',
            '<32>* Power output... 6.2 trillion yottajoules.',
            '<32>* Counter-indications negligent.',
            '<32>* The framework is in place.',
            '<32>{#s/echostop}{#p/event}{#npc}* Signal end.'
         ],
         f_echo1: () =>
            world.genocide
               ? [
                    '<32>{#p/monster}{#npc/a}* ...',
                    '<32>{#p/alphys}* Undyne... you have to l-l-listen to me... Sans is already...',
                    '<32>{#p/monster}* ...',
                    '<32>{#p/alphys}* But if you try to... if you...',
                    '<32>{#p/monster}* ...',
                    '<32>{#p/alphys}* N-no!\n* Undyne, wait!\n* P-PLEASE- {%}',
                    '<32>{#s/echostop}{#p/event}{#npc}* Signal end.'
                 ]
               : [
                    '<32>{#p/monster}{#npc/a}* Skrubby of foundry crew.\n* Need u to check pipe for leak.',
                    "<32>{#p/alphys}* Oh- uhm... s-sorry, ah!\n* I'm a little busy at the moment!",
                    '<32>{#p/monster}* Okie.\n* I ask Raddy instead.\n* Thx for nothing.',
                    "<32>{#p/alphys}* Y-you're welcome??",
                    '<32>{#s/echostop}{#p/event}{#npc}* Signal end.'
                 ],
         f_echo2: () =>
            world.genocide
               ? [
                    '<32>{#p/asgore1}{#npc/a}* This is the king.',
                    '<32>* All citizens should evacuate to the Citadel at once.',
                    '<32>* You must not engage with the human or their monster companion.',
                    '<32>{#s/echostop}{#p/event}{#npc}* Signal end.',
                    ...(world.goatbro && save.flag.n.ga_asrielEcho1++ < 1
                       ? [ '<25>{#p/asriel2}{#f/8}* Spreading your cowardice to everyone else, I see.' ]
                       : [])
                 ]
               : [
                    '<32>{#p/asgore1}{#npc/a}* This is the king.',
                    '<32>* Nice day today, huh?',
                    '<32>* Stars are shining, auroras are blazing...',
                    '<32>* Perfect conditions for a night out with the telescope.',
                    '<32>{#s/echostop}{#p/event}{#npc}* Signal end.'
                 ],
         f_echo3: () =>
            world.genocide
               ? [
                    '<32>{#p/monster}{#npc/a}* This is pointless.',
                    '<32>* Why do we have to evacuate?',
                    "<32>* ...who said you have to evacuate just because the king's kid went rogue?",
                    '<32>{#s/echostop}{#p/event}{#npc}* Signal end.',
                    ...(save.flag.n.ga_asrielEcho2++ < 1
                       ? [ "<25>{#p/asriel2}{#f/7}* Rogue?\n* Nah, I'm just doing what needs to be done." ]
                       : [])
                 ]
               : [
                    '<32>{#p/monster}{#npc/a}* This is pointless.',
                    "<32>* It's always the same stars and the same auroras.",
                    "<32>* ...don't be so down, Buegie.\n* There's plenty to see.",
                    '<32>{#s/echostop}{#p/event}{#npc}* Signal end.'
                 ],
         f_echo4: () =>
            world.genocide
               ? [
                    "<32>{#p/monster}{#npc/a}* The king's son...?\n* Asriel...?\n* But he's...",
                    "<32>* ...I know, I know.\n* I'd be just as confused as you if I were in your place.",
                    '<32>* Huh...',
                    '<32>{#s/echostop}{#p/event}{#npc}* Signal end.'
                 ]
               : [
                    "<32>{#p/monster}{#npc/a}* What direction?\n* I've seen them all.",
                    "<32>* ...it's not about seeing new things, it's about appreciating what you have.",
                    '<32>* Ugh...',
                    '<32>{#s/echostop}{#p/event}{#npc}* Signal end.'
                 ],
         f_echo5: () =>
            world.genocide
               ? [
                    "<32>{#p/monster}{#npc/a}* Maybe he's a demon of some kind, an impostor.",
                    "<32>* Wa ha ha!\n* ...that's ridiculous.",
                    "<32>* But if he's not a demon or an impostor, then what...?",
                    '<32>* ...you know, Burgie, some theories are better left untested.',
                    '<32>{#s/echostop}{#p/event}{#npc}* Signal end.',
                    ...(save.flag.n.ga_asrielEcho4++ < 1
                       ? [
                            "<25>{#p/asriel2}{#f/4}* It's like they always say, $(name)...",
                            '<25>{#f/3}* Truth is a masterpiece in your dreams.'
                         ]
                       : [])
                 ]
               : [
                    "<32>{#p/monster}{#npc/a}* ...look, when you're as old as me, you come to realize something.",
                    '<32>* ...for all the wonderful things we can observe out there...',
                    "<32>* ...we're never gonna reach 'em.",
                    '<32>* ...you might as well enjoy what you can observe, right?',
                    '<32>* I guess...',
                    '<32>{#s/echostop}{#p/event}{#npc}* Signal end.'
                 ],
         f_echo6: () =>
            world.genocide
               ? [
                    "<32>{#p/monster}{#npc/a}* I'm scared...\n* I don't want to die...",
                    "<32>* ...you're a shopkeeper, Burgie. Even a genocidal maniac wouldn't go after ya.",
                    "<32>* Are you serious!?\n* I'm out in the open here!",
                    "<32>* ...eh, it's a little somethin' I picked up on during the war.\n* You're safe, trust me.",
                    '<32>{#s/echostop}{#p/event}{#npc}* Signal end.'
                 ]
               : [
                    '<32>{#p/monster}{#npc/a}* You know, about what you said earlier...',
                    "<32>* About how we're never gonna reach the stars...",
                    '<32>* Well, I heard the royal scientist mention a human earlier.',
                    '<32>* ...oh, did you now?',
                    '<32>* She told me herself, old buddy.',
                    '<32>{#s/echostop}{#p/event}{#npc}* Signal end.'
                 ],
         f_echo7: () =>
            world.genocide
               ? [
                    "<32>{#p/monster}{#npc/a}* I hope you're right...",
                    "<32>* 'Cause if I die, then who's gonna put a stop to...",
                    "<32>* ...wait, can't talk about that, it's classified.",
                    "<32>* Burgie...?\n* You tryina tell me you're some kinda secret agent?",
                    '<32>{#s/echostop}{#p/event}{#npc}* Signal end.'
                 ]
               : [
                    '<32>{#p/monster}{#npc/a}* ...you know, I could believe it.',
                    '<32>* ...especially considering I saw a human just a little while ago.',
                    "<32>* So it's true, then.\n* Freedom is coming...",
                    '<32>* ...one would presume so.',
                    '<32>{#s/echostop}{#p/event}{#npc}* Signal end.'
                 ],
         f_echo8: () =>
            world.genocide
               ? [
                    "<32>{#p/monster}{#npc/a}* Pfft, me?\n* A secret agent?\n* You're outta your mind!",
                    "<32>* I'm too busy with my food business, you know that.",
                    "<32>* ...I've seen someone who looks a lot like you sneak out at times...",
                    "<32>* ...and when I followed 'em... I saw 'em enter Glyde's place.",
                    '<32>{#s/echostop}{#p/event}{#npc}* Signal end.'
                 ]
               : [
                    "<32>{#p/monster}{#npc/a}* We're all counting on Asgore now, I guess...",
                    "<32>* But hey, he'll do what has to be done, right?",
                    '<32>* ...if it comes to it.',
                    "<32>* And what's the alternative?\n* Let 'em go?",
                    '<32>* ...I dunno, Burgie.\n* I wish I had all the answers.',
                    '<32>{#s/echostop}{#p/event}{#npc}* Signal end.'
                 ],
         f_echo9: () =>
            world.genocide
               ? [
                    "<32>{#p/monster}{#npc/a}* Sounds shady.\n* But it's definitely not me, I know that for a fact.",
                    '<32>* Wa ha ha!\n* ...if you say so.',
                    '<32>* * You know, I... heh...\n* Thanks, old buddy.',
                    '<32>* ...what for?',
                    "<32>* For a moment, I'd forgotten about all the crap going down today.",
                    "<32>* I'll take all the moments like that I can get.",
                    '<32>{#s/echostop}{#p/event}{#npc}* Signal end.'
                 ]
               : [
                    '<32>{#p/monster}{#npc/a}* Maybe you and I can hang out together after we get out, huh?',
                    "<32>* ...I wouldn't be against it.",
                    '<32>* Heh...',
                    "You're on, old buddy.",
                    '<32>{#s/echostop}{#p/event}{#npc}* Signal end.'
                 ],
         f_echoAbyss1: () =>
            world.genocide
               ? [
                    '<32>{#s/phone}{#p/event}{#npc/a}* Ring, ring...',
                    '<32>{#p/mettaton}* YES, DEAR?',
                    "<32>{#p/alphys}* M... Mettaton... s-something's happening... something bad...",
                    '<32>{#p/mettaton}* WHAT IS IT?\n* TALK TO ME, ALPHYS.',
                    '<32>{#s/echostop}{#p/event}{#npc}* Signal end.'
                 ]
               : [
                    '<32>{#s/phone}{#p/event}{#npc/a}* Ring, ring...',
                    '<32>{#p/mettaton}* YES, DEAR?',
                    "<32>{#p/alphys}* Mettaton... I've been picking up these weird signals...",
                    '<32>{#p/mettaton}* WHAT KIND OF SIGNALS?',
                    "<32>{#p/alphys}* They're like... uhh, r-radio signals!",
                    '<32>* Old Earth radio signals.',
                    '<32>{#s/echostop}{#p/event}{#npc}* Signal end.'
                 ],
         f_echoAbyss2: () =>
            world.genocide
               ? [
                    '<32>{#p/alphys}{#npc/a}* S-see that bridge?\n* The one to the Outlands?',
                    '<32>* A human and a monster just came out of there and...\n* Sans is d... d-dead...',
                    '<32>{#p/mettaton}* ...!',
                    '<32>{#p/alphys}* Monsters are dropping l-like frog-flies...',
                    "<32>{#p/mettaton}* OH MY... \n* I'LL HAVE TO INFORM THE KING RIGHT AWAY.",
                    '<32>{#p/alphys}* N-no, um...!',
                    '<32>{#s/echostop}{#p/event}{#npc}* Signal end.',
                    ...(world.epicgamer && !save.data.b.f_state_dc_kidd2
                       ? ((save.data.b.f_state_dc_kidd2 = true),
                         [
                            "<25>{#p/kidd}{#f/3}* Human and monster?\n* That wasn't you guys... right?",
                            '<25>* Uh... haha...'
                         ])
                       : [])
                 ]
               : [
                    '<32>{#p/mettaton}{#npc/a}* MY MY, THAT IS QUITE THE DISCOVERY, ALPHYS.',
                    '<32>* WHAT DO YOU PLAN TO DO WITH THEM?',
                    '<32>{#p/alphys}* W-well... I was thinking...',
                    "<32>* I could broadcast them on air?\n* It'd make a fun TV segment, d-don't you think?",
                    "<32>{#p/mettaton}* OH YES, THAT'S A BRILLIANT IDEA, DOCTOR!",
                    '<32>* PLAY THEM BACK RIGHT AWAY!',
                    '<32>{#s/echostop}{#p/event}{#npc}* Signal end.'
                 ],
         f_echoAbyss3: () =>
            world.genocide
               ? [
                    "<32>{#p/mettaton}{#npc/a}* ALPHYS, WE CAN'T AFFORD TO HESITATE.\n* WHY THE HOLDUP?",
                    "<32>{#p/alphys}* M-Mettaton...\n* You don't understand...",
                    "<32>* The boss monster... he's...",
                    '<32>* U-um...',
                    '<32>{#p/mettaton}* YES, ALPHYS?',
                    '<32>{#s/echostop}{#p/event}{#npc}* Signal end.'
                 ]
               : [
                    '<32>{#p/radio}{#npc/a}* Helloooooo everyone!\n* You are listening to The Midnight Rush!',
                    '<32>{#v/1}* Well Al, not much went down today, barring a few traffic accidents...',
                    '<32>{#v/0}* Not much went down?\n* You kidding?',
                    '<32>{#v/0}* Aliens from the neighboring planet have arrived for crying out loud.',
                    '<32>{#s/echostop}{#p/event}{#npc}* Signal end.',
                    ...(world.epicgamer && !save.data.b.f_state_dc_kidd3
                       ? ((save.data.b.f_state_dc_kidd3 = true),
                         [
                            '<25>{#p/kidd}{#f/7}* Neighboring planet?\n* Could that mean...',
                            '<25>{#f/2}* No... n-no way.'
                         ])
                       : [])
                 ],
         f_echoAbyss4: () =>
            world.genocide
               ? [
                    '<32>{#p/alphys}{#npc/a}* Just... look at the tape.',
                    '<32>{#p/mettaton}* ...',
                    '<32>* HMM...',
                    '<32>* IS THAT- {%}',
                    '<32>{#p/alphys}* Yes.',
                    '<32>* ...',
                    '<32>{#p/mettaton}* ...OH MY.',
                    '<32>{#s/echostop}{#p/event}{#npc}* Signal end.'
                 ]
               : [
                    "<32>{#p/radio}{#v/1}{#npc/a}* You're kidding, right?\n* Their last transmission to us indicated that- {%}",
                    "<32>{#v/0}* That was two weeks ago!\n* They're here, Al.\n* They're really here.",
                    "<32>{#v/1}* ...so what do we do?\n* Surely we're not just going to let 'em destroy us, right?",
                    "<32>{#v/0}* Man, you've got a crazy imagination my friend.",
                    '<32>{#v/1}* But still...',
                    '<32>{#s/echostop}{#p/event}{#npc}* Signal end.'
                 ],
         f_echoAbyss5: () =>
            world.genocide
               ? [
                    '<32>{#p/alphys}{#npc/a}* W-we could call Undyne, o-o-or maybe...',
                    '<32>* Maybe...',
                    "<32>{#p/mettaton}* ARE YOU THINKING WHAT I'M THINKING, DEAR?",
                    '<32>{#p/alphys}* The liftgates.',
                    "<32>{#p/mettaton}* YES... YES!\n* THAT'S A BRILLIANT IDEA, DR. ALPHYS! BRILLIANT!",
                    '<32>{#s/echostop}{#p/event}{#npc}* Signal end.'
                 ]
               : [
                    "<32>{#p/radio}{#npc/a}* People, let's all just caaaalm down, okay?",
                    '<32>* Personally, I think these aliens could be great allies.\n* Just look at their tech.',
                    "<32>{#v/1}* Yeah, yeah...\n* Well, if we're gonna be all lovey-dovey with E.T. here...",
                    '<32>{#v/1}* Then we\'re gonna need a better plan than just walking up and saying "Howdy."',
                    "<32>{#v/0}* Oh yeah, isn't that how Erogot says Hello?",
                    "<32>{#v/1}* I get the feeling he's REALLY into western movies...",
                    '<32>{#s/echostop}{#p/event}{#npc}* Signal end.',
                    ...(world.epicgamer && !save.data.b.f_state_dc_kidd4
                       ? ((save.data.b.f_state_dc_kidd4 = true),
                         [ '<25>{#p/kidd}{#f/1}* Erogot?', '<25>{#f/1}* KING Erogot!?', '<25>{#f/3}* Dude...' ])
                       : [])
                 ],
         f_echoAbyss6: () =>
            world.genocide
               ? [
                    "<32>{#p/alphys}{#npc/a}* I'll s-start on it right away...",
                    "<32>* Once th-they enter the lab, it'll- {%}",
                    '<32>{#p/mettaton}* SHH, ALPHYS...',
                    '<32>* FOR ALL WE KNOW, THEY COULD BE LISTENING TO US RIGHT NOW.',
                    '<32>{#p/alphys}* O-Oh...\n* Of c-course.',
                    '<32>{#s/echostop}{#p/event}{#npc}* Signal end.',
                    ...(world.epicgamer && !save.data.b.f_state_dc_kidd6
                       ? ((save.data.b.f_state_dc_kidd6 = true), [ '<25>{#p/kidd}{#f/4}* Yo...\n* Really creepy...' ])
                       : [])
                 ]
               : [
                    '<32>{#p/radio}{#v/1}{#npc/a}* Well anyway, about the plan...',
                    '<32>{#v/0}* About the plan indeed.',
                    '<32>{#v/1}* Hmm... I think...',
                    '<32>{#v/1}* ...',
                    "<32>{#v/0}* You've got no idea, do you?",
                    "<32>{#v/1}* ...\n* We've got a listener calling into the station...",
                    '<32>{#s/echostop}{#p/event}{#npc}* Signal end.'
                 ],
         f_echoAbyss7: () =>
            world.genocide
               ? [
                    '<32>{#p/alphys}{#npc/a}* S-so... when are you going to be ready to- {%}',
                    '<32>{#s/landing}{#p/undyne}* What the HELL is going on?',
                    '<32>* Papyrus just came running to my door, screaming something about his brother being DEAD.',
                    '<32>{#p/alphys}* U-um... I...',
                    "<32>* No, no, no...\n* It's all happening so fast...",
                    '<32>{#s/echostop}{#p/event}{#npc}* Signal end.'
                 ]
               : [
                    '<32>{#p/radio}{#v/1}{#npc/a}* Welcome, dear caller, to The Midnight Rush!',
                    '<32>* Got anything for us?',
                    "<32>{#p/human}* Yeah, you sure we're ready for this as a species?",
                    "<32>{#p/radio}{#v/0}* What are you implying?\n* That we're too dumb to comprehend the situation?",
                    "<32>{#p/human}* Of course not.\n* You think I'm worried for us?\n* Heh, buddy...",
                    "<32>{#p/human}* I'm worried for THEM.\n* You know how humans can be...",
                    "<32>* It's only a matter of time before we end up doing something stupid.",
                    '<32>{#s/echostop}{#p/event}{#npc}* Signal end.'
                 ],
         f_echoAbyss8: () =>
            world.genocide
               ? [
                    "<32>{#p/undyne}{#npc/a}* Just tell me what's going on!\n* I KNOW you've got hidden cameras all over the place.",
                    "<32>* Don't think I haven't noticed.",
                    '<32>{#p/alphys}* W-well... I... uh... you see- {%}',
                    '<32>{#p/mettaton}* A HUMAN AND A MONSTER THAT LOOKS A LOT LIKE PRINCE ASRIEL ARE COMMTTING MASS GENOCIDE.',
                    '<32>{#p/alphys}* Mettaton!?',
                    '<32>{#p/mettaton}* IS THAT DETAILED ENOUGH FOR YOU, CAPTAIN?',
                    '<32>{#s/echostop}{#p/event}{#npc}* Signal end.',
                    ...(world.epicgamer && !save.data.b.f_state_dc_kidd7
                       ? ((save.data.b.f_state_dc_kidd7 = true), [ "<25>{#p/kidd}{#f/4}* She doesn't sound good..." ])
                       : [])
                 ]
               : [
                    '<32>{#p/radio}{#v/1}{#npc/a}* Tch, way to be optimistic.',
                    '<32>{#v/0}* Well Al, for many people, this is a whole lot to take in all at once.',
                    "<32>* Remember, we've been pro-alien since the initial discovery back in the day.",
                    '<32>{#v/1}* Very true, very true.',
                    "<32>{#v/0}* Well folks, that's all we got time for tonight, make sure to sleep tight...",
                    "<32>* And don't let the fluffy monsters bite.",
                    '<32>{#s/echostop}{#p/event}{#npc}* Signal end.'
                 ],
         f_echoAbyss9: () =>
            world.genocide
               ? [
                    "<32>{#p/undyne}{#npc/a}* Damn it, I knew I shoulda taken Silencio's warning seriously...",
                    "<32>* I'm gonna go tell the king right away, you stay put here and don't try anything DUMB!",
                    '<32>{#s/landing}{#p/alphys}* N-no, wait- {%}',
                    "<32>{#p/mettaton}* SHE'S GONE, DEAR.\n* GONE LIKE THE FADING STARLIGHT!",
                    '<32>{#p/alphys}* I can see that.',
                    '<32>{#s/echostop}{#p/event}{#npc}* Signal end.'
                 ]
               : [
                    '<32>{#p/mettaton}{#npc/a}* OH, THESE RADIO SHOW HOSTS ARE JUST FABULOUS!',
                    '<32>{#p/alphys}* Ehehe...\n* Taking inspiration, I see?',
                    '<32>{#p/mettaton}* OH, DEFINITELY.\n* HOW COULD I PASS UP SUCH A GOLDEN OPPORTUNITY?',
                    "<32>{#p/alphys}* W-well, I'm glad you found a use for all this...",
                    "<32>{#p/mettaton}* OF COURSE.\n* THERE'S PLENTY OF GOOD MATERIAL HERE.",
                    '<32>{#s/echostop}{#p/event}{#npc}* Signal end.'
                 ],
         f_echoAbyss10: () =>
            world.genocide
               ? [
                    "<32>{#p/undyne}{#npc/a}* I'm coming for you, human.",
                    '<32>* You and that PUNK partner of yours...',
                    "<32>* I'm going to END you.",
                    '<32>{#s/echostop}{#p/event}{#npc}* Signal end.'
                 ]
               : [
                    "<32>{#p/mettaton}{#npc/a}* ALPHYS, ALPHYS, ALPHYS.\n* YOU'RE MORE HELPFUL THAN YOU THINK, DEAR.",
                    '<32>{#p/alphys}* R-really?',
                    '<32>{#p/mettaton}* WELL, YOU -ARE- RESPONSIBLE FOR MY FABULOUS BODY.',
                    '<32>{#p/alphys}* Oh.\n* Yeah.',
                    "<32>{#p/mettaton}* IT'S NOTHING TO BE ASHAMED OF!\n* THIS BODY MAY BE ROUGH AROUND THE EDGES, BUT...",
                    "<32>* IT'S A LOT BETTER THAN HAVING NO BODY AT ALL.",
                    '<32>{#s/echostop}{#p/event}{#npc}* Signal end.'
                 ],
         f_echodude: pager.create(
            'limit',
            () => [
               '<32>{#p/monster}{#npc/a}* This is a signal star.\n* When it picks up a signal, it repeats it over and over...'
            ],
            [ '<32>{#p/monster}{#npc/a}* Never trust a star.', "<32>* That's the one defining trait of this world." ]
         ),
         f_kidd: pager.create(
            'limit',
            () =>
               world.genocide
                  ? [
                       '<25>{#p/kidd}{#npc/a}{#f/3}* H... hey...',
                       '<25>{#p/asriel2}{#f/1}{#npc}* Hey.',
                       '<25>{#p/kidd}{#npc/a}{#f/1}* ...!\n* Y-yeah, hi!\n* Uh, haha!',
                       '<25>{#p/asriel2}{#f/8}{#npc}* Weirdo.',
                       '<25>{#p/kidd}{#npc/a}{#f/4}* ...'
                    ]
                  : save.data.n.plot === 33
                  ? [
                       '<25>{#p/kidd}{#npc/a}{#f/1}* Hey, how was lunch?',
                       '<25>{#f/1}* Did that short skeleton pull a prank again?'
                    ]
                  : [
                       '<25>{#p/kidd}{#npc/a}{#f/2}* Yo, are you here to see her too?',
                       "<25>{#f/1}* Haha, she's the coolest.",
                       '<25>{#f/2}* I wanna be just like her when I grow up...',
                       "<25>{#f/1}* And uh, don't tell my parents I'm out here!"
                    ],
            () =>
               world.genocide
                  ? [ '<25>{#p/kidd}{#npc/a}{#f/4}* ...' ]
                  : save.data.n.plot === 33
                  ? [ '<25>{#p/kidd}{#npc/a}{#f/3}* He always gets kicked out for pulling awful pranks.' ]
                  : [ '<25>{#p/kidd}{#npc/a}{#f/1}* Ha, you go on ahead.', "<25>{#f/1}* I'll be right behind you!" ]
         ),
         f_snail1: [ "<32>{#p/narrator}{#npc/a}* (Snail snail...)\n* Time flies when you're having fun..." ],
         f_snail2: [ "<32>{#p/narrator}{#npc/a}* (Snail snail...)\n* All's well that ends well..." ],
         f_temmie1: [ '<32>{#p/tem}{#npc/a}* hOI!!\n* im temmie!!!', '<32>* and dis is my friend...\n* temmie!!!' ],
         f_temmie2: [ '<32>{#p/tem}{#npc/a}* hOI!!\n* im temmie!!!', '<32>* and dis is my friend...\n* temmie!!!' ],
         f_temmie3: [ '<32>{#p/tem}{#npc/a}* hOI!!\n* im temmie!!!', '<32>* don forget my friend!' ],
         f_temmie4: () =>
            world.population === 0
               ? [ "<32>{#p/tem}{#npc/a}* Bob isn't afraid of bullies." ]
               : [ '<32>{#p/tem}{#npc/a}* Hi.', "<32>* I'm Bob." ],
         f_temmie5: [ '<32>{#p/tem}{#npc/a}* awawawawah!!', '<32>* humans...\n* such a...', '<32>* CUTE!!!!' ],
         f_temmie6: [
            '<32>{#p/tem}{#npc/a}* tem... WATCH EGG!!!',
            '<32>* eg... wil HATCH!!!',
            '<32>* tem... PROUD PARENT!!'
         ],
         f_truth: pager.create(
            'limit',
            [
               '<32>{#p/monster}* In this room, there is a gap in the fabric of spacetime...',
               '<32>* A tear in the very skin of the universe itself...',
               '<32>* No light or physical matter can enter, and the readings coming through are strange...',
               "<32>* It's as if...\n* Whatever's on the other end...",
               '<32>* ...is reliving the same few moments over and over again...'
            ],
            [ '<32>{#p/monster}* Who am I, you ask?', '<32>* Oh, you know...', '<32>* Just a template, discarded...' ],
            [
               '<32>{#p/monster}* You cannot save me, or the universe on the other end of this disturbance.',
               '<32>* Unless, of course...',
               '<32>* The final experiment reaches its conclusion.'
            ]
         ),
         f_starkiller: pager.create(
            'limit',
            () =>
               save.data.n.state_foundry_undyne !== 0
                  ? [ '<32>{#p/monster}{#npc/a}* I feel the grass has faded.', "<32>* Don't you...?" ]
                  : [
                       "<32>{#p/monster}{#npc/a}* What's grass?",
                       ...(save.data.b.genocide
                          ? [ '<32>* Can it find you?', '<32>* Can it eat you?', '<32>* Can it kill you?' ]
                          : save.data.b.oops
                          ? [ '<32>* Can you find it?', '<32>* Can you eat it?', '<32>* Can you kill it?' ]
                          : [ '<32>* Can it find you?', '<32>* Can it touch you?', '<32>* ...can it save you?' ]),
                       '<32>* ...',
                       '<32>* Are you made of grass?'
                    ],
            () =>
               save.data.b.oops
                  ? [ "<32>{#p/monster}{#npc/a}* The grass isn't always greener on the other side." ]
                  : [ '<32>{#p/monster}{#npc/a}* Maybe the grass really is greener on the other side.' ]
         ),
         f_clamgirl: pager.create(
            'limit',
            () =>
               save.data.n.plot === 47.2
                  ? [ "<32>{#p/monster}{#npc/a}* Uh, she's still chasing-" ]
                  : save.data.s.state_foundry_deathroom === 'f_hub'
                  ? [ '<32>{#p/monster}{#npc/a}* You should never have come.' ]
                  : save.data.n.state_foundry_undyne === 1
                  ? [
                       '<32>{#p/monster}{#npc/a}* I sense a disturbance in the nearby aura...',
                       "<32>* You really shouldn't have walked away from that girl."
                    ]
                  : save.data.n.state_foundry_undyne === 2
                  ? [
                       '<32>{#p/monster}{#npc/a}* I sense a disturbance in the nearby aura...',
                       '<32>* You really should have left that girl alone.'
                    ]
                  : 2 <= save.data.n.plot_date
                  ? [
                       '<32>{#p/monster}{#npc/a}* I sense a disturbance in the nearby aura...',
                       '<32>* You and my new neighbor are getting along, I see.'
                    ]
                  : save.data.n.plot > 47.2
                  ? world.trueKills > 0
                     ? [
                          '<32>{#p/monster}{#npc/a}* Papyrus is waiting nearby.',
                          "<32>* Though, his efforts aren't going to bear much fruit.",
                          '<32>* You should know why.'
                       ]
                     : [ '<32>{#p/monster}{#npc/a}* Papyrus is waiting nearby.', "<32>* Won't you meet my new neighbor?" ]
                  : [
                       "<32>{#p/monster}{#npc/a}* I'm visiting the Foundry from the Citadel.",
                       "<32>* Considering I don't have any neighbors there, I might just end up staying."
                    ],
            () =>
               save.data.n.plot === 47.2
                  ? [ "<32>{#p/monster}{#npc/a}* Uh, she's still chasing you-" ]
                  : save.data.s.state_foundry_deathroom === 'f_hub'
                  ? [ '<32>{#p/monster}{#npc/a}* ...' ]
                  : save.data.n.state_foundry_undyne > 0
                  ? [ '<32>{#p/monster}{#npc/a}* ...' ]
                  : 2 <= save.data.n.plot_date
                  ? [ '<32>{#p/monster}{#npc/a}* Good neighbors have been quite difficult to find.' ]
                  : save.data.n.plot > 47.2
                  ? world.trueKills > 0
                     ? [ '<32>{#p/monster}{#npc/a}* ...' ]
                     : [
                          "<32>{#p/monster}{#npc/a}* Go on, she won't bite.\n* She might throw a few spears at you, though."
                       ]
                  : [
                       '<32>{#p/monster}{#npc/a}* Knowing where I live is nice.',
                       "<32>* But who'd settle for a world of dreams, when hopes can lift it into reality?"
                    ]
         )
      },
      punchcard0: [ '<32>{#p/narrator}* The box is empty.' ],
      punchcard1: [ '<32>{#p/narrator}* There is 1 punch card in the box.' ],
      punchcard2: [ '<32>{#p/narrator}* There are $(x) punch cards in the box.' ],
      punchcard3: [ choicer.create('* (Take a punch card?)', 8, 7, 'Yes', 'No') ],
      punchcard4: [ '<32>{#p/human}* (You got the punch card.)' ],
      puzzle1switch: [ '<32>{#p/narrator}* The switch, quite shockingly, is stuck.', '<32>* What a turn of events!' ],
      puzzle2switch: [ '<32>{#p/narrator}* The switch is stuck.\n* Naturally.' ],
      puzzle3switch: [
         '<32>{#p/narrator}* Believe it or not...',
         "<32>* The switch isn't stuck, it's just out of order.\n* Oh wait."
      ],
      quiche1: [
         "<32>{#p/narrator}* There's a piece of cheesecake here with a note attached.",
         '<32>* "I just couldn\'t handle the responsibility."',
         choicer.create('* (Take the cheesecake?)', 8, 7, 'Yes', 'No')
      ],
      quiche2: [ "<32>{#p/human}* (You're carrying too much.)" ],
      quiche3: [ '<32>{#p/human}* (You got the cheesecake.)' ],
      quiche4: [ '<32>{#p/narrator}* Just a lonely bench out in the middle of a factory.\n* Nothing weird about that!' ],
      quiche5: [ '<32>{#p/human}* (You let the cheesecake be.)' ],
      sansSentry: () =>
         world.genocide
            ? [ "<32>{#p/narrator}* Sans's sentry station.\n* Again." ]
            : [ "<32>{#p/narrator}* Sans's sentry station again...", "<32>* As if one wasn't enough." ],
      sansSentryBack: () =>
         world.genocide
            ? [
                 '<32>{#p/human}* (You look behind the sentry station...)',
                 "<32>{#p/narrator}* It's a red scarf and a box of bones."
              ]
            : [
                 '<32>{#p/human}* (You look behind the sentry station...)',
                 "<32>{#p/narrator}* It's a series of notes on quantum field theory."
              ],
      spider1: () =>
         world.genocide
            ? [ "<32>{#p/monster}* There's something advancing in the dark." ]
            : [ "<32>{#p/monster}* There's someone roving in the dark." ],
      spider2: () =>
         world.genocide ? [ '<32>{#p/monster}* Something powerful...' ] : [ '<32>{#p/monster}* Someone curious...' ],
      spider3: () =>
         world.genocide ? [ '<32>{#p/monster}* Something dangerous...' ] : [ '<32>{#p/monster}* Someone mysterious...' ],
      spider4: () =>
         world.genocide ? [ '<32>{#p/monster}* Something impossible...' ] : [ '<32>{#p/monster}* Someone anomalous...' ],
      spider5: () => (world.genocide ? [ '<32>{#p/monster}* Something...' ] : [ '<32>{#p/monster}* Someone...' ]),
      spider6: () =>
         world.genocide
            ? [
                 '<32>{#p/monster}* ...that should not be allowed to live.',
                 '<32>* You think you can just get away with all this, dearies?',
                 '<32>* Ahuhuhu~\n* You have a lot to answer for!'
              ]
            : [
                 '<32>{#p/monster}* ...that should not be allowed to pass.',
                 '<32>* You think you can just walk by an ELITE squad volunteer and get away with it?',
                 '<32>* Ahuhuhu~\n* You have a lot to learn!'
              ],
      spookydate0: [ "<25>{#p/sans}* thanks for treatin' me, kiddo.", '<25>* glad we could talk.' ],
      spookydate1: pager.create(
         'limit',
         [
            "<25>{#p/sans}* so i've been thinking.\n* bein' a sentry can get kinda boring at times.",
            "<25>{#f/3}* that's why i took this second job as a foundry worker.",
            '<99>{#f/2}* fortunately, two jobs\n  means twice as many\n  legally-required breaks.',
            "<25>{#f/0}* i'm going to grillby's.\n* wanna come?",
            choicer.create('* (What do you say?)', 8, 7, 'Yeah', 'Nah')
         ],
         [
            "<25>{#p/sans}* i'm going to grillby's.\n* wanna come?",
            choicer.create('* (What do you say?)', 8, 7, 'Yeah', 'Nah')
         ]
      ),
      spookydate2a: [ "<25>{#p/sans}* well, if you insist...\n* i'll pry myself away from my work..." ],
      spookydate2b: [ '<25>{#p/sans}* well, suit yourself.' ],
      spookydate3: [ '<25>{#p/sans}* over here.\n* i know a shortcut.' ],
      spookydate4: [ '<25>{#p/sans}* fast shortcut, huh?' ],
      spookydate5: [ '<25>{#p/sans}* hey everyone.' ],
      spookydate6: [ '<32>{#p/monster}* Greetings, Sans.\n{#x1}* Hiya, Sansy~' ],
      spookydate7: [ '<32>{#p/monster}* Hey, Sans.\n{#x1}* (Hi, Sans.)' ],
      spookydate8: [ "<32>{#p/monster}* Uh... weren't you just here for breakfast not too long ago?" ],
      spookydate9: [
         "<25>{#p/sans}{#f/3}* nah, i haven't had breakfast in at least half an hour.",
         '<25>{#f/2}* you must be thinking of brunch.'
      ],
      spookydate9x: [ "<25>{#p/sans}{#f/3}* gee grillby, where'd everybody go?" ],
      spookydate9y: [
         '<32>{#p/monster}{#npc/a}* ...\n* ...\n* ...',
         "<32>* ...Grillbz doesn't mention the lack of customers, but says seeing you is a nice relief."
      ],
      spookydate9z: [ '<25>{#p/sans}{#f/0}* weird.' ],
      spookydate10: [ "<25>{#p/sans}* kid, why don't you come up here and take a seat?" ],
      spookydate11: [
         '<25>{#p/sans}* whoops, watch where you sit down in here.',
         '<25>{#f/2}* some weirdo musta put a whoopee cushion on the seat.',
         "<25>{#f/0}* ...anyway, let's order.\n* whaddya want?",
         choicer.create('* (What do you say?)', 8, 7, 'Fries', 'Burgers'),
         '<25>{#p/sans}* hey, that sounds pretty good.'
      ],
      spookydate12a: [ "<25>{#p/sans}* grillby, we'll have a double order of glow fries." ],
      spookydate12b: [ "<25>{#p/sans}* grillby, we'll have two jelly burgers." ],
      spookydate13: [
         '<25>{#p/sans}* so, what do you think of my brother?',
         choicer.create('* (What do you say?)', 8, 7, 'Cool', 'Uncool')
      ],
      spookydate14a: () =>
         world.dead_skeleton
            ? [
                 "<25>{#p/sans}* of course he's cool.",
                 "<25>{#f/3}* you'd be cool too if you wore that outfit every day.",
                 '<25>{#f/0}* he only took that thing off when he absolutely had to.',
                 '<25>{#f/0}* oh well.\n* at least he washed it.',
                 '<25>{#f/2}* and by that, i mean he wore it in the shower.'
              ]
            : [
                 "<25>{#p/sans}* of course he's cool.",
                 "<25>{#f/3}* you'd be cool too if you wore that outfit every day.",
                 "<25>{#f/0}* he'd only take that thing off if he absolutely had to.",
                 '<25>{#f/0}* oh well.\n* at least he washes it.',
                 '<25>{#f/2}* and by that, i mean he wears it in the shower.'
              ],
      spookydate14b: () =>
         world.dead_skeleton
            ? [
                 '<25>{#p/sans}* hey, pal.',
                 "<25>{#f/4}* sarcasm isn't funny, okay?",
                 '<25>{#f/0}* my brother was a real icon.',
                 "<25>{#f/3}* if it weren't for him, i wouldn't even be a royal sentry now."
              ]
            : [
                 '<25>{#p/sans}* hey, pal.',
                 "<25>{#f/4}* sarcasm isn't funny, okay?",
                 "<25>{#f/0}* my brother's a real icon.",
                 "<25>{#f/3}* if it weren't for him, i wouldn't even be a royal sentry now."
              ],
      spookydate15: [ '<25>{#p/sans}* here comes the grub.' ],
      spookydate16: [
         '<25>{#p/sans}* anyway, cool or not, you have to agree he goes above and beyond.',
         '<99>{#f/0}* matter of fact, his\n  interest in the guard\n  is a good example.',
         '<25>* not too long ago, papyrus visited the captain of the guard...',
         '<25>{#f/3}* and begged her to let him be in it.',
         '<25>{#f/0}* and, naturally, she shut the door on him...',
         '<25>{#f/2}* but after a few hours, she found him there, still waiting.',
         '<25>{#f/0}* seeing his dedication, she decided to give him...',
         "<25>{#f/2}* ...well, let's just call it 'warrior training.'"
      ],
      spookydate17: [ "<25>{#p/sans}* oh yeah, there's something i've been meaning to ask ya." ],
      spookydate18: [
         '<25>{*}{#p/sans}{#f/1}* have you ever heard of a {@fill:#ff0}talking star{@fill:#fff}?',
         choicer.create('* (What do you say?)', 8, 7, 'Yes', 'No')
      ],
      spookydate19a: [
         '<25>{#p/sans}* so you know all about it, then.',
         '<25>{#p/sans}* the {@fill:#0080ff}signal star{@fill:#fff}.'
      ],
      spookydate19b: [ "<25>{#p/sans}* well, lemme tell ya.\n* it's called the {@fill:#0080ff}signal star{@fill:#fff}." ],
      spookydate20: () =>
         world.dead_skeleton
            ? [
                 "<25>* they're all over the factory.",
                 "<25>* once they pick up a signal, they'll repeat it over and over...",
                 '<25>{#f/3}* what about it?',
                 '<25>{#f/0}* well, papyrus told me something interesting the other day.',
                 '<25>* sometimes, when no one else was around...',
                 '<25>* a star appeared from the heavens and whispered things to him.',
                 '<25>* flattery...\n* advice...\n* encouragement...',
                 '<25>{#f/3}* ...predictions.',
                 '<25>{#f/0}* weird, huh?',
                 "<25>* someone must've used a signal star to play a trick on him.",
                 '<25>* keep an eye out, ok?',
                 '<25>* thanks.'
              ]
            : [
                 "<25>* they're all over the factory.",
                 "<25>* once they pick up a signal, they'll repeat it over and over...",
                 '<25>{#f/3}* what about it?',
                 '<25>{#f/0}* well, papyrus told me something interesting the other day.',
                 '<25>* sometimes, when no one else is around...',
                 '<25>* a star appears from the heavens and whispers things to him.',
                 '<25>* flattery...\n* advice...\n* encouragement...',
                 '<25>{#f/3}* ...predictions.',
                 '<25>{#f/0}* weird, huh?',
                 '<25>* someone must be using a signal star to play a trick on him.',
                 '<25>* keep an eye out, ok?',
                 '<25>* thanks.'
              ],
      spookydate21: () => [
         '<25>{#p/sans}* say, can you foot the bill?',
         ...(save.data.b.s_state_million && !save.data.b.s_state_million_garb
            ? [
                 '<25>{#f/3}* ...actually, since you beat my high score earlier...',
                 "<25>{#f/2}* well uh, i'm only kidding, anyway."
              ]
            : [
                 "<25>{#f/2}* that'll be 10,000 G.",
                 choicer.create('* (What do you say?)', 8, 7, 'Yes', 'No'),
                 '<25>{#p/sans}* heheh... just kidding.'
              ]),
         '<25>{#p/sans}{#f/4}* grillby.\n* put it on my tab.'
      ],
      spookydate22: [
         '<25>{#p/sans}* that was quite the break, huh?',
         "<25>{#f/2}* i can't believe i let ya pull me away from work for that long."
      ],
      spookydate23: () => [
         '<25>{#p/sans}* by the way...',
         world.genocide
            ? '<25>{#f/1}* ...i was going to say something, but i forgot.'
            : '<25>{#f/2}* ...i was going to say something, but i forgot.'
      ],
      telescopeX: pager.create(
         'limit',
         [
            "<25>{#p/sans}* i'm thinking about getting into the telescope business.",
            "<25>{#f/3}* this here is what you'd call a PREMIUM telescope.",
            '<25>{#f/3}* i was planning on waiting to show it off tomorrow...',
            '<25>{#f/2}* but, since i know you, you can use it early.',
            '<25>{#f/0}* howzzabout it?',
            choicer.create('* (What do you say?)', 8, 7, 'Yes', 'No')
         ],
         [ '<25>{#p/sans}{#f/2}* wanna try my telescope?', choicer.create('* (What do you say?)', 8, 7, 'Yes', 'No') ]
      ),
      telescopeY: [
         "<25>{#p/sans}* lemme guess...\n* it doesn't work?",
         '<25>{#f/3}* oh, sorry, i thought you knew.',
         '<25>{#f/2}* a premium telescope requires a premium membership.'
      ],
      temmiepat1: [
         '<32>{#p/tem}{#npc/a}* p...\n* tem heard human loves to pet tem...',
         '<32>* u wana...\n* PET???',
         choicer.create('{#npc}* (What do you say?)', 8, 7, 'Yuz.', 'Nuu!!')
      ],
      temmiepat2a: [ '<32>{#p/human}* (You pet temmie.)', '<32>{#p/tem}{#npc/a}* uwawawawah.....' ],
      temmiepat2b: [ '<32>{#p/tem}{#npc/a}* ...', "<32>{#p/tem}{#npc/a}* You're gonna regret that." ],
      temmiepat3a: [ '<32>{#p/human}* (You continue petting temmie.)', '<32>{#p/tem}{#npc/a}* uwawawawah.....' ],
      temmiepat3b: [ '<32>{#p/tem}{#npc/a}* ...' ],
      temstatue: [ '<32>{#p/narrator}* Huh...?', '<32>{#p/narrator}* That sounded like a switch...' ],
      temstatueAftuh: [ '<32>{#p/narrator}* The switch back here has already been pulled.' ],
      temstatueNormuh: [ '<32>{#p/narrator}* "Statue of tem... very famus"\n* "VERY!!!!!!!!!"' ],
      temmietourguide: [
         '<32>{#p/tem}{#npc/a}* hOI!\n* can I be... TOR GIDE???',
         choicer.create('{#npc}* (What do you say?)', 8, 7, 'Yuz.', 'Nuu!')
      ],
      temmietourguide1: [ '<32>{#p/tem}* uwa!!\n* tor gide TEM!!' ],
      temmietourguide2: [ '<32>{#p/tem}* mayb next tiem!!' ],
      npc86a: () => [
         '<32>{#p/monster}{#npc/a}* Foreign energy signature detected.',
         '<32>* Name... unknown.',
         '<32>* Relationship status... stranger.',
         save.data.n.plot < 42.1 ? '<32>* Last interaction... none.' : '<32>* Last interaction... observed in battle.',
         '<32>* Processing...\n* Processing...\n* Processing...',
         '<32>* Hello, stranger.\n* Would you like to complete a survey today?',
         choicer.create('* (What do you say?)', 8, 7, 'Yes', 'No')
      ],
      npc86b: [
         '<32>{#p/monster}{#npc/a}* Thank you.\n* The question is as follows.',
         '<32>* "Out of the colors red, green, and blue, uh, which d-do you prefer??"',
         choicer.create('* (What do you say?)', 8, 7, 'Red', 'Green', 'Blue', 'Not sure')
      ],
      npc86c: [
         '<32>{#p/monster}* Thank you.\n* Your choice will be forwarded to the survey conductor.',
         '<32>{#p/monster}{#npc/a}* Your relationship status is now set to "acquaintance."'
      ],
      npc86d: () => [
         '<32>{#p/monster}{#npc/a}* Familiar energy signature detected.',
         '<32>* Name... unknown.',
         '<32>* Relationship status... acquaintance.',
         save.data.n.state_foundry_npc86 === 1
            ? '<32>* Last interaction... survey declined.'
            : '<32>* Last interaction... survey taken.',
         '<32>* Processing...\n* Processing...\n* Processing...',
         '<32>* Hello again, acquaintance.\n* How is your day today?',
         choicer.create('* (What do you say?)', 8, 7, 'Good', 'Bad', 'Neutral', 'Not sure')
      ],
      npc86e: () => [
         ...[
            [ '<32>{#p/monster}{#npc/a}* Good?\n* That is good to hear.' ],
            [ '<32>{#p/monster}{#npc/a}* Bad?\n* I hope things get better.' ],
            [ '<32>{#p/monster}{#npc/a}* Neutral?\n* That is understandable.' ],
            [ '<32>{#p/monster}{#npc/a}* Not sure?\n* That is understandable.' ]
         ][choicer.result],
         '<32>{#p/monster}{#npc/a}* Your relationship status is now set to "friend."'
      ],
      npc86f: () => [
         '<32>{#p/monster}{#npc/a}* Familiar energy signature detected.',
         '<32>* Name... unknown.',
         '<32>* Relationship status... friend.',
         '<32>* Last interaction... asked about mood.',
         '<32>* Processing...\n* Processing...\n* Processing...',
         [
            '<32>* Hello again, friend.\n* I hope your mood has remained since our last interaction.',
            '<32>* Hello again, friend.\n* I hope your mood has improved since our last interaction.',
            '<32>* Hello again, friend.\n* Based on our last interaction...',
            '<32>* Hello again, friend.\n* Based on our last interaction...'
         ][save.data.n.state_foundry_npc86_mood - 1],
         '<32>* It appears you have an express interest towards me.',
         '<32>* What emotion do you most commonly feel about me?',
         choicer.create('* (What do you say?)', 8, 7, 'Love', 'Disgust', 'None', 'Not sure')
      ],
      npc86g: () =>
         [
            [
               '<32>{#p/monster}{#npc/a}* ...',
               '<32>* Your relationship status is now set to "bestie."',
               '<32>* I love you too, bestie.'
            ],
            [
               '<32>{#p/monster}{#npc/a}* ...',
               '<32>* Your relationship status is now set to "enemy."',
               '<32>* I have no further need for you, enemy.'
            ],
            [
               '<32>{#p/monster}{#npc/a}* ...',
               '<32>* Your relationship status is now set to "acquaintance."',
               '<32>* Perhaps this was not a good idea, acquaintance.'
            ],
            [
               '<32>{#p/monster}{#npc/a}* ...',
               '<32>* Your relationship status is unchanged.',
               ...(save.data.n.state_foundry_npc86 === 5 && save.data.n.state_foundry_npc86_feelings === 4
                  ? [ '<32>* Expected reply to all questions is now set to "not sure."' ]
                  : [])
            ]
         ][choicer.result],
      npc86h: () => [
         '<32>{#p/monster}{#npc/a}* Familiar energy signature detected.',
         '<32>* Name... unknown.',
         [
            '<32>* Relationship status... bestie.',
            '<32>* Relationship status... enemy.',
            '<32>* Relationship status... acquaintance',
            '<32>* Relationship status... friend.'
         ][save.data.n.state_foundry_npc86_feelings - 1],
         save.data.b.f_state_done86
            ? [
                 '<32>* Last interaction... showed appreciation.',
                 '<32>* Last interaction... declined conversation.',
                 '<32>* Last interaction... made small talk.',
                 '<32>* Last interaction... gave advice.'
              ][save.data.n.state_foundry_npc86_feelings - 1]
            : '<32>* Last interaction... asked about feelings.',
         '<32>* Processing...\n* Processing...\n* Processing...',
         [
            [
               '<32>* Hello again, bestie.\n* I hope you are doing well.',
               '<32>* Hello again, bestie.\n* I love you very much.',
               '<32>* Hello again, bestie.\n* It is good to see you.'
            ],
            [
               '<32>* ...\n* Do not speak to me again.',
               '<32>* ...\n* Do not speak to me again.',
               '<32>* ...\n* Do not speak to me again.'
            ],
            [
               '<32>* Hello again, acquaintance.\n* The factory is musty today.',
               '<32>* Hello again, acquaintance.\n* The starlight is shining today.',
               '<32>* Hello again, acquaintance.\n* The steam is humid today.'
            ],
            [
               '<32>* Hello again, friend.\n* Remember to eat something.',
               '<32>* Hello again, friend.\n* Remember to take breaks.',
               '<32>* Hello again, friend.\n* Remember to talk things out.'
            ]
         ][save.data.n.state_foundry_npc86_feelings - 1][Math.floor(random.next() * 3)],
         '<32>* Your relationship status is unchanged.'
      ],
      trivia: {
         hapstabed: [ "<32>{#p/narrator}* It's a ghost bed.\n* You'd sleep right through it." ],
         hapstatv: [ '<32>{#p/narrator}* An old earth television.\n* An odd, yet fitting choice...' ],
         hapstawindow: [ '<32>{#p/narrator}* A beautiful view... of the outside foundry wall.' ],
         hapstacouch: [
            "<32>{#p/narrator}* Another couch, another awful temptation... you're so tired after all this traveling.",
            '<32>{#p/narrator}* ...but you have to keep going!'
         ],
         hapstaposter: [ '<32>{#p/narrator}* "Two star-crossed lovers fall into a digital abyss..."' ],
         hapstabook1: [
            "<32>{#p/narrator}* It's a voicebook.",
            '<32>{#p/human}* (You pick it up and open to the only recorded section...)',
            '<32>{#p/hapstablook}* Dear diary...',
            '<32>* Humans dream of so many fantastical stories, but when I look out my window...',
            '<32>* ...all I can see is a wall.',
            '<32>* Is it right that we monsters have become used to this sad state of living?',
            '<32>* Is it right that only the youngest children seem to be truly alive?',
            '<32>* Our sense of wonder has been beaten out of us...',
            "<32>* Won't somebody do something?",
            '<32>{#p/human}* (You put the book back down.)'
         ],
         hapstabook2: [
            "<32>{#p/narrator}* It's a voicebook.",
            '<32>{#p/human}* (You pick it up and open to the only recorded section...)',
            '<32>{#p/hapstablook}* Dear diary...',
            "<32>* I've been binge-watching old human television series.",
            "<32>* These people aren't like what I've been told... in fact, they're a lot like us.",
            '<32>* Living, laughing, loving...\n* Hurting and crying.\n* Doing what they believe in.',
            '<32>* To most monsters, humanity is a species that should be feared.',
            '<32>* But the more I see of them... the more I grow weary of that sentiment.',
            "<32>* And, really, monsters aren't all starlight and roses, either.",
            '<32>* Everything has nuance.',
            '<32>{#p/human}* (You put the book back down.)'
         ],
         hapstabook3: [
            "<32>{#p/narrator}* It's a voicebook.",
            '<32>{#p/human}* (You pick it up and open to the only recorded section...)',
            '<32>{#p/hapstablook}* Dear diary...',
            "<32>* It's been a hard day at the farm for Blooky and I.",
            "<32>* Two of the snails we'd been looking after escaped, and we couldn't find them.",
            "<32>* It wouldn't be the first time I failed to do my part here.",
            "<32>* And I doubt it'd be the last time, either.",
            '<32>{#p/human}* (You put the book back down.)'
         ],
         hapstabook4: [
            "<32>{#p/narrator}* It's a voicebook.",
            '<32>{#p/human}* (You pick it up and open to the only recorded section...)',
            '<32>{#p/hapstablook}* Dear diary...',
            '<32>* I met the new royal scientist recently...\n* Alphys, I think?',
            "<32>* Names are hard when you've spent most of the day working tirelessly on a stagnant farm.",
            '<32>* Anyway, her and I have become fast friends since she started working at the lab.',
            "<32>* I never thought I'd meet someone who shares my views on humanity...",
            '<32>* But I guess life can surprise you like that.',
            '<32>{#p/human}* (You put the book back down.)'
         ],
         hapstabook5: [
            "<32>{#p/narrator}* It's a voicebook.",
            '<32>{#p/human}* (You pick it up and open to the only recorded section...)',
            '<32>{#p/hapstablook}* Dear diary...',
            '<32>* Alphys and I have started work on a new project.',
            '<32>* The outpost grows ever drearier by the day, and that has to change.',
            "<32>* We'll be taking inspiration from those imaginative humans...",
            '<32>* ...by starting a new, public- broadcast television series!',
            "<32>* I've already written numerous elaborate scripts.",
            '<32>* Haha... let\'s just say things could get "explosive."',
            '<32>{#p/human}* (You put the book back down.)'
         ],
         hapstabook6: [
            "<32>{#p/narrator}* It's a voicebook.",
            '<32>{#p/human}* (You pick it up and open to the only recorded section...)',
            '<32>{#p/hapstablook}* Dear diary...',
            '<32>* Oh, how I longed for a day like this to come...',
            '<32>* Heh... suffice it to say, this is probably going to be the last diary I record.',
            "<32>* I've got a brighter future ahead of me now...",
            '<32>* In time, I hope the others come to understand my choice.',
            '<32>* Because, no matter what happens to me next...',
            '<32>* A little part of me will always miss being here.',
            '<32>{#p/human}* (You put the book back down.)'
         ],
         fstatue: [ "<32>{#p/narrator}* It's an old, derelict statue." ],
         plankstop: [
            "<32>{#p/narrator}* The endless abyss of space is met only by the distant sight of the factory's edge."
         ],
         f_village_egg: [ '<32>{#p/narrator}* It looks hard-boiled.' ],
         f_cheesetable: [ "<32>{#p/narrator}* It's just an ordinary table." ],
         f_statue_kidd: [ '<25>{#p/kidd}{#f/1}* Stand on the other switch!' ],
         f_armor_sign: [ '<32>{#p/narrator}* "Be wary of sleeping dogs."' ],
         f_backsign: [ '<32>{#p/narrator}* "Even when you\'re lost, the will to find yourself shows through."' ],
         f_creamsign: () =>
            save.data.n.kills_starton + save.data.n.bully_starton > 2 || world.genocide
               ? [ '<32>{#p/narrator}* "Where specificity lacks, chaos thrives."' ]
               : [ '<32>{#p/narrator}* The glyphs have been painted over with a list of 21 different flavors.' ],
         f_doge_sign: [
            '<32>{#p/narrator}* "This is a box."',
            '<32>* "You can put an item inside or take an item out."',
            '<32>* "Why would you, though??"\n* "It\'s not like you can use items while they\'re inside."',
            '<32>* "Sincerely, a box critic."'
         ],
         f_doge1: [
            '<32>{#p/narrator}* "Why did the humans attack?"\n* "Indeed, it seemed that they had nothing to fear."',
            '<32>* "Humans are unbelievably strong. It would take the SOUL of nearly every monster..."',
            '<32>* "...just to equal the power of a single human SOUL."'
         ],
         f_doge3: () => [
            '<32>{#p/narrator}* "But humans have one weakness. Ironically, it is the strength of their SOUL."',
            '<32>* "Its power allows it to persist outside the human body, even after death."',
            '<32>{#p/narrator}* "If a monster defeats a human, they can take its SOUL."',
            '<32>* "A monster with a human SOUL... a horrible beast with unfathomable power."',
            ...(world.goatbro
               ? [
                    [ '<25>{#p/asriel2}{#f/10}* A horrible beast, eh?', "<25>{#f/8}* I'd beg to differ." ],
                    [ '<25>{#f/8}* ...' ]
                 ][Math.min(save.flag.n.ga_asrielBeast++, 1)]
               : [])
         ],
         f_doge5: () => [
            "<32>{#p/narrator}* It's an illustration of a harrowing creature...",
            "<32>* There's something very unsettling about this drawing.",
            ...(world.goatbro && save.flag.n.ga_asrielDrawing++ < 1
               ? [
                    "<25>{#p/asriel2}{#f/5}* Look $(name)!\n* It's us... sorta.",
                    '<26>{#f/4}* ...is that really how they think we looked?\n* Golly...'
                 ]
               : [])
         ],
         f_gersonshop: [
            '<32>{#p/narrator}* "Gerson\'s Bits \'n\' Bobs!"\n* "A humble store for all your factory life needs!"'
         ],
         f_hub_sign: [
            '<32>{#p/narrator}* "Left - Dark Zone"\n* "Forward - Undyne\'s House"\n* "Right - Gerson\'s Shop"',
            '<32>{#p/narrator}* "Backward - Snail Preserve"'
         ],
         f_lobbywindow: [
            '<32>{#p/narrator}* "You feel like you\'ve already seen this window from another perspective somewhere else."'
         ],
         f_paintblaster: [
            '<32>{#p/narrator}* An old fuel injection device.\n* There is a similar one somewhere in the OUTLANDS...'
         ],
         f_path1: [
            '<32>{#p/narrator}* "When the humans trapped us, they sealed this place with a force field."',
            '<32>* "Anything can enter through it, but only beings with a powerful SOUL can leave."'
         ],
         f_path2: [
            '<32>{#p/narrator}* "There is only one way to beat this thing."',
            '<32>* "If a huge power, equivalent to seven human SOULs, attacks the force field..."',
            '<32>* "It will be destroyed."'
         ],
         f_path3: [
            '<32>{#p/narrator}* "But this cursed place is too far away from any other outpost."',
            '<32>* "There is no way a human could come here."',
            '<32>* "We will remain trapped out here forever."'
         ],
         f_puzzle1_sign: [
            '<32>{#p/narrator}* "Move the pylons to guide the laser into the reciever."\n* "Then press the switch."'
         ],
         f_puzzle2_sign: [ '<32>{#p/narrator}* "All pylons must be used in the puzzle solution."' ],
         f_puzzle3_sign: [ '<32>{#p/narrator}* "The solution is lost unless the lines are crossed."' ],
         f_telescope: [ '<32>{#p/narrator}* It\'s a "premium" telescope.' ],
         f_temhistory: [ '<32>{#p/narrator}* Tem history.\n* The deepest and most rich history in all the galaxy.' ],
         f_temhole: () =>
            world.population === 0
               ? [ "<32>{#p/narrator}* It's a hole." ]
               : [ "<32>{#p/narrator}* It's a temmie in a hole.\n* A tem hole." ],
         f_trash: pager.create(
            'sequence',
            [ '<32>{#p/narrator}* Trash.' ],
            [ '<32>{#p/narrator}* Still trash.' ],
            [ '<32>{#p/narrator}* Just trash...' ],
            [ '<32>{#p/narrator}* The trash is trash.' ],
            [ '<32>{#p/narrator}* Trashy trash.' ],
            [ '<32>{#p/narrator}* Surprisingly, trash.' ],
            [ '<32>{#p/narrator}* Trash!!!' ]
         ),
         f_trash1: [
            '<32>{#p/narrator}* A written report on Starlings.\n* The data on this tablet is mostly corrupted...',
            '<32>* "Starling... a flower from beyond... luminous glow... the shape of a star..."',
            "<32>* That's all you can make out."
         ],
         f_trash2: [
            "<32>{#p/narrator}* It's a tablet with information pertaining to wormhole travel.",
            "<32>* There's also a section about wormhole weapons...\n* Oh god."
         ],
         f_trash3: [
            "<32>{#p/narrator}* It's an old DVD case for a science fiction cartoon.",
            '<32>* Desperate claw marks cover the edges...'
         ],
         f_undynedummy: () =>
            save.data.s.state_foundry_deathroom === 'f_undyne'
               ? [
                    '<32>{#p/monster}* No.\n* No!\n* NO!!',
                    '<32>* You killed my only training partner.',
                    '<32>* How DARE you kill the only person who knows how to hit me the way I like it!?',
                    ...(save.data.n.bad_lizard < 2 && 49 <= save.data.n.plot
                       ? [ '<32>* No matter how many dumb game shows I agree to be in to try and distract myself...' ]
                       : []),
                    "<32>* I'll never be able to replace her!"
                 ]
               : world.goatbro
               ? [
                    '<32>{#p/monster}* Seriously.\n* Seriously?\n* SERIOUSLY!?',
                    '<32>{#p/monster}* You guys are unironically adorable together.',
                    ...(save.flag.n.ga_asrielDummy++ < 1
                       ? [ '<25>{#p/asriel2}{#f/13}* Are we... really...', '<25>{#p/asriel2}{#f/13}* ...' ]
                       : [])
                 ]
               : save.data.n.plot_date < 2.1
               ? [ '<32>{#p/monster}* What.\n* What?\n* WHAT!?', '<32>{#p/monster}* This happens all the time.' ]
               : save.storage.inventory.contents.includes('tvm_mewmew')
               ? [
                    "<32>{#p/monster}* Yeah, you're so cool with that Mew Mew doll of yours, huh?",
                    '<32>{#p/monster}* Get outta here.'
                 ]
               : 65 <= save.data.n.plot
               ? save.data.b.a_state_hapstablook
                  ? [
                       '<32>{#p/monster}* Well.\n* Well!\n* WELL!',
                       '<32>* Who knew Mettaton was such a softie this whole time?',
                       '<32>* Thanks for the help, human.'
                    ]
                  : [ '<32>{#p/monster}* Ugh.\n* Ugh!\n* UGH!', '<33>{#p/monster}* My life really sucks right now.' ]
               : 63 <= save.data.n.plot && save.data.b.a_state_hapstablook
               ? [
                    "<32>{#p/monster}* Hey, aren't you supposed to be in Mettaton's next show?",
                    '<32>* What are you doing way back here?',
                    '<32>* Come on.\n* Come on!\n* COME ON!!',
                    '<32>* Get back in the spotlight so we can go forward with our plan!'
                 ]
               : save.data.n.bad_lizard < 2 && 49 <= save.data.n.plot
               ? [
                    '<32>{#p/monster}* So.\n* So!\n* SO!',
                    "<32>* You're a TV star now, huh?",
                    '<32>* Yeah, Mettaton usually has that effect on people.'
                 ]
               : save.data.b.f_state_dummypunch
               ? [
                    '<32>{#p/monster}* Hey.\n* Hey!\n* HEY!',
                    ...(save.data.n.bully > 20
                       ? [
                            "<32>* You don't hit too bad for a dummy.",
                            "<32>* It's a pity...",
                            "<32>* BECAUSE I'M ALREADY TAKEN!",
                            '<32>* Go find your own dummy and get the hell outta my face!'
                         ]
                       : [
                            '<32>* Hands off the goods!\n* I ain\'t rated "E" for everyone, you know!',
                            '<32>* Wimpy strikes like yours will never compare to those of Undyne!'
                         ])
                 ]
               : save.data.b.f_state_dummytalk
               ? [
                    '<32>{#p/monster}* Hey.\n* Hey!\n* HEY!',
                    ...(save.data.n.bully > 20
                       ? [
                            "<32>* You've got quite the intimidating stare.",
                            "<32>* It's a shame you wasted it on me...",
                            "<32>* BECAUSE I COULDN'T CARE LESS!"
                         ]
                       : [
                            '<32>* Eyes off the prize!\n* I ain\'t rated "E" for everyone, you know!',
                            "<32>* A weak stare like yours will never compare to Undyne's menacing gaze!"
                         ])
                 ]
               : [ '<32>{#p/monster}* What.\n* What?\n* WHAT!?', "<32>{#p/monster}* It's a living." ],
         f_view: [ "<32>{#p/kidd}{#f/6}* Isn't it pretty...?" ],
         wallsign4: [ '<32>{#p/narrator}* "Foundry Exit"' ],
         f_village_sign1: [ '<32>{#p/narrator}* "hOI!!"\n* "welcom to..."\n* "TEM VILLAGE!!!"' ],
         f_village_sign2: [ '<32>{#p/narrator}* "hOI!!"\n* "u shud check out..."\n* "TEM SHOP!!!"' ],
         f_village_sign3: [ '<32>{#p/narrator}* "yaYA!! i AGREES!!"\n* "shud check..."\n* "TEM SHOP!!!"' ],
         k_piano: pager.create(
            'limit',
            [
               "<25>{#p/undyne}{#f/1}* That's my piano.",
               "<25>{#f/16}* It's not the most modern instrument...",
               "<25>{#f/17}* But it's got a certain charm to it, y'know?",
               '<32>{#p/narrator}* Smells like nerds.'
            ],
            [ '<32>{#p/narrator}* Smells like nerds.' ]
         ),
         k_sink: pager.create(
            'limit',
            [
               '<25>{#p/undyne}{#f/1}* I once forgot to turn the sink off before heading out to work.',
               '<25>{#f/17}* When I got back home, the house was nearly flooded...',
               '<25>{#f/8}* Not that it was a problem for me!',
               '<32>{#p/narrator}* Disappointingly, there is no fur stuck in the drain.'
            ],
            [ '<32>{#p/narrator}* Disappointingly, there is no fur stuck in the drain.' ]
         ),
         k_stove: pager.create(
            'limit',
            [
               '<25>{#p/undyne}{#f/1}* This stove is supposed to be some top-of-the- line MTT thing.',
               '<25>* But, as much as technology advances...',
               '<25>* Nothing will ever beat food home-cooked with fire magic.',
               '<32>{#p/narrator}* The stove has seen a lot of heavy use.'
            ],
            [ '<32>{#p/narrator}* The stove has seen a lot of heavy use.' ]
         ),
         k_bonedrawer: pager.create(
            'limit',
            () => [
               "<25>{#p/undyne}{#f/1}* I'll be honest...",
               "<25>{#f/14}* It's been a long time since I've seen the bottom of that drawer.",
               save.data.b.oops
                  ? '<32>{#p/narrator}* Nothing but bones...'
                  : "<32>{#p/narrator}* This might as well be Papyrus's personal drawer.\n* I love it."
            ],
            () => [
               save.data.b.oops
                  ? '<32>{#p/narrator}* Nothing but bones...'
                  : "<32>{#p/narrator}* This might as well be Papyrus's personal drawer.\n* I love it."
            ]
         ),
         k_otherdrawer: pager.create(
            'limit',
            [
               "<25>{#p/undyne}{#f/17}* Steal anything from that drawer, and you're DEAD.",
               "<32>{#p/narrator}* There's a silverware drawer.\n* It has forks, spoons, knives...",
               '<32>* ...tiny cosmo-spears, plasma sabers, dimensional axes, anti-grav boomerangs...'
            ],
            [
               "<32>{#p/narrator}* There's a silverware drawer.\n* It has forks, spoons, knives...",
               '<32>* ...tiny cosmo-spears, plasma sabers, dimensional axes, anti-grav boomerangs...'
            ]
         ),
         k_fridge: pager.create(
            'limit',
            () => [
               "<25>{#p/undyne}{#f/11}* Cold food and I don't really get along.",
               '<25>{#f/14}* Luckily, Alphys modded my fridge so it heats up food instead!',
               '<25>{#f/1}* Neat, huh?',
               save.data.b.oops
                  ? '<32>{#p/narrator}* There are several pre-heated plates of spaghetti inside.'
                  : '<32>{#p/narrator}* Hot fridge, huh?\n* Well, this woulda been nice to have in the Outlands...'
            ],
            () => [
               save.data.b.oops
                  ? '<32>{#p/narrator}* There are several pre-heated plates of spaghetti inside.'
                  : '<32>{#p/narrator}* Hot fridge, huh?\n* Well, this woulda been nice to have in the Outlands...'
            ]
         ),
         k_window: pager.create(
            'limit',
            () => [
               '<25>{#p/undyne}{#f/16}* Yeah.',
               '<25>{#f/14}* Papyrus tends to go the "scenic route."',
               '<32>{#p/narrator}* Papyrus flew out so fast, it triggered a sonic boom.'
            ],
            [ '<32>{#p/narrator}* Papyrus flew out so fast, it triggered a sonic boom.' ]
         ),
         k_closet: pager.create(
            'limit',
            () => [
               "<25>{#p/undyne}{#f/1}* That's my snack closet.",
               '<25>{#f/17}* What, you thought I had a bedroom back there or something?',
               '<25>{#f/8}* Pfft, hah!\n* Everyone knows I sleep on a cold, hard floor.',
               save.data.b.oops
                  ? "<32>{#p/narrator}* It's locked."
                  : '<32>{#p/narrator}* I get the feeling there\'s more to this "closet" than snacks.'
            ],
            () => [
               save.data.b.oops
                  ? "<32>{#p/narrator}* It's locked."
                  : '<32>{#p/narrator}* I get the feeling there\'s more to this "closet" than snacks.'
            ]
         ),
         k_broadsword: pager.create(
            'limit',
            () => [
               '<25>{#p/undyne}{#f/1}* Humans can be awful, but their history... kinda rules.',
               '<25>{#f/1}* Case in point, this giant energy saber!',
               '<25>{#f/1}* Historically, humans wielded sabers up to ten times their size.',
               '<25>{#f/15}* Not to mention their inter-dimensional portals...',
               '<25>{#f/15}* Colossal parsec-length battleships...',
               '<25>{#f/1}* When I first heard about it, I immediately wanted my own!',
               "<25>{#f/14}* That's why Alphys and I built a giant replica saber together.",
               '<25>{#f/12}* She even figured out all the specs herself!',
               save.data.b.oops
                  ? '<32>{#p/human}* (You feel this weapon has quite a past.)'
                  : '<32>{#p/narrator}* I used to own a toy that looked like this thing.'
            ],
            () => [
               save.data.b.oops
                  ? '<32>{#p/human}* (You feel this weapon has quite a past.)'
                  : '<32>{#p/narrator}* I used to own a toy that looked like this thing.'
            ]
         )
      },
      truetext: {
         unddate: () =>
            save.data.b.oops
               ? [
                    '<32>{#p/narrator}* ...',
                    '<32>{#p/human}* (It sounds like someone is banging their head against an imaginary wall.)',
                    '<32>{#p/human}* (But who?)'
                 ]
               : [
                    '<32>{#p/narrator}* So... that happened.',
                    '<32>* Heh...',
                    "<32>* I'm not really sure what to make of all this, y'know?",
                    "<32>* One second, we're running for our lives from her...",
                    "<32>* And the next second, we're cooking spaghetti with her.\n* And burning her house down.",
                    '<32>{#p/human}* (You hear a small giggle.)',
                    "<32>* ...\n* ...it's...",
                    "<32>* It's been a long time since I've genuinely felt... excited like that.",
                    '<32>* Happy, too.\n* I feel like things are actually going well for once.',
                    '<32>* And, uhm...',
                    "<32>* I'm just glad to have you around, y'know?",
                    "<32>* I might've been harsh on you for certain things, but...",
                    '<32>* It comes from a good place.',
                    '<32>* Heh...',
                    "<32>* You just keep doing what you're doing, alright?\n* And I'll...",
                    "<32>* I'll be here for you."
                 ],
         doge1: () => [
            "<32>{#p/narrator}* Just when I think you've faced an opponent that won't spare you...",
            '<32>* ...they go and do it anyway.',
            '<32>{#p/narrator}* So much for "kill or be killed" huh?'
         ],
         muffet: () => [
            '<32>{#p/narrator}* Getting two elite guards to spare you in one day?',
            "<32>* Now that's something.",
            "<32>* Though, even after this, I still can't be sure...",
            "<32>* Undyne's ruthless...\n* There's no way you could possibly convince her to...",
            '<32>* ...',
            '<32>* Just... be careful...'
         ],
         view1: [ '<32>{#p/narrator}* Heh... look at that.', '<32>* The Citadel...' ],
         view2: [
            "<32>* That's where my dad lives.\n* King Asgore.",
            '<32>* ...',
            "<32>* I can't stop thinking about what Toriel said to you...",
            "<32>* About how he'd kill you...",
            '<32>* I guess from her point of view, it makes sense.',
            "<32>* But if she knew what was really going on up there, she wouldn't be saying that.",
            "<32>* It's just...",
            "<32>* It's frustrating to see her get stuck in this stupid mindset for so long.",
            '<32>* I bet she still thinks of him as a coward...',
            "<32>* Kinda funny, considering SHE'S the one who refuses to leave her precious power station.",
            '<32>* Ugh...',
            '<32>* If things had played out a little differently...',
            '<32>* Maybe none of this woulda happened.',
            '<32>* Maybe...',
            '<32>* ...',
            "<32>* ...maybe I'm just getting carried away...",
            "<32>* I can't even appreciate a simple view...?",
            '<32>* ...\n* Just...',
            "<32>* Don't let Toriel's words get to you, alright?",
            "<32>* That's all I ask."
         ],
         preundyne: [
            '<32>{#p/narrator}* ...',
            "<32>* This isn't gonna be easy.",
            "<32>* I mean, obviously.\n* But you've gotta be ready...",
            "<32>* I don't know if she'll ever let you...",
            '<32>* ...',
            '<32>* ...no...',
            "<32>* No, no, no...\n* I've been doubting you this entire time.",
            '<32>* First Doge, then Muffet...?',
            '<32>* These are NOT monsters that you can just go out and get past peacefully.',
            '<32>* Yet, despite that...\n* You went and did it anyway.',
            '<32>* So you know what?',
            '<32>* You CAN do it.',
            '<32>* No matter what Undyne says, I know you can find a way to get through to her.',
            "<32>* You've practically got this one in the bag!",
            '<32>* So go on.\n* Step forward...',
            '<32>* And rock her world!'
         ],
         undyne1: () =>
            save.data.b.oops
               ? [
                    '<32>{#p/narrator}* ...',
                    '<32>{#p/human}* (It sounds like someone is banging their head against an imaginary wall.)',
                    '<32>{#p/human}* (But who?)'
                 ]
               : [
                    "<32>{#p/narrator}* Well...\n* I'm glad that's over with.",
                    '<32>* Gee...',
                    "<32>* I don't know what to say.",
                    "<32>* I mean... we did it.\n* Undyne's off your back...",
                    '<32>* The rest of the outpost should be an easy journey, right?',
                    '<32>* Right!?',
                    '<32>* ...',
                    '<32>* ...anyway...\n* Well done, partner.',
                    "<32>* I don't think anyone's going to replicate THAT stunt again."
                 ],
         undyne1x: [ '<32>{#p/narrator}* Phew...' ],
         undyne2: pager.create(
            'limit',
            [
               '<32>{#p/narrator}* No... no!',
               "<32>* Don't do this...",
               "<32>* She'll die if she doesn't get the fluid...",
               "<32>* You and I, we've come so far... and it can't end now!",
               '<32>* Not like this...',
               '<32>* Please...'
            ],
            [ '<32>{#p/narrator}* Please...' ]
         ),
         undyne3: [ '<32>{#p/narrator}* ...', '<32>{#p/narrator}* A certain, sudden coldness washes over you.' ]
      },
      undyne1a: [
         "<23>{#p/papyrus}{#f/30}H... HI, UNDYNE!\nI'M HERE WITH MY DAILY REPORT...",
         '<23>UHHH... REGARDING THAT HUMAN I CALLED YOU ABOUT EARLIER...'
      ],
      undyne1b: [ '<23>{#p/papyrus}{#f/30}...HUH?\nDID I FIGHT THEM?' ],
      undyne1c: [ '<23>{#p/papyrusnt}Y-YES!\nOF COURSE I DID!', '<23>I FOUGHT THEM VALIANTLY!' ],
      undyne1d: [ '<23>{#p/papyrus}{#f/30}...WHAT?\nDID I CAPTURE THEM...?' ],
      undyne1e: [ '<23>{#p/papyrus}{#f/30}W-W-WELL...', '<23>NO...' ],
      undyne1f: [ '<23>{#p/papyrus}{#f/30}I-I MEAN, I TRIED VERY HARD TO, B-BUT, IN THE END- {%}' ],
      undyne1g: [ '<23>{#p/papyrus}{#f/30}...W-WHAT?', "<23>YOU'RE GOING TO TAKE THE HUMAN'S SOUL YOURSELF??" ],
      undyne1h: [ "<23>{#p/papyrus}{#f/30}BUT UNDYNE, YOU DON'T H-HAVE TO DESTROY THEM! YOU SEE...", '<23>YOU SEE...' ],
      undyne1i: [ '<23>{#p/papyrus}{#f/30}...', '<23>...I UNDERSTAND.', "<23>I'LL HELP YOU IN ANY WAY I CAN." ],
      undyne1j: () =>
         world.genocide
            ? [
                 '<25>{#p/kidd}{#f/4}* Yo... what?',
                 "<25>{#f/4}* Why's she so mad at you guys?",
                 "<25>{#p/asriel2}{#f/2}* Oh, I don't know...",
                 '<25>{#f/1}* Maybe because of the mass genocide we committed?'
              ]
            : [
                 '<25>{#p/kidd}{#f/7}* Yo... did you see the way she flew into the air!?',
                 '<25>{#f/7}* That...',
                 '<25>{#f/1}* ...was AWESOME!',
                 ...(save.data.n.state_starton_papyrus === 1
                    ? [
                         '<25>{#f/2}* You walked in, and she was just standing there waiting FOREVER and...',
                         '<25>* And then you just...!'
                      ]
                    : [
                         '<25>{#f/2}* You walked in as she was talking and then you moved and...',
                         '<25>* And she was like "NYROOOM" and...!'
                      ])
              ],
      undyne1k: () =>
         world.genocide
            ? [ '<25>{#p/kidd}{#f/3}* Haha...\n* G-good one...', '<25>* ...' ]
            : [ "<25>{#f/1}* If it wasn't so dark in here, maybe she would've SEEN you!!" ],
      undyne1l: () =>
         world.genocide
            ? [ "<25>{#f/1}* I-I'll be... up ahead!\n* Yeah!" ]
            : [ '<25>{#f/3}* Dang...', "<25>* Well c'mon, let's go watch her take down some BADDIES!" ],
      undyne2a: [
         '<25>{#p/kidd}{#f/7}* She... she...',
         '<25>{#f/7}* She TOUCHED me!!',
         '<25>{#f/2}* Man, are you unlucky...',
         "<25>* If you'd have just been TWO inches closer...",
         "<25>{#f/1}* Whew, I'm never gonna wash my face EVER again!"
      ],
      undyne2ax: [
         '<25>{#p/kidd}{#f/1}* She... she...',
         "<25>{#f/1}* She's NOWHERE to be found!?",
         '<25>{#f/3}* Have you guys seen her ANYWHERE out here?',
         '<25>{#p/asriel2}{#f/3}* Who, Undyne?',
         "<25>{#p/kidd}{#f/1}* Yeah!\n* She's totally gone!",
         '<25>{#p/asriel2}{#f/2}* (Hee hee hee.)',
         '<25>{#p/kidd}{#f/4}* Huh??',
         '<25>{#p/asriel2}{#f/1}* Oh, nothing.',
         '<25>{#f/5}* Say, wanna join us for a bit?',
         '<25>{#p/kidd}{#f/3}* Y... you want me to join you?',
         "<25>{#p/asriel2}{#f/4}* Yeah, why not.\n* It'll be fun, I think.",
         "<25>{#p/kidd}{#f/4}* Uhm...\n* I don't know...",
         '<25>{#p/asriel2}{#f/5}* Well, did you know Undyne likes Dr. Alphys?',
         '<25>* I happen to know she wants to marry her.',
         '<25>{#p/kidd}{#f/7}* What!?\n* No way...',
         "<25>{#p/asriel2}{#f/5}* Yeah, and that's not the only thing I know about Undyne.",
         '<25>{#p/kidd}{#f/7}* Tell me more!',
         '<25>{#p/asriel2}{#f/5}* Okay, okay...\n* But only if you come with $(name) and I.',
         '<25>{#p/kidd}{#f/2}* Hmm...',
         '<25>{#f/1}* Deal!\n* Haha.'
      ],
      undyne2b: [ '<25>{#p/kidd}{#f/1}* Yo, what are you waiting for?' ],
      undyne2bx: [ "<25>{#p/kidd}{#f/1}* Let's go!" ],
      undyne2c: [
         "<25>{#f/3}* Hey...\n* I've been thinking...",
         "<25>{#f/4}* The factory's kind of a scary place... so...",
         '<25>{#f/3}* Maybe we should stick together for a little while?',
         '<25>* ...',
         '<25>{#f/1}* Better safe than sorry, haha.'
      ],
      undyne2cx: () => [
         '<25>{#p/kidd}{#f/2}* Man, you shoulda SEEN her during human- chasing practice...',
         '<25>{#f/1}* She was throwing like, a MILLION spears a second!'
      ],
      undyne2d: [ "<25>{#f/1}* I'm right behind you!" ],
      undyne2dx: () => [
         '<25>{#p/kidd}{#f/2}* And when the simulation was about to get away...',
         '<25>{#f/1}* She CORNERED it at the FINAL moment!',
         ...(save.flag.n.ga_asrielKidd2++ < 1
            ? [ '<25>{#p/asriel2}{#f/6}* Good for her, I guess.', '<25>{#p/kidd}{#f/1}* Yeah!!' ]
            : [])
      ],
      undyne2ex: [
         '<25>{#p/kidd}{#f/4}* Uh, hold on...',
         "<25>* If Undyne isn't here, who's going to protect us from those baddies?",
         '<25>{#f/12}* You know...\n* The ones who- {%}',
         "<25>{#p/asriel2}{#f/2}* Eh, I wouldn't worry about it, buddy.",
         '<25>{#f/3}* Besides, if Undyne is as tactically skilled as you say...',
         "<25>{#f/3}* Then clearly she must have a reason.\n* She's smart, right?",
         "<25>{#p/kidd}{#f/4}* Yeah...\n* That's true..."
      ],
      undyne2fx: [
         '<25>{#p/kidd}{#f/1}* Hey... thanks for taking me along, you guys.',
         "<25>{#p/asriel2}{#f/10}* Uh... you're welcome?\n* But we haven't gotten that far, you know...",
         '<25>{#p/kidd}{#f/3}* Well, yeah, but like, I barely get time away from my parents, so...',
         "<25>{#p/asriel2}{#f/2}* You have parents?\n* That's new.",
         "<25>{#p/kidd}{#f/7}* Uh, y-yes, of course I have parents, who doesn't!?",
         '<25>{#p/asriel2}{#f/10}* ...',
         '<25>{#p/kidd}{#f/4}* Yo... why are you looking at me like that?',
         '<25>{#f/8}* Did I do something wrong?'
      ],
      undynefinal1a: [
         '<32>{#p/undyne}* Seven.',
         '<32>* Seven human SOULs and this world will be transformed.',
         '<32>{#x1}* After your SOUL is captured, the force field will be shattered.',
         '<32>{#x2}* Monsters will finally go free.',
         '<32>{#x3}* But first, as is customary for those who make it this far...',
         '<32>{#x4}* I must tell you the tragic tale of our people.',
         '<32>{#x5}* It all began long ago, when...'
      ],
      undynefinal1b: [ '<32>{#p/undyne}* You know what?' ],
      undynefinal1c: [ '<32>{*}{#p/undyne}{#i/25}* SCREW IT!!{^999}' ],
      undynefinal1d: [ '<32>{*}{#p/undyne}{#i/25}* WHY SHOULD I TELL YOU THAT STORY!!{^999}' ],
      undynefinal1e: [ "<32>{*}{#p/undyne}{#i/25}* WHEN YOU'RE ABOUT TO DIE!!{^999}" ],
      undynefinal1f: [ '<32>{*}{#p/undyne}{#i/25}* NGAHHHHHHHHHHHH!!!{^999}' ],
      undynefinal1g: [
         '<25>{#p/undyne}{#f/1}* HUMAN!',
         "<25>* YOU'RE standing in the way of EVERYBODY's hopes and dreams!",
         "<25>{#f/11}* Alphys's history films made me think humans were cool...",
         '<25>{#f/16}* ...with their living spacecraft and inter- dimensional portals.',
         '<25>{#f/4}* But YOU???'
      ],
      undynefinal2a: () => [
         "<25>{#f/7}* You're just a COWARD!",
         ...(save.data.b.f_state_kidd_betray
            ? [ "<25>{#f/13}* ...and you didn't even bother to save your friend." ]
            : [ '<25>* Hiding behind that kid so you could run away from me again!' ]),
         "<25>{#f/9}* I'll admit, I was impressed...",
         ...(save.data.n.state_foundry_doge === 2 && save.data.n.state_foundry_muffet === 2
            ? [
                 '<25>* The way you managed to not only get past the local ELITE squad...',
                 '<25>{#f/10}* But BEFRIEND them???',
                 "<25>{#f/11}* You've got cojones, punk."
              ]
            : [
                 "<25>{#f/10}* The way you've managed to get through without killing anyone?",
                 "<25>{#f/11}* Congratulations, punk.\n* You're a little nicer than the average human."
              ]),
         '<25>{#f/8}* ...AS IF IT ACTUALLY MATTERS!',
         '<25>{#f/4}* You know what would be more valuable to everyone?',
         '<25>{#f/7}* IF YOU WERE DEAD!',
         '<25>{#f/17}* Your life is all that stands between us and our freedom!',
         "<25>{#f/1}* Right now, I can feel everyone's minds racing together!",
         "<25>* Everyone's been waiting their whole lives for this moment!",
         "<25>{#f/9}* But we're not nervous at all.",
         "<25>{#f/17}* When everyone puts their minds together, they can't lose!",
         "<25>{#f/1}* Now, human!\n* Let's end this, right here, right now!",
         "<25>{#f/17}* I'll show you how determined monsters can try be!",
         "<25>{#f/1}* Step forward when you're ready!\n* Fuhuhuhu!"
      ],
      undynefinal2b1: [ "<25>{#f/7}* You're just a ruthless MURDERER!" ],
      undynefinal2b1a: [ '<25>{#f/11}* Self-defense?\n* Please.' ],
      undynefinal2b1b: [
         "<25>{#f/11}* What? You thought I wouldn't know what you were up to in the Outlands?",
         '<25>{#f/1}* Fuhuhu... think again.'
      ],
      undynefinal2b2: () => [
         world.trueKills === 1
            ? "<25>{#f/9}* You didn't kill that monster because you had to."
            : "<25>{#f/9}* You didn't kill those monsters because you had to.",
         '<25>{#f/11}* You did it because it was EASY for you.\n* Because it was FUN.',
         '<25>{#f/16}* Do you think it was fun when I found out?'
      ],
      undynefinal2b2a: [
         '<25>{#f/9}* The canine unit.\n* The local ELITE squad.\n* And many others, too...',
         '<25>* Almost everyone I know and love, dead just like that.'
      ],
      undynefinal2b2b: [
         '<25>{#f/9}* The canine unit, AND the local ELITE squad...',
         "<25>* People I've served with for years, gone in the blink of an eye."
      ],
      undynefinal2b2c: [
         '<25>{#f/9}* The local ELITE squad, who dedicated their lives to royal service...',
         '<25>* Gone in one fell swoop.'
      ],
      undynefinal2b2d: [
         '<25>{#f/9}* The canine unit, who protected that little town for years...',
         '<25>* Gone without a trace.'
      ],
      undynefinal2b2e: [
         '<26>{#f/9}* That ghost, who wanted nothing more than to fuse with their dummy...',
         '<25>* Erased in a mere moment.'
      ],
      undynefinal2b2f: [
         '<25>{#f/9}* That spider, who only wanted to protect and care for the clans...',
         "<25>* Not only is she dead, but spiders' lives are in jeopardy."
      ],
      undynefinal2b2g: [
         '<25>{#f/9}* Doge, who had a strong and unwavering sense of duty...',
         "<25>* Even if putting her life at risk was her job, she's still dead."
      ],
      undynefinal2b2h: [
         '<25>{#f/9}* That big dog, one of the kindest and sweetest dogs ever...',
         '<25>* Eliminated before his time.'
      ],
      undynefinal2b2i: [
         '<25>{#f/9}* Those two dogs, caring for each other through thick and thin...',
         '<25>* Their love and legacy, ripped away in an instant.'
      ],
      undynefinal2b2j: [
         '<25>{#f/9}* That little dog who wanted nothing more than to be pet...',
         '<25>* Only to be met with a ruthless attack.'
      ],
      undynefinal2b2k: [
         '<25>{#f/9}* Doggo, who I PERSONALLY looked after for some time...',
         '<25>* Now dead thanks to the whims of a single human.'
      ],
      undynefinal2b2l: [
         "<25>{#f/9}* That woman in the Outlands... I didn't know her, but...",
         "<25>* She hasn't been seen since you arrived in Starton."
      ],
      undynefinal2b2m: [
         '<25>{#f/9}* Every. Single. Monster. who spent their lives in the factory...',
         '<25>* Only to have it all snatched away.'
      ],
      undynefinal2b2n: [
         '<25>{#f/9}* Every. Single. Monster. who lived peacefully in Starton...',
         '<25>* Only to meet an untimely end.'
      ],
      undynefinal2b2o: [
         '<25>{#f/9}* Those monsters who spent their lives here in the factory...',
         '<25>* Only to have it all be undone.'
      ],
      undynefinal2b2p: [
         '<25>{#f/9}* Those monsters who lived peacefully in Starton...',
         '<25>* Slaughtered in cold blood.'
      ],
      undynefinal2b2q: [
         '<25>{#f/9}* One monster dead from each area thus far...',
         "<25>{#f/13}* It's like you have some kind of per-area kill quota."
      ],
      undynefinal2b2r: () => [
         world.trueKills === 1
            ? "<25>{#f/9}* That monster in the Outlands...\n* I didn't really know them, but..."
            : "<25>{#f/9}* Those monsters in the Outlands...\n* I didn't really know them, but...",
         "<25>* Thanks to you, they're dead now."
      ],
      undynefinal2b2s: [
         '<25>{#f/9}* Even if it was just one monster...',
         "<25>* That's still one less SOUL that'll get to see the stars one day."
      ],
      // 2B2T :flushed: :flushed: :flushed:
      undynefinal2b2t: [
         '<25>{#f/9}* At least two monsters left home for the last time today.',
         '<25>* Thanks to you, their families will never see them again.'
      ],
      undynefinal2b3: [
         "<25>{#f/11}* Do you think that's FUN?",
         '<25>* ...',
         '<25>{#f/17}* Well guess what, punk.',
         '<25>* Your time is up.',
         '<25>{#f/4}* All the pain you inflicted on the fallen...',
         "<25>{#f/7}* Every hope, every dream you've turned to dust...",
         "<25>{#f/1}* This hero's gonna send it all right back through her spear!",
         '<25>{#f/4}* NGAHHH!!!',
         "<25>{#f/5}* I'll show you how determined monsters truly are!",
         "<25>{#f/17}* Come on!\n* Step forward and let's end this!"
      ],
      undynefinal2c1: [ '<32>* ...', '<32>* Forget it.' ],
      undynefinal2c2: [
         '<25>{#f/16}{#x1}* Look.',
         "<25>* Papyrus didn't come to his meeting today.",
         '<25>{#f/19}* ...',
         '<25>{#x2}* Say what you want about him.',
         "<25>{#f/18}* He's weird, he's naive, he's self-absorbed...",
         '<25>{#f/20}{#x3}* But Papyrus has NEVER missed a meeting.',
         '<25>{#f/18}{#x4}* And no matter what time you call him on the phone...',
         '<25>{#f/20}{#x5}* He ALWAYS answers within the first two rings.',
         '<25>* ...',
         "<25>{#f/18}{#x6}* But now he's gone.",
         "<25>{#f/22}{#x7}* And his brother isn't around, either.",
         '<25>* ...',
         '<25>{#f/18}* What did you do to him?',
         '<25>{#f/11}{#x8}* What did you DO TO HIM?',
         '<25>{#f/16}{#x9}* Papyrus, who I have trained every day...',
         "<25>{#f/19}* Even though I KNOW he's too goofy to ever hurt anyone...",
         '<25>* ...',
         '<25>{#f/16}{#x10}* Go ahead.\n* Prepare however you want.',
         '<25>{#f/20}* But when you step forward...',
         '<25>{#f/11}{#x11}* I will KILL you.'
      ],
      undynefinal3: () => [
         ...(save.data.n.state_starton_papyrus === 1
            ? [ '<25>{#p/undyne}{#f/21}* Alright, then.', '<25>{#f/19}* ...' ]
            : world.trueKills > 1
            ? [ '<25>{#p/undyne}{#f/11}* You asked for it, punk.', '<25>{#f/9}* Ready or not...' ]
            : [ "<25>{#p/undyne}{#f/1}* That's it, then...!", '<25>{#f/17}* No more running away!' ])
      ],
      undynefinal3x: [ '<25>{#f/7}{*}* HERE I COME!!!!!!!{#x1}{^999}' ],
      walktext: {
         bird: () => [
            '<25>{#p/kidd}{#f/4}* Dead end...',
            world.genocide
               ? '<25>{#f/3}* He must be on the other side of the gap by now, haha.'
               : '<25>{#f/3}* The bird must be busy right now, haha.'
         ],
         birdx: [ '<32>{#p/narrator}* ...but nobody came.' ],
         kidd1: () => [
            '<25>{#p/kidd}{#f/4}* Do you ever get the feeling this place is hiding something?',
            ...(world.genocide && save.flag.n.ga_asrielKiddWalk++ < 1
               ? [ "<25>{#p/asriel2}{#f/6}* I don't see anything wrong.", '<25>{#p/kidd}{#f/4}* Yo... suit yourself...' ]
               : [])
         ],
         path1: () =>
            save.data.n.state_foundry_muffet === 1
               ? [
                    "<25>{#p/kidd}{#f/8}* I feel like I'm gonna puke...",
                    save.data.n.state_foundry_kidddeath > 5
                       ? '<25>* We killed so many monsters...'
                       : save.data.n.state_foundry_kidddeath > 1
                       ? '<25>* We killed other monsters...'
                       : '<25>* We killed a monster...'
                 ]
               : [
                    '<25>{#p/kidd}{#f/1}* Did I ever tell you about how we got shuttle pilot lessons!?',
                    '<25>{#p/kidd}{#f/7}* It was EPIC!'
                 ],
         path2: () =>
            save.data.n.state_foundry_muffet === 1
               ? [
                    save.data.b.f_state_kidd_fight
                       ? '<25>{#p/kidd}{#f/4}* I mean, you TOLD me to fight...'
                       : '<25>{#p/kidd}{#f/4}* I mean, you did ALL the attacking...',
                    '<25>{#p/kidd}{#f/8}* But did you really...\n* ...m-mean to do...\n* ...that...?'
                 ]
               : [
                    '<25>{#p/kidd}{#f/2}* One day, that short skeleton and his brother subbed in...',
                    '<25>{#p/kidd}{#f/2}* And, this is a secret, but...',
                    '<25>{#f/1}* They let me fly around the outpost all by MYSELF!!'
                 ],
         path3: () =>
            save.data.n.state_foundry_muffet === 1
               ? [
                    '<25>{#p/kidd}{#f/4}* I never wanted to hurt anyone, I just...\n* I...',
                    '<25>{#p/kidd}{#f/8}* I just wanna wake up...\n* Please... let it all be a bad dream...'
                 ]
               : [
                    "<25>{#p/kidd}{#f/1}* Maybe one day I'll be a real pilot, with my own starship.",
                    "<25>{#p/kidd}{#f/1}* It'd have FLAMES painted on the side, and HUGE wings, and...",
                    "<25>{#p/kidd}{#f/6}* Man, that'd be so cool..."
                 ],
         path4: () =>
            save.data.n.state_foundry_muffet === 1
               ? [ '<25>{#p/kidd}{#f/8}* I...', '<25>{#f/8}* I...', "<25>{#f/5}* I'm just... \n* ...gonna be quiet." ]
               : [
                    '<25>{#p/kidd}{#f/2}* We could go anywhere in the universe, dude...',
                    '<25>{#p/kidd}{#f/1}* And the best part?\n* No more school, like, EVER!'
                 ],
         path5: [ '<25>{#p/kidd}{#f/4}* Wait...' ],
         path6: () =>
            save.data.n.state_foundry_muffet === 1
               ? [
                    "<25>{#p/kidd}{#f/8}* You can't get over that gap alone, dude...",
                    '<25>{#p/kidd}{#f/8}* ...',
                    '<25>{#p/kidd}{#f/5}* ...let me help.'
                 ]
               : [
                    '<25>{#p/kidd}{#f/2}* You sure you can get across that gap?',
                    '<25>{#p/kidd}{#f/1}* Yo, let me help you!'
                 ],
         path7: () =>
            save.data.n.state_foundry_muffet === 1
               ? [ '<25>{#p/kidd}{#f/8}* Climb on.' ]
               : [ '<25>{#p/kidd}{#f/1}* Climb on!' ],
         path8: () =>
            save.data.n.state_foundry_muffet === 1
               ? [
                    '<25>{#p/kidd}{#f/4}* ...\n* Well...',
                    '<25>{#f/8}* If you never see me again...\n* Tell my parents...',
                    "<25>{#f/5}* ...\n* They're better off without me."
                 ]
               : [ "<25>{#p/kidd}{#f/1}* Don't worry, dude!\n* I always find my own way around!" ],
         prechase: [
            '<25>{#p/kidd}{#f/4}* Hey... uh...\n* This place gives me the creeps.',
            '<25>{#f/3}* Can we turn around now?'
         ],
         snailcom: [
            '<25>{#p/kidd}{#f/9}* Napstablook and I played Thundersnail here one time...',
            '<25>* Have you ever...?',
            '<25>{#p/asriel2}{#f/10}* Um... no?',
            '<25>{#f/4}* Not in this timeline, anyway.',
            '<25>{#p/kidd}{#f/9}* Timeline?'
         ],
         undynecom: [
            "<25>{#p/kidd}{#f/11}* Oh, it's...\n* This is Undyne's house...!",
            "<25>{#p/asriel2}{#f/8}* Thankfully, Undyne's not here right now.",
            '<25>{#f/6}* If all goes to plan, she never will be again.'
         ],
         trashcom: [
            '<25>{#p/asriel2}{#f/13}* Oh, hey...\n* This is where we...',
            '<25>{#f/13}* Where you...',
            '<25>{#f/4}* ...',
            '<25>{#f/3}* Oh, $(name)...\n* Silly, silly $(name)...',
            '<25>{#p/kidd}{#f/9}* ...?',
            "<25>{#p/asriel2}{#f/6}* It's nothing.",
            "<25>{#f/3}* Just a little reminder, that's all.",
            '<25>{#p/kidd}{#f/9}* Oh...'
         ]
      },
      finalpre: [ choicer.create('* (Continue to Aerialis?)', 8, 7, 'No', 'Yes') ],
      kitchencall: () =>
         save.data.n.plot_date < 1
            ? [
                 '<32>{#p/event}* Ring, ring...',
                 '<18>{#p/papyrus}HUMAN!\nI WAS THINKING.',
                 save.data.b.flirt_papyrus
                    ? '<18>WE SHOULD TOTALLY DATE SOMETIME!'
                    : '<18>WE SHOULD TOTALLY HANG OUT SOMETIME!',
                 "<18>{#f/5}AND BESIDES... I HAVEN'T SEEN YOU IN A WHILE.",
                 "<18>{#f/0}IT'LL BE GOOD TO CATCH UP!",
                 "<18>{#f/0}WELL, MEET ME AT MY HOUSE WHEN YOU'RE READY.",
                 '<18>{#f/9}THIS IS GOING TO BE FANTASTIC!'
              ]
            : [
                 '<32>{#p/event}* Ring, ring...',
                 '<18>{#p/papyrus}HUMAN!\nI WAS THINKING.',
                 '<18>SO, YOU KNOW HOW WE SPENT TIME TOGETHER?',
                 '<18>{#f/5}WELL... I THINK UNDYNE NEEDS TO DO THE SAME.',
                 '<18>{#f/4}BESIDES, I BET YOU TWO WOULD BE GREAT FRIENDS...',
                 save.data.b.flirt_papyrus ? '<18>{#f/6}...JUST FRIENDS!' : '<18>{#f/0}JUST LIKE WE WERE!',
                 "<18>{#f/0}WELL, MEET ME AT UNDYNE'S HOUSE WHEN YOU'RE READY.",
                 '<18>{#f/9}THIS IS GOING TO BE FANTASTIC!'
              ],
      unddate0: () =>
         world.trueKills > 0
            ? [
                 "<18>{#p/papyrus}SO YOU'RE HERE.",
                 "<18>{#f/5}UNDYNE... ISN'T READY TO BEFRIEND YOU RIGHT NOW.",
                 '<18>{#f/5}SHE BLAMES HERSELF FOR LETTING YOU GET AWAY...',
                 '<18>{#f/6}AND THAT YOU... DESERVE TO DIE??',
                 '<18>{#f/7}WELL, I DISAGREE!',
                 "<18>{#f/0}BUT THAT'S OKAY.",
                 "<18>{#f/0}I'LL JUST WAIT HERE UNTIL SHE RETURNS."
              ]
            : [
                 '<18>{#p/papyrus}OHO, THE HUMAN ARRIVES!',
                 ...(save.data.n.state_foundry_undyne > 0
                    ? [
                         "<18>{#f/4}...THOUGH, I'M NOT QUITE SURE WHERE UNDYNE IS.",
                         "<18>{#f/5}SHE ISN'T NORMALLY OUT THIS LONG...",
                         "<18>{#f/6}AND SHE WON'T EVEN ANSWER THE PHONE!",
                         "<18>{#f/0}WELL, I'LL JUST WAIT HERE UNTIL SHE RETURNS."
                      ]
                    : [
                         '<18>{#f/4}ARE YOU UP FOR THE DAUNTING TASK...',
                         '<18>{#f/1}OF BEFRIENDING THE CAPTAIN OF THE ROYAL GUARD!?!?',
                         choicer.create('* (Befriend Undyne?)', 8, 7, 'Yes', 'No')
                      ])
              ],
      unddate0x: () =>
         world.trueKills > 0 || save.data.n.state_foundry_undyne > 0
            ? save.data.n.plot > 64
               ? [ "<18>{#p/papyrus}{#f/5}I'VE BEEN WAITING HERE FOR UNDYNE FOR SO LONG..." ]
               : save.data.n.plot > 48
               ? [
                    '<18>{#p/papyrus}{#f/5}HUMAN...',
                    "<18>I GET THE FEELING YOU WON'T BE SEEING HER.",
                    "<18>{#p/papyrus}{#f/9}BUT THAT DOESN'T MEAN I WON'T STOP WAITING FOR HER!"
                 ]
               : [
                    "<18>{#p/papyrus}{#f/0}UNDYNE'S NOT HERE RIGHT NOW.",
                    "<18>{#p/papyrus}{#f/4}YOU'LL HAVE TO WAIT FOR HER LIKE I ALWAYS DO."
                 ]
            : [
                 '<18>{#p/papyrus}{#f/0}OKAY!\nALL READIED UP TO HANG OUT?',
                 choicer.create('* (Befriend Undyne?)', 8, 7, 'Yes', 'No')
              ],

      // outside: start
      unddate1a: [ '<18>{#p/papyrus}{#f/0}OKAY!\nSTAND BEHIND ME!' ],
      unddate1b: pager.create(
         'limit',
         [ '<18>{#p/papyrus}{#f/4}HMM... STILL GETTING READY?', '<18>{#f/0}WELL, TAKE YOUR TIME!' ],
         [ '<18>{#p/papyrus}{#f/0}TAKE YOUR TIME!' ]
      ),
      unddate2a: [ '<18>{#p/papyrus}{#f/4}PSST...\nGIVE HER THIS.' ],
      unddate2b: [ '<18>{#f/0}SHE LOVES THESE!' ],
      unddate3: [
         '<25>{#p/undyne}{#f/14}* Hi, Papyrus!',
         '<25>{#f/1}* Ready for your extra- private, one-on-one training?',
         '<18>{#p/papyrus}YOU BET I AM!',
         '<18>{#f/9}AND I BROUGHT A FRIEND!'
      ],
      unddate4: [
         "<25>{#p/undyne}{#f/1}* Hi, I don't think we've...",
         '<25>{#f/4}* ...',
         '<18>{#p/papyrus}...',
         '<25>{#p/undyne}{#f/5}* ...',
         '<18>{#p/papyrus}{#f/5}...',
         "<25>{#p/undyne}{#f/17}* Why don't.\n* You two.\n* Come in?"
      ],

      // inside: pre-sitdown
      unddate5: [ '<18>{#p/papyrus}HERE, UNDYNE.', '<18>MY FRIEND WANTED YOU TO HAVE THIS!' ],
      unddate5x: [
         '<25>{#p/undyne}{#f/17}* There you are!',
         "<25>{#f/1}* We've been waiting here FOREVER for you!",
         "<18>{#p/papyrus}{#f/4}AND, DON'T WORRY, I ALREADY SHOWED UNDYNE YOUR GIFT.",
         '<18>{#f/0}SHE LOVED IT!',
         '<25>{#p/undyne}{#f/14}* Yeah, uh...',
         '<25>{#f/12}* I sure did!'
      ],
      unddate6: [ '<25>{#p/undyne}{#f/1}* Uhhh... thanks.' ],
      unddate7: [ "<25>{#f/14}* I'll, uh, put it with the others." ],
      unddate8: [ '<25>* So are we ready to start?' ],
      unddate9: [
         '<18>{#p/papyrus}{#f/1}WHOOPSY DOOPSY!\nI JUST REMEMBERED!',
         '<18>{#f/0}I HAVE TO CHECK ON MY BROTHER!!',
         '<18>{#f/9}YOU TWO HAVE FUN!!!'
      ],
      unddate10: [
         '<25>{#p/undyne}{#f/11}* ...',
         '<25>* So why are YOU here?',
         '<25>* To rub your victory in my face?',
         '<25>* To humiliate me even further?',
         '<25>{#f/4}* IS THAT IT?',
         choicer.create('* (What do you say?)', 8, 7, 'No', 'Yes')
      ],
      unddate11a: [
         '<25>{#p/undyne}{#f/11}* Then why are you here?',
         '<25>{#f/1}* Wait, I get it.',
         "<25>* You think that I'm gonna be friends with you, huh?",
         '<25>{#f/17}* Right???',
         choicer.create('* (What do you say?)', 8, 7, 'Yes', 'No')
      ],
      unddate11a1a: [
         '<25>{#p/undyne}{#f/14}* Really?\n* How delightful!\n* I accept!',
         "<25>{#f/8}* Let's all frolick in the fields of friendship!",
         '<25>{#f/7}* ...NOT!',
         "<25>{#f/1}* You're the enemy of everyone's hopes and dreams!",
         "<25>* If you weren't my houseguest, I'd kick you out right now!",
         '<25>{#f/5}* ...'
      ],
      unddate11a1b: [
         '<25>{#p/undyne}{#f/15}* Then again...',
         '<25>{#f/17}* ...',
         '<25>{#f/4}* WHAT ARE YOU LOOKING AT?',
         "<25>{#f/5}* I WOULDN'T MAKE FRIENDS WITH YOU JUST TO IMPRESS SOMEONE???",
         '<25>{#f/12}* Not at all!',
         '<25>{#f/1}* In fact, my sudden change of mind...',
         '<25>{#f/7}* Comes from nothing but a burning passion for VENGEANCE!'
      ],
      unddate11a2: [
         '<25>{#p/undyne}{#f/13}* ...',
         '<25>{#f/11}* So... let me get this straight.',
         '<25>* First, you parade into my house.',
         "<25>{#f/7}* And then you don't give me a reason WHY??",
         "<25>{#f/4}* You little BRAT!\n* If you weren't my houseguest, I'd...!",
         '<25>{#f/5}* ...',
         '<25>{#f/4}* ...no, you know what?',
         "<25>{#f/7}* I'll prove you WRONG.",
         "<25>{#f/1}* And we aren't JUST going to be friends."
      ],
      unddate11b: [
         '<25>{#p/undyne}{#f/4}* Oh-ho-ho.',
         "<25>{#f/7}* Well, I've got news for you, BRAT.",
         "<25>{#f/1}* You're on MY battlefield now!",
         "<25>{#f/7}* And you AREN'T going to humiliate me.",
         "<25>{#f/11}* No.\n* I'll TELL you what's going to happen.",
         "<25>{#f/17}* We're going to hang out.",
         "<25>{#f/17}* We're going to have a good time.",
         '<25>{#f/7}* We\'re going to be "friends."'
      ],
      unddate12a: [
         "<25>{#f/1}* I'll make you like me so much...",
         "<25>{#f/7}* You won't be able to think of anyone else!"
      ],
      unddate12b: [ "<25>{#f/8}* Fuhuhuhu!\n* It's the PERFECT REVENGE!!" ],
      unddate12c: [ "<25>{#f/12}* Err... why don't you have a seat?" ],
      unddate13: [
         '<25>{#p/undyne}{#f/14}* Need anything?',
         choicer.create('* (What do you say?)', 8, 7, 'Hungry', 'Book', 'Home', 'Nothing')
      ],
      unddate13a1: [
         '<25>{#p/undyne}{#f/1}* You want a snack or something?',
         '<25>{#f/1}* Let me see what I have in the closet.'
      ],
      unddate13a2: [ '<25>{#p/undyne}{#f/1}* Ah... this should do nicely.' ],
      unddate13a3: [ '<25>{#p/undyne}{#f/14}* All yours...\n* Fuhuhu.' ],
      unddate13a4a: [ "<32>{#p/human}* (You're carrying too much.)" ],
      unddate13a4b: [ '<32>{#p/human}* (You got the Odd Snack.)' ],
      unddate13a5: [
         "<25>{#p/undyne}{#f/11}* Listen punk, it's one snack per person here.",
         '<25>* Get with the program or get lost.'
      ],
      unddate13b: pager.create(
         'limit',
         [
            '<25>{#p/undyne}{#f/13}* A book???\n* Does this look like a librarby to you?',
            "<25>{#f/1}* The only books you'll find in the kitchen are cookbooks!",
            "<25>{#f/4}* Which I don't use, because cooking is supposed to be an ART.",
            '<25>{#f/5}* Why does nobody seem to get that???',
            '<25>{#f/14}* Well, let me know if you need anything else!'
         ],
         [
            "<25>{#p/undyne}{#f/1}* Look, there's a librarby in Starton.",
            "<25>{#f/1}* If you really want to read a book, that's your best bet.",
            '<25>{#f/7}* But not right now!!!',
            '<25>{#f/14}* ...let me know if you need anything else.'
         ]
      ),
      unddate13c: pager.create(
         'limit',
         [
            '<25>{#p/undyne}{#f/3}* ...',
            '<25>{#f/17}* This IS home.',
            "<25>{#f/17}* You're already HERE.",
            '<25>{#f/16}* Though, there was an old place on the home planet...',
            '<25>{#f/9}* ...',
            '<25>{#f/19}* But nothing can bring that back.',
            '<25>{#f/14}* Well, let me know if you need anything else!'
         ],
         [
            "<25>{#p/undyne}{#f/16}* I'd give description of that old place if I could, y'know.",
            "<25>{#f/16}* But the memory has faded... it's just a feeling now.",
            '<25>{#f/12}* ...let me know if you need anything else.'
         ]
      ),
      unddate13d: [ "<25>{#p/undyne}{#f/14}* Well, alright.\n* Remember, I'm here if you change your mind!" ],
      unddate14: [ choicer.create('* (Sit down?)', 8, 7, 'Yes', 'No') ],
      unddate15a: [ '<25>{#p/undyne}{#f/14}* Comfortable?', "<25>{#f/14}* I'll get you something to drink." ],
      unddate15b: [
         '<25>{#p/undyne}{#f/14}* Comfortable?',
         "<25>{#f/14}* I'll get you something to...",
         '<25>{#f/17}* ...',
         '<25>{#f/17}* What are you still doing with a cup of dampening fluid?',
         '<25>{#f/17}* Throw that thing away!',
         '<32>{#p/narrator}* ...'
      ],
      unddate15c: [
         '<32>{#p/human}* (You discarded the electro- dampening fluid.)',
         '<25>{#p/undyne}{#f/14}* Much appreciated.'
      ],
      unddate16: [ '<25>{#p/undyne}{#f/14}* All set!\n* What would you like?' ],
      unddate17: [
         "<25>{#p/undyne}{#f/17}* HEY!\n* DON'T GET UP!",
         "<25>{#f/17}* YOU'RE THE GUEST!\n* SIT DOWN AND ENJOY YOURSELF!",
         '<25>{#f/17}* ...'
      ],
      unddate18: [
         '<25>{#p/undyne}{#f/12}* Um, why not just point to what you want?',
         '<25>{#f/12}* You can use the spear!'
      ],
      unddate19x: '* Move left and right to aim.\n* Select with [Z].',
      unddate19y: [
         '* Undyne\n* Mad fish lady.',
         '* Snack Closet\n* Tons of goodies in there!',
         '* Water\n* The smart choice.',
         '* Sugar\n* Great for sweetening tea.',
         '* Exoberry Punch\n* Made locally... very locally.',
         "* Hot Cocoa\n* It's a blue cylinder.",
         '* Tea\n* Blatantly correct choice?',
         '* Fridge\n* Too much for one meal.',
         '* Energy Saber\n* Legendary human weapon.'
      ],
      unddate20: [
         pager.create(
            'limit',
            [ '<25>{#p/undyne}{#f/13}* Are you...\n* Hitting on me???' ],
            [ '<25>{#p/undyne}{#f/13}* ?????' ]
         ),
         pager.create(
            'limit',
            [
               "<25>{#p/undyne}{#f/17}* You're supposed to be choosing a drink??",
               "<25>{#f/1}* There's nothing in that closet but snacks."
            ],
            [ "<25>{#p/undyne}{#f/1}* Really, it's all just snacks in there.\n* Nothing more!" ]
         ),
         pager.create(
            'limit',
            [
               '<25>{#p/undyne}{#f/13}* You want WATER?',
               '<25>{#f/11}* Just... water.',
               '<25>{#f/11}* With no added flavors or sugars or anything.',
               '<25>{#f/11}* ...'
            ],
            [ '<25>{#f/11}* ...' ]
         ),
         pager.create(
            'limit',
            [
               "<25>{#p/undyne}{#f/12}* That sugar's only there for the tea.",
               "<25>{#f/7}* I'm not gonna give you a cup of sugar!"
            ],
            [ "<25>{#p/undyne}{#f/14}* The sugar's for the tea, mmm'kay?" ]
         ),
         pager.create(
            'limit',
            [
               '<25>{#p/undyne}{#f/1}* Ah... exoberry punch.',
               "<25>{#f/14}* Well, Papyrus loves this stuff, so I guess it's alright."
            ],
            [ '<25>{#p/undyne}{#f/17}* You gonna pick something or what?' ]
         ),
         pager.create(
            'limit',
            [ '<25>{#p/undyne}{#f/14}* Nothing like a good cup of hot cocoa.' ],
            [ '<25>{#p/undyne}{#f/17}* Hot cocoa, right?' ]
         ),
         pager.create('limit', [ '<25>{#p/undyne}{#f/14}* Tea, huh?' ], [ "<25>{#p/undyne}{#f/12}* So it's tea, right?" ]),
         pager.create(
            'limit',
            [
               '<25>{#p/undyne}{#f/4}* The fridge!?\n* You want to have the entire fridge!?',
               '<25>{#p/undyne}{#f/17}* No!'
            ],
            [ '<25>{#p/undyne}{#f/17}* I said no!' ],
            [ '<25>{#p/undyne}{#f/17}* No means no!' ],
            [ '<25>{#p/undyne}{#f/17}* Do you not know what the word "no" means?' ],
            [ '<25>{#p/undyne}{#f/17}* ...clearly not!' ],
            [ '<25>{#p/undyne}{#f/17}* ...' ]
         ),
         pager.create(
            'limit',
            [
               '<25>{#p/undyne}{#f/1}* The energy saber...',
               "<25>{#p/undyne}{#f/12}* That's the weapon the humans wielded against us in the war.",
               '<25>{#p/undyne}{#f/16}* ...one of them, anyway.'
            ],
            [ "<25>{#p/undyne}{#f/17}* It's not for sale." ]
         )
      ],
      unddate21: [ choicer.create('* (Choose this drink?)', 8, 7, 'Yes', 'No') ],
      unddate22: [
         [ '<25>{#p/undyne}{#f/16}* Okay, I guess...' ],
         [ "<25>{#p/undyne}{#f/1}* Let's fruit-punch your ticket to hydration!" ],
         [ '<25>{#p/undyne}{#f/14}* No time like hot cocoa time!' ],
         [ '<25>{#p/undyne}{#f/14}* Tea, coming right up.' ]
      ],
      unddate22x: [ "<25>{#p/undyne}{#f/12}* It'll take a moment for the water to boil." ],
      unddate22y: [ '<25>{#p/undyne}{#f/12}* All done!' ],
      unddate23: [ '<25>{#p/undyne}{#f/1}* Here we are.' ],
      unddate24: [
         [ '<25>{#p/undyne}{#f/12}* Enjoy...?' ],
         [ "<25>{#p/undyne}{#f/12}* Careful, it's sour." ],
         [ "<25>{#p/undyne}{#f/14}* Careful, it's hot." ],
         [ "<25>{#p/undyne}{#f/14}* Careful, it's hot." ]
      ],
      unddate25: [
         [
            '<25>{#p/undyne}{#f/17}* Seriously?\n* Just drink it already!',
            '<32>{#p/human}* (You take a sip of the water.)',
            "<32>{#p/narrator}* It, uh... yeah, it's water.\n* So it tasted fine.",
            "<25>{#p/undyne}{#f/12}* Well, you look like you're satisfied."
         ],
         [
            "<25>{#p/undyne}{#f/17}* What's the holdup?\n* Just drink it already!",
            '<32>{#p/human}* (You take a sip of the punch.)',
            "<32>{#p/narrator}* It's so sour, your lips are already puckered up..."
         ],
         [
            "<25>{#p/undyne}{#f/17}* It's not that hot!!\n* Just drink it already!",
            '<32>{#p/human}* (You take a sip of the hot cocoa.)',
            "<32>{#p/narrator}* It's burning..."
         ],
         [
            "<25>{#p/undyne}{#f/17}* It's not that hot!!\n* Just drink it already!",
            '<32>{#p/human}* (You take a sip of the tea.)',
            "<32>{#p/narrator}* It's burning..."
         ]
      ],
      unddate25x: [
         "<32>* But other than that, it's pretty good.",
         "<25>{#p/undyne}{#f/12}* It's good, right?",
         '<25>{#f/8}* Nothing but the best for my ABSOLUTELY SPECIAL FRIEND!'
      ],
      unddate26: [ '<25>{#p/undyne}{#f/12}* Hey...' ],
      unddate27: [
         [
            "<25>{#p/undyne}{#f/12}* You know, it's kinda funny you chose THAT drink...",
            '<25>{#f/12}* Water, I mean.',
            '<25>{#f/1}* Asgore and I once joked about how humans are made of it...',
            "<25>{#f/8}* And that if we drank it, we'd be CONSUMING humanity!!!",
            "<25>{#f/16}* ...well, he didn't really find it funny.",
            "<25>{#f/16}* The guy's got a soft spot for just about everyone..."
         ],
         [
            "<25>{#p/undyne}{#f/12}* You know, it's kinda neat you picked out THAT drink...",
            '<25>{#f/12}* Exoberry punch...',
            '<25>{#f/1}* Alphys and Papyrus sort of "invented" it together.',
            "<25>{#f/16}* I wasn't the biggest fan, but when I showed it to Asgore...",
            "<25>{#f/12}* Well, let's just say he had it put into mass- production."
         ],
         [
            "<25>{#p/undyne}{#f/12}* You know, it's kinda cool you went with THAT drink...",
            '<25>{#f/12}* Hot cocoa...',
            '<25>{#f/1}* This one time, they had to fix up the atmospheric thingy.',
            '<25>{#f/16}* No heat, very little air... it got colder, and colder...',
            '<25>{#f/1}* Then, Asgore came over and offered me a hot cocoa.',
            '<25>{#f/12}* We sat together in this very room...'
         ],
         [
            "<25>{#p/undyne}{#f/12}* You know, it's kinda weird you ended up liking THAT tea...",
            '<25>{#f/12}* Starling tea...',
            "<25>{#f/1}* That's always been Asgore's favorite kind."
         ]
      ],
      unddate28: [
         '<25>{#p/undyne}{#f/14}* Actually, now that I think about it...',
         '<25>{#f/12}* You kinda remind me of him.',
         "<25>{#f/8}* You're both total weenies!",
         '<25>{#f/9}* ...sort of.'
      ],
      unddate29: [
         "<25>{#p/undyne}{#f/16}* Y'know, I was a pretty hotheaded kid.",
         '<25>* Once, to prove I was the strongest, I tried to fight Asgore.',
         '<25>{#f/17}* Emphasis on TRIED.',
         "<25>{#f/1}* I couldn't land a single blow on him!",
         '<25>* And worse, the whole time, he refused to fight back!',
         '<25>{#f/9}* I was so humiliated...',
         '<25>{#f/16}* Afterwards, he apologized and said something goofy...',
         '<25>* "Excuse me, do you want to know how to beat me?"',
         '<25>{#f/1}* I said yes, and from then on, he trained me.',
         '<25>{#f/16}* One day, during practice, I finally knocked him down.',
         '<25>{#f/9}* I felt... bad.',
         '<25>{#f/12}* But he was beaming...',
         '<25>{#f/1}* I had never seen someone more proud to get their butt kicked.',
         '<25>* Anyway, long story short, after completing my training...',
         '<25>{#f/14}* I took up leadership of the Royal Guard!',
         "<25>{#f/8}* So I'm the one who gets to train dorks to fight!",
         '<25>{#f/1}* ...like, uh, Papyrus.'
      ],
      unddate30: [
         '<25>{#f/16}* But, um, to be honest...',
         "<25>{#f/16}* ...I don't know if...",
         '<25>{#f/9}* I can ever let Papyrus into the Royal Guard.',
         "<25>{#f/17}* Don't tell him I said that!",
         "<25>{#f/10}* He's just...\n* Well...",
         "<25>{#f/9}* I mean, it's not that he's weak.",
         "<25>{#f/17}* He's actually pretty freaking tough!",
         "<25>{#f/10}* It's just that...\n* He's...",
         "<25>{#f/17}* He's too innocent and nice!!!",
         '<25>{#f/16}* I mean, look, he was SUPPOSED to capture you...',
         '<25>{#f/11}* And he ended up being FRIENDS with you instead.',
         '<25>{#f/4}* I could NEVER send him into battle!',
         "<25>{#f/9}* He'd get ripped into little smiling shreds.",
         "<25>{#f/12}* That's part of why...",
         '<25>{#f/12}* I started teaching him how to cook, you know?',
         '<25>{#f/9}* So, um, maybe he can do something else with his life.'
      ],
      unddate31: [ '<25>{#p/undyne}{#f/12}* Oh, sorry, I was talking for so long...' ],
      unddate32: [
         [ "<25>{#f/12}* You're out of water, aren't you?" ],
         [ "<25>{#f/12}* You're out of punch, aren't you?" ],
         [ "<25>{#f/12}* You're out of cocoa, aren't you?" ],
         [ "<25>{#f/12}* You're out of tea, aren't you?" ]
      ],
      unddate33: [ "<25>{#p/undyne}{#f/12}* Heh, don't worry.\n* I'll get you some more." ],
      unddate34: [ '<25>{#p/undyne}{#f/17}* Wait a second...', '<25>{#f/17}* Papyrus...\n* His cooking lesson...' ],
      unddate35: [
         '<25>{#p/undyne}{#f/17}* HE WAS SUPPOSED TO HAVE THAT RIGHT NOW!!!',
         "<25>{#f/11}* And if HE's not here to have it...",
         "<25>{#f/7}* YOU'LL HAVE TO HAVE IT FOR HIM!"
      ],
      unddate36: [
         "<25>{#f/1}* That's right!",
         '<25>{#f/1}* NOTHING has brought Papyrus and I closer than cooking!',
         '<25>{#f/17}* Which means that if I give you his lesson...',
         "<25>{#f/8}* WE'LL BECOME CLOSER THAN YOU CAN EVER IMAGINE!"
      ],
      unddate37: [ "<25>{#f/1}* First, let's start with the sauce!!" ],
      unddate38: [
         '<25>{#f/1}* Envision these veggies as your mortal enemy!',
         '<25>{#f/7}* Now, pound them to bits with your fists!!',
         choicer.create('* (What will you do?)', 8, 7, 'Pet', 'Pound')
      ],
      unddate39a: () => [
         ...(save.data.n.bully > 9
            ? [ '<32>{#p/human}* (You pet the vegetables.)' ]
            : [ '<32>{#p/human}* (You pet the vegetables in an affectionate manner.)' ]),
         '<25>{#p/undyne}{#f/17}* OH MY GOD!!!\n* STOP PETTING THE ENEMY!!!',
         "<25>{#x1}{#f/7}* I'll show you how it's done!",
         '<25>{#f/4}* NGAHHH!'
      ],
      unddate39b: () =>
         save.data.n.bully > 9
            ? [ '<32>{#p/human}* (You punch the vegetables with all your might...!)' ]
            : [
                 '<32>{#p/human}* (You punch the vegetables with all your might.)\n* (You knock over a tomato.)',
                 '<25>{#p/undyne}{#f/1}* YEAH!\n* YEAH!',
                 '<25>{#f/1}* Our minds are uniting against these healthy ingredients!',
                 "<25>{#x1}{#f/7}* NOW IT'S MY TURN!",
                 '<25>{#f/4}* NGAHHH!'
              ],
      unddate40: (res: number) => [
         ...(save.data.n.bully > 9 && res === 1
            ? [ '<25>{#p/undyne}{#f/6}Feisty today, huh?', "<25>Heh, we'll just scrape this into a bowl later." ]
            : [ "<25>{#p/undyne}{#f/6}* Uh, we'll just scrape this into a bowl later." ]),
         '<25>{#f/2}* But for NOW!'
      ],
      unddate41: [
         '<25>{#p/undyne}{#f/1}* We add the noodles!',
         '<25>{#f/1}* Homemade noodles are the best, so I always keep some around.'
      ],
      unddate41x: [ '<25>{#p/undyne}{#f/12}* Uhh, you can come over here now, kid.' ],
      unddate41y: [
         '<25>{#p/undyne}{#f/1}* Anyway, you see these noodles here, right?',
         '<25>{#f/1}* Well...',
         "<25>{#f/17}* DISH 'EM OUT!",
         choicer.create('* (What will your approach be?)', 8, 7, 'Careful', 'Fierce')
      ],
      unddate42a: [
         '<32>{#p/human}* (You carefully place each spaghetti strand in one at a time.)',
         '<32>* The noodles clank against the empty bottom.',
         '<25>{#p/undyne}{#f/17}* I mean, that works???',
         "<25>{#f/1}* Well, now it's time to stir the pasta!"
      ],
      unddate42b: [
         '<32>{#p/human}* (You throw everything into the pot as hard as you can, including the box.)',
         '<32>* The box and the noodles clank against the empty bottom.',
         "<25>{#p/undyne}{#f/17}* YEAH!!\n* I'M INTO IT!!",
         "<25>{#f/1}* Alright!\n* Now it's time to stir the pasta!"
      ],
      unddate43: [
         '<25>{#p/undyne}{#f/1}* As a general rule of thumb, the more you stir...',
         '<25>{#f/17}* The better it tastes!'
      ],
      unddate44: [ '<25>{#p/undyne}{#f/17}* Ready?', "<25>{#f/1}* Let's do it!" ],
      unddate45: '* Press [Z] repeatedly to stir!',
      unddate46: [ '<25>{*}{#p/undyne}{#f/17}* Stir harder!{^20}{%}' ],
      unddate47: [ '<25>{*}{#p/undyne}{#f/7}* HARDER!{^20}{%}' ],
      unddate48: [ '<25>{*}{#p/undyne}{#f/8}* HARDER!!!{^20}{%}' ],
      unddate49: [ '<25>{*}{#p/undyne}{#f/8}* Ugh, let me do it- {^10}{%}' ],
      unddate50: [ "<25>{#p/undyne}{#f/8}* Fuhuhuhu!\n* That's the stuff!" ],
      unddate51: [
         '<25>{#p/undyne}{#f/1}* Alright, now for the final step...',
         '<25>{#f/17}* TURN UP THE HEAT!',
         '<25>{#f/1}* Let the stovetop symbolize your passion!',
         '<25>{#f/1}* Let your hopes and dreams turn into burning fire!',
         "<25>{#f/8}* And of course, don't hold anything back!!!"
      ],
      unddate52: [ '<25>{#p/undyne}{#f/17}* Ready?', '<25>{#f/1}* Here we go!' ],
      unddate53: '* Hold [RIGHT] to crank it up!',
      unddate53x: [ '<25>{*}{#p/undyne}{#f/8}* You fool!\n* This burner only goes ONE WAY!!!{^20}{%}' ],
      unddate54: [ '<25>{*}{#p/undyne}{#f/17}* Make it hotter!{^20}{%}' ],
      unddate55: [ '<25>{*}{#p/undyne}{#f/7}* HOTTER!{^20}{%}' ],
      unddate56: [ '<25>{*}{#p/undyne}{#f/8}* HOTTER!!!{^20}{%}' ],
      unddate57a: [ '<25>{*}{#p/undyne}{#f/17}* Ugh, let me do it...{^10}{%}' ],
      unddate57b: [ '<25>{*}{#p/undyne}{#f/17}* See, this is how you-{^20}{%}' ],
      unddate58: [ "<25>{*}{#p/undyne}{#f/17}* No, wait, that's too-{^10}{%}" ],
      unddate59: [ '<25>{#p/undyne}{#f/14}* Ah.' ],
      unddate60: [ "<25>{#p/undyne}{#f/14}* Man, no wonder Papyrus isn't improving at cooking anymore." ],
      unddate61: [ "<25>{#p/undyne}{#f/12}* So what's next?\n* Websurfing?\n* Entanglement bracelets?" ],
      unddate62: [
         '<25>{#p/undyne}{#f/10}* ...',
         '<25>{#f/9}* ...who am I kidding...',
         "<25>{#f/16}* I really screwed this up, didn't I...?",
         '<25>{#f/16}* Heh...'
      ],
      unddate63: [
         "<25>{#f/16}* I can't force you to like me, human.",
         "<25>{#f/9}* Some people just don't easily get along.",
         "<25>{#f/16}* I'd understand if you felt that way about me...",
         "<25>{#f/9}* And if we can't be friends... that's okay.",
         "<25>{#f/9}* Because...\n* If we're not gonna be friends..."
      ],
      unddate64: [ '<25>{#p/undyne}{#f/17}* THEN I CAN DESTROY YOU WITHOUT REGRET!!!' ],
      unddate65: [
         '<25>{#p/undyne}{#f/12}* Well, that was fun, huh?',
         "<25>{#f/8}* We'll have to hang out again another time!",
         '<25>{#f/9}* But, uh, somewhere else, I guess.',
         "<25>{#f/1}* In the meantime, I'll be at the rec center with Papyrus.",
         '<25>{#f/12}* I look forward to seeing you there!',
         '<25>{#f/1}* Until then, you can give Papyrus a ring on your phone.',
         "<25>{#f/8}* Since we're in the same place, I'll be able to talk too!"
      ],
      unddate66: [ '<25>{#f/14}* Well, see ya later, punk!!' ],
      sleeper: [ '<32>{#p/narrator}* Yet another sentry station made for Sans.\n* Like, really guys?' ],
      sleepersans: [ "<32>{#p/narrator}* He's fast asleep." ],
      hapstadoor1: [ "<32>{#p/narrator}* It's locked." ],
      hapstadoor2: [ '<32>{#p/human}* (You used the mystery key...)' ],
      napcomputer1: pager.create('limit', () => [
         '<32>{#p/narrator}* The computer is currently open to a music-sharing application.',
         choicer.create('* (View the application?)', 8, 7, 'Yes', 'No')
      ]),
      napcomputer2: [ '<32>{#p/human}* (You decide not to look.)' ],
      napcomputer3: {
         a: [
            'MTT - Solarwave.kwac',
            'MTT - Homeworld Blues.kwac',
            '_K1llSh0t_ - Hyper Rage.kwac',
            'MMSA - Main Theme.kwac',
            () => (save.data.n.state_starton_papyrus === 1 ? 'papyrus tribute.kwac' : 'funny autotune.kwac'),
            'Song of the Stars.kwac'
         ],
         b: [ 'COOLSKELETON95', 'COOLSKELETON95', '_K1ll3rMann3qu1n_', 'ALPHYS', 'lazybones.', '(Unknown)' ]
      },
      napcomputer4: {
         a: [ 'DJ Spectre.kwac', 'Spooktune Mashup.kwac' ],
         b: [ 'NAPSTABLOOK22', 'NAPSTABLOOK22' ]
      }
   },

   b_group_moldsmalMoldbygg1: [ "<32>{#p/story}* It's a gelatin festival!" ],
   b_group_moldsmalMoldbygg2a: () =>
      world.goatbro ? [ '<32>{#p/asriel2}* One left.' ] : [ '<32>{#p/story}* Gelata is all alone now...' ],
   b_group_moldsmalMoldbygg2b: () =>
      world.goatbro ? [ '<32>{#p/asriel2}* One left.' ] : [ '<32>{#p/story}* Gelatini now blorbs solo.' ],
   b_group_moldsmalMoldbygg2c: () =>
      world.goatbro ? [ '<32>{#p/asriel2}* One left.' ] : [ "<32>{#p/story}* Gelatini still hasn't made a sound." ],
   b_group_woshuaMoldbygg2: [
      '<32>{#p/story}* Skrubbington straddles up.\n* Much to their dismay, Gelata is also here...'
   ],
   b_group_woshuaMoldbygg2a: () =>
      world.goatbro ? [ '<32>{#p/asriel2}* One left.' ] : [ '<32>{#p/story}* Gelata is all alone now...' ],
   b_group_woshuaMoldbygg2b: () =>
      world.goatbro
         ? [ '<32>{#p/asriel2}* One left.' ]
         : [ '<32>{#p/story}* Skrubbington no longer has a janitorial staff.' ],

   b_opponent_woshua: {
      tweet: 'tweet',
      act_check: () =>
         world.goatbro
            ? [
                 '<32>{#p/asriel2}* Skrubbington, the clean freak.\n* Has a mental breakdown if even one speck of dirt gets loose.'
              ]
            : [
                 '<32>{#p/story}* SKRUBBINGTON - ATK 18 DEF 5\n* This humble germophobe seeks to cleanse the whole galaxy.'
              ],
      name: '* Skrubbington',
      status1: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* Skrubbington.' ] : [ '<32>{#p/story}* Skrubbington strolls in.' ],
      idleTalk1a: [ '<08>{~}Skrub u SOUL' ],
      idleTalk1b: [ '<08>{~}Skrub u hands' ],
      idleTalk1c: [ '<08>{~}Skrub u face' ],
      idleTalk1d: [ '<08>{~}Skrub u hair' ],
      idleTalk1e: [ '<08>{~}Skrub u feet' ],
      idleTalk2a: [ '<08>{~}Skrub a sub-subs' ],
      idleTalk2b: [ '<08>{~}Oops, I meant..\nSkrub a dub-DUBS' ],
      idleTalk2c: [ '<08>{~}Skrub a dub-dubs' ],
      idleTalk3: () => (world.trueKills > 0 ? [ '<08>{~}Your SOUL is unclean.' ] : [ '<08>{~}\x00*whistle whistle*' ]),
      cleanTalk: [ '<08>{~}Green means clean' ],
      jokeTalk1: [ "<08>{~}NO. THAT JOKE'S TOO.. DIRTY" ],
      jokeTalk2: [ '<08>{~}EUGH..' ],
      randStatus1: [ '<32>{#p/story}* Skrubbington is friends with a little bird.' ],
      randStatus2: [ '<32>{#p/story}* Skrubbington is rinsing off a saucer.' ],
      randStatus3: [ '<32>{#p/story}* Skrubbington is looking for some good clean fun.' ],
      randStatus4: [ '<32>{#p/story}* Smells like detergent.' ],
      randStatus5: [ '<32>{#p/story}* Skrubbington wonders if stardust is sanitary.' ],
      hurtStatus: [ '<32>{#p/story}* Skrubbington is revolted at its own wounds.' ],
      jokeText1: [ '<32>{#p/narrator}* You tell a joke about a rusty piece of space junk.' ],
      jokeText2: [ '<32>{#p/narrator}* You tell a joke about polluted alien worlds.' ],
      jokeText3: [ '<32>{#p/narrator}* You tell a joke about two starships that got stuck in a trash barge.' ],
      touchText1: [ '<32>{#p/narrator}* Skrubbington recoils from your touch.' ],
      touchText2: [ '<32>{#p/narrator}* You give Skrubbington a friendly pat.' ],
      cleanText1: [ '<32>{#p/narrator}* You ask Skrubbington to clean you. It hops around excitedly.' ],
      flirtTalk1: [ '<08>{~}No!\nUnclean romance!' ],
      flirtTalk2: [ '<08>{~}Sparkle and shine!' ],
      cleanText2: [ '<32>{#p/narrator}* Skrubbington continues cleaning.' ]
   },
   b_opponent_fakemoldsmal: {
      status1: [ '<32>{#p/story}* Gelatini appears?' ],
      act_check: [ '<32>{#p/story}* GELATINI - ATK 6 DEF 0\n* Not a squorch to be heard.' ],
      name: '* Gelatini',
      smalTalk: [ '<08>{~}...' ],
      fakeStatus1: [ "<32>{#p/story}* Gelatini isn't moving." ],
      fakeStatus2: [ '<32>{#p/story}* Gelatini is a perfectly tempered gelatin with no flaws.' ],
      fakeStatus3: [ "<32>{#p/story}* It's Gelatini's quiet time." ],
      fakeStatus4: [ '<32>{#p/story}* Smells like a jell-o store.' ],
      act_imitate: [ '<32>{#p/narrator}* You approach Gelatini.\n* Suddenly...!' ],
      act_flirt: [ '<32>{#p/narrator}* You wiggle your hips.\n* Suddenly...!' ],
      act_slap: [ '<32>{#p/narrator}* You give Gelatini a big slap.\n* Suddenly...!' ]
   },
   b_opponent_moldbygg: {
      status1: [ '<32>{#p/story}* Gelata appears!' ],
      act_check: [ '<32>{#p/story}* GELATA - ATK 18 DEF 18\n* One size greater than mold-average.' ],
      name: '* Gelata',
      idleTalk1: [ '<08>{~}Guoooh!' ],
      idleTalk2: [ '<08>{~}\x00*Slime sounds*' ],
      idleTalk3: [ '<08>{~}Roar.' ],
      idleTalk4: [ '<08>{~}\x00*Chaste wiggle*' ],
      randStatus1: [ '<32>{#p/story}* Gelata wants to carry you.' ],
      randStatus2: [ '<32>{#p/story}* Gelata wobbles anxiously.' ],
      randStatus3: [ '<32>{#p/story}* Gelata mills about nearby.' ],
      randStatus4: [ '<32>{#p/story}* Smells like a jell-o store.' ],
      hurtStatus: [ '<32>{#p/story}* Gelata has seen better days.' ],
      act_handshake: [
         '<32>{#p/narrator}* You offer a handshake.\n* Gelata engulfs you in slime.\n* Your SPEED decreased.'
      ],
      act_sit: [ '<32>{#p/narrator}* You sit on top of Gelata.\n* Gelata seems enthusiastic about its new reality.' ],
      distanceStatus: [ '<32>{#p/story}* Gelata seems happy with your presence.' ],
      act_flirt: [
         '<32>{#p/narrator}* You wiggle your hips.\n* Gelata does a tornado spin.\n* A meaningful conversation...?'
      ]
   },
   b_opponent_shyren: {
      act_check: [ '<32>{#p/story}* SHYREN - ATK 19 DEF 0\n* A prophetic singer, held back by her own shame.' ],
      awkwardtoot: [ '<08>{~}(awkward toot)' ],
      creepStatus: () =>
         save.data.n.state_foundry_muffet === 1
            ? [ '<32>{#p/story}* Shyren cowers in the corner.' ]
            : [ "<32>{#p/kidding}* I don't think that helped..." ],
      creepText1: [ '<32>{#p/narrator}* You flirt with Shyren, offering your best smile.\n* She turns away...' ],
      creepText2: [
         '<32>{#p/narrator}* You flirt with Shyren again.\n* Shyren is now so uncomfortable that she decides to leave.'
      ],
      encourage1: () =>
         save.data.n.state_foundry_muffet === 1
            ? [ '<32>{#p/story}* Shyren seems much more comfortable singing along.' ]
            : [ '<32>{#p/kidding}* A sing-along?\n* Heck yeah, dude!' ],
      encourage2: () =>
         world.dead_skeleton
            ? world.genocide
               ? save.data.n.state_foundry_muffet === 1
                  ? [ '<32>{#p/story}* The eerily quiet air passes behind the symphony of voices.' ]
                  : [ "<32>{#p/kidding}* Haha, this is kinda fun!\n* Even though it's just the three of us..." ]
               : save.data.n.state_foundry_muffet === 1
               ? [ '<32>{#p/story}* A hooded figure watches the commotion from afar.' ]
               : [ "<32>{#p/kidding}* Yo... uh...\n* What's that weird hooded guy doing over there?" ]
            : save.data.n.state_foundry_muffet === 1
            ? [ '<32>{#p/story}* Sans is selling tickets made of carbon paper.' ]
            : [ '<32>{#p/kidding}* Is that short skeleton selling TICKETS now??' ],
      encourage3: () =>
         world.dead_skeleton
            ? save.data.n.state_foundry_muffet === 1
               ? [ '<32>{#p/story}* Your previous hums echo back into the room.' ]
               : [ '<32>{#p/kidding}* This place is so empty, we can hear ourselves from the past.\n* So trippy...' ]
            : save.data.n.state_foundry_muffet === 1
            ? [ "<32>{#p/story}* The crowd tosses clothing.\n* It's a storm of cotton balls." ]
            : [ '<32>{#p/kidding}* Woah, so many people!' ],
      encourage4: () =>
         save.data.n.state_foundry_muffet === 1
            ? [ '<32>{#p/story}* Shyren thinks about her future.' ]
            : [ '<32>{#p/kidding}* One last time, one last time, one last time!' ],
      flirtText1: [
         '<32>{#p/narrator}* You flirt with Shyren.',
         '<32>* Though uneasy, she gives you a little smile in return...'
      ],
      flirttoot: [ '<08>{~}(happy toot)' ],
      hum1: [ '<32>{#p/narrator}* You hum a funky tune.\n* Shyren follows your melody.' ],
      hum2: [ '<32>{#p/narrator}* You hum a bluesy song.\n* Shyren follows your melody.' ],
      hum3: [ '<32>{#p/narrator}* You hum a jazz ballad.\n* Shyren follows your melody.' ],
      hum4: [ '<32>{#p/narrator}* You hum an apology song.\n* Shyren calms down...' ],
      humX1: () =>
         world.dead_skeleton
            ? [ "<32>{#p/narrator}* You hum some more.\n* It's a veritable duet..." ]
            : [
                 '<32>{#p/narrator}* You hum some more.\n* Monsters are drawn to the music.',
                 "<32>* Suddenly, it's a concert..."
              ],
      humX2: () =>
         world.dead_skeleton
            ? [ '<32>{#p/narrator}* You hum some more.\n* Shyren is happy to have you as her bandmate.' ]
            : [ '<32>{#p/narrator}* You hum some more.\n* The seats are sold out.\n* You feel like a rock star.' ],
      humX3: () =>
         world.dead_skeleton
            ? [ '<32>{#p/narrator}* You hum some more.\n* Even in the midst of death, notes and harmonies reign.' ]
            : [
                 '<32>{#p/narrator}* You hum some more.\n* But the constant attention...',
                 "<32>* The tours...\n* The groupies...\n* It's all..."
              ],
      humX4: () => [
         "<32>{#p/narrator}* You and Shyren have come so far, but it's time.",
         '<32>* You both have your own journeys to embark on.',
         '<32>* You hum a farewell song.'
      ],
      hurtStatus: [ "<32>{#p/story}* Shyren's voice is raspy." ],
      name: '* Shyren',
      randStatus1: () =>
         save.data.n.state_foundry_muffet === 1
            ? [ '<32>{#p/story}* Shyren hums very faintly.' ]
            : [ '<32>{#p/kidding}* Are you okay?' ],
      randStatus2: () =>
         save.data.n.state_foundry_muffet === 1
            ? [ '<32>{#p/story}* Shyren pretends to be a pop idol.' ]
            : [ '<32>{#p/kidding}* You look sad...' ],
      randStatus3: () =>
         save.data.n.state_foundry_muffet === 1
            ? [ '<32>{#p/story}* Shyren taps a little beat with her fins.' ]
            : [ '<32>{#p/kidding}* Do you need any help?' ],
      randStatus4: () =>
         save.data.n.state_foundry_muffet === 1
            ? [ '<32>{#p/story}* Shyren thinks about doing karaoke by herself.' ]
            : [ '<32>{#p/kidding}* Is there anything I can do?' ],
      randStatus5: () =>
         save.data.n.state_foundry_muffet === 1
            ? [ '<32>{#p/story}* Smells like music.' ]
            : [ "<32>{#p/kidding}* Wait... what's with her body?" ],
      sadtalk1: [ '<08>{~}..\n..\ntoot\n..' ],
      sadtalk2: [ '<08>{~}..\n..\nhum hum\n..' ],
      smile1: [
         "<32>{#p/narrator}* You smile.\n* You ask to see Shyren's smile, too.",
         '<32>* Shyren gets quieter, and cowers further back to the corner.'
      ],
      smile2: [ '<32>{#p/narrator}* You keep smiling.\n* Nothing happened.' ],
      smileX: [
         "<32>{#p/narrator}* You smile.\n* You ask to see Shyren's smile, too.",
         '<32>* Shyren turns nervously, and offers a little smile in return.',
         "<32>* The crowd goes wild.\n* Shyren's face lights up!",
         "<32>* The crowd goes wild.\n* Shyren's face lights up!"
      ],
      status1: () =>
         save.data.n.state_foundry_muffet === 1
            ? [ '<32>{#p/kidding}* No...\n* Not again...' ]
            : [ "<32>{#p/kidding}* Yo, how's it going?\n* You look sad..." ],
      talk3: [ '<08>{~}si re, si re si mi si mi' ],
      talk4: [ '<08>{~}Si Fa Si Fa So Fa So Mi Re Re' ],
      talk5: [ '<08>{~}Mi So Mi So Mi Si Mi La Si So' ],
      talk6: [ '<08>{~}(pas- sionate tooting)' ],
      talk7: [ '<08>{~}(final toot)' ],
      wave1: [ '<32>* You wave your arms wildly.\n* Nothing happened.' ],
      wave2: () =>
         world.genocide
            ? [ "<32>* You wave your arms wildly.\n* There's nobody here." ]
            : [ '<32>* You wave your arms wildly.\n* The crowd eats it up!' ]
   },
   b_opponent_radtile: {
      act_check: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Radtile, the perfectionist crocodile. Funny, considering how imperfect he is.' ]
            : [ '<32>{#p/story}* RADTILE - ATK 24 DEF 12\n* Habitual self-mirror-checker?' ],
      name: '* Radtile',
      status1: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* Radtile.' ] : [ '<32>{#p/narrator}* Radtile makes an impression!' ],
      randStatus1: [ '<32>{#p/narrator}* Radtile adjusts his cap.' ],
      randStatus2: [ '<32>{#p/narrator}* Radtile checks his mirror.' ],
      randStatus3: [ '<32>{#p/narrator}* Radtile is focused on self- improvement.' ],
      randStatus4: [ '<32>{#p/narrator}* Smells like atelophobia.' ],
      idleTalk1: [ '<08>{~}How do I look?' ],
      idleTalk2: [ '<08>{~}How do I sound?' ],
      idleTalk3: [ '<08>{~}How do I smell?' ],
      idleTalk4: [ '<08>{~}What do people say about me?' ],
      insultIdleTalk1: [ "<08>{~}Oh well, I guess I'm not perfect." ],
      insultIdleTalk2: [ "<08>{~}Ha, what's the point?" ],
      insultIdleTalk3: [ '<08>{~}...' ],
      act_praise: [ '<32>{#p/narrator}* You compliment Radtile.' ],
      complimentTalk1: [ '<08>{~}The truth, please.' ],
      complimentTalk2: [ "<08>{~}I know you're just being nice." ],
      complimentTalk3: [ "<08>{~}Don't lie to me now." ],
      complimentPostInsultTalk1: [ '<08>{~}Yeah, yeah.' ],
      complimentPostInsultTalk2: [ '<08>{~}So you say.' ],
      complimentPostInsultTalk3: [ '<08>{~}Meh.' ],
      complimentPostInsultStatus: [ "<32>{#p/narrator}* Radtile isn't having it." ],
      flirtTalk1: [ '<08>{~}Woah, hey, hold on now..' ],
      flirtTalk2: [ '<08>{~}Eheh..' ],
      flirtTalk3: [ '<08>{~}Simmer down, G..' ],
      complimentStatus: [ "<32>* Radtile won't take compliments from someone who hasn't checked him yet." ],
      checkTalk: [ '<08>{~}Yes, yes, study me.' ],
      realTalk1: [ '<08>{~}You sure?' ],
      realTalk2: [ '<08>{~}You mean that?' ],
      realTalk3: [ '<08>{~}Really?' ],
      realStatus: [ '<32>{#p/narrator}* Radtile\'s confidence is growing, but he\'s not quite "there" yet.' ],
      realTalkX1: [ '<08>{~}Okay, I believe you.' ],
      realTalkX2: [ "<08>{~}Wow, that's a relief." ],
      realTalkX3: [ '<08>{~}Alright then.' ],
      realTalkY1: [ '<08>{~}Yeah, I guess you could say I feel better.' ],
      realTalkY2: [ '<08>{~}Yeah, I guess I needed that.' ],
      realTalkY3: [ '<08>{~}Yeah, I guess I should say thanks.' ],
      shockTalk1: [ '<08>{~}..\nOkay.' ],
      shockStatus: [ '<32>{#p/narrator}* Radtile is not amused.' ],
      realStatusX: [ "<32>{#p/narrator}* Radtile's worries disappear." ],
      act_insult: [ '<32>{#p/narrator}* You insult Radtile.' ],
      act_flirt: [ '<32>{#p/narrator}* You flirt with Radtile.' ],
      insultTalk1: [ '<08>{~}Eh, knew it.' ],
      insultTalk2: [ '<08>{~}Figures.' ],
      insultTalk3: [ '<08>{~}Of course.' ],
      insultStatus: [ '<32>{#p/narrator}* Radtile\'s just "too cool" to care.' ],
      checkPostInsultTalk: [ '<08>{~}Taking another look, are we?' ],
      checkPostInsultStatus: [ '<32>{#p/narrator}* Radtile gives you another chance.' ],
      hurtStatus: [ "<32>{#p/narrator}* Radtile's teeth are falling out." ]
   },
   b_opponent_doge: {
      act_check: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Doge, the callous dog.\n* Cares only for her work.' ]
            : [ '<32>{#p/story}* DOGE - ATK 14 DEF 10\n* Pronounced "dohj." Soft j.\n* Member of the ELITE squad.' ],
      act_flirt: () => [
         '<32>{#p/narrator}* You said something sickly sweet about Doge.',
         ...(world.goatbro
            ? [ '<32>* Doge ignores your attempts at flattery.', '<32>{#p/asriel2}* Really...' ]
            : battler.volatile[0].sparable
            ? [ '<32>* Doge, having given up, is too distracted to hear you.' ]
            : [ '<32>* Doge gives a modest smile, then returns her facade.' ])
      ],
      act_talk: () => [
         '<32>{#p/narrator}* You spoke to Doge about your travels on the outpost.',
         ...(world.goatbro
            ? [ '<32>{#p/narrator}* Doge pays no attention to your idle dialogue.' ]
            : battler.volatile[0].sparable
            ? [ '<32>* Doge, having given up, is too distracted to hear you.' ]
            : [ '<32>{#p/narrator}* Doge nods in acknowledgement.' ])
      ],
      batheText: [
         '<32>{#p/narrator}* You suggest Doge get a shower.',
         '<32>* She rips open a pipe from the ceiling... water comes flooding out.',
         "<32>* It's cold, but she doesn't seem to mind...",
         '<32>* Soon, the water runs dry.\n* Doge relaxes a little...',
         "<32>{#p/story}* Doge's ATTACK down!"
      ],
      batheTextEarly: [ '<32>{#p/narrator}* You suggest Doge get a shower.', "<32>* She's not ready yet..." ],
      batheTextGeno: [ '<32>{#p/narrator}* Doge is not in the mood for a shower.' ],
      batheTextLate: [ '<32>{#p/narrator}* You suggest Doge get a shower.', "<32>* It's too late..." ],
      batheTextPost: [ '<32>{#p/narrator}* Doge is already squeaky clean.' ],
      fetchStatus: [ '<32>{#p/story}* Doge is a little smarter than the average dog.' ],
      fetchText: () => [
         '<32>{#p/narrator}* You throw the spanner.\n* Doge intercepts your throw, launching it back at you.',
         '<32>* The spanner hits you directly in the head...',
         '<32>{#p/story}* SPEED down!',
         ...(world.goatbro && save.flag.n.ga_asrielSpanner++ < 1
            ? [ "<32>{#p/asriel2}* Maybe don't try that again." ]
            : [])
      ],
      fetchTextEpic: [
         '<32>{#p/narrator}* You throw the spanner.\n* Doge, inspired, picks it up and brings it back to you.'
      ],
      fetchTextGarb: [ '<32>{#p/narrator}* You throw the spanner.\n* Doge, exhausted, simply ignores it.' ],
      flirtStatus: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Doge.' ]
            : [ '<32>{#p/story}* Doge wonders why a human child would flirt with her.' ],
      hurtStatus: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* Almost dead.' ] : [ '<32>{#p/story}* Doge is going to collapse.' ],
      name: '* Doge',
      petTalkPost: () => [ '<11>{~}Ah...' ],
      petText: [
         '<32>{#p/narrator}* You try to pet Doge.',
         '<32>* She hesitantly reaches her head up to meet your hand...',
         '<32>* You make contact.\n* Her face lights up.\n* She gives you a big smile.',
         '<32>* All her pent-up stress has finally been released.',
         '<32>* Doge is no longer interested in fighting you.'
      ],
      petTextEarly: [ '<32>{#p/narrator}* You try to pet Doge.', "<32>* She can't be reached yet..." ],
      petTextGeno: [ '<32>{#p/narrator}* Doge does not care about your pets.' ],
      petTextLate: [ '<32>{#p/narrator}* You try to pet Doge.', '<32>* You missed your chance...' ],
      petTextPost1: [
         '<32>{#p/narrator}* You try to pet Doge again.',
         "<33>* She laps up your love and attention like it's butterscotch- cinnamon pie..."
      ],
      petTextPost2: [ '<32>{#p/narrator}* You try to pet Doge yet again.', '<32>* Doge has reached nirvana.' ],
      petTextPost3: [ '<32>{#p/narrator}* You continue petting Doge.', '<32>* Is this even legal?' ],
      petTextPost4: [ '<32>{#p/narrator}* You pet Doge some more.', '<32>* Doge flops on the ground...' ],
      petTextPost5: [ '<32>{#p/narrator}* You give Doge a side rub.', "<32>* She's drooling..." ],
      petTextPost6: [ '<32>{#p/narrator}* You pet Doge.', '<32>* What else is new?' ],
      petTextPost7: [ '<32>{#p/narrator}* You pet Doge...' ],
      petTextSus: [ '<32>{#p/narrator}* As much as she needs it, Doge is just too ancy to be pet.' ],
      status1: () => (world.goatbro ? [ '<32>{#p/asriel2}* Doge.' ] : [ '<32>{#p/story}* Doge struts towards you.' ]),
      talkStatus: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* Doge.' ] : [ '<32>{#p/story}* Doge ponders the meaning of your words.' ],
      turnStatus1: [ '<32>{#p/narrator}* Doge gazes down at you.' ],
      turnStatus2: () =>
         save.data.b.oops
            ? [ '<32>{#p/narrator}* Doge needs a good washdown.' ]
            : [ '<32>{#p/narrator}* Doge needs a good washdown.\n* Maybe you can provide it?' ],
      turnStatus3: () =>
         battler.volatile[0].vars.bathe
            ? [ '<32>{#p/narrator}* Doge is dripping wet.' ]
            : [ "<32>{#p/narrator}* Doge's hygiene remains unchanged, much to her dismay." ],
      turnStatus4: () =>
         battler.volatile[0].vars.bathe
            ? save.data.b.oops
               ? [ '<32>{#p/narrator}* Doge seeks adventure.' ]
               : [ "<32>{#p/narrator}* Doge seeks adventure.\n* Maybe there's a way you can take her on one?" ]
            : [ '<32>{#p/narrator}* Doge is thinking about work.' ],
      turnStatus5: () =>
         battler.volatile[0].vars.walk
            ? [ '<32>{#p/narrator}* Doge feels respected.' ]
            : battler.volatile[0].vars.bathe
            ? [ '<32>{#p/narrator}* Doge feels betrayed.' ]
            : [ '<32>{#p/narrator}* Doge remembers an old colleague fondly.' ],
      turnStatus6: () =>
         battler.volatile[0].vars.walk
            ? [ '<32>{#p/narrator}* Smells like burnout.' ]
            : [ '<32>{#p/narrator}* Smells like disloyalty.' ],
      turnStatus7: () =>
         battler.volatile[0].vars.walk
            ? [ '<32>{#p/narrator}* Doge seeks affection.' ]
            : [ '<32>{#p/narrator}* Doge takes a deep breath.' ],
      turnStatus8: () =>
         battler.volatile[0].vars.walk
            ? [ '<32>{#p/narrator}* Doge could use a little love.' ]
            : [ '<32>{#p/narrator}* Doge is getting stressed out.' ],
      turnStatus9: () =>
         battler.volatile[0].vars.walk
            ? save.data.b.oops
               ? [ '<32>{#p/narrator}* Doge just wants to be pet.' ]
               : [
                    '<32>{#p/narrator}* Doge just wants to be pet.\n* I think now would be a good time to show her some love...'
                 ]
            : [ '<32>{#p/narrator}* Doge is ready to give up.' ],
      turnStatus10: () =>
         battler.volatile[0].vars.pet
            ? [ '<32>{#p/narrator}* Doge is satisfied.' ]
            : [ '<32>{#p/narrator}* Doge kneels down before you in surrender.' ],
      turnTalk1: () =>
         world.goatbro ? [ "<11>{~}I know what you've been doing." ] : [ '<11>{~}Undyne warned us about your arrival.' ],
      turnTalk2: () =>
         world.goatbro
            ? [ '<11>{~}The canine unit...', '<11>{~}You killed them all.' ]
            : [
                 "<11>{~}Thanks to her, I've been on extended patrol.",
                 '<11>{~}And let me tell you, this is a dirty place.'
              ],
      turnTalk3: () =>
         world.goatbro
            ? [ '<11>{~}You two could have surrendered at any moment...', '<11>{~}Yet you chose violence.' ]
            : battler.volatile[0].vars.bathe
            ? [ '<11>{~}Ah, that feels much better.' ]
            : [
                 '<11>{~}But alas, during a battle...',
                 "<11>{~}Self-care might be seen as 'out of line.'",
                 '<11>{~}So much for my needs.'
              ],
      turnTalk4: () =>
         world.goatbro
            ? [ '<11>{~}Truth is, on my first day as a guard...', "<11>{~}I was skeptical of Undyne's view on humans." ]
            : battler.volatile[0].vars.bathe
            ? [ '<11>{~}Human, do you mind?', '<11>{~}There is still water stuck in my hair.' ]
            : [ '<11>{~}When I first joined the ELITE squad...', "<11>{~}I thought I'd be respected." ],
      turnTalk5: () =>
         world.goatbro
            ? [ "<11>{~}But after what you've done...", "<11>{~}There's no more doubt in my mind." ]
            : battler.volatile[0].vars.walk
            ? [ '<11>{~}Well now, nothing beats a nice walk.' ]
            : battler.volatile[0].vars.bathe
            ? [
                 '<11>{~}Just a moment.',
                 '<11>{~}...',
                 '<11>{~}\x00*Whips around*',
                 '<11>{~}\x00*Whipping continues*',
                 '<11>{~}\x00*Shakes off*',
                 '<11>{~}...',
                 '<11>{~}There, all dry now.\nBack to fighting, yes?'
              ]
            : [ '<11>{~}Now I understand why that dummy called it quits.' ],
      turnTalk6: () =>
         world.goatbro
            ? [
                 '<11>{~}And you, Asriel... a traitor to your own kind...',
                 '<11>{~}It is hard to believe you were once to be our king.'
              ]
            : battler.volatile[0].vars.walk
            ? [ '<11>{~}Just how much stamina do you have?' ]
            : battler.volatile[0].vars.bathe
            ? [ '<11>{~}Forgive me.\nI have much on my mind.' ]
            : [
                 '<11>{~}Undyne may be a fearsome warrior...',
                 '<11>{~}But she does not know how to lead troops.',
                 '<11>{~}...\nDo not tell her I said that.'
              ],
      turnTalk7: () =>
         world.goatbro
            ? [
                 '<11>{~}Is this really the fate that befalls us?',
                 '<11>{~}Our former prince and his human partner...',
                 '<11>{~}...on a mission to kill us all?'
              ]
            : battler.volatile[0].vars.walk
            ? [ '<11>{~}Clearly more than I antici- pated.' ]
            : [ '<11>{~}(Sigh...)' ],
      turnTalk8: () =>
         world.goatbro
            ? [ '<11>{~}Well, after all is said and done...', "<11>{~}I can't decide which of you is worse." ]
            : battler.volatile[0].vars.walk
            ? [ '<11>{~}Human, I...' ]
            : [ '<11>{~}This battle is really dragging on.' ],
      turnTalk9: () =>
         world.goatbro
            ? // gotta love that charlie jade reference-
              [ '<11>{~}They say reality is often disap- pointing.', '<11>{~}But this, I did not expect.' ]
            : battler.volatile[0].vars.walk
            ? [ '<11>{~}I cannot keep this up... I...' ]
            : [ '<11>{~}You know... I...' ],
      turnTalk10: () =>
         world.goatbro
            ? [ '<11>{~}...', '<11>{~}Die, now.' ]
            : battler.volatile[0].vars.pet
            ? [ '<11>{~}(Blushes)', '<11>{~}You are a... kind human...' ]
            : [
                 '<11>{~}I think I have had enough.',
                 '<11>{~}...',
                 '<11>{~}...sorry, captain.',
                 '<11>{~}The human out- lasted me.'
              ],
      turnTalk11: () => [ '<11>{~}...' ],
      walkText: [
         '<32>{#p/narrator}* You offer to take Doge on a walk.',
         '<32>* She follows your lead.\n* Together you march in unison.',
         '<32>* This continues for a while...',
         '<32>* But eventually...',
         '<32>* Doge grows tired of this frivilous exercise.',
         '<32>* She follows you back to her patrol zone, and relaxes a little...',
         "<32>{#p/story}* Doge's ATTACK down!"
      ],
      walkTextEarly: [ '<32>{#p/narrator}* You offer to take Doge on a walk.', "<32>* She's not interested yet..." ],
      walkTextGeno: [ '<32>{#p/narrator}* Doge refuses to walk anywhere with you.' ],
      walkTextLate: [ '<32>{#p/narrator}* You offer to take Doge on a walk.', "<32>* She's already lost interest..." ],
      walkTextPost: [ '<32>{#p/narrator}* Doge is already spent.' ],
      walkTextSus: [ "<32>{#p/narrator}* As much as she'd like it, Doge is just too dirty for a walk." ]
   },
   b_opponent_muffet: {
      act_check: [ '<32>{#p/story}* MUFFET - ATK 39 DEF 19\n* Queen of all spider clans.\n* ELITE squad volunteer.' ],
      act_flirt: () => [
         '<32>{#p/narrator}* You asked Muffet on a dance.',
         ...(world.genocide
            ? [ '<32>* Muffet gives you the stink eyes.' ]
            : [ '<32>* Muffet giggles and wags several fingers at you.' ]),
         '<32>{#p/kidding}* Yo... what?'
      ],
      act_talk: () => [
         '<32>{#p/narrator}* You made a little small talk with Muffet.',
         ...(world.genocide
            ? [ '<32>{#p/narrator}* She gives you the nasty silent teatment...' ]
            : [ '<32>{#p/narrator}* She replies in kind...' ]),
         '<32>{#p/kidding}* Yo, what are you guys talking about?'
      ],
      appeaseText: [
         '<33>{#p/narrator}* You make an appeal to Muffet...',
         '<32>* Muffet is once again intrigued.',
         "<32>* You mention how Doge was mistreated, and that Undyne's lack of care is clear.",
         '<32>* As such, you suggest that trusting Undyne would mean putting spider clans at risk.',
         '<32>* Again, she starts considering the situation...',
         "<32>{#p/story}* Muffet's SPEED down!"
      ],
      appeaseTextEarly: [
         '<33>{#p/narrator}* You make an appeal to Muffet...',
         "<32>{#p/narrator}* But Muffet hasn't yet revealed anything you can appeal to."
      ],
      appeaseTextGeno: [ '<32>{#p/narrator}* Muffet will not be swayed by your shallow claims.' ],
      appeaseTextLate: [
         '<33>{#p/narrator}* You make an appeal to Muffet...',
         "<32>* But you can't appeal to her if she won't open up."
      ],
      appeaseTextPost: [ "<32>{#p/narrator}* Muffet doesn't need to be appeased twice." ],
      appeaseTextSus: [
         "<32>{#p/narrator}* This could've been an idea, if only you'd given Muffet a reason to believe you sooner."
      ],
      counterText: [
         '<32>{#p/narrator}* You try to counter Muffet...',
         '<32>* Muffet is intrigued.',
         '<32>* Her ears open, you propose that a deal with the ELITE squad is flimsy.',
         '<32>* You point out that one of their ranks already failed to capture you.',
         '<32>* She begins to carefully think everything over...',
         "<32>{#p/story}* Muffet's SPEED down!"
      ],
      counterTextEarly: [
         '<32>{#p/narrator}* You try to counter Muffet...',
         "<32>* But Muffet hasn't said anything to counter yet."
      ],
      counterTextGeno: [ '<32>{#p/narrator}* Muffet is deadset in her goal.' ],
      counterTextLate: [ '<32>{#p/narrator}* You try to counter Muffet...', "<32>* But she's already made up her mind." ],
      counterTextPost: [ '<32>{#p/narrator}* Muffet has already heard your argument.' ],
      name: '* Muffet',
      payTalkPost: () => [ "<11>{~}That's very kind, but we already have more than enough~" ],
      payText: [
         '<32>{#p/narrator}* You attempt to pay Muffet.',
         '<32>* Muffet takes the money...',
         "<32>* As it turns out, your friend had enough G to cover all the spider clans' expenses!",
         '<32>* Muffet pockets the G and bows to you and Monster Kid.',
         '<32>* Her subjects will be well fed for quite a while.',
         "<32>* Muffet doesn't care about fighting anymore."
      ],
      payTextEarly: [
         '<32>{#p/narrator}* You try to pay Muffet.',
         "<32>* But Muffet didn't ask for any payment beforehand..."
      ],
      payTextGeno: [ "<32>{#p/narrator}* Muffet doesn't need any money from you." ],
      payTextLate: [
         '<32>{#p/narrator}* You attempt to pay Muffet...',
         "<32>{#p/narrator}* But she doesn't trust you enough for that."
      ],
      payTextPost: [ '<32>{#p/narrator}* You try to pay Muffet again...' ],
      payTextSus: [ '<32>{#p/narrator}* This had a chance of working, if only Muffet trusted you a little more.' ],
      status1: [ "<32>{#p/kidding}* I'm trapped...!" ],
      turnStatus1: () => (world.genocide ? [ '<32>{#p/kidding}* Little killer...?' ] : [ '<32>{#p/kidding}* Help...!' ]),
      turnStatus2: () =>
         world.genocide
            ? [ '<32>{#p/kidding}* Something feels wrong...' ]
            : save.data.b.oops
            ? [ '<32>{#p/kidding}* Money... hmm...' ]
            : [ '<32>{#p/kidding}* Money... hmm...\n* Yo, what if you made a better counter offer?' ],
      turnStatus3: () =>
         world.genocide
            ? [ "<32>{#p/kidding}* Yo...\n* She REALLY doesn't like you..." ]
            : battler.volatile[0].vars.counter
            ? [ '<32>{#p/kidding}* What are we going to do?' ]
            : [ "<32>{#p/kidding}* We're never getting outta here, are we..." ],
      turnStatus4: () =>
         world.genocide
            ? [ '<32>{#p/kidding}* What the heck was THAT?' ]
            : battler.volatile[0].vars.counter
            ? [ '<32>{#p/kidding}* Is she... changing her mind?' ]
            : [ '<32>{#p/kidding}* What the heck was THAT?' ],
      turnStatus5: () =>
         world.genocide
            ? [ '<32>{#p/kidding}* Of course...' ]
            : battler.volatile[0].vars.counter
            ? [ "<32>{#p/kidding}* Guess it won't be so easy..." ]
            : [ "<32>{#p/kidding}* Y... you're kidding, right?\n* This isn't fun at all!" ],
      turnStatus6: () =>
         world.genocide
            ? [ "<32>{#p/kidding}* I don't like what she's saying about you, dude..." ]
            : battler.volatile[0].vars.counter
            ? save.data.b.oops
               ? [ '<32>{#p/kidding}* Fellow spiders...?' ]
               : [ "<32>{#p/kidding}* Fellow spiders...?\n* Hey wait, that's something you can appease her with!" ]
            : [ '<32>{#p/kidding}* Uh...' ],
      turnStatus7: () =>
         world.genocide
            ? [ "<32>{#p/kidding}* She's relentless...!" ]
            : battler.volatile[0].vars.appease
            ? [ '<32>{#p/kidding}* Hey, wait...\n* I think this is working!\n* Keep going, dude!' ]
            : [ "<32>{#p/kidding}* I'm...\n* I'm scared, dude..." ],
      turnStatus8: () =>
         world.genocide
            ? [ '<32>{#p/kidding}* Dude, HOW are we STILL ALIVE??' ]
            : battler.volatile[0].vars.appease
            ? [ "<32>{#p/kidding}* Yo, freaky muffins aside... we're making progress!\n* I think?" ]
            : [ '<32>{#p/kidding}* Ack, not again!!' ],
      turnStatus9: () =>
         world.genocide
            ? [ '<32>{#p/kidding}* What\'s "inevitable?"' ]
            : battler.volatile[0].vars.appease
            ? [ '<32>{#p/kidding}* But...\n* I thought we...' ]
            : [ '<32>{#p/kidding}* Ack, not again!!' ],
      turnStatus10: () =>
         world.genocide
            ? [ "<32>{#p/kidding}* Yo, I'm here too, you know..." ]
            : battler.volatile[0].vars.appease
            ? save.data.b.oops
               ? [ "<32>{#p/kidding}* Hey, I've got money!\n* Let's use it, dude!" ]
               : [ "<32>{#p/kidding}* Hey, I've got money!\n* Let's use it, dude!\n* Let's pay our way out!" ]
            : [ '<32>{#p/kidding}* Someone, anyone...' ],
      turnStatus11: () =>
         world.genocide
            ? [ "<32>{#p/kidding}* This isn't funny...!" ]
            : battler.volatile[0].vars.pay
            ? [ "<32>{#p/kidding}* I hope that short skeleton doesn't mind me using the money he gave me..." ]
            : battler.volatile[0].vars.appease
            ? [ "<32>{#p/kidding}* Dude...\n* Why didn't we help her?" ]
            : [ "<32>{#p/kidding}* It's over..." ],
      turnStatus12: () =>
         world.genocide ? [ '<32>{#p/kidding}* ...' ] : [ '<32>{#p/kidding}* Are we gonna end this, or...?' ],
      turnStatus13: () =>
         world.genocide
            ? [ '<32>{#p/kidding}* Is it really over?' ]
            : [ '<32>{#p/kidding}* Are we gonna end this, or...?' ],
      turnTalk1: () =>
         world.genocide
            ? [ '<11>{~}Ahuhuhu... a little killer crawls into my web~' ]
            : [ "<11>{~}You're mine now, dearies~" ],
      turnTalk1a: [
         '<11>{~}I hope you like your new color~',
         '<11>{~}I think purple looks better on you...',
         "<11>{~}Don't you, dearie?"
      ],
      turnTalk2: () =>
         world.genocide
            ? [ '<11>{~}What did you think would happen, dearies?', '<11>{~}Did you expect me to SPARE you?' ]
            : [
                 "<11>{~}Don't expect me to go easy on you, little human.",
                 '<11>{~}That ELITE squad offered lots of money for your SOUL~'
              ],
      turnTalk3: () =>
         world.genocide
            ? [ '<11>{~}Pfft~', '<11>{~}Such a shame for you~' ]
            : battler.volatile[0].vars.counter
            ? [ '<11>{~}Ahuhuhu...\nWell...' ]
            : [ '<11>{~}And considering your lack of a counter offer...', '<11>{~}The choice for me is clear~' ],
      turnTalk4: () =>
         world.genocide
            ? [
                 '<11>{~}Well.\nThere is one good thing about it~',
                 "<11>{~}I don't have to feel bad about feeding my pet!"
              ]
            : battler.volatile[0].vars.counter
            ? [ '<11>{~}Hm, a better deal would be nice...' ]
            : [ '<11>{~}Where are you, my pet~', "<11>{~}It's time to eat~" ],
      turnTalk5: () =>
         world.genocide
            ? [
                 '<11>{~}You survived?\nImpressive~',
                 '<11>{~}I shall have to reward you...',
                 '<11>{~}...with more attacks, of course.\nAhuhuhu!'
              ]
            : battler.volatile[0].vars.counter
            ? [ '<11>{~}But what guarantee do I have...', "<11>{~}...that you won't just stab me in the back?" ]
            : [ '<11>{~}I often wondered what fighting would be like.', "<11>{~}I never realized it'd be so much fun~" ],
      turnTalk6: () =>
         world.genocide
            ? [ '<11>{~}How did it feel, hmm?', '<11>{~}All those monsters falling like dominoes...' ]
            : battler.volatile[0].vars.counter
            ? [ '<11>{~}My fellow spiders need kept safe...', "<11>{~}I can't put THEM in danger, can I?\nAhuhuhu..." ]
            : [
                 "<11>{~}Aren't you having fun, dearies?",
                 '<11>{~}My fellow spiders certainly will...',
                 '<11>{~}... when they get their share of the money~'
              ],
      turnTalk7: () =>
         world.genocide
            ? [ '<11>{~}Well, dearies...', '<11>{~}I shall enjoy killing you personally~' ]
            : battler.volatile[0].vars.appease
            ? [ '<11>{~}I must admit, that is very worrying...' ]
            : [ '<11>{~}Well, no matter, little human~', '<11>{~}The only thing that matters now is your SOUL~' ],
      turnTalk8: () =>
         world.genocide
            ? [ '<11>{~}Oh, this is so much fun, you two!', "<11>{~}My pet, it's feeding time~" ]
            : battler.volatile[0].vars.appease
            ? [ "<11>{~}And they didn't exactly do much to earn my trust...", '<11>{~}Oh, hello, my pet~' ]
            : [ '<11>{~}Time for round two, my pet~' ],
      turnTalk9: () =>
         world.genocide
            ? [ '<11>{~}You only delay the inevitable~' ]
            : battler.volatile[0].vars.appease
            ? [ '<11>{~}Still, dearies...', "<11>{~}I don't know if I can trust you~" ]
            : [ "<11>{~}You're resilient, I'll give you that~" ],
      turnTalk10: () =>
         world.genocide
            ? [ '<11>{~}Ahuhuhu...', "<11>{~}You can't dodge forever, you two~" ]
            : battler.volatile[0].vars.appease
            ? [ '<11>{~}Unless, perhaps...', '<11>{~}You can offer me a little insurance?' ]
            : [ '<11>{~}But unless my deal changes, your SOUL is as good as mine~' ],
      turnTalk11: () =>
         world.genocide
            ? [ '<11>{~}Ahuhuhu...' ]
            : battler.volatile[0].vars.pay
            ? [ '<11>{~}You two have my sincerest apologies~', "<11>{~}This is a good deed I won't easily forget!" ]
            : [
                 "<11>{~}What's this?\nA telegram from Undyne?",
                 "<11>{~}She's called off the deal...?",
                 '<11>{~}...hmmm...',
                 "<11>{~}Well, I think my job here is done, don't you?",
                 '<11>{~}Sorry for wasting your time~'
              ],
      turnTalk12: () => [ '<11>{~}...' ],
      turnTalk13: () =>
         world.genocide
            ? [
                 '<11>{~}You know what, dearies?',
                 "<11>{~}I've had enough of fighting you...",
                 '<11>{~}So... just do what you will.',
                 "<11>{~}...sorry, Undyne.\nI'd rather die on my own terms, thank you.",
                 '<11>{~}Bye bye, now~'
              ]
            : [ '<11>{~}...' ]
   },
   b_opponent_undyne: {
      talkText: [ '<32>{#p/narrator}* You try to talk to Undyne.' ],
      talkText1: [ '<32>{#p/narrator}* She scoffs.' ],
      talkText2: [ "<32>{#p/narrator}* She doesn't care." ],
      talkText3: [ "<32>{#p/narrator}* She's too busy fighting." ],
      talkText4: [ "<32>{#p/narrator}* She thinks you're playing some kind of practical joke." ],
      talkText5: [ "<32>{#p/narrator}* She still doesn't care." ],
      talkText6: [ "<32>{#p/narrator}* She's honestly baffled as to why you're still doing this." ],
      talkText7: [ '<32>{#p/narrator}* She sighs.' ],
      talkText8: [ "<32>{#p/narrator}* But what's the point?" ],
      talkText9: [ "<32>{#p/narrator}* We're going in circles here..." ],
      talkText10: [ '<32>{#p/narrator}* Much to your surprise...', '<32>{#p/narrator}* Not a single thing happened.' ],
      talkText11: [ "<32>{#p/narrator}* You're gonna give someone a headache if you keep this up." ],
      talkText12: [ '<32>{#p/narrator}* Headache progress: 40%' ],
      talkText13: [ '<32>{#p/narrator}* Headache progress: 60%' ],
      talkText14: [ '<32>{#p/narrator}* Headache progress: 80%' ],
      talkText15: [ '<32>{#p/narrator}* Congratulations, you just gave me a massive headache.' ],
      talkText16: [ '<32>{#p/narrator}* Now what?' ],
      talkText17: [ "<32>{#p/narrator}* This really won't accomplish anything..." ],
      talkText18: [ '<32>{#p/narrator}* Are you just doing this to get on my nerves?' ],
      talkText19: [ "<32>{#p/narrator}* You are, aren't you...?" ],
      talkText20: [ '<32>{#p/narrator}* ...' ],
      talkText21: [ '<32>{#p/narrator}* You try to talk to Undyne.', "<32>{#p/narrator}* She's not paying attention." ],
      talkText22: [ '<32>{#p/narrator}* You try to talk to Undyne.', "<32>{#p/narrator}* There's no point..." ],
      spaghetti1: [
         '<32>{#p/narrator}* The smell reminds Undyne of someone close to her...',
         "<32>{#p/narrator}* Undyne's ATTACK down!"
      ],
      spaghetti2: () =>
         world.genocide
            ? [
                 "<32>{#p/narrator}* The smell reminds Undyne of someone she'll never see again...",
                 '<32>{#p/narrator}* ...but her determination to kill you strengthens.',
                 "<32>{#p/narrator}* Undyne's ATTACK up!\n* Undyne's DEFENSE down!"
              ]
            : [
                 "<32>{#p/narrator}* The smell reminds Undyne of someone she'll never see again...",
                 "<32>{#p/narrator}* Undyne's DEFENSE down!"
              ],
      artifact1: () =>
         world.genocide
            ? [
                 '<32>{#p/narrator}* Undyne struggles to take her eye off of the artifact...',
                 '<32>{#p/narrator}* ...but stands tall regardless.',
                 "<32>{#p/narrator}* Undyne's ATTACK down!\n* Undyne's DEFENSE up!"
              ]
            : [
                 '<32>{#p/narrator}* Undyne struggles to take her eye off of the artifact...',
                 "<32>{#p/narrator}* Undyne's ATTACK down!\n* Undyne's DEFENSE down!"
              ],
      act_check: () =>
         world.goatbro
            ? [ "<32>{#p/asriel2}* Undyne the Undying.\n* Shouldn't you be attacking her or something?" ]
            : [ '<32>{#p/story}* UNDYNE - ATK 50 DEF 20\n* The heroine that NEVER gives up.' ],
      name: () => (world.genocide ? '* Undyne the Undying' : '* Undyne'),
      status1: [ '<32>{#p/story}* Undyne attacks!' ],
      intro1: () =>
         save.data.n.state_starton_papyrus === 1
            ? [ '<20>{*}{#p/undyne}Ready yourself.' ]
            : [ '<20>{*}{#p/undyne}En guarde!' ],
      intro2: () =>
         save.data.n.state_starton_papyrus === 1
            ? [ "<20>{*}{#p/undyne}I wasn't done with my story." ]
            : [ "<20>{*}{#p/undyne}You won't get away from me this time!" ],
      intro3: [ "<20>{*}{#p/undyne}You've escaped from me for the LAST time!" ],
      intro4: [ '<20>{*}{#p/undyne}STOP RUNNING AWAY!!!' ],
      intro5: [ '<20>{*}{#p/undyne}COME BACK HERE, YOU LITTLE PUNK!!' ],
      earlyChallenge: () =>
         save.data.n.state_starton_papyrus === 1
            ? [
                 '<20>{#p/undyne}{#e/undyne/3}So, you wanna do this the {@fill:#f00}hard way{@fill:#000}, huh?',
                 '<20>{#e/undyne/2}Fine by me.'
              ]
            : [
                 '<20>{#p/undyne}{#e/undyne/17}So, you wanna do this the {@fill:#f00}hard way{@fill:#000}, huh?',
                 '<20>{#e/undyne/1}FINE BY ME!\nFUHUHU!'
              ],
      earlyChallengeStatus: [ '<32>{#p/story}* Things are about to get spicy.' ],
      randStatus1: [ '<32>{#p/story}* Undyne points heroically towards space.' ],
      randStatus2: [ '<32>{#p/story}* Undyne flips her spear impatiently.' ],
      randStatus3: [ '<32>{#p/story}* Undyne suplexes an asteroid.\n* Just because she can.' ],
      randStatus4: [ '<32>{#p/story}* Undyne bounces impatiently.' ],
      randStatus5: [ '<32>{#p/story}* Undyne flashes a menacing smile.' ],
      randStatus6: [ '<32>{#p/story}* Undyne draws her finger across her neck.' ],
      randStatus7: [ '<32>{#p/story}* Undyne holds her fist in front of her and shakes her head.' ],
      randStatus8: [ '<32>{#p/story}* Undyne towers threateningly.' ],
      randStatus9: [ '<32>{#p/story}* Undyne thinks of her friends and pounds the ground with her fists.' ],
      randStatus10: [ '<32>{#p/story}* Smells like sushi.' ],
      papStatus1: [ '<32>{#p/story}* Undyne has a tear in her eye.' ],
      papStatus2: [ '<32>{#p/story}* Undyne scowls at you.' ],
      papStatus3: [ '<32>{#p/story}* Undyne thinks of her friends and shatters the ground with her body.' ],
      papStatus4: [ "<32>{#p/story}* Undyne isn't in the mood for games." ],
      papStatus5: [ '<32>{#p/story}* Smells like tuna salad.' ],
      endStatus1: [ "<32>{#p/story}* Undyne's eye is twitching involuntarily." ],
      endStatus2: [ '<32>{#p/story}* Undyne is smashing spears on the ground.' ],
      endStatus3: [ "<32>{#p/story}* Undyne's eye dart around to see if this is a prank." ],
      endStatus4: [ '<32>{#p/story}* Undyne is hyperventilating.' ],
      endStatus5: [ '<32>{#p/story}* Smells like roasted fish.' ],
      tutorial1: () =>
         save.data.n.state_starton_papyrus === 1
            ? [
                 '<20>{#p/undyne}{#e/undyne/3}...',
                 "<20>{#e/undyne/4}What? You think I'm just gonna stand here and explain my strategy to you?"
              ]
            : [
                 "<20>{#p/undyne}{#e/undyne/0}As long as you're GREEN you CAN'T ESCAPE!",
                 '<20>{#e/undyne/0}Unless you learn to face danger head-on...',
                 "<20>{#e/undyne/1}You won't last a SECOND against ME!"
              ],
      tutorial2: [
         '<20>{#p/undyne}{#e/undyne/0}When I said face towards danger...',
         '<20>{#e/undyne/1}I meant face towards the bullets!'
      ],
      tutorial3: [
         '<20>{#p/undyne}{#e/undyne/3}Look.',
         '<20>{#e/undyne/3}I gave you a spear.',
         '<20>{#e/undyne/2}You can use that to block my attacks.',
         '<20>{#e/undyne/17}Do I have to explain this any more clearly?'
      ],
      tutorial4: [
         '<20>{#p/undyne}{#e/undyne/6}WHAT ARE YOU DOING?',
         '<20>{#e/undyne/7}JUST FACE UPWARDS!!!',
         "<20>{#e/undyne/5}IT'S NOT THAT HARD!!!"
      ],
      tutorial5: [
         '<20>{#p/undyne}{#e/undyne/2}...',
         '<20>{#e/undyne/2}I wanted this to be a fair fight.',
         '<20>{#e/undyne/3}I wanted to give you a chance.',
         '<20>{#e/undyne/4}And maybe, if I beat you like this...',
         "<20>{#e/undyne/2}It'd truly show how strong monsters can be.",
         '<20>{#e/undyne/6}BUT NOW???',
         "<20>{#e/undyne/5}I DON'T CARE!",
         "<20>{#e/undyne/5}I'M NOT YOUR FREAKING BABYSITTER!",
         '<20>{#e/undyne/17}Unless your babysitter...',
         '<20>{#e/undyne/5}DOES THIS!'
      ],
      turnTalkA1: () =>
         save.data.n.state_starton_papyrus === 1
            ? save.data.n.hp < 6
               ? [
                    '<20>{#p/undyne}{#e/undyne/33}Too difficult?\nFeh.',
                    "<20>{#p/undyne}{#e/undyne/2}You should've thought about THAT when you had the chance."
                 ]
               : save.data.n.hp < 11
               ? [
                    '<20>{#p/undyne}{#e/undyne/3}Not bad, not great.',
                    "<20>{#p/undyne}{#e/undyne/2}Papyrus certainly wouldn't be satisfied, though."
                 ]
               : save.data.n.hp < 16
               ? [
                    "<20>{#p/undyne}{#e/undyne/3}So you're gonna be a little tougher than I expected.",
                    '<20>{#p/undyne}{#e/undyne/2}Fair enough.'
                 ]
               : [
                    '<20>{#p/undyne}{#e/undyne/4}Impressive...',
                    "<20>{#p/undyne}{#e/undyne/2}Just don't expect your luck to last long."
                 ]
            : battler.volatile[0].vars.trolled
            ? [
                 '<20>{#p/undyne}{#e/undyne/1}*Huff...*\n*Huff...*',
                 '<20>{#e/undyne/21}Not bad.',
                 "<20>{#e/undyne/15}But I don't have time for your games.",
                 "<20>{#e/undyne/6}So WE'RE gonna have to do this the {@fill:#f00}hard way{@fill:#000}!",
                 '<20>{#e/undyne/1}Fuhuhuhu!!'
              ]
            : [ '<20>{#p/undyne}{#e/undyne/1}Not bad!\nThen how about THIS!?' ],
      turnTalkA2: () =>
         save.data.n.state_starton_papyrus === 1
            ? [ '<20>{#p/undyne}{#e/undyne/2}Let me tell you a little story.' ]
            : save.data.b.f_state_sacrifice
            ? [ '<20>{#p/undyne}{#e/undyne/3}I saw what you were doing back there.' ]
            : [ "<20>{#p/undyne}{#e/undyne/0}For years, we've dreamed of a happy ending..." ],
      turnTalkA3: () =>
         save.data.n.state_starton_papyrus === 1
            ? [
                 '<20>{#p/undyne}{#e/undyne/2}Back when I was training to be a royal guard...',
                 "<20>{#p/undyne}{#e/undyne/2}Things weren't all starlight and roses."
              ]
            : save.data.b.f_state_sacrifice
            ? [ '<20>{#p/undyne}{#e/undyne/4}Giving up your SOUL, willingly...?' ]
            : [ '<20>{#p/undyne}{#e/undyne/0}And now, the stars are just within reach!' ],
      turnTalkA4: () =>
         save.data.n.state_starton_papyrus === 1
            ? [
                 "<20>{#p/undyne}{#e/undyne/2}Many were against the guard's formation, including my family.",
                 '<20>{#p/undyne}{#e/undyne/2}I became an outcast among monsters.'
              ]
            : save.data.b.f_state_sacrifice
            ? [ "<20>{#p/undyne}{#e/undyne/17}...as if I'd EVER fall for THAT." ]
            : [ "<20>{#p/undyne}{#e/undyne/1}I won't let you snatch it away from us!" ],
      turnTalkA5: () =>
         save.data.n.state_starton_papyrus === 1
            ? [
                 '<20>{#p/undyne}{#e/undyne/3}And when I lost my eye in a training accident...',
                 '<20>{#p/undyne}{#e/undyne/2}I had nobody to turn to.'
              ]
            : [ '<20>{#p/undyne}{#e/undyne/5}NGAHHH!\nEnough warming up!' ],
      turnTalkA6a: () =>
         save.data.n.state_starton_papyrus === 1
            ? [
                 '<20>{#p/undyne}{#e/undyne/11}Howling in pain, I dragged myself across the floor...',
                 '<20>{#e/undyne/3}Hoping someone would hear me.'
              ]
            : [ "<20>{#p/undyne}{#e/undyne/20}Well... you're tough!" ],
      turnTalkA6b: () =>
         save.data.n.state_starton_papyrus === 1
            ? [
                 '<20>{#p/undyne}{#e/undyne/11}Howling in pain, I dragged myself across the floor...',
                 '<20>{#e/undyne/3}Hoping someone would hear me.'
              ]
            : [
                 '<20>{#p/undyne}{#e/undyne/6}Mercy!\nHa!',
                 "<20>{#e/undyne/5}I still can't believe you want to SPARE me!"
              ],
      turnTalkA7a: () =>
         save.data.n.state_starton_papyrus === 1
            ? [
                 '<20>{#p/undyne}{#e/undyne/4}Then, I heard an innocent voice.',
                 '<20>{#e/undyne/3}Calling from the distance.'
              ]
            : [ '<20>{#p/undyne}{#e/undyne/0}But even if you could beat me...' ],
      turnTalkA7b: () =>
         save.data.n.state_starton_papyrus === 1
            ? [
                 '<20>{#p/undyne}{#e/undyne/4}Then, I heard an innocent voice.',
                 '<20>{#e/undyne/3}Calling from the distance.'
              ]
            : [ '<20>{#p/undyne}{#e/undyne/3}But even if I DID spare you...' ],
      turnTalkB1: () =>
         save.data.n.state_starton_papyrus === 1
            ? [
                 '<20>{#p/undyne}{#e/undyne/2}After searching desperately for help, to no avail...',
                 '<20>{#e/undyne/3}An innocent voice called my name.'
              ]
            : [ "<20>{#p/undyne}{#e/undyne/3}Honestly, I'm doing you a favor..." ],
      turnTalkB2: () =>
         save.data.n.state_starton_papyrus === 1
            ? [ '<20>{#p/undyne}{#e/undyne/2}At the time, Papyrus was just a kid.' ]
            : [ '<20>{#p/undyne}{#e/undyne/1}No human has EVER made it past Asgore!' ],
      turnTalkB3: () =>
         save.data.n.state_starton_papyrus === 1
            ? [ '<20>{#p/undyne}{#e/undyne/3}Most kids run when they sense danger...', '<20>{#e/undyne/4}But not him.' ]
            : [ '<20>{#p/undyne}{#e/undyne/4}Killing you now is an act of mercy...' ],
      turnTalkB4: () =>
         save.data.n.state_starton_papyrus === 1
            ? [
                 '<20>{#p/undyne}{#e/undyne/2}All that mattered to him was that someone was hurting.',
                 '<20>{#e/undyne/2}Someone he could-\nNo, HAD to help.'
              ]
            : [ '<20>{#p/undyne}{#e/undyne/6}So STOP being so damn resilient!' ],
      turnTalkB5: () =>
         save.data.n.state_starton_papyrus === 1
            ? [
                 "<20>{#p/undyne}{#e/undyne/4}'Cause that's just who he was.",
                 '<20>{#p/undyne}{#e/undyne/3}Right to the end.'
              ]
            : [ '<20>{#p/undyne}{#e/undyne/5}What the hell are humans made out of!?' ],
      turnTalkB6: () =>
         save.data.n.state_starton_papyrus === 1
            ? [
                 '<20>{#p/undyne}{#e/undyne/4}For all my bravado, courage, and strength of will...',
                 "<20>{#e/undyne/11}Even I didn't have the bravery to be like him."
              ]
            : [ '<20>{#p/undyne}{#e/undyne/5}Anyone else would be DEAD by now!' ],
      turnTalkB7a: () =>
         save.data.n.state_starton_papyrus === 1
            ? [
                 "<20>{#p/undyne}{#e/undyne/2}You didn't just kill a friend, or a student.",
                 "<20>{#e/undyne/2}You killed the one person who would've forgiven you for it."
              ]
            : [ '<20>{#p/undyne}{#e/undyne/7}Are you even listening to me!?' ],
      turnTalkB7b: () =>
         save.data.n.state_starton_papyrus === 1
            ? [
                 "<20>{#p/undyne}{#e/undyne/2}You didn't just kill a friend, or a student.",
                 "<20>{#e/undyne/2}You killed the one person who would've forgiven you for it."
              ]
            : [ "<20>{#p/undyne}{#e/undyne/8}And sparing me won't do anything!!" ],
      turnTalkB8a: () =>
         save.data.n.state_starton_papyrus === 1
            ? [
                 '<20>{#p/undyne}{#e/undyne/11}With him gone...',
                 "<20>{#p/undyne}{#e/undyne/2}The only mercy YOU'RE going to get...",
                 '<20>{#p/undyne}{#e/undyne/1}...is a quick death at the end of MY spear!'
              ]
            : [ '<20>{#p/undyne}{#e/undyne/9}Come on!' ],
      turnTalkB8b: () =>
         save.data.n.state_starton_papyrus === 1
            ? [
                 '<20>{#p/undyne}{#e/undyne/11}With him gone...',
                 "<20>{#p/undyne}{#e/undyne/2}The only mercy YOU'RE going to get...",
                 '<20>{#p/undyne}{#e/undyne/1}...is a quick death at the end of MY spear!'
              ]
            : [ '<20>{#p/undyne}{#e/undyne/1}Seriously.' ],
      turnTalkC1: () =>
         save.data.n.state_starton_papyrus === 1
            ? [
                 '<20>{#p/undyne}{#e/undyne/11}You know, punk...',
                 "<20>{#p/undyne}{#e/undyne/2}It's rude to interrupt people when they're monologuing.",
                 "<20>{#p/undyne}{#e/undyne/2}...\nYou're going to pay for what you did to him."
              ]
            : [
                 '<20>{#p/undyne}{#e/undyne/1}So, you think you can just stand there and block all my spears, huh?',
                 "<20>{#p/undyne}{#e/undyne/3}Heheh... sometimes, you've just gotta let em' through...",
                 "<20>{#p/undyne}{#e/undyne/5}OR ELSE THEY'LL BLOW YOU TO PIECES!"
              ],
      turnTalkC2: () =>
         save.data.n.state_starton_papyrus === 1
            ? [
                 '<20>{#p/undyne}{#e/undyne/2}Alphys told me humans can be determined...',
                 '<20>{#p/undyne}{#e/undyne/1}Feh.\nDetermination will only get you so far.'
              ]
            : [
                 '<20>{#p/undyne}{#e/undyne/1}Alphys told me humans can be determined...',
                 '<20>{#p/undyne}{#e/undyne/1}I see now what she meant by that!'
              ],
      turnTalkC3: () =>
         save.data.n.state_starton_papyrus === 1
            ? [ '<20>{#p/undyne}{#e/undyne/1}And you know what?', "<20>{#e/undyne/0}I'm determined, too!" ]
            : [ "<20>{#p/undyne}{#e/undyne/1}But I'm determined, too!" ],
      turnTalkC4: [ '<20>{#p/undyne}{#e/undyne/6}Determined to end this RIGHT NOW!!' ],
      turnTalkC5: [ '<20>{#p/undyne}{#e/undyne/7}...RIGHT NOW!' ],
      turnTalkC6: [ '<20>{#p/undyne}{#e/undyne/9}...RIGHT...\n...\n...NOW!!' ],
      turnTalkC7: [ '<20>{#p/undyne}{#e/undyne/10}Ha...\nHa...' ],
      turnTalkC8: [ '<20>{#p/undyne}{#e/undyne/5}NGAHHH!!!\nDIE ALREADY, YOU LITTLE BRAT!' ],
      turnTalkC9a: [ "<20>{#p/undyne}{#e/undyne/5}YOU'RE GETTING IN MY WAY!" ],
      turnTalkC9b: [ '<20>{#p/undyne}{#e/undyne/5}I WILL NEVER TAKE MERCY FROM THE LIKES OF YOU!' ],
      turnTalkC10a: [ '<20>{#p/undyne}{#e/undyne/6}I WILL NOT BE DEFEATED!' ],
      turnTalkC10b: [ '<20>{#p/undyne}{#e/undyne/6}I WILL FIGHT YOU TO THE BITTER END!' ],
      turnTalkD: [ '<20>{#p/undyne}{#e/undyne/9}...' ],
      death1: [
         '<20>{*}{#p/undyne}Ngahhh...',
         '<20>{*}You were stronger...\nThan I thought...',
         '<20>{*}So then...\n...this is where...\n...it ends...',
         '<20>{*}...'
      ],
      death2: [ '<20>{*}{#p/undyne}{#e/undyne/31}No...' ],
      death3: () => [
         '<20>{*}{#p/undyne}{#e/undyne/32}NO!',
         "<20>{*}I won't die!",
         save.data.n.state_starton_papyrus === 1
            ? '<20>{*}{#e/undyne/36}Alphys...\nAsgore...\nEven that robot...'
            : '<20>{*}{#e/undyne/36}Alphys...\nAsgore...\nPapyrus...',
         '<20>{*}{#e/undyne/32}Everyone is counting on me to protect them!',
         '<20>{*}{#e/undyne/32}NNNNGAH!'
      ],
      death4: [
         '<20>{*}{#p/undyne}{#e/undyne/32}Human!',
         "<20>{*}{#e/undyne/36}In the name of everybody's hopes and dreams...",
         '<20>{*}{#e/undyne/32}I WILL DEFEAT YOU!'
      ],
      determination1: [ "<20>{#p/undyne}{#e/undyne/32}Come on, is that all you've got!?" ],
      determination2: [ '<20>{#p/undyne}{#e/undyne/32}...pathetic.' ],
      determination3: [ "<20>{#p/undyne}{#e/undyne/32}You're going to have to try harder than that!" ],
      determination4: [ '<20>{#p/undyne}{#e/undyne/34}S-see how strong we are when we believe in ourselves?' ],
      determination5: [ '<20>{#p/undyne}{#e/undyne/35}H... heh...' ],
      determination6: [ '<20>{#p/undyne}{#e/undyne/34}Had enough yet?' ],
      determination7: [ '<20>{#p/undyne}{#e/undyne/35}...' ],
      determination8: [ "<20>{#p/undyne}{#e/undyne/35}...I won't...\n...\ngive up..." ],
      determination9: [ '<20>{#p/undyne}{#e/undyne/35}...' ],
      death5: [
         '<20>{*}{#p/undyne}...',
         '<20>{*}Ha...\nHa...',
         '<20>{*}...\nAlphys...',
         '<20>{*}This is what I was afraid of...',
         '<20>{*}This is why I never told you...',
         '<20>{*}...'
      ],
      death6: [
         '<20>{*}{#p/undyne}{#e/undyne/32}No...\nNo!',
         '<20>{*}{#e/undyne/32}Not yet!',
         "<11>{*}{#e/undyne/34}I won't die!"
      ],
      death7: [ '<20>{#p/undyne}{*}{#i/60}{@random:1.1,1.1}NGAHHHHHHHH!!!{^10}{%}' ],
      death8: [ "<20>{#p/undyne}{*}{#i/80}{@random:1.1,1.1}I WON'T DIE!{^15}{%}" ],
      death9: [ "<20>{#p/undyne}{*}{#i/100}{@random:1.1,1.1}I {^10}WON'T{^30}{%}" ],
      deterStatus1: [ '<32>{#p/story}* Undyne is smiling as if nothing is wrong.' ],
      deterStatus2: [ "<32>{#p/story}* Undyne's body is wavering." ],
      deterStatus3: [ "<32>{#p/story}* Undyne's body is losing its shape." ],
      deterStatus4: [ '<32>{#p/story}* Undyne is corrupting.' ],
      deterStatus5: [ '<32>{#p/story}* Smells like determination.' ],
      challengeText1: [ "<32>{#p/narrator}* You tell Undyne her attacks are too easy.\n* She doesn't care." ],
      challengeText2: [ '<32>{#p/narrator}* You tell Undyne her attacks are too easy.\n* The bullets get faster.' ],
      challengeText3: [ '<32>{#p/narrator}* You tell Undyne her attacks are too easy.\n* The bullets get unfair.' ],
      challengeText4: [ '<32>{#p/narrator}* You tell Undyne she should give you a REAL fight.' ],
      challengeText5: [ "<32>{#p/narrator}* You tell Undyne her attacks are too easy.\n* She can't go any faster." ],
      challengeText6: [
         '<32>{#p/narrator}* You tell Undyne her attacks are too easy.\n* Are you insane!?',
         '<32>* The bullets get ridiculous.'
      ],
      challengeText7: [ "<32>{#p/narrator}* You tell Undyne her attacks are too easy.\n* She's not paying attention." ],
      pleadText1: [ "<32>{#p/narrator}* You told Undyne you didn't want to fight.\n* But nothing happened." ],
      pleadText2: [
         '<32>{#p/narrator}* You told Undyne you just want to be friends.\n* She remembers someone...',
         '<32>* Her attacks get a little less extreme.'
      ],
      pleadText3: [ "<32>{#p/narrator}* You told Undyne you just want to be friends.\n* She doesn't believe you." ],
      pleadText4: [ "<32>{#p/narrator}* You told Undyne you didn't want to fight.\n* She laughs." ],
      pleadText5: [ "<32>{#p/narrator}* You told Undyne you didn't want to fight.\n* She looks confused..." ],
      pleadText6: [ "<32>{#p/narrator}* You told Undyne you didn't want to fight.\n* She's not paying attention." ],
      genoCutscene1: [ '<08>{#p/kidding}{#e/kidd/0}...', '<08>{#e/kidd/1}H... huh?', '<08>{#e/kidd/1}What is- {%}' ],
      genoCutscene2: [ '<08>{#p/kidding}{#e/kidd/3}UNDYNE!!!', '<08>{#e/kidd/4}I...!' ],
      genoCutscene3: [ '<20>{#p/undyne}{#e/undyne/1}Kid...?' ],
      genoCutscene3x: [
         '<20>{#p/undyne}{#e/undyne/4}Hey, shh...',
         "<20>{#e/kidd/7}I'll be fine, kid.",
         '<20>{#p/undyne}Just get outta here, okay?'
      ],
      genoCutscene4: [
         "<08>{#p/kidding}{#e/kidd/5}I couldn't stop it...",
         '<08>{#e/kidd/6}They... he...',
         '<08>{#e/kidd/7}He did some- thing to me...'
      ],
      genoCutscene5: [ '<20>{#p/undyne}{#e/undyne/2}Your eye...' ],
      genoCutscene6: [ '<08>{#p/kidding}{#e/kidd/6}I...', '<08>{#p/kidding}{#e/kidd/6}I...' ],
      genoCutscene7: [ '<08>{#p/kidding}{#e/kidd/7}I hurt you...' ],
      genoCutscene8: [ "<20>{#p/undyne}{#e/undyne/3}It's nothing..." ],
      genoCutscene9: [
         "<20>{#e/undyne/4}Look, I'll take care of these punks.",
         "<20>You'll never have to kill anyone for them again.",
         '<20>Just get outta here, okay?'
      ],
      genoCutscene10: [ '<08>{#e/kidd/8}{#p/kidding}...' ],
      genoCutscene11: [ '<20>{#p/undyne}{#e/undyne/5}Dr. Alphys will look after you.', '<20>{#e/undyne/6}Now go!' ],
      genoCutscene12a: [
         '<20>{#p/undyne}{#e/undyne/7}...heh...\n"It\'s nothing..."',
         '<20>No... s-somehow, with just one hit...'
      ],
      genoCutscene12b: [ "<20>I'm already...", '<20>Already...' ],
      genoCutscene12c: [ '<20>D...\nDamn it...', '<20>Papyrus...\nAsgore...\nAlphys...' ],
      genoCutscene12d: [ '<20>Just like that, I...', "<20>{#e/undyne/8}I've failed you." ],
      genoCutscene12e: [ '<20>I...', "{#e/undyne/8}I can't..." ],
      genoCutscene13: [ '<20>{#p/undyne}...', '<11>{#e/undyne/12}No...' ],
      genoCutscene14: [
         "<20>{*}{#p/undyne}{#e/undyne/11}My body...\nIt feels like it's splitting apart.{^15}{%15}",
         "<20>{*}Like any instant, I'll scatter into a million pieces.{^15}{%15}",
         '<20>{*}But deep, deep in my SOUL...{^15}{%15}',
         "<20>{*}There's a burning feeling I can't describe.{^15}{%15}",
         "<20>{*}{#e/undyne/12}A feeling that WON'T let me die.{^15}{%15}",
         "<20>{*}{#e/undyne/11}You've killed too many of our people... too many of my friends...{^15}{%15}",
         "<20>{*}If you two get past me, you'll destroy them all, won't you?{^15}{%15}",
         "<20>{*}Everyone's hopes.\nEveryone's dreams.\nVanquished in an instant.{^15}{%15}",
         "<20>{*}{#e/undyne/12}But I WON'T let you do that.{^15}{%15}",
         '<20>{*}{#e/undyne/13}Right now, everyone in the galaxy...{^15}{%15}',
         '<20>{*}I can feel their minds working as one.{^15}{%15}',
         '<20>{*}And we all have ONE goal.{^15}{%15}',
         '<20>{*}{#e/undyne/14}To defeat YOU.{^15}{%15}',
         '<20>{*}{#e/undyne/13}Human.\nAsriel.\n...no, WHATEVER you two are.{^15}{%15}',
         '<20>{*}{#e/undyne/14}For the sake of the entire galaxy...{^15}{%15}'
      ],
      genoCutscene14x: [
         '<20>{#e/undyne/11}No...',
         '<20>{#e/undyne/12}Not like this...!',
         '<20>{#e/undyne/13}Everyone in the galaxy is counting on me!',
         "<20>{#e/undyne/14}I WON'T let them down!"
      ],
      genoCutscene15: [ "<20>{*}{#p/undyne}{#v/1}You're gonna have to try a little harder than THAT." ],
      genoCutscene15x: [ "<20>{#p/undyne}{#v/1}You're gonna have to try a little harder than that!" ],
      genoDeath1: [
         '<20>{*}{#p/undyne}{#v/1}Damn it...',
         "<20>{*}So even THAT power...\nIt wasn't enough...?",
         '<20>{*}...',
         '<20>{*}{#e/undyne/25}Heh...',
         '<20>{*}Heheheh...'
      ],
      genoDeath2: [
         '<20>{*}{#e/undyne/26}If you...{^30}{%10}',
         "<20>{*}If you think I'm gonna give up hope, you're wrong.{^30}{%10}",
         "<20>{*}{#e/undyne/27}'Cause I've... got my friends behind me.{^30}{%10}",
         '<20>{*}{#e/undyne/28}Alphys told me she had a backup plan in case I failed...{^30}{%10}',
         "<20>{*}{#e/undyne/29}By now, she's called Asgore and told him to absorb the six human SOULs.{^30}{%10}"
      ],
      genoDeath3: [ '<20>{*}{#p/undyne}{#v/1}{#e/undyne/30}And with that power...{^30}{%10}' ],
      genoDeath4: [ '<20>{*}{#p/undyne}{#v/1}{#e/undyne/30}This world will live on...!{^30}{%10}' ],
      lowStatus1: [ '<32>{#p/story}* The starlight is glimmering...' ],
      lowStatus2: [ '<32>{#p/story}* Undyne flips her spear impatiently.' ],
      lowStatus3: [ '<32>{#p/story}* Floral shards drift in front of you.' ],
      lowStatus4: [ '<32>{#p/story}* Steam whirls around you.' ],
      lowStatus5: [ '<32>{#p/story}* The spears pause for a moment.' ],
      genoStatus1: [ '<32>{#p/asriel2}* How did she...' ],
      genoStatus2: [ '<32>{#p/asriel2}* No... this is impossible.' ],
      genoStatus3: [ "<32>{#p/asriel2}* Even in my timelines, she's never done this before..." ],
      genoStatus4: [ "<32>{#p/asriel2}* $(name)...\n* I don't think you can beat her alone like this..." ],
      genoStatus5: [ '<32>{#p/asriel2}* ...' ],
      trueGenoStatusX: () =>
         battler.volatile[0].vars.azzyAssist < 2
            ? [ "<32>{#p/asriel2}* Let's see how she likes THIS." ]
            : [ '<32>{#p/asriel2}* Remember our strategy, $(name).' ],
      trueGenoStatus1: [ '<32>{#p/asriel2}* Stay focused.' ],
      trueGenoStatus2: [ '<32>{#p/asriel2}* We can do this.' ],
      trueGenoStatus3: [ "<32>{#p/asriel2}* Don't let her get to you." ],
      trueGenoStatus4: [ "<32>{#p/asriel2}* I've got your back." ],
      trueGenoStatus5: [ '<32>{#p/asriel2}* Just keep attacking...' ],
      trueGenoStatus6: [ "<32>{#p/asriel2}* Don't forget our goal." ],
      trueGenoStatus7: [ "<32>{#p/asriel2}* She can't hold on forever..." ],
      trueGenoStatus8: [ '<32>{#p/asriel2}* Our victory is inevitable.' ],
      trueGenoStatusLow1: [ '<32>{#p/asriel2}* Almost dead...!' ],
      trueGenoStatusLow2: [ '<32>{#p/asriel2}* Any moment now...' ],
      asrielExplain: () => [
         ...(battler.volatile[0].vars.azzyAssist < 2
            ? [ "<20>{*}{#p/asriel2}{#f/4}Your attacks aren't going to work, $(name)." ]
            : [
                 "<20>{*}{#p/asriel2}{#f/8}You DO remember what was going on last time, don't you?",
                 "<20>{*}{#f/4}Your attacks weren't going to do anything to her, $(name).",
                 '<20>{*}{#f/3}Between timelines, though, I had a chance to think about it.'
              ]),
         "<20>{*}{#f/13}This magic I've had on hand since I took Toriel's SOUL...",
         "<20>{*}{#f/3}It's not much, but when you make an attack, I'll lend you some of it.",
         "<20>{*}{#f/3}It should allow you to key in on Undyne's weak points.",
         '<20>{*}{#f/4}If you can hit them all in order, your attack will be stronger.',
         '<20>{*}{#f/3}Good luck...'
      ],
      neutralFinalStatus: [ '<32>{#p/story}* Undyne looks determined.' ]
   },
   b_opponent_dateundyne: {
      name: '* Undyne',
      snacker: [ '<20>{#p/undyne}{#e/undyne/12}Enjoy it while you still can.' ],
      artichoke: [ '<20>{#p/undyne}{#e/undyne/16}...' ],
      intro: [
         "<20>{#p/undyne}{#f/0}I've been defeated, my house is in ruins...",
         '<20>I even failed to befriend you.',
         '<20>...',
         "<20>{#e/undyne/12}That's it.",
         "<20>I don't care if you're my house- guest anymore.",
         '<20>{#e/undyne/9}One final rematch, all out on both sides!!',
         "<20>{#e/undyne/7}IT'S THE ONLY WAY I CAN REGAIN MY LOST PRIDE!!",
         "<20>{#e/undyne/9}NOW COME ON, HIT ME WITH EVERYTHING YOU'VE GOT!!!"
      ],
      status1: [ '<32>{#p/story}* Undyne is letting you make the first attack.' ],
      act_check: [ '<32>{#p/story}* UNDYNE - ATK 41 DEF 21\n* The real, ACTUAL final battle has finally begun!' ],
      idleTalk1: [ "<20>{#p/undyne}{#e/undyne/9}Show me what you're made of!" ],
      idleTalk2: [ '<20>{#p/undyne}{#e/undyne/9}Come on!' ],
      idleTalk3: [ "<20>{#p/undyne}{#e/undyne/9}What's the matter, scared?" ],
      idleTalk4: [ "<20>{#p/undyne}{#e/undyne/9}What's the holdup?" ],
      fightTalk: [
         '<20>{#p/undyne}{#e/undyne/16}What.',
         "<20>{#e/undyne/15}That's the best you can manage?",
         '<20>{#e/undyne/3}Even attacking at full force...',
         "<20>{#e/undyne/33}You just can't muster any intent to hurt me, huh?"
      ],
      flirtTalk0: [
         '<20>{#p/undyne}{#e/undyne/12}When I told you to hit me...',
         '<20>{#e/undyne/9}I MEANT IT LITERALLY!'
      ],
      flirtTalk1: [
         '<20>{#p/undyne}{#e/undyne/6}Wh-... no!',
         "<20>{#e/undyne/8}If anyone's got someone's heart, it's...",
         '<20>{#e/undyne/5}Wait, no-\nShut up!!!'
      ],
      flirtTalk2: [
         '<20>{#p/undyne}{#e/undyne/10}Would you STOP THAT!?',
         "<20>{#e/undyne/15}If you keep going like this, I'll...",
         "<20>{#e/undyne/16}I'll..."
      ],
      flirtTalk3: [
         '<20>{#p/undyne}{#p/undyne}{#e/undyne/18}Wha-...\nI...!',
         '<20>{#e/undyne/19}...',
         '<20>{#e/undyne/10}AHHHHHHHHHHHHHH-\nYOU FLIRTATIOUS LITTLE BRAT!',
         '<20>{#e/undyne/8}I HAVE HALF THE NERVE TO...',
         '<20>{#e/undyne/7}TO...',
         '<20>{#e/undyne/7}...'
      ],
      flirtStatus0: [ "<33>{#p/story}* Well, that didn't work." ],
      flirtStatus1: [ '<33>{#p/story}* Something magical is happening.' ],
      flirtStatus2: [ '<32>{#p/story}* Undyne is about to break...' ],
      flirtText0: [ '<32>{#p/narrator}* You try to flirt with Undyne...' ],
      flirtText1: [ "<32>{#p/narrator}* You tell Undyne she's got your heart hook, line, and sinker." ],
      flirtText2: [ "<32>{#p/narrator}* You commend Undyne on her brave, fighting spirit.\n* She's YOUR hero, now." ],
      flirtText3: [ "<32>{#p/narrator}* You tell Undyne she's a precious, adorable little urchin." ],
      cutscene1: [ '<20>{#p/undyne}{#e/undyne/4}Heh... you know what?' ],
      cutscene2a: [
         "<20>{#e/undyne/11}I don't actually want to hurt you either.",
         '<20>{#e/undyne/11}At first, I despised your stupid saccharine schtick, but...'
      ],
      cutscene2b1: [ '<20>{#e/undyne/3}The way you acted towards me right now, it...' ],
      cutscene2b2: [ '<20>{#e/undyne/3}The way you hit me right now, it...' ],
      cutscene2c: [
         '<20>{#e/undyne/4}Reminded me of someone I used to train with.',
         "<20>{#e/undyne/11}Now I know you aren't just some wimpy loser.",
         "<20>{#e/undyne/13}You're a wimpy loser with a big heart!",
         '<20>{#e/undyne/4}Just like him...',
         '<20>{#e/undyne/11}...',
         '<20>{#e/undyne/3}Listen, human.',
         '<20>{#f/undyne/0}It seems that you and Asgore are destined to meet.',
         '<20>{#e/undyne/3}Knowing him...',
         "<20>{#e/undyne/4}He probably doesn't want to fight you.",
         '<20>{#f/undyne/0}Talk to him.',
         "<20>{#f/undyne/1}I'm sure you two can work something out.",
         '<20>{#e/undyne/3}Eventually, some meaner human will end up here...',
         "<20>{#e/undyne/3}And I'll take THEIR soul instead of yours.",
         '<20>{#f/undyne/1}That makes sense, right?\nFuhuhu.',
         '<20>{#f/undyne/0}Oh, and if you DO hurt Asgore...',
         "<20>{#e/undyne/11}I'll take the human SOULs... cross the force field...",
         '<20>{#e/undyne/6}And beat the hell out of you!',
         "<20>{#e/undyne/13}That's what friends are for, right?",
         '<20>{#e/undyne/13}Fuhuhu!',
         "<20>{#e/undyne/13}Now let's get the hell out of this flaming house!"
      ]
   },

   i_artifact: {
      battle: {
         description: 'It is said this pendant was worn by Erogot himself.',
         name: 'Artifact'
      },
      drop: [ '<32>{#p/human}* (You threw away the artifact.)', '<32>{#p/narrator}* How could you.' ],
      info: [ '<32>{#p/narrator}* It is said this pendant was worn by Erogot himself.' ],
      name: 'Legendary Artifact',
      use: () => [
         '<32>{#p/human}* (You used the artifact...)',
         ...(battler.active && battler.target.opponent.metadata.reactArtifact
            ? []
            : [ '<32>{#p/human}* (Nothing happened.)' ])
      ]
   },
   i_astrofood: {
      battle: {
         description: 'Not for the faint of teeth.',
         name: 'Licorice'
      },
      drop: [ '<32>{#p/human}* (You threw away the Licorice.)' ],
      info: [ '<32>{#p/narrator}* "Licorice Bar" Heals 24 HP\n* Not for the faint of teeth.' ],
      name: 'Licorice Bar',
      use: [ '<32>{#p/human}* (You gnawed at the Licorice.)' ]
   },
   i_sap: {
      battle: {
         description: "Sourced from a tree that grew on the monsters' homeworld.",
         name: 'Sap'
      },
      drop: [ '<32>{#p/human}* (You threw away the Sap.)' ],
      info: [ '<32>{#p/narrator}* "Tree Sap" Heals 25 HP\n* Sourced from a tree that grew on the monsters\' homeworld.' ],
      name: 'Tree Sap',
      use: [
         '<32>{#p/human}* (You chewed on the Sap.)',
         '<32>* (You then swallowed the Sap.)',
         '<32>{#p/narrator}* No, why...\n* Why would you do that...'
      ]
   },
   i_goggles: {
      battle: {
         description: 'Expand your reality!\n* Makes you invincible longer.',
         name: 'Goggles'
      },
      drop: [ '<32>{#p/human}* (You threw away the goggles.)' ],
      info: [ '<32>{#p/narrator}* "AR Goggles" (6 DF)\n* Expand your reality!\n* Makes you invincible longer.' ],
      name: 'AR Goggles',
      use: [ '<32>{#p/human}* (You put on the goggles.)' ]
   },
   i_padd: {
      battle: {
         description: 'An old datapad journal.\n* Makes you invincible longer.',
         name: 'Datapad'
      },
      drop: [ '<32>{#p/human}* (You threw away the datapad.)' ],
      info: [ '<32>{#p/narrator}* "Datapad" (2 AT)\n* An old datapad journal.\n* Makes you invincible longer.' ],
      name: 'Datapad',
      use: [ '<32>{#p/human}* (You equipped the datapad.)' ]
   },
   i_punchcard: {
      battle: {
         description: 'Redeem three punch cards for a free Nice Cream!',
         name: 'Punch Card'
      },
      drop: [ '<32>{#p/human}* (You threw away the punch card.)' ],
      info: [ '<32>{#p/narrator}* Redeem three punch cards for a free Nice Cream!' ],
      name: 'Punch Card',
      use: () =>
         battler.active
            ? [ '<32>{#p/human}* (You looked at the punch card...)', '<32>{#p/human}* (Nothing happened.)' ]
            : []
   },
   i_quiche: {
      battle: {
         description: 'With great confections come great sweetsponsibilities.',
         name: 'Cheesecake'
      },
      drop: [ '<32>{#p/human}* (You threw away the cheesecake.)', '<32>{#p/narrator}* The cycle of abandonment.' ],
      info: [ '<32>{#p/narrator}* "Cheesecake" Heals 45 HP\n* With great confections come great sweetsponsibilities.' ],
      name: 'Cheesecake',
      use: [ '<32>{#p/human}* (You ate the cheesecake.)' ]
   },
   i_rations: {
      battle: {
         description: 'Standard-issue rations.\n* Great for emergencies.',
         name: 'Rations'
      },
      drop: [ '<32>{#p/human}* (You threw away the Rations.)' ],
      info: [ '<32>{#p/narrator}* "Rations" Heals 30 HP\n* Standard-issue rations.\n* Great for emergencies.' ],
      name: 'Rations',
      use: [ '<32>{#p/human}* (You consumed the Rations.)' ]
   },
   i_tea: {
      battle: {
         description: 'Increases your SPEED in battle.',
         name: 'Tea'
      },
      drop: [ '<32>{#p/human}* (You threw away the tea.)' ],
      info: [ '<32>{#p/narrator}* "Nebula Tea" Heals 15 HP\n* Increases your SPEED in battle.' ],
      name: 'Nebula Tea',
      use: () => [
         '<32>{#p/human}* (You drank the tea.)',
         battler.active
            ? '<32>{#s/speed}{#p/narrator}* SPEED increased!'
            : '<32>{#p/human}* (No effect outside of battle.)'
      ]
   },
   i_tzn: {
      battle: {
         description: 'A large tablet said to improve higher brain function.',
         name: 'TZN'
      },
      drop: [ '<32>{#p/human}* (You threw away the TZN.)' ],
      info: [ '<32>{#p/narrator}* "TZN" Heals 5 HP\n* A large tablet said to improve higher brain function.' ],
      name: 'TZN',
      use: [ '<32>{#p/human}* (You ingested the TZN.)', '<32>{#p/narrator}* Tastes like knowledge...' ]
   },
   i_flakes: {
      battle: {
         description: "It's made with colored pieces of construction paper.",
         name: 'Tem Flakes'
      },
      drop: [ '<32>{#p/human}* (You discarded the Temmie Flakes.)' ],
      info: [ '<32>{#p/narrator}* "Temmie Flakes" Heals 2 HP\n* It\'s made with colored pieces of construction paper.' ],
      name: 'Temmie Flakes',
      use: [ '<32>{#p/human}* (You ate the Temmie Flakes.)' ]
   },
   i_temyarmor: {
      battle: {
         description: 'The things you can do with a college education!',
         name: 'Tem Armor'
      },
      drop: [ '<32>{#p/human}* (You threw away the Temmie Armor.)', '<32>{#p/narrator}* Are you serious??' ],
      info: [ '<32>{#p/narrator}* "Temmie Armor" (20 DF)\n* The things you can do with a college education!' ],
      name: 'Temmie Armor',
      use: [ '<32>{#p/human}* (You donned the Temmie Armor.)' ]
   },
   i_boots: {
      battle: {
         description: 'Nimble, but fickle. Not a suitable jetpack replacement.',
         name: 'Boots'
      },
      drop: [ '<32>{#p/human}* (You threw away the boots.)' ],
      info: [ '<32>{#p/narrator}* "Hoverboots" (7 AT)\n* Nimble, but fickle. Not a suitable jetpack replacement.' ],
      name: 'Hoverboots',
      use: [ '<32>{#p/human}* (You equipped the boots.)' ]
   },
   i_flight_suit: {
      battle: {
         description: 'Not for the faint of heart.',
         name: 'Jumpsuit'
      },
      drop: [ '<32>{#p/human}* (You threw away the jumpsuit.)' ],
      info: [ '<32>{#p/narrator}* "Flight Suit" (10 DF)\n* Not for the faint of heart.' ],
      name: 'Flight Suit',
      use: [ '<32>{#p/human}* (You put on the jumpsuit.)' ]
   },
   i_snack: {
      battle: {
         description: "Undyne's personal recipe...?",
         name: 'Odd Snack'
      },
      drop: [ '<32>{#p/human}* (You threw away the snack.)' ],
      info: [ '<32>{#p/narrator}* "Odd Snack" Heals 15 HP\n* Undyne\'s personal recipe...?' ],
      name: 'Odd Snack',
      use: [ '<32>{#p/human}* (You ate the snack.)', '<32>{#p/narrator}* ...surprisingly crispy.' ]
   },

   s_tem: {
      exit: () => (world.population === 0 ? [ '<32>{#p/narrator}* ...' ] : [ '<32>{#p/tem}{#k/0}* bOI!!' ]),
      item: (armorprice: number) =>
         world.population === 0
            ? [
                 '0G - tem flake',
                 '0G - tem flake (ON SALE,)',
                 '0G - tem flake (expensiv)',
                 '§fill:#808080§--- TAKEN ---',
                 'Exit'
              ]
            : [
                 '4G - tem flake',
                 '2G - tem flake (ON SALE,)',
                 '20G - tem flake (expensiv)',
                 save.data.b.item_temyarmor
                    ? '§fill:#808080§--- SOLD OUT ---'
                    : save.data.b.colleg
                    ? `${armorprice}G - temy ARMOR!!!`
                    : '1000G - tem pay 4 colleg',
                 'Exit'
              ],
      itemInfo: () => [
         'Heals 2HP\nfood of\ntem',
         'Heals 2HP\nDISCOUNT\nFOOD OF\nTEM!!!',
         'Heals 2HP\nfood of\ntem\n(expensiv)',
         save.data.b.colleg ? 'Armor: 20DF\nmake\nbattles\nver easy!!!' : 'COLLEG\ntem pursu\nhigher\neducation'
      ],
      itemPrompt: '<09>{#p/tem}{#k/0}hOI!\nwelcome to...\nTEM SHOP!',
      itemPurchase: [
         '<09>{#p/tem}{#k/6}thanks PURCHASE!',
         '<09>{#p/tem}{#k/0}fdshfg',
         '<09>{#p/tem}{#k/2}you don hav da muns,',
         "<09>{#p/human}(You're carrying too much.)"
      ],
      itemPurchasePrompt: () => (world.population === 0 ? 'Take it?' : 'Buy it for\n$(x)G?'),
      itemSellPrompt: 'Sell it for\n$(x)G?',
      itemUnavailable: () =>
         world.population === 0 ? '<09>{#p/narrator}* Nothing left.' : '<09>{#p/tem}{#k/2}no more item...',
      itemRestricted: '<09>{#p/tem}{#k/2}not for sale...',
      menu: () => (world.population === 0 ? [ 'Take', 'Steal', 'Read', 'Exit' ] : [ 'Buy', 'Sell', 'Talk', 'Exit' ]),
      menuPrompt1: '<23>{#p/tem}{#k/0}* hOI!\n* welcom to...\n* da TEM SHOP!!!',
      menuPrompt3: () =>
         world.bullied ? '<23>{#p/narrator}* ...but everybody ran.' : '<23>{#p/narrator}* ...but nobody came.',
      note: [ "<32>{#p/narrator}* There's a note here.", '<33>{#p/tem}* "tem don wanna die..."' ],
      sell1: [ '<30>{#p/human}* (You took 494G from behind the counter.)' ],
      sell2: [ '<30>{#p/narrator}* Nothing left.' ],
      talk: [ 'Say Hello', 'About Yourself', 'Temmie History', 'About Shop', 'Exit' ],
      talkPrompt: '<09>{#p/tem}{#k/0}HOI!!!\nim temmie',
      talkText: [
         [ '<32>{#p/tem}{#k/0}* hOI!!!', "<32>* i'm temmie" ],
         [ '<32>{#p/tem}{#k/0}* hOI!!!', "<32>* i'm temmie" ],
         [ '<32>{#p/tem}{#k/3}* us tems hav a DEEP HISTORY!!!' ],
         [ '<32>{#p/tem}{#k/0}* yaYA!!!\n* go to TEM SHOP!!!' ]
      ],
      zeroPrompt: '<09>{#p/narrator}...',
      colleg1: [
         '<32>{#k/1}* WOA!!',
         '<32>{#k/2}* thas ALOT o muns...\n* can tem realy acepts...',
         '<32>{#k/6}* OKs!!!!\n* tem go to colleg and make u prouds!!!'
      ],
      colleg2: [
         '<32>* tem bak from cool leg,',
         '<32>{#k/0}* tem learn MANY THINs,\n* learn to sell new ITEM!\n* yayA!!!'
      ],
      sellExit: 'Exit',
      sellValue: '$(x)G',
      sellStory1: () => [
         '<32>{#k/1}* WOA!!',
         '<32>{#k/2}* u gota... $(x)s!!!',
         save.data.b.colleg
            ? '<32>{#k/4}* hnnn....\n* i gota have dat $(x)s...\n* but i gota pay for gradskool,'
            : '<32>{#k/4}* hnnn....\n* i gota have dat $(x)s...\n* but i gota pay for colleg,',
         '<32>{#k/5}* hnnnn....!!!\n* tem always wanna $(x)s...!'
      ],
      sellStory2: [ '<32>{#k/2}* b.. but...', '<32>{#k/4}* p!!!!!!!!!!!!' ],
      sellStory3: [ "<32>{#k/3}* You're gonna regret that." ]
   },
   s_tortoise: {
      exit: () =>
         world.genocide || (world.population === 0 && !world.bullied)
            ? [ '<32>{#p/monster}{#k/1}* Good riddance.' ]
            : [ '<32>{#p/monster}{#k/0}* Be careful out there, kid!' ],
      item: () => [
         save.data.b.item_padd ? '§fill:#808080§--- SOLD OUT ---' : '55G - Datapad',
         save.data.b.item_goggles ? '§fill:#808080§--- SOLD OUT ---' : '30G - AR Goggles',
         '25G - Nebula Tea',
         '25G - Tree Sap',
         'Exit'
      ],
      itemInfo: [
         'Weapon: 2AT\n($(x) AT)\nInvincible\nlonger.',
         'Armor: 7DF\n($(x) DF)\nInvincible\nlonger.',
         'Heals 15HP\nSPEED\nup in\nbattle.',
         'Heals 25HP\nMade from\na real\ntree.'
      ],
      itemPrompt: () =>
         world.genocide || (world.population === 0 && !world.bullied)
            ? "<09>{#p/monster}{#k/3}Don't expect a discount."
            : "<09>{#p/monster}{#k/4}What are you lookin' for?",
      itemPurchase: () =>
         world.genocide || (world.population === 0 && !world.bullied)
            ? [
                 '<09>{#p/monster}{#k/1}...',
                 '<09>{#p/monster}{#k/1}Here we are.',
                 "<09>{#p/monster}{#k/3}Eh?\nYou can't afford it?",
                 "<09>{#p/human}(You're carrying too much.)"
              ]
            : [
                 '<09>{#p/monster}{#k/0}Thanks!\nWa ha ha.',
                 '<09>{#p/monster}{#k/2}Careful with that.',
                 "<09>{#p/monster}{#k/4}You're a bit short on cash.",
                 "<09>{#p/human}(You're carrying too much.)"
              ],
      itemPurchasePrompt: 'Buy it for\n$(x)G?',
      itemUnavailable: "<09>{#p/monster}{#k/1}Sorry, it's one of a kind.",
      menu: [ 'Buy', 'Sell', 'Talk', 'Exit' ],
      menuPrompt1: "<23>{#p/monster}{#k/0}* Woah there!\n* I've got some neat junk for sale.",
      menuPrompt2: "<23>{#p/monster}{#k/0}* Don't be shy now.",
      menuPrompt3: () =>
         world.genocide
            ? "<23>{#p/monster}{#k/3}* What are you guys up to now?\n* Wait, don't tell me.\n* None of my business, right?"
            : '<23>{#p/monster}{#k/2}* Wa ha ha...\n* So you came to see me.\n* What a treat!',
      sell1: () =>
         world.genocide
            ? [
                 '<30>{#k/4}* Wah ha ha...',
                 '<30>{#k/3}* You sold your SOULs a long time ago.',
                 "<30>{#k/4}* Before you try'n sell anything to me, you best sort that out."
              ]
            : world.population === 0 && !world.bullied
            ? [ '<30>{#k/1}* Wah ha ha...', "<30>{#k/3}* I'm not really interested." ]
            : [
                 "<30>{#p/monster}{#k/2}* Ha!\n* I'm tryin' to get RID of my junk, not get more of it!",
                 "<30>{#k/3}* Though, I've heard if you want to sell stuff, the Temmies are your best bet.",
                 '<30>{#k/0}* Where can you find them?',
                 '<30>{#k/4}* ...',
                 "<30>{#k/0}* I don't remember."
              ],
      sell2: () =>
         world.genocide
            ? [ "<30>{#p/monster}{#k/3}* You sort out that SOUL fiasco yet?\n* Sure doesn't look like it." ]
            : world.population === 0 && !world.bullied
            ? [ "<30>{#p/monster}{#k/1}* I wouldn't buy your chitzy garbage at phaserpoint." ]
            : [ "<30>{#p/monster}{#k/0}* For the last time, I'm not taking it!" ],
      talk: () =>
         world.genocide
            ? [ 'Asriel', '(Threaten)', '(Fight)', 'Undyne', 'Exit' ]
            : world.population === 0 && !world.bullied
            ? [ 'Your Fate', '(Threaten)', '(Fight)', 'Hero', 'Exit' ]
            : [
                 48 <= save.data.n.plot && save.data.n.state_foundry_undyne > 0
                    ? 'About Yourself'
                    : [ 'About Yourself', '§fill:#ff0§The War (NEW)', '§fill:#ff0§Retirement (NEW)', 'Retirement' ][
                         Math.min(save.data.n.shop_gerson, 3)
                      ],
                 [ 'The Homeworld', '§fill:#ff0§Family (NEW)', '§fill:#ff0§Erogot (NEW)', 'Erogot' ][
                    Math.min(save.data.n.shop_homeworld, 3)
                 ],
                 'The Foundry',
                 'About Undyne',
                 'Exit'
              ],
      talkPrompt: () =>
         world.genocide || (world.population === 0 && !world.bullied)
            ? '<09>{#p/monster}{#k/2}Really?\nYOU wanna talk?'
            : '<09>{#p/monster}{#k/0}Anything you wanna know?',
      talkText: [
         () =>
            world.genocide
               ? [
                    '<32>{#p/monster}{#k/1}* You wanna know my thoughts on Asriel?',
                    '<32>{#k/0}* ...\n* He was a good kid.',
                    '<32>{#k/3}* And if he was still alive, he woulda made a great king.',
                    "<32>{#k/4}* As for what you got there standin' in front of me, well, it's not him.",
                    '<32>{#k/0}* It looks like him, talks like him, even has his damned adorable face... bless that kid.',
                    '<32>{#k/3}* But that SOUL... being this close to you, the resemblance is unmistakable.',
                    "<32>{#k/1}* How'd it feel taking the SOUL of your own mother, boy?",
                    '<32>{#k/0}* I wonder.'
                 ]
               : world.population === 0 && !world.bullied
               ? [
                    '<32>{#p/monster}{#k/0}* Long ago, Asgore and I agreed that escaping would be pointless...',
                    '<32>{#k/1}* Since once we left, humans would just kill us.',
                    "<32>{#k/3}* I'll admit I felt a little betrayed when he changed his mind.",
                    '<32>{#k/4}* But now, I think...\n* Maybe he was right to.',
                    "<32>{#k/0}* 'Cause after all, even though we never escaped...",
                    "<32>{#k/3}* A human's killing us anyway, ain't that right?"
                 ]
               : 48 <= save.data.n.plot && save.data.n.state_foundry_undyne > 0
               ? [
                    "<32>{#p/monster}{#k/0}* Eh, there's really not much to say about me.",
                    '<32>{#k/0}* I do my best to live my life...',
                    '<32>{#k/4}* Help those around me in ways that I can.',
                    '<32>{#k/0}* The thing of it is, we live in dangerous times.',
                    "<32>{#k/3}* If the wrong human were to stumble on our little outpost, we'd be as good as gone..."
                 ]
               : [
                    [
                       "<32>{#p/monster}{#k/0}* I've been around a long time.\n* Maybe too long.",
                       '<32>{#k/3}* Back in the day, I served as a chief on the planetary council.',
                       '<32>{#k/2}* The "Saber of Justice" they called me.',
                       "<32>{#k/1}* ...if it weren't for that damned war, I might still be in that position today."
                    ],
                    [
                       '<32>{#p/monster}{#k/0}* Ah yeah, the war.\n* That awful thing took a toll on me.\n* On all of us.',
                       "<32>{#k/4}* Every so often, we'd get these reports...\n* A list of the people who'd died protecting our home.",
                       "<32>{#k/1}* I still remember the look on fluffybuns's face when he had to deliver the bad news to families.",
                       "<32>{#k/1}* That blank stare, those empty eyes...\n* That's what war does to people, kid.",
                       "<32>{#k/3}* That's why I retired."
                    ],
                    [
                       '<32>{#p/monster}{#k/3}* My retirement?',
                       "<32>{#k/2}* Wah ha ha!\n* I'd say it's going well!",
                       "<32>{#k/4}* This old shack isn't exactly up to par with those guys operating from Aerialis...",
                       "<32>{#k/2}* ...but who cares!\n* I don't need to compete with them.",
                       '<32>{#k/0}* The heroic, wacky, and sometimes shy neighors I live with out here are all I could ever ask for.',
                       '<32>{#k/0}* It may not be the home I once dreamed of, but you take what you can get in life.'
                    ],
                    [
                       '<32>{#p/monster}{#k/3}* You want me to repeat myself?',
                       "<32>{#k/4}* Wa ha ha... you'll have to go back in time or something.",
                       "<32>{#k/2}* Even I don't remember what I said!"
                    ]
                 ][Math.min(save.data.n.shop_gerson++, 3)],
         () =>
            world.genocide || (world.population === 0 && !world.bullied)
               ? [
                    "<32>{#p/monster}{#k/3}* I've lived too long to be afraid of something like you.",
                    '<32>{#k/2}* Try it, kiddo!',
                    "<32>{#k/1}* ...I know you can't here.",
                    "<32>{#k/4}* Wah ha...\n* Knowledge like that is part of the reason I've survived so long."
                 ]
               : [
                    [
                       "<32>{#p/monster}{#k/0}* The homeworld...\n* Well, first off, it has a name.\n* It's Krios.",
                       '<32>{#k/3}* I myself grew up in a quiet little town outside the city.\n* Well, I say quiet.',
                       '<32>{#k/4}* Every few days, some of the kids from school would host these time trial races.',
                       "<32>{#k/0}* The weather wasn't always friendly, but they didn't care.\n* If anything, it just made things more interesting.",
                       '<32>{#k/0}* My family and I attended dozens of these races when I was just a kid.',
                       "<32>{#k/0}* Don't get me wrong.\n* Thundersnail is fun, but it's just not the same thing."
                    ],
                    [
                       "<32>{#p/monster}{#k/3}* My family?\n* Eh, there's not much to say.\n* I had good parents, a few siblings.",
                       '<32>{#k/0}* One day, king Erogot came to our town.\n* He and I met at one of those races I told ya about.',
                       "<32>{#k/0}* I was an insignificant country bumpkin, but he saw somethin' in me, somethin' more...",
                       '<32>{#k/4}* One thing led to another, and I ended up moving away from my family at an early age.',
                       "<32>{#k/3}* ...that was the last time I'd ever get to see them face to face."
                    ],
                    [
                       '<32>{#p/monster}{#k/0}* Erogot, the king of the last great era of our homeworld.',
                       "<32>* I'm sure you've read about him at some point.",
                       "<32>{#k/2}* If you haven't, then what asteroid have ya been living under for all this time!?",
                       '<32>{#k/3}* Under his reign, the monster species came so far.\n* Perhaps a little too far.',
                       '<32>{#k/0}* He was so happy to meet a human for the first time... but not for himself.',
                       "<32>{#k/1}* Nah, that was his son's wish.\n* Poor kid got exactly what he asked for and then some..."
                    ],
                    [
                       "<32>{#p/monster}{#k/3}* Forgive me, but I don't really wanna talk about that too much more.",
                       "<32>{#k/1}* Ol' Fluffybuns wouldn't want you to carry that kinda burden."
                    ]
                 ][Math.min(save.data.n.shop_homeworld++, 3)],
         () =>
            world.genocide || (world.population === 0 && !world.bullied)
               ? 48 <= save.data.n.plot
                  ? [
                       [
                          '<32>{#p/monster}{#k/3}* Eh?\n* Fight you?',
                          "<32>{#k/1}* Nah... I'm not a hero.\n* Not anymore.",
                          "<32>{#k/0}* And b'sides...\n* You may have spared Undyne, but everyone else is still dead.",
                          "<32>{#k/4}* I'm better off holding my ground right where I am..."
                       ],
                       [
                          '<32>{#p/monster}{#k/3}* Eh?\n* Fight you?',
                          "<32>{#k/1}* Nah... I'm not a hero.\n* Not anymore.",
                          "<32>{#k/3}* And b'sides...\n* People seem to go missing after they run into you.",
                          "<32>{#k/4}* I'll take that as an omen to stay right where I am..."
                       ],
                       [
                          '<32>{#p/monster}{#k/3}* Eh?\n* Fight you?',
                          "<32>{#k/1}* Nah... I'm not a hero.\n* Not anymore.",
                          "<32>{#k/0}* And b'sides...\n* After what you did to Undyne, I know I don't stand a chance.",
                          "<32>{#k/4}* I'm better off holding my ground right where I am..."
                       ]
                    ][world.genocide ? 2 : save.data.n.state_foundry_undyne]
                  : [
                       '<32>{#p/monster}{#k/3}* Eh?\n* Fight you?',
                       "<32>{#k/1}* Nah... I'm not a hero.\n* Not anymore.",
                       "<32>{#k/0}* And b'sides...\n* These old bones aren't fit for fighting anyhoo.",
                       "<32>{#k/1}* One attack from you, and then I'd... well...",
                       "<32>{#k/4}* At least by talking to you, I've bought enough time for some of them to escape."
                    ]
               : 48 <= save.data.n.plot && save.data.n.state_foundry_undyne > 0
               ? [
                    [
                       '<32>{#p/monster}{#k/3}* You wanna know about the Foundry?\n* This old place?',
                       "<32>{#k/3}* Well, it's a place people often get lost...",
                       '<32>{#k/3}* Or left behind...',
                       "<32>{#k/2}* Boy, I sure hope that doesn't happen to you."
                    ],
                    [
                       '<32>{#p/monster}{#k/3}* You wanna know about the Foundry?\n* This old place?',
                       "<32>{#k/0}* Well, it's never been the friendliest location...",
                       '<32>{#k/3}* From the humans sending us here to die, to the recent loss of a fighting spirit...',
                       "<32>{#k/3}* Nothin' but bad luck down here, kid."
                    ]
                 ][save.data.n.state_foundry_undyne - 1]
               : [
                    '<32>{#p/monster}{#k/3}* You wanna know about the Foundry?\n* This old place?',
                    '<32>{#k/2}* Well, back when we first got trapped out here, this WAS the outpost!',
                    '<32>{#k/0}* All those fancy-schmancy sections added on afterwards were built by us monsters.',
                    "<32>{#k/0}* Turns out most people aren't into the idea of living in the past.\n* Fair enough.",
                    "<32>{#k/2}* But... I just think there's something so decadent about repurposing this place.",
                    "<32>{#k/3}* It was the humans who trapped us here, hoping we'd rot and suffer in darkness.",
                    "<32>{#k/0}* But look at us now.\n* Look at how we've made this place our own.",
                    "<32>{#k/2}* Wa ha ha!\n* Talk about showing 'em who's boss, eh?"
                 ],
         () =>
            48 <= save.data.n.plot
               ? world.genocide
                  ? [
                       [
                          "<32>{#p/monster}{#k/1}* I take it you've killed her by now?",
                          '<32>{#k/1}* ...',
                          '<32>{#k/3}* Then why ask me...',
                          '<32>{#k/3}* Unless...',
                          "<32>{#k/2}* You just wanna get my reaction, don'tcha?",
                          '<32>{#k/4}* ...',
                          '<32>{#k/4}* How about... nah.'
                       ],
                       [
                          '<32>{#p/monster}{#k/1}* I get it, guys.',
                          "<32>{#k/1}* She's dead.",
                          "<32>{#k/3}* You expectin' me to throw a party for you or somethin'?",
                          '<32>{#k/1}* Get outta my sight.'
                       ]
                    ][Math.min(save.data.n.shop_deadfish++, 1)]
                  : world.population === 0 && !world.bullied
                  ? [
                       [
                          '<32>{#p/monster}{#k/4}* Undyne?',
                          save.data.n.plot > 48
                             ? '<32>{#k/4}* She passed through here earlier...'
                             : '<32>{#k/4}* She just passed through here a few moments ago.',
                          '<32>{#k/0}* Said she\'d "given up" on tryin\'a capture you.',
                          '<32>{#k/4}* ...',
                          '<32>{#k/4}* What happened back there...?'
                       ],
                       [
                          '<32>{#p/monster}{#k/3}* Undyne?',
                          "<32>{#k/0}* I haven't heard from her in a while.",
                          '<32>{#k/4}* She just kinda... disappeared.',
                          '<32>{#k/3}* Was that your doing?'
                       ],
                       [
                          [
                             '<32>{#p/monster}{#k/1}* ...',
                             '<32>{#k/1}* You killed her, just like you killed everyone else.',
                             "<32>{#k/3}* Granted, she wasn't intent on letting YOU live...",
                             "<32>{#k/1}* But don't act like this was just self-defense for you.",
                             '<32>{#k/3}* Wa ha...\n* I know you better than that.'
                          ],
                          [ '<32>{#p/monster}{#k/4}* ...', '<32>{#k/0}* What more is there to say?' ]
                       ][Math.min(save.data.n.shop_deadfish++, 1)]
                    ][save.data.n.state_foundry_undyne]
                  : [
                       2 <= save.data.n.plot_date
                          ? [
                               '<32>{#p/monster}{#k/4}* So are you and her... friends now?',
                               '<32>{#k/2}* Wa ha ha!',
                               "<32>{#k/0}* You've done something I never thought possible, kiddo!"
                            ]
                          : [
                               [
                                  '<32>{#p/monster}{#k/4}* Undyne?',
                                  save.data.n.plot > 48
                                     ? '<32>{#k/4}* She passed through here earlier...'
                                     : '<32>{#k/4}* She just passed through here a few moments ago.',
                                  '<32>{#k/0}* Said she was "done" tryin\'a capture you.',
                                  '<32>{#k/4}* ...',
                                  '<32>{#k/4}* The heck did you do to make her say THAT?'
                               ],
                               [
                                  "<32>{#p/monster}{#k/4}* If you're askin' me where to find her, she's at home.\n* Ain't but a few steps away.",
                                  '<32>{#k/3}* From her words to me before...',
                                  '<32>{#k/4}* Seems like you two have some things to work out.'
                               ]
                            ][Math.min(save.data.n.shop_deadfish++, 1)],
                       [
                          '<32>{#p/monster}{#k/3}* Undyne?',
                          "<32>{#k/0}* I haven't heard from her in a while.",
                          '<32>{#k/4}* She just kinda... disappeared.',
                          '<32>{#k/1}* Something tells me you played a part in that...'
                       ],
                       [
                          [
                             '<32>{#p/monster}{#k/4}* ...',
                             '<32>{#k/0}* Well... you killed her.',
                             "<32>{#k/3}* Though, that's kinda her own doing.",
                             '<32>{#k/4}* I never really got why she was so intent on killing you humans...',
                             "<32>{#k/0}* If she wanted your SOUL, couldn't she just wait until you died naturally?",
                             '<32>{#k/3}* Oh well.'
                          ],
                          [ '<32>{#p/monster}{#k/4}* ...', '<32>{#k/0}* What more is there to say?' ]
                       ][Math.min(save.data.n.shop_deadfish++, 1)]
                    ][save.data.n.state_foundry_undyne]
               : world.genocide
               ? [
                    "<32>{#p/monster}{#k/0}* Undyne?\n* Oh, that poor little urchin.\n* Normally, I'd call her the hero...",
                    "<32>{#k/1}* But to be honest, I've seen what you've done.\n* She doesn't stand a chance.",
                    "<32>{#k/4}* Don't get me wrong, she'll give ya one hell of a fight.",
                    '<32>{#k/3}* But no... this world needs a different kinda hero now.',
                    "<32>{#k/3}* Someone that doesn't operate on brawn and bravado...",
                    "<32>{#k/3}* Someone that doesn't see the world like everyone else...",
                    "<32>{#k/0}* Wa ha ha.\n* I don't doubt someone like that will be the end of you."
                 ]
               : world.population === 0 && !world.bullied
               ? [
                    "<32>{#p/monster}{#k/1}* I'm not a hero.",
                    "<32>{#k/3}* But I know there's someone out there.",
                    "<32>* Someone who'll never give up trying to do the right thing, no matter what.",
                    "<32>{#k/0}* There's no prophecy or legend 'bout anyone like that.",
                    "<32>* It's just something I know is true.",
                    '<32>{#k/3}* One day, someone like that will strike you down.'
                 ]
               : [
                    "<32>{#p/monster}{#k/0}* Undyne?\n* Yeah, she's a local hero around here.",
                    '<32>{#k/4}* Through grit and determination alone, she fought her way to the top of the Royal Guard.',
                    '<32>{#k/3}* Actually, she just came through here asking about someone who looked just like you...',
                    "<32>{#k/2}* I'd watch your back, kid.\n* And buy some items...\n* It might just save your hide!\n* Wa ha ha!"
                 ]
      ]
   },

   s_save: {
      f_abyss: {
         name: 'Foundry - Abyss',
         text: [
            '<32>{#p/human}* (You find yourself at the lowest point on the outpost.)',
            '<32>{#p/human}* (This sense of limbo fills you with determination.)'
         ]
      },
      f_battle: {
         name: 'Foundry - Bridge',
         text: [ '<32>{#p/human}* (Distant as it may be, the starlight glimmers, filling you with determination.)' ]
      },
      f_hub: {
         name: 'Foundry - Quiet Area',
         text: [
            '<32>{#p/human}* (A short reprieve in the ongoing chaos...)',
            '<32>{#p/human}* (It fills you with determination.)'
         ]
      },
      f_lobby: {
         name: 'Foundry - Dark Zone',
         text: [ '<32>{#p/human}* (Wandering deeper into the factory fills you with determination.)' ]
      },
      f_prechase: {
         name: 'Foundry - Ferry',
         text: [
            '<32>{#p/human}* (Pylon puzzles, signal stars, and freaky ferries...)',
            '<32>{#p/human}* (These fill you with determination.)'
         ]
      },
      f_sans: {
         name: 'Foundry - Checkpoint',
         text: [
            '<32>{#p/human}* (The hot, damp steam emitted by these vents...)',
            '<32>{#p/human}* (It fills you with determination.)'
         ]
      },
      f_shyren: {
         name: 'Foundry - Vending Machine',
         text: () =>
            save.data.b.killed_shyren
               ? [
                    '<32>{#p/human}* (A sad stillness permeates the air.)',
                    '<32>{#p/human}* (It fills you with determination...)'
                 ]
               : [ '<32>{#p/human}* (The sound of music fills you with determination.)' ]
      },
      f_tunnel: {
         name: 'Foundry - Tunnel',
         text: [ '<32>{#p/human}* (Getting lost amongst the trash fills you with determination.)' ]
      }
   }
};

export default text;

CosmosUtils.status(`LOAD MODULE: FOUNDRY TEXT (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
