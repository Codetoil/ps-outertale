import { CosmosUtils } from '../engine';
import { choicer, world } from '../mantle';
import save from '../save';

export default {
   _1: 'The anomaly did everything they could...',
   _2: 'But alas, {^3}his fate was sealed, {^3}and...',
   _3: 'No addendum to the story could unravel it.',
   _4: 'There was no scenario in which the anomaly could truly be satisfied.',
   _5: 'Is this what they really deserve?',
   _6: 'To live in bittersweet agony, {^3}knowing he could never be...',
   _7: 'No...{^5}\nI will not allow it.',
   _8: 'If bending the fabric of spacetime is what it takes, then...',
   _9: 'So be it.',
   _10: 'I will not rest until the task is done.',
   _11: {
      bed: (_0: boolean) => [
         '<32>{#p/human}* (You inspect the bed.)',
         ...(_0 ? [ '<32>{#p/kidd}{#f/1}* Looks comfy...', '<32>{#f/1}* What kind of office has a bed?' ] : [])
      ],
      plushie: (_0: boolean) => [
         '<32>{#p/human}* (You inspect the plushie.)',
         ...(_0 ? [ '<32>{#p/kidd}{#f/3}* Aw...', '<32>* I used to have one of these...' ] : [])
      ],
      computer: (_0: boolean) => [
         '<32>{#p/human}* (You inspect the computer.)',
         ...(_0 ? [ '<32>{#p/kidd}{#f/1}* Who\'s "$(name)?"', '<32>* It says that on the screen.' ] : [])
      ],
      flowers: (_0: boolean) => [
         '<32>{#p/human}* (You inspect the flowers.)',
         ...(_0 ? [ "<32>{#p/kidd}{#f/1}* I've never seen flowers like these...", '<32>* Have you?' ] : [])
      ]
   },

   b_act: {
      agree: '* Agree',
      appease: '* Appease',
      bathe: '* Bathe',
      beckon: '* Beckon',
      challenge: '* Challenge',
      check: '* Check',
      cheer: '* Cheer',
      clean: '* Clean',
      compliment: '* Compliment',
      console: '* Console',
      counter: '* Counter',
      create: '* Create',
      criticize: '* Criticize',
      dance: '* Dance',
      direct: '* Direct',
      disown: '* Disown',
      distance: '* Distance',
      ditch: '* Ditch',
      dontpick: '* Dont Pick On',
      encourage: '* Encourage',
      flirt: '* Flirt',
      guide: '* Guide',
      heckle: '* Heckle',
      hug: '* Hug',
      hum: '* Hum',
      imitate: '* Imitate',
      insult: '* Insult',
      joke: '* Joke',
      laugh: '* Laugh',
      lecture: '* Lecture',
      mislead: '* Mislead',
      mystify: '* Mystify',
      pat: '* Pat',
      pay: '* Pay',
      pet: '* Pet',
      pick: '* Pick On',
      play: '* Play',
      plead: '* Plead',
      praise: '* Praise',
      reassure: '* Re-Assure',
      resniff: '* Re-Sniff',
      roll: '* Roll Around',
      slap: '* Slap',
      stare: '* Stare',
      steal: '* Steal',
      talk: '* Talk',
      taunt: '* Taunt',
      telloff: '* Tell Off',
      terrorize: '* Terrorize',
      threat: '* Threat',
      translate: '* Translate',
      tug: '* Tug',
      walk: '* Walk',
      whisper: '* Whisper',
      playdead: '* Play Dead',
      flash: '* Flash',
      comfort: '* Comfort',
      perch: '* Perch',
      poke: '* Poke',
      annoy: '* Annoy',
      grin: '* Grin',
      travel: '* Travel',
      disarm: '* Disarm',
      turn: '* Turn',
      burn: '* Burn',
      boast: '* Boast',
      scream: '* Scream',
      heel: '* Heel Turn',
      pose: '* Pose',
      whistle: '* Whistle',
      leech: '* Leech',
      upgrade: '* Upgrade',
      bow: '* Bow',
      blind: '* Blind',
      rap: '* Rap',
      spark: '* Spark',
      sit: '* Sit',
      handshake: '* Handshake',
      shove: '* Shove',
      secret: '* Secret'
   },

   b_group_nobody: () => (world.bullied ? '* ...but everybody ran.' : '* ...but nobody came.'),

   b_opponent_dummy: {
      act_check: [ '<32>{#p/story}* DUMMY - ATK 0 DEF 0\n* A training dummy, circa 251X.\n* CITADEL standard-issue.' ],
      act_flirt: [
         '<32>{#p/human}* (You flirt with DUMMY.)',
         '<32>* .{^7}.{^7}.{^7}',
         "<32>* It went exactly how you'd expect.",
         '<32>* Toriel is trying not to laugh.'
      ],
      act_hug: [
         '<32>{#p/human}* (You hug DUMMY.)',
         '<32>{#p/narrator}* .{^7}.{^7}.{^7}',
         '<32>* Well, that was underwhelming.'
      ],
      act_slap: [
         '<32>{#p/human}* (You slap DUMMY.)',
         '<32>{#p/narrator}* .{^7}.{^7}.{^7}',
         '<32>* Sadly, it did not gain any more sense than it already had.'
      ],
      act_talk: [
         '<32>{#p/human}* (You talk to DUMMY.)',
         '<32>{#p/narrator}* .{^7}.{^7}.{^7}',
         "<32>* It doesn't seem much for conversation.",
         '<32>* Toriel seems pleased with you.'
      ],
      bored: [ '<32>{#p/narrator}* DUMMY grew tired of your aimless shenanigans.' ],
      hugged: [ '<32>{#p/narrator}* Wait, why is DUMMY blushing?', '<32>* Uh...\n* I guess you... won?' ],
      name: '* Dummy',
      slapped: [ '<32>{#p/narrator}* But then, out of nowhere... DUMMY awakens!' ],
      slapped2: [ "<32>{#p/narrator}* Aaaaaand it's gone." ],
      status1: [ '<32>{#p/story}* You encountered DUMMY.' ],
      status2: [ "<32>{#p/story}* DUMMY looks like it's already getting bored." ],
      status3: [ '<32>{#p/story}* DUMMY stands at attention.' ],
      status4: [ "<32>{#p/story}* DUMMY looks like it's going to fall over." ],
      talk: [ '<09>{#p/monster}{@swirl:0.6,1.4,15}.{^10}.{^10}.{^10}.{^10}.' ]
   },
   b_opponent_maddummy: {
      act_check: () =>
         save.data.b.genocide
            ? [ "<32>{#p/story}* GLAD DUMMY - ATK 0 DEF 0\n* It's a dream come true!" ]
            : [ '<32>{#p/story}* MAD DUMMY - ATK 30 DEF 255\n* Impervious to physical attacks.' ],
      act_flirt: () =>
         save.data.b.genocide
            ? [
                 '<32>{#p/human}* (You flirt with Glad Dummy.)',
                 "<32>{#p/narrator}* They're too distracted with themselves to hear you."
              ]
            : [ '<32>{#p/human}* (You flirt with Mad Dummy.)', "<32>* It went exactly how you'd expect." ],
      act_hug: () =>
         save.data.b.genocide ? [ '<32>{#p/human}* (You hug Glad Dummy.)' ] : [ '<32>{#p/human}* (You hug Mad Dummy.)' ],
      act_slap: () =>
         save.data.b.genocide
            ? [
                 '<32>{#p/human}* (You slap Glad Dummy.)',
                 '<32>{#p/narrator}* Glad Dummy exerts the better part of valor and gets the heck outta your way.'
              ]
            : [ '<32>{#p/human}* (You slap Mad Dummy.)' ],
      act_talk: () =>
         save.data.b.genocide
            ? [
                 '<32>{#p/human}* (You talk to Glad Dummy.)',
                 "<32>{#p/narrator}* They're too distracted with themselves to hear you."
              ]
            : [
                 '<32>{#p/human}* (You talk to Mad Dummy.)',
                 "<32>* They don't seem much for conversation.",
                 '<32>* Nobody is happy with this.'
              ],
      boredTalk: [
         '<11>{#p/monster}{@swirl:0.6,1.4,15}{#x3}Oh my god.',
         '<11>{#p/monster}{@swirl:0.6,1.4,15}{#x1}Why is NOTHING hap- pening?',
         '<11>{#p/monster}{@swirl:0.6,1.4,15}{#x4}Am I INVISIBLE to you or something??',
         '<11>{#p/monster}{@swirl:0.6,1.4,15}{#x4}...',
         "<11>{#p/monster}{@swirl:0.6,1.4,15}{#x4}I CAN'T EVEN BE MAD AT YOU!!!",
         "<11>{#p/monster}{@swirl:0.6,1.4,15}{#x4}You're so... INANIMATE!",
         '<11>{#p/monster}{@swirl:0.6,1.4,15}{#x4}JUST... GAHH!\nGET OUT OF MY LIFE!',
         '<11>{#p/monster}{@swirl:0.6,1.4,15}{#x4}GO LISTEN TO MUSIC WITH NAPSTABLOOK OR SOMETHING!'
      ],
      changeStatus1: [ '<32>{#p/story}* Mad Dummy is getting cotton all over the floor.' ],
      changeStatus2: [ '<32>{#p/story}* Mechanical whirrs fill the room.' ],
      fightFail: [
         '<11>{#p/monster}{@swirl:0.6,1.4,15}{#x1}Foolish.\nFoolish!\nFOOLISH!',
         '<11>{#p/monster}{@swirl:0.6,1.4,15}{#x3}Even if you attack my vessel...',
         "<11>{#p/monster}{@swirl:0.6,1.4,15}{#x4}...you'll NEVER hurt ME!",
         "<11>{#p/monster}{@swirl:0.6,1.4,15}{#x1}I'm still incor- poreal, you DUMMY!!!"
      ],
      fightFailStatus: [ '<32>{#p/story}* Wait, is DUMMY a compliment?' ],
      final1: () => [
         "<11>{#p/napstablook}{@swirl:0.4,1.4,15}...sorry, i interrupted you, didn't i?",
         '<11>{#p/napstablook}{@swirl:0.4,1.4,15}as soon as i came over, your friend immediately left...',
         ...(save.data.n.state_wastelands_napstablook === 2
            ? [
                 "<11>{#p/napstablook}{@swirl:0.4,1.4,15}oh wait...\ndidn't you attack me before...",
                 "<11>{#p/napstablook}{@swirl:0.4,1.4,15}uhhh...\nthat's awkward.",
                 '<11>{#p/napstablook}{@swirl:0.4,1.4,15}sorry...'
              ]
            : [
                 '<11>{#p/napstablook}{@swirl:0.4,1.4,15}oh no...\nyou guys looked like you were having fun...',
                 '<11>{#p/napstablook}{@swirl:0.4,1.4,15}oh no...\ni just wanted to say hi...',
                 '<11>{#p/napstablook}{@swirl:0.4,1.4,15}oh no......\n...........\n...........\n...........\n...........'
              ])
      ],
      gladTalk1: [ '<08>{#p/monster}{@swirl:0.6,1.4,15}Thanks!' ],
      gladTalk2: [ '<08>{#p/monster}{@swirl:0.6,1.4,15}Thank you!' ],
      gladTalk3: [ '<08>{#p/monster}{@swirl:0.6,1.4,15}Great work!' ],
      gladTalk4: [ '<08>{#p/monster}{@swirl:0.6,1.4,15}Bravo!' ],
      gladTalk5: [ '<08>{#p/monster}{@swirl:0.6,1.4,15}OK!' ],
      gladTalk6: [ '<08>{#p/monster}{@swirl:0.6,1.4,15}...' ],
      hugTalk1: () =>
         save.data.b.genocide
            ? [
                 '<08>{#p/monster}{@swirl:0.6,1.4,15}My haphe- phobia!',
                 "<08>{#p/monster}{@swirl:0.6,1.4,15}It's gone!",
                 '<08>{#p/monster}{@swirl:0.6,1.4,15}Thank you.. human..'
              ]
            : save.data.n.state_wastelands_dummy === 4
            ? [ '<11>{#p/monster}{@swirl:0.6,1.4,15}{#x4}Are you for REAL??' ]
            : [ '<11>{#p/monster}{@swirl:0.6,1.4,15}{#x3}N-no..!\nI have haphe- phobia!' ],
      hugTalk2: () =>
         save.data.b.genocide
            ? [ '<08>{#p/monster}{@swirl:0.6,1.4,15}Mm..' ]
            : [ '<11>{#p/monster}{@swirl:0.6,1.4,15}{#x4}Stop that!' ],
      hugTalk3: () =>
         save.data.b.genocide
            ? [
                 '<08>{#p/monster}{@swirl:0.6,1.4,15}Ha.. you..',
                 "<08>{#p/monster}{@swirl:0.6,1.4,15}You're gonna squeeze out my SOUL!"
              ]
            : [ '<11>{#p/monster}{@swirl:0.6,1.4,15}{#x2}Knock it off!' ],
      hugTalk4: [ '<11>{#p/monster}{@swirl:0.6,1.4,15}{#x3}...' ],
      name: () => (save.data.b.genocide ? '* Glad Dummy' : '* Mad Dummy'),
      phase2Talk1: [ "<11>{#p/monster}{@swirl:0.6,1.4,15}{#x1}I'll defeat you and take your SOUL!" ],
      phase2Talk2: [ "<11>{#p/monster}{@swirl:0.6,1.4,15}{#x1}I'll use your SOUL to break the force field!" ],
      phase2Talk3: [ '<11>{#p/monster}{@swirl:0.6,1.4,15}{#x6}The other monsters will love me, praise me...!' ],
      phase2Talk4: [ '<11>{#p/monster}{@swirl:0.6,1.4,15}{#x4}THEN EVERYTHING I WANT WILL BE MINE!' ],
      phase2Talk5: [ "<11>{#p/monster}{@swirl:0.6,1.4,15}{#x3}Huh?\nYeah, I guess that'll avenge my cousin." ],
      phase2Talk6: [ '<11>{#p/monster}{@swirl:0.6,1.4,15}{#x5}Do my other cousins care...?' ],
      phase2Talk7: [ '<11>{#p/monster}{@swirl:0.6,1.4,15}{#x4}Whatever.\nWhatever!\nWHATEVER!' ],
      phase2Talk8: [ '<11>{#p/monster}{@swirl:0.6,1.4,15}{#x1}...' ],
      phase3Talk1: [ '<11>{#p/monster}{@swirl:0.6,1.4,15}{#x1}DUMMY BOTS!\nMAGIC MISSILE!' ],
      phase3Talk2: [ '<11>{#p/monster}{@swirl:0.6,1.4,15}{#x3}DUMMY BOTS!\nTRY AGAIN!' ],
      phase3Talk3: [ "<11>{#p/monster}{@swirl:0.6,1.4,15}{#x5}DUMMY BOTS!\nYou're awful???" ],
      phase3Talk4: [ '<11>{#p/monster}{@swirl:0.6,1.4,15}{#x4}DUMMY BOTS!\nFINAL ATTACK!' ],
      phaseChange1: [
         '<11>{#p/monster}{@swirl:0.6,1.4,15}{#x2}OWWWW, you DUMMIES!!',
         '<11>{#p/monster}{@swirl:0.6,1.4,15}{#x1}Watch where you aim your magic attacks!',
         '<11>{#p/monster}{@swirl:0.6,1.4,15}{#x4}...',
         '<11>{#p/monster}{@swirl:0.6,1.4,15}{#x4}Hey!\nYou!',
         '<11>{#p/monster}{@swirl:0.6,1.4,15}{#x3}Forget I said anything about magic.'
      ],
      phaseChange2a: [ '<11>{#p/monster}{@swirl:0.6,1.4,15}{#x4}HEY GUYS!' ],
      phaseChange2b1: [
         '<11>{#p/monster}{@swirl:0.6,1.4,15}{#x1}Dummies.\nDummies!\nDUMMIES!',
         '<11>{#p/monster}{@swirl:0.6,1.4,15}{#x3}Remember how I said NOT to shoot at me?',
         '<11>{#p/monster}{@swirl:0.6,1.4,15}{#x3}Well...'
      ],
      phaseChange2b2: [ "<11>{#p/monster}{@swirl:0.6,1.4,15}{#x4}FAILURES!\nYOU'RE FIRED!\nYOU'RE ALL BEING REPLACED!" ],
      phaseChange2c: [
         '<11>{#p/monster}{@swirl:0.6,1.4,15}{#x4}Hahaha.\nHahaha!\nHAHAHA!',
         "<11>{#p/monster}{@swirl:0.6,1.4,15}{#x3}Now you'll see my true power...",
         "<11>{#p/monster}{@swirl:0.6,1.4,15}{#x6}Relying on people that aren't garbage!"
      ],
      phaseChange3a1: [
         '<11>{#p/monster}{@swirl:0.6,1.4,15}{#x3}N... no way!',
         '<11>{#p/monster}{@swirl:0.6,1.4,15}{#x3}These guys are WORSE than the other guys!'
      ],
      phaseChange3a2: [
         '<11>{#p/monster}{@swirl:0.6,1.4,15}{#x1}Who cares.\nWho cares!\nWHO CARES!',
         "<11>{#p/monster}{@swirl:0.6,1.4,15}{#x4}I DON'T NEED FRIENDS!!"
      ],
      phaseChange3b: [ "<11>{#p/monster}{@swirl:0.6,1.4,15}{#x6}I'VE GOT KNIVES!!!" ],
      phaseChange3c1: [
         "<11>{#p/monster}{@swirl:0.6,1.4,15}{#x3}I'm...",
         '<11>{#p/monster}{@swirl:0.6,1.4,15}{#x3}Out of knives.'
      ],
      phaseChange3c2: [
         "<11>{#p/monster}{@swirl:0.6,1.4,15}{#x4}BUT IT DOESN'T MATTER!!!",
         "<11>{#p/monster}{@swirl:0.6,1.4,15}{#x4}YOU CAN'T HURT ME AND I CAN'T HURT YOU!",
         "<11>{#p/monster}{@swirl:0.6,1.4,15}{#x1}YOU'LL BE STUCK FIGHTING ME..."
      ],
      phaseChange3c3: [ '<11>{#p/monster}{@swirl:0.6,1.4,15}{#x1}Forever.' ],
      phaseChange3c4: [ '<11>{#p/monster}{@swirl:0.6,1.4,15}{#x4}Forever!' ],
      phaseChange3c5: [ '<11>{#p/monster}{@swirl:0.6,1.4,15}{#x6}FOREVER!!!!' ],
      phaseChange3d: [
         '<11>{*}{#p/monster}{@swirl:0.6,1.4,15}{#x6}AHAHAHAHA HAHAHAHAH AHAHAHAHA HAHAHAHAH AHAHAHAHA{%}'
      ],
      phaseChange3e: [
         '<11>{#p/monster}{@swirl:0.6,1.4,15}{#x2}Wh...\nWhat the heck is this!?',
         '<11>{#p/monster}{@swirl:0.6,1.4,15}{#x6}Ergh!\nAcid rain!?!',
         "<11>{#p/monster}{@swirl:0.6,1.4,15}{#x4}Oh, FORGET IT!\nI'm OUTTA here!!"
      ],
      randStatus1: [ '<32>{#p/story}* Mad Dummy is looking for the nearest airlock to throw you out of.' ],
      randStatus2: [ '<32>{#p/story}* Mad Dummy is bossing around its bullets.' ],
      randStatus3: [ '<32>{#p/story}* Mad Dummy glares into a portal, then turns to you with the same expression.' ],
      randStatus4: [ '<32>{#p/story}* Mad Dummy is hopping mad.' ],
      randStatus5: [ '<32>{#p/story}* Smells like a clothing store.' ],
      randTalk1: [ '<11>{#p/monster}{@swirl:0.6,1.4,15}{#x1}Foolish.\nFoolish!\nFOOLISH!' ],
      randTalk2: [ '<11>{#p/monster}{@swirl:0.6,1.4,15}{#x1}Futile.\nFutile!\nFUTILE!' ],
      randTalk3: [ '<11>{#p/monster}{@swirl:0.6,1.4,15}{#x1}Pitiful.\nPitiful!\nPITIFUL!' ],
      randTalk4: [ '<11>{#p/monster}{@swirl:0.6,1.4,15}{#x1}Feeble.\nFeeble!\nFEEBLE!' ],
      slapTalk1: [ '<11>{#p/monster}{@swirl:0.6,1.4,15}{#x6}Why you little...!' ],
      slapTalk2: [ '<11>{#p/monster}{@swirl:0.6,1.4,15}{#x4}Are you kidding me??' ],
      slapTalk3: [ '<11>{#p/monster}{@swirl:0.6,1.4,15}{#x2}Come on!' ],
      slapTalk4: [ '<11>{#p/monster}{@swirl:0.6,1.4,15}{#x3}...' ],
      status1: () =>
         save.data.b.genocide
            ? [ '<32>{#p/story}* Glad Dummy lets you go.' ]
            : [ '<32>{#p/story}* Mad Dummy blocks the way!' ]
   },
   b_opponent_moldsmal: {
      act_check: [ '<32>{#p/story}* Gelatini - ATK 6 DEF 0\n* Stereotypical: Curvaceously attractive, but no brains...' ],
      act_flirt: [
         '<33>{#p/narrator}* You wiggle your hips.\n* Gelatini wiggles back.\n* What a meaningful conversation!'
      ],
      act_imitate: [
         '<33>{#p/narrator}* You give Gelatini a nice pat.\n* Its body changes color...\n* Gelatini must be happy.'
      ],
      act_slap: [ '<32>{#p/narrator}* You give Gelatini a big slap.\n* Although jostled, it is ultimately unfazed...' ],
      idleTalk1: [ '<08>{~}Blorb..' ],
      idleTalk2: [ '<08>{~}Squorch..' ],
      idleTalk3: [ '<08>{~}\x00*Slime sounds*' ],
      name: '* Gelatini',
      perilStatus: [ '<32>{#p/story}* Gelatini has started to rot.' ],
      sexyChat: [ '<08>{~}\x00*Sexy wiggle*' ],
      status1: [ '<32>{#p/story}* You tripped over a line of Gelatinis.' ],
      status2: [ '<32>{#p/story}* Gelatini blorbs quietly.' ],
      status3: [ '<32>{#p/story}* Gelatini waits optimistically.' ],
      status4: [ '<32>{#p/story}* Gelatini is ruminating.' ],
      status5: [ '<32>{#p/story}* The aroma of lime gelatin wafts through.' ],
      status6: [ '<32>{#p/story}* And then, there were two.' ],
      status7: [ '<32>{#p/story}* And finally, there was one.' ],
      status8: [ '<32>{#p/story}* Gelatini now blorbs solo.' ]
   },
   b_opponent_spacetop: {
      act_check: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Astro Serf, the attention- seeking astronaut. Cares for nothing but its antenna.' ]
            : [ "<32>{#p/story}* ASTRO SERF - ATK 11 DEF 4\n* This teen wonders why it isn't named 'Radio Jack.'" ],
      act_compliment: [ '<32>{#p/narrator}* You inform Astro Serf that it has a great antenna!' ],
      act_flirt: [ '<32>{#p/narrator}* You ask out Astro Serf.' ],
      complimentTalk1: [ "<08>{~}DUH!\nWho DOESN'T know?" ],
      complimentTalk2: [ '<08>{~}Envious?\nTOO BAD!' ],
      createStatus1: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* It looks annoyed.' ]
            : [ "<32>{#p/story}* Astro Serf is secretly checking if you're looking at its antenna." ],
      createStatus2: () =>
         world.goatbro
            ? [ "<32>{#p/asriel2}* Hey $(name), it's jealous of your antenna.\n* Hee hee hee." ]
            : [ '<32>{#p/story}* Astro Serf is impressed.' ],
      createTalk1: [ "<09>{~}HELLO???\nMy antenna's up here." ],
      createTalk2: [ '<08>{~}What?\nWhat are you doing?' ],
      createTalk3: [ "<08>{~}But.. it can't be..!" ],
      createTalk4: [ '<08>{~}Woah..\nHow did you do that??' ],
      createTalk5: [ "<08>{~}You're.. making your OWN antenna?" ],
      createText1: [ '<32>{#p/narrator}* You... somehow... begin to create your own antenna.' ],
      createText2: [ '<32>{#p/narrator}* You finish creating the antenna, and proceed to put it on.' ],
      createText3: [
         '<32>{#p/narrator}* You start on another antenna.\n* Not knowing what to do, Astro Serf runs away.'
      ],
      flirtStatus1: [ '<32>{#p/story}* Astro Serf is not impressed by your attire.' ],
      flirtStatus2: [ '<32>{#p/story}* Astro Serf is in love.' ],
      flirtTalk1: [ '<08>{~}No deal!\nNot without a antenna!' ],
      flirtTalk2: [ '<08>{~}W-what??\nUhm..\nI..\nYou..' ],
      genoStatus: [ '<32>{#p/asriel2}* Astro Serf.' ],
      hurtStatus: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* Almost dead.' ] : [ "<32>{#p/story}* Astro Serf's suit is loose." ],
      idleTalk1: [ "<08>{~}Where's YOUR antenna?" ],
      idleTalk2: [ '<08>{~}Your head looks so ..NAKED' ],
      idleTalk3: [ '<08>{~}What a great antenna!\n(Mine)' ],
      idleTalk4: [ "<09>{~}It's signal feedback, not radi- ation" ],
      idleTalk5: [ '<08>{~}I just looove my antenna.\nOK?' ],
      justiceTalk: [ '<08>{~}What have you done..' ],
      name: '* Astro Serf',
      randStatus1: [ '<32>{#p/story}* Astro Serf also wants antennae for its other body parts.' ],
      randStatus2: [ '<32>{#p/story}* Astro Serf makes sure its antenna is still there.' ],
      randStatus3: [ '<32>{#p/story}* Astro Serf is thinking about a certain article of clothing.' ],
      randStatus4: [ '<32>{#p/story}* Smells like lithium.' ],
      status1: [ '<32>{#p/story}* Astro Serf struts into view.' ],
      stealTalk1: [ '<08>{~}I KNEW IT!!!\nTHIEF!!' ],
      stealTalk2: [ '<08>{~}HELP!!!\nFASHION POLICE!!' ],
      stealText1: [ "<32>{#p/narrator}* You tried stealing Astro Serf's antenna, but it hasn't been weakened enough!" ],
      stealText2: [
         "<33>{#p/narrator}* You stole Astro Serf's antenna.\n* Its spacesuit fell off too...",
         '<33>{#p/narrator}* Looks like it was powered by lithium the whole time.'
      ]
   },
   b_opponent_space: {
      act_check: () =>
         world.goatbro
            ? [ "<32>{#p/asriel2}* Lithium.\n* That's literally it." ]
            : [ '<32>{#p/story}* LITHIUM - ATK 1 DEF 0\n* Without its spacesuit...' ],
      act_reassure: [ '<32>{#p/narrator}* You inform Lithium that it still looks fine.' ],
      genoStatus: [ '<32>{#p/asriel2}* Lithium.' ],
      happyStatus: [ "<32>{#p/story}* Lithium doesn't mind its identity." ],
      happyTalk1: [ '<08>{~}Yeah.. I like my body too.' ],
      happyTalk2: [ '<08>{~}Hmm.. antennae are for posers.' ],
      happyTalk3: [ '<08>{~}So I can still impress you?' ],
      happyTalk4: [ '<08>{~}I wanted you to see me as cool.' ],
      hurtStatus: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* Almost dead.\n* Again.' ] : [ "<32>{#p/story}* It's disintegrating." ],
      idleTalk1: [ '<08>{~}I..\nI..' ],
      idleTalk2: [ '<08>{~}What can I say..' ],
      idleTalk3: [ "<08>{~}What's the point.." ],
      idleTalk4: [ '<08>{~}So.. alone..' ],
      name: '* Lithium',
      randStatus1: [ '<32>{#p/story}* "Astro Turf" is no more.' ],
      randStatus2: [ '<32>{#p/story}* Smells like battery power.' ]
   },

   b_party_kidd: {
      mkDeath1: [
         '<32>{#p/kidding}* Uh...',
         "<32>* Why'd they vanish like that?",
         '<32>* Well, we WERE attacking them, so maybe they got scared and teleported away, haha.'
      ],
      mkDeath2: [ '<32>{#p/kidding}* Another one?', "<32>* Dang, why don't I get to have a cool teleporter!?" ],
      mkDeath3: [ "<32>{#p/kidding}* And they're gone..." ],
      mkDeath4: [ '<32>{#p/kidding}* ...' ],
      mkDeath1OW: [
         '<25>{#p/kidd}{#f/4}* Uh...',
         "<25>* Why'd they vanish like that?",
         '<25>{#f/1}* Well, we WERE attacking them, so...',
         '<25>* Maybe they got scared and teleported away, haha.'
      ],
      mkDeath2OW: [
         '<25>{#p/kidd}{#f/4}* Another one?',
         "<25>{#f/1}* Dang, why don't I get to have a cool teleporter!?"
      ],
      mkDeath3OW: [ "<25>{#p/kidd}{#f/4}* And they're gone..." ],
      mkDeath4OW: [ '<25>{#p/kidd}{#f/4}* ...' ],
      mkMagic1: [
         "<32>{#p/kidding}* Yo... I don't know how to do any cool magic yet...",
         '<32>{#p/kidding}* But uh, I can heal you!'
      ],
      mkMagic2a: [ '<32>{#p/kidding}* Healing spell!' ],
      mkMagic2b: [ '<32>{#p/kidding}* Health be with you!' ],
      mkMagic2c: [ '<32>{#p/kidding}* Take this!' ],
      mkNope: [ '<32>{#p/kidding}* Just leave me out of it...' ],
      mkTurn1: [ "<32>{#p/kidding}* Help, I've never been in a battle before!\n* What do I do!?" ],
      mkTurn2: [ '<32>{#p/kidding}* Uh... help!' ],
      mkTurn3: [ "<32>{#p/kidding}* I... think I'm getting the hang of this." ],
      mkTurnAct1: [ '<32>{#p/kidding}* Oh! Oh!', '<32>* I know how ACTing works!', '<32>* Watch this...!' ],
      mkWeaken1: [
         "<32>{#p/kidding}* Are you sure about this...?\n* They don't look too happy about being attacked...",
         '<32>* ...'
      ],
      mkWeaken2: [ '<32>{#p/kidding}* Is this really a good idea...?', '<32>* ...' ],
      mkWeaken3a: [ '<32>{#p/kidding}* Uh...' ],
      mkWeaken3b: [ '<32>{#p/kidding}* Um...' ],
      mkWeaken3c: [ '<32>{#p/kidding}* Er...' ],
      // defense down act
      mkTurnActRand1: (opponent: string) =>
         opponent === 'muffet'
            ? [
                 [ '<32>{#p/story}* Monster Kid struggled in the web and made a scary face.' ],
                 [ '<32>{#p/story}* Monster Kid struggled in the web and yelled.' ],
                 [ '<32>{#p/story}* Monster Kid gave out a menacing laugh.' ]
              ]
            : opponent === 'shyren'
            ? [
                 [ '<32>{#p/story}* Monster Kid sang a scary tune.' ],
                 [ '<32>{#p/story}* Monster Kid yelled overly edgy lyrics.' ],
                 [ '<32>{#p/story}* Monster Kid drummed loudly with their feet.' ]
              ]
            : opponent === 'woshua'
            ? [
                 [ '<32>{#p/story}* Monster Kid pointed out the dirty floors.' ],
                 [ '<32>{#p/story}* Monster Kid pointed out the leaky pipes.' ],
                 [ '<32>{#p/story}* Monster Kid made a gross face.' ]
              ]
            : [
                 [ `<32>{#p/story}* Monster Kid stared $(x) directly in the face.` ],
                 [ `<32>{#p/story}* Monster Kid pointed at $(x) accusingly.` ],
                 [ `<32>{#p/story}* Monster Kid cirled around $(x) like a predator.` ]
              ],
      // attack down act
      mkTurnActRand2: (opponent: string) =>
         opponent === 'muffet'
            ? [
                 [ '<32>{#p/story}* Monster Kid complimented Muffet on her eloquent taste in clothing.' ],
                 [ '<32>{#p/story}* Monster Kid told Muffet her pastries are the best known to monsterkind.' ],
                 [ "<32>{#p/story}* Monster Kid said no webs are as strong as Muffet's." ]
              ]
            : opponent === 'shyren'
            ? [
                 [ '<32>{#p/story}* Monster Kid hummed a pretty melody.' ],
                 [ "<32>{#p/story}* Monster Kid complimented Shyren's hair." ],
                 [ "<32>{#p/story}* Monster Kid complimented Shyren's voice." ]
              ]
            : opponent === 'woshua'
            ? [
                 [ '<32>{#p/story}* Monster Kid called Skrubbington the cleanest monster on the block.' ],
                 [ "<32>{#p/story}* Monster Kid appreciated Skrubbington's efforts to freshen up the factory." ],
                 [ "<32>{#p/story}* Monster Kid noted Skrubbington's committment to perfection." ]
              ]
            : opponent === 'radtile'
            ? [
                 [ "<32>{#p/story}* Monster Kid complimented Radtile's mirror." ],
                 [ "<32>{#p/story}* Monster Kid complimented Radtile's hat." ],
                 [ "<32>{#p/story}* Monster Kid made sure to double-check Radtile's appearance." ]
              ]
            : [
                 [ '<32>{#p/story}* Monster Kid offered to keep $(x) company.' ],
                 [ "<32>{#p/story}* Monster Kid told $(x) they'd be there if it'd help." ],
                 [ '<32>{#p/story}* Monster Kid stood on top of $(x).' ]
              ],
      // turn skip act
      mkTurnActRand3: (opponent: string) =>
         opponent === 'muffet'
            ? [
                 [ '<32>{#p/story}* Monster Kid tried asking Muffet about spider clans.' ],
                 [ '<32>{#p/story}* Monster Kid tried asking Muffet about bakeries.' ],
                 [ '<32>{#p/story}* Monster Kid tried asking Muffet about tea.' ]
              ]
            : opponent === 'shyren'
            ? [
                 [ '<32>{#p/story}* Monster Kid debated about musical notation.' ],
                 [ '<32>{#p/story}* Monster Kid spoke about music theory.' ],
                 [ '<32>{#p/story}* Monster Kid discussed their favorite music genres.' ]
              ]
            : opponent === 'woshua'
            ? [
                 [ '<32>{#p/story}* Monster Kid waxed poetic about proper hygiene.' ],
                 [ '<32>{#p/story}* Monster Kid rapped about hazard safety.' ],
                 [ '<32>{#p/story}* Monster Kid showed off their polished sewer pipe set.' ]
              ]
            : opponent === 'radtile'
            ? [
                 [ '<32>{#p/story}* Monster Kid made an ugly face at Radtile.' ],
                 [ '<32>{#p/story}* Monster Kid came near and inspected Radtile up close.' ],
                 [ '<32>{#p/story}* Monster Kid acted out as if they were a feral creature.' ]
              ]
            : [
                 [ '<32>{#p/story}* Monster Kid wiggled around, mimicing $(x).' ],
                 [ '<32>{#p/story}* Monster Kid did a handstand, impressing $(x).' ],
                 [ '<32>{#p/story}* Monster Kid spun around, bewildering $(x).' ]
              ],
      // pacify act
      mkTurnActRand4: (opponent: string) =>
         opponent === 'muffet'
            ? [ [ "<32>{#p/story}* Monster Kid tried telling Muffet there's no point in all this!" ] ]
            : opponent === 'shyren' || opponent === 'radtile'
            ? [ [ '<32>{#p/story}* Monster Kid claimed a spatial disturbance was approaching fast!' ] ]
            : opponent === 'woshua'
            ? [ [ '<32>{#p/story}* Monster Kid claimed an airborne viral agent was on its way!' ] ]
            : [ [ '<32>{#p/story}* Monster Kid claimed the nearby pipes were leaking acid!' ] ],
      mkTurnActResult0: [ '<32>{#p/story}* Nothing happened.' ],
      mkTurnActResult1: (opponent: string) =>
         opponent === 'woshua'
            ? [ '<32>{#p/story}* Skrubbington was grossed out, and their DEFENSE went down!' ]
            : opponent === 'shyren'
            ? [ '<32>{#p/story}* Shyren felt uncomfortable, and her DEFENSE went down!' ]
            : [ '<32>{#p/story}* $(x) felt uncomfortable, and their DEFENSE went down!' ],
      mkTurnActResult2: (opponent: string) =>
         opponent === 'woshua'
            ? [ '<32>{#p/story}* Skrubbington felt flattered, and their ATTACK went down!' ]
            : opponent === 'shyren'
            ? [ '<32>{#p/story}* Shyren felt flattered, and her ATTACK went down!' ]
            : [ '<32>{#p/story}* $(x) felt respected, and their ATTACK went down!' ],
      mkTurnActResult3: (opponent: string, multiple: boolean) =>
         opponent === 'woshua'
            ? multiple
               ? [ '<32>{#p/story}* Skrubbington and the others were distracted by Monster Kid and forgot their turn!' ]
               : [ '<32>{#p/story}* Skrubbington was distracted by Monster Kid and forgot their turn!' ]
            : opponent === 'shyren'
            ? [ '<32>{#p/story}* Intrigued by Monster Kid, Shyren forgot her turn!' ]
            : multiple
            ? [ '<32>{#p/story}* Entranced by Monster Kid, $(x) and the others forgot their turn!' ]
            : [ '<32>{#p/story}* Entranced by Monster Kid, $(x) forgot their turn!' ],
      mkTurnActResult4: (opponent: string, multiple: boolean, allowpac: boolean) =>
         opponent === 'woshua'
            ? [
                 '<32>{#p/story}* Fearful for its life, Skrubbington panicked and left the battle!',
                 ...(multiple ? [ '<32>{#p/story}* The other monsters continue to fight you.' ] : [])
              ]
            : opponent === 'shyren'
            ? allowpac
               ? [ '<32>{#p/story}* Fearful for her life, Shyren panicked and left the battle!' ]
               : [ '<32>{#p/story}* Encouraged by her own performance, Shyren braved the threat!' ]
            : [
                 '<32>{#p/story}* Fearful for its life, $(x) panicked and left the battle!',
                 ...(multiple ? [ '<32>{#p/story}* The other monsters continue to fight you.' ] : [])
              ],
      mkTurnFight1: [
         '<32>{#p/kidding}* Y... y-you want me to fight?\n* Are you sure?',
         choicer.create('* (Do you confirm?)', 8, 7, 'No', 'Yes')
      ],
      mkTurnFight2a: [ '<32>{#p/kidding}* Okay... here goes nothing...' ],
      mkTurnFight2b: [ '<32>{#p/kidding}* Oh, okay...', "<32>* I'll just spare them, then!" ],
      mkTurnFight3a: [ '<32>* Ngh...!' ],
      mkTurnFight3b: [ '<32>* Hi-yah...!' ],
      mkTurnFight3c: [ '<32>* Wa-POW!' ],
      mkTurnMercy1: [ '<32>{#p/kidding}* Mercy?\n* Do I spare them?', "<32>{#p/kidding}* Well, that's easy!" ],
      mkTurnX: [ choicer.create('* (What should Monster Kid do?)', 8, 7, 'Mercy', 'Act', 'Magic', 'Fight') ]
   },

   c_call: '<32>{#p/event}* Dialing...',
   c_endcall: '<32>{#p/event}* Click...',
   c_nobody1: [ '<32>{#p/human}* (No response.)' ],
   c_nobody2: [ '<32>{#p/narrator}* ...but nobody came.' ],
   c_nobody3: [ '<32>{#p/human}* (No connection.)' ],
   c_nobody4: [ '<32>{#p/human}* (Too much interference.)' ],
   c_nobody5: [
      '<32>{#p/human}* (It sounds like a small, white dog is sleeping on the cell phone.)',
      '<32>{#p/monster}* (Snore... snore...)',
      '<32>* (Snore... snore...)'
   ],

   i_water: {
      battle: {
         description: 'Smells like Dihydrogen Monoxide.',
         name: 'Water'
      },
      drop: [ '<32>{#p/human}* (You threw away the Bottled Water.)' ],
      info: [ '<32>{#p/narrator}* "Bottled Water" Heals 12 HP\n* Smells like Di-Hydrogen Monoxide.' ],
      name: 'Bottled Water',
      use: [
         '<32>{#p/human}* (You drank the Bottled Water.)',
         "<32>* ...\n* (You're filled with hydration.)" // credits to Anisaly
      ]
   },
   x_credits: [
      "<32>{#p/spacefluff432}* Ayyo, thanks for playing!\n* Let's get started with the credits, shall we?",
      '<32>* Balgamlı Kedi - Assistant spriter, Guest writer, Internal review, Project lead',
      '<32>* Brayjamin - Internal review',
      '<32>* Burge233 - Guest spriter, Promo artist',
      '<32>* DESM.al - Guest spriter',
      '<32>* Discarded Vessel - Assistant spriter, Dedicated QA tester',
      '<32>* Dubituar - Internal review',
      '<32>* ed_ - Guest spriter',
      '<32>* Efe Kaya - Chief advertiser, Internal review',
      '<32>* Firedupmoose - Assistant spriter, Internal review',
      '<32>* Ghostly - Dedicated QA tester, Guest writer, Project lead',
      '<32>* Gon UT - Battle review, Dedicated QA tester',
      '<32>* major_memestar - Assistant spriter',
      '<32>* MattSpriteMaster - Assistant spriter',
      '<32>* MR. PETER - Battle review, Internal review, Project lead',
      '<32>* NerNot1 - Promo artist',
      '<32>* PhyreFM - Assistant spriter',
      '<32>* Pongy25 - Guest spriter',
      '<32>* PoTheWinterCorder - Guest spriter',
      '<32>* ProctorDorkchop02 - Assistant spriter',
      '<32>* Rise - Battle review, Dedicated QA tester, Guest writer',
      '<32>* ScarletScaledDragon\n* Assistant spriter',
      '<32>* semi - Guest spriter',
      '<32>* Shaun Duz Stuffs\n* Battle review, Dedicated QA tester',
      '<32>* spaceknife234 - Internal review',
      '<32>* SquigglyWiggley - Guest Spriter, Guest writer',
      '<32>* Starkiteckt - Backdrop artist',
      '<32>* Zaxento The Greedy - Assistant writer, Dedicated QA tester, Guest spriter',
      '<32>* Balgamlı Kedi, delta, Discarded Vessel, Dischnie\n* QA tester',
      '<33>* EvanGamesGoodman, Firedupmoose, Ghostly, Gon UT, Green Tea\n* QA tester',
      '<32>* My Cocoa, Nanorasmus, NerNot1, Prezmop, Rise, semi\n* QA tester',
      '<32>* Shaun Duz Stuffs, Ten, Tired, Wild Pasta, Zaxento The Greedy\n* QA tester',
      '<32>* ...',
      "<32>* I'd also like to say something.",
      '<32>* I want you to know that, despite your mistakes...',
      '<32>* You are awesome, and you deserve love and attention.\n* Remember that, okay?',
      '<32>* Take care of yourself, "$(name)."'
   ],
   x_unknown: '?'
};

CosmosUtils.status(`LOAD MODULE: COMMON TEXT (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
