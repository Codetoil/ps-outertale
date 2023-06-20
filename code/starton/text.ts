import { game } from '../core';
import { CosmosKeyed, CosmosProvider, CosmosUtils } from '../engine/utils';
import { battler, calcLV, choicer, pager, player, world } from '../mantle';
import save from '../save';

export const edgy = () => {
   if (save.data.n.plot < 19) {
      // after outlands
      return world.trueKills > 9 && save.data.n.state_wastelands_toriel === 2;
   } else if (save.data.n.plot < 20.2) {
      // after doggo
      return world.trueKills > 9 && save.data.n.state_starton_doggo === 2;
   } else if (save.data.n.plot < 23) {
      // after canis minor
      return world.trueKills > 9 && save.data.n.state_starton_lesserdog === 2;
   } else if (save.data.n.plot < 28) {
      // after dogamy dogaressa
      return world.trueKills > 9 && save.data.n.state_starton_dogs === 2;
   } else {
      // after canis major
      return world.trueKills > 9 && save.data.n.state_starton_greatdog === 2;
   }
};

export const solo = () => save.data.n.plot_date < 2 || world.trueKills > 0;

const f_prespear = pager.create(
   'limit',
   () =>
      save.data.n.plot < 46
         ? [ '<18>{#p/papyrus}{#f/4}CAREFUL, THIS ROOM HAS SPECIAL SPOOKY POWERS.' ]
         : [
              '<18>{#p/papyrus}{#f/4}THE TIME IT TAKES TO TRAVEL ACROSS THIS ROOM...',
              '<18>{#p/papyrus}{#f/4}...NEVER SEEMS TO BE THE SAME.',
              "<18>{#p/papyrus}{#f/5}SOMETIMES IT'S LONG, SOMETIMES IT'S NOT...",
              '<18>{#p/papyrus}{#f/0}AND SOMETIMES I WEAR POLKA-DOTS.',
              ...(solo()
                 ? []
                 : [
                      '<25>{#p/undyne}{#f/12}* Polka-what?',
                      '<25>{#p/undyne}{#f/1}* Well uh, as for the length...',
                      "<25>{#p/undyne}{#f/3}* It's probably just the spatial anomaly here.",
                      '<18>{#p/papyrus}{#f/0}...OH!',
                      '<25>{#p/undyne}{#f/17}* Yeah!!!',
                      '<25>{#p/undyne}{#f/16}* But... polka dots.',
                      '<25>{#p/undyne}{#f/8}* What does that have to do with anything!'
                   ])
           ],
   () =>
      save.data.n.plot < 46
         ? [ '<18>{#p/papyrus}{#f/5}OBJECTS IN HALLWAY ARE FARTHER THAN THEY APPEAR.' ]
         : [
              '<18>{#p/papyrus}{#f/4}YES, I LITERALLY JUST SAID THAT TO MAKE IT RHYME.',
              '<18>{#p/papyrus}{#f/9}WHAT ARE YOU GONNA DO ABOUT IT, HUH?',
              "<18>THAT'S RIGHT.\nNOTHING!",
              '<18>NOTHING AT ALL!',
              ...(solo() ? [] : [ '<25>{#p/undyne}{#f/3}* Damn.' ])
           ]
);

export default {
   a_starton: {
      gravo: [ '<32>{#p/narrator}* It\'s a "gravometric inverter."', '<32>* Whatever that means.' ],
      cream_get: [ '<32>{#p/human}* (You got the Nice Cream.)' ],
      cream_full: [ "<32>{#p/human}* (You're carrying too much.)" ],
      bunbun: pager.create(
         'limit',
         [ '<32>{#p/monster}* Mom says that painting behind me is our homeworld.', "<32>* What's a homeworld?" ],
         [ '<32>* Do you have a homeworld?' ]
      ),
      emptytable1: [ "<32>{#p/narrator}* It's just a lonely table.\n* Smells like frosting." ],
      emptytable2: [ "<32>{#p/narrator}* It's just a lonely table.\n* Smells like hair." ],
      balcony0: [ '<18>{#p/papyrus}ENJOYING THE VIEW?', choicer.create('* (What do you say?)', 8, 7, 'Yes', 'No') ],
      balcony1: [
         "<18>{#p/papyrus}{#f/9}GOOD!\nIT'S ABOUT TIME SOMEONE DID.",
         '<18>{#f/4}SANS BARELY EVER TAKES THE TIME TO LOOK OUTSIDE.',
         '<18>{#f/7}HE JUST MAKES LAZY PUNS ABOUT IT!!!'
      ],
      balcony2: [
         "<18>{#p/papyrus}{#f/5}OH...\nWELL, THAT'S OKAY...",
         '<18>{#f/4}(SIGH...)\nAT LEAST YOU TRIED WALKING OUT.',
         "<18>{#f/7}SANS WOULDN'T EVEN DO THAT!!!"
      ],
      bedbook1: [ "<32>{#p/narrator}* It's a book, written in an ancient language." ],
      bedbook2: [ "<32>{#p/narrator}* You won't understand it." ],
      bedbook3a: [ '<32>{#p/narrator}* Would you like me to read it?' ],
      bedbook3b: [ '<32>{#p/narrator}* Want me to read it again?' ],
      bedbook4: [ choicer.create('* (Have $(name) read the book?)', 8, 7, 'Yes', 'No') ],
      bedbook5: [
         '<32>{#p/narrator}* Alright.\n* Here we go...',
         '<32>* "Long ago, two species ruled the solar system: Humans and Monsters."',
         '<32>* "When monsters first invented the technology to travel through space..."',
         '<32>* "It didn\'t take long for them to reach planet Earth."',
         '<32>* "The monsters shared their technology with the Humans, and forged an alliance."',
         '<32>* "Over the next few hundred years, Monsters and Humans lived in peace and harmony."',
         '<32>* "One day, the Humans learned something about the Monsters..."',
         '<32>* "A fact that drove fear into the heart of every human who heard it."',
         '<32>* "As time passed, a war broke out between the two species."',
         '<32>* "Many battles and skirmishes would occur all across the solar system..."',
         '<32>* "But the humans, filled with fear and determination, easily won them all."',
         '<32>* "Then, on one fateful day, a massive weapon was fired at the monsters\' homeworld."',
         '<32>* "After the monsters\' home planet was destroyed, humans declared victory."',
         '<32>* "An agreement between the two species was signed, and..."',
         '<32>* "The remaining monsters were banished to an abandoned outpost."',
         '<32>* "Then, the humans gathered seven of their brightest minds."',
         '<32>* "A powerful force field was erected, and the monsters were sealed in."',
         "<32>* Well, that's the story.\n* Heh, you can thank me for the translation later."
      ],
      bedbook6: [ '<32>{#p/narrator}* Well, if you ever want me to read it, let me know.' ],
      beddoor1: [ "<32>{#p/monster}{#npc/a}* If you want a room, you'll need to ask me first." ],
      beddoor2: [ "<32>{#p/monster}{#npc/a}* If you want a room again, you'll need to ask me first." ],
      candy1: pager.create(
         'limit',
         [
            '<32>{#p/narrator}* This vending machine can only synthesize exoberries.',
            choicer.create('* (Buy exoberries for 15 G?)', 8, 7, 'Yes', 'No')
         ],
         [ choicer.create('* (Buy exoberries for 15 G?)', 8, 7, 'Yes', 'No') ]
      ),
      candy2: [ "<32>{#p/human}* (You don't have enough G.)" ],
      candy3: [ "<32>{#p/human}* (You're carrying too much.)" ],
      candy4: [ '<32>{#p/human}* (You got the exoberries.)' ],
      candy5: [ '<32>{#p/human}* (You decide not to pay.)' ],
      capstation1: [
         '<32>{#p/human}* (You look behind the station and find a key.)',
         '<32>{#s/equip}{#p/human}* (You got the key.)'
      ],
      capstation2: [ '<32>{#p/human}* (You look behind the station.)', '<32>{#p/narrator}* Nothing new back here.' ],
      crossword0: [
         '<18>{#p/papyrus}{#f/9}HUMAN!!',
         '<18>{#f/9}YOU HAVE SEEN MY PUZZLES.',
         '<18>{#f/4}BUT WHAT YOU ARE ABOUT TO SEE IS...'
      ],
      crossword1: [
         "<18>{#p/papyrus}{#f/7}SANS!!\nWHERE'S THE PUZZLE!?",
         "<25>{#p/sans}* you're lookin' at it.",
         '<18>{#p/papyrus}{#f/1}WHAT?\nTHAT TABLET LYING ON THE GROUND?',
         '<18>{#f/4}OKAY...'
      ],
      crossword2: [
         "<18>{#p/papyrus}{#f/7}SANS!!!\nTHAT DIDN'T DO ANYTHING!",
         '<25>{#p/sans}* whoops.',
         "<25>{#f/3}* i knew i should have used today's kakuro puzzle instead.",
         '<18>{#p/papyrus}{#f/1}WHAT!? KAKURO!?',
         "<18>{#f/9}I CAN'T BELIEVE YOU SAID THAT!!",
         '<18>{#f/4}IN MY OPINION...',
         '<18>{#f/0}SUDOKU IS EASILY THE HARDEST.',
         '<25>{#p/sans}* what? really, dude?\n* that easy-peasy number shuffle?',
         "<25>{#f/4}* that's for baby bones.",
         '<18>{#p/papyrus}{#f/4}UN. BELIEVABLE.',
         '<18>{#f/9}HUMAN!!!\nSOLVE THIS DISPUTE!',
         choicer.create('* (Which is harder?)', 8, 7, 'Sudoku', 'Kakuro')
      ],
      crossword3a: [
         '<18>{#p/papyrus}HA! HA! YES!',
         '<18>HUMANS MUST BE VERY INTELLIGENT!',
         '<18>IF THEY ALSO FIND SUDOKU SO DIFFICULT!',
         '<18>{#f/9}NYEH! HEH! HEH HEH!'
      ],
      crossword3b: [
         '<18>{#p/papyrus}{#f/9}YOU TWO ARE WEIRD!',
         '<18>{#f/0}KAKURO PUZZLES ARE SO EASY.',
         "<18>IT'S THE SAME SOLUTION EVERY TIME.",
         '<18>{#f/4}I JUST FILL ALL THE BOXES IN WITH THE LETTER "Z"...',
         '<18>{#f/4}BECAUSE EVERY TIME I LOOK AT A KAKURO...',
         '<18>{#f/9}ALL I CAN DO IS SNORE!!!'
      ],
      crossword4: pager.create(
         'limit',
         [ '<25>{#p/sans}* hey, where ya goin there, bucko?' ],
         [ '<25>{#p/sans}* wrong way.' ]
      ),
      crossword5a: [ '<25>{#p/sans}* thanks for saying "sudoku" just to appease my brother.' ],
      crossword5b: [ '<25>{#p/sans}* papyrus...\n* ...finds difficulty in interesting places.' ],
      crossword6: (choice: number) =>
         edgy()
            ? [
                 [ "<25>{#f/3}* not that it makes up for all the trouble you've caused." ],
                 [ '<25>{#f/3}* i sure hope you don\'t end up becoming one of his "problems."' ]
              ][choice]
            : [ '<25>{#f/4}* yesterday he got stumped trying to "solve" a star chart.' ],
      doggo1: () =>
         world.genocide
            ? [ "<32>{#p/monster}* We've gotten word about the prince's return...", '<32>* Asriel, is that you?' ]
            : [
                 '<32>{#p/monster}* Did something move?\n* Was it my imagination?',
                 '<32>* I can only see moving things.',
                 '<32>* If something WAS moving...\n* For example, a human...',
                 "<32>* I'll make sure it NEVER moves again!"
              ],
      doggo2: [
         [
            "<32>{#p/monster}* S-S-S-Something pet me...\n* Something that isn't m-m-moving...",
            "<32>* I'm gonna need some dog treats for this!!!"
         ],
         [
            '<32>{#p/monster}* A wrench appeared out of nowhere, then disappeared.',
            '<32>* Was it a ghost wrench?',
            '<32>* Did I just return it to the afterlife?',
            '<32>* I need some dog treats to think about this.'
         ]
      ],
      doggo3: pager.create(
         'limit',
         [ '<32>{#p/monster}* Hello?\n* Is anybody there...?\n* No?' ],
         [ '<32>{#p/monster}* Are you two playing a trick on me?\n* Real funny.' ],
         [ '<32>{#p/monster}* Big lug?\n* Is that you?\n* Come on...' ],
         [ "<32>{#p/monster}* Well, it's not the tall skeleton...\n* He's too loud." ],
         [ '<32>{#p/monster}* Whoever you are, knock it off!!!' ],
         [ '<32>{#p/monster}* ...' ]
      ),
      drop_chip: [
         '<32>{#p/monster}* Did you just...\n* Drop the part of me I had given you?',
         '<32>* I have no words for you...\n* Begone!'
      ],
      drop_cream: [ "<32>{#p/monster}* You know, you're lucky I'm busy advertising..." ],
      drop_fail: [ "<32>{#p/narrator}* You think dropping people's food in front of them is funny?" ],
      eat_chip: [
         '<32>{#p/monster}* Did you just...\n* Consume the part of me I had given you?',
         '<32>* I have no words for you...\n* Begone!'
      ],
      eat_cream: [ "<32>{#p/monster}* I glad to see you're enjoying your Nice Cream!\n* Very nice!" ],
      genotext: {
         asriel1: () =>
            [
               [ "<25>{#p/asriel2}{#f/5}* What are you waiting for, $(name)?\n* Let's go!" ],
               [ '<25>{#p/asriel2}{#f/6}* Come on, this way.' ]
            ][Math.min(save.flag.n.ga_asriel1++, 1)],
         asriel2: [ '<25>{*}{#p/asriel2}{#f/3}* Papyrus is just ahead.', '<25>{*}{#f/2}* Hee hee hee...' ],
         asriel3: () =>
            [ [ "<25>{#p/asriel2}{#f/1}* Let's kill him." ], [ '<25>{#p/asriel2}{#f/1}* This never gets old...' ] ][
               Math.min(save.flag.n.ga_asriel3++, 1)
            ],
         asriel4: [ '<25>{*}{#p/asriel2}{#f/5}* Howdy! {%}' ],
         asriel5: [ '<18>{*}{#p/papyrus}{#f/1}WHAT THE- {%}' ],
         asriel6: () =>
            [
               [
                  '<25>{#p/asriel2}{#f/13}* ...',
                  "<25>{#f/16}* Golly... can't say I was expecting HIM to die so early...",
                  '<25>{#f/3}* ...even if that trashbag had it coming from a mile away.',
                  "<25>{#f/4}* ...trust me, $(name).\n* We're FAR better off without him around."
               ],
               [ '<25>{#p/asriel2}{#f/3}* Same outcome as last time.', '<25>{#p/narrator}* ...last time?' ],
               [ '<25>{#p/asriel2}{#f/13}* ...' ]
            ][Math.min(save.flag.n.ga_asriel6++, 2)],
         asriel7: [ '<25>{#p/asriel2}{#f/3}* Lead the way.' ],
         asriel9: [ "<25>{#p/asriel2}{#f/8}* Psst, let's wait and see what he does." ],
         asriel10: () =>
            [
               [
                  '<25>{#p/asriel2}{#f/13}* Papyrus...',
                  "<25>{#f/16}* I don't think I've ever seen him so defeated.",
                  "<25>{#f/10}* Imagine calling out for a brother when he's not even alive...",
                  '<25>{#f/3}* Oh well.\n* This timeline is new, and unpredictable.',
                  "<25>{#f/1}* I'd like to see where it goes next, wouldn't you, $(name)?"
               ],
               [ "<25>{#p/asriel2}{#f/15}* That's going to take some getting used to." ]
            ][Math.min(save.flag.n.ga_asriel10++, 1)],
         asriel17: () =>
            [
               [ "<25>{#p/asriel2}{#f/3}* Golly, $(name)... some people just don't get it." ],
               [ "<25>{#p/asriel2}{#f/7}* Someone's mad." ]
            ][Math.min(save.flag.n.ga_asriel17++, 1)],
         asriel24: () =>
            [ [ '<25>{#p/asriel2}{#f/3}* That was underwhelming.' ], [ '<25>{#p/asriel2}{#f/4}* ...' ] ][
               Math.min(save.flag.n.ga_asriel24++, 1)
            ],
         asriel26: () =>
            [
               [
                  "<26>{#p/asriel2}{#f/3}* Well, that's the canine unit gone.",
                  '<26>{#p/asriel2}{#f/4}* Only one bridge between us and the town...',
                  '<25>{#f/1}* ...stay behind me, $(name).'
               ],
               [ '<25>{#p/asriel2}{#f/6}* You know where to go.' ]
            ][Math.min(save.flag.n.ga_asriel26++, 1)],
         asriel28: () =>
            [
               [
                  "<25>{#p/asriel2}{#f/6}* Okay, $(name), the town's all yours.",
                  "<25>{#f/7}* In the meantime, I'll be off to check on some things.",
                  "<25>{#f/1}* I know you won't disappoint me."
               ],
               [ "<25>{#p/asriel2}{#f/16}* I trust you'll do the right thing." ]
            ][Math.min(save.flag.n.ga_asriel28++, 1)],
         asriel29: () =>
            [
               save.data.b.papyrus_secret
                  ? [
                       '<25>{#p/asriel2}{#f/2}* Hee.\n* Hee.\n* Hee....',
                       "<25>{#f/10}* ...wait, where's Papyrus?",
                       '<25>{#f/10}* ...',
                       "<25>{#f/4}* Golly, $(name), I didn't think you'd kill him THAT quickly."
                    ]
                  : [
                       '<25>{#p/asriel2}{#f/2}* Hee.\n* Hee.\n* Hee....',
                       "<25>{#f/1}* It's about time that bonehead paid the price for his mercy.",
                       '<25>{#f/13}* Golly.\n* He wanted SO badly to forgive you.',
                       "<25>{#f/16}* But, let's be honest with ourselves here...",
                       "<25>{#f/1}* We've got bigger fish to fry."
                    ],
               [ '<25>{#p/asriel2}{#f/13}* Oh well.\n* The skeleton died for nothing again.' ],
               [
                  "<25>{#p/asriel2}{#f/13}* You know, they say the third time's the charm...",
                  '<25>{#f/16}* Too bad he only ever gets one.'
               ],
               [
                  "<25>{#p/asriel2}{#f/6}* That's four times you've killed him now.",
                  "<25>{#f/8}* I'm starting to think you enjoy this..."
               ],
               [ '<25>{#p/asriel2}{#f/15}* Again...?' ]
            ][Math.min(save.flag.n.ga_asriel29++, 4)],
         asriel30: () => [
            '<25>{#p/asgore1}{#f/1}* ...',
            '<25>{#f/1}* Howdy, Asriel.',
            '<25>{#f/2}* ...',
            '<25>{#f/3}* We need to talk.',
            ...[
               [
                  '<25>{#p/asriel2}{#f/6}* Talk?\n* About what?',
                  '<25>{#f/6}* Why are you even here?',
                  "<25>{#f/7}* You know you'll just die to me anyway.",
                  '<25>{#f/8}* Speaking of which... {%15}'
               ],
               [
                  "<25>{#p/asriel2}{#f/8}* Talk?\n* Don't waste my time.",
                  "<25>{#f/6}* I KNOW you're just using a hologram.",
                  '<25>{*}{#p/asgore1}{#f/5}* How did you- {%}',
                  '<25>{#p/asriel2}{#f/1}* Hush.'
               ]
            ][Math.min(save.flag.n.ga_asriel30x, 1)]
         ],
         asriel30a: [
            '<25>{#p/asriel2}{#f/8}* Seriously?\n* A hologram?',
            '<25>{#f/6}* I knew you were a coward, but this is a whole new level.'
         ],
         asriel30b: [
            "<25>{#p/asgore1}{#f/1}* Don't you have anything better to do?",
            '<25>{#p/asriel2}{#f/8}* ...',
            '<25>{#f/6}* You know my answer.',
            '<25>{*}{#p/asgore1}{#f/3}* Well, son- {%}',
            "<25>{#p/asriel2}{#f/6}* I'm not your son.\n* I haven't BEEN your son for a LONG time.",
            '<25>{#p/asgore1}{#f/1}* Alright, Asriel.\n* Do you realize what you are doing?',
            '<25>{#f/3}* Do you not see how harmful it is?',
            "<25>{#p/asriel2}{#f/6}* We've killed a few monsters, big deal.",
            '<25>{#p/asgore1}{#f/1}* That is not what I am referring to, Asriel.',
            '<25>{#p/asriel2}{#f/8}* Then what ARE you referring to?',
            '<25>{#p/asgore1}{#f/1}* I mean the harm that it does to you.\n* The harm to your SOUL.',
            '<25>{#p/asriel2}{#f/15}* Yeah, about that...',
            '<25>{#p/asgore1}{#f/3}* If you continue down this path, nobody will be able to save you.',
            "<25>{#p/asriel2}{#f/13}* That's what you don't understand, Dad.\n* I don't NEED saving.",
            '<25>{#f/2}* Oh, sorry...\n* Did I say "Dad?"\n* I meant "Asgore."',
            '<25>{#f/1}* Forgive me.',
            '<25>{#p/asgore1}{#f/3}* ...\n* Really now...',
            "<25>{#f/2}* You must reconsider what you're doing, not just for our sakes...",
            '<25>{#f/5}* But for yours!',
            "<25>{#p/asriel2}{#f/8}* Golly, don't pretend to care NOW...",
            "<25>{#f/7}* It's OBVIOUS you're just here to waste my time.",
            '<25>{#p/asgore1}{#f/2}* ...',
            '<25>{#p/asriel2}{#f/8}* ...',
            '<25>{#p/asgore1}{#f/13}* You must consider the gravity of your choices!',
            "<25>{#p/asriel2}{#f/8}* Or what? I'll float off into space, never to be seen again?",
            "<25>{#f/7}* Come on $(name), we're done here."
         ],
         asriel30c: [ '<25>{*}{#p/asgore1}{#f/5}* Asriel, please!\n* You must listen to me, this has to end now!' ],
         asriel30d: () =>
            [
               [ '<25>{#p/asriel2}{#f/3}* Ready yourself, $(name).', "<26>{#f/4}* This is Undyne's domain." ],
               [ '<25>{#p/asriel2}{#f/4}* Take us in.' ]
            ][Math.min(save.flag.n.ga_asriel30d++, 1)],
         papyrusSolo1a: [
            '<18>{#p/papyrus}{#f/31}SANS?\nIS THAT A HUMAN?',
            "<18>{#f/5}IT IS, ISN'T IT?",
            '<18>{#f/32}NYEH...\nUNDYNE WILL FINALLY...',
            "<18>{#p/papyrus}{#f/31}I'LL GET TO JOIN THE ROYAL GUARD...",
            "<18>{#f/5}DOESN'T THAT MAKE YOU HAPPY?",
            "<25>{#p/asriel2}{#f/3}* You can't keep pretending, Papyrus.\n* He's gone.",
            '<18>{*}{#p/papyrus}{#f/5}BUT- {%}',
            "<25>{#p/asriel2}{#f/3}* It's over.\n* Just give up already.",
            "<18>{#p/papyrus}{#f/6}BUT IT CAN'T BE...\nSANS, HE...",
            '<18>{#f/31}HE PROMISED...',
            '<25>{#p/asriel2}{#f/3}* Promises are made to be broken, Papyrus.',
            '<25>{#f/4}* You of all people should be smart enough to know THAT...',
            '<18>{#p/papyrus}{#f/31}...',
            "<18>{#f/3}I'M SORRY.",
            '<18>{#f/3}I HAVE TO GO...'
         ],
         papyrusSolo2a: [
            '<18>{#p/papyrus}{#f/31}WELL, I JUST GOT BACK FROM UNDYNE...',
            '<18>{#f/31}SHE TELLS ME THE KING HAS AN OFFER FOR YOU.',
            '<25>{#p/asriel2}{#f/7}* Lay it on me.',
            "<18>{#p/papyrus}{#f/3}HIS EXACT WORDS WERE 'I WANT TO SEE MY SON.'",
            '<18>{#f/7}...',
            "<18>{#f/7}I CAN'T BELIEVE THE PRINCE KILLED MY BROTHER!",
            '<25>{#p/asriel2}{#f/8}* Actually, it was you we were trying to kill...',
            '<18>{#p/papyrus}{#f/7}ENOUGH!!',
            '<18>{#f/7}YOU BETRAYED YOUR OWN KINGDOM!\nYOUR OWN PEOPLE!',
            '<18>{#f/7}AND FOR WHAT!?',
            '<18>{#f/7}A PETTY ATTEMPT AT SELF-AMUSEMENT?',
            '<25>{#p/asriel2}{#f/1}* Sure, why not.',
            '<18>{#p/papyrus}{#f/4}AND AS FOR YOU, HUMAN...',
            "<18>{#f/7}DON'T THINK I CAN'T SEE WHAT'S GOING ON.",
            "<18>{#f/7}IT'S OBVIOUS YOU'RE THE ONE CALLING THE SHOTS.",
            '<25>{#p/asriel2}{#f/8}* How observant.',
            '<25>{#f/7}* Guess we should just admit defeat here and now, huh?',
            '<18>{#p/papyrus}{#f/31}...',
            '<25>{#p/asriel2}{#f/3}* Well, too bad.',
            "<25>{#f/4}* We're not coming with you, and we never will.\n* We've got other plans.",
            "<18>{#p/papyrus}{#f/4}JUST SO YOU KNOW, UNDYNE'S PROBABLY WATCHING US.",
            '<25>{#p/asriel2}{#f/3}* And your point is?',
            "<25>{#f/4}* ...look Papyrus, it doesn't matter what you or anyone else does.",
            "<25>{#f/1}* Nothing can stop us when we're together.",
            '<18>{#p/papyrus}{#f/7}UGH!!!'
         ],
         papyrusSolo3a: [
            '<25>{#p/asriel2}{#f/3}* Howdy.',
            '<18>{#p/papyrus}{#f/31}YOU KNOW...',
            '<18>{#f/31}I OVERHEARD UNDYNE AND ALPHYS TALKING...',
            "<18>{#f/5}AND THEY MENTIONED SOMETHING LIKE 'TURN BACK TIME?'",
            "<18>{*}{#f/32}I CAN'T BE SURE, BUT IT SOUNDS LIKE- {%}",
            '<25>{#p/asriel2}{#f/6}* No.',
            '<18>{*}{#p/papyrus}{#f/6}BUT THEY SAID YOU MIGHT BE ABLE TO- {%}',
            '<25>{#p/asriel2}{#f/6}* No.',
            '<18>{#p/papyrus}{#f/31}BUT, IF YOU REALLY CAN ERASE WHAT HAPPENED...',
            '<18>{#f/5}THEN WHY NOT?',
            "<18>{#f/31}A-AND, IN THE NEXT TIMELINE... I'LL TAKE HIS PLACE.",
            "<18>{#f/3}THEN HE WOULDN'T HAVE TO DIE, RIGHT?",
            "<25>{#p/asriel2}{#f/6}* Trust me, I've already seen that timeline.",
            "<25>{#f/7}* It's BORING.",
            '<18>{#p/papyrus}{#f/3}...',
            '<18>{#f/6}BUT WHAT IF I SHOW YOU THIS PUZZLE?',
            '<18>{#f/32}IT MIGHT HELP TO ALLEVIATE YOUR BOREDOM...',
            '<25>{#p/asriel2}{#f/15}* If it makes you feel better, I guess...',
            '<18>{#p/papyrus}OH... OH!',
            "<18>{#f/0}THAT'S GREAT!!",
            "<18>{#f/0}YOU'RE ALREADY CHANGING YOUR MIND!!",
            '<25>{#p/asriel2}{#f/8}* ...',
            '<25>{#p/papyrus}{#f/6}...',
            '<18>{*}{#f/5}WELL, HERE ARE THE RULES OF THE- {%}',
            '<25>{#p/asriel2}{#f/7}* We already know the rules, idiot.',
            '<18>{#p/papyrus}{#f/31}OH...',
            '<18>{#f/6}UH, WELL THEN!!\nWITHOUT FURTHER ADO...',
            "<18>{#f/9}LET'S FIND OUT WHAT OUR RANDOM NUMBER WILL BE!!"
         ],
         papyrusSolo4a: [
            '<18>{#p/papyrus}{#f/3}ASRIEL.',
            '<25>{#p/asriel2}{#f/6}* Papyrus.',
            '<18>{#p/papyrus}{#f/31}...',
            '<18>{#f/31}WHY?',
            '<18>{#f/31}WHY WOULD YOU DO THIS?',
            "<18>{#f/3}MONSTERS AREN'T SUPPOSED TO BE LIKE THIS...",
            "<18>{#f/5}WHERE'S YOUR LOVE?\nYOUR COMPASSION?",
            '<18>{#f/31}YOUR... MERCY...',
            '<25>{#p/asriel2}{#f/2}* Oh, you sweet stellar star child...',
            '<25>{#f/1}* I lost those things a LONG time ago.',
            "<18>{#p/papyrus}{#f/31}BUT...\nI DON'T GET IT...",
            '<18>{#f/5}HOW CAN A MONSTER SO PURE OF HEART...',
            '<18>{#f/31}...BE TURNED SO COMPLETELY TO THE DARK SIDE?',
            '<25>{#p/asriel2}{#f/1}* You really wanna know?',
            '<18>{#p/papyrus}{#f/3}...',
            '<18>{#f/3}YES...',
            '<25>{#p/asriel2}{#f/10}* But do you really, really wanna know?',
            '<18>{#p/papyrus}{#f/31}YES.',
            '<25>{#p/asriel2}{#f/3}* Say it louder.',
            '<18>{#p/papyrus}{#f/5}YES!',
            '<26>{#p/asriel2}{#f/1}* With an exoberry on top.',
            '<18>{#p/papyrus}{#f/7}YES!\nWITH AN EXOBERRY ON TOP, DAMMIT!',
            '<25>{#p/asriel2}{#f/1}* Hee hee hee...',
            "<25>{#f/1}* Alright, I'll tell you.",
            "<25>{#f/15}* In fact, it'll only take one word...",
            '<18>{#p/papyrus}{#f/4}OH MY GOD, JUST SAY IT ALREADY...'
         ],
         papyrusSolo4b: [
            '<25>{*}{#p/asriel2}{#f/14}{@random:1.1,1.1}{@fill:#f00}* $(name).',
            '<18>{#p/papyrus}{#f/8}...!',
            '<25>{#p/asriel2}{#f/5}* Hah!\n* Hahaha!\n* The look on your face!'
         ],
         papyrusSolo4c: [ '<18>{#p/papyrus}{#f/31}I...', '<18>{#f/3}...NO...' ],
         papyrusSolo4d: [
            "<18>{#p/papyrus}{#f/7}NO, YOU'RE WRONG.",
            "<18>{#f/7}YOU ARE THE ONE WHO'S BEEN TRYING TO BRING ME DOWN.",
            "<18>{#f/7}YOU ARE THE ONE WHO'S FED ME LIE AFTER LIE.",
            '<18>{#f/9}BUT I, PAPYRUS...',
            '<18>{#f/9}FINALLY UNDERSTAND THE {@fill:#f00}REAL TRUTH{@fill:#fff}.',
            "<25>{#p/asriel2}{#f/13}* Oh?\n* And what's that?"
         ],
         papyrusSolo4e: [ "<18>{#p/papyrus}{#f/34}YOU'RE NOT {@fill:#f00}ASRIEL{@fill:#fff}." ],
         papyrusSolo4f: [
            '<18>{#f/31}{@fill:#f00}ASRIEL{@fill:#fff} WOULD NEVER ACT LIKE THIS.',
            '<18>{#f/5}{@fill:#f00}ASRIEL{@fill:#fff} WAS A KIND SOUL.',
            '<18>{#f/5}{@fill:#f00}ASRIEL{@fill:#fff} BELIEVED IN PEOPLE...',
            '<18>{#f/31}HE BELIEVED IN HUMANITY BEFORE ANYONE ELSE DID.',
            '<18>{#f/4}YOU, ON THE OTHER HAND...',
            '<18>{#f/7}YOU JUST WANT TO USE THEM FOR YOUR OWN ENDS!',
            "<18>{#f/4}AND FRANKLY, I DON'T CARE WHAT YOU HAVE TO SAY.",
            '<18>{#f/9}I STILL HAVE HOPE FOR THAT HUMAN.',
            "<25>{#p/asriel2}{#f/8}* Well, if you've got so much faith in them...",
            '<25>{#f/7}* Then prove me wrong.',
            "<25>{#f/3}* I'll let you take them on, one on one.",
            "<25>{#f/3}* If they spare you, then I'll admit I was wrong.",
            '<25>{#f/4}* But if they kill you, which they inevitably will...',
            "<25>{#f/1}* You'll realize that I was right, and that Sans died for nothing.",
            '<25>{#f/1}* How does that sound?',
            '<18>{#p/papyrus}{#f/9}...\nI ACCEPT.',
            '<25>{#p/asriel2}{#f/3}* Splendid.',
            '<25>{#f/4}* See you never.'
         ]
      },
      gonezo: () =>
         world.bullied ? [ '<32>{#p/narrator}* ...but everybody ran.' ] : [ '<32>{#p/narrator}* ...but nobody came.' ],
      doggonopoggo: [ "<32>{#p/narrator}* Looks like nobody's home." ],
      housebloc: [ "<32>{#p/narrator}* It's locked." ],
      innkeep1a: pager.create(
         'limit',
         [
            "<32>{#p/monster}{#npc/a}* Welcome to Starred Inn!\n* Starton's premier hotel!",
            '<32>* One night will cost you 80G.',
            choicer.create('* (Get a room?)', 8, 7, 'Yes', 'No')
         ],
         [
            '<32>{#p/monster}{#npc/a}* Changed your mind?',
            '<32>* Remember, one night is 80G.',
            choicer.create('* (Get a room?)', 8, 7, 'Yes', 'No')
         ]
      ),
      innkeep1b: pager.create(
         'limit',
         () => [
            '<32>{#p/monster}{#npc/a}* Back again?\n* Remember, one night is 80G.',
            save.data.n.state_starton_sleep === 2
               ? choicer.create('* (Get a room again?)', 8, 7, 'Yes', 'No')
               : "<32>{#p/narrator}* ...but you're not tired enough yet."
         ],
         () => [
            '<32>{#p/monster}{#npc/a}* Changed your mind?',
            save.data.n.state_starton_sleep === 2
               ? choicer.create('* (Get a room again?)', 8, 7, 'Yes', 'No')
               : "<32>{#p/narrator}* ...but you're not tired enough yet."
         ]
      ),
      innkeep1c: pager.create(
         'limit',
         () => [
            '<33>{#p/monster}{#npc/a}* Back again?\n* Well, stay as long as you like!',
            save.data.n.state_starton_sleep === 1
               ? choicer.create('* (Get a room again?)', 8, 7, 'Yes', 'No')
               : "<32>{#p/narrator}* ...but you're not tired enough yet."
         ],
         () => [
            '<32>{#p/monster}{#npc/a}* Changed your mind?',
            save.data.n.state_starton_sleep === 1
               ? choicer.create('* (Get a room again?)', 8, 7, 'Yes', 'No')
               : "<32>{#p/narrator}* ...but you're not tired enough yet."
         ]
      ),
      innkeep2a: [
         "<32>{#p/monster}{#npc/a}* ...you don't even have 80G?",
         "<32>* Oh! You poor thing.\n* I can only imagine what you've been through.",
         '<32>* One of the rooms upstairs is empty, you can sleep there for free, okay?'
      ],
      innkeep2b: [ "<32>{#p/monster}{#npc/a}* Here's your room key.\n* Remember to bundle up!" ],
      innkeep2c: [ "<32>{#p/monster}{#npc/a}* Sorry, you don't have enough G..." ],
      innkeep3a: [ '<32>{#p/monster}{#npc/a}* Hiya!\n* You look like you had a great sleep.' ],
      innkeep3b: [ '<32>* Which is incredible, considering you were only up there for a short while.' ],
      innkeep3c: [ '<32>* Feel free to come back if you get tired.' ],
      innkeep3d: [ "<32>* Here's your money back.\n* You can pay me if you're going to stay overnight." ],
      innkeep4: [ "<32>* Not in a sleepy mood?\n* Well, I'll always be here if you need me!" ],
      innkeep5: [ '<32>* I wish you well on your travels!' ],
      joey1: pager.create(
         'limit',
         [
            '<32>{#p/monster}{#npc/a}* Check out my balloon!',
            '<32>* Undyne gave it to me the other day for helping her find a lost monster.',
            '<32>* Do you like it?'
         ],
         () =>
            world.population < 10 || world.dead_skeleton
               ? [ "<32>{#p/monster}{#npc/a}* From the look on your face, you don't like it very much, do you..." ]
               : save.data.b.oops
               ? [ "<32>{#p/monster}{#npc/a}* From the look on your face, I'd say you like it!" ]
               : [ '<32>{#p/monster}{#npc/a}* From the look on your face, I can tell you love it!' ]
      ),
      kidd1: pager.create(
         'random',
         [ "<25>{#p/kidd}{#f/1}* What's up?" ],
         [ '<25>{#p/kidd}{#f/1}* Yo, howzzitgoin?' ],
         [ '<25>{#p/kidd}{#f/1}* Hey, hey, hey!' ],
         [ '<25>{#p/kidd}{#f/1}* Nice to see you, haha.' ]
      ),
      kidd2: pager.create(
         'limit',
         () =>
            game.room === 's_town1'
               ? [
                    "<25>{#p/kidd}{#f/1}* Yo, you're a kid too, right?",
                    "<25>{#p/kidd}{#f/1}* I can tell 'cause you're wearing a striped shirt."
                 ]
               : [
                    '<25>{#p/kidd}{#f/7}* Wait, you read books too!?',
                    '<25>{#p/kidd}{#f/1}* That librarby taught me everything I know about monster history!',
                    "<25>{#p/kidd}{#f/3}* I can't even imagine what living on a planet is like..."
                 ],
         () =>
            game.room === 's_town1'
               ? [ '<25>{#p/kidd}{#f/1}* I wonder if that short skeleton is an adult or a kid.' ]
               : [ '<25>{#p/kidd}{#f/3}* Have you ever lived on a planet?' ]
      ),
      marriage1: [
         "<32>{#p/monster}* What's that smell?\n* (Where's that smell?)",
         "<32>* If you're a smell...\n* (...identify yoursmellf!)"
      ],
      marriage2: [
         "<32>{#p/monster}* Hmmm...\n* Here's that weird smell.",
         '<32>* It makes me want to eliminate...',
         '<32>* (...eliminate YOU!)'
      ],
      marriage3a: [
         '<32>{#p/monster}* Dogs can pet other dogs???\n* (A new world has opened up for us...)',
         '<32>* Thanks, weird puppy!'
      ],
      marriage3b: [
         '<32>{#p/monster}* Weird smells can bring good things...\n* (Friendly fun fetch!)',
         '<32>* Thanks, weird smell!\n* (It sure was fun to catch a "wrench" in the works!)'
      ],
      marriage4: [
         "<32>{#p/monster}* Where's the prince?\n* (Did we come the right way?)",
         '<32>* We must stop that menace...\n* (...and his human companion!)'
      ],
      marriage5: [ '<32>{#p/monster}* Hmmm...\n* Here they are...', "<32>* (Let's capture them!)" ],
      maze1: [
         '<18>{#p/papyrus}OHO, THE HUMAN ARRIVES!',
         '<18>MY BROTHER AND I HAVE CREATED MANY PUZZLES.',
         '<18>{#f/9}ARE YOU UP FOR THE CHALLENGE, HUMAN!?',
         choicer.create('* (What do you say?)', 8, 7, 'Yes', 'No'),
         '<18>{#p/papyrus}CORRECT ANSWER!\nFOR YOU SEE...'
      ],
      maze2a: [
         '<18>{#x4}{#f/9}NO CRAFTSMAN HAS EVER MADE TRAPS AS FINE AS ME!',
         "<18>{#f/0}THEY'RE PRACTICALLY IRRESISTIBLE!",
         "<25>{#x1}{#p/sans}{#f/2}* maybe you're the one who's irresistible.",
         '<18>{#p/papyrus}{#f/1}REALLY!?'
      ],
      maze2b: [
         '<18>{#x4}{#f/9}NO HUMAN HAS EVER BESTED A PUZZLE BY THE GREAT PAPYRUS!',
         '<25>{#x1}{#p/sans}{#f/4}* no human has even had the chance to, bro.',
         "<18>{#p/papyrus}{#x3}{#f/7}UGH, THAT'S BESIDES THE POINT!!"
      ],
      maze3: [ '<18>{#x1}{#f/0}ANYWHO, THIS HERE IS WHAT I LIKE TO CALL...' ],
      maze3a: [
         "<18>'THE WALL OF FIRE!!'",
         "<25>{#p/sans}* couldn't you just call it the 'firewall?'\n* it'd save time.",
         "<18>{#p/papyrus}{#f/4}DR. ALPHYS WOULD THINK I'M MIS- USING THE TERM.",
         "<25>{#p/sans}* i dunno bro, she's really into that kinda stuff. in fact...",
         "<30>{#f/2}* i bet she'd find it {@fill:#ff0}hot{@fill:#fff}."
      ],
      maze4: [ '<18>{#p/papyrus}{#x3}{#f/7}NOT NOW, SANS!!' ],
      maze5: [
         "<25>{#x2}{#p/sans}* ok, i'll stop {#x1}now.",
         "<25>{#f/4}{*}* i mean, since you've practically {#x2}lit a {@fill:#ff0}fire{@fill:#fff} under- {%}",
         '<18>{#p/papyrus}ANYWAY, THE IDEA BEHIND THIS PUZZLE IS SIMPLE.',
         '<18>BECAUSE ALL YOU HAVE TO DO...',
         '<18>{#f/9}IS MAKE IT TO THE OTHER SIDE!!',
         '<18>{#f/0}GOOD LUCK!!\nNYEH HEH HEH!!'
      ],
      maze6: pager.create(
         'limit',
         [ "<18>{#p/papyrus}{#x2}{#f/7}WHERE DO YOU THINK YOU'RE GOING!?" ],
         [ '<18>{#p/papyrus}{#x2}{#f/7}GET BACK HERE!!' ]
      ),
      maze7: [
         [
            '<18>{#p/papyrus}ARE YOU AFRAID OF THE FLAMES??',
            "<18>{#f/4}DON'T WORRY, THEY CAN'T ACTUALLY\nHARM YOU.",
            "<18>{#f/0}AS SANS WOULD SAY, THEY'RE JUST 'PLEASANTLY WARM.'",
            '<25>{#p/sans}* actually, i picked that saying up from a friend.',
            '<18>{#p/papyrus}{#f/4}...OH.'
         ],
         [
            '<18>{#p/papyrus}ARE YOU ANXIOUS ABOUT FAILING THE PUZZLE??',
            "<18>IF THAT'S THE CASE, THEN YOU MUST KNOW...",
            '<18>{#x4}{#f/9}I, THE GREAT PAPYRUS, WOULD NOT JUDGE YOU FOR IT!',
            "<18>{#f/0}AS EVERY STAR CHEF KNOWS, IT'S THE HEART THAT COUNTS.",
            '<18>{#x1}SO GO ON, DO TRY YOUR BEST!'
         ],
         [
            '<18>{#f/4}(SANS, WHAT IS THE HUMAN DOING??)',
            '<25>{#p/sans}* they could just be studying the pattern.',
            '<18>{#p/papyrus}{#f/4}(OH, TRUE.)',
            '<18>{#f/9}IN THAT CASE, PROCEED WHEN READY!'
         ]
      ],
      maze8: [
         '<18>{#p/papyrus}NYEH HEH HEH!\nWELL THEN.',
         "<18>{#f/9}IT SEEMS YOU'VE BEEN JAPED BY THE GREAT PAPYRUS!",
         '<18>{#f/0}BUT FRET NOT!',
         '<18>FOR YOU SEE, MY TRAPS ARE NO SLOUCH.',
         "<18>{#f/9}YOU CAN'T BE BLAMED FOR FAILING ONE SO EASILY!!"
      ],
      maze9: [
         '<18>{#p/papyrus}{#f/1}WHAT!?',
         '<18>{#f/7}HOW DID YOU MANAGE TO DO THAT!?!?',
         '<18>THAT SETUP WAS MEANT TO BE 100% IMPASSABLE!',
         '<18>{#f/4}OR SO I THOUGHT...',
         '<18>{#f/9}WELL THEN!\nI SHALL HAVE TO STEP UP MY GAME!'
      ],
      maze10: [
         '<18>{#f/4}IN ANY CASE...',
         '<18>{#f/0}I AM EXCITED FOR WHAT COMES NEXT!',
         '<18>{#f/4}A PUZZLE SO CONFOUNDING...',
         "<18>{#f/1}EVEN TERRESTRIA HERSELF COULDN'T SOLVE IT!!!",
         "<25>{#p/sans}* terrestria?\n* isn't she the oldest puzzlemaster around?",
         '<18>{*}{#p/papyrus}{#f/1}UH...\nWELL YES, BUT- {%}',
         "<25>{#p/sans}* dang, i didn't know you thought THAT highly of me.",
         '<18>{#p/papyrus}{#f/4}WHAT.',
         "<25>{#p/sans}* think about it.\n* if even SHE can't do it, then...",
         '<18>{#p/papyrus}{#f/7}{#x3}I GET THE POINT!!'
      ],
      maze11: [
         '<18>{#p/papyrus}{#f/7}SANS, WE HAVE MORE PUZZLES TO PREPARE!!',
         '<18>COME ON!',
         '<25>{#p/sans}* heh, see ya soon kid.'
      ],

      nicecream1: [
         "<32>{#p/monster}* I don't understand why these aren't selling...",
         "<32>* It's the perfect place for something nice..."
      ],
      nicecream2: [
         '<32>{#p/monster}* OH!!!!\n* A CUSTOMER!!',
         '<32>* Hello!\n* Would you like some Nice Cream?',
         "<32>* It's the frozen treat that warms your heart!\n* Now just 12G.",
         choicer.create('* (Buy a Nice Cream?)', 8, 7, 'Yes', 'No')
      ],
      nicecream3: [
         "<32>{#p/monster}* Nice Cream!\n* It's the frozen treat that warms your heart!",
         '<32>* Now just 12G.',
         choicer.create('* (Buy a Nice Cream?)', 8, 7, 'Yes', 'No')
      ],
      nicecream4: [
         '<32>{#p/monster}* Here you go!\n* Have a super-duper day!',
         '<32>{#p/human}* (You got the Nice Cream.)'
      ],
      nicecream5: [ "<32>{#p/monster}* Huh?\n* You don't have enough money..." ],
      nicecream6: [ '<32>{#p/monster}* Tell you what, have your first one on me.' ],
      nicecream7: [ '<32>{#p/monster}* I wish I could make more Nice Cream for free...' ],
      nicecream8: [
         '<32>{#p/monster}* Well then...\n* Tell your friends...',
         "<32>* There's ice cream out here...\n* In the middle of nowhere..."
      ],
      nicecream9: [ "<32>{#p/monster}* Oh, that's okay!", '<32>* Come again soon, my friend!' ],
      nicecream10: [ "<32>{#p/monster}* You don't have enough room in your pockets..." ],
      nicecreamF1: [ '<32>{#p/monster}* I relocated my stand, but there are still no customers...' ],
      nicecreamF2: [
         "<32>{#p/monster}* Fortunately, I've thought of a solution!!",
         '<32>* Punch cards!',
         '<32>* Every time you buy a Nice Cream, you can take a punch card from the box.',
         '<32>* If you have 3 cards, you can trade them for a free Nice Cream!',
         "<32>* They're sure to get the customers to come back!",
         '<32>* Oh, um, would you like some Nice Cream?',
         "<32>* It's the frozen treat that warms your heart!\n* Now just 10G.",
         choicer.create('* (Buy a Nice Cream?)', 8, 7, 'Yes', 'No')
      ],
      nicecreamF3: [
         '<32>{#p/monster}* Well then...\n* Tell your friends...',
         '<32>* Four Nice Creams for the price of three...'
      ],
      nicecreamF4: [ "<32>{#p/monster}* Don't forget to take a punch card from the box!" ],
      nicecreamF5: [
         "<32>{#p/monster}* Nice Cream!\n* It's the frozen treat that warms your heart!",
         "<32>* You've got 3 punch cards, would you like to redeem them?",
         choicer.create('* (Get a Nice Cream?)', 8, 7, 'Yes', 'No')
      ],
      nicecreamF6: [
         "<32>{#p/monster}* Nice Cream!\n* It's the frozen treat that warms your heart!",
         '<32>* Now just 10G.',
         choicer.create('* (Buy a Nice Cream?)', 8, 7, 'Yes', 'No')
      ],
      nicecreamK1: [
         '<25>{#p/kidd}{#f/1}* Yo, can I get a Nice Cream?',
         "<32>{#p/monster}* Sure, kid.\n* If you've got the money.",
         '<25>{#p/kidd}{#f/2}* (Psst, give them this.)'
      ],
      nicecreamK2: [ '<32>{#p/monster}* W... where did you get that?' ],
      nicecreamK3: [
         '<32>* S-sure kid... here you go!',
         '<32>{#s/equip}{#p/human}* (You handed the Nice Cream to Monster Kid.)'
      ],
      nicecreamE: pager.create(
         'limit',
         () => [
            "<32>{#p/monster}* Hey, kiddo!\n* I'd offer you a Nice Cream, but I'm all sold out!",
            ...(2 <= save.data.n.plot_date && save.data.n.exp <= 0
               ? [
                    '<32>* That fish lady bought out my entire stock.',
                    "<32>* Mind you, it's not the first time she's done it..."
                 ]
               : 2 <= save.data.n.plot_date && save.data.n.plot < 68
               ? [
                    '<32>* That handsome skeleton got the last of my supply.',
                    "<33>* Don't blame him, though.\n* He is pretty handsome, heheh..."
                 ]
               : [
                    '<33>* Those numbered royal guard girls ran me dry.',
                    '<32>* Apparently they found out they were like, childhood friends or something of the sort.',
                    '<32>* Not gonna lie, though...\n* Calling them "friends" would be putting it lightly.'
                 ])
         ],
         [ '<32>{#p/monster}* Maybe it\'s time to start that "Nice Cream" franchise I\'ve always dreamed of...' ]
      ),
      npcinter: {
         s_genokid: pager.create(
            'limit',
            [
               '<25>{#p/kidd}{#f/3}{#npc/a}* Yo, everyone ran away and hid somewhere.',
               '<25>{#f/3}* Man, adults can be so dumb sometimes, haha...',
               "<25>{#f/1}* Don't they know we've got Undyne to protect us!?"
            ],
            [ "<25>{#p/kidd}{#f/1}{#npc/a}* Undyne's got our backs!" ]
         ),
         g_beautifulfish: pager.create(
            'limit',
            () =>
               save.data.n.plot === 33
                  ? [
                       "<32>{#p/monster}{#npc/a}* It's surprising to see Sans back here after what happened last time.",
                       "<32>* ...actually, perhaps that's not too surprising."
                    ]
                  : world.dead_skeleton
                  ? [
                       '<32>{#p/monster}{#npc/a}* Where the heck is Sans?',
                       '<32>* He told me he had a star chart I could use to find girls...',
                       '<32>* I mean, it was probably some kind of prank, but I wanted to know what the prank was!'
                    ]
                  : [
                       '<32>{#p/monster}{#npc/a}* I "put out a call" for some girls today.',
                       '<32>* Someone told me there are infinite possibilities among the stars...',
                       "<32>* Well, I'm taking that seriously.",
                       "<32>* I'm literally going to make out with a space creature."
                    ],
            () =>
               save.data.n.plot === 33
                  ? [
                       "<32>{#p/monster}{#npc/a}* You're talking to me like you want the inside scoop.",
                       "<32>{#p/monster}{#npc/a}* Sorry kid.\n* Guess you'll just have to wait for the next news update."
                    ]
                  : world.dead_skeleton
                  ? [ '<32>{#p/monster}{#npc/a}* Do you know where Sans is?' ]
                  : [
                       '<32>{#p/monster}{#npc/a}* I guess I could ask Undyne.\n* But I think she likes someone else already.'
                    ],
            () =>
               save.data.n.plot === 33
                  ? [ "<32>{#p/monster}{#npc/a}* Don't tell me you don't have an OuterNet account..." ]
                  : world.dead_skeleton
                  ? [ '<32>{#p/monster}{#npc/a}* Let me know if you see him...' ]
                  : [ '<32>{#p/monster}{#npc/a}* Can I ever find love out here?' ]
         ),
         g_bigmouth: pager.create(
            'limit',
            () =>
               save.data.n.plot === 33
                  ? [
                       "<32>{#p/monster}{#npc/a}* Despite Sans's vast culinary knowledge, he always orders the worst burger off the menu.",
                       ...(world.dead_skeleton
                          ? [
                               '<32>* Except for earlier today...',
                               '<32>* ...when he ordered the SECOND worst burger off the menu.',
                               "<32>* That's something, right?"
                            ]
                          : [ "<32>* It's practically fate." ])
                    ]
                  : world.dead_skeleton
                  ? [
                       '<32>{#p/monster}{#npc/a}* Hmmm, this is around the time that Sans comes in.',
                       '<32>* Then, a little bit later, his brother comes in.',
                       '<32>* Yes, his brother.\n* Papyrus.',
                       "<32>* He's an interesting fellow, and he always orders a glass of milk...",
                       '<32>* He says it\'s "full of strong bones."'
                    ]
                  : [
                       "<32>{#p/monster}{#npc/a}* Hmmm...\n* Isn't human food different from monster food?",
                       '<32>* It does things like "spoil."',
                       '<32>* And when you eat it, it passes all the way through your body.',
                       "<32>* I'd love to try it sometime."
                    ],
            () =>
               save.data.n.plot === 33
                  ? world.dead_skeleton
                     ? [ "<32>* Come to think of it, that's not the only off-putting thing to have happened today..." ]
                     : [ "<32>* Can't imagine what it'd take to change a fate like that." ]
                  : world.dead_skeleton
                  ? [
                       '<32>{#p/monster}{#npc/a}* I hope he shows up today.\n* Him and his brother are great at making us laugh.'
                    ]
                  : [ '<32>{#p/monster}{#npc/a}* I\'ve also heard they have things called "bathrooms."' ],
            () =>
               save.data.n.plot === 33
                  ? world.dead_skeleton
                     ? [ "<32>* Come to think of it, that's not the only off-putting thing to have happened today..." ]
                     : [ "<32>* Can't imagine what it'd take to change a fate like that." ]
                  : world.dead_skeleton
                  ? [ '<32>{#p/monster}{#npc/a}* Skeletons are cool.' ]
                  : [ '<32>{#p/monster}{#npc/a}* Humans are weird.' ]
         ),
         g_bunbun: pager.create(
            'limit',
            () =>
               save.data.n.plot === 33
                  ? [
                       '<32>{#p/monster}{#npc/a}* Sansyyyy...\n* Come back and sit with me...!',
                       "<32>* Everything's so f-f-fun when you're around..."
                    ]
                  : world.dead_skeleton
                  ? [
                       "<32>{#p/monster}{#npc/a}* H-hey, isn't Sansy s'posed to come swinging in right about now??",
                       "<32>* C'mon Sansy!\n* You're the life of the party..."
                    ]
                  : world.dead_dog
                  ? [
                       "<32>{#p/monster}{#npc/a}* It's s-s-so quiet in here.",
                       "<32>* Lighten up everybody!\n* ...\n* I'm really starting to loathe th-this place."
                    ]
                  : [
                       "<32>{#p/monster}{#npc/a}* No matter where I go, it's the same menu, the same people...",
                       "<32>* Help!\n* I want new drinks an' h-h-h-hot guys!!"
                    ],
            () =>
               save.data.n.plot === 33
                  ? [ '<32>{#p/monster}{#npc/a}* Sansyyyy...' ]
                  : world.dead_skeleton || world.dead_dog
                  ? [ '<32>{#p/monster}{#npc/a}* ...' ]
                  : [ "<32>{#p/monster}{#npc/a}* I guess the bartender's kind of h-h-h-hot..." ],
            () =>
               save.data.n.plot === 33
                  ? [ '<32>{#p/monster}{#npc/a}* Sansyyyy...' ]
                  : world.dead_skeleton || world.dead_dog
                  ? [ '<32>{#p/monster}{#npc/a}* ...' ]
                  : [ "<32>{#p/monster}{#npc/a}* I jus' don't kn-know what to do anymore!" ]
         ),
         g_dogamy: () =>
            save.data.n.plot === 33
               ? [ '<32>{#p/monster}{#npc/a}* Shoot, I was hoping Sans came to give us a pat on the head.' ]
               : save.data.n.state_starton_doggo === 2 && save.data.n.state_starton_greatdog === 2
               ? [ '<32>{#p/monster}{#npc/a}* Smells kinda... quiet.' ]
               : save.data.n.state_starton_doggo === 2
               ? [ "<32>{#p/monster}{#npc/a}* (Where's Doggo?)\n* (I hope he didn't get lost again.)" ]
               : save.data.n.state_starton_greatdog === 2
               ? [ "<32>{#p/monster}{#npc/a}* Where's that big lug?\n* We can't start until he shows up." ]
               : world.dead_skeleton
               ? [ "<32>{#p/monster}{#npc/a}* Where's Sans...\n* He's supposed to give me a pat on the head..." ]
               : [
                    '<32>{#p/monster}{#npc/a}* You better watch where you sit down in here, kid.',
                    '<32>* That big lug WILL jump into your lap and give you lots of love and attention.'
                 ],
         g_dogaressa: () =>
            save.data.n.plot === 33
               ? [ '<32>{#p/monster}{#npc/a}* (I like Sans.)\n* (Sometimes he feeds us scraps of food under the table.)' ]
               : save.data.n.state_starton_doggo === 2 && save.data.n.state_starton_greatdog === 2
               ? [
                    "<32>{#p/monster}{#npc/a}* (It's lonely in here today.)\n* (If our friends don't show up, would you like to play?)"
                 ]
               : save.data.n.state_starton_doggo === 2
               ? [ "<32>{#p/monster}{#npc/a}* (Where's Doggo?)\n* (I hope he didn't get lost again.)" ]
               : save.data.n.state_starton_greatdog === 2
               ? [ "<32>{#p/monster}{#npc/a}* (Where's Canis Major?)\n* (He was supposed to join us for this game.)" ]
               : world.dead_skeleton
               ? [ '<32>{#p/monster}{#npc/a}* (Where are those skeletons?)\n* (I wanted to get a bone from them...)' ]
               : [
                    "<32>{#p/monster}{#npc/a}* (We're sentries, but we never get any respect.)",
                    '<32>* (I wish those skeletons would throw us more bones.)',
                    '<32>* (We love bones.)'
                 ],
         g_doggo: () =>
            save.data.n.plot === 33
               ? [
                    '<32>{#p/monster}{#npc/a}* Huh?\n* Since when did you and Sans become friends...?',
                    "<32>* I'm not the biggest fan of that guy...",
                    '<32>* He loves to appear without moving.'
                 ]
               : save.data.n.state_starton_dogs === 2 && save.data.n.state_starton_greatdog === 2
               ? [
                    "<32>{#p/monster}{#npc/a}* Sometimes the others like to prank me. They sit still so I can't see them.",
                    '<32>* They must be here, playing a joke on me.',
                    "<32>* I'll just wait until one of them admits it..."
                 ]
               : save.data.n.state_starton_dogs === 2
               ? [
                    "<32>{#p/monster}{#npc/a}* Where're the other two?\n* I can't play with this big lug alone...",
                    "<32>* It'd be too hard!"
                 ]
               : save.data.n.state_starton_greatdog === 2
               ? [
                    "<32>{#p/monster}{#npc/a}* Where's the big lug?\n* I can't play with these two alone...",
                    "<32>* It'd be too easy!"
                 ]
               : world.dead_skeleton
               ? [ '<32>{#p/monster}{#npc/a}* Papyrus?\n* Is that you?\n* Come on...' ]
               : [
                    "<32>{#p/monster}{#npc/a}* I'm thinking of letting my hair grow out a little to show off my personality.",
                    '<32>* It makes a statement like "Give me a big, soft hug and cuddle me, please."'
                 ],
         g_grillby: () =>
            save.data.n.plot === 33
               ? [
                    '<32>{#p/monster}{#npc/a}* ...\n* ...\n* ...',
                    '<32>* Grillbz said your food is probably inedible by now.'
                 ]
               : [
                    '<32>{#p/monster}{#npc/a}* ...\n* ...\n* ...',
                    '<32>* Grillbz said he found his new colors in an e-magazine.',
                    "<32>* Personally, I prefer Grillbz' natural orange color.\n* But that's just me."
                 ],
         g_punkhamster: pager.create(
            'limit',
            () =>
               save.data.n.plot === 33
                  ? [
                       '<32>{#p/monster}{#npc/a}* Sans has a troublesome history with this place.',
                       '<32>* Not like Grillby cares.\n* Sans is practically his only regular customer.'
                    ]
                  : world.dead_skeleton ||
                    (world.dead_dog && save.data.n.state_starton_lesserdog === 2) ||
                    world.population < 10
                  ? [
                       "<32>{#p/monster}{#npc/a}* The capital's getting pretty crowded, so I've heard they're going to start moving here.",
                       "<32>* ...who knows?\n* Maybe we'll have room for 'em."
                    ]
                  : [
                       "<32>{#p/monster}{#npc/a}* The capital's getting pretty crowded, so I've heard they're going to start moving here.",
                       "<32>* Hmmm...\n* I don't want to see the erasure of our local culture.",
                       "<32>* But it'd definitely be fun to teach those city slickers how we do things out here!"
                    ],
            () =>
               save.data.n.plot === 33
                  ? [ "<32>{#p/monster}{#npc/a}* Regular?\n* Who, me?\n* Nah, I'm only semi-regular." ]
                  : [ "<32>{#p/monster}{#npc/a}* Yeah, bring 'em on!" ]
         ),
         g_redbird: pager.create(
            'limit',
            () =>
               save.data.n.plot === 33
                  ? [
                       "<32>{#p/monster}{#npc/a}* Sans is a royal sentry, but don't let his title fool ya.",
                       '<32>* Everyone knows he sits around in the outer reaches reading {@fill:#ff0}shuttlecraft manuals{@fill:#fff}.'
                    ]
                  : world.dead_skeleton
                  ? [
                       '<32>{#p/monster}{#npc/a}* Grillby is getting nervous.',
                       "<32>* Sans is his best customer, and he hasn't shown up at all today..."
                    ]
                  : world.dead_dog
                  ? [
                       '<32>{#p/monster}{#npc/a}* Those dogs are part of the ROYAL GUARD, the...',
                       '<32>* Huh?\n* Where are they?\n* Weird...'
                    ]
                  : world.population < 2
                  ? [
                       "<32>{#p/monster}{#npc/a}* Word around town is there's a bully going and beating people up.",
                       '<32>* Grillbz and I decided to stay behind, though.',
                       "<32>* No bully's gonna keep us from running this establishment!"
                    ]
                  : [
                       '<32>{#p/monster}{#npc/a}* Those dogs are part of the ROYAL GUARD, the military group led by UNDYNE.',
                       "<32>* She's rude, loud, and beats up everybody who disrespects her...",
                       "<32>* It's no wonder all the kids want to be like her when they grow up!"
                    ],
            () =>
               save.data.n.plot === 33
                  ? [
                       "<32>{#p/monster}{#npc/a}* Don't ask me why he does it.",
                       "<32>* If I had to guess, though, I'd say it's got something to do with Papyrus."
                    ]
                  : world.dead_skeleton || world.dead_dog
                  ? [ '<32>{#p/monster}{#npc/a}* Something feels off.' ]
                  : world.population < 2
                  ? [ "<32>{#p/monster}{#npc/a}* At least they're not out there killing everybody." ]
                  : [ '<32>{#p/monster}{#npc/a}* I want to be like UNDYNE when I grow up, too!\n* Hoo hoo hoo!' ]
         ),
         l_cupjake: pager.create(
            'limit',
            () => [
               "<32>{#p/monster}{#npc/a}* There's an {@fill:#f00}odd book{@fill:#fff} that appears and disappears here at random...",
               '<32>* But that sweet lady always seems to be in the way of it!',
               '<32>* Do you know anything that could scare her off?'
            ],
            [ "<32>{#p/monster}{#npc/a}* I know what you're thinking.", "<32>* Don't try it." ]
         ),
         l_kakurolady: [
            '<32>{#p/monster}{#npc/a}* (Cough, cough.)',
            '<33>* Back in school, teachers gave us spot-the-difference puzzles when they ran out of work.',
            '<32>* I thought they were a waste of time.\n* But look at me now...',
            "<33>* I'm the number-one spot-the- difference artist on the outpost!"
         ],
         l_librarian: pager.create('limit', () =>
            world.dead_dog || world.dead_skeleton || world.population < 10
               ? [
                    '<32>{#p/monster}{#npc/a}* Welcome to the librarby.\n* Please, try not to get any of that dust on the bookshelves.',
                    "<32>* We've got a difficult enough time cleaning them as it is."
                 ]
               : [
                    '<32>{#p/monster}{#npc/a}* Welcome to the librarby.\n* Actually, that name started as a spelling mistake.',
                    '<32>* Now everybody calls it that...'
                 ]
         ),
         l_sweetie: pager.create(
            'limit',
            () =>
               world.dead_dog || world.dead_skeleton || world.population < 6
                  ? [
                       '<32>{#p/monster}{#npc/a}* I love working the newspaper.',
                       "<32>* Lately, though, I've had to report on something terrible...",
                       "<32>* I'm starting to second-guess my life choices."
                    ]
                  : [
                       '<32>{#p/monster}{#npc/a}* I love working the newspaper.',
                       "<32>* There's so little to report that we just fill it with comics and games."
                    ],
            () =>
               world.dead_dog || world.dead_skeleton || world.population < 6
                  ? [ '<32>{#p/monster}{#npc/a}* Have you ever felt like your life is just running in circles?' ]
                  : [ "<32>{#p/monster}{#npc/a}* Have you ever felt like you're just missing something?" ]
         ),
         s_faun: pager.create(
            'limit',
            () =>
               [
                  [
                     '<32>{#p/monster}{#npc/a}* A dog just rushed in here, filled with inspiration.',
                     '<32>* It kept trying to create a hologram that expressed its own emotions...',
                     '<32>* But, as it did, it kept getting more excited about the creation...',
                     '<32>* Its neck got longer and longer, and it added more and more light, until...',
                     "<32>* It was rather sad to watch, but I couldn't turn away."
                  ],
                  [
                     "<32>{#p/monster}{#npc/a}* That dog from earlier...?\n* It's at Grillby's.\n* I think.",
                     '<32>* After work, all of the dogs go there to play cards together.',
                     "<32>* But that dog doesn't really know how to express itself.",
                     '<32>* So, it ends up playing alone, instead of introducing itself to the others...'
                  ],
                  [
                     "<32>{#p/monster}{#npc/a}* Where's that dog?",
                     '<32>* It usually comes through here every day after work...'
                  ],
                  [
                     '<32>{#p/monster}{#npc/a}* A badly wounded dog just walked through here...',
                     '<32>* What kind of person would bully a cute little dog?'
                  ]
               ][save.data.n.state_starton_lesserdog],
            () =>
               [
                  [ '<32>{#p/monster}{#npc/a}* Too bad for the dog, huh?' ],
                  [ '<32>{#p/monster}{#npc/a}* So sad for the dog, huh?' ],
                  [ '<32>{#p/monster}{#npc/a}* Have you seen it?' ],
                  [ '<32>{#p/monster}{#npc/a}* Despicable.' ]
               ][save.data.n.state_starton_lesserdog]
         ),
         s_moonrocks1: pager.create(
            'limit',
            [
               '<32>{#p/monster}{#npc/a}* Tch-\n* Unbelievable-',
               '<32>* I got authentic moon rocks straight from a moon, unlike his phoned in crap-',
               "<32>* That guy's rocks don't look anything like a moon-"
            ],
            [ '<32>{#p/monster}{#npc/a}* The nerve of that guy-' ]
         ),
         s_moonrocks2: pager.create(
            'limit',
            [
               '<32>{#p/monster}{#npc/a}* Pfft~\n* Shaw man~',
               "<32>* That dude to my left be sellin' phoney baloney moon rocks, bruh~",
               "<32>* Don't believe a word he says~"
            ],
            [ "<32>{#p/monster}{#npc/a}* The gall o' that dude~" ]
         ),
         t_bunny: pager.create(
            'limit',
            () =>
               world.dead_skeleton
                  ? [
                       "<32>{#p/monster}{#npc/a}* Ah, it's so peaceful and quiet...",
                       '<32>* Usually one of those skeletons chases my little Cinnamon around.'
                    ]
                  : world.dead_dog && save.data.n.state_starton_lesserdog === 2
                  ? [
                       "<32>{#p/monster}{#npc/a}* Ah, it's so peaceful and quiet...",
                       '<32>* Usually one of those dogs chases my little Cinnamon around.'
                    ]
                  : [
                       "<32>{#p/monster}{#npc/a}* Isn't my little Cinnamon just the cutest?",
                       '<32>* Bun-buns are so adorable...\n* Tee hee!'
                    ],
            () =>
               world.dead_skeleton || (world.dead_dog && save.data.n.state_starton_lesserdog === 2)
                  ? [ '<32>{#p/monster}{#npc/a}* I wonder where they are...' ]
                  : [ '<32>{#p/monster}{#npc/a}* Bun-bun-bun-bun-bun...' ]
         ),
         t_icewolf: pager.create('limit', () =>
            world.dead_dog && save.data.n.state_starton_lesserdog === 2
               ? [
                    "<32>{#p/monster}{#npc/a}* Ice Wolf has not seen any of Ice Wolf's dog-friends today.",
                    '<32>* Ice Wolf is sad.'
                 ]
               : save.data.n.state_starton_doggo === 2
               ? [ '<32>{#p/monster}{#npc/a}* Ice Wolf has not seen Doggo-san today.', '<32>* Ice Wolf is lonely.' ]
               : world.dead_skeleton
               ? [ '<32>{#p/monster}{#npc/a}* Ice Wolf has not seen any skeletons today.', '<32>* Ice Wolf is worried.' ]
               : save.data.n.state_starton_doggo === 1 &&
                 save.data.n.state_starton_dogs === 1 &&
                 save.data.n.state_starton_greatdog === 1 &&
                 save.data.n.state_starton_lesserdog === 1
               ? [
                    "<32>{#p/monster}{#npc/a}* Ice Wolf is going to play fetch with Ice Wolf's dog-friends.",
                    '<32>* Ice Wolf is excited.'
                 ]
               : save.data.n.bully_starton > 4
               ? [
                    '<32>{#p/monster}{#npc/a}* Ice Wolf is wondering why so many monsters are beat up.',
                    '<32>* Ice Wolf is concerned.'
                 ]
               : [
                    '<32>{#p/monster}{#npc/a}* Ice Wolf is wondering why Ice Wolf is Ice Wolf when there is no ice to throw around.',
                    '<32>* Ice Wolf is confused.'
                 ]
         ),
         t_imafraidjumitebeinagang: pager.create(
            'limit',
            () =>
               world.dead_skeleton
                  ? [
                       "<32>{#p/monster}{#npc/a}* I went to ask Papyrus about his toothbrush preferences, but he wasn't available.",
                       '<32>* Would you happen to know anything about that?'
                    ]
                  : save.data.n.bully > 9
                  ? [
                       "<32>{#p/monster}{#npc/a}* I'd lend you my MTT-brand toothbrush...",
                       "<32>* ...but I get the feeling you'd smash it a whole bunch."
                    ]
                  : [
                       "<32>{#p/monster}{#npc/a}* Those MTT-brand toothbrushes are so freakin' brittle.",
                       '<32>* Thing got crushed in my hands before I could even start!'
                    ],
            () =>
               world.dead_skeleton
                  ? [ '<32>{#p/monster}{#npc/a}* Hmm... I hope he likes green.' ]
                  : save.data.n.bully > 9
                  ? [ '<32>* Just a feeling, though.' ]
                  : [ '<32>{#p/monster}{#npc/a}* Then again, it was the cheapest option...' ]
         ),
         t_kabakk: pager.create(
            'limit',
            () =>
               world.dead_skeleton ||
               (world.dead_dog && save.data.n.state_starton_lesserdog === 2) ||
               save.data.n.bully_starton > 4
                  ? [
                       '<32>{#p/monster}{#npc/a}* HEY!',
                       '<32>* What you been up to, huh KID?',
                       "<32>* You've got an oughly criminal look on your FACE...",
                       '<32>* ...',
                       '<32>* ...',
                       '<32>* Respect my AUTHORITY!\n* YEAH!'
                    ]
                  : [
                       '<32>{#p/monster}{#npc/a}* HEY!',
                       '<32>* You think you can just stand there and stare at ME?',
                       "<32>* Well, I've got some bad news for you, PAL.",
                       "<32>* I'm an officer of the LAW.",
                       '<32>* So, UH...',
                       '<32>* Respect my AUTHORITY!\n* YEAH!'
                    ],
            [ '<32>{#p/monster}{#npc/a}* Respect it.' ]
         ),
         t_loverboy: pager.create('limit', () =>
            world.dead_skeleton || (world.dead_dog && save.data.n.state_starton_lesserdog === 2)
               ? [
                    "<32>{#p/monster}{#npc/a}* Hey hey, why's everyone so sad around this town?",
                    '<32>* Did something happen?'
                 ]
               : [ "<32>{#p/monster}{#npc/a}* Hey hey, nothing's ever going to change in my life!", '<32>* Ha... ha...' ]
         ),
         t_politics: pager.create(
            'limit',
            () =>
               world.dead_skeleton
                  ? [
                       '<32>{#p/monster}{#npc/a}* Hmmm, usually Papyrus goes to meet with Undyne about now.',
                       '<32>* Where is he...?\n* I can feel our political system crumbling apart...'
                    ]
                  : save.data.n.bully > 9
                  ? [
                       '<32>{#p/monster}{#npc/a}* This town has no real police.\n* But maybe the fake police will scare off the bullies.',
                       '<32>* The politics goes on...'
                    ]
                  : save.data.b.oops
                  ? [
                       '<32>{#p/monster}{#npc/a}* This town has no mayor.',
                       '<32>* But, if anything happens, a skeleton will tell a fish lady about it.',
                       "<32>* Thaaaaaat's politics!"
                    ]
                  : [
                       '<32>{#p/monster}{#npc/a}* This town is always so dreary.',
                       "<32>* But, if things keep going the way they are, maybe that'll change.",
                       '<32>* Is that politics?'
                    ],
            () =>
               world.dead_skeleton || save.data.n.bully > 9
                  ? [ '<32>{#p/monster}{#npc/a}* Politics...' ]
                  : save.data.b.oops
                  ? [ '<32>{#p/monster}{#npc/a}* Politics.' ]
                  : [ '<32>{#p/monster}{#npc/a}* Politics?' ]
         ),
         t_rabbit: pager.create(
            'limit',
            () =>
               world.dead_skeleton
                  ? [
                       '<32>{#p/monster}{#npc/a}* That lady over there seems happy today.',
                       '<32>* Good for her.\n* I just feel sick...'
                    ]
                  : [ '<32>{#p/monster}{#npc/a}* That lady over there...', '<32>* Something about her feels odd.' ],
            () =>
               world.dead_skeleton
                  ? [ "<32>{#p/monster}{#npc/a}* Don't you feel the same way?" ]
                  : [ "<32>{#p/monster}{#npc/a}* I think I've figured it out.", '<32>* ...', '<32>* ...no, never mind.' ],
            () =>
               world.dead_skeleton
                  ? [ '<32>{#p/monster}{#npc/a}* ...' ]
                  : [ "<32>{#p/monster}{#npc/a}* I'll get it eventually..." ]
         ),
         t_smileguy: pager.create(
            'limit',
            [
               "<32>{#p/monster}{#npc/a}* We all know things haven't gone how we'd hoped, but we smile anyway.",
               '<32>* Why?',
               '<32>* This is our reality now, so why be morose about it?'
            ],
            [ '<32>{#p/monster}{#npc/a}* Smile smile.' ]
         ),
         t_wisconsin: pager.create(
            'limit',
            () =>
               world.dead_dog || world.dead_skeleton || world.population < 8
                  ? [
                       '<32>{#p/monster}{#npc/a}* It just feels like...',
                       '<32>* Like everything is getting worse, and worse...\n* And worse.'
                    ]
                  : [
                       '<32>{#p/monster}{#npc/a}* Everyone is always laughing and cracking jokes, trying to forget our modern crises...',
                       '<32>* Dreariness.\n* Crowding.\n* Lack of a homeworld.',
                       "<32>* I would join them, but I just don't feel like being funny."
                    ],
            () =>
               world.dead_dog || world.dead_skeleton
                  ? [ '<32>{#p/monster}{#npc/a}* ...' ]
                  : [ "<32>{#p/monster}{#npc/a}* At least I'm not making puns." ]
         ),
         t_zorren: pager.create(
            'limit',
            () =>
               world.dead_skeleton ||
               (world.dead_dog && save.data.n.state_starton_lesserdog === 2) ||
               save.data.n.bully_starton > 4
                  ? [
                       "<32>{#p/monster}{#npc/a}* (Oh, hey, it's me, Zorren.)",
                       '<32>* (You uh, got a problem with our, uh, police force, or...?)',
                       '<32>* (...)',
                       "<32>* (Yeah, you know, uh, I don't really like you all that much.)",
                       "<32>* (There's just, something off, particularly about you.)"
                    ]
                  : [
                       ...(save.data.b.oops
                          ? [
                               "<32>{#p/monster}{#npc/a}* (Oh, hey, it's me, Zorren.)",
                               '<32>* (You uh, got a problem with our, uh, police force, or...?)',
                               '<32>* (No?)\n* (Hey, thanks for uh, not doing that.)'
                            ]
                          : [
                               "<32>{#p/monster}{#npc/a}* (Oh, hey, it's me, Zorren.)",
                               "<32>* (Y'know, you seem like someone who likes to show respect.)",
                               '<32>* (So, thanks for, uh, doing that.)'
                            ]),
                       ...(save.data.b.s_state_capstation
                          ? []
                          : ((save.data.b.s_state_capstation = true),
                            [
                               '<32>* (In fact...)',
                               '<32>* (Here, kiddo.)\n* (Have a key, on us.)',
                               '<32>{#s/equip}{#p/human}{#npc}* (You got the key.)',
                               "<32>{#p/monster}{#npc/a}* (We've uh, got an armory somewhere, I think.)"
                            ])),
                       ...(save.data.b.oops
                          ? [
                               '<32>* (Psst...)\n* (Just between us, Kabakk and I built this station ourselves.)',
                               '<32>* (Pretty cool, huh?)'
                            ]
                          : [
                               '<32>* (Psst...)\n* (Just between us, Kabakk and I built this station ourselves.)',
                               '<32>* (Pretty cool, huh?)'
                            ])
                    ],
            () =>
               world.dead_skeleton ||
               (world.dead_dog && save.data.n.state_starton_lesserdog === 2) ||
               save.data.n.bully_starton > 4
                  ? [ '<32>{#p/monster}{#npc/a}* (Get outta here.)' ]
                  : save.data.b.oops
                  ? [ "<32>{#p/monster}{#npc/a}* (Yeah, we're not real police.)" ]
                  : [
                       '<32>{#p/monster}{#npc/a}* (We may not be real police, but people like you are worth protecting and serving.)'
                    ]
         )
      },
      objinter: {
         ctower0: [
            '<32>{#p/human}* (You inspect the terminal.)',
            '<32>{#p/narrator}* There are written instructions tacked onto the side...',
            '<33>* It\'s illegible chicken-scratch.\n* The only word you can make out is "zero."'
         ],
         ctower1: [ '<32>{#p/narrator}* The terminal is now in an unlocked state.' ],
         microwave0: [ '<32>{#p/human}* (You look behind the microwave...)', '<32>{#p/narrator}* Nothing useful here.' ],
         microwave1: [
            '<32>{#p/human}* (You look behind the microwave...)',
            "<32>{#p/narrator}* There's a switch here...",
            '<32>{#s/equip}{#p/human}* (You pulled the switch.)'
         ],
         microwave2: [
            '<32>{#p/human}* (You look behind the microwave...)',
            '<32>{#p/narrator}* Nothing new back here.'
         ],
         microwave3: [
            '<32>{#p/narrator}* A standard-issue CITADEL dielectric heater, circa 260X.',
            "<32>* It's a microwave.\n* Can't be over a decade old."
         ],
         microwave4: [ "<32>{#p/narrator}* I'd suggest looking behind it." ],
         papmail1: [
            '<32>{#p/narrator}* This mailbox is labelled "PAPYRUS."',
            choicer.create('* (Look inside the mailbox?)', 8, 7, 'Yes', 'No')
         ],
         papmail2: () => [
            '<32>{#p/human}* (You look inside...)',
            "<32>{#p/narrator}* It's empty.",
            ...(save.data.b.oops
               ? []
               : [
                    "<32>{#p/narrator}* Don't take this the wrong way.",
                    "<32>* Papyrus DOES get mail, he's just very good at collecting it when it comes."
                 ])
         ],
         papmail3: [ '<32>{#p/human}* (You decide not to look.)' ],
         puzzle3: [
            '<32>{#p/human}* (You inspect the terminal.)',
            '<32>{#p/narrator}* There is a log of previous modifications...',
            '<32>* "Pattern has been solved!"\n* "You may now exit."'
         ],
         puzzlechip: [ '<32>{#p/narrator}* The terminal is now in an unlocked state.' ],
         spagtable0: [ "<32>{#p/narrator}* It's an unused plate." ],
         spagtable1: [
            '<32>{#p/human}* (You gaze upon the mouth- watering spaghetti.)',
            "<32>{#p/narrator}* Sadly, it's just out of reach."
         ],
         spagtable2: [ '<32>{#p/human}* (You got the spaghetti.)' ],
         spagtable2b: [ "<32>{#p/human}* (You're carrying too much to take that.)" ],
         spagtable3: () =>
            world.genocide
               ? [ "<32>{#p/narrator}* It's an empty plate." ]
               : [ '<32>{#p/narrator}* Once the home of a truly out- of-this-world creation.' ],
         xtower1: [
            '<32>{#p/human}* (You inspect the terminal.)',
            "<32>{#p/narrator}* It's a game terminal...",
            '<32>{#p/narrator}* "Shoot targets as fast as you can! Use [Z] to shoot."'
         ]
      },
      papbooks1: pager.create(
         'limit',
         () => [
            '<32>{#p/narrator}* The bookshelf is filled with complex tomes about puzzle creation.',
            "<32>* And children's books.",
            ...(save.data.n.plot_date < 1 && save.data.n.state_starton_papyrus === 0
               ? [
                    '<18>{#p/papyrus}SOME OF MY FAVORITE BOOKS ARE ON THAT SHELF.',
                    '<18>{#f/4}LIKE "ADVANCED PUZZLE CONSTRUCTS FOR BRIGHT MINDS."',
                    '<18>{#f/0}AND ANOTHER FAVORITE OF MINE?',
                    '<18>{#f/4}"PEEK-A-BOO WITH FLUFFY BUNNY."',
                    '<18>{#f/8}THE ENDING ALWAYS GETS ME!'
                 ]
               : [])
         ],
         [ "<32>{#p/narrator}* Complex manuals and children's books." ]
      ),
      papbooks2: pager.create(
         'sequence',
         [
            '<32>{#p/human}* (You pick out a book...)',
            '<32>{#p/narrator}* "The cornerstone of a puzzle\'s interactive value is the player\'s affectation."',
            '<32>* "The tacit drive within every player to explore, progress, and complete a given task."',
            '<32>* "A puzzle that challenges and engages these motivations will ensure..."',
            '<32>* "The player remains focused and on task until the very end."',
            '<32>{#p/human}* (You put the book back on the shelf.)'
         ],
         [
            '<32>{#p/human}* (You pick out a book...)',
            '<32>{#p/narrator}* "\'Peek-A-Boo!\' said the human, appearing from the wall."',
            '<32>* "The fluffy bunny, surprised, looked at the human excitedly."',
            '<32>* "Then, the human moved away... no longer able to see them, the fluffy bunny was sad."',
            '<32>* "It shook, thinking about how lonely it\'d be."',
            '<32>* "It wanted to cry..."',
            '<32>* "But then, the human appeared once again, and all was right with the world."',
            '<32>{#p/human}* (You put the book back on the shelf.)'
         ],
         [
            '<32>{#p/human}* (You pick out a book...)',
            '<23>{#p/papyrusnt}"DEAR DAIRY, SANS HAS JUST BEEN MADE AN OFFICIAL ROYAL SENTRY."',
            '<23>"AT FIRST, I WAS CONFUSED AT HIM..."',
            '<23>"AFTER ALL, WHY WOULD SOMEBODY SO LAZY WANT TO TAKE THIS ON?"',
            '<23>"WELL, I DECIDED NOT TO QUESTION IT."',
            '<23>"THE TRUTH IS, I COULDN\'T BE MORE PROUD OF HIM!!!"',
            '<23>"ONLY TIME WILL TELL WHAT GREAT THINGS THIS BRINGS FORTH."',
            '<32>{#p/human}* (You put the book back on the shelf.)'
         ]
      ),
      papcomputer1: pager.create(
         'limit',
         () => [
            ...(save.data.n.plot_date < 1 && save.data.n.state_starton_papyrus === 0
               ? [
                    "<18>{#p/papyrus}THE INTERNET!\nI'M QUITE POPULAR THERE.",
                    "<18>{#f/4}I'M JUST A DOZEN AWAY...",
                    '<18>{#f/0}FROM A DOUBLE DIGIT FOLLOWER COUNT!'
                 ]
               : []),
            "<32>{#p/narrator}* The computer's internet browser is opened to a social media site.",
            choicer.create("* (Log in to Papyrus's account?)", 8, 7, 'Yes', 'No')
         ],
         [
            "<32>{#p/narrator}* The computer's internet browser is opened to a social media site.",
            choicer.create("* (Log in to Papyrus's account?)", 8, 7, 'Yes', 'No')
         ]
      ),
      papcomputer2: [ '<32>{#p/human}* (You decide not to log in.)' ],
      papcomputer3: {
         a: 'COOLSKELETON95',
         b: '-2 FOLLOWERS',
         c: 'THIS ACCOUNT\nIS OWNED BY\nTHE GREAT\nPAPYRUS.\nHIGH-QUALITY\nPOSTS ONLY!',
         d: '- NEWS -',
         e: "ASGORE TRIED\nA NEW PIE\nRECIPE TODAY.\n..\nHE ISN'T\nSATISFIED, AS\nUSUAL."
      },
      papcomputer4: [
         {
            a: 'HOWDY!',
            b: 'SHARE YOUR THOUGHTS...',
            c: ''
         },
         () =>
            save.data.n.plot < 34
               ? {
                    a: 'NAPSTABLOOK22',
                    b: 'TODAY',
                    c: 'this is why i never go\nonline anymore... nothing\nmeaningful ever happens'
                 }
               : world.genocide
               ? {
                    a: 'NAPSTABLOOK22',
                    b: 'TODAY',
                    c: "but i'm a ghost..."
                 }
               : world.dead_skeleton
               ? {
                    a: 'NAPSTABLOOK22',
                    b: 'TODAY',
                    c: "umm... i'll just keep\nworking on this mix..."
                 }
               : {
                    a: 'lazybones.',
                    b: 'TODAY',
                    c: "let's just hope he\ndoesn't capture our SOULs~\n*finger guns*"
                 },
         () =>
            save.data.n.plot < 34
               ? {
                    a: 'STRONGFISH91',
                    b: 'YESTERDAY',
                    c: 'uh... dont you say that\nEVERY day, Papyrus?'
                 }
               : world.genocide
               ? {
                    a: 'STRONGFISH91',
                    b: 'TODAY',
                    c: 'stay outta this blooky.\ni dont want you getting\nhurt too.'
                 }
               : world.dead_skeleton
               ? {
                    a: 'STRONGFISH91',
                    b: 'TODAY',
                    c: 'papyrus is gone blooky.\nthat human is going to\nPAY for what they did.'
                 }
               : {
                    a: 'STRONGFISH91',
                    b: 'TODAY',
                    c: 'well no...\nbut he did capture all of\nour hearts! fuhuhu!'
                 },
         () =>
            save.data.n.plot < 34
               ? {
                    a: 'COOLSKELETON95',
                    b: 'YESTERDAY',
                    c: "TODAY'S THE DAY I FINALLY\nCAPTURE A HUMAN!\nI CAN FEEL IT IN MY BONES!"
                 }
               : world.genocide
               ? {
                    a: 'NAPSTABLOOK22',
                    b: 'TODAY',
                    c: 'umm... is there anything\ni can do to help? things\nare getting worse...'
                 }
               : {
                    a: 'NAPSTABLOOK22',
                    b: 'TODAY',
                    c: 'so... did papyrus capture\na human yet? or...'
                 }
      ],
      papcomputer5: [ 'REFRESH', 'MESSAGES', 'SETTINGS', 'LOG OUT' ],
      papcouch0: [ '<32>{#p/narrator}* Nothing left.' ],
      papcouch1: pager.create(
         'limit',
         [
            '<32>{#p/human}* (You touch the couch.)\n* (You hear a jangling sound.)',
            '<32>{#p/narrator}* There are a bunch of loose coins inside...',
            choicer.create('* (Take the money?)', 8, 7, 'No', 'Yes')
         ],
         [ '<32>{#p/narrator}* The coins are still here.', choicer.create('* (Take the money?)', 8, 7, 'No', 'Yes') ]
      ),
      papcouch2: [ '<32>{#p/human}* (You decide not to take anything.)' ],
      papcouch3: [ '<32>{#p/human}* (You found 20 G.)' ],
      papcouch4: [
         "<32>{#p/narrator}* Did you just... pilfer Papyrus's couch??",
         '<32>{#p/narrator}* I mean, okay, I guess.'
      ],
      papdate0: () =>
         save.data.n.state_starton_papyrus === 1
            ? [ "<32>{#p/narrator}* It's locked." ]
            : [
                 save.data.b.flirt_papyrus
                    ? "<18>{#p/papyrus}{#f/5}WOWIE, YOU'RE SO EAGER TO DATE..."
                    : "<18>{#p/papyrus}{#f/5}WOWIE, YOU'RE SO EAGER TO HANG OUT WITH ME...",
                 "<18>{#f/5}THAT YOU'RE TRYING TO GO IN MY HOUSE AHEAD OF ME!!!",
                 "<18>{#f/6}THAT'S TRUE DEDICATION!!!"
              ],
      papdate1: () => [
         save.data.b.flirt_papyrus
            ? '<18>{#p/papyrus}SO YOU CAME BACK TO HAVE A DATE WITH ME!'
            : '<18>{#p/papyrus}SO YOU CAME BACK TO SEE ME!',
         ...(world.dead_dog || world.population < 8
            ? [
                 "<18>{#f/0}THAT'S GREAT!!",
                 "<18>{#f/5}TRUTH BETOLD, IT'S BEEN A LITTLE LONELY TODAY...",
                 '<18>{#f/5}A LOT OF PEOPLE ARE STRANGELY ABSENT...',
                 "<18>{#f/0}BUT YOU'RE STILL HERE!!",
                 '<18>{#f/0}THAT MEANS SOMETHING, RIGHT??'
              ]
            : [ '<18>{#f/4}YOU MUST BE REALLY SERIOUS ABOUT THIS...' ]),
         "<18>{#f/5}I'LL HAVE TO TAKE YOU SOMEPLACE REALLY SPECIAL...",
         '<18>{#f/0}A PLACE I LIKE TO SPEND A LOT OF TIME!!!',
         '<18>{#f/0}FOLLOW ME.'
      ],
      papdate2: [ '<18>{#p/papyrus}MY HOUSE!!!' ],
      papdate3: pager.create(
         'limit',
         [ '<18>{#p/papyrus}WELCOME TO SCENIC MY HOUSE!', '<18>ENJOY AND TAKE YOUR TIME!!!' ],
         [ "<18>{#p/papyrus}WHEN YOU'RE DONE, HEAD UPSTAIRS TO MY ROOM!" ]
      ),
      papdate3a: [ '<18>{#p/papyrus}{#f/6}WOW! BEING A GOOD HOST IS A REAL WORKOUT!' ],
      papdate3b: [
         "<18>{#p/papyrus}{#f/5}WOWIE, I CAN'T FEEL MY LEGS...",
         "<18>{#f/0}THAT MUST MEAN I'M BEING A GREAT HOST!!!"
      ],
      papdate4: () => [
         "<18>{#p/papyrus}THAT'S MY ROOM!",
         "<18>{#f/4}IF YOU'VE FINISHED LOOKING AROUND, WE COULD GO IN AND...",
         '<18>{#f/4}AND...',
         save.data.b.flirt_papyrus
            ? '<18>{#f/9}DO WHATEVER PEOPLE DO WHEN THEY DATE!'
            : '<18>{#f/9}"HANG OUT" LIKE A PAIR OF VERY COOL FRIENDS!',
         choicer.create('* (What do you say?)', 8, 7, 'Yes', 'No')
      ],
      papdate4a: [ "<18>{#p/papyrus}OKAY, LET'S GO!" ],
      papdate4b: [ "<18>{#p/papyrus}I'LL KEEP WAITING HERE THEN!" ],
      papdate5: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}{#f/5}SO, UM...',
            "<18>{#f/5}IF YOU'VE SEEN EVERYTHING...",
            save.data.b.flirt_papyrus
               ? '<18>{#f/6}DO YOU WANT TO START DATING?'
               : '<18>{#f/6}DO YOU WANT TO START HANGING OUT?',
            choicer.create('* (What do you say?)', 8, 7, 'Yes', 'No')
         ],
         [ '<18>{#p/papyrus}{#f/6}READY TO START?', choicer.create('* (What do you say?)', 8, 7, 'Yes', 'No') ]
      ),
      papdate5a: () => [
         save.data.b.flirt_papyrus
            ? '<18>{#p/papyrus}OKAY!!!\nDATING START!!!'
            : "<18>{#p/papyrus}OKAY!!!\nLET'S HANG TEN!!!"
      ],
      papdate5b: [ "<18>{#p/papyrus}TAKE YOUR TIME, I'LL WAIT FOR YOU." ],
      papdate6: () => [
         save.data.b.flirt_papyrus
            ? '<32>{#p/story}µµµµµµµµ DATING µµ START!'
            : '<32>{#p/story}µµµµµµµµ HANGOUT µ START!'
      ],
      papdate7: () => [
         '<15>{#p/papyrus}{#f/10}HERE WE ARE!!',
         save.data.b.flirt_papyrus ? '<15>{#f/20}ON OUR DATE!!' : '<15>{#f/20}HANGING OUT!!',
         "<15>{#f/24}I'VE ACTUALLY NEVER DONE THIS BEFORE.",
         "<15>{#f/10}BUT DON'T WORRY!!!",
         '<15>{#f/20}PREPERATION IS MY (UNOFFICIAL) LAST NAME!'
      ],
      papdate8: () => [
         '<15>{#f/20}WHAT DO I HAVE HERE, YOU ASK?',
         save.data.b.flirt_papyrus
            ? '<15>{#p/papyrus}{#f/10}AN OFFICIAL DATING GUIDE, STRAIGHT FROM THE LIBRARBY!'
            : '<15>{#p/papyrus}{#f/10}AN OFFICIAL HANGOUT GUIDE, STRAIGHT FROM THE LIBRARBY!',
         "<15>{#f/20}WITH THIS, WE'RE BOUND TO HAVE A GREAT TIME!"
      ],
      papdate9: () => [
         "<15>{#p/papyrus}{#f/25}LET'S SEE...",
         save.data.b.flirt_papyrus
            ? '<15>{#f/25}STEP ONE: PRESS C OR CTRL TO OPEN THE {@fill:#f00}DATING HUD{@fill:#000}.'
            : '<15>{#f/25}STEP ONE: PRESS C OR CTRL TO OPEN THE {@fill:#f00}FRIENDSHIP HUD{@fill:#000}.'
      ],
      papdate10: () => [
         '<15>{#p/papyrus}{#f/24}...WAIT.',
         '<15>{#f/22}YOU ALREADY DID THAT!?!?',
         save.data.b.flirt_papyrus
            ? '<15>{#f/11}WOWIE, YOU MUST REALLY LOVE ME!'
            : '<15>{#f/11}WOWIE, YOU MUST REALLY LIKE ME!',
         "<15>{#f/10}IT'S ONTO STEP TWO, THEN!"
      ],
      papdate11: [
         '<15>{#p/papyrus}{#f/24}...',
         "<15>{#f/24}EH, WE DIDN'T NEED IT ANYWAY.",
         '<15>{#f/20}ONTO STEP TWO!'
      ],
      papdate12: [
         '<15>{#p/papyrus}{#f/11}WOWIE, I FEEL SO INFORMED!',
         "<15>{#f/24}IN FACT, I THINK WE'RE READY FOR STEP TWO..."
      ],
      papdate13: () => [
         save.data.b.flirt_papyrus
            ? '<15>{#p/papyrus}{#f/25}STEP TWO: ASK THEM ON A DATE.'
            : '<15>{#p/papyrus}{#f/25}STEP TWO: ASK THEM TO HANG OUT.'
      ],
      papdate13a: () => [
         "<15>{#f/24}'AHEM.'",
         '<15>{#f/20}HUMAN!\nI, THE GREAT PAPYRUS...',
         save.data.b.flirt_papyrus
            ? '<15>{#f/10}WOULD LIKE TO GO ON A DATE WITH YOU!'
            : '<15>{#f/10}WOULD LIKE TO HANG OUT WITH YOU!'
      ],
      papdate14: [ choicer.create('* (What do you say?)', 9, 7, 'Yes', 'No') ],
      papdate15a: [ '<15>{#p/papyrus}{#f/12}R-REALLY???', '<15>{#f/11}WOWIE!!!' ],
      papdate15a1: [ "<15>{#f/24}I GUESS THAT MEANS IT'S TIME FOR STEP THREE..." ],
      papdate15b: [
         '<15>{#p/papyrus}{#f/21}OH...',
         '<15>{#f/27}F-FORTUNATELY, IT ONLY SAYS TO ASK.',
         "<15>{#f/24}WELL ANYWHO, IT'S TIME FOR STEP THREE..."
      ],
      papdate16: [ '<15>{#p/papyrus}{#f/25}STEP THREE: PUT ON NICE CLOTHES TO SHOW YOU CARE.' ],
      papdate16a: [ '<15>{#p/papyrus}{#f/24}...', '<15>{#f/24}WAIT A SECOND.' ],
      papdate17: () => [
         '<15>{#f/24}NICE CLOTHES...',
         (
            {
               spacesuit: "<15>{#f/26}THAT OLD SPACESUIT YOU'RE WEARING...",
               halo: '<15>{#f/26}THAT FANCY HALO ON YOUR HEAD...',
               eye: '<15>{#f/26}THAT FORCE FIELD AROUND YOU...',
               temyarmor: "<15>{#f/26}THAT ARMOR YOU'RE WEARING...",
               goggles: '<15>{#f/26}THOSE GOGGLES ON YOUR FACE...'
            } as Partial<CosmosKeyed<string>>
         )[save.data.s.armor] || '<15>{#f/26}THAT THING ON YOUR BODY...',
         "<15>{#f/20}YOU'RE WEARING CLOTHING RIGHT NOW!!!",
         '<15>{#f/24}AND NOT ONLY THAT...',
         '<15>{#f/20}EARLIER TODAY, YOU WERE ALSO WEARING CLOTHING!'
      ],
      papdate17a: () => [
         '<15>{#f/12}NO...!\nCOULD IT BE???',
         save.data.b.flirt_papyrus
            ? '<15>{#f/13}HAVE YOU WANTED TO DATE ME FROM THE VERY BEGINNING???'
            : '<15>{#f/13}HAVE YOU WANTED TO BEFRIEND ME FROM THE VERY BEGINNING???'
      ],
      papdate18a: () => [
         '<15>{#p/papyrus}{#f/22}NO!!',
         '<15>{#f/22}YOU PLANNED IT ALL!!!',
         ...(save.data.b.flirt_papyrus
            ? [ '<15>{#f/22}YOU MIGHT EVEN BE BETTER AT DATING THAN I AM!!!', '<15>N-NOOOO!!!\nYOUR DATING POWER...!!!' ]
            : [
                 '<15>{#f/22}YOU MIGHT EVEN BE BETTER AT HANGING OUT THAN I AM!!!',
                 '<15>N-NOOOO!!!\nYOUR FRIENDSHIP POWER!!!'
              ])
      ],
      papdate18b: () => [
         '<15>{#p/papyrus}{#f/24}OH...',
         '<15>{#f/21}BUT DESPITE THAT...',
         '<15>{#f/21}YOU STILL CHOSE TO WEAR CLOTHING TODAY OF ALL DAYS...?',
         "<15>{#f/24}IT'S ALMOST LIKE...",
         ...(save.data.b.flirt_papyrus
            ? [ '<15>{#f/13}LIKE YOUR INTEREST IN ME WAS PREDESTINED~', '<15>{#f/22}N-NOOOO!!!\nYOUR DATING POWER...!!!' ]
            : [ '<15>{#f/13}LIKE YOUR FRIENDSHIP WAS PREDESTINED~', '<15>{#f/22}N-NOOOO!!!\nYOUR DATING POWER...!!!' ])
      ],
      papdate19: [ '<15>{#p/papyrus}{#f/15}NYEH!', '<15>{#f/15}NYEH HEH HEH!!!' ],
      papdate20: () => [
         "<15>{#p/papyrus}{#f/15}DON'T THINK YOU'VE BESTED ME YET!",
         '<15>{#f/20}I, THE GREAT PAPYRUS...',
         save.data.b.flirt_papyrus
            ? '<15>{#f/20}HAVE NEVER BEEN BEATEN AT DATING...'
            : '<15>{#f/20}HAVE NEVER BEEN BEATEN AT HANGING OUT...',
         '<15>{#f/15}AND I NEVER WILL!!',
         '<15>{#f/10}I CAN EASILY KEEP UP WITH YOU!!!',
         '<15>{#f/24}IN FACT...',
         '<15>{#f/20}I ALWAYS WEAR MY "SPECIAL" CLOTHES...',
         '<15>{#f/20}UNDERNEATH MY REGULAR ONES!!',
         '<15>{#f/15}BEHOLD!!'
      ],
      papdate21: [ '<15>{#p/papyrus}{#f/15}WHAT DO YOU THINK OF MY SECRET STYLE?' ],
      papdate22: [ choicer.create('* (What do you say?)', 4, 3, 'I love it', 'I despise it') ],
      papdate23a: [ '<15>{#p/papyrus}{#f/13}NO!!!', '<15>{#f/13}A GENUINE COMPLIMENT...!' ],
      papdate23b: [ '<15>{#p/papyrus}{#f/13}NO!!!', '<15>{#f/13}A CRITICAL, YET HONEST REVIEW...!' ],
      papdate24: [
         '<15>{#p/papyrus}{#f/24}HOWEVER...',
         "<15>{#f/20}YOU DON'T TRULY UNDERSTAND THE {@fill:#f00}HIDDEN POWER{@fill:#000} OF THIS OUTFIT!",
         '<15>{#f/26}THEREFORE...'
      ],
      papdate24a: () => [
         '<15>{#f/15}WHAT YOU JUST SAID IS INVALID!!',
         save.data.b.flirt_papyrus
            ? "<15>{#f/15}THIS DATE WON'T ESCALATE ANY FURTHER!"
            : "<15>{#f/15}THIS HANGOUT WON'T ESCALATE ANY FURTHER!",
         '<15>{#f/24}UNLESS...',
         '<15>{#f/20}YOU CAN FIND MY {@fill:#f00}SECRET{@fill:#000}.',
         "<15>{#f/15}BUT THAT WON'T HAPPEN!!"
      ],
      papdate25: [
         '<15>{#p/papyrus}{#f/21}MY HAT...?',
         '<15>{#f/16}MY HAT.',
         '<15>{#f/10}MY HAT!',
         '<15>{#f/10}NYEH HEH HEH!'
      ],
      papdate25a: [
         '<15>{#p/papyrus}{#f/21}OVERWHELMED BY THE SIGHT OF MY COOL VIBES?',
         '<15>{#f/24}YEAH, I GET IT.',
         "<15>{#f/20}BUT YOU CAN'T BACK DOWN NOW!!!"
      ],
      papdate25b: [
         "<15>{#p/papyrus}{#f/26}THIS SHIRT DIDN'T ORIGINALLY SAY 'COOL...'",
         '<15>{#f/20}BUT I IMPROVED IT!',
         '<15>{#f/10}EXPERT TIP: ALL CLOTHING CAN BE IMPROVED THIS WAY.',
         '<15>{#f/24}NOW, WHILE THAT MAY BE GOOD ADVICE...',
         "<15>{#f/20}IT'S NOT A SECRET!\nTRY AGAIN!"
      ],
      papdate25c: [
         '<15>{#p/papyrus}{#f/24}I SEE.\nI SEE.',
         '<15>{#f/24}YOU LIKE CARESSING MY BICEPS WITH A FLOATING HEART.',
         "<15>{#f/20}BUT WHO DOESN'T!?\nTRY AGAIN!"
      ],
      papdate25d: [
         "<15>{#p/papyrus}{#f/13}HOLDING MY HAND SO I'LL TELL YOU THE ANSWER...?",
         '<15>{#f/14}N-NO, I MUST RESIST!!',
         '<15>{#f/20}TRY AGAIN!'
      ],
      papdate25e: [
         "<15>{#p/papyrus}{#f/26}THERE'S NO SECRET TO MY LEGS.",
         '<15>{#f/10}ONLY HARD WORK AND PERSERVERANCE!',
         '<15>{#f/20}TRY AGAIN!'
      ],
      papdate25f: [
         '<15>{#p/papyrus}{#f/24}THIS "DRIP" MAY BE UNDEFEATABLE...',
         '<15>{#f/20}BUT EXPECTING A SECRET HERE IS TOTALLY UNREASONABLE!',
         '<15>{#f/20}TRY AGAIN!'
      ],
      papdate25g: [
         '<15>{#p/papyrus}{#f/24}AH YES, MY TOP-OF-THE-LINE SPORTSWEAR!',
         "<15>{#f/24}YOU WON'T FIND ANY SECRETS HERE, THOUGH, BECAUSE...",
         "<15>{#f/20}I DON'T HAVE ANY POCKETS TO HIDE THEM IN!!!",
         '<15>{#f/20}TRY AGAIN!'
      ],
      papdate25h: () => [
         '<15>{#p/papyrus}{#f/24}MY SHOULDERS...',
         '<15>{#f/10}ARE YOU ASKING FOR A PIGGYBACK RIDE??',
         save.data.b.flirt_papyrus
            ? "<15>{#f/24}WELL, I'D GIVE IT TO YOU IF WE WEREN'T SO BUSY DATING."
            : "<15>{#f/24}WELL, I'D GIVE IT TO YOU IF WE WEREN'T SO BUSY HANGING OUT.",
         '<15>{#f/20}BUT WE ARE!\nSO TRY AGAIN!'
      ],
      papdate25i: [
         '<15>{#p/papyrus}{#f/14}SERIOUSLY??',
         "<15>{#f/19}I'M NOT JUST GOING TO -TELL- YOU THE SECRET...",
         "<15>{#f/20}YOU'LL HAVE TO TRY A LITTLE HARDER THAN THAT!"
      ],
      papdate25j: () =>
         calcLV() > 2
            ? [
                 '<15>{#p/papyrus}{#f/24}IF YOUR {@fill:#f00}LV{@fill:#000} IS THIS HIGH, THEN...',
                 save.data.b.flirt_papyrus
                    ? '<15>{#f/28}YOUR {@fill:#f00}LOVE{@fill:#000} FOR ME MUST BE EVEN GREATER THAN I THOUGHT!'
                    : "<15>{#f/28}YOU'VE GOT MORE EXPERIENCE WITH {@fill:#f00}LOVE{@fill:#000} THAN I THOUGHT!",
                 "<15>{#f/24}STILL, THAT'S YOUR SECRET, NOT MINE.",
                 '<15>{#f/20}TRY AGAIN!'
              ]
            : calcLV() === 2
            ? [
                 '<15>{#p/papyrus}{#f/24}AN {@fill:#f00}LV{@fill:#000} OF TWO?',
                 '<15>{#f/27}DOES THAT MEAN...',
                 ...(save.data.b.flirt_papyrus
                    ? [
                         '<15>{#f/28}YOU HAVE A SECRET SECOND {@fill:#f00}LOVE{@fill:#000} INTEREST...?',
                         '<15>{#f/20}WELL, THIS IS SUPPOSED TO BE ABOUT MY SECRET!!'
                      ]
                    : [
                         '<15>{#f/28}YOUR INTEREST IN ME IS SECRETLY TWO-FOLD?',
                         '<15>{#f/28}THAT DEEP DOWN, YOU {@fill:#f00}LOVE{@fill:#000} ME AS MUCH AS YOU LIKE ME?',
                         '<15>{#f/14}N-NO...!\nI WILL NOT SUCCUMB TO YOUR TRICKS!'
                      ]),
                 '<15>{#f/20}TRY AGAIN!'
              ]
            : save.data.b.oops
            ? [
                 '<15>{#p/papyrus}{#f/24}AN {@fill:#f00}LV{@fill:#000} OF ONE?',
                 '<15>{#f/26}DOES THAT MEAN...',
                 "<15>{#f/28}THAT I'M YOUR ONE TRUE {@fill:#f00}LOVE{@fill:#000}...?",
                 ...(save.data.b.flirt_papyrus
                    ? [ '<15>{#f/14}N-NO...!\nI WILL NOT SUCCUMB TO YOUR TRICKS!' ]
                    : [
                         "<15>{#f/24}WELL, THAT WOULDN'T MAKE SENSE IF WE'RE JUST FRIENDS.",
                         '<15>{#f/14}B-BUT... NO!\nI WILL NOT SUCCUMB TO YOUR TRICKS!'
                      ]),
                 '<15>{#f/20}TRY AGAIN!'
              ]
            : [
                 '<15>{#p/papyrus}{#f/24}AN {@fill:#f00}LV{@fill:#000} OF ZERO?',
                 "<15>{#f/26}OKAY, THAT'S WEIRD.",
                 "<15>{#f/21}SANS TOLD ME A HUMAN'S {@fill:#f00}LOVE{@fill:#000} STARTS AT ONE.",
                 '<15>{#f/24}HMM...',
                 '<15>{#f/24}IS THIS YOUR SECRET?',
                 '<15>{#f/20}WELL, THIS IS SUPPOSED TO BE ABOUT MY SECRET!',
                 '<15>{#f/20}TRY AGAIN!'
              ],
      papdate25k: [
         '<15>{#p/papyrus}{#f/24}YOUR HP MAY BE FULL, BUT WHEN IT COMES TO SECRETS...',
         "<15>{#f/20}YOU'RE STILL RUNNING ON EMPTY!",
         '<15>{#f/20}TRY AGAIN!'
      ],
      papdate26: () => [
         '<15>{#p/papyrus}{#f/27}W-WELL THEN...',
         '<15>{#f/27}YOU FOUND MY SECRET!',
         '<15>{#f/24}I SUPPOSE I HAVE NO CHOICE BUT TO ADMIT THE TRUTH.',
         "<15>{#f/24}IT'S A PRESENT...",
         [ '<15>{#f/27}A PRESENT J-JUST FOR YOU!!!', '<15>{#f/27}A PRESENT FOR US TO SHARE!!!' ][
            (save.data.n.state_papyrus_spaghet + 1) % 2
         ],
         '<15>{#f/10}GO AHEAD!\nOPEN IT!'
      ],
      papdate27: [ choicer.create('* (What will you do?)', 10, 4, 'Open it', 'Do not') ],
      papdate28: [
         "<15>{#p/papyrus}{#f/21}YOU WON'T EVEN HARM MY DELICATE WRAPPING??",
         '<15>{#f/27}N-NO... THAT TECHNIQUE...',
         "<15>{#f/13}IT'S TOO MUCH!",
         '<15>{#f/14}B-BUT... AHA!\nCOUNTERATTACK!',
         "<15>{#f/15}I'LL OPEN THE PRESENT MYSELF!!"
      ],
      papdate29: [ '<15>{#p/papyrus}{#f/20}DO YOU KNOW WHAT -THIS- IS?' ],
      papdate30: [ choicer.create('* (Do you know what it is?)', 8, 7, 'Yes', 'No') ],
      papdate31a: [
         '<15>{#p/papyrus}{#f/26}SPAGHETTI.',
         "<15>{#f/24}THAT'S PROBABLY WHAT YOU'RE THINKING, ISN'T IT?",
         '<15>{#f/20}RIGHT!',
         '<15>{#f/15}BUT OH-SO-WRONG!'
      ],
      papdate31b: [
         "<15>{#p/papyrus}{#f/20}NYEH HEH HEH!\nTHAT'S RIGHT.",
         '<15>{#p/papyrus}{#f/15}YOU HAVE NO IDEA!',
         '<15>{#f/24}THOUGH THIS APPEARS TO BE SPAGHETTI...'
      ],
      papdate32: () => [
         "<15>{#p/papyrus}{#f/20}THIS AIN'T ANY PLAIN OL' PASTA!",
         "<15>{#f/20}THIS IS AN ARTISAN'S WORK!",
         '<15>{#f/24}SILKEN SPAGHETTI, FINELY AGED IN AN OAKEN CASK.',
         '<15>{#f/20}THEN PREPARED BY ME, MASTER CHEF PAPYRUS!',
         "<15>{#f/15}HUMAN!!!\nIT'S TIME TO END THIS!!",
         "<15>THERE'S NO WAY THIS CAN GO ANY FURTHER!",
         ...[ [ "<15>{#f/20}LET'S EAT THIS SPAGHETTI TOGETHER!!!" ], [ '<15>{#f/20}FEAST UPON MY ULTIMATE TECHNIQUE!!!' ] ][
            (save.data.n.state_papyrus_spaghet + 1) % 2
         ]
      ],
      papdate33: [ choicer.create('* (What will you do?)', 10, 4, 'Eat it', 'Do not') ],
      papdate33a: () => [
         '<32>{#p/human}* (You take a small bite.)',
         ...(save.data.n.state_papyrus_spaghet === 1
            ? [ '<32>{#p/narrator}* Papyrus takes his bite at the same time as yours.' ]
            : []),
         '<32>{#p/human}* (Your face reflexively scrunches up.)',
         '<32>{#p/narrator}* The taste is indescribable...!',
         ...(save.data.n.state_papyrus_spaghet === 1
            ? [ '<32>{#p/narrator}* Papyrus seems to have enjoyed his bite just as much.' ]
            : [])
      ],
      papdate34a: () => [
         '<15>{#p/papyrus}{#f/10}WHAT A PASSIONATE EXPRESSION!!!',
         save.data.b.flirt_papyrus
            ? '<15>{#f/12}YOU MUST REALLY LOVE MY COOKING!'
            : '<15>{#f/12}YOU MUST REALLY LIKE MY COOKING!',
         ...[
            [
               '<15>{#f/24}WELL, I DID TOO...',
               save.data.b.flirt_papyrus
                  ? '<15>{#f/20}BUT I THINK YOU LOVED IT EVEN MORE THAN ME!!!'
                  : '<15>{#f/20}BUT I THINK YOU LIKED IT EVEN MORE THAN ME!!!'
            ],
            [ '<15>{#f/10}AND BY EXTENSION, ME!', '<15>{#f/20}MAYBE EVEN MORE THAN I DO!!!' ]
         ][(save.data.n.state_papyrus_spaghet + 1) % 2],
         "<15>{#f/27}BUT... THAT'S IMPOSSIBLE...!",
         '<15>{#f/12}HOW DID YOU DO THAT!?!?'
      ],
      papdate34b: () => [
         '<15>{#p/papyrus}{#f/21}YOU MEAN...',
         "<15>{#f/18}YOU'RE LETTING ME HAVE IT INSTEAD?",
         ...[
            [
               '<15>{#f/24}I THOUGHT WHEN YOU SAID YOU WERE SHARING...',
               '<15>{#f/20}YOU WOULD AT LEAST WANT A LITTLE FOR YOURSELF.',
               '<15>{#f/27}BUT NO, ALL THIS TIME...',
               '<15>{#f/12}YOU WANTED ME, -ME-, TO HAVE IT ALL!!!'
            ],
            [
               '<15>{#f/21}EVEN AFTER WHAT YOU SAID BEFORE...',
               '<15>{#f/21}ABOUT WANTING MY SPAGHETTI FOR YOURSELF...',
               '<15>{#f/27}AT THE VERY PRECIPICE OF YOUR SATISFACTION, YOU...',
               '<15>{#f/12}YOU GAVE IT ALL UP FOR ME???'
            ]
         ][(save.data.n.state_papyrus_spaghet + 1) % 2]
      ],
      papdate35: [ '<15>{*}{#p/papyrus}{#f/22}AUGH!!!{%15}' ],
      papdate36: [ '<15>{*}{#p/papyrus}{#f/22}URRRGH!!!{%15}' ],
      papdate37: [ '<15>{*}{#p/papyrus}{#f/22}NOOOOOOOO!!!{%15}' ],
      papdate38: () => [
         "<18>{#p/papyrus}{@random:1.1,1.1}HUMAN.\nIT'S CLEAR NOW.",
         save.data.b.flirt_papyrus
            ? "<18>{@random:1.1,1.1}YOU'RE MADLY IN LOVE WITH ME."
            : "<18>{@random:1.1,1.1}YOU'RE COMPLETELY OBSESSED WITH ME.",
         '<99>{@random:1.1,1.1}EVERYTHING YOU DO.\nEVERYTHING YOU SAY.',
         "<18>{@random:1.1,1.1}IT'S ALL BEEN FOR MY SAKE.",
         '<18>{@random:1.1,1.1}HUMAN.\nI WANT YOU TO BE HAPPY, TOO.',
         "<18>{@random:1.1,1.1}IT'S TIME FOR ME TO EXPRESS MY FEELINGS...",
         "<18>{@random:1.1,1.1}IT'S TIME I TOLD YOU THE TRUTH."
      ],
      papdate39: () =>
         save.data.b.flirt_papyrus
            ? [
                 '<15>{#f/21}HUMAN, THE TRUTH IS...',
                 "<15>{#f/21}I JUST DON'T LIKE YOU THE WAY YOU LIKE ME.",
                 '<15>{#f/24}ROMANTICALLY, I MEAN.',
                 '<15>{#f/27}I MEAN, I TRIED VERY HARD TO!',
                 '<15>{#f/27}I THOUGHT THAT BECAUSE YOU HAD FLIRTED WITH ME...',
                 '<15>{#f/27}THAT I WAS SUPPOSED TO GO ON A DATE WITH YOU.',
                 '<15>{#f/10}THEN, ON OUR DATE, FEELINGS WOULD BLOSSOM FORTH!!!',
                 '<15>{#f/20}I WOULD BE ABLE TO MATCH YOUR PASSION FOR ME!',
                 '<15>{#f/21}BUT ALAS...\nI, THE GREAT PAPYRUS...',
                 '<15>{#f/21}HAVE FAILED.',
                 '<15>{#f/21}I FEEL JUST THE SAME AS BEFORE.',
                 '<15>{#f/27}AND THE WORST PART IS, BY DATING YOU...',
                 '<15>{#f/22}I HAVE ONLY DRAWN YOU DEEPER INTO YOUR LOVE!',
                 '<15>{#f/21}A DARK PRISON OF PASSION FROM WHICH THERE IS NO ESCAPE.',
                 '<15>{#f/27}HOW COULD I HAVE DONE THIS TO MY DEAR FRIEND...?',
                 '<15>{#f/27}...',
                 '<15>{#f/27}...NO...'
              ]
            : [ '<15>{#f/24}HUMAN, THE TRUTH IS...' ],
      papdate39a: () => [
         ...(save.data.b.flirt_papyrus
            ? [
                 "<15>{#f/20}NO!\nTHAT'S WRONG!",
                 "<15>{#f/17}I CAN'T FAIL AT ANYTHING!!!",
                 "<15>{#f/20}HUMAN!!!\nI'LL HELP YOU THROUGH THESE TRYING TIMES!!!",
                 "<15>{#f/24}I'LL KEEP BEING YOUR COOL FRIEND...",
                 '<15>{#f/20}AND WE CAN FORGET THIS EVER HAPPENED.',
                 '<15>{#f/10}AFTER ALL, YOU, TOO, ARE VERY GREAT.',
                 '<15>{#f/20}IT WOULD BE TRAGIC TO LOSE YOUR FRIENDSHIP!',
                 '<15>{#f/21}SO, PLEASE....',
                 "<15>{#f/21}DON'T CRY BECAUSE I CAN'T KISS YOU.",
                 "<15>{#f/19}BESIDES, I DON'T EVEN HAVE LIPS!!!",
                 ...(save.data.n.plot < 48
                    ? [
                         "<15>{#f/10}AND HEY, SOMEDAY, YOU'LL FIND SOMEONE JUST AS GREAT.",
                         "<15>{#f/24}WELL, NO.\nTHAT'S NOT TRUE.",
                         "<15>{#f/20}BUT I'LL HELP YOU SETTLE FOR SECOND BEST!!!"
                      ]
                    : [ "<15>{#f/10}AND HEY, UNDYNE'S NOT TOO FAR FROM HERE.", '<15>{#f/20}WE CAN HANG OUT WITH HER!' ])
              ]
            : [
                 '<15>{#f/10}I LIKE YOU TOO!',
                 '<15>{#f/10}YOU ARE A VERY NICE PERSON, AFTER ALL.',
                 '<15>{#f/21}BUT, MAYBE...',
                 "<15>{#f/21}YOU'D BE BETTER OFF IF YOU LIVED MORE FOR YOUR OWN SAKE.",
                 '<15>{#f/21}RATHER THAN JUST FOR MINE.',
                 '<15>{#f/10}FORTUNATELY, I KNOW THE SOLUTION!!!',
                 '<15>{#f/20}A HANGOUT WITH MY BOSS, UNDYNE!!!',
                 '<15>{#f/24}I THINK IF YOU SPREAD OUT YOUR FRIEND ENERGY A BIT MORE...',
                 "<15>{#f/10}YOU'D LEAD A MUCH HEALTHIER LIFESTYLE.",
                 ...(save.data.n.plot < 48
                    ? [ "<15>{#f/20}I'LL LET YOU KNOW WHEN I'M READY!" ]
                    : [ "<15>{#f/20}SO LET'S DO IT!\nTOGETHER!!" ])
              ]),
         '<15>{#f/20}NYEH HEH HEH HEH HEH!!!'
      ],
      papdate40: () => [
         '<15>{#f/24}OH, AND IF YOU EVER NEED TO REACH ME...',
         "<15>{#f/10}HERE'S MY {@fill:#f00}PHONE NUMBER{@fill:#000}.",
         '<15>{#f/11}FEEL FREE TO CALL ME AT ANY TIME!',
         ...(save.data.b.flirt_papyrus
            ? [
                 '<15>{#f/24}PLATONICALLY, OF COURSE.',
                 ...(save.data.n.plot < 48
                    ? [ '<15>{#f/10}WELL, GOTTA GO!' ]
                    : [ "<15>{#f/10}WELL, SEE YOU AT UNDYNE'S HOUSE!" ])
              ]
            : save.data.n.plot < 48
            ? [ '<15>{#f/20}WELL, GOTTA GO!' ]
            : [ "<15>{#f/20}WELL, SEE YOU AT UNDYNE'S HOUSE!" ]),
         '<15>{#f/20}NYEH HEH HEH!'
      ],
      papdate41: {
         a: () => (save.data.b.flirt_papyrus ? 'ROMANCE' : 'FRIENDSHIP'),
         b: 'POWER\nLEVELS',
         c: 'K-TIME 61XXX.X',
         d: 'SPEED',
         e: 'GALAXY\nMAP',
         f: 'TENSION'
      },
      pappuzzle1: [
         '<18>{#p/papyrus}{#f/9}HUMAN!',
         '<18>{#f/0}THIS NEXT PUZZLE IS ONE OF MY FAVORITES.',
         '<18>{#f/0}I SURE DO HOPE YOU ENJOY IT!',
         '<18>{#f/4}BECAUSE, YOU NOT ENJOYING THIS PUZZLE...',
         '<18>{#f/4}WOULD BE LIKE SERVING YOU ROTTEN SPAGHETTI.',
         '<18>{#f/7}THE GREAT PAPYRUS NEVER SERVES ROTTEN SPAGHETTI!!',
         '<18>{#f/4}...\nWAIT.',
         '<18>{#f/6}ARE WE TALKING ABOUT PASTA, OR PUZZLES???',
         '<18>{#f/0}WELL ANYWHO...',
         "<18>I'LL TRY NOT TO GIVE AWAY THE ANSWER!!!"
      ],
      pappuzzle2: [ '<18>{#p/papyrus}WOW!\nYOU SOLVED IT!!' ],
      pappuzzle2a: [ '<18>AND YOU DID IT ALL WITHOUT MY HELP!?' ],
      pappuzzle2b: [ "<18>MY ADVICE HELPED!\nIT REALLY DID, DIDN'T IT!?" ],
      pappuzzle2c: [
         "<18>INCREDIBLE!\nI'M IMPRESSED!!",
         '<18>YOU MUST CARE ABOUT PUZZLES LIKE I DO!',
         "<18>WELL, I'M SURE YOU'LL LOVE THE NEXT PUZZLE THEN!",
         '<18>IT MIGHT EVEN BE TOO EASY FOR YOU!!',
         '<18>NYEH!\nHEH HEH!\nHEHEHEH!!!'
      ],
      papsink0: [ "<32>{#p/narrator}* The sink is so tall, you can't even wash your hands..." ],
      papsink1: [
         '<18>{#p/papyrus}{#f/9}IMPRESSED?\nI INCREASED THE HEIGHT OF MY SINK.',
         '<18>{#f/0}NOW I CAN FIT MORE BONES UNDER IT!\nTAKE A LOOKSY!'
      ],
      papsink2: [ '<18>{#p/papyrus}{#f/8}NOO, THE DOG!' ],
      papsink3: [ '<18>{#p/papyrus}{#f/31}OH, YOU POOR, POOR PUPPY...', '<18>{#f/9}HERE, HAVE MY SPECIAL ATTACK!' ],
      papsink4: [ '<18>{#p/papyrus}WOW!!!\nIT LOVES IT!!!' ],
      papsink5: [ '<18>{#p/papyrus}{#f/7}SANS!', '<18>STOP PLAGUING MY LIFE WITH INCIDENTAL MUSIC!!' ],
      papsink6: [ '<18>{#p/papyrus}{#f/4}AND NOW THE DOG HAS DISAPPEARED WITH MY ATTACK.', '<18>OH WELL...' ],
      papsolution0: [
         '<18>{#p/papyrus}LATELY, MY BROTHER STARTED A COTTON BALL COLLECTION.',
         '<18>{#f/4}HOW SADDENING...',
         '<18>{#f/0}SOMETIMES I WONDER WHAT HE WOULD DO...',
         '<18>{#f/9}WITHOUT SUCH A COOL GUY TAKING CARE OF HIM???',
         '<18>NYEH HEH HEH!'
      ],
      papsolution1: [
         '<18>{#p/papyrus}{#f/6}STILL???',
         '<18>{#f/0}I MEAN, I COULD TOTALLY GIVE YOU THE SOLUTION.',
         "<18>{#f/4}I DON'T WANT TO SPOIL THE FUN, THOUGH..."
      ],
      papsolution1a: [
         '<18>{#p/papyrus}{#f/9}DO YOU ABSOLUTELY, DAPSOLUTELY WANT THE SOLUTION???',
         choicer.create('* (What do you say?)', 8, 7, 'No', 'Yes')
      ],
      papsolution2a: [
         '<18>{#p/papyrus}THE!\nSOLUTION!\nIS!',
         '<18>{#f/4}PLEASE IMAGINE A DRUMROLL IN YOUR HEAD...',
         '<18>{#f/0}...THAT LAMP TO YOUR RIGHT HAS A SWITCH ON IT!',
         '<18>CHECK IT OUTIE!!!'
      ],
      papsolution2b: [
         "<18>{#p/papyrus}WOW... YOU'RE TRULY A PUZZLE PASSIONEER!",
         "<18>I'M SO ENTHUSED BY YOUR ENTHUSIASM!",
         '<18>YOU CAN DO IT, HUMAN!!!'
      ],
      papsolution2c: [
         "<18>{#p/papyrus}{#f/4}DON'T YOU REMEMBER THE SOLUTION I GAVE YOU...?",
         '<18>{#f/0}CHECK THE LAMP TO YOUR RIGHT!'
      ],
      papsolution999: [
         '<18>{#p/papyrus}YOU LOOK LIKE YOU NEED A HINT.',
         '<18>{#f/4}HMM...',
         "<18>{#f/0}WELL, I'D PAY ATTENTION TO THE CIRCUITS.",
         "<18>{#f/0}BUT THAT'S JUST ME."
      ],
      papsolution999a: [
         '<18>{#p/papyrus}{#f/5}STILL CONFUSED?',
         '<18>{#f/5}UM... MAYBE...',
         '<18>{#f/6}USE THE CIRCUITS AS A GUIDE TO THE SEQUENCE???',
         "<18>{#f/5}I'M TRYING VERY HARD NOT TO SPOIL THINGS HERE..."
      ],
      papspaghet1: [
         '<18>{#p/papyrus}{#f/1}WHAT!?\nHOW DID YOU AVOID MY TRAP?',
         '<18>{#f/4}AND, MORE IMPORTANTLY...',
         '<18>{#f/0}IS THERE ANY LEFT FOR ME???',
         choicer.create('* (What do you tell Papyrus\n  about his spaghetti?)', 8, 7, 'Left it', 'Ate it'),
         '<18>{#p/papyrus}REALLY!?'
      ],
      papspaghet1a: [
         '<18>{#p/papyrus}WHAT!?\nHOW DID YOU AVOID MY TRAP?',
         '<18>{#f/4}AND, MORE IMPORTANTLY...',
         '<18>{#f/0}IS THERE ANY...',
         '<18>{#f/4}...WAIT.',
         "<18>{#f/0}IT'S RIGHT THERE IN YOUR ITEMS!!",
         '<18>{#f/9}WHAT WERE YOU PLANNING, HUMAN?',
         choicer.create("* (What will you do with\n  Papyrus' spaghetti?)", 7, 7, 'Share it', 'Eat it'),
         '<18>{#p/papyrus}REALLY!?'
      ],
      papspaghet2a: [
         "<18>{#f/5}YOU'D RESIST THE FLAVOR OF MY HOME- COOKED PASTA...",
         '<18>{#f/6}JUST SO YOU COULD SHARE IT WITH ME???',
         '<18>{#f/9}WELL THEN!!',
         '<18>FRET NOT HUMAN!\nFOR I, MASTER CHEF PAPYRUS...',
         '<18>WILL MAKE US ALL THE PASTA WE COULD EVER WANT!',
         '<18>{#f/0}HEH HEH HEH HEH HEH HEH NYEH!'
      ],
      papspaghet2b: [
         '<18>{#f/5}WOWIE...',
         '<19>{#f/6}FEW HAVE EVER ENJOYED MY COOKING LIKE THAT BEFORE...',
         '<18>{#f/9}WELL THEN!!',
         '<18>FRET NOT HUMAN!\nFOR I, MASTER CHEF PAPYRUS...',
         '<18>WILL MAKE YOU ALL THE PASTA YOU COULD EVER WANT!',
         '<18>{#f/0}HEH HEH HEH HEH HEH HEH NYEH!'
      ],
      paptv: pager.create(
         'limit',
         () => [
            ...(save.data.n.plot_date < 0.2 && save.data.n.state_starton_papyrus === 0
               ? [ "<18>{#p/papyrus}OOH, IT'S MY FAVORITE GAME-SHOW!" ]
               : []),
            save.data.b.papyrus_secret
               ? '<32>{#p/mettaton}* "STAY TUNED FOR THE BEATDOWN OF A LIFETIME!"'
               : '<33>{#p/mettaton}* "STAY TUNED FOR A NEW PROGRAM!"',
            ...(save.data.n.plot_date < 0.2 && save.data.n.state_starton_papyrus === 0
               ? [
                    "<18>{#p/papyrus}{#f/7}WHAT!!!\nIT'S USUALLY BETTER THAN THIS!",
                    '<18>{#f/4}THIS IS JUST A BAD EPISODE.',
                    "<18>{#f/7}DON'T JUDGE ME!!!"
                 ]
               : [])
         ],
         () => [
            save.data.b.papyrus_secret
               ? '<32>{#p/mettaton}* "STAY TUNED FOR THE BEATDOWN OF A LIFETIME!"'
               : '<33>{#p/mettaton}* "STAY TUNED FOR A NEW PROGRAM!"'
         ]
      ),
      papyrus1: [ '<18>{#p/papyrus}SO, AS I WAS SAYING ABOUT UNDYNE...' ],
      papyrus2: [
         '<18>{#p/papyrus}SANS!!\nOH MY GOD!!\nIS THAT...',
         '<18>A HUMAN!?!?',
         "<25>{#p/sans}{#f/2}* nah, it's just a human shaped hologram."
      ],
      papyrus3: [
         '<18>{#p/papyrus}{#f/4}OH.',
         '<18>{#f/4}...',
         '<18>{#f/4}WAIT...',
         "<18>{#f/7}YOU'RE LYING!!",
         '<25>{*}{#p/sans}{#f/2}* sorry, meant to say "hologram-shaped hu- {%}',
         '<18>{#p/papyrus}{#f/0}SANS!\nWE FINALLY DID IT!',
         '<18>{#f/0}UNDYNE HAS TO LET ME INTO THE ROYAL GUARD NOW!',
         '<18>{#f/6}WE JUST HAVE TO...',
         '<18>{#f/6}...',
         "<18>{#f/4}I'M FORGETTING SOMETHING.",
         '<25>{#p/sans}{#f/2}* the speech, remember?',
         "<18>{#p/papyrus}{#f/4}OH, RIGHT.\n...'AHEM.'",
         "<18>{#f/9}HUMAN! YOU MAY THINK YOU'RE SAFE OUT HERE...",
         '<18>{#f/9}BUT I, THE GREAT PAPYRUS, INTEND TO CHANGE THAT!',
         "<18>{#f/4}FIRST, I'LL DAZZLE YOU WITH DR. ALPHYS' PUZZLES...",
         '<18>{#f/4}AND THEN, WHEN YOU LEAST EXPECT IT...',
         '<19>{#f/9}WHAM!\nCAPTURED!\nOFF TO THE CITADEL!',
         '<18>{#f/9}OUR BATTLE WILL BE AS LEGENDARY AS THEY COME!',
         '<18>{#f/4}IN ANY CASE...',
         '<18>{#f/9}CONTINUE... ONLY IF YOU DARE!!!'
      ],
      papyrus4: [ '<18>{#f/0}NYEH HEH HEH HEH HEH HEH HEH HEH!!!' ],
      papyrus5: [
         '<25>{#p/sans}* well, that went well.',
         "<25>* don't sweat it, kid.",
         "<25>{#f/2}* i'll keep an eyesocket out for ya."
      ],
      papyrus6: [
         '<18>{#p/papyrus}{#f/9}HUMAN!!',
         '<18>{#f/4}YOU MAY HAVE PASSED MY OTHER CHALLENGES.',
         "<18>{#f/9}BUT NOW YOU WILL SURELY MEET YOUR WIT'S END!",
         '<18>FOR YOU SEE, THIS PUZZLE WAS MADE BY NONE OTHER...',
         '<18>{#f/0}THAN THE AMAZING DR. ALPHYS!',
         '<18>THE RULES ARE QUITE SIMPLE, REALLY.',
         '<18>THIS DISPLAY WILL READ OUT A NUMBER AT RANDOM.',
         '<18>{#f/9}...THE NUMBER OF SECONDS UNTIL YOU CAN PASS!',
         '<18>{#f/0}IF THE NUMBER IS ODD, YOU MUST DODGE PROJECTILES.',
         '<18>NUMBERS ENDING IN 1 GIVE YOU STAR- SHAPED ONES...',
         '<18>NUMBERS ENDING IN 3 GIVE YOU MOON- SHAPED ONES...',
         '<18>{#f/4}5 GIVES YOU COMETS, 7 GIVES YOU QUASARS...',
         "<18>{#f/9}AND IF IT ENDS IN A 9, IT'S ENTIRELY RANDOM!",
         '<18>{#f/0}IF THE NUMBER IS PRIME, THE GRAVITY WILL FLIP.',
         "<18>{#f/4}(ALTHOUGH, PRIMES BELOW TEN DON'T OFTEN TRIGGER IT.)",
         '<18>{#f/0}IF THE NUMBER IS EVEN, YOU WILL BE FINE AT FIRST...',
         '<18>{#f/9}BUT RANDOM MONSTER ENCOUNTERS WILL OCCUR!',
         '<18>ALSO, POWERS OF TWO WILL DOUBLE THE FREQUENCY!!',
         '<18>{#f/0}IF THE NUMBER REPEATS THE SAME DIGIT TWICE...',
         '<18>{#f/0}THE WAIT TIME WILL BE MULTIPLIED BY SAID DIGIT!',
         '<18>{#f/0}IF THE NUMBER IS A RUN, I.E. 1-2-3...',
         '<18>{#f/0}THE ROOM WILL SHAKE, CAUSING YOU TO STUMBLE!',
         '<18>{#f/0}AND IF THE NUMBER CONTAINS A 4 AT ALL...',
         '<18>{#f/9}SANS WILL RANDOMLY LEVITATE YOU WITH BLUE MAGIC!',
         "<25>{#p/sans}{#f/6}* check it out, it's my special yellow eye.",
         '<18>{#p/papyrus}{#f/7}NOT NOW, SANS!!',
         '<25>{#p/sans}* oh, heheh.\n* guess i got a little {@fill:#ff0}carried away{@fill:#fff}, huh?',
         '<18>{#p/papyrus}{#f/4}YEAH, YEAH...',
         '<18>{#f/9}WELL!\nDO YOU UNDERSTAND THE EXPLANATION?',
         choicer.create('* (What do you say?)', 8, 7, 'Yes', 'No')
      ],
      papyrus7: [
         "<18>{#p/papyrus}{#f/9}WELL, LET'S REVIEW THEN!",
         '<18>{#f/0}THIS DISPLAY GENERATES A RANDOM NUMBER OF SECONDS.',
         '<18>AKA, HOW LONG YOU MUST WAIT TO PASS THROUGH.',
         '<18>ODD NUMBERS MEAN DODGING PROJECTILES.',
         "<18>THE NUMBER'S LAST DIGIT DETERMINES THE TYPE.",
         '<18>1 FOR STARS, 3 FOR MOONS, 5 FOR QUASARS, 7 FOR...',
         '<18>{#f/5}WAIT, WHICH NUMBER WAS FOR QUASARS AGAIN??',
         '<18>{#f/9}UH, WELL, IF IT ENDS IN 9, THE TYPE IS RANDOM!',
         '<18>{#f/0}PRIME NUMBERS SHIFT THE GRAVITY AROUND...',
         '<18>{#f/0}EVEN NUMBERS TRIGGER RANDOM ENCOUNTERS...',
         '<18>{#f/5}WAIT, DID I SAY THE GRAVITY SHIFTS!?,',
         '<18>{#f/7}UGH, I MEANT TO SAY IT FLIPS!!',
         '<18>{#f/0}BUT POWERS OF TWO DOUBLE THE ENCOUNTER RATE.',
         '<18>RUNS CAUSE THE ROOM TO SHAKE, AND 4 MEANS...',
         '<18>{#f/6}UH, I THINK I FORGOT WHAT 4 MEANS.',
         "<25>{#p/sans}* wasn't that supposed to be my cue?",
         '<18>{#p/papyrus}{#f/6}MAYBE???',
         '<18>{#f/7}WHATEVER!!\nDO YOU UNDERSTAND IT NOW!?',
         choicer.create('* (What do you say?)', 8, 7, 'Sure', 'Even less')
      ],
      papyrus8: [
         '<18>{#p/papyrus}{#f/9}WELL... THEN...',
         "<18>{#f/9}YOU KNOW WHAT, I'LL LEAVE THE INSTRUCTIONS HERE!",
         '<18>{#f/0}THEN, YOU CAN READ THEM AT YOUR OWN PACE.',
         '<18>GOOD LUCK, HUMAN!!',
         '<18>{#f/5}NYEH... HEH HEH...'
      ],
      papyrus9: [
         '<18>{#p/papyrus}{#f/9}AWESOME SAUCE!',
         '<18>{#f/9}WELL, WITHOUT FURTHER ADO...',
         "<18>LET'S FIND OUT WHAT OUR RANDOM NUMBER WILL BE!!"
      ],
      papyrus10: [
         '<18>{#p/papyrus}{#f/9}HUMAN!',
         '<18>{#f/9}ARE YOU READY FOR YOUR GREATEST CHALLENGE YET?',
         '<18>{#f/9}INTRODUCING... THE GAUNTLET OF DEADLY TERROR!'
      ],
      papyrus11: [
         '<18>{#p/papyrus}{#f/9}ONCE I HIT THE CONTROL, IT WILL FULLY ACTIVATE!',
         '<18>LASERS WILL FIRE!\nCOILS WILL CHARGE!\nBLADES WILL SLICE!',
         '<18>ALL IN A PRECISE AND TACTICAL MANNER!',
         '<18>{#f/4}WITHOUT PERFECT ACCURACY, YOU WILL SURELY FAIL...',
         '<18>{#f/9}SO, ARE YOU READY!?',
         '<18>BECAUSE!',
         '<18>I!',
         '<18>AM!',
         '<18>ABOUT!',
         '<18>TO DO IT!'
      ],
      papyrus12: [
         '<25>{#p/sans}* well?\n* are we doing this thing or what?',
         '<18>{#p/papyrus}{#f/7}...',
         '<18>ANY SECOND NOW!'
      ],
      papyrus13: [
         "<25>{#p/sans}* i'm waiting, papyrus.",
         '<18>{#p/papyrus}{#f/6}WELL...',
         "<18>{#f/6}I'M STARTING TO THINK THAT...",
         '<18>{#f/6}MAYBE...',
         '<18>{#f/6}THIS CHALLENGE...',
         '<18>{#f/6}...',
         '<18>{#f/4}...WAS A BIT OF A BAD IDEA.',
         '<18>{#f/5}TO THINK I CREATED A CHALLENGE THAT COULD KILL...',
         '<18>{#f/9}BUT, HAVE NO FEAR!',
         '<18>{#f/9}I AM A SKELETON WITH STANDARDS!',
         '<18>{#f/4}AND, FRANKLY, A CHALLENGE YOU CANNOT SURVIVE...',
         '<18>{#f/7}IS A CHALLENGE FAR TOO CONTRIVED!',
         '<18>AWAY IT GOES!!'
      ],
      papyrus14: [
         '<18>{#p/papyrus}{#f/7}WHAT ARE YOU LOOKING AT!?',
         '<18>{#f/9}THIS WAS ANOTHER DECISIVE VICTORY FOR PAPYRUS!!',
         '<18>NYEH!',
         '<18>HEH!',
         '<18>{#f/4}...',
         '<18>...HEH?'
      ],
      papyrusFinal1: [
         '<23>{#p/papyrus}{#f/30}HUMAN.',
         '<23>ALLOW ME TO TELL YOU ABOUT SOME COMPLEX FEELINGS.',
         '<23>FEELINGS LIKE...'
      ],
      papyrusFinal2: () =>
         world.genocide
            ? [
                 '<23>THE SADNESS OF LOSING SOMEONE SPECIAL.',
                 '<23>THE GUILT OF NOT BEING ABLE TO SAVE THEM.',
                 '<23>THE DESIRE TO SEE THEM ONE LAST TIME.',
                 '<23>THESE FEELINGS...'
              ]
            : world.population === 0 && !world.bullied
            ? [
                 '<23>THE STRESS OF SEEING SO MANY PEOPLE DIE.',
                 "<23>THE HOPELESSNESS OF THINKING YOU CAN'T DO ANYTHING TO STOP IT.",
                 '<23>THE DESPERATION TO MAKE A CHANGE FOR THE BETTER.',
                 '<23>THESE FEELINGS...'
              ]
            : [
                 '<23>THE JOY OF FINDING ANOTHER PASTA LOVER.',
                 "<23>THE ADMIRATION FOR ANOTHER'S PUZZLE- SOLVING SKILLS.",
                 '<23>THE DESIRE TO HAVE A COOL, SMART PERSON THINK YOU ARE COOL.',
                 '<23>THESE FEELINGS...'
              ],
      papyrusFinal3: () =>
         world.genocide || (world.population === 0 && !world.bullied)
            ? [
                 '<18>{#f/31}THEY MUST BE WHAT YOU ARE FEELING, RIGHT NOW.',
                 '<18>{#f/32}I CAN HARDLY IMAGINE WHAT THAT MUST FEEL LIKE...',
                 '<18>{#f/6}AFTER ALL, I AM VERY... GREAT...',
                 '<18>{#f/32}{#x1}...',
                 '<18>{#f/31}DESPITE EVERYTHING THAT HAS HAPPENED, I STILL...',
                 '<18>{#f/5}I STILL BELIEVE IN YOU, HUMAN.',
                 '<18>{#f/31}I KNOW YOU CAN DO BETTER.',
                 '<18>{#f/31}I KNOW YOU HAVE IT IN YOU TO CHANGE.',
                 ...(world.genocide
                    ? [ "<18>{#f/4}NO MATTER WHAT RIDICULOUS THING 'ASRIEL' SAYS..." ]
                    : [ '<18>{#f/5}NO MATTER HOW IRREDEEMABLE YOU THINK YOU ARE...' ]),
                 "<18>{#f/6}{#x2}I KNOW, DEEP DOWN, THERE'S STILL GOOD IN YOU!",
                 '<18>{#f/0}SO LET ME HELP YOU FIND THAT GOODNESS.',
                 '<18>{#f/0}LET ME HELP YOU DISCOVER YOUR TRUE POTENTIAL.',
                 '<18>{#f/4}AND MOST OF ALL...',
                 '<18>{#f/9}LET ME SHOW YOU THAT YOU CAN STILL BE GREAT!!!',
                 '<18>{#f/0}I, PAPYRUS, WELCOME YOU WITH OPEN ARMS!'
              ]
            : [
                 '<18>{#f/0}THEY MUST BE WHAT YOU ARE FEELING RIGHT NOW!!',
                 '<18>{#f/4}I CAN HARDLY IMAGINE WHAT THAT MUST FEEL LIKE.',
                 '<18>{#f/4}AFTER ALL, I AM VERY GREAT.',
                 '<18>I NEVER WONDER WHAT HAVING MANY FRIENDS IS LIKE.',
                 '<18>{#f/5}I PITY YOU, LONELY HUMAN...',
                 '<18>{#f/0}BUT WORRY NOT!!!\nYOU SHALL BE LONELY NO LONGER!',
                 '<18>{#f/9}FOR I, THE GREAT PAPYRUS, WILL BE YOUR...',
                 '<18>{#f/5}{#x1}...',
                 '<18>NO...',
                 '<18>{#f/7}{#x2}NO, THIS IS ALL WRONG!',
                 "<18>I CAN'T BE YOUR 'FRIEND...'",
                 '<18>YOU ARE A HUMAN!\nI MUST CAPTURE YOU!!!',
                 '<18>{#f/9}THEN, I CAN FULFILL MY LIFELONG DREAM!!!',
                 '<18>POWERFUL!\nPOPULAR!\nPRESTIGIOUS!!!',
                 "<18>THAT'S PAPYRUS!!!",
                 '<18>{#f/4}THE NEWEST MEMBER...',
                 '<18>{#f/9}OF THE ROYAL GUARD!!!'
              ],
      papyrusFinal4: () =>
         world.population === 0 && !world.bullied
            ? [
                 '<18>{#p/papyrus}{#f/0}WOWIE!\nYOU DID IT!',
                 "<18>{#p/papyrus}{#f/5}YOU DIDN'T DO A VIOLENCE!",
                 '<18>{#p/papyrus}{#f/6}TO BE HONEST, I WAS A LITTLE AFRAID...',
                 "<18>{#p/papyrus}{#f/0}BUT YOU'RE ALREADY TAKING STEPS TO REDEEM YOURSELF!",
                 "<18>{#p/papyrus}{#f/8}I'M SO PROUD OF YOU, HUMAN!",
                 "<18>{#p/papyrus}{#f/4}...WAIT, WASN'T I SUPPOSED TO CAPTURE YOU?",
                 "<18>{#p/papyrus}{#f/0}OH WELL.\nIT'S NOT IMPORTANT RIGHT NOW.",
                 '<18>{#p/papyrus}{#f/0}I JUST WANT YOU TO BE THE BEST PERSON YOU CAN BE.',
                 "<18>{#p/papyrus}{#f/5}LET'S LET BYBONES BE BYBONES, HUH?",
                 "<18>{#p/papyrus}{#f/9}I'LL EVEN GIVE YOU DIRECTIONS TO THE EXIT!"
              ]
            : [
                 '<18>{#p/papyrus}{#f/5}NYOO HOO HOO...',
                 "<18>I CAN'T EVEN STOP SOMEONE AS WEAK AS YOU...",
                 "<18>{#f/7}UNDYNE'S GOING TO BE DISAPPOINTED!",
                 "<18>{#f/5}I'LL NEVER JOIN THE ROYAL GUARD... AND...",
                 '<18>{#f/7}MY FRIEND QUANTITY WILL REMAIN STAGNANT!',
                 "<32>{#p/human}* (How will you respond?)\n{!}µµµµµµµLet's beµµµµµµµµWhat a\nµµµµµµµfriendsµµµµµµµµµloser{#c/0/7/7}"
              ],
      papyrusFinal4a1: [
         '<18>{#p/papyrus}{#f/1}REALLY!?\nYOU WANT TO BE FRIENDS WITH ME???',
         '<18>{#f/6}WELL THEN...\nI GUESS...',
         '<18>{#f/0}I CAN MAKE AN ALLOWANCE FOR YOU!'
      ],
      papyrusFinal4a2: [
         '<18>{#p/papyrus}{#f/1}HUH? WHY WOULD YOU BERATE YOURSELF SO LOUDLY???',
         '<18>{#f/4}IS IT BECAUSE...',
         "<18>{#f/7}YOU DON'T THINK YOU'RE GOOD ENOUGH TO BE MY FRIEND?",
         "<18>{#f/9}NO, YOU'RE GREAT!\nI'LL BE YOUR FRIEND!!!"
      ],
      papyrusFinal4b1: [
         '<18>{#f/0}WOWIE!!',
         '<18>I FOUND A NEW FRIEND!!!',
         '<18>{#f/4}AND WHO KNEW THAT ALL I NEEDED TO DO IT...'
      ],
      papyrusFinal4b2: [
         '<18>{#f/0}WOWIE!!',
         "<18>{#f/0}WE HAVEN'T EVEN HAD OUR FIRST DATE...",
         "<18>{#f/0}AND I'VE ALREADY MANAGED TO HIT THE FRIEND ZONE!!!",
         '<18>{#f/4}WHO KNEW THAT ALL I HAD TO DO...'
      ],
      papyrusFinal4c1: [
         '<18>{#f/0}WAS TO GIVE PEOPLE AWFUL PUZZLES AND THEN FIGHT THEM?',
         '<18>YOU TAUGHT ME A LOT, HUMAN.',
         '<18>{#f/9}I HEREBY GRANT YOU PERMISSION TO PASS THROUGH!',
         "<18>{#f/0}AND I'LL GIVE YOU DIRECTIONS TO THE EXIT."
      ],
      papyrusFinal4c2: [
         '<18>CONTINUE FORWARD UNTIL YOU REACH THE CITADEL.',
         '<18>THEN, HOP IN A CRAFT AND CROSS THE {@fill:#ff0}FORCE FIELD{@fill:#fff}.',
         "<18>{#f/4}THAT'S THE BARRIER TRAPPING US ALL ON THE OUTPOST.",
         '<18>ANYONE CAN ENTER THROUGH IT, BUT NOBODY CAN EXIT...',
         '<18>{#f/9}...EXCEPT SOMEONE WITH A POWERFUL SOUL.',
         '<18>{#f/0}LIKE YOU!!!'
      ],
      papyrusFinal4d: [
         '<18>{#f/4}OH, I ALMOST FORGOT TO MENTION.',
         '<18>TO REACH THE EXIT, YOU WILL HAVE TO PASS...',
         '<18>{#f/7}BY {@fill:#ff0}THE KING{@fill:#fff}.',
         '<18>{@fill:#ff0}THE KING OF ALL MONSTERS...',
         '<18>HE IS...',
         '<18>{#f/6}...WELL...'
      ],
      papyrusFinal4e: [
         "<18>{#f/0}HE'S A BIG FUZZY PUSHOVER!!!",
         '<18>EVERYBODY LOVES THAT GUY.',
         '<18>{#f/4}I AM CERTAIN IF YOU JUST SAY...',
         '<18>"EXCUSE ME, MR. DREEMURR... CAN I PLEASE GO HOME?"',
         "<18>{#f/0}HE'LL GUIDE YOU OVER TO THE LAUNCH BAY HIMSELF!",
         "<18>{#f/9}ANYWAY!!!\nTHAT'S ENOUGH TALKING!!!",
         "<18>{#f/0}I'LL BE AT HOME BEING A COOL FRIEND."
      ],
      papyrusFinal4f1: [ '<18>{#f/9}FEEL FREE TO COME BY AND HANG OUT!!!' ],
      papyrusFinal4f2: [ '<18>{#f/9}FEEL FREE TO COME BY AND HAVE THAT DATE!!!' ],
      papyrusFinal4g: [ '<18>NYEH HEH HEH HEH HEH HEH HEH!!!' ],
      papyrusFinal5: [
         '<18>{#p/papyrus}{#f/5}OH, WHERE COULD THAT HUMAN HAVE GONE...',
         '<18>{#f/4}...\nWAIT.',
         "<18>{#f/1}IT'S RIGHT IN FRONT OF ME!!!",
         '<18>{#f/0}HELLO! I WAS WORRIED THAT YOU HAD GOTTEN LOST!',
         "<18>IT SURE IS A RELIEF TO SEE THAT YOU'RE HERE...",
         '<18>{#f/7}...\nWAIT A SECOND!!!',
         "<18>YOU'RE NOT SUPPOSED TO ESCAPE!!!",
         '<18>GET BACK THERE!!!'
      ],
      papyrusFinal6: [
         '<18>{#p/papyrus}{#f/4}BACK AGAIN, EH?',
         "<18>{#f/5}I SUPPOSE IT'S MY FAULT...",
         '<18>I TOLD YOU BEFORE THAT I WOULD MAKE YOU SPAGHETTI.',
         "<18>IT'S ONLY NATURAL THAT YOU WOULD WANT TO SEE ME...",
         '<18>IN THE DIRE HOPE THAT I WOULD MAKE YOU SOME.',
         '<18>{#f/0}WELL... I UNDERSTAND.',
         '<18>{#f/0}PAPYRUS IS HUNGRY, TOO!',
         '<18>{#f/7}HUNGRY FOR JUSTICE!'
      ],
      papyrusFinal7: [
         "<18>{#p/papyrus}{#f/1}YOU'RE BACK AGAIN!?!?",
         '<18>{#f/4}I FINALLY REALIZE THE TRUE REASON WHY.',
         '<18>{#f/5}YOU...',
         '<18>YOU JUST MISS SEEING MY FACE SO MUCH...',
         '<18>{#f/6}...',
         "<18>{#f/31}I'M NOT SURE I CAN FIGHT SOMEONE WHO FEELS THIS WAY.",
         "<18>{#f/9}NOT TO MENTION, I'M GETTING TIRED OF CAPTURING YOU!",
         '<18>{#f/0}SO, WHAT DO YOU SAY?',
         '<18>{#f/0}WOULD YOU LIKE TO PASS THROUGH WITHOUT A BATTLE?',
         choicer.create('* (What do you say?)', 8, 7, 'Yes', 'No')
      ],
      papyrusFinal7a: [ '<18>{#p/papyrus}{#f/31}...\nOKAY...', "<18>{#f/3}I GUESS I'LL ACCEPT MY FAILURE." ],
      papyrusFinal7b: [ '<18>{#p/papyrus}{#f/4}WELL, IF YOU SAY SO, THEN...', '<18>{#f/9}BY ALL MEANS!!!' ],
      papyrusFinal8: [
         '<18>{#p/papyrus}{#f/1}AGAIN??',
         '<18>{#f/4}...WELL, OKAY...',
         '<18>{#f/9}WILL YOU FORGO THE BATTLE THIS TIME??',
         choicer.create('* (What do you say?)', 8, 7, 'Yes', 'No')
      ],
      papyrusFinal8a: [ '<18>{#f/0}OKAY, HERE WE GO!' ],
      puzzle3: () => [
         '<32>{#p/human}* (You inspect the terminal.)',
         '<32>{#p/narrator}* There is a log of previous modifications...',
         world.genocide
            ? '<32>* "Pattern last modified by user: ALPHYS"'
            : '<32>* "Pattern last modified by user: COOLSKELETON95"',
         '<32>* "Would you like to view the pattern?"',
         choicer.create('* (View the pattern?)', 8, 7, 'Yes', 'No')
      ],
      robot1: pager.create(
         'limit',
         [
            '<32>{#p/monster}* Hello.\n* I am a builder bot.',
            '<32>* I want to see the world...\n* But I cannot move.',
            '<32>* If you would be so kind, traveler, please...',
            '<32>* Take one of my computer chips and bring it to another computer very far away.',
            choicer.create('* (Take a chip?)', 8, 7, 'Yes', 'No')
         ],
         [
            '<32>{#p/monster}* If you would be so kind, traveler, please...',
            '<32>* Take one of my computer chips and bring it to another computer very far away.',
            choicer.create('* (Take a chip?)', 8, 7, 'Yes', 'No')
         ]
      ),
      robot2: [ '<32>{#p/monster}* Thank you... good luck!', '<32>{#p/human}* (You got the Computer Chip.)' ],
      robot3: [ '<32>{#p/monster}* It seems you do not have enough room for me.' ],
      robot4: [ '<32>{#p/monster}* I see.\n* Good journey, then.' ],
      robot5: [ '<32>{#p/monster}* Thank you for taking care of me.' ],
      robot6: [
         '<32>{#p/monster}* How am I doing?\n* By "I" I mean the chip I gave you...',
         '<32>* Huh? You lost it...?\n* ... I suppose I can give you another one...',
         choicer.create('* (Take another chip?)', 8, 7, 'Yes', 'No')
      ],
      robot7: [ '<32>{#p/monster}* Please be careful this time.', '<32>{#p/human}* (You got the Computer Chip.)' ],
      robot8: [ '<32>{#p/monster}* I understand.\n* Safe journey, then...' ],
      robot9: [ '<32>{#p/monster}* Thank you for... taking care of me...' ],
      robot10: [
         '<32>{#p/monster}* How am I doing?',
         '<32>* Huh? Again...?',
         "<32>* I'm sorry... if I give you any more, there will be nothing left of me.",
         '<32>* I suppose it is true.\n* traveling beyond our limits is but a fantasy.',
         "<32>* It's no different for anyone else.",
         '<32>* All of monsterkind are doomed to live out here forever...'
      ],
      robot11: [ '<32>{#p/monster}* Why did I give myself away so easily?' ],
      robot12: [ '<32>{#p/monster}* Begone!' ],
      robotDead: [ '<32>{#p/narrator}* A deconstructed builder bot.' ],
      robotTake0: [ "<32>{#p/human}* (You're carrying too much.)" ],
      robotTake1: [
         '<32>{#p/monster}* Hello.\n* I am a builder bot.\n* I cannot move.',
         '<32>* Traveler, if you could...'
      ],
      robotTake2: [
         '<32>{#p/monster}* Oh me, oh my.\n* What are you doing?',
         "<32>* Soon, I won't have enough chips to function..."
      ],
      robotTake3: [ '<32>{#p/monster}* Stop...\n* Please...' ],
      robotTake4: [ '<32>{#p/human}* (You got the Computer Chip.)' ],
      sans1: [
         '{#p/darksans}* h u m a n .',
         "* d o n ' t    y o u    k n o w\n  h o w    t o    g r e e t    a\n  n e w    p a l ?",
         '* t u r n    a r o u n d\n  a n d    s h a k e    m y\n  h a n d .'
      ],
      sans2: [
         "<25>{#p/sans}{#f/4}* heheh... nothin' like a good whoopee cushion.",
         "<25>{#f/0}* anyway, you're a human, right?",
         "<25>{#f/5}* that's hilarious.",
         "<25>{#f/0}* i'm sans.\n* sans the skeleton.",
         '<25>{#f/3}* as a royal sentry, my job is to capture humans.',
         "<25>{#f/4}* but... y'know...",
         "<25>{#f/2}* i've got better things to do.",
         '<25>{#f/0}* as for my brother, well...',
         '<25>{#f/5}* despite not being an actual sentry, he sure ACTS like one.',
         "<25>{#f/0}* in fact, i think that's him over there.",
         '<25>* i have an idea.\n* jump across that gap, will ya?',
         '<26>{#f/4}* yeah, jump right across.\n* my bro set the gravity too low to stop anyone.'
      ],
      sans3: [ '<25>{#p/sans}* quick, to the gravometric inverter.' ],
      sans4: [ '<25>{#p/sans}* sup, bro?' ],
      sans5: [
         '<18>{#p/papyrus}{#x2}{#f/7}YOU KNOW WHAT\'S "SUP" BROTHER!',
         '<18>YOU HAVE PUZZLES TO ATTEND TO!',
         "<18>I'VE GIVEN YOU PLENTY OF LEEWAY, BUT STILL...",
         '<18>YOU SIT AROUND AND DO NOTHING ALL DAY!',
         "<18>EVEN NOW, THAT'S WHAT YOU'RE DOING!",
         '<18>NOTHING!',
         "<25>{#p/sans}* actually, i'm playing with this gravometric thingy.",
         "<25>* it's really cool.",
         '<25>{#f/4}* do you wanna look?',
         "<18>{#p/papyrus}{#x3}{#f/7}NO!!\nI DON'T HAVE TIME FOR THAT!!",
         '<18>{#x2}IF A HUMAN COMES THROUGH HERE, I WANT TO BE READY!',
         '<18>I MUST BE THE ONE!\nI WILL BE THE ONE!',
         '<18>{#x1}{#f/9}I WILL FINALLY CAPTURE A HUMAN!',
         '<18>{#x4}{#f/0}THEN I, THE GREAT PAPYRUS...',
         '<18>WILL GET ALL THE THINGS I UTTERLY DESERVE!',
         '<18>RESPECT...\nRECOGNITION...',
         '<18>{#f/9}I WILL FINALLY BE ABLE TO JOIN THE ROYAL GUARD!',
         '<25>{#p/sans}* hmm...',
         '<25>{#f/2}* maybe this gadget will help you.',
         "<18>{#p/papyrus}{#x3}{#f/7}SANS, THAT WON'T DO ANYTHING!\nYOU LAZYBONES!",
         '<18>{#x1}{#f/5}YOU KNOW, YOU ARE CAPABLE OF SO MUCH MORE, YET...',
         '<18>{#x2}{#f/7}YOU CHOOSE TO SIT AROUND AND DO NOTHING ALL DAY!',
         "<18>{#x1}{#f/5}DON'T YOU WANT... MORE, OUT OF LIFE?",
         "<25>{#p/sans}* hey, take it easy.\n* i've got plenty of things in mind.",
         "<25>{#f/4}* perhaps you could even say i'm...",
         '<25>{#f/2}* shooting for the {@fill:#ff0}stars{@fill:#fff}?'
      ],
      sans6: [
         '<18>{#p/papyrus}{#x3}{#f/7}SANS!!',
         "<25>{#p/sans}{#f/5}* come on.\n* you're smiling.",
         '<18>{#p/papyrus}{#x2}{#f/7}I AM AND I UTTERLY DESPISE IT!',
         '<18>{#x1}{#f/4}(SIGH...)',
         '<18>{#f/5}WHY DOES SOMEONE\nAS GREAT AS MYSELF...',
         '<18>HAVE TO DO SO MUCH JUST TO GET SOME RECOGNITION??',
         '<25>{#p/sans}* heh.\n* perhaps you should focus more on, well...',
         '<25>* the {@fill:#ff0}gravity{@fill:#fff} of the situation.'
      ],
      sans7: [
         '<18>{#p/papyrus}{#x2}{#f/7}UGH!!',
         '<18>{#x1}{#f/4}I WILL ATTEND TO MY PUZZLES...',
         '<18>{#f/7}AS FOR YOUR WORK?',
         '<18>{#f/4}I EXPECT YOU TO DO A MORE...',
         '<18>{#f/9}{@fill:#ff0}"STELLAR"{@fill:#fff} JOB FROM NOW ON!!!',
         '<18>{#f/0}NYEHEHEHEHEHE\nHEHEHEHEHEHEH!!'
      ],
      sans8: [ '<18>{#p/papyrus}HEH!' ],
      sans9: [ '<25>{#p/sans}* ok, time to bring you back down.' ],
      sans10: [
         '<25>{#p/sans}* actually, hey...\n* not to bother ya, but can you do me a favor?',
         "<25>* look, kid.\n* my brother's been kind of down lately.",
         "<25>* it's been a long time since he's seen a human.",
         '<25>* and uh, seeing you might just make his day.',
         "<25>{#f/3}* don't worry, he's not dangerous.",
         '<25>{#f/2}* even if he tries to be.',
         "<25>{#f/0}* thanks a million.\n* i'll be up ahead."
      ],
      sansbook1: [ "<32>{#p/narrator}* It's a joke book." ],
      sansbook2: [ choicer.create('* (Take a look inside?)', 8, 7, 'Yes', 'No') ],
      sansbook3: [ '<32>{#p/human}* (You look inside the book...)' ],
      sansbook4: [ '<32>{#p/narrator}* Inside the joke book was a quantum physics book.' ],
      sansbook5: [ '<32>{#p/narrator}* Inside the quantum physics book was another joke book.' ],
      sansbook6: [ '<32>{#p/narrator}* Inside the joke book was another quantum physics book.' ],
      sansbook7: [ "<32>{#p/narrator}* It's another joke book." ],
      sansbook8: [ "<32>{#p/narrator}* It's yet another quantum physics book." ],
      sansbook8x: [ "<32>{#p/narrator}* It's yet another joke book." ],
      sansbook9: [ '<32>{#p/human}* (You decide not to look.)' ],
      sansinter: {
         a1: [
            '<25>{#p/sans}* papyrus will be back soon.',
            "<25>{#f/4}* i'd get going if i were you...",
            "<25>{#f/2}* otherwise, you'll have to listen to more of my hilarious jokes."
         ],
         a2: [
            "<25>{#p/sans}* look, there's nothin' to be afraid of.",
            "<25>{#f/2}* he may seem scary, but papyrus is the nicest guy you'll ever meet."
         ],
         a3: [ '<25>{#p/sans}* trust me.' ],
         s_papyrus: pager.create(
            'limit',
            () =>
               edgy()
                  ? [
                       "<25>{#p/sans}* hey, here's something important to remember.",
                       '<25>* when it comes to fighting my brother...',
                       '<25>{#f/3}* ...',
                       "<25>{#f/1}* don't."
                    ]
                  : [
                       "<25>{#p/sans}* hey, here's something important to remember.",
                       '<25>* my brother has a very {@fill:#00a2e8}special attack{@fill:#fff}.',
                       "<25>* if you see an {@fill:#ff993d}orange attack{@fill:#fff}, you'll get hurt if you're not moving.",
                       "<25>{#f/3}* here's an easy way to keep it in mind.",
                       "<25>{#f/0}* imagine hot coals.\n* you wouldn't stand still on those, right?",
                       '<25>* hot coals are rocky.\n* so imagine boney hot coals instead.',
                       '<25>{#f/2}* simple, right?\n* when fighting, think about boney hot coals.'
                    ],
            () =>
               edgy()
                  ? [ '<25>{#p/sans}{#f/3}* you heard me.' ]
                  : [ '<25>{#p/sans}{#f/2}* remember...\n* boney hot coals.' ]
         ),
         s_dogs: pager.create(
            'limit',
            () =>
               edgy()
                  ? [
                       "<25>{#p/sans}* since you're a human, you've probably never heard of the A.S.S.",
                       "<25>{#f/3}* speaking of things you haven't heard of...",
                       "<25>{#f/1}* how about showin' some mercy around here, huh?"
                    ]
                  : [
                       "<25>{#p/sans}* since you're a human, you've probably never heard of the A.S.S.",
                       "<25>{#f/2}* that's short for 'atmospheric simulation system.'"
                    ],
            () =>
               edgy()
                  ? [ "<25>{#p/sans}{#f/3}* it's the least you could do." ]
                  : [
                       "<25>{#p/sans}* if the A.S.S. were to fall, you'd be crushed like a tin can.",
                       "<25>{#f/4}* that's how air pressure works, right?"
                    ],
            () =>
               edgy()
                  ? [ "<25>{#p/sans}{#f/3}* it's the least you could do." ]
                  : [ "<25>{#p/sans}{#f/2}* what?\n* haven't you ever heard of air pressure?" ]
         ),
         s_jenga: pager.create(
            'limit',
            () =>
               edgy()
                  ? [
                       '<25>{#p/sans}* actually, that spaghetti from earlier...',
                       "<25>{#f/3}* it wasn't too bad for my brother.",
                       "<25>{#f/0}* since he started cooking lessons, he's been improving a lot.",
                       "<25>{#f/1}* it'd sure be a shame if all that effort of his went to waste."
                    ]
                  : [
                       '<25>{#p/sans}* actually, that spaghetti from earlier...',
                       "<25>{#f/3}* it wasn't too bad for my brother.",
                       "<25>{#f/0}* since he started cooking lessons, he's been improving a lot.",
                       "<25>{#f/4}* i bet if he keeps it up, next year he'll even impress the king."
                    ],
            () =>
               edgy()
                  ? [ '<25>{#p/sans}{#f/3}* a real shame.' ]
                  : [ '<25>{#p/sans}{#f/2}* king fluffybuns is a sucker for spaghetti.' ]
         ),
         s_bridge: pager.create(
            'limit',
            () =>
               edgy()
                  ? [
                       "<25>{#p/sans}* i don't know what my brother's going to do now.",
                       "<25>{#f/1}* if i were you, i'd stay the hell away from him."
                    ]
                  : [
                       "<25>{#p/sans}* i don't know what my brother's going to do now.",
                       '<25>{#f/3}* if i were you, i would make sure i understand {@fill:#ff993d}orange attacks{@fill:#fff}.'
                    ],
            () =>
               edgy() ? [ '<25>{#p/sans}{#f/2}* capiche?' ] : [ "<25>{#f/2}* papyrus' special attack is outta this world." ]
         )
      },
      sentryPapyrus1: () => [
         "<32>{#p/narrator}* There's some narration on this cardboard box.",
         ...(world.genocide
            ? [
                 '<23>{#p/papyrus}{#f/30}"PLEASE DO NOT DESTROY MY SENTRY STATION."',
                 '<23>"I WORKED VERY HARD ON IT, AND IT\'D BE A SHAME IF IT WERE RUINED."',
                 '<23>"...THAT IS ALL."',
                 '<23>("NOTE: I WOULD HAVE SAID MORE, BUT THERE\'S NOT ENOUGH ROOM.")'
              ]
            : [
                 '<23>{#p/papyrus}{#f/30}"YOU OBSERVE THE WELL- CRAFTED SENTRY STATION."',
                 '<23>"WHO COULD HAVE BUILT THIS, YOU PONDER...?"',
                 '<23>"I BET IT WAS THAT VERY FAMOUS ROYAL GUARD!"',
                 '<23>("NOTE: NOT YET A VERY FAMOUS ROYAL GUARD.")'
              ])
      ],
      sentryPapyrus2: pager.create(
         'limit',
         [
            '<32>{#p/human}* (You look under the shelf...)',
            '<32>* Boxes upon boxes of unused cables and old tech can be found here.'
         ],
         [ '<32>{#p/narrator}* Papyrus must be a tinkerer.' ]
      ),
      sentrySans1: () =>
         world.genocide
            ? [ "<32>{#p/narrator}* Sans's sentry station." ]
            : [
                 "<32>{#p/narrator}* Sans's sentry station...",
                 "<32>* Truly the most worthwhile investment the royal guard could've made."
              ],
      sentrySans2: pager.create(
         'limit',
         [
            '<32>{#p/human}* (You look under the shelf...)',
            '<32>* There are bottles of ketchup, mustard, and relish stockpiled here.'
         ],
         [ "<32>{#p/narrator}* It's an unholy quantity of food toppings." ]
      ),
      trivia: {
         s_secret_sign: () => [
            '<32>{#p/narrator}* "It\'s taking a time-out."',
            ...(world.azzie && save.flag.n.ga_asrielDog++ < 1 ? [ '<25>{#p/asriel2}{#f/15}* What.' ] : [])
         ],
         grillflower: [
            '<32>{#p/narrator}* An odd-looking plant pot.',
            '<32>* Who knows what this neon- coloured plant is made of.'
         ],
         librarbywindow1: [ "<32>{#p/narrator}* There's a plant in the window." ],
         librarbywindow2: [
            '<32>{#p/human}* (You reach up to the window and put your hands on it.)',
            "<32>* It's pleasantly temperate."
         ],
         papwindow: () =>
            world.dead_skeleton
               ? [ "<32>{#p/narrator}* ...seems like nobody's home." ]
               : [ '<32>{#p/narrator}* Looks like a fun place to be.' ],
         s_puzzlenote: [ "<33>{#p/narrator}* It's illegible chicken-scratch." ],
         s_backrooms_lessdog: () =>
            save.data.n.state_starton_lesserdog === 3
               ? [ '<32>{#p/narrator}* ...but everybody ran.' ]
               : save.data.n.state_starton_lesserdog === 2
               ? [ '<32>{#p/narrator}* ...but nobody came.' ]
               : [ "<32>{#p/narrator}* It's playing a game of poker against itself.", '* It appears to be losing...' ],
         s_backrooms_lesstable: () =>
            save.data.n.state_starton_lesserdog === 2
               ? [ '<32>{#p/narrator}* An ultramodern poker table.', '<32>* ...and some dog chow.', '<32>* ...' ]
               : save.data.b.oops
               ? [
                    '<32>{#p/narrator}* An ultramodern poker table.',
                    '<32>* ...and some dog chow.',
                    "<32>* This'll definitely never get eaten."
                 ]
               : [
                    '<32>{#p/narrator}* An ultramodern poker table.',
                    '<32>* ...and some dog chow.',
                    "<32>{#p/narrator}* Perhaps one day it'll be eaten?"
                 ],
         s_beddinng_table: [
            '<32>{#p/narrator}* A nice, clean table.\n* You could put all your ITEMs here while you sleep...'
         ],
         s_bh_bone: pager.create(
            'limit',
            () => [
               ...(save.data.n.plot_date < 0.2 && save.data.n.state_starton_papyrus === 0
                  ? [ '<18>{#p/papyrus}A CLASSIC IMAGE.', "<18>IT ALWAYS REMINDS ME OF WHAT'S IMPORTANT IN LIFE." ]
                  : []),
               "<32>{#p/narrator}* It's a minimalistic painting of a cartoon bone."
            ],
            [ "<32>{#p/narrator}* It's a minimalistic painting of a cartoon bone." ]
         ),
         s_bh_cottonball: [
            "<32>{#p/narrator}* It's a dirty cotton ball with a series of notes on it.",
            '<23>{#p/papyrusnt}"SANS!"\n"PLEASE PICK UP YOUR COTTON BALL!"',
            '<32>{#p/sans}{#f/7}* "ok."',
            '<23>{#p/papyrusnt}"DON\'T PUT IT BACK DOWN!"\n"MOVE IT!"',
            '<32>{#p/sans}{#f/7}* "ok."',
            '<23>{#p/papyrusnt}"YOU MOVED IT TWO MICRONS!"\n"MOVE IT TO YOUR ROOM!"',
            '<32>{#p/sans}{#f/7}* "ok."',
            '<23>{#p/papyrusnt}"AND DON\'T BRING IT BACK!"',
            '<32>{#p/sans}{#f/7}* "ok."',
            '<23>{#p/papyrusnt}"IT\'S STILL HERE!"',
            '<32>{#p/sans}{#f/7}* "didn\'t you just say not to bring it back to my room?"',
            '<23>{#p/papyrusnt}"FORGET IT!"'
         ],
         s_paptrash: pager.create(
            'limit',
            () => [
               ...(save.data.n.plot_date < 0.2 && save.data.n.state_starton_papyrus === 0
                  ? [
                       "<18>{#p/papyrus}{#f/9}I DIDN'T KNOW YOU WERE A FAN OF GARBAGE-HUNTING!",
                       '<18>{#f/0}DR. ALPHYS WOULD LIKE TO KNOW YOUR NUMBER.'
                    ]
                  : []),
               '<32>{#p/narrator}* It\'s a "cool" trash can.'
            ],
            [ '<32>{#p/narrator}* You can tell this trash can is "cool" because it has "cool" written on the side.' ]
         ),
         s_bh_fridge: pager.create(
            'limit',
            () => [
               ...(save.data.n.plot_date < 0.2 && save.data.n.state_starton_papyrus === 0
                  ? [
                       '<18>{#p/papyrus}{#f/9}AH-HA!\nINTERESTED IN MY FOOD MUSEUM?',
                       '<18>{#f/0}PLEASE, FEEL FREE TO PERUSE MY CULINARY ARTSHOW.'
                    ]
                  : []),
               '<32>{#p/narrator}* Half of the fridge is filled with containers all labelled "spaghetti."',
               '<32>* The other half contains nothing but an empty bag of chisps...'
            ],
            () => [
               ...(save.data.n.plot_date < 0.2 && save.data.n.state_starton_papyrus === 0
                  ? [ "<18>{#p/papyrus}GREAT FRIDGE, ISN'T IT?" ]
                  : []),
               '<32>{#p/narrator}* Half of the fridge is filled with containers all labelled "spaghetti."',
               '<32>* The other half contains nothing but an empty bag of chisps...'
            ]
         ),
         s_bh_rocktable: pager.create(
            'limit',
            () => [
               ...(save.data.n.plot_date < 0.2 && save.data.n.state_starton_papyrus === 0
                  ? [
                       '<18>{#p/papyrus}AH YES, THE DINING TABLE.',
                       '<18>{#f/5}YOU KNOW, WE USED TO KEEP A PET MOON ROCK THERE...',
                       '<18>{#f/7}BUT ONE DAY, IT TOTALLY VANISHED!!',
                       '<18>{#f/4}AT FIRST I THOUGHT IT WAS THAT MEDDLING CANINE...',
                       '<18>{#f/7}BUT THEN I FOUND OUT SANS HAD USED IT TO TEST HIS...',
                       '<18>{#f/6}HIS... FRANKLY AMAZING GADGET.\nWOWIE...',
                       "<18>{#f/0}YOU KNOW WHAT, I'LL GIVE IT TO HIM.",
                       '<18>{#f/0}FOR ONCE, HE PUT EFFORT INTO SOMETHING.',
                       '<18>{#f/5}EVEN IF IT COST US A VALUABLE MOON ROCK...',
                       "<18>{#f/0}YEAH!!\n'E' FOR EFFORT!!"
                    ]
                  : []),
               "<32>{#p/narrator}* It's covered in edible stardust."
            ],
            [ "<32>{#p/narrator}* It's covered in edible stardust." ]
         ),
         s_bh_sansdoor: [ "<32>{#p/narrator}* It's locked." ],
         s_bh_stove: pager.create(
            'limit',
            () => [
               "<32>{#p/narrator}* There's an empty pie tin inside the stove.",
               ...(save.data.n.plot_date < 0.2 && save.data.n.state_starton_papyrus === 0
                  ? [
                       '<18>{#p/papyrus}MY BROTHER ALWAYS GOES OUT TO EAT.',
                       "<18>{#f/4}BUT RECENTLY, HE TRIED 'BAKING' SOMETHING...",
                       '<18>{#f/4}IT WAS LIKE... A QUICHE?',
                       '<18>{#f/4}BUT FILLED WITH A SUGARY, NON-EGG SUBSTANCE.',
                       '<18>{#f/7}HOW ABSURD!'
                    ]
                  : [])
            ],
            [ "<32>{#p/narrator}* There's an empty pie tin inside the stove." ]
         ),
         s_chew: [ "<32>{#p/narrator}* It's a squeaky chew toy labelled 'special attack.'" ],
         s_whew: [ '<32>{#p/narrator}* The doggy bed is covered in annoying white fur.' ],
         s_crossroads_sign: [
            '<32>{#p/narrator}* "This is a box."',
            '<32>* "You can put an item inside or take an item out."',
            '<32>* "The same box will appear later, so don\'t worry about coming back."',
            '<32>* "Sincerely, a box fan."'
         ],
         s_doghouse: () =>
            world.genocide
               ? [ '<32>{#p/narrator}* A tiny doghouse.' ]
               : [ '<32>{#p/narrator}* What a tiny doghouse!', '<32>{#p/narrator}* It must be bigger on the inside...' ],
         s_doghouse_sign: [ '<32>{#p/narrator}* "Woof."' ],
         s_dogs_sign: [
            '<32>{#p/narrator}* "Smell Danger Ratings"',
            '<32>* "Silicone Smell - Robot"\n* "WHITE Rating"\n* "Can become {@fill:#333}BLACK{@fill:#fff} Rating."',
            '<32>* "Unsuspicious Smell - Puppy"\n* "{@fill:#0080ff}BLUE{@fill:#fff} Rating."\n* "Smell of rolling around."',
            '<32>* "Weird Smell - Human"\n* "{@fill:#0f0}GREEN{@fill:#fff} Rating"\n* "Destroy at all costs!"'
         ],
         s_dogstandA: () =>
            player.y > 45
               ? [ '<32>{#p/narrator}* "His."' ]
               : [ '<32>{#p/narrator}* Inside is a magazine for fancy haircuts.' ],
         s_dogstandB: () =>
            player.y > 45
               ? [ '<32>{#p/narrator}* "Hers."' ]
               : [ '<32>{#p/narrator}* Inside is a brochure for blunt heavy-duty weaponry.' ],
         s_dogstandC: () =>
            world.genocide
               ? [ '<32>{#p/narrator}* On the floor inside is a signed letter from Undyne about tactical retreat.' ]
               : [ '<32>{#p/narrator}* On the floor inside is a signed letter from Undyne about royal guard uniforms.' ],
         s_dogtreat: [ "<32>{#p/narrator}* Someone's been smoking these dog treats..." ],
         s_grillbys_beegstool: [ '<32>{#p/narrator}* A short barstool...', '<32>* Seems like the right size for Sans.' ],
         s_grillbys_drinks: [
            "<32>{#p/narrator}* It's a tray table.",
            "<32>* There's a camera hidden on its underside..."
         ],
         s_grillbys_shelf: [
            '<32>{#p/narrator}* A shelf full of various party beverages and sickly liquids.',
            '<32>{#p/narrator}* And a single bottle of water.'
         ],
         s_grillbys_sidestool: [ '<32>{#p/narrator}* This barstool is labelled "PAPYRUS."' ],
         s_grillbys_smolstool: () =>
            save.data.b.oops
               ? [ '<32>{#p/narrator}* There is nothing special about this barstool.' ]
               : [ '<32>{#p/narrator}* Somehow, this barstool strikes me as being special... I wonder why.' ],
         s_helipad: [ '<32>{#p/narrator}* Just an old, derelict terminal, once used to direct spacecraft landings.' ],
         s_jenga_sign: [
            "<32>{#p/narrator}* This sign's text is barely legible.",
            '<32>* "NOTICE: This quantum-numeric randomizer needs to be fixed."',
            '<32>* "For now, it\'ll just show zero every time..."'
         ],
         s_library_window: [
            '<32>{#p/human}* (You put your hands on window.)',
            "<32>{#p/narrator}* It's as cold as ice..."
         ],
         s_librarby_blueBooks: pager.create(
            'sequence',
            [
               '<32>{#p/narrator}* This bookshelf is labelled "Then and Now."',
               '<32>{#p/human}* (You pick out a book...)',
               '<32>{#p/narrator}* "Before the war, monsters were taught magic on a regular, day-to-day basis."',
               '<32>* "When most of our race died, so too did many of our teachers."',
               '<32>* "To account for this, monsters started learning in larger groups."',
               '<32>* "These new teaching methods were focused on skills to help us survive on the outpost."',
               '<32>* "By now, the population woes play a much smaller factor in our lives."',
               '<32>* "Though, we still stick to the new methods, because..."',
               '<32>* "...we\'re honestly just too lazy to change back."',
               '<32>{#p/human}* (You put the book back on the shelf.)'
            ],
            [
               '<32>{#p/narrator}* This bookshelf is labelled "Then and Now."',
               '<32>{#p/human}* (You pick out a book...)',
               '<32>{#p/narrator}* "Once upon a time, monsters used a wide variety of currencies."',
               '<32>* "JEWEL, KRIOTAAN, SALIVAR... but only on the home planet."',
               '<32>* "When it came to interactions with humans, the only currency used was GOLD."',
               '<32>* "Our abundant supply of the shiny mineral granted us many favors..."',
               '<32>* "But as a result, the other curriences lost their value in short time."',
               '<32>* "Now, we just use gold for everything!"\n* "It\'s the monster way."',
               '<32>{#p/human}* (You put the book back on the shelf.)'
            ],
            [
               '<32>{#p/narrator}* This bookshelf is labelled "Then and Now."',
               '<32>{#p/human}* (You pick out a book...)',
               '<32>{#p/narrator}* "Since Erogot\'s fall, our king has done his best to uphold our homeworld\'s legacy."',
               '<32>* "Even if he lost the damn thing in the process..."',
               '<32>* "We\'ve all come to accept what happened, and we don\'t really blame him anymore."',
               '<32>* "The past few centuries have been tough, but we grow ever-closer to freedom."',
               '<32>* "The angel is coming..."',
               '<32>* "And for all we know... it might already be here, having read this very book."',
               '<32>{#p/human}* (You put the book back on the shelf.)'
            ]
         ),
         s_librarby_desk: [ "<32>{#p/narrator}* The librarby's check-out book." ],
         s_librarby_greenBooks: pager.create(
            'sequence',
            [
               '<32>{#p/narrator}* It\'s a bookshelf labelled "Information."',
               '<32>{#p/human}* (You pick out a book...)',
               '<32>{#p/narrator}* "The OuterNet is a joint effort by the king and the royal scientist."',
               '<32>* "...well, mostly the royal scientist, since the king just wrote the welcome message."',
               '<32>* "Still, the website serves as a \'virtual town square\' for outpost residents."',
               '<32>* "All you have to do to create an account is..."',
               '<32>* "Um... well..."',
               "<32>* \"Alphys's instructions weren't exactly 'clear...'\"",
               '<32>{#p/human}* (You put the book back on the shelf.)'
            ],
            [
               '<32>{#p/narrator}* It\'s a bookshelf labelled "Information."',
               '<32>{#p/human}* (You pick out a book...)',
               '<32>{#p/narrator}* "If you wanna get around on the outpost, the traveler is your best bet."',
               '<32>* "That fella can take you anywhere you wanna go..."',
               '<32>* "...given they\'re available at your nearest taxi stop."',
               '<32>* "Not gonna lie, the stuff they says is kinda... out of place..."',
               '<32>* "Um, if you get what I mean."',
               '<32>{#p/human}* (You put the book back on the shelf.)'
            ],
            [
               '<32>{#p/narrator}* It\'s a bookshelf labelled "Information."',
               '<32>{#p/human}* (You pick out a book...)',
               '<32>{#p/narrator}* "Monsters are free to traverse any area of the outpost."',
               '<32>* "That is, any area apart from Archive Six."',
               '<32>* "Archive Six is out of bounds."',
               '<32>* "You must not enter Archive Six under any circumstances."',
               '<32>{#p/human}* (You put the book back on the shelf.)'
            ]
         ),
         s_librarby_ladder: [ "<32>{#p/narrator}* A random ladder.\n* That's all there is to it." ],
         s_librarby_pinkBooks: pager.create(
            'sequence',
            [
               '<32>{#p/narrator}* It\'s a bookshelf labelled "Monster Biology."',
               '<32>{#p/human}* (You pick out a book...)',
               '<32>{#p/narrator}* "Monster funerals, technically speaking, are cool as heck."',
               '<32>* "When monsters get old and kick the bucket, they turn into dust."',
               '<32>* "At funerals, we take that dust and spread it on that person\'s favorite thing."',
               '<32>* "Then their essence will live on in that thing..."',
               '<32>* "Uhhh, am I at the page minimum yet?"\n* "I\'m tired of writing this."',
               '<32>{#p/human}* (You put the book back on the shelf.)'
            ],
            [
               '<32>{#p/narrator}* It\'s a bookshelf labelled "Monster Biology."',
               '<32>{#p/human}* (You pick out a book...)',
               '<32>{#p/narrator}* "Because they are made of magic, monsters\' bodies are attuned to their SOUL."',
               '<32>* "If a monster doesn\'t want to fight, its defenses will weaken."',
               '<32>* "The crueller the intentions of our enemies, the more their attacks will hurt us."',
               '<32>* "Therefore, if a being with a powerful SOUL struck with the desire to kill..."',
               '<32>* ...',
               '<32>* You feel it would be best to stop here.',
               '<32>{#p/human}* (You put the book back on the shelf.)'
            ],
            [
               '<32>{#p/narrator}* It\'s a bookshelf labelled "Monster Biology."',
               '<32>{#p/human}* (You pick out a book...)',
               '<32>{#p/narrator}* "While monsters are mostly made of magic, humans are mostly made of water."',
               '<32>* "With their physical forms, humans are far stronger than us."',
               '<32>* "But, they will never know the joy of expressing themselves through magic."',
               '<32>* "They\'ll never get a bullet- pattern birthday card..."',
               '<32>* "Or play hide-and-go seek with invisibility and clairvoyance..."',
               '<32>* "Or even create wild light shows with electricity magic!"',
               '<32>* "Such a shame for them."',
               '<32>{#p/human}* (You put the book back on the shelf.)'
            ]
         ),
         s_librarby_purpleBooks: pager.create(
            'sequence',
            [
               '<32>{#p/narrator}* This bookshelf is labelled "Homeworld History."',
               '<32>{#p/human}* (You pick out a book...)',
               '<32>{#p/narrator}* "Each day on our homeworld was a sight to behold."',
               '<32>* "To start the morning, bright spires of magical energy pierced the skies."',
               '<32>* "Throughout the day, these magical formations began to resonate together..."',
               '<32>* "All leading to a dazzling release that sent the planet into darkness."',
               '<32>* "At nightfall, the process of magical coalescense would begin anew."',
               '<32>* "Bolts of magical energy previously released struck back down from above."',
               '<32>* "Once enough energy hit the ground, the spires would rise again..."',
               '<32>* "Such was the cycle that once governed our days and nights."',
               '<32>{#p/human}* (You put the book back on the shelf.)'
            ],
            [
               '<32>{#p/narrator}* This bookshelf is labelled "Homeworld History."',
               '<32>{#p/human}* (You pick out a book...)',
               '<32>{#p/narrator}* "Monsters didn\'t always have kings and a kingdom, you know?"',
               '<32>* "Long, long ago... thousands of years ago, in fact..."',
               '<32>* "Our race frolicked wild and free, with no sense of order or direction."',
               '<32>* "Heck, we didn\'t even wear clothing back then!"',
               '<32>* "But as timed passed, we yearned for more."\n"We wanted to evolve..."',
               '<32>* "During the great renaissance, even the very essence of our magic came into focus."',
               '<32>* "These developments begat our society, and eventually, our kingdom."',
               '<32>* "...I still can\'t believe we just ran around naked for two thousand years."',
               '<32>* "Where\'s the class in that?"\n* "Where\'s the fashion?"\n* "Unbelievable."',
               '<32>{#p/human}* (You put the book back on the shelf.)'
            ],
            [
               '<32>{#p/narrator}* This bookshelf is labelled "Homeworld History."',
               '<32>{#p/human}* (You pick out a book...)',
               '<32>{#p/narrator}* "When monsterkind first met with humanity, Erogot was the king at the time."',
               '<32>* "Through his wisdom and guidance, monsters and humans lived in peace and harmony."',
               '<32>* "But when Erogot died of old age... things would never be the same."',
               '<32>* "The humans had grown accustomed to him, and his son could never replace him."',
               '<32>* "The war that followed was... sadly inevitable."',
               '<32>{#p/human}* (You put the book back on the shelf.)'
            ]
         ),
         s_librarby_yellowBooks: pager.create(
            'sequence',
            [
               '<32>{#p/narrator}* This bookshelf is labelled "Monster Technology."',
               '<32>{#p/human}* (You pick out a book...)',
               '<32>{#p/narrator}* "Gerson says the outpost used to just be a small space station."',
               '<32>* "Then, one day, someone looked at the force field and thought..."',
               "<32>* \"'Couldn't WE harvest some of that energy?'\"",
               '<32>* "A simple but brilliant idea!"',
               '<32>* "As a result, the CORE was built, and with it came a stable power supply."',
               '<32>* "We\'re still using it to this very day!"',
               '<32>{#p/human}* (You put the book back on the shelf.)'
            ],
            [
               '<32>{#p/narrator}* This bookshelf is labelled "Monster Technology."',
               '<32>{#p/human}* (You pick out a book...)',
               '<32>{#p/narrator}* "Ah, the wonders of artificial intelligence..."',
               '<32>* "...or not."',
               '<32>* "After the builder bot tragedy of 246X, we abandoned the idea of creating a sentient AI."',
               '<32>* "In fact, the king and queen barred anyone from creating new AI programs altogether."',
               '<32>* "These days, there\'s only one monster who\'d have the skills and resources to do so..."',
               '<32>* "...but she\'s too busy with her sci-fi for THAT."',
               '<32>{#p/human}* (You put the book back on the shelf.)'
            ],
            [
               '<32>{#p/narrator}* This bookshelf is labelled "Monster Technology."',
               '<32>{#p/human}* (You pick out a book...)',
               '<32>{#p/narrator}* "Something people forget is that there\'s little to no gravity in space."',
               '<32>* "One of the earliest advancements made by monsters, even before the war..."',
               '<32>* "Was our state-of-the-art gravity manipulation tech."',
               '<32>* "Even now, it\'s built into all areas of the outpost, both big and small..."',
               '<32>* "You, reading this book, are standing on it right now."',
               '<32>{#p/human}* (You put the book back on the shelf.)'
            ]
         ),
         s_math_sign: [ '<32>{#p/narrator}* "Warning: Dog Justice"' ],
         s_pacing_sign: [ '<32>{#p/narrator}* "AWARE OF DOG"\n* "...pleas pet dog..."' ],
         s_phonecard: [
            "<32>{#p/narrator}* It's a note.",
            '<32>* "Call me!"\n* "Here\'s my number!"',
            '<32>* ...',
            '<32>{#s/phone}{#p/event}* Dialing...',
            '<32>{#p/human}* (No response.)'
         ],
         s_pr_papbed: pager.create(
            'limit',
            () => [
               '<32>{#p/narrator}* A neatly-made racecar bed.',
               ...(save.data.n.plot_date < 1 && save.data.n.state_starton_papyrus === 0
                  ? [
                       "<18>{#p/papyrus}THAT'S MY BED!",
                       '<18>{#f/4}IF I EVER GET TO THE OUTSIDE...',
                       "<18>{#f/0}I'D LIKE TO CRUISE DOWN A LONG INTER- STELLAR HIGHWAY.",
                       '<18>STATIC IN MY HAIR, STARLIGHT ON MY SKIN...',
                       "<18>{#f/4}OF COURSE, THAT'S JUST A DREAM.",
                       '<18>{#f/0}SO INSTEAD I CRUISE WHILE I SNOOZE.'
                    ]
                  : [])
            ],
            [ '<32>{#p/narrator}* A neatly-made racecar bed.' ]
         ),
         s_pr_papbones: pager.create(
            'limit',
            () => [
               '<32>{#p/narrator}* A box of bones.',
               ...(save.data.n.plot_date < 1 && save.data.n.state_starton_papyrus === 0
                  ? world.population === 0 && !world.bullied
                     ? [
                          '<18>{#p/papyrus}{#f/4}IF I EVER DO BATTLE WITH A HUMAN...',
                          '<18>{#f/0}THAT BOX OF BONE ATTACKS WILL GO A LONG WAY!'
                       ]
                     : [
                          '<18>{#p/papyrus}HEY, THOSE ARE ALL THE ATTACKS I USED ON YOU.',
                          '<18>GREAT MEMORIES, HUH?',
                          '<18>SEEMS LIKE IT WAS ONLY YESTERDAY...',
                          '<18>{#f/4}EVEN THOUGH IT BASICALLY JUST HAPPENED.'
                       ]
                  : [])
            ],
            [ '<32>{#p/narrator}* A box of bones.' ]
         ),
         s_pr_papcloset: pager.create(
            'limit',
            () =>
               save.data.b.papyrus_secret
                  ? [
                       '<32>{#p/human}* (You look inside the closet...)',
                       '<32>{#p/narrator}* ...',
                       "<32>* Better not tell Asriel who's in here."
                    ]
                  : [
                       ...(save.data.n.plot_date < 1
                          ? [
                               "<18>{#p/papyrus}DON'T WORRY, THE CLOSET IS SKELETON-FREE.",
                               "<18>{#f/4}UNLESS I'M CHANGING, OF COURSE."
                            ]
                          : []),
                       '<32>{#p/human}* (You look inside the closet...)',
                       '<32>{#p/narrator}* Clothes are hung up neatly inside.',
                       '<32>* Many of the clothes have handwritten text drawn on them.'
                    ],
            () =>
               save.data.b.papyrus_secret
                  ? [
                       '<32>{#p/human}* (You look inside the closet...)',
                       '<32>{#p/narrator}* ...',
                       "<32>* Better not tell Asriel who's in here.",
                       ...(save.flag.n.ga_asrielSus1++ < 1
                          ? [ "<25>{#p/asriel2}{#f/10}* What's so interesting about the closet...?" ]
                          : [])
                    ]
                  : [
                       '<32>{#p/human}* (You look inside the closet...)',
                       '<32>{#p/narrator}* Clothes are hung up neatly inside.',
                       '<32>* Many of the clothes have handwritten text drawn on them.'
                    ]
         ),
         s_pr_papposter: pager.create(
            'limit',
            () => [
               "<32>{#p/narrator}* It's a flag with a menacing skull painted on it.",
               ...(save.data.n.plot_date < 1 && save.data.n.state_starton_papyrus === 0
                  ? [
                       "<18>{#p/papyrus}ISN'T THAT POSTER NEATO?",
                       '<18>UNDYNE FOUND IT ON A TRASH RUN.',
                       '<18>{#f/4}IT HAD A SKULL AND CROSSBONES ON IT AT FIRST...',
                       '<18>{#f/9}BUT I THOUGHT OF SOMETHING BETTER!'
                    ]
                  : [])
            ],
            [ "<32>{#p/narrator}* It's a flag with a menacing skull painted on it." ]
         ),
         s_pr_paptable: pager.create(
            'limit',
            () => [
               '<32>{#p/narrator}* A set of action figures with tacky, matching uniforms.',
               ...(save.data.n.plot_date < 1 && save.data.n.state_starton_papyrus === 0
                  ? [
                       '<18>{#p/papyrus}AH, YES, ACTION FIGURES.',
                       '<18>A GREAT REFERENCE FOR THEORETICAL BATTLE SCENARIOS.',
                       '<18>{#f/4}BUT HOW DO I HAVE SO MANY?',
                       '<18>{#f/6}WELL, UMM...\nTHE KING GAVE THEM TO ME AS A GIFT...',
                       '<18>{#f/5}A GIFT I TRULY WISH I COULD REPAY HIM FOR.'
                    ]
                  : [])
            ],
            [ '<32>{#p/narrator}* A set of action figures with tacky, matching uniforms.' ]
         ),
         s_puzzle1_sign: [ '<32>{#p/narrator}* Trigger each circuit in order.\n* Start at the top left.' ],
         s_puzzle2_sign: [ '<32>{#p/narrator}* Each circuit displays a map of where to go next.\n* Start at the left.' ],
         s_puzzle3_note: [
            "<32>{#p/narrator}* It's a note from Papyrus...",
            '<23>{#p/papyrus}{#f/30}"HUMAN!! THIS PUZZLE IS NOT AS IT SEEMS."',
            '<23>"WHILE I WAS WAITING FOR YOU, I TRIED TO MODIFY IT..."',
            '<23>"TO MAKE THE PATTERN RESEMBLE MY FACE, OF COURSE!"',
            '<23>"BUT SOMETHING WENT WRONG..."',
            '<23>"NOW, THE SOLUTION IS ENTIRELY RANDOM!!!"',
            '<23>"(IN OTHER WORDS, YOU WILL HAVE TO SOLVE IT YOURSELF.)"',
            '<23>"BUT DON\'T WORRY!"\n"I KNOW YOU CAN DO IT, HUMAN!"',
            '<23>µ - "WITH THE UTMOST FAITH,"\nµ PAPYRUS'
         ],
         s_redbook: [
            "<32>{#p/narrator}* It's a bookshelf.",
            '<32>{#p/human}* (You pick out the red book...)',
            '<32>{#p/narrator}* "Was it worth it?"',
            '<32>* "Was it really worth all that killing, just to read these few sacred pages of text?"',
            '<32>* "...either that, or the newspaper lady finally went on break."',
            '<32>* "Could be either or, really."',
            '<32>{#p/human}* (You put the book back on the shelf.)'
         ],
         s_sansbox: () => [
            "<32>{#p/narrator}* It's a mailbox overflowing with unread junk mail.",
            ...(save.data.b.oops ? [] : [ '<32>{#p/narrator}* Yeah, Sans never reads mail.' ])
         ],
         s_sheddoor: [ "<32>{#p/narrator}* It's locked from the inside." ],
         s_slew: [ "<32>{#p/narrator}* It's a dog food bowl.\n* The pieces look like bones." ],
         s_spagnote: [
            "<32>{#p/narrator}* It's a note from Papyrus...",
            '<23>{#p/papyrus}{#f/30}"HUMAN!!"\n"PLEASE ENJOY THIS SPAGHETTI."',
            '<23>("LITTLE DO YOU KNOW, THIS SPAGHETTI IS A TRAP...")',
            '<23>("DESIGNED TO ENTICE YOU!!!")',
            '<23>("YOU\'LL BE SO BUSY EATING IT...")',
            '<23>("THAT YOU WON\'T REALIZE THAT YOU AREN\'T PROGRESSING!!")',
            '<23>("THOROUGHLY JAPED AGAIN BY THE GREAT PAPYRUS!!!")',
            '<23>µ - "NYEH-HEH-HEH,"\nµ PAPYRUS'
         ],
         s_telescope: () => [
            '<32>{#p/narrator}* A standard-issue CITADEL long- range telescope, circa 261X.',
            ...(save.data.b.oops || save.data.b.s_state_chargazer || save.data.n.plot > 30.1
               ? [ '<32>* Stargazing in space...\n* Truly, this is some outside- the-box thinking.' ]
               : ((save.data.b.s_state_chargazer = true),
                 [
                    '<32>{#p/narrator}* ...',
                    '<32>* Heh... seeing this kind of telescope brings back memories for me.',
                    '<32>* Asriel and I... we had a telescope just like this.',
                    "<32>* Every night, we'd point it in a random direction, hoping to see something exciting.",
                    '<32>* The sad truth is, we never really did.',
                    "<32>* Yet, despite that... it didn't seem to matter to him.",
                    '<32>* He was just happy to spend his time with me.',
                    '<32>* ...',
                    '<32>{#p/human}* (You hear a sigh.)',
                    "<32>{#p/narrator}* Look... I'll be alright.",
                    "<32>* Let's just get back to what we were doing, okay?"
                 ]))
         ],
         s_town_camera1: [ "<32>{#p/narrator}* There's a camera hidden in these crystal pods..." ],
         s_trapnote: () =>
            [
               [
                  "<32>{#p/narrator}* It's a note from Papyrus...",
                  '<23>{#p/papyrus}{#f/30}"SORRY, I HAVE TO LOCK YOU IN THE GUEST ROOM UNTIL UNDYNE ARRIVES."',
                  '<23>"FEEL FREE TO MAKE YOURSELF AT HOME!!!"',
                  '<23>"REFRESHMENTS AND ACCOMODATIONS HAVE BEEN PROVIDED."',
                  '<23>µ - "NYEHFULLY YOURS,"\nµ PAPYRUS'
               ],
               [
                  "<32>{#p/narrator}* It's a note from Papyrus...",
                  '<23>{#p/papyrus}{#f/30}"PLEASE ASK BEFORE YOU ESCAPE!!!"',
                  '<23>"WHEN YOU WENT MISSING I GOT WORRIED SICK!!!"',
                  '<23>µ - "SLIGHTLY BONETROUSLED,"\nµ PAPYRUS'
               ],
               [
                  "<32>{#p/narrator}* It's a note from Papyrus...",
                  '<23>{#p/papyrus}{#f/30}"IF YOU\'RE ONLY LOOKING FOR A PLACE TO STAY..."',
                  '<23>"JUST ASK!!! YOU DON\'T NEED TO FIGHT ME!!!"',
                  '<23>µ - "YOUR HOST,"\nµ PAPYRUS'
               ]
            ][Math.min(save.data.n.state_papyrus_capture - 1, 2)],
         s_tree: pager.create(
            'limit',
            () =>
               world.dead_skeleton
                  ? [
                       '<32>{#p/narrator}* This innocent tree-like structure is actually the home of a civilization.',
                       '<32>* ...at least it was, until they were all scared off and ran away.'
                    ]
                  : [
                       '<32>{#p/narrator}* This innocent tree-like structure is actually the home of a civilization.',
                       '<32>* On the brink of extinction, they migrated here to save their species.'
                    ],
            () =>
               world.dead_skeleton
                  ? [ '<32>{#p/narrator}* ...' ]
                  : [ "<32>{#p/narrator}* Pro tip.\n* Don't shake the tree." ]
         ),
         doginfo: () =>
            save.data.b.oops
               ? [ '<32>{#p/narrator}* Inside is a half-empty bottle of blue fur dye.' ]
               : [ "<32>{#p/narrator}* Inside is a bottle of blue fur dye. It's half-full." ]
      },
      truetext: {
         doggo1: [ '<32>{#p/narrator}* That dog needs a therapist.' ],
         doggo2: [ "<32>{#p/narrator}* Fetch, huh?\n* Now we're getting places." ],
         dogs1: [ '<32>{#p/narrator}* The things we do for the good of the dogs.' ],
         dogs2: [ '<32>{#p/narrator}* The rusty spanner strikes again.' ],
         fetch: () =>
            [
               [ "<32>{#p/narrator}* Fetch, huh?\n* Now we're getting places." ],
               [
                  "<32>{#p/narrator}* That's two for two on the rusty spanner method.",
                  '<32>{#p/narrator}* What else is new?'
               ],
               [ "<32>{#p/narrator}* You can't keep getting away with this." ]
            ][save.data.n.state_starton_latefetch++],
         great1: [ "<32>{#p/narrator}* It's a proven fact that little puppy kisses are the best." ],
         great2: [
            '<32>{#p/narrator}* The entire canine unit, beaten with nothing but a wrench and a strong throwing arm.',
            '<32>* The lunacy speaks for itself.'
         ],
         great3: [ '<32>{#p/narrator}* What just happened?' ],
         lesser1: [ '<32>{#p/narrator}* Mysterious words about extending necks suddenly make a lot more sense.' ],
         lesser2: [
            "<32>{#p/narrator}* That's two for two on the rusty spanner method.",
            '<32>{#p/narrator}* What else is new?'
         ],
         papyrus1: [
            '<32>{#p/narrator}* Papyrus is known for his spaghetti.',
            "<32>* What's not as well known is that he uses a human recipe to make it.",
            '<32>* Talk about knowing your target audience.'
         ],
         papyrus3: [
            '<32>{#p/narrator}* This is it.',
            "<32>* You're about to face off against the greatest monster to ever see the stars."
         ],
         papyrus4: [
            '<32>{#p/narrator}* He might as well have been waiting his whole life for this moment...',
            "<32>* If I were you, I wouldn't let it go to waste."
         ],
         papyrus5: [ "<32>{#p/narrator}* Don't be afraid.", "<32>* With any luck, you'll be best friends in no time..." ],
         puzzle1: [ '<32>{#p/narrator}* Wow.\n* You actually solved it?' ],
         sans1: [ '<32>{#p/narrator}* Oh, Papyrus...', '<32>* How I wish I was like you.' ],
         sans3: [ '<32>{#p/narrator}* You tried.' ],
         sans4: [ '<32>{#p/narrator}* Have you done this before or something?' ],
         sans5: [ '<32>{#p/narrator}* Really, Sans?\n* That "puzzle" wasn\'t even worth looking at.' ],
         sans6: [ '<32>{#p/narrator}* Really, Sans?\n* That "puzzle" was impossible.' ],
         sans7: [ '<32>{#p/narrator}* That was anti-climactic.' ],
         sans8: [ "<32>{#p/narrator}* I'm just as confused as you." ],
         sans9: [ "<32>{#p/narrator}* Aw, c'mon!\n* I wanted to see that!", '<32>* ...oh well...' ],
         papdate: [
            '<32>{#p/narrator}* So... Papyrus, huh?',
            '<32>* Somehow I knew you two would end up as friends.',
            '<32>* I wish I could tell him how much I adore him right now...',
            "<32>* But hey, you did plenty of that already, so I'll take it as a win."
         ]
      },
      vegetoid: pager.create(
         'limit',
         [
            "<32>{#p/monster}* These young people today... they don't have a modicum of patience!",
            '<32>* At their age, I was a competitive type who never gave up!'
         ],
         () =>
            world.population > 0 || world.bullied
               ? [ '<32>* At least we have Undyne.' ]
               : [ '<32>* Not unlike you, little killer.' ]
      ),
      vegetoidx: () =>
         world.bullied ? [ '<32>{#p/narrator}* ...but everybody ran.' ] : [ '<32>{#p/narrator}* ...but nobody came.' ],
      xtowerHiscoreHeader: 'Leaderboard',
      xtowerHiscoreNames: {
         kidd: 'UNDYNEFAN10',
         napstablook: 'NAPSTABLOOK22',
         papyrus: 'COOLSKELETON95',
         sans: 'lazybones.',
         undyne: 'STRONGFISH91',
         you: () => (save.data.n.plot > 48 ? 'ALPHYS2' : '(Unknown)')
      },
      xtowerMessage1: 'New High Score!',
      xtowerMessage2: 'Better luck next time...',
      xtowerSans: () =>
         world.genocide
            ? [
                 '<32>{#p/event}* Ring, ring...',
                 "<32>{#p/alphys}* So... killing him wasn't g-good enough, huh?",
                 '<32>* You just had to go and beat his score on my... stupid m-minigame...',
                 '<32>* Ehehe...',
                 "<32>* You're truly disgusting...",
                 '<32>* ...',
                 '<32>{#s/equip}{#p/human}* (You lost all of your G.)',
                 ...(world.azzie && save.flag.n.ga_asrielXtower++ < 1 ? [ '<25>{#p/asriel2}{#f/8}* Wow, rude...' ] : [])
              ]
            : [
                 '<32>{#p/event}* Ring, ring...',
                 '<25>{#p/sans}* didja seriously just put in all that effort tryna beat my score?',
                 "<25>{#f/4}* gee, kid.\n* you're even more stubborn than my bro.",
                 "<25>{#f/3}* i'd give you a special reward, but i'm on break right now.",
                 ...(edgy()
                    ? [ '<25>{#f/2}* no hard feelings.' ]
                    : [
                         "<25>{#f/2}* so instead, i'll just send ya some pocket change.",
                         '<32>{#s/equip}{#p/human}* (You got 10,000 G.)'
                      ])
              ],
      xtowerScore: 'Score: $(x)'
   },

   b_group_dogs: () =>
      world.azzie ? [ '<32>{#p/asriel2}* Dogamy and Dogaressa.' ] : [ '<32>{#p/story}* Dogi assault you!' ],
   b_group_spacetopJerry: () =>
      world.azzie
         ? [ '<32>{#p/asriel2}* Tacky hats and fickle friends.' ]
         : [ '<32>{#p/story}* Astro Serf saunters in!\n* Jerry came too.' ],
   b_group_stardrakeSpacetop: () =>
      world.azzie
         ? [ '<32>{#p/asriel2}* The teenage idiot squad.' ]
         : save.data.b.s_state_chilldrake
         ? [ '<32>{#p/story}* Chilldrake and Astro Serf pose like bad guys.' ]
         : [ '<32>{#p/story}* Stardrake and Astro Serf pose like bad guys.' ],
   b_group_stardrakeSpacetop2a: () =>
      world.azzie
         ? [ '<32>{#p/asriel2}* One left.' ]
         : save.data.b.s_state_chilldrake
         ? [ '<32>{#p/story}* Chilldrake remains steady.' ]
         : [ '<32>{#p/story}* Stardrake remains steady.' ],
   b_group_stardrakeSpacetop2b: () =>
      world.azzie ? [ '<32>{#p/asriel2}* One left.' ] : [ '<32>{#p/story}* Astro Serf remains steady.' ],
   b_group_stardrakeSpacetop2c: () =>
      world.azzie ? [ '<32>{#p/asriel2}* One left.' ] : [ '<32>{#p/story}* Just Astro now.' ],
   b_group_stardrakeSpacetop2d: () => (world.azzie ? [ '<32>{#p/asriel2}* Jerry.' ] : [ '<32>{#p/story}* Jerry.' ]),
   b_group_stardrakeSpacetopJerry: () =>
      world.azzie
         ? [ '<32>{#p/asriel2}* The teenage idiot squad.\n* Also, Jerry.' ]
         : save.data.b.spared_jerry
         ? [ '<32>{#p/story}* Jerry and friends appear!' ]
         : save.data.b.s_state_chilldrake
         ? [ '<32>{#p/story}* Astro Serf and Chilldrake confront you, sighing.\n* Jerry.' ]
         : [ '<32>{#p/story}* Astro Serf and Stardrake confront you, sighing.\n* Jerry.' ],
   b_group_stardrakeSpacetopJerry2a: () =>
      world.azzie
         ? [ '<32>{#p/asriel2}* Two left.' ]
         : save.data.b.s_state_chilldrake
         ? [ '<32>{#p/story}* Astro Serf and Chilldrake remain steady.' ]
         : [ '<32>{#p/story}* Astro Serf and Stardrake remain steady.' ],
   b_group_stardrakeSpacetopJerry2b: () =>
      world.azzie ? [ '<32>{#p/asriel2}* Two left.' ] : [ '<32>{#p/story}* Astro Serf remains steady.\n* Jerry.' ],
   b_group_stardrakeSpacetopJerry2c: () =>
      world.azzie
         ? [ '<32>{#p/asriel2}* Two left.' ]
         : save.data.b.s_state_chilldrake
         ? save.data.b.spared_jerry
            ? [ '<32>{#p/story}* Chilldrake and Jerry remain steady!' ]
            : [ '<32>{#p/story}* Chilldrake remains steady.\n* Jerry.' ]
         : save.data.b.spared_jerry
         ? [ '<32>{#p/story}* Stardrake and Jerry remain steady!' ]
         : [ '<32>{#p/story}* Stardrake remains steady.\n* Jerry.' ],

   b_opponent_stardrake: {
      act_check: () =>
         world.azzie
            ? save.data.b.s_state_chilldrake
               ? [
                    '<32>{#p/asriel2}* Chilldrake, the teen rebel.\n* Nothing more pointless than a rebel without a cause.'
                 ]
               : [ '<32>{#p/asriel2}* Stardrake, the comedian.\n* Should have stayed at home...' ]
            : save.data.b.s_state_chilldrake
            ? [
                 '<32>{#p/story}* CHILLDRAKE - ATK 12 DEF 7\n* Rebels against everything!!\n* Looking for its friend Starry.'
              ]
            : [ '<32>{#p/story}* STARDRAKE - ATK 12 DEF 7\n* This teen comedian fights to keep a captive audience.' ],
      act_flirt: () => [ '<32>{#p/narrator}* You make a flirtatious joke.' ],
      flirtTalk1: [ "<08>{~}You're weird." ],
      genoStatus: () =>
         save.data.b.s_state_chilldrake ? [ '<32>{#p/asriel2}* Chilldrake.' ] : [ '<32>{#p/asriel2}* Stardrake.' ],
      heckleStatus: () =>
         world.azzie
            ? save.data.b.s_state_chilldrake
               ? [ '<32>{#p/asriel2}* Chilldrake.' ]
               : [ '<32>{#p/asriel2}* Stardrake.' ]
            : save.data.b.s_state_chilldrake
            ? [ '<32>{#p/story}* Chilldrake is puffed up...' ]
            : [ '<32>{#p/story}* Stardrake is puffed up...' ],
      heckleTalk1: () =>
         save.data.b.s_state_chilldrake ? [ '<08>{~}No!!\nThis is the way!' ] : [ "<08>{~}THIS won't be funny either!" ],
      heckleTalk2: () =>
         save.data.b.s_state_chilldrake ? [ '<08>{~}Filthy law- obider.' ] : [ '<08>{~}Is your flesh rotten as you?' ],
      heckleTalk3: () =>
         save.data.b.s_state_chilldrake ? [ "<08>{~}Defiance can't be defied!" ] : [ '<08>{~}(Insults towards humans)' ],
      heckleText1: () =>
         save.data.b.s_state_chilldrake
            ? [ '<32>{#p/narrator}* You denounce the Chilldrake for its cause.' ]
            : [ '<32>{#p/narrator}* You boo the Stardrake.' ],
      heckleText2: () =>
         save.data.b.s_state_chilldrake
            ? [ '<32>{#p/narrator}* You tell the Chilldrake that they should be a rebel somewhere else.' ]
            : [ "<32>{#p/narrator}* You tell the Stardrake that they aren't funny." ],
      heckleText3: () =>
         save.data.b.s_state_chilldrake
            ? [
                 '<32>{#p/narrator}* You mock the Chilldrake for protesting out in the middle of nowhere.',
                 '<32>* They take your mockery as advice, and saunter off to town...'
              ]
            : [
                 '<32>{#p/narrator}* You tell the Stardrake that no one will ever love them the way they are...',
                 '<32>* They struggle to make a retort, and slink away utterly crushed...'
              ],
      hurtStatus: () =>
         world.azzie
            ? [ '<32>{#p/asriel2}* Almost dead.' ]
            : save.data.b.s_state_chilldrake
            ? [ '<32>{#p/story}* Chilldrake is flaking apart.' ]
            : [ '<32>{#p/story}* Stardrake is flaking apart.' ],
      idleTalk1: () =>
         save.data.b.s_state_chilldrake
            ? [ '<08>{~}Brush my teeth?\nNo way in heck!' ]
            : [ '<08>{~}Try not to get "spaced" out..' ],
      idleTalk2: () =>
         save.data.b.s_state_chilldrake
            ? [ '<08>{~}No bedtime for this bird!' ]
            : [ '<08>{~}I\'m just in my moon pun "phase"' ],
      idleTalk3: () =>
         save.data.b.s_state_chilldrake
            ? [ '<08>{~}Who needs parents anyway!?' ]
            : [ '<08>{~}Haven\'t seen home in "light- years.."' ],
      idleTalk4: () =>
         save.data.b.s_state_chilldrake
            ? [ '<08>{~}Live wild and free, I say!' ]
            : [ '<08>{~}Oh, it\'s on.\n"Tachy- on."' ],
      idleTalk5: () =>
         save.data.b.s_state_chilldrake
            ? [ '<08>{~}Nobody tells ME what to do!' ]
            : [ '<08>{~}Want a fight?\n"Comet" me, bro.' ],
      idleTalk6: () =>
         save.data.b.s_state_chilldrake ? [ '<08>{~}Authority be darned!' ] : [ '<08>{~}Don\'t ruin the "atmos- phere.."' ],
      idleTalk7: () =>
         save.data.b.s_state_chilldrake
            ? [ '<08>{~}Trim my claws?\nNo way in heck!' ]
            : [ '<08>{~}It\'s not free, it\'s "zero G"' ],
      jokeStatus: () =>
         save.data.b.s_state_chilldrake
            ? [ '<32>{#p/story}* Chilldrake is losing faith in its rebellion.' ]
            : [ '<32>{#p/story}* Stardrake is pleased with its "stellar" joke.' ],
      jokeTalk1: () =>
         save.data.b.s_state_chilldrake ? [ "<08>{~}You don't know my cause!" ] : [ "<08>{~}What are YOU laughin' at?!?" ],
      jokeTalk2: () =>
         save.data.b.s_state_chilldrake ? [ '<08>{~}Do you..\nreally..' ] : [ '<08>{~}See!?\nLaughs!\nMom was right!' ],
      jokeTalk3: () =>
         save.data.b.s_state_chilldrake ? [ "<08>{~}I don't think you.." ] : [ "<08>{~}Thanks, you're all great." ],
      jokeTalk4: () =>
         save.data.b.s_state_chilldrake ? [ '<08>{~}To tell you the truth..' ] : [ '<08>{~}You have good taste!!' ],
      jokeText1: () =>
         save.data.b.s_state_chilldrake
            ? [ "<32>{#p/narrator}* You agree with Chilldrake...\n* Even though it hasn't said anything... yet." ]
            : [ '<32>{#p/narrator}* You laugh at Stardrake.' ],
      jokeText2: () =>
         save.data.b.s_state_chilldrake
            ? [ '<32>{#p/narrator}* You agree with Chilldrake.' ]
            : [ "<32>{#p/narrator}* You laugh at Stardrake's pun." ],
      jokeText3: () =>
         save.data.b.s_state_chilldrake
            ? [ '<32>{#p/narrator}* You double down on your agreement with Chilldrake.' ]
            : [ "<32>{#p/narrator}* You continue to laugh at Stardrake's puns." ],
      name: () => (save.data.b.s_state_chilldrake ? '* Chilldrake' : '* Stardrake'),
      punTalk1: () =>
         save.data.b.s_state_chilldrake ? [ '<08>{~}Only Starry can do that.' ] : [ "<08>{~}Is that s'posed to be funny?" ],
      punTalk2: () => (save.data.b.s_state_chilldrake ? [ "<08>{~}You ain't Starry." ] : [ '<08>{~}Ha.. Ha..' ]),
      punTalk3: () =>
         save.data.b.s_state_chilldrake ? [ '<08>{~}Quit copying my friends.' ] : [ "<08>{~}I've heard that one." ],
      punText1: [ '<32>{#p/narrator}* You make a bad space pun.' ],
      randStatus1: () =>
         save.data.b.s_state_chilldrake
            ? [ '<32>{#p/story}* Chilldrake is wondering where Starry went.' ]
            : [ '<32>{#p/story}* Stardrake is assessing the crowd.' ],
      randStatus2: () =>
         save.data.b.s_state_chilldrake
            ? [ '<32>{#p/story}* Chilldrake is chanting an anarchist spell.' ]
            : [ '<32>{#p/story}* Stardrake is practicing its next pun.' ],
      randStatus3: () =>
         save.data.b.s_state_chilldrake
            ? [ '<32>{#p/story}* Chilldrake starts a one- monster riot.' ]
            : [ '<32>{#p/story}* Stardrake is smiling at the thought of its next pun.' ],
      randStatus4: () => [ '<32>{#p/story}* Smells like wet pillows.' ],
      randStatus5: () =>
         save.data.b.s_state_chilldrake
            ? [ '<32>{#p/story}* Smells like "anti-mainstream" body spray.' ]
            : [ '<32>{#p/story}* Stardrake sighs in relief, realizing its own name is in fact not a pun.' ],
      status1: () =>
         save.data.b.s_state_chilldrake
            ? [ '<32>{#p/story}* Chilldrake saunters up!' ]
            : [ '<32>{#p/story}* Stardrake flutters forth!' ]
   },
   b_opponent_jerry: {
      act_check: () =>
         save.data.b.spared_jerry
            ? [
                 '<32>{#p/story}* JERRY - ATK 0 DEF 30\n* A born-again monster, awakened with the power of friendship!',
                 '<32>* (Yes, you heard that right.)'
              ]
            : world.azzie
            ? [ '<32>{#p/asriel2}* Jerry, the sorry jerk.\n* A worthless piece of garbage, nothing more, nothing less.' ]
            : [ '<32>{#p/story}* JERRY - ATK 0 DEF 30\n* Everyone knows Jerry.\n* Makes attacks last longer.' ],
      act_flirt: () =>
         save.data.b.spared_jerry
            ? [ '<32>{#p/narrator}* You flirt with Jerry...', '<32>{#p/narrator}* It appreciates the compliment!' ]
            : save.data.b.oops
            ? [ '<32>{#p/narrator}* You flirt with Jerry...', '<32>{#p/narrator}* No effect.' ]
            : [ '<32>{#p/narrator}* You flirt with Jerry.', '<32>{#p/narrator}* Somehow, after just one flirt...!' ],
      ditchText1: [ '<32>{#p/story}* You ditch Jerry.' ],
      ditchText1x: () =>
         save.data.b.spared_jerry
            ? [ '<32>{#p/story}* The other monsters wish Jerry was still here...' ]
            : [ "<32>{#p/story}* The other monsters celebrate Jerry's disappearance." ],
      flirtStatus: [ "<32>{#p/story}* Jerry's redemption arc begins." ],
      flirtTalk: [ "<08>{~}I'M FREEEEE!" ],
      genoStatus: [ '<32>{#p/asriel2}* Jerry.' ],
      hurtStatus: () => (world.azzie ? [ '<32>{#p/asriel2}* Almost dead.' ] : [ '<32>{#p/story}* Jerry is wounded.' ]),
      idleTalk1: () =>
         save.data.b.spared_jerry ? [ "<08>{~}I'm so glad we're here!" ] : [ "<08>{~}Aren't you guys BORED?" ],
      idleTalk2: () =>
         save.data.b.spared_jerry ? [ '<08>{~}Can we do this more often??' ] : [ '<08>{~}Why are we doing this?' ],
      idleTalk3: () =>
         save.data.b.spared_jerry ? [ '<08>{~}Hey, you guys are the BEST!' ] : [ '<08>{~}Wow, you guys SUCK at this.' ],
      idleTalk4: () =>
         save.data.b.spared_jerry ? [ '<08>{~}Does anyone want a hug?' ] : [ '<08>{~}SHHHH!\nLet me think, guys!!' ],
      idleTalkSolo1: () => (save.data.b.spared_jerry ? [ '<08>{~}Thanks for being here!' ] : [ '<08>{~}Awkwarrd.' ]),
      idleTalkSolo2: () =>
         save.data.b.spared_jerry
            ? [ "<08>{~}You're awesome!\nJust saying." ]
            : [ '<08>{~}So like, what are you even doing?' ],
      idleTalkSolo3: () =>
         save.data.b.spared_jerry ? [ "<08>{~}Wouldn't trade ya for the world." ] : [ '<08>{~}The signal here sucks.' ],
      idleTalkSolo4: () =>
         save.data.b.spared_jerry ? [ '<08>{~}I love humans!' ] : [ '<08>{~}Must be nice being HUMAN..' ],
      name: '* Jerry',
      randStatus1: () =>
         save.data.b.spared_jerry
            ? [ '<32>{#p/story}* Jerry is living care-free.' ]
            : [ '<32>{#p/story}* Jerry eats powdery food and licks its hands proudly.' ],
      randStatus2: () =>
         save.data.b.spared_jerry
            ? [ '<32>{#p/story}* Jerry giggles from happiness.' ]
            : [ '<32>{#p/story}* Jerry sneezes without covering its nose.' ],
      randStatus3: () =>
         save.data.b.spared_jerry
            ? [ '<32>{#p/story}* Jerry lets out a squeal of excitement.' ]
            : [ '<32>{#p/story}* Jerry lets out a yawn.' ],
      randStatus4: () =>
         save.data.b.spared_jerry
            ? [ '<32>{#p/story}* Smells like....... Jerry?' ]
            : [ '<32>{#p/story}* Smells like....... Jerry.' ],
      status1: [ '<32>{#p/story}* Jerry clings to you!' ]
   },
   b_opponent_mouse: {
      act_check: () =>
         world.azzie
            ? [ "<32>{#p/asriel2}* Skweakre, the forgetful mouse.\n* Doesn't know where it's going or what it's doing." ]
            : [ '<32>{#p/story}* Skweakre - ATK 16 DEF 8\n* Hungry for directions.\n* And cheese.' ],
      act_direct: [ '<32>{#p/narrator}* You pointed Skweakre in the right direction.' ],
      act_disown: [ '<32>{#p/narrator}* You told Skweakre that it deserves to be lost out here.' ],
      act_flirt: [ '<32>{#p/narrator}* You make a flirtatious remark.' ],
      disowned: [ '<32>{#p/story}* Feeling betrayed, Skweakre gives up and runs away...' ],
      disownStatus: () =>
         world.azzie ? [ '<32>{#p/asriel2}* Skweakre.' ] : [ '<32>{#p/story}* Skweakre is on the verge of a breakdown.' ],
      disownTalk1: [ "<08>{~}I'm a goner, aren't I.." ],
      disownTalk2: [ "<08>{~}I'll never see town again.." ],
      distrusted: () => (world.azzie ? [ '<32>{#p/asriel2}* Skweakre.' ] : [ '<32>{#p/story}* Skweakre lets out a sigh.' ]),
      flirtTalk: [ '<08>{~}Uh.. okay?' ],
      genoStatus: [ '<32>{#p/asriel2}* Skweakre.' ],
      hurtStatus: () =>
         world.azzie ? [ '<32>{#p/asriel2}* Almost dead.' ] : [ '<32>{#p/story}* Skweakre is nearing demise.' ],
      idleTalk1: [ '<08>{~}How did I get here?' ],
      idleTalk2: [ '<08>{~}My cousin lives in town..' ],
      idleTalk3: [ '<08>{~}Can you help me?' ],
      idleTalk4: [ "<08>{~}I don't know what to do.." ],
      name: '* Skweakre',
      randStatus1: [ '<32>{#p/story}* Skweakre tries to re-center its sense of direction.' ],
      randStatus2: [ '<32>{#p/story}* Skweakre wishes it was somewhere else.' ],
      randStatus3: [ '<32>{#p/story}* Skweakre knows not how it has arrived at this juncture.' ],
      randStatus4: [ '<32>{#p/story}* Smells like cheese.' ],
      remindStatus: () =>
         world.azzie
            ? [ '<32>{#p/asriel2}* Skweakre.' ]
            : [ '<32>{#p/story}* Skweakre could still use a little more help.' ],
      remindTalk1: [ '<08>{~}Are you sure..?' ],
      remindTalk2: [ '<08>{~}Hmm..' ],
      safeStatus: () =>
         world.azzie ? [ "<32>{#p/asriel2}* It's vulnerable." ] : [ '<32>{#p/story}* Skweakre is on the right path.' ],
      safeTalk1: [ "<08>{~}This isn't so bad." ],
      safeTalk2: [ "<08>{~}I'll find a way, I guess.." ],
      status1: [ '<32>{#p/story}* Skweakre straddles in!' ]
   },
   b_opponent_doggo: {
      act_check: () =>
         world.azzie
            ? [ '<32>{#p/asriel2}* Doggo, the blind dog.\n* Stand still and watch him lose his mind.' ]
            : [ '<32>{#p/story}* DOGGO - ATK 13 DEF 7\n* Easily excited by movement.\n* Hobbies include: Cuddles.' ],
      act_flirt: () => [ '<32>{#p/narrator}* You flirt with Doggo.' ],
      act_talk: [ '<32>{#p/story}* You talk to Doggo.' ],
      fetch: () => [
         '<32>{#p/narrator}* The dog ran to get it.\n* You played fetch for a while.',
         ...(world.azzie && save.flag.n.ga_asrielFetch++ < 1 ? [ '<32>{#p/asriel2}* What will that accomplish?' ] : [])
      ],
      fetchStatus: () =>
         world.azzie
            ? save.flag.n.ga_asrielFetch < 2
               ? [ '<32>{#p/asriel2}* That easy, huh?' ]
               : [ '<32>{#p/asriel2}* Doggo.' ]
            : [ '<32>{#p/story}* Doggo loves fetch!' ],
      fetchTalk: [ '<11>{~}HUH!! A FUN WRENCH APPEARS!' ],
      flirt1: [ '<11>{~}(Melts)' ],
      invisStatus: () =>
         world.azzie ? [ "<32>{#p/asriel2}* He's vulnerable." ] : [ "<32>{#p/story}* Doggo can't seem to find anything." ],
      name: '* Doggo',
      normaStatus: () =>
         world.azzie ? [ '<32>{#p/asriel2}* Doggo.' ] : [ '<32>{#p/story}* Doggo is confirming the moving object.' ],
      pet: () => [
         '<32>{#p/narrator}* You pet Doggo.',
         ...(world.azzie
            ? [
                 [],
                 [ '<32>{#p/asriel2}* ...more?' ],
                 [ "<32>{#p/asriel2}* I won't lie, this is kinda funny." ],
                 [ '<32>{#p/asriel2}* ...' ],
                 [ '<32>{#p/asriel2}* Do you really need to do this?' ],
                 [ '<32>{#p/asriel2}* I guess you do.' ],
                 [ '<32>{#p/asriel2}* ...' ],
                 [ '<32>{#p/asriel2}* ...' ],
                 [ '<32>{#p/asriel2}* ...' ],
                 [ '<32>{#p/asriel2}* This is getting out of hand.' ],
                 [ '<32>{#p/asriel2}* Still??' ],
                 [ '<32>{#p/asriel2}* Come on...' ],
                 [ "<32>{#p/asriel2}* Are you just trying to get him to 'wan wan' again?" ],
                 [ '<32>{#p/asriel2}* ...' ]
              ][Math.min(battler.volatile[0].vars.pet - 1, 13)]
            : [])
      ],
      petStatus: () => (world.azzie ? [ "<32>{#p/asriel2}* He's vulnerable." ] : [ '<32>{#p/story}* Doggo has been pet.' ]),
      petTalk1: [ "<11>{~}WHAT!!!\nI'VE BEEN PET!" ],
      petTalk2: [ "<11>{~}WHERE'S THAT COMING FROM!?" ],
      petTalk3: [ "<11>{~}THERE'S NO END TO IT!!" ],
      petTalk4: [ '<11>{~}WELL, THIS IS THOROUGH!!!' ],
      petTalk5: [ '<11>{~}(Dies)' ],
      petTalk6: [ '<11>{~}(Comes back to life)' ],
      petTalk7: [ '<11>{~}IT JUST KEEPS COMING!' ],
      petTalk8: [ '<11>{~}AND COMING!!' ],
      petTalk9: [ '<11>{~}AND COMINGGGG!!!' ],
      petTalk10: [ "<11>{~}OK.\nThat's enough." ],
      petTalk11: [ '<11>{~}I said "that\'s enough!"' ],
      petTalk12: [ "<11>{~}Oh my, it just doesn't stop!" ],
      petTalk13: [ "<11>{~}OH MY, IT REALLY DOESN'T STOP!!" ],
      petTalk14: [ '<11>{~}AHHHHHHH!!!' ],
      query1: [ "<11>{~}Don't move an inch!" ],
      query2: [ "<11>{*}{~}It moved!! It didn't NOT move!!{^30}{%}" ],
      query3: [ '<11>{~}Will it move this time?' ],
      status1: () => (world.azzie ? [ '<32>{#p/asriel2}* Doggo.' ] : [ '<32>{#p/story}* Doggo blocks the way!' ]),
      sussy: () =>
         world.azzie ? [ '<32>{#p/asriel2}* Doggo.' ] : [ '<32>{#p/narrator}* Doggo is too suspicious of your actions.' ],
      talk1: [ "<11>{~}HUH?? WHO'S THERE?" ],
      talk2: [ '<11>{~}WHO SAID THAT??' ],
      talk3: [ '<11>{~}MYSTERIOUS VOICES ALL AROUND ME!' ]
   },
   b_opponent_lesserdog: {
      act_check: () =>
         world.azzie
            ? [ "<32>{#p/asriel2}* Canis Minor, the ignorant dog.\n* Really doesn't know what's going on." ]
            : [ '<32>{#p/story}* CANIS MINOR - ATK 12 DEF 2\n* Wields a shiny dogger made of fido-nium.' ],
      act_flirt: () => [ '<32>{#p/story}* You flirtatiously pet Canis Minor.' ],
      act_talk: () => [
         '<32>{#p/story}* You send a message to Canis Minor by petting it in morse code.',
         ...(world.azzie ? [ '<32>{#p/asriel2}* What.' ] : [])
      ],
      fetch: () => [
         '<32>{#p/narrator}* The dog ran to get it.\n* You played fetch for a while.',
         ...(world.azzie && save.flag.n.ga_asrielFetch++ < 1 ? [ '<32>{#p/asriel2}* What will that accomplish?' ] : [])
      ],
      fetchStatus: () =>
         world.azzie
            ? save.flag.n.ga_asrielFetch < 2
               ? [ '<32>{#p/asriel2}* How is this working.' ]
               : save.flag.n.ga_asrielFetch < 3
               ? [ '<32>{#p/asriel2}* How does this keep working.' ]
               : [ '<32>{#p/asriel2}* Canis Minor.' ]
            : [ '<32>{#p/story}* Canis Minor loves fetch!' ],
      fetchTalk: [ '<11>{~}(Pants fast)' ],
      hurtStatus: () =>
         world.azzie
            ? [ '<32>{#p/asriel2}* Almost dead.' ]
            : [ '<32>{#p/story}* Canis Minor tucks its tail between its legs.' ],
      name: '* Canis Minor',
      petTalk1: [ '<11>{~}(Pant pant)' ],
      petTalk2: [ '<11>{~}(Tiny bark)' ],
      petTalk3: [ '<11>{~}(Wag wag)' ],
      petTalk4: [ '<11>{~}(Thinks of food)' ],
      petTalk5: [ '<11>{~}(Pant! Pant!)' ],
      petTalk6: [ '<11>{~}(Excited noises)' ],
      petTalk7: [ '<11>{~}(Motor revving)' ],
      petTalk8: [ '<11>{~}(Plane takeoff)' ],
      petTalk9: [ '<11>{~}(Kettle whistle)' ],
      petTalk10: [ '<11>{~}(...)' ],
      petTalk11: [ '<11>{~}(Faraway bark)' ],
      petTalk12: [ '<11>{~}(Bark)' ],
      petText1: () => [ '<32>{#p/narrator}* You barely lifted your hand and the dog got excited.' ],
      petText2: () => [
         "<32>{#p/narrator}* You lightly touched the dog.\n* It's already overexcited...",
         ...(world.azzie ? [ '<32>{#p/asriel2}* Dogs do love their pets.' ] : [])
      ],
      petText3: () => [
         '<32>{#p/narrator}* You pet Canis Minor.\n* It raises its head up to meet your hand.',
         ...(world.azzie ? [ "<32>{#p/asriel2}* Okay, you've pet it.\n* There's really no reason to keep going." ] : [])
      ],
      petText4: () => [
         '<32>{#p/narrator}* You pet Canis Minor.\n* It was a good dog.',
         ...(world.azzie ? [ '<32>{#p/asriel2}* ...' ] : [])
      ],
      petText5: () => [
         '<32>{#p/narrator}* You pet Canis Minor.\n* Its excitement knows no bounds.',
         ...(world.azzie ? [ '<32>{#p/asriel2}* Golly...' ] : [])
      ],
      petText6: () => [
         '<32>{#p/narrator}* Critical pet!\n* Dog excitement increased.',
         ...(world.azzie ? [ '<32>{#p/asriel2}* ...' ] : [])
      ],
      petText7: () => [
         '<32>{#p/narrator}* You have to jump up to pet the dog.',
         ...(world.azzie ? [ "<32>{#p/asriel2}* We can't do this all day." ] : [])
      ],
      petText8: () => [
         "<32>{#p/narrator}* You don't even reach it.\n* It gets more excited.",
         ...(world.azzie ? [ '<32>{#p/asriel2}* ...' ] : [])
      ],
      petText9: () => [
         '<32>{#p/narrator}* There is no way to stop this madness.',
         ...(world.azzie ? [ '<32>{#p/asriel2}* ...' ] : [])
      ],
      petText10: () => [
         '<32>{#p/narrator}* Canis Minor enters the realm of the stars.',
         ...(world.azzie ? [ '<32>{#p/asriel2}* ...' ] : [])
      ],
      petText11: () => [
         '<32>{#p/narrator}* You call Canis Minor but it is too late.\n* It cannot hear you.',
         ...(world.azzie ? [ "<32>{#p/asriel2}* Okay, there.\n* It's totally out of reach now." ] : [])
      ],
      petText12: () => [ '<32>{#p/narrator}* ...', ...(world.azzie ? [ '<32>{#p/asriel2}* ???' ] : []) ],
      petText13: () => [
         '<32>{#p/narrator}* You can reach Canis Minor again.',
         ...(world.azzie ? [ "<32>{#p/asriel2}* You've GOT to be kidding me." ] : [])
      ],
      petText14: () => [ '<32>{#p/narrator}* You pet Canis Minor.', ...(world.azzie ? [ '<32>{#p/asriel2}* ...' ] : []) ],
      petText15: () => [
         "<32>{#p/narrator}* It's possible that you may have a problem.",
         ...(world.azzie ? [ '<32>{#p/asriel2}* ...' ] : [])
      ],
      petText16: () => [
         '<32>{#p/narrator}* Canis Minor is unpettable but appreciates the attempt.',
         ...(world.azzie ? [ '<32>{#p/asriel2}* Just stop.' ] : [])
      ],
      petText17: () => [
         '<32>{#p/narrator}* Perhaps mankind was not meant to pet this much.',
         ...(world.azzie ? [ '<32>{#p/asriel2}* Please stop.' ] : [])
      ],
      petText18: () => [ '<32>{#p/narrator}* It continues.', ...(world.azzie ? [ '<32>{#p/asriel2}* ...' ] : []) ],
      petText19: () => [
         '<32>{#p/narrator}* Canis Minor is beyond your reach.',
         ...(world.azzie ? [ "<32>{#p/asriel2}* Okay, it's over.\n* Now kill this idiot already." ] : [])
      ],
      petText20: () => [ '<32>{#p/narrator}* Really...', ...(world.azzie ? [ '<32>{#p/asriel2}* ...' ] : []) ],
      statusX: [ "<32>{#p/asriel2}* It's vulnerable." ],
      status0: () => (world.azzie ? [ '<32>{#p/asriel2}* Canis Minor.' ] : [ '<32>{#p/story}* Canis Minor appears.' ]),
      status1: () =>
         world.azzie ? [ '<32>{#p/asriel2}* Canis Minor.' ] : [ '<32>{#p/story}* Canis Minor tilts its head to one side.' ],
      status2: () =>
         world.azzie
            ? [ '<32>{#p/asriel2}* Canis Minor.' ]
            : [ '<32>{#p/story}* Canis Minor thinks your weapon is a dog treat.' ],
      status3: () =>
         world.azzie
            ? [ '<32>{#p/asriel2}* Canis Minor.' ]
            : [ '<32>{#p/story}* Canis Minor is not really paying attention.' ],
      status4: () => (world.azzie ? [ '<32>{#p/asriel2}* Canis Minor.' ] : [ '<32>{#p/story}* Smells like dog chow.' ]),
      status5: () =>
         world.azzie ? [ '<32>{#p/asriel2}* Canis Minor.' ] : [ '<32>{#p/story}* Canis Minor is barking excitedly.' ],
      status6: () =>
         world.azzie ? [ '<32>{#p/asriel2}* Canis Minor.' ] : [ '<32>{#p/story}* Canis Minor is overstimulated.' ],
      status7: () =>
         world.azzie ? [ '<32>{#p/asriel2}* Canis Minor.' ] : [ '<32>{#p/story}* Canis Minor shows no signs of stopping.' ],
      status8: () => (world.azzie ? [ '<32>{#p/asriel2}* Canis Minor.' ] : [ '<32>{#p/story}* Canis Minor is lowering.' ]),
      status9: () =>
         world.azzie ? [ '<32>{#p/asriel2}* Canis Minor.' ] : [ '<32>{#p/story}* Canis Minor learns to code.' ],
      status10: () =>
         world.azzie
            ? [ '<32>{#p/asriel2}* Canis Minor.' ]
            : [ "<32>{#p/story}* Canis Minor is whining because it can't see you." ],
      status11: () => (world.azzie ? [ '<32>{#p/asriel2}* Canis Minor.' ] : [ '<32>{#p/story}* Hello there.' ]),
      status12: () =>
         world.azzie
            ? [ '<32>{#p/asriel2}* Canis Minor.' ]
            : [ '<32>{#p/story}* Canis Minor is questioning your life choices.' ],
      status13: () =>
         world.azzie
            ? [ '<32>{#p/asriel2}* Canis Minor.' ]
            : [ '<32>{#p/story}* Canis Minor has gone where no dog has gone before.' ]
   },
   b_opponent_dogamy: {
      act_check: () =>
         world.azzie
            ? [ "<32>{#p/asriel2}* Dogamy, the pathetic dog.\n* Cool under pressure, but he's nothing without support." ]
            : [ '<32>{#p/story}* DOGAMY - ATK 14 DEF 5\n* Husband of Dogaressa.\n* Knows only what he smells.' ],
      act_talk: [ "<32>{#p/narrator}* You talk to Dogamy.\n* He can't seem to smell it..." ],
      fetchStatus: () =>
         world.azzie
            ? save.flag.n.ga_asrielFetch < 2
               ? [ '<32>{#p/asriel2}* Oh... huh.' ]
               : save.flag.n.ga_asrielFetch < 3
               ? [ '<32>{#p/asriel2}* This strategy is more potent than I thought.' ]
               : [ '<32>{#p/asriel2}* Dogamy and Dogaressa.' ]
            : [ '<32>{#p/story}* Married dogs love fetch!' ],
      fetchText: () => [
         '<32>{#p/narrator}* The dogs ran to get it.\n* You played fetch for a while.',
         ...(world.azzie && save.flag.n.ga_asrielFetch++ < 1 ? [ '<32>{#p/asriel2}* What will that accomplish?' ] : [])
      ],
      fetchTextLone: () => [
         '<32>{#p/narrator}* Dogamy ignores the spanner and lets it roll off the edge.',
         ...(world.azzie ? [ '<32>{#p/asriel2}* Saw that coming.' ] : [])
      ],
      flirtTalk1: [ '<11>{~}Ah!\nBut why...!?' ],
      flirtTalk2: [ '<11>{~}Love is in the air?' ],
      flirtTalk3: [ "<11>{~}You didn't just..." ],
      flirtTalk4: [ "<11>{~}What's the puppy doing?" ],
      flirtText: () => [ "<32>{#p/narrator}* Your... pheromones, reach Dogamy's snout." ],
      flirtTextLone: [ "<32>{#p/narrator}* Dogamy's expression is unchanged." ],
      loneStatus: () =>
         world.azzie
            ? [ '<32>{#p/asriel2}* One left.' ]
            : [ '<32>{#p/story}* Dogaressa is determined to kick human tail.' ],
      loneTalk1: [ '<11>{~}Whine.' ],
      loneTalk2: [ '<11>{~}Whimper.' ],
      loneTalk3: [ '<11>{~}Shake.' ],
      name: '* Dogamy',
      otherPet: [ '<11>{~}...' ],
      petNeedStatus: () =>
         world.azzie
            ? [ '<32>{#p/asriel2}* Dogamy and Dogaressa.' ]
            : [ '<32>{#p/story}* Dogaressa is looking for affection.' ],
      petStatus: () =>
         world.azzie
            ? [ "<32>{#p/asriel2}* They're vulnerable." ]
            : [ "<32>{#p/story}* The dogs' minds have been expanded." ],
      petTalk1: [ '<11>{~}Paws off you smelly human.' ],
      petTalk2: [ '<11>{~}Wow!!!\nPet by another pup!!!' ],
      petTalk3: [ "<11>{~}Stop!\nDon't touch her!" ],
      petTalk4: [ '<11>{~}What\nabout\nme......' ],
      petText: [ '<32>{#p/narrator}* You pet Dogamy.' ],
      petTextLone: () => [ '<32>{#p/narrator}* Dogamy cowers in fear.' ],
      randTalk1: () =>
         world.azzie ? [ '<11>{~}The prince has lost his mind...' ] : [ "<11>{~}Take my wife...\n's fleas." ],
      randTalk2: () => (world.azzie ? [ '<11>{~}You have come far...' ] : [ "<11>{~}Don't touch my hot dog." ]),
      randTalk3: () => (world.azzie ? [ "<11>{~}We'll take you down!" ] : [ "<11>{~}No. 1 Nuzzle Champs '13!!" ]),
      randTalk4: () => (world.azzie ? [ "<11>{~}You won't win this time..." ] : [ "<11>{~}Let's kick human tail!!" ]),
      resmellStatus: () =>
         world.azzie
            ? [ '<32>{#p/asriel2}* Dogamy and Dogaressa.' ]
            : [ '<32>{#p/story}* The dogs think that you may be a lost puppy.' ],
      resmellText1: () => [
         '<32>{#p/narrator}* The dogs sniff you again...',
         '<32>* But you smell just as weird as before!'
      ],
      resmellText2: () => [
         '<32>{#p/narrator}* The dogs sniff you again...',
         '<32>* After rolling in the dirt, you smell alright!'
      ],
      resmellText3: () => [ '<32>{#p/narrator}* The dogs already know you smell fine.' ],
      resmellTextLone: () => [ "<32>{#p/narrator}* Dogamy won't even lift up his snout." ],
      rollStatus: () =>
         world.azzie
            ? [ "<32>{#p/asriel2}* You're going to get your clothes dirty, $(name)." ]
            : [ '<32>{#p/story}* The dogs may want to re-smell you.' ],
      rollText: () => [
         '<32>{#p/narrator}* You playfully roll around in the dirt.',
         '<32>* Synthetic as it may be, it still gets you smelling like a weird puppy!',
         ...(world.azzie ? [ '<32>{#p/asriel2}* I have questions.' ] : [])
      ],
      rollTextLone: () => [
         "<32>{#p/narrator}* You roll around in Dogaressa's dust.",
         '<32>* Dogamy looks even more defeated than before.',
         ...(world.azzie ? [ '<32>{#p/asriel2}* ...' ] : [])
      ],
      smellTalk1: [ "<11>{~}Hm?\nWhat's that smell?" ],
      smellTalk2: [ '<11>{~}What!\nSmells like a...' ],
      status1: () =>
         world.azzie
            ? [ '<32>{#p/asriel2}* Dogamy and Dogaressa.' ]
            : [ '<32>{#p/story}* The dogs keep shifting their axes to protect each other.' ],
      status2: () =>
         world.azzie
            ? [ '<32>{#p/asriel2}* Dogamy and Dogaressa.' ]
            : [ '<32>{#p/story}* The dogs are re-evaluating your smell.' ],
      status3: () =>
         world.azzie
            ? [ '<32>{#p/asriel2}* Dogamy and Dogaressa.' ]
            : [ '<32>{#p/story}* The dogs are practicing for the next couples contest.' ],
      status4: () =>
         world.azzie
            ? [ '<32>{#p/asriel2}* Dogamy and Dogaressa.' ]
            : [ '<32>{#p/story}* The dogs are whispering sweet nothings to each other.' ],
      susText: [ "<32>{#p/narrator}* The dogs still think you're a smelly human." ],
      fetchTalk: [ '<11>{~}Fetch is so much fun!' ]
   },
   b_opponent_dogaressa: {
      act_check: () =>
         world.azzie
            ? [ '<32>{#p/asriel2}* Dogaressa, the rowdy dog.\n* Cool under pressure, but turns rabid without support.' ]
            : [ '<32>{#p/story}* DOGARESSA - ATK 14 DEF 5\n* This puppy finds her hubby lovely. SMELLS ONLY?' ],
      act_talk: [ "<32>{#p/narrator}* You talk to Dogaressa.\n* She can't seem to smell it..." ],
      fetchTextLone: () => [
         '<32>{#p/narrator}* Dogaressa takes the spanner and smashes it to bits.',
         ...(world.azzie ? [ '<32>{#p/asriel2}* Saw that coming.' ] : [])
      ],
      flirtTalk1: [ '<11>{~}(Hey! Knock it off!)' ],
      flirtTalk2: [ '<11>{~}(This just gets weirder and weirder.)' ],
      flirtTalk3: [ '<11>{~}(...flirt with me! Ugh!)' ],
      flirtTalk4: [ '<11>{~}(I think it loves me. A lot.)' ],
      flirtText: () => [ "<32>{#p/narrator}* Your... pheromones, reach Dogaressa's snout." ],
      flirtTextLone: [ "<32>{#p/narrator}* Dogaressa's expression is unchanged." ],
      loneStatus: () => (world.azzie ? [ '<32>{#p/asriel2}* One left.' ] : [ '<32>{#p/story}* Dogamy is brokenhearted.' ]),
      loneTalk1: [ '<11>{~}(Misery awaits you.)' ],
      loneTalk2: [ "<11>{~}(You'll suffer for this.)" ],
      name: '* Dogaressa',
      otherPet: [ '<11>{~}(...)' ],
      petNeedStatus: () =>
         world.azzie
            ? [ '<32>{#p/asriel2}* Dogamy and Dogaressa.' ]
            : [ '<32>{#p/story}* Dogamy is looking for affection.' ],
      petTalk1: [ "<11>{~}(That's not your husband, OK?)" ],
      petTalk2: [ "<11>{~}(Well. Don't leave me out!)" ],
      petTalk3: [ '<11>{~}(Beware of dog.)' ],
      petTalk4: [ '<11>{~}(A dog that pets dogs... Amazing!)' ],
      petText: [ '<32>{#p/narrator}* You pet Dogaressa.' ],
      petTextLone: () => [ '<32>{#p/narrator}* Dogaressa just growls at you.' ],
      randTalk1: () => (world.azzie ? [ '<11>{~}(Indeed.)' ] : [ "<12>{~}(Don't,\nactually...)" ]),
      randTalk2: () => (world.azzie ? [ '<11>{~}(Far enough.)' ] : [ '<11>{~}(He means me.)' ]),
      randTalk3: () => (world.azzie ? [ '<11>{~}(By force if necessary.)' ] : [ '<11>{~}(Of course we were first.)' ]),
      randTalk4: () => (world.azzie ? [ "<11>{~}(Time's up.)" ] : [ '<11>{~}(Do humans have tails?)' ]),
      resmellTalkLone: [ '<11>{~}(Is that what you wanted??\nHuh?)' ],
      resmellTextLone: () => [ '<32>{#p/narrator}* Dogaressa aggressively shoves her snout in your face.' ],
      rollTextLone: () => [
         "<32>{#p/narrator}* You roll around in Dogamy's dust.",
         '<32>* Dogaressa looks even angrier than before.',
         ...(world.azzie ? [ '<32>{#p/asriel2}* ...' ] : [])
      ],
      smellTalk1: [ '<11>{~}(A smell mystery...)' ],
      smellTalk2: [ '<11>{~}(Are you actually a little puppy!?)' ],
      fetchTalk: [ '<11>{~}(We love to play fetch.)' ]
   },
   b_opponent_greatdog: {
      act_check: () =>
         world.azzie
            ? [ '<32>{#p/asriel2}* Canis Major, the stupid dog.\n* The biggest and dumbest dog of the bunch.' ]
            : [ "<32>{#p/story}* CANIS MAJOR - ATK 15 DEF 8\n* It's so excited that it thinks fighting is just play." ],
      act_flirt: () => [
         '<32>{#p/narrator}* You suggestively wink.',
         '<32>* Canis Major awkwardly cocks its head to one side.'
      ],
      act_talk: [ "<32>{#p/narrator}* You try talking with Canis Major, but it doesn't seem to understand you." ],
      beckonText: [
         '<32>{#p/narrator}* You call Canis Major.',
         '<32>* It bounds towards you, flecking slobber into your face.'
      ],
      closeStatus: () =>
         world.azzie ? [ '<32>{#p/asriel2}* Canis Major.' ] : [ '<32>{#p/story}* Canis Major seeks affection.' ],
      closeText: [ "<32>{#p/narrator}* Only the dog's ears perk up.\n* Nothing else happens." ],
      doneText: [ '<32>{#p/narrator}* Canis Major decides you are too boring.' ],
      fetch: () => [
         '<32>{#p/narrator}* The dog ran to get it.\n* You played fetch for a while.',
         ...(world.azzie && save.flag.n.ga_asrielFetch++ < 1 ? [ '<32>{#p/asriel2}* What will that accomplish?' ] : [])
      ],
      fetchStatus: () =>
         world.azzie
            ? save.flag.n.ga_asrielFetch < 2
               ? [ '<32>{#p/asriel2}* I guess that works.' ]
               : save.flag.n.ga_asrielFetch < 3
               ? [ '<32>{#p/asriel2}* A simple-minded game for a simple-minded dog.' ]
               : [ '<32>{#p/asriel2}* Canis Major.' ]
            : [ '<32>{#p/story}* Canis Major loves fetch!' ],
      hurtStatus: () =>
         world.azzie ? [ '<32>{#p/asriel2}* Almost dead.' ] : [ '<32>{#p/story}* Canis Major is panting slowly.' ],
      ignoreStatus1: () =>
         world.azzie ? [ '<32>{#p/asriel2}* Canis Major.' ] : [ '<32>{#p/story}* Canis Major just wants some affection.' ],
      ignoreStatus2: () =>
         world.azzie ? [ '<32>{#p/asriel2}* Canis Major.' ] : [ '<32>{#p/story}* Canis Major is making puppy-dog eyes.' ],
      name: '* Canis Major',
      petStatus1: () =>
         world.azzie
            ? [ '<32>{#p/asriel2}* Canis Major.' ]
            : [ '<32>{#p/story}* Canis Major is patting the ground with its front paws.' ],
      petStatus2: () =>
         world.azzie ? [ '<32>{#p/asriel2}* Canis Major.' ] : [ '<32>{#p/story}* Canis Major wants some TLC.' ],
      petStatus3: () => (world.azzie ? [ '<32>{#p/asriel2}* ...' ] : [ '<32>{#p/story}* Pet capacity is 40%.' ]),
      petStatus4: () =>
         world.azzie ? [ "<32>{#p/asriel2}* It's vulnerable." ] : [ '<32>{#p/story}* Canis Major is contented.' ],
      petText0: [ '<32>{#p/narrator}* Canis Major was too far away to pet.' ],
      petText1: [
         '<32>{#p/narrator}* Canis Major curls up in your lap as it is pet by you.',
         '<32>* It gets so comfortable, that it falls asleep...',
         '<32>* Zzzzz...',
         '<32>* Zzzzz...',
         '<32>* ...',
         "<32>* Then, it wakes up!\n* It's so excited!"
      ],
      petText2: [ "<32>{#p/narrator}* Canis Major's excitement is generating a force field that prevents petting." ],
      petText3: [
         '<32>{#p/narrator}* As you pet the dog, it sinks its entire weight into you...',
         '<32>* Your movement slows.',
         "<32>* But, you still haven't pet enough...!"
      ],
      petText4: [
         '<32>{#p/narrator}* You pet decisively.\n* Pet capacity now at 100%.',
         '<32>* The dog flops over with its legs hanging in the air.'
      ],
      petText5: [ '<32>{#p/narrator}* You gave the dog a tummy rub.', '<32>* It whines in bliss...' ],
      playText1: [ '<32>{#p/narrator}* Canis Major is not excited enough to play with.' ],
      playText2: [
         '<32>{#p/narrator}* You conjour a hologram for the dog to chase after.',
         '<32>* It loses cohesion and dissipates...',
         '<32>* Canis Major collects all the residual energy in the area and brings it to you.',
         '<32>* Now the dog is very tired.\n* It rests its head on you...'
      ],
      playText3: [ '<32>{#p/narrator}* Canis Major is too tired to play.' ],
      status0: () => (world.azzie ? [ '<32>{#p/asriel2}* Canis Major.' ] : [ '<32>{#p/story}* Canis Major appears.' ]),
      status1: () =>
         world.azzie ? [ '<32>{#p/asriel2}* Canis Major.' ] : [ '<32>{#p/story}* Canis Major is watching you intently.' ],
      status2: () =>
         world.azzie
            ? [ '<32>{#p/asriel2}* Canis Major.' ]
            : [ '<32>{#p/story}* Canis Major is waiting for your command.' ],
      status3: () =>
         world.azzie ? [ '<32>{#p/asriel2}* Canis Major.' ] : [ '<32>{#p/story}* Smells like fresh-squeezed puppy juice.' ],
      waitText: [ '<32>{#p/narrator}* Canis Major inches closer.' ]
   },
   b_opponent_papyrus: {
      spanner: [ '<32>{#p/narrator}* Papyrus caught the spanner in his mouth, then returned it to you.' ],
      spannerTalk1: [ '<15>{#p/papyrus}{#f/20}WHAT A JAW- DROPPING MOVE!' ],
      spannerTalk2: [ '<15>{#p/papyrus}{#f/20}I COULD DO THIS ALL DAY!' ],
      spannerTalk3: [ '<15>{#p/papyrus}{#f/20}JUST LIKE THEY DO IT ON TV!' ],
      spannerTalk4: [ '<15>{#p/papyrus}{#f/20}NYEH HEH HEH!' ],
      sparableSpannerTalk1: [ '<15>{#p/papyrus}{#f/20}NOW, SHOW ME YOUR MERCY!' ],
      sparableSpannerTalk2: [ '<15>{#p/papyrus}{#f/20}...' ],
      bullySpareTalk: [
         '<15>{#p/papyrus}{#f/27}SAY... IS IT GETTING DARK OUT HERE?',
         "<15>{#p/papyrus}{#f/27}MAYBE ATTACKING YOU WASN'T SUCH A GREAT IDEA...",
         "<15>{#f/15}YEAH!!! I CAN TELL YOU'RE DESPERATE FOR MY MERCY!",
         '<15>{#f/20}I, THE GREAT PAPYRUS, WILL OBLIGE YOU!!',
         '<15>{#f/20}I WILL SPARE YOU, HUMAN!!!',
         '<15>{#f/27}YOU CAN ACCEPT MY MERCY NOW...'
      ],
      act_check: () =>
         world.genocide
            ? [ '<32>{#p/story}* PAPYRUS - ATK 3 DEF 3\n* Sans a brother.' ]
            : [ '<32>{#p/story}* PAPYRUS - ATK 20 DEF 20\n* Likes to say "Nyeh Heh Heh!"' ],
      capture1: [
         "<15>{#p/papyrus}{#f/20}LOOKS LIKE YOU'RE GOING TO THE CAPTURE ZONE!!",
         '<15>{#f/24}...ALSO KNOWN AS THE GARAGE.',
         '<15>{#f/20}A HEAVILY FORTIFIED GARAGE, THAT IS!',
         '<15>{#f/20}NYEH HEH HEH HEH HEH HEH HEH!!!'
      ],
      capture2: [
         '<15>{#p/papyrus}{#f/24}WELL!!! YOU MAY HAVE CLEVERLY ESCAPED BEFORE...',
         "<15>{#f/20}BUT THIS TIME, I'VE UPGRADED THE FACILITIES.",
         '<15>{#f/20}NOT ONLY WILL YOU BE STUCK...',
         "<15>{#f/15}BUT YOU WON'T EVEN WANT TO LEAVE!!!",
         '<15>{#f/20}NYEH HEH HEH HEH HEH HEH HEH!!!'
      ],
      capture3: [
         '<15>{#p/papyrus}{#f/20}YOU ARE... DETERMINED!',
         "<15>BUT!!\nIT JUST WON'T WORK ON ME!",
         '<15>I AM THE DETERMINEST!',
         '<99>{#f/24}AND IF YOU\nTHINK YOU ARE\nDETERMINESTER...',
         '<15>{#f/20}THAT IS WRONG!\nGRAMATICALLY WRONG!',
         '<15>{#f/24}BECAUSE THE CORRECT FORM WOULD BE...',
         '<15>{#f/20}NOT AS DETERMINEST AS PAPYRUS, THE DETERMINESTEST!',
         '<15>{#f/10}I HOPE YOU ENJOYED THIS LESSON.',
         '<15>{#f/20}NYEH HEH HEH HEH HEH HEH HEH!!!'
      ],
      capture4: [
         '<15>{#p/papyrus}{#f/24}ARE YOU SURE YOU CAN KEEP THIS UP?',
         '<15>{#f/21}BEING CAPTURED AGAIN MUST BE FRUSTRATING...',
         "<15>{#f/21}I DON'T WANT YOU TO GET MAD ABOUT FAILING REPEATEDLY...",
         '<15>{#f/20}PERHAPS NEXT TIME WE CAN SKIP THE BATTLE!',
         "<15>{#f/20}FOR NOW, THOUGH, IT'S OFF TO THE CAPTURE ZONE!!!",
         '<15>{#f/20}NYEH HEH HEH HEH HEH HEH HEH!!!'
      ],
      capture5: [
         '<15>{#p/papyrus}{#f/27}WOWIE... AGAIN???',
         '<15>{#f/15}WELL, IF YOU INSIST...!',
         '<15>{#f/20}NYEH HEH HEH HEH HEH HEH HEH!!!'
      ],
      checkTalk: [ '<15>{#p/papyrus}{#f/20}NYEH HEH HEH!' ],
      death1: () =>
         world.genocide
            ? [ '<15>{#p/papyrus}{#f/27}N...\nN-NO...' ]
            : [ "<15>{#p/papyrus}{#f/21}WELL, THAT'S NOT WHAT I WAS EXPECTING..." ],
      death2: () =>
         world.genocide
            ? [ '<15>{#p/papyrus}{#f/21}SANS, I...', '<15>{#f/33}{@random:1.1,1.1}I FAILED YOU...' ]
            : [ '<15>{#p/papyrus}{#f/27}...A-AT LEAST I STILL HAVE MY HEAD!' ],
      dots: [ '<32>{#p/narrator}* ...' ],
      flirt0: [ '<32>{#p/narrator}* Cute.' ],
      flirt1: [
         '<15>{#p/papyrus}{#f/20}WHAT!?\nF-F-FLIRTING!?',
         '<15>SO YOU FINALLY REVEAL YOUR {@fill:#f00}ULTIMATE FEELINGS{@fill:#000}!',
         "<15>W-WELL!\nI'M A SKELETON WITH VERY HIGH STANDARDS!!!",
         '<15>WHAT CAN YOU DO IN RETURN FOR MY AFFECTION???'
      ],
      flirt2: [
         '<32>{#p/human}* (Your reply?){!}µµµI have\nµµµµI can makeµµµµzero redeeming\nµµµµspaghettiµµµµµqualities{#c/0/4/2}'
      ],
      flirt3a: [ '<15>{#p/papyrus}{#f/24}THAT CONFIDENCE... IT REMINDS ME OF...' ],
      flirt3b: [ '<15>{#p/papyrus}{#f/24}THAT HUMILITY... IT REMINDS ME OF...' ],
      flirt4: [
         '<15>{#f/22}MYSELF!!!',
         "<15>{#f/10}YOU'RE MEETING ALL MY STANDARDS!!!",
         '<15>{#f/27}I GUESS THIS MEANS I HAVE TO GO ON A DATE WITH YOU...?'
      ],
      flirt5: [ "<15>{#p/papyrus}{#f/20}LET'S DATE L-LATER!!\nAFTER I CAPTURE YOU!" ],
      flirt6: [ "<32>{#p/narrator}* You flirt, but to no avail.\n* Seems acting won't escalate this battle..." ],
      flirt7: [ '<32>{#p/narrator}* Papyrus is too busy fighting to flirt back.' ],
      flirtStatus1: [ '<32>{#p/story}* Papyrus is thinking about what to wear for his date.' ],
      flirtStatus2: [ '<32>{#p/story}* Papyrus dabs some Bone Cologne behind his ear.' ],
      flirtStatus3: [ '<32>{#p/story}* Papyrus is thinking about what to cook for his date.' ],
      flirtStatus4: [ '<32>{#p/story}* Papyrus dabs marinara sauce behind his ear.' ],
      flirtStatus5: [ '<32>{#p/story}* Papyrus is thinking about sexy rectangles.' ],
      flirtStatus6: [ '<32>{#p/story}* Papyrus dabs MTT-brand Bishie Cream behind his ear.' ],
      flirtStatus7: [ '<32>{#p/story}* Papyrus dabs MTT-brand Anime Powder behind his ear.' ],
      flirtStatus8: [ '<32>{#p/story}* Papyrus dabs MTT-brand Cute Juice behind his ear.' ],
      flirtStatus9: [ "<32>{#p/story}* Papyrus realizes he doesn't have ears." ],
      flirtStatus10: [ '<32>{#p/story}* Papyrus has random lumps of ointment on his head.' ],
      flirtStatus11: [ "<32>{#p/story}* ...he's still thinking about sexy rectangles." ],
      hurtStatus: [ '<32>{#p/story}* Papyrus is at the edge of defeat.' ],
      insult1: [ '<15>{#p/papyrus}{#f/20}HOW SELFLESS...', '<15>YOU WANT ME TO FEEL BETTER ABOUT FIGHTING YOU...' ],
      insult2: [ "<15>{#p/papyrus}{#f/20}THERE'S NO NEED TO LIE TO YOURSELF!!!" ],
      insult3: [ "<32>{#p/narrator}* You insult, but to no avail.\n* Seems acting won't escalate this battle..." ],
      insult4: [ '<32>{#p/narrator}* Papyrus is too busy fighting to accept your insult.' ],
      name: '* Papyrus',
      randomStatus1: [ '<32>{#p/story}* Papyrus readies a bone attack.' ],
      randomStatus2: [ '<32>{#p/story}* Papyrus prepares a non-bone attack then spends a minute fixing his mistake.' ],
      randomStatus3: [ '<32>{#p/story}* Papyrus is cooking.' ],
      randomStatus4: [ '<32>{#p/story}* Papyrus whispers "Nyeh heh heh!"' ],
      randomStatus5: [ '<32>{#p/story}* Papyrus is rattling his bones.' ],
      randomStatus6: [ '<32>{#p/story}* Papyrus is trying hard to play it cool.' ],
      randomStatus7: [ '<32>{#p/story}* Papyrus is considering his options.' ],
      randomStatus8: [ '<32>{#p/story}* Smells like bones.' ],
      randomStatus9: [ '<32>{#p/story}* Papyrus remembered a good joke Sans told and is smiling.' ],
      spaghetti1: () => [
         '<15>{#p/papyrus}{#f/12}MY SPAGHETTI!',
         "<15>{#p/papyrus}{#f/13}AND YOU LOOK LIKE YOU'RE ENJOYING IT...",
         [
            '<15>{#p/papyrus}{#f/27}WELL THEN!\nI LOOK FORWARD TO OUR MEAL TOGETHER LATER!',
            '<15>{#p/papyrus}{#f/27}WELL THEN!\nI LOOK FORWARD TO MAKING SOME MORE FOR YOU!'
         ][(save.data.n.state_papyrus_spaghet + 1) % 2]
      ],
      spaghetti2: [ "<32>{#p/narrator}* If Papyrus wasn't so busy fighting, he might've noticed that." ],
      specialStatus1: [ '<32>{#p/story}* Special attack.' ],
      specialStatus2: [ '<32>{#p/story}* Papyrus is going all out.' ],
      specialStatus3: [ '<32>{#p/story}* Papyrus has thrown all logic out the window.' ],
      specialStatus4: [ '<32>{#p/story}* Papyrus notices the lack of logic and brings it back inside.' ],
      specialStatus5: [ '<32>{#p/story}* Papyrus is sweating.' ],
      specialStatus6: [ "<32>{#p/story}* Papyrus is at his wit's end." ],
      status1: [ '<32>{#p/story}* Papyrus is sparing you.' ],
      status2: [ '<32>{#p/story}* Papyrus blocks the way!' ],
      talk1: [
         '<15>{#p/papyrus}{#f/20}{#f/24}YOU WANT TO TALK...?',
         "<15>{#f/24}WELL, I'M AFRAID THE TIME FOR TALKING HAS PASSED!!"
      ],
      talk1x: [
         "<32>{#p/narrator}* If you're looking for my help, then forget about it.",
         '<32>* Papyrus has been waiting his whole life for this moment.'
      ],
      talk2: [ '<15>{#p/papyrus}{#f/20}HOW ABOUT WE TALK SOME OTHER TIME!?' ],
      talk3: [ "<32>{#p/narrator}* You talk, but to no avail.\n* Seems acting won't escalate this battle..." ],
      talk4: [ '<32>{#p/narrator}* Papyrus is too busy FIGHTing to talk to you.' ],
      turnTalk0a: [ "<15>{#p/papyrus}{#f/24}SO, YOU'RE SERIOUS..." ],
      turnTalk0b: [ "<15>{#p/papyrus}{#f/24}SO, YOU WON'T FIGHT..." ],
      turnTalk0c: [ "<15>{#p/papyrus}{#f/20}THEN LET'S SEE HOW YOU HANDLE MY FABLED 'BLUE ATTACK!'" ],
      turnTalk0x: [
         "<15>{#p/papyrus}{#f/10}YOU'RE BLUE NOW.",
         "<15>{#f/10}THAT'S MY ATTACK!",
         '<15>{#f/20}NYEH HEH HEH HEH HEH HEH HEH HEH HEH!!!'
      ],
      turnTalk1a: [ '<15>{#p/papyrus}{#f/20}BEHOLD!' ],
      turnTalk1b: [ '<15>{#p/papyrus}{#f/20}HMMM... I WONDER WHAT I SHOULD WEAR...' ],
      turnTalk2a: [ '<15>{#p/papyrus}{#f/20}HOW HIGH CAN YOU JUMP?' ],
      turnTalk2b: [ "<15>{#p/papyrus}{#f/22}WHAT!?\nI'M NOT THINKING ABOUT THE DATE!!" ],
      turnTalk3: [ "<15>{#p/papyrus}{#f/20}YEAH!\nDON'T MAKE ME USE MY {@fill:#f00}SPECIAL ATTACK{@fill:#000}!" ],
      turnTalk4: [ '<15>{#p/papyrus}{#f/20}I CAN ALMOST TASTE MY FUTURE POPULARITY!!!' ],
      turnTalk5: [ '<15>{#p/papyrus}{#f/20}PAPYRUS: UNPARALLELED SPAGHETTORE!' ],
      turnTalk6: [ '<15>{#p/papyrus}{#f/20}PAPYRUS: ELITE SQUAD MEMBER!' ],
      turnTalk7: [ '<15>{#p/papyrus}{#f/10}UNDYNE WILL BE REALLY PROUD OF ME!!' ],
      turnTalk8: [ '<15>{#p/papyrus}{#f/20}THE KING WILL BUILD A STATUE OF ME IN THE CITADEL!!!' ],
      turnTalk9: [ "<15>{#p/papyrus}{#f/10}...AND I'LL MAKE SURE MY BROTHER GETS ONE TOO." ],
      turnTalk10: [ "<15>{#p/papyrus}{#f/27}WE'LL HAVE LOTS OF ADMIRERS!!\nBUT..." ],
      turnTalk11a: [ '<15>{#p/papyrus}{#f/20}HOW WILL I KNOW IF PEOPLE SINCERELY LIKE ME???' ],
      turnTalk11b: [ '<15>{#p/papyrus}{#f/20}WILL ANYONE LIKE ME LIKE YOU DO?' ],
      turnTalk12: [ '<15>{#p/papyrus}{#f/21}SOMEONE LIKE YOU IS REALLY RARE...' ],
      turnTalk13a: [ "<15>{#p/papyrus}{#f/21}I DON'T THINK THEY'LL LET YOU GO..." ],
      turnTalk13b: [ '<15>{#p/papyrus}{#f/21}AND DATING MIGHT BE KIND OF HARD...' ],
      turnTalk14: [ "<15>{#p/papyrus}{#f/26}AFTER YOU'RE CAPTURED AND SENT AWAY." ],
      turnTalk15: [ '<15>{#p/papyrus}{#f/17}URGH... WHO CARES!\nGIVE UP!!' ],
      turnTalk16: [ '<15>{#p/papyrus}{#f/15}GIVE UP OR FACE MY... {@fill:#f00}SPECIAL ATTACK{@fill:#000}!' ],
      turnTalk17: [ '<15>{#p/papyrus}{#f/20}YEAH!!!\nVERY SOON I WILL USE MY {@fill:#f00}SPECIAL ATTACK{@fill:#000}!' ],
      turnTalk18: [
         '<15>{#p/papyrus}{#f/20}THIS IS YOUR LAST CHANCE... BEFORE MY {@fill:#f00}SPECIAL ATTACK{@fill:#000}!'
      ],
      turnTalk19: [ '<15>{#p/papyrus}{#f/20}BEHOLD...!\nMY {@fill:#f00}SPECIAL ATTACK{@fill:#000}!' ],
      turnTalk19x: [
         '<15>{#p/papyrus}{#f/15}NYEH HEH HEH!',
         '<15>{#f/20}NO HUMAN HAS EVER FACED MY {@fill:#f00}SPECIAL ATTACK{@fill:#000} BEFORE!',
         '<15>{#f/20}PREPARE TO BE CAPTURED, ONCE AND FOR ALL!'
      ],
      turnTalk20: [ '<15>{#p/papyrus}{#f/20}SPECIAL ATTACK, FORMATION ALPHA!!' ],
      turnTalk21: [ '<15>{#p/papyrus}{#f/20}SPECIAL ATTACK, FORMATION BETA!!' ],
      turnTalk22: [ '<15>{#p/papyrus}{#f/20}SPECIAL ATTACK, FORMATION GAMMA!!' ],
      turnTalk23: [ '<15>{#p/papyrus}{#f/20}SPECIAL ATTACK, FORMATION DELTA!!' ],
      turnTalk24: [
         '<15>{#p/papyrus}{#f/27}WOWIE!\nARE YOU STRONG!',
         '<15>{#f/20}BUT NO FEAR!\nI WILL NOT BE DETERRED BY YOUR STRENGTH!',
         '<15>{#f/14}...SPECIAL ATTACK...',
         '<15>{#f/17}FORMATION {@fill:#f00}SIGMA{@fill:#000}!!!'
      ],
      turnTalk24x: [
         "<15>{#p/papyrus}{#f/27}WELL...! *HUFF* IT'S CLEAR... YOU CAN'T! *HUFF* BEAT ME!",
         '<15>{#f/15}YEAH!!! I CAN SEE YOU SHAKING IN YOUR BOOTS!!',
         '<15>{#f/20}I, THE GREAT PAPYRUS, ELECT TO GRANT YOU PITY!!',
         '<15>{#f/20}I WILL SPARE YOU, HUMAN!!!',
         '<15>{#f/10}YOU CAN ACCEPT MY MERCY NOW.'
      ],
      turnTalk25: [ '<15>{#p/papyrus}{#f/20}...' ],
      secretTalk2: [ '<15>{#p/papyrus}{#f/20}...?' ],
      secretTalk3: [
         '<15>{#p/papyrus}{#f/20}WHAT IS IT?\nIS SOMETHING WRONG?',
         "<15>{#p/papyrus}{#f/20}WHY AREN'T YOU ACCEPTING MY MERCY...?"
      ],
      secretTalk4: [ '<15>{#p/papyrus}{#f/24}HMM...', "<15>{#f/24}I FEEL LIKE YOU'RE TRYING TO TELL ME SOMETHING." ],
      secretTalk5: [
         '<15>{#p/papyrus}{#f/27}IS THERE SOMETHING -WRONG- WITH ACCEPTING MY MERCY?',
         "<15>{#p/papyrus}{#f/24}OR MAYBE YOU'VE JUST FORGOTTEN HOW...",
         '<15>{#p/papyrus}{#f/24}...FOR SOME UNKNOWN REASON.'
      ],
      secretTalk6: [ '<15>{#p/papyrus}{#f/21}...', '<15>I SEE...' ],
      secretTalk7: [
         "<15>{#p/papyrus}{#f/24}SO THAT'S WHY YOU'VE BEEN ACTING THE WAY YOU HAVE.",
         "<15>{#f/21}THIS WHOLE TIME, I'VE BEEN WONDERING...",
         '<15>{#f/26}...WHY "ASRIEL" IS SO CONFIDENT ALL THE TIME.',
         "<15>{#f/27}IT'S LIKE HE KNOWS YOU'RE GOING TO FIGHT FOR HIM!",
         "<15>{#f/21}...EXCEPT YOU DON'T SEEM TO WANT TO NOW.",
         '<15>{#f/20}WELL, I, FOR ONE, SEE THIS AS AN ABSOLUTE WIN!',
         "<15>{#f/20}DON'T YOU SEE?\nI KNEW YOU HAD IT IN YOU TO CHANGE.",
         '<15>{#f/24}THAT BEING SAID...',
         '<15>{#f/24}I SHOULD PROBABLY GO BEFORE "ASRIEL" COMES BACK.',
         '<15>{#f/20}BUT WORRY NOT!\nTHIS SKELETON WILL BE VERY WELL-HIDDEN.',
         '<15>{#f/10}...G-GOOD LUCK OUT THERE!!!'
      ],
      secretTalk7x: [
         "<15>{#p/papyrus}{#f/26}SO YOU'RE JUST BEING BELLIGERENT.",
         "<15>{#p/papyrus}{#f/20}WELL.\nLOOKS LIKE I'LL JUST HAVE TO SPARE MYSELF FOR YOU!",
         "<15>{#p/papyrus}{#f/20}ISN'T THAT SOMETHING!!!"
      ],
      sparableFlirt1: [
         "<15>{#p/papyrus}{#f/27}YOU'RE SUPPOSED TO BE SPARING, NOT FLIRTING!",
         '<15>{#f/14}I MUST RESIST!'
      ],
      sparableFlirt2: [ '<15>{#p/papyrus}{#f/14}...N-NO!' ],
      sparableFlirt3: [ '<15>{#p/papyrus}{#f/14}...!' ],
      sparableInsult1: [
         "<15>{#p/papyrus}{#f/20}HEY, THERE'S NO NEED TO INSULT YOURSELF!",
         '<15>{#f/21}I KNOW YOU DID YOUR BEST...'
      ],
      sparableInsult2: [ '<15>{#p/papyrus}{#f/21}HUMAN...' ],
      sparableInsult3: [ '<15>{#p/papyrus}{#f/21}...' ]
   },
   b_opponent_shockpapyrus: {
      act_check: [ "<32>{#p/asriel2}* Papyrus.\n* He's Forgettable." ],
      idleText1: [
         '<15>{#p/papyrus}{#f/24}WHAT IS THE MEANING OF THIS?',
         "<15>{#f/20}AND WHY DIDN'T MY BROTHER CATCH YOU!?",
         '<15>{#f/20}I WAS BUSY PRACTISING A VERY IMPORTANT SPEECH!',
         '<15>{#f/24}...\nWAIT.',
         '<15>{#f/24}IS THAT A HUMAN?',
         '<15>{#f/10}SANS, YOU HAVE TO COME SEE THIS!',
         '<15>{#f/10}A HUMAN HAS ARRIVED, ALONG WITH... ASGORE?',
         '<15>{#f/24}HE LOOKS A LITTLE SMALL, THOUGH.'
      ],
      idleText2: [ '<15>{#p/papyrus}{#f/27}...\nSANS...?', '<15>{#f/21}WHAT IS HE WAITING FOR?' ],
      idleText3: [ '<15>{#p/papyrus}{#f/21}BROTHER...' ],
      name: '* Papyrus',
      sansDeath1: [ "<20>{*}{#p/sans}papyrus, i'm sor- {%}" ],
      sansDeath1a: [ "<15>{*}{#p/papyrus}{#f/27}SANS! YOU'RE HURT!" ],
      sansDeath2: [ '<20>{*}{#p/sans}yeah, i can see that, bro' ],
      sansDeath3: [
         '<20>{*}{#p/sans}so...',
         "<20>{*}guess that's it, huh?",
         '<20>{*}...',
         '<20>{*}just...',
         "<20>{*}promise me you'll be fine without me, bro.",
         "<20>{*}promise me you'll be g-{^5}great.",
         '<20>{*}...',
         '<20>{*}after all...'
      ],
      sansDeath4: [ "<20>{#p/sans}{*}you're the... great{^6} papyrus.{^20}{%}" ],
      sansDeath4a: [ '<15>{#p/papyrus}{*}...{^50}{%}' ],
      sansText: [ '<20>{#p/without}{*}PAPYRUS-{^6}{%}' ],
      status1: [ '<32>{#p/asriel2}* Papyrus was taken by surprise.' ],
      status2: [ '<32>{#p/asriel2}* Papyrus is still looking for his brother.' ]
   },
   b_opponent_shocksans: {
      name: ''
   },
   b_opponent_shockasgore: {
      act_check: [ '<32>{#p/asriel2}* Asgore.\n* The king who got his home planet destroyed.' ],
      foodStatus: [ '<32>{#p/asriel2}* Asgore.' ],
      foodText1: [ '<11>{#p/asgore1}{#f/5}That pie looks familiar...' ],
      foodText2: [ '<11>{#p/asgore1}{#f/5}Fried snails...\nOdd.' ],
      idleText: [ '<11>{#p/asgore1}{#f/1}...' ],
      introText: [ '<11>{#p/asgore1}{#f/1}Really now...' ],
      stickText: [ '<32>{#p/narrator}* As if to spite all known laws of nature, the spanner goes right through him.' ],
      stickTalk: [ '<11>{#p/asgore1}{#f/5}Why did you...' ],
      miss: [
         '<11>{#p/asgore1}{#f/4}...',
         '<11>{#f/2}I am not really here, Asriel.',
         "<11>{#f/2}It's just a projection."
      ],
      name: '* Asgore',
      status1: [ '<32>{#p/asriel2}* Kill him, $(name).' ],
      status2: [ '<32>{#p/asriel2}* ...' ],
      status3: [ '<32>{#p/asriel2}* What the...' ]
   },

   i_berry: {
      battle: {
         description: 'A small branch of semi-translucent berries.',
         name: 'Exoberries'
      },
      drop: [ '<32>{#p/human}* (You threw away the berries.)' ],
      info: [ '<32>{#p/narrator}* "Exoberries" Heals 9 HP\n* A small branch of semi-translucent berries.' ],
      name: 'Exoberries',
      use: [ '<32>{#p/human}* (You ate the berries.)' ]
   },
   i_blookpie: {
      battle: {
         description: 'Fresh exoberries, bathed in a sea of moist Jell-O.',
         name: 'Berry Pie'
      },
      drop: [ '<32>{#p/human}* (You threw away the pie.)' ],
      info: [ '<32>{#p/narrator}* "Exoberry Pie" Heals 99 HP\n* Fresh exoberries, bathed in a sea of moist Jell-O.' ],
      name: 'Exoberry Pie',
      use: [ '<32>{#p/human}* (You ate the pie.)' ]
   },
   i_chip: {
      battle: {
         description: 'Please take this to the edge of the galaxy.',
         name: 'Chip'
      },
      drop: [ '<32>{#p/human}* (You threw away the chip.)' ],
      info: [ '<32>{#p/narrator}* "Computer Chip" Heals 45 HP\n* Please take this to the edge of the galaxy.' ],
      name: 'Computer Chip',
      use: () => [
         '<32>{#p/human}* (You bit into the computer chip...)',
         ...(save.data.b.oops ? [] : [ '<32>{#p/narrator}* Welp, there goes that.' ])
      ]
   },
   i_eye: {
      battle: {
         description: 'A portable force field.',
         name: 'Emitter'
      },
      drop: [ '<32>{#p/human}* (You threw away the emitter.)' ],
      info: [ '<32>{#p/narrator}* "Field Emitter" (7 DF)\n* A portable force field.' ],
      name: 'Field Emitter',
      use: [ '<32>{#p/human}* (You deployed the emitter.)' ]
   },
   i_fruit: {
      battle: {
         description: 'A non-euclidian fruit, bigger on the inside.',
         name: 'Ghost Fruit'
      },
      drop: [ '<32>{#p/human}* (You folded the fruit in on itself.)' ],
      info: [ '<32>{#p/narrator}* "Ghost Fruit" Heals 15 HP\n* A non-euclidian fruit, bigger on the inside.' ],
      name: 'Ghost Fruit',
      use: [ "<32>{#p/human}* (You unpacked the fruit's dimensions.)" ]
   },
   i_glove: {
      battle: {
         description: "A state-of-the-art bionic glove.\nIt's so bad.",
         name: 'Power Glove'
      },
      drop: [ '<32>{#p/human}* (You threw away the glove.)' ],
      info: [ '<32>{#p/narrator}* "Power Glove" (5 AT)\n* A state-of-the-art bionic glove. It\'s so bad.' ],
      name: 'Power Glove',
      use: [ '<32>{#p/human}* (You put on the glove.)' ]
   },
   i_milkshake: {
      battle: {
         description: 'Made of an unknown, pearly-white substance.',
         name: 'Milkshake'
      },
      drop: [ '<32>{#p/human}* (You rid yourself of the shake.)' ],
      info: [ '<32>{#p/narrator}* "Milkshake" Heals 18 HP\n* Made of an unknown, pearly-white substance.' ],
      name: 'Milkshake',
      use: [ '<32>{#p/human}* (You slurped on the shake.)' ]
   },
   i_nice_cream: {
      battle: {
         description: 'Instead of a joke, the wrapper says something nice.',
         name: 'Nice Cream'
      },
      drop: [ '<32>{#p/human}* (You threw away the ice cream.)' ],
      info: [ '<32>{#p/narrator}* "Nice Cream" Heals 15 HP\n* Instead of a joke, the wrapper says something nice.' ],
      name: 'Nice Cream',
      use: pager.create(
         'random',
         [ '<32>{#p/human}* (You unwrapped the Nice Cream.)', '<32>{#p/narrator}* "You\'re just great!"' ],
         [ '<32>{#p/human}* (You unwrapped the Nice Cream.)', '<32>{#p/narrator}* "You look stellar today!"' ],
         [ '<32>{#p/human}* (You unwrapped the Nice Cream.)', '<32>{#p/narrator}* "Are those augments natural?"' ],
         [ '<32>{#p/human}* (You unwrapped the Nice Cream.)', '<32>{#p/narrator}* "You\'re super spiffy!"' ],
         [ '<32>{#p/human}* (You unwrapped the Nice Cream.)', '<32>{#p/narrator}* "Have a wonderful time!"' ],
         [ '<32>{#p/human}* (You unwrapped the Nice Cream.)', '<32>{#p/narrator}* "Is this as sweet as you?"' ],
         [
            '<32>{#p/human}* (You unwrapped the Nice Cream.)',
            "<32>{#p/human}* (It's a holographic illustration of a hug.)"
         ],
         [ '<32>{#p/human}* (You unwrapped the Nice Cream.)', '<32>{#p/narrator}* "Love yourself!"\n* "I love you!"' ]
      )
   },
   i_pop: {
      battle: {
         description: 'Slows down time.\nOr alters your view of it...?',
         name: 'Vortex Pop'
      },
      drop: [ '<32>{#p/human}* (You threw away the pop.)' ],
      info: [ '<32>{#p/narrator}* "Vortex Pop" Heals 11 HP\n* Slows down time.\n* Or alters your view of it...?' ],
      name: 'Vortex Pop',
      use: () => [
         '<32>{#p/human}* (You sucked on the pop.)',
         game.vortex
            ? '<32>{#p/human}* (Your perception of time is already shifted...)'
            : '<32>{#p/human}* (Your perception of time begins to shift...)'
      ]
   },
   i_spaghetti: {
      battle: {
         description: 'Silken spaghetti, finely aged in an oaken cask.',
         name: 'Spaghetti'
      },
      drop: [ '<32>{#p/human}* (You threw away the pasta.)' ],
      info: [ '<32>{#p/narrator}* "Spaghetti" Heals 16 HP\n* Silken spaghetti, finely aged in an oaken cask.' ],
      name: 'Spaghetti',
      use: [ '<32>{#p/human}* (You ate the pasta.)' ]
   },
   i_swirl: {
      battle: {
         description: 'A glowing, colorful sugar roll.',
         name: 'Swirl'
      },
      drop: [ '<32>{#p/human}* (You threw away the swirl.)' ],
      info: [ '<32>{#p/narrator}* "Radiant Swirl" Heals 22 HP\n* A glowing, colorful sugar roll.' ],
      name: 'Radiant Swirl',
      use: [ '<32>{#p/human}* (You ate the Swirl.)' ]
   },
   i_voidy: {
      battle: {
         description: "Napstablook's personal void key.\nNot viable in battle.",
         name: 'Void Key'
      },
      drop: [ '<32>{#p/human}* (You threw away the key.)' ],
      info: [ "<32>{#p/narrator}* Napstablook's personal void key, accessible on-the-go." ],
      name: 'Void Key',
      use: () =>
         battler.active
            ? [ '<32>{#p/human}* (You equipped the key...)', '<32>{#p/human}* (Nothing happened.)' ]
            : [ '<32>{#p/human}* (You equipped the key...)' ]
   },

   n_shop_blook: {
      exit: () =>
         world.genocide || (world.population === 0 && !world.bullied)
            ? [ '<32>{#p/narrator}* ...' ]
            : [ "<32>{#p/napstablook}{#k/0}* oh... you're leaving...", '<32>{#k/1}* well, cya next time i guess...' ],
      item: () =>
         world.genocide || (world.population === 0 && !world.bullied)
            ? [
                 '§fill:#808080§--- TAKEN ---',
                 save.data.b.item_blookpie ? '§fill:#808080§--- TAKEN ---' : '0G - Exoberry Jell-O Pie',
                 '0G - Ghost Fruit',
                 '0G - Milkshake',
                 'Exit'
              ]
            : [
                 save.data.b.item_voidy ? '§fill:#808080§--- SOLD OUT ---' : '1000G - Void Key',
                 save.data.b.item_blookpie ? '§fill:#808080§--- SOLD OUT ---' : '50G - Exoberry Jell-O Pie',
                 '14G - Ghost Fruit',
                 '19G - Milkshake',
                 'Exit'
              ],
      itemInfo: [
         'Special:\nA personal\npocket\ndimension.',
         'Heals 99HP\nGlows in\nthe dark.',
         "Heals 15HP\nIt's non-\neuclidian.",
         'Heals 18HP\nMay contain\nectoplasm.'
      ],
      itemPrompt: '<09>{#p/napstablook}{#k/3}see anything you like?',
      itemPurchase: [
         '<09>{#p/napstablook}{#k/3}heh... thank you...',
         "<09>{#p/napstablook}{#k/0}you don't have to buy it...",
         '<09>{#p/napstablook}{#k/0}sorry... not enough g...',
         "<09>{#p/human}(You're carrying too much.)"
      ],
      itemPurchasePrompt: () =>
         world.genocide || (world.population === 0 && !world.bullied) ? 'Take it?' : 'Buy it for\n$(x)G?',
      itemUnavailable: () =>
         world.genocide || (world.population === 0 && !world.bullied)
            ? '<09>{#p/narrator}Nothing left.'
            : "<09>{#p/napstablook}{#k/0}oh... i don't have any more...",
      menu: () =>
         world.genocide || (world.population === 0 && !world.bullied)
            ? [ 'Take', 'Steal', 'Read', 'Exit' ]
            : [ 'Buy', 'Sell', 'Talk', 'Exit' ],
      menuPrompt1: () =>
         [
            '<23>{#p/napstablook}{#k/3}* have a look around...',
            "<23>{#p/napstablook}{#k/3}* i hope you find what you're looking for...",
            "<23>{#p/napstablook}{#k/3}* have a look around... or not... it's your choice...",
            '<23>{#p/napstablook}{#k/3}* have a look around, i guess...',
            "<23>{#p/napstablook}{#k/3}* have a look around... or not... it's your choice..."
         ][Math.min(save.data.n.state_wastelands_napstablook, 4)],
      menuPrompt2: '<23>{#p/napstablook}{#k/0}* feel free to leave at any time...',
      menuPrompt3: () =>
         world.bullied ? '<23>{#p/narrator}* ...but everybody ran.' : '<23>{#p/narrator}* ...but nobody came.',
      note: () =>
         world.genocide
            ? [ "<32>{#p/narrator}* There's a note here.", '<32>{#p/napstablook}* "your time is running out."' ]
            : [ "<32>{#p/narrator}* There's a note here.", '<32>{#p/napstablook}* "sorry, i had to go..."' ],
      sell1: () =>
         world.genocide || (world.population === 0 && !world.bullied)
            ? [ '<30>{#p/human}* (You took 125G from behind the counter.)' ]
            : [
                 '<30>{#p/napstablook}{#k/2}* oh... you wanted to sell something?',
                 "<30>{#k/0}* i don't know if i can afford to buy anything... sorry..."
              ],
      sell2: () =>
         world.genocide || (world.population === 0 && !world.bullied)
            ? [ '<30>{#p/narrator}* Nothing left.' ]
            : [
                 '<30>{#p/napstablook}{#k/5}* um... you could ask my cousin about selling...',
                 '<30>{#k/0}* they live with undyne, i think'
              ],
      talk: () => [
         'Say Hello',
         'Ghosts',
         'The Void',
         65 <= save.data.n.plot
            ? save.data.b.a_state_hapstablook && 68 <= save.data.n.plot
               ? 'Family'
               : 'Your Life'
            : 63 <= save.data.n.plot && save.data.b.a_state_hapstablook
            ? 'Intervention'
            : 60 <= save.data.n.plot
            ? 'Mew Mew Doll'
            : 49 <= save.data.n.plot
            ? 'Travels'
            : save.data.b.napsta_performance
            ? 'DJ Blooky?'
            : save.data.n.state_wastelands_napstablook === 0
            ? 'Dapper Blook?'
            : 'Your Life',
         'Exit'
      ],
      talkPrompt: '<09>{#p/napstablook}{#k/1}oh, you wanna chat?',
      talkText: [
         () =>
            save.data.b.a_state_napstadecline
               ? [ '<32>{#p/napstablook}{#k/2}* uh...', '<32>{#p/napstablook}{#k/2}* hey there...' ]
               : save.data.n.state_wastelands_napstablook < 2
               ? [
                    [
                       '<32>{#p/napstablook}{#k/3}* oh, hey...',
                       '<32>{#p/napstablook}{#k/3}* oh, nice to see you again...'
                    ][save.data.n.state_wastelands_napstablook],
                    ...(world.population < 8
                       ? [ "<32>{#k/3}* what's that look for?\n{#k/0}* have i done something wrong?" ]
                       : [ '<32>{#k/4}* what have you been up to?' ])
                 ]
               : save.data.n.state_wastelands_napstablook < 5
               ? [
                    "<32>{#p/napstablook}{#k/0}* oh...\n* i'm not sure what to say, really...",
                    '<32>{#k/3}* uhh... hello, i guess?'
                 ]
               : [
                    '<32>{#p/napstablook}{#k/4}* heh...\n* hey...',
                    '<32>{#k/3}* say, are you new around here?',
                    "<32>{#k/5}* you don't look familiar..."
                 ],
         [
            '<32>{#p/napstablook}{#k/2}* you wanna know about ghosts?',
            '<32>{#k/0}* well, the only ghosts i know are myself, my three cousins...',
            '<32>{#k/3}* and $(name), of course',
            "<32>{#k/1}* aside from that, there's not much to say",
            '<32>{#k/0}* without a fused host body, we just sorta... exist',
            '<32>{#k/0}* yeah, i know...\n* very interesting stuff...'
         ],
         [
            '<32>{#p/napstablook}{#k/3}* oh yeah... that...',
            '<32>{#k/1}* well, one day, i found this key lying around...',
            '<32>{#k/5}* when i used it, i ended up in this odd room i haven\'t seen before...',
            '<32>{#k/4}* now and then, i like to visit that place to relax',
            "<32>{#k/3}* it's peaceful..."
         ],
         () =>
            65 <= save.data.n.plot
               ? save.data.b.a_state_hapstablook
                  ? 68 <= save.data.n.plot
                     ? [
                          '<32>{#p/napstablook}* hey, hapstablook came by a little while ago.',
                          "<32>* we talked for a bit about what we've been up to...",
                          '<32>* about the family...',
                          "<32>* i... don't think i've ever been this happy before...",
                          '<32>* what you did for us back there... it means a lot to me.'
                       ]
                     : [
                          "<32>{#p/napstablook}* hey... sorry things didn't work out the way we hoped...",
                          '<32>{#p/napstablook}* it was nice to have you there, though......'
                       ]
                  : [ '<32>{#k/7}* with every day that goes by, i feel a little farther away from happiness......' ]
               : 63 <= save.data.n.plot && save.data.b.a_state_hapstablook
               ? [
                    "<32>{#k/7}* you're probably wondering about mettaton's intervention, right?",
                    "<32>{#k/7}* don't worry, it's still happening...",
                    '<32>{#k/7}* i just came back here to keep an eye on my snail farm...'
                 ]
               : 60 <= save.data.n.plot
               ? save.data.b.a_state_napstadecline
                  ? [ '<32>{#k/7}* ...', "<32>{#k/7}* i don't... really wanna talk about that..." ]
                  : [
                       '<32>{#k/1}* oh yeah...',
                       '<32>{#k/3}* thank you for agreeing to help me with that',
                       "<32>{#k/2}* mettaton's been acting weird lately...",
                       "<32>{#k/0}* alphys is lucky he didn't steal anything else",
                       '<32>{#k/4}* she first had me watch mew mew space adventure with her a while ago...',
                       '<32>{#k/3}* we marathonned the entire fourth season in one night...',
                       '<32>{#k/6}* that finale...',
                       '<32>{#k/6}* that was something else...'
                    ]
               : 42.1 <= save.data.n.plot
               ? [
                    '<32>{#k/1}* yeah... i knew you might come back here, so i came too',
                    ...[
                       [ '<32>{#k/0}* sorry for interrupting whatever you were doing with my cousin...' ],
                       [ '<32>{#k/0}* ...\n* have you seen my cousin?' ],
                       [ '<32>{#k/3}* i heard my cousin really likes you...' ],
                       [ "<32>{#k/5}* my cousin tells me you're not the most interesting person to be with..." ],
                       [],
                       []
                    ][save.data.b.toriel_phone ? 2 : save.data.n.state_foundry_maddummy],
                    '<32>* ...',
                    "<32>{#f/1}* anyway, i hope you're doing alright out there",
                    '<32>{#f/2}* past starton, things get a bit... chaotic'
                 ]
               : save.data.b.napsta_performance
               ? [
                    '<32>{#p/napstablook}{#k/1}* yeah, i make music sometimes',
                    "<32>{#k/0}* people say it's great, but i know they're just lying to make me feel better...",
                    '<32>{#k/4}* thanks for calling me about the show, though...',
                    '<32>{#k/3}* it made me smile...'
                 ]
               : [
                    [
                       '<32>{#p/napstablook}{#k/2}* you mean that little hat trick i pulled off...?',
                       '<32>{#k/1}* yeah, my cousin taught me that...',
                       '<32>{#k/5}* well, actually, i have three cousins',
                       '<32>{#k/3}* but hapstablook and i used to spend so much time together...',
                       '<32>{#k/0}* and then he...',
                       '<32>{#k/6}* ...',
                       '<32>{#k/0}* never mind...'
                    ],
                    [
                       "<32>{#p/napstablook}{#k/0}* oh, there's not much to say about my life...",
                       '<32>{#k/3}* meeting you was the highlight of my weekend...'
                    ],
                    [
                       "<32>{#p/napstablook}{#k/0}* oh, there's not much to say about my life...",
                       '<32>{#k/6}* and thanks to people like you, there probably never will be...'
                    ],
                    [
                       "<32>{#p/napstablook}{#k/0}* oh, there's not much to say about my life...",
                       "<32>{#k/3}* i'm just... pluggin' along..."
                    ],
                    [
                       "<32>{#p/napstablook}{#k/0}* oh, there's not much to say about my life...",
                       '<32>{#k/6}* not that you... really care...'
                    ],
                    [
                       "<32>{#p/napstablook}{#k/0}* oh, there's not much to say about my life...",
                       "<32>{#k/0}* i'm just a ghost that tends to get lost in the mix"
                    ]
                 ][save.data.n.state_wastelands_napstablook]
      ],
      zeroPrompt: '<09>{#p/narrator}...'
   },
   n_shop_hare: {
      exit: () =>
         world.population === 0
            ? [ '<32>{#p/narrator}* ...' ]
            : [ '<32>{#p/monster}{#k/11}* Bye now!\n* Come again sometime!' ],
      item: () =>
         world.population === 0
            ? [
                 '§fill:#808080§--- UNAVAILABLE ---',
                 save.data.b.item_eye ? '§fill:#808080§--- TAKEN ---' : '0G - Field Emitter',
                 '0G - Vortex Pop',
                 '0G - Radiant Swirl',
                 'Exit'
              ]
            : [
                 '§fill:#808080§--- UNAVAILABLE ---',
                 save.data.b.item_eye ? '§fill:#808080§--- SOLD OUT ---' : '50G - Field Emitter',
                 '35G - Vortex Pop',
                 '20G - Radiant Swirl',
                 'Exit'
              ],
      itemInfo: [
         "Weapon: 5AT\n($(x) AT)\nKnock 'em.",
         'Armor: 7DF\n($(x) DF)\nProtection\nfor one.',
         'Heals 11HP\nSlows your\nperception\nof time.',
         "Heals 22HP\nIt's her own\nrecipe."
      ],
      itemPrompt: '<09>{#p/monster}{#k/0}What would you like to buy?',
      itemPurchase: [
         '<09>{#p/monster}{#k/4}Thanks for your purchase.',
         '<09>{#p/monster}{#k/7}Just looking?',
         "<09>{#p/monster}{#k/5}That's not enough money.",
         "<09>{#p/human}(You're carrying too much.)"
      ],
      itemPurchasePrompt: () => (world.population === 0 ? 'Take it?' : 'Buy it for\n$(x)G?'),
      itemUnavailable: () =>
         world.population === 0 ? '<09>{#p/narrator}Nothing left.' : '<09>{#p/monster}{#k/10}Sorry, I only made one.',
      menu: () => (world.population === 0 ? [ 'Take', 'Steal', 'Read', 'Exit' ] : [ 'Buy', 'Sell', 'Talk', 'Exit' ]),
      menuPrompt1: '<23>{#p/monster}{#k/0}* Hello, traveler.\n* How can I help you?',
      menuPrompt2: '<23>{#p/monster}{#k/0}* Take your time.',
      menuPrompt3: () =>
         world.bullied ? '<23>{#p/narrator}* ...but everybody ran.' : '<23>{#p/narrator}* ...but nobody came.',
      note: [ "<32>{#p/narrator}* There's a note here.", '<33>{#p/monster}* "Please don\'t hurt my family."' ],
      sell1: () =>
         world.population === 0
            ? [ '<30>{#p/human}* (You took 758G from behind the counter.)' ]
            : [
                 "<30>{#p/monster}{#k/6}* Huh?\n* Sell somethin'?\n* Does this look like a pawn shop?",
                 "<30>{#k/3}* I don't know how it works where you come from... but...",
                 "<30>* If I started spending money on old wrenches and used spacesuits, I'd be out of business in a jiffy!"
              ],
      sell2: () =>
         world.population === 0
            ? [ '<30>{#p/narrator}* Nothing left.' ]
            : [
                 "<30>{#p/monster}{#k/8}* If you're really hurtin' for cash, then maybe you could do some crowdfunding.",
                 '<30>{#k/2}* I hear people will pay for ANYTHING nowadays.'
              ],
      talk: [ 'Say Hello', 'What To Do Here', 'Town History', 'Your Life', 'Exit' ],
      talkPrompt: '<09>{#p/monster}{#k/0}Care to chat?',
      talkText: [
         [
            "<32>{#p/monster}{#k/4}* Hiya! Welcome to Starton!\n* I can't remember the last time I saw a fresh face around here.",
            '<32>{#k/8}* Where did you come from?\n* The Citadel?',
            "<32>{#k/7}* You don't look like a tourist.\n* Are you here by yourself?"
         ],
         [
            '<32>{#p/monster}{#k/8}* You want to know what to do here in Starton?',
            "<32>{#k/9}* Grillby's has food, and the librarby has information...",
            "<32>{#k/2}* If you're tired, you can take a nap at the inn.\n* It's right nextdoor, my sister runs it.",
            "<32>{#k/0}* And if you're bored, you can sit outside and watch those wacky skeletons do their thing.",
            "<32>* There's two of 'em...\n* Brothers, I think.\n* They've been here for as long as I can remember.",
            '<32>{#k/9}* Oh, I almost forgot.\n* Recently, a ghost fella decided to open a store on the south side of town.',
            "<32>{#k/11}* It's not much, but if you drop by, be sure to say hello.\n* They could use the company."
         ],
         [
            '<32>{#p/monster}{#k/9}* Think back to your history class...',
            '<32>{#k/0}* A long time ago, monsters lived in what we now call the Foundry.',
            '<32>* Long story short, we invented the technology to build out new sections onto the outpost.',
            '<32>* The fuzzy folk figured this would be the perfect place to setup a town.',
            "<32>* It's quaint, but I kinda like that, you know?"
         ],
         [
            '<32>{#p/monster}* Life is the same as usual.',
            '<32>{#k/5}* A little lonely...',
            "<32>{#k/10}* But... we all know deep down that freedom is coming, don't we?",
            '<32>{#k/9}* As long as we got that hope, we can grit our teeth and face the same struggles, day after day...',
            "<32>{#k/0}* That's life, ain't it?"
         ]
      ],
      zeroPrompt: '<09>{#p/narrator}...'
   },

   c_name_papyrus: () =>
      save.data.n.plot_date < 2 || (save.data.n.exp > 0 && save.data.b.a_state_fishbetray)
         ? "Papyrus's Phone"
         : 'Papyrus and Undyne',

   p_papyrus: <Partial<CosmosKeyed<CosmosProvider<string[]>>>>{
      s_start: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}AH, THAT LONELY ROAD.',
            '<18>{#f/4}BACK WHEN WE WERE BABY BONES...',
            '<18>{#f/0}SANS AND I WOULD RACE SHUTTLECRAFT TOGETHER.',
            '<18>{#f/4}BUT NO MATTER HOW FAST I WENT...',
            '<18>{#f/7}SANS WOULD ALWAYS BE WAITING AT THE FINISH LINE!',
            ...(solo()
               ? [ '<18>{#f/5}YOU CAN IMAGINE MY FRUSTRATION.' ]
               : [
                    "<25>{#p/undyne}{#f/1}* That's 'cause he's a big fat cheater!",
                    '<25>{#f/4}* Have you SEEN his high score on the target practice machine?',
                    "<25>{#f/12}* It's like, a gazillion or something.",
                    '<18>{#p/papyrus}{#f/4}TRUST ME, I KNOW ALL TOO WELL.',
                    "<18>{#f/7}I REALLY WISH HE WOULDN'T CHEAT ON THINGS LIKE THAT!",
                    '<18>{#f/7}IT RUINS THE GAME FOR EVERYONE ELSE.',
                    '<25>{#p/undyne}{#f/1}* Or maybe...',
                    '<25>{#f/8}* It just provides a more interesting challenge!!',
                    "<18>{#p/papyrus}{#f/0}ACTUALLY, THAT'S A FAIR POINT!"
                 ])
         ],
         () => [
            '<18>{#p/papyrus}{#f/5}SANS HAS ALWAYS BEEN ONE TO TAKE SHORTCUTS.',
            ...(solo()
               ? [ '<18>{#f/4}I SUSPECT THAT PLAYED A PART IN HIS VICTORIES.' ]
               : [ "<18>{#f/4}IT'S PRACTICALLY A LAW OF NATURE AT THIS POINT." ])
         ]
      ),
      s_sans: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}{#f/4}THIS IS WHERE MY BROTHER IS MEANT TO PATROL...',
            "<18>{#f/7}BUT EVERY TIME I CHECK ON HIM, HE'S SLACKING OFF!",
            ...(solo()
               ? [ '<18>{#f/5}NOT THAT I CAN BLAME HIM...' ]
               : [
                    '<25>{#p/undyne}{#f/9}* Felt that.',
                    '<25>{#f/16}* I never see him at his post anymore.',
                    "<18>{#p/papyrus}{#f/5}I CAN'T BLAME HIM, THOUGH..."
                 ]),
            '<18>{#f/5}LIFE OUT HERE HAS BECOME KIND OF HARD LATELY.',
            ...(solo() ? [] : [ '<25>{#p/undyne}{#f/16}* Yeah...' ])
         ],
         () => [
            '<18>{#p/papyrus}{#f/5}JUST BECAUSE WE LIVE AMONGST THE STARS...',
            "<18>{#f/5}...DOESN'T MEAN WE'RE ANY LESS TRAPPED."
         ]
      ),
      s_crossroads: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}RECENTLY, PEOPLE HAVE BEEN LEAVING NOTES OUTSIDE.',
            '<18>{#f/5}DREAMS, WISHES, OFFERS OF ROMANCE...',
            ...(solo()
               ? [
                    "<18>{#f/0}REALLY, I'M OVER THE MOON ABOUT IT!",
                    "<18>{#f/0}IT'S GREAT TO SEE PEOPLE MAKING AN EFFORT.",
                    '<18>{#f/4}SANS, ON THE OTHER HAND...',
                    "<18>{#f/4}HE THINKS THEY'RE ALL JUST BEING LUNAR-TICKS."
                 ]
               : [
                    '<18>{#f/6}...',
                    "<18>{#f/6}WHAT'S THAT LOOK FOR, UNDYNE?",
                    '<25>{#p/undyne}{#f/3}* ...did you, uh...',
                    '<18>{#p/papyrus}{#f/1}DID I WHAT?',
                    '<25>{#p/undyne}{#f/15}* ...see any...\n* ...scientific notes?',
                    '<18>{#p/papyrus}{#f/6}UH...\nNO, SORRY...',
                    '<25>{#p/undyne}{#f/1}* Damn it!'
                 ])
         ],
         () => [
            ...(solo()
               ? [ '<18>{#p/papyrus}I WONDER WHAT LIFE WOULD BE LIKE WITH A MOON IN ORBIT.' ]
               : [ '<18>{#p/papyrus}DO YOU HAVE ANY HOPES AND DREAMS TO SHARE?' ])
         ]
      ),
      s_human: pager.create(
         'limit',
         () => [
            "<18>{#p/papyrus}ISN'T THAT WHERE WE FIRST MET?",
            '<18>{#f/5}WOWIE, TIME SURE DOES FLY...',
            ...(solo()
               ? [
                    "<18>{#f/0}BUT HEY, JUST LOOK AT HOW FAR WE'VE COME!",
                    world.population === 0 && !world.bullied
                       ? '<18>{#f/5}ALL THE PUZZLING AND RECONCILING WE DID...'
                       : '<18>{#f/5}ALL THE PUZZLING AND BATTLING AND DATING WE DID...',
                    '<18>{#f/0}GOOD TIMES, HUH?'
                 ]
               : [
                    '<25>{#p/undyne}{#f/14}* Man, remember how WE first met?',
                    '<18>{#p/papyrus}OH, YEAH, I WAS WAITING OUTSIDE FOR HOURS...',
                    '<25>{#p/undyne}{#f/16}* No, not that...',
                    '<25>{#f/9}* Actually, you might not even remember it.',
                    "<18>{#p/papyrus}WAIT, THERE'S MORE TO PAPYRUS THAN I THOUGHT!?",
                    '<25>{#p/undyne}{#f/1}* Always has been.',
                    "<18>{#p/papyrus}YOU'LL HAVE TO TELL ME MORE ABOUT IT LATER!"
                 ])
         ],
         () =>
            solo()
               ? [
                    '<18>{#p/papyrus}{#f/5}STILL RELIVING THE PAST?',
                    '<18>{#f/5}TRUST ME, I KNOW THE FEELING...',
                    '<18>{#f/5}I WISH I COULD GO BACK, TOO.'
                 ]
               : [ '<18>{#p/papyrus}{#f/4}YOU THINK YOU KNOW A PERSON...' ]
      ),
      s_papyrus: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}{#f/9}NYEH HEH HEH!!\nIMPRESSED!?!',
            '<18>{#f/0}NOT ONLY AM I GREAT AT PUZZLES...',
            "<18>{#f/9}I'M ALSO AN ESTEEMED ARCHITECT!!!",
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/1}* Y\'know, I WAS thinking of renovating your "sentry station..."',
                    '<25>{#f/1}* Like a surprise gift.',
                    '<18>{#p/papyrus}{#f/6}NYEH...?',
                    "<25>{#p/undyne}{#f/12}* But, uh, then I realized I'd be messing with perfection.",
                    '<18>{#p/papyrus}PERFECTION, HUH?',
                    '<25>{#p/undyne}{#f/14}* Yeah!',
                    '<18>{#p/papyrus}{#f/5}BUT, YOU ONCE SAID THINGS CAN ALWAYS BE IMPROVED!',
                    '<25>{*}{#p/undyne}{#f/17}* Wh- huh?\n* I mean... yes!!!\n* But what do I call- {%}',
                    '<18>{#p/papyrus}ALMOST-PERFECTION.\nHOW ABOUT THAT?',
                    '<25>{#p/undyne}{#f/12}* Works for me.'
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}MY BROTHER HELPED ME FIND THE BOX.' ]
               : [ '<18>{#p/papyrus}THANK YOU, HUMAN...', '<18> FOR BEING MY ALMOST- PERFECT FRIEND.' ]
      ),
      s_doggo: pager.create(
         'limit',
         () =>
            player.y > 60
               ? [
                    '<18>{#p/papyrus}{#f/5}LIFE AS A BUILDER BOT MUST BE TOUGH.',
                    '<18>{#f/5}BE NICE TO THOSE WHOSE INTELLIGENCE IS ARTIFICIAL.',
                    ...(solo()
                       ? []
                       : [
                            '<25>{#p/undyne}{#f/17}* Wait, those things still exist??',
                            "<18>{#p/papyrus}{#f/6}ACTUALLY, IT'S JUST THE ONE IN STARTON.",
                            "<25>{#p/undyne}{#f/14}* Oh.\n* Yeah, I don't know that robot very well.",
                            '<18>{#p/papyrus}{#f/4}WHAT ABOUT THE ROBOT YOU DO KNOW?',
                            '<25>{#p/undyne}{#f/4}* ...',
                            '<25>{#f/5}* ...',
                            '<18>{#p/papyrus}{#f/6}OKAY, MAYBE ANOTHER TIME!!!'
                         ])
                 ]
               : [
                    '<18>{#p/papyrus}THE SENTRY STATION OF DOGGO...',
                    '<18>{#f/5}ONE DAY, AFTER AN INCIDENT WITH THE OTHER DOGS...',
                    "<18>{#f/5}HE TOLD ME HE DIDN'T FEEL AT HOME ANYMORE.",
                    '<18>{#f/0}SO I GAVE HIM A HUG, AND TOLD HIM TO TALK IT OUT.',
                    '<18>{#f/4}OF COURSE, THE CANINE UNIT ARE A REASONABLE BUNCH.',
                    "<18>{#f/0}IT'S NO SURPRISE THINGS TURNED OUT JUST FINE!",
                    ...(solo()
                       ? []
                       : [
                            '<25>{#p/undyne}{#f/16}* Hey, I remember that incident...',
                            '<25>{#f/16}* Doggo, uh...\n* He was thinking of...',
                            '<18>{#p/papyrus}{#f/4}THINKING OF...?',
                            '<25>{#p/undyne}{#f/9}* Just... thanks for being there when you were.',
                            "<25>{#f/16}* Without you, he might've actually...",
                            '<18>{#p/papyrus}{#f/7}WHAT??\nWHAT IS IT??',
                            '<25>{#p/undyne}{#f/9}* ...',
                            '<25>{#f/12}* Uh, he would have quit the guard for a really long time.',
                            '<18>{#p/papyrus}OH!\nOKAY.'
                         ])
                 ],
         [ '<18>{#p/papyrus}{#f/0}KINDNESS REALLY -IS- A VIRTUE!' ]
      ),
      s_maze: () => [
         '<18>{#p/papyrus}{#f/5}YES, YES, I KNOW MY PUZZLES CAN BE DIFFICULT...',
         ...(save.data.b.papyrus_fire
            ? [
                 "<18>{#f/5}BUT LOOK, DON'T THINK ABOUT YOUR FAILURE...",
                 '<18>{#f/9}THINK ABOUT WHAT YOU LEARNED FROM IT!',
                 ...(solo()
                    ? []
                    : [
                         '<25>{#p/undyne}{#f/1}* Yeah!!!',
                         '<25>{#f/5}* Wait, what are you talking about?',
                         "<18>{#p/papyrus}{#f/5}THE HUMAN DIDN'T DO SO WELL ON THE WALL OF FIRE.",
                         "<25>{#p/undyne}{#f/10}* Ah.\n* Yeah, I didn't fare much better.",
                         '<18>{#p/papyrus}PRACTICE MAKES PERFECT, UNDYNE.',
                         '<18>{#f/4}YOU OF ALL FISH LADIES SHOULD KNOW THAT.',
                         '<25>{#p/undyne}{#f/17}* Hey, quit calling me that!',
                         '<18>{#p/papyrus}{#f/6}AH- SORRY!!!',
                         "<25>{#p/undyne}{#f/1}* Nah, you're good.\n* Besides...",
                         "<25>{#f/8}* When it comes from a handsome bone man like you, I can't complain!!",
                         '<18>{#p/papyrus}{#f/0}YOU CHEEKY LITTLE!!'
                      ])
              ]
            : [
                 '<18>{#f/0}BUT YOU, MY FRIEND, ARE QUITE THE PUZZLIST!',
                 "<18>{#f/9}IT'S NOT EVERY DAY SOMEONE TROUSLES THIS BONE.",
                 ...(solo()
                    ? []
                    : [
                         '<25>{#p/undyne}{#f/5}* Hey, what are you talking about?',
                         '<18>{#p/papyrus}{#f/5}THE HUMAN BEAT MY INFAMOUS "WALL OF FIRE" EARLIER.',
                         '<25>{#p/undyne}{#f/3}* Wait, really?',
                         "<25>{#f/8}* Even I can't beat that thing!",
                         '<18>{#p/papyrus}PRACTICE MAKES PERFECT, UNDYNE.',
                         "<18>{#f/4}THOUGH, I'M NOT SURE WHERE THEY GOT IT...",
                         '<18>{#f/4}CONSIDERING THAT WAS DEFINITELY THEIR FIRST TRY.',
                         '<25>{#p/undyne}{#f/17}* What?\n* Practice?\n* Screw that!!',
                         '<25>{#f/7}* GIVE ME YOUR SECRETS NOW, PUNK!!!',
                         '<18>{#p/papyrus}{#f/6}NO, LET THE PUZZLIST PUZZLE IN PEACE!'
                      ])
              ])
      ],
      s_dogs: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}THE SENTRY STATION OF DOGAMY AND DOGARESSA...',
            '<18>{#f/0}I WONDER WHAT IT WOULD BE LIKE TO MARRY A DOG.',
            "<18>{#f/4}THOUGH, I'LL NEVER HAVE TO WORRY ABOUT THAT...",
            "<18>{#f/0}I'D MUCH RATHER MARRY A VERY HANDSOME SKELETON!",
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/1}* So, basically yourself, then.',
                    "<18>{#p/papyrus}{#f/7}HUH?\nWHERE'D YOU GET THAT IDEA??",
                    "<25>{#p/undyne}{#f/1}* It's not like there's any OTHER handsome skeletons out there...",
                    '<25>{#p/undyne}{#f/8}* At least, none as handsome as yourself!',
                    '<18>{#p/papyrus}{#f/4}WELL, I SUPPOSE I DO HAVE A VERY DASHING LOOK...',
                    "<18>{#f/0}BUT NONETHELESS, IT SIMPLY WASN'T MEANT TO BE!"
                 ])
         ],
         () =>
            solo()
               ? [
                    "<18>{#p/papyrus}WHAT!?!?\nWE CAN'T MARRY!!",
                    ...(save.data.b.flirt_papyrus
                       ? [ "<18>{#f/5}WE AGREED THAT IT WOULDN'T WORK OUT, REMEMBER?" ]
                       : [ "<18>{#f/5}WE'RE JUST VERY COOL FRIENDS, REMEMBER?" ])
                 ]
               : [ '<18>{#p/papyrus}{#f/4}SUCH A PAIRING WOULD BE... TOO POWERFUL.' ]
      ),
      s_lesser: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}THIS ROOM USED TO BE CONNECTED WITH A BRIDGE.',
            '<18>{#f/0}TWO HALVES, JOINED AT THE CENTERPOINT...',
            '<18>{#f/0}LIKE THE SOULS OF TWO VERY INTREPID SKELETONS.',
            ...(solo()
               ? [
                    "<18>{#f/5}I DON'T KNOW EXACTLY WHAT SANS IS THINKING NOW...",
                    '<18>{#f/4}BUT I GET THE FEELING IT HAS TO DO WITH TOMATOES.',
                    '<18>{#f/0}YOU KNOW, IF HE STOPPED THINKING OF CONDIMENTS...',
                    '<18>{#f/9}HE MIGHT ACTUALLY "KETCHUP" ON HIS SENTRY DUTIES!'
                 ]
               : [
                    "<25>{#p/undyne}{#f/1}* Oh yeah, aren't you guys linked or something?",
                    '<18>{#p/papyrus}FOR AS LONG AS WE CAN REMEMBER!',
                    '<25>{#p/undyne}{#f/1}* I heard they did experiments with skeletons in the past.',
                    "<25>{#f/8}* If you and Sans were the result, it MUST'VE been a success!",
                    '<18>{#p/papyrus}{#f/1}ME, AN EXPERIMENT!?',
                    "<18>{#f/7}THAT'S PREPOSTEROUS!",
                    '<25>{#p/undyne}{#f/14}* Well, you never know.',
                    '<18>{#p/papyrus}{#f/4}HMM...'
                 ])
         ],
         () =>
            solo()
               ? [
                    '<18>{#p/papyrus}{#f/5}I WISH I HAD MORE TO SAY...',
                    "<18>{#f/4}BUT I CAN'T STOP THINKING ABOUT CONDIMENTS."
                 ]
               : [
                    "<18>{#p/papyrus}{#f/5}WELL, NOW I'M REALLY CURIOUS ABOUT MY PAST.",
                    '<18>{#f/5}I MIGHT DO SOME RESEARCH LATER.',
                    "<25>{#p/undyne}{#f/14}* If you'd like, I could give you a hand...",
                    "<18>{#p/papyrus}{#f/4}NO, IT'S ALRIGHT. BESIDES, AS THE GUARD CAPTAIN...",
                    '<18>{#f/4}YOU ALREADY HAVE TOO MUCH ON YOUR PLATE.'
                 ]
      ),
      s_bros: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}{#f/4}THOSE SPOT-THE- DIFFERENCE PUZZLES SANS LIKES...',
            '<18>{#f/5}THEY USED TO BE SO EASY FOR ME...',
            "<18>{#f/7}BUT LATELY, IT'S BECOME NEXT TO IMPOSSIBLE!",
            '<18>{#f/4}AND, SHORT OF SCANNING THE IMAGE PIXEL FOR PIXEL...',
            "<18>{#f/7}THERE'S NO WAY ANYONE COULD SOLVE THEM!",
            "<18>{#f/7}IT'S RIDICULOUS!",
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/1}* That puzzle artist in the librarby made it, I think.',
                    '<25>{#f/11}* I talked to her just the other day.',
                    "<25>* ...something tells me she's really bored with her job.",
                    "<18>{#p/papyrus}{#f/4}NOW THERE'S A PUZZLE..."
                 ])
         ],
         () =>
            solo()
               ? [
                    '<18>{#p/papyrus}{#f/4}ARE YOU ASKING FOR MY HELP?',
                    '<18>{#f/7}WELL, FORGET IT!',
                    "<18>{#f/0}UNFAIR PUZZLES AREN'T WORTH SOLVING, ANYWAY."
                 ]
               : [
                    '<25>{#p/undyne}{#f/1}* Whenever I get stuck on those things, I just send it over to Alphys.',
                    '<25>{#f/1}* She does some kinda fancy image subtraction thing... I dunno.',
                    "<25>{#f/12}* I have no idea how it works, but it's great at finding differences."
                 ]
      ),
      s_spaghetti: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}DID YOU ENJOY THE SPAGHETTI I MADE EARLIER?',
            "<18>{#f/0}IT'S NOT EVERY DAY YOU COOK FOR SUCH ESTEEMED GUESTS.",
            ...(solo()
               ? [
                    [
                       '<18>{#f/4}BUT, KNOWING THAT YOU WANTED TO SHARE IT...',
                       '<18>{#f/9}THAT REALLY MADE THE DIFFERENCE!'
                    ],
                    [
                       '<18>{#f/4}ESPECIALLY WHEN THAT COOKING INVOLVES...',
                       '<18>{#f/9}CONCOCTING AN IRRESISTABLE TRAP!\nNYEH!'
                    ]
                 ][(save.data.n.state_papyrus_spaghet + 1) % 2]
               : [
                    '<25>{#p/undyne}{#f/1}* Sans once told me you wanted to cook for the king.',
                    '<25>{#f/1}* Is that true?',
                    '<18>{#p/papyrus}OH, YEAH!\nI DO, ACTUALLY.',
                    "<18>I'D OFFER HIM ONLY THE HIGHEST QUALITY DISH.",
                    '<18>{#f/9}YOU AND THE HUMAN COULD EVEN HELP!',
                    "<25>{#p/undyne}{#f/8}* I'm down for it!!",
                    "<25>{#f/9}* It's just a matter of if HE is...",
                    '<18>{#p/papyrus}{#f/5}YEAH...'
                 ])
         ],
         () =>
            solo()
               ? [
                    [ '<18>{#p/papyrus}REMEMBER, SHARING IS CARING!' ],
                    [
                       '<18>{#p/papyrus}{#f/4}IF YOU EVER WANT MORE SPAGHETTI...',
                       "<18>{#f/0}DON'T HESITATE TO STOP BY MY FOOD MUSEUM!"
                    ]
                 ][(save.data.n.state_papyrus_spaghet + 1) % 2]
               : [
                    '<18>{#p/papyrus}{#f/5}THE KING CAN BE A LITTLE RECLUSIVE AT TIMES.',
                    "<18>I, UH...\nI HOPE HE'S DOING ALRIGHT UP THERE."
                 ]
      ),
      s_math: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}MATH HAS ALWAYS BEEN A PET PEEVE OF MINE.',
            '<18>{#f/5}CALCULUS THIS, GEOMETRY THAT...',
            '<18>{#f/7}WHATEVER HAPPENED TO COUNTING ON YOUR FINGERBONES?',
            '<18>{#f/0}THAT "ADVANCED" MATH IS TOTALLY UNNECESSARY.',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/17}* Unnecessary, huh?',
                    "<25>{#f/7}* Without advanced math, we'd still be living in the dark ages!",
                    "<18>{#p/papyrus}{#f/4}YEAH, I KNOW.\nI JUST DON'T LIKE SOLVING IT.",
                    "<25>{#p/undyne}{#f/14}* Oh, no, I'm with you on that."
                 ])
         ],
         () => [
            '<18>{#p/papyrus}{#f/4}IF YOU WANT HELP WITH ADVANCED MATH...',
            ...(solo()
               ? [ '<18>{#f/0}JUST ASK DR. ALPHYS!!' ]
               : [ '<25>{#p/undyne}{#f/1}* Just ask Dr. Alphys!!', '<18>{#p/papyrus}{#f/6}UH... YEAH, THAT!' ])
         ]
      ),
      s_puzzle1: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}THIS ROOM IS NORMALLY BLOCKED BY THOSE LASERS.',
            "<18>{#f/5}ALTHOUGH, WE'RE THINKING OF REMOVING THEM...",
            '<18>{#f/4}THE KING RELEASED A MANDATE ON PUZZLES RECENTLY.',
            '<18>{#f/4}HE SAYS LASERS ARE INEFFECTIVE AND HAZARDOUS TO KIDS.',
            ...(solo()
               ? [
                    "<18>{#f/5}WHILE I DO THINK THEY'RE NEAT, PART OF ME AGREES...",
                    "<18>{#f/5}I WOULDN'T WANT ANY KIDS GETTING HURT."
                 ]
               : [
                    '<25>{#p/undyne}{#f/16}* Heh...',
                    "<25>{#f/9}* That's such an Asgore thing to do.",
                    '<18>{#p/papyrus}{#f/6}BUT WHAT ABOUT THE KIDS!?',
                    "<25>{#p/undyne}{#f/1}* Yeah, I know.\n* He's probably right.",
                    '<25>{#f/8}* But damn, those lasers were pretty fun growing up!',
                    '<18>{#p/papyrus}{#f/4}OF COURSE YOU\'D FIND RISKING YOUR LIFE "FUN."',
                    "<25>{#p/undyne}{#f/14}* Who wouldn't!",
                    '<18>{#p/papyrus}{#f/6}UH, ME???'
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}REMEMBER, SAFETY FIRST!' ]
               : [
                    "<18>{#p/papyrus}{#f/4}THERE'S A BIT OF A DIFFERENCE BETWEEN RISKING A LIFE...",
                    '<18>{#f/7}AND NEEDLESSLY THROWING IT AWAY!'
                 ]
      ),
      s_puzzle2: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}HMMM... THE SOLUTION TO THIS ONE...?',
            '<18>{#f/5}I ACTUALLY JUST STEPPED OVER THE LASERS.',
            '<18>{#f/0}THEREFORE, THE SOLUTION IS TO BE TALL AND HANDSOME!',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/8}* Meanwhile, my JETPACK and I are here...',
                    '<18>{#p/papyrus}{#f/4}A JETPACK YOU ALMOST NEVER USE, MIND YOU.',
                    "<25>{#p/undyne}{#f/17}* I don't have infinite energy reserves, Papyrus!"
                 ])
         ],
         () =>
            solo()
               ? [ "<18>{#p/papyrus}{#f/4}I'M SOLVING IT AS WE SPEAK..." ]
               : [ '<18>{#p/papyrus}{#f/4}HMM...', '<18>{#f/0}UNDYNE SHOULD PROBABLY INVEST IN A BATTERY.' ]
      ),
      s_jenga: pager.create(
         'limit',
         () => [
            "<18>{#p/papyrus}{#f/5}AT FIRST, THIS PUZZLE'S OUTCOME DISAPPOINTED ME...",
            '<18>{#f/4}BUT THEN I REALIZED...',
            '<18>{#f/0}THE CHANCES OF WHAT HAPPENED WERE SO LOW...',
            '<18>{#f/0}...THAT WE MAY BE THE ONLY ONES TO EVER SEE IT!',
            '<18>{#f/0}HOW LUCKY YOU MUST FEEL RIGHT NOW.',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/5}* Hey, gambling is really bad for you, YOU KNOW THAT RIGHT?',
                    "<18>{#p/papyrus}{#f/4}WHY DOES SHE THINK I'M GAMBLING.",
                    '<25>{#p/undyne}{#f/4}* Your time could be better spent doing things that matter!',
                    '<25>{#f/5}* Like, uh...',
                    '<25>{#f/3}* ...',
                    '<18>{#p/papyrus}{#f/5}ARE YOU ALRIGHT?',
                    '<25>{#p/undyne}{#f/16}* ...sorry, bad memory.',
                    '<18>{#p/papyrus}{#f/5}I SEE.'
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}LUCK IS ON OUR SIDE TODAY, HUMAN!' ]
               : [ '<18>{#p/papyrus}{#f/5}IT APPEARS LUCK IS NOT ON OUR SIDE AFTER ALL.' ]
      ),
      s_pacing: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}THE SENTRY STATION OF CANIS MINOR...',
            "<18>{#f/4}THAT'S WHERE THOSE LOUD MOON ROCK SALESFOLK STAND.",
            '<18>{#f/5}WHAT ARE MOON ROCKS MADE OF, ANYWAY?',
            "<18>{#f/4}THEY CAN'T BE MADE OF MOONS, BECAUSE...",
            '<18>{#f/7}MOONS ARE JUST BIG ROCKS ANYWAY!',
            '<18>{#f/5}DOES THAT MEAN MOONS ARE MOON ROCKS THEMSELVES?',
            '<18>{#f/5}WHERE DOES "MOON" END AND "MOON ROCK" BEGIN?',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/1}* Serious question.',
                    '<25>{#f/7}* Do you ever worry that you THINK too much??',
                    '<18>{#p/papyrus}{#f/1}WH-\nTHINKING IS GOOD FOR THE BRAIN!',
                    "<25>{#p/undyne}{#f/1}* But you don't actually have a brain.",
                    '<25>{*}{#f/1}* You have a- {%}',
                    '<18>{#p/papyrus}{#f/7}YES, YES, I KNOW!\nSANS HAS REMINDED ME PLENTY.',
                    '<18>{#f/4}YOU SEE, HUMAN...',
                    "<18>{#f/4}WE MONSTERS DON'T REALLY USE BRAINS TO THINK.",
                    "<18>{#f/0}IT'S MORE LIKE... A SOUL THING.",
                    '<25>{#p/undyne}{#f/8}* As opposed to a SKULL thing.',
                    '<18>{#p/papyrus}{#f/7}OH MY GOD!!!'
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/4}PERHAPS US MORTALS ARE NOT WORTHY OF SUCH KNOWLEDGE.' ]
               : [ "<18>{#p/papyrus}{#f/4}YOU KNOW IT'S BAD WHEN UNDYNE STARTS MAKING PUNS." ]
      ),
      s_puzzle3: pager.create(
         'limit',
         [ '<18>{#p/papyrus}{#f/7}...', '<18>{#f/5}...', "<18>{#f/4}LET'S NOT TALK ABOUT THIS PUZZLE." ],
         () => [
            '<18>{#p/papyrus}{#f/4}...',
            ...(solo() ? [] : [ '<25>{#p/undyne}{#f/7}* HE SAID NOT TO TALK ABOUT IT, PUNK!!!' ])
         ]
      ),
      s_greater: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}THE SENTRY STATION OF CANIS MAJOR...',
            '<18>{#f/5}THAT DOG HAS A HEART OF GOLD- LADEN PLATINUM.',
            '<18>{#f/4}IF ONLY I WAS IN THE ROYAL GUARD...',
            "<18>{#f/0}I'D BE ABLE TO REPAY IT FOR ITS KINDNESS!",
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/1}* ...how so?',
                    '<18>{#p/papyrus}WELL, IF I GO TO WORK WITH HIM EVERY DAY...',
                    '<18>{#f/0}I CAN BE A MORE POSITIVE PRESENCE!',
                    '<25>{#p/undyne}{#f/9}* ...',
                    "<25>{#f/16}* You're making me reconsider some decisions.",
                    '<18>{#p/papyrus}{#f/6}LIKE... WHAT?',
                    '<25>{#p/undyne}{#f/17}* ...',
                    "<25>{#p/undyne}{#f/17}* I'll let you know when I figure it out!!",
                    '<18>{#p/papyrus}OKAY!!'
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/4}SOMETIMES, I FEEL LIKE UNDYNE TREATS ME LIKE A CHILD.' ]
               : [
                    '<18>{#p/papyrus}{#f/4}SOMETIMES, I FEEL LIKE...',
                    '<25>{#p/undyne}{#f/20}* Feel like what...?',
                    '<18>{#p/papyrus}{#f/4}UH, NEVER MIND.',
                    '<25>{#p/undyne}{#f/11}* ...',
                    "<18>{#p/papyrus}{#f/6}I SWEAR, IT'S NOTHING!",
                    '<25>{#p/undyne}{#f/16}* If you say so...'
                 ]
      ),
      s_bridge: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}REMEMBER THE "GAUNTLET OF DEADLY TERROR?"',
            '<18>{#f/5}AS MUCH AS I WANTED TO USE IT...',
            '<18>{#f/5}LIFE HAS TAUGHT ME TO AVOID PUTTING OTHERS IN DANGER.',
            ...(solo()
               ? [ "<18>{#f/0}IT'S FOR THE BEST.\nREALLY." ]
               : [
                    '<25>{#p/undyne}{#f/18}* Something you wanna talk about?',
                    '<18>{#p/papyrus}{#f/5}YOU ALREADY KNOW WHY I LEARNED THAT LESSON.',
                    '<25>{#p/undyne}{#f/18}* Oh.\n* Yeah...',
                    "<18>{#p/papyrus}{#f/6}BUT HEY, AT LEAST THEY'RE STILL ALIVE...",
                    '<25>{#p/undyne}{#f/12}* Heh, yeah.'
                 ])
         ],
         [ '<18>{#p/papyrus}{#f/5}SOME TRAPS ARE BETTER LEFT UNSPRUNG.' ]
      ),
      s_town1: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}STARTON TOWN: THE NORTH SIDE!',
            "<18>{#f/4}I DON'T REALLY SPEND MUCH TIME THERE.",
            '<18>{#f/5}SANS, ON THE OTHER HAND...',
            ...(solo()
               ? []
               : [
                    "<25>{#p/undyne}{#f/17}* Oh, I know.\n* I've SEEN him slacking at the bar.",
                    '<18>{#p/papyrus}{#f/4}TELL ME ABOUT IT...',
                    "<18>{#f/6}...ACTUALLY, DON'T TELL ME ABOUT IT!",
                    "<18>{#f/6}I DON'T EVEN WANT TO KNOW!"
                 ])
         ],
         () => [
            "<18>{#p/papyrus}DON'T WORRY!\nLAST I CHECKED, HE'S AT HOME.",
            ...(solo()
               ? []
               : [
                    "<25>{#p/undyne}{#f/5}* When it comes to Sans, that doesn't really confirm anything.",
                    '<18>{#p/papyrus}{#f/4}OH.\nYEAH, HIM AND HIS "SHORTCUTS."',
                    '<18>{#f/5}I SUPPOSE IT IS WHAT IT IS...'
                 ])
         ]
      ),
      s_town2: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}STARTON TOWN: THE SOUTH SIDE!',
            '<18>{#f/4}OR AS I LIKE TO CALL IT...',
            '<18>{#f/9}THE SUPERIOR SIDE!',
            "<18>{#f/0}THAT'S BECAUSE I LIVE THERE.",
            ...(solo()
               ? []
               : [
                    "<25>{#p/undyne}{#f/5}* Are you just saying that because you don't like Grillby's?",
                    '<18>{#p/papyrus}{#f/4}MAYBE IN THE PAST, BUT...',
                    "<18>{#f/0}WELL, MAYBE THE NORTH SIDE ISN'T SO BAD AFTER ALL."
                 ])
         ],
         () =>
            solo()
               ? [
                    "<18>{#p/papyrus}{#f/4}IT'S NO WONDER A FRIENDLY GHOST PUT THEIR SHOP HERE.",
                    "<18>{#f/9}WHO WOULDN'T WANT TO BE IN PROXIMITY OF SUCH GREATNESS?"
                 ]
               : [
                    "<18>{#p/papyrus}{#f/5}DANG... IT'S A SHAME THEY HAD TO SPLIT THE TOWN.",
                    '<18>{#p/papyrus}{#f/4}SEEMS A MONSTER- MADE LANDMASS THAT SIZE WAS TOO MUCH.'
                 ]
      ),
      s_battle: pager.create(
         'limit',
         () => [
            world.population === 0 && !world.bullied
               ? '<18>{#p/papyrus}{#f/9}STANDING AT THE SITE OF YOUR EPIC REDEMPTION ARC?'
               : '<18>{#p/papyrus}{#f/9}STANDING AT THE SITE OF OUR LEGENDARY BATTLE?',
            "<18>{#f/0}NO, NO, GO AHEAD.\nIT'S A PLACE OF HISTORICAL VALUE.",
            ...(solo()
               ? []
               : [
                    "<25>{#p/undyne}{#f/7}* Don't admire the view for too long, punk!",
                    "<25>{#f/8}* You've still gotta admire the site of OUR epic battle!",
                    '<18>{#p/papyrus}{#f/6}HOW MANY LEGENDARY BATTLES HAVE THEY BEEN IN?',
                    '<25>{#p/undyne}{#f/12}* Possibly... too many.',
                    '<25>{#p/undyne}{#f/8}* OR NOT ENOUGH!!!',
                    "<18>{#p/papyrus}{#f/9}YEAH, NOW THAT'S MORE LIKE IT!"
                 ])
         ],
         [ "<18>{#p/papyrus}{#f/4}I'M PETITIONING TO HAVE THIS PLACE PRESERVED." ]
      ),
      s_grillbys: pager.create(
         'limit',
         () => [
            "<18>{#p/papyrus}{#f/5}OH... GRILLBY'S...",
            '<18>{#f/5}I DESPISED THAT PLACE ONCE.',
            '<18>{#f/0}BUT THESE DAYS, THEIR FOOD HAS IMPROVED.',
            '<18>{#f/4}AND, MOST IMPORTANTLY...',
            '<18>{#f/1}THEY FINALLY FIXED THE JUKEBOX!!!',
            '<18>{#f/0}I KNOW!!\nCRAZY, RIGHT??',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/8}* Oh, I KNOW!!!',
                    "<25>{#f/1}* That thing's been broken since before I was BORN.",
                    '<18>{#p/papyrus}{#f/4}YEAH...'
                 ])
         ],
         () => [
            '<18>{#p/papyrus}{#f/4}TRACK THREE IS MY PERSONAL FAVORITE.',
            ...(solo() ? [] : [ "<25>{#p/undyne}{#f/8}* Mine's track four!" ])
         ]
      ),
      s_backrooms: pager.create(
         'limit',
         () => [
            "<18>{#p/papyrus}{#f/4}PART OF THE REASON GRILLBY'S FOOD IMPROVED...",
            '<18>{#f/4}HAS TO DO WITH THE USE OF REPLICATION TECHNOLOGY.',
            '<18>{#f/0}OF COURSE, THAT MADE THE KITCHEN OBSOLETE.',
            '<18>{#f/5}NOW, THAT AREA IS JUST USED TO PLAY CARD GAMES...',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/1}* Speaking of, how is Canis Minor doing?',
                    "<18>{#p/papyrus}{#f/4}OH, THEY'RE FINE, UNDYNE.",
                    '<18>{#f/4}THEY SEEM TO HAVE THEIR OWN AGENDA FOR LIFE.',
                    '<18>{#f/0}INVOLVING LOTS OF CARD GAMES!\nAND HEADPATS!'
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/5}IS CANIS MINOR STILL IN THERE...?' ]
               : [ "<18>{#p/papyrus}{#f/0}DOGS AND CARD GAMES... WHO'D HAVE THUNK IT!" ]
      ),
      s_bonehouse: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}WHAT BETTER PLACE TO BE THAN MY HOUSE!',
            "<18>{#f/0}IT'S PRACTICALLY THE ONLY PLACE I FEEL AT HOME.",
            ...(solo()
               ? []
               : [ "<25>{#p/undyne}{#f/8}* Well, obviously, it's your HOUSE after all!", '<18>{#p/papyrus}YEAH!!!' ])
         ],
         () => [
            "<18>{#p/papyrus}DON'T YOU FEEL AT HOME HERE?",
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/1}* Actually, where DO humans live??',
                    '<25>{#p/undyne}{#f/8}* I heard that Earth is a decaying mess, although it was only a rumor.',
                    '<18>{#p/papyrus}{#f/4}HONESTLY, HUMANS COULD BE FROM ANYWHERE NOWADAYS.'
                 ])
         ]
      ),
      s_papyrusroom: pager.create(
         'limit',
         () =>
            save.data.n.plot_date < 1.1
               ? [
                    '<18>{#p/papyrus}WOW, IT ONLY TOOK YOU FOUR SECONDS TO CALL ME!!',
                    '<18>YOU MUST BE VERY DESPERATE FOR MY HELP!!!',
                    "<18>{#f/9}WELL, DO NOT FEAR!\nTHIS IS PAPYRUS'S HOTFUL HELPLINE!",
                    '<18>{#f/4}JUST DESCRIBE YOUR LOCATION, AND...!',
                    '<18>{#f/6}I WILL DESCRIBE SOME HOT TIPS!',
                    '<18>{#f/0}SO, WHERE ARE YOU?',
                    '<18>{#f/4}...',
                    "<18>{#f/5}YOU'RE STILL IN MY ROOM??",
                    '<18>{#f/6}...',
                    '<18>{#f/6}HAVE YOU HEARD OF SOMETHING CALLED A... DOOR?',
                    "<18>{#f/0}WAIT, DON'T WORRY!\nI'LL DRAW A DIAGRAM FOR YOU!"
                 ]
               : save.data.n.plot_date < 1.2
               ? [
                    "<18>{#p/papyrus}{#f/1}WHAT?? I THOUGHT YOU'D LEFT MY ROOM!",
                    "<18>{#f/4}WE'LL HAVE TO START OVER FROM SQUARE ONE...",
                    '<18>{#f/0}FIRST, DO YOU KNOW WHO PAPYRUS IS!?'
                 ]
               : [
                    '<18>{#p/papyrus}{#f/4}SO YOU CAME BACK TO MY ROOM...',
                    "<18>{#f/0}JUST COULDN'T STAY AWAY FOR LONG, HUH?",
                    "<18>{#f/0}THAT'S OKAY.",
                    ...(solo()
                       ? []
                       : [
                            '<25>{#p/undyne}{#f/1}* Hey, maybe you could come over to...',
                            '<25>{#f/17}* Wait, no, my house went up in flames.',
                            '<25>{#f/8}* Never mind!'
                         ])
                 ],
         () =>
            save.data.n.plot_date < 1.1
               ? [ "<18>{#p/papyrus}{#f/6}HOLD UP!\nI'M STILL DRAWING!" ]
               : save.data.n.plot_date < 1.2
               ? [ '<18>{#p/papyrus}{#f/1}DO I KNOW WHO PAPYRUS IS!?' ]
               : [
                    "<18>{#p/papyrus}{#f/4}MAYBE WHILE YOU'RE THERE...",
                    '<18>{#f/4}YOU CAN FIGURE OUT WHERE THAT BANNER CAME FROM.',
                    ...(solo()
                       ? []
                       : [
                            '<25>{#p/undyne}{#f/1}* What, the skull and crossbones banner?',
                            "<18>{#p/papyrus}YEAH, THERE'S SOMETHING OFF ABOUT THAT THING.",
                            "<18>{#f/4}I CAN'T QUITE PUT MY FINGERBONE ON IT, THOUGH..."
                         ])
                 ]
      ),
      s_innterior: pager.create(
         'limit',
         () => [
            "<18>{#p/papyrus}THE INN'S A GREAT PLACE TO STAY.",
            ...(solo()
               ? [ '<18>I ESPECIALLY LOVE THE PHOTO ON THE WALL...', '<18>{#f/5}I FEEL... CONNECTED TO IT, SOMEHOW.' ]
               : [
                    '<25>{#p/undyne}{#f/14}* Oh yeah, the reception lady is really nice!',
                    "<25>{#f/14}* And she's a big monster history buff!"
                 ])
         ],
         () => [
            '<18>{#p/papyrus}{#f/5}DO YOU EVER WONDER WHAT LIFE WAS LIKE BEFORE THE WAR?',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/10}* Honestly, Papyrus?',
                    '<25>{#f/16}* It was pretty good.',
                    '<25>{#f/1}* Gerson and Asgore could both tell you countless stories...',
                    "<25>{#f/12}* Knowing you, it'd make for a hundred great bedtimes!",
                    '<18>{#p/papyrus}WITHOUT DOUBT!'
                 ])
         ]
      ),
      s_beddinng: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}GROWING UP, SANS USED READ ME BEDTIME STORIES.',
            '<18>HAVE YOU EVER HEARD OF "GENEROUS MONSTER?"',
            '<18>{#f/8}SANS READ IT TO ME LAST NIGHT, AND I...!',
            '<18>{#f/6}I CRIED...',
            ...(solo()
               ? [ '<18>{#f/5}THE ENDING WAS JUST TOO MUCH...' ]
               : [
                    "<25>{#p/undyne}{#f/1}* Hey, crying's not a bad thing.",
                    '<18>{#p/papyrus}{#f/5}I KNOW...',
                    '<18>{#p/papyrus}{#f/5}BUT... STILL!'
                 ])
         ],
         [ '<18>{#p/papyrus}{#f/8}IT WAS A SAD STORY, OKAY??' ]
      ),
      s_librarby: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}I LOVE THE LIBRARBY.',
            '<18>{#f/0}THE BOOKS ARE ALL ARRANGED BY COLOR!',
            ...(solo() ? [] : [ '<25>{#p/undyne}{#f/8}* Perfectly good reason to love a librarby!' ])
         ],
         [ '<18>{#p/papyrus}TELL ME, WHAT\'S A "LIBRARBY CARD?"' ]
      ),
      s_exit: pager.create(
         'limit',
         () => [
            "<18>{#p/papyrus}CAREFUL, THAT'S THE FOUNDRY ENTRANCE.",
            '<18>{#f/4}ONLY DARKNESS AWAITS YOU IN THAT FORSAKEN PLACE.',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/1}* Ha, no argument from me.',
                    '<25>{#f/8}* Half the time I just use my jetpack as a flashlight!'
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/4}DID I SAY THE FOUNDRY WAS DARK?\nBECAUSE IT IS.' ]
               : [
                    "<18>{#p/papyrus}IF I'VE LEARNED ONE THING FROM UNDYNE...",
                    "<18>{#f/0}IT'S THAT JETPACKS ARE PRETTY NEATO, ACTUALLY.",
                    '<25>{#p/undyne}{#f/1}* Anything you can do in a shuttle, you can do faster in a jetpack!',
                    '<25>{#f/8}* AND IT LOOKS COOLER!!'
                 ]
      ),
      f_start: pager.create(
         'limit',
         () => [
            "<18>{#p/papyrus}SO YOU'RE IN THE FOUNDRY NOW.",
            '<18>{#f/4}YOU SHOULD WATCH YOURSELF IN THERE...',
            '<18>{#f/0}THOSE STEAM VENTS ARE UNWIELDY.',
            ...(solo()
               ? []
               : [
                    "<25>{#p/undyne}{#f/17}* Steam??\n* That's what you're worried about??",
                    '<25>{#f/8}* I used to swing on the pipes like they were monkey bars!',
                    "<18>{#p/papyrus}{#f/6}UNDYNE, NO!\nDON'T ENCOURAGE THEM FURTHER!!"
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/6}A SKELETON CAN ONLY TAKE SO MUCH HEAT!' ]
               : [ '<18>{#p/papyrus}{#f/6}A SKELETON CAN ONLY TAKE SO MUCH ACTION!' ]
      ),
      f_sans: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}{#f/0}MY BROTHER HAS A STATION HERE.',
            '<18>{#f/4}YES, HE MANS TWO STATIONS AT ONCE.',
            "<18>{#f/0}AMAZING, ISN'T HE?",
            '<18>{#f/7}HE SLACKS OFF TWICE AS MUCH AS NORMAL!!',
            ...(solo()
               ? []
               : [
                    "<25>{#p/undyne}{#f/17}* Hey, at least he's keeping watch, right??",
                    "<18>{#p/papyrus}{#f/6}UNDYNE, NO!\nDON'T ENCOURAGE THEM FURTHER!!"
                 ])
         ],
         [ '<18>{#p/papyrus}{#f/6}NORMAL FOLKS CAN ONLY DREAM OF SUCH SLOTH...' ]
      ),
      f_corridor: pager.create(
         'limit',
         () => [
            "<18>{#p/papyrus}WHAT'S IN YOUR DIMENSIONAL BOX?",
            "<18>{#f/4}ACTUALLY, DON'T TELL ME.",
            "<18>{#f/7}THAT'D BE A BLATANT VIOLATION OF YOUR PRIVACY!",
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/8}* Wait, no!\n* I wanna know!',
                    "<25>{#f/17}* You!\n* What've you been hiding, punk!?",
                    '<18>{#p/papyrus}{#f/6}UNDYNE, NO!'
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/4}...AT LEAST TELL ME IT\'S NOT "DOG RESIDUE."' ]
               : [
                    '<18>{#p/papyrus}{#f/6}ER, SORRY ABOUT THAT...',
                    "<18>{#f/0}UNDYNE DOESN'T ACTUALLY WANT TO STEAL YOUR STUFF.",
                    "<25>{#p/undyne}{#f/12}* Me? Stealing?\n* Pfft, I dunno what you're talking about!",
                    "<18>{*}{#p/papyrus}SEE?\nSHE'S NOT- {%}",
                    "<25>{#p/undyne}{#f/17}* I'd only steal from someone who ISN'T the nicest punk around!",
                    '<18>{#p/papyrus}{#f/1}UNDYNE!!!'
                 ]
      ),
      f_armor: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}"BEWARE OF SLEEPING DOGS."',
            '<18>AN OMINOUS WARNING, BUT...',
            '<18>WHO MIGHT THIS DOG POSSIBLY BE?',
            ...(solo()
               ? []
               : [
                    "<25>{#p/undyne}{#f/1}* Well, duh... it's Doge!\n* One of my top guards.",
                    '<25>{#f/16}* Well, WAS one of my top guards.',
                    '<25>{#f/9}* ...\n* I think I went a bit too hard on her.',
                    "<18>{#p/papyrus}HEY, DON'T BEAT YOURSELF UP OVER IT.",
                    '<18>YOU CAN JUST APOLOGIZE TO HER LATER!',
                    "<25>{#p/undyne}{#f/16}* Heh... it's gonna take a bit more than a simple apology."
                 ])
         ],
         () =>
            solo()
               ? [ "<18>{#p/papyrus}MAYBE IT'S THAT PESKY CANINE WHO HANGS BY MY HOUSE." ]
               : [
                    "<18>{#p/papyrus}{#f/5}IF I WERE YOU, I'D BE SURE TO TALK THINGS OUT.",
                    "<25>{#p/undyne}{#f/12}* Yeah, that's the plan!",
                    '<18>{#p/papyrus}{#f/0}GOOD!'
                 ]
      ),
      f_doge: () => [
         '<18>{#p/papyrus}{#f/3}UGH... ANYWHERE BUT THAT CREEPY HALLWAY.',
         ...(solo()
            ? []
            : [
                 "<25>{#p/undyne}{#f/3}* What's so creepy about it?",
                 "<18>{#p/papyrus}{#f/5}THAT ILLUSTRATION...\nIT'S SO...",
                 '<18>{#f/5}JUST... NO.'
              ])
      ],
      f_puzzle1: pager.create('limit', () =>
         save.data.n.plot < 48
            ? [
                 '<18>{#p/papyrus}{#f/0}WATCH OUT FOR THE ANCIENT HUMAN PYLON PUZZLES!',
                 '<18>THOUGH RUDIMENTARY IN THEIR METHOD OF CONSTRUCTION...',
                 '<18>THEIR DESIGN IS NOTHING SHORT OF PERPLEXING!'
              ]
            : [
                 "<18>{#p/papyrus}{#f/4}SO, HOW'D YOU FARE WITH THE PYLON PUZZLES?",
                 '<18>{#f/5}I STRUGGLED WITH THEM GREATLY.',
                 ...(solo()
                    ? []
                    : [
                         "<25>{#p/undyne}{#f/1}* They weren't built by monsters, so it actually makes sense.",
                         '<25>{#f/8}* Makes me wonder if the human struggles on monster-made puzzles!'
                      ])
              ]
      ),
      f_quiche: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}{#f/5}AM I THE ONLY ONE WHO FINDS IT ODD...',
            '<18>THAT A RANDOM BENCH SITS HERE?',
            ...(solo()
               ? []
               : [
                    "<25>{#p/undyne}{#f/3}* Actually, you're not the only one.",
                    '<25>{#f/8}* Why IS there just a bench there?',
                    "<18>{#p/papyrus}{#f/4}I DOUBT WE'LL EVER KNOW.",
                    "<25>{#p/undyne}{#f/16}* Yeah...\n* You're probably right."
                 ])
         ],
         [ '<18>{#p/papyrus}{#f/4}BEWARE OF OUT OF PLACE OBJECTS.\nESPECIALLY HERE.' ]
      ),
      f_puzzle2: pager.create('limit', () =>
         save.data.n.plot < 48
            ? [ '<18>{#p/papyrus}{#f/0}THIS PUZZLE IS JUST LIKE THE LAST ONE, BUT WORSE.', '<18>{#f/8}SOMEONE SAVE US!' ]
            : [
                 "<18>{#p/papyrus}{#f/4}SO, HOW'D YOU FARE WITH THE PYLON PUZZLES?",
                 '<18>{#f/5}I STRUGGLED WITH THEM GREATLY.',
                 ...(solo()
                    ? []
                    : [
                         "<25>{#p/undyne}{#f/1}* They weren't built by monsters, so it actually makes sense.",
                         '<25>{#f/8}* Makes me wonder if the human struggles on monster-made puzzles!'
                      ])
              ]
      ),
      f_story1: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}{#f/0}SIGNAL STARS ARE PRETTY NEAT, HUH?',
            '<18>THOUGH, THEY ONLY RESET PERIODICALLY.',
            '<18>UNTIL THEN, ONLY A SINGLE MESSAGE IS SAVED.',
            ...(solo()
               ? []
               : [
                    "<25>{#p/undyne}{#f/10}* So that's why messages to Alphys haven't been getting through.",
                    '<25>{#f/7}* Damn!'
                 ])
         ],
         [ "<18>{#p/papyrus}{#f/4}THIS PHONE CALL PROBABLY WON'T BE RECORDED." ]
      ),
      f_prechase: pager.create('limit', () =>
         save.data.n.plot < 37.11
            ? []
            : save.data.n.plot < 48
            ? [
                 '<18>{#p/papyrus}THERE USED TO BE A BRIDGE HERE, BUT IT COLLAPSED.',
                 '<18>HOPEFULLY THEY BUILD A NEW ONE SOON...',
                 '<18>{#f/6}RIDING A FLIMSY FLOATING PLATFORM IS NERVEWRACKING!'
              ]
            : [
                 "<18>{#p/papyrus}I HEARD THERE'S A NEW BRIDGE HERE!",
                 '<18>THANK HEAVENS...',
                 '<18>I WAS GETTING TIRED OF THAT FLOATING PLATFORM.',
                 ...(solo()
                    ? []
                    : [
                         "<25>{#p/undyne}{#f/8}* What's so bad about a floating platform!?",
                         "<18>{#p/papyrus}{#f/4}YOU HAVE A JETPACK, SO YOU CAN'T FALL OFF.",
                         '<18>{#f/6}I HAVE NO SUCH GUARUNTEES!',
                         '<25>{#p/undyne}{#f/1}* Oh, come on, the gravity on that thing was secure.',
                         "<18>{#p/papyrus}{#f/6}I'LL BELIEVE IT WHEN I SEE IT!",
                         "<18>{#f/4}WHICH I WON'T EVER DO, BECAUSE...",
                         '<18>{#f/0}THE BRIDGE IS BACK IN PLACE, THANKS TO THOSE WORKERS.'
                      ])
              ]
      ),
      f_chase: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}{#f/4}THE FIRST TIME I SAW THIS ROOM, I WAS... AMAZED.',
            "<18>{#f/6}SO MUCH SO, THAT I COULDN'T FIND MY WAY OUT!",
            '<18>{#f/5}NOT TO MENTION THE TRAPS...',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/1}* Oh yeah, I forgot about those things.',
                    "<25>{#p/undyne}{#f/14}* Most people know the way through, though, so it's altight.",
                    '<18>{#p/papyrus}{#f/4}THIS SEEMS LIKE A RECIPE FOR DISASTER.',
                    "<25>{#p/undyne}{#f/8}* Hey, at least it's fun!",
                    '<18>{#p/papyrus}{#f/6}FUN!?!?'
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#f/5}I FIND IT BEST TO STEER CLEAR OF SCARY MAZE GAMES.' ]
               : [
                    "<25>{#p/undyne}{#f/12}* There used to be a lot more, actually.\n* It's not what it was.",
                    '<18>{#p/papyrus}{#f/4}HOW MUCH MORE?',
                    '<25>{#p/undyne}{#f/9}* ...\n* Many more.',
                    '<18>{#p/papyrus}{#f/5}HOW MANY?',
                    '<25>{#p/undyne}{#f/16}* Very.',
                    '<18>{#p/papyrus}{#f/6}HOW VERY??',
                    '<25>{#p/undyne}{#f/7}* Knock it off!'
                 ]
      ),
      f_entrance: pager.create(
         'limit',
         () => [
            "<18>{#p/papyrus}{#f/0}YOU'RE AT THE ENTRANCE TO WHAT'S KNOWN AS...",
            '<18>{#f/9}THE "DARK ZONE."',
            "<18>{#f/4}IT'S CALLED THAT BECAUSE THE WALLS ARE VERY DARK.",
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/1}* You can thank Asgore for that brilliancy in naming.',
                    '<25>{#p/undyne}{#f/8}* He always has the BEST names for things!',
                    '<18>{#p/papyrus}{#f/9}IF BY "BEST" YOU MEAN MOST OBVIOUS, THEN YES!',
                    '<25>{#p/undyne}{#f/8}* What!?',
                    "<18>{#p/papyrus}{#f/0}IT'S A QUALITY OF HIS I APPRECIATE.",
                    '<25>{#p/undyne}{#f/3}* Oh.',
                    '<18>{#p/papyrus}{#f/0}HE MAKES THINGS EASY TO UNDERSTAND.',
                    '<25>{#p/undyne}{#f/1}* I see.'
                 ])
         ],
         () =>
            solo()
               ? [
                    "<18>{#p/papyrus}{#f/6}IT'S ALSO JUST VERY DARK IN GENERAL.",
                    "<18>{#p/papyrus}{#f/6}SO THERE'S THAT."
                 ]
               : [ "<18>{#p/papyrus}{#f/0}AREN'T THINGS BETTER WHEN YOU UNDERSTAND THEM?" ]
      ),
      f_bird: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}{#f/9}THE MOST INFAMOUS.',
            '<18>{#f/9}THE MOST FEARLESS.',
            '<18>{#f/9}THE MOST BRAVESTEST.',
            '<18>{#f/9}THE MONSTER.\nTHE MYTH.\nTHE LEGEND...',
            "<18>{#f/9}IT'S THE YELLOW BIRD.",
            ...(save.data.n.plot < 42
               ? [
                    '<18>{#f/9}...',
                    '<18>{#f/4}...WAIT.',
                    "<18>{#f/1}IT'S NOT THERE RIGHT NOW!?!?",
                    '<18>{#f/8}HOW COULD THIS BE!!!'
                 ]
               : solo()
               ? [ '<18>{#f/4}...NOT LIKE WE HAVE ANY OTHER WAY TO CROSS THE GAP.' ]
               : [
                    '<25>{#p/undyne}{#f/1}* That bird will carry anyone past the gap.\n* It NEVER says no.',
                    '<25>{#f/16}* When I was younger, it gave me a lift.\n* It took an hour...',
                    '<25>{#f/17}* But this bird NEVER once thought of giving up!!!',
                    '<25>{#f/1}* Cherish this bird.'
                 ])
         ],
         () =>
            save.data.n.plot < 42
               ? [
                    "<18>{#p/papyrus}{#f/8}I DON'T UNDERSTAND LIFE ANYMORE!",
                    '<18>{#f/8}HOW COULD THE ONE AND ONLY YELLOW BIRD ABANDON US!'
                 ]
               : [
                    '<18>{#p/papyrus}{#f/0}TRUST ME, THE GAP IS EVEN LONGER THAN IT SEEMS.',
                    '<18>{#f/0}AND POSSIBLY NON- EUCLIDIAN.',
                    ...(solo()
                       ? []
                       : [
                            '<25>{#p/undyne}{#f/7}* What.',
                            '<18>{*}{#p/papyrus}{#f/0}NON-EUCLIDIAN!\nYOU KNOW... THAT THING WHERE- {%}',
                            "<25>{#p/undyne}{#f/1}* Sometimes I wonder why you aren't working at the lab."
                         ])
                 ]
      ),
      f_stand: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}{#f/0}LEGEND HAS IT...',
            '<18>THE LOCAL ICE CREAM GUY HANDS OUT PUNCH CARDS.',
            '<18>{#f/4}SOURCES SAY THESE "PUNCH CARDS" HAVE UNSPOKEN POWER...',
            '<18>{#f/9}...TO UNLOCK MORE TASTY TREATS!',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/8}* And we love tasty treats!!',
                    "<25>{#p/undyne}{#f/16}* Just, umm, don't eat too many in one go.",
                    "<25>{#p/undyne}{#f/8}* You'd never hear the end of it from Alphys!!"
                 ])
         ],
         () => [
            "<18>{#p/papyrus}{#f/5}BRING ME A TREAT, WON'T YOU?",
            ...(solo() ? [] : [ "<25>{#p/undyne}{#f/7}* And don't you dare leave me out!!" ])
         ]
      ),
      f_abyss: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}{#f/4}WE LOOK UPON THIS WINDING PATH FULL OF SIGNAL STARS...',
            '<18>{#f/4}AND WE DEEM IT "NORMAL."',
            '<18>{#f/0}YOU KNOW WHAT ELSE IS "NORMAL?"',
            '<18>{#f/0}THE FACT THAT THIS PHONE CALL EVEN GETS DOWN THERE!',
            '<18>{#f/6}TOTALLY NORMAL!',
            ...(solo()
               ? []
               : [
                    "<25>{#p/undyne}{#f/1}* So you're saying that's NOT normal, right?",
                    '<18>{#p/papyrus}{#f/4}RIGHT.',
                    '<25>{#p/undyne}{#f/12}* Well done! You seem to be improving at sarcasm.',
                    "<18>{#p/papyrus}{#f/9}I CAN'T WAIT TO USE IT ON MY BROTHER!",
                    "<25>{#p/undyne}{#f/14}* Careful, he's the de- facto sarcasm wizard.",
                    "<25>{#p/undyne}{#f/12}* If you want any chance of besting him, you've gotta train like crazy!",
                    "<18>{#p/papyrus}{#f/4}OH, BELIEVE ME, UNDYNE, I'M READY.",
                    "<25>{#p/undyne}{#f/8}* I hope you're not being sarcastic about that!"
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/4}IT\'S CALLED "SARCASM."', "<18>UNDYNE'S BEEN TEACHING IT TO ME." ]
               : [ "<19>{#p/papyrus}{#f/4}SARCASM TRAINING'S -TOTALLY- THE EASIEST THING EVER." ]
      ),
      f_muffet: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}{#f/0}I WAS SURFING THE WEB THE OTHER DAY...',
            "<18>{#f/0}TURNS OUT SPIDER SILK IS STRONGER THAN YOU'D THINK!",
            '<18>{#f/6}WHICH WEB WAS I SURFING, YOU ASK?',
            "<18>{#f/6}...\nYOU PROBABLY DON'T WANT TO KNOW.",
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/17}* Papyrus, not again!',
                    '<18>{#p/papyrus}{#f/4}WELL, YOU SEE...',
                    '<18>{#p/papyrus}{#f/6}I WANTED TO KNOW WHERE THE LITTLE STRINGS WENT!',
                    '<25>{#p/undyne}{#f/17}* That was your reason last time!',
                    '<18>{#p/papyrus}{#f/6}BUT... CURIOSITY!',
                    '<25>{#p/undyne}{#f/12}* Maybe leave the web-crawling to me, okay?'
                 ])
         ],
         () =>
            solo()
               ? [ "<18>{#p/papyrus}{#f/4}WELL... IT WASN'T THE INTERNET." ]
               : [ "<18>{#p/papyrus}{#f/4}WELL... MAYBE IT'S SAFER TO RESEARCH FROM AFAR." ]
      ),
      f_shyren: pager.create(
         'limit',
         () => [
            "<18>{#p/papyrus}{#f/0}I'VE HEARD A SHY MONSTER LIVES AROUND HERE.",
            ...(solo()
               ? [
                    '<18>{#f/4}WELL, IF YOU WANT TO GET SOMEONE TO OPEN UP...',
                    '<18>{#f/0}YOU SHOULD ENGAGE THEM IN COMBAT!'
                 ]
               : [
                    "<25>{#p/undyne}{#f/1}* Oh, that'd be Shyren.",
                    '<25>* I used to give her piano lessons...',
                    '<25>{#f/14}* She was really talented for someone with no appendages.',
                    '<25>{#f/16}* One day, though, she stopped coming to her lessons...',
                    '<25>{#f/11}* How did her song go again...?'
                 ])
         ],
         () => [ '<18>{#p/papyrus}{#f/0}HUM HUM HUM...', ...(solo() ? [] : [ '<25>{#p/undyne}{#f/12}* Hum hum hum...' ]) ]
      ),
      f_statue: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}{#f/4}A MYSTERIOUS STATUE...',
            '<18>{#p/papyrus}{#f/4}I WONDER WHAT IT COULD BE FOR.',
            ...(solo()
               ? []
               : [
                    "<25>{#p/undyne}{#f/16}* That statue's been there forever...",
                    '<25>{#p/undyne}{#f/9}* Nobody seems to know where it came from.'
                 ])
         ],
         () => [
            ...(solo()
               ? [
                    "<18>{#p/papyrus}{#f/4}IT'S A FACT OF LIFE...",
                    '<18>{#p/papyrus}{#f/6}THE MYSTERIOUS STATUE IS MYSTERIOUS.'
                 ]
               : [ "<25>{#p/undyne}{#f/14}* It's got a cool music box, though." ])
         ]
      ),
      f_piano: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}HUH!?\nARE YOU SERENADING ME!?',
            "<18>{#f/1}NO!!!\nYOU'RE GONNA MAKE ME BLUSH!!!",
            ...(solo()
               ? []
               : [
                    "<25>{#p/undyne}{#f/17}* Oh yeah, there's a puzzle there!",
                    '<25>{#p/undyne}{#f/1}* Whoever built it must have great taste.',
                    '<25>{#p/undyne}{#f/8}* FIGHTING THE IVORIES IS THE BEST!'
                 ])
         ],
         () => [
            "<18>{#p/papyrus}LET'S WRITE A MUSICAL ABOUT OUR ADVENTURES!",
            ...(solo() ? [] : [ "<25>{#p/undyne}{#f/8}* I'm down to sing it!" ])
         ]
      ),
      f_artifact: pager.create(
         'limit',
         () => [
            "<18>{#p/papyrus}I DON'T THINK I'VE EVER BEEN IN THIS ROOM BEFORE.",
            "<18>WHAT'S IT LIKE?\nARE THERE UNTOLD TREASURES ABOUND?",
            '<18>{#f/4}FOR THE RECORD, THAT QUESTION WAS RHETORICAL.',
            "<18>{#f/9}I'D RATHER FIND OUT FOR MYSELF!",
            ...(solo()
               ? []
               : [
                    "<25>{#p/undyne}{#f/1}* Glad to see your sense of adventure hasn't gone away.",
                    '<18>{#p/papyrus}{#f/9}OF COURSE NOT!\nI, THE GREAT PAPYRUS...',
                    '<18>{#f/9}HAVE A SENSE OF ADVENTURE BEYOND COMPARE!',
                    "<18>{#f/4}WELL, THAT'S NOT ENTIRELY TRUE.",
                    '<18>{#f/4}SANS FINDS NEW WAYS OF EXPLORING THE COUCH DAILY.',
                    '<25>{#p/undyne}{#f/17}* Oh.',
                    "<25>{#p/undyne}{#f/8}* So that's why that thing is such a mess!!"
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/6}NO SPOILERS!!!' ]
               : [
                    "<18>{#p/papyrus}{#f/4}YOU'D BE AMAZED BY SANS'S MANY FEATS.",
                    '<18>{#f/0}AND, BELIEVE IT OR NOT, NOT ALL OF THEM ARE BAD!',
                    '<18>{#f/5}LIKE THAT TIME HE USED "SHORTCUTS" TO SAVE MY LIFE.',
                    '<25>{#p/undyne}{#f/14}* The more you know, huh?'
                 ]
      ),
      f_path: pager.create(
         'limit',
         () => [
            "<18>{#p/papyrus}{#f/0}KEEP GOING, AND YOU'LL WITNESS THE CITADEL.",
            "<18>{#f/5}YOU CAN'T NORMALLY SEE IT DUE TO SOME TIME-PHASING.",
            '<18>{#f/4}BUT SOMETHING ABOUT THAT ONE ROOM...',
            '<18>...MAKES IT POSSIBLE TO VIEW...',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/1}* Could be one of those spatial anomalies.',
                    '<18>{#p/papyrus}{#f/4}IF SO, THEN THE HUMAN BETTER BE CAREFUL.',
                    "<25>{#p/undyne}{#f/12}* But I've been through there many times, and I never got stuck.",
                    '<18>{#p/papyrus}{#f/7}JUST BE CAREFUL!'
                 ])
         ],
         [ '<18>{#p/papyrus}NOT ALL SPATIAL ANOMALIES ARE MADE EQUAL, IT SEEMS.' ]
      ),
      f_view: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}{#f/0}YOU MUST BE A VERY GREAT MULTITASKER!',
            "<18>{#f/4}IT'D TAKE ONE TO WANT TO CALL SOMEONE...",
            '<18>{#f/4}WITH A VIEW LIKE THAT SITTING AHEAD OF THEM.',
            ...(solo() ? [] : [ '<25>{#p/undyne}{#f/1}* Amen to that.' ])
         ],
         [
            '<18>{#p/papyrus}{#f/7}WHAT ARE YOU DOING CALLING ME?',
            "<18>{#p/papyrus}{#f/7}YOU'VE GOT FANCY STRUCTURES TO ADMIRE!"
         ]
      ),
      f_plank: [
         '<18>{#p/papyrus}{#f/0}THE SIGNAL IS WEAK FROM THERE.',
         "<18>{#f/6}GO ANY FUTHER, AND I WON'T BE ABLE TO REACH YOU!",
         "<18>{#f/0}CALL BACK WHEN YOU'RE NOT SO FAR OUT."
      ],
      f_dummy: pager.create(
         'limit',
         () => [
            "<18>{#p/papyrus}{#f/0}DON'T LOOK PAST THE HIDDEN PATH...",
            '<18>{#f/0}CLOSE YOUR EYES, WALK STRAIGHT...',
            "<18>AND FACE THE TEMMIES' WRATH.",
            "<18>{#f/4}IT'S A RIDDLE I'VE HEARD ABOUT THIS PLACE.",
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/4}* A riddle about temmies?',
                    '<25>{#p/undyne}{#f/7}* No riddle can locate THOSE guys!'
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/6}APPARENTLY, TEMMIES ARE RATHER HARD TO FIND.' ]
               : [ '<18>{#p/papyrus}{#f/4}DO YOU KNOW HOW TO SOLVE THIS RIDDLE?' ]
      ),
      f_hub: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}IF YOU SEE A SHOP, YOU SHOULD STOP...',
            '<18>{#f/4}DROP, AND ROLL...',
            '<18>{#f/0}INTO SOME GREAT DEALS!!',
            ...(solo()
               ? [
                    "<18>{#f/9}BECAUSE WE'RE HAVING A FIRE SALE!!",
                    '<18>{#f/5}AT MY IMAGINARY STORE, WHICH SELLS FLAMES.'
                 ]
               : [
                    "<25>{#p/undyne}{#f/1}* Like the ones at Gerson's shop?",
                    "<25>{#f/17}* See, he's the toughest monster that ever lived.",
                    '<25>{#f/16}* He fought in the war between humans and monsters...',
                    "<25>{#f/1}* And yet, he survived!\n* He's a real hero.",
                    '<18>{#p/papyrus}{#f/4}I WAS GOING TO SAY SOMETHING ELSE, BUT OKAY.',
                    '<18>{#f/0}HOORAY FOR GERSON!'
                 ])
         ],
         [ "<18>{#p/papyrus}{#f/5}IT'S YET ANOTHER A DREAM OF MINE." ]
      ),
      f_undyne: pager.create(
         'limit',
         () => [
            "<18>{#p/papyrus}{#f/0}THAT'S UNDYNE'S HOUSE.",
            ...(save.data.n.plot < 48 || world.trueKills > 0
               ? [ "<18>{#f/0}IT'S THE IDEAL PLACE TO LEARN HOW TO COOK!" ]
               : save.data.n.plot_date < 1.3
               ? [ '<18>{#f/4}YOU KNOW, THE ONE WITH THE SKELETON IN FRONT.' ]
               : save.data.n.plot_date < 2
               ? [ "<18>{#f/9}DON'T HESITATE TO COME INSIDE!" ]
               : save.data.n.plot_date < 2.1
               ? [
                    "<18>{#f/0}YOU'RE STILL AT UNDYNE'S HOUSE?",
                    "<18>{#f/5}SHE, UH, HASN'T EVEN MET UP WITH ME YET.",
                    '<18>{#f/4}MAYBE LEAVE THE ROOM AND...',
                    '<18>{#f/1}... {%}',
                    '<25>{#p/undyne}{#f/12}* Huff... puff...!',
                    "<25>{#f/12}* YEAH!!!\n* That's MY HOUSE!!!",
                    "<18>{#p/papyrus}{#f/6}UH, HI UNDYNE!\nHOW'D YOU GET HERE SO FAST?",
                    '<25>{#p/undyne}{#f/17}I ran.',
                    '<18>{#p/papyrus}{#f/1}WHAT??\nTHEN YOU MUST HAVE SOMETHING...',
                    '<18>{#f/9}EXTREMELY COOL TO SAY ABOUT YOUR HOUSE!!!',
                    '<25>{#p/undyne}{#f/14}* Nope!!!'
                 ]
               : [
                    '<18>{#f/4}WELL, IT WAS, UNTIL...',
                    '<25>{#p/undyne}{#f/12}* Yeah, we kinda blew it up.',
                    '<25>{#f/8}* BUT WHO CARES??',
                    '<25>{#f/8}* HANGING OUT WITH PAPYRUS IS JUST AS GOOD!'
                 ])
         ],
         () =>
            save.data.n.plot < 48 || world.trueKills > 0
               ? [
                    '<18>{#p/papyrus}{#f/0}PRO TIP WHEN COOKING WITH UNDYNE...',
                    "<18>{#f/4}ONCE SHE STARTS POUNDING VEGGIES, IT'S TIME TO BAIL."
                 ]
               : save.data.n.plot_date < 1.3
               ? [ '<18>{#p/papyrus}{#f/0}NICE TO SEE YOU, TOO!' ]
               : save.data.n.plot_date < 2
               ? [ "<18>{#p/papyrus}{#f/6}WE'RE STILL WAITING INSIDE, YOU KNOW..." ]
               : save.data.n.plot_date < 2.1
               ? [
                    "<18>{#p/papyrus}{#f/0}DON'T WORRY, HUMAN.",
                    "<18>{#f/0}I'M SURE SHE'LL COME UP WITH SOMETHING.",
                    '<18>{#f/6}NO PRESSURE, OF COURSE!!!',
                    '<25>{#p/undyne}{#f/12}* Not at all!'
                 ]
               : [
                    '<18>{#p/papyrus}{#f/0}YOU MIGHT AS WELL CALL ME THE HANGOUT HANDYMAN!',
                    '<18>{#f/4}I MAY NOT BE ABLE TO FIX YOUR HOUSE...',
                    '<18>{#f/9}BUT I CAN STILL FIX YOUR DAY!',
                    '<18>{#f/0}BY HANGING OUT, OF COURSE.'
                 ]
      ),
      f_blooky: pager.create(
         'limit',
         () => [
            "<18>{#p/papyrus}{#f/0}HEY, THAT'S WHERE NAPSTABLOOK LIVES.",
            '<18>{#f/5}DESPITE FEELING SAD, THEY DECLINE OFFERS OF HELP...',
            '<18>{#f/0}EXCEPT FOR WHEN THEY LET US BUILD A SNAIL PRESERVE!',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/12}* Oh yeah, they were really happy about that...',
                    "<25>{#p/undyne}{#f/7}* But, uh, they haven't said much since."
                 ])
         ],
         () =>
            solo()
               ? [
                    '<18>{#p/papyrus}{#f/0}THE SNAIL PRESERVE KEEPS THEM BUSY, AND LESS LONELY.',
                    '<18>{#f/9}AN A-PLUS COMBINATION IF YOU ASK ME!'
                 ]
               : [
                    "<18>{#p/papyrus}{#f/4}MAYBE THEY'RE JUST AFRAID OF YOU.",
                    '<25>{#p/undyne}{#f/7}* Me??\n* Scary???',
                    '<25>{#p/undyne}{#f/14}* Not a chance!'
                 ]
      ),
      f_snail: pager.create(
         'limit',
         () => [
            "<18>{#p/papyrus}{#f/0}HEY, THAT'S WHERE NAPSTABLOOK LIVES.",
            '<18>{#f/5}DESPITE BEING SAD, THEY TURN DOWN OFFERS OF HELP...',
            '<18>{#f/0}EXCEPT FOR WHEN THEY LET US BUILD A SNAIL PRESERVE!',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/12}* Oh yeah, they were really happy about that...',
                    "<25>{#p/undyne}{#f/10}* But, uh, they haven't said much since."
                 ])
         ],
         () =>
            solo()
               ? [
                    '<18>{#p/papyrus}{#f/0}THE SNAIL PRESERVE KEEPS THEM BUSY, AND LESS LONELY.',
                    '<18>{#f/9}AN A-PLUS COMBINATION IF YOU ASK ME!'
                 ]
               : [
                    "<18>{#p/papyrus}{#f/4}MAYBE THEY'RE JUST AFRAID OF YOU.",
                    '<25>{#p/undyne}{#f/7}* Me??\n* Scary???',
                    '<25>{#p/undyne}{#f/8}* Not a chance!'
                 ]
      ),
      f_napstablook: pager.create(
         'limit',
         () =>
            save.data.n.state_foundry_blookdate < 2
               ? [
                    "<18>{#p/papyrus}{#f/0}SO YOU'RE MAKING FRIENDS WITH A GHOST, HUH?",
                    '<18>{#p/papyrus}{#f/4}IS THERE NOTHING BEYOND YOUR GRASP OF FRIENDSHIP?',
                    '<18>{#p/papyrus}{#f/9}YOU SEEM TO HAVE A KNACK FOR IT!',
                    ...(solo() ? [] : [ "<25>{#p/undyne}{#f/16}* ...I just hope they're feeling alright." ])
                 ]
               : [
                    '<18>{#p/papyrus}{#f/4}HMM...',
                    '<18>{#p/papyrus}{#f/4}WHY DO I HEAR BOSS MUSIC?',
                    ...(solo()
                       ? [
                            '<18>{#p/papyrus}{#f/0}...SORRY, DID I SAY "BOSS" MUSIC?',
                            '<18>{#p/papyrus}{#f/5}I MEANT "BOSSA NOVA."'
                         ]
                       : [
                            "<25>{#p/undyne}{#f/8}* BECAUSE I'M HERE, SILLY!",
                            '<18>{#p/papyrus}{#f/6}OH, RIGHT!\nYES, OF COURSE!',
                            '<18>THAT EXPLAINS IT!!'
                         ])
                 ],
         () =>
            save.data.n.state_foundry_blookdate < 2
               ? solo()
                  ? [ '<18>{#p/papyrus}{#f/5}WATCH OUT FOR THE ECTOPLASM...' ]
                  : [ '<18>{#p/papyrus}{#f/5}MAYBE... TRY NOT TO HURT THEIR FEELINGS.' ]
               : solo()
               ? [ '<18>{#p/papyrus}{#f/0}NAPSTABLOOK HAS TONS OF MUSIC ON THEIR STEREO.' ]
               : [
                    '<18>{#p/papyrus}{#f/0}BOSSY MUSIC FOR A BOSSY FISH LADY.',
                    "<18>{#p/papyrus}{#f/0}MAKES SENSE, DOESN'T IT?"
                 ]
      ),
      f_puzzle3: pager.create(
         'limit',
         () => [
            "<18>{#p/papyrus}{#f/5}EMBARRASINGLY, I'VE NEVER SOLVED THIS PUZZLE.",
            "<18>{#p/papyrus}{#f/4}THERE'S JUST... SOMETHING TWISTED ABOUT IT.",
            ...(solo()
               ? []
               : [
                    "<25>{#p/undyne}{#f/11}* Wasn't it YOU who said no puzzle is too great for you?",
                    '<18>{#p/papyrus}{#f/4}WHEN I SAID THAT, I WAS REFERRING TO FAIR PUZZLES.',
                    '<18>THIS IS CLEARLY A VERY UNFAIR PUZZLE.',
                    '<25>{#p/undyne}{#f/14}* I see.'
                 ])
         ],
         () =>
            solo()
               ? [
                    "<18>{#p/papyrus}{#f/5}IF YOU'RE TRYING TO SOLVE IT, THEN GOOD LUCK...",
                    "<18>{#f/4}YOU'RE ON YOUR OWN."
                 ]
               : [ '<18>{#p/papyrus}{#f/6}WHEN IT COMES TO FAIRNESS, THERE -IS- A DIFFERENCE!' ]
      ),
      f_prespear,
      f_spear: f_prespear,
      f_corner: f_prespear,
      f_story2: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}{#f/0}SIGNAL STARS ARE PRETTY NEAT, HUH?',
            '<18>THOUGH, THEY ONLY RESET PERIODICALLY.',
            '<18>UNTIL THAT HAPPENS...',
            "<18>{#f/4}WAIT, ISN'T THERE ANOTHER ROOM LIKE THIS SOMEWHERE?",
            ...(solo()
               ? []
               : [ '<25>{#p/undyne}{#f/1}* You tell me.', '<25>{#f/8}* I get lost in this place all the time!' ])
         ],
         [ "<18>{#p/papyrus}{#f/4}SOMETIMES I WONDER IF WE'RE ALL JUST GOING IN CIRCLES." ]
      ),
      f_pacing: pager.create(
         'limit',
         () => [
            "<18>{#p/papyrus}{#f/0}THERE'S GENUINELY NOTHING TO SAY ON THIS HALLWAY.",
            "<18>{#f/0}IT'S LITERALLY ONLY HERE TO MAKE YOU WALK FURTHER.",
            '<18>{#f/4}TO MAKE IT SO THAT EVERY STEP TOWARDS THE EXIT...',
            '<18>{#f/0}IS FILLED WITH UTTER, UNENDING SUSPENSE.',
            ...(solo() ? [] : [ '<25>{#p/undyne}{#f/3}* ...', '<25>{#f/1}* You stole the words right outta my head.' ])
         ],
         [ '<18>{#p/papyrus}{#f/0}UTTER.\nUNENDING.\nSUSPENSE.' ]
      ),
      f_battle: pager.create(
         'limit',
         () => [
            "<18>{#p/papyrus}{#f/0}FLOATING ABOVE THIS ROOM IS UNDYNE'S ASTEROID.",
            "<18>{#f/0}SHE'S ALWAYS POSING ATOP IT...",
            '<18>{#f/4}MUMBLING SOMETHING TO HERSELF...',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/12}* Ah, yeah, the "story of our people..."',
                    '<25>{#f/1}* Despite all the rehearsal, I just ended up going off the cuff.',
                    '<25>{#f/8}* But hey, the battle turned out awesome anyway!',
                    "<25>{#f/12}* So, uh, I'd say it was worth it."
                 ])
         ],
         () =>
            solo()
               ? [ "<18>{#p/papyrus}{#f/0}I THINK IT'S SOMETHING SHE HAS TO MEMORIZE." ]
               : [ "<18>{#p/papyrus}{#f/0}A BATTLE'S MORE FUN WHEN IT'S UNSCRIPTED." ]
      ),
      f_exit: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}THIS FLUID TANK WAS SPECIFICALLY PUT HERE...',
            '<18>{#f/0}BECAUSE A CERTAIN FISH LADY THINKS METAL ARMOR...',
            '<18>{#f/4}AND STATICALLY- CHARGED SKYWAYS...',
            "<18>{#f/4}WON'T CAUSE A MAJOR CATASTROPHE WHEN THEY TOUCH.",
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/12}* I was in a hurry!',
                    "<18>{#p/papyrus}{#f/4}YOU'VE BEEN IN A LOT OF HURRIES...",
                    '<25>{#p/undyne}{#f/3}* ...'
                 ])
         ],
         () =>
            solo()
               ? [
                    '<18>{#p/papyrus}{#f/0}I ONLY HAVE ONE WORD FOR UNDYNE.',
                    '<18>{#f/0}AND THAT WORD IS "WATCH WHERE YOU\'RE GOING."'
                 ]
               : [
                    '<18>{#p/papyrus}{#f/0}NO HARD FEELINGS!',
                    "<25>{#p/undyne}{#f/12}* Pfft, wasn't worried for a second!"
                 ]
      ),
      a_start: pager.create(
         'limit',
         () => [
            "<18>{#p/papyrus}{#f/0}SO YOU'RE IN AERIALIS NOW, HUH?",
            "<18>{#p/papyrus}{#f/0}GUESS I'M NOT THE ONLY ONE WHO LIKES DECORATIVE SPIRES.",
            ...(solo()
               ? []
               : [
                    "<25>{#p/undyne}{#f/17}* Those aren't just for decoration, Papyrus!",
                    "<25>{#p/undyne}{#f/12}* They're people's homes!",
                    '<18>{#p/papyrus}{#f/4}FOR HOUSES, THEY DO SEEM A LITTLE EXTRAVAGANT.',
                    '<25>{#p/undyne}{#f/14}* ...fair point.'
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/0}THE ONE IN THE MIDDLE IS MY FAVORITE.' ]
               : [
                    "<18>{#p/papyrus}{#f/0}MAYBE ONE DAY I'LL GET TO LIVE IN A SPIRE HOUSE.",
                    '<25>{#p/undyne}{#f/15}* And eat spire food...',
                    '<18>{#p/papyrus}{#f/0}HUH?',
                    '<25>{#p/undyne}{#f/7}* Nothing!!!',
                    '<18>{#p/papyrus}{#f/1}OKAY!!!!!!'
                 ]
      ),
      a_lab_entry: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}{#f/0}AH, THE LAB.\nA GREAT PLACE TO HANG OUT!',
            '<18>{#p/papyrus}{#f/0}ESPECIALLY WHEN ALPHYS IS AROUND.',
            ...(solo()
               ? [
                    '<18>{#p/papyrus}{#f/4}SHE REALLY LOVES TALKING ABOUT "SCI-FI" STUFF...',
                    "<18>{#p/papyrus}{#f/9}SO IT'S A GOOD THING I DO TOO!"
                 ]
               : [ '<25>{#p/undyne}{#f/15}* Alphys...' ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/4}SHE DOES HAVE A HABIT OF SPOILING THINGS, THOUGH.' ]
               : [ "<18>{*}{#p/papyrus}{#f/0}I'M STARTING TO THINK UNDYNE HAS A CR- {%}", '<25>{#p/undyne}{#f/17}No.' ]
      ),
      a_lab_main: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}{#f/4}THE LAST TIME I WAS HERE...',
            solo()
               ? '<18>{#p/papyrus}{#f/0}...WAS EARLIER IN THE WEEK, TO HANG OUT WITH ALPHYS!'
               : '<18>{#p/papyrus}{#f/0}...WAS EARLIER TODAY, ON OUR WAY TO THE REC CENTER!',
            '<18>{#p/papyrus}{#f/4}BUT WHEN I WAS YOUNGER, SANS USED TO TAKE ME THERE.',
            '<18>{#p/papyrus}{#f/5}SO MANY SCIENTIFIC MARVELS TO BE FOUND IN A LAB...',
            "<18>{#p/papyrus}{#f/6}IT'S A SHAME MORE PEOPLE DON'T TAKE AN INTEREST!",
            ...(solo()
               ? []
               : [
                    "<25>{#p/undyne}{#f/14}* They just don't get it like you do, Papyrus.",
                    "<18>{#p/papyrus}{#f/7}THEY DON'T KNOW WHAT THEY'RE MISSING!",
                    "<25>{#p/undyne}{#f/17}* You're damn right."
                 ])
         ],
         () => [
            '<18>{#p/papyrus}{#f/0}OH YEAH, I FORGOT TO MENTION...',
            '<18>{#p/papyrus}{#f/0}MY BROTHER USED TO BE LAB ASSISTANT.',
            '<18>{#p/papyrus}{#f/5}...\nI MISS THOSE DAYS.',
            ...(solo() ? [] : [ '<25>{#p/undyne}{#f/16}* ...', '<25>{#p/undyne}{#f/9}* Me too.' ])
         ]
      ),
      a_lab_upstairs: pager.create(
         'limit',
         () =>
            save.data.b.water
               ? [
                    '<18>{#p/papyrus}{#f/5}THOSE RECYCLE BINS ARE NEVER ACTUALLY USED TO RECYCLE.',
                    "<18>{#f/4}IF THEY WERE, ALPHYS WOULN'T HAVE PLANS...",
                    '<18>{#f/4}FOR A MACHINE THAT SEPERATES ALL THE TRASH INSIDE.',
                    '<18>{#f/7}FOR EXAMPLE, ELECTRO-DAMPENING FLUID!',
                    ...(solo()
                       ? []
                       : [ "<25>{#p/undyne}{#f/17}* Don't tell me you're still carrying that thing around." ])
                 ]
               : [
                    "<18>{#p/papyrus}{#f/0}THERE'S THIS ODD MACHINE IN THE LAB...",
                    "<18>{#p/papyrus}{#f/0}I HEARD IT'S USED TO MAKE ICE CREAM.",
                    '<18>{#p/papyrus}{#f/4}...WHICH ALPHYS NO DOUBT EATS WHILE BINGING SCI-FI.',
                    ...(solo()
                       ? []
                       : [
                            "<25>{#p/undyne}{#f/17}* What??\n* She hasn't invited ME to any TV marathons...",
                            "<18>{#p/papyrus}{#f/6}I THINK SHE'S SLIGHTLY AFRAID OF YOU, UNDYNE.",
                            '<18>{#p/papyrus}{#f/4}MAYBE...',
                            '<18>{#p/papyrus}{#f/9}YOU JUST HAVE TO "BREAK THE ICE CREAM!" WITH HER!',
                            '<25>{#p/undyne}{#f/13}* Break the... what?',
                            '<25>{#p/undyne}{#f/17}* ...',
                            '<25>{#p/undyne}{#f/4}* Wait.',
                            '<25>{#p/undyne}{#f/3}* Was that supposed to be a pun?',
                            '<18>{#p/papyrus}{#f/0}YES.',
                            '<25>{#p/undyne}{#f/8}* Come on!'
                         ])
                 ],
         () => [
            '<18>{#p/papyrus}{#f/4}SPEAKING OF FOOD AND DRINK...',
            '<18>{#f/0}I HEARD METTATON ONCE WANTED TO OPEN A FOOD SHOP.',
            '<18>{#f/9}THE FEATURED ITEM WAS CALLED "NEO ENERGY."',
            ...(solo()
               ? [ "<18>{#p/papyrus}{#f/4}I DON'T KNOW WHAT IT MEANS." ]
               : [
                    '<25>{#p/undyne}{#f/12}* Sounds like some cheap knockoff brand.',
                    "<18>{#p/papyrus}{#f/7}WHAT??\nMETTATON WOULDN'T DO THAT!"
                 ])
         ]
      ),
      a_lab_downstairs: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}{#f/0}THOSE FANCY DRINKS IN THE VENDING MACHINE...',
            '<18>{#p/papyrus}{#f/0}I KEEP MEANING TO TRY THEM, BUT...',
            '<18>{#p/papyrus}{#f/4}DR. ALPHYS ALWAYS SEEMS TO GIVE ME SOMETHING TO DO.',
            ...(solo()
               ? []
               : [
                    "<25>{#p/undyne}{#f/14}* Don't worry, Papyrus.\n* You'll get to it next time!",
                    '<18>{#p/papyrus}{#f/0}THAT I WILL!'
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/0}MAYBE THE FIZZY JUICE ON THE TABLE WOULD BE BETTER.' ]
               : [
                    '<25>{#p/undyne}{#f/13}* ...what?',
                    "<25>{#p/undyne}{#f/13}* Haven't YOU ever wanted to try strange drinks from a vending machine?"
                 ]
      ),
      a_lab_virt: pager.create(
         'limit',
         () => [
            "<18>{#p/papyrus}{#f/5}IT'S A SHAME THE VIRTUALASIUM BROKE DOWN LAST MONTH.",
            "<18>{#p/papyrus}{#f/7}THINK OF ALL THE FUN I'M LOSING OUT ON RIGHT NOW!",
            ...(solo()
               ? [
                    '<18>{#p/papyrus}{#f/5}SUCH A PITY.',
                    "<18>{#p/papyrus}{#f/5}I CAN'T EVEN RUN MY WORLD-FAMOUS RESTARAUNT."
                 ]
               : [
                    '<25>{#p/undyne}{#f/8}* "Fun" isn\'t exactly the word I\'d use.',
                    '<18>{#p/papyrus}{#f/5}CAN YOU REALLY BLAME A SKELETON SUCH AS MYSELF...',
                    '<18>{#p/papyrus}{#f/5}FOR WANTING TO RUN A WORLD-FAMOUS RESTARAUNT?',
                    '<25>{#p/undyne}{#f/3}* You know that kinda thing can get stressful, right...?',
                    '<18>{#p/papyrus}{#f/4}SAYS THE CAPTAIN OF THE ROYAL GUARD.',
                    '<25>{#p/undyne}{#f/17}* Running the royal guard is one thing.',
                    '<25>{#p/undyne}{#f/8}* Running a restaraunt is something else entirely!!!'
                 ])
         ],
         () => [
            '<18>{#p/papyrus}{#f/0}OH YEAH, ABOUT THE RESTARAUNT...',
            '<18>{#p/papyrus}{#f/9}IT HAPPENS TO BE A GIANT SPACESHIP!',
            '<18>{#p/papyrus}{#f/4}POWERED BY MARINARA SAUCE, OBVIOUSLY.',
            ...(solo() ? [] : [ '<25>{#p/undyne}{#f/17}* Obviously.' ])
         ]
      ),
      a_path1: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}{#f/0}I HEARD AERIALIS USED TO BE A STAGING AREA.',
            '<18>{#p/papyrus}{#f/0}THEY WERE GOING TO BUILD SO MANY COOL THINGS, BUT...',
            '<18>{#p/papyrus}{#f/4}AFTER THE LAB WAS DONE, THEY RAN OUT OF PURPLE.',
            '<18>{#p/papyrus}{#f/5}TRULY, THIS IS A TRAGEDY FOR PAINT- KIND EVERYWHERE.',
            ...(solo()
               ? []
               : [
                    "<25>{#p/undyne}{#f/3}* You know they could've just made more of it, right?",
                    '<25>{#p/undyne}{#f/17}* The REAL reason they quit is because Mettaton took over!',
                    "<18>{#p/papyrus}{#f/4}YOU SAY THAT LIKE IT'S A BAD THING...",
                    '<25>{#p/undyne}{#f/17}* ...',
                    "<18>{#p/papyrus}{#f/0}I DON'T BLAME THEM FOR QUITTING, ACTUALLY.",
                    '<18>{#p/papyrus}{#f/4}FEW CAN WITHSTAND HIS OVERPOWERING BEAUTY.',
                    "<25>{#p/undyne}{#f/12}* Oh... yeah!\n* That's what I meant!"
                 ])
         ],
         () =>
            solo()
               ? [
                    "<19>{#p/papyrus}{#f/0}IT'S TOO BAD WE'LL NEVER GET TO SEE ITS FULL POTENTIAL.",
                    "<18>{#p/papyrus}{#f/8}THINK OF ALL THE NEAT GIZMOS I COULD'VE TRIED!"
                 ]
               : [
                    "<18>{#p/papyrus}{#f/0}IT'S GOOD TO KNOW I'M NOT THE ONLY ONE...",
                    '<18>{#p/papyrus}{#f/9}WHO FINDS METTATON TO BE A COMMANDING PRECENSE.',
                    '<25>{#p/undyne}{#f/12}* Pfft, yeah.'
                 ]
      ),
      a_path2: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}{#f/0}THESE LIFTGATES ARE PRETTY FUN.',
            "<18>{#p/papyrus}{#f/0}SOMETIMES, WHEN NOBODY'S WATCHING...",
            "<18>{#p/papyrus}{#f/0}I'LL COME OUT THERE AND GO BACK AND FORTH ON THEM.",
            '<18>{#p/papyrus}{#f/4}IT DOES REQUIRE A SPECIAL PASS, THOUGH.',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/4}* Hey, Alphys never gives ME liftgate passes!',
                    '<18>{#p/papyrus}{#f/0}MAYBE NEXT TIME YOU SHOULD ASK HER FOR ONE!',
                    '<25>{#p/undyne}{#f/3}* ...',
                    '<25>{#p/undyne}{#f/8}* Like hell I will!'
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/0}GO ON, GIVE IT A TRY!' ]
               : [
                    '<18>{#p/papyrus}{#f/4}...',
                    "<18>{*}{#p/papyrus}{#f/4}I CAN'T BE THE ONLY ONE THAT THINKS YOU'RE- {%}",
                    "<25>{#p/undyne}{#f/7}* Don't you dare.",
                    '<18>{#p/papyrus}{#f/6}SORRY!!'
                 ]
      ),
      a_path3: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}{#f/0}I HEARD TUITION IS HARD TO COME BY IN AERIALIS.',
            '<18>{#p/papyrus}{#f/5}IS IT TRUE?\nDO STUDENTS REALLY SUFFER THAT MUCH?',
            "<18>{#p/papyrus}{#f/8}I DON'T KNOW WHAT I'D BE WITHOUT MY EDUCATION!",
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/8}* I quit school when I was only ten years old!',
                    '<18>{#p/papyrus}{#f/1}HOW COULD YOU BETRAY THE SYSTEM SO COMPLETELY!?!?',
                    '<25>{#p/undyne}{#f/14}* Not everyone walks the same path in life, Papyrus.',
                    '<18>{#p/papyrus}{#f/4}IT WOULD APPEAR I HAVE MUCH TO LEARN ABOUT TEACHING.'
                 ])
         ],
         () =>
            solo()
               ? [ "<18>{#p/papyrus}{#f/4}FOR STARTERS, YOU WOULDN'T SEE MY COOL BONE ATTACKS!" ]
               : [
                    '<25>{#p/undyne}{#f/14}* Asgore is a great example of an unconventional teacher.',
                    "<18>{#p/papyrus}{#f/9}MAYBE THAT'S HOW I CAN GET INTO THE ROYAL GUARD!",
                    '<25>{#p/undyne}{#f/12}* Maybe.'
                 ]
      ),
      a_rg1: pager.create(
         'limit',
         () =>
            solo()
               ? [
                    '<18>{#p/papyrus}{#f/0}I WONDER WHAT ICE CREAM IN AERIALIS TASTES LIKE.',
                    '<18>{#p/papyrus}{#f/0}IS IT SOFT?\nIS IT PURPLE?',
                    '<18>{#p/papyrus}{#f/4}OR IS IT NOTHING LIKE I EXPECT?',
                    "<18>{#p/papyrus}{#f/5}I KNOW, I KNOW... THESE AREN'T EASY QUESTIONS TO ASK."
                 ]
               : [
                    '<18>{#p/papyrus}{#f/0}YOU SHOULD MEET US AT THE REC CENTER.',
                    '<18>{#p/papyrus}{#f/0}THE ICE CREAM HERE IS AMAZING!',
                    '<25>{#p/undyne}{#f/1}* Can confirm.',
                    '<18>{#p/papyrus}{#f/9}WE HOPE TO SEE YOU AROUND SOON!'
                 ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/5}AND TO THINK I MAY NEVER KNOW THE ANSWER...' ]
               : save.data.n.plot < 65
               ? [ '<18>{#p/papyrus}{#f/0}IT\'D BE A REAL "TREAT."' ]
               : [ '<18>{#p/papyrus}{#f/4}EVEN IF YOU WERE ALREADY HERE.' ]
      ),
      a_path4: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}{#f/0}TALES SPEAK OF A PLACE WHERE TRASH TURNS TO TREASURE.',
            '<18>{#p/papyrus}{#f/9}A PLACE WHERE GARBAGE TURNS TO GOLD!',
            '<18>{#p/papyrus}{#f/6}AND A PLACE WHERE SPACE TUNA...',
            '<18>{#p/papyrus}{#f/4}WELL, THAT STUFF JUST DISAPPEARS.',
            ...(solo()
               ? [ '<18>{#p/papyrus}{#f/5}DO YOU KNOW OF SUCH A PLACE?' ]
               : [
                    "<25>{#p/undyne}{#f/1}* That sounds like Catty and Bratty's place.",
                    '<25>{#p/undyne}{#f/14}* Not only do they like to repurpose old junk, but they LOVE tuna.',
                    "<25>{#p/undyne}{#f/17}* Please don't tell them I told you that.",
                    '<18>{#p/papyrus}{#f/9}...YOU HAVE MY WORD.'
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/4}I\'LL TAKE THAT AS A RESOUNDING "MAYBE."' ]
               : [
                    '<18>{#p/papyrus}{#f/0}SO CATTY AND BRATTY ARE JUNK DEALERS, HUH?',
                    "<18>{#p/papyrus}{#f/4}I'M SURPRISED MY BROTHER DOESN'T CALL THEM ALL DAY."
                 ]
      ),
      a_barricade1: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}{#f/4}I HEARD YOU HAVE TO ANSWER SECURITY QUESTIONS THERE...',
            '<18>{#p/papyrus}{#f/1}COULD IT BE??\nA SECRET AUDITION FOR A QUIZ SHOW??',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/14}* Wait, what?',
                    "<25>{#p/undyne}{#f/17}* Tell me there's a question about...",
                    '<18>{#p/papyrus}{#f/5}ABOUT WHAT?',
                    "<26>{#p/undyne}{#f/8}* About how many boots it'd take to kick a robot's butt into space!",
                    '<18>{#p/papyrus}{#f/4}WELL, THAT DEPENDS ON THE GRAVITY.',
                    '<25>{#p/undyne}{#f/17}* Papyrus!'
                 ])
         ],
         () =>
            solo()
               ? [ "<18>{#p/papyrus}{#f/4}IT HAS BEEN A WHILE SINCE HE'S DONE ONE." ]
               : [
                    "<18>{#p/papyrus}{#f/4}SHE DOESN'T LIKE IT WHEN I HELP WITH HER PLANS.",
                    '<25>{#p/undyne}{#f/17}* I do too!',
                    '<18>{#p/papyrus}{#f/4}HOW DO YOU EXPLAIN THE ROYAL GUARD THING, THEN?',
                    '<25>{#p/undyne}{#f/4}* ...',
                    '<25>{#p/undyne}{#f/12}* Good point.'
                 ]
      ),
      a_puzzle1: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}{#f/4}THESE PUZZLES ARE WEIRD.',
            '<18>{#p/papyrus}{#f/5}I ALWAYS END UP WALKING PAST THE CORRECT TERMINAL.',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/3}* How many times did someone have to pull you back?',
                    '<18>{#p/papyrus}{#f/1}HOW MANY!?!?\nUNDYNE, WHAT DID YOU DO!!!',
                    "<25>{#p/undyne}{#f/12}* Uh, nothin.'",
                    '<25>{#p/undyne}{#f/12}* Apart from almost erasing myself from existence, that is.',
                    '<18>{#p/papyrus}{#f/8}PLEASE BE MORE CAREFUL NEXT TIME!'
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/4}I HAVE "ZERO" INTENTION OF EVER DOING ONE AGAIN.' ]
               : [ '<18>{#p/papyrus}{#f/4}THESE DIMENSIONAL TECHNOLOGIES ARE A REAL PROBLEM.' ]
      ),
      a_mettaton1: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}{#f/0}LET ME BE CLEAR.',
            '<18>{#p/papyrus}{#f/0}WHEN METTATON SAYS TO DO SOMETHING ON HIS SHOW...',
            '<18>{#p/papyrus}{#f/0}YOU DO IT.',
            '<18>{#p/papyrus}{#f/0}NO IFS, ANDS, OR BUTS ABOUT IT.',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/17}* What about howevers?',
                    '<18>{#p/papyrus}{#f/4}...',
                    '<18>{#p/papyrus}{#f/4}NO.',
                    '<25>{#p/undyne}{#f/8}* Damn it!'
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/4}AND NO HOWEVERS, EITHER.' ]
               : [
                    '<18>{#p/papyrus}{#f/5}DO YOU -ALWAYS- HAVE TO TRY TO BEND THE RULES...',
                    '<25>{#p/undyne}{#f/1}* Yes. Always.',
                    '<18>{#p/papyrus}{#f/4}YEAH, YEAH...'
                 ]
      ),
      a_elevator1: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}{#f/0}SO MANY ELEVATORS, SO LITTLE TIME.',
            "<18>{#f/4}EXCEPT FOR WHEN THEY'RE INACCESSIBLE.",
            '<18>{#f/5}I HAD TO WALK AROUND ON FOOT YESTERDAY...',
            "<18>{#f/4}...EVEN THOUGH I PROBABLY COULD'VE FLOWN.",
            ...(solo()
               ? [ '<18>{#f/6}SPEAKING OF WHICH, WHO KEEPS SHUTTING DOWN ELEVATORS!?' ]
               : [
                    "<18>{#f/6}MAYBE I SHOULD CHECK IF THEY'RE WORKING NOW.",
                    '<25>{#p/undyne}{#f/14}* I think Mettaton just shuts them off to run his shows.',
                    '<18>{#p/papyrus}{#f/4}HE... HE DOES?',
                    '<25>{#p/undyne}{#f/12}* Yeah.',
                    '<18>{#p/papyrus}{#f/7}...',
                    '<18>{#p/papyrus}{#f/7}I INTEND TO HAVE A WORD WITH HIM.'
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/4}THIS IS A CONSPIRACY OF THE HIGHEST CALIBER.' ]
               : [
                    '<18>{#p/papyrus}{#f/4}THIS COULD BE MY CHANCE...',
                    '<18>{#p/papyrus}{#f/9}...TO SUGGEST THE CONSTRUCTION OF MORE LIFTGATES!'
                 ]
      ),
      a_lift: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}{#f/0}THIS ELEVATOR SHOULD RELEASE A MUSIC ALBUM!',
            '<18>{#p/papyrus}{#f/0}SO MANY PLEASANTLY BLUESY TUNES...',
            "<18>{#p/papyrus}{#f/5}IT'S A SHAME THE SOUND SYSTEM IS BROKEN RIGHT NOW.",
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/13}* Blues?\n* Seriously?',
                    "<25>{#p/undyne}{#f/14}* Everyone knows rock 'n' roll is the best.",
                    '<18>{#p/papyrus}{#f/4}I WILL DEBATE YOU TO NO END ON THIS.',
                    '<25>{#p/undyne}{#f/12}* And I will not.'
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/4}I MAY OR MAY NOT HAVE USED IT ONE TOO MANY TIMES.' ]
               : [
                    '<18>{#p/papyrus}{#f/0}BLUES IS NICE, BUT SKA IS MY FAVORITE OF ALL.',
                    '<18>{#p/papyrus}{#f/9}YOU CAN NEVER GET ENOUGH OF THOSE RIVETING TRUMPETS!'
                 ]
      ),
      a_elevator2: pager.create(
         'limit',
         () => [
            "<18>{#p/papyrus}{#f/0}LOOK, YOU'RE ON THE SECOND FLOOR!",
            '<18>{#p/papyrus}{#f/0}HERE, YOU WILL FIND MANY AMAZING THINGS...',
            '<18>{#p/papyrus}{#f/9}PUZZLES!\nBARRICADES!\nSHOW STAGES!',
            '<18>{#p/papyrus}{#f/4}SO... BASICALLY THE EXACT SAME AS THE FIRST FLOOR.',
            ...(solo()
               ? [ '<18>{#p/papyrus}{#f/9}BUT BETTER!!' ]
               : [ '<25>{#p/undyne}{#f/14}* Yeah, that sounds about right.' ])
         ],
         [ '<18>{#p/papyrus}{#f/4}* ...IT EVEN HAS AN EXTRA SENTRY STATION.' ]
      ),
      a_sans: pager.create(
         'limit',
         () => [
            '<19>{#p/papyrus}{#f/4}YES, MY BROTHER SELLS CORN DOGS AT HIS SENTRY STATION.',
            '<18>{#p/papyrus}{#f/6}IT\'S NOT EXACTLY WHAT I\'D CALL "PALATABLE."',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/13}* What does a neon dog even taste like?',
                    "<18>{#p/papyrus}{#f/4}THAT'S A GREAT QUESTION.",
                    "<18>{#p/papyrus}{#f/4}A GREAT QUESTION I DON'T NEED AN ANSWER TO."
                 ])
         ],
         [ '<18>{#p/papyrus}{#f/4}...AT LEAST THEY LOOK COOL.' ]
      ),
      a_pacing: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}{#f/5}IMAGINE, SOMEWHERE OUT THERE...',
            '<18>{#p/papyrus}{#f/4}LIVES A COLONY OF MOLE-RATS, TRAPPED IN A FORCE FIELD.',
            '<18>{#p/papyrus}{#f/5}LIVING MOLE-RAT LIVES, EATING MOLE-RAT FOOD...',
            '<18>{#p/papyrus}{#f/4}YEARNING TO ONE DAY REACH THE MOLE-RAT STARS.',
            ...(solo()
               ? [ '<18>{#p/papyrus}{#f/0}THAT WOULD SURE BE SOMETHING, HUH?' ]
               : [
                    '<25>{#p/undyne}{#f/3}* Where do you come up with this stuff, man?',
                    "<18>{#p/papyrus}{#f/7}HEY, DON'T GET GREEDY FOR IDEAS!",
                    "<25>{#p/undyne}{#f/1}* I'm only curious!!"
                 ])
         ],
         () =>
            solo()
               ? [
                    '<18>{#p/papyrus}{#f/5}THE UNIVERSE TRULY IS BOUNDLESS...',
                    "<18>{#p/papyrus}{#f/5}...EVEN IF WE'RE STUCK STARING AT IT FROM AFAR."
                 ]
               : [
                    '<25>{#p/undyne}{#f/1}* I think Papyrus just wants someone he can relate to.',
                    '<18>{#p/papyrus}{#f/0}YEAH, MOLE-RATS CAN BE QUITE THE RELATABLE BUNCH!'
                 ]
      ),
      a_prepuzzle: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}{#f/4}ABOUT THE FLOWERS SCATTERED AROUND THE AREA...',
            "<18>{#p/papyrus}{#f/0}IT WAS ASGORE'S IDEA, ACTUALLY.",
            '<18>{#p/papyrus}{#f/5}IF THAT GUY WASN\'T THE "CEO" OF THE OUTPOST...',
            '<18>{#p/papyrus}{#f/4}HE\'D BE THE "CGO" INSTEAD.',
            '<18>{#p/papyrus}{#f/0}THAT STANDS FOR "CHIEF GARDENING OFFICER."',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/1}* Who would I be, then?',
                    '<18>{#p/papyrus}{#f/0}OH YEAH, YOU\'D BE THE "CSETPO."',
                    "<25>{#p/undyne}{#f/17}* ...what's that?",
                    '<18>{#p/papyrus}{#f/4}THE "CHIEF SMASH- EVERYTHING-TO- PIECES OFFICER."',
                    '<25>{#p/undyne}{#f/8}* OH YEAH!!!'
                 ])
         ],
         [
            '<18>{#p/papyrus}{#f/0}AS YOU CAN SEE, ACRONYMS ARE MY SPECIALITY.',
            '<18>{#p/papyrus}{#f/4}I MIGHT AS WELL BE THE "CAO" AROUND HERE...',
            '<18>{#p/papyrus}{#f/9}SHORT FOR "CHIEF ACRONYM OFFICER" OF COURSE!'
         ]
      ),
      a_puzzle2: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}{#f/6}NO MATTER WHERE I GO, I END UP IN THE SAME PLACE!',
            "<18>{#p/papyrus}{#f/5}AT LEAST, THAT'S WHAT HAPPENS TO ME...",
            '<18>{#p/papyrus}{#f/5}WHENEVER I ATTEMPT TO SOLVE THIS PUZZLE.',
            ...(solo()
               ? []
               : [
                    "<25>{#p/undyne}{#f/8}* It's easy!\n* Just fly around it!!",
                    '<18>{#p/papyrus}{#f/0}FLIGHT MAGIC IS RESERVED FOR EMERGENCIES.',
                    '<25>{#p/undyne}{#f/3}* I thought being trapped in one of those things WAS an emergency.',
                    '<18>{#p/papyrus}{#f/5}OH.\nI NEVER THOUGHT ABOUT IT THAT WAY.',
                    "<25>{#p/undyne}{#f/14}* Now's a good time to start, then!",
                    "<18>{#p/papyrus}{#f/0}I'LL CONSIDER IT."
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/4}I DO NOT ENJOY BEING TRAPPED.' ]
               : [
                    '<18>{#p/papyrus}{#f/0}I WONDER WHAT LIFE WOULD BE IF I FLEW AROUND EVERYWHERE.',
                    '<25>{#p/undyne}{#f/14}* Probably pretty boring, honestly.',
                    '<18>{#p/papyrus}{#f/0}YEAH.'
                 ]
      ),
      a_mettaton2: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}{#f/5}METTATON WANTED ME TO BE A PART OF HIS NEXT SHOW...',
            '<18>{#p/papyrus}{#f/5}BUT AFTER SOME THOUGHT, I CAME TO REALIZE...',
            "<18>{#p/papyrus}{#f/6}...HOW NERVOUS I'D BE SITTING RIGHT NEXT TO HIM.",
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/12}* You really like him, huh?',
                    '<18>{#p/papyrus}{#f/7}I DO NOT!!!',
                    '<18>{#p/papyrus}{#f/4}...',
                    '<18>{#p/papyrus}{#f/4}MAYBE A LITTLE.'
                 ])
         ],
         () =>
            solo()
               ? [ "<18>{#p/papyrus}{#f/0}THAT'S WHY I TOLD MY BROTHER TO GO IN MY PLACE." ]
               : [ '<18>{#p/papyrus}{#f/6}...OR MAYBE A LOT.' ]
      ),
      a_rg2: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}{#f/6}BE CAREFUL OUT THERE, HUMAN!',
            '<18>{#p/papyrus}{#f/5}THE GUARDS IN THAT AREA ARE KNOWN TO BE UNRULY.',
            '<18>{#p/papyrus}{#f/4}...ALPHYS HAS TOLD ME HOW THEY IGNORE HER ROYAL MEMOS.',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/16}* ...',
                    '<18>{#f/16}* I had a feeling that might happen to her.',
                    "<18>{#p/papyrus}{#f/5}WHAT'S THE PROBLEM?",
                    "<25>{#p/undyne}{#f/16}* The royal scientist is meant to be the king's most trusted associate.",
                    "<25>{#f/9}* After sir Roman passed, though, we weren't ready to replace him.",
                    "<25>{#f/17}* Don't get me wrong.\n* Alphys is... honestly a brilliant individual.",
                    "<25>{#f/16}* But she's unwieldy... she lacks the expertise sir Roman had.",
                    '<18>{#p/papyrus}{#f/5}THE ROYAL GUARD IS STILL GETTING USED TO THAT, HUH?',
                    '<25>{#p/undyne}{#f/14}* Something like that.',
                    "<25>{#f/1}* But hey, I know they'll come around eventually."
                 ])
         ],
         () =>
            solo()
               ? [ "<18>{#p/papyrus}{#f/4}NOW THERE'S A QUESTION...", "<18>{#p/papyrus}{#f/0}WHAT'S A ROYAL MEMO?" ]
               : [ '<18>{#p/papyrus}{#f/4}WE CAN ONLY HOPE IT HAPPENS SOONER THAN LATER.' ]
      ),
      a_barricade2: pager.create(
         'limit',
         () => [
            "<18>{#p/papyrus}{#f/5}I'M AFRAID I DON'T HAVE MUCH TO SAY ABOUT THIS AREA...",
            "<18>{#p/papyrus}{#f/5}WELL, APART FROM THE FACT THAT IT'S EMPTY.",
            '<18>{#p/papyrus}{#f/5}...',
            '<18>{#p/papyrus}{#f/5}THEY REALLY DID WANT TO DO SO MUCH WITH THIS PLACE...',
            ...(solo()
               ? []
               : [
                    "<25>{#p/undyne}{#f/1}* Hey, don't be sad.\n* You've got me by your side, right?",
                    "<18>{#p/papyrus}{#f/1}* I KNOW.\nYOU'RE A GREAT FRIEND, UNDYNE.",
                    '<25>{#p/undyne}{#f/14}* Shucks...\n* Thanks, Papyrus.',
                    "<18>{#p/papyrus}{#f/4}IT'S MY PLEASURE."
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/5}UNFULFILLED DREAMS ARE THE WORST.' ]
               : [
                    '<18>{#p/papyrus}{#f/0}FRIENDS CAN GET YOU THROUGH ANYTHING.',
                    '<18>{#p/papyrus}{#f/5}EVEN... THE STING OF AN UNFULFILLED DREAM...',
                    "<18>{#p/papyrus}{#f/4}THOUGH, I'D RATHER FIX THE PROBLEM THEN IGNORE IT.",
                    '<25>{#p/undyne}{#f/14}* Never change, Papyrus.'
                 ]
      ),
      a_split: pager.create(
         'limit',
         () => [
            "<18>{#p/papyrus}{#f/0}LOOK, IT'S THE WORLD-FAMOUS METTATON FOUNTAIN!",
            '<18>{#f/4}I HEARD IT TOOK A LOT OF TIME TO GET IT TO LOOK RIGHT.',
            '<18>{#f/5}COUNTLESS HOURS OF TIRELESS, PAINFUL WORK...',
            '<18>{#f/6}TO GET THAT IDEAL RECTANGULAR SHAPE.',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/17}* And then he destroyed it just so he could rebuild it himself.',
                    '<25>{#p/undyne}{#f/17}* Because it wasn\'t up to his "high standards."',
                    "<18>{#p/papyrus}{#f/4}WAIT, WASN'T THERE SOMETHING ABOUT THAT ON TV?",
                    '<25>{#p/undyne}{#f/14}* Oh yeah, he decided to broadcast it to the entire outpost.',
                    '<18>{#p/papyrus}{#f/1}OH MY GOD!',
                    '<25>{#p/undyne}{#f/17}* Because of course he did.'
                 ])
         ],
         () =>
            solo()
               ? [ "<18>{#p/papyrus}{#f/4}MY BROTHER TELLS ME THAT'S NOT ENTIRELY TRUE." ]
               : [
                    '<18>{#p/papyrus}{#f/4}IF HE KNEW HOW TO BUILD IT HIMSELF...',
                    '<18>{#p/papyrus}{#f/5}WHY DID HE BOTHER TO HIRE ANYONE ELSE?',
                    '<25>{#p/undyne}{#f/17}* The world may never know.'
                 ]
      ),
      a_offshoot1: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}{#f/5}THE SIGNAL SEEMS TO BE A BIT WEAK.',
            "<18>{#p/papyrus}{#f/5}IT'S LIKE... INTERFERENCE OF SOME KIND?",
            "<18>{#p/papyrus}{#f/6}MAYBE IT'D BE A GOOD IDEA TO CALL BACK ELSEWHERE.",
            ...(solo()
               ? []
               : [
                    "<25>{#p/undyne}{#f/14}* They're probably near the old security tower in Aerialis.",
                    '<25>{#p/undyne}{#f/12}* Nothing to worry about.'
                 ])
         ],
         () => (solo() ? [ '<18>{#p/papyrus}{#f/6}ESLEWHERE!!!' ] : [ '<18>{#p/papyrus}{#f/0}NOTHING AT ALL.' ])
      ),
      a_elevator3: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}{#f/0}ANOTHER DAY, ANOTHER ELEVATOR...',
            "<18>{#p/papyrus}{#f/5}IT'S A MIRACLE WE DON'T SPEND OUR LIVES...",
            '<18>{#p/papyrus}{#f/5}GOING UP AND DOWN THESE THINGS EVERY DAY.',
            '<18>{#p/papyrus}{#f/6}EVEN IF WE DO NEED THEM TO GET AROUND.',
            ...(solo()
               ? []
               : [
                    "<25>{#p/undyne}{#f/17}* If you think it's bad here, just wait until you see a spire house!",
                    '<18>{#p/papyrus}{#f/8}N-NO...!',
                    '<25>{#p/undyne}{#f/1}* An elevator a day keeps the taxi driver away!',
                    "<18>{#p/papyrus}{#f/4}THAT IS THE WORST THING I'VE EVER HEARD."
                 ])
         ],
         [ '<18>{#p/papyrus}{#f/4}IF ONLY THERE WAS A FASTER WAY TO GET AROUND...' ]
      ),
      a_elevator4: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}{#f/0}WHAT HAPPENS TO A SKELETON WHO WALKS THROUGH SECURITY?',
            "<19>{#p/papyrus}{#f/4}...THAT'S RIGHT.\nHE GETS RESPRAINED.",
            '<18>{#p/papyrus}{#f/6}JUST LIKE I WAS MY FIRST TIME AT THE REC CENTER.',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/1}* That sounds like a fun story, why not share it?',
                    '<18>{#p/papyrus}{#f/6}THAT STORY IS ANYTHING BUT "FUN."',
                    '<25>{#p/undyne}{#f/17}* Even though you just made a "pun" out of it.',
                    '<18>{#p/papyrus}{#f/4}CAN YOU BLAME ME FOR WANTING TO BE... HUMERUS?',
                    "<25>{#p/undyne}{#f/17}* God, you're worse than your brother.",
                    '<18>{#p/papyrus}{#f/7}I AM NOT!'
                 ])
         ],
         () =>
            solo()
               ? [ "<18>{#p/papyrus}{#f/6}IT'S A LONG STORY." ]
               : [ '<18>{#p/papyrus}{#f/4}MY BROTHER ALWAYS CRACKS JOKES AT THE WORST TIMES.' ]
      ),
      a_auditorium: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}{#f/0}MY BROTHER ONCE HOSTED A COMEDY SHOW HERE.',
            '<18>{#p/papyrus}{#f/0}IT WAS CALLED...',
            '<18>{#p/papyrus}{#f/4}...THE RIB-TICKLER.',
            '<18>{#p/papyrus}{#f/1}EVEN ASGORE COULD HAVE DONE BETTER THAN THAT!',
            '<18>{#p/papyrus}{#f/0}ANYWAY, HIS SHOW ACTUALLY DID PRETTY WELL.',
            "<18>{#p/papyrus}{#f/5}IT'S A SHAME HE STOPPED DOING IT.",
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/1}* I think he just wanted to be a royal sentry.',
                    "<18>{#p/papyrus}{#f/5}YEAH.\nMAYBE THAT'S IT.",
                    '<18>{#f/4}BUT WHY WOULD HE WANT TO BE A ROYAL SENTRY?',
                    '<18>{#f/9}BEING A ROYAL GUARD IS MUCH MORE PRESTIGIOUS!'
                 ])
         ],
         () =>
            solo()
               ? [
                    "<18>{#p/papyrus}{#f/5}IF YOU EVER FIND SUCCESS, DON'T QUIT.",
                    '<18>{#f/5}WELL... UNLESS NOT DOING THAT WOULD CAUSE YOU HARM.',
                    '<18>{#f/4}THEN YOU SHOULD DEFINITELY QUIT.',
                    "<18>{#f/6}JUST DO WHAT'S BEST FOR YOURSELF, ALRIGHT??"
                 ]
               : [
                    '<18>{#p/papyrus}{#f/4}YOU CAN COUNT ON MY BROTHER TO SHOOT LOW...',
                    '<18>{#p/papyrus}{#f/4}EVERY.\nSINGLE.\nTIME.'
                 ]
      ),
      a_aftershow: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}{#f/0}SO THIS IS WHERE CATTY AND BRATTY WORK, HUH?',
            "<18>{#f/0}IT'S CLEANER THAN I EXPECTED.",
            '<18>{#f/4}AND HERE I THOUGHT THESE TWO WERE TRASH DEALERS...',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/17}* They ARE trash dealers!',
                    "<25>{#p/undyne}{#f/14}* I think... they're just protective about the trash they collect.",
                    '<25>{#p/undyne}{#f/16}* Alphys told me how she used to go trash- hunting with them...',
                    "<25>{#p/undyne}{#f/9}* It's more than just a silly hobby.\n* It's... a way of life.",
                    '<18>{#p/papyrus}{#f/0}I CAN BELIEVE IT.',
                    "<25>{#p/undyne}{#f/15}* It's also how we get our coolest trinkets.",
                    '<18>{#p/papyrus}{#f/0}LIKE THE MEW MEW DOLL ON TV EARLIER!',
                    '<25>{#p/undyne}{#f/12}* Exactly!'
                 ])
         ],
         () =>
            solo()
               ? [
                    '<18>{#p/papyrus}{#f/0}MAYBE THE JUNK IS JUST KEPT ON THE INSIDE.',
                    "<18>{#p/papyrus}{#f/4}IT'D EXPLAIN A LOT MORE THAN YOU MIGHT THINK."
                 ]
               : [ '<18>{#p/papyrus}{#f/0}I WONDER IF HUMANS GO HUNTING FOR MONSTER TRASH.' ]
      ),
      a_hub1: pager.create(
         'limit',
         () => [
            "<18>{#p/papyrus}{#f/0}SO YOU'VE MADE IT TO THE CENTRAL RING ROOM!",
            '<18>{#p/papyrus}{#f/4}AT FIRST, WHEN I HEARD THE TERM "RING ROOM..."',
            '<18>{#p/papyrus}{#f/5}I THOUGHT IT REFERRED TO A ROOM FOR MAKING CALLS.',
            ...(solo()
               ? [ "<18>{#p/papyrus}{#f/0}GIVEN WHAT YOU'RE DOING, IT'S NOT ENTIRELY WRONG!" ]
               : [
                    "<18>{#p/papyrus}{#f/0}GIVEN WHAT WE'RE DOING, IT'S NOT ENTIRELY WRONG!",
                    '<25>{#p/undyne}{#f/1}* "Ring room" huh?',
                    '<25>{#p/undyne}{#f/12}* Papyrus, have you ever considered poetry?',
                    "<25>{#p/undyne}{#f/8}* You're a natural!",
                    "<18>{#p/papyrus}{#f/6}I'M NOT SURE THAT'D BE A GREAT USE OF MY TIME.",
                    '<25>{#p/undyne}{#f/1}* Sure it would!',
                    '<25>{#p/undyne}{#f/8}* Just IMAGINE all the crazy stories you could write!',
                    '<18>{#p/papyrus}{#f/4}I THINK...\nYOU AND I...',
                    '<18>{#p/papyrus}{#f/4}...HAVE TWO VERY DIFFERENT IDEAS ABOUT THAT.'
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/4}NOT TO MENTION, THE RECEPTION IS WAY BETTER THERE.' ]
               : [ '<18>{#p/papyrus}{#f/4}PAPYRUS THE POET.', '<18>{#f/5}WELL, IT DOES HAVE A RING TO IT.' ]
      ),
      a_dining: pager.create(
         'limit',
         () => [
            "<18>{#p/papyrus}{#f/5}I DON'T KNOW ABOUT YOU, BUT THE FOOD IN THIS PLACE...",
            '<18>{#f/5}WELL, IT REALLY GRINDS MY GEARS.',
            "<18>{#f/4}IT'S LIKE EVERYONE FORGOT WHAT GOOD COOKING IS LIKE...",
            "<18>{#f/1}WHERE'S MY PASTA- FLAVORED PASTA!?!?",
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/16}* You know, that reminds me...',
                    '<25>{#p/undyne}{#f/9}* I once wanted the royal guard to have a cooking division.',
                    "<25>{#p/undyne}{#f/12}* We'd have gourmet restaraunts, exquisite food...",
                    '<25>{#p/undyne}{#f/17}* ...and then Asgore tasted my cooking.',
                    '<18>{#p/papyrus}{#f/4}...OH.',
                    '<18>{#p/papyrus}{#f/5}...',
                    "<18>{#p/papyrus}{#f/9}MAYBE YOU JUST DIDN'T ADD ENOUGH MARINARA SAUCE!",
                    '<25>{#p/undyne}{#f/4}* No amount of marinara sauce could fix THAT disaster.'
                 ])
         ],
         () =>
            solo()
               ? [
                    '<18>{#p/papyrus}{#f/6}THE LAST TIME I ORDERED IT, THEY...',
                    "<18>{#p/papyrus}{#f/4}WELL, LET'S JUST SAY THE CONCEPT WAS BEYOND THEM."
                 ]
               : [
                    '<18>{#p/papyrus}{#f/4}IN MY VERY HUMBLE OPINION...',
                    '<18>{#p/papyrus}{#f/0}MARINARA SAUCE CAN FIX EVERYTHING.',
                    '<25>{#p/undyne}{#f/17}* But not this!!',
                    "<19>{#p/papyrus}{#f/6}YOU'D BE SURPRISED!"
                 ]
      ),
      a_hub2: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}{#f/0}LIFE IS LIKE A CHESS GAME.',
            '<18>{#p/papyrus}{#f/5}MINUS ALL OF THE BLUNDERING...',
            '<18>{#p/papyrus}{#f/5}AND CAPTURING OF PIECES...',
            '<18>{#p/papyrus}{#f/5}AND...',
            '<18>{#p/papyrus}{#f/4}ACTUALLY, LIFE IS ALMOST NOTHING LIKE A CHESS GAME.',
            '<18>{#p/papyrus}{#f/0}BUT THEY DO HAVE ONE THING IN COMMON.',
            '<18>{#p/papyrus}{#f/0}WHICH IS THAT YOU NEVER KNOW WHAT TO EXPECT!',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/1}* So, kind of like a box of tree saps, then.',
                    '<18>{#p/papyrus}{#f/6}YEAH, KIND OF LIKE THAT.',
                    "<18>{#p/papyrus}{#f/4}WAIT, ISN'T IT SUPPOSED TO BE A BOX OF CHOCOLATES?",
                    '<25>{#p/undyne}{#f/14}* That would be the human expression.'
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/4}OR WAS IT A BOX OF TREE SAPS...?' ]
               : [ '<18>{#p/papyrus}{#f/0}CHOCOLATE AND TREE SAP TASTE VERY SIMILAR, ACTUALLY.' ]
      ),
      a_lookout: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}{#f/5}IN TIME, WE MAY ALL BE EXPLORERS AMONGST THE STARS.',
            '<18>{#p/papyrus}{#f/5}WE MAY VENTURE OUT IN THE GREAT UNKNOWN...',
            '<18>{#p/papyrus}{#f/5}EJECTING OURSELVES FAR FROM THIS PRISON OF OLD.',
            ...(solo()
               ? []
               : [
                    "<25>{#p/undyne}{#f/3}* Don't tell me you're planning a prison break.",
                    '<18>{#p/papyrus}{#f/4}UMM, NO?\nTHAT WOULD BE FAR TOO SUSPICIOUS.',
                    '<25>{#p/undyne}{#f/3}* Oh. Right.',
                    "<18>{#p/papyrus}{#f/0}IT'S AN ALLEGORY FOR FREEDOM.",
                    '<25>{#p/undyne}{#f/16}* I know what you mean.'
                 ])
         ],
         () =>
            solo()
               ? [
                    "<18>{#p/papyrus}{#f/4}LET'S JUST HOPE THAT, WHEN WE REACH THE STARS...",
                    "<18>WE DON'T MEET ANY OF THOSE MOLE-RAT IMPOSTORS."
                 ]
               : [ '<18>{#p/papyrus}{#f/5}I APOLOGIZE.', "<18>{#f/4}I DIDN'T MEAN TO VENT." ]
      ),
      a_hub3: pager.create(
         'limit',
         () =>
            solo()
               ? [
                    '<18>{#p/papyrus}{#f/0}OH YEAH, THIS IS WHERE THE CHILLY FOLKS HANG OUT.',
                    '<18>{#p/papyrus}{#f/5}I FEEL BAD FOR THEM...',
                    "<18>{#p/papyrus}{#f/9}THAT'S WHY I'M THINKING OF BUYING THEM A FRIDGE!",
                    "<18>{#p/papyrus}{#f/9}THAT WAY, THEY'LL ALWAYS HAVE A COLD PLACE NEARBY!"
                 ]
               : [ '<18>{#p/papyrus}{#f/0}COME SAY HI, WE\'RE "CHILLING" IN THE NEXT ROOM OVER!' ],
         () =>
            solo()
               ? [ "<18>{#p/papyrus}{#f/0}ISN'T TECHNOLOGY WONDERFUL?" ]
               : [ '<18>{#p/papyrus}{#f/6}WHAT ARE YOU WAITING FOR!!!' ]
      ),
      a_plaza: pager.create(
         'limit',
         () => [
            "<18>{#p/papyrus}{#f/0}THAT'S WHERE BURGIE'S SHOP IS.",
            '<18>{#p/papyrus}{#f/4}ALTHOUGH HIS FOODS ARE BASICALLY JUNK...',
            '<18>{#p/papyrus}{#f/5}HE DOES SEEM LIKE A REALLY GENUINE GUY.',
            '<18>{#p/papyrus}{#f/5}HE ALSO GAVE ME A LOT TO TALK ABOUT WITH METTATON.',
            '<18>{#p/papyrus}{#f/4}...I DO INTEND TO CONFRONT HIM NOW.',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/1}* Yeah, uh, you do that.',
                    "<25>{#p/undyne}{#f/3}* As for me, I'm gonna stay way the hell away when that goes down.",
                    '<18>{#p/papyrus}{#f/5}METTATON DID SOME BAD THINGS, BUT...',
                    '<26>{#p/undyne}{#f/14}* You got this, Papyrus.\n* Helping people confront stuff is your specialty.',
                    '<18>{#p/papyrus}{#f/6}...',
                    '<18>{#p/papyrus}{#f/9}Y-YEAH, THIS WILL BE EASY!'
                 ])
         ],
         () =>
            solo()
               ? [ "<18>{#p/papyrus}{#f/6}AFTER I'VE EARNED HIS RESPECT, OF COURSE." ]
               : [
                    '<18>{#p/papyrus}{#f/9}NO RELATIONSHIP IS TOO ABUSIVE FOR PAPYRUS!',
                    '<25>{#p/undyne}{#f/8}* PAPYRUS!!\n* THAT DOES NOT SOUND HOW YOU THINK IT DOES!'
                 ]
      ),
      a_elevator5: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}{#f/5}THIS "REC CENTER" IS CERTIANLY RECREATIONAL...',
            '<18>{#p/papyrus}{#f/4}...IN MORE WAYS THAN ONE.',
            "<18>{#p/papyrus}{#f/0}WHAT'S SO AMAZING ABOUT WISH FLOWERS, ANYWAY?",
            '<18>{#p/papyrus}{#f/0}DO YOUR WISHES COME TRUE IF YOU BREATHE THEM IN?',
            ...(solo()
               ? [ '<18>{#p/papyrus}{#f/0}MAYBE I SHOULD TRY IT SOMETIME.' ]
               : [
                    "<25>{#p/undyne}{#f/1}* Somehow I don't think you'd enjoy it.",
                    "<18>{#p/papyrus}{#f/5}YEAH, YOU'RE PROBABLY RIGHT.",
                    '<18>{#p/papyrus}{#f/9}BUT IT NEVER HURTS TO TRY!',
                    '<25>{#p/undyne}{#f/3}* ...'
                 ])
         ],
         () => [
            '<18>{#p/papyrus}{#f/0}BETTER NOT DO IT AT THE REC CENTER, THOUGH.',
            '<18>{#p/papyrus}{#f/4}TALK ABOUT BEING A NUSIANCE.',
            ...(solo() ? [] : [ '<25>{#p/undyne}{#f/12}* Pfft, uh, yeah...' ])
         ]
      ),
      a_hub4: pager.create(
         'limit',
         () =>
            solo()
               ? [
                    "<18>{#p/papyrus}{#f/0}SO THERE'S ICE CREAM UP THERE, HUH?",
                    '<18>{#p/papyrus}{#f/0}SOUNDS LIKE A GREAT PLACE TO HANG OUT.',
                    '<18>{#p/papyrus}{#f/9}MAYBE WE CAN ALL GO THERE AFTER WE VISIT UNDYNE!',
                    "<18>{#p/papyrus}{#f/4}...IT'D BE BETTER THAN EATING JUNK FOOD."
                 ]
               : [ "<25>{#p/undyne}{#f/8}* Wanna talk?\n* We're right here, punk!" ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/4}YOU DO KNOW WHAT JUNK FOOD IS, RIGHT?' ]
               : [ "<25>{#p/undyne}{#f/8}* And we're not going anywhere else!!!" ]
      ),
      a_sleeping1: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}{#f/0}I HEAR THIS HOTEL IS MADE IN EXTRA DIMENSIONS.',
            '<18>{#p/papyrus}{#f/4}DIMENSIONS...\nLAYERS...',
            '<18>{#p/papyrus}{#f/5}DO THEY GIVE US EXTRA BLANKETS TO TAKE NAPS WITH?',
            '<18>{#p/papyrus}{#f/0}ASKING FOR A FRIEND, OF COURSE.',
            ...(solo()
               ? []
               : [
                    '<25>{#p/undyne}{#f/1}* Right, because you just stay awake all the time.',
                    "<18>{#p/papyrus}{#f/0}OF COURSE!\nI CAN'T WASTE MY TIME NAPPING.",
                    '<25>{#p/undyne}{#f/14}* What about sleeping?',
                    '<18>{#p/papyrus}{#f/6}SLEEPING???',
                    "<18>{#p/papyrus}{#f/4}...THAT'S JUST AN EXCUSE MY BROTHER USES TO TAKE NAPS.",
                    '<25>{#p/undyne}{#f/14}* I see.'
                 ])
         ],
         () =>
            solo()
               ? [ '<18>{#p/papyrus}{#f/9}THE GREAT PAPYRUS NEVER TAKES NAPS.' ]
               : [ "<18>{#p/papyrus}{#f/4}IT'S A MIRACLE HE MAKES IT OUT OF BED ANYMORE." ]
      ),
      a_hub5: pager.create(
         'limit',
         () => [
            '<18>{#p/papyrus}{#f/5}FEELS KIND OF EMPTY IN THAT ROOM, HUH?',
            '<18>{#p/papyrus}{#f/5}I THINK PEOPLE ARE JUST AFRAID OF THE ELEVATOR.',
            "<18>{#p/papyrus}{#f/4}OR MORE ACCURATELY, WHAT'S INSIDE IT.",
            '<18>{#p/papyrus}{#f/8}A LACK OF MUSIC!',
            ...(solo() ? [] : [ '<25>{#p/undyne}{#f/8}* How could they do this!' ])
         ],
         [ '<18>{#p/papyrus}{#f/4}AN ELEVATOR WITHOUT MUSIC IS JUST AWKWARD.' ]
      ),
      a_citadelevator: pager.create(
         'limit',
         () => [
            "<18>{#p/papyrus}{#f/5}IF YOU'RE LEAVING THE REC CENTER...",
            "<18>{#p/papyrus}{#f/5}I WON'T BE ABLE TO REACH YOU.",
            "<18>{#p/papyrus}{#f/4}IF YOU'RE ON THE RETURN TRIP, THOUGH...",
            ...(solo() ? [] : [ "<25>{#p/undyne}{#f/14}* Yeah, we'll... probably still be here." ])
         ],
         () =>
            solo()
               ? [ "<18>{#p/papyrus}{#f/6}IT'S HARD TO TELL WHICH WAY IS UP IN THOSE THINGS." ]
               : [ "<25>{#p/undyne}{#f/17}* It's not like we have anything better to do." ]
      )
   },

   s_save: {
      s_crossroads: {
         name: 'Starton - Landing Zone',
         text: () =>
            save.data.n.plot < 29
               ? [ "<32>{#p/human}* (Sans and Papyrus's antics fill you with determination.)" ]
               : world.dead_skeleton
               ? [ '<32>{#p/human}* (The box is so lonely, it fills you with determination anyway.)' ]
               : [ '<32>{#p/human}* (The box can rest easy now.)\n* (This, of course, fills you with determination.)' ]
      },
      s_pacing: {
         name: 'Starton - Moon Rock Road',
         text: () =>
            save.data.n.kills_starton < 5
               ? [
                    '<32>{#p/human}* (Moon rock merchants argue frivolously in the foreground.)',
                    '<32>* (This fills you with determination.)'
                 ]
               : save.data.n.plot < 29
               ? [ '<32>{#p/human}* (The starlight dims.)\n* (Somehow, this fills you with determination.)' ]
               : world.dead_skeleton
               ? [ '<32>{#p/human}* (The starlight has faded.)\n* (Indeed, this fills you with determination.)' ]
               : save.data.n.kills_starton < 7
               ? [ '<32>{#p/human}* (The starlight has returned.)\n* (It once again fills you with determination.)' ]
               : [ '<32>{#p/human}* (The starlight remains dim.)\n* (Somehow, this fills you with determination.)' ]
      },
      s_spaghetti: {
         name: 'Starton - Spaghetti Junction',
         text: () =>
            [
               [ '<32>{#p/human}* (A plate of spaghetti defying the laws of physics fills you with determination.)' ],
               [
                  '<32>{#p/human}* (The spaghetti no longer defies the laws of physics.)',
                  '<32>{#p/human}* (This fills you with determination.)'
               ],
               [ '<32>{#p/human}* (The spaghetti is no more.)', '<32>{#p/human}* (This fills you with determination.)' ]
            ][save.data.n.state_starton_spaghetti]
      },
      s_town1: {
         name: 'Starton - Town',
         text: () =>
            world.dead_skeleton
               ? [ '<32>{#p/human}* (A shadow looms over town, filling you with determination.)' ]
               : [ '<32>{#p/human}* (This cute little town fills you with determination.)' ]
      }
   }
};

CosmosUtils.status(`LOAD MODULE: STARTON TEXT (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
