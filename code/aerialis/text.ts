import { game } from '../core';
import { CosmosKeyed, CosmosProvider, CosmosUtils } from '../engine';
import { battler, choicer, fetchCharacters, instance, pager, world } from '../mantle';
import save from '../save';

const n_sidebarCellPms3 = {
   alphys0: {
      author: 'SYSTEM',
      pm: "Thank you for creating an account on the outpost's #1 social network!"
   },
   alphys1: {
      author: 'ALPHYS',
      pm: () =>
         [
            'finally met the human, that was kinda nervewracking lol', // pacifist
            'well, i just met the human' // badlizard 1
         ][save.data.n.bad_lizard]
   },
   alphys2: {
      author: 'ALPHYS',
      pm: () =>
         [
            "still can't believe mettaton wanted me to fight them, smh", // pacifist
            'not sure what to say except, they seem nice?' // badlizard 1
         ][save.data.n.bad_lizard]
   },
   alphys3: {
      author: 'ALPHYS',
      pm: () =>
         [
            'anyway, imma be guiding them now :D\ngoshhh this is so exciting aaaaaa', // pacifist
            'anyway, imma be guiding them now :O\nlets hope nothing bad happens' // badlizard 1
         ][save.data.n.bad_lizard]
   },
   alphys4: {
      author: 'ALPHYS',
      pm: () =>
         [
            'bro are those dudes fr??\nTHERES ICE CREAM AT THE REC CENTER', // pacifist
            'do they not know theres ice cream at the rec center? uhhhhh' // badlizard 1
         ][save.data.n.bad_lizard]
   },
   alphys6: {
      author: 'ALPHYS',
      pm: 'oh god here we go here we go'
   },
   alphys7: {
      author: 'ALPHYS',
      pm: () =>
         save.data.n.state_aerialis_crafterresult === 0
            ? 'ok imma be honest i have no idea how that worked out lol' // if you didn't do the jetpack part in the MTT show
            : save.data.n.bad_lizard < 1
            ? [
                 'shoulda known those bombs were just TV props lol', // pacifist - didn't make it halfway to the end
                 'is it just me or is mtt literally doing this stuff for no reason???', // pacifist - made it at least halfway
                 'well holy pepperoni that was close', // pacifist - made it all the way with little time to spare
                 "guys that was amazing, anyone who wasn't watching missed out big time" // pacifist - made it to the end easily
              ][save.data.n.state_aerialis_crafterresult - 1]
            : 'welp, there goes my last portable one-time-use jetpack' // badlizard1, if you did the jetpack part
   },
   alphys8: {
      author: 'ALPHYS',
      pm: 'btw has anyone else seen mew mew space adventure???'
   },
   alphys9: {
      author: () => [ 'STRONGFISH91', 'ALPHYS' ][save.data.n.bad_lizard],
      pm: () =>
         [
            'HAVE I EVER???\nMAN THAT SHOW IS FREAKING EPIC!!!', // pacifist
            'anyone at all?' // badlizard 1
         ][save.data.n.bad_lizard]
   },
   alphys10: {
      author: 'ALPHYS',
      pm: () =>
         [
            'woahhh undyne where did you come from!?!?', // pacifist
            'damn, guess not' // badlizard 1
         ][save.data.n.bad_lizard]
   },
   alphys11: {
      author: save.data.n.state_foundry_undyne > 0 ? 'COOLSKELETON95' : 'STRONGFISH91',
      pm: () =>
         save.data.n.bad_lizard < 1
            ? "Wouldn't you like to know!\nFUHUHU!" // pacifist
            : save.data.n.state_foundry_undyne > 0
            ? 'ARE WE WATCHING "TV SHOWS" NOW?\nSOUNDS EXCITING!' // badlizard1 - undyne is dead
            : "Sorry Alphys, I'd love to talk about Mew Mew, just not right now okay?" // badlizard1 - undyne is alive
   },
   alphys12: {
      author: '_K1ll3rMann3qu1n_',
      pm: 'Mew Mew SPACE ADVENTURE!?!??\nHAH! WHAT A LOAD OF HOT GARBAGE!'
   },
   alphys13: {
      author: 'ALPHYS',
      pm: () =>
         [
            'lemme guess, youre one of those mew mew starfire fans arent you', // pacifist
            'sigh...' // badlizard1
         ][save.data.n.bad_lizard]
   },
   alphys14: {
      author: '_K1ll3rMann3qu1n_',
      pm: () =>
         [
            'yeah, okay, but ask yourself this:\ndoes space venture have EXPLOSIONS!?', // pacifist
            "whats the matter, huh?\nSCARED YOU'LL LOSE AN ARGUMENT!?" // badlizard1
         ][save.data.n.bad_lizard]
   },
   alphys15: {
      author: 'ALPHYS',
      pm: () =>
         [
            'LOLLLLLLLLLLL SPACE VENTURE-\naverage starfire fan cant spell fr', // pacifist
            'really starting to regret not adding a block function to this thing fr' // badlizard1
         ][save.data.n.bad_lizard]
   },
   alphys16: {
      author: 'ALPHYS',
      pm: 'okay someone tell me how he already setup another show that fast'
   },
   alphys17: {
      author: 'ALPHYS',
      pm: 'for the record, this mew mew doll thing never happened.'
   },
   alphys18: {
      author: 'ALPHYS',
      pm: 'the heck are those guards doing??\ndid they not get my royal memo??'
   },
   napsta: {
      author: 'NAPSTABLOOK22',
      pm: "oh...... they haven't added a friend request feature yet......"
   },
   alphysX0: {
      author: 'SYSTEM',
      pm: 'Your private message history was successfully cleared.'
   },
   alphysX1: {
      author: 'lazybones.',
      pm: 'just to be on the safe side.'
   },
   alphysX2: {
      author: 'ALPHYS',
      pm: 'of course, just cleared it out now'
   },
   alphysX3: {
      author: 'lazybones.',
      pm: 'heh... remember that time he showed off the new gravity plating?'
   },
   alphysX4: {
      author: 'ALPHYS',
      pm: 'and the whole set just started floating into the sky? OMG YES LMAO'
   },
   alphysX5: {
      author: 'lazybones.',
      pm: 'pfft, he really thought that would work, huh?'
   },
   alphysX6: {
      author: 'ALPHYS',
      pm: 'i remember asgore trying everything he could to hold it down XD'
   },
   alphysX7: {
      author: 'ALPHYS',
      pm: 'man, what a day... i really miss working with you sans'
   },
   alphysX8: {
      author: 'lazybones.',
      pm: "i know you do, alph.\nbut i've got a different job to dddd"
   },
   alphysX9: {
      author: 'ALPHYS',
      pm: '...\nr u there?'
   },
   alphysY1: {
      author: 'lazybones.',
      pm: 'sorry, yeah. a human just showed up, totally caught me off guard.'
   },
   alphysY2: {
      author: 'lazybones.',
      pm: 'no pun intended.'
   },
   alphysY3: {
      author: 'ALPHYS',
      pm: 'right... wait, really?'
   },
   alphysY4: {
      author: 'lazybones.',
      pm: "i wouldn't lie about making a pun, would i?"
   },
   alphysY5: {
      author: 'ALPHYS',
      pm: 'you know what i mean...'
   },
   alphysY6: {
      author: 'lazybones.',
      pm: "don't worry, alph.\ni've got this under control."
   },
   alphysY7: {
      author: 'ALPHYS',
      pm: 'you better lol'
   },
   alphysY8A1: {
      author: 'ALPHYS',
      pm: 'you know the humans been killing monsters in starton right?'
   },
   alphysY8A1a: {
      author: 'ALPHYS',
      pm: 'theyre going after regular citizens-'
   },
   alphysY8A1b: {
      author: 'ALPHYS',
      pm: 'theyre targeting the sentries-'
   },
   alphysY8A1c: {
      author: 'ALPHYS',
      pm: 'theyre going after everyone-'
   },
   alphysY8A2: {
      author: 'lazybones.',
      pm: "i'm know. i'm doing my best to get people out before it's too late."
   },
   alphysY8A3: {
      author: 'ALPHYS',
      pm: 'okay, good'
   },
   alphysY8A4: {
      author: 'ALPHYS',
      pm: 'that was close'
   },
   alphysY8A5: {
      author: 'lazybones.',
      pm: "yeah... guess i shouldn't have doubted my bro, heh."
   },
   alphysY8A6: {
      author: 'ALPHYS',
      pm: 'yeah...'
   },
   alphysY8A7: {
      author: 'ALPHYS',
      pm: 'never mind the humans back to killing again'
   },
   alphysY8A8: {
      author: 'lazybones.',
      pm: 'welp.'
   },
   alphysY8B1: {
      author: 'ALPHYS',
      pm: 'sans'
   },
   alphysY8B2: {
      author: 'ALPHYS',
      pm: 'the human just killed papyrus'
   },
   alphysY8B3: {
      author: 'ALPHYS',
      pm: 'please tell me youre there'
   },
   alphysY8B4a: {
      author: 'lazybones.',
      pm: "i knew i shouldn't have trusted them to change."
   },
   alphysY8B4b: {
      author: 'lazybones.',
      pm: "i knew i shouldn't have left them alone with him."
   },
   alphysY8B5: {
      author: 'ALPHYS',
      pm: 'what are you gonna do now?'
   },
   alphysY8B6: {
      author: 'lazybones.',
      pm: 'honestly, alph?'
   },
   alphysY8B7: {
      author: 'lazybones.',
      pm: "i don't feel like doing anything."
   },
   alphysY8B8: {
      author: 'ALPHYS',
      pm: 'sans...'
   },
   alphysY8B9: {
      author: 'lazybones.',
      pm: "it's not your fault, alph.\nthis would always have happened."
   },
   alphysY8B10: {
      author: 'ALPHYS',
      pm: 'what do you mean?'
   },
   alphysY8B11: {
      author: 'lazybones.',
      pm: 'you know how papyrus can be.'
   },
   alphysY8B12: {
      author: 'lazybones.',
      pm: "he's just too damn good to stand by and watch as people die."
   },
   alphysY8B13: {
      author: 'ALPHYS',
      pm: 'unlike us, huh?'
   },
   alphysY8B14: {
      author: 'lazybones.',
      pm: 'yeah.'
   },
   alphysY8B15: {
      author: 'ALPHYS',
      pm: '...'
   },
   alphysY8B16: {
      author: 'ALPHYS',
      pm: 'things arent getting any better'
   },
   alphysY8B17: {
      author: 'lazybones.',
      pm: "lemme guess, they're killing people in the foundry now?"
   },
   alphysY8B18: {
      author: 'ALPHYS',
      pm: 'yeah but youre gonna help me evacuate right?'
   },
   alphysY8B19: {
      author: 'lazybones.',
      pm: "i can't make any promises.\nbut i'll try."
   },
   alphysY8B20: {
      author: 'ALPHYS',
      pm: 'thanks'
   },
   alphysY8C1: {
      author: 'ALPHYS',
      pm: 'sans people in the foundry are dying'
   },
   alphysY8C2a: {
      author: 'lazybones.',
      pm: 'its the human... even the elite squad cant stop it'
   },
   alphysY8C2b: {
      author: 'lazybones.',
      pm: 'its the human... theyre going after the residents down there'
   },
   alphysY8C2c: {
      author: 'lazybones.',
      pm: 'its the human... theyre killing everybody down there'
   },
   alphysY8C3: {
      author: 'lazybones.',
      pm: "well, aren't you gonna start evacuating people?"
   },
   alphysY8C4: {
      author: 'ALPHYS',
      pm: 'oh right i need to do that'
   },
   alphysY8C5: {
      author: 'ALPHYS',
      pm: 'gotta go-'
   },
   alphysY8C6: {
      author: 'lazybones.',
      pm: "good luck, alph.\ni'll help evacuate if i can."
   },
   alphysY8C7: {
      author: 'lazybones.',
      pm: 'thx'
   },
   alphysY8D1a: {
      author: 'ALPHYS',
      pm: 'first papyrus and now undyne... when is it going to stop?'
   },
   alphysY8D1b: {
      author: 'lazybones.',
      pm: 'undynes gone'
   },
   alphysY8D1x: {
      author: 'ALPHYS',
      pm: 'well at least they spared undyne'
   },
   alphysY8D2a: {
      author: 'lazybones.',
      pm: "i don't know, alph. i just don't."
   },
   alphysY8D2b: {
      author: 'lazybones.',
      pm: "i'm sorry, alph. i wish i could do something, but i really can't."
   },
   alphysY8D2x: {
      author: 'ALPHYS',
      pm: 'though i dont think i want to be here after everything that happened'
   },
   alphysY8D3: {
      author: 'ALPHYS',
      pm: 'i should probably leave the lab while i still have the chance.'
   },
   alphysY8D3x: {
      author: 'ALPHYS',
      pm: 'who knows what theyll do next?'
   },
   alphysY8D4: {
      author: 'lazybones.',
      pm: "yeah, you do that.\ni'll try to keep tabs on 'em though."
   },
   alphysY8D4x: {
      author: 'lazybones.',
      pm: "you can leave the lab if you want.\ni'll try to keep tabs on 'em though."
   },
   alphysY8D5: {
      author: 'ALPHYS',
      pm: 'ok but dont get too close cause theyve killed a lot of people by now'
   },
   alphysY8D6: {
      author: 'lazybones.',
      pm: "i'll be fine, just be sure to get a phone that works outside the lab."
   },
   alphysY8D7: {
      author: 'ALPHYS',
      pm: 'oh yeah i almost forgot, thanks'
   },
   alphysY8D8: {
      author: 'lazybones.',
      pm: "oh, and be sure to clear the message history while you're at it."
   },
   alphysY8D9: {
      author: 'ALPHYS',
      pm: 'yeah ill do that dont worry'
   },
   alphysZ1: {
      author: 'ALPHYS',
      pm: 'hello?'
   },
   alphysZ2: {
      author: 'ALPHYS',
      pm: 'sans, im kinda getting worried'
   },
   alphysZ3: {
      author: 'ALPHYS',
      pm: 'no... no no no no no please tell me that was a prank'
   },
   alphysZ4: {
      author: 'ALPHYS',
      pm: "you're pranking me right?\nyou wouldnt just die like that"
   },
   alphysZ5: {
      author: 'ALPHYS',
      pm: 'sans please tell me that youre alive and safe'
   },
   alphysZ6: {
      author: 'ALPHYS',
      pm: 'im sorry if i upset you for some reason or did something bad'
   },
   alphysZ7: {
      author: 'ALPHYS',
      pm: 'its just been tough on me since you left and i dont know what to do'
   },
   alphysZ8: {
      author: 'ALPHYS',
      pm: 'papyrus... no...'
   },
   alphysZ9: {
      author: 'ALPHYS',
      pm: 'i guess it wasnt a prank, then'
   },
   alphysZ10: {
      author: 'ALPHYS',
      pm: 'sans'
   },
   alphysZ11: {
      author: 'ALPHYS',
      pm: 'i dont know if youre there in some form or not but'
   },
   alphysZ12: {
      author: 'ALPHYS',
      pm: 'undynes gone'
   },
   alphysZ13: {
      author: 'ALPHYS',
      pm: 'UNDYNES GONE AND I DONT FING KNOW WHAT TO DO'
   },
   alphysZ14: {
      author: 'ALPHYS',
      pm: 'sorry'
   },
   alphysZ15: {
      author: 'ALPHYS',
      pm: 'i should probably go.'
   },
   alphysZ16: {
      author: 'ALPHYS',
      pm: 'heck i dont even know why im talking to someone whos dead to begin with'
   },
   alphysZ17: {
      author: 'ALPHYS',
      pm: 'by the way, one last thing'
   },
   alphysZ18: {
      author: 'ALPHYS',
      pm: 'it was the starling all along'
   }
};

export function pms () {
   if (save.data.n.bad_lizard < 2) {
      return [
         'alphys0',
         ...(save.data.s.pms === '' ? [] : save.data.s.pms.split(',').filter(key => key in n_sidebarCellPms3))
      ];
   } else {
      const startonKill = save.data.n.kills_starton > 3;
      const foundryKill = save.data.n.kills_foundry + (save.data.n.state_foundry_maddummy ? 1 : 0) > 3;
      const sentryKill =
         save.data.n.state_starton_doggo === 2 ||
         save.data.n.state_starton_lesserdog === 2 ||
         save.data.n.state_starton_dogs === 2 ||
         save.data.n.state_starton_greatdog === 2;
      const eliteKill = save.data.n.state_foundry_doge === 1 || save.data.n.state_foundry_muffet === 1;
      const papyrusKill = save.data.n.state_starton_papyrus === 1;
      const undyneKill = save.data.n.state_foundry_undyne === 2;
      return [
         'alphysX0',
         'alphysX1',
         'alphysX2',
         'alphysX3',
         'alphysX4',
         'alphysX5',
         'alphysX6',
         'alphysX7',
         'alphysX8',
         'alphysX9',
         ...(world.genocide
            ? [
                 'alphysZ1',
                 'alphysZ2',
                 'alphysZ3',
                 'alphysZ4',
                 'alphysZ5',
                 'alphysZ6',
                 'alphysZ7',
                 'alphysZ8',
                 'alphysZ9',
                 'alphysZ10',
                 'alphysZ11',
                 'alphysZ12',
                 'alphysZ13',
                 'alphysZ14',
                 'alphysZ15',
                 'alphysZ16',
                 'alphysZ17',
                 'alphysZ18'
              ]
            : [
                 'alphysY1',
                 'alphysY2',
                 'alphysY3',
                 'alphysY4',
                 'alphysY5',
                 'alphysY6',
                 'alphysY7',
                 ...(startonKill || sentryKill
                    ? [
                         'alphysY8A1',
                         [ 'alphysY8A1a', 'alphysY8A1b', 'alphysY8A1c' ][
                            (startonKill ? 1 : 0) + (sentryKill ? 2 : 0) - 1
                         ],
                         'alphysY8A2',
                         'alphysY8A3',
                         ...(save.data.n.state_starton_papyrus === 1
                            ? []
                            : [
                                 'alphysY8A4',
                                 'alphysY8A5',
                                 'alphysY8A6',
                                 ...(save.data.n.kills_foundry > 0 ||
                                 save.data.n.state_foundry_maddummy === 1 ||
                                 eliteKill
                                    ? [ 'alphysY8A7', 'alphysY8A8' ]
                                    : [])
                              ])
                      ]
                    : []),
                 ...(papyrusKill
                    ? [
                         'alphysY8B1',
                         'alphysY8B2',
                         'alphysY8B3',
                         startonKill || sentryKill ? 'alphysY8B4a' : 'alphysY8B4b',
                         'alphysY8B5',
                         'alphysY8B6',
                         'alphysY8B7',
                         'alphysY8B8',
                         'alphysY8B9',
                         'alphysY8B10',
                         'alphysY8B11',
                         'alphysY8B12',
                         'alphysY8B13',
                         'alphysY8B14',
                         'alphysY8B15'
                      ]
                    : []),
                 ...(foundryKill || eliteKill
                    ? startonKill || sentryKill || papyrusKill
                       ? [ 'alphysY8B16', 'alphysY8B17', 'alphysY8B18', 'alphysY8B19', 'alphysY8B20' ]
                       : [
                            'alphysY8C1',
                            [ 'alphysY8C2a', 'alphysY8C2b', 'alphysY8C2c' ][
                               (foundryKill ? 1 : 0) + (eliteKill ? 2 : 0) - 1
                            ],
                            'alphysY8C3',
                            'alphysY8C4',
                            'alphysY8C5',
                            'alphysY8C6',
                            'alphysY8C7'
                         ]
                    : []),
                 ...(undyneKill
                    ? [
                         ...(papyrusKill ? [ 'alphysY8D1a', 'alphysY8D2a' ] : [ 'alphysY8D1b', 'alphysY8D2b' ]),
                         'alphysY8D3',
                         'alphysY8D4'
                      ]
                    : [ 'alphysY8D1x', 'alphysY8D2x', 'alphysY8D3x', 'alphysY8D4x' ]),
                 'alphysY8D5',
                 'alphysY8D6',
                 'alphysY8D7',
                 'alphysY8D8',
                 'alphysY8D9'
              ])
      ];
   }
}

export const evac = () =>
   world.genocide || (save.data.n.bad_lizard > 1 && world.population < 3) || (world.population === 0 && !world.bullied);

const text = {
   a_aerialis: {
      puzzlehelp: [
         '<32>{#s/phone}{#p/event}* Ring, ring...',
         "<25>{#p/alphys}{#g/alphysWelp}* Just calling to let you know that I'm here if you need my help.",
         "<25>{#p/alphys}{#g/alphysCutscene2}* I'll keep my phone available while you're in the room!",
         '<32>{#s/equip}{#p/event}* Click...'
      ],
      riverboi1: () => [
         '<32>{#p/monster}{#npc/a}* I am the traveler.\n* My taxi and I can take you to many places on the outpost.',
         '<32>* Where would you like to go?',
         choicer.create(
            '* (What do you say?)',
            -1,
            -1,
            game.room === 'w_wonder' ? 'Cancel' : 'Outlands',
            game.room === 's_taxi' ? 'Cancel' : 'Starton',
            game.room === 'f_taxi' ? 'Cancel' : 'Foundry',
            game.room === 'a_lookout' ? 'Cancel' : 'Aerialis'
         )
      ],
      riverboi2: [
         '<32>{#p/monster}{#npc/a}* Tra la la...',
         '<32>{#p/monster}{#npc/a}* You may return to me and my taxi at any time.'
      ],
      riverboi3: pager.create('random', [ '<32>{#p/monster}{#npc/a}* Tra la la.' ]),
      papinter1: pager.create(
         'limit',
         () =>
            save.data.b.a_state_fishbetray
               ? [
                    '<18>{#p/papyrus}HELLO, HUMAN!',
                    "<18>{#p/papyrus}IT'S ABOUT TIME YOU GOT HERE.",
                    "<18>{#f/4}THERE'S SO MANY INTERESTING THINGS TO DO...",
                    '<18>{#f/0}HAVE YOU TRIED THE BOWLING ALLEY YET?',
                    '<18>{#f/9}OR, EVEN BETTER, THE SWIMMING POOL!',
                    '<18>{#f/4}BOTH OF WHICH ARE ACCESSIBLE VIA THE TAXI...',
                    '<18>{#f/5}...FOR ANYONE AGED TEN AND UP.'
                 ]
               : [
                    '<18>{#p/papyrus}HELLO, HUMAN!',
                    "<18>{#p/papyrus}IT'S ABOUT TIME YOU GOT HERE.",
                    "<18>{#f/4}THERE'S SO MANY INTERESTING THINGS TO DO...",
                    '<18>{#f/0}HAVE YOU TRIED THE BOWLING ALLEY YET?',
                    '<25>{#p/undyne}{#f/17}* Really, Papyrus?\n* Bowling?',
                    '<25>{#p/undyne}{#f/8}* The magical arts club is OBVIOUSLY better!',
                    "<18>{#p/papyrus}{#f/4}YOU'RE NOT AFRAID OF HUMAN GAMES, ARE YOU?",
                    '<25>{#p/undyne}{#f/4}* What!?\n* Of course not!',
                    "<25>{#p/undyne}{#f/5}* I'm just-",
                    "<25>{#p/undyne}{#f/12}* I'm just an avid believer in the beauty of artistry.",
                    "<18>{#p/papyrus}{#f/5}SO YOU'LL JOIN ME AT THE JAZZ AND BLUES MUSIC CLUB?",
                    "<25>{#p/undyne}{#f/8}* Oh my god, for the last time, I'm NOT playing a saxophone again!!"
                 ],
         () =>
            save.data.b.a_state_fishbetray
               ? [
                    "<18>{#p/papyrus}{#f/0}THAT'S TEN IN KRIOS-YEARS, BY THE WAY.",
                    '<18>{#p/papyrus}{#f/4}I HAVE NO IDEA HOW MANY EARTH-YEARS THAT IS...',
                    "<18>{#p/papyrus}{#f/5}THOUGH I'VE HEARD THE DIFFERENCE ISN'T THAT BIG."
                 ]
               : [
                    "<18>{#p/papyrus}IF YOU'RE LOOKING FOR THE ICE CREAM, IT'S TO MY RIGHT.",
                    '<25>{#p/undyne}{#f/3}* Don\'t you mean "left?"',
                    '<18>{#p/papyrus}{#f/5}TECHNICALLY, THE ICE CREAM STAND -IS- TO MY LEFT.',
                    "<18>{#p/papyrus}{#f/4}BUT TO THE HUMAN, IT'S ACTUALLY ON MY RIGHT.",
                    '<25>{#p/undyne}{#f/14}* Ah.\n* How considerate of you!',
                    "<25>{#p/undyne}{#f/17}* Just don't be surprised if they get lost."
                 ],
         () =>
            save.data.b.a_state_fishbetray
               ? [ '<18>{#p/papyrus}{#f/5}KEEPING TIME IS HARD SOMETIMES.' ]
               : [ '<18>{#p/papyrus}{#f/5}DIRECTIONS CAN BE HARD SOMETIMES.' ]
      ),
      papinter2: [
         '<18>{#p/papyrus}{#f/0}HELLO, HUMAN.',
         '<18>{#p/papyrus}{#f/5}(SIGH...)',
         "<18>YOU'RE PROBABLY WONDERING WHY UNDYNE'S NOT HERE.",
         '<18>HOW DO I PUT IT...',
         "<18>{#f/6}LET'S SAY UNDYNE HAD TO LEAVE FOR... REASONS.",
         '<18>{#f/5}...INVOLVING HER FINDING OUT THAT YOU...',
         '<18>{#f/1}...KILLED SOMEONE!?!?',
         "<18>{#f/0}BUT I'M SURE SHE'S JUST MISTAKEN.",
         "<18>{#f/5}YOU WOULDN'T DO ANYTHING LIKE THAT... RIGHT?",
         "<18>{#f/6}S-SO, I'VE DECIDED TO STAY.",
         '<18>{#f/9}SOMEONE HAS TO STAND UP FOR THE "LITTLE GUY" HERE!',
         '<18>{#f/0}OR GIRL. OR WHATEVER PRONOUN YOU SO CHOOSE.',
         "<18>{#f/4}WAIT, WHAT IF YOU DON'T HAVE A PRONOUN...",
         '<18>{#f/8}WHAT WOULD I CALL YOU THEN!?!?',
         '<18>{#f/8}...',
         "<18>{#f/0}WELL, I'LL BE HERE IF YOU WANT TO CALL OR CHAT."
      ],
      undinter: pager.create(
         'limit',
         () =>
            save.data.n.plot < 68
               ? [
                    '<25>{#p/undyne}{#f/1}* Hey, punk.\n* Long time no see.',
                    "<18>{#p/papyrus}{#f/6}DIDN'T YOU JUST HANG OUT WITH THEM EARLIER TODAY???",
                    '<25>{#p/undyne}{#f/14}* I mean, yeah, but half a day is a long time.',
                    "<18>{#p/papyrus}{#f/0}THAT'S TRUE.",
                    '<18>{#p/papyrus}{#f/5}WOW... IMAGINE ALL I COULD DO IN HALF A DAY...',
                    "<18>{#p/papyrus}{#f/4}...IF MY BROTHER DIDN'T SLACK OFF ALL THE TIME.",
                    '<25>{#p/undyne}{#f/17}* Tell me about it.'
                 ]
               : [
                    '<25>{#p/undyne}{#f/1}* Hey, punk.\n* Papyrus had some "business" to see to.',
                    "<25>{#f/14}* At least, that's what he tells me.",
                    '<25>{#f/7}* But that means I\'M the only "best friend" you\'ve got up here!',
                    '<25>{#f/4}* ...so you better not do anything STUPID!'
                 ],
         () =>
            save.data.n.plot < 68
               ? [
                    '<25>{#p/undyne}{#f/1}* If you ever want to join me in the magical arts club...',
                    '<25>{#p/undyne}{#f/3}* ...er, I doubt the taxi would wanna take a kid there, actually.',
                    "<25>{#p/undyne}{#f/12}* Maybe they'll let you visit after you've grown up a little."
                 ]
               : [ "<25>{#p/undyne}{#f/11}* I've got my eye on you." ]
      ),
      corndog1: pager.create(
         'limit',
         [
            "<25>{#p/sans}{#f/0}* i'm selling corn dogs for 10G a piece, if you're interested.",
            choicer.create('* (Buy a Corn Dog?)', 8, 7, 'Yes', 'No')
         ],
         [ '<25>{#p/sans}{#f/0}* corn dogs for 10G.', choicer.create('* (Buy a Corn Dog?)', 8, 7, 'Yes', 'No') ]
      ),
      corndog2: [
         "<32>{#p/human}* (You're carrying too much.)",
         "<25>{#p/sans}{#f/2}* tell you what, i'll just drop it right here."
      ],
      corndog3: [ "<32>{#p/human}* (You don't have enough G.)" ],
      corndog2b: [ '<25>{#p/sans}{#f/2}* here you go.' ],
      corndog4: () =>
         [
            [ '<32>{#p/human}* (You got the Corn Dog.)', '<25>{#p/sans}{#f/2}* enjoy.' ],
            [
               '<32>{#p/human}* (You got the Corn Goat.)',
               '<25>{#p/sans}{#f/2}* oops, that was supposed to be a dog.\n* my mistake.'
            ],
            [ '<32>{#p/human}* (You got the Corn Dog.)' ]
         ][Math.min(save.data.n.state_aerialis_corngoat++, 2)],
      corndog5: [ '<32>{#p/human}* (You decide not to buy one.)' ],
      corndog6: [ "<32>{#p/sans}{#f/2}* remember, the corn dogs are always here if you need 'em." ],
      corndog7: [
         '<32>{#p/human}* (You look inside the sentry station...)',
         '<32>{#p/narrator}* Nothing but hot air in here.'
      ],
      tvm1: [ '<32>{#p/human}* (You got the Radio.)', '<32>{#p/monster}{#npc/a}* Hope you like your new radio!' ],
      tvm2: [ '<32>{#p/human}* (You got the Fireworks.)', '<32>{#p/monster}{#npc/a}* Hope you enjoy the fireworks!' ],
      tvm3: [ "<32>{#p/human}* (You're carrying too much.)" ],
      tvm4: pager.create('limit', [ '<32>{#p/monster}{#npc/a}* Your winnings are on the table there, little one.' ]),
      tvm5: pager.create(
         'limit',
         [
            '<32>{#p/monster}{#npc/a}* I work for Mettaton.\n* I like my job.\n* My co-workers do not.',
            '<32>* What do you think of my rings?',
            '<32>* Each one represents a time I survived being fired from this wonderful job.'
         ],
         [ '<32>{#p/monster}{#npc/a}* I am thinking of getting one for my face someday.' ]
      ),
      tvm6: () => [
         '<32>{#p/monster}{#npc/a}* There was a Mew Mew doll here for you, but Mettaton had it recalled for personal reasons.',
         '<32>{#p/monster}{#npc/a}* As compensation, Mettaton offered you some money...',
         '<32>{#s/equip}{#p/human}{#npc}* (You got 999 G.)',
         ...((save.data.b.a_state_moneyitemA && !save.data.b.item_tvm_radio) ||
         (save.data.b.a_state_moneyitemB && !save.data.b.item_tvm_fireworks)
            ? [ '<32>{#p/monster}{#npc/a}* The rest of your winnings are still available for pickup.' ]
            : [ '<32>{#p/monster}{#npc/a}* I apologize for the trouble.' ])
      ],
      tvm7: [
         "<32>{#p/narrator}* There's a note etched into the table here...",
         '<32>{#p/mettaton}* "SORRY, BUT I HAD TO TAKE THE MEW MEW DOLL WITH ME."\n* "NOTHING PERSONAL, OF COURSE."'
      ],
      lockup0: [ "<32>{#p/narrator}* It's locked." ],
      lockup1: [
         '<32>{#p/human}* (You unlocked the safe with the rusty key.)',
         '<32>{#p/narrator}* The shelves are labelled "old earth weaponry."'
      ],
      lockup2: [ '<32>{#p/human}* (You got the Stun Gun.)' ],
      lockup3: [ '<32>{#p/human}* (You got the Sleep Bomb.)' ],
      lockup4: [ '<32>{#p/human}* (You got the Pepper Spray.)' ],
      lockup5: [ "<32>{#p/narrator}* It's empty." ],
      lockup6: [ "<32>{#p/human}* (You're carrying too much.)" ],
      gonezo: () =>
         world.bullied ? [ '<32>{#p/narrator}* ...but everybody ran.' ] : [ '<32>{#p/narrator}* ...but nobody came.' ],
      spidershop1: [ choicer.create('* (Leave 40G in the web?)', 8, 7, 'Yes', 'No') ],
      spidershop2: [
         '<32>{#p/narrator}* Some spiders crawled out and gave you an item.',
         '<32>{#s/equip}{#p/human}* (You got the Hyper Vortex Pop.)'
      ],
      spidershop3: [ "<32>{#p/human}* (You're carrying too much.)" ],
      spidershop4: [ "<32>{#p/human}* (You don't have enough G.)" ],
      spidershop5: [ '<32>{#p/human}* (You decide not to leave any G.)' ],
      hotelfood0: [
         "<33>{#p/narrator}* It's a kind of mysterious food.",
         choicer.create('* (Take it?)', 8, 7, 'Yes', 'No')
      ],
      hotelfood1: [ '<32>{#p/human}* (You got the Mysteryfood.)' ],
      hotelfood2: [ "<32>{#p/human}* (You're carrying too much.)" ],
      hotelfood3: [ '<32>{#p/human}* (You decide not to take it.)' ],
      sonic1: [ '<32>{#p/human}* (You got the Sonic Resonator.)' ],
      sonic2: [ "<32>{#p/human}* (You're carrying too much to take that.)" ],
      tablaphone1: [ '<32>{#p/human}* (You got the Tablaphone.)' ],
      tablaphone2: [ "<32>{#p/human}* (You're carrying too much to take that.)" ],
      moonpie1: [
         '<32>{#p/human}* (You got the Moon Pie.)',
         '<32>{#p/monster}{#npc/a}* I never said you could take that...',
         "<32>* Uh, don't worry though, it was meant for you anyway.",
         '<32>* Hope you like it...?'
      ],
      moonpie2: [
         "<32>{#p/human}* (You're carrying too much to take that.)",
         "<32>{#p/monster}{#npc/a}* Looks like you're out of space for that.",
         '<32>* Get it?\n* Out of space?',
         '<32>* Well, I thought it was funny.'
      ],
      ratings: 'RATINGS $(x)',
      secretcall: [
         '<32>{#s/phone}{#p/event}* Ring, ring...',
         "<18>{#p/papyrus}{#f/0}PSST, IT'S PAPYRUS AGAIN.",
         '<18>{#f/6}WOWIE... IT MUST BE GETTING LATE BY NOW.',
         '<18>{#f/5}ARE YOU WELL?\nHAS ANYONE ELSE BEEN... KILLED?',
         '<18>{#f/5}THESE ARE THE QUESTIONS I ASK MYSELF EVERY DAY.',
         "<18>{#f/4}GRANTED, I'VE ONLY BEEN IN HIDING FOR A FEW HOURS.",
         '<18>{#f/7}BUT STILL!!!',
         '<18>{#f/5}...',
         "<18>{#f/4}THAT SOUND... IT'S THE HUM OF THE CORE, ISN'T IT?",
         '<18>{#f/4}...YOU MUST BE CLOSE TO THE CITADEL NOW.',
         '<18>{#f/5}I WISH I COULD DO MORE TO HELP, BUT ALAS...',
         '<18>{#f/5}IT WOULD BE UNSAFE FOR ME TO RETURN RIGHT NOW.',
         '<18>{#f/9}JUST KNOW THAT THE GREAT PAPYRUS BELIEVES IN YOU!',
         "<18>{#f/0}I KNOW YOU'RE TRYING TO DO THE RIGHT THING.",
         "<18>{#f/5}AS LONG AS YOU HOLD ONTO THAT, YOU'LL BE GOOD...",
         '<18>{#f/6}...RIGHT?',
         '<18>{#f/5}...',
         '<18>{#f/5}PAPYRUS OUT...',
         '<32>{#s/equip}{#p/event}* Click...'
      ],
      story: {
         phonewarn1: () =>
            // already got the phone in past timeline
            save.flag.b.asriel_phone
               ? // asriel had to tell you in the past timeline where that phone was
                 save.flag.n.ga_asrielGetThePhone > 0
                  ? // asriel hasn't reminded you yet
                    save.flag.n.ga_asrielGetThePhone2++ < 1
                     ? [
                          "<25>{#p/asriel2}{#f/6}* Seriously, $(name)?\n* You know where Alphys's spare cell phone is.",
                          '<25>{#p/asriel2}{#f/7}* Go back to her desk and grab it.'
                       ]
                     : // asriel has reminded you (no dialogue)
                       []
                  : // asriel tells you where to find it now
                  save.flag.n.ga_asrielGetThePhone2++ < 1
                  ? [
                       "<25>{#p/asriel2}{#f/3}* Remember, we need that phone from Alphys's lab.",
                       "<25>{#p/asriel2}{#f/4}* I'm pretty sure it was on her desk..."
                    ]
                  : // asriel already told you, now he repeats
                    [ "<25>{#p/asriel2}{#f/3}* Remember, the phone from Alphys's lab." ]
               : // didn't get the phone in a past timeline, hint at location
                 [
                    [
                       '<25>{#p/asriel2}{#f/3}* Alphys usually keeps her liftgate passes on phones.',
                       '<25>* I think I saw a cell phone back in the lab.\n* Go get it.'
                    ],
                    [
                       "<25>{#p/asriel2}{#f/7}* $(name), we can't make progress without that pass.",
                       '<25>{#f/6}* Find it.'
                    ],
                    [ '<25>{#p/asriel2}{#f/13}* Uh... $(name)?' ],
                    [ '<25>{#p/asriel2}{#f/13}* ...' ]
                 ][Math.min(save.flag.n.ga_asrielGetThePhone++, 3)],
         phonegrabber1: [
            "<32>{#p/narrator}* It's a smart cell phone.\n* Comes with a liftgate pass and two dimensional boxes.",
            '<32>{#p/narrator}* No jetpack though.\n* Shame.',
            '<32>{#p/narrator}* ...'
         ],
         phonegrabber2: [ '<32>{#p/human}* (Your CELL has been upgraded.)' ],
         phonegrabber3: () =>
            save.flag.n.ga_asrielGetThePhone > 1
               ? [ '<25>{#p/asriel2}{#f/10}* Finally.' ]
               : [ "<25>{#p/asriel2}{#f/10}* I wonder if there's any old messages on it." ],
         alphys1: [ '<25>{#p/alphys}{#f/2}* Oh my god!', '<25>{#f/3}* How did you get here so fast!?' ],
         alphys2: [ "<25>{#f/4}* I just got off the phone, I still haven't checked the lab...", '<25>{#f/17}* ...' ],
         alphys3: () => [
            ...[
               [
                  '<25>{#f/1}* Well, uh, h-hiya!',
                  "<25>{#f/1}* I'm Dr. Alphys.\n* Head of the royal science division.",
                  '<25>{#f/10}* But, uh, I\'m not actually one of the "bad guys!"',
                  "<25>{#f/17}* Actually, since you left the Outlands, I've been...",
                  '<25>{#f/5}* Eheh, "observing" you through my security consoles.',
                  '<25>{#f/8}* Your fights...\n* Your friendships...',
                  '<25>{#f/1}* Everything!',
                  '<25>{#f/9}* OH! And my favorite part of all...',
                  ...(save.data.b.s_state_million
                     ? [ "<25>{#f/16}* ...was watching you destroy Sans's cheated h-high score!" ]
                     : save.data.b.f_state_thundersnail_win
                     ? [ '<25>{#f/16}* ...was how you actually won a game o-of Thundersnail!' ]
                     : !save.data.b.papyrus_fire
                     ? [ '<25>{#f/16}* ...was how you got through the wall of fire on your first try!' ]
                     : !save.data.b.s_state_mathcrash
                     ? [ '<25>{#f/16}* ...was how you beat the number neutralizer puzzle by y-yourself!' ]
                     : [ '<25>{#f/16}* ...was watching you fight Undyne!' ]),
                  '<25>{#f/12}* So awesome...',
                  "<25>{#f/18}* But, uh, you're gonna need my help to get through Aerialis!"
               ],
               [
                  '<25>{#f/8}* Well, h-hiya...',
                  "<25>{#f/9}* I'm... Dr. Alphys.\n* Head of the royal science division.",
                  "<25>{#f/4}* Ever since you left the Outlands, I've been...",
                  '<25>{#f/4}* Eheh, "observing" you through my security consoles.',
                  '<25>{#f/11}* Your fights...\n* Your friendships...',
                  '<25>{#f/11}* ...',
                  ...(save.data.n.state_foundry_undyne > 0
                     ? [ "<25>{#f/13}* Even...\n* Undyne's d-death..." ]
                     : save.data.n.state_starton_papyrus === 1
                     ? [ "<25>{#f/13}* Even...\n* Papyrus's d-death..." ]
                     : save.data.n.state_foundry_doge === 1 || save.data.n.state_foundry_muffet === 1
                     ? [ "<25>{#f/13}* ...even the deaths of Undyne's ELITE s-squad..." ]
                     : save.data.n.state_starton_dogs === 2 ||
                       save.data.n.state_starton_greatdog === 2 ||
                       save.data.n.state_starton_lesserdog === 2 ||
                       save.data.n.state_starton_doggo === 2
                     ? [ '<25>{#f/13}* ...even the deaths of the c-canine unit...' ]
                     : [ "<25>{#f/13}* ...even those monsters' d-deaths..." ]),
                  "<25>{#g/alphysSmileSweat}* But hey, it's not all bad... right?",
                  "<25>{#g/alphysCutscene2}* I mean, heck, despite all that's happened...\n* You're still here.",
                  '<25>{#g/alphysSmileSweat}* That has to count for something, right?',
                  '<25>{#g/alphysIDK}* ...',
                  "<25>{#g/alphysIDK}* That being said, you're probably gonna need my help in Aerialis."
               ]
            ][save.data.n.bad_lizard],
            '<25>{#f/15}* Yeah... it\'s not really a "human friendly" place...',
            '<25>{#f/17}* Deadly traps...\n* Impossible puzzles...\n* Royal guards...',
            '<25>{#f/15}* Not to mention- {%}'
         ],
         alphys4: [ '<25>{#f/20}* Mettaton.' ],
         alphys5: [ '<25>{#f/3}* Ehehe...' ],
         alphys6: [ '<25>{#f/17}* ...' ],
         alphys7: [ '<25>{#f/11}* Oh no.' ],
         alphys8: [ '<32>{#p/mettaton}* OHHHH YES!', '<32>{#p/mettaton}* WELCOME, BEAUTIES...' ],
         alphys9: [ "<32>{#p/mettaton}* TO TODAY'S TALENT SHOW!" ],
         alphys10: [
            "<32>{#p/mettaton}* I CAN ALREADY TELL IT'S GONNA BE A GREAT SHOW!",
            "<32>* LET'S GIVE A ROUND OF APPLAUSE TO OUR NEW CONTESTANT...",
            '<33>* THE ONE AND ONLY HUMAN VISITOR!'
         ],
         alphys11: [ '<32>{#p/mettaton}* NEVER PLAYED BEFORE, GORGEOUS?', "<32>* WELL, IT'S SIMPLE." ],
         alphys11b: [ "<32>* IN FACT, THERE'S ONLY ONE RULE!", '<32>* PUT ON THE BEST PERFORMANCE OF YOUR LIFE...' ],
         alphys12: [ '<32>{*}{#p/mettaton}* OR DIE TRYING!!!{^20}{*}' ],
         alphys13: () => [
            ...(save.data.n.bad_lizard < 1
               ? [
                    '<25>{#p/alphys}{#f/5}* Hey...',
                    '<25>{#f/8}* I know that kinda came outta nowhere, but... you were p-pretty cool.'
                 ]
               : [
                    '<25>{#p/alphys}{#f/5}* Hey...',
                    '<25>{#f/8}* I know that kinda came outta nowhere, but... you handled it p-pretty well.'
                 ]),
            "<25>{#f/9}* Anyway, uh, as I was saying, you're gonna need my help.",
            "<25>{#f/17}* Let's see what you've got on you..."
         ],
         alphys14: [
            '<25>{#p/alphys}{#f/21}* ...',
            '<25>{#f/21}* What is this.',
            '<25>{#f/21}* Who gave you this.',
            '<25>{#f/22}* WHO IS STILL USING TECHNOLOGY LIKE THIS???',
            '<25>{#f/22}* ...',
            "<25>{#f/23}* I'll be right back."
         ],
         alphys15: () =>
            save.data.n.bad_lizard < 1
               ? [
                    '<25>{#p/alphys}{#g/alphysCutscene1}* Okay, I got you a new cell phone!',
                    "<25>* It's got a liftgate pass, dimensional boxes...",
                    '<25>{#g/alphysHellYeah}* And your very own OuterNet account!',
                    '<25>{#g/alphysSmileSweat}* I also made us friends so you can ping me for help at any time!',
                    '<25>{#g/alphysUhButHeresTheDeal}* So yeah!!'
                 ]
               : [
                    '<25>{#p/alphys}{#g/alphysWelp}* Sorry, but that thing you were using was a glorified brick.',
                    "<25>{#g/alphysSide}* This new phone's got a liftgate pass, dimensional boxes...",
                    '<25>{#g/alphysSmileSweat}* And your very own OuterNet account!',
                    "<25>{#g/alphysNervousLaugh}* Don't worry, I made us friends so you can ping me for help if needed."
                 ],
         alphys16: [ "<25>{#p/alphys}{#g/alphysWelp}* Well, I'll be at my desk." ],
         alphys17: [
            '<32>{#p/narrator}* ...is it just me, or did that "talent show" not feel quite right?',
            '<32>* Hmm...',
            "<32>* Well, I will say that it's exactly the type of thing Mettaton loves to do.",
            '<32>* Yeah... don\'t expect the "fun" to stop any time soon.'
         ],
         rg1a: [ '<32>{#p/monster}{#x1}* Hey kid!{#x3}' ],
         rg1b1: [ '<32>{#p/monster}{#x1}* Can you like, tell us where the nearest ice cream stand is?{#x3}' ],
         rg1b2: [ '<32>{#p/monster}{#x1}* My boyfriend and I have been looking all over the place!{#x3}' ],
         rg1c: [
            '<32>{#p/monster}{#x1}* You okay, kid?{#x3}',
            "<32>{#x1}* You're acting, like, pretty weird and stuff...{#x3}",
            '<32>{#x1}* You know, with the whole "not talking to us" thing and all...{#x3}',
            '<32>{#x1}* So, uh...{#x3}'
         ],
         rg1d1: [ "<32>{#p/monster}{#x1}* Forget it, bro.\n* I don't think they even know we're standing here.{#x3}" ],
         rg1d2: [
            '<32>{#p/monster}{#x2}* But the ice cream!{#x3}',
            "<32>{#p/monster}{#x1}* It's okay, bro.\n* We can just get pizza instead.{#x3}"
         ],
         rg1d3: [ '<32>* ...', "<32>{#x2}* I'll allow it.{#x3}" ],
         rg1e: [
            '<32>{#p/monster}{#x1}* Well, see ya, I guess...{#x3}',
            "<32>{#x2}* We'll let ya know if we find that ice cream and stuff!{#x3}"
         ],
         robocaller1: () =>
            [
               [
                  '<32>{#p/mettaton}* THERE YOU ARE, BRAT.',
                  '<32>{#z03}* YOU MAY NOT KNOW ME, BUT I KNOW YOU...',
                  '<32>{#z21}* ALPHYS AND I WATCHED YOU DO SOME PRETTY BAD THINGS.',
                  "<32>{#z00}* YOU SEE, WE'D UNDERSTAND IF IT WAS JUST A FEW SMALL MISTAKES...",
                  '<32>* HECK, ALPHYS AND I ARE BIG BELIEVERS IN HUMANS.',
                  "<32>{#z03}* BUT THERE'S ONLY SO MUCH VIOLENCE YOU CAN EXCUSE.",
                  "<32>{#z21}* ALPHYS... ISN'T GOING TO BE JOINING US FOR TODAY...",
                  "<32>{#z00}* AFTER WHAT YOU'VE DONE, IT'S PROBABLY FOR THE BEST.",
                  '<32>{#z21}* TRY NOT TO KILL ANYONE ELSE, WILL YOU?',
                  '<32>{#z21}* ...',
                  '<32>{#z11}* WELL, TOODLES!'
               ],
               [
                  '<32>{#p/mettaton}* THERE YOU ARE.',
                  '<32>{#z03}* YOU MAY NOT KNOW ME, BUT...',
                  '<32>* ...',
                  '<32>{#z00}* ...',
                  "<32>* LOOK.\n* I'LL BE HONEST.",
                  "<32>{#z11}* I'M TO THE POINT WHERE ALL THIS DEATH YOU TWO HAVE CAUSED JUST FEELS... NUMB.",
                  "<32>{#z00}* BUT THERE'S ONE PERSON I CAN'T GO WITHOUT.",
                  "<32>* SHE WON'T ANSWER HER PHONE...",
                  "<32>{#z21}* SHE WON'T REPLY TO MY OUTERNET MESSAGES, EVEN THOUGH SHE'S BLATANTLY ONLINE.",
                  '<32>{#z11}* AND, THE THINGS SHE SAID TO ME BEFORE SHE LEFT, JUST MOMENTS AGO...?',
                  '<32>{#z00}* HAVE ME VERY CONCERNED.',
                  '<32>* HUMAN, IF YOU HAVE ANY SHRED OF DECENCY LEFT...',
                  "<32>* YOU'LL DO WHAT ALPHYS SAID YOU HAD THE POWER TO DO...",
                  '<32>* AND RESET THE TIMELINE.',
                  "<32>{#z11}* OTHERWISE, WITH THE WAY YOU'RE GOING RIGHT NOW...?",
                  '<32>* HEH, DARLING...',
                  "<32>{#z02}* YOU'RE IN FOR A BAD TIME."
               ]
            ][save.data.n.bad_lizard - 2],
         robocaller1x: [
            '<25>{#p/asriel2}{#f/13}* A "bad time," you say?',
            "<25>{#f/1}* Hmm...\n* I think we both know who's in for THAT.",
            "<25>{#f/2}* And it's not us."
         ],
         robocaller2: [
            '<32>{#p/mettaton}{#z11}* OH, SWEETHEART...\n* YOU HAVE NO IDEA, DO YOU...?',
            '<32>{#z02}* HAHAHA...',
            '<32>{#z03}* JUST REMEMBER, YOU TWO...',
            "<32>{#z12}* YOU'VE BEEN WARNED.",
            '<32>{#z21}* ...',
            '<32>{#z11}* WELL, TOODLES!'
         ],
         robocaller2x: [ '<25>{#p/asriel2}{#f/3}* Huh...' ],
         robocaller2y: [ '<25>{#p/asriel2}{#f/3}* ...' ],
         status: '$(x) updated status',
         barricade1: [
            '<32>{#p/event}* Ring, ring...',
            "<25>{#p/alphys}{#g/alphysSideSad}* I don't think you can get through that...",
            '<25>{#g/alphysSmileSweat}* Let me see if I can do anything to help.',
            '<25>{#p/narrator}* ...',
            '<32>{#p/human}* (It sounds like someone is furiously typing at a keyboard.)',
            '<25>{#p/alphys}{#g/alphysNervousLaugh}* Security... w-what?',
            '<25>{#p/narrator}* ...',
            '<32>{#p/human}* (More typing can be heard.)',
            '<25>{#p/narrator}* ...',
            '<32>{#p/human}* (The typing stops.)',
            "<25>{#p/alphys}{#g/alphysWelp}* So... looks like we're gonna have to answer security questions.",
            "<25>{#g/alphysGarbo}* Mettaton's security questions...",
            '<25>{#g/alphysNeutralSweat}* Do you... happen to know anything useful about Mettaton?',
            '<25>{#g/alphysTheFactIs}* ...probably not, considering you just met him...',
            "<25>{#g/alphysUhButHeresTheDeal}* Well, uh, maybe you'll know the answer to the first one.",
            '<25>{#g/alphysIDK}* "Who has the bi-" {%}',
            "<25>{#g/alphysWTF}* Oh my god of course he'd use that as a security question.",
            '<25>{#g/alphysNervousLaugh}* "Who has the biggest crush on Mettaton?"',
            choicer.create('* (What do you say?)', -1, -1, 'Alphys', 'Asgore', 'Papyrus', 'Undyne')
         ],
         barricade1b1: [
            '<25>{#p/alphys}{#g/alphysFR}* ...',
            '<25>{#g/alphysFR}* I do NOT have a crush on Mettaton.',
            "<25>{#g/alphysCutscene2}* Let's try... Asgore."
         ],
         barricade1b2: [ '<25>{#p/alphys}{#g/alphysSmileSweat}* Hmm... okay.' ],
         barricade1b3: [
            '<25>{#p/alphys}{#g/alphysNervousLaugh}* You sure?',
            '<25>{#p/alphys}{#x1}* ...',
            '<25>{#p/alphys}{#g/alphysWelp}* Oh wow, that was the right answer.',
            '<25>{#g/alphysFR}* ...',
            "<25>{#g/alphysFR}* That's an oddly specific thing to know about Papyrus.",
            '<25>{#p/alphys}{#g/alphysUhButHeresTheDeal}* But okay!!'
         ],
         barricade1b4: [
            "<25>{#p/alphys}{#g/alphysCutscene3}* Pfft...\n* You're kidding, right?",
            "<25>* She TOLERATES him.\n* There's no way that's the answer.",
            "<25>{#g/alphysCutscene2}* Let's try... Asgore."
         ],
         barricade2: [
            '<32>{#p/event}* Ring, ring...',
            '<25>{#p/alphys}{#g/alphysCutscene2}* Okay, so the question for this one is...',
            '<25>{#g/alphysCutscene1}* "Who is Mettaton\'s- {%}',
            '<25>{#g/alphysGarbo}* Are they all seriously about himself?',
            '<25>{#g/alphysGarboCenter}* Man.',
            '<25>{#g/alphysWelp}* "What is Mettaton\'s most successful product line?"',
            choicer.create('* (What do you say?)', -1, -1, 'MTT Beauty', 'MTT Cooking', 'MTT Tech', 'MTT TV')
         ],
         barricade2b1: [
            "<25>{#p/alphys}{#g/alphysCutscene2}* Yeah... that's probably the right answer.",
            '<25>{#g/alphysTheFactIs}* He really wants his TV shows to take off, but...',
            '<25>{#g/alphysUhButHeresTheDeal}* People do love their beauty products!'
         ],
         barricade2b2: [
            '<25>{#p/alphys}{#g/alphysYeahYouKnowWhatsUp}* There sure are a lot of MTT-brand kitchen appliances around...',
            "<25>{#g/alphysWelp}* Heck, Undyne has one, and she doesn't even like the guy.",
            "<25>{#g/alphysSmileSweat}* ...yeah, let's try it."
         ],
         barricade2b3: [
            '<25>{#p/alphys}{#g/alphysFR}* ...',
            "<25>{#g/alphysFR}* I'm gonna pretend you didn't say that.",
            "<25>{#g/alphysHellYeah}* Everyone knows I'm the one you go to for tech!",
            '<25>{#g/alphysHellYeah}* ...',
            "<25>{#g/alphysWelp}* How about... Mettaton's cooking products?"
         ],
         barricade2b4: [
            '<25>{#p/alphys}{#g/alphysWorried}* I dunno...',
            "<25>{#g/alphysWelp}* Mettaton's TV shows haven't been doing too well lately.",
            '<25>{#g/alphysWTF}{#x1}* ...',
            '<25>{#g/alphysWTF2}* That was right??',
            '<25>{#g/alphysCutscene3}* ...how do you know all of this stuff?',
            '<25>{#g/alphysUhButHeresTheDeal}* Well, one more to go!'
         ],
         barricade3: [
            '<32>{#p/event}* Ring, ring...',
            '<25>{#p/alphys}{#g/alphysNervousLaugh}* Last question...',
            '<25>{#g/alphysNeutralSweat}* "What is Mettaton\'s true identity?"',
            '<25>{#g/alphysNeutralSweat}* ...',
            choicer.create('* (What do you say?)', -1, -1, 'Model 97', 'Hapstablook', 'Adrian', 'Mettaton') // AFAC is quite epic
         ],
         barricade3b1: [
            '<25>{#p/alphys}{#g/alphysCutscene2}* Phew...',
            "<25>{#g/alphysCutscene1}* No, I only completed one Mettaton model, so I know that's not it."
         ],
         barricade3b2: [
            '<25>{#p/alphys}{#g/alphysShocked}* Wh-',
            '<25>{#g/alphysOhGodNo}* How do you know that?',
            "<25>{#g/alphysOhGodNo}* Nobody's supposed to know that!!",
            '<25>{#g/alphysNeutralSweat}* H-have you told anyone else??',
            '<25>{#g/alphysNeutralSweat}* Are you planning to!?',
            '<25>{#g/alphysNeutralSweat}* ...',
            "<25>{#g/alphysNervousLaugh}* Wait... let's try it and s-see if it actually works.",
            '<25>{#g/alphysNervousLaugh}* ...',
            "<25>{#g/alphysCutscene2}* Nope, didn't work!",
            "<25>{#g/alphysCutscene1}* Guess that's not Mettaton's true identity after all.",
            '<25>{#g/alphysUhButHeresTheDeal}* Yeah!!',
            '<25>{#g/alphysSmileSweat}* B-but, uh, I think I can unlock it anyway!',
            '<25>{#x1}* ...',
            '<25>{#g/alphysHellYeah}* There!',
            '<25>{#g/alphysNeutralSweat}* Ehehe...'
         ],
         barricade3b3: [
            '<25>{#p/alphys}{#g/alphysInquisitive}* Adrian?',
            '<25>{#g/alphysInquisitive}* Who the heck is Adrian?',
            "<25>{#g/alphysSmileSweat}* Well, that's not it."
         ],
         barricade3b4: [
            "<25>{#p/alphys}{#g/alphysCutscene1}* So... Mettaton's true identity is Mettaton, huh?",
            '<25>{#p/alphys}{#g/alphysWelp}* Yeah... no.'
         ],
         barricade3c: [
            '<25>{#p/alphys}{#g/alphysSide}* Hmm... I think I have an idea.',
            '<25>{#p/narrator}* ...',
            '<32>{#p/human}* (The typing from earlier resumes.)',
            '<25>{#p/narrator}{#x1}* ...',
            '<25>{#p/alphys}{#g/alphysSmileSweat}* There.',
            '<25>{#g/alphysUhButHeresTheDeal}* Well, that was fun!'
         ],
         barricadeFail1: [
            '<25>{#p/alphys}{#g/alphysNeutralSweat}* ...',
            "<25>{#g/alphysNeutralSweat}* Nope... guess I'm gonna have to override it.",
            '<25>{#g/alphysWelp}* ...',
            '<25>{#g/alphysWelp}* This could take a while.',
            "<25>{#g/alphysUhButHeresTheDeal}* I'll c-call you back when I'm done!"
         ],
         barricadeFail2: [
            '<32>{#p/event}* Ring, ring...',
            '<25>{#p/alphys}{#g/alphysSmileSweat}* O-okay, the override is complete.'
         ],
         barricadeFail2x: [
            '<25>{#p/alphys}{#g/alphysInquisitive}* ...',
            '<25>{#g/alphysInquisitive}* Did you leave the room?',
            '<25>{#g/alphysSide}* Well, uh, the barricades are gone now.'
         ],
         barricadeFail3: [ '<25>{#p/alphys}{#g/alphysCutscene1}* Hope that helps!' ],
         barricade4: [
            '<32>{#p/event}* Ring, ring...',
            '<25>{#p/alphys}{#g/alphysSideSad}* Not this again...',
            '<25>{#g/alphysSideSad}* ...',
            "<25>{#g/alphysWelp}* Wait, I'm still logged into Mettaton's account.",
            '<25>{#g/alphysNervousLaugh}* Maybe I c-can just...',
            '<25>{#p/narrator}* ...',
            '<32>{#p/human}* (It again sounds like someone is typing.)',
            '<25>{#p/alphys}{#g/alphysIDK}* Just g-gotta...',
            '<25>{#p/narrator}* ...',
            '<32>{#p/human}* (Yet more typing can be heard.)',
            "<25>{#p/alphys}{#g/alphysNeutralSweat}* C'mon...!",
            '<25>{#p/narrator}{#x1}* ...',
            '<32>{#p/human}* (The typing stops.)',
            '<25>{#p/alphys}{#g/alphysHellYeah}* There!!',
            '<25>{#g/alphysWelp}* ...',
            "<25>{#g/alphysGarboCenter}* I really hope that's the last time we have to deal with that.",
            '<25>{#g/alphysTheFactIs}* Oh, a-and, uh, about the Mew Mew doll...',
            '<25>* Well...',
            "<25>{#g/alphysUhButHeresTheDeal}* I'll get back to you on that later.",
            '<25>{#g/alphysCutscene3}* Anyway see you at the elevator byeeee- {%}'
         ],
         puzzleReaction1: [
            '<32>{#p/event}* Ring, ring...',
            '<25>{#p/alphys}{#g/alphysHellYeah}* You did it!!',
            '<25>{#g/alphysNeutralSweat}* ...',
            '<25>{#g/alphysCutscene2}* You... yeah.\n* Ehehe.'
         ],
         cooker1a: [ '<32>{#p/mettaton}* HELLO THERE.' ],
         cooker1b: [ "<32>{*}{#p/mettaton}* AND WELCOME TO THE OUTPOST'S PREMIERE ARTS AND CRAFTS SHOW!{^30}{%}" ],
         cooker2a1: [ '<32>{#p/mettaton}* CHARGE UP YOUR CRAFTING KITS, BECAUSE WE\'RE IN FOR A "BANGER."' ],
         cooker2a2: [ '<32>{#p/mettaton}* HAHAHA...' ],
         cooker2b: [
            '<32>{#p/mettaton}* MY LOVELY ASSISTANT HERE WILL GATHER THE SUPPLIES.',
            '<32>* EVERYONE GIVE THEM A BIG ROUND OF APPLAUSE!'
         ],
         cooker3a: [
            "<32>{#p/mettaton}* WE'LL NEED THREE KEY SUBSTANCES...",
            '<32>* HEXOGEN, DIOCTYL ADIPATE, AND MINERAL OIL.'
         ],
         cooker3b: [ '<32>{#p/mettaton}* HOP TO IT, SWEETHEART!' ],
         cooker4a: [ '<32>{#p/mettaton}* PERFECT!', '<32>* GREAT WORK, ASSISTANT.', '<32>* NOW, IF I MAY...' ],
         cooker4b: [ '<32>{#p/mettaton}* OKAY!', "<32>* THAT'S EVERYTHING WE NEED..." ],
         cooker5: [ '<32>{#p/mettaton}* ...TO MAKE PLASTIC EXPLOSIVE!' ],
         cooker6: [ '<32>{#p/mettaton}* SAY YOUR PRAYERS, BEAUTIFUL!' ],
         cooker7a: [
            '<32>{#p/event}* Ring, ring...',
            '<25>{#p/alphys}{#g/alphysShocked}* Uh, w-wait!',
            '<25>{#g/alphysOhGodNo}* If you synthesize that right now...',
            "<25>{#g/alphysUhButHeresTheDeal}* You'll destroy h-half of Aerialis!"
         ],
         cooker7b: [
            '<32>{#p/mettaton}* AND WHY IS THAT...?',
            "<25>{#p/alphys}{#g/alphysTheFactIs}* B-because...\n* It's...",
            "<25>{#g/alphysHellYeah}* Because there's a tachyon excitation field in effect!!",
            '<32>{#p/mettaton}* A WHAT?',
            '<25>{#p/alphys}{#g/alphysWelp}* I had to t-turn it on for an experiment.',
            '<32>{#p/mettaton}* OH.'
         ],
         cooker7c: [ '<32>{#p/mettaton}* WAIT, I FORGOT ALPHYS LEFT THE TACHYON EXCITATION FIELD ON.' ],
         cooker8a1: [
            '<32>{#p/mettaton}* APOLOGIES, EVERYONE...',
            "<32>* LOOKS LIKE WE WON'T BE -MAKING- ANY EXPLOSIVES TODAY."
         ],
         cooker8a2: [ '<32>* GOOD THING I MADE SOME IN ADVANCE, THEN, HUH?' ],
         cooker8b: [ "<32>* AND, JUST TO RAMP UP THE TENSION, YOU'LL HAVE NINETY SECONDS TO CROSS THE GAP..." ],
         cooker9: [ "<32>{#p/mettaton}* BEFORE YOU'RE BLOWN TO SMITHEREENS!" ],
         cooker10: [ '<32>{#p/mettaton}* BETTER START RUNNING!!!' ],
         cooker11: [ "<32>{#p/narrator}* It doesn't look like you'll be crossing this on your own..." ],
         cooker12: () => [
            '<32>{#p/event}* Ring, ring...',
            '<25>{#p/alphys}{#g/alphysSide}* Hey, uh...',
            '<25>{#g/alphysCutscene1}* I think I know a way you can get across!',
            "<25>{#g/alphysNervousLaugh}* It's... well...",
            ...(save.data.n.state_foundry_undyne === 0
               ? [ "<25>{#g/alphysSmileSweat}* It's not as good as Undyne's, but, the phone I gave you..." ]
               : [
                    "<25>{#g/alphysNeutralSweat}* It's not as good as...\n* ...",
                    '{#g/alphysSmileSweat}* Uh, b-but, the phone I gave you...'
                 ]),
            '<25>{#g/alphysHellYeah}* It has a one-time-use portable jetpack!',
            '<25>{#g/alphysNervousLaugh}* Maybe... now would be a good time to try it??',
            '<32>{#p/narrator}* ...'
         ],
         cooker12x: [
            "<32>{#p/narrator}* ...then you realize Alphys's phone comes equipped with a jetpack.",
            '<32>{#p/narrator}* ...'
         ],
         cooker13: () => [
            '<32>{#p/human}* (You activated the jetpack.)',
            '<25>{#p/alphys}{#g/alphysHellYeah}* HELL YEAH!',
            ...(save.data.b.oops
               ? []
               : [ '<25>{#p/narrator}* Oh, THIS is gonna be fun.', '<25>{#p/narrator}* Here we go!' ])
         ],
         cooker13x: [ '<32>{#p/human}* (You activated the jetpack.)' ],
         cooker14: ':$(x)',
         cooker15: '$(x)%',
         cooker16a: [ '<32>* YOU DO REALIZE YOUR LIFE IS IN DANGER HERE... RIGHT?' ],
         cooker16b: [ '<32>{#p/mettaton}* ...' ],
         cooker16c: [ '<32>* PERHAPS OUR CONTESTANT IS... MENTALLY UNSTABLE.', '<32>* IN WHICH CASE...' ],
         cooker16d: [
            "<32>* WE'LL HAVE TO CUT THIS EPISODE SHORT!",
            "<32>* DON'T WORRY, THOUGH.",
            "<32>* OUR NEXT EPISODE WON'T EVEN -REQUIRE- YOU TO BE SANE!"
         ],
         cooker16e: [
            "<32>{#p/mettaton}* WELL, THAT'S ALL FOR NOW.",
            '<32>* SO, UNTIL NEXT TIME...',
            '<32>* ...LET US WISH THE HUMAN WELL.'
         ],
         cooker16f: [
            '<32>{#p/narrator}* ...',
            "<32>* Something's wrong...",
            "<32>* Weren't we meant to be flying a jetpack to chase after...",
            "<32>* I can't...",
            "<32>* I can't remem- {%}"
         ],
         cooker17a: [
            '<32>{#p/mettaton}* WELL, WELL, WELL...',
            "<32>* LOOKS LIKE... YOU DIDN'T EVEN MAKE IT HALFWAY THERE?",
            "<32>* MY MY.\n* IT SEEMS YOU'RE GOING TO DIE.",
            '<32>* HAHAHA...',
            '<32>* IF ONLY THOSE BOMBS WERE REAL.',
            '<32>* BUT THIS IS A TV SHOW!\n* REAL BOMBS WOULD BE WAY TOO EXPENSIVE TO CLEAN UP.'
         ],
         cooker17b: [
            '<32>{#p/mettaton}* WELL, WELL, WELL...',
            "<32>* LOOKS LIKE YOU DIDN'T QUITE MAKE IT, HUH?",
            "<32>* BUT HEY.\n* JUST BECAUSE YOU'RE SUCH A GOOD SPORT, I'LL LET YOU GO."
         ],
         cooker17c: [
            "<32>{#p/mettaton}* WELL, THAT'S ALL FOR NOW.",
            '<32>* SO, UNTIL NEXT TIME...',
            '<32>* I BID YOU ALL FAREWELL!'
         ],
         cooker17d: [
            '<32>{#p/narrator}* ...',
            "<32>* Something's wrong...",
            '<32>* I have the weirdest feeling that... we were meant to be flying upwards.',
            '<32>* And also... something about a substitute?',
            "<32>* I can't...",
            "<32>* I can't remem- {%}"
         ],
         cooker18a: [
            '<32>{#p/mettaton}* WELL, WELL, WELL...',
            "<32>* IT SEEMS YOU'VE MADE IT JUST IN TIME.",
            "<32>* CONGRATULATIONS!\n* YOU DON'T COMPLETELY SUCK."
         ],
         cooker18b: [
            '<32>{#p/mettaton}* WOW!\n* A PHOTO FINISH!',
            "<32>* YOU'RE A LUCKY ONE, DARLING.",
            "<32>* JUST A FEW MOMENTS MORE, AND YOU'D BE TOAST!"
         ],
         cooker18c: [
            "<32>{#p/mettaton}* WELL, I'D LOVE TO KEEP GOING, BUT I -AM- ON A BIT OF A SCHEDULE HERE.",
            '<32>* SO, UNTIL NEXT TIME...',
            '<32>* I BID YOU ALL FAREWELL!'
         ],
         cooker19a: [
            '<32>{#p/event}* Ring, ring...',
            '<25>{#p/alphys}{#g/alphysCutscene1}* Wow, you did it!!',
            '<25>{#g/alphysCutscene2}* You really...',
            '<25>{#g/alphysUhButHeresTheDeal}* I mean, o-of course you made it!',
            '<25>{#g/alphysWelp}* ...',
            "<25>{#g/alphysCutscene1}* Let's keep heading forward."
         ],
         cooker19b: [
            '<32>{#p/event}* Ring, ring...',
            '<25>{#p/alphys}{#g/alphysSideSad}* ...',
            '<25>{#g/alphysSmileSweat}* I guess... you did it??',
            '<25>{#g/alphysWelp}* ...',
            "<25>{#g/alphysUhButHeresTheDeal}* Let's just keep heading forward, okay!?"
         ],
         cooker19c: [
            '<32>{#p/event}* Ring, ring...',
            '<25>{#p/alphys}{#g/alphysCutscene3}* ...',
            '<25>{#g/alphysCutscene3}* ...',
            '<32>{#g/alphysFR}* You must have a death wish or something.'
         ],
         robocaller3: [
            '<32>{#p/event}* Ring, ring...',
            "<32>{#p/mettaton}* I SEE YOU'VE ARRIVED ON SET.",
            '<32>* SMILE FOR THE CAMERAS, HOTSHOTS...'
         ],
         robocaller4: [
            "<32>* BECAUSE YOU'RE ON LIVE TV!",
            "<32>* IT'S A TRUE SHAME I CAN'T BE THERE IN PERSON, BUT HEY...",
            "<32>* THAT -IS- HOW IT TENDS TO GO THESE DAYS, ISN'T IT?",
            '<32>* ANYWAY. THE SMALL AUDIENCE WE HAVE LEFT IS GOING TO ENJOY WATCHING YOU STRUGGLE.',
            '<32>* HOW WILL YOU GET ACROSS THE GAP WITH NO JETPACK?\n* OH, IF ONLY I KNEW...',
            '<32>* WELL, BEST OF LUCK!'
         ],
         robocaller4x: [
            '<25>{#p/asriel2}{#f/8}* Best of luck...?',
            '<25>{#f/6}* Be careful what you wish for, dolt.',
            "<25>{#f/7}* There's literally a liftgate right ahead."
         ],
         cookerX1: [
            '<32>{#p/monster}* Oh, h-hey...',
            '<32>* I, uh... was asked to g-guard this thing after everyone evacuated...',
            "<32>* So, it seems... you're not going to- {%}"
         ],
         cookerX2: [ "<25>{#p/asriel2}{#f/6}* Stay out of our way, or we'll kill you dead." ],
         cookerX3: [ "<32>{#p/monster}* I'm sorry!\n* I'm sorry!\n* You can use it!" ],
         cookerX4: [
            '<32>{#p/monster}* J-just...\n* Leave me alone...',
            "<32>* I'm just an artist, okay?\n* I'm so sorry..."
         ],
         cookerX5a: [
            "<25>{#p/asriel2}{#f/2}* Do you really think you're worth our time?",
            '<25>{#f/1}* Do you really think we want to fight you monsters one by one?'
         ],
         cookerX5b: [ "<25>{#f/9}* God, you're so STUPID, it's hilarious!", "<25>{#f/5}* Imagine how long that'd take!" ],
         cookerX6: [ '<32>{#p/monster}* Then...\n* W-what are you planning?' ],
         cookerX7: [ '<25>{#p/asriel2}{#f/2}* Hee hee hee...', "<25>{#p/asriel2}{#f/1}* You'll see." ],
         cookerX8: [ "<25>{#p/asriel2}{#f/3}* Let's go." ],
         cookerX9: [
            '<32>{#p/event}* Ring, ring...',
            "<32>{#p/mettaton}* I SEE YOU'VE MADE IT ACROSS THE GAP.",
            '<32>* ...',
            '<32>* PERHAPS...',
            '<32>* TRUSTING A STRANGER TO GUARD THAT LIFTGATE...',
            "<32>* WASN'T THE GREATEST PLAN.",
            '<32>* ...',
            '<32>* OH WELL.',
            "<32>* I'M GOING TO KILL YOU ANYWAY."
         ],
         sosorry: [ "<32>{#p/monster}* I'm so sorry..." ],
         puzzleReaction2a: [
            '<32>{#p/event}* Ring, ring...',
            '<25>{#p/alphys}{#g/alphysSide}* You got to the checkpoint!',
            '<25>{#g/alphysWelp}* But, uh, that was only the f-first one.',
            "<25>{#g/alphysNeutralSweat}* There's still two more left to go."
         ],
         puzzleReaction2b: [ '<32>{#p/event}* Ring, ring...', '<25>{#p/alphys}{#g/alphysWelp}* One left.' ],
         puzzleReaction2c: [
            "<25>{#p/alphys}{#g/alphysHellYeah}* Yes!!\n* That's the last one!!",
            '<25>{#g/alphysCutscene2}* Uh... congratulations.',
            '<25>{#g/alphysUhButHeresTheDeal}* Or, uh, well done!?',
            '<25>* You know what I mean!!'
         ],
         moneyPre1: () => [
            ...(save.data.b.oops ? [] : [ '<32>{#p/narrator}* What the...' ]),
            '<32>{#p/mettaton}* SALUTATIONS, HUMAN.',
            "<32>* YOU'RE JUST A FEW MOMENTS EARLY FOR THE SHOW."
         ],
         moneyPre2: [ '<32>* ...WOULD YOU MIND MOVING STAGE LEFT FOR ME?' ],
         moneyPre3: [ '<32>* YOU CAN COME BACK INTO FRAME WHEN I CALL OUT FOR YOU.' ],
         moneyPre4: [ '<32>{#p/narrator}* A few moments later...' ],
         moneyIntro1: [
            "<32>{#p/mettaton}* FOLKS, TODAY WE'RE GOING TO DO SOMETHING A LITTLE DIFFERENT.",
            '<32>{#z2}* WELCOME, ONE AND ALL...',
            '<32>{*}{#z0}* TO {#x1}TIME!\n* {#x2}VERSUS!\n* {#x3}MONEY!'
         ],
         moneyIntro2: [ "<32>{#p/mettaton}{#z1}* LET'S GIVE A WARM WELCOME TO OUR CONTESTANTS..." ],
         moneyIntro3a: [ '<32>{#p/mettaton}{#z0}* SANS THE SKELETON!' ],
         moneyIntro3b: () =>
            world.dead_skeleton
               ? [
                    '<25>{#p/sans}{#g/sansWink}* this is just about the only good thing to happen to me today.',
                    '<25>* if you could even call it a good thing.'
                 ]
               : [ '<25>{#p/sans}{#g/sansWink}* loving the pre-recorded applause you got there.' ],
         moneyIntro4a: [ '<32>{#p/mettaton}* NAPSTABLOOK!' ],
         moneyIntro4b: [ '<25>{#p/napstablook}* hi everyone...' ],
         moneyIntro5a: [ '<32>{#p/mettaton}* THE ENIGMATIC HUMAN!' ],
         moneyIntro6a: [ '<32>{#p/mettaton}* AND... SOME RANDOM KID!' ],
         moneyIntro6b: () =>
            save.data.b.f_state_kidd_betray ? [ '<25>{#p/kidd}{#f/3}* Hey, guys.' ] : [ '<25>{#p/kidd}{#f/1}* YO!' ],
         moneyIntro7: [
            '<32>{#p/mettaton}{#z0}* THANK YOU ALL SO MUCH FOR COMING!',
            "<32>{#z2}* WHY DON'T YOU SHARE A LITTLE ABOUT YOURSELVES, HMM?"
         ],
         moneyIntro8: [
            '<32>{#p/mettaton}{#z0}* ...',
            '<32>{#z1}* ...',
            "<32>* MY CONTESTANT DOESN'T SEEM TO BE SHOWING UP.",
            '<32>* ...',
            '<32>* THIS IS GOING TO BE A PROBLEM.',
            '<32>* ...',
            '<32>{#z2}* WOULD ANYONE ELSE LIKE TO PLAY IN THEIR PLACE?',
            '<32>* ANYONE AT- {%}'
         ],
         moneyIntro9: [ '<32>{#p/tem}* hOI!!\n* im temmie!!!' ],
         moneyIntro10: [
            '<32>{#p/mettaton}{#z5}* A SURPRISE GUEST!?!?\n* WOW, THIS SHOW GETS CRAZIER BY THE SECOND!',
            '<32>{#p/mettaton}{#z2}* THEY DO APPEAR TO BE FACING THE WRONG WAY, BUT... OH WELL.'
         ],
         moneyIntro11: [ '<32>{#p/mettaton}{#z1}* NEW FACES ASIDE...' ],
         moneyChat1: () =>
            world.dead_skeleton
               ? [ '<25>{#p/sans}{#g/sansNormal}* heya.' ]
               : [
                    '<25>{#p/sans}{#g/sansLaugh2}* oh, heheh...',
                    "<25>{#g/sansNormal}* i'm sans.\n* sans the skeleton.",
                    '<25>{#g/sansLaugh1}* technically, my job is to capture humans like that one over there.',
                    "<25>{#g/sansBlink}* but, uh...\n* seeing as we're on a television program...",
                    "<25>{#g/sansWink}* i s'pose that'll have to wait for now."
                 ],
         moneyChat1a: () =>
            world.dead_skeleton
               ? [ '<32>{#p/mettaton}* ANYTHING ELSE?' ]
               : [ '<32>{#p/mettaton}* GOT ANY OF YOUR LAME JOKES FOR US TODAY?' ],
         moneyChat1b: () =>
            world.dead_skeleton
               ? [ '<25>{#p/sans}{#g/sansNormal}* nope.' ]
               : [
                    "<25>{#p/sans}{#g/sansLaugh1}* lame?\n* woah there, mettaton, what's with the blame?",
                    "<25>{#g/sansBlink}* don't play games.\n* all you tv show hosts are the same.",
                    "<25>{#g/sansNormal}* but, uh, if we're talking jokes, well...\n* that's kinda tame.",
                    '<25>{#g/sansLaugh1}* speaking of, i heard you tried to host a comedy show...',
                    '<25>{#g/sansLaugh2}* but nobody- {%}'
                 ],
         moneyChat1c: () =>
            world.dead_skeleton
               ? [ "<32>{#p/mettaton}* SOMEONE'S NOT FEELING THEMSELVES TODAY, EH?" ]
               : [ '<32>{#p/mettaton}* VERY FUNNY.' ],
         moneyChat2: [ '<32>{#p/napstablook}* is it... my turn to talk...?' ],
         moneyChat2a: () =>
            world.dead_skeleton
               ? [ '<25>{#p/sans}{#g/sansBlink}* ...' ]
               : [ "<25>{#p/sans}{#g/sansBlink}* go on, don't be afraid." ],
         moneyChat2b: () => [
            world.dead_skeleton
               ? "<32>{#p/napstablook}* it is, isn't it........."
               : '<32>{#p/napstablook}* oh.........\n* okay............',
            "<32>* so, um... i'm napstablook",
            '<32>* i really like making music, and...',
            '<32>* i...',
            '<32>* uh... i...'
         ],
         moneyChat2c: [ '<32>{#p/mettaton}{#z1}* YOU...?' ],
         moneyChat2d: [ "<32>{#p/napstablook}* i...\n* i think that's all", '<32>* sorry...............' ],
         moneyChat2e: [
            "<32>{#p/mettaton}{#z0}* THAT'S ALRIGHT, BLOOKY...",
            "<32>* WE ALL GET NERVOUS SOMETIMES, DON'T WE, COUS-",
            '<32>{#z2}* ER... CUISINE!\n* BECAUSE THIS OPPORTUNITY SURE IS A TASTY ONE!',
            '<32>{#z4}* HAHAHA...'
         ],
         moneyChat3: [
            '<32>{#p/napstablook}* uh......',
            '<32>* you can talk now?',
            '<32>{#p/narrator}* ...',
            "<32>{#p/human}* (But you didn't have anything to say.)"
         ],
         moneyChat3a: [ '<32>{#p/mettaton}* THE "ENIGMATIC" HUMAN SURE IS LIVING UP TO THEIR TITLE.' ],
         moneyChat4: () =>
            save.data.n.state_foundry_muffet === 1
               ? [ '<32>{#p/tem}* tem... on TV!!' ]
               : [
                    '<25>{#p/kidd}{#f/1}* Haha, I guess so.',
                    ...(save.data.b.f_state_kidd_betray
                       ? [
                            "<25>{#f/1}* OH!\n* It's my turn, I think.",
                            "<25>{#f/4}* Today's... not really been the greatest...",
                            '<25>{#f/8}* Haha...',
                            "<25>{#f/5}* Anyway, I'm called Monster Kid."
                         ]
                       : [
                            "<25>{#f/1}* OH!\n* It's my turn, right??",
                            "<25>{#f/4}* I'm... not really sure if my parents are watching, but...",
                            "<25>{#f/1}* I hope they're not!!\n* I... don't think they'd like me being here.",
                            '<25>{#f/1}* Haha.',
                            "<25>{#f/2}* Anyway, uh, I'm Monster Kid."
                         ]),
                    "<25>{#f/4}* I sorta... don't have an actual proper name..."
                 ],
         moneyChat4a: () =>
            save.data.n.state_foundry_muffet === 1
               ? [ '<32>{#p/mettaton}* AND...?' ]
               : [ "<32>{#p/mettaton}* YOU DON'T HAVE A NAME...?", '<32>* ...', '<32>* HOW ABOUT "MONTY?"' ],
         moneyChat4b: () =>
            save.data.n.state_foundry_muffet === 1
               ? [ '<32>{#p/tem}* tem... love to be on TV!!' ]
               : save.data.b.f_state_kidd_betray
               ? [ '<25>{#p/kidd}{#f/4}* Hmm...' ]
               : [ '<25>{#p/kidd}{#f/1}* Monster Kid...\n* Monty...\n* Monster, Monty...', '<25>{#f/1}* Hmm...' ],
         moneyChat4c1: [ '<32>{#p/mettaton}* HUH...' ],
         moneyChat4c2: () =>
            save.data.b.f_state_kidd_betray
               ? [ '<25>{#p/kidd}{#f/1}* Well...\n* If you say so...', '<25>{#p/kidd}{#f/1}* Monty it is!' ]
               : [ '<25>{#p/kidd}{#f/3}* Yeah, sure.' ],
         moneyChat5: () =>
            save.data.n.state_foundry_muffet === 1
               ? [ '<32>{#p/mettaton}* WELL, I GUESS THAT WRAPS UP OUR INTRODUCTIONS.' ]
               : [ '<32>{#p/mettaton}* HEH. I THINK THAT WRAPS UP OUR INTRODUCTIONS QUITE NICELY.' ],
         moneyTr1: [
            '<32>* SO. THIS GAME IS ALL ABOUT VALUE.',
            "<32>* TODAY, WE'VE GOT A TRIO OF RARE EARTH ARTIFACTS...",
            "<32>* IT'S UP TO YOU CONTESTANTS TO DETERMINE THEIR EXACT COST!",
            '<32>* WHOEVER GUESSES THE CLOSEST WITHOUT GOING OVER GETS TO TAKE IT HOME!'
         ],
         moneyTr2: [ "<32>{*}* LET'S PLAY..." ],
         moneyTr3: [ '<32>{*}* {#x1}TIME!\n* {#x2}VERSUS!\n* {#x3}MONEY!' ],
         moneyHelper: '* Use left and right to adjust,\nthen confirm with [Z]. §fill:#ff0§$(x)G',
         moneyHelperConfirmed: '* Use left and right to adjust,\nthen confirm with [Z]. §fill:#f00§$(x)G',
         moneyItem1: {
            a: [
               '<32>{#p/mettaton}* OUR FIRST ITEM TODAY IS SOMETHING I FOUND RATHER RECENTLY...',
               '<32>* ON EARTH, THIS DEVICE WAS USED TO RECIEVE TRANSMISSIONS ON SO-CALLED "RADIO STATIONS."',
               "<32>* NEWS, WEATHER, MUSIC...\n* EVEN GAME SHOWS LIKE THE ONE YOU'RE ON RIGHT NOW!",
               "<32>* LET'S SEE IF ANYONE HERE KNOWS THEIR TECH."
            ],
            b: [
               "<32>{#p/mettaton}* EVERYONE'S DECIDED, THEN?",
               '<32>* SPLENDID!',
               "<32>* NOW, LET'S REVEAL THE PRICE..."
            ],
            c: [ '<32>{#p/mettaton}* 80 G!' ],
            d: [
               "<32>{#p/mettaton}* CONGRATULATIONS, BLOOKY.\n* YOU'VE WON YOUR VERY OWN OLD EARTH RADIO!",
               '<32>{#p/napstablook}* oooooooooooooooo'
            ],
            e: [ "<32>{#p/mettaton}* CONGRATULATIONS, HUMAN.\n* YOU'VE WON YOUR VERY OWN OLD EARTH RADIO!" ],
            f: [
               '<32>{#p/mettaton}* BLOOKY, SINCE YOU GUESSED BEFORE THE HUMAN...',
               "<32>* CONGRATULATIONS!\n* YOU'VE WON YOUR VERY OWN OLD EARTH RADIO!"
            ],
            g: [
               '<32>{#p/mettaton}* HUMAN, SINCE YOU GUESSED BEFORE BLOOKY...',
               "<32>* CONGRATULATIONS!\n* YOU'VE WON YOUR VERY OWN OLD EARTH RADIO!"
            ]
         },
         moneyVote1: [
            '<32>{#p/mettaton}* WELL, CONTESTANTS, THAT CONCLUDES THIS ROUND.',
            "<32>* SINCE THIS IS THE FIRST ROUND, YOU'LL VOTE ON WHO YOU THINK SHOULD BE ELIMINATED.",
            '<32>{#p/napstablook}* hey, um.........\n* i have a ques- {%}',
            "<32>{#p/mettaton}* NO, BLOOKY, YOU CAN'T VOTE FOR YOURSELF.",
            '<32>{#p/napstablook}* oh............',
            "<32>{#p/mettaton}* IT'S ELIMINATION TIME, PEOPLE!\n* SANS, YOU'RE UP FIRST.",
            "<32>{#p/mettaton}* WHO'S IT GONNA BE?"
         ],
         moneyVote2: () =>
            world.dead_skeleton
               ? [ '<32>{#p/sans}* ...', "<25>{#p/sans}{#g/sansBlink}* eh, i'm not really in the mood." ]
               : [ '<32>{#p/sans}* anne.' ],
         moneyVote2a: () =>
            world.dead_skeleton
               ? [ "<32>{#p/mettaton}* WELL, THAT'S ONE VOTE GONE.", '<32>{#p/mettaton}* HOW ABOUT YOU, BLOOKY?' ]
               : [
                    '<32>{#p/mettaton}* HMM...',
                    '<32>* WHY "ANNE?"',
                    "<25>{#p/sans}{#g/sansLaugh1}* 'cause this ANNE droid is driving me craz- {%}",
                    "<32>{#p/mettaton}* YOU'RE DISQUALIFIED!",
                    '<25>{#p/sans}{#g/sansLaugh2}* heheheh, worth it.',
                    '<32>{#p/mettaton}* UGH... HOW ABOUT YOU, BLOOKY?'
                 ],
         moneyVote3: () => [
            '<32>{#p/napstablook}* ...............',
            '<32>* s... sans, i guess...',
            "<32>* i don't have anything against you, i just... don't really know you... sorry......",
            ...(world.dead_skeleton
               ? [ '<25>{#p/sans}{#g/sansNormal}* ...', "<25>{#p/sans}{#g/sansBlink}* that's okay." ]
               : [
                    "<25>{#p/sans}{#g/sansBlink}* nah, that's okay.\n* besides, i'm only here 'cause my bro declined.",
                    '<25>{#g/sansWink}* he gets nervous around you, mettaton.',
                    "<32>{#p/mettaton}* HMM...\n* I'LL HAVE TO ASK HIM ABOUT THAT LATER.",
                    '<32>* I WONDER...'
                 ])
         ],
         moneyVote3x: [
            '<32>{#p/napstablook}* ...............',
            '<32>* the human, i guess',
            "<32>* they just... don't really seem to care about me that much......",
            '<32>{#p/mettaton}* ...'
         ],
         moneyVote4: () =>
            save.data.n.state_foundry_muffet === 1
               ? [
                    "<32>{#p/mettaton}* WHAT'LL IT BE, HUMAN?",
                    choicer.create('* (Who will you vote for?)', -1, -1, 'Sans', 'Napstablook', 'Temmie', '$(name)')
                 ]
               : [
                    "<32>{#p/mettaton}* WHAT'LL IT BE, HUMAN?",
                    choicer.create(
                       '* (Who will you vote for?)',
                       -1,
                       -1,
                       'Sans',
                       'Napstablook',
                       'Monster Kid',
                       '$(name)'
                    )
                 ],
         moneyVote4a1: () =>
            save.data.n.state_foundry_muffet === 1
               ? [ '<32>{#p/mettaton}* MHM, MHM...', '<32>{#p/mettaton}* AND TEMMIE, YOUR VOTE?' ]
               : [ '<32>{#p/mettaton}* MHM, MHM...', '<32>{#p/mettaton}* AND MONTY, YOUR VOTE?' ],
         moneyVote4a2: () => [
            "<32>{#p/mettaton}* REALLY? JUST BECAUSE THEY'RE STUCK WITH YOU DOESN'T MAKE THEM A CONTESTANT.",
            '<33>* CONSIDER YOURSELF DISQUALIFIED!',
            ...(save.data.b.oops
               ? []
               : [
                    '<32>{#p/narrator}* Gee, thanks Mettaton.',
                    "<32>{#p/mettaton}* LISTEN, DARLING.\n* IT'S KIND OF HARD TO INCLUDE YOU WHEN YOU'RE INVISIBLE.",
                    '<32>{#p/narrator}* Tch.'
                 ]),
            ...(save.data.n.state_foundry_muffet === 1
               ? [ '<32>{#p/mettaton}* ...TEMMIE, YOUR VOTE?' ]
               : [ '<32>{#p/mettaton}* ...MONTY, YOUR VOTE?' ])
         ],
         moneyVote5: () =>
            save.data.n.state_foundry_muffet === 1
               ? [
                    '<32>{#p/tem}* tem vote... CYOOT GHOST!',
                    '<32>* tem live near cyoot ghost... love cyoot ghost!',
                    '<32>{#p/mettaton}* YOU DO REALIZE THAT THE VOTE IS A VOTE TO ELIMINATE, RIGHT?',
                    '<32>{#p/tem}* wait...',
                    '<32>{#p/mettaton}* YEAH.',
                    '<32>{#p/tem}* nu!!!\n* tem dont wana elimnat cyoot ghost!',
                    '<32>{#p/tem}* tem vote for skely instead!'
                 ]
               : [
                    "<25>{#p/kidd}{#f/1}* I'm voting for the human because they're AWESOME!",
                    ...(save.data.n.state_foundry_undyne === 2
                       ? [
                            '<25>{#f/7}* Not only did they beat UNDYNE...',
                            "<25>* ...who's one of the strongest monsters EVER..."
                         ]
                       : [
                            '<25>{#f/7}* Not only did they outsmart UNDYNE...',
                            "<25>* ...who's one of the strongest monsters EVER..."
                         ]),
                    ...(save.data.b.f_state_oopsprimer
                       ? [
                            '<25>{#f/4}* But when I...',
                            '<25>{#f/5}* ...',
                            '<25>{#f/6}* They... stopped me from making a really stupid life choice.'
                         ]
                       : [
                            '<25>{#f/7}* But when I was about to DIE...',
                            '<25>* ...they pulled me down at the LAST second and saved me!',
                            '<25>{#f/2}* IN FRONT OF UNDYNE!!!',
                            '<25>{#f/3}* I... kind of owe them my life, haha...'
                         ]),
                    '<32>{#p/mettaton}* YOU DO REALIZE THAT THE VOTE IS A VOTE TO ELIMINATE, RIGHT?',
                    '<25>{#p/kidd}{#f/4}* ...it is?',
                    '<32>{#p/mettaton}* YEAH.',
                    "<25>{#p/kidd}{#f/1}* Oh... then I won't vote for them, because OBVIOUSLY, and...",
                    '<25>{#f/4}* Voting for Napstablook might hurt their feelings...',
                    "<25>{#f/3}* So... I guess it'll be Sans."
                 ],
         moneyVote5x: [ '<32>{#p/kidd}{#f/8}* ...', '<32>{#f/8}* The human.' ],
         moneyVote5x1: [ "<32>{#p/mettaton}* SHEESH, SOMEBODY'S NOT HAPPY TODAY." ],
         moneyVote5x2a: [ '<32>{#p/mettaton}* BUT EVEN WITH THAT VOTE, SANS STILL HAS THE LOSING EDGE.' ],
         moneyPun1: [ '<32>{#p/sans}* welp.', "<32>{#p/sans}{#g/sansWink}* i'm {@fill:#ff0}boned{@fill:#fff}." ],
         moneyPun1a: [ '<32>{#p/mettaton}* YES, YOU MOST CERTAINLY ARE.' ],
         moneyPun1b: [ "<32>{#p/mettaton}* WOW, IT'S ALMOST LIKE YOU KNOW HOW ANNOYING YOU ARE." ],
         moneyVote5x2b: [ '<32>{#p/narrator}* ...', '<32>* You feel your sins crawling on your back.' ],
         moneyVote6: () =>
            world.dead_skeleton
               ? [
                    "<32>{#p/mettaton}* I'M SORRY, SANS.\n* BUT YOUR TIME HAS EXPIRED.\n* GOODBYE.",
                    "<25>{#p/sans}{#g/sansBlink}* tell the human i wish 'em well...",
                    '<25>{#p/sans}{#g/sansEmpty}* on their journey to hell.'
                 ]
               : [
                    "<32>{#p/mettaton}* I'M SORRY, SANS.\n* BUT YOUR TIME HAS EXPIRED.\n* GOODBYE.",
                    '<25>{#p/sans}* too-da-loo, folks.'
                 ],
         moneyVote7: [
            '<32>{#p/mettaton}* WELL, IT LOOKS LIKE WE HAVE A TIE!',
            '<32>* IN A TIE SITUATION, THE HOST GETS TO CHOOSE WHO GOES.',
            '<32>* ...OH WAIT.',
            "<32>* I'M THE HOST!"
         ],
         moneyVote8: [ "<32>{#p/mettaton}* I'M SORRY, HUMAN.\n* BUT YOUR TIME HAS EXPIRED.\n* GOODBYE." ],
         moneyItem2: {
            a: [
               '<32>{#p/mettaton}* OUR NEXT ITEM IS, AS THE GOOD DOCTOR ONCE SAID, HIGHLY TECHNICAL.',
               '<32>* OR SHOULD I SAY...\n* PYROTECHNICAL?',
               '<32>* THESE "FIREWORKS" WERE USED ON EARTH TO CREATE DAZZLING DISPLAYS IN THE SKY.',
               '<32>* ALL DIFFERENT COLORS AND SHAPES, EXPLODING WITH INDESCRIBABLE BEAUTY.',
               "<32>* WHADDAYA THINK THEY'RE WORTH?"
            ],
            b: [ '<32>{#p/mettaton}* THE GUESSES ARE IN...?', "<32>* GOOD.\n* NOW, LET'S SEE THE PRICE..." ],
            c: [ '<32>{#p/mettaton}* WOW, 250 G!', "<32>{#p/mettaton}* WHO WOULD'VE THOUGHT!?" ],
            d: () =>
               save.data.n.state_foundry_muffet === 1
                  ? [
                       "<32>{#p/mettaton}* CONGRATULATIONS, TEMMIE!\n* YOU'VE JUST WON YOURSELF SOME MTT-CERTIFIED FIREWORKS.",
                       "<32>* IT MAY NOT BE MTT-BRAND, BUT IT'S THE NEXT BEST THING! (TM)",
                       '<32>{#p/tem}* AYAYA!'
                    ]
                  : [
                       "<32>{#p/mettaton}* CONGRATULATIONS, MONTY!\n* YOU'VE JUST WON YOURSELF SOME MTT-CERTIFIED FIREWORKS.",
                       "<32>* IT MAY NOT BE MTT-BRAND, BUT IT'S THE NEXT BEST THING! (TM)",
                       '<25>{#p/kidd}{#f/1}* YOOOOOO!!!'
                    ],
            e: [
               "<32>{#p/mettaton}* CONGRATULATIONS, HUMAN!\n* YOU'VE JUST WON YOURSELF SOME MTT-CERTIFIED FIREWORKS.",
               "<32>* IT MAY NOT BE MTT-BRAND, BUT IT'S THE NEXT BEST THING! (TM)"
            ],
            f: () =>
               save.data.n.state_foundry_muffet === 1
                  ? [
                       '<32>{#p/mettaton}* SINCE YOU GUESSED BEFORE THE HUMAN...',
                       "<32>{#p/mettaton}* CONGRATULATIONS, TEMMIE!\n* YOU'VE JUST WON YOURSELF SOME MTT-CERTIFIED FIREWORKS.",
                       "<32>* IT MAY NOT BE MTT-BRAND, BUT IT'S THE NEXT BEST THING! (TM)",
                       '<32>{#p/tem}* AYAYA!'
                    ]
                  : [
                       '<32>{#p/mettaton}* SINCE YOU GUESSED BEFORE THE HUMAN...',
                       "<32>{#p/mettaton}* CONGRATULATIONS, MONTY!\n* YOU'VE JUST WON YOURSELF SOME MTT-CERTIFIED FIREWORKS.",
                       "<32>* IT MAY NOT BE MTT-BRAND, BUT IT'S THE NEXT BEST THING! (TM)",
                       '<25>{#p/kidd}{#f/1}* YOOOOOO!!!'
                    ],
            g: () =>
               save.data.n.state_foundry_muffet === 1
                  ? [
                       '<32>{#p/mettaton}* SINCE YOU GUESSED BEFORE TEMMIE...',
                       "<32>{#p/mettaton}* CONGRATULATIONS, HUMAN!\n* YOU'VE JUST WON YOURSELF SOME MTT-CERTIFIED FIREWORKS.",
                       "<32>* IT MAY NOT BE MTT-BRAND, BUT IT'S THE NEXT BEST THING! (TM)"
                    ]
                  : [
                       '<32>{#p/mettaton}* SINCE YOU GUESSED BEFORE MONTY...',
                       "<32>{#p/mettaton}* CONGRATULATIONS, HUMAN!\n* YOU'VE JUST WON YOURSELF SOME MTT-CERTIFIED FIREWORKS.",
                       "<32>* IT MAY NOT BE MTT-BRAND, BUT IT'S THE NEXT BEST THING! (TM)"
                    ]
         },
         moneyFinal0: () => [
            '<32>{#p/mettaton}* NOW, SINCE THIS IS THE END OF THE SECOND ROUND...',
            "<32>* THERE WON'T BE ANY VOTING.",
            "<32>* INSTEAD, I'LL JUST GET RID OF WHOEVER I FEEL LIKE!\n* MY SHOW, MY RULES...",
            ...(save.data.n.state_foundry_muffet === 1
               ? [
                    "<32>* I'M SORRY, TEMMIE.\n* BUT YOUR TIME HAS EXPIRED.\n* GOODBYE.",
                    '<32>{#p/tem}* nu...',
                    '<32>* tem will be OK tho...',
                    ...(world.genocide || save.data.n.kills_foundry + save.data.n.bully_foundry > 8
                       ? [ '<32>* be sure to check... er...', '<32>* tem will be OK!!' ]
                       : [ '<32>* be sure to check TEM SHOP!!' ])
                 ]
               : save.data.b.f_state_kidd_betray
               ? [
                    "<32>* I'M SORRY, MONTY.\n* BUT YOUR TIME HAS EXPIRED.\n* GOODBYE.",
                    '<25>{#p/kidd}{#f/3}* See ya later, dudes...'
                 ]
               : [
                    "<32>* I'M SORRY, MONTY.\n* BUT YOUR TIME HAS EXPIRED.\n* GOODBYE.",
                    '<25>{#p/kidd}{#f/3}* Aw man...',
                    '<25>{#f/1}* Well, thanks for letting me be on the show, Metatron.',
                    '<25>{#f/1}* My friends are gonna be so stoked when I tell them about this!!!'
                 ])
         ],
         moneyFinal1: () => [
            save.data.n.state_foundry_muffet === 1
               ? "<32>{#p/mettaton}* AT LEAST SHE'S... HAPPY?"
               : save.data.b.f_state_kidd_betray
               ? "<32>{#p/mettaton}* AT LEAST THEY'RE... HAPPY?\n* I CAN'T REALLY SAY FOR SURE, TO BE HONEST..."
               : '<32>{#p/mettaton}* AT LEAST THEY\'RE HAPPY.\n* AND FOR THE RECORD, IT\'S "METTATON," NOT "METATRON."',
            "<32>* ALAS... WITH ONLY TWO CONTESTANTS LEFT, IT'S TIME FOR THE FINAL ROUND.",
            "<32>* THE ONE ITEM WE'LL BE PRESENTING THIS ROUND IS TRULY UNLIKE ANY OTHER.",
            '<32>* BEAUTIES AND GENTLEBEAUTIES...\n* FEAST YOUR EYES...',
            '<32>{#z3}* ...UPON THIS ABSOLUTELY GORGEOUS LIFE-SIZED MEW MEW DOLL!'
         ],
         moneyFinal2: [ '<32>{#p/napstablook}* oh my............' ],
         moneyFinal3: [ '<32>{#p/mettaton}* HAHAHA, IMPRESSED?', '<32>{#p/mettaton}{#z2}* IT WAS FOUND IN- {%}' ],
         moneyFinal4: [
            '<32>{#p/event}* Ring, ring...',
            "<25>{#p/alphys}{#g/alphysOhGodNo}{#z0}* H-hey! You can't give that away, that's... I own that!",
            '<32>{#p/mettaton}* OH, DO YOU NOW?',
            "<32>* I APOLOGIZE.\n* I WASN'T AWARE.\n* BUT...",
            '<25>{#p/alphys}{#g/alphysWTF2}* But???',
            "<32>{#p/mettaton}* I'M AFRAID IT'S TOO LATE, DR. ALPHYS...",
            '<32>{#z3}* THE CONTESTANTS HAVE ALREADY GOTTEN THEIR HOPES UP.',
            '<25>{#p/alphys}{#g/alphysWTF}{#z0}* Are you serious?',
            '<25>{#p/alphys}{#g/alphysCutscene3}* I spent months looking for th- {%}'
         ],
         moneyFinal5: [
            '<32>{#p/mettaton}* OH NO.\n* THE CONNECTION SEEMS TO HAVE BEEN TERMINATED.',
            '<32>* POOR DR. ALPHYS.\n* NO MEW MEW DOLL FOR HER.',
            '<32>{#z2}* INSTEAD, ONE OF YOU WILL GET TO KEEP IT!',
            '<32>{#z3}* BUT WHO?'
         ],
         moneyFinal6: [
            '<32>{#p/mettaton}* HAHAHA, IMPRESSED?',
            '<32>{#p/mettaton}{#z2}* IT WAS FOUND IN AN ABANDONED SHIPPING CONTAINER, ADRIFT AMONGST THE STARS...',
            '<32>* THE SEARCH TEAM SPENT MONTHS LOOKING FOR IT AFTER THE INITIAL TRACE WAS DETECTED...',
            '<32>* AND ITS RARITY...\n* WELL...',
            '<32>* THAT SPEAKS FOR ITSELF.',
            '<32>{#z3}* BUT WHO, MY DEAR VIEWERS, WILL GET TO KEEP IT?'
         ],
         moneyItem3: {
            a: [
               "<32>{#z0}* SINCE THIS IS THE FINAL ROUND, THERE WON'T BE A TIME LIMIT.",
               "<32>{#z0}* LET'S RUN THIS ONE LAST TIME!"
            ],
            b: [
               '<32>{#p/mettaton}* THIS IS IT...',
               '<32>{#p/mettaton}{#z3}* WHO WILL WIN THE GRAND PRIZE?',
               '<32>{#p/mettaton}{#z0}* THE.\n* PRICE.\n* IS...'
            ],
            c: [ '<32>{#p/mettaton}{#z5}* ...999 G!!!' ],
            d: [ '<32>{#p/mettaton}{#z0}* BLOOKY!', '<32>* IT IS MY HONOR TO BESTOW THIS GIFT UPON YOU.' ],
            e: [ '<32>{#p/mettaton}{#z0}* HUMAN!', '<32>* IT IS MY HONOR TO BESTOW THIS GIFT UPON YOU.' ],
            f: [
               '<32>{#p/mettaton}{#z0}* BLOOKY!',
               "<32>* YOUR GUESS MAY HAVE BEEN THE SAME AS THE HUMAN'S, BUT YOU MADE YOURS FIRST.",
               '<32>* THEREFORE, IT IS MY HONOR TO BESTOW THIS GIFT UPON YOU.',
               '<32>{#p/napstablook}* thanks...'
            ],
            g: [
               '<32>{#p/mettaton}{#z0}* HUMAN!',
               "<32>* YOUR GUESS MAY HAVE BEEN THE SAME AS BLOOKY'S, BUT YOU MADE YOURS FIRST.",
               '<32>* THEREFORE, IT IS MY HONOR TO BESTOW THIS GIFT UPON YOU.'
            ]
         },
         moneyTrash1: [ '<32>* WAIT, BLOOKY, WHERE ARE YOU...', '<32>* ...GOING...', '<32>{#z1}* ...' ],
         moneyTrash2: [ "<32>{#z0}* I GUESS THEY DIDN'T WANT TO BE HERE ANY LONGER." ],
         moneyItemPut1: [ '<32>{#p/human}* (You got the old radio.)' ],
         moneyItemPut2: [ '<33>{#p/human}* (You got the box of fireworks.)' ],
         moneyItemPut3: [ '<32>{#p/human}* (You got the Mew Mew doll.)' ],
         moneyItemPut4: [
            "<32>{#p/human}* (You're carrying too much.)",
            '<32>{#p/mettaton}* TOO MUCH TO HANDLE, HUH?',
            '<32>{#p/mettaton}* WELL, NO WORRIES.\n* YOUR PRIZES WILL BE AVAILABLE FOR PICKUP AT THE REC CENTER.'
         ],
         moneyOutro1: [
            "<32>{#p/mettaton}* DEAR VIEWERS, IF YOU'D LIKE TO WIN PRIZES ON LIVE TV LIKE THESE...",
            "<32>* THEN DON'T HESITATE TO CONTACT ME VIA THE OUTERNET!",
            "<32>* OTHERWISE, THAT'LL BE ALL...",
            '<32>* STAY TUNED FOR THE NEXT EPISODE, TITLED "A DANCE WITH DESTINY!"',
            '<32>{#z3}* AND, OF COURSE, STAY FABULOUS!'
         ],
         moneyWhisper1: () => [
            '<32>{#p/napstablook}* (psst... hey...)',
            '<32>* (i, um...)',
            ...(save.data.b.f_state_blookbetray
               ? [ "<32>* (i know you... probably don't like me, but...)" ]
               : save.data.n.state_wastelands_napstablook === 2
               ? [ "<32>* (i know you... probably wish i wasn't here, but...)" ]
               : save.data.n.state_wastelands_napstablook === 4
               ? [ "<32>* (i know we... aren't on the best of terms, but...)" ]
               : save.data.n.state_foundry_blookdate > 1
               ? [ "<32>* (i hope it's not too much to ask, even if we're friends, but...)" ]
               : [ "<32>* (i hope it's not too much to ask, but...)" ]),
            '<32>* (i think that... after the show...)',
            '<32>* (we should return the mew mew doll to alphys)',
            '<32>* (i watched mew mew space adventure with her one time...)',
            '<32>* (she was... so happy......)',
            choicer.create('* (What do you say?)', 8, 7, 'Yes', 'No')
         ],
         moneyWhisper2a: [ '<32>{#p/napstablook}* (thanks...)' ],
         moneyWhisper2b: [ '<32>{#p/napstablook}* (..................)' ],
         moneyWhisper3: [ "<32>{#p/mettaton}* WHAT'S THE HOLDUP?" ],
         moneyWhisper4: [
            '<32>{#p/napstablook}* (i guess... we should make a guess now...)',
            '<32>{#p/napstablook}* (heh)'
         ],
         napchat0: [ '<32>{#p/human}* (You gave the Mew Mew doll to Napstablook.)' ],
         napchat1: [ "<32>{#p/napstablook}* i'll get this back to her as soon as i can" ],
         napchat2a: [ '<32>{#p/napstablook}* until next time............' ],
         napchat2b: [
            "<32>* there's... another thing i wanna talk to you about........",
            '<32>* meet me up ahead, by the big mettaton fountain',
            '<32>* cya there............'
         ],
         truemtt3: [
            '<32>{#p/narrator}* This is all wrong...',
            '<32>* The show, the contestants...\n* All of it.',
            "<32>* I can't explain why, I just...",
            "<32>* I KNOW there's something that's not right here, and I wish I had a clue what it was.",
            '<32>* ...',
            '<32>* But, you know...',
            "<32>* That's not even what's been eating away at me the most.",
            "<32>* This probably isn't going to be news to you, but...",
            "<32>* I can't stop thinking about the mistakes of the past.",
            "<32>* ...I mean, I think about that every day, but... it's different now.",
            "<32>* All this stuff we've done together is making me realize...",
            '<32>* ...that I was probably even dumber in the past than I first thought.',
            "<32>* I know it's not the best time for a mood bomb, but...",
            "<32>* I wanted you to know how I've been feeling.",
            '<32>* ...',
            '<32>* Heh... guess we better get going before they air the re-run, eh?',
            '<32>* Come on.'
         ],
         moneyX1: [
            '<32>{#p/event}* Ring, ring...',
            '<32>{#p/mettaton}* OH DEAR, IS THAT...\n* IS THAT WHAT IT LOOKS LIKE?',
            "<32>* OH, I DO BELIEVE THAT IT'S...",
            '<32>* A TRAP!',
            '<32>* AND, OF COURSE...'
         ],
         moneyX2a: [
            "<32>* YOU'RE ON LIVE TV AGAIN!",
            '<32>* HOW WILL YOU TWO ESCAPE THE ROOM THIS TIME?',
            '<32>* HAHAHA...'
         ],
         moneyX2b: [ '<32>* ONLY -TIME- WILL TELL...{%200}' ],
         moneyX3: () =>
            [
               [
                  '<25>{#p/asriel2}{#f/10}* Hmm...{%200}',
                  '<25>* The control console is up on that platform...{%200}',
                  '<25>* ...{%200}',
                  '<25>{#f/13}* This is going to be a little embarrasing, but...{%200}',
                  '<25>{#f/13}* If I kneel in front of the platform...{%200}',
                  '<25>{#f/4}* You can... maybe climb onto me to get up there and cancel the timer.{%200}',
                  '<25>{#f/3}* I hope this works...{%200}'
               ],
               [
                  '<25>{#p/asriel2}{#f/13}* ...{%200}',
                  '<25>{#p/asriel2}{#f/4}* You know what we have to do, $(name).{%200}'
               ]
            ][Math.min(save.flag.n.ga_asrielMoneyX3++, 1)],
         moneyX4: () =>
            [ [ '<25>{#p/asriel2}{#f/13}* Uh... ready.{%200}' ], [ '<25>{#p/asriel2}{#f/13}* Come on...{%200}' ] ][
               Math.min(save.flag.n.ga_asrielMoneyX4++, 1)
            ],
         moneyX4a: [ '<25>{#p/asriel2}{#f/1}* There.' ],
         moneyX4b: [ '<25>{#p/asriel2}{#f/6}* ...', '<25>{#p/asriel2}{#f/7}* Did we seriously just wait for- {%}' ],
         moneyX5a: [
            '<32>{#p/event}* Ring, ring...',
            '<32>{#p/mettaton}* DO MY SENSORS DECIEVE?',
            "<32>* DEAR VIEWERS, WE MIGHT HAVE TO CHANGE THIS SHOW'S RATING...",
            '<32>* FROM "SHAMEFUL" TO "ULTRA SHAMEFUL" OF COURSE!',
            "<32>* I CAN'T SAY MANY IN YOUR PLACE WOULD BE WILLING TO HUMILIATE THEMSELVES LIKE THAT."
         ],
         moneyX5b: [
            '<32>{#p/event}* Ring, ring...',
            '<32>{#p/mettaton}* WELL, THAT WAS...',
            "<32>* UH... I DON'T REALLY KNOW WHAT TO CALL THAT.",
            '<32>* THANKS FOR WAITING, I GUESS?',
            '<32>* IT SURE MADE MY JOB A WHOLE LOT EASIER.'
         ],
         moneyX5c: [
            '<32>* ...',
            '<32>* MY PREPERATIONS ARE NEARLY COMPLETE.',
            '<32>* IF YOU HAVE ANY LAST WORDS FOR THE RESIDENTS OF THE OUTPOST...',
            '<32>* NOW WOULD BE THE PERFECT TIME TO SHARE THEM.'
         ],
         moneyX6a: [ '<25>{#p/asriel2}{#f/5}* Hmm...' ],
         moneyX6b: [ '<25>{#f/9}* Nah.', '<25>{#p/asriel2}{#f/1}* Leaving you all in the dark is WAY more fun.' ],
         moneyX7: [ '<25>{#p/asriel2}{#f/6}* Come on, get down.' ],
         moneyX8: [ '<25>{#p/asriel2}{#f/8}* ...', '<25>{#p/asriel2}{#f/6}* Onward to the elevator.' ],
         rg2a: [ "<32>{#p/monster}{#x1}* Halt!\n* You've gone far enough!{#x3}" ],
         rg2b: () =>
            world.genocide
               ? [ "<32>{#p/monster}{#x1}* We aren't going to let you get away that easily, are we, girl?{#x3}" ]
               : [
                    "<32>{#p/monster}{#x1}* Word around the block is there's a human roaming around this area.{#x3}",
                    "<32>{#x2}* We wouldn't normally suspect anything, but kid, you were just on live TV...{#x3}",
                    "<32>{#x1}* It's a little hard to ignore a thing like that, now, isn't it?{#x3}",
                    '<32>* ...',
                    "<32>{#x2}* That's what I thought.{#x3}"
                 ],
         rg2c1: [ "<32>{#p/monster}{#x1}* Girl, you thinkin' what I'm thinkin'?{#x3}" ],
         rg2c2: [ '<32>{#p/monster}* ...', '<32>{#p/monster}{#x1}{#x2}* Oh, for sure.{#x3}', '<32>{#p/monster}* ...' ],
         rg2c3: [ '<32>{#p/monster}* ...' ],
         rg2d: () =>
            world.genocide
               ? [
                    '<32>{#p/monster}{#x1}* Come on, girl.{#x3}',
                    "<32>{#x1}{#x2}* Let's whoop some traitor backside.{#x3}"
                 ]
               : [ '<32>{#x1}* Come on, girl.{#x3}', "<32>{#x1}{#x2}* Let's whoop some human backside.{#x3}" ],
         rg3: [ '<25>{#p/asriel2}{#f/8}* Ugh.' ],
         hapsta1: [ '<32>{#p/napstablook}* oh, hey', '<32>* this way.........' ],
         hapsta2: [ '<32>{#p/napstablook}* well... here we are', "<32>* as for why we're here......" ],
         hapsta3a: [
            "<32>{#p/napstablook}* i've been thinking more and more that mettaton is my long lost cousin.........",
            "<32>* ever since he disappeared, i've been worried about him"
         ],
         hapsta3b: [ '<32>* i just want him to be okay.' ],
         hapsta4: [ '<32>{#p/napstablook}* take a look at this' ],
         hapsta5: [ "<32>{#p/napstablook}* it's a private recording i found at the royal lab." ],
         hapsta6: [
            '<32>{#p/alphys}* Completing your final body is going to take some time...',
            '<32>* Are you sure you want this right- {%}',
            "<32>{#p/hapstablook}* i'm ready, doctor.",
            "<32>{#p/alphys}* Okay... I'm b-bringing Mettaton online right now.",
            '<32>* This control chip will allow you to use any body I build for you...',
            "<32>* When I finish your new body, I'll just t-transfer it there.",
            '<32>* Will that, uh, work?',
            "<32>{#p/hapstablook}* it's marvelous, doctor.\n* marvelous!",
            "<32>{#p/alphys}* Heh... that's...\n* That's very nice of you, Ha- {%}",
            '<32>{#p/hapstablook}* so when do i get to start?',
            '<32>{#p/alphys}* O-oh, um, you can try right now if you like?',
            "<32>* It's a universal chip, so you don't need to fuse with it to control it.",
            '<32>{#p/hapstablook}* oooh, fancy...',
            '<32>{#p/hapstablook}* being able to upgrade my body will be useful on my path to superstardom!',
            '<32>{#s/echostop}{#p/event}* Recording end.'
         ],
         hapsta7: [
            "<32>{#p/napstablook}* well, that's it",
            "<32>{#p/napstablook}* if i didn't know any better, i'd say that's the voice of- {%}"
         ],
         hapsta8: [ "<32>{#p/finalghost}* Sorry, I'm late." ],
         hapsta9: [ '<32>* Oh.\n* Hello, human.' ],
         hapsta10: [ '<32>* Cousin Blooky.\n* Why is the human here?' ],
         hapsta11: [ '<32>{#p/napstablook}* i thought......\n* they might be able to help......' ],
         hapsta12a: () => [
            ...[
               [ '<32>{#p/finalghost}* Hm.\n* It would be nice to have them on our side.' ],
               [],
               [ "<32>{#p/finalghost}* Hm.\n* We can only hope they don't run away this time." ],
               [
                  "<32>{#p/finalghost}* Hm.\n* Last time I saw them, they didn't seem very intelligent.",
                  '<32>* But who knows.'
               ],
               [
                  '<32>{#p/finalghost}* Hm.\n* Mettaton better be careful around this one.',
                  '<32>* They almost made me into a permanent hug addict...'
               ],
               [],
               [ "<32>{#p/finalghost}* Hm.\n* They'll need to keep their flirtatious attitude in check." ]
            ][save.data.n.state_wastelands_dummy]
         ],
         hapsta12b: [ '<32>* Are we ready to make the call?' ],
         hapsta13: [ '<32>{#p/napstablook}* well, hold on', "<32>* where's- {%}" ],
         hapsta14: [ '<32>{#p/monster}* RIGHT HERE, BOZO!' ],
         hapsta15: [ '<32>{#p/finalghost}* Do you always have to do that.' ],
         hapsta16: [
            '<32>{#p/monster}* Human.\n* Human!\n* HUMAN!!!',
            '<32>* WHAT HAVE YOU DONE TO MY COUSIN THIS TIME!?'
         ],
         hapsta17: [ "<32>{#p/finalghost}* They didn't do anything to me.\n* You're over-reacting." ],
         hapsta18: [ '<32>{#p/monster}* Jeez, I was only kidding...' ],
         hapsta19: [ '<32>{#p/finalghost}* Sure you were.\n* Now, for the matter at hand...' ],
         hapsta20: [ "<32>{#p/finalghost}* We all know why we're here.\n* Our cousin- {%}" ],
         hapsta21: [ "<32>{#p/monster}* Our cousin's a SELLOUT." ],
         hapsta22: [
            "<32>{#p/finalghost}* Except the point of an intervention isn't to throw insults around, it's to help.",
            '<32>* "Mettaton" has obviously gotten a little in over his head.',
            "<32>* I think it's time we fix that."
         ],
         hapsta23: [ '<32>{#p/napstablook}* .........\n* .........should we call him?' ],
         hapsta24: [ "<32>{#p/finalghost}* I don't see a reason not to." ],
         hapsta25: [
            '<32>{#p/event}* Ring, ring...',
            '<32>{#p/mettaton}* BLOOKY!\n* WHAT A WONDERFUL SURPRISE!\n* WHAT IS IT YOU NEED?',
            '<32>{#p/napstablook}* um... i wanted to talk to you about something',
            '<32>{#p/mettaton}* WELL, HEY, WE CAN DO IT RIGHT HERE, WHAT DO YOU NEED?',
            '<32>{#p/napstablook}* in private.........',
            '<32>{#p/mettaton}* OH.',
            "<32>{#p/mettaton}* I'M AFRAID I CAN'T DO THAT RIGHT NOW SINCE I'M PREPARING FOR ANOTHER SHOW.",
            "<32>* HOW ABOUT WE MEET UP ONCE THAT'S OVER WITH?"
         ],
         hapsta26: [ '<32>{#p/monster}* Anything to avoid- {%}' ],
         hapsta27: [ '<32>{#p/finalghost}* Quiet!' ],
         hapsta28: [
            '<32>{#p/napstablook}* that works...',
            '<32>{#p/mettaton}* FABULOUS, DARLING.',
            "<32>* I'LL CATCH UP WITH YOU THEN!"
         ],
         hapsta29: [
            '<32>{#p/monster}* I knew it.\n* I knew it!\n* I KNEW IT!',
            '<32>* This was doomed to fail from the very beginning.'
         ],
         hapsta30: [
            "<32>{#p/finalghost}* Just because Mettaton isn't here right now doesn't mean we've failed.",
            "<32>* We'll just have to bide our time until he's ready..."
         ],
         hapsta31: [ '<32>{#p/monster}* Fine...' ],
         hapsta32: () => [
            '<32>{#p/finalghost}* Well, it was nice to talk to you again.',
            "<32>* We'll see each other soon."
         ],
         hapsta34: () => [
            '<32>{#p/napstablook}* heh...',
            ...(save.data.b.oops
               ? [ '<32>{#p/napstablook}* see you then, i guess' ]
               : [
                    '<32>{#p/napstablook}* and $(name)?',
                    '<32>{#p/narrator}* ...?',
                    '<32>{#p/napstablook}* .........\n* thanks for sticking around.'
                 ])
         ],
         hapsta35: [ '<32>{#p/narrator}* No problem...' ],
         opera1: () => [
            '<25>{#p/alphys}{#g/alphysNervousLaugh}* Ah, there you are!',
            ...(save.data.n.bad_lizard === 1
               ? [
                    "<25>{#g/alphysSideSad}* I've been... worried, about what you'd do if I didn't escort you.",
                    "<25>{#g/alphysOhGodNo}* Uh, not that you'd do anything bad!",
                    '<25>{#g/alphysWorried}* Just...',
                    "<25>{#g/alphysCutscene2}* I feel like it's important that I help you, you know?",
                    '<25>{#g/alphysCutscene2}* ...',
                    "<25>{#g/alphysWelp}* One thing's for sure, those guards were NOT supposed to attack you."
                 ]
               : save.data.n.plot_pmcheck < 4
               ? [
                    "<25>{#g/alphysInquisitive}* ...so you're the one who hasn't been reading my posts.",
                    '<25>{#g/alphysUhButHeresTheDeal}* But who cares about that anyway, am I right!?',
                    '<25>{#g/alphysUhButHeresTheDeal}* ...',
                    '<25>{#g/alphysWelp}* Really though, those guards were NOT supposed to attack.'
                 ]
               : [
                    "<25>{#g/alphysSideSad}* I've been really w-worried about you...",
                    '<25>{#g/alphysHaveSomeCompassion}* ...',
                    '<25>{#g/alphysHaveSomeCompassion}* Those guards were NOT supposed to attack you.'
                 ]),
            "<25>{#g/alphysUhButHeresTheDeal}* Maybe my royal memos didn't reach them???\n* For some reason???",
            "<25>{#g/alphysWelp}* But, uh, it looks like you're fine, so...",
            '<25>{#g/alphysCutscene1}* I guess we can go!'
         ],
         opera2: [ '<25>{#p/alphys}{#g/alphysInquisitive}* Are you coming?' ],
         opera3: [ '<25>{*}{#p/alphys}{#g/alphysWelp}* ...{^40}{%}' ],
         opera4: () =>
            world.genocide
               ? [ "<25>{#p/asriel2}{#f/1}* Let's go kill off that pile of circuits." ]
               : save.data.n.bad_lizard === 1
               ? [ '<25>{#p/alphys}{#g/alphysNeutralSweat}* Here we are.' ]
               : [
                    "<25>{#p/alphys}{#g/alphysCutscene1}* Okay, we're here!",
                    '<25>{#g/alphysSmileSweat}* B-better stay behind me while we get through security.'
                 ],
         opera5: [ '<25>{#p/alphys}{#g/alphysSmileSweat}* H-hiya.', "<32>{#p/monster}{#x1}* 'Sup.{#x3}" ],
         opera5b: [
            '<25>{#p/alphys}{#g/alphysSmileSweat}* O-oh, I guess there is no security.',
            '<25>{#p/alphys}{#g/alphysUhButHeresTheDeal}* Well, that was easy!'
         ],
         opera6: [ '<25>{#p/alphys}{#g/alphysUhButHeresTheDeal}* Uh, y-yeah!\n* Hi!' ],
         opera7: () =>
            save.data.n.bad_lizard === 1
               ? [
                    "<25>{#p/alphys}{#g/alphysWelp}* It's a good thing you didn't attack the human earlier...",
                    "<25>{#g/alphysNeutralSweat}* If you had, they might've..."
                 ]
               : [
                    '<25>{#p/alphys}{#g/alphysWelp}* Well uh, thanks for... not attacking the human earlier.',
                    '<25>{#g/alphysGarbo}* The other guards didn\'t really "get the memo," so to speak.'
                 ],
         opera8: [ '<32>{#p/monster}{#x1}* ...human?{#x3}', '<32>{#x1}* What human?{#x3}' ],
         opera9: [
            "<25>{#p/alphys}{#g/alphysTheFactIs}* Uhhhhh I don't know I'm just trying to escort someone through- {%}",
            "<32>{#p/monster}{#x1}* Alphys, you're like, the second highest authority on the outpost.{#x3}",
            "<32>{#x2}* Yeah, you don't need to ask us for permission, haha.{#x3}"
         ],
         opera10: [
            '<25>{#p/alphys}{#g/alphysNervousLaugh}* Oh.\n* Yeah.',
            '<25>{#p/alphys}{#g/alphysUhButHeresTheDeal}* Of course!'
         ],
         opera11: [ '<32>{#p/monster}{#x1}* (Bro... is she okay?){#x3}', '<32>{#x2}* (You tell me...){#x3}' ],
         opera12: [ '<32>{#p/narrator}* Meanwhile...' ],
         opera13: [
            "<25>{#p/alphys}{#g/alphysSideSad}* It's so dark in here...",
            '<25>* Maybe we should turn back. Find another way.',
            "<25>* Unless it's- {%}"
         ],
         opera14a: [ '<32>{#p/alphys}{#g/alphysGarbo}* Mettaton.' ],
         opera14b: [ '<32>{#p/mettaton}* OH MY...' ],
         opera14c: [ '<32>* WHAT DO WE HAVE HERE?' ],
         opera15: [ '<32>{#p/mettaton}* COULD IT BE?', '<32>* MY ONE TRUE LOVE...?' ],
         opera16: [
            '<25>{*}{#p/alphys}{#g/alphysGarbo}* What the heck are you doing to them now...{^30}{%}',
            '<32>{*}{#p/mettaton}{#x1}* EXCUSE ME?{^30}{%}',
            "<32>{*}{#x2}* I'M TRYING TO RUN A SHOW HERE.{^30}{%}",
            '<25>{*}{#p/alphys}{#g/alphysWTF}* ...{^30}{%}'
         ],
         opera16b: [
            '<32>{*}* MY, MY...{^30}{%}',
            "<32>{*}{#x1}* IT'S SHAME ALPHYS ISN'T HERE TO SEE THIS.{^30}{%}",
            "<32>{*}{#x2}* SHE WOULD'VE LOVED IT.{^30}{%}"
         ],
         opera17: () => (world.genocide ? [ 'Oh ', 'my ', 'friends... ' ] : [ 'Oh ', 'my ', 'love...' ]),
         opera18: () => (world.genocide ? [ "Time's ", 'run', 'ning ', 'thin...' ] : [ 'Please ', 'run ', 'a', 'way...' ]),
         opera19: () => (world.genocide ? [ 'Soon ', "you'll ", 'wish...' ] : [ 'Mon', 'ster ', 'king...' ]),
         opera20: () => (world.genocide ? [ 'You ', 'ha', "dn't ", 'sinned... ' ] : [ 'For', 'bids ', 'your ', 'stay...' ]),
         opera20a: [ '<25>{*}{#p/alphys}{#g/alphysWelp}* Hey, this is actually pretty good...{^40}{%}' ],
         opera21: () => (world.genocide ? [ 'But ', 'be', 'fore...' ] : [ 'Hu', 'mans ', 'must...' ]),
         opera22: () => (world.genocide ? [ 'I ', 'kill ', 'you ', 'dead...' ] : [ 'Live ', 'far ', 'a', 'part...' ]),
         opera23: () => (world.genocide ? [ "Let's ", 're', 'hearse...' ] : [ 'E', 'ven ', 'if...' ]),
         opera24: () =>
            world.genocide ? [ 'The ', 'life ', "you've ", 'led...' ] : [ 'It ', 'breaks ', 'my ', 'heart...' ],
         opera25: () => (world.genocide ? [ 'Born ', 'a ', 'prince...' ] : [ "They'll ", 'cast ', 'you...' ]),
         opera25a: [ '<25>{*}{#p/alphys}{#g/alphysCutscene1}* The sakura leaves...!{^40}{%}' ],
         opera26: () => (world.genocide ? [ 'We ', 'were ', 'con', 'vinced...' ] : [ 'Out ', 'in', 'to ', 'space...' ]),
         opera27: () =>
            world.genocide
               ? [ 'That ', "you'd ", 'seen...' ]
               : [ 'I', "t'll ", 'suck...', '', '', '\n(quite ', 'literally)' ],
         opera28: () =>
            world.genocide
               ? [ 'The ', 'an', "gel's ", 'dream...', '', '', '\n(wait, ', 'what?)' ]
               : [ 'And ', 'then ', "you'll\n", 'die ', 'a ', 'lot.' ],
         opera28a: [ "<25>{*}{#p/alphys}{#g/alphysGarbo}* Oh, so this is where it's going.{^40}{%}" ],
         opera29: () => (world.genocide ? [ 'Then ', 'one ', 'day...' ] : [ 'Real', 'ly ', 'sad...' ]),
         opera30: () => (world.genocide ? [ 'You ', 'lost ', 'your ', 'way...' ] : [ "You're ", 'gon', 'na ', 'die...' ]),
         opera31: () => (world.genocide ? [ 'Now ', 'my ', 'friends... ' ] : [ 'Cry ', 'cry ', 'cry...' ]),
         opera31a: [ '<25>{*}{#p/alphys}{#g/alphysCutscene3}* We get the point...{^40}{%}' ],
         opera32: () =>
            world.genocide
               ? [ "Let's ", 'bring ', 'this\n', 'to ', 'an ', 'end.' ]
               : [ 'So ', 'sad ', "it's\n", 'hap', 'pen', 'ing.' ],
         opera33: [ '<32>{#p/mettaton}* SO SAD.', "<32>{#p/mettaton}* SO SAD YOU'RE GOING TO BE EJECTED." ],
         opera34: () =>
            save.data.n.bad_lizard < 2
               ? [
                    '<25>{#p/alphys}{#g/alphysGarboCenter}* You done now?',
                    '<32>{#p/mettaton}{#x1}* WELL, HOLD ON...',
                    '<32>{*}{#x2}* I STILL HAVE TO- {%}'
                 ]
               : [ '<32>{#p/mettaton}{#x1}* GET READY, HUMAN...', "<32>{*}{#x2}* 'CAUSE I'M ABOUT TO BLOW YOUR- {%}" ],
         opera35: () => [
            ...(save.data.b.killed_glyde
               ? [
                    "<32>{#p/mettaton}{#x0}* ...NO WONDER ALPHYS DOESN'T WANT TO BE AROUND YOU.",
                    '<32>{#x0}* DO YOU HAVE NO SHAME?',
                    "<32>{#x1}* ...ANYWAY, I'VE GOT SOMETHING MUCH, -MUCH- MORE EXCITING IN STORE COMING VERY SOON."
                 ]
               : [
                    ...(save.data.n.bad_lizard < 2
                       ? [ '<25>{#p/alphys}{#g/alphysWelp}* S-so... what now?', '<32>{#p/mettaton}{#x0}* WHAT NOW?' ]
                       : []),
                    '<32>{#p/mettaton}{#x0}* WELL, AS MUCH AS I WOULD HAVE LOVED TO FINISH THAT EPISODE...',
                    '<32>{#x2}* AND BELIEVE ME DARLING, I DEFINITELY WOULD HAVE...',
                    "<32>{#x1}* THERE'S SOMETHING MUCH, -MUCH- MORE EXCITING IN STORE COMING VERY SOON."
                 ]),
            '<32>{#x3}* SO, UNTIL THE NEXT AND FINAL EPISODE...',
            '<32>{*}* STAY FABULOUS!{^30}{#x4}{%}'
         ],
         // 36 being the next hapsta number is a total coincidence xD
         hapsta36: [ "<32>{#p/mettaton}{#e/mettaton/0}* OH... RIGHT.\n* I'D FORGOTTEN ABOUT THAT." ],
         hapsta37: [ "<32>{#p/monster}* You've forgotten about a LOT of things, haven't you?" ],
         hapsta38: [ '<32>{#p/mettaton}{#e/mettaton/1}* HUH?' ],
         hapsta39: [ "<32>{#p/finalghost}* You've become unhinged." ],
         hapsta40: [ '<32>{#p/mettaton}{#e/mettaton/2}* WHERE DID YOU COME FROM?' ],
         hapsta41: [ '<32>{#p/napstablook}* we just wanna help.........' ],
         hapsta42: [
            "<32>{#p/mettaton}{#e/mettaton/3}* DON'T YOU THINK YOU'RE HOLDING UP THE HUMAN?",
            "<32>{#p/monster}* They're with us, genius.",
            '<32>{#p/monster}* I thought that was obvious.'
         ],
         hapsta43: [ '<25>{#p/alphys}{#g/alphysTheFactIs}* Uh, I s-swear I had nothing to do with this...' ],
         hapsta44: [ "<25>{#p/alphys}{#g/alphysYeahYouKnowWhatsUp}* I-I'll just, get out of your guys' way..." ],
         hapsta45: [
            "<32>{#p/monster}* Excuse me, WHERE do you think you're going?",
            "<32>{#p/monster}* You're the one who started all this in the first place!"
         ],
         hapsta46: [ '<25>{#p/alphys}{#g/alphysNeutralSweat}* ...' ],
         hapsta47: [
            '<32>{#p/mettaton}{#e/mettaton/4}* SO TO BE CLEAR...',
            '<32>{#p/mettaton}{#e/mettaton/5}* ARE YOU FANS, OR PAPARAZZIS?'
         ],
         hapsta48: [ '<32>{#p/finalghost}* We saw the tape, Mettaton.' ],
         hapsta49: [ '<32>{#p/monster}{#e/mettaton/6}* We KNOW your true identity!' ],
         hapsta50: [ '<25>{#p/alphys}{#g/alphysWelp}* Whoops.' ],
         hapsta51a: [ '<32>{#p/mettaton}{#e/mettaton/6}* ...' ],
         hapsta51b: [
            '<32>{#e/mettaton/7}* CONGRATULATIONS, YOU GOT ME.',
            '<32>{#e/mettaton/8}* YOU WANT A MEDAL OR SOMETHING?\n* A TOKEN OF YOUR VICTORY?',
            "<32>{#e/mettaton/9}* WELL, YOU'RE NOT GETTING ONE."
         ],
         hapsta52: [ '<32>{#p/napstablook}* mettaton......', "<32>* it's not about winning......" ],
         hapsta53: [
            "<32>* it's about family, mettaton",
            "<32>{#e/mettaton/6}* if you're really... who we think you are"
         ],
         hapsta54: [ '<32>{#p/monster}* Which, for the RECORD, we know for a fact that you are- {%}' ],
         hapsta55: [ '<32>{#p/finalghost}* Quiet!' ],
         hapsta56: [
            "<32>{#p/napstablook}* if you're really our long lost cousin, then...",
            "<32>* can't you tell us..."
         ],
         hapsta57: [ '<32>* ...why you left?' ],
         hapsta58: [
            '<32>{#p/mettaton}{#e/mettaton/3}* ...',
            "<32>{#e/mettaton/11}* WE'RE CERTAINLY NOT WASTING ANY TIME TODAY, ARE WE..."
         ],
         hapsta59: [ '<32>{#p/monster}* We want the truth!\n* The TRUTH!' ],
         hapsta60: [
            '<32>{#p/mettaton}{#e/mettaton/5}* DO I LOOK LIKE I CARE?',
            "<32>{#p/mettaton}{#e/mettaton/10}* I'VE GOT EVERYTHING I WANT IN LIFE, AND LOOK AT YOU...",
            '<32>{#p/mettaton}{#e/mettaton/12}* CLINGING TO TRAINING DUMMIES AND BEGGING FOR SCRAPS.'
         ],
         hapsta61: [ "<32>{#p/finalghost}* You say you don't care about us, yet you invite us onto your shows." ],
         hapsta62: [
            '<32>{#e/mettaton/0}* You even gave Blooky special treatment during "time versus money..."',
            "<32>* Kicking that other contestant so it'd be Napstablook against the human in the final round."
         ],
         hapsta63: [
            '<32>{#p/mettaton}{#e/mettaton/5}* ...THAT WAS ONLY OUT OF PITY.',
            '<32>{#e/mettaton/4}* AND BESIDES...',
            '<32>{#e/mettaton/7}* NAPSTABLOOK HAS PROVEN TO BE A GOOD CONTESTANT IN THE PAST!'
         ],
         hapsta64: () =>
            save.data.b.oops
               ? [ '<32>{#p/monster}* Is anyone going to speak up or- {%}' ]
               : [ '<32>{#p/narrator}* Pity, {#x1}huh?', "<32>{#e/mettaton/1}* Yeah... I don't think so." ],
         hapsta65: () =>
            save.data.b.oops
               ? [ '<25>{#p/alphys}{#g/alphysSideSad}* Mettaton.{#x1}' ]
               : [ '<32>{#p/monster}* Tell him, $(name)!', '<25>{#p/alphys}{#g/alphysInquisitive}* $(name)...?' ],
         hapsta66: () =>
            save.data.b.oops
               ? [
                    '<25>* I know that tone of voice...',
                    '<25>{#g/alphysWorried}* Is it really out of pity, or... is it regret?',
                    "<25>{#g/alphysIDK}* I've... actually wanted to ask you about it for some time..."
                 ]
               : [
                    '<32>{#p/narrator}* ...',
                    '<32>* I think deep down, you regret what you did.',
                    '<32>{#e/mettaton/15}* But listen, I know the feeling...',
                    '<32>* Long ago, I myself made a choice that put my personal goals above family.{#x1}',
                    '<32>{#e/mettaton/4}* And the worst part?\n* I justified it, by saying it was all for them.'
                 ],
         hapsta67: () =>
            save.data.b.oops
               ? [
                    "<32>{#p/mettaton}{#e/mettaton/5}* I DIDN'T EXPECT THIS FROM -YOU- OF ALL PEOPLE, ALPHYS.",
                    "<32>* SURELY YOU'RE NOT GOING TO- {%}"
                 ]
               : [
                    '<32>{#p/narrator}* Do you know who lifted me out of that way of thinking?',
                    '<32>{#e/mettaton/15}* Because, if memory serves...',
                    '<32>* It was you.',
                    '<32>{#e/mettaton/3}* All of you, together.\n* As a family.',
                    '<32>* When Napstablook found me out there, in that cold, lonely place...',
                    '<32>* I was some long-dead human, clinging to this world for god knows what reason.',
                    '<32>* Yet you accepted me, made me a part of YOUR family.',
                    "<32>* Maybe I wasn't the best at first, and maybe I never fully got used to it.",
                    '<32>* But you, Hapstablook, were the one I confided in the most.',
                    '<32>* To see you like this... repeating my worst mistakes...',
                    '<32>{#e/mettaton/6}* It hurts.'
                 ],
         hapsta68: () =>
            save.data.b.oops
               ? [ '<32>{#p/monster}* Let her speak!' ]
               : [
                    '<25>{#p/alphys}{#g/alphysInquisitive}* Sorry for asking, but... why are you all just standing around?'
                 ],
         hapsta69: () =>
            save.data.b.oops
               ? [ '<25>{#p/alphys}{#g/alphysWelp}* Mettaton...\n* Or... Hapstablook?' ]
               : [ "<32>{#p/mettaton}{#e/mettaton/16}* OH, RIGHT.\n* I FORGOT YOU CAN'T HEAR THEM." ],
         hapsta70: () =>
            save.data.b.oops
               ? [ "<25>{#g/alphysCutscene3}* I don't know I'm just trying to be a good friend here-" ]
               : [ '<25>{#p/alphys}{#g/alphysInquisitive}* Hear who?' ],
         hapsta71: () =>
            save.data.b.oops
               ? [
                    '<25>{#g/alphysWelp}* Look.\n* I want you to be happy.',
                    "<25>{#g/alphysSideSad}* But more and more, it seems like you're... not that."
                 ]
               : [ "<32>{#p/mettaton}{#e/mettaton/6}* I'LL TELL YOU LATER." ],
         hapsta72: () =>
            save.data.b.oops
               ? [ "<25>{#g/alphysWorried}* If you've been acting out of guilt, then, it'd explain a lot." ]
               : [ '<25>{#p/alphys}{#g/alphysWelp}* Cool.' ],
         hapsta73: () =>
            save.data.b.oops
               ? [ '<25>{#g/alphysIDK}* I might be totally off- base though...' ]
               : [ "<32>{#p/finalghost}* $(name)'s right, you know.", '<25>{#p/alphys}{#g/alphysInquisitive}* Huh...' ],
         hapsta74: () => [
            ...(save.data.b.oops
               ? [
                    "<32>{#p/mettaton}{#e/mettaton/5}* NO, YOU'RE RIGHT, ALPHYS.",
                    "<32>{#e/mettaton/11}* YOU'RE DR. ALWAYS-RIGHT."
                 ]
               : [
                    "<32>{#p/mettaton}{#e/mettaton/5}* WELL, OF COURSE THEY'RE RIGHT.",
                    "<32>{#e/mettaton/11}* THEY'RE ALWAYS RIGHT."
                 ]),
            "<32>{#e/mettaton/17}{#x1}* ALL OF YOU, ALWAYS RIGHT.\n* YOU ALWAYS KNOW WHAT'S BEST FOR ME, DON'T YOU?"
         ],
         hapsta75: [ "<32>{#p/monster}* That's NOT what we- {%}" ],
         hapsta76: [
            "<32>{#p/mettaton}{#e/mettaton/18}* NO, I'M SICK OF BEING PUSHED AROUND BY YOU PEOPLE.",
            "<32>{#e/mettaton/19}* YOU WANT TO KNOW WHY I LEFT?\n* WELL, THERE YOU GO.\n* THERE'S YOUR REASON.",
            '<32>{#e/mettaton/20}{#x1}* I\'M SICK OF BEING ASKED TO DO THIS THING, AND THAT THING, AND "OH NO THE POOR SNAILS!"',
            "<32>{#e/mettaton/27}* GOD, IT WAS EVERY DAY WITH THAT ONE, WASN'T IT?",
            "<32>{#e/mettaton/13}{#x2}* WHAT'S SO GREAT ABOUT SNAILS, ANYWAY?\n* I'M DYING TO KNOW.",
            "<32>{#e/mettaton/14}* THEY'RE JUST SLIMY LITTLE EARTH CREATURES THAT'LL BE EATEN LATER ANYWAY."
         ],
         hapsta77: [ '<32>{#p/monster}* Yeah, screw those guys!' ],
         hapsta78: [ '<32>{#p/mettaton}{#e/mettaton/15}* ...WHAT?' ],
         hapsta79: [ '<32>{#p/napstablook}* i... kind of like them...' ],
         hapsta80: [ "<32>{#p/finalghost}* I'm indifferent about them, to be honest." ],
         hapsta81: [
            '<32>{#p/mettaton}{#e/mettaton/21}* BUT...',
            "<32>{#p/napstablook}* hey... it's okay...",
            "<32>* if you don't like caring for snails, then, you don't have to, alright?"
         ],
         hapsta83: [
            "<32>{#p/mettaton}{#e/mettaton/24}* WELL, I DON'T!\n* IT'S A VERY UN-GLAMOROUS PASS TIME, THANK YOU VERY MUCH!"
         ],
         hapsta84: [
            "<32>{#p/finalghost}* Didn't you enjoy it, though?",
            '<32>{#p/mettaton}{#e/mettaton/22}* WHAT DO YOU THINK...'
         ],
         hapsta86: [
            '<32>{#p/monster}* You never told us, man...',
            "<32>{#p/monster}* How were we supposed to know you didn't like it?"
         ],
         hapsta87: [ "<32>{#p/finalghost}* This isn't just about snails, though, is it?" ],
         hapsta88a: [ '<32>{#p/mettaton}{#e/mettaton/3}* ...NO...', "<32>{#e/mettaton/0}* IT'S NOT." ],
         hapsta89: [
            "<32>* LOOK, THERE'S A LOT OF THINGS I WASN'T HAPPY DOING.",
            "<32>{#e/mettaton/5}* I'M JUST NOT THE FAMILY MAN YOU WANTED ME TO BE...",
            '<32>{#e/mettaton/23}* OR AT LEAST, THE ONE I THOUGHT YOU WANTED ME TO BE.'
         ],
         hapsta90: [
            '<32>{#p/monster}* We NEVER said you had to- {%}',
            '<32>{#p/mettaton}{#e/mettaton/24}* WAIT, LET ME FINISH.',
            '<32>* ...',
            '<32>{#e/mettaton/6}* THERE WERE SO MANY TIMES I WANTED TO TELL YOU ALL HOW I FELT, BUT AT THE SAME TIME...',
            '<32>{#e/mettaton/15}* YOU ALL SEEMED SO HAPPY WHEN I DID THOSE FAMILY ACTIVITIES WITH YOU GUYS...'
         ],
         hapsta92: [ '<32>{#p/napstablook}* what are you getting at?' ],
         hapsta93: [
            '<32>{#p/mettaton}{#e/mettaton/3}* BLOOKY...',
            '<32>* ...',
            '<32>* I JUST...',
            '<32>* I...',
            "<32>{#e/mettaton/25}{#i/40}* I COULDN'T BEAR THE THOUGHT OF BEING A DISAPPOINTMENT.",
            '<32>{#e/mettaton/15}* THERE, I SAID IT.\n* I...',
            '<32>{#e/mettaton/15}* I SAID IT...',
            '<32>{#e/mettaton/15}* ...'
         ],
         hapsta94: [ "<32>{#p/monster}* Don't you dare make me cry.\n* DON'T YOU DARE MAKE ME CRY!" ],
         hapsta95: [
            '<32>{#p/napstablook}* hapstablook... cousin...',
            "<32>{#p/napstablook}* if i'd known you felt this way, i..."
         ],
         hapsta96: [
            "<32>{#p/mettaton}{#e/mettaton/6}* BLOOKY, IT'S NOT YOUR FAULT.",
            "<32>{#e/mettaton/27}* I'M THE ONE WHO SHOULD HAVE SPOKEN UP FOR MYSELF.",
            "<32>{#e/mettaton/5}* I'M THE ONE WHO MADE THIS MESS IN THE FIRST PLACE."
         ],
         hapsta97a: [
            '<32>{#p/finalghost}* Then help us clean it up.',
            "<32>{#e/mettaton/3}* Despite what you may think, you haven't done all that much wrong."
         ],
         hapsta97b: [
            "<32>{#e/mettaton/6}* Well, apart from trying to auction off Alphys's doll.\n* That was just rude."
         ],
         hapsta98: [ "<32>{#p/mettaton}{#e/mettaton/11}* ...I'LL ADMIT THAT WASN'T MY FINEST MOMENT." ],
         hapsta99: [
            "<32>{#p/finalghost}* But I think I speak for {#e/mettaton/6}all of us when I say we're proud of your success.",
            "<32>* All we ask is that you don't leave us behind from now on.",
            "<32>{#e/mettaton/22}* We won't force you to do any family activities, or anything like that.",
            "<32>{#e/mettaton/23}* We just... want to know that you're okay."
         ],
         hapsta100: [
            '<32>{#p/mettaton}{#e/mettaton/28}* ...',
            '<32>{#p/mettaton}{#e/mettaton/27}* (SIGH...)\n* ALRIGHT, THEN.',
            '<32>{#e/mettaton/29}* BUT ONLY ON ONE CONDITION.'
         ],
         hapsta101: [ '<32>{#p/finalghost}* Name it.' ],
         hapsta102: [
            '<32>{#p/mettaton}{#e/mettaton/30}* I WANT ALL OF YOU TO BE WATCHING WHEN I AIR MY FINAL EPISODE.'
         ],
         hapsta103: [ '<32>{#p/finalghost}* Consider it done.' ],
         hapsta104: [
            "<32>{#p/napstablook}* wait, aren't you going to fight the human in that show?",
            "<32>{#p/napstablook}* i don't want them to die..."
         ],
         hapsta105: [ '<32>{#p/mettaton}{#e/mettaton/31}* WELL, YOU SEE- {%}' ],
         hapsta106: [ '<32>{#p/monster}* Just make your attacks non- lethal, problem solved!' ],
         hapsta107: [
            "<32>{#p/mettaton}{#e/mettaton/5}* I WASN'T AWARE YOU WERE A MIND-READER, COUSIN.",
            '<32>{#p/mettaton}{#e/mettaton/12}* BUT SERIOUSLY, DID YOU REALLY THINK I, OF ALL PEOPLE, WOULD KILL A HUMAN?'
         ],
         hapsta109: [ '<32>{#p/monster}* ...maybe.' ],
         hapsta110: [
            "<32>{#p/mettaton}{#e/mettaton/10}* WELL, DON'T WORRY.\n* IN THE WORLD OF SHOW BUSINESS, NOTHING IS REAL!",
            '<32>{#p/mettaton}{#e/mettaton/0}* INCLUDING ANY PERCIEVED HARM TO ACTORS OR OTHER PERSONNEL.'
         ],
         hapsta111: [
            '<32>{#p/finalghost}* Psst, we should probably get going now.',
            "<32>{#p/finalghost}* I'm sure the human wants to get on with their business..."
         ],
         hapsta112: [
            "<32>{#p/mettaton}{#e/mettaton/5}* YEAH, I'M SURE THEY DO.\n* AND IN THAT CASE, I'LL BE SEEING YOU SOON...",
            '<32>{#p/mettaton}{#e/mettaton/11}* ...ON THE FINAL EPISODE OF OUR MAJESTIC SAGA!'
         ],
         hapsta113: [ "<32>{#p/monster}* I'll go make sure he doesn't get into any trouble.{%40}" ],
         hapsta114: () =>
            save.data.b.oops
               ? [
                    '<32>{#p/napstablook}* before i go...',
                    '<32>{#x1}* ...\n* thanks for the help, alphys.\n* it means so much...',
                    '<32>{#p/alphys}{#g/alphysCutscene2}* Just doing my best...',
                    '<32>{#p/napstablook}* ...',
                    "<32>* weird... why hasn't $(name) said anything...?"
                 ]
               : [
                    '<32>{#p/napstablook}* before i go...',
                    '<32>{#x1}* ...\n* thank you, $(name).\n* for everything...',
                    "<32>* you've done so much for our family just by being here with us",
                    "<32>* but... i know this isn't the family you'd rather be with.",
                    '<32>{#p/narrator}* Blooky...',
                    '<32>{#p/napstablook}* if...\n* no, when you see him again...',
                    "<32>* don't ever let him forget how much you cared about him in life... alright?",
                    '<32>{#p/narrator}* ...',
                    '<32>{#p/napstablook}* good luck, $(name).'
                 ],
         hapsta115: [
            "<32>{#p/napstablook}* here's your mew mew doll...\n* i hope that......\n* i wasn't too late......",
            "<25>{#p/alphys}{#g/alphysYeahYouKnowWhatsUpCenter}* No, i-it's okay.\n* Thank you."
         ],
         hapsta116: [ '<32>* well, cya......' ],
         opera36: () => [
            '<25>{#p/alphys}{#g/alphysWelp}* Well, that was certainly an unexpected turn of events.',
            ...(save.data.b.a_state_hapstablook
               ? [
                    '<25>{#p/alphys}{#g/alphysInquisitive}* Not to mention the whole "$(name)" thing...',
                    "<25>* Last I checked, they've been dead for a hundred years.",
                    "<25>{#g/alphysWelp}* Oh well.\n* Mettaton said he'd explain it later.",
                    "<25>{#g/alphysWelp}{#x5}* Speaking of which, you'll probably want to get going..."
                 ]
               : [
                    "<25>{#p/alphys}{#g/alphysInquisitive}* Looks like we're in the clear, though...",
                    "<25>{#g/alphysWelp}{#x5}* Which means... you'll probably want to get going..."
                 ]),
            '<25>{#g/alphysTheFactIs}{#x6}* And I should probably get back to the lab...',
            '<25>{#g/alphysNervousLaugh}{#x5}* So... see you soon, I guess?',
            "<25>{#g/alphysUhButHeresTheDeal}* Uh, b-but don't worry!\n* I'll ring you as soon as you...",
            '<25>{#g/alphysNervousLaugh}* You...',
            "<25>{#g/alphysHellYeah}* I-I'll stay in contact!"
         ],
         opera37: [ '<25>{#p/alphys}{#g/alphysSmileSweat}* T-take care!!' ],
         operaX1: () =>
            [ [ '<25>{#p/asriel2}{#f/8}* Hello?' ], [ '<25>{#p/asriel2}{#g/8}* ...' ] ][
               Math.min(save.flag.n.ga_asriel53++, 1)
            ],
         operaX2: () => [
            ...[
               [ '<32>{#p/mettaton}* HELLO, DARLING.' ],
               [ '<32>{#p/mettaton}* HERE WE GO INDEED, DARLING!' ],
               [ '<32>{#p/mettaton}* WHY HELLO!' ]
            ][Math.min(save.flag.n.ga_asriel53 - 1, 2)],
            "<32>* WHY DON'T YOU TWO COME INTO THE LIMELIGHT?"
         ],
         operaX3: [
            "<32>{#p/mettaton}* THAT'S BETTER...",
            '<32>{#p/mettaton}* NOW, ALLOW ME TO SING YOU TWO A LITTLE SONG.'
         ],
         operaX4: () =>
            [
               [
                  "<25>{*}{#p/asriel2}{#f/5}* So tell me, what's this little song about?{^30}{%}",
                  '<32>{*}{#p/mettaton}{#x1}* OH, ASRIEL...{^30}{%}',
                  '<32>{*}{#x2}* HAVEN\'T YOU HEARD OF A THING CALLED "SPOILERS?"{^30}{%}',
                  '<25>{*}{#p/asriel2}{#f/6}* Figures.{^30}{%}'
               ],
               [
                  "<25>{*}{#p/asriel2}{#f/7}* I already know this show's just about me.{^30}{%}",
                  '<32>{*}{#p/mettaton}{#x1}* OH, DO YOU NOW?{^30}{%}',
                  "<32>{*}{#x2}* WELL, I'M AFRAID THAT WON'T STOP ME FROM DOING IT.{^30}{%}",
                  '<25>{*}{#p/asriel2}{#f/8}* ...{^30}{%}'
               ]
            ][Math.min(save.flag.n.ga_asriel54++, 1)],
         operaX5: () => [
            "<32>{#p/mettaton}* WELL, THAT'S ALL.",
            "<32>{#x1}* OH, AND, I FORGOT TO MENTION THAT I'M NOT REALLY HERE.",
            '<32>* MY CONTROL CHIP IS ALREADY INSTALLED IN THE NEW BODY.',
            ...(save.flag.n.ga_asriel55++ < 1
               ? [
                    '<25>{#p/asriel2}{#f/10}* ...a new body?',
                    '<32>{#p/mettaton}* OH, YOU WANT TO SEE IT?',
                    "<32>* WELL.\n* YOU WON'T HAVE TO WAIT MUCH LONGER."
                 ]
               : []),
            '<32>{#p/mettaton}* SEE YOU SOON...'
         ],
         operaX7: [ "<25>{#p/asriel2}{#f/8}* Something tells me this won't be as easy as we'd hoped." ],
         operaY1: [ '<25>{*}{#p/asriel2}{#f/13}* What are you- {%}' ],
         operaY2: [ '<25>{*}{#p/asriel2}{#f/15}* $(name).\n* What are you doing.{^40}{%}' ],
         operaY3: [ "<25>{*}{#p/asriel2}{#f/15}* This can't go on...{^40}{%}" ],
         operaY4: [ '<25>{*}{#p/asriel2}{#f/16}* Thanks anyway, $(name).{^40}{%}' ],
         end1: () => [
            '<32>{#p/mettaton}* AT LAST...',
            ...(save.flag.b.legs
               ? [
                    '<32>* AT LAST WE MEET ON THIS FATEFUL...',
                    '<32>{#e/mettaton/4}* ...',
                    "<32>{#e/mettaton/25}* MY SENSORS TELL ME YOU'RE LOOKING OVER MY SHOULDER.",
                    '<32>{#e/mettaton/30}* YOU MUST BE EAGER TO FLIP THAT SWITCH OF MINE, EH DARLING...?',
                    '<32>{#e/mettaton/28}* A SWITCH YOU NO DOUBT KNOW ABOUT THANKS TO ALPHYS SHARING MY SECRETS WITH YOU.',
                    '<32>{#e/mettaton/3}* HOW PREDICTABLE...',
                    "<32>{#e/mettaton/12}* SUFFICE IT TO SAY, I WON'T WASTE YOUR TIME WITH A MONOLOGUE.",
                    ...(save.data.b.a_state_hapstablook
                       ? [
                            "<32>{#e/mettaton/35}* JUST KNOW THAT, AS I SAID EARLIER, I'LL BE ATTACKING NON-LETHALLY TODAY."
                         ]
                       : save.data.n.bad_lizard < 2
                       ? [ "<32>{#e/mettaton/0}* JUST KNOW THAT I'D RATHER YOU DIDN'T DIE TODAY." ]
                       : [
                            "<32>{#e/mettaton/17}* JUST KNOW THAT YOUR PRECIOUS HUMAN SOUL WON'T GO TO WASTE WHEN IT'S MINE."
                         ])
                 ]
               : [
                    '<32>* AT LAST WE MEET ON THIS FATEFUL STAGE.',
                    '<32>{#e/mettaton/4}* BUT THEN...',
                    '<32>{#e/mettaton/34}* WHERE WOULD I BE WITHOUT YOU?',
                    "<32>{#e/mettaton/5}* FOR BETTER OR WORSE, YOU'VE GIVEN US BOTH THE OPPORTUNITY TO SHINE OUR BEST.",
                    "<32>{#e/mettaton/6}* BUT NOW, COMES THE MOMENT YOU'VE BEEN DYING FOR.",
                    '<32>{#e/mettaton/23}* THOUGH, I MUST ADMIT...',
                    ...(save.data.b.a_state_hapstablook
                       ? [
                            "<32>{#e/mettaton/5}* THINGS DIDN'T QUITE WORK OUT THE WAY I EXPECTED.",
                            "<32>{#e/mettaton/3}* ALL THIS TIME, BLOOKY'S BEEN TRYING TO CONVINCE ME OF YOUR QUALITY OF CHARACTER.",
                            "<32>* THEY SAY YOU'VE BEEN FRIENDLY WITH THE MONSTERS...",
                            '<32>{#e/mettaton/4}* SO MUCH SO, IN FACT, THAT YOU EVEN MANAGED TO IMPRESS YOUR JADED PARTNER THERE.',
                            "<32>{#e/mettaton/6}* STILL, I WASN'T CONVINCED.\n* BUT AFTER OUR LITTLE FAMILY REUNION, WELL...",
                            '<32>* LET\'S JUST SAY I\'VE CHANGED MY MIND ON THE WHOLE "KILLER ROBOT" PLAN.',
                            "<32>{#e/mettaton/2}* BUT HEY, WHO SAYS YOU CAN'T HAVE DRAMA AND ACTION WITHOUT REAL BLOODSHED?",
                            "<32>{#e/mettaton/12}* ...NO, DARLING, WE'LL JUST BE -FAKING- THE BLOODSHED INSTEAD!",
                            "<32>{#e/mettaton/36}* (DON'T WORRY, BLOOKY AND THE OTHERS ALREADY KNOW ABOUT THIS.)",
                            '<32>{#e/mettaton/4}* MY BULLETS WILL SECRETLY BE NON-LETHAL, BUT...',
                            "<32>{#e/mettaton/5}* AS FAR AS THE AUDIENCE IS CONCERNED, YOU'LL BE FIGHTING FOR YOUR LIFE!"
                         ]
                       : save.data.n.bad_lizard < 2
                       ? [
                            "<32>{#e/mettaton/25}* I'M COUNTING ON YOU TO MAKE IT PAST ME IN ONE PIECE.",
                            "<32>{#e/mettaton/0}* DON'T GET ME WRONG, I'D LOVE TO TAKE A HUMAN SOUL AND BECOME HUMANITY'S STAR.",
                            '<32>{#e/mettaton/3}* BUT TAKING -YOUR- SOUL WOULD BE... BITTERSWEET.',
                            "<32>{#e/mettaton/6}* WE'VE BEEN THROUGH SO MUCH TOGETHER, WHAT WITH ALL THE SHOWS AND ALL.",
                            "<32>{#e/mettaton/4}* PLUS, FOR A HUMAN WHO HAS TO DEAL WITH ALL THESE SHORT- SIGHTED MONSTERS' ANTICS...",
                            "<33>{#e/mettaton/0}* YOU'VE BEEN VERY UNDERSTANDING.",
                            '<32>{#e/mettaton/5}* OH WELL.\n* IF YOU DO KICK THE BUCKET, YOU CAN REST ASSURED...',
                            "<32>* YOUR SOUL WON'T GO TO WASTE.",
                            "<32>{#e/mettaton/10}* NOW, SHOW ME YOU'VE GOT WHAT IT TAKES TO BE A -REAL- SUPERSTAR!"
                         ]
                       : [
                            '<32>{#e/mettaton/5}* EARLY ON, I CONSIDERED GOING EASY ON YOU.',
                            ...(world.trueKills > save.data.n.state_aerialis_basekill
                               ? [
                                    "<32>{#e/mettaton/6}* THOUGH I'M NOT SURE WHY, SINCE YOU COMPLETELY IGNORED MY WARNING ON THE PHONE."
                                 ]
                               : [
                                    "<32>{#e/mettaton/11}* AND YOU KNOW WHAT?\n* IT'D KIND OF MAKE SENSE.",
                                    '<32>{#e/mettaton/35}* AFTER ALL, YOU DID SEEM TO STOP THE KILLING AFTER I WARNED YOU ON THE PHONE.'
                                 ]),
                            ...(save.data.n.state_starton_papyrus === 1
                               ? [ '<32>{#e/mettaton/18}* BUT AFTER THINKING ABOUT WHAT YOU DID TO PAPYRUS...' ]
                               : save.data.n.state_foundry_undyne > 0
                               ? [ '<32>{#e/mettaton/18}* BUT AFTER THINKING ABOUT WHAT YOU DID TO UNDYNE...' ]
                               : save.data.n.state_foundry_doge === 1 ||
                                 save.data.n.state_foundry_muffet === 1 ||
                                 save.data.n.state_starton_dogs === 2 ||
                                 save.data.n.state_starton_greatdog === 2 ||
                                 save.data.n.state_starton_lesserdog === 2 ||
                                 save.data.n.state_starton_doggo === 2
                               ? [ '<32>{#e/mettaton/18}* BUT AFTER THINKING ABOUT WHAT YOU DID TO THE ROYAL GUARD...' ]
                               : [ '<32>{#e/mettaton/18}* BUT AFTER THINKING ABOUT WHAT YOU DID TO THOSE MONSTERS...' ]),
                            '<32>{#e/mettaton/19}* I KNEW THERE WAS ONLY ONE GOOD COURSE OF ACTION.',
                            '<32>{#e/mettaton/15}* BESIDES, IF I GOT YOUR SOUL...',
                            '<32>{#e/mettaton/0}* I COULD CROSS THE FORCE FIELD AND MEET HUMANITY FIRST-HAND.',
                            "<32>{#e/mettaton/10}* I'D BUILD AN INTER-GALACTIC ENTERTAINMENT EMPIRE...",
                            '<32>{#e/mettaton/11}* HUMANITY WOULD CHERISH ME AS A VERITABLE POP ICON!\n* BILLIONS WOULD CHEER MY NAME!',
                            "<32>{#e/mettaton/37}* DON'T YOU THINK THAT'S WORTH THE LIFE OF ONE TROUBLESOME LITTLE HUMAN...?",
                            '<32>{#e/mettaton/4}* WELL...',
                            '<32>{#e/mettaton/31}* I CERTAINLY DO!'
                         ])
                 ])
         ],
         end2: [ '<32>{#e/mettaton/31}* PRODUCERS!\n* GET THOSE CAMERAS ROLLING!' ],
         end3: () => [
            '<32>{#e/mettaton/6}* BEAUTIES AND GENTLEBEAUTIES...',
            save.flag.b.legs
               ? "<33>{#e/mettaton/11}* IT'S TIME FOR THE GRAND FINALE!"
               : '<32>{#e/mettaton/10}* ARE YOU READY FOR THE GRAND FINALE!?!?'
         ],
         end4: [
            '<32>{*}{#e/mettaton/11}* REAL DRAMA!!\n* REAL ACTION!!\n* REAL BLOODSHED!!{^20}{%}',
            '<32>{*}{#e/mettaton/20}* ON OUR NEW SHOW...{^20}{%}',
            '<32>{*}{#e/mettaton/17}* "ATTACK OF THE KILLER ROBOT!"{^20}{%}'
         ],
         end5: () =>
            save.data.n.bad_lizard < 2
               ? [ '<25>{#p/alphys}{#g/alphysOhGodNo}* Oh my god, are you guys alright??' ]
               : [
                    '<25>{#p/alphys}{#g/alphysWelp}* ...',
                    '<25>{#g/alphysInquisitive}* What are you looking at me for?',
                    "<25>{#g/alphysCutscene3}* I'm only here to check on Mettaton, after all."
                 ],
         end6: () =>
            save.data.n.bad_lizard < 2
               ? [
                    ...(save.data.b.a_state_hapstablook
                       ? [ '<25>{#p/alphys}{#g/alphysInquisitive}* Wait, I forgot about the whole non-lethal thing.' ]
                       : [ '<25>{#p/alphys}{#g/alphysInquisitive}* Hmm, you look okay...' ]),
                    '<25>{#p/alphys}{#g/alphysWelp}* Sorry about vanishing on the phone earlier, by the way.',
                    "<25>{#g/alphysWelp}* The phone signal wouldn't reach here for some reason."
                 ]
               : [
                    "<25>{#p/alphys}{#g/alphysWelp}* Actually, that's not why I'm here.",
                    "<25>{#g/alphysHaveSomeCompassion}* Look, just... come with me into the next room, and I'll explain.",
                    "<25>{#g/alphysNeutralSweat}* W-when you're ready, of course."
                 ],
         end7: () => [
            "<25>{#p/alphys}{#g/alphysCutscene2}* Well, uh, d-don't worry about Mettaton, I can replace his batteries.",
            ...(save.data.b.a_state_hapstablook
               ? [
                    "<25>{#g/alphysCutscene2}* Not to mention, that's only a vessel...",
                    '<25>{#g/alphysCutscene2}* Hapstablook is probably just practicing playing dead.',
                    "<32>{#x1}{#p/hapstablook}* It's an acting thing, dear.",
                    '<25>{#p/alphys}{#g/alphysWelp}* Of course it is.'
                 ]
               : [
                    "<25>{#g/alphysWelp}* The only thing I can't fix is his ego...",
                    '<32>{#x1}{#p/hapstablook}* I heard that.',
                    '<25>{#p/alphys}{#g/alphysWelp}* Of course you did.'
                 ])
         ],
         end8a: [ "<32>{#p/hapstablook}* Don't you still have to- {%}" ],
         end8b: [ '<25>{#x1}{#p/alphys}{#g/alphysCutscene3}* I know, I know...' ],
         end9a: [
            "<25>{#p/alphys}{#g/alphysSideSad}* So... there's something important we have to do now.",
            '<25>{#g/alphysNervousLaugh}* And, well, the future of monsterkind might... d-depend on it...',
            '<25>{#g/alphysWelp}* No pressure, of course.'
         ],
         end9b: [
            "<25>{#g/alphysCutscene2}* So, like...\n* When you're ready...",
            '<25>{#g/alphysCutscene2}* You could... come with me into the next room???',
            '<25>{#g/alphysCutscene2}* ...',
            "<25>{#g/alphysCutscene3}* I-I'll be up ahead."
         ],
         end10: () => [
            "<32>{#p/hapstablook}* Don't worry, darling.\n* It's probably just a new season of a sci-fi she likes.",
            '<32>* As for me?',
            save.data.n.state_starton_papyrus === 1
               ? "<32>* ...\n* I don't really know what I'm going to do now."
               : "<32>* ...\n* Well, I've got some business things to attend to.",
            '<32>* Heh...',
            '<32>* See you around...\n* ...\n* ...darling.'
         ],
         endwalk0: [ '<25>{#p/alphys}{#g/alphysWelp}* This way.' ],
         endwalk1: () =>
            save.data.n.bad_lizard < 2
               ? [
                    '<25>{#p/alphys}{#g/alphysCutscene2}* So... Mettaton, huh?',
                    "<25>* Ehehe... that was sure something, wasn't it?",
                    "<25>{#g/alphysSideSad}* I-I mean, I'd hoped his batteries would last longer, but...",
                    "<25>{#g/alphysUhButHeresTheDeal}* Well, i-it's just a tiny oversight, really.\n* Easily fixed!",
                    "<25>{#g/alphysWelp}* ...but that's not what I meant to talk about."
                 ]
               : [
                    '<25>{#p/alphys}{#g/alphysCutscene3}* So... Mettaton, huh?',
                    '<25>{#g/alphysHaveSomeCompassion}* ...',
                    '<25>{#g/alphysSideSad}* He was going to kill you for what you did.',
                    '<25>{#g/alphysTheFactIs}* Not that I blame him.\n* You killed people he cares about...',
                    '<25>{#g/alphysWorried}* People... I care about.'
                 ],
         endwalk2: () => [
            ...(save.data.n.bad_lizard < 2
               ? [
                    "<25>{#p/alphys}{#g/alphysCutscene2}* So, as I said, there's something important we have to do.",
                    '<25>{#g/alphysInquisitive}* As for why the kingdom depends on it...?',
                    "<25>{#g/alphysCutscene2}* Well...\n* There's this agreement."
                 ]
               : [
                    '<25>{#p/alphys}{#g/alphysWelp}* The problem is, your death is the last thing this kingdom needs.',
                    '<25>{#g/alphysInquisitive}* As for why...?',
                    "<25>{#g/alphysSideSad}* Well...\n* There's this agreement."
                 ]),
            '<25>* An agreement between Asgore and the former royal scientist...',
            '<25>{#g/alphysWelp}* Dr. Roman.'
         ],
         endwalk3: [
            '<25>{#p/alphys}{#g/alphysSideSad}* When I took his place as royal scientist...',
            '<25>* The responsibility of keeping that agreement fell on me.',
            '<25>{#g/alphysNeutralSweat}* So many lives are at stake here, but...\n* At the same time...',
            "<26>{#g/alphysWorried}* If anyone f-found out, they'd think we're against our own freedom.",
            "<26>{#g/alphysHaveSomeCompassion}* ...\n* We're just trying to do the right thing."
         ],
         endwalk4: () => [
            "<25>{#p/alphys}{#g/alphysIDK}* S-sorry, I can't really say more until we meet with him.",
            "<25>{#g/alphysWelp}* ...you go on ahead.\n* I'll try not to get too far behind.",
            ...(save.data.n.bad_lizard < 2
               ? [ "<25>{#g/alphysSide}* Everything's gonna be fine, alright?", '<25>{#g/alphysSmileSweat}* ...' ]
               : [ '<25>* Oh, and, make sure nobody else dies.', '<25>{#g/alphysFR}* ...' ]),
            '<25>* Good luck.'
         ],
         exit: [ choicer.create('* (Continue to Citadel?)', 8, 7, 'Yes', 'No') ]
      },
      truetext: {
         chara1: [
            "<32>{#p/narrator}* You know, I've been thinking...",
            "<32>* What's gonna happen when you leave this place?",
            '<32>* The monsters will still be without a seventh SOUL, and...',
            "<32>* They'll probably have to wait a long time for another chance at it.",
            '<32>* Surely there must be some other way to free everyone, right?',
            '<32>* And... god, I know this is exactly the same thought I had when I screwed up in the past.',
            "<32>* I just...\n* I don't know..."
         ],
         chara2: [
            '<32>{#p/narrator}* I guess part of me regrets how things were in the past.',
            '<32>* Before I met the monsters, I, too, felt trapped in life.',
            "<32>* My time among humans wasn't the greatest, as I'm sure you can imagine.",
            '<32>* But when I took that shuttle and flew out into uncharted space...',
            '<32>* When I stumbled on this lonely space station, and met monsters for the first time...',
            '<32>* I finally felt like I could relate to something.',
            '<32>* I finally felt like I had a family that cared about me...',
            "<32>* ...even if I wasn't the best towards them...\n* ...and him.",
            '<32>* But then... IT happened.'
         ],
         chara3: [
            "<32>{#p/narrator}* Ever since then, I've wondered why I don't just fade into nothing.",
            '<32>* Why does this world insist on keeping me around?',
            "<32>* But no matter how much time went by, I couldn't think of an answer.",
            '<32>* When I met you, though, I suddenly got the strangest feeling...',
            "<32>* ...like I'm meant to serve a purpose in this world.",
            '<32>* And that, if I truly want to move on from what happened back then...',
            '<32>* I have to help you avoid making the same kinds of mistakes I once did.',
            "<32>* Something tells me that, if I fail, I'll lose more than either of us can imagine...",
            '<32>* Well, for better or worse, it does feel good to have a purpose.',
            '<32>* I just hope that... by the time this is all over...',
            '<32>* Something good will have come from it.'
         ]
      },
      overworld: {
         labcamera2: [ "<32>{#p/narrator}* It's probably best not to question how this works." ],
         labdisplay: 'The Human\nEXP $(x)\nHP  $(y)\nG   $(z)\nDIS $(w)',
         exofountain1: [
            '<32>{#p/narrator}* This extravagant fountain is filled with exoberry punch.',
            '<32>{#p/narrator}* You could drink from this...',
            choicer.create('* (Take a sip?)', 8, 7, 'Yes', 'No')
         ],
         exofountain2a: [ '<32>{#p/human}* (You chose not to take a sip.)' ],
         exofountain2b: () => [
            '<32>{#p/human}* (You drank from the fountain.)\n* (HP fully restored.)',
            ...(world.genocide && save.flag.n.ga_asrielDrink++ < 1
               ? [ '<25>{#p/asriel2}{#f/15}* You are properly crazy.' ]
               : [])
         ],
         kneeler: [
            "<32>{#p/human}* (You check Asriel's head to make sure it's safe to climb up.)",
            '<25>{#p/asriel2}{#f/16}* Why are you like this.'
         ],
         kneeler2: [ '<25>{#p/asriel2}{#f/8}* Thanks, I guess.' ],
         topdesk1: [
            '<32>{#p/narrator}* The computer is on standby.\n* Turn it on?',
            choicer.create('* (Turn on the computer?)', 8, 7, 'Yes', 'No')
         ],
         topdesk2: [ '<32>{#p/human}* (You decide not to turn it on.)' ],
         topdesk3: [ "<33>{#p/narrator}* It's opened to a video game of some kind..." ],
         labstationA: [ "<32>{#p/narrator}* It's opened to a control panel for a telescope network." ],
         labstationB: [ "<32>{#p/narrator}* It's opened to a set of design plans for a holographic environment." ],
         laserbarrrier1: () =>
            world.genocide
               ? [ '<32>{#p/narrator}* An impassable force field.' ]
               : [
                    "<32>{#p/narrator}* As per the the crafter's guild standard, an impassable force field surrounds the area."
                 ],
         // FRACTURED QUEEN REFERENCE ! !
         laserbarrrier2: pager.create(
            'limit',
            [ '<32>{#p/narrator}* Only one way forward now.' ],
            [ "<32>{#p/narrator}* There's nothing special here." ],
            [ '<32>{#p/narrator}* ...' ],
            [ '<32>{#p/narrator}* ...' ],
            [ '<32>{#p/narrator}* ...' ],
            [ '<32>{#p/narrator}* Really now.' ],
            [ '<32>{#p/narrator}* ...' ],
            [ '<32>{#p/narrator}* ...' ],
            [ '<32>{#p/narrator}* ...' ],
            [ "<32>{#p/narrator}* Don't you have anything more intelligent to do?" ]
         ),
         barricade: [ '<32>{#p/narrator}* The barricade blocks your way.' ],
         puzzle1done: [ '<32>{#p/narrator}* The terminal is inert.' ],
         lablizard: {
            a: pager.create(
               'limit',
               () =>
                  save.data.n.plot < 51
                     ? [
                          '<25>{#p/alphys}{#g/alphysSideSad}* Sorry about all that stuff with Mettaton...',
                          '<25>{#g/alphysSideSad}* He, uh...',
                          '<25>{#g/alphysNervousLaugh}* He can get a little ancy at times, ehehe.'
                       ]
                     : save.data.n.plot < 52
                     ? [
                          "<25>{#p/alphys}{#g/alphysCutscene2}* Thank GOD those guards didn't attack you.",
                          "<25>{#g/alphysNeutralSweat}* I've been trying to put out a royal memo to get them off your back...",
                          '<25>{#g/alphysWelp}* Hopefully it, uh, actually r-reached them.'
                       ]
                     : save.data.n.plot < 54
                     ? [
                          "<25>{#p/alphys}{#g/alphysInquisitive}* L-look, I don't know the answers in here any more than out there...",
                          "<25>{#g/alphysSmileSweat}* I'll call you when you get back to the barricades."
                       ]
                     : save.data.n.plot < 56
                     ? [
                          "<25>{#p/alphys}{#g/alphysSideSad}* The p-puzzles in Aerialis haven't been upgraded yet...",
                          "<25>{#g/alphysWelp}* It's just so hard to find the time when I'm this busy with my work."
                       ]
                     : save.data.n.plot < 57
                     ? [
                          '<25>{#p/alphys}{#g/alphysCutscene1}* I have a habit of forgetting to turn off m-my experiments.',
                          "<25>{#g/alphysCutscene2}* For a second there, I thought that habit might've saved you!",
                          '<25>{#g/alphysUhButHeresTheDeal}* But, uh, I guess Mettaton had a backup plan.'
                       ]
                     : save.data.n.plot < 59
                     ? [
                          '<25>{#p/alphys}{#g/alphysWelp}* Don\'t tell me.\n* Sans is selling his weird "hotdogs" again.',
                          "<25>{#g/alphysCutscene2}* Yeah, that's like... a thing he does.\n* It's perfectly normal."
                       ]
                     : save.data.n.plot < 60
                     ? [
                          "<25>{#p/alphys}{#g/alphysCutscene2}* I think Mettaton's getting ready for another show.",
                          "<25>{#g/alphysTheFactIs}* I'd... be c-careful if I were you..."
                       ]
                     : save.data.n.plot < 61
                     ? save.data.b.a_state_moneyitemC
                        ? [ '<25>{#p/alphys}{#g/alphysFR}* ...', '<25>{#g/alphysFR}* I know what you did.' ]
                        : [
                             '<25>{#p/alphys}{#g/alphysCutscene3}* ...',
                             '<25>* Mettaton is becoming more and more reckless by the day.'
                          ]
                     : save.data.n.plot < 67.1
                     ? [
                          '<25>{#p/alphys}{#g/alphysCutscene3}* ...',
                          "<25>{#g/alphysCutscene1}* Isn't it amazing when royal guards don't follow my orders!"
                       ]
                     : [
                          "<25>{#p/alphys}{#g/alphysCutscene2}* Yeah, I'm... s-still here and all.",
                          '<25>{#g/alphysWelp}* Not that I have much left to do.'
                       ],
               () =>
                  save.data.n.plot < 51
                     ? [
                          "<26>{#p/alphys}{#g/alphysWelp}* Can't blame him, though.",
                          "<25>{#g/alphysWelp}* He's the biggest fan of humanity you'll ever meet out here."
                       ]
                     : save.data.n.plot < 52
                     ? [ '<25>{#p/alphys}{#g/alphysCutscene3}* You never know these days...' ]
                     : save.data.n.plot < 54
                     ? [
                          '<25>{#p/alphys}{#g/alphysWelp}* I guess if things really go wrong, I can just override them.',
                          "<25>{#g/alphysNeutralSweat}* B-but that'd put them out of action for a while."
                       ]
                     : save.data.n.plot < 56
                     ? [ "<25>{#p/alphys}{#g/alphysWelp}* You wouldn't believe how long I've been stuck on this level." ]
                     : save.data.n.plot < 57
                     ? save.data.n.state_aerialis_crafterresult === 0
                        ? [ '<25>{#p/alphys}{#g/alphysNeutralSweat}* Shame you never checked your new phone...' ]
                        : [ '<25>{#p/alphys}{#g/alphysCutscene2}* Not gonna lie, seeing you use that jetpack was great.' ]
                     : save.data.n.plot < 59
                     ? [ '<25>{#p/alphys}{#g/alphysFR}* ...', '<25>{#g/alphysFR}* Perfectly normal.' ]
                     : save.data.n.plot < 60
                     ? [ "<25>{#p/alphys}{#g/alphysWelp}* Who knows what kind of antics he'll pull." ]
                     : save.data.n.plot < 61
                     ? save.data.b.a_state_moneyitemC
                        ? [ '<25>{#p/alphys}{#g/alphysFR}* ...' ]
                        : [ '<25>{#p/alphys}{#g/alphysCutscene3}* ...' ]
                     : save.data.n.plot < 67.1
                     ? [ '<25>{#p/alphys}{#g/alphysFR}* It\'s called "sarcasm."' ]
                     : [ '<25>{#p/alphys}{#g/alphysCutscene3}* Mettaton must be waiting so patiently right now.' ]
            )
         },
         mettacrafter1a: [ '<32>{#p/mettaton}* NO TIME LIKE THE PRESENT!' ],
         mettacrafter1b: [ "<32>{#p/mettaton}* I THINK YOU'RE STILL MISSING SOME THINGS." ],
         mettacrafter1c: [ "<32>{#p/mettaton}* I THINK YOU'RE STILL MISSING SOMETHING." ],
         mettacrafter2a: [ '<32>{#p/mettaton}* NICE WORK!\n* NOW PLACE EVERYTHING ON THE COUNTER TO MY LEFT.' ],
         mettacrafter2b: [ '<32>{#p/mettaton}* NICE WORK!\n* NOW PLACE THE REST ON THE COUNTER TO MY LEFT.' ],
         mettacrafter2c: [ '<32>{#p/mettaton}* NICE WORK!\n* NOW PLACE THE LAST ITEM ON THE COUNTER TO MY LEFT.' ],
         platformDeny: () => [
            "<32>{#p/narrator}* You'll need a special pass to access the liftgate network.",
            ...(world.goatbro
               ? save.flag.n.ga_asrielGate++ < 1
                  ? [ "<25>{#p/asriel2}{#f/3}* No doubt a pass will be in Alphys's lab.\n* Let's go there first." ]
                  : []
               : save.data.n.bad_lizard > 1 && save.data.n.plot > 48
               ? [ "<32>* Wasn't there a spare cell phone on Alphys's desk?" ]
               : [])
         ],
         lift: {
            elevatorStory1: () =>
               save.data.n.plot < 64
                  ? [ choicer.create('* (Where would you like to go?)', -1, -1, 'Floor R2', 'Cancel') ]
                  : [
                       choicer.create(
                          '* (Where would you like to go?)',
                          -1,
                          -1,
                          'Floor R2',
                          'Floor L2',
                          'Floor L3',
                          'Cancel'
                       )
                    ],
            elevatorStory2: () =>
               save.data.n.plot < 64
                  ? [ choicer.create('* (Where would you like to go?)', -1, -1, 'Floor R1', 'Cancel') ]
                  : [
                       choicer.create(
                          '* (Where would you like to go?)',
                          -1,
                          -1,
                          'Floor R1',
                          'Floor L2',
                          'Floor L3',
                          'Cancel'
                       )
                    ],
            elevatorStory3: [
               choicer.create('* (Where would you like to go?)', -1, -1, 'Floor L3', 'Floor R1', 'Floor R2', 'Cancel')
            ],
            elevatorStory4: [
               choicer.create('* (Where would you like to go?)', -1, -1, 'Floor L2', 'Floor R1', 'Floor R2', 'Cancel')
            ],
            elevatorStory6: () => [
               "<32>{#p/narrator}* It's out of order for now.",
               ...(world.goatbro && save.flag.n.ga_asrielLift++ < 1
                  ? [ "<25>{#p/asriel2}{#f/8}* Guess we'll have to take the long way around." ]
                  : [])
            ],
            elevator1: [
               '<32>{#p/human}* (Where would you like to go?)',
               choicer.create('', -1, -1, 'Floor L1', 'Cancel', 'Floor L2', 'Floor R2', 'Floor L3', 'Floor R3')
            ],
            elevator2: [
               '<32>{#p/human}* (Where would you like to go?)',
               choicer.create('', -1, -1, 'Floor L1', 'Floor R1', 'Floor L2', 'Cancel', 'Floor L3', 'Floor R3')
            ],
            elevator3: [
               '<32>{#p/human}* (Where would you like to go?)',
               choicer.create('', -1, -1, 'Floor L1', 'Floor R1', 'Cancel', 'Floor R2', 'Floor L3', 'Floor R3')
            ],
            elevator4: [
               '<32>{#p/human}* (Where would you like to go?)',
               choicer.create('', -1, -1, 'Floor L1', 'Floor R1', 'Floor L2', 'Floor R2', 'Cancel', 'Floor R3')
            ],
            elevator5: [
               '<32>{#p/human}* (Where would you like to go?)',
               choicer.create('', -1, -1, 'Floor L1', 'Floor R1', 'Floor L2', 'Floor R2', 'Floor L3', 'Cancel')
            ],
            elevator6: [
               '<32>{#p/human}* (Where would you like to go?)',
               choicer.create('', -1, -1, 'Cancel', 'Floor R1', 'Floor L2', 'Floor R2', 'Floor L3', 'Floor R3')
            ]
         },
         terminal1: () => [
            '<32>{#p/human}* (You activate the terminal and read the info logs.)',
            '<32>{#p/narrator}* "Activity log, K-TIME 61XXX.X"',
            '<32>* "The subject was left unattended for a short time."\n* "..."',
            '<32>* "The starling\'s gone."',
            ...(world.goatbro && save.flag.n.ga_asrielTerminal1++ < 1
               ? [ '<25>{#p/asriel2}{#f/1}* ...', '<25>{#p/asriel2}{#f/2}* Heh.' ]
               : [])
         ],
         terminal2: () =>
            save.data.n.bad_lizard < 2
               ? [
                    '<32>{#p/human}* (You activate the terminal and read the message.)',
                    '<32>{#p/narrator}* "Kahaha, Glyde was here!"\nµ - Glyde'
                 ]
               : [
                    '<32>{#p/human}* (You activate the terminal and read the message.)',
                    '<32>{#p/narrator}* "I\'m sorry, everyone..."'
                 ],
         terminal3: () => [
            '<32>{#p/human}* (You activate the terminal and read the message.)',
            '<32>{#p/narrator}* "Dear employees of the Royal Lab, please place waste in the appropriate receptacles."',
            '<32>* "Thank you."',
            ...(world.goatbro && save.flag.n.ga_asrielLab2++ < 1
               ? [
                    '<25>{#p/asriel2}{#f/asriel2}{#f/2}* Appropriate waste receptacle, huh?\n* Golly...',
                    '<25>{#p/asriel2}{#f/1}* They might as well throw themselves in an incinerator.'
                 ]
               : [])
         ],
         terminal4: () => [
            '<32>{#p/human}* (You activate the terminal and read the message.)',
            ...(world.genocide
               ? [ '<32>{#p/narrator}* "The Royal Lab is no longer safe. Evacuation procedure in effect."' ]
               : [ '<32>{#p/narrator}* "Welcome to the Royal Lab."' ])
         ],
         terminal5: () => [
            '<32>{#p/human}* (You activate the terminal and read the message.)',
            ...(save.data.b.a_state_hapstablook
               ? [ '<32>{#p/narrator}* "No data available."' ]
               : [
                    '<32>{#p/hapstablook}* "The past few months have been rough for me."',
                    '<32>* "I\'ve always felt like I could be so much more..."',
                    '<32>* "And now, thanks to you, I have a chance to prove it."',
                    '<32>* "In this, my final diary, I declare myself reborn."',
                    '<32>* "Thank you, Alphys."',
                    '<32>* "Thank you for making my dreams come true."'
                 ])
         ],
         recycler: [ "<32>{#p/narrator}* It's a recycle bin." ],
         recyclerX: [ '<32>{#p/human}* (You discarded the electro- dampening fluid.)' ],
         wallswitch1: [ "<32>{#p/narrator}* It's a power conduit." ],
         ingredient1: [ '<32>{#p/human}* (You found the hexogen.)' ],
         ingredient2: [ '<32>{#p/human}* (You found the dioctyl adipate.)' ],
         ingredient3: [ '<32>{#p/human}* (You found the mineral oil.)' ]
      },
      trivia: {
         powerline: [ "<32>{#p/narrator}* It's a power node." ],
         a_hotelfood: [ "<32>{#p/narrator}* It's just an average bowl of rec center food.\n* Nothing odd to see here!" ],
         a_virt: [ "<32>{#p/narrator}* It's a virtualasium.\n* You don't have the access level required to use it." ],
         metposter: [
            "<32>{#p/narrator}* It's a promotional poster for Mettaton's upcoming premiere.",
            "<32>* Though difficult to read, there's a signed note from Mettaton...",
            '<32>* "Thank you for making my dreams come true."'
         ],
         bedbox: [
            '<32>{#p/narrator}* This seemingly ordinary box is in fact a state-of-the-art non-euclidian sleeper unit.',
            "<33>* ...it's smaller on the outside."
         ],
         a_lab_books1: pager.create(
            'sequence',
            [
               "<32>{#p/narrator}* It's a bookshelf.",
               '<32>{#p/human}* (You pick out a book...)',
               '<32>{#p/narrator}* "A monsters\' body is a reflection of its SOUL."',
               '<32>* "Normally, parents decide what kind of monsters their children will be..."',
               '<32>* "Imprinting their will into the very essence of the child."',
               '<32>* "But what would happen if another being, like a human, absorbed a SOUL instead?"',
               '<32>* "Legends speak of humans who absorbed the SOULs of dead boss monsters in the war..."',
               '<32>* "In one particular account, a human was said to have taken the form of a plane."',
               '<32>{#p/human}* (You put the book back on the shelf.)'
            ],
            [
               "<32>{#p/narrator}* It's a bookshelf.",
               '<32>{#p/human}* (You pick out a book...)',
               '<32>{#p/narrator}* "So you wanna design a robot, huh? Well, fabulous Faraday\'s got you covered!"',
               '<32>* "You see, here on earth, we like to do things with a dash of flavor."',
               '<32>* "You can\'t just build a metal box and call it a day, you catch my drift?"',
               '<32>* "You\'ve got to give it style, features dazzling and dynamic, like wheels and dials!"',
               '<32>* "And, for maximum razz, do something creative with its mobility!"',
               '<32>* "Like, I dunno, a big wheel?"\n* "Yeah, something like that."',
               '<32>{#p/human}* (You put the book back on the shelf.)'
            ],
            [
               "<32>{#p/narrator}* It's a bookshelf.",
               '<32>{#p/human}* (You pick out a book...)',
               '<32>{#p/narrator}* "MMSA: Dreams (Fanmade Story)"',
               '<32>* "...and that\'s when Mew Mew finally saw it with her own two eyes."',
               '<32>* "It was quite a sight, standing alone in deep space, seemingly abandoned..."',
               '<32>* "...but Mew Mew knew better!"\n* "And it wasn\'t long before she learned of our plight."',
               '<32>* "With a single blast of her infamous LAZER DELUXE, she punched through with ease!"',
               '<32>* "And so it was that Mew Mew became monsterkind\'s savior."',
               '<32>{#p/human}* (You put the book back on the shelf.)'
            ]
         ),
         a_lab_books2: pager.create(
            'sequence',
            [
               "<32>{#p/narrator}* It's a bookshelf.",
               '<32>{#p/human}* (You pick out a book...)',
               '<32>{#p/narrator}* "Dr. Roman\'s notes, page 76."',
               '<32>* "The CORE is now online, and outpost construction plans are already underway."',
               '<32>* "I\'m not sure how to feel about this development..."',
               '<32>* "It will be nice to make our lives more comfortable out here, however..."',
               '<32>* "By settling in like this, are we admitting that we can\'t escape without human SOULs?"',
               '<32>* "Since I was appointed as the royal scientist, I\'ve set my mind on breaking us free."',
               '<32>* "Now, I fear the other monsters have acquiesced to waiting..."',
               '<32>{#p/human}* (You put the book back on the shelf.)'
            ],
            [
               "<32>{#p/narrator}* It's a bookshelf.",
               '<32>{#p/human}* (You pick out a book...)',
               '<32>{#p/narrator}* "Dr. Roman\'s notes, page 195."',
               '<32>* "It\'s a dark day for monsterkind, the royal family is in pieces."',
               '<32>* "Queen Toriel has abandoned the throne over a few rushed words from Asgore."',
               '<32>* "But those words may have long-lasting implications for us..."',
               '<32>* "Now, everyone expects him to take the human SOULs by force."',
               '<32>* "This is a disaster."',
               '<32>{#p/human}* (You put the book back on the shelf.)'
            ],
            [
               "<32>{#p/narrator}* It's a bookshelf.",
               '<32>{#p/human}* (You pick out a book...)',
               '<32>{#p/narrator}* "Dr. Roman\'s notes, page 310."',
               '<32>* "Well, he\'s agreed to the plan... of course, I was almost certain he would."',
               '<32>* "The timing is fortunate."\n* "The first human since $(name) arrived on the outpost today."',
               "<32>* \"We don't know if it'll be able to contain them yet, but we'll find out soon enough...\"",
               '<32>* "Nobody can know the truth."',
               '<32>{#p/human}* (You put the book back on the shelf.)'
            ]
         ),
         cream_machine: [ "<32>{#p/narrator}* It's an overly complicated ice cream machine." ],
         cream_bucket: [ '<32>{#p/narrator}* A bucket of ice cream.' ],
         mewposter: [ '<32>{#p/narrator}* A large poster for a popular sci-fi franchise.' ],
         dogfood: () =>
            save.data.b.oops
               ? [ "<32>{#p/narrator}* It's a half-empty bag of dog food." ]
               : [ "<32>{#p/narrator}* It's a bag of dog food.\n* It's half-full." ],
         doublefridge: () =>
            save.data.n.bad_lizard < 2
               ? [ "<32>{#p/narrator}* It's a dual fridge.\n* Both sides are filled with orange crush soda." ]
               : [
                    "<32>{#p/narrator}* It's a dual fridge.\n* One side is filled with orange crush soda.",
                    '<32>* The other side is empty.'
                 ],
         virtsign: [ "<32>{#p/narrator}* It's a sign depicting Alphys in a virtualasium." ],
         starlingtable: [ '<32>{#p/narrator}* Starling flowers.' ],
         starling: [ '<32>{#p/narrator}* A patch of starling flowers.' ],
         starling2: [ '<32>{#p/narrator}* A trio of starling flowers.' ],
         starling3: [ '<32>{#p/narrator}* A dense patch of starling flowers.' ],
         starling4: [ '<32>{#p/narrator}* Yet another patch of starling flowers.' ],
         starling5: [ '<32>{#p/narrator}* A little starling couple.\n* Cute...?' ],
         dttubes: [
            '<32>{#p/narrator}* A set of beakers with an unknown substance.',
            '<32>{#p/narrator}* There is also a used syringe with trace amounts of the substance.',
            ...(world.goatbro && save.flag.n.ga_asrielLab3++ < 1
               ? [
                    '<25>{#p/asriel2}{#f/4}* Welcome to ground zero, the starling experiment.',
                    '<25>{#f/3}* Funny... the syringe she used is still here.',
                    '<25>{#f/10}* I wonder what would happen if I used it on another starling...',
                    '<25>{#f/10}* Would there be... two of me then?'
                 ]
               : [])
         ],
         papertable: [ "<32>{#p/narrator}* It's a work table with some nondescript plans on it." ],
         vender1: [
            '<32>{#p/narrator}* A vacuum-sealed storage unit.\n* Inside are vials of various unknown substances.'
         ],
         vender2: [
            '<32>{#p/narrator}* A vacuum-sealed storage unit.\n* Inside are vials of various unknown substances.'
         ],
         toolrack: [ "<32>{#p/narrator}* A rack of dusty old tools.\n* Doesn't look like they've been used in years." ],
         spycamera1: () => [
            '<32>{#p/narrator}* This monitor is calibrated to follow your movement.',
            ...(world.goatbro && save.flag.n.ga_asrielLab1++ < 1
               ? [
                    "<25>{#p/asriel2}{#f/1}* If only we could see Alphys's face as she was watching us...",
                    '<25>{#p/asriel2}{#f/2}* God, that would have been great.'
                 ]
               : [])
         ],
         gameshow_terminal1: () =>
            world.dead_skeleton
               ? [ "<32>{#p/narrator}* A game show console.\n* Closer to the truth than you'll ever be." ]
               : [ '<32>{#p/narrator}* A game show console.\n* The unfortunate first-hand witness to an awful pun.' ],
         gameshow_terminal2: [
            '<32>{#p/narrator}* A game show console.\n* This console seems specially- equipped for ghosts.'
         ],
         gameshow_terminal3: [ "<32>{#p/narrator}* A game show console.\n* Careful, it's probably rigged." ],
         gameshow_terminal4: [ '<32>{#p/narrator}* A game show console.\n* Who needs arms with consoles like these?' ],
         a_path2_sign: () => [
            '<32>{#p/narrator}* "Please be aware that at most, a liftgate may only hoist two monsters at a time."',
            ...(world.genocide && save.flag.n.ga_asrielSkySign1++ < 1
               ? [ '<25>{#p/asriel2}{#f/1}* Perfect number for us.' ]
               : [])
         ],
         a_path4_sign: [
            '<32>{#p/narrator}* "Leave your junk here, and we\'ll find a way to sell it!"\nµ - Bratty and Catty'
         ],
         a_puzzle1_sign: [ '<32>{#p/narrator}* "Warning: Television filming may be in progress nearby."' ],
         labcounter: (mtt: boolean) => [
            "<32>{#p/narrator}* Ah, the humble countertop.\n* No better place to practice your arts 'n' crafts!",
            ...(mtt ? [ "<32>{#p/mettaton}* THAT'S WHERE THE INGREDIENTS GO." ] : [])
         ],
         chesstable: () =>
            world.population === 0 && !world.bullied
               ? [ "<32>{#p/narrator}* It's a chess board." ]
               : [ "<32>{#p/narrator}* It's a chess board.\n* It's black's turn, but there's no good moves to play..." ],
         roomtable: [
            "<32>{#p/narrator}* It's a guidebook for multi- dimensional living.",
            '<32>* You open it to the bookmarked page...',
            '<32>* "...which is to say your room exists at the same point in three-dimensional space..."',
            '<32>* "...but on a different point along the fourth dimension."',
            '<32>* "This fourth-dimensional positioning is more commonly referred to as phasing."',
            '<32>* "Phasing is a complex process which involves re-saturating the negative field of the..."',
            '<33>* Thankfully, the page ends here.'
         ],
         flowertable: [ '<32>{#p/narrator}* A starling flower.' ],
         coredoor: [ '<32>{#p/narrator}* The door is locked.' ],
         deadbot: [ "<32>{#p/narrator}* It's just a husk." ],
         corenote1: [
            '<32>{#p/narrator}* There\'s a recording on the ground labelled "Toriel."',
            '<32>* You play the recording...',
            '<32>{#p/alphys}* Asgore has told me a lot about you.',
            '<32>* Your pies, your stories, even the way you made him laugh...',
            '<32>* And your loving care for the humans who come here.',
            '<32>* Despite your misconceptions about Asgore, you tried to be a positive light.',
            "<32>* Because of me, you'll never get to share that light again."
         ],
         corenote2: [
            '<32>{#p/narrator}* There\'s a recording on the ground labelled "Sans."',
            '<32>* You play the recording...',
            "<32>{#p/alphys}* I'll never forget those days where we worked together on projects...",
            '<32>* Or that time I helped you pull a prank on Papyrus...',
            '<32>* Or even the time we went garbage-hunting with Catty and Bratty.',
            '<32>* You might not have stuck around, but you always came back when it really mattered.',
            "<32>* Because of me, you'll never be able to come back."
         ],
         corenote3: [
            '<32>{#p/narrator}* There\'s a recording on the ground labelled "Papyrus."',
            '<32>* You play the recording...',
            "<32>{#p/alphys}* Our shared love of puzzles is something I'll always be fond of.",
            '<32>* When we were kids, you inspired me to do so many things...',
            '<32>* If not for you, I might not be a scientist at all.',
            "<32>* Though I couldn't bring myself to watch, I know you stayed true to yourself to the end.",
            "<32>* Because of me, you'll never be yourself again."
         ],
         corenote4: [
            '<32>{#p/narrator}* There\'s a recording on the ground labelled "Undyne."',
            '<32>* You play the recording...',
            '<32>{#p/alphys}* Undyne...\n* We were going to do so much together when we escaped...',
            '<32>* I can picture it now.\n* A cruise around the galaxy, with nobody to get in our way.',
            '<32>* Whenever I felt sad or lonely, you were always there to cheer me up.',
            "<32>* Even if you and I disagreed on some things, you didn't let it get in the way of friendship.",
            "<32>* Because of me, you'll never get to explore the galaxy."
         ],
         corenote5: [
            '<32>{#p/narrator}* There\'s a recording on the ground labelled "Mettaton."',
            '<32>* You play the recording...',
            "<32>{#p/alphys}* I know we got off to a rough start, but I wouldn't be the same person without you.",
            "<32>* If you're hearing this, Mettaton, I want you to know that you're beautiful.",
            "<32>* There's not another monster on the outpost I'd rather design a new body for.",
            "<32>* Well, maybe Napstablook.\n* But they're not really the fighting type.",
            '<32>* Good luck, Mettaton.'
         ],
         corenote6: () => [
            '<32>{#p/narrator}* There\'s a recording on the ground labelled "Asgore."',
            '<32>* You play the recording...',
            "<32>{#p/alphys}* I know I haven't always been the best at my job, but...",
            '<32>* You always made me feel like I was contributing something.',
            '<32>* And even though the starling experiments were risky...',
            '<32>* I had the support of the whole outpost to find us a faster way out of here.',
            "<32>* Well, boss... we did it.\n* You won't have to live another day on this stupid outpost.",
            '<32>* I should have known something would go wrong...',
            '<32>* I should have noticed the monster dust on that starling...',
            '<32>* I should have contained it while I had the chance...',
            "<32>* But I didn't.",
            '<32>* Because of me, and my hubris, that child has carved a path of destruction.',
            "<32>* I've lost so many people that I care about already...",
            '<32>* Seeing them die from the comfort of my own lab, while I do nothing to stop it.',
            "<32>* Mettaton's going to give it his all, but if he fails...",
            "<32>* ...you're next.",
            "<32>* I don't know what I'd do if I had to watch another one of my friends die.",
            "<32>* I don't know how I'd feel if I knew I could have done something to save you.",
            "<32>* I do know you're not going to fight back, and I do know they're not going to care.",
            "<32>* If I don't do something before it's too late...",
            '<32>* ...',
            '<32>{#p/human}* (You hear Alphys drop the recorder and run into the elevator.)',
            ...(save.flag.n.ga_asrielCorenote++ < 1
               ? [
                    '<25>{#p/asriel2}{#f/3}* Alphys running away as always, I take it.',
                    '<25>{#p/asriel2}{#f/4}* A pity.'
                 ]
               : [])
         ],
         coresign1: [ '<32>{#p/narrator}* "Any unauthorized precense in this area is strictly prohibited."' ],
         coresign2: [ '<32>{#p/narrator}* "Good work, everyone! There have been 29219 accident-free days in a row."' ],
         coresign3: [
            '<32>{#p/narrator}* "Great job, everyone! There have been 0 accidents reported since the CORE\'s creation."'
         ],
         coresign4: [ '<32>{#p/narrator}* "This signage is dedicated to sir T. N. Roman."\n* "May he rest in peace."' ],
         coresign5: [ '<32>{#p/narrator}* "Left - Stage Four"\n* "Right - Elevator"' ],
         pottedtable: [ '<32>{#p/narrator}* A familiar-looking table.' ],
         potchair: [ '<32>{#p/narrator}* A familiar-looking chair.' ],
         cardboard1: [
            "<32>{#p/narrator}* It's a bunch of mostly-empty cardboard boxes.",
            '<32>{#p/narrator}* This dull box has a few test tubes lying at the bottom.'
         ],
         cardboard2: [
            "<32>{#p/narrator}* It's a bunch of mostly-empty cardboard boxes.",
            '<32>{#p/narrator}* This tall box reeks of exotic chemicals.'
         ],
         cardboard3: [
            "<32>{#p/narrator}* It's a bunch of mostly-empty cardboard boxes.",
            '<32>{#p/narrator}* This small box contains papers all written in an odd font.'
         ],
         labchem: (mtt: boolean) => [
            '<32>{#p/narrator}* Chemicals on conveyor belts.\n* The pairing speaks for itself.',
            ...(mtt
               ? [
                    '<32>{#p/mettaton}* NOTHING LIKE THE CALMING WHIR OF AN MTT-TRIPLE-A-SAFE-RATED CONVEYOR BELT!',
                    '<32>* NOT ONLY DOES IT SAVE YOU FROM HAVING TO REACH AN EXTRA TWO INCHES TO GRAB THINGS...',
                    '<32>* BUT WHEN BEAKERS FALL OFF THE SIDE AND VIOLENTLY BREAK OPEN...',
                    '<32>* YOU GET A SURPRISE CHEMICAL REACTION, FREE OF CHARGE!'
                 ]
               : [])
         ],
         labglobe: (mtt: boolean) => [
            "<32>{#p/narrator}* It's a purple-dyed globe of the monster's homeworld.",
            ...(mtt
               ? [
                    "<32>{#p/mettaton}* IT WOULDN'T BE A SCIENCE LAB WITHOUT THE OBLIGATORY GLOBE.",
                    "<32>* UNLIKE MOST OF WHAT'S HERE, IT'S NOT AN MTT-BRAND ITEM.",
                    '<32>* STILL, SINCE ALPHYS MADE IT FOR ME, AND SHE ALSO MADE ME...',
                    "<32>* WELL, I'D SAY THAT'S THE MOST MTT-BRAND YOU CAN GET!"
                 ]
               : [])
         ],
         labrando: (mtt: boolean) => [
            '<32>{#p/narrator}* The purpose of this device is explicitly unclear.',
            ...(mtt
               ? [
                    '<32>{#p/mettaton}* AH YES, THE EVER-HANDY MTT-BRAND NEUTRON FLOW POLARIZER.',
                    '<32>* A DEVICE SO USEFUL, IT GETS ACCESSED AT LEAST TEN TIMES...',
                    '<32>* PER YEAR!!!'
                 ]
               : [])
         ],
         labsink: (mtt: boolean) => [
            "<32>{#p/narrator}* It's a sink with a replicator- powered water supply.",
            ...(mtt
               ? [
                    '<32>{#p/mettaton}* THE MORE COMPLEX THE MATERIAL, THE MORE POWER IT TAKES TO REPLICATE.',
                    '<32>* THE CORE ONLY PROVIDES SO MUCH POWER, AFTER ALL.',
                    '<32>* THANKFULLY, WATER IS ONE OF THE SIMPLEST SUBSTANCES AROUND!'
                 ]
               : [])
         ],
         labscope: (mtt: boolean) => [
            '<32>{#p/narrator}* A standard-issue CITADEL high- precision electron microscope, circa 261X.',
            ...(mtt
               ? [
                    '<32>{#p/mettaton}* THESE ADVANCED MICROSCOPES WERE ONLY RELEASED A FEW YEARS AGO.',
                    '<32>* JUST ANOTHER EXAMPLE OF HOW MTT-BRAND PRODUCTS NEVER FAIL TO STAY UP TO DATE!'
                 ]
               : [])
         ]
      },
      puzzle: {
         puzzlestop1a: pager.create(
            'limit',
            [
               '<25>{#p/alphys}{#g/alphysShocked}* Woah, stop!!',
               "<25>{#g/alphysOhGodNo}* You're g-going to fall out of the normal plane...",
               '<25>{#g/alphysSideSad}* I should p-probably pull you back.',
               '<25>{#g/alphysThatSucks}* Sorry...'
            ],
            [
               "<25>{#p/alphys}{#g/alphysSideSad}* It's not safe to go that far...",
               "<25>{#g/alphysNeutralSweat}* I'm gonna pull you back now."
            ],
            [ '<25>{#p/alphys}{#g/alphysWTF}* ...' ]
         ),
         puzzlestop1b: () =>
            [
               [ '<25>{#p/asriel2}{#f/13}* Uh, $(name)...?', "<25>* I think we've gone a little too far." ],
               [ '<25>{#p/asriel2}{#f/13}* $(name)...?' ],
               [ '<25>{#p/asriel2}{#f/13}* ...' ]
            ][Math.min(save.flag.n.ga_asrielPuzzleStop1++, 2)],
         puzzlestop1c1: [ '<33>{#p/story}* That position is out of bounds.' ]
      },
      npc: {
         a_black: pager.create(
            'limit',
            [
               "<32>{#p/monster}{#npc/a}* I've been waiting a very long time to get here.",
               "<32>* And, oh deer, to think I almost didn't make it...",
               '<32>* Such a black, black nightmare.'
            ],
            [ '<32>{#p/monster}{#npc/a}* Such a black, black nightmare.' ]
         ),
         a_moon: pager.create(
            'limit',
            [
               "<32>{#p/monster}{#npc/a}* I came here to see Mettaton's grand finale and ended up meeting some new friends.",
               '<32>* Burgie said I should bake a pie, and it actually turned out better than I thought.',
               "<32>* Other than that, I'm just... sort of here?"
            ],
            [ "<32>{#npc/a}* I'm Moon, by the way.\n* It's good to see you around..." ]
         ),
         a_thisisnotabomb: pager.create(
            'limit',
            [
               '<32>{#p/monster}{#npc/a}* Well this place sure is the bomb, huh???',
               "<32>* Psst, listen up kid...\n* I'll let you in on a secret.",
               "<32>* I'm... not really a bomb.",
               "<32>* Hey, don't be shell-shocked.\n* It's just that people call me a bomb so much...",
               "<32>* ...that I've just accepted it at this point."
            ],
            [
               "<32>{#p/monster}{#npc/a}* Turns out I'm supposed to look like a rare homeworld plant.",
               '<32>* That old-timer who came by to talk to Burgie last week said it in passing, I think.',
               "<32>* ...oh, what I'd give to understand what I really am..."
            ],
            [ "<32>{#p/monster}{#npc/a}* ...don't you ever wonder what you really are?" ]
         ),
         a_blackfire: pager.create(
            'limit',
            [
               '<32>{#p/monster}{#npc/a}* Normally, I do astronomical research at the royal lab.',
               '<32>* Earlier, though, Alphys told us we can take the day off.',
               '<32>* I wonder why.'
            ],
            [
               '<32>{#p/monster}{#npc/a}* Being an astronomer can be fun, but it never hurts to stargaze with your own eyes.'
            ]
         ),
         a_businessdude: pager.create(
            'limit',
            () =>
               save.data.n.plot < 57
                  ? [
                       [
                          '<32>{#p/monster}{#npc/a}* Boy, you really missed the mark on that one, huh kid?',
                          "<32>* ...that's a cryin' shame."
                       ],
                       [
                          '<32>{#p/monster}{#npc/a}* Kid, I got one question for ya, and one question only.',
                          '<32>* ...were you even trying?'
                       ],
                       [
                          "<32>{#p/monster}{#npc/a}* Hey, don't feel bad.\n* You gave it your best shot.",
                          "<32>* ...still sucks that ya didn't make it to the end, though."
                       ],
                       [
                          "<32>{#p/monster}{#npc/a}* Gee, talk about cuttin' it close, huh kid?",
                          "<32>* That's an ending for the ages!"
                       ],
                       [
                          '<32>{#p/monster}{#npc/a}* You did pretty well for someone with no real practice.',
                          "<32>* ...beginner's luck, perhaps?"
                       ]
                    ][save.data.n.state_aerialis_crafterresult]
                  : [
                       "<32>{#p/monster}{#npc/a}* Workin' at the lab is a treat, I tell ya.",
                       '<32>* Have you ever been inside the virtualasium?'
                    ],
            () =>
               save.data.n.plot < 57
                  ? [
                       [ "<32>{#p/monster}{#npc/a}* It's a wonder you even made it here at all." ],
                       [ "<32>{#p/monster}{#npc/a}* Kinda seems like you weren't." ],
                       [
                          "<32>{#p/monster}{#npc/a}* I'm sure you'll get another chance on the next episode.",
                          '<32>* MTT seems to have made you his darling star-child.'
                       ],
                       [
                          '<32>{#p/monster}{#npc/a}* Maybe next time you could, I dunno, win more comfortably?',
                          '<32>{#p/monster}{#npc/a}* Just a thought.'
                       ],
                       [
                          '<32>{#p/monster}{#npc/a}* Or maybe, MTT just went a little easy on ya.',
                          '<32>* He does seem to have made you his darling star-child.'
                       ]
                    ][save.data.n.state_aerialis_crafterresult]
                  : [
                       '<32>{#p/monster}{#npc/a}* Yeah, you heard that right.\n* Out of bounds.',
                       '<32>* Now what the heck is that supposed to mean?'
                    ]
         ),
         a_greenfire: pager.create(
            'limit',
            () =>
               save.data.n.plot < 56
                  ? [
                       "<32>{#p/monster}* Don't worry about me, school went well today.",
                       "<32>* I'm just really looking forward to MTT's next show!",
                       "<32>{#p/monster}* Do you know when it'll be on?"
                    ]
                  : save.data.n.plot < 68
                  ? [
                       '<32>{#p/monster}* That show was amazing!\n* The human almost looked real this time!',
                       '<32>* Wait, have I seen you before?'
                    ]
                  : [
                       '<32>{#p/monster}* So the human WAS real...\n* Wow, Mettaton must be REALLY good at networking!',
                       '<32>{#p/monster}* Your performance was great, by the way.'
                    ],
            () =>
               save.data.n.plot < 56
                  ? [ '<32>{#p/monster}* Mettaton usually has a schedule, but he forgot to make one this time.' ]
                  : save.data.n.plot < 68
                  ? [ '<32>{#p/monster}* I swear you look like the actor Mettaton brought on...' ]
                  : [ "<32>{#p/monster}* I can't believe I didn't notice you were a human before!" ]
         ),
         a_harpy: pager.create('limit', () =>
            save.data.n.bad_lizard < 2
               ? [
                    "<32>{#p/monster}* I'm a reporter!\n* Today's news story is about metal 'n' magic!",
                    "<32>{#p/monster}* Did ya know Mettaton's actually made of it??\n* Huhehehaw!"
                 ]
               : [
                    "<32>{#p/monster}* I'm a reporter!\n* Today's news story is about death 'n' destruction!",
                    "<32>{#p/monster}* Did ya know I'm likely goin'a die in a few short hours??\n* Huhehehaw!"
                 ]
         ),
         a_madguy: pager.create(
            'limit',
            [
               '<32>{#p/monster}{#npc/a}* I was one of the builders of the ORIGINAL fountain here.',
               "<32>* Y'know.\n* Before Mettaton decided to rebuild the whole thing.",
               "<32>* Like, who does that? Who'd rebuild it all just to change a single, tiny detail?",
               '<32>* Kind of petty if you ask me.'
            ],
            [
               "<32>{#p/monster}{#npc/a}* Mind you.\n* I'm not the only one.",
               '<32>* ...ever heard of a T. Reynard?',
               '<32>* Yeah, he was in charge of the original build project.',
               '<32>* Now he just sells moon rocks for a living...'
            ],
            [ "<32>{#p/monster}{#npc/a}* Ironic, isn't it?" ]
         ),
         a_proskater: pager.create(
            'limit',
            () =>
               save.data.n.plot < 60
                  ? [
                       "<32>{#p/monster}{#npc/a}* Finally got outta school, I don't know why I still go there anymore...",
                       "<32>* Luckily, I hear Mettaton's got something exciting planned for his next show.",
                       "<32>* I can't wait, brah..."
                    ]
                  : save.data.n.plot < 68
                  ? [
                       '<32>{#p/monster}{#npc/a}* Brah... that was crazy.',
                       '<32>* And... kinda weird?',
                       '<32>* I mean, some of that stuff looked like junk, but that last item...',
                       '<32>* ...whew, what a stunner.'
                    ]
                  : [
                       "<32>{#p/monster}{#npc/a}* Brah.\n* I'm glad Mettaton's staying around.",
                       "<32>* If it weren't for him, I'd have way less excuses to skip class."
                    ],
            () =>
               save.data.n.plot < 60
                  ? [ '<32>{#p/monster}{#npc/a}* I hope he gets interesting contestants this time...' ]
                  : save.data.n.plot < 68
                  ? [ "<32>{#p/monster}{#npc/a}* Tell me YOU wouldn't want a life-sized sci-fi doll." ]
                  : [ "<32>{#p/monster}{#npc/a}* As a matter of fact, I'm skipping one right now..." ]
         ),
         a_clamguy: pager.create(
            'limit',
            [
               '<32>{#p/monster}{#npc/a}* I hear things can get pretty weird if you go too far out on these repeating rooms.',
               '<32>* Time dilation...\n* Spatial instability...',
               "<32>* Yeah, don't ask me what that means, that's just what Dr. Alphys says.",
               '<32>* Half the stuff she says makes no sense to most of us.'
            ],
            [
               '<32>{#p/monster}{#npc/a}* Humans, monsters...',
               "<32>* No matter the species, you'll always have those neurodivergent types.",
               '<32>* I love it.'
            ]
         ),
         a_pyrope: pager.create(
            'limit',
            [
               '<32>{#p/monster}{#npc/a}* Vulkin and I make up the rap group "The Pyromaniacs."',
               '<32>* Our beats? Fantastic.\n* Our flows? Pyroclastic.',
               "<33>* When I hop on stage, I'm bomb- astically elastic, I make the crowd melt like molten plastic.",
               "<32>* And Vulkin?\n* He's a one-stop shop for hot mic-drop classics."
            ],
            [ "<32>{#p/monster}{#npc/a}* Don't worry.", "<32>* Our measures aren't TOO drastic." ]
         ),
         a_vulkin: pager.create(
            'limit',
            [ '<32>{#p/monster}{#npc/a}* Oh...\n* When the crowd cheers for us, it feels... so nicey.' ],
            [ '<32>{#p/monster}{#npc/a}* So spicey.' ]
         ),
         a_heats: pager.create(
            'limit',
            [
               '<32>{#p/monster}{#npc/a}* Do YOU know my name!?',
               '<32>* ...',
               "<32>* Wait, don't answer that.",
               '<32>* You...\n* Y-you LOOK like you know.',
               '<32>* You SMELL...\n* ...\n* ...like you know.',
               '<32>* ...',
               "<32>* I bet if I touched you, it'd FEEL like you know.",
               "<32>* (It'd also be way, WAYYYYYY too hot for you.)",
               '<32>* But why do you know...?',
               '<32>* How... do you know...',
               '<32>* This I will never ever know.' // emp...?
            ],
            [ '<32>{#p/monster}{#npc/a}* I. Will. Never. Ever. KNOWWWW!' ]
         ),
         a_slime_father: pager.create(
            'limit',
            [ '<32>{#p/monster}{#npc/a}* Ah, to be young again.\n* The world sure felt boundless.' ],
            [ '<32>{#p/monster}{#npc/a}* You look young...', "<32>* Go play!\n* The world isn't so scary." ],
            [ '<32>{#p/monster}{#npc/a}* Go on...' ]
         ),
         a_slime_mother: pager.create(
            'limit',
            [
               "<32>{#p/monster}{#npc/a}* Hubby thinks that because he's old, he can't enjoy life anymore.",
               "<32>* But really, he just doesn't like trying new things.",
               '<32>* Kids try new things all the time, and look how happy they are!'
            ],
            [
               "<32>{#p/monster}{#npc/a}* If you're ever bored with life, try something new.",
               '<32>* It could be a movie, a hobby, or even a language...',
               '<32>* Anything is possible!'
            ],
            [ '<32>{#p/monster}{#npc/a}* What are you waiting for?' ]
         ),
         a_slime_kid1: pager.create(
            'limit',
            [ '<32>{#p/monster}{#npc/a}* Do you wanna play Monsters and Humans!?' ],
            [ "<32>* I'll be the human." ]
         ),
         a_slime_kid2: pager.create(
            'limit',
            [
               '<32>{#p/monster}{#npc/a}* I wanna learn how to play smart human games like chess.',
               "<32>* Starry's mom over there is the best... she can beat anyone!"
            ],
            [ '<32>{#p/monster}{#npc/a}* What\'s a "zugzwang?"' ]
         ),
         a_diamond1: pager.create(
            'limit',
            () =>
               save.data.n.plot < 67
                  ? [
                       "<32>{#p/monster}{#npc/a}* We came to see Mettaton's grand finale, but...",
                       "<32>* I didn't think I'd get to see the human up close!",
                       '<32>* ...you are the human, right?'
                    ]
                  : [
                       "<32>{#p/monster}{#npc/a}* Hey, you're the human who outlasted Mettaton on his own show!",
                       '<32>{#p/monster}{#npc/a}* What an incredible performance!'
                    ],
            () =>
               save.data.n.plot < 67
                  ? [ "<32>{#p/monster}{#npc/a}* I'll be rooting for Mettaton." ]
                  : [ '<32>{#p/monster}{#npc/a}* ...do you do autographs?' ]
         ),
         a_diamond2: pager.create(
            'limit',
            () =>
               save.data.n.plot < 67
                  ? [
                       "<32>{#p/monster}{#npc/a}* Aren't you excited for the grand finale!?",
                       '<32>* The final showdown between Mettaton and his human star...',
                       '<32>* One last dramatic stand for humans and monsters alike!'
                    ]
                  : [
                       '<32>{#p/monster}{#npc/a}* Mettaton really had us there at the end...',
                       "<32>{#p/monster}{#npc/a}* For a moment, I thought he'd be leaving for good!"
                    ],
            () =>
               save.data.n.plot < 67
                  ? [ "<32>{#p/monster}{#npc/a}* I'm rooting for the human." ]
                  : [ '<32>{#p/monster}{#npc/a}* And then, that moment passed.' ]
         ),
         a_gyftrot: pager.create(
            'limit',
            [
               '<32>{#p/monster}{#npc/a}* This bear insists on gifting me ornaments to put on my head.',
               '<32>* I know it means well, but head ornaments are the last thing I need...',
               '<32>* I would much rather visit a simulator.'
            ],
            [ "<32>{#p/monster}{#npc/a}* ...at least it's not forcing them on me like those teenagers in Starton did." ]
         ),
         a_giftbear: pager.create(
            'limit',
            [
               '<32>{#p/monster}{#npc/a}* I feel bad for Gyftrot.\n* It, like many of us, has never lived in its natural habitat.',
               "<32>* Alphys has said she's working on a new simulator...",
               '<32>* Perhaps when it is complete, we may all find some respite.'
            ],
            [ '<32>{#p/monster}* For now, I will try my best to improve the lives of those less fortunate than I.' ]
         ),
         a_boomer: pager.create(
            'limit',
            [
               '<32>{#p/monster}{#npc/a}* You know why I love hanging out here?',
               "<32>* It's simple, chief.",
               "<32>* There's no crappy puzzles to figure out here."
            ],
            [ '<32>{#p/monster}{#npc/a}* Yeah, I said it.', '<32>* I said crappy.', "<32>* It's just a fact, chief." ],
            [ '<32>{#p/monster}{#npc/a}* Chief.' ]
         ),
         a_artgirl: pager.create(
            'limit',
            [
               "<32>{#p/monster}{#npc/a}* I'm an art teacher.\n* In art, it's said that there's no right or wrong way.",
               '<32>* But one of my students thinks that everything he does is a mistake...',
               "<32>* He won't stop apologizing...\n* I want to help him, but I'm at a loss for what to do."
            ],
            [ '<33>{#p/monster}{#npc/a}* Why is teaching a subjective subject so objectively difficult?' ]
         ),
         a_drakemom: pager.create(
            'limit',
            () =>
               save.data.b.s_state_chilldrake
                  ? [
                       "<32>{#p/monster}{#npc/a}* So listen up, you know my son Stardrake? He isn't feeling too hot.",
                       "<33>* So. I ran by the movie theater.\n* A little family movie night never hurts, y'know?",
                       '<32>* So I go in, and I see this flick called "The Great Marinara Heist."',
                       "<32>* Now one would assume Papyrus, my son's big role model, to star in such a production.",
                       "<32>* Well. Turns out that's not quite how things ended up. So I went with an alternative."
                    ]
                  : [
                       "<32>{#p/monster}{#npc/a}* Well. I played this here move.\n* Pawn to king's knight four?\n* So my opponent walked off.",
                       "<32>* Now, you see, I have to wait.\n* It'll take a while for that clock to run out, for sure."
                    ],
            () =>
               save.data.b.s_state_chilldrake
                  ? [ '<32>{#p/monster}{#npc/a}* It\'s called "Journey to Mole-Rat Outpost."' ]
                  : [
                       '<32>{#p/monster}{#npc/a}* So. Is this what humans do?\n* Quit before you lose?',
                       '<32>* Or is such a tactic unique to monsters?\n* I do wonder.'
                    ]
         ),
         a_drakedad: pager.create(
            'limit',
            () =>
               save.data.b.s_state_chilldrake
                  ? [
                       "<32>{#p/monster}{#npc/a}* I heard about yah from my son's friends, they tell me he's been bruised all ovah...",
                       "<32>* Could yah apologize to him latah for me?\n* It'd mean the world."
                    ]
                  : [
                       "<32>{#p/monster}{#npc/a}* I'm a waitah.\n* My wife is a chess playah, and my son is a comedian.",
                       '<32>* They say being a waitah is a boring job, but it suits me.',
                       "<32>* Of course, I'm also a fathah.\n* I worry about my son, since he doesn't come home often...",
                       '<32>* Instead, he tells jokes with his friends in Starton.'
                    ],
            [ '<32>{#p/monster}{#npc/a}* At least the jokes are funny.', '<32>* ...', '<32>* ...they ARE funny, right?' ]
         ),
         a_reg: pager.create(
            'limit',
            () => [
               '<32>{#p/monster}{#npc/a}* Security kicked me out for huffing the wish flowers.',
               world.genocide
                  ? '<32>* Then the lights went off... I could probably go back in...'
                  : '<32>* The guards have clocked out, so I could go back in...',
               "<32>* ...but, ahh, this here is the best one I've found so far..."
            ],
            [ "<32>* Don't worry about me, I'm just here... huffing a wish flower." ]
         ),
         a_oni: pager.create(
            'limit',
            [
               '<32>{#p/monster}{#npc/a}* Long ago, they found a weak spot in the force field, about where the Outlands is now.',
               "<32>* It doesn't mean we can escape through it, but it does mean any human who comes here...",
               '<32>* ...will have to crash-land right around that area.',
               '<32>* So we built the outpost to be long and winding to slow down a potential invasion.',
               "<32>* We quickly realized it was a dumb idea, but by then, it'd become a tradition.",
               "<32>* Now, you can't go two seconds without getting lost..."
            ],
            [
               "<32>{#p/monster}{#npc/a}* At least the CORE wasn't designed with this idea.",
               "<32>* Can you imagine how bad it'd be if we had to go through mazes to do maintenance?"
            ],
            [ '<32>{#p/monster}{#npc/a}* Please and no thank you.' ]
         ),
         a_charles: pager.create(
            'limit',
            [
               '<32>{#p/monster}{#npc/a}* I work at the CORE.\n* The floor plan is designed to look like a bird.',
               '<32>* Oh! I bet you don\'t know what "CORE" stands for!',
               '<32>* It stands for "Charged Onium- ion Refactorization Engine."',
               '<32>* What does it mean?',
               '<32>* I have no idea, no idea at all!'
            ],
            [
               "<32>* Something else that's cool about the CORE is the override switches.",
               "<32>* They're both heavily guarded, but one is guarded by puzzles instead of actual guards!",
               '<32>* I sure do love PUZZLE!'
            ]
         ),
         a_bowtie: pager.create(
            'limit',
            [
               '<32>{#p/monster}{#npc/a}* This rec center is an exquisite example of royal design.',
               '<32>* The sky blue faded walls, intercut with gold-laden power lines.',
               '<32>* Why power lines, you ask?',
               '<32>* Well, apart from the CORE being directly above us...',
               '<32>* It gives the area a real sense of purpose.',
               '<32>* We monsters do love our functional fashion.'
            ],
            [ '<32>{#p/monster}{#npc/a}* Is your function fashionable?' ]
         ),
         a_dragon: pager.create(
            'limit',
            [
               "<32>{#p/monster}{#npc/a}* So you're telling me the next comedy show isn't gonna be for another two weeks??",
               '<32>* I thought it was today!'
            ],
            [
               "<32>{#p/monster}{#npc/a}* So you're telling me I can't re-schedule my seat for a later date?",
               '<32>* This place is a total folly!'
            ]
         ),
         a_foodreceptionist: pager.create(
            'limit',
            () =>
               evac()
                  ? world.bullied
                     ? [ '<32>{#p/narrator}* ...but everybody ran.' ]
                     : [ '<32>{#p/narrator}* ...but nobody came.' ]
                  : fetchCharacters().find(c => c.key === 'sans')
                  ? [
                       '<32>{#p/monster}{#npc/a}* Blub blub...\n* (I hope you and your date had a pleasant dining experience.)',
                       '<32>* (That looked like quite the intriguing conversation...)'
                    ]
                  : world.population < 3
                  ? [ '<32>{#p/monster}{#npc/a}* Blub blub...\n* (Day by day, the days grow ever lonelier...)' ]
                  : [
                       "<32>{#p/monster}{#npc/a}* Blub blub...\n* (You'll have to reserve a table to eat here.)",
                       "<32>* (The girls get ancy when the reservations aren't in order.)"
                    ],
            () =>
               evac()
                  ? world.bullied
                     ? [ '<32>{#p/narrator}* ...but everybody ran.' ]
                     : [ '<32>{#p/narrator}* ...but nobody came.' ]
                  : [
                       fetchCharacters().find(c => c.key === 'sans')
                          ? '<32>{#p/monster}{#npc/a}* Blub blub...\n* (Our true world is patiently waiting on its knees.)'
                          : world.population < 3
                          ? '<32>{#p/monster}{#npc/a}* Blub blub...\n* (Our true world will soon be lonely no more.)'
                          : '<32>{#p/monster}{#npc/a}* Blub blub...\n* (Our true world has made a reservation for salvation.)',
                       '<32>* (...)',
                       '<32>* (What were we talking about again?)'
                    ],
            () =>
               evac()
                  ? world.bullied
                     ? [ '<32>{#p/narrator}* ...but everybody ran.' ]
                     : [ '<32>{#p/narrator}* ...but nobody came.' ]
                  : [ '<32>{#p/monster}{#npc/a}* Blub blub...\n* (There are no reservations available at this time.)' ]
         )
      },
      genotext: {
         timewaster: () =>
            [
               [ '<25>{#p/asriel2}{#f/10}* Why are we going back this way again?' ],
               [ "<25>{#p/asriel2}{#f/7}* We really don't need to do this." ]
            ][Math.min(save.flag.n.ga_asrielTimewaster++, 1)],
         asriel46: (n: number) =>
            [
               [ '<25>{#p/asriel2}{#f/13}* Golly... feels weird to be back where it all started.' ],
               [ '<25>{#p/asriel2}{#f/3}* No matter how much I walk through here, it always feels weird.' ],
               [ '<25>{#p/asriel2}{#f/3}* Heh... still getting that same feeling.' ],
               []
            ][Math.min(n, 3)],
         asriel47: (n: number) =>
            [
               [
                  '<25>{#p/asriel2}{#f/4}* And I doubt Alphys meant to bring me back to life, but...',
                  "<25>{#f/3}* Whether I like it or not, she's the reason I'm here.",
                  "<25>{#f/4}* Not that I'm complaining about it."
               ],
               [
                  '<25>{#p/asriel2}{#f/4}* Seeing the place you were created in...',
                  "<25>{#f/10}* Wouldn't you feel the same way?"
               ],
               []
            ][Math.min(n, 2)],
         asriel48: (n: number) =>
            [
               [
                  '<25>{#p/asriel2}{#f/13}* Heh...',
                  "<25>{#f/13}* I'm just glad you're still here, $(name).",
                  '<25>{#f/4}* We were always meant to be together.'
               ],
               [
                  '<25>{#p/asriel2}{#f/2}* Who am I kidding.\n* Of course you would.',
                  "<25>{#f/13}* After all, $(name), we're so much alike..."
               ],
               []
            ][Math.min(n, 2)],
         asriel49: (n: number) =>
            [
               [
                  '<25>{#p/asriel2}{#f/6}* Golly, I forgot how empty this place can get sometimes.',
                  '<25>{#f/8}* The monsters built it as a staging area for a project...',
                  '<25>{#f/7}* Then Mettaton turned it into his personal little playground.'
               ],
               [
                  "<25>{#p/asriel2}{#f/3}* Again we're faced with this bore of a place.",
                  "<25>{#f/4}* But hey, at least we've got the starlings to keep us company.",
                  "<25>{#f/8}* Not that that's a lot."
               ],
               [
                  '<25>{#p/asriel2}{#f/8}* ...',
                  '<25>{#f/7}* I seriously hope this is the last time I have to walk through here.'
               ],
               []
            ][Math.min(n, 3)],
         asriel50: (n: number) =>
            [
               [
                  '<25>{#p/asriel2}{#f/10}* Did you know Mettaton abandoned his cousin to chase fame?',
                  "<25>{#f/2}* Now, I'm not claiming to be some kind of saint...",
                  "<25>{#f/1}* But still, don't you think it's funny?",
                  '<25>{#f/2}* The so-called "star of the outpost" is a lie, hiding in the metal.'
               ],
               [
                  '<25>{#p/asriel2}{#f/3}* Starlings are neat little flowers, though.',
                  '<25>{#f/3}* They start out small, but once they bloom...',
                  '<25>{#f/4}* The head of the flower flies off and takes to the skies.',
                  '<25>{#f/5}* Kinda cool, right $(name)?'
               ],
               []
            ][Math.min(n, 2)],
         asriel51: (n: number) =>
            [
               [
                  '<25>{#p/asriel2}{#f/3}* And you know what, he can say whatever he wants to about me.',
                  '<25>{#f/4}* At least my betrayal was honest, unlike his.'
               ],
               [
                  "<25>{#p/asriel2}{#f/3}* Too bad the next blooming period won't be for a while.",
                  '<25>{#f/1}* And by then, well...',
                  '<25>{#f/2}* Things are going to be a little different around here.'
               ],
               []
            ][Math.min(n, 2)],
         asriel52: () =>
            [
               [
                  "<25>{#p/asriel2}{#f/6}* Let me guess, the elevator couldn't take us to the third floor?",
                  '<25>{#f/8}* Ugh...',
                  "<25>{#f/7}* I should have known he'd make us take the long way up.",
                  '<25>{#f/10}* ...the hell is he planning up there?',
                  '<25>{#f/10}* ...',
                  "<25>{#f/8}* We've got to get a move on, $(name)."
               ],
               [ '<25>{#p/asriel2}{#f/8}* One floor down, two floors to go...' ]
            ][Math.min(save.flag.n.ga_asriel52++, 1)],

         hotel0: () =>
            save.flag.b.asriel_electrics
               ? [ [ '<25>{#p/asriel2}{#f/8}* ...', '<25>{#p/asriel2}{#f/4}* At least we know who caused this now.' ], [] ][
                    Math.min(save.flag.n.ga_asrielElectrics0++, 1)
                 ]
               : [
                    [
                       "<25>{#p/asriel2}{#f/8}* It's dark...",
                       "<25>{#f/6}* This isn't normal at all.",
                       "<25>{#f/7}* Someone must've come through and shorted out the electrics.",
                       '<25>{#f/10}* But who...?'
                    ],
                    [ '<25>{#p/asriel2}{#f/8}* ...', '<25>{#f/6}* I still wonder who shorted out the power here.' ],
                    []
                 ][Math.min(save.flag.n.ga_asrielHotel0++, 1)],
         hotel1: () =>
            save.flag.b.asriel_electrics
               ? [
                    '<25>{#p/asriel2}{#f/10}* Come to think of it...',
                    '<25>{#f/4}* The burn marks on the emitters look like they were caused by magic.',
                    '<25>{#f/1}* Alphys DEFINITELY lost her temper coming through here.',
                    "<25>{#f/2}* Too bad I didn't get to see it for myself..."
                 ]
               : [
                    '<25>{#p/asriel2}{#f/10}* No forcefield...?',
                    '<25>{#f/10}{#x1}* And look, the emitters are burnt out.',
                    '<25>{#f/10}* ...what happened here?'
                 ],
         hotelElectrics: [
            "<25>{#p/asriel2}{#f/3}* I don't know if you saw it, but that note there was intriguing.",
            '<25>* If Alphys was here earlier, that would explain the lights.',
            "<25>{#f/4}* Wouldn't be the first time she let emotions control her magic."
         ],
         hotel2: () =>
            [
               [
                  '<25>{#p/asriel2}{#f/4}* Looks abandoned, as I expected.',
                  ...(save.flag.b.asriel_electrics
                     ? [ "<25>{#p/asriel2}{#f/3}* No doubt Alphys's outburst scared some of them off." ]
                     : []),
                  "<25>{#f/3}* ...guess there's only one thing to do here.",
                  "<25>{#f/4}* Let's get to the core."
               ],
               [
                  '<25>{#p/asriel2}{#f/4}* ...this is still as surreal as ever.',
                  ...(save.flag.b.asriel_electrics
                     ? [ "<25>{#p/asriel2}{#f/1}* We'll have to thank Alphys later for the free mood lighting." ]
                     : [])
               ],
               []
            ][Math.min(save.flag.n.ga_asrielHotel2++, 2)],
         core0: () =>
            [
               [
                  '<25>{#p/asriel2}{#f/3}* At last...',
                  '<25>{#f/3}* The central source of power for the outpost.',
                  "<25>{#f/4}* Oh, and, if you haven't figured it out by now...",
                  "<25>{#f/1}* We're going to blow it to pieces.",
                  '<25>{#f/9}* Hee hee hee...',
                  '<32>{#p/narrator}* What?',
                  '<25>{#p/asriel2}{#f/1}* Stay close. ELITE squad members might be lurking nearby.'
               ],
               [ '<25>{#p/asriel2}{#f/1}* Ready, $(name)?', "<25>{#f/1}* You know what we're going to do." ],
               [ '<25>{#p/asriel2}{#f/3}* Ready, $(name)?', "<25>{#f/3}* Let's go." ]
            ][Math.min(save.flag.n.ga_asrielCore0++, 2)],
         core1: [
            '<25>{#p/asriel2}{#f/10}* No guards...?',
            '<25>{#f/9}* $(name)... they really ARE afraid of us.',
            '<25>{#f/5}* Golly, this should be a cakewalk!'
         ],
         core2: () =>
            [
               [
                  '<25>{#p/asriel2}{#f/3}* Here we are... the central control room.',
                  "<25>{#f/3}* From here, there's practically a control for everything.",
                  '<25>{#f/4}* Gravity plating, heat distribution, even the atmosphere...',
                  '<25>{#f/3}* It all runs through this system.',
                  "<25>{#f/1}* Let's see if my royal access codes are still valid.",
                  "<25>{#f/2}* I wouldn't put it past them to forget..."
               ],
               [
                  '<25>{#p/asriel2}{#f/6}* Here we are.',
                  ...(save.flag.b.asriel_access ? [] : [ "<25>{#f/7}* Let's give the royal access codes a try." ])
               ]
            ][Math.min(save.flag.n.ga_asrielCore2++, 1)],
         core3: () => [
            '<25>{*}{#p/asriel2}{#f/4}* System, extend the bridge, authorization Asriel $(x).{^40}{%}',
            ...(save.flag.b.asriel_access ? [] : [ '<25>{*}{#f/3}* ...{^40}{%}', '<25>{*}{#f/4}* I guess no- {%}' ])
         ],
         core4a: [ '<25>{#p/asriel2}{#f/10}* I guess so.' ],
         core4b: () =>
            [
               [
                  '<25>{#f/3}* Wait here, I need to set some things up.',
                  "<25>{#f/1}* Say, can you get the back door unlocked while I'm at it?",
                  '<25>* Pick a side, left or right, and hit the switch at the end.',
                  '<25>* We only need one to get through.'
               ],
               [
                  '<25>{#f/3}* Go unlock the back door while I set some things up.',
                  '<25>{#f/4}* Remember, switches are at the end of either side path past here.'
               ],
               [ "<25>{#f/6}* You know what I'll be doing, go unlock that back door." ]
            ][Math.min(save.flag.n.ga_asrielCore4++, 2)],
         core5: [ '<25>{#p/asriel2}{#f/8}* Wrong way...' ],
         core6a: () =>
            [
               [
                  '<25>{#p/asriel2}{#f/3}* Perfect timing.\n* I just got done setting up the overload.',
                  "<25>{#f/1}* All that's left is to make it to an escape shuttle...",
                  '<25>{#f/1}* ...set off the blast...',
                  '<25>{#f/2}* ...and ride the shockwave to freedom.',
                  '<25>{#f/1}* These poor saps will be forgotten like they deserve to be.',
                  '<32>{#p/narrator}* No...'
               ],
               [ '<25>{#p/asriel2}{#f/3}* Ready?', "<25>{#f/3}* Let's end this thing once and for all." ]
            ][Math.min(save.flag.n.ga_asrielCore5++, 1)],
         core6b: [ '<25>{#p/asriel2}{#f/3}* Lead us out of here.' ],
         core7a: [ '<25>{#p/asriel2}{#f/8}* Wait, I think I hear something.' ],
         core7b: [
            "<25>{#p/asriel2}{#f/3}* It's Mettaton.\n* He's waiting in the next room.",
            '<25>{#f/10}* I can only make out a silhouette...',
            '<25>{#f/6}* Maybe if we sneak up on him, we can kill him right now.'
         ],
         core7c: [ '<25>{#p/asriel2}{#f/7}* You know what to do.' ],
         core8a: [
            "<32>{#p/mettaton}* Do you really think I'm going to let you get away that easily?",
            "<25>{#p/asriel2}{#f/8}* ...\n* Don't be coy, Mettaton.\n* Of course you won't.",
            "<25>{#p/asriel2}{#f/1}* It just won't matter when you're dead."
         ],
         core8aX: () => [
            "<32>{#p/mettaton}* Do you really think I'm going to let you get away that easily?",
            "<25>{#p/asriel2}{#f/8}* We've had this chat before, pal.",
            '<32>{#p/mettaton}* Ah...',
            "<32>{#p/mettaton}* But that means I've already killed you once before, doesn't it?",
            ...(save.flag.n.genocide_milestone < 4
               ? [
                    "<32>{#p/mettaton}* Heh... don't worry, darling.\n* I'll make your death even quicker this time around."
                 ]
               : [
                    '<25>{#p/asriel2}{#f/2}* Oh, how naive you are.',
                    "<25>{#p/asriel2}{#f/1}* It's YOU who's died to us already, and we can make it happen again."
                 ]),
            '<32>{#p/mettaton}* ...',
            "<32>{#p/mettaton}* Nice try... but I'm still going to fight you."
         ],
         core8b: [
            "<25>{#p/asriel2}{#f/2}* ...say, since you're about to be spare parts...",
            "<25>{#f/1}* Haven't you thought about your family?",
            '<25>{#f/3}* You know.\n* With how you abandoned them, and all.',
            '<32>{#p/mettaton}* My family would be proud of me if they knew what I was doing.',
            '<32>* As for you...?',
            "<32>* I can't exactly say the same.",
            "<25>{#p/asriel2}{#f/6}* I guess it's a good thing I don't care about them, then.",
            '<25>{#f/8}* You, on the other hand, have an emotional weakness...',
            '<25>{#f/6}* With that alone, this battle was over before it even started.'
         ],
         core8c: [
            '<32>{#p/mettaton}* Listen, darling.',
            "<32>* Whatever you have to say, doesn't matter.",
            "<32>* All that matters, is that you're going to lose to me.",
            '<32>* For all your talk of victory and inevitability...',
            "<32>* For all the showboating and curbstomping you've done...",
            "<32>* There's one power you failed to consider."
         ],
         core8d: [ '<25>{#p/asriel2}{#f/10}* And what is that?' ],
         core8e: [ '<32>{*}{#p/mettaton}{#f/1}* The power of NEO.{^40}{%}' ],
         spareketeer: [ "<25>{#p/asriel2}{#f/10}* That's one way to take care of the problem..." ],
         azzyBpants: [ '<25>{#p/asriel2}{#f/8}* Golly.\n* Why is HE still around.' ]
      },
      coreswitched: [ '<32>{#p/narrator}* The switch is... one-time use.\n* And totally not stuck.' ],
      puzzlesolved: [ '<32>{#p/narrator}* The puzzle has been solved.' ],
      nosleep: [ "<32>{#p/narrator}* It's locked." ],
      rg1chat: pager.create(
         'limit',
         [
            '<32>{#p/monster}{#x1}* My boyfriend and I were looking for an ice cream stand for so long...{#x3}',
            '<32>{#x1}* Turns out, this guy who sells some RADICAL ice cream just moved his stand up here.{#x3}',
            '<32>{#x1}* We took up guard duty at this security post so we could get closer to it.{#x3}'
         ],
         [
            "<32>{#p/monster}{#x1}* I've been told security guards get SUPER exclusive discounts.{#x3}",
            '<32>{#x1}* Totally not part of the reason we came here, though.{#x3}'
         ]
      ),
      rg2chat: pager.create(
         'limit',
         [
            "<32>{#p/monster}{#x2}* Hey, aren't you like, that one quiet kid we met earlier?{#x3}",
            '<32>{#x2}* I wonder why Alphys had to escort you...{#x3}',
            '<32>{#x2}* You must be... MEGA important.{#x3}'
         ],
         [
            "<32>{#p/monster}{#x2}* If you're gonna be famous, then don't forget about us when you make it there, yeah?{#x3}",
            "<32>{#x2}* Always gotta remember the lil' bros you meet along the way.{#x3}"
         ]
      ),
      elevator1: [
         choicer.create('* (Where would you like to go?)', -1, -1, 'Cancel', 'CORE Start', 'CORE End', 'The Citadel')
      ],
      elevatorStory1: [ choicer.create('* (Where would you like to go?)', -1, -1, 'CORE Start', 'Cancel') ],
      elevator2: [
         choicer.create('* (Where would you like to go?)', -1, -1, 'Aerialis', 'Cancel', 'CORE End', 'The Citadel')
      ],
      elevatorStory2: [ choicer.create('* (Where would you like to go?)', -1, -1, 'Aerialis', 'Cancel') ],
      elevator3: [
         choicer.create('* (Where would you like to go?)', -1, -1, 'Aerialis', 'CORE Start', 'Cancel', 'The Citadel')
      ],
      elevator4: [
         choicer.create('* (Where would you like to go?)', -1, -1, 'Aerialis', 'CORE Start', 'CORE End', 'Cancel')
      ],
      dinnerdate1: pager.create(
         'limit',
         [
            "<25>{#p/sans}* hey, i heard you're visiting here.",
            '<25>{#p/sans}{#f/2}* mind grabbing some dinner with me real quick?',
            choicer.create('* (Have dinner?)', 8, 7, 'Yes', 'No')
         ],
         [ '<25>{#p/sans}{#f/2}* changed your mind?', choicer.create('* (Have dinner?)', 8, 7, 'Yes', 'No') ]
      ),
      dinnerdate2a: pager.create(
         'limit',
         [ "<25>{#p/sans}{#f/3}* eh, fair enough.\n* i'll be here if you change your mind." ],
         [ '<25>{#p/sans}{#f/4}* okay then.' ]
      ),
      dinnerdate2b: [ '<25>{#p/sans}{#p/sans}{#f/0}* sweet.' ],
      dinnerdate3: [ '<25>{#p/sans}{#f/2}* follow me, i think i know a shortcut.' ],
      dinnerdate4: [ '<25>{#p/sans}* here we are.' ],
      dinnerdate5: [ '<25>{#p/sans}* this table looks good.' ],
      dinnerdate5b: [ "<25>{#f/2}* i'll take right, you take left." ],
      dinnerdate6: [ '<25>{#p/sans}{#f/3}* woah there, bucko, i meant my left.' ],
      dinnerdate7: [ '<25>{*}* sorry, shoulda told you beforehand.{^20}{%}' ],
      dinnerdate8: () => [
         '<25>{#p/sans}* ...',
         '<25>* so...',
         "<25>{#f/3}* your journey's almost over, huh?",
         '<25>{#f/0}* you must really wanna get outta here.',
         '<25>{#f/0}* ...heh.\n* trust me, i know the feeling.',
         ...(save.data.n.bad_lizard < 1
            ? [
                 "<25>{#f/3}* ...i also know you've got a lot to leave behind.",
                 "<25>{#f/0}* out here, you've got food, drink, friends...",
                 '<25>{#f/2}* would staying with us really be so bad?'
              ]
            : [
                 "<25>{#f/3}* ...i also know you've got a lot on your mind.",
                 "<25>{#f/0}* but whatever you may've done...",
                 '<25>* is getting out of here really worth all the trouble?'
              ])
      ],
      dinnerdate10: [ '<25>{#f/0}* ...' ],
      dinnerdate11: () => [
         '<25>{#f/3}* lemme tell you a story.',
         "<25>{#f/0}* so, i'm a royal sentry, right?",
         '<25>{#f/0}* my job is to sit out there and watch for humans.',
         "<25>{#f/3}* though, i'm sure you've realized by now...",
         '<25>{#f/2}* ...i actually took the job so i could protect you guys instead.',
         ...(save.data.n.bad_lizard < 1
            ? [ "<25>{#f/4}* shh, don't tell undyne i said that.\n* she wouldn't like it." ]
            : [ "<25>{#f/4}* kinda ironic, isn't it?" ]),
         "<25>{#f/0}* anyway, i've got this super boring job, right?",
         "<25>{#f/0}* fortunately, there's a little place near the edge of starton.",
         "<25>{#f/0}* and at the end of the bridge to this place lies a big ol' door.",
         '<25>{#f/4}* now this door was PERFECT for practicing knock knock jokes.',
         "<25>{#f/0}* one day, i'm knockin' em out like usual...",
         '<25>{#f/0}* and i knock on the door and say "knock knock."\n* like usual.',
         '<25>{#f/0}* but then, from the other side...',
         "<25>{#f/3}* i hear a woman's voice.",
         '<25>{#p/soriel}* "Who is there?"',
         '<25>{#p/sans}{#f/0}* naturally, i respond.',
         '<25>{#f/2}* "water."',
         '<25>{#p/soriel}* "Water who?"',
         '<25>{#p/sans}{#f/4}* "water you doing all the way out here?"',
         '<25>{#f/0}* and she just LOSES it.',
         "<25>* like it's the first joke she's heard in a hundred years.",
         '<25>{#f/2}* so i open the door, introduce myself, and i tell her some more.',
         '<25>{#f/0}* after about a half dozen or so, SHE knocks and says...',
         '<25>{#p/soriel}* "Knock knock!"',
         '<25>{#p/sans}* i say "who\'s there?"',
         '<25>{#p/soriel}* "You."',
         '<25>{#p/sans}* "you who?"',
         '<25>{#p/soriel}* "I\'m not a dog, SANS!"',
         '<25>{#p/sans}{#f/0}* ...heh.',
         '<25>{#f/2}* needless to say, this woman knew her stuff.',
         '<25>{#f/0}* we kept going for a while, but eventually, she had to go.',
         '<25>{#f/0}* the next day, though...',
         '<25>* she was waiting for me when i returned.',
         '<25>{#f/3}* ...boy did she have a lot to say.',
         '<25>{#p/soriel}* "...I just felt it was the right thing to do..."',
         '<25>{#p/soriel}* "...I have to protect them..."',
         '<25>{#p/soriel}* "...I can never look at him the same way again..."',
         '<25>{#p/sans}* turns out, this random woman was the queen.',
         '<25>* at some point, though, something awful happened...',
         '<25>{#f/3}* and it split the royal family apart.',
         '<25>{#f/0}* she also had a ton of weird stuff to say about asgore.',
         "<25>{#f/3}* i'll spare you on the details, but let's just say...",
         "<25>{#f/2}* isolation can really screw with a person's world view."
      ],
      dinnerdate13: [ '<25>{#p/sans}{#f/0}* shoot, i forgot to order something, huh?', '<25>* ...' ],
      dinnerdate14: [ "<25>{#f/3}* i'll be right back." ],
      dinnerdate14comment: () =>
         save.data.b.oops
            ? [ '<32>{#p/narrator}* Truly, there is nothing like the feeling of waiting for food.' ]
            : [
                 '<32>{#p/narrator}* You know...',
                 "<32>* I'm really starting to wish I had more time to talk with Toriel back there.",
                 "<32>* There's a lot I'd like to say to her right now...",
                 "<32>* But I doubt she'll want to start another battle with you."
              ],
      dinnerdate15: () =>
         save.data.b.water
            ? [ '<25>{#p/sans}{#f/2}* look at that, you even brought a drink.' ]
            : [ "<25>{#p/sans}* now we're talking." ],
      dinnerdate16: () => [
         '<25>{#f/0}* anyway, like i was saying...',
         '<25>{#f/3}* this woman was under a lot of stress.',
         '<25>{#f/0}* so i asked her...',
         '<25>{#f/2}* "wanna know what a skeleton does to pass the time?"',
         '<25>{#p/soriel}* "What do they do?"',
         '<25>{#p/sans}{#f/2}* i then proceeded to play a tune on my trombone.',
         '<25>{#f/4}* her being her, she INSTANTLY got the joke.',
         "<25>{#f/0}* ...that night ended up being the best night we'd ever have.",
         '<25>{#f/0}* fast-forward to today, and well...',
         "<25>{#f/2}* i've mostly just been watching over you.",
         "<25>{#f/0}* but hey, i'd say i'm doing a pretty good job, wouldn't you?",
         '<25>{#f/3}* i mean, look at yourself...',
         "<25>{#f/0}* you haven't died a single time.",
         ...(save.flag.n.deaths > 0
            ? [ '<25>{#f/0}* ...', "<25>{#f/0}* hey, what's that look supposed to mean?", '<25>{#f/2}* am i wrong...?' ]
            : [ '<25>{#f/2}* heh.\n* chalk it up to my great skills.' ])
      ],
      dinnerdate18: [ '<25>{#f/0}* heh.', '<25>{#f/0}* well, enjoy the food, and uh, i hope you learned something.' ],
      dinnerdate19: () => [
         "<25>{#f/3}* just remember, we're all rootin' for ya, kid.",
         ...(save.data.n.exp === 0
            ? [ "<25>{#f/2}* ...even undyne's probably on your side by now." ]
            : save.data.n.bad_lizard < 1
            ? [ "<25>{#f/0}* ...regardless of what you've done." ]
            : [ '<25>{#f/0}* ...well, most of us, anyway.' ])
      ],
      onionsan1: [ '<32>{#p/monster}* Hey there...\n* Noticed you were here...' ],
      onionsan1a: [ "<32>{#p/monster}* I'm Onionsan!\n* Onionsan, y'hear!" ],
      onionsan2: () =>
         world.goatbro
            ? [ "<32>{#p/monster}* You two, don't look like you're up to any good..." ]
            : [ "<32>{#p/monster}* You, look like you've traveled a long way to get here..." ],
      onionsan2a: () =>
         world.goatbro
            ? [ "<32>{#p/monster}* Good thing, the rec center people will always forgive us!\n* It's my Big Favorite." ]
            : [ "<32>{#p/monster}* Good thing, people like us are who the rec center is for!\n* It's my Big Favorite." ],
      onionsan3: [ "<32>{#p/monster}* Though...\n* I'm too wide to fit inside..." ],
      onionsan3a: [ '<32>{#p/monster}* Outer space makes onions grow Super Duper Fast.' ],
      onionsan3b: () =>
         world.goatbro
            ? [
                 "<32>{#p/monster}* But I'll find a path to betterment soon, y'hear!",
                 "<32>{#p/monster}* They're, gonna break the force field real good, y'hear!"
              ]
            : [
                 "<32>{#p/monster}* But I'll find a home soon, y'hear!",
                 "<32>{#p/monster}* They're, gonna break the force field real good, y'hear!"
              ],
      onionsan4: [ "<32>{#p/monster}* And then...\n* I'll venture out...\n* To the cosmos..." ],
      onionsan4a: [ "<32>{*}{#p/monster}* We're all gonna be freeeeeeeee eeeeeeeeeeeeeeeeeeeeeeeeee {^999}" ],
      onionsan4x: [ '<25>{#p/asriel2}{#f/8}* Sure, whatever.' ],
      candy1: pager.create(
         'limit',
         [
            '<32>{#p/narrator}* This vending machine can only synthesize filaments.',
            choicer.create('* (Buy a filament for 40 G?)', 8, 7, 'Yes', 'No')
         ],
         [ choicer.create('* (Buy a filament for 40 G?)', 8, 7, 'Yes', 'No') ]
      ),
      candy2: [ "<32>{#p/human}* (You don't have enough G.)" ],
      candy3: [ "<32>{#p/human}* (You're carrying too much.)" ],
      candy4: [ '<32>{#p/human}* (You got the filament.)' ],
      candy5: [ '<32>{#p/human}* (You decide not to pay.)' ],
      bedreceptionist1: pager.create(
         'limit',
         [
            '<32>{#p/monster}{#npc/a}* Welcome to four dimensions, the hotel where sleep meets the edge of perception.',
            "<32>* Once you reserve a room with us, it's yours forever.",
            "<32>* We've got a junior suite open on the left stack for 400G.\n* Interested?{#npc}",
            choicer.create('* (Own a room?)', 8, 7, 'Yes', 'No')
         ],
         [
            '<32>{#p/monster}{#npc/a}* 400G to own a junior suite.\n* Interested?{#npc}',
            choicer.create('* (Own a room?)', 8, 7, 'Yes', 'No')
         ]
      ),
      bedreceptionist2a: [
         '<32>{#p/monster}{#npc/a}* Thanks, we look forward to seeing you sleep safely and comfortably!'
      ],
      bedreceptionist2b: [ "<32>{#p/monster}{#npc/a}* Well, you're always welcome to change your mind." ],
      bedreceptionist3: [ "<32>{#p/monster}{#npc/a}* I'm afraid you don't have enough G for that." ],
      bedreceptionist4: [ '<32>{#p/monster}{#npc/a}* Thanks for purchasing a room at four dimensions!' ],
      core1: [
         '<32>{#p/event}* Ring, ring...',
         '<25>{#p/alphys}{#g/alphysSmileSweat}* ...h-hiya.',
         "<25>* That's the elevator to the CORE.",
         "<25>{#g/alphysWelp}* When you're ready, head down there and I'll... call you back."
      ],
      core2a: () =>
         [
            [
               '<32>{#p/event}* Ring, ring...',
               "<25>{#p/alphys}{#g/alphysSmileSweat}* Okay, we're here.",
               "<25>{#g/alphysSmileSweat}* I'll keep an open line between us while you're d-down here...",
               '<25>{#g/alphysWelp}* ...in case something bad happens.',
               '<25>{#g/alphysInquisitive}* The ELITE squad members here should be on break right now...',
               '<25>{#g/alphysNeutralSweat}* ...',
               '<25>{#g/alphysNeutralSweat}* No guarantees, though.'
            ],
            [
               '<32>{#p/event}* Ring, ring...',
               '<25>{#p/alphys}{#g/alphysWelp}* Okay, ready to continue?',
               '<25>{#g/alphysNeutralSweat}* Remember, g-gotta keep an eye out for the ELITE squad members.'
            ],
            [ '<32>{#p/event}* Ring, ring...', "<25>{#p/alphys}{#g/alphysWelp}* I'll be on the line." ]
         ][Math.min(save.data.n.state_aerialis_coreenter++, 2)],
      core2b: () =>
         [
            [
               "<25>{#p/alphys}{#g/alphysInquisitive}* If you're leaving the CORE, I'll hang up the phone for now.",
               "<25>{#g/alphysCutscene2}* I'll call you back when y-you return here!"
            ],
            [ '<25>{#p/alphys}{#g/alphysNervousLaugh}* Leaving again?', '<25>{#g/alphysWelp}* Alright then.' ],
            [
               '<25>{#p/alphys}{#g/alphysFR}* ...',
               '<25>{#g/alphysFR}* You better not be doing this just to see how I react.'
            ],
            [ '<25>{#p/alphys}{#g/alphysCutscene3}* ...' ]
         ][Math.min(save.data.n.state_aerialis_coreleave++, 3)],
      core3: [ '<25>{*}{#p/alphys}{#g/alphysShocked}* Watch out!{^999}' ],
      core4: () =>
         !save.data.b.killed_madjick
            ? [
                 '<25>{#p/alphys}{#g/alphysNervousLaugh}* Phew...',
                 "<25>{#g/alphysNeutralSweat}* L-let's hope that doesn't happen again."
              ]
            : save.data.n.bad_lizard === 0
            ? [
                 '<25>{#p/alphys}{#g/alphysSideSad}* No... why...',
                 '<25>{#g/alphysWorried}* ...',
                 "<25>* Couldn't there have been... another way?"
              ]
            : [
                 '<25>{#p/alphys}{#g/alphysSideSad}* No... why...',
                 '<25>{#g/alphysThatSucks}* ...',
                 "<25>* At least it won't be long until we're outta here."
              ],
      core5: [ '<25>{*}{#p/alphys}{#g/alphysOhGodNo}* Wait!!!{^999}' ],
      core6: () => [
         ...(!save.data.b.killed_knightknight
            ? [
                 '<25>{#p/alphys}{#g/alphysWelp}* ...',
                 ...(save.data.b.killed_madjick
                    ? [ '<25>{#g/alphysWelp}* At least you both survived this time.' ]
                    : [ '<25>{#g/alphysWelp}* On we press.' ])
              ]
            : save.data.b.killed_madjick || save.data.n.bad_lizard === 0
            ? [ '<25>{#p/alphys}{#g/alphysThatSucks}* ...', '<32>{#p/human}* (You hear a long, deep breath.)' ]
            : [
                 '<25>{#p/alphys}{#g/alphysWorried}* ...',
                 '<25>{#g/alphysWorried}* That should be the l-last of the engineers.'
              ]),
         '<25>{#p/alphys}{#g/alphysWelp}* The actual machine that powers the outpost is in the next room.',
         '<25>{#g/alphysInquisitive}* There are two p-paths you can take to unlock the door behind it...',
         "<25>* The puzzler's to the left, and the warrior's to the right.",
         '<25>{#g/alphysFR}* Both are... difficult.\n* But...',
         "<25>{#g/alphysWelp}* I'd suggest t-taking the puzzler's path.",
         "<25>{#g/alphysSideSad}* It's up to you, of course...",
         "<25>{#g/alphysHaveSomeCompassion}* But at least that way, you won't... risk a conflict."
      ],
      core8a: [
         "<25>{#p/alphys}{#g/alphysSide}* So you've decided on the puzzler's path.",
         '<25>{#g/alphysWelp}* Probably a smart choice.',
         "<25>{#g/alphysCutscene3}* The puzzles here are... uh, simple if you know what you're doing.",
         "<25>{#g/alphysCutscene2}* To summarize, though, it's really just a... big c-combination lock.",
         '<25>{#g/alphysWelp}* Use the switches to rotate each segment until they all line up.'
      ],
      core8a1: [ "<25>{#p/alphys}{#g/alphysInquisitive}* Unless you'd prefer the other path...?" ],
      core8b: [ "<25>{#p/alphys}{#g/alphysCutscene2}* That's one puzzle down." ],
      core8b1: [ "<25>{#p/alphys}{#g/alphysWelp}* I guess we're going this way now." ],
      core8c: [ '<25>{#p/alphys}{#g/alphysCutscene1}* You did it!\n* Now just hit the switch in the next room!' ],
      core8c1: [
         '<25>{#p/alphys}{#g/alphysInquisitive}* What are you doing...?',
         "<25>{#p/alphys}{#g/alphysFR}* Don't tell me you're switching paths NOW..."
      ],
      core8c2: [ '<25>{#p/alphys}{#g/alphysWTF}* You are.\n* You are going down the other path.' ],
      core8c3: [
         '<25>{#p/alphys}{#g/alphysInquisitive}* Okay, now you have two switches to hit.',
         '<25>{#p/alphys}{#g/alphysCutscene3}* Come on!'
      ],
      core8c4: [ '<25>{#p/alphys}{#g/alphysGarboCenter}* ...', '<25>* You are seriously testing my patience right now.' ],
      core9a: () => [
         "<25>{#p/alphys}{#g/alphysNeutralSweat}* So you've decided on the warrior's path.",
         ...(save.data.b.killed_knightknight && (save.data.b.killed_madjick || save.data.n.bad_lizard === 1)
            ? [ '<25>* ...', '<25>{#g/alphysCutscene3}* Can you... maybe not kill anyone else?\n* If possible?' ]
            : save.data.b.killed_knightknight || save.data.b.killed_madjick
            ? [ '<25>* ...', '<25>* This could be bad.' ]
            : [
                 "<25>{#g/alphysWelp}* We're certainly feeling adventurous today.",
                 "<25>* There's not much to it, you just gotta get through the guards.",
                 '<25>{#g/alphysCutscene2}* Uh... good luck?',
                 '<25>{#g/alphysCutscene3}* ...',
                 "<25>* Please don't die."
              ])
      ],
      core9a1: [
         "<25>{#p/alphys}{#g/alphysSide}* Oh, you're over here now.",
         "<25>{#g/alphysInquisitive}* Puzzler's path it is?"
      ],
      core9b: () =>
         save.data.b.a_state_corekill1
            ? [
                 '<25>{#p/alphys}{#g/alphysNeutralSweat}* ...',
                 save.data.b.killed_knightknight || save.data.b.killed_madjick
                    ? '<25>* This is hard to watch.'
                    : save.data.n.bad_lizard === 0
                    ? '<25>* D-did you... really have to do that?'
                    : '<32>{#p/human}* (You hear a small sigh.)'
              ]
            : [ "<25>{#p/alphys}{#g/alphysCutscene2}* You're past the first group!\n* Now for the second." ],
      core9b1: () =>
         save.data.b.a_state_corekill1
            ? [ '<25>{#p/alphys}{#g/alphysInquisitive}* Changed your mind...?' ]
            : [ "<25>{#p/alphys}{#g/alphysInquisitive}* Unless, of course, you're gonna take the other path...?" ],
      core9c: () =>
         save.data.b.a_state_corekill2
            ? [
                 '<25>{#p/alphys}{#g/alphysSideSad}* ...',
                 "<25>{#p/alphys}{#g/alphysSideSad}* Hit the switch in the next room, and we'll be outta this place."
              ]
            : [ '<25>{#p/alphys}{#g/alphysCutscene1}* You made it!\n* Now hit the switch in the next room!' ],
      core10a: [ '<25>{#p/alphys}{#g/alphysCutscene2}* Okay, y-you should be able to continue forward now.' ],
      core10b: [
         '<25>{#p/alphys}{#g/alphysWelp}* Oh, you came back.',
         '<25>{#g/alphysCutscene2}* Well, y-you should be able to continue forward now.'
      ],
      core10c: [ '<25>{#p/alphys}{#g/alphysFR}* Finally.' ],
      core11: [ '<25>{#p/alphys}{#g/alphysInquisitive}* Why are you going back this way?', '<25>{#g/alphysFR}* ...' ],
      core12: [ '<25>{#p/alphys}{#g/alphysCutscene3}* You could have reached the capital by now.' ],
      core13: [
         "<25>{#p/alphys}{#g/alphysGarbo}* Okay, so you've hit both switches.",
         '<25>{#p/alphys}{#g/alphysGarboCenter}* Happy now?'
      ],
      core14: [
         "<25>{#p/alphys}{#g/alphysWelp}* W-wait, there's a guard ahead.",
         '<25>{#p/alphys}{#g/alphysNeutralSweat}* Let me see if I can clear the way this time...',
         '<25>{#p/narrator}* ...',
         '<32>{#p/human}* (Yet again, the obligatory typing sounds resume.)',
         '<25>{#p/narrator}* ...',
         '<32>{#p/human}* (And yet again, they stop.)',
         "<25>{#p/alphys}{#g/alphysWorried}* No... they're not on the intercom system...",
         "<25>{#g/alphysWelp}* They don't even seem to be part of the staff.",
         '<25>{#g/alphysWelp}* ...',
         '<25>{#g/alphysUhButHeresTheDeal}* Well, this is bad!'
      ],
      core15: [ '<25>{#p/alphys}{#g/alphysNeutralSweat}* Is... is that it?\n* Are we clear?', '<25>* ...' ]
   },

   b_group_froggitexWhimsalot: () =>
      save.data.n.bad_lizard < 2
         ? [ '<32>{#p/alphys}* The first p-pair of guards.' ]
         : [ '<32>{#p/story}* Final Froggit and Flutterknyte appeared before you!' ],
   b_group_froggitexWhimsalotX: (froggitex: boolean) =>
      froggitex ? [ '<32>{#p/story}* Final Froggit hops alone...' ] : [ '<32>{#p/story}* Flutterknyte flies solo now...' ],
   b_group_astigmatism: () =>
      save.data.n.bad_lizard < 2
         ? [ '<32>{#p/alphys}* Not this guy...' ]
         : [ '<32>{#p/story}* The smiling eyes step forth!' ],
   b_group_rg: () =>
      world.goatbro ? [ '<32>{#p/asriel2}* RG 03 and 04.' ] : [ '<32>{#p/story}* The royal guard attacks!' ],
   b_group_spacetopTsundere: () =>
      world.goatbro ? [ "<32>{#p/asriel2}* It's these loons." ] : [ "<32>{#p/story}* It's a space-faring nightmare!" ],
   b_group_spacetopTsundereX: (spacetop: boolean) =>
      world.goatbro
         ? [ '<32>{#p/asriel2}* One left.' ]
         : spacetop
         ? [ '<32>{#p/story}* Only Astro Serf remains.' ]
         : [ '<32>{#p/story}* Only Tsunderidex remains.' ],
   b_group_pyropeTsundere: () =>
      world.goatbro ? [ "<32>{#p/asriel2}* It's these crazies." ] : [ "<32>{#p/story}* It's a fiery cavalry!" ],
   b_group_pyropeTsundereX: (pyrope: boolean) =>
      world.goatbro
         ? [ '<32>{#p/asriel2}* One left.' ]
         : pyrope
         ? [ '<32>{#p/story}* Only Hotwire remains.' ]
         : [ '<32>{#p/story}* Only Tsunderidex remains.' ],
   b_group_astigmatismMigospelX: [ '<32>{#p/story}* Eyewalker Prime takes charge of this battle!' ],

   b_opponent_glyde: {
      name: '* Glyde',
      act_check: [ '<32>{#p/story}* GLYDE - ATK YES DEF YES\n* Refuses to give more details about its statistics.' ],
      act_secret: () =>
         save.data.b.w_state_steak && save.data.b.w_state_soda
            ? [ '<32>{#p/narrator}* You told Glyde the secret given to you by Aaron.' ]
            : [ "<32>{#p/narrator}* You tried to tell Glyde a secret, but you don't have any secrets to tell." ],
      act_flirt1: [ '<32>{#p/narrator}* You asked Glyde out on a date.' ],
      act_flirt2: [ '<32>{#p/narrator}* You tried asking Glyde out on a date, but it was too distracted with itself.' ],
      fightEnder1: [
         '<20>{#p/monster}{~}{#e/glyde/4}...huh?',
         '<20>{~}Did you just say "triple beefcake deluxe?"',
         '<20>{~}{#e/glyde/9}...',
         '<20>{~}{#e/glyde/10}So...',
         "<20>{~}{#e/glyde/5}YOU'RE the one who purchased my product in the Outlands!",
         '<20>{~}And, not only that...',
         '<20>{~}But you remembered the password, too!'
      ],
      fightEnder2: [
         '<20>{#p/monster}{~}{#e/glyde/4}...huh?',
         '<20>{~}Did you just say "triple beefcake deluxe?"',
         '<20>{~}{#e/glyde/9}...',
         '<20>{~}{#e/glyde/10}So...',
         '<20>{~}{#e/glyde/5}Not only have you purchased my product...',
         '<20>{~}{#e/glyde/12}But you even remembered the password??'
      ],
      fightEnder3: [
         "<20>{~}{#e/glyde/5}Boy, you don't know how long I've been waiting to hear those wonderful words.",
         "<20>{~}{#e/glyde/12}What can I say except you're one freakadacious fella!",
         '<20>{~}{#e/glyde/9}...',
         "<20>{~}{#e/glyde/10}Tell you what.\nSince you're so kind, I'll get outta your way and go bother someone else.",
         '<20>{~}{#e/glyde/5}Kahaha!\nCatch ya on the flipside, G!'
      ],
      fightItem1: [
         '<20>{~}Woah, hey, is that what I think it is?',
         "<20>{~}Well I'll be stoked!\nAlways good to meet a happy customer.",
         '<20>{~}Anyway, as I was saying...'
      ],
      fightItem2: [
         '<20>{~}{#e/glyde/5}That too!?',
         "<20>{~}{#e/glyde/12}Well gee, human, you're not too shabby!",
         '<20>{~}{#e/glyde/9}...',
         "<20>{~}{#e/glyde/10}Tell you what.\nSince you're so kind, I'll get outta your way and go bother someone else.",
         '<20>{~}{#e/glyde/5}Kahaha!\nCatch ya on the flipside, G!'
      ],
      intro1: [ '<20>{#p/monster}{~}{#e/glyde/6}Kahaha, take that ya stupid robot!' ],
      intro2a: () =>
         save.data.n.bad_lizard < 2
            ? [ '<20>{#p/mettaton}ALPHYS AND I ARE STILL HERE, YOU KNOW.' ]
            : [ "<20>{#p/mettaton}I'M STILL HERE, YOU KNOW." ],
      intro2b: [ '<20>{#p/monster}{~}{#e/glyde/8}Quiet!\nThis is MY stage now, robo-freak.' ],
      intro2c: [ '<99>{#p/mettaton}(THIS IS ACTUALLY\nKIND OF INTERESTING...)' ],
      intro3: [ '<20>{#p/monster}{~}{#e/glyde/4}Boy have I got a story to tell!' ],
      status1: [ '<32>{#p/story}* Glyde crashes in!' ],
      turn1a: [
         '<20>{#p/monster}{~}{#e/glyde/10}Not gonna fight me, huh?',
         '<20>{~}{#e/glyde/0}...you do you, I guess.'
      ],
      turn1b: [
         '<20>{#p/monster}{~}{#e/glyde/7}Ooh, I like your fighting spirit.',
         "<20>{~}{#e/glyde/10}That'll serve you well very soon..."
      ],
      turn1c: [ "<20>{~}{#e/glyde/10}Kahaha... no offense, but you're kinda sorta the wrong species." ],
      turn1d: [ "<20>{~}{#e/glyde/9}Yeah, sorry, but I don't give out stats for free." ],
      turn1e: [
         "<20>{~}{#e/glyde/4}Some weeks ago, I'm musing over the moolah...",
         '<20>{~}{#e/glyde/0}And I notice a drop in profits.'
      ],
      turnStatus1: [ '<32>{#p/story}* Glyde sees its reflection and gets jealous.' ],
      turn2: [
         '<20>{#p/monster}{~}{#e/glyde/8}It turns out my one- hundred percent legit business...',
         '<20>{~}{#e/glyde/8}Is under fire for being a fraud!',
         '<20>{~}{#e/glyde/1}And I\'m thinking to myself "you\'ve gotta be kidding me."'
      ],
      turnStatus2: [ '<32>{#p/story}* Glyde is thinking of new slang for the word "cool."' ],
      turn3: [
         '<20>{#p/monster}{~}{#e/glyde/6}I can assure you that my steak enterprise is the rarest thing out there.',
         '<20>{~}Nothing compares to these fine fillets!',
         '<20>{~}You hear me?\nNothing!'
      ],
      turnStatus3: [ '<32>{#p/story}* An arrogant-smelling wind blows through.' ],
      turn4: [
         '<20>{#p/monster}{~}{#e/glyde/0}Why should you care?',
         '<20>{~}{#e/glyde/2}Because...',
         '<20>{~}{#e/glyde/2}Er...',
         "<20>{~}{#e/glyde/5}Because you're the only one who can save my sales figures!"
      ],
      turnStatus4: [ '<32>{#p/story}* Glyde does fancy flips.' ],
      turn5: [
         "<20>{#p/monster}{~}{#e/glyde/6}With MTT's precious human on my side, nothing can stop me!",
         "<20>{~}{#e/glyde/7}Even the great Papa Gliden could only dream of the profits we'd make together!"
      ],
      turn5a: [ "<20>{#p/alphys}I don't think attacking them is a great way to get them on your side." ],
      turn5b: [
         '<20>{#p/monster}{~}{#e/glyde/1}It\'s called a "show of strength," buck-teeth{#x1}.',
         '<20>{~}{#e/glyde/9}How else am I supposed to earn the respect of my business partners?'
      ],
      turn5c: [ "<20>{~}{#e/glyde/10}Exactly.\nYou don't know anything." ],
      turnStatus5: [ '<32>{#p/story}* Glyde is giving itself a high five... somehow.' ],
      turn6a: [ '<20>{#p/monster}{~}{#e/glyde/6}So whaddaya say, huh?' ],
      turn6b: [ '<20>{#p/monster}{~}Crud.' ],
      turn6c: () => [
         '<20>{#p/monster}{#e/bpants/12}Why do I ALWAYS end up taking out the trash around here?',
         '<20>...',
         '<20>{#e/bpants/0}Sorry for the trouble, little buddy.',
         "<20>{#e/bpants/11}I'm Burgie.\nNice to meet ya.",
         ...(world.population === 0
            ? [
                 "<20>{#e/bpants/6}Glyde's been a problem around here for...",
                 "<20>{#e/bpants/12}...hey, aren't you that kid who's been beating everyone up?"
              ]
            : [
                 "<20>{#e/bpants/6}Glyde's been a problem around here for quite a while...",
                 "<20>{#e/bpants/1}Hopefully this latest stunt will get it to realize nobody's buying its crap anymore."
              ])
      ],
      turn6d: [ '<20>{#p/mettaton}BURGERPANTS!', "<20>IT'S SO VERY GREAT TO SEE YOU." ],
      turn6e: [ "<20>{#p/monster}{#e/bpants/12}I don't work for you anymore. Get lost." ],
      turn6f: [ '<20>{#p/mettaton}WOW, SORRY...', "<20>I DIDN'T KNOW YOU DISLIKED ME THAT MUCH." ],
      turn6g: [
         '<20>{#p/monster}{#e/bpants/12}...',
         "<20>{#p/monster}{#e/bpants/2}I seriously just can't with this guy I swear to go- {%}"
      ],
      turn6h: [
         "<20>{#p/mettaton}A-NY-WAY WE HAVE THINGS TO GET TO SO IF YOU DON'T MIND {%}",
         '<20>WOULD YOU KINDLY GET OFF THE STAGE PLEASE AND THANK YOU HAVE A GREAT DAY.'
      ],
      hurtStatus: [ '<32>{#p/story}* Glyde is in danger.' ]
   },

   b_opponent_mettaton1: {
      name: '* Mettaton',
      old_gun_text: [ '<32>{#p/narrator}* You fire the gun.\n* Mettaton absorbs its charge.' ],
      old_bomb_text: [
         '<32>{#p/narrator}* You deploy the bomb.\n* The mist scatters about.\n* Mettaton revels in the scene.'
      ],
      old_spray_text: [ '<32>{#p/narrator}* You use the spray.\n* Smells like pepper.\n* Mettaton eats it up.' ],
      old_gun_talk: [ '<20>{#p/mettaton}HOW STUNNING A MOVE.' ],
      old_bomb_talk: [ "<20>{#p/mettaton}IT'S LIKE A RENT-FREE MIST MACHINE!" ],
      old_spray_talk: [ '<20>{#p/mettaton}SPICY.' ],
      status1: () =>
         save.data.n.plot < 67
            ? [ '<32>{#p/story}* Mettaton swings into action!' ]
            : [ '<32>{#p/story}* Mettaton returns!' ],
      act_check: [ '<32>{#p/story}* METTATON - ATK 30 DEF 255\n* His metal body renders him invulnerable to attack.' ],
      act_flirt: [ '<32>{#p/narrator}* You flirt with Mettaton.' ],

      yellow1: [
         '<20>{#p/mettaton}WHAT IS IT WITH YOU AND THE COLOR RED?{^40}{%}',
         "<20>{#p/mettaton}{#x1}YOU SHOULD KNOW BY NOW THAT'S NOT GOING TO FLY HERE...{^40}{%}"
      ],
      yellow2: [ '<20>{#p/mettaton}WOW!!!\nSO MUCH BETTER!!!\nNOW YOU CAN PRESS [Z] TO SHOOT!!!{^40}{%}' ],

      checkTalk: [ "<20>{#p/mettaton}ADMIRING ALPHYS'S FABOLOUS BODYWORK?\nI WON'T JUDGE." ],
      attackTalk: () =>
         save.data.n.plot < 67
            ? [ "<20>{#p/mettaton}YOU SILLY GOOSE.\nTHAT'S NOT GOING TO WORK ON ME, SWEETHEART!" ]
            : save.data.b.a_state_hapstablook
            ? [ "<20>{#p/mettaton}LISTEN, SWEETHEART.\nIF YOU WANT A REAL FIGHT, THIS ISN'T THE PLACE FOR IT." ]
            : [ "<20>{#p/mettaton}ATTACKING ME WON'T DO YOU ANY FAVORS, SWEETHEART." ],
      flirtTalk: [ '<20>{#p/mettaton}OHOHO...', '<20>GETTING FRISKY, EH?', "<20>I'LL HAVE TO REMEMBER THAT, DARLING~" ],

      turn1: [
         "<20>{#p/mettaton}LET'S START WITH SOMETHING SIMPLE...",
         '<20>SINGING!',
         '<20>DO YOU HAVE WHAT IT TAKES TO- {%}'
      ],
      turn1a1: [ '<20>...\nWAIT A SECOND.', '<20>IS IT JUST ME, OR...', '<20>DO YOU LOOK A LITTLE "RED" TODAY?' ],
      turn1a2: [ '<20>DOCTOR, IF YOU COULD...' ],
      turn1b1: () => (save.data.n.bad_lizard < 1 ? [ '<20>{#p/alphys}Uh, sure!' ] : [ '<20>{#p/alphys}...hm?' ]),
      turn1b2: () =>
         save.data.n.bad_lizard < 1 ? [ '<20>{#p/alphys}F-forgive me...' ] : [ '<20>{#p/alphys}O-oh yeah, that.' ],
      turn1c: [ '<20>{*}{#p/mettaton}MUCH BETTER.{^30}{%}' ],
      turn1d: () =>
         save.data.n.bad_lizard < 1
            ? [ '<20>{*}{#p/alphys}So... y-you move around, then you use [Z] to jump!{^30}{%}' ]
            : [ '<20>{*}{#p/alphys}You move around, then you use [Z] to jump.{^30}{%}' ],
      turn1e: [ '<20>{*}{#p/mettaton}ALPHYS, ALPHYS, ALPHYS...{^30}{%}' ],
      turn1f: [ '<20>{*}WHAT HAVE I TOLD YOU ABOUT HANDING OUT HINTS?{^30}{%}' ],
      turn1g: [ '<20>{*}...{^30}{%}', '<20>{*}ANYWAY...{^30}{%}', "<20>{*}LET'S GET THIS SHOW ON THE ROAD!{^30}{%}" ],

      turn2: [ "<20>{#p/mettaton}DON'T MISS A SINGLE NOTE, MY DEAR!" ],
      turn3: [ "<20>{#p/mettaton}LET'S KICK THINGS UP A NOTCH." ],

      turn4a1: [
         "<20>{#p/mettaton}I MUST SAY, YOU'RE HANDLING THIS LIKE A TRUE ICON.",
         '<20>BUT, CAN YOU GO FIN-TO-FIN WITH OUR SPECIAL GUEST?'
      ],
      turn4a2: [
         "<20>{#p/mettaton}I MUST SAY, YOUR PERFORMANCE THUS FAR HASN'T BEEN THE BEST.",
         '<20>PERHAPS WHAT YOU NEED IS A LITTLE COMPETITION!'
      ],
      turn4e: [ '<20>{#p/mettaton}...', '<20>WHERE IS...' ],
      turn4f: [ "<20>{#p/monster}She's dead." ],
      turn4g: [ "<20>{#p/mettaton}OH.\nTHAT'S A SHAME." ],
      turn4h: [ '<20>{#p/mettaton}DEAR AUDIENCE... LET US OFFER A MOMENT OF SILENCE FOR SHYREN.' ],
      turn4i: [ '<20>{#p/mettaton}OKAY, MOMENT OVER.' ],
      turn4j: [
         '<20>{#p/mettaton}LUCKY YOU!',
         '<20>I GUESS YOU GET TO SKIP THIS PART.',
         "<20>IT'S A REAL SHAME WE CAN'T KEEP SINGING, BUT HEY...",
         '<20>WHEN ONE ACT ENDS, ANOTHER MUST BEGIN.',
         "<20>...LET'S DANCE!"
      ],

      turn5a1: [ "<20>{#p/mettaton}GIVE IT ALL YOU'VE GOT, SHYREN!" ],
      turn5a2: () =>
         save.data.b.bullied_shyren
            ? [ '<20>{#p/mettaton}SHYREN...?' ]
            : [
                 '<20>{#p/mettaton}ENCHANTING, EH?',
                 "<20>{#p/mettaton}DON'T WORRY.\nSHYREN'S VOICE DOES THAT TO EVERYONE."
              ],

      turn5end1: () =>
         save.data.b.bullied_shyren
            ? [
                 "<20>{#p/mettaton}...MAYBE SHYREN'S JUST NOT FEELING IT TODAY.",
                 '<20>HOW TRAGIC.',
                 '<20>BY THE WAY, DID I MENTION YOUR VOICE IS GETTING BORING?'
              ]
            : [
                 "<20>{#p/mettaton}OH, SHYREN IS JUST LOVELY, ISN'T SHE?",
                 "<20>IF I HAD MY WAY WITH HER, SHE'D BE A SUPERSTAR ALREADY...",
                 '<20>OH WELL. BY THE WAY, DID I MENTION YOUR VOICE IS GETTING BORING?'
              ],
      turn5end2: [
         "<20>BUT DON'T WORRY, THE SOLUTION HERE IS OBVIOUS.",
         "<20>AS ANY GOOD SHOW-BOT KNOWS, YOU CAN'T HAVE THE SONG...",
         '<20>...WITHOUT THE DANCE!'
      ],

      turn6: [ '<20>{#p/mettaton}BRING IT ON!' ],

      turn7a: [
         '<20>{#p/mettaton}DO YOU HEAR THAT, DARLING...?',
         "<20>...THAT'S RIGHT.",
         '<20>THE VIEWERS ARE STARVING FOR SOME DRAMA!',
         '<20>QUEUE THE OBLIGATORY ANGRY MANNEQUIN.'
      ],
      turn7b1: [ '<20>{#p/monster}You again.' ],
      turn7b2: [ '<20>{#p/monster}You again!' ],
      turn7b3: [ '<20>{#p/monster}YOU AGAIN!!!' ],
      turn7c: [ '<20>{#p/mettaton}OH, DO YOU TWO KNOW EACH OTHER?' ],
      turn7d1: [ '<20>{#p/monster}...\nMaybe.\nMaybe not.' ],
      turn7d2: [ "<20>{#p/monster}LIKE YOU'D CARE!" ],
      turn7e: [
         '<20>{#p/mettaton}WOAH, NO NEED TO GET HOSTILE...',
         '<20>{#p/mettaton}THIS IS BUT A HUMBLE TALENT SHOW!'
      ],
      turn7f: [
         "<20>{#p/monster}And this is the second time in two weeks that you've had me on!",
         '<20>{#p/monster}Do you have a crush on me or something!?'
      ],
      turn7g1: [
         "<20>{#p/mettaton}...\nDON'T BE RIDICULOUS.",
         "<20>{#p/mettaton}I'VE ONLY BROUGHT YOU ON BECAUSE YOU'RE A MAGNET FOR DRAMA!"
      ],
      turn7g2: [ "<20>{#p/monster}(That's what my cousin used to say...)" ],
      turn7h: [ '<20>{#p/monster}Oh, hey.\nGood to see you!' ],
      turn7i: [ "<20>{#p/mettaton}THAT'S IT...?", '<20>{#p/mettaton}NOTHING ELSE TO SAY...?' ],
      turn7j1: [ "<20>{#p/monster}You know, Mettaton, I'm not ALWAYS mad at everyone." ],
      turn7j2: [ "<20>{#p/monster}...didn't I tell you this when you brought me on two weeks ago?" ],
      turn7k: [
         "<20>{#p/mettaton}OH.\nTHAT'S NICE.",
         "<20>{#p/mettaton}BUT WE DON'T HAVE TIME FOR YOUR LOVEY-DOVEY NONSENSE."
      ],
      turn7l1: [ '<20>{#p/monster}Yeah, yeah...', "<20>{#p/monster}(Wait, that's what my cousin used to say...)" ],
      turn7l2: [ "<20>Okay, I'll deal." ],
      turn7l3: [ "<20>If a fight's what you want, then a fight's what you'll get!" ],
      turn7m: [ '<20>{#p/mettaton}WELL, THIS SHOULD BE INTERESTING.' ],
      turn7n: [ '<20>{#p/mettaton}UH... HELLO?' ],
      turn7o1: [ '<20>{#p/mettaton}...', 'IT SEEMS OUR POOR, POOR HUMAN HAS BEEN LEFT WITHOUT A DANCE PARTNER.' ],
      turn7o2: [
         '<20>{#p/mettaton}...',
         "<20>YOU'RE ON A HOT STREAK TODAY, DARLING.",
         "<20>SEEMS NOBODY'S INTERESTED OR ALIVE ENOUGH TO FACE YOU.",
         '<20>OH WELL...',
         '<20>THE SHOW MUST GO ON!'
      ],

      turn8a1: [ '<20>{#p/mettaton}NO HOLDING BACK, DUMMY!' ],
      turn8a2: [ '<20>{#p/mettaton}TOO MUCH COTTON TO HANDLE, HUH?', '<20>{#p/mettaton}WELL, TOO BAD!' ],

      turn8end1a: [
         "<20>{#p/mettaton}TO SAY I'M IMPRESSED WOULD BE AN UNDERSTATEMENT!",
         "<20>YOU'VE ABSOLUTELY NAILED IT.",
         '<20>DEAR VIEWERS, DO TAKE NOTES...',
         '<20>-THIS- IS HOW YOU PUT ON A SHOW.'
      ],
      turn8end1b: [
         '<20>{#p/mettaton}YOU MAY NOT HAVE THE GREATEST VOCAL CHOPS, BUT THIS DANCING... OOOOH!',
         '<20>SIMPLY SUPERB.'
      ],
      turn8end3a: [
         "<20>{#p/mettaton}...I HONESTLY DON'T UNDERSTAND HOW YOU CAN BE THIS BAD.",
         '<20>ESPECIALLY AFTER YOU DID SO WELL EARLIER.',
         '<20>OH WELL.\nIT HAPPENS, I GUESS.'
      ],
      turn8end3b: [
         '<20>{#p/mettaton}...HAS ANYONE EVER TOLD YOU HOW MUCH YOU SUCK?',
         '<20>SCREWING UP A VOCAL PERFORMANCE WAS ONE THING.',
         '<20>BUT THIS...?\nTHIS IS JUST SAD.'
      ],
      turn8end4: [ '<20>{#p/mettaton}ALAS... WE STILL HAVE ONE MORE ACT TO FOLLOW.' ],
      turn8end5: [ '<20>{#p/mettaton}BEAUTIES AND GENTLEBEAUTIES...', '<20>GIVE IT UP...' ],
      turn8end6: [ '<20>FOR THE ONE AND ONLY DR. ALPHYS!' ],

      turn9a: [ "<20>{#p/mettaton}PROVE TO ME YOU'VE GOT WHAT IT TAKES TO BE A STAR!" ],
      turn9b: () =>
         save.data.n.bad_lizard < 1
            ? [ '<20>{*}{#p/alphys}Are you k-kidding?{^30}{%}' ]
            : [ '<20>{*}{#p/alphys}{#e/alphys/7}...' ],
      turn9c: [ "<20>{*}{#p/alphys}I don't...{^30}{%}" ],
      turn9d: [ '<20>{*}{#p/alphys}I...{^30}{%}' ],
      turn9e: () =>
         save.data.n.bad_lizard < 1
            ? [ "<20>{*}{#p/alphys}I c-can't do it!{^30}{%}" ]
            : [ "<20>{*}{#p/alphys}{#e/alphys/4}I'm not sure if this is a good idea.{^30}{%}" ],

      turn9end1: [ '<20>{#p/mettaton}IS THERE A PROBLEM, DEAR?' ],
      turn9end2: () => [
         ...[
            [
               "<20>{#p/alphys}{#e/alphys/4}I don't want t-to hurt them, Mettaton...",
               '<20>{#p/alphys}{#e/alphys/7}We might have a rough history with humans, but...',
               "<20>{#e/alphys/6}That doesn't mean this human can't be different, right?",
               "<20>{#e/alphys/8}So... I think it's totally unfair to keep attacking them for it."
            ],
            [
               "<20>{#p/alphys}{#e/alphys/7}I know they've made some... pretty bad mistakes...",
               '<20>{#p/alphys}{#e/alphys/6}But, then again, with the way some monsters have treated them...?',
               "<20>{#p/alphys}{#e/alphys/8}That's no surprise.",
               "<20>{#p/alphys}{#e/alphys/4}And also, I'm... k-kind of afraid I might hurt them..."
            ]
         ][save.data.n.bad_lizard]
      ],
      turn9end3: [ '<20>{#p/mettaton}HMM...', '<20>YOU MAKE AN INTERESTING POINT, DOCTOR.' ],
      turn9end4: [ "<20>BUT I'M AFRAID I HAVE TO DISAGREE{#e/alphys/1}." ],
      turn9end5: [
         '<20>FOR ONE, CONFLICT IS THE HEART OF GOOD TV DRAMA{#e/alphys/2}!',
         '<20>AND WHO COULD SAY NO TO THAT.'
      ],
      turn9end6: [
         "<20>{#p/mettaton}{#e/alphys/0}WELL, ANYWAY, WE'RE KIND OF OUT OF TIME.",
         "<20>SO... THAT'LL HAVE TO BE ALL FOR NOW.",
         '<21>STAY TUNED, FOLKS!\nTHE NEXT EPISODE IS ALREADY IN THE WORKS.',
         "<20>YOU WON'T WANT TO MISS IT."
      ],
      turn9end7: [ '<20>{#p/alphys}Welp.' ],

      turn1status: [ "<32>{#p/story}* It's electro-shockin' time." ],
      turn2status: [ '<32>{#p/story}* Mettaton claps his robo-hands.' ],
      turn3status: [ "<32>{#p/story}* It's a flurry of octaves." ],
      turn4status: [ "<32>{#p/story}* Shyren's voice echoes through the labratory." ],
      turn4statusX: [ '<32>{#p/story}* Mettaton dare not shed a tear.' ],
      turn5status: [ '<32>{#p/story}* Mettaton busts a move.' ], // ((we love infected mushroom))
      turn6status: [ '<32>{#p/story}* Funk overload in progress.' ],
      turn7status: [ '<32>{#p/story}* Smells like a madhouse.' ],
      turn7statusX: [ '<32>{#p/story}* Mettaton is fiddling with his microphone.' ],
      turn8status: [ '<32>{#p/story}* Mettaton points dramatically at the camera.' ],

      turn2react1: [ '<20>{#p/mettaton}NICE!' ],
      turn3react1: [ '<20>{#p/mettaton}VERY NICE!' ],
      turn4react1: [ '<20>{#p/mettaton}FABULOUS!' ],
      turn5react1: [ '<20>{#p/mettaton}OUTSTANDING!' ],
      turn6react1: [ '<20>{#p/mettaton}STELLAR!' ],
      turn7react1: [ "<20>{#p/mettaton}THAT'S THE WAY!" ],
      turn8react1: [ "<20>{#p/mettaton}SHOW 'EM HOW IT'S DONE!" ],
      turn8reactMD1a: [ '<20>{#p/monster}Well, that was a blast!', '<20>{#p/monster}See ya next time, human!' ],
      turn8reactMD2a: [ '<20>{#p/monster}...', '<20>{#p/monster}Never again.' ],

      turn2react2: [ '<20>{#p/mettaton}OOPS...' ],
      turn3react2: [ '<20>{#p/mettaton}SO CLOSE...' ],
      turn4react2: [ '<20>{#p/mettaton}HOW UNLUCKY...' ],
      turn5react2: [ '<20>{#p/mettaton}HOW UNFORTUNATE...' ],
      turn6react2: [ '<20>{#p/mettaton}FAILURE!' ],
      turn7react2: [ '<20>{#p/mettaton}DISAPPOINTING.' ],
      turn8react2: [ '<20>{#p/mettaton}WHAT. WAS. THAT.' ],
      turn8reactMD1b: [ "<20>{#p/monster}Hope I didn't go too hard on you.", '<20>{#p/monster}See ya next time, human!' ],
      turn8reactMD2b: [ '<20>{#p/monster}Pathetic.\nPathetic!\nPATHETIC!', '<20>{#p/monster}Serves you right.' ],
      missIndicator: 'Misses: $(x)',

      idleTalk1: [
         "<20>{#p/mettaton}SO WE'VE MADE IT TO THE END, EH?",
         "<20>{#p/mettaton}HOW DOES IT FEEL KNOWING YOU'RE ABOUT TO BE A SUPERSTAR?"
      ],
      idleTalk2: [ '<20>{#p/mettaton}I\'M SURE YOU\'RE ITCHING TO "TURN" YOUR LIFE AROUND.' ],
      idleTalk3: [ '<20>{#p/mettaton}LET\'S JUST HOPE THIS SHOW DOESN\'T TAKE A "TURN" FOR THE WORST.' ],
      idleTalk4: [ '<20>{#p/mettaton}I MUST SAY, HAVING YOU ON STAGE WITH ME IS A REAL "TURN" ON.' ],
      idleTalk5: [ "<20>{#p/mettaton}(YOU'RE SUPPOSED TO TURN ME AROUND.)" ],
      idleTalk6: [ '<20>{#p/mettaton}...' ],
      flirtTalk1: () =>
         save.data.b.flirt_mettaton
            ? [
                 "<20>{#p/mettaton}I SEE YOU'RE BACK TO YOUR FLIRTATIOUS WAYS...",
                 '<20>{#p/mettaton}YOU, MY FRIEND, ARE A TRUE MENACE TO SOCIETY.'
              ]
            : [
                 '<20>{#p/mettaton}OHOHO...',
                 '<20>GETTING FRISKY, EH?',
                 '<20>HMM, MAYBE YOU SHOULD HOLD OFF ON THAT FOR NOW.'
              ],
      flirtTalk2: () =>
         save.data.b.flirt_mettaton
            ? [ "<20>{#p/mettaton}DON'T YOU EVER KNOW WHEN TO QUIT?" ]
            : [ '<20>{#p/mettaton}OR YOU COULD JUST KEEP GOING...' ],
      flirtTalk3: () =>
         save.data.b.flirt_mettaton ? [ '<20>{#p/mettaton}I GUESS NOT.' ] : [ '<20>{#p/mettaton}AND GOING...' ],
      flirtTalk4: [ "<20>{#p/mettaton}...\nI FEEL LIKE THERE'S SOMETHING BETTER YOU COULD BE DOING." ],
      flirtTalk5: [ '<20>{#p/mettaton}...' ],
      act_turn: [ '<32>{#p/narrator}* You told Mettaton there was a mirror behind him.' ],
      turnTalk1: [ '<20>{#p/mettaton}A MIRROR, YOU SAY?', '<20>OH RIGHT, I HAVE TO LOOK PERFECT FOR OUR GRAND FINALE!' ],
      turnTalk2: [ "<20>{#p/mettaton}HMM, WHERE IS IT?\nI DON'T SEE IT..." ],
      turnTalk3: [ '<20>{#p/mettaton}DID YOU.', '<20>JUST FLIP.', '<20>MY SWITCH??' ],
      turnTalk4: [
         '<18>{#p/mettaton}Ohhhh my.',
         '<18>If you flipped my switch, that can only mean one thing.',
         "<18>You're desperate for the premiere of my new body.",
         '<18>How impatient...',
         "<18>Lucky for you, I've been aching to show it off for a long time.",
         "<18>So, as thanks, I'll give you a handsome reward.",
         "<18>I'll make your last living moments..."
      ],
      turnTalk5: [ '<20>{#p/mettaton}...absolutely beautiful!' ],
      act_burn: [ '<32>{#p/narrator}* You roasted Mettaton on his own TV show...\n* Big mistake.' ],
      burnTalk1: [ '<20>{#p/mettaton}IS THAT THE BEST YOU CAN MANAGE?' ],
      burnTalk2: [ '<20>{#p/mettaton}EVEN ALPHYS HAS BETTER ROASTS THAN THAT.' ],
      burnTalk3: [ "<20>{#p/mettaton}NO OFFENSE, BUT YOU'RE NOT VERY GOOD AT THIS." ],
      burnTalk4: [ '<20>{#p/mettaton}...\nMAYBE YOU SHOULD TRY SOMETHING ELSE.' ],
      burnTalk5: [ '<20>{#p/mettaton}...' ]
   },

   b_opponent_mettaton2: {
      name: () => (world.genocide ? '* Mettaton NEO' : '* Mettaton EX'),
      spannerReaction: (repeat: boolean) =>
         world.genocide
            ? [ '<32>{#p/narrator}* Mettaton blasts it out of the air before it even hits the ground.' ]
            : repeat
            ? [ '<32>{#p/narrator}* Mettaton catches it in his mouth and throws it back.\n* The crowd yawns...' ]
            : [ '<32>{#p/narrator}* Mettaton catches it in his mouth and throws it back.\n* The crowd goes wild!' ],
      artifactReaction: (repeat: boolean) =>
         world.genocide
            ? [ '<32>{#p/narrator}* Mettaton rolls his eyes.' ]
            : repeat
            ? [ '<32>{#p/narrator}* The crowd continues to be in disbelief.' ]
            : [ '<32>{#p/narrator}* The crowd is in disbelief...!' ],
      old_gun_text: () =>
         world.genocide
            ? [ '<32>{#p/narrator}* You fire the gun.\n* Nothing happened.' ]
            : [ '<32>{#p/narrator}* You fire the gun.\n* The audience is stunned!' ],
      old_bomb_text: () =>
         world.genocide
            ? [ '<32>{#p/narrator}* You deploy the bomb.\n* The mist scatters about.\n* Nothing happened.' ]
            : [ '<32>{#p/narrator}* You deploy the bomb.\n* The mist scatters about.\n* The audience is daydreaming!' ],
      old_spray_text: () =>
         world.genocide
            ? [ '<32>{#p/narrator}* You use the spray.\n* Smells like pepper.\n* Nothing happened.' ]
            : [ '<32>{#p/narrator}* You use the spray.\n* Smells like pepper.\n* The audience is in shambles!' ],
      act_check: () =>
         world.genocide
            ? [ "<32>{#p/asriel2}* Mettaton NEO.\n* Shouldn't you be attacking him or something?" ]
            : [
                 "<32>{#p/story}* METTATON EX - ATK 47 DEF 255\n* Alphys's greatest invention.\n* Still invulnerable to attack."
              ],
      tvmReaction: {
         radio: [
            '<32>{#p/narrator}* You gave Mettaton the radio.\n* Mettaton does karaoke.\n* The audience sings along.'
         ],
         fireworks: [
            '<32>{#p/narrator}* You gave Mettaton fireworks.\n* Mettaton sets them off.\n* The audience is in awe.'
         ],
         mewmew: [
            '<32>{#p/narrator}* You gave Mettaton the doll.\n* Mettaton presents it boldly.\n* The audience is in love.'
         ]
      },
      act_boast: [
         "<32>{#p/narrator}* You say you aren't going to get hit at ALL.",
         "<32>* Ratings gradually increase during Mettaton's turn."
      ],
      act_heel: [
         '<32>{#p/narrator}* You turn and scoff at the audience.',
         "<32>* They're rooting for your destruction this turn!"
      ],
      act_pose1: [ '<32>{#p/narrator}* You pose dramatically.\n* The audience nods.' ],
      act_pose2: [ '<32>{#p/narrator}* Despite being hurt, you posed dramatically.\n* The audience applauds.' ],
      act_pose3: [ '<32>{#p/narrator}* Despite being wounded, you posed dramatically.\n* The audience gasps.' ],
      act_pose4: [ '<32>{#p/narrator}* With the last of your power, you posed dramatically.\n* The audience screams.' ],
      act_scream: [ "<32>{#p/narrator}* You scream.\n* The audience gets riled up!\n* You'll move slower this turn." ],
      act_flirt1: [ '<32>{#p/narrator}* You flirt with the audience.\n* They seem unreceptive...' ],
      act_flirt2: [ '<32>{#p/narrator}* You flirt with the audience.\n* They seem interested.' ],
      act_flirt3: [ '<32>{#p/narrator}* You flirt with the audience.\n* That got their attention!' ],
      act_flirt4: [ "<32>{#p/narrator}* You flirt with the audience.\n* They're completely enthralled!" ],
      status1: () =>
         [
            [ '<32>{#p/asriel2}* Orange, huh?\n* Watch out, $(name)... things are about to get explosive.' ],
            [ '<32>{#p/asriel2}* Here we go again.' ]
         ][Math.min(save.flag.n.azzy_neo++, 1)],
      statusX: () =>
         world.genocide
            ? [
                 [ '<32>{#p/asriel2}* This is our fight, $(name).' ],
                 [ "<32>{#p/asriel2}* Let's end this thing for good." ],
                 [ '<32>{#p/asriel2}* Nothing can stop us now.' ],
                 [ '<32>{#p/asriel2}* Nobody can get in our way.' ],
                 [ '<32>{#p/asriel2}* The end is near.' ],
                 [ '<32>{#p/asriel2}* Time to break through.' ],
                 [ "<32>{#p/asriel2}* We're gonna smash that shield." ],
                 [ '<32>{#p/asriel2}* Down with the shield!' ],
                 [ "<32>{#p/asriel2}* Let's finish the job." ]
              ][battler.rand(7, true)]
            : [ '<32>{#p/story}* Mettaton.' ],
      turnTalk1: () => [ '<20>{#p/mettaton}Lights!\nCamera!\nAction!' ],
      turnTalk2: () =>
         save.data.b.a_state_hapstablook
            ? [ '<20>{#p/mettaton}Ghosts!\nDummies!\n...snails?' ]
            : save.data.n.bad_lizard < 2
            ? [ '<20>{#p/mettaton}Drama!\nRomance!\nBloodshed!' ]
            : [ '<20>{#p/mettaton}Karma!\nVengeance!\nPayback!' ],
      turnTalk3: () =>
         save.data.b.a_state_hapstablook
            ? [ "<20>{#p/mettaton}I'm on my redemption arc!" ]
            : save.data.n.bad_lizard < 2
            ? [ "<20>{#p/mettaton}I'm the idol everyone craves!" ]
            : [ "<20>{#p/mettaton}I'll be the galaxy's superstar!" ],
      turnTalk4: () =>
         save.data.b.a_state_hapstablook
            ? [ "<20>{#p/mettaton}(That doesn't mean I'm doing autographs.)" ]
            : save.data.n.bad_lizard < 2
            ? [ '<20>{#p/mettaton}Smile for the camera, darling!' ]
            : [ '<20>{#p/mettaton}Smile for the camera, hotshot!' ],
      turnTalk5: () =>
         save.data.n.bad_lizard < 2
            ? [
                 "<20>{#p/mettaton}Oooh, it's time for a pop quiz!",
                 '<20>{#p/mettaton}I sure hope you know your multiple- choice...'
              ]
            : [
                 "<20>{#p/mettaton}Oooh, here's a pop quiz for you.",
                 "<20>{#p/mettaton}Don't like multiple- choice?\nToo bad!"
              ],
      turnTalk6: () =>
         save.data.n.state_aerialis_mttanswer === 0
            ? [ '<20>{#p/mettaton}That pop quiz was underwhelming...', "<20>{#p/mettaton}But this won't be!" ]
            : save.data.n.bad_lizard < 2
            ? [
                 "<20>{#p/mettaton}Your answer really showed everyone what's on your mind.",
                 "<20>{#p/mettaton}Why don't I show you what's in my heart?"
              ]
            : [ '<20>{#p/mettaton}So you do like multiple choice.', "<20>{#p/mettaton}Well, you won't like this!" ],
      turnTalk7: () =>
         save.data.b.a_state_hapstablook
            ? [ "<20>{#p/mettaton}It's about to get real up in here!" ]
            : save.data.n.bad_lizard < 2
            ? [ "<20>{#p/mettaton}It's about to get wild up in here!" ]
            : [ "<20>{#p/mettaton}The battle's only just begun!" ],
      turnTalk8: () =>
         save.data.n.bad_lizard < 2
            ? [ '<20>{#p/mettaton}Can you keep up the pace?' ]
            : [ '<20>{#p/mettaton}Turn it up to eleven!' ],
      turnTalk9: () =>
         save.data.b.a_state_hapstablook
            ? [ '<20>{#p/mettaton}Lights!\nCamera!\nFireworks!' ]
            : save.data.n.bad_lizard < 2
            ? [ '<20>{#p/mettaton}Lights!\nCamera!\nPlastic explosives!' ]
            : [ '<20>{#p/mettaton}Destruction!\nAnnihilation!\nArmageddon!' ],
      turnTalk10: () =>
         save.data.b.a_state_hapstablook
            ? [ '<20>{#p/mettaton}Things are going viral!' ]
            : save.data.n.bad_lizard < 2
            ? [ '<20>{#p/mettaton}Things are blowing up!' ]
            : [ '<20>{#p/mettaton}Things are going crazy!' ],
      turnTalk11: () =>
         save.data.n.bad_lizard < 2
            ? [ '<21>{#p/mettaton}Time for our council- regulated break!' ]
            : [ "<20>{#p/mettaton}Can't catch a break?\nSucks to be you!" ],
      turnTalk12: () =>
         save.data.n.bad_lizard < 2
            ? [
                 "<20>{#p/mettaton}We've grown so distant, darling...",
                 '<20>{#p/mettaton}How about another heart-to-heart?'
              ]
            : [
                 "<20>{#p/mettaton}I think it's time you learned your lesson.",
                 "<20>{#p/mettaton}Here's something you can take to heart!"
              ],
      turnTalk13: () =>
         save.data.b.a_state_armwrecker
            ? [ '<20>{#p/mettaton}A... arms?\nWh... who needs arms with legs like these?' ]
            : [ "<20>{#p/mettaton}Is... is that all you've got?" ],
      turnTalk14: () =>
         save.data.b.a_state_hapstablook
            ? [ '<20>{#p/mettaton}Shoutout t-to... to all my cousins watching at home!' ]
            : save.data.n.bad_lizard < 2
            ? [ '<20>{#p/mettaton}Shoutout t-to... to Dr. Alphys for making my dreams come true!' ]
            : [ "<20>{#p/mettaton}Shoutout t-to... to the ones who've given their lives to protect us!" ],
      turnTalk15: () =>
         save.data.b.a_state_hapstablook
            ? [ "<20>{#p/mettaton}I hope you're enjoying th... the show!" ]
            : save.data.n.bad_lizard < 2
            ? [ "<20>{#p/mettaton}Now it's my turn to fulfill yo... yours!" ]
            : [ "<20>{#p/mettaton}I'll make sure your efforts wer... weren't in vain!" ],
      turnTalk16: () =>
         save.data.b.a_state_hapstablook
            ? [ '<20>{#p/mettaton}Because I ce... certainly am!' ]
            : save.data.n.bad_lizard < 2
            ? [ "<20>{#p/mettaton}I wouldn't ha... have it any other way!" ]
            : [ "<20>{#p/mettaton}It's the le... least I can do!" ],
      turnTalk17: () => [ '<20>{#p/mettaton}{#e/mettaton/12}H... haah...\nH... haah...' ],
      turnTalk18: () => [ '<20>{#p/mettaton}{#e/mettaton/13}The show must go on...!' ],
      turnTalk19: () => [ '<20>{#p/mettaton}{#e/mettaton/14}L... losing power...' ],
      turnTalk20: () => [ "<20>{#p/mettaton}{#e/mettaton/14}I... c-can't..." ],
      turnTalk21: () => [
         '<20>{#p/mettaton}{#e/mettaton/11}(Sigh...)',
         '<20>Well...',
         "<20>{#e/mettaton/9}Looks like...\nI'm all out of juice.",
         '<20>...',
         '<20>{#e/mettaton/10}Though...\nI must say...',
         ...(save.data.b.a_state_hapstablook
            ? [
                 "<20>{#e/mettaton/17}You're one out-of- this-world actor.",
                 '<20>{#e/mettaton/10}I knew you had potential, but...',
                 '<20>{#e/mettaton/10}To see it first-hand is..',
                 '<20>{#e/mettaton/17}...spectacular.'
              ]
            : save.data.n.bad_lizard < 2
            ? [
                 "<20>{#e/mettaton/17}You've got quite a knack for staying alive.",
                 '<20>{#e/mettaton/10}Alphys spoke of your many feats, but...',
                 '<20>{#e/mettaton/10}To see them first-hand is...',
                 '<20>{#e/mettaton/17}...spectacular.'
              ]
            : [
                 "<20>{#e/mettaton/17}You're quite a formidable foe.",
                 "<20>{#e/mettaton/9}I guess it's only natural that the human was victorious...",
                 "<20>{#e/mettaton/9}That's what happens in all the movies...",
                 '<20>{#e/mettaton/13}...right?'
              ]),
         '<20>{#e/mettaton/10}...',
         '<20>Heh...',
         "<20>{#e/mettaton/17}Why don't we hear what the audience has to say...",
         '<20>{#e/mettaton/10}Before... we finish off our saga for good.'
      ],
      audienceRec1: () => [
         '<22>{#p/event}Ring, ring...',
         '<22>{#p/napstablook}{@swirl:0.4,1.4,15}.....',
         '<22>{#e/mettaton/9}{@swirl:0.4,1.4,15}oh........',
         '<22>{@swirl:0.4,1.4,15}hi...\nmettaton...',
         ...(save.data.b.a_state_hapstablook
            ? [
                 "<22>{#e/mettaton/18}{@swirl:0.4,1.4,15}i know it's been weird since the meeting...\nbut...",
                 '<22>{@swirl:0.4,1.4,15}seeing you for who you really are, doing what you really want...',
                 '<22>{#e/mettaton/10}{@swirl:0.4,1.4,15}brought a tear to my eye...',
                 "<22>{#e/mettaton/9}{@swirl:0.4,1.4,15}i can't tell, but...\ni guess this is the last episode...?",
                 "<22>{#e/mettaton/11}{@swirl:0.4,1.4,15}i'll miss seeing you like this...\nmettaton......"
              ]
            : [
                 '<22>{#e/mettaton/18}{@swirl:0.4,1.4,15}i really liked watching your show...',
                 '<22>{@swirl:0.4,1.4,15}my life is pretty boring...\nbut...',
                 '<22>{#e/mettaton/10}{@swirl:0.4,1.4,15}seeing you on tv brought excitement to my life...\nvicariously',
                 "<22>{#e/mettaton/9}{@swirl:0.4,1.4,15}i can't tell, but...\ni guess this is the last episode...?",
                 "<22>{#e/mettaton/11}{@swirl:0.4,1.4,15}i'll miss you...\nmettaton......"
              ])
      ],
      audienceRec2: [
         '<20>{#p/mettaton}{#e/mettaton/19}No, wait!\nWait, bl...',
         '<20>{#e/mettaton/9}Th... they already hung up.',
         '<20>{#e/mettaton/19}...',
         "<20>{#e/mettaton/20}I'll take another caller!!!"
      ],
      audienceRec3a: [ '<22>{#p/monster}Mettaton, your show made us so happy!' ],
      audienceRec3b: [ "<22>{#p/monster}Mettaton, I don't know what I'll watch without you!" ],
      audienceRec3c: [ "<22>{#e/mettaton/10}{#p/monster}There's a Mettaton-shaped hole in my Mettaton- shaped heart!" ],
      audienceRec4: [
         '<20>{#p/mettaton}Ah... I see.',
         '<20>{#e/mettaton/9}...',
         '<20>{#e/mettaton/19}Everyone... thank you so much.',
         '<20>{#e/mettaton/20}But you misunderstand...',
         "<20>{#e/mettaton/10}Mettaton's not going anywhere!",
         "<20>{#e/mettaton/9}It's only the human that's going places...",
         '<20>...',
         "<20>{#e/mettaton/20}I guess it's for the best, though.",
         "<20>{#e/mettaton/15}The truth is, this form's energy consumption is...",
         '<20>{#e/mettaton/14}Inefficient.',
         "<20>{#e/mettaton/19}In a few moments, I'll run out of battery power, and...",
         '<20>{#e/mettaton/10}Well.',
         "<20>I'll be alright.",
         '<20>{#e/mettaton/13}Fly safe, darling.',
         '<20>{#e/mettaton/15}And everyone... thank you.',
         "<20>{#e/mettaton/3}You've been a great audience!"
      ],
      neointro: [
         "<20>{*}{#p/mettaton}You're orange now.",
         "<20>{*}{#e/mettaton/4}That's my attack.",
         '<20>{*}{#e/mettaton/12}...oh, remind you of someone, did I?',
         '<20>{*}{#e/mettaton/0}Heh.',
         '<20>{*}{#e/mettaton/12}But enough with words.',
         "<20>{*}{#e/mettaton/0}It's time to put you in the grave."
      ],
      mettahero1: [
         '<20>{*}{#p/mettaton}{#e/mettaton/6}...',
         "<20>{*}{#e/mettaton/9}G... guess that's what I get for fusing with my body...",
         "<20>{*}{#e/mettaton/11}Now... there'll be nobody left...",
         '<20>{*}{#e/mettaton/7}...to stop you...'
      ],
      mettahero2: [ '<20>{*}{#e/mettaton/7}...', '<20>{*}{#e/mettaton/10}Goodbye...\n...\n...darling.' ],
      napstahero1: [ '<20>{#p/napstablook}{@swirl:0.4,1.4,15}no...', '<20>{@swirl:0.4,1.4,15}mettaton...' ],
      napstahero2: [
         '<20>{#p/napstablook}{@swirl:0.4,1.4,15}so this is what it comes to, huh?',
         '<20>{@swirl:0.4,1.4,15}well, i hope it was worth it',
         "<20>{@swirl:0.4,1.4,15}i've been waiting for a chance to stop you, and now, i finally have one.",
         "<20>{@swirl:0.4,1.4,15}you can't use magic, therefore, you can't kill me.",
         "<20>{@swirl:0.4,1.4,15}i'll keep you trapped here for the rest of eternity if i have to.",
         '<20>{@swirl:0.4,1.4,15}either way...',
         '<20>{@swirl:0.4,1.4,15}your time has run out.'
      ],
      napstahero3: () =>
         [
            [
               "<20>{#p/asriel2}Seriously?\nI know my magic's limited, but it's not THAT bad.",
               '<20>{#x1}Cut me some slack...'
            ],
            [ '<20>{#p/asriel2}Dead.' ]
         ][Math.min(save.flag.n.ga_asrielNapstakill++, 1)],
      qq: () => (save.data.n.bad_lizard < 2 ? 'Would you smooch a ghost?' : 'Would you attack a ghost?'),
      qa: () =>
         save.data.n.bad_lizard < 2
            ? [ 'Heck Yeah', 'HELL YEAH', 'Absolutely!', 'Without\nHesitation.' ]
            : [ 'I Could', 'I SHOULD', 'I will!', 'If I\nhave to.' ],
      q0: () =>
         save.data.n.bad_lizard < 2
            ? [ "<20>{#p/mettaton}Time's up, darling.\nI'll take that as a yes~{^40}{%}" ]
            : [ "<20>{#p/mettaton}Time's up, darling.\nI'll take that as a yes...{^40}{%}" ],
      q1: () =>
         save.data.n.bad_lizard < 2
            ? [ '<20>{#p/mettaton}Great answer!\nI love it!!!{^40}{%}' ]
            : [ "<20>{#p/mettaton}I'd like to see you try.{^40}{%}" ],
      q2: () =>
         save.data.n.bad_lizard < 2
            ? [ "<20>{#p/mettaton}Now THAT's how you answer a question!{^40}{%}" ]
            : [ '<20>{#p/mettaton}So you just lack the courage, hmm?{^40}{%}' ],
      q3: () =>
         save.data.n.bad_lizard < 2
            ? [ '<20>{#p/mettaton}I like your attitude!{^40}{%}' ]
            : [ '<20>{#p/mettaton}The truth is so refreshing!{^40}{%}' ],
      q4: () =>
         save.data.n.bad_lizard < 2
            ? [ "<20>{#p/mettaton}Oooh, you're serious about this.{^40}{%}" ]
            : [ "<20>{#p/mettaton}Don't lie to yourself, dear...{^40}{%}" ],
      hitIndicator: 'Hits: $(x)',
      shieldIndicator: 'Shield: $(x)%',
      ratings: {
         pose1: 'Dramatic',
         pose2: 'Risky',
         pose3: 'Crazy',
         pose4: 'Showstopping',
         flirt1: 'Cute',
         flirt2: 'Flirty',
         flirt3: 'Romantic',
         flirt4: 'Enthralling',
         boast1: 'Disappointing',
         boast2: 'Embarrasing',
         boast3: 'Impressive',
         heel1: 'Satisfying',
         heel2: 'Decadent',
         heel3: 'Unsatisfying',
         hurt: 'Violent',
         bomb: 'Explosive',
         scream: 'Enthusiastic',
         hopbox: 'Acrobatic',
         hearthurt: 'Even More Violent',
         item: {
            old_gun: 'Stunning',
            old_bomb: 'Narcotic',
            old_spray: 'Spicy',
            tvm_radio: 'Musical',
            tvm_fireworks: 'Extravagant',
            tvm_mewmew: 'Brazen',
            spanner: 'Choreography',
            armor: 'Fashionable',
            weapon: 'Tactical',
            artifact1: 'Unbelievable',
            artifact2: 'Still Unbelievable',
            repeat: 'Repetitive',
            pain: 'Painful'
         },
         smooch: 'Correct',
         nosmooch: 'Incorrect'
      }
   },

   b_opponent_madjick: {
      name: '* Cozmo',
      old_gun_text: [ '<32>{#p/narrator}* You fire the gun.\n* But Cozmo is unfazed!' ],
      old_bomb_text: [ '<32>{#p/narrator}* You deploy the bomb.\n* The mist scatters about.\n* But Cozmo is unfazed!' ],
      old_spray_text: [ "<32>{#p/narrator}* You use the spray.\n* Smells like pepper.\n* Cozmo can't take the heat!" ],
      status1: () =>
         save.data.n.bad_lizard < 2 ? [ '<32>{#p/alphys}* Uh oh.' ] : [ '<32>{#p/story}* Cozmo came through in a flash!' ],
      act_check: () =>
         save.data.n.bad_lizard < 2
            ? [ '<32>{#p/alphys}* Cozmo\'s what you\'d call a "traditional" magic user.\n* Its orbs are its strength...' ]
            : [ '<32>{#p/story}* COZMO - ATK 29 DEF 24\n* This enigmatic ELITE squad member speaks in magic words.' ],
      idleStatus1: () =>
         save.data.n.bad_lizard < 2
            ? [ "<32>{#p/alphys}* It's Cozmo." ]
            : [ '<32>{#p/story}* Cozmo does a mysterious jig.' ],
      idleStatus2: () =>
         save.data.n.bad_lizard < 2
            ? [ "<32>{#p/alphys}* It's Cozmo." ]
            : [ '<32>{#p/story}* Cozmo flaunts its orbs in a menacing manner.' ],
      idleStatus3: () =>
         save.data.n.bad_lizard < 2
            ? [ "<32>{#p/alphys}* It's Cozmo." ]
            : [ '<32>{#p/story}* Cozmo whispers non-terrestrial swear words.' ],
      idleStatus4: () =>
         save.data.n.bad_lizard < 2
            ? [ "<32>{#p/alphys}* It's Cozmo." ]
            : [ '<32>{#p/story}* Cozmo peers at you with intrigued eyes.' ],
      idleStatus5: () =>
         save.data.n.bad_lizard < 2 ? [ "<32>{#p/alphys}* It's Cozmo." ] : [ '<32>{#p/story}* Smells like... magic.' ],
      idleTalk1: [ '<20>{~}Abra cadabra.' ],
      idleTalk2: [ '<20>{~}A la kazam!!' ],
      idleTalk3: [ '<20>{~}Tinkle tinkle hoy.' ],
      idleTalk4: [ '<20>{~}Hocus pocus.' ],
      idleTalk5: [ '<21>{~}Please and thank you.' ],
      danceText1: [ "<32>{#p/narrator}* You dance.\n* Cozmo's gravity orb grows near..." ],
      danceTalk1: [ '<20>{~}Magnum gravitas!!' ],
      danceStatus1: () =>
         save.data.n.bad_lizard < 2
            ? [ '<32>{#p/alphys}* One orb down...' ]
            : [ "<32>{#p/story}* Cozmo's gravity orb has relented its pull." ],
      danceText2: () => [
         "<32>{#p/narrator}* You dance.\n* Cozmo's shocker orb powers up...",
         ...(save.data.n.bad_lizard < 2 ? [ "<32>{#p/alphys}* Yes, that's it!\n* A-almost there!" ] : [])
      ],
      danceTalk2: [ '<20>{~}Vulu voltika!' ],
      danceStatus2: () =>
         save.data.n.bad_lizard < 2
            ? [ '<32>{#p/alphys}* Yes!!!\n* The orbs are out of power!' ]
            : [ "<32>{#p/story}* Cozmo's shocker orb is drained of energy." ],
      danceText3: [ '<32>{#p/narrator}* You dance.\n* Nothing changed.' ],
      danceIdleTalk1: [ '<20>{~}Saddened...' ],
      danceIdleTalk2: [ '<20>{~}Defeated...' ],
      danceIdleTalk3: [ '<20>{~}Failed...' ],
      danceStatus3: () =>
         save.data.n.bad_lizard < 2
            ? [ '<32>{#p/alphys}* You can probably spare it now.' ]
            : [ '<32>{#p/story}* Cozmo is out of options.' ],
      playdeadText1: () => [
         "<32>{#p/narrator}* You play dead.\n* Cozmo's orbs begin to act strangely to each other...",
         ...(save.data.n.bad_lizard < 2 ? [ '<32>{#p/alphys}* What the...?' ] : [])
      ],
      playdeadTalk: [ '<20>{~}\x00*chants of confusion*' ],
      playdeadStatus: () =>
         save.data.n.bad_lizard < 2
            ? [ '<32>{#p/alphys}* I guess that works...?' ]
            : [ "<32>{#p/story}* Cozmo's orbs don't know how to handle this." ],
      playdeadIdleTalk1: [ '<20>{~}Utter inconfidence.' ],
      playdeadIdleTalk2: [ '<20>{~}Total vexation.' ],
      playdeadIdleTalk3: [ '<20>{~}Radical confusion.' ],
      playdeadText2: [ '<32>{#p/narrator}* You play dead.\n* Nothing changed.' ],
      flirtText0: () => [
         '<32>{#p/narrator}* You flirt with Cozmo.\n* No effect.',
         ...(save.data.n.bad_lizard < 2 ? [ '<32>{#p/alphys}* Yeah, good luck with that...' ] : [])
      ],
      flirtText1: () => [
         '<32>{#p/narrator}* You call on your experience, and invoke a flirtatious incantation.',
         ...(save.data.n.bad_lizard < 2 ? [ '<32>{#p/alphys}* Huh...?' ] : [])
      ],
      flirtTalk1: [ '<20>{~}Ah!\nA fellow wizard!' ],
      flirtStatus1: () =>
         save.data.n.bad_lizard < 2
            ? [ '<32>{#p/alphys}* Oh my god.\n* Do it again!!!' ]
            : [ '<32>{#p/story}* Cozmo is on the love train.' ],
      flirtText2: () => [
         '<32>{#p/narrator}* You call on your experience, and recite a romantic scribe.',
         ...(save.data.n.bad_lizard < 2 ? [ '<32>{#p/alphys}* It just gets better and better.' ] : [])
      ],
      flirtTalk2: [ "<20>{~}Ah!\nIt's amazing!" ],
      flirtStatus2: () =>
         save.data.n.bad_lizard < 2
            ? [ "<32>{#p/alphys}* Wow... I guess that's that." ]
            : [ '<32>{#p/story}* Cozmo is enchanted.' ],
      flirtText3: () => [
         '<32>{#p/narrator}* You flirt.\n* Nothing changed.',
         ...(save.data.n.bad_lizard < 2 ? [ "<32>{#p/alphys}* Pfft, don't push your luck." ] : [])
      ],
      flirtIdleTalk1: [ '<20>{~}How lovely...' ],
      flirtIdleTalk2: [ '<20>{~}How sweet...' ],
      flirtIdleTalk3: [ '<20>{~}How thoughtful...' ],
      perilStatus: () =>
         save.data.n.bad_lizard < 2 ? [ '<32>{#p/alphys}* Its HP is low...' ] : [ '<32>{#p/story}* Cozmo is holding on.' ]
   },

   b_opponent_knightknight: {
      name: '* Terrestria',
      old_gun_text: [ '<32>{#p/narrator}* You fire the gun.\n* But Terrestria is unfazed!' ],
      old_bomb_text: [ '<32>{#p/narrator}* You deploy the bomb.\n* The mist scatters about.\n* Terrestria fell asleep!' ],
      old_spray_text: [ '<32>{#p/narrator}* You use the spray.\n* Smells like pepper.\n* But Terrestria is unfazed!' ],
      status1: () =>
         save.data.n.bad_lizard < 2 ? [ '<32>{#p/alphys}* Not again.' ] : [ '<32>{#p/story}* Terrestria blocks the way!' ],
      act_check: () =>
         save.data.n.bad_lizard < 2
            ? [ "<32>{#p/alphys}* Terrestria is a staff-wielder, and she's REALLY passionate about the homeworld." ]
            : [
                 '<32>{#p/story}* TERRESTRIA - ATK 36 DEF 36\n* This heavy ELITE squad member wields the Planetary Staff.'
              ],
      idleStatus1: () =>
         save.data.n.bad_lizard < 2
            ? [ "<32>{#p/alphys}* It's Terrestria." ]
            : [ '<32>{#p/story}* Terrestria tightens her grip on the staff.' ],
      idleStatus2: () =>
         save.data.n.bad_lizard < 2
            ? [ "<32>{#p/alphys}* It's Terrestria." ]
            : [ '<32>{#p/story}* Terrestria breathes deeply.' ],
      idleStatus3: () =>
         save.data.n.bad_lizard < 2
            ? [ "<32>{#p/alphys}* It's Terrestria." ]
            : [ '<32>{#p/story}* Terrestria watches quietly.' ],
      idleStatus4: () =>
         save.data.n.bad_lizard < 2
            ? [ "<32>{#p/alphys}* It's Terrestria." ]
            : [ "<32>{#p/story}* Terrestria's armor emits a faint, yellow glow." ],
      idleStatus5: () =>
         save.data.n.bad_lizard < 2
            ? [ "<32>{#p/alphys}* It's Terrestria." ]
            : [ '<32>{#p/story}* Smells like a forgotten relic.' ],
      idleTalk1: [ '<20>{~}Good knight.' ],
      idleTalk2: [ '<20>{~}Farewell.' ],
      idleTalk3: [ '<20>{~}Adieu.' ],
      idleTalk4: [ '<20>{~}Close your eyes...' ],
      idleTalk5: [ '<20>{~}Goodbye.' ],
      comfortText1: () => [
         "<32>{#p/narrator}* You move in closer and caress Terrestria's face, telling it things will be okay.",
         ...(save.data.n.bad_lizard < 2 ? [ "<32>{#p/alphys}* That's... uh..." ] : [])
      ],
      comfortTalk1: [ '<20>{~}...\n...\n...\nTruly?' ],
      comfortStatus1: () =>
         save.data.n.bad_lizard < 2
            ? [ '<32>{#p/alphys}* Is she... crying?' ]
            : [ "<32>{#p/story}* Terrestria's stance weakens." ],
      comfortText2: () => [
         '<32>{#p/narrator}* You embrace Terrestria, reminding it there is still beauty in the universe.',
         ...(save.data.n.bad_lizard < 2 ? [ '<32>{#p/alphys}* Awww...' ] : [])
      ],
      comfortTalk2: [ '<20>{~}...\n...\nThank you...' ],
      comfortStatus2: () =>
         save.data.n.bad_lizard < 2
            ? [ "<32>{#p/alphys}* That's... honestly very sweet." ]
            : [ '<32>{#p/story}* Terrestria has found a new purpose in life.' ],
      comfortTalk3: [ '<20>{~}...\n...\nThere you are...' ],
      comfortStatus3: () =>
         save.data.n.bad_lizard < 2
            ? [ "<32>{#p/alphys}* That's... honestly very sweet." ]
            : [ '<32>{#p/story}* Terrestria takes solace in her newfound comfort.' ],
      comfortText3: [ '<32>{#p/narrator}* You comfort Terrestria.\n* Nothing changed.' ],
      comfortText4: [
         '<32>{#p/narrator}* You give Terrestria a big hug.\n* She drops her staff and accepts your offer of peace.'
      ],
      comfortIdleTalk1: [ '<20>{~}Gratuities.' ],
      comfortIdleTalk2: [ '<20>{~}Much obliged.' ],
      comfortIdleTalk3: [ '<20>{~}Many thanks.' ],
      comfortStatus4: () =>
         save.data.n.bad_lizard < 2
            ? [ '<32>{#p/alphys}* I think you can spare her...' ]
            : [ '<32>{#p/story}* Terrestria is at peace.' ],
      flashText1: () => [
         "<32>{#p/narrator}* You flash your phone screen.\n* It's so bright, Terrestria goes into a panic!",
         ...(save.data.n.bad_lizard < 2 ? [ '<32>{#p/alphys}* What are you doing!?' ] : [])
      ],
      flashTalk: [ '<20>{~}\x00*silent panic*' ],
      flashStatus: () =>
         save.data.n.bad_lizard < 2
            ? [ "<32>{#p/alphys}* She's b-blinded!" ]
            : [ '<32>{#p/story}* Terrestria has lost her sense of sight for this battle.' ],
      flashIdleTalk1: [ '<20>{~}No vision...' ],
      flashIdleTalk2: [ "<20>{~}Can't see you..." ],
      flashIdleTalk3: [ '<20>{~}Where are you...' ],
      flashText2a: [
         '<32>{#p/narrator}* You flash your phone screen.\n* But Terrestria is too focused on you to notice it.'
      ],
      flashText2b: [
         '<32>{#p/narrator}* You flash your phone screen.\n* But Terrestria is too relaxed to pay attention.'
      ],
      flashText2c: [ '<32>{#p/narrator}* You flash your phone screen.\n* Nothing changed.' ],
      flirtText0: () => [
         '<32>{#p/narrator}* You flirt with Terrestria.\n* No effect.',
         ...(save.data.n.bad_lizard < 2
            ? [ '<32>{#p/alphys}* Yeah, the ELITE squad is sort of trained against swooning.' ]
            : [])
      ],
      flirtText1: () => [
         '<32>{#p/narrator}* You call on your experience, and whisper a simple but confident compliment.',
         ...(save.data.n.bad_lizard < 2 ? [ '<32>{#p/alphys}* Uh...' ] : [])
      ],
      flirtTalk1: [ '<20>{~}What delight...' ],
      flirtStatus1: () =>
         save.data.n.bad_lizard < 2
            ? [ "<32>{#p/alphys}* Of course you'd find a way to make it work..." ]
            : [ '<32>{#p/story}* Terrestria is beginning to like you.' ],
      flirtText2: () => [
         "<32>{#p/narrator}* You call on your experience, and gaze long into Terrestria's eyes.",
         ...(save.data.n.bad_lizard < 2 ? [ '<32>{#p/alphys}* Ohhhh kay.' ] : [])
      ],
      flirtTalk2: [ '<20>{~}What beauty to be seen...' ],
      flirtStatus2: () =>
         save.data.n.bad_lizard < 2
            ? [ '<32>{#p/alphys}* W-well.\n* This is... something.' ]
            : [ '<32>{#p/story}* Terrestria is enamoured.' ],
      flirtText3: () => [
         '<32>{#p/narrator}* You flirt.\n* Nothing changed.',
         ...(save.data.n.bad_lizard < 2 ? [ '<32>{#p/alphys}* You are insane.' ] : [])
      ],
      flirtIdleTalk1: [ '<20>{~}Quite breath-taking...' ],
      flirtIdleTalk2: [ '<20>{~}How wonderful...' ],
      flirtIdleTalk3: [ '<20>{~}So beautiful...' ],
      perilStatus: () =>
         save.data.n.bad_lizard < 2
            ? [ "<32>{#p/alphys}* She's close to death..." ]
            : [ "<32>{#p/story}* Terrestria's breath shakes." ]
   },

   b_opponent_froggitex: {
      name: '* Final Froggit',
      old_gun_text: [ '<32>{#p/narrator}* You fire the gun.\n* Final Froggit is knocked out!' ],
      old_bomb_text: [
         '<32>{#p/narrator}* You deploy the bomb.\n* The mist scatters about.\n* Final Froggit is knocked out!'
      ],
      old_spray_text: [ '<32>{#p/narrator}* You use the spray.\n* Smells like pepper.\n* Final Froggit is knocked out!' ],
      act_check: () =>
         save.data.n.bad_lizard < 2
            ? battler.exp < 1
               ? [ "<32>{#p/alphys}* Final Froggit, it's like Froggit, but fancier.\n* It talks in an odd language." ]
               : [ "<32>{#p/alphys}* It's just Final Froggit." ]
            : [ '<32>{#p/story}* FINAL FROGGIT - ATK 30 DEF 24\n* The future is boundless for this monster.' ],
      idleText1: [ '<08>{~}Robbit, robbit.' ],
      idleText2: [ '<08>{~}Creak, creak.' ],
      idleText3: [ '<08>{~}Skip, jump.' ],
      idleText4: [ '<08>{~}Purr.' ],
      status1: () =>
         save.data.n.bad_lizard < 2
            ? [ '<32>{#p/alphys}* ...' ]
            : [ '<32>{#p/story}* The battlefield is engulfed in the smell of leola root.' ],
      status2: () =>
         save.data.n.bad_lizard < 2
            ? [ '<32>{#p/alphys}* ...' ]
            : [ '<32>{#p/story}* Final Froggit seeks an understanding.' ],
      status3: () =>
         save.data.n.bad_lizard < 2
            ? [ '<32>{#p/alphys}* ...' ]
            : [ '<32>{#p/story}* Final Froggit hopes to share its wisdom.' ],
      act_flirt: () => [
         '<32>{#p/narrator}* You flirt with Final Froggit.',
         '<32>* Final Froggit shows modest appreciation for your remarks.',
         ...(save.data.n.bad_lizard < 2 && battler.exp < 1 ? [ '<32>{#p/alphys}* Ehehe...' ] : [])
      ],
      flirtText: () =>
         world.population === 0 ? [ '<08>{~}(Sighs deeply.)\nRobbit.' ] : [ '<08>{~}(Blushes deeply.)\nRobbit.' ],
      act_translate1: () => [
         '<32>{#p/narrator}* You tried to translate, but there was nothing for you to translate yet.',
         ...(save.data.n.bad_lizard < 2
            ? [ '<32>{#p/alphys}* Maybe you should, like... wait for it to say something first?' ]
            : [])
      ],
      act_translate2: [ "<32>{#p/narrator}* You translate Final Froggit's message." ],
      translateText1: () =>
         world.population === 0 ? [ "<08>{~}(Don't kill and don't be killed.)" ] : [ '<08>{~}(Time heals all wounds.)' ],
      translateText2: () =>
         world.population === 0 ? [ '<08>{~}(Let not the rage consume you.)' ] : [ '<09>{~}(Keep moving forward.)' ],
      translateText3: () =>
         world.population === 0 ? [ '<08>{~}(You can always be better.)' ] : [ '<08>{~}(Stay true to your- self.)' ],
      translateText4: () =>
         world.population === 0 ? [ '<08>{~}(Never give into hate.)' ] : [ '<08>{~}(Always try your best.)' ],
      translateText5: () =>
         world.population === 0 ? [ '<08>{~}(Always regret being mean.)' ] : [ '<08>{~}(Never regret being kind.)' ],
      mercyStatus: () =>
         save.data.n.bad_lizard < 2
            ? battler.exp < 1
               ? [ '<32>{#p/alphys}* I think you can spare Final Froggit now.' ]
               : [ '<32>{#p/alphys}* I think you can spare it now.' ]
            : [ '<32>{#p/story}* Final Froggit seems reluctant to fight you.' ],
      act_mystify: [ '<32>{#p/narrator}* You do something mysterious, but Final Froggit is unaffected.' ],
      perilStatus: () =>
         save.data.n.bad_lizard < 2
            ? battler.exp < 1
               ? [ '<32>{#p/alphys}* Uh...' ]
               : [ '<32>{#p/alphys}* No...' ]
            : [ '<32>{#p/story}* Final Froggit stands its ground.' ]
   },

   b_opponent_whimsalot: {
      name: '* Flutterknyte',
      old_gun_text: [ '<32>{#p/narrator}* You fire the gun.\n* Flutterknyte is knocked out!' ],
      old_bomb_text: [
         '<32>{#p/narrator}* You deploy the bomb.\n* The mist scatters about.\n* Flutterknyte is knocked out!'
      ],
      old_spray_text: [ '<32>{#p/narrator}* You use the spray.\n* Smells like pepper.\n* Flutterknyte is knocked out!' ],
      act_check: () =>
         save.data.n.bad_lizard < 2
            ? battler.exp < 1
               ? [ '<32>{#p/alphys}* Flutterknyte... is it just me, or does it seem nervous?' ]
               : [ "<32>{#p/alphys}* It's just Flutterknyte." ]
            : [
                 '<32>{#p/story}* FLUTTERKNYTE - ATK 34 DEF 12\n* This monster carries a bloated sense of responsibility.'
              ],
      act_perch1: () => [
         '<32>{#p/narrator}* You offered an arm for Flutterknyte to perch on.',
         '<32>* Flutterknyte pauses for a moment to consider it...',
         ...(save.data.n.bad_lizard < 2 && battler.exp < 1 ? [ '<32>{#p/alphys}* You might need to do it again.' ] : [])
      ],
      act_perch2: () =>
         world.population === 0
            ? [
                 '<32>{#p/narrator}* You continued offering.',
                 '<32>* Flutterknyte backs away, fearing for its life...',
                 '<32>* Flutterknyte wants to go now.',
                 ...(save.data.n.bad_lizard < 2 && battler.exp < 1 ? [ '<32>{#p/alphys}* There you go...?' ] : [])
              ]
            : [
                 '<32>{#p/narrator}* You continued offering.',
                 '<32>* Flutterknyte moves towards your arm and lands.',
                 '<32>* Flutterknyte can rest now.',
                 ...(save.data.n.bad_lizard < 2 && battler.exp < 1 ? [ '<32>{#p/alphys}* There you go!' ] : [])
              ],
      act_perch3: () =>
         world.population === 0
            ? [
                 '<32>{#p/narrator}* You offered your other arm for Flutterknyte.',
                 '<33>* Flutterknyte has seen enough...',
                 ...(save.data.n.bad_lizard < 2 && battler.exp < 1 ? [ '<32>{#p/alphys}* ...jeez.' ] : [])
              ]
            : [
                 '<32>{#p/narrator}* You offered your other arm for Flutterknyte.',
                 '<32>{#p/narrator}* Flutterknyte, now overwhelmed by the choices, decides to fly away...',
                 ...(save.data.n.bad_lizard < 2 && battler.exp < 1 ? [ '<32>{#p/alphys}* ...what.' ] : [])
              ],
      act_flirt: () =>
         world.population === 0
            ? [
                 '<32>{#p/narrator}* You flirted with Flutterknyte.',
                 '<32>* Flutterknyte is surprised, and feels conflicted...',
                 ...(save.data.n.bad_lizard < 2 && battler.exp < 1 ? [ '<32>{#p/alphys}* Er...' ] : [])
              ]
            : [
                 '<32>{#p/narrator}* You flirted with Flutterknyte.',
                 '<32>* Flutterknyte is surprised, but accepts it nonetheless...',
                 ...(save.data.n.bad_lizard < 2 && battler.exp < 1 ? [ '<32>{#p/alphys}* Cute...' ] : [])
              ],
      flirtTalk: () =>
         world.population === 0 ? [ '<08>{~}What to do what to say..' ] : [ '<08>{~}Thank you thank you..' ],
      act_poke1: () => [
         '<32>{#p/narrator}* You poked Flutterknyte to knock it off its balance...',
         '<32>{#p/narrator}* Flutterknyte is shaken, but quickly regains focus.',
         ...(save.data.n.bad_lizard < 2 && battler.exp < 1 ? [ '<32>{#p/alphys}* Mean...?' ] : [])
      ],
      act_poke2: () => [
         '<32>{#p/narrator}* You poked Flutterknyte to knock it off its balance...',
         '<32>{#p/narrator}* Flutterknyte falls and skitters away!',
         ...(save.data.n.bad_lizard < 2 && battler.exp < 1
            ? [ "<32>{#p/alphys}* I'm gonna pretend like you didn't just do that." ]
            : [])
      ],
      preperchText1: [ '<08>{~}Should I..?' ],
      preperchText2: [ '<08>{~}Can I..?' ],
      preperchText3: [ '<08>{~}Will I..?' ],
      perchText1: [ '<08>{~}*ex- hausted sigh*' ],
      perchText2: [ '<08>{~}Rest, at last.' ],
      perchText3: [ '<08>{~}Thank you.' ],
      perchText4: [ '<08>{~}I knew not how tired I was.' ],
      perchText5: [ "<08>{~}I know not how long it's been." ],
      idleTalk1: [ "<08>{~}I'll do what I must.." ],
      idleTalk2: [ "<08>{~}It's for the greater good.." ],
      idleTalk3: [ "<08>{~}They're counting on me.." ],
      idleTalk4: [ '<08>{~}The future depends on this..' ],
      idleTalk5: [ '<08>{~}\x00*shuffle shuffle*' ],
      perilStatus: () =>
         save.data.n.bad_lizard < 2
            ? battler.exp < 1
               ? [ '<32>{#p/alphys}* Uh...' ]
               : [ '<32>{#p/alphys}* No...' ]
            : [ '<32>{#p/story}* Flutterknyte is in serious trouble.' ],
      status1: () =>
         save.data.n.bad_lizard < 2
            ? [ '<32>{#p/alphys}* ...' ]
            : [ '<32>{#p/story}* Flutterknyte continues to mutter justifications.' ],
      status2: () =>
         save.data.n.bad_lizard < 2 ? [ '<32>{#p/alphys}* ...' ] : [ '<32>{#p/story}* Flutterknyte is hovering.' ],
      status3: () => (save.data.n.bad_lizard < 2 ? [ '<32>{#p/alphys}* ...' ] : [ '<32>{#p/story}* Smells like pears.' ]),
      status4: () =>
         save.data.n.bad_lizard < 2
            ? [ '<32>{#p/alphys}* ...' ]
            : [ '<32>{#p/story}* Flutterknyte takes slow, steady breaths.' ],
      status5: () =>
         save.data.n.bad_lizard < 2 ? [ '<32>{#p/alphys}* ...' ] : [ '<32>{#p/story}* Flutterknyte ponders their future.' ],
      spareStatus: () =>
         save.data.n.bad_lizard < 2
            ? battler.exp < 1
               ? [ '<32>{#p/alphys}* Looks like Flutterknyte will accept your mercy now.' ]
               : [ "<32>{#p/alphys}* Looks like it'll accept your mercy now." ]
            : [ '<32>{#p/story}* Flutterknyte is at rest.' ]
   },

   b_opponent_astigmatism: {
      name: '* Eyewalker Prime',
      old_gun_text: [ '<33>{#p/narrator}* You fire the gun.\n* Eyewalker Prime is knocked out!' ],
      old_bomb_text: [
         '<33>{#p/narrator}* You deploy the bomb.\n* The mist scatters about.\n* Eyewalker Prime is knocked out!'
      ],
      old_spray_text: [
         '<33>{#p/narrator}* You use the spray.\n* Smells like pepper.\n* Eyewalker Prime is knocked out!'
      ],
      act_check: () =>
         save.data.n.bad_lizard < 2
            ? battler.exp < 1
               ? [ "<32>{#p/alphys}* Eyewalker Prime...?\n* They're probably the leader of the Eyewalker clan." ]
               : [ "<32>{#p/alphys}* It's just Eyewalker Prime." ]
            : [ "<33>{#p/story}* EYEWALKER PRIME - ATK 32 DEF 26\n* There's more to this monster than meets the eye." ],
      act_stare: [ '<32>{#p/narrator}* You stare at Eyewalker Prime.' ],
      act_smile: [ '<32>{#p/narrator}* You smile at Eyewalker Prime.' ],
      act_flirt: () => [
         '<32>{#p/narrator}* You flirt with Eyewalker Prime.',
         ...(save.data.n.bad_lizard < 2 && battler.exp < 1 ? [ '<32>{#p/alphys}* Oh come on now.' ] : [])
      ],
      status1: () =>
         save.data.n.bad_lizard < 2
            ? [ '<32>{#p/alphys}* ...' ]
            : [ '<32>{#p/story}* Eyewalker Prime is staring into your SOUL.' ],
      status2: () =>
         save.data.n.bad_lizard < 2
            ? [ '<32>{#p/alphys}* ...' ]
            : [ '<32>{#p/story}* Eyewalker Prime offers up a menacing grin.' ],
      status3: () =>
         save.data.n.bad_lizard < 2
            ? [ '<32>{#p/alphys}* ...' ]
            : [ "<32>{#p/story}* Eyewalker Prime isn't messing around." ],
      status4: () =>
         save.data.n.bad_lizard < 2
            ? [ '<32>{#p/alphys}* ...' ]
            : [ "<32>{#p/story}* Eyewalker Prime thinks of their family's honor." ],
      status5: () =>
         save.data.n.bad_lizard < 2 ? [ '<32>{#p/alphys}* ...' ] : [ '<32>{#p/story}* Smells like mouthwash.' ],
      perilStatus: () =>
         save.data.n.bad_lizard < 2 ? [ '<32>{#p/alphys}* Uh...' ] : [ '<32>{#p/story}* Eyewalker Prime is watering.' ],
      idleTalk1: [ '<08>{~}Bring it on!' ],
      idleTalk2: [ '<08>{~}Show me your teeth!' ],
      idleTalk3: [ "<08>{~}Don't hold back!" ],
      idleTalk4: [ '<08>{~}Show me your looks!' ],
      idleTalk5: [ '<08>{~}What are YOU made of?' ],
      flirtTalk: [ '<08>{~}Hah.\nNice try.' ],
      partialTalk1: [ "<08>{~}That's partly right.." ],
      partialTalk2: [ "<08>{~}You've almost got it.." ],
      partialTalk3: [ "<08>{~}You're getting there.." ],
      partialStatus1: () =>
         save.data.n.bad_lizard < 2
            ? battler.exp < 1
               ? [ '<32>{#p/alphys}* I think you need to do the other thing now.' ]
               : [ '<32>{#p/alphys}* ...' ]
            : [ '<32>{#p/story}* Eyewalker Prime is looking for more.' ],
      partialStatus2: () =>
         save.data.n.bad_lizard < 2
            ? battler.exp < 1
               ? [ '<32>{#p/alphys}* Eyewalkers love it when you smile and stare at them.' ]
               : [ '<32>{#p/alphys}* ...' ]
            : [ '<32>{#p/story}* Eyewalker Prime wants to see the full picture.' ],
      partialStatus3: () =>
         save.data.n.bad_lizard < 2
            ? battler.exp < 1
               ? [ '<32>{#p/alphys}* D-do the other thing!' ]
               : [ '<32>{#p/alphys}* ...' ]
            : [ "<32>{#p/story}* Eyewalker Prime wishes you'd follow its directive." ],
      fullStatus: () =>
         save.data.n.bad_lizard < 2
            ? battler.exp < 1
               ? [ '<32>{#p/alphys}* Eyewalker Prime seems content now...' ]
               : [ '<32>{#p/alphys}* It seems content now...' ]
            : [ '<32>{#p/story}* Eyewalker Prime is pleased.' ],
      partialIdleTalk1: [ '<08>{~}What are you waiting for?' ],
      partialIdleTalk2: [ '<08>{~}You gonna do some- thing, or..' ],
      partialIdleTalk3: [ "<08>{~}Is that all you've got?" ],
      fullIdleTalk1: [ '<08>{~}Glad we see eye to eye.' ],
      fullIdleTalk2: [ "<08>{~}Now we're cooking." ],
      fullIdleTalk3: [ "<08>{~}That's the way." ],
      flirtTalkFull: [ '<08>{~}Hmm..', '<08>{~}You make a con- vincing move..' ],
      hurtTalk: [ "<08>{~}That's not what I meant!" ]
   },

   b_opponent_migospel: {
      old_gun_text: [ '<32>{#p/narrator}* You fire the gun.\n* But Silencio escapes!' ],
      old_bomb_text: [ '<32>{#p/narrator}* You deploy the bomb.\n* The mist scatters about.\n* But Silencio escapes!' ],
      old_spray_text: [ '<32>{#p/narrator}* You use the spray.\n* Smells like pepper.\n* But Silencio escapes!' ],
      act_check: () =>
         save.data.n.bad_lizard < 2
            ? battler.exp < 1
               ? [ '<32>{#p/alphys}* Silencio... yeah, this one gets around a lot, actually.' ]
               : [ "<32>{#p/alphys}* It's just Silencio." ]
            : [ '<32>{#p/story}* Silencio - ATK 28 DEF 17\n* Cowardly, but not shamefully.\n* Along for the ride.' ],
      act_flirt: () => [
         '<32>{#p/narrator}* You flirted with Silencio.',
         ...(save.data.n.bad_lizard < 2 && battler.exp < 1 ? [ '<32>{#p/alphys}* Alright then...' ] : [])
      ],
      act_talk: [ '<32>{#p/narrator}* You introduced yourself to Silencio.' ],
      flirtTalk: [ "<09>{~}You're adorable." ],
      groupInsult: [ "<32>{#p/narrator}* You tried insulting Silencio, but it wasn't fazed by it." ],
      groupStatus1: () =>
         save.data.n.bad_lizard < 2 ? [ '<32>{#p/alphys}* ...' ] : [ '<32>{#p/story}* Silencio is ignoring the others.' ],
      groupStatus2: () =>
         save.data.n.bad_lizard < 2 ? [ '<32>{#p/alphys}* ...' ] : [ '<32>{#p/story}* Smells like a pit stop.' ],
      groupTalk1: [ '<08>{#p/monster}Out of the way.' ],
      groupTalk2: [ '<08>{#p/monster}You people are slow.' ],
      groupTalk3: [ "<08>{#p/monster}I'm not partici- pating." ],
      groupTalk4: [ '<08>{#p/monster}Reject the swarm.' ],
      groupTalk5: [ '<08>{#p/monster}Danger is for fools.' ],
      groupTalk6: [ '<08>{#p/monster}I just want peace.' ],
      name: '* Silencio',
      soloInsult: [ '<32>{#p/narrator}* You tried insulting Silencio, but it was too blase to care.' ],
      soloStatus: () =>
         save.data.n.bad_lizard < 2
            ? [ '<32>{#p/alphys}* Looks like it never wanted to do this to begin with.' ]
            : [ "<32>{#p/story}* Silencio doesn't need anyone else around." ],
      soloTalk1: [ "<08>{~}I'll get along alright." ],
      soloTalk2: [ '<08>{~}Partners are over- rated.' ],
      soloTalk3: [ '<08>{~}Finally, alone time.' ],
      soloTalk4: [ '<08>{~}Cha, cha.' ],
      soloTalk5: [ '<08>{~}I dance in peace.' ],
      talkTalk: [ '<08>{~}Hello there.' ],
      perilTalk: [ "<08>{~}I'm outta here." ]
   },

   b_opponent_mushketeer: {
      name: '* Mushketeer',
      old_gun_text: [ '<32>{#p/narrator}* You fire the gun.\n* Mushketeer met their match!' ],
      old_bomb_text: [ '<32>{#p/narrator}* You deploy the bomb.\n* The mist scatters about.\n* Mushketeer is unfazed!' ],
      old_spray_text: [ '<32>{#p/narrator}* You use the spray.\n* Smells like pepper.\n* Mushketeer is unfazed!' ],
      idleTalk1: () =>
         world.genocide ? [ '<08>{~}Your reign of terror is over!' ] : [ '<08>{~}Join me on the front- line.' ],
      idleTalk2: () => (world.genocide ? [ '<08>{~}That\'s "sir" to you!' ] : [ "<08>{~}All's fair in love and CORE." ]),
      idleTalk3: () => (world.genocide ? [ '<08>{~}Nobody outguns Mush- keteer!' ] : [ '<08>{~}No time like wartime.' ]),
      hurtStatus: () =>
         world.genocide ? [ '<32>{#p/asriel2}* Almost dead.' ] : [ '<32>{#p/story}* Mushketeer makes a final push.' ],
      genoStatus: [ '<32>{#p/asriel2}* Mushketeer.' ],
      status0: () =>
         save.data.n.bad_lizard < 2
            ? [ "<32>{#p/alphys}* Please don't die." ]
            : [ '<32>{#p/story}* Mushketeer blocks the way!' ],
      status1: () =>
         save.data.n.bad_lizard < 2 ? [ '<32>{#p/alphys}* ...' ] : [ '<32>{#p/story}* Mushketeer stands firm.' ],
      status2: () =>
         save.data.n.bad_lizard < 2 ? [ '<32>{#p/alphys}* ...' ] : [ '<32>{#p/story}* Mushketeer wants to be a hero.' ],
      status3: () =>
         save.data.n.bad_lizard < 2
            ? [ '<32>{#p/alphys}* ...' ]
            : [ '<32>{#p/story}* Mushketeer is preparing for a shootout.' ],
      status4: () =>
         save.data.n.bad_lizard < 2
            ? [ '<32>{#p/alphys}* ...' ]
            : [ '<32>{#p/story}* Mushketeer reaches around for their gun.' ],
      status5: () =>
         save.data.n.bad_lizard < 2 ? [ '<32>{#p/alphys}* ...' ] : [ '<32>{#p/story}* Smells like dry dirt.' ],
      travelStatus1: () =>
         save.data.n.bad_lizard < 2
            ? [ '<32>{#p/alphys}* ...' ]
            : [ "<32>{#p/story}* Mushketeer, the pray 'n' spray specialist." ],
      travelStatus2: () =>
         save.data.n.bad_lizard < 2 ? [ '<32>{#p/alphys}* ...' ] : [ '<32>{#p/story}* Mushketeer is on edge.' ],
      travelStatus3: () =>
         save.data.n.bad_lizard < 2
            ? [ '<32>{#p/alphys}* ...' ]
            : [ '<32>{#p/story}* Mushketeer darts their eyes around.' ],
      act_check: () =>
         world.genocide
            ? [ '<32>{#p/asriel2}* Mushketeer, the gun-toter.\n* The dirty elder cousin of a mushroom far away...' ]
            : save.data.n.bad_lizard < 2
            ? battler.exp < 1
               ? [ '<32>{#p/alphys}* Mushketeer.\n* I have no idea who this is.' ]
               : [ "<32>{#p/alphys}* It's just Mushketeer." ]
            : [ '<32>{#p/story}* MUSHKETEER - ATK 30 DEF 28\n* Product of its upbringing.\n* Gun-toter.' ],
      act_flirt: () => [
         '<32>{#p/narrator}* You flirted with Mushketeer.',
         ...(world.genocide
            ? [ '<32>{#p/asriel2}* Please no.' ]
            : save.data.n.bad_lizard < 2 && battler.exp < 1
            ? [ '<32>{#p/alphys}* Nahhhhh.' ]
            : [])
      ],
      flirtTalk: [ "<08>{~}Hey, we don't do that here." ],
      flirtStatus: () =>
         world.genocide
            ? [ '<32>{#p/asriel2}* Wow, a monster with dignity.' ]
            : save.data.n.bad_lizard < 2
            ? battler.exp < 1
               ? [ "<32>{#p/alphys}* Welp, that didn't work." ]
               : [ '<32>{#p/alphys}* ...' ]
            : [ '<32>{#p/story}* Oh no, Mushketeer is serious.' ],
      act_travel1: () => [
         '<32>{#p/narrator}* You come closer to Mushketeer.',
         "<32>{#p/narrator}* Mushketeer's attacks get more intense!",
         ...(world.genocide
            ? [ '<32>{#p/asriel2}* Way to put us in danger.' ]
            : save.data.n.bad_lizard < 2 && battler.exp < 1
            ? [ '<32>{#p/alphys}* Careful...' ]
            : [])
      ],
      act_travel2: () => [
         '<32>{#p/narrator}* You come right next to Mushketeer.',
         "<32>{#p/narrator}* Mushketeer's attacks go insane!",
         ...(world.genocide
            ? [ '<32>{#p/asriel2}* $(name)...?' ]
            : save.data.n.bad_lizard < 2 && battler.exp < 1
            ? [ '<32>{#p/alphys}* Oh my god, be careful...!' ]
            : [])
      ],
      act_travel3: () => [
         '<32>{#p/narrator}* But you were already right next to Mushketeer.',
         ...(world.genocide
            ? [ '<32>{#p/asriel2}* We should not be doing this.' ]
            : save.data.n.bad_lizard < 2 && battler.exp < 1
            ? [ '<32>{#p/alphys}* D-do anything other than this!!!' ]
            : [])
      ],
      travelTalk1: [ "<08>{~}What do you think you're doing!" ],
      travelTalk2: [ "<08>{~}What're you playin' at!" ],
      act_disarm1: () => [
         "<32>{#p/narrator}* Mushketeer isn't close enough.\n* You disarmed the air.",
         ...(save.data.n.bad_lizard < 2 && battler.exp < 1 ? [ '<32>{#p/alphys}* You might try traveling closer.' ] : [])
      ],
      act_disarm2: () => [
         '<32>{#p/narrator}* Mushketeer is just out of reach.\n* You disarmed the air.',
         ...(save.data.n.bad_lizard < 2 && battler.exp < 1
            ? [ '<32>{#p/alphys}* I guess...\n* If you have to get closer...' ]
            : [])
      ],
      act_disarm3: () => [
         '<32>{#p/narrator}* You disarm Mushketeer.',
         ...(save.data.n.bad_lizard < 2 && battler.exp < 1 ? [ '<32>{#p/alphys}* Whew...' ] : [])
      ],
      disarmTalk: [
         '<08>{~}I guess this means no war..?',
         '<08>{~}\x00*sigh*',
         "<08>{~}Maybe it's for the best.",
         "<08>{~}I'll be out of your way now.."
      ]
   },

   // this monster is literally an exccuse to write rap lyrics but i dont care :trol:
   b_opponent_pyrope: {
      name: '* Hotwire',
      genoStatus: [ '<32>{#p/asriel2}* Hotwire.' ],
      act_check: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Hotwire, the rhyming jerk.\n* Such a clever mind wasted on a pointless pass time.' ]
            : [ '<32>{#p/story}* HOTWIRE - ATK 29 DEF 14\n* For this devious monster, no scheme is too complex.' ],
      act_flirt: [ '<32>{#p/story}* You flirt with Hotwire.', '<32>{#p/story}* Hotwire flirts back!' ],
      sparkText1: [ "<32>{#p/narrator}* You spark Hotwire's cables.", "<32>{#p/narrator}* Hotwire's confidence grows." ],
      sparkText2: [ "<32>{#p/narrator}* You spark Hotwire's cables.", '<32>{#p/narrator}* Hotwire is peaking!' ],
      sparkText3: [
         "<32>{#p/narrator}* You spark Hotwire's cables.",
         '<32>{#p/narrator}* Hotwire is already powered up.'
      ],
      rapText1: [ '<32>{#p/narrator}* You rap at Hotwire.', '<32>{#p/narrator}* Hotwire is indifferent.' ],
      rapText2: [ '<32>{#p/narrator}* You rap at Hotwire.', '<32>{#p/narrator}* Hotwire is disappointed.' ],
      rapText3: [ '<32>{#p/narrator}* You rap at Hotwire.', '<32>{#p/narrator}* Hotwire is disgusted.' ],
      idleTalk1: [ '<08>{~}No shame on this flame', '<08>{~}I cannot be tamed!' ],
      idleTalk2: [ "<08>{~}The name's Hotwire", "<08>{~}I'm super hot fire!" ],
      idleTalk3: [ '<08>{~}Even a noose', "<08>{~}Won't stop me letting loose!" ],
      idleTalk4: [ "<08>{~}I'm ablaze and unfazed", "<08>{~}Can't step to my ways!" ],
      idleTalk5: [ "<08>{~}I'm in the hot seat", '<08>{~}So bring on the heat!' ],
      flirtTalk: [ '<08>{~}My flirting is un- matched.', "<08>{~}There's no quip I won't catch!" ],
      sparkTalk1A: [
         "<08>{~}I'll serve you a hot one",
         "<08>{~}Even if you're not one",
         '<08>{~}Fire off like a shotgun!'
      ],
      sparkTalk2A: [
         "<08>{~}This mark's about to get bruised",
         '<08>{~}Four little words to describe the hurt',
         '<08>{~}Lost, con- fused, beaten, abused!'
      ],
      sparkTalk3A: [
         '<08>{~}Danger, danger, in comes a long- ranger',
         "<08>{~}A sniper so wack, it's a life- changer",
         '<08>{~}Only need one bullet in the chamber!'
      ],
      sparkFlirtTalkA: [
         '<08>{~}I see you like it lovey dovey',
         "<08>{~}Get ready, it's about to get heavy",
         '<08>{~}Is it just me, or are you kinda funny!'
      ],
      sparkTalk1B: [
         "<08>{~}I flow like I'm stream- ing",
         '<08>{~}Winsome smile is beaming',
         "<08>{~}I'll whip you so bad, ooh",
         "<08>{~}You'll wish you were dreaming"
      ],
      sparkTalk2B: [
         '<08>{~}On a mission, consum- mated',
         "<09>{~}I'm bi- partisan, nomi- nated",
         "<08>{~}You're just a citizen, domi- nated",
         '<08>{~}Even your SOUL is unculti- vated!'
      ],
      sparkTalk3B: [
         "<08>{~}I'm a bonafide killer",
         "<08>{~}You're a waste dist- iller",
         '<08>{~}Your bars are lame fillers',
         '<08>{~}Whereas mine are straight thril- lers!'
      ],
      sparkFlirtTalkB: [
         "<08>{~}You're flirting with fire, bud",
         "<08>{~}No shot you'll step to this stud",
         '<08>{~}One mistake is all it takes',
         '<08>{~}Before I land a rhyme in your face!'
      ],
      status1: [ '<32>{#p/story}* Hotwire is looking for that extra little boost.' ],
      status2: [ '<32>{#p/story}* Hotwire is rhyming up a storm.' ],
      status3: [ '<32>{#p/story}* Hotwire is protected by its winsome smile.' ],
      status4: [ '<32>{#p/story}* Hotwire reaches for the turbocharger.' ],
      status5: [ '<32>{#p/story}* Smells like lyricism.' ],
      sparkStatus1A: [ '<32>{#p/story}* Hotwire is shocked at its own brilliance.' ],
      sparkStatus2A: [ '<32>{#p/story}* Hotwire begins its ignition sequence... manually.' ],
      sparkStatus3A: [ '<32>{#p/story}* Hotwire gets things going whether we like it or not.' ],
      sparkStatus1B: [ '<32>{#p/story}* Hotwire is feeling electric.' ],
      sparkStatus2B: [ '<32>{#p/story}* Hotwire has reached its true level.' ],
      sparkStatus3B: [ '<32>{#p/story}* Hotwire is turbocharged.' ],
      hurtStatus: [ '<32>{#p/story}* Hotwire is spiraling out of control.' ]
   },

   b_opponent_perigee: {
      name: '* Perigee',
      genoStatus: [ '<32>{#p/asriel2}* Perigee.' ],
      act_check: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Perigee, the lethargic bird.\n* Spends too much time in its own happy-go-lucky head.' ]
            : [ '<32>{#p/story}* PERIGEE - ATK 25 DEF 0\n* This bird of peace believes its feathers can heal.' ],
      act_flirt: () => [ '<32>{#p/story}* You flirt with Perigee.' ],
      idleTalk1: [ '<08>{~}Chirp, chirp.' ],
      idleTalk2: [ '<08>{~}\x00*calming whistle*' ],
      idleTalk3: [ '<08>{~}Life is good.' ],
      idleTalk4: [ '<08>{~}\x00*flap flap*' ],
      idleTalk5: [ '<08>{~}Peace and tran- quility.' ],
      flirtTalk: [ "<08>{~}Aren't you a go- getter." ],
      whistleTalk: [ '<08>{~}\x00*intent whistle*' ],
      whistleStatus: [ '<32>{#p/story}* Perigee awaits your gesture.' ],
      act_bow1: [ '<32>{#p/narrator}* You bow, but for what?' ],
      act_bow2: [
         '<32>{#p/narrator}* You bow for your performance.',
         '<32>{#p/narrator}* Perigee bows back.',
         '<32>{#p/narrator}* An understanding is reached.'
      ],
      act_whistle: [
         '<32>{#p/narrator}* You whistle a tranquil tune.\n* Perigee whistles back.\n* The song goes on and on...'
      ],
      status1: [ '<32>{#p/story}* Perigee orbits closeby!' ],
      status2: [ '<32>{#p/story}* Perigee is living fancy-free.' ],
      status3: [ '<32>{#p/story}* Perigee is as happy as could be.' ],
      status4: [ '<32>{#p/story}* Perigee maintains a feather- light touch.' ],
      status5: [ '<32>{#p/story}* Smells like spare bread.' ],
      status6: [ '<32>{#p/story}* Perigee is satisfied.' ],
      hurtStatus: [ "<32>{#p/story}* Perigee's time is near." ]
   },

   b_opponent_tsundere: {
      name: '* Tsunderidex',
      act_check: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Tsunderidex, a monster I have utterly no words for.' ]
            : [ '<32>{#p/story}* TSUNDERIDEX - ATK 25 DEF 26\n* Seems mean, but does it secretly like you?' ],
      flirtText1: [ '<32>{#p/narrator}* You tell Tsunderidex it has an impressive shield.' ],
      flirtText2: [ '<32>{#p/narrator}* You tell Tsunderidex it has nice cannons.' ],
      flirtText3: [ '<32>{#p/narrator}* You tell Tsunderidex it has a powerful jump drive.' ],
      flirtText4: [ '<32>{#p/narrator}* You tell Tsunderidex that you like its taste in virtual novels.' ],
      flirtText5: [ '<32>{#p/narrator}* You tell Tsunderidex that it has cute engine struts.' ],
      stealText: [ '<32>{#p/narrator}* You get close to Tsunderidex to siphon its battery power...' ],
      upgradeText1: [ "<32>{#p/narrator}* You upgrade Tsunderidex's engines with slipstream technology." ],
      upgradeText2: [ "<32>{#p/narrator}* You upgrade Tsunderidex's cannons with a transphasic firing mechanism." ],
      upgradeText3: [ "<32>{#p/narrator}* You upgrade Tsunderidex's shields with auto-adaptive modulation." ],
      upgradeText4: [ "<32>{#p/narrator}* You can't upgrade any further." ],
      idleTalk1: [ "<08>{~}It's not like I LIKE you." ],
      idleTalk2: [ '<08>{~}Id.. idiot!' ],
      idleTalk3: [ "<08>{~}Hmph!\nDon't get in my way." ],
      idleTalk4: [ '<08>{~}(Eep..!)\nHuman..' ],
      idleTalk5: [ '<08>{~}..\nH-human\n..\n..?' ],
      flirtTalk1: [ '<08>{~}Huh!?\nY-you sicko!' ],
      flirtTalk2: [ '<08>{~}I.. I think not!\nHmph!' ],
      flirtTalk3: [ '<08>{~}Is that true..?' ],
      flirtTalk4: [ "<08>{~}I'm all yours, human.." ],
      upgradeTalk1: [ '<08>{~}Wh.. what are you doing??' ],
      upgradeTalk2: [ '<08>{~}Um.\nHuman.' ],
      upgradeTalk3: [ '<08>{~}Oh..\n..\nW-wow..' ],
      stealTalk1: [ "<08>{~}D-don't do that!\nPlease." ],
      stealTalk2: [ '<08>{~}..\n..\n(Why..)' ],
      stealTalk3: [ '<08>{~}Quit stealing my thunder!' ],
      upgradeStatus1: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* This is a waste of time...' ]
            : [ '<32>{#p/story}* Tsunderidex is checking out its new upgrades.' ],
      upgradeStatus2: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* This is a waste of time...' ]
            : [ '<32>{#p/story}* Tsunderidex is worried about its new upgrades.' ],
      upgradeStatus3: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* This is a waste of time...' ]
            : [ '<32>{#p/story}* Tsunderidex is obsessing over its new upgrades.' ],
      status1: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Tsunderidex.' ]
            : [ '<32>{#p/story}* Tsunderidex looks over, then turns up its nose.' ],
      status2: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Tsunderidex.' ]
            : [ '<32>{#p/story}* Tsunderidex shakes its nose dimissively at you.' ],
      status3: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Tsunderidex.' ]
            : [ '<32>{#p/story}* Tsunderidex "accidentally" bumps you with its nacelles.' ],
      status4: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Tsunderidex.' ]
            : [ '<32>{#p/story}* Tsunderidex sets its cannons to "stun."' ],
      status5: () => (world.goatbro ? [ '<32>{#p/asriel2}* Tsunderidex.' ] : [ '<32>{#p/story}* Smells like plasma.' ]),
      status6: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* Tsunderidex.' ] : [ '<32>{#p/story}* Tsunderidex is looking away shyly.' ],
      hurtStatus: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* Almost dead.' ]
            : [ "<32>{#p/story}* Tsunderidex's engines are leaking plasma." ]
   },

   b_opponent_rg03: {
      name: '* RG 03',
      act_check: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* RG 03, the untrusting guard.\n* Too afraid to confront the ones she cares for most.' ]
            : [ '<32>{#p/story}* RG 03 - ATK 30 DEF 20\n* Conspicuous cowgirl attitude.\n* Skeptic.' ],
      randTalk1: () => [ '<11>{~}Team attack.' ],
      randTalk2: () => (world.goatbro ? [ "<11>{~}We'll stop you." ] : [ "<11>{~}We're just friends." ]),
      randTalk3: () => (world.goatbro ? [ "<11>{~}You're no match for us." ] : [ "<11>{~}You best not be shippin' us." ]),
      randTalk4: () => [ '<11>{~}Careful, girl.' ],
      randStatus1: [ '<32>{#p/story}* 04 is living in the friendzone.' ],
      randStatus2: [ '<32>{#p/story}* 03 puts her doubts aside for the moment.' ],
      randStatus3: [ "<32>{#p/story}* 03 ponders about 04's history." ],
      randStatus4: [ '<32>{#p/story}* Smells like long-lost love.' ],
      randStatus5: [ '<32>{#p/story}* 04 fights with confidence.' ],
      randTalkLone1: () =>
         world.goatbro ? [ "<11>{~}I'll never understand you." ] : [ "<11>{~}I'll never know if she was..." ],
      randTalkLone2: () => (world.goatbro ? [ "<11>{~}I'll never forgive you." ] : [ "<11>{~}It's too late..." ]),
      randTalkLone3: () => (world.goatbro ? [ "<11>{~}I'll never bow down to you." ] : [ '<11>{~}I missed my chance...' ]),
      randTalkLone4: () => (world.goatbro ? [ "<11>{~}I'll never stop fighting you." ] : [ '<11>{~}No...' ]),
      randStatusLone: () => (world.goatbro ? [ '<32>{#p/asriel2}* One left.' ] : [ '<32>{#p/story}* 03 is in disarray.' ]),

      act_flirt: [ '<32>{#p/narrator}* You flirt with 03.' ],
      flirtTalk1: [ '<11>{~}Flirting is strictly forbidden.' ],
      flirtTalk2: [ "<11>{~}You think that's gonna work on us?" ],
      flirtTalkNervy1: [ '<11>{~}Flirting is... ack.' ],
      flirtTalkNervy2: [ "<11>{~}That's not really our... ack." ],
      flirtTalkLone: [ '<11>{~}...' ],
      flirtStatus: [ '<32>{#p/story}* The guards maintain the air of friendship.' ],
      flirtStatusNervy: [ '<32>{#p/story}* Against all odds, the guards still maintain the air of friendship.' ],
      flirtStatusLone: [ "<32>{#p/story}* Flirting won't exactly bring 04 back to life." ],
      act_flirt_happy: [ '<32>{#p/narrator}* You flirt with 03, but she was too distracted by 04 to notice.' ],

      act_tug: [ "<32>{#p/narrator}* You try to pull on 03's glove, but she slaps your hand away." ],
      tugTalk1: [ '<11>{~}Hands off, bucko.' ],
      tugTalk2: [ '<11>{~}No touchy.' ],
      tugTalk3: [ "<11>{~}That's off- limits to you." ],
      tugTalk4: [ '<11>{~}Nope.' ],
      tugStatus: [ '<32>{#p/story}* It would seem some boundaries are better left uncrossed.' ],
      act_tug_lone: [ "<32>{#p/narrator}* You try to pull on 03's glove, but she raises it out of your reach." ],
      tugTalkLone: [ '<11>{~}...' ],
      tugStatusLone: [ '<32>{#p/story}* If only you were taller...' ],
      act_tug_happy: [
         "<32>{#p/narrator}* You hold 03's hand.",
         '<32>{#p/narrator}* 03 mistakenly believes 04 is holding her hand.'
      ],

      tugShock: [ '<11>{~}04...!', '<11>{~}...', '<11>{~}That bracelet...', "<11>{~}It's..." ],
      nervyTalk1: [ '<11>{~}04, I...' ],
      nervyTalk2: [ '<11>{~}04, we...' ],
      nervyTalk3: [ "<11>{~}04, you're..." ],
      nervyTalk4: [ '<11>{~}04, you...' ],
      nervyStatus: [ '<32>{#p/story}* The solar winds are beginning to shift in your favor.' ],

      act_whisper: [ '<32>{#p/narrator}* You whisper to 03 to open up about her thoughts.' ],
      act_whisper_alt: [ '<32>{#p/narrator}* You whisper to 03.', '<32>* Nothing happened.' ],

      confess1: [ '<11>{~}04...' ],
      confess2: [ '<11>{~}...', '<11>{~}...yeah, 03?' ],
      confess3: [ '<11>{~}Look at me, 04.', '<11>{~}Watch.' ],
      confess4: [ "<11>{~}But that's..." ],
      confess5a: [ '<11>{~}The bracelet of unity.', '<11>{~}Remember?', '<11>{~}From back when you were...' ],
      confess5b: [ '<11>{~}...', '<11>{~}No...' ],
      confess5c: [ '<11>{~}From back when WE were kids.' ],
      confess6: [
         "<11>{~}It's you...",
         "<11>{~}It's really you...",
         "<11>{~}I thought I'd lost you, all those years ago...",
         "<11>{~}I thought I'd never see you again...",
         "<11>{~}A distant happy memory I'd long forever more.",
         '<11>{~}But...'
      ],
      confess7: [
         "<11>{~}But I'm here now, 04.\nI remember.",
         '<11>{~}And no matter what names we go by...',
         '<11>{~}I will always love you, 04.'
      ],
      confess8: [ '<11>{~}You too, 03.' ],
      confess9: [ '<11>{~}Do you... wanna get some ice cream?' ],
      confess10: [ '<11>{~}Salmon- flavored?' ],
      confess11: [ '<11>{~}You know it!' ],

      happyTalk1: [ '<11>{~}I missed you.' ],
      happyTalk2: [ "<11>{~}I'm glad you're here." ],
      happyTalk3: [ '<11>{~}To think it was you, all this time...' ],
      happyTalk4: [ '<11>{~}To think I forgot about those beautiful eyes...' ],
      happyStatus: [ '<32>{#p/story}* 03 and 04 are looking happily at each other.' ],

      horrorTalk1: [ '<11>{~}N... no...', '<11>{~}We were going to be... so happy...' ],
      horrorTalk2: [ "<11>{~}I can't go on..." ],
      horrorTalk3: [ "<11>{~}I don't want to live in this world anymore..." ],
      horrorTalk4: [ '<11>{~}...' ],
      horrorStatus: [ '<32>{#p/story}* ...' ],

      dangerStatus: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* Almost dead.' ] : [ "<32>{#p/story}* 03's breathing intensifies." ]
   },

   b_opponent_rg04: {
      name: '* RG 04',
      act_check: () =>
         world.goatbro
            ? [ '<32>{#p/asriel2}* RG 04, the naive guard.\n* Only got her job because 03 begged for her to have it.' ]
            : [ "<32>{#p/story}* RG 04 - ATK 30 DEF 20\n* Believes in friendship, but isn't against more..." ],

      randTalk1: [ '<11>{~}Team attack!' ],
      randTalk2: () => (world.goatbro ? [ '<11>{~}Once and for all!' ] : [ '<11>{~}Absolutely!' ]),
      randTalk3: () => (world.goatbro ? [ '<11>{~}Not one bit!' ] : [ '<11>{~}No romance here!' ]),
      randTalk4: [ '<11>{~}Oh you know it, girl!' ],
      randTalkLone1: () =>
         world.goatbro ? [ "<11>{~}I'm going to finish you off." ] : [ '<11>{~}How could you do this to me!?' ],
      randTalkLone2: () => (world.goatbro ? [ "<11>{~}I'm going to hurt you." ] : [ '<11>{~}She was my only friend!' ]),
      randTalkLone3: () =>
         world.goatbro ? [ "<11>{~}You're a sad, sad creature." ] : [ '<11>{~}You took her away from me!' ],
      randTalkLone4: () => (world.goatbro ? [ "<11>{~}You're as good as dead." ] : [ "<11>{~}What's your excuse!?" ]),
      randStatusLone: () => (world.goatbro ? [ '<32>{#p/asriel2}* One left.' ] : [ '<32>{#p/story}* 04 is in shambles.' ]),

      act_flirt: [ '<32>{#p/narrator}* You flirt with 04.' ],
      flirtTalk1: [ "<11>{~}It's in the rules!" ],
      flirtTalk2: [ "<11>{~}It's not!" ],
      flirtTalkNervy1: [ "<11>{~}It's against the rules!" ],
      flirtTalkNervy2: [ "<11>{~}It's not our thing!" ],
      flirtTalkLone: [ '<11>{~}...' ],
      // flirtStatus
      flirtStatusLone: [ "<32>{#p/story}* Flirting won't exactly bring 03 back to life." ],
      act_flirt_happy: [ '<32>{#p/narrator}* You flirt with 04, but she was too distracted by 03 to notice.' ],

      act_tug: [ "<32>{#p/narrator}* You pull on 04's glove.", '<32>{#p/narrator}* It seems loose...' ],
      act_tug_geno: [ "<32>{#p/narrator}* You pull on 04's glove.", "<32>{#p/narrator}* It's not budging." ],
      tugTalk1: [ '<11>{~}W-what are you doing?' ],
      tugTalk2: [ "<11>{~}Don't tell me you're going to..." ],
      tugTalk3: [ '<11>{~}I...\nThis is...' ],
      tugTalk4: [ '<11>{~}...' ],
      tugStatus: [ "<32>{#p/story}* 04's glove is slipping." ],
      tugGenoStatus: [ "<32>{#p/story}* 04's glove is secure." ],
      act_tug_lone: [ "<32>{#p/narrator}* You pull on 04's glove.", '<32>* It comes right off.' ],
      tugTalkLone: [ '<11>{~}...' ],
      tugStatusLone: [ '<32>{#p/story}* 04 shows no resistance.' ],
      act_tug_hold: [ "<32>{#p/narrator}* You hold 04's... hand." ],
      holdTalk: [ '<11>{~}Uh...' ],
      holdStatus: [ '<32>{#p/story}* 04 is not really sure what to make of this.' ],
      act_tug_hold_lone: [ "<32>{#p/narrator}* You hold 04's hand.", '<32>* Nothing happened.' ],
      holdTalkLone: [ '<11>{~}...' ],
      holdStatusLone: [ '<32>{#p/story}* 04 just lets it happen.' ],
      act_tug_happy: [
         "<32>{#p/narrator}* You hold 04's hand.",
         '<32>{#p/narrator}* 04 mistakenly believes 03 is holding her hand.'
      ],
      tugSuccessStatus: [ '<32>{#p/story}* The veil has been lifted.' ],

      tugShock: [ "<11>{~}My glove...\nIt's coming off...!" ],
      nervyTalk1: [ '<11>{~}03...?' ],
      nervyTalk2: [ '<11>{~}Why are you looking at me that way?' ],
      nervyTalk3: [ "<11>{~}What's with that face, 03?" ],
      nervyTalk4: [ '<11>{~}Are you okay?' ],
      // nervyStatus

      act_whisper: [ '<32>{#p/narrator}* You whisper to 04, but she just seems confused...' ],
      act_whisper_alt: [ '<32>{#p/narrator}* You whisper to 04.', '<32>* Nothing happened.' ],

      happyTalk1: [ '<11>{~}I missed you too!' ],
      happyTalk2: [ "<11>{~}I'm glad YOU'RE here!" ],
      happyTalk3: [ '<11>{~}Haha, yeah...' ],
      happyTalk4: [ '<11>{~}Think nothing of it, sweetheart!' ],

      horrorTalk1: [ '<11>{~}N... no...', '<11>{~}We were going to do... so much together...' ],
      horrorTalk2: [ "<11>{~}I can't accept it..." ],
      horrorTalk3: [ '<11>{~}Just... kill me...' ],
      horrorTalk4: [ '<11>{~}...' ],

      dangerStatus: () =>
         world.goatbro ? [ '<32>{#p/asriel2}* Almost dead.' ] : [ "<32>{#p/story}* 04's breathing intensifies." ]
   },

   c_name_alphys: "Alphys's Phone",
   c_name_puzzle: 'Puzzle Help',
   c_name_dimboxA: 'Dimensional Box A',
   c_name_dimboxB: 'Dimensional Box B',
   c_name_pms: () => (save.data.n.plot_pmcheck < pms().length ? '§fill:#ff0§OuterNet (NEW)' : 'OuterNet'),

   c_puzzle2a: pager.create(
      'limit',
      [
         '<25>{#p/alphys}{#g/alphysCutscene1}* Oh, h-hey!',
         '<25>{#g/alphysCutscene2}* So... this puzzle is actually kinda simple.',
         '<25>{#g/alphysSide}* Each time you pass by a terminal, it alters your phase.',
         "<25>{#g/alphysSmileSweat}* Or, in layman's terms, how far you are along the fourth dimension.",
         "<25>{#g/alphysInquisitive}* Except it's not really a dimension, but... you get the idea.",
         '<25>{#g/alphysNervousLaugh}* Anyway, to pass through the puzzle, just align your local phase...',
         '<25>{#g/alphysHellYeah}* ...with the global phase shift of the room!',
         '<25>{#g/alphysCutscene2}* Which you can do by walking forwards and backwards, of course.',
         '<25>{#g/alphysSmileSweat}* A-and, the terminals are set to display your local phase offset...',
         "<25>{#g/alphysSide}* That way, you'll know when you're properly aligned.",
         '<25>{#g/alphysCutscene1}* Well, g-good luck!'
      ],
      [
         '<25>{#p/alphys}{#g/alphysInquisitive}* ...still stuck?',
         '<25>{#g/alphysCutscene2}* Hmmm...',
         '<25>* I guess my explanation WAS a bit wordy...\n* Ehehe.',
         '<25>{#g/alphysSide}* Really, you just have to get to the terminal that says zero on it.',
         "<25>{#g/alphysNervousLaugh}* Again, it's all about phase offset.",
         '<25>{#g/alphysCutscene2}* As long as your local phase is aligned...',
         '<25>{#g/alphysCutscene2}* ...',
         "<25>{#g/alphysUhButHeresTheDeal}* Just g-get to zero and you're home free!!"
      ],
      [
         '<25>{#p/alphys}{#g/alphysInquisitive}* ...still?',
         '<25>{#g/alphysSmileSweat}* Uh, uh...\n* Walk forwards, until...',
         '<25>{#g/alphysSideSad}* ...wait, what if you already went past it?',
         '<25>{#g/alphysNeutralSweat}* ...',
         "<25>{#g/alphysCutscene3}* You're smart, f-figure it out yourself!"
      ],
      [ '<25>{#p/alphys}{#g/alphysFR}* ...' ]
   ),
   c_puzzle2b: pager.create(
      'limit',
      [
         '<25>{#p/alphys}{#g/alphysCutscene1}* Oh, h-hey!',
         '<25>{#p/alphys}{#g/alphysCutscene2}* This puzzle is a little more complicated than the last one.',
         "<25>{#p/alphys}{#g/alphysWelp}* Y'know, b-because of the whole extra dimension added.",
         '<25>{#p/alphys}{#g/alphysCutscene3}* Sometimes I question whether that actually makes it harder.',
         '<25>{#p/alphys}{#g/alphysSmileSweat}* Well, uh, l-like the last one, you just need to align your phase.',
         "<25>{#p/alphys}{#g/alphysFR}* If you don't know what that is by now...",
         "<25>{#p/alphys}{#g/alphysSide}* I'd say you've probably b-been living under an asteroid all this time."
      ],
      [
         "<25>{#p/alphys}{#g/alphysInquisitive}* ...so you've been living under an asteroid, then?",
         '<25>{#p/alphys}{#g/alphysDontGetAllDreamyEyedOnMeNow}* Jeez, just find the terminal that says zero on it!'
      ],
      [ '<25>{#p/alphys}{#g/alphysWelp}* I tried.' ],
      [ '<25>{#p/alphys}{#g/alphysFR}* ...' ]
   ),

   i_tvm_radio: {
      battle: {
         description: 'An old earth radio.',
         name: 'Radio'
      },
      drop: [ '<32>{#p/human}* (You threw away the radio.)' ],
      info: [ "<32>{#p/narrator}* It's an old earth radio." ],
      name: 'Old Radio',
      use: () =>
         !world.genocide && battler.target?.opponent.metadata.reactTVM
            ? []
            : [ '<32>{#p/human}* (You turned on the radio...)', '<32>{#p/narrator}* But there was no signal.' ]
   },
   i_tvm_fireworks: {
      battle: {
         description: 'A box of fireworks from earth.',
         name: 'Fireworks'
      },
      drop: [ '<32>{#p/human}* (You threw away the fireworks.)' ],
      info: [ "<32>{#p/narrator}* It's a box of fireworks from earth." ],
      name: 'Fireworks',
      use: () =>
         !world.genocide && battler.target?.opponent.metadata.reactTVM
            ? []
            : [
                 '<32>{#p/human}* (You peered into the box...)',
                 "<32>{#p/narrator}* You don't have the right equipment to light these."
              ]
   },
   i_tvm_mewmew: {
      battle: {
         description: 'A life-sized Mew Mew doll.',
         name: 'Doll'
      },
      drop: [ '<32>{#p/human}* (You threw away the Doll.)' ],
      info: [ "<32>{#p/narrator}* It's a life-sized Mew Mew doll..." ],
      name: 'Mew Mew Doll',
      use: () =>
         !world.genocide && battler.target?.opponent.metadata.reactTVM
            ? []
            : [
                 '<32>{#p/human}* (You used the doll.)',
                 ...(game.room === 'f_undyne' && instance('main', 'f_dummynpc')
                    ? [ '<32>{#p/monster}* Would you quit waving that thing in front of me?' ]
                    : game.room === 'f_blooky' &&
                      !world.genocide &&
                      !world.madfish &&
                      !save.data.b.a_state_napstadecline
                    ? [ '<32>{#p/napstablook}* oh............' ]
                    : [ '<32>{#p/narrator}* What were you even expecting to happen here...?' ])
              ]
   },
   i_starfait: {
      battle: {
         description: 'Way too sweet for most humans.',
         name: 'Starfaint'
      },
      drop: [ '<32>{#p/human}* (You threw away the Starfaint.)' ],
      info: [ '<32>{#p/narrator}* "Starfaint" Heals 23 HP\n* Way too sweet for most humans.' ],
      name: 'Starfaint',
      use: [ '<32>{#p/human}* (You consumed the Starfaint.)' ]
   },
   i_legendary_hero: {
      battle: {
         description: "Silly naming aside, it's a pretty decent sub sandwich.",
         name: 'H.Y.G.'
      },
      drop: [ '<32>{#p/human}* (You threw away the sub sandwich.)' ],
      info: [
         '<32>{#p/narrator}* "Hold Yer Grane" Heals 40 HP\n* Silly naming aside, it\'s a pretty decent sub sandwich.'
      ],
      name: 'Hold Yer Grane',
      use: [ '<32>{#p/human}* (You ate the sub sandwich.)' ]
   },
   i_glamburger: {
      battle: {
         description: 'This high-octane hamburger harbors a certain spicy kick.',
         name: 'Slamburger'
      },
      drop: [
         '<32>{#p/human}* (You knocked the Slamburger out of the proverbial park.)',
         "<32>{#p/narrator}* That's a home run!"
      ],
      info: [ '<32>{#p/narrator}* "Slamburger" Heals 34 HP\n* This high-octane hamburger harbors a certain spicy kick.' ],
      name: 'Slamburger',
      use: [ '<32>{#p/human}* (You slammed down the Slamburger.)', "<32>{#p/narrator}* That's the way!" ]
   },
   i_face_steak: {
      battle: {
         description: 'Finally, a truly REAL steak.',
         name: "G's Envy"
      },
      drop: [ '<32>{#p/human}* (You threw away the steak.)' ],
      info: [ '<32>{#p/narrator}* "Glyde\'s Envy" Heals 55 HP\n* Finally, a truly REAL steak.' ],
      name: "Glyde's Envy",
      use: [ '<32>{#p/human}* (You ate the steak.)' ]
   },
   i_starfait_x: {
      battle: {
         description: '...',
         name: 'Startaint'
      },
      drop: [ '<32>{#p/human}* (You threw away the Startaint.)' ],
      info: [ '<32>{#p/narrator}* "Startaint" Heals -23 HP\n* ...' ],
      name: 'Startaint',
      use: [ '<32>{#p/human}* (You consumed the Startaint.)' ]
   },
   i_legendary_hero_x: {
      battle: {
         description: '...',
         name: 'H.Y.M.'
      },
      drop: [ '<32>{#p/human}* (You threw away the sandwich.)' ],
      info: [ '<32>{#p/narrator}* "Hold Yer Pain" Heals -40 HP\n* ...' ],
      name: 'Hold Yer Pain',
      use: [ '<32>{#p/human}* (You ate the sandwich.)' ]
   },
   i_glamburger_x: {
      battle: {
         description: '...',
         name: 'Slamdunker'
      },
      drop: [ '<32>{#p/human}* (You knocked the Slamdunker out of the proverbial park.)' ],
      info: [ '<32>{#p/narrator}* "Slamdunker" Heals -34 HP\n* ...' ],
      name: 'Slamdunker',
      use: [ '<32>{#p/human}* (You slammed down the Slamdunker.)' ]
   },
   i_face_steak_x: {
      battle: {
         description: '...',
         name: 'Envy'
      },
      drop: [ '<32>{#p/human}* (You threw away the steak.)' ],
      info: [ '<32>{#p/narrator}* "Undyne\'s Envy" Heals -55 HP\n* ...' ],
      name: "Undyne's Envy",
      use: [ '<32>{#p/human}* (You ate the steak.)' ]
   },
   i_trash: {
      battle: {
         description: 'This could LITERALLY be anything. Use with caution.',
         name: 'Space Junk'
      },
      drop: [ '<32>{#p/human}* (You threw away the junk.)' ],
      info: [ '<32>{#p/narrator}* "Space Junk" Heals ?? HP\n* This could LITERALLY be anything. Use with caution.' ],
      name: 'Space Junk',
      use: [ '<32>{#p/human}* (You ate the junk...)', "<32>{#p/narrator}* Daring today, aren't we?" ]
   },
   i_laser: {
      battle: {
         description: 'Your attacks can "arc" dealing bonus damage to all enemies.',
         name: 'Arc Laser'
      },
      drop: [ '<32>{#p/human}* (You threw away the laser.)' ],
      info: [ '<32>{#p/narrator}* "Arc Laser" (9 AT)\n* Your attacks can "arc" dealing bonus damage to all enemies.' ],
      name: 'Arc Laser',
      use: [ '<32>{#p/human}* (You equipped the laser.)' ]
   },
   i_visor: {
      battle: {
         description: 'Increases aim time in battle.',
         name: 'Armband'
      },
      drop: [ '<32>{#p/human}* (You threw away the armband.)' ],
      info: [ '<32>{#p/narrator}* "Tactical Armband" (12 DF)\n* Increases aim time in battle.' ],
      name: 'Tactical Armband',
      use: [ '<32>{#p/human}* (You wore the armband.)' ]
   },
   i_filament: {
      battle: {
         description: 'A winding wick of flavors! Five uses left.',
         name: 'Filament'
      },
      drop: [ '<32>{#p/human}* (You threw away the filament.)' ],
      info: [ '<32>{#p/narrator}* "Filament" Heals 30 HP\n* A winding wick of flavors!\n* Five uses left.' ],
      name: 'Quintuple Filament',
      use: [ '<32>{#p/human}* (You siphoned the filament.)' ]
   },
   i_filament_use1: {
      battle: { description: 'A winding wick of flavors!\nFour uses left.', name: 'Filament' },
      info: [ '<32>{#p/narrator}* "Filament" Heals 21 HP\n* A winding wick of flavors!\n* Four uses left.' ],
      name: 'Quadruple Filament'
   },
   i_filament_use2: {
      battle: { description: 'A winding wick of flavors!\nThree uses left.', name: 'Filament' },
      info: [ '<32>{#p/narrator}* "Filament" Heals 14 HP\n* A winding wick of flavors!\n* Three uses left.' ],
      name: 'Triple Filament'
   },
   i_filament_use3: {
      battle: { description: 'A winding wick of flavors!\nTwo uses left.', name: 'Filament' },
      info: [ '<32>{#p/narrator}* "Filament" Heals 9 HP\n* A winding wick of flavors!\n* Two uses left.' ],
      name: 'Double Filament'
   },
   i_filament_use4: {
      battle: { description: 'A winding wick of flavors!\nOne use left.', name: 'Filament' },
      info: [ '<32>{#p/narrator}* "Filament" Heals 6 HP\n* A winding wick of flavors!\n* One use left.' ],
      name: 'Filament'
   },
   i_tablaphone: {
      battle: {
         description: 'Flat, but sharp. Restores some lost HP after each turn.',
         name: 'Tablaphone'
      },
      drop: [ '<32>{#p/human}* (You threw away the tablaphone.)' ],
      info: [ '<32>{#p/narrator}* "Tablaphone" (10 AT)\n* Flat, but sharp. Restores some lost HP after each turn.' ],
      name: 'Tablaphone',
      use: [ '<32>{#p/human}* (You equipped the tablaphone.)' ]
   },
   i_sonic: {
      battle: {
         description: "Land a critical hit to weaken the opposition's ATTACK.",
         name: 'Resonator'
      },
      drop: [ '<32>{#p/human}* (You threw away the resonator.)' ],
      info: [ '<32>{#p/narrator}* "Sonic Resonator" (11 DF)\n* Land a critical hit to weaken the opposition\'s ATTACK.' ],
      name: 'Sonic Resonator',
      use: [ '<32>{#p/human}* (You equipped the resonator.)' ]
   },
   i_mystery_food: {
      battle: {
         description: 'The kind of food you expect to find at a rec center.',
         name: 'Mysteryfood'
      },
      drop: [ '<32>{#p/human}* (You threw away the food.)' ],
      info: [ '<32>{#p/narrator}* "Mysteryfood" Heals 20 HP\n* The kind of food you expect to find at a rec center.' ],
      name: 'Mysteryfood',
      use: [ '<32>{#p/human}* (You ate the food.)' ]
   },
   i_super_pop: {
      battle: {
         description: 'Slows down time a LOT.\nOr alters your view of it...?',
         name: 'Hyper Pop'
      },
      drop: [ '<32>{#p/human}* (You threw away the pop.)' ],
      info: [
         '<32>{#p/narrator}* "Hyper Vortex Pop" Heals 22 HP\n* Slows down time a LOT.\n* Or alters your view of it...?'
      ],
      name: 'Hyper Vortex Pop',
      use: () => [
         '<32>{#p/human}* (You sucked on the pop.)',
         game.vortex
            ? '<32>{#p/human}* (Your perception of time is already shifted...)'
            : '<32>{#p/human}* (Your perception of time begins to shift...)'
      ]
   },
   i_old_gun: {
      battle: {
         description: 'A non-lethal single-use weapon.\nNot viable outside of battle.',
         name: 'Stun Gun'
      },
      drop: [ '<32>{#p/human}* (You threw away the gun.)' ],
      info: [ '<32>{#p/narrator}* A non-lethal single-use weapon.\n* Not viable outside of battle.' ],
      name: 'Stun Gun',
      use: () =>
         battler.active
            ? battler.target?.opponent.metadata.reactOld
               ? []
               : [ '<32>{#p/human}* (You took out the gun.)', '<32>{#p/human}* (Nothing happened.)' ]
            : [ '<32>{#p/human}* (You took out the gun.)', '<32>{#p/human}* (No effect outside of battle.)' ]
   },
   i_old_bomb: {
      battle: {
         description: 'A non-lethal single-use weapon.\nNot viable outside of battle.',
         name: 'Sleep Bomb'
      },
      drop: [ '<32>{#p/human}* (You threw away the bomb.)' ],
      info: [ '<32>{#p/narrator}* A non-lethal single-use weapon.\n* Not viable outside of battle.' ],
      name: 'Sleep Bomb',
      use: () =>
         battler.active
            ? battler.target?.opponent.metadata.reactOld
               ? []
               : [ '<32>{#p/human}* (You took out the bomb.)', '<32>{#p/human}* (Nothing happened.)' ]
            : [ '<32>{#p/human}* (You took out the bomb.)', '<32>{#p/human}* (No effect outside of battle.)' ]
   },
   i_old_spray: {
      battle: {
         description: 'A non-lethal single-use weapon.\nNot viable outside of battle.',
         name: 'Pepper Spray'
      },
      drop: [ '<32>{#p/human}* (You threw away the spray.)' ],
      info: [ '<32>{#p/narrator}* A non-lethal single-use weapon.\n* Not viable outside of battle.' ],
      name: 'Pepper Spray',
      use: () =>
         battler.active
            ? battler.target?.opponent.metadata.reactOld
               ? []
               : [ '<32>{#p/human}* (You took out the spray.)', '<32>{#p/human}* (Nothing happened.)' ]
            : [ '<32>{#p/human}* (You took out the spray.)', '<32>{#p/human}* (No effect outside of battle.)' ]
   },
   i_corndog: {
      battle: {
         description: 'Fresh from the microwave.',
         name: 'Corn Dog'
      },
      drop: [ '<32>{#p/human}* (You threw away the corn dog.)' ],
      info: [ '<32>{#p/narrator}* "Corn Dog" Heals 10 HP\n* Fresh from the microwave.' ],
      name: 'Corn Dog',
      use: [ '<32>{#p/human}* (You ate the corn dog.)' ]
   },
   i_corngoat: {
      battle: {
         description: "Like a corn dog, but fluffier.\nDon't question it.",
         name: 'Corn Goat'
      },
      drop: [ '<32>{#p/human}* (You threw away the corn goat.)' ],
      info: [ '<32>{#p/narrator}* "Corn Goat" Heals 20 HP\n* Like a corn dog, but fluffier.\n* Don\'t question it.' ],
      name: 'Corn Goat',
      use: [ '<32>{#p/human}* (You ate the corn goat.)' ]
   },
   i_moon_pie: {
      battle: {
         description: "A slice of pie from the earth's night sky.",
         name: 'Pie'
      },
      drop: [ '<32>{#p/human}* (You threw away the pie.)' ],
      info: [ '<32>{#p/narrator}* "Moon Pie" Heals 99 HP\n* A slice of pie from the earth\'s night sky.' ],
      name: 'Moon Pie',
      use: [ '<32>{#p/human}* (You ate the pie.)' ]
   },

   n_sidebarCellPms1: () => (save.data.n.bad_lizard < 2 ? 'POSTS' : 'PRIVATE MESSAGES'),
   n_sidebarCellPms2: 'Press [X] to Finish',
   n_sidebarCellPms3,
   n_sidebarCellPms4: '(NEW)',

   n_shop_bpants: {
      exit: () =>
         world.population === 0
            ? world.bullied && !world.genocide
               ? [ '<32>{#p/monster}{#k/6}* Any time, little bully.' ]
               : [ '<32>{#p/monster}{#k/6}* Any time, little murderer.' ]
            : [ '<32>{#p/monster}{#k/6}* Any time, little buddy.' ],
      item: () =>
         world.genocide || (world.population === 0 && !world.bullied)
            ? [
                 '38G - Startaint',
                 '80G - Hold Yer Pain',
                 '50G - Slam Dunk',
                 save.data.b.item_face_steak ? '§fill:#808080§--- TAKEN ---' : "200G - Undyne's Envy",
                 'Exit'
              ]
            : [
                 '19G - Starfaint',
                 '40G - Hold Yer Grane',
                 '25G - Slamburger',
                 save.data.b.item_face_steak ? '§fill:#808080§--- SOLD OUT ---' : "100G - Glyde's Envy",
                 'Exit'
              ],
      itemInfo: () =>
         world.genocide || (world.population === 0 && !world.bullied)
            ? [
                 'Heals -23HP\nSugar over-\ndose assured.',
                 'Heals -40HP\nNot quite a\nhero of\nany kind.',
                 'Heals -34HP\nFace the\npain.',
                 'Heals -55HP\nOnly for the\nmost die-\nhard folk.'
              ]
            : [
                 'Heals 23HP\nSugar over-\ndose likely.',
                 'Heals 40HP\nNot quite a\n"legendary\nhero."',
                 'Heals 34HP\nSlam it\ndown or face\nthe pain.',
                 "Heals 55HP\nIt's a long\nstory."
              ],
      itemPrompt: () =>
         world.population === 0
            ? '<09>{#p/monster}{#k/7}What do YOU want from me?'
            : '<09>{#p/monster}{#k/0}What do you want from me?',
      itemPurchase: () =>
         world.population === 0
            ? [
                 world.bullied && !world.genocide
                    ? '<09>{#p/monster}{#k/5}Thanks, little bully.'
                    : '<09>{#p/monster}{#k/5}Thanks, little murderer.',
                 '<09>{#p/monster}{#k/7}You gonna buy something or...?',
                 "<09>{#p/monster}{#k/6}That's the wrong amount of money.",
                 "<09>{#p/human}(You're carrying too much.)"
              ]
            : [
                 '<09>{#p/monster}{#k/0}Thanks, little buddy.',
                 '<09>{#p/monster}{#k/1}You gonna buy something or...?',
                 "<09>{#p/monster}{#k/6}That's the wrong amount of money.",
                 "<09>{#p/human}(You're carrying too much.)"
              ],
      itemPurchasePrompt: 'Buy it for\n$(x)G?',
      itemUnavailable: () =>
         world.population === 0
            ? '<09>{#p/monster}{#k/5}Sorry, that was one of a kind.'
            : '<09>{#p/monster}{#k/4}Sorry, that was one of a kind.',
      menu: () => [ 'Buy', 'Sell', 'Talk', 'Exit' ],
      menuPrompt1: () =>
         world.population === 0
            ? world.bullied && !world.genocide
               ? '<23>{#p/monster}{#k/5}* Heyyyy little bully.'
               : '<23>{#p/monster}{#k/5}* Heyyyy little murderer.'
            : '<23>{#p/monster}{#k/0}* What can I do for you, little buddy?',
      menuPrompt2: () =>
         world.population === 0
            ? '<23>{#p/monster}{#k/7}* Need anything else?'
            : '<23>{#p/monster}{#k/0}* Need anything else?',
      sell1: () =>
         world.population === 0
            ? [ '<30>{#p/monster}{#k/1}* ...', '<30>{#k/4}* ...', '<30>{#k/3}* No.' ]
            : [
                 '<30>{#p/monster}{#k/1}* ...',
                 '<30>{#k/4}* ...',
                 "<30>{#k/6}* You think you're real sly, huh?",
                 "<30>{#k/7}* Hmm...\n* Why don't you try selling that to Catty and Bratty?",
                 '<30>{#k/0}* I\'m sure they\'ll, uh, "bite."'
              ],
      sell2: [ "<30>{#p/monster}{#k/6}* It's not happening, pal." ],
      talk: () => [
         [ 'Life Advice', '§fill:#ff0§Taking Charge (NEW)', 'Taking Charge' ][
            Math.min(save.data.n.shop_bpants_advice, 2)
         ],
         'Mettaton',
         [ 'Where We Are', '§fill:#ff0§Glyde (NEW)', 'Glyde' ][Math.min(save.data.n.shop_bpants_hub, 2)],
         'Your Future',
         'Exit'
      ],
      talkPrompt: () =>
         world.population === 0
            ? world.bullied && !world.genocide
               ? '<09>{#p/monster}{#k/0}Take it from me, little bully.'
               : '<09>{#p/monster}{#k/0}Take it from me, little murderer.'
            : '<09>{#p/monster}{#k/0}Take it from me, little buddy.',
      talkText: (i: number) => {
         switch (i as 0 | 1 | 2 | 3) {
            case 0:
               return world.population === 0
                  ? [
                       '<32>{#p/monster}{#k/6}* Taking charge, huh?',
                       "<32>{#k/6}* Shucks, I'd have thought you'd be pretty knowledgable in that department.",
                       "<32>{#k/5}* It's a skill you've abused this whole time, right?"
                    ]
                  : [
                       [
                          "<32>{#p/monster}{#k/6}* Listen, buddy.\n* If you want to get ahead in life, you've got to learn to take charge.",
                          '<32>{#k/4}* Mettaton pushed me around for far too long, and I wasted a whole year of my short life not telling him "no."',
                          '<32>{#k/0}* When I finally stood up to him, well...',
                          '<32>{#k/2}* It did us both some good.'
                       ],
                       [
                          "<32>{#p/monster}{#k/6}* I'll try to make this as simple as possible for you, little buddy.",
                          '<32>* As nice as people are, sometimes they get caught in bad ways of thinking.',
                          '<32>{#k/4}* Short-sightedness.\n* Carelessness.\n* Abuse.',
                          '<33>{#k/4}* The nicest thing you can do for someone like that is to give them a piece of your mind. Tell them how wrong they are and make them think about it.',
                          '<32>{#k/7}* The more you let someone get comfortable with their bad way of life, the more they get stuck in those ways.',
                          "<32>{#k/0}* Don't let people get stuck."
                       ],
                       [
                          "<32>{#p/monster}{#k/1}* I'm not your counselor, pal.",
                          '<32>{#k/7}* ...',
                          '<32>{#k/0}* Sorry.\n* Just... remember my words.'
                       ]
                    ][Math.min(save.data.n.shop_bpants_advice++, 2)];
            case 1:
               return world.population === 0
                  ? [
                       '<32>{#p/monster}{#k/4}* Mettaton...',
                       ...(!world.genocide || save.data.n.plot < 68
                          ? [
                               "<32>{#p/monster}{#k/6}* I'd rant about HIM, but YOU make him look like a saint.",
                               '<32>{#p/monster}{#k/5}* I guess you could call that an accomplishment... of a terrible, terrible sort.'
                            ]
                          : [
                               "<32>{#p/monster}{#k/4}* I'd rant about him, but uh...\n* Since you killed him...",
                               "<32>{#p/monster}{#k/5}* I don't really think there's much to say."
                            ])
                    ]
                  : [
                       '<32>{#p/monster}{#k/4}* Why does it always have to be about him...',
                       "<32>{#k/0}* Yeah, he's a bit of an icon around here.\n* Everybody loves him...",
                       '<32>{#k/6}* Except for yours truly, of course. I spit on him with every breath I take.',
                       "<32>{#k/5}* No, really.\n* I've got a little figurine of him under the counter, and I make sure as much saliva as possible hits his face.",
                       "<32>{#k/4}* You wouldn't BELIEVE the crap he put me through working here...",
                       '<32>{#k/6}* After he got out of my way I gracefully stripped the shop of all the MTT-brand trimmings.',
                       '<32>* Oh, and of course I renamed all the food items.',
                       '<32>{#k/5}* I wanted to rename "Legendary Hero" to "Her Ye Olde Gran" but I figured that wouldn\'t fly well with the older folks.',
                       '<32>{#k/0}* ...',
                       '<32>{#k/7}* What?\n* Were you expecting me to talk about his business or something?'
                    ];
            case 2:
               return world.population === 0
                  ? [
                       '<32>{#p/monster}{#k/0}* ...',
                       "<32>{#k/0}* We're in hell, my friend.\n* Absolute hell.",
                       '<32>{#k/1}* ...',
                       "<32>{#k/3}* Gosh, isn't talking to you JUST SO MUCH FUN!?!?"
                    ]
                  : [
                       [
                          '<32>{#p/monster}{#k/6}* Where we are, eh?',
                          '<32>{#k/4}* This place is... a little weird...',
                          '<32>{#k/0}* King Asgore had it built as a way to "bring monsters together."',
                          "<32>{#k/7}* Now it's... just kind of this place that exists.\n* There's food, there's rest, and sometimes they run shows here.",
                          '<32>{#k/6}* Oh, and, this is where they host the OuterNet.\n* Catty and Bratty are in charge of the news.',
                          "<32>{#k/4}* Well, actually, they're in charge of this place as a whole.",
                          "<32>{#k/0}* After Mettaton left, I told them they could take over.\n* Besides, I've got my own thing going for me now...",
                          "<32>{#k/2}* I guess I'm just a little tired.",
                          "<32>{#k/3}* But hey, who has time for THAT when you've got people like GLYDE hanging around, huh!?"
                       ],
                       [
                          '<32>{#p/monster}{#k/6}* Haha... let me tell you about this showboating know-it-all.',
                          '<32>{#k/0}* Back when I worked for Mettaton, I regularly had to make this thing called a "face steak."',
                          '<32>{#k/1}* For the record, that\'s a steak with Mettaton\'s "fabulous" face on it.',
                          '<32>{#k/3}* But Glyde?\n* Glyde loved it so much it decided to make its own "steak empire" by putting ITS face on steaks instead!',
                          "<32>{#k/3}* And as if that wasn't crazy enough, Glyde BID on me to be its first employee!\n* Like I'm up for auction or something!",
                          "<32>{#k/4}* Of course, Mettaton wasn't going to let me go that easily, so I ended up staying here.",
                          '<32>{#k/0}* Long story short, Glyde never got what it wanted, and now it just goes about making threats and demands, hoping people will join its "crusade."',
                          "<32>{#k/1}* I don't know if Glyde ever managed to rope anyone in, but if so, I wish those poor saps the best of luck.",
                          "<32>{#k/7}* With a maniac like Glyde in charge, they'll NEED it..."
                       ],
                       [
                          "<32>{#p/monster}{#k/4}* I've told you all I really know about Glyde.",
                          "<32>{#k/7}* Maybe there's something buried somewhere in its past to explain why it acts this way...",
                          '<32>{#k/1}* God knows what that is.'
                       ]
                    ][Math.min(save.data.n.shop_bpants_hub++, 2)];
            case 3:
               return world.population === 0
                  ? world.bullied
                     ? [
                          '<32>{#p/monster}{#k/5}* My future, huh?\n* I dunno, little bully...',
                          '<32>{#p/monster}{#k/6}* You tell me.'
                       ]
                     : [
                          '<32>{#p/monster}{#k/5}* Ohhhhh trust me, my little whiny-heinie death-defying slaughter-happy murderer...',
                          "<32>{#k/6}* My future's secure.",
                          "<32>{#k/2}* Besides, an old buddy of mine told me how I can't be hurt here.",
                          "<32>{#k/5}* You're NEVER getting me."
                       ]
                  : [
                       '<32>{#p/monster}{#k/0}* MY future?\n* Little buddy...',
                       '<32>{#k/3}* You should be thinking about your future!',
                       '<32>{#k/4}* ...',
                       "<32>{#k/6}* Don't worry, pal.\n* With that rectangular rabble-rouser off my back, I've got a bright future ahead of me."
                    ];
         }
      }
   },
   n_shop_gossip: {
      exit: () =>
         evac()
            ? [ '<32>{#p/narrator}* ...' ]
            : [
                 {
                    b: '<16>{#k/0/0}{@fill:#ffbbdc}* Like, see you later!',
                    c: '<16>* Like, later and stuff!',
                    s: true
                 }
              ],
      item: () =>
         evac()
            ? [
                 '0G - Space Junk',
                 save.data.b.item_laser ? '§fill:#808080§--- TAKEN ---' : '0G - Arc Laser',
                 save.data.b.item_visor ? '§fill:#808080§--- TAKEN ---' : '0G - Tactical Gauntlet',
                 save.data.b.item_mystery_key ? '§fill:#808080§--- TAKEN ---' : '0G - Mystery Key',
                 'Exit'
              ]
            : [
                 '10G - Space Junk',
                 save.data.b.item_laser ? '§fill:#808080§--- TAKEN ---' : '180G - Arc Laser',
                 save.data.b.item_visor ? '§fill:#808080§--- TAKEN ---' : '180G - Tactical Gauntlet',
                 save.data.b.item_mystery_key ? '§fill:#808080§--- SOLD OUT ---' : '400G - Mystery Key',
                 'Exit'
              ],
      itemInfo: [
         'Heals ??HP\nCould be\nanything.',
         "Weapon: 12AT\n($(x) AT)\nHit 'em all\nat once.",
         'Armor: 12DF\n($(x) DF)\nAiming made\neasier.',
         'Special:\nThe key to\nan unknown\nlocation.'
      ],
      itemPrompt: '<99>{#p/monster}{#k/0/9}{@fill:#d4bbff}You\nshould\nbuy ALL\nour stuff!',
      itemPurchase: [
         "<09>{#p/monster}{#k/1/8}{@fill:#d4bbff}Bratty!\nWe're gonna be rich!",
         '<09>{#p/monster}{#k/0/4}{@fill:#d4bbff}So are you gonna buy it??',
         '<09>{#p/monster}{#k/4/5}{@fill:#d4bbff}You need WAY more money.',
         "<09>{#p/human}(You're carrying too much.)"
      ],
      itemPurchasePrompt: () => (evac() ? 'Take it?' : 'Buy it for\n$(x)G?'),
      itemUnavailable: () =>
         evac()
            ? '<09>{#p/narrator}Nothing left.'
            : "<09>{#p/monster}{#k/5/1}{@fill:#d4bbff}We're all sold out!\nMee-YOW!",
      menu: () => (evac() ? [ 'Take', 'Steal', 'Read', 'Exit' ] : [ 'Buy', 'Sell', 'Talk', 'Exit' ]),
      menuPrompt1: '<23>{#p/monster}{#k/0/0}{@fill:#ffbbdc}* Check it out!',
      menuPrompt2: '<23>{#p/monster}{#k/0/0}{@fill:#ffbbdc}* No rush or anything.',
      menuPrompt3: () =>
         world.bullied ? '<23>{#p/narrator}* ...but everybody ran.' : '<23>{#p/narrator}* ...but nobody came.',
      note: () => [
         "<32>{#p/narrator}* There's a series of notes here.",
         {
            b: '<16>* "If you\'re reading this..."',
            c: world.bullied
               ? '<16>* "Then, like, bad news you mega-annoying weirdo!"'
               : '<16>* "Then, like, bad news you mega-evil weirdo!"'
         },
         ...[
            [
               save.data.n.bad_lizard < 2
                  ? {
                       b: '<16>* "We\'re not gonna stick around while you just..."',
                       c: '<16>* "...beat everyone up and stuff."'
                    }
                  : {
                       b: '<16>* "Alphys came through here, and she\'s taking us..."',
                       c: '<16>* "...somewhere super duper safe!"'
                    },
               {
                  b: '<16>* "But first, we gotta use up these gel pens."',
                  c:
                     save.data.n.bad_lizard < 2
                        ? '<16>* "Yeah, we don\'t wanna waste pens!"'
                        : '<16>* "Yeah, chill, Alphys!"\n* "We don\'t wanna waste pens!"'
               },
               {
                  b: '<16>* "And don\'t even think about stealing our stuff."',
                  c: '<16>* "Yeah, creep!"\n* "Leave our junk alone!"'
               },
               {
                  b: '<16>* "Old second-hand junk, to be specific."',
                  c: '<16>* "Yeah, our used antique store is CRAZY valuable!"'
               }
            ],
            [
               {
                  b: '<16>* "Mettaton came through here, and he\'s taking everyone..."',
                  c: '<16>* "...somewhere super duper safe!"'
               },
               { b: '<16>* "But Alphys..."', c: '<16>* "Alphys."' },
               { b: '<16>* "She seemed..."', c: '<16>* "...super duper pissed."' },
               {
                  b: '<16>* "I\'ve never seen her like that before."',
                  c: '<16>* "I\'ve never seen ANYTHING like that before."',
                  s: true
               },
               { b: '<16>* "And Mettaton..."', c: '<16>* "...isn\'t very happy either."' },
               {
                  b: '<16>* "He says he\'s gonna slap your face."',
                  c: '<16>* "He says he\'s gonna kick your butt!"',
                  s: true
               },
               { b: '<16>* "Or did he say he\'d destroy you...?"', c: '<16>* "Uh... I forgot."' },
               { b: '<16>* "Well, I\'d be CRAZY afraid if I were you."', c: '<16>* "God, TELL me about it..."' }
            ]
         ][Math.max(save.data.n.bad_lizard - 2, 0)],
         { b: '<16>* "Anyway, in closing, you\'re a total loser."', c: '<16>* "Yeah!"\n* "Loser!!"\n* "Nya ha ha!!!"' },
         { b: '<16>* "Signed,\n  Bratty <3"', c: '<16>* "Signed,\n  Catty <3"', s: true }
      ],
      sell1: () =>
         evac()
            ? [ '<30>{#p/human}* (You took 137G from behind the counter.)' ]
            : [
                 {
                    b: "<16>{#k/0/0}* Thanks, but we, like, don't really need anything.",
                    c: '<16>{#k/0/8}* Oh my god, can you get us those new "Slamburgers?"'
                 },
                 {
                    b: "<16>{#k/2/8}* We don't.\n* Really need.\n* Anything.",
                    c: "<16>{#k/1/7}* Wait! I'll pay 1000G if you get Mettaton to autograph my butt!"
                 }
              ],
      sell2: () =>
         evac()
            ? [ '<30>{#p/narrator}* Nothing left.' ]
            : [
                 {
                    b: '<16>{#k/1/0}* If you really want us to have something...',
                    c: '<16>{#k/1/2}* ...you could drop it off at the pickup location in Aerialis!'
                 },
                 {
                    b: '<16>{#k/2/0}* But how would they know where it is?',
                    c: "<16>{#k/2/4}* OMG you're right... they probably don't..."
                 },
                 {
                    b: "<16>{#k/5/8}* Guess you'll have to find it for yourself!",
                    c: "<16>* Guess you'll need to look for it yourself!",
                    s: true
                 }
              ],
      talk: () => [
         'About You',
         'Thrift Shop',
         [ 'Area Ownership', '§fill:#ff0§Burgie (NEW)', 'Burgie' ][Math.min(save.data.n.shop_gossip_hub, 2)],
         [ 'Alphys', '§fill:#ff0§Royal Scientist (NEW)', '§fill:#ff0§Asgore (NEW)', 'Asgore' ][
            Math.min(save.data.n.shop_gossip_alphys, 3)
         ],
         'Exit'
      ],
      talkPrompt: "<09>{#p/monster}{#k/0/0}{@fill:#ffbbdc}So, like, what's up?",
      talkText: (i: number) => {
         switch (i as 0 | 1 | 2 | 3) {
            case 0:
               return [
                  {
                     b: "<16>{#k/0/0}* I'm Bratty, and this is my best friend, Catty.",
                     c: "<16>* I'm Catty, and this is my best friend, Bratty.",
                     s: true
                  },
                  {
                     // third parameter is for music control
                     b: '<16>{#k/2/6/0}',
                     c: '',
                     s: true
                  },
                  {
                     b: '<16>{#k/5/8}* Mmm hm hm!',
                     c: '<16>* Nya ha ha!',
                     s: true
                  },
                  '{#k/0/0/1}{%}'
               ];
            case 1:
               return [
                  {
                     b: "<16>{#k/0/6}* It's like, a second-hand store.",
                     c: "<16>{#k/0/2}* No it's like, a BARGAIN outlet!"
                  },
                  {
                     b: '',
                     c: '<16>{#k/2/9}* And get a load of our GENIUS business model...',
                     s: true
                  },
                  {
                     b: '<16>{#k/0/6}* People send us their old junk...',
                     c: '',
                     s: true
                  },
                  {
                     b: '<16>{#k/5/8}* ...so we can sell it like new again!',
                     c: '<16>* ...so we can sell it like new again!',
                     s: true
                  },
                  {
                     b: "<16>{#k/0/1}* You won't find a shop this sick anywhere else.",
                     c: "<16>* You won't find stuff like ours anywhere else.",
                     s: true
                  }
               ];
            case 2:
               return [
                  [
                     {
                        b: "<16>{#k/2/1}* Oh yeah, we're technically the owners here.",
                        c: '<16>* Oh yeah, we practically RULE this zone.',
                        s: true
                     },
                     {
                        b: '<16>{#k/2/1}* So like, originally, Mettaton was in charge here, right?',
                        c: '<16>{#k/1/1}* Totally in charge.'
                     },
                     {
                        b: '<16>{#k/2/5}* But then...',
                        c: '<16>* Then...'
                     },
                     {
                        b: '<16>{#k/4/4}* Burgie decided to "overthrow" him.',
                        c: '',
                        s: true
                     },
                     {
                        b: '',
                        c: '<16>{#k/2/4}* By having, like, a really strong word with him or something.',
                        s: true
                     },
                     {
                        b: '<16>{#k/2/6/0}',
                        c: '',
                        s: true
                     },
                     {
                        b: '<16>{#k/2/6}* I think he blackmailed him.',
                        c: '<16>* I think he had an accomplice.',
                        s: true
                     },
                     {
                        b: '<16>{#k/1/0/1}* Anyway, he said we could be the new owners.',
                        c: "<16>* We haven't questioned it since."
                     }
                  ],
                  [
                     {
                        b: '<16>{#k/2/0}* Burgie?',
                        c: '',
                        s: true
                     },
                     {
                        b: "<16>{#k/0/5}* Yeah, he's alright.",
                        c: "<16>* Eh, he's cool.",
                        s: true
                     },
                     {
                        b: '<16>{#k/2/6}* He used to act all weird around us, but...',
                        c: '<16>* ...he kinda keeps to himself now.'
                     },
                     {
                        b: '<16>{#k/0/5}* Like, the last time we heard from him...',
                        c: '',
                        s: true
                     },
                     {
                        b: '<16>{#k/0/5}* He said he was "done chasing fantasies" or something.',
                        c: '<16>* He said he was "done seeking love" or whatever.',
                        s: true
                     },
                     {
                        b: '<16>{#k/2/6}* Kinda sounds like...',
                        c: '<16>* Sorta feels like...',
                        s: true
                     },
                     {
                        b: '<16>{#k/5/8}* He TOTALLY saw us as a fantasy.',
                        c: '<16>* He DEFINITELY had a crush on us.',
                        s: true
                     },
                     {
                        b: '',
                        c: '<16>{#k/4/5}* Too bad he never asked us out, huh?',
                        s: true
                     },
                     {
                        b: '<16>{#k/2/5}* Catty, we would have said no.',
                        c: '',
                        s: true
                     },
                     {
                        b: '',
                        c: '<16>{#k/2/1}* ...or would we have said yes?',
                        s: true
                     },
                     {
                        b: '<16>{#k/4/1}* No.',
                        c: '',
                        s: true
                     },
                     {
                        b: '',
                        c: '<16>{#k/4/8}* Yes.',
                        s: true
                     },
                     {
                        b: '<16>{#k/1/8}* No.',
                        c: '',
                        s: true
                     },
                     {
                        b: '',
                        c: '<16>{#k/1/7}* YES!',
                        s: true
                     },
                     {
                        b: '<16>{#k/4/7}* ...',
                        c: '',
                        s: true
                     },
                     {
                        b: "<16>{#k/5/6}* Catty, don't you have ANY standards?",
                        c: '',
                        s: true
                     },
                     {
                        b: '',
                        c: '<16>{#k/5/8}* Nope!!!',
                        s: true
                     }
                  ],
                  [
                     {
                        b: "<16>{#k/0/0}* There's not much more to say about Burgie, but-",
                        c: '<16>{#k/0/8}* ...no, wait!\n* Can you go ask him to make us some food?'
                     },
                     {
                        b: '<16>{#k/4/8}* Catty!',
                        c: '',
                        s: true
                     },
                     {
                        b: '',
                        c: "<16>{#k/4/1}* What?\n* You know I'd take it from a bad boy like him any day.",
                        s: true
                     },
                     {
                        b: '<16>{#k/2/4/0}',
                        c: '',
                        s: true
                     },
                     {
                        b: '<16>{#k/2/8}* You did not just say that out loud.',
                        c: '<16>* Mee-YOW!',
                        s: true
                     },
                     '{#k/0/0/1}{%}'
                  ]
               ][Math.min(save.data.n.shop_gossip_hub++, 2)];
            case 3:
               return [
                  [
                     { b: '<16>{#k/4/4}* Oh my god.\n* Alphys.', c: '<16>* Oh my god, ALPHYS.', s: true },
                     {
                        b: '<16>{#k/5/8}* She used to live on our housing tier!',
                        c: '<16>* She was like a big sister!',
                        s: true
                     },
                     {
                        b: '<16>{#k/2/6}* I mean, like, if your big sister...',
                        c: '<16>{#k/2/2}* ...takes you on rip- roaring interstellar trash hunts!'
                     },
                     {
                        b: '<16>{#k/0/0}* She showed us the coolest ways to find stuff.',
                        c: '<16>* She built up a WICKED sci-fi collection.',
                        s: true
                     },
                     {
                        b: '<16>{#k/2/4}* Then she became the royal scientist...',
                        c: '',
                        s: true
                     },
                     {
                        b: '',
                        c: "<16>{#k/0/5}* ...she doesn't really have time for trash-hunting anymore.",
                        s: true
                     }
                  ],
                  [
                     {
                        b: '<16>{#k/0/6}* So Alphys has always been, like...',
                        c: '<16>{#k/0/0}* ...super duper smart.'
                     },
                     { b: '<16>{#k/2/4}* Like...', c: '<16>* UNNATURALLY smart.' },
                     {
                        b: '<16>{#k/0/0}* Like, she can calculate a derivative in her head...',
                        c: '<16>{#k/0/2}* ...in five seconds FLAT!'
                     },
                     {
                        b: "<16>{#k/0/0}* It's MEGA impressive and all...",
                        c: '',
                        s: true
                     },
                     {
                        b: '<16>{#k/2/5}* ...but as a result, she struggles with her impulses sometimes.',
                        c: '',
                        s: true
                     },
                     {
                        b: '',
                        c: '<16>{#k/1/6}* I remember that time she called in half the royal guard...',
                        s: true
                     },
                     {
                        b: '',
                        c: '<16>{#k/5/4}* ...when she thought she saw some "intriguing trash."',
                        s: true
                     },
                     {
                        b: "<16>{#k/2/6}* It's like...",
                        c: "<16>* She doesn't process things the way most people do."
                     },
                     {
                        b: "<16>{#k/5/8}* But we love her for that, don't we?",
                        c: "<16>* But we still think she's A-MAZ-ING!",
                        s: true
                     },
                     {
                        b: '<16>{#k/4/0}* So like... OBVIOUSLY Asgore made her the royal scientist.',
                        c: '<16>{#k/0/2}* Oh, for sure!'
                     }
                  ],
                  [
                     {
                        b: '<16>{#k/0/0}* Oh right, THAT goofy goober.',
                        c: '<17>{#k/0/8}* Oh yeah, THAT furry fuzzball!',
                        s: true
                     },
                     {
                        b: "<16>{#k/2/0}* So like, here's the thing about Asgore...",
                        c: "<16>* ...he's one of the NICEST guys you'll ever meet."
                     },
                     ...[
                        [
                           {
                              b: '<16>{#k/2/0}* But, at the same time...',
                              c: '<16>{#k/2/4}* ...the stuff everyone wants him to do...'
                           },
                           {
                              b: "<16>{#k/4/5}* ...it's kind of gross.",
                              c: "<16>* ...it's just plain awful.",
                              s: true
                           },
                           {
                              b: '<16>{#k/2/6}* I heard Undyne lobbied to expand the royal guard.',
                              c: "<16>{#k/2/6}* Yeah, didn't Asgore, like, not even want one to begin with?"
                           }
                        ],
                        [
                           {
                              b: '<16>{#k/2/0}* But, at the same time...',
                              c: "<16>{#k/2/4}* ...the stuff you've been up to out there..."
                           },
                           {
                              b: "<16>{#k/4/5}* ...well, it's making his job a little tougher.",
                              c: "<16>* ...well, it's making his life a little harder.",
                              s: true
                           },
                           {
                              b: '<16>{#k/2/6}* Like...',
                              c: "<16>{#k/2/6}* ...maybe try NOT to kill anyone else, y'know?"
                           }
                        ]
                     ][save.data.n.bad_lizard],
                     {
                        b: '<16>{#k/3/6}* Gosh.\n* I really wanna give him a hug right now.',
                        c: '<16>{#k/3/2}* Yeah, we should TOTALLY squeeze the life outta him later!'
                     },
                     {
                        b: '<16>{#k/4/5/0}* ...',
                        c: '<16>* ...',
                        s: true
                     },
                     {
                        b: '<16>{#k/5/8}* Catty, no!',
                        c: '<16>* Nya ha ha!',
                        s: true
                     },
                     '{#k/0/0/1}{%}'
                  ],
                  [
                     [
                        {
                           b: "<16>{#k/0/0}* Hey, there's no need to be afraid of him.",
                           c: '',
                           s: true
                        },
                        {
                           b: '',
                           c: "<16>{#k/0/1}* Yeah, he's WAY too adorable for that.",
                           s: true
                        },
                        {
                           b: '<16>{#k/5/1}* Way too adorable!',
                           c: '',
                           s: true
                        }
                     ],
                     [
                        {
                           b: "<16>{#k/0/0}* Hey, I'm sure he'll understand why you did what you did.",
                           c: '',
                           s: true
                        },
                        {
                           b: '',
                           c: "<16>{#k/0/2}* Yeah, he's like, Asgore after all!",
                           s: true
                        },
                        {
                           b: "<16>{#k/4/6}* It's basically his job.",
                           c: '',
                           s: true
                        }
                     ]
                  ][save.data.n.bad_lizard]
               ][Math.min(save.data.n.shop_gossip_alphys++, 3)];
         }
      },
      zeroPrompt: '<09>{#p/narrator}...'
   },

   p_alphys: <Partial<CosmosKeyed<CosmosProvider<string[]>, string>>>{},

   s_save: {
      a_start: {
         name: 'Aerialis - Lab',
         text: [ '<32>{#p/human}* (The royal lab looms ahead, filling you with determination.)' ]
      },
      a_path3: {
         name: 'Aerialis - Liftway',
         text: [ '<32>{#p/human}* (Hovering from place to place fills you with determination.)' ]
      },
      a_elevator1: {
         name: 'Aerialis - R1 Elevator',
         text: [ '<32>{#p/human}* (Explosion-fueled joyrides fill you with determination.)' ]
      },
      a_mettaton2: {
         name: 'Aerialis - Stage Two',
         text: [ "<32>{#p/human}* (Mettaton's ludicrous hijinks fill you with determination.)" ]
      },
      a_aftershow: {
         name: 'Aerialis - Rec Center',
         text: [ '<32>{#p/human}* (Over-dramatic musicals and unexpected burger cats fill you with determination.)' ]
      },
      a_core_entry1: {
         name: 'Aerialis - CORE',
         text: [ '<32>{#p/human}* (The cold and computerized nature of this place fills you with determination.)' ]
      },
      a_core_checkpoint: {
         name: 'Aerialis - Maintenance Zone',
         text: [ '<32>{#p/human}* (Making your way through the CORE fills you with determination.)' ]
      }
   }
};

export default text;

CosmosUtils.status(`LOAD MODULE: AERIALIS TEXT (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
