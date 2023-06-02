import assets from '../assets';
import { CosmosKeyed, CosmosProvider } from '../engine';
import { pager, world } from '../mantle';
import save from '../save';

const solo = () => save.data.n.plot_date < 2 || world.trueKills > 0;

export const p_papyrus = <Partial<CosmosKeyed<CosmosProvider<string[]>>>>{
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
                 "<18>{#p/papyrus}SEE?\nSHE'S NOT- {%}",
                 "<25>{#p/undyne}{#f/17}* I'd only steal from someone who ISN'T the nicest punk around!",
                 '<18>{#p/papyrus}{#f/1}UNDYNE!!!'
              ]
   ),
   s_alphys: pager.create(
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
                 '<18>{#f/5}ALL THE PUZZLING AND BATTLING AND DATING WE DID...',
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
                 '<25>{#p/undyne}{#f/17}* Wh- huh?\n* I mean... yes!!!\n* But what do I- {%}',
                 '<18>{#p/papyrus}ALMOST-PERFECTION.\nHOW ABOUT THAT?',
                 '<25>{#p/undyne}{#f/12}* Sounds good.'
              ])
      ],
      () =>
         solo()
            ? [ '<18>{#p/papyrus}MY BROTHER HELPED ME FIND THE BOX.' ]
            : [ '<18>{#p/papyrus}THANK YOU, HUMAN...', '<18> FOR BEING MY ALMOST- PERFECT FRIEND.' ]
   ),
   s_doggo: pager.create(
      'limit',
      () => [
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
      [ '<18>{#p/papyrus}{#f/5}IF YOU EVER FEEL LOST, JUST REMEMBER...', '<18>{#f/0}THIS SKELE-PHONE IS ALWAYS ON CALL.' ]
   ),
   s_lookout: () => [
      '<18>{#p/papyrus}{#f/5}LIFE AS A BUILDER BOT MUST BE TOUGH.',
      '<18>{#f/5}BE KIND TO THOSE WHOSE INTELLIGENCE IS ARTIFICIAL.',
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
   ],
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
   s_stand: pager.create(
      'limit',
      () => [
         '<18>{#p/papyrus}HAVE YOU EVER HEARD OF "NICE CREAM?"',
         "<18>{#f/0}SANS SAID IT'S THE BEST THING THIS SIDE OF THE TOWN.",
         ...(solo()
            ? [ '<18>{#f/0}WHERE DO I FIND THIS "NICE CREAM?"', '<18>{#f/7}I WANT SOME NICE CREAM!' ]
            : [
                 '<25>{#p/undyne}{#f/1}* Oh, hey, did I ever tell you?',
                 '<18>{#p/papyrus}TELL ME WHAT?',
                 '<25>{#p/undyne}{#f/1}* One time, when I was out for ice cream with Alphys...',
                 '<25>{#f/8}* I downed 6 cones in one go!\n* Fuhuhu!',
                 '<18>{#p/papyrus}{#f/6}WH-\nWERE YOU ALRIGHT???',
                 '<25>{#p/undyne}{#f/14}* Of course!',
                 '<18>{#p/papyrus}{#f/4}OF COURSE.'
              ])
      ],
      () =>
         solo()
            ? [ "<18>{#p/papyrus}{#f/5}...I'D SETTLE FOR AN EXOBERRY JELL-O PIE." ]
            : [ "<18>{#p/papyrus}{#f/4}DON'T WORRY, THIS IS TOTALLY NORMAL FOR HER." ]
   ),
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
                 '<18>{#f/4}BUT I GET THE FEELING IT HAS TO DO WITH KETCHUP.',
                 '<18>{#f/0}YOU KNOW, IF HE STOPPED THINKING OF CONDIMENTS...',
                 '<18>{#f/0}HE MIGHT ACTUALLY "KETCHUP" ON HIS SENTRY DUTIES!'
              ]
            : [
                 "<25>{#p/undyne}{#f/1}* Oh yeah, aren't you guys linked or something?",
                 '<18>{#p/papyrus}FOR AS LONG AS WE CAN REMEMBER!',
                 '<25>{#p/undyne}{#f/1}* I heard they did experiments with skeletons in the past.',
                 "<25>{#f/8}* If you and Sans were the result, it MUST'VE been a success!",
                 '<18>{#p/papyrus}{#f/1}ME, AN EXPERIMENT!?',
                 "<18>{#f/7}THAT'S PREPOSTEROUS!",
                 '<25>{#p/undyne}{#f/14}* Well, you never know!',
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
                 '<25>{#f/11}* I talked to her just the other day...',
                 "<25>* I swear there's something weird going on with her.",
                 "<18>{#p/papyrus}{#f/4}NOW THERE'S A REAL PUZZLE..."
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
                 '<25>{#f/1}* You just have a- {%}',
                 '<18>{#p/papyrus}{#f/7}YES, YES, I KNOW!\nSANS HAS REMINDED ME PLENTY.',
                 '<18>{#f/4}YOU SEE, HUMAN...',
                 "<18>{#f/4}WE MONSTERS DON'T REALLY USE BRAINS TO THINK.",
                 "<18>{#f/0}IT'S MORE LIKE... A SOUL THING.",
                 '<25>{#p/undyne}{#f/8}* As opposed to a SKULL thing.',
                 '<18>{#p/papyrus}{#f/7}OH MY GOSH!!!'
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
         '<18>{#p/papyrus}{#f/9}STANDING AT THE SITE OF OUR LEGENDARY BATTLE?',
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
      () =>
         save.data.n.plot < 34
            ? []
            : save.data.n.plot < 35
            ? [
                 '<18>{#p/papyrus}{#f/0}FUNNY YOU CALL ME RIGHT NOW...',
                 '<18>{#f/5}I JUST LEFT A MEETING WITH UNDYNE.',
                 '<18>{#f/5}SHE UM...',
                 "<18>{#f/5}LET'S JUST SAY SHE ISN'T YOUR BIGGEST FAN."
              ]
            : solo()
            ? [
                 '<18>{#p/papyrus}{#f/0}UNDYNE AND I MEET HERE TO DISCUSS THINGS SOMETIMES.',
                 '<18>{#f/4}THE THINGS WE DISCUSS, HOWEVER...',
                 "<18>{#f/4}...DON'T TEND TO BE PLEASANT."
              ]
            : [
                 '<18>{#p/papyrus}{#f/0}UNDYNE AND I MET HERE TO DISCUSS THINGS SOMETIMES.',
                 '<18>{#f/4}THE THINGS WE DISCUSSED, HOWEVER...',
                 "<18>{#f/4}...DIDN'T TEND TO BE PLEASANT.",
                 '<25>{#p/undyne}{#f/10}* Given what we know about the kid now...?',
                 "<25>{#f/9}* Yeah, you're probably right.",
                 "<25>{#f/16}* I almost can't believe I tried to kill you..."
              ],
      () =>
         save.data.n.plot < 34
            ? []
            : save.data.n.plot < 35
            ? [ '<18>{#p/papyrus}{#f/4}SHE MAY OR MAY NOT WANT TO HARM YOU... A LOT.' ]
            : solo()
            ? [ '<18>{#p/papyrus}{#f/3}HUMANS THIS, HUMANS THAT... SHE NEVER STOPS.' ]
            : [ "<18>{#p/papyrus}{#f/0}DON'T WORRY.\nUNDYNE DOESN'T WANT TO KILL YOU.", '<18>{#f/6}WELL, NOT ANYMORE...' ]
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
      save.data.n.plot < 48
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
         '<18>{#p/papyrus}{#f/4}THE LAYOUT OF THIS ROOM MIGHT SEEM ODD AT FIRST...',
         '<18>{#f/0}BUT THE DESIGN IS NO ACCIDENT.',
         '<18>SPATIAL ANOMALIES ARE QUITE COMMON IN THIS AREA.',
         '<18>THEY HAD TO BUILD THE PATH AROUND THEM.',
         ...(solo()
            ? []
            : [
                 '<25>{#p/undyne}{#f/4}* Spatial anomalies??\n* Why did nobody tell me about this!',
                 '<18>{#p/papyrus}{#f/6}I MEAN, THE TOPIC NEVER REALLY CAME UP, SO I- {%}',
                 "<25>{#p/undyne}{#f/17}* Papyrus!!\n* I'm picking on you.\n* It's alright!",
                 '<18>{#p/papyrus}{#f/4}OH.\nRIGHT.',
                 '<18>{#p/papyrus}{#f/0}GOOD!'
              ])
      ],
      () => [
         '<18>{#p/papyrus}{#f/0}THEY SAY IF YOU GET CAUGHT IN AN ANOMALY...',
         '<18>{#f/0}WELL, TIME JUST MOVES A LITTLE SLOWER FOR YOU.',
         "<18>{#f/4}I DON'T DOUBT SANS WOULD LOVE TO BE INSIDE ONE...",
         ...(solo()
            ? []
            : [
                 "<25>{#p/undyne}{#f/18}* Yeah, except Sans isn't that stupid.",
                 '<25>{#p/undyne}{#f/16}* Spend too long in a anomaly, and...',
                 "<25>{#p/undyne}{#f/9}* ...\n* It's bad.",
                 '<18>{#p/papyrus}{#f/5}HOW BAD?',
                 '<25>{#p/undyne}{#f/16}* Very.',
                 '<18>{#p/papyrus}{#f/6}HOW VERY??',
                 '<25>{#p/undyne}{#f/7}* Knock it off!'
              ])
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
                 '<25>{#p/undyne}{#f/8}* Wha- {%}',
                 "<18>{#p/papyrus}{#f/0}IT'S A QUALITY OF HIS I APPRECIATE.",
                 '<25>{#p/undyne}{#f/3}* Oh.',
                 '<18>{#p/papyrus}{#f/0}HE MAKES THINGS EASY TO UNDERSTAND.',
                 '<25>{#p/undyne}{#f/1}* I see.'
              ])
      ],
      () =>
         solo()
            ? [ "<18>{#p/papyrus}{#f/6}IT'S ALSO JUST VERY DARK IN GENERAL.", "<18>{#p/papyrus}{#f/6}SO THERE'S THAT." ]
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
                         '<18>{#p/papyrus}{#f/0}NON-EUCLIDIAN!\nYOU KNOW... THAT THING WHERE- {%}',
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
   f_statue: pager.create('limit', () => [
      '<18>{#p/papyrus}{#f/4}A MYSTERIOUS STATUE...',
      ...(assets.music.memory.instances.length > 0
         ? [
              "<18>{#p/papyrus}{#f/4}WHAT'S THAT MUSIC?",
              '<18>{#p/papyrus}{#f/4}AM I ON HOLD?',
              ...(solo()
                 ? []
                 : [
                      "<25>{#p/undyne}{#f/12}* Papyrus, it's just a music box.",
                      "<25>{#p/undyne}{#f/17}* You're not on hold!"
                   ])
           ]
         : solo()
         ? []
         : [
              "<25>{#p/undyne}{#f/16}* That statue's been there forever...",
              '<25>{#p/undyne}{#f/9}* Nobody seems to know where it came from.'
           ])
   ]),
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
   f_prespear: [
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
            ? [ "<18>{#f/9}BECAUSE WE'RE HAVING A FIRE SALE!!", '<18>{#f/5}AT MY IMAGINARY STORE, WHICH SELLS FLAMES.' ]
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
            ? [ "<18>{#p/papyrus}{#f/5}IF YOU'RE TRYING TO SOLVE IT, THEN GOOD LUCK...", "<18>{#f/4}YOU'RE ON YOUR OWN." ]
            : [ "<18>{#p/papyrus}{#f/6}I SWEAR THERE'S A DIFFERENCE!" ]
   ),
   f_corner: pager.create(
      'limit',
      () =>
         save.data.n.plot < 46
            ? [ '<18>{#p/papyrus}{#f/4}CAREFUL, THIS ROOM HAS SPECIAL SPOOKY POWERS.' ]
            : [
                 '<18>{#p/papyrus}{#f/4}THE DOOR NEAR THE MIDDLE OF THIS ROOM...',
                 '<18>{#p/papyrus}{#f/4}...IS REALLY WEIRD.',
                 "<18>{#p/papyrus}{#f/5}SOMETIMES IT'S THERE, SOMETIMES IT'S NOT...",
                 '<18>{#p/papyrus}{#f/0}AND SOMETIMES I WEAR POLKA-DOTS.',
                 ...(solo()
                    ? []
                    : [
                         '<25>{#p/undyne}{#f/12}* Polka-what?',
                         '<25>{#p/undyne}{#f/1}* Well uh, as for the door...',
                         "<25>{#p/undyne}{#f/8}* That's just me opening and closing it!",
                         '<18>{#p/papyrus}{#f/0}OH...!',
                         '<25>{#p/undyne}{#f/17}* Yeah!!!',
                         '<25>{#p/undyne}{#f/16}* But... polka dots.',
                         '<25>{#p/undyne}{#f/8}* What does that have to do with anything!'
                      ])
              ],
      () =>
         save.data.n.plot < 46
            ? [ '<18>{#p/papyrus}{#f/5}THINGS MIGHT GET A LITTLE DARK.' ]
            : [
                 '<18>{#p/papyrus}{#f/4}YES, I LITERALLY JUST SAID THAT TO MAKE IT RHYME.',
                 '<18>{#p/papyrus}{#f/9}WHAT ARE YOU GONNA DO ABOUT IT, HUH?',
                 "<18>THAT'S RIGHT.\nNOTHING!",
                 '<18>NOTHING AT ALL!',
                 ...(solo() ? [] : [ '<25>{#p/undyne}{#f/3}* Damn, okay.' ])
              ]
   ),
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
   f_bridge: pager.create(
      'limit',
      () => [
         '<18>{#p/papyrus}{#f/5}CAREFUL, THIS BRIDGE USED TO BE BOOBY-TRAPPED.',
         "<18>{#p/papyrus}{#f/4}THOUGH, THE WORST YOU'LL FIND NOW IS A GRAV-SWITCH.",
         "<18>{#p/papyrus}{#f/0}IT'S LIKE SANS'S GRAVOMETRIC INVERTER...",
         '<18>{#p/papyrus}{#f/5}BUT WORSE.',
         ...(solo()
            ? []
            : [
                 '<25>{#p/undyne}{#f/1}* Yeah, why does Sans even have that thing anyway?',
                 "<25>{#f/9}* The only thing that's effective against is small children."
              ])
      ],
      [ "<18>{#p/papyrus}{#f/5}YES, IT'S THAT BAD.", '<18>{#f/5}AND BY "BAD," I MEAN INEFFECTIVE.' ]
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
            : [ '<18>{#p/papyrus}{#f/0}NO HARD FEELINGS!', "<25>{#p/undyne}{#f/12}* Pfft, wasn't worried for a second!" ]
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
            : [ "<18>{#p/papyrus}{#f/0}I'M STARTING TO THINK UNDYNE HAS A CR- {%}", '<25>{#p/undyne}{#f/17}No.' ]
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
                 ...(solo() ? [] : [ "<25>{#p/undyne}{#f/17}* Don't tell me you're still carrying that thing around." ])
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
                 "<18>{#p/papyrus}{#f/4}I CAN'T BE THE ONLY ONE THAT THINKS YOU'RE- {%}",
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
         ...(solo()
            ? [ '<18>{#f/6}SPEAKING OF WHICH, WHO BROKE ALL THE ELEVATORS!?' ]
            : [
                 "<18>{#f/0}MAYBE I SHOULD CHECK IF THEY'RE WORKING NOW.",
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
                 '<18>{#p/papyrus}{#f/0}BLUES IS NICE, BUT SKA IS MY FAVORITE HUMAN MUSIC GENRE.',
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
                 '<18>{#p/papyrus}{#f/5}METTATON DID SOME BAD STUFF, BUT I- {%}',
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
};
