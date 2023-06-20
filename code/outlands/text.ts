import { game } from '../core';
import { CosmosKeyed, CosmosProvider, CosmosUtils } from '../engine/utils';
import { battler, choicer, pager, player, world } from '../mantle';
import save from '../save';

export function areaKills () {
   return save.data.n.plot < 16 ? save.data.n.kills : save.data.n.kills_wastelands;
}

export function toriSV () {
   return save.data.n.plot < 16 ? save.data.b.oops : !save.data.b.toriel_phone;
}

export function toriCheck () {
   return (
      save.data.n.plot > 7 &&
      (save.data.n.plot < 9 ||
         save.data.n.plot === 9.1 ||
         (!toriSV() && (save.data.b.w_state_catnap || save.data.n.plot > 17)))
   );
}

const text = {
   a_outlands: {
      stargum1: [
         '<32>{#p/narrator}* There was a piece of gum taped to the comic strip.',
         choicer.create('* (Chew the gum?)', 8, 7, 'Yes', 'No')
      ],
      stargum2: [ '<25>{#p/human}* (You decide not to chew.)' ],
      stargum3: [ '<32>{#p/human}* (You ate the Gumbert.)' ],
      fireplace1: [
         "<32>{#p/narrator}* Toriel's fireplace.\n* It's not too hot, just pleasantly warm.",
         '<32>* You could probably crawl in there.',
         choicer.create('* (Crawl inside?)', 8, 7, 'Yes', 'No')
      ],
      fireplace2a: [ '<32>{#p/human}* (You chose not to crawl in.)' ],
      fireplace2b: () => [
         '<32>{#p/human}* (You crawled into the fireplace and let its warmth engulf you.)',
         '<32>{#p/human}* (You are very comfortable.)',
         ...(world.azzie && save.flag.n.ga_asrielFireplace++ < 1
            ? [ "<25>{#p/asriel2}{#f/15}* I'll just, uh, wait for you to get out..." ]
            : [])
      ],
      fireplace2c: [ "<25>{#p/toriel}{#f/1}{#npc/a}* Don't stay in there for too long..." ],
      fireplace2d: [ '<32>{#p/narrator}* ...', '<32>* This is fine.' ],
      noticereturn: [
         '<25>{#p/asriel2}{#f/10}* Something you missed back here?',
         '<25>{#f/13}* ...',
         "<25>{#f/4}* Well, I trust you know what you're doing, $(name)."
      ],
      noticestart: [
         '<25>{#p/asriel2}{#f/3}* Ah, the place where it all began.',
         "<25>{#p/asriel2}{#f/4}* We've certainly come far since then, haven't we, $(name)?"
      ],
      noticedummy: [ '<25>{#p/asriel2}{#f/3}* ...', "<25>{#p/asriel2}{#f/10}* Wasn't there a dummy here before...?" ],
      afrog: {
         a: [
            '<32>{#p/monster}{#n1}* Just between you and me...',
            '<32>* I saw that fair lady depart this taxi stop just a little while ago.',
            "<32>* Looks like she was carryin' some groceries home.",
            '<32>* I asked her what they were for, and...',
            "<32>* Well, let's just say you're in for a treat."
         ],
         b: [
            '<32>{#p/monster}{#n1}* Just between you and me...',
            "<32>* The gravity field in that room behind me is a little lackin'.",
            "<32>* Sometimes, when I'm alone, I like to walk out there and leap as high as I can.",
            "<32>* Best part is, ain't nobody gonna encounter me when I'm soaring that high!",
            "<32>* It's quite the experience.\n* You should try it sometime!"
         ]
      },
      asriel1: [ '<25>{#p/asriel2}{#f/5}* Follow me, $(name)...', "<25>{#f/1}* We've got a kingdom to slaughter." ],
      asriel1b: [ '<32>{#p/narrator}* ...' ],
      asriel2: [
         '<25>{#p/asriel2}{#f/3}* This is it...',
         '<25>{#f/4}* The door to the rest of the outpost.',
         '<25>{#f/3}* Starton, the Foundry, Aerialis... and the Citadel...',
         '<25>{#f/4}* All free for the taking.',
         '<25>{#f/2}* Hee hee hee...',
         '<25>{#f/1}* Are you ready, $(name)?',
         "<25>{#f/2}* 'Cause once we move forward, there's no turning back.",
         choicer.create('* (Follow Him?)', 8, 7, 'No', 'Yes')
      ],
      asriel2b: [ '<25>{#p/asriel2}{#f/1}* Ready?', choicer.create('* (Follow Him?)', 8, 7, 'No', 'Yes') ],
      asriel3: [ '<25>{#p/asriel2}{#f/1}* Okay...', "<25>{#f/2}* Let's do this." ],
      asriel4: [ "<25>{#f/4}* I'll be waiting, then." ],
      asrielDiary: [
         [
            '<32>{#p/human}* (You turn to the first page... you can barely make out the words.)',
            '<32>{#p/asriel1}{#v/2}* "i am starting a dairy Cuz mommy said it wood be fun."',
            '<32>* "today i lerned how to put seeds in daddys garden"',
            '<32>* "he says they will grow up soon But it wil take a long tiem."',
            '<32>* "mommy is gona make a snail pie tonite And im exsited"',
            '<32>* "other then that im having a good day."'
         ],
         [
            '<32>{#p/human}* (You turn to the second page...)',
            '<32>{#p/asriel1}{#v/2}* "azzys dairy, june 251X"',
            '<32>* "mommy said i shood rite down the date So folks can no when i rote it."',
            '<32>* "my starling stil hasnt grown yet but daddy promises it wil be soon"',
            '<32>* "i wish there was a window on my room but daddy said there is pluming here."',
            '<32>* "they said they wood put a window in the front room tho"',
            '<32>* "i am having a nice day today as wel."'
         ],
         [
            '<32>{#p/human}* (You turn to the third page... seems a couple years went by.)',
            '<32>{#p/asriel1}{#v/1}* "Azzys Diary, March 251X"',
            '<32>* "My old dairy was in a box of toys And wanted to put more in it."',
            '<32>* "By the way The starling I planted before grew up."',
            '<32>* "But I got in a fite with a monster the other day and we havent talked since that."',
            '<32>* "Im worryed about them... i hope theyre not still mad."'
         ],
         [
            '<32>{#p/human}* (You turn to the fourth page...)',
            '<32>{#p/asriel1}{#v/1}* "Azzys Diary, March 251X"',
            '<32>* "i talked with the monster, they say theyre not upset anymore, so thats good"',
            '<32>* "We were watching the sky out side And we saw a shooting star."',
            '<32>* "She said to make a wish... I wished that one day a human wood come down."',
            '<32>* "Mommy and Daddy tell so many storys about them..."',
            '<32>* "They cant all be bad... rite?"'
         ],
         [
            '<32>{#p/human}* (You turn to the fifth page...)',
            '<32>{#p/asriel1}{#v/1}* "Azzys Diary, March 251X"',
            '<32>* "Not alot to say today."',
            '<32>* "Maybe this diary idea is silly."',
            '<32>* "Mom saw me riting in it the other day and said she was proud of me."',
            '<32>* "Is it realy that importint?"'
         ],
         [
            '<32>{#p/human}* (You turn to the sixth page... seems like a few more years went by.)',
            '<32>{#p/asriel1}* "Azzy\'s Diary, September 251X."',
            '<32>* "Seems I cant write in this thing for too long at once."',
            '<32>* "But today I saw the book again and chose to write some more in it."',
            '<32>* "The past few years have been good, I went to school and learned lots of things."',
            '<32>* "Like how to add numbers."\n* "And how to use a computer."',
            '<32>* "Mom said Im too young to make an outer net acount tho."',
            '<32>* "Maybe one day when Im older I can have one."'
         ],
         [
            '<32>{#p/human}* (You turn to the seventh page...)',
            '<32>{#p/asriel1}* "Azzy\'s Diary, September 251X."',
            '<32>* "That weird guy visited again today. He said he had a bad dream about a human."',
            '<32>* "Oh, did I mention him? He is the science person dad talks to alot."',
            '<32>* "He invented alot of things that we use now."',
            '<32>* "But he looked at me really odd Like I was so scary."',
            '<32>* "Did I do somthing wrong?"'
         ],
         [
            '<32>{#p/human}* (You turn to the eighth page...)',
            '<32>{#p/asriel1}* "Azzy\'s Diary, September 251X."',
            '<32>* "A new star appeared in the sky today."',
            '<32>* "A really brite one."',
            '<32>* "I wonder why more stars dont appear like that all the time."',
            '<32>* "Also we are gonna move to the new citadel soon."',
            '<32>* "I saw it in the distance, it looks amazing!"',
            '<32>* "It will be alot better than living in the power stashin too."'
         ],
         [
            '<32>{#p/human}* (You turn to the ninth page... seems a day was skipped.)',
            '<32>{#p/asriel1}* "Azzy\'s Diary, September 251X."',
            '<32>* "I met a real human yesterday. They crashed on the lookout where I was standing."',
            '<32>* "I helped them out of the reck and they said thanks."',
            '<32>* "I didnt think it would ever happen, but here they are."',
            '<32>* "And they are actually he{#p/narrator}f{#p/asriel1}h{#p/narrator}sj haha azzy is a stinky butt and he{#p/asriel1}vh{#p/narrator}v{#p/asriel1}j{#p/narrator}a{#p/asriel1}s"',
            '<32>* "Okay so Im actually hiding under the covers so $(name) cant mess up what Im writing."',
            '<32>* "They can be a bit mean some times, but thats ok."',
            '<32>* "Mom did that battle thing with them and there SOUL was red and upside down."',
            '<32>* "It was really pretty."',
            '<32>* "You know, Its nice to have someone else to talk to everyday."',
            '<32>* "Me and $(name) are gonna do everything together!"'
         ],
         [
            '<32>{#p/human}* (You turn to the tenth page...)',
            '<32>{#p/asriel1}* "Azzy\'s Diary, November 251X."',
            '<32>* "Mom said shes gonna adopt $(name) into the family."',
            '<32>* "I dont know what adopt means but she said I will be like their brother."',
            '<32>* "But thats good Cuz then I can spend more time with them!"',
            '<32>* "Also they said sorry for what happend in the last diary page."',
            '<32>* "I didnt tell them yet but, I forgive them."',
            '<32>{#p/narrator}* ...'
         ],
         [
            '<32>{#p/human}* (You turn to the eleventh page.)',
            '<32>{#p/asriel1}* "Azzy\'s Diary, December 251X."',
            '<32>* "$(name) said its time for the plan."',
            '<32>* "I was scared But they said I could do it."',
            '<32>* "After this entry Im gonna wait for them to eat the poison pie we made..."',
            '<32>* "And then we can save everyone together."',
            '<32>* "If something goes bad and your reading this later..."',
            '<32>* "I want you to know that your the best, $(name)."',
            '<32>{#p/narrator}* ...',
            '<32>* ...',
            '<32>{#p/human}* (It almost sounds like someone is crying...)',
            '<32>{#p/human}* (But who?)'
         ],
         [
            '<32>{#p/human}* (You turn to the twelfth page.)',
            '<32>{#p/asgore1}* "Manifest ID 12321, December 25th, 251X."',
            '<32>* "This will be the last written entry in this manifest."',
            '<32>* "$(name) and Asriel are dead."',
            '<32>* "What\'s left of them will be sealed in the Outlands, along with this record."',
            '<32>* "If anyone in the future happens to find this..."',
            '<32>* "Then I apologize for any sorrow you may have felt as a result of reading it."',
            '<32>* "I ask that you do not disturb the body or this manifest any further."',
            '<32>* "Well, that is all."',
            '<32>* "Goodbye."'
         ]
      ],
      backdesk: {
         a: [ '<32>{#p/human}* (You peek inside the desk...)', '<32>{#p/narrator}* Nothing left to find here.' ],
         b: [
            '<32>{#p/human}* (You peek inside the desk...)',
            "<32>{#p/narrator}* What's this?\n* A limited edition Super Starwalker comic strip?",
            '<32>{#s/equip}{#p/human}* (You got the limited edition comic strip.)'
         ],
         b2: [
            '<32>{#p/human}* (You peek inside the desk...)',
            "<32>{#p/narrator}* What's this?\n* A limited edition Super Starwalker comic strip?",
            "<32>{#p/narrator}* Unfortunately, you're out of space."
         ]
      },
      bedfailToriel: [
         '<25>{#p/toriel}{#f/1}* Oh dear...',
         '<25>* Perhaps I went a little hard on them out there...',
         '<25>{#f/0}* Worry not, my child.',
         "<25>* I will make sure you get a good night's rest for the journey ahead.",
         '<32>{#p/narrator}* Toriel sang a nice lullaby to put you to sleep.'
      ],
      bedfailAsgore: [
         '<32>{#p/asgore1}* $(name), please...',
         '<32>* Wake up!',
         '<32>* You are the future of humans and monsters...'
      ],
      blooky1: [
         '<32>{#p/napstablook}* Zzz... Zzz...',
         '<32>* Zzz... Zzz...',
         '<32>{#p/narrator}* This ghost is lying here, pretending to sleep.',
         choicer.create('* (Try to walk through it?)', 8, 7, 'Yes', 'No')
      ],
      blooky2: [
         '<32>{#p/narrator}* The ghost is still blocking the way.',
         choicer.create('* (Try to walk through it?)', 8, 7, 'Yes', 'No')
      ],
      blooky3: [
         "<32>{#p/napstablook}* i usually visit this place because nobody's around...",
         '<32>* but today i met someone nice...',
         "<32>* well, i'll get out of your way now",
         '<32>* cya later...'
      ],
      blooky4: [
         '<32>{#p/napstablook}* so uhm... you really like me, huh?',
         '<32>* heh... thank you...',
         '<32>* and, uh... sorry i got in your way before...',
         "<32>* i'll just be like... over here...",
         '<32>* until we meet again...'
      ],
      blooky5: [
         '<32>{#p/napstablook}* so uhm... you really despise me, huh?',
         "<32>* that's... nice...",
         "<32>* well, i'll be on my way now",
         '<32>* bye...'
      ],
      blooky6: [
         '<32>{#p/napstablook}* so uhm... that happened...',
         '<32>* ...',
         '<32>* uh... i gotta go now',
         '<32>* cya...'
      ],
      blooky7: [
         "<32>{#p/napstablook}* you didn't even say anything to me...",
         "<32>* that's... i don't even know what that is...",
         "<32>* well, i'll be going now",
         '<32>* bye...'
      ],
      book1: [ '<32>{#p/human}* (As Toriel reads you the story, the feeling of home...)' ],
      book2: [
         '<32>{#p/human}* (It seems oddly familiar.)',
         '<32>* (Like a memory, except...)',
         "<32>* (It's not something you've ever felt, not in the past.)",
         '<32>{#p/narrator}* Is that supposed to mean something?'
      ],
      book3: [
         "<32>{#p/human}* (It's not like something you've ever felt before.)",
         "<32>{#p/narrator}* Then again, that's common for kids like you."
      ],
      book4: [
         "<32>{#p/human}* (Soon enough, Toriel's narration puts you to sleep.)",
         '<32>{#p/narrator}* Seeing this, she decides to carry you to bed.',
         '<32>{#p/human}* (A feeling of serenity washes over you...)'
      ],
      breakfast: [ '<32>{#p/human}* (You got the Fried Snails.)' ],
      breakslow: [ "<32>{#p/human}* (You're carrying too much to take that.)" ],
      candy1: [
         '<32>{#p/narrator}* Synthesize something with the vending machine?',
         choicer.create('* (What will you make?)', 8, 7, 'Candy', 'Water', 'Δ-9', 'Nothing')
      ],
      candy2: [ '<32>{#p/human}* (You got the $(x).)\n* (Press [C] to open the menu.)' ],
      candy3: [ '<32>{#p/human}* (You got the $(x).)' ],
      candy4: [ '<32>{#p/human}* (You got the $(x).)', '<32>{#p/narrator}* The machine is beginning to malfunction.' ],
      candy5: [ '<32>{#p/human}* (You got the $(x).)', '<32>{#p/narrator}* The machine broke down.' ],
      candy6: [ "<32>{#p/narrator}* It's out of order." ],
      candy7: [ '<32>{#p/human}* (You decide not to make anything.)' ],
      candy8: [ "<32>{#p/human}* (You're carrying too much.)" ],
      chair1a: [
         '<25>{#p/toriel}{#f/1}{#n1}* What is it, child?\n* Are you hungry?',
         '<25>{#f/0}* Or, perhaps you would like to know more about the book I am reading.',
         choicer.create('{#n1!}* (What do you say?)', 8, 7, 'Hungry', 'Book', 'Home', 'Nothing')
      ],
      chair1b: [
         '<25>{#p/toriel}{#n1}* What is it, child?\n* Did you need something?',
         choicer.create('{#n1!}* (What do you say?)', 8, 7, 'Hungry', 'Book', 'Home', 'Nothing')
      ],
      chair1c: [ '<25>{#p/toriel}{#n1}* Well, let me know if you need anything.' ],
      chair1d: [ '<25>{#p/toriel}{#n1}* Well, let me know if you change your mind.' ],
      chair1e: [
         '<25>{#p/toriel}{#f/1}{#n1}* Restlesss night, hmm?',
         '<25>{#f/0}* Well, that is alright.',
         '<25>{#f/1}* Would you like me to read you this book?',
         '<25>{#f/0}* It is called "Generous Monster" and it was written by a human.',
         choicer.create('{#n1!}* (Read the book?)', 8, 7, 'Yes', 'No')
      ],
      chair1f: pager.create(
         'limit',
         [ '<25>{#p/toriel}{#n1}{#f/1}* Back for a visit?', '<25>{#f/0}* Well, feel free to stay as long as you like.' ],
         [
            "<26>{#p/toriel}{#n1}* Don't mind silly old me.",
            "<25>{#f/5}* I'm the one who wanted to keep you here, after all..."
         ]
      ),
      chair2a1: [
         '<25>{#p/toriel}{#f/1}{#n1}* Hungry, hmm?\n* Would you like me to make breakfast?',
         choicer.create('{#n1!}* (Have breakfast?)', 8, 7, 'Yes', 'No')
      ],
      chair2a2: [ '<25>{#p/toriel}{#n1}* Wonderful!\n* I will be in the kitchen preparing it.' ],
      chair2a3: [
         '<25>{#p/toriel}{#f/1}{#n1}* Are you feeling hungry now?',
         choicer.create('{#n1!}* (Have breakfast?)', 8, 7, 'Yes', 'No')
      ],
      chair2a4: [
         '<25>{#p/toriel}{#n1}* I have already served breakfast, little one.',
         '<25>{#f/1}* We cannot have more than one breakfast per day, can we?',
         '<25>{#f/0}* That would be silly.'
      ],
      chair2c1: [
         '<25>{#p/toriel}{#n1}* Ah, my book!\n* Yes, it is quite the fun little read.',
         '<25>{#f/0}* It is called "Generous Monster" and it was written by a human.',
         '<25>{#f/1}* Would you like me to read it to you?',
         choicer.create('{#n1!}* (Read the book?)', 8, 7, 'Yes', 'No')
      ],
      chair2c2: [ '<25>{#p/toriel}{#n1}* Splendid!', '<25>{#f/1}* Well, here goes...' ],
      chair2c3: [
         '<25>{#p/toriel}{#f/1}{#n1}* Want me to read you that book now?',
         choicer.create('{#n1!}* (Read the book?)', 8, 7, 'Yes', 'No')
      ],
      chair2c4: [
         '<25>{#p/toriel}{#f/1}{#n1}* Do you want me to read you the book again?',
         choicer.create('{#n1!}* (Read the book?)', 8, 7, 'Yes', 'No')
      ],
      chair2c5: [ '<25>{#p/toriel}{#f/1}{#n1}* Alright then, here goes...' ],
      chair2c6: [
         '<25>{#f/1}{#n1}* "Once, there was a monster..."',
         '<25>{#f/0}* "And she loved a little human."',
         '<25>{#f/1}* "And every day, the human would come visit..."',
         '<25>{#f/0}* "And they would run and play together in the fields."',
         '<25>{#f/1}* "They\'d sing songs together, tell stories to each other..."',
         '<25>{#f/0}* "And they would play hide-and-go-seek."',
         '<25>{#f/1}* "And when the human was tired, she would tuck them into bed..."',
         '<25>{#f/0}* "And the human loved the monster very much."',
         '<25>{#f/0}* "And the monster was happy."',
         '<25>{#f/1}* "But as time went by, and the human grew older..."',
         '<25>{#f/0}* "The monster was often left alone."',
         '<25>{#f/1}* "Then one day, the human came back..."',
         '<25>{#f/0}* "And the monster said \'Come, human, come and play!\'"',
         '<25>{#f/5}* "\'I am too big to play,\' said the human."',
         '<25>{#f/1}* "\'I want to drive, to find a new home...\'"',
         "<25>{#f/5}* \"'Sorry,' said the monster, 'but I am too poor to own a car.'\"",
         '<25>{#f/5}* "\'All I have is my own two feet.\'"',
         '<25>{#f/0}* "\'Climb on my back, and I can run you to where you need.\'"',
         '<25>{#f/0}* "\'Then you can see the town and be happy.\'"',
         '<25>{#f/1}* "And so the human climbed onto the monster\'s back..."',
         '<25>{#f/0}* "And the monster took them to a new home."',
         '<25>{#f/0}* "And the monster was happy."',
         '<25>{#f/1}* "But the human stayed away for a long time..."',
         '<25>{#f/5}* "And the monster was sad."',
         '<25>{#f/0}* "Then one day, the human came back."',
         '<25>{#f/1}* "And the monster smiled from ear to ear and said..."',
         '<25>{#f/1}* "\'Come, human, come and ride on my back!\'"',
         '<25>{#f/5}* "\'I am too sad to ride around,\' said the human."',
         '<25>{#f/1}* "\'I wish I had a family, and children of my own...\'"',
         "<25>{#f/5}* \"'Sorry,' said the monster, 'but I cannot give that to you.'\"",
         '<25>{#f/5}* "\'I am only one person.\'"',
         '<25>{#f/0}* "\'Visit for a while, and we can find you a date.\'"',
         '<25>{#f/0}* "\'Then you can find love and be happy.\'"',
         '<25>{#f/1}* "And so the human visited their old friend for a while..."',
         '<25>{#f/0}* "And the monster found them someone they might like."',
         '<25>{#f/0}* "And the monster was happy."',
         '<25>{#f/5}* "But the human stayed away for a long time."',
         '<25>{#f/1}* "When they finally returned, the monster was so happy..."',
         '<25>{#f/9}* "She could hardly speak."',
         '<25>{#f/1}* "\'Come, human,\' she whispered..."',
         '<25>{#f/1}* "\'Come and visit.\'"',
         '<25>{#f/5}* "\'I am too old and busy to visit,\' said the human."',
         '<25>{#f/1}* "\'I want a place to rest for the night...\'"',
         "<25>{#f/5}* \"'Sorry,' said the monster, 'but I do not have a bed your size.'\"",
         '<25>{#f/5}* "\'I am still too poor to afford one.\'"',
         '<25>{#f/0}* "\'Sleep with me for the night.\'"',
         '<25>{#f/0}* "\'Then you can get some rest and be happy.\'"',
         '<25>{#f/1}* "And so the human and the monster cuddled together..."',
         '<25>{#f/0}* "And the monster was able to put the human to sleep."',
         '<25>{#f/0}* "And the monster was happy."',
         '<25>{#f/5}* "...but not really."',
         '<25>{#f/9}* "And after a long time, the human came back again."',
         "<25>{#f/5}* \"'I am sorry, human,' said the monster, 'but I have fallen down.'\"",
         '<25>{#f/5}* "\'My legs are giving out, I cannot take you anywhere.\'"',
         '<25>{#f/10}* "\'There is nowhere else I want to be,\' said the human."',
         '<26>{#f/5}* "\'I cannot find you a date, I know noone else\' said the monster."',
         '<25>{#f/10}* "\'There is noone else I want to be with,\' said the human."',
         '<25>{#f/5}* "\'I am too weak for you to sleep on me\', said the monster."',
         '<25>{#f/10}* "\'I do not need sleep any longer,\' said the human."',
         "<25>{#f/5}* \"'I am sorry,' sighed the monster.",
         '<25>{#f/5}* "\'I wish I had something to offer, but I have nothing left.\'"',
         '<25>{#f/9}* "\'I am just an old monster approaching her death.\'"',
         '<25>{#f/5}* "\'I am sorry...\'"',
         '<25>{#f/10}* "\'I do not need very much now,\' said the human."',
         '<25>{#f/10}* "\'Just a hug from my best friend before I die.\'"',
         '<25>{#f/1}* "\'Well,\' said the monster, straightening her posture..."',
         '<25>{#f/0}* "\'Well, an old monster is always here for that.\'"',
         '<25>{#f/0}* "\'Come, human, come to me. Be with me one last time.\'"',
         '<25>{#f/9}* "And so the human did."',
         '<25>{#f/10}* "And the monster was happy."'
         // '<25>{#f/2}* "And then they both fucking died-"'
      ],
      chair2c7: [ '<25>{#f/0}{#n1}* Well, that was the story.', '<25>{#f/1}* I hope you liked it...' ],
      chair2c8: [ '<25>{#f/0}{#n1}* Well, that is all.' ],
      chair2d1: [
         '<25>{#p/toriel}{#f/1}{#n1}* Home...?\n* Could you be a little more specific?',
         '<32>{#p/human}{#n1!}* (What do you say?)\n{!}µµµµµµµµNeverµµµµµµµµµWhen can I\nµµµµµµµµmindµµµµµµµµµµgo home?{#c/0/8/6}'
      ],
      chair2d2: [
         '<25>{#p/toriel}{#f/1}{#n1}* But... this is your home now, is it not?',
         '<32>{#p/human}{#n1!}* (What do you say?)\n{!}µµµµµµµµµµµµµµµµµµµµHow to exit\nµµµµµµµµµµSorryµµµµµthe OUTLANDS{#c/0/10/4}'
      ],
      chair2d3: [
         '<25>{#p/toriel}{#f/5}{#n1}* Please, try to understand...',
         '<25>{#p/toriel}{#f/9}* I only want the best for you.'
      ],
      chair2d4: [
         '<25>{#p/toriel}{#f/1}{#n1}* My child...',
         '<32>{#p/human}{#n1!}* (What do you say?)\n{!}µµµµµµµµµµNeverµµµµµHow to exit\nµµµµµµµµµµmindµµµµµµthe OUTLANDS{#c/0/10/4}'
      ],
      chair2d5: [ '<25>{#p/toriel}{#f/5}{#n1}* ...' ],
      chair2d6: [
         '<25>{#p/toriel}{#f/5}{#n1}* ...',
         '<25>{#p/toriel}{#f/9}* ...',
         '<25>{#p/toriel}{#f/5}* Please wait here.',
         '<25>{#p/toriel}{#f/9}* There is something I have to do.'
      ],
      chair3: [ '<32>{#p/narrator}* A comfy reading chair...', '<32>* Seems like the right size for Toriel.' ],
      chair4: [
         '<25>{#p/toriel}{#n1!}* Ah, there you are.',
         '<25>* I have left your breakfast on the table for you, my child.'
      ],
      closetrocket: {
         a: [ '<32>{#p/human}* (You peek behind the device...)', '<32>{#p/narrator}* Nothing left to find here.' ],
         b: [
            '<32>{#p/human}* (You peek behind the device...)',
            "<32>{#p/narrator}* What's this?\n* A limited edition Super Starwalker comic strip?",
            '<32>{#s/equip}{#p/human}* (You got the limited edition comic strip.)'
         ],
         b2: [
            '<32>{#p/human}* (You peek behind the device...)',
            "<32>{#p/narrator}* What's this?\n* A limited edition Super Starwalker comic strip?",
            "<32>{#p/narrator}* Unfortunately, you're out of space."
         ],
         c: [
            '<32>{#p/narrator}* An old fuel injection device.',
            '<32>{#p/narrator}* Surprisingly, it still seems to be working... sort of.'
         ]
      },
      goner: {
         a1: [
            '<32>{#p/human}* A world not bound by association...',
            '<32>* Existing purely for the sake of its own beauty...',
            "<32>* There's something special about that."
         ],
         a2: [ '<32>* Tell me...', '<32>* Does that not pique your... curiosity?' ]
      },
      cryme: {
         a: pager.create(
            'limit',
            () =>
               save.data.b.napsta_performance
                  ? [
                       '<32>{#p/monster}{#n1}* While you guys were dancing, I had to deliver my clay bucket.',
                       "<32>* On the plus side, it didn't spill!",
                       "<32>* So that's good."
                    ]
                  : [
                       "<32>{#p/monster}{#n1}* Later today, I'm supposed to deliver something.",
                       "<32>* It's a bucket of clay substrate...",
                       "<32>* I can't hold it with my mouth, so I'll have to carry it on my head.",
                       '<32>* Could you imagine me balancing a giant thing like that...',
                       '<32>* On a tiny head like this?',
                       '<32>* Come on, friend...',
                       "<32>* You've gotta be kidding me!"
                    ],
            () =>
               save.data.b.napsta_performance
                  ? [ '<32>{#p/monster}{#n1}* Surprising, right?' ]
                  : [ '<32>{#p/monster}{#n1}* Maybe you could help...?' ]
         ),
         b: pager.create(
            'limit',
            [
               '<32>* We heard about the human, the one killing everybody...',
               '<32>* We tried to evacuate, but someone bumped into me...',
               '<32>* That bucket of clay substrate got knocked off my head!',
               "<32>* Now look at me.\n* I'm practically covered in it!",
               '<32>* Not to mention the giant puddle...',
               "<32>* I'm scared, but I can't just leave that mess here...",
               '<32>* Can you help me out, friend?'
            ],
            [ '<32>{#p/monster}{#n1}* Uh... friend?' ]
         )
      },
      danger_puzzle1: [
         '<25>{#p/toriel}* There is another puzzle in this room.',
         '<25>{#f/1}* I wonder if you can solve it?'
      ],
      danger_puzzle2: [
         "<32>{#p/narrator}* This terminal's staggering height towers over you, blocking your eager approach."
      ],
      danger_puzzle3: [ '<25>{#p/toriel}{#f/1}* What is the problem?\n* Do you need assistance?' ],
      danger_puzzle4: [
         '<25>{#p/toriel}{#f/7}* Oh-... oh my.',
         '<25>{#f/6}* It seems there is a bit of a design fault here.\n* Hee hee.',
         '<25>{#f/0}* Now now, no need to worry...',
         '<25>{#f/0}* I can enter the password for you.',
         '<25>{#f/1}* Perhaps you still want to try to solve its riddle?',
         choicer.create('* (Solve the riddle?)', 8, 7, 'Yes', 'No')
      ],
      danger_puzzle5a: [
         '<25>{#p/toriel}* Excellent!\n* I was hoping you would say that.',
         '<25>{#f/1}* The willingness to learn and grow is important...',
         '<25>{#f/0}* Especially for a youngster such as yourself.'
      ],
      danger_puzzle5b: [
         '<25>{#p/toriel}* So, here is the riddle...',
         '<25>{#f/1}* "What\'s baked like a cake and rhymes with a lie?"',
         '<32>{#p/narrator}* ...',
         '<32>* ...'
      ],
      danger_puzzle5c: [
         '<32>{#p/human}* (Despite your best efforts, you struggle to understand...)',
         '<32>{#p/narrator}* Why would Toriel hand out such an easy question?',
         '<32>* It boggles the mind.',
         '<32>* ...',
         '<32>{#p/human}* (You tell Toriel the answer.)',
         '<25>{#p/toriel}{#f/7}* ...Pie?',
         "<25>{#f/0}* That's correct!",
         '<25>{#f/1}* I must say, I did not expect you to solve it so easily...',
         '<25>{#f/0}* But I am all the more grateful for it!'
      ],
      danger_puzzle5d: [
         '<32>{#p/human}* (Despite your best efforts, you struggle to understand...)',
         '<32>* (Even when conjouring all your mental might...)',
         "<32>* (Even when considering the many truths and stratagems you've learned over time...)",
         '<32>* (Nothing.)',
         '<32>{#p/narrator}* Who devised such a question?',
         '<32>* Who in their right mind would desire to cause such cereberal anguish...',
         '<32>* ...in those who attempt to solve this unwavering mystery?',
         '<32>* Alas, it matters not.',
         '<32>* Your inability to solve this riddle is absolute.',
         '<32>* Perhaps if your conscience was a little clearer, maybe things would be different.',
         '<32>* ...',
         '<32>{#p/human}* (You tell Toriel you do not know the answer.)',
         '<25>{#p/toriel}* If you cannot solve the riddle, that is alright.',
         '<25>{#f/1}* I do not want to pressure you, after all...',
         '<25>{#f/0}* Especially if it is something you are not quite ready for.',
         '<25>{#f/5}* I suppose I can solve this one for you...'
      ],
      danger_puzzle5e: [
         '<25>{#p/toriel}* That is alright.',
         '<25>{#f/1}* I do not want to pressure you, after all...',
         '<25>{#f/0}* Especially if it is something you are not quite ready for.',
         '<25>{#f/5}* I suppose I can solve this one for you...'
      ],
      danger_puzzle6: [ '<25>{#p/toriel}* And... {#x1}there!\n* The way is clear.' ],
      danger_puzzle7: [ '<25>{#p/toriel}* Once ready, you may enter the next room.' ],
      denie: [ "<32>{#p/human}* (You're carrying too much to take that.)" ],
      dipper: {
         a: [ '<32>{#p/human}* (You got the little dipper.)' ],
         b: [ "<32>{#p/human}* (You're carrying too much to take that.)" ]
      },
      doorRed: {
         a: [
            '<32>{#p/human}* (You ring the buzzer...)',
            "<32>{#p/narrator}* There doesn't seem to be anyone here.",
            '<32>{#p/narrator}* The door is unlocked.',
            choicer.create('* (Take a peek inside?)', 8, 7, 'Yes', 'No')
         ],
         a2: [
            '<32>{#p/human}* (You ring the buzzer...)',
            '<32>{#p/narrator}* The sound of distant chatter can be heard.',
            '<32>* The door is locked and barricaded from the inside.'
         ],
         a3: () => [
            '<32>{#p/human}* (You ring the buzzer...)',
            '<32>{#p/narrator}* The sound of cries and confusion can be heard from within.',
            '<32>* The door is locked and barricaded from the inside.',
            ...(world.azzie && save.flag.n.ga_asrielOutlands3++ < 1
               ? [ '<25>{#p/asriel2}{#f/13}* ...', '<25>* I wonder if that old photo of us is still in there...' ]
               : [])
         ],
         b: [ '<32>{#p/narrator}* ...', '<32>* Nothing of value in there.' ],
         c: [
            '<32>{#p/narrator}* ...',
            '<32>* Seems this room is full of old, dusty trinkets...',
            '<32>* ...and an old photo of...',
            '<32>* Of... um...',
            "<32>* Maybe you shouldn't look in this room."
         ],
         d: [ '<32>{#p/human}* (You decide not to look.)' ]
      },
      doorYellow: () => [
         '<32>{#p/human}* (You ring the buzzer...)',
         world.bullied ? '<32>{#p/narrator}* ...but everybody ran.' : '<32>{#p/narrator}* ...but nobody came.'
      ],
      drop_fail: [ "<32>{#p/narrator}* You think dropping people's food in front of them is funny?" ],
      drop_pie: [ '<25>{#p/toriel}{#f/2}* Hey!', '<25>{#f/1}* Pies are for eating, not dropping on the ground...' ],
      drop_snails: [
         '<25>{#p/toriel}{#f/2}* Hey!',
         '<25>{#p/toriel}{#f/1}* How could you do that to those poor fried snails...'
      ],
      drop_soda: [ "<32>{#p/monster}{#n1}* Aww c'mon! ;)", '<32>* I poured my heart into that! ;)' ],
      drop_steak: [ '<32>{#p/monster}{#n1}* Seriously!? ;)', '<32>* That steak was utterly priceless! ;)' ],
      dummy1: [
         '<25>{#p/toriel}* In this room, I have a special training exercise.',
         '<25>{#f/0}* As a human who has just arrived here, monsters may attack you.',
         '<25>* In this situation, you will enter a FIGHT.',
         '<25>{#f/1}* Do not worry, the process in any FIGHT is simple...',
         '<25>{#f/0}* Strike up a friendly conversation to stall for time.',
         '<25>* I will come to resolve the conflict.'
      ],
      dummy2: [ '<25>{#p/toriel}* For now, practice talking to the DUMMY.' ],
      dummy3: [
         '<25>{#p/toriel}{#f/1}* Do you need any conversation topics?',
         '<25>{#f/5}* Hmm...',
         '<25>{#f/0}* Oh, I know!\n* Why not talk about how you arrived here?',
         '<25>{#f/0}* I am sure your story is quite intriguing.'
      ],
      dummy4: [
         '<25>{#p/toriel}* There is nothing to be afraid of.',
         '<25>{#f/1}* A simple DUMMY cannot hurt you, can it?',
         '<25>{#f/0}* Now go on, give it a try...'
      ],
      dummy5: [ '<25>{#p/toriel}* Go on, give it a try...' ],
      dummy6: [
         '<25>{#p/toriel}{#f/2}* My child, the DUMMY is not for FIGHTing!',
         "<25>{#f/1}* We don't want to hurt anyone, do we?",
         '<25>{#f/0}* Come now.'
      ],
      dummy7: [ '<25>{#p/toriel}* Ah, very good!\n* You are very good.' ],
      dummy8: [
         '<25>{#p/toriel}{#f/1}* Oh, you... you ran away...',
         '<25>{#f/0}* In truth, that was not a bad choice.',
         '<25>* Staying out of trouble is... preferable, to FIGHTing anyway.',
         '<25>* However, that was only a DUMMY.',
         '<25>{#f/1}* It has no desire for revenge...',
         '<25>{#f/0}* Never mind.\n* Stay close to me, and I will protect you.'
      ],
      dummy9: [ '<25>{#p/toriel}{#f/3}* ...', '<25>{#f/4}* ...', '<25>{#f/0}* The next room awaits.' ],
      dummy9a: [ '<25>{#p/toriel}{#f/3}* ...', '<25>{#f/4}* ...', '<25>{#f/6}* The next room awaits!' ],
      dummy10: [
         '<25>{#p/toriel}{#f/7}* Oh my...',
         '<25>{#f/0}* You are adorable, my child!',
         '<25>{#f/0}* In any case, we shall continue forward.'
      ],
      dummy11: [ '<25>{#p/toriel}* The next room awaits!' ],
      dummy12: [
         '<25>{#p/toriel}{#f/2}* My goodness, child!\n* Have mercy!',
         '<25>{#f/1}* ...',
         '<25>{#f/0}* Fortunately, that was only a DUMMY.',
         '<25>{#f/1}* But in the future, please...',
         '<25>{#f/0}* Try not to slap your opponents half to death, will you?',
         '<25>* Come now.'
      ],
      eat_pie: [
         '<25>{#p/toriel}{#f/1}* Quite tasty, is it not?',
         '<25>{#f/1}* And considering what I went through to bake it...',
         '<25>{#f/0}* It better be.'
      ],
      eat_snails: [ '<25>{#p/toriel}{#f/1}* Are you enjoying your breakfast?', '<25>{#f/0}* Well, I hope it sufficed.' ],
      eat_soda: [
         '<32>{#p/narrator}* Aaron pulled out his phone and snapped a picture.',
         '<32>{#p/monster}{#n1}* Ooh, I could definitely put this on a billboard. ;)'
      ],
      eat_steak: [
         '<32>{#p/narrator}* Aaron shot you with a wink.',
         '<32>{#p/monster}{#n1}* You like the product, lassy? ;)'
      ],
      endtwinkly1: [ '<32>{#p/narrator}* Not again...' ],
      endtwinkly2: [
         '<32>{#p/narrator}* Who does he think he is?',
         "<32>* You've been nothing but kind to everyone we've met.",
         '<32>* That talking star really needs to get a life...'
      ],
      endtwinklyA1: [
         '<25>{#p/twinkly}{#f/12}* You idiot...',
         "<25>* Didn't you hear me before!?",
         '<25>* I thought I told you not to screw it up!',
         "<25>* Now look what you've done to our plan.",
         '<25>{#f/8}* ...',
         '<25>{#f/6}* You better fix this, $(name).',
         "<25>{#f/5}* It's our destiny."
      ],
      endtwinklyA2: [
         '<25>{#p/twinkly}{#f/6}* Howdy, $(name).',
         "<25>{#f/6}* I've had some time to think about what happened.",
         '<25>{#f/5}* It was thrilling, at first...',
         '<25>* The thought of taking the outpost by force together...',
         "<25>{#f/6}* But now, I'm not sure.",
         '<25>{#f/8}* ...',
         '<25>{#f/8}* I guess... I got a bit carried away back there.',
         "<25>{#f/5}* But that's okay, right?\n* You'll forgive me, won't you?",
         '<25>{#f/6}* ...',
         '<25>{#f/6}* I should be going now.',
         '<25>{#f/8}* Good luck on your travels, $(name)...',
         "<25>{#f/5}* I'll be back before you know it."
      ],
      endtwinklyAreaction: [
         '<32>{#p/narrator}* Sorry, did I miss something somewhere?',
         "<32>* I've never talked to him in my life, let alone go on some mission with him.",
         "<32>* Oh well.\n* It wouldn't be the first time he's made up stories about me."
      ],
      endtwinklyB: [
         '<25>{#p/twinkly}{#f/5}{#v/0}* Clever.\n* Verrrryy clever.',
         "<25>{#f/11}{#v/0}* You think you're really smart, don'tcha?",
         '<25>{#f/7}{#v/0}* Hee hee hee...',
         "<25>{#f/0}{#v/1}* In this world, it's KILL or BE killed."
      ],
      endtwinklyB2: [
         '<25>{#f/8}{#v/0}* If you had just killed a FEW more monsters...',
         "<25>{#f/9}{#v/0}* Well, maybe I shouldn't reveal my plans this early.",
         '<25>{#f/7}{#v/0}* You know, $(name)...',
         "<25>{#f/0}{#v/1}* It's only a matter of time before we're together again.",
         '<25>{#f/6}{#v/0}* Try a little harder next time, and maybe...',
         "<25>{#f/5}{#v/0}* You'll get to see something new.",
         '<25>{#f/11}{#v/0}* Until we meet again...'
      ],
      endtwinklyB3: [
         '<25>{#f/8}{#v/0}* If you had just killed ONE more monster...',
         "<25>{#f/9}{#v/0}* Well, maybe I shouldn't reveal my plans this early.",
         '<25>{#f/7}{#v/0}* You know, $(name)...',
         "<25>{#f/0}{#v/1}* It's only a matter of time before we're together again.",
         '<25>{#f/6}{#v/0}* Try a little harder next time, and maybe...',
         "<25>{#f/5}{#v/0}* You'll get to see something new.",
         '<25>{#f/11}{#v/0}* Until we meet again...'
      ],
      endtwinklyBA: () => [
         save.data.n.state_wastelands_napstablook === 5
            ? '<25>{#p/twinkly}{#f/6}{#v/0}* So you made it through without killing anyone.'
            : '<25>{#p/twinkly}{#f/6}{#v/0}* So you spared the life of everyone you came across.',
         '<25>{#f/5}{#v/0}* I bet you feel really great.',
         '<25>{#f/2}{#v/1}* But what will you do if you meet a serial murderer?',
         "<25>{#f/9}{#v/0}* You'll die, and you'll die, and you'll die...",
         "<25>{#f/5}{#v/0}* And eventually, you'll tire of trying.",
         '<25>{#f/11}{#v/0}* What then, huh?',
         '<25>{#f/2}{#v/1}* Will you KILL out of frustration?',
         '<25>{#f/2}{#v/1}* Or will you simply GIVE UP?',
         '<25>{#f/7}{#v/0}* Hee hee hee...',
         '<25>{#f/0}{#v/1}* This is gonna be SO much fun.',
         "<25>{#f/9}{#v/0}* I'll be watching!"
      ],
      endtwinklyBB: [
         '<25>{#p/twinkly}{#f/6}{#v/0}* So you spared the life of a single person.',
         '<25>{#f/11}{#v/0}* But what about everyone else, huh?',
         '<25>{#f/7}{#v/0}* Froggit, Flutterlyte, Gelatini, Silente, Oculoux, Mushy...',
         "<25>{#f/6}{#v/0}* Don'tcha think any of them have families?",
         "<25>{#f/8}{#v/0}* Don'tcha think any of them have friends?",
         "<25>{#f/5}{#v/0}* Each one could've been someone else's Toriel.",
         '<25>{#f/5}{#v/0}* ...',
         '<25>{#f/7}{#v/1}* Selfish brat.'
      ],
      endtwinklyBBA: [ "<25>{#f/0}{#v/1}* Someone's dead because of you." ],
      endtwinklyBBB: [ '<25>{#f/0}{#v/1}* Monsters are dead because of you.' ],
      endtwinklyBC: [
         "<25>{#p/twinkly}{#f/5}{#v/0}* I'm sure you're well aware of that, though...",
         "<25>{#f/6}{#v/0}* Considering you've already killed Toriel once before.",
         "<25>{#f/7}{#v/0}* Ain't that right, brat?",
         '<25>{#f/0}{#v/1}* You MURDERED her.',
         "<25>{#f/7}{#v/0}* And then, you felt bad...\n* Ain't that right?",
         '<25>{#f/7}{#v/0}* Hee hee hee...',
         "<25>{#f/11}{#v/0}* Do you think you're the only one with that power?",
         '<25>{#f/6}{#v/0}* The power to reshape the world, purely by your own will...',
         '<25>{#f/8}{#v/0}* The power to SAVE...',
         '<25>{#f/7}{#v/0}* That used to be MY power, you know.',
         '<25>{#f/6}{#v/0}* Seems YOUR desires for this world override MINE.',
         '<25>{#f/5}{#v/0}* Well then.\n* Enjoy that power while you can.',
         "<25>{#f/9}{#v/0}* I'll be watching!"
      ],
      endtwinklyBD: [
         '<25>{#p/twinkly}{#f/6}{#v/0}* So you spared the life of a single person.',
         '<25>{#f/11}{#v/0}* But what about everyone else, huh?',
         '<25>{#f/7}{#v/0}* Froggit, Flutterlyte, Gelatini, Silente, Oculoux, Mushy...',
         "<25>{#f/0}{#v/0}* They're all gone now.",
         "<25>{#f/11}{#v/0}* What's Toriel gonna do when she finds out, huh?",
         '<25>{#f/2}{#v/1}* What if she KILLS herself out of loneliness, huh?',
         "<25>{#f/11}{#v/0}* If you think you're saving her just by SPARING her...",
         "<25>{#f/7}{#v/0}* Then you're even dumber than I thought.",
         '<25>{#f/9}* Well, see ya!'
      ],
      endtwinklyC: [
         '<25>{#f/7}{#v/0}* After all, this used to be MY power.',
         '<25>{#f/6}{#v/0}* The power to reshape the world, purely by your own will...',
         '<25>{#f/8}{#v/0}* The power to SAVE...',
         '<25>{#f/6}{#v/0}* I thought I was the only one who could do that.',
         '<25>{#f/6}{#v/0}* Seems YOUR desires for this world override MINE.',
         '<25>{#f/5}{#v/0}* Well then.\n* Enjoy that power while you can.',
         "<25>{#f/9}{#v/0}* I'll be watching!"
      ],
      endtwinklyD: [
         "<25>{#p/twinkly}{#f/11}{#v/0}* You're one hell of a tease, huh?",
         '<25>{#f/8}{#v/0}* Beating monsters within an inch of their lives, only to let them go...',
         "<25>{#f/7}{#v/0}* What will you do if a monster doesn't WANT your mercy?",
         '<25>{#f/0}{#v/1}* Will you snuff the light out of their eyes?',
         '<25>{#f/11}{#v/0}* Or will you realize your faulty "pacifism" is for nothing?',
         '<25>{#f/7}{#v/0}* Hee hee hee.',
         "<25>{#f/0}{#v/1}* In this world, it's KILL or BE killed."
      ],
      endtwinklyE: [
         "<25>{#p/twinkly}{#f/0}{#v/1}* Wow, you're utterly repulsive.",
         '<25>{#f/11}{#v/0}* You spared her life...',
         "<25>{#f/7}{#v/0}* Then, you figured that wasn't good enough for you.",
         '<25>{#f/2}{#v/1}* So you KILLED her just to see what would happen.',
         '<25>{#f/7}{#v/0}* Hee hee hee...',
         '<25>{#f/0}{#v/0}* You did it out of BOREDOM.'
      ],
      endtwinklyEA: [ "<25>{#f/11}{#v/0}* Don't think I don't know how this works..." ],
      endtwinklyEB: [ "<25>{#f/6}{#v/0}* It's sad, though..." ],
      endtwinklyF: [ '<25>{#p/twinkly}{#f/11}{#v/0}* Look at you, playing with her life like this...' ],
      endtwinklyFA: [ '<25>{#f/7}{#v/0}* Killing her, sparing her, killing her again...' ],
      endtwinklyFB: [ '<25>{#f/7}{#v/0}* Sparing her, killing her, sparing her again...' ],
      endtwinklyFXA: [
         "<25>{#f/11}{#v/0}* It's fun, isn't it?",
         '<25>{#f/6}{#v/0}* Endlessly toying with the lives of others...',
         '<25>{#f/8}{#v/0}* Watching how they react to every possible decision...',
         "<25>{#f/11}{#v/0}* Isn't it thrilling?",
         '<25>{#f/7}{#v/0}* Hee hee hee...',
         "<25>{#f/9}{#v/0}* I wonder what you'll do next.",
         "<25>{#f/5}{#v/0}* I'll be watching..."
      ],
      endtwinklyG: [
         "<25>{#p/twinkly}{#f/10}{#v/1}* You just can't get enough, can you~",
         '<25>{#f/11}{#v/0}* How many more times will you KILL her, eh?',
         '<25>{#f/7}{#v/0}* Hee hee hee...',
         '<25>{#f/0}{#v/1}* You kinda remind me of myself.',
         '<25>{#f/9}{#v/0}* Well, cya!'
      ],
      endtwinklyG1: [
         '<25>{#p/twinkly}{#f/6}{#v/0}* Again?\n* Golly...',
         '<25>{#f/0}{#v/1}* You REALLY remind me of myself.'
      ],
      endtwinklyG2: [
         '<25>{#p/twinkly}{#f/6}{#v/0}* Again!?',
         "<25>{#f/8}{#v/0}* Wow, you're even worse than I thought."
      ],
      endtwinklyH: [
         "<25>{#p/twinkly}{#f/5}{#v/0}* So you've finally decided show mercy, huh?",
         '<25>{#f/5}{#v/0}* And after all that KILLING...',
         '<25>{#f/11}{#v/0}* Say, was this your idea all along?',
         '<25>{#f/2}{#v/1}* To get a rush out of her death, then spare her once you got bored?',
         '<25>{#f/7}{#v/0}* Hee hee hee...',
         '<25>{#f/11}{#v/0}* What a saint you must think you are.',
         "<25>{#f/5}{#v/0}* But hey, it's not as if I don't know how this works..."
      ],
      endtwinklyI: [
         '<25>{#p/twinkly}{#f/11}{#v/0}* Hee hee hee...',
         '<25>{#f/7}{#v/0}* I hope you like your choice.',
         "<25>{#f/9}{#v/0}* I mean, it's not as if you can go back and change fate.",
         "<25>{#f/0}{#v/1}* In this world, it's KILL or BE killed.",
         '<25>{#f/5}{#v/0}* That old woman thought she could break the rules.',
         '<25>{#f/8}{#v/0}* She tried so hard to save you humans...',
         "<25>{#f/6}{#v/0}* But when it came down to it, she couldn't even save herself."
      ],
      endtwinklyIA: [ '<25>{#f/11}{#v/0}* What an idiot!' ],
      endtwinklyIB: [ '<25>{#f/6}{#v/1}* As for you...' ],
      endtwinklyJ: [
         '<25>{#p/twinkly}{#f/6}{#v/0}* Wow.',
         '<25>{#f/7}{#v/0}* And here I thought you were the righteous one for showing mercy.',
         '<25>{#f/0}{#v/1}* Hah!\n* What a joke.',
         '<25>{#f/6}{#v/0}* ...',
         '<25>{#f/6}{#v/0}* How did it feel to finally satisfy your violent side?',
         '<25>{#f/7}{#v/0}* Hee hee hee...',
         "<25>{#f/0}{#v/1}* I bet it felt GOOD, didn't it?",
         '<25>{#f/11}{#v/0}* I mean, I should know...'
      ],
      endtwinklyK: [
         '<25>{#p/twinkly}{#f/5}{#v/0}* Nice to see you again.',
         "<25>{#f/6}{#v/0}* By the way, you're the most boring person in the cosmos.",
         '<25>{#f/12}{#v/0}* SPARING her, then going back just to do it again?',
         '<25>{#f/8}{#v/0}* Come on...',
         "<25>{#f/0}{#v/1}* You know as well as I do that it's KILL or BE killed."
      ],
      endtwinklyK1: [
         "<25>{#p/twinkly}{#f/6}* Aren't you getting tired of sparing her?",
         '<25>{#f/8}{#v/0}* Come on...',
         '<25>{#f/0}{#v/1}* You KNOW deep down that part of you wants to hurt her.',
         '<25>{#f/11}{#v/0}* Just one. Little. Touch. Is all it would take.',
         '<25>{#f/2}{#v/1}* And BAM!\n* Dust before your very eyes.',
         "<25>{#f/9}{#v/0}* Wouldn't that be exciting?",
         '<25>{#f/6}{#v/0}* ...',
         '<25>{#f/8}{#v/0}* ...',
         '<25>{#f/7}{#v/0}* See ya, idiot.'
      ],
      endtwinklyK2: [
         '<25>{#p/twinkly}{#f/8}{#v/0}* Are you doing this just to see how I react?',
         '<25>{#f/6}{#v/0}* Is that what this is about?',
         "<25>{#f/7}{#v/0}* Well, don't expect to get anything else outta me.",
         '<25>{#f/6}{#v/0}* All this boring pacifism is getting tiresome.',
         '<25>{#f/0}{#v/1}* Now, if something more interesting were to happen...',
         "<25>{#f/9}{#v/0}* Perhaps I'd be more inclined to talk.",
         '<25>{#f/6}{#v/0}* ...',
         '<25>{#f/8}{#v/0}* ...',
         '<25>{#f/7}{#v/0}* See ya, idiot.'
      ],
      endtwinklyKA: [
         "<25>{#f/7}{#v/0}* Sooner or later, you'll be forced to realize that.",
         '<25>{#f/11}{#v/0}* And when that time comes...',
         "<25>{#f/5}{#v/0}* Well, let's just say I'm interested to see what happens.",
         '<25>{#f/11}{#v/0}* Hee hee hee...',
         '<25>{#f/9}{#v/0}* Good luck!'
      ],
      endtwinklyKB: [
         '<25>{#f/11}{#v/0}* Hee hee hee...',
         "<25>{#f/7}{#v/0}* Maybe that's why you killed that one monster.",
         '<25>{#f/8}{#v/0}* I mean, you went almost the whole way without killing anyone...',
         '<25>{#f/6}{#v/0}* But somewhere along the line, you screwed up.',
         '<25>{#f/5}{#v/0}* All that good karma you had went straight down the toilet.',
         "<25>{#f/11}{#v/0}* Golly, you can't do anything right!",
         '<25>{#f/2}{#v/1}* What a joke!'
      ],
      endtwinklyKC: [
         '<25>{#f/11}{#v/0}* Hee hee hee...',
         "<25>{#f/7}{#v/0}* Maybe that's why you killed those other monsters.",
         '<25>{#f/8}{#v/0}* I mean, you had a good run, but...',
         "<25>{#f/6}{#v/0}* What's the point in mercy if it doesn't mean anything?",
         '<25>{#f/7}{#v/0}* And believe me, after you did what you did...',
         "<25>{#f/0}{#v/1}* It doesn't mean JACK.",
         '<25>{#f/6}{#v/0}* ...',
         '<25>{#f/8}{#v/0}* ...',
         '<25>{#f/7}{#v/0}* See ya, idiot.'
      ],
      endtwinklyKD: [
         "<25>{#f/11}{#v/0}* What's wrong with killing Toriel, huh?\n* Too good for that?",
         '<25>{#f/7}{#v/0}* Hee hee hee...',
         "<25>{#f/2}{#v/1}* I know you're still rotten to the core.",
         '<25>{#f/8}{#v/0}* I mean, you managed to take out everyone in your path...',
         '<25>{#f/6}{#v/0}* But when it came to the final hurdle, you failed.',
         "<25>{#f/11}{#v/0}* Golly, you can't do anything right!",
         '<25>{#f/2}{#v/1}* What a joke!'
      ],
      endtwinklyL: [
         '<25>{#p/twinkly}{#f/6}{#v/0}* Back again, huh?\n* Golly...',
         "<25>{#f/8}{#v/0}* You've changed the timeline around so much...",
         "<25>{#f/6}{#v/0}* I don't even know what to think now.",
         '<25>{#f/8}{#v/0}* Are you good?\n* Evil?\n* Just curious?',
         '<25>{#f/6}{#v/0}* I dunno.',
         '<25>{#f/11}{#v/0}* There is one thing, though...',
         "<25>{#f/5}{#v/0}* One thing I KNOW you haven't done yet.",
         '<25>{#f/7}{#v/0}* Hee hee hee...',
         "<25>{#f/0}{#v/1}* That's right.",
         "<25>{#f/2}{#v/1}* You haven't killed everyone here in one run yet.",
         "<25>{#f/11}{#v/0}* Aren't you at least a LITTLE curious?",
         '<25>{#f/8}{#v/0}* Come on, $(name)...',
         "<25>{#f/5}{#v/0}* I know you're in there somewhere."
      ],
      endtwinklyL1: [
         '<25>{#p/twinkly}{#f/6}{#v/0}* Well well, we meet again.',
         '<25>{#f/8}{#v/0}* How many times is this now?',
         "<25>{#f/6}{#v/0}* Whatever.\n* Doesn't matter.",
         '<25>{#f/6}{#v/0}* You KNOW what you have to do, $(name).',
         '<25>{#f/8}{#v/0}* ...',
         "<25>{#f/5}{#v/0}* I'll be waiting."
      ],
      exit1: [
         '<25>{#p/toriel}{#f/13}* You wish to return "home," do you not?',
         '<25>{#f/9}* ...',
         '<25>{#f/9}* If you leave here, I will not be able to protect you.',
         '<25>{#f/9}* I will not be able to save you from the dangers that lie ahead.',
         '<25>{#f/13}* Now please, little one...',
         '<25>{#f/9}* Go back the other way.'
      ],
      exit2: () =>
         save.data.b.genocide
            ? [
                 '<25>{#p/toriel}{#f/13}* Every human that ends up here meets the same fate.',
                 '<25>{#f/9}* I have seen it repeated time and time again.',
                 '<25>{#f/13}* They come.',
                 '<25>{#f/13}* They leave.',
                 '<25>{#f/9}* ...they die.',
                 '<25>{#f/13}* My child...',
                 '<25>{#f/13}* If you leave the OUTLANDS...',
                 '<25>{#f/9}* They...\n* {@fill:#f00}ASGORE{@fill:#fff}...\n* Will take your SOUL.'
              ]
            : [
                 '<25>{#p/toriel}{#f/13}* Every human that ends up here meets the same fate.',
                 '<25>{#f/9}* I have seen it repeated time and time again.',
                 '<25>{#f/13}* They come.',
                 '<25>{#f/13}* They leave.',
                 '<25>{#f/9}* ...they die.',
                 '<25>{#f/13}* My child...',
                 ...(save.data.b.oops ? [] : [ '<25>{#f/14}* My sweet, innocent child...' ]),
                 '<25>{#f/13}* If you leave the OUTLANDS...',
                 '<25>{#f/9}* They...\n* {@fill:#f00}ASGORE{@fill:#fff}...\n* Will take your SOUL.',
                 ...(save.data.b.oops ? [] : [ '<32>{#p/narrator}* ...' ])
              ],
      exit3: [
         '<25>{#p/toriel}{#f/9}* ...',
         '<25>{#f/13}* I did not want to say this, but...',
         '<25>{#f/11}* I cannot allow you to continue on this path.',
         '<25>{#f/9}* For your own sake, child...',
         '<25>{#f/9}* Do not follow me into the next room.'
      ],
      exit4: [
         '<25>{#p/toriel}{#p/toriel}{#f/13}* ...',
         '<25>{#f/14}* Ha...\n* Haha...',
         '<25>{#f/10}* Perhaps it was always meant to come to this.',
         '<25>{#f/9}* Perhaps I was foolish to think that you...',
         '<25>{#f/9}* ...',
         '<25>{#f/13}* Well, you leave me with little choice.',
         '<25>{#f/13}* I am sorry, my child...',
         '<25>{#f/11}* But I cannot allow you to leave.'
      ],
      exitfail1: () =>
         areaKills() > 12
            ? [
                 "<32>{#p/narrator}* After you return to Toriel's home, she destroys the bridge to the outpost.",
                 "<32>* Time goes by, and Toriel soon realizes what you've done.",
                 '<32>* Her view on humanity shattered, and with nothing else left, she decides to...',
                 '<32>* ...',
                 '<32>* M-Meanwhile, the remaining residents of the outpost are suffering...',
                 '<32>* Still trapped within the force field, with no means of escape...',
                 '<32>* And, given the circumstances, there likely never will be.',
                 '<32>* Is this really the best outcome you could ask for?',
                 '<32>* Is this what they really deserve?'
              ]
            : areaKills() > 6
            ? [
                 "<32>{#p/narrator}* After you return to Toriel's home, she destroys the bridge to the outpost.",
                 '<32>* Time goes by, and Toriel does her best to care for you...',
                 "<32>* ...despite those who've gone missing.",
                 '<32>* Meanwhile, the residents of the outpost are suffering...',
                 '<32>* Still trapped within the force field, with no means of escape...',
                 '<32>* And, given the circumstances, there likely never will be.',
                 '<32>* Is this really the best outcome you could ask for?',
                 '<32>* Is this what they really deserve?'
              ]
            : [
                 "<32>{#p/narrator}* After you return to Toriel's home, she destroys the bridge to the outpost.",
                 '<32>* Time goes by, and Toriel does her best to care for you.',
                 '<32>* Reading books, baking pies, telling stories...\n* And hugs, of course.',
                 '<32>* Meanwhile, the residents of the outpost are suffering.',
                 '<32>* Still trapped within the force field, with no means of escape...',
                 '<32>* And, given the circumstances, there likely never will be.',
                 '<32>* Is this really the best outcome you could ask for?',
                 '<32>* Is this what they really deserve?'
              ],
      food: () => [
         ...(save.data.n.state_wastelands_mash === 2
            ? [
                 '<25>{#p/toriel}{#f/1}* Sorry about the delay, my child...',
                 '<25>{#f/3}* It appears that little white dog has raided my kitchen again.',
                 '<25>{#f/4}* You should see the state of that pie...',
                 '<25>{#f/0}* Fortunately, you got your slice before that happened.',
                 '<25>{#f/0}* Anyway, I have prepared a plate of fried snails just for you.'
              ]
            : [
                 '<25>{#p/toriel}* Voila, breakfast is ready!',
                 '<25>* I have prepared a plate of fried snails just for you.'
              ]),
         '<25>* I will leave them on the table for you.'
      ],
      fridgetrap: {
         a: [ '<32>{#p/narrator}* For some reason, there is a brand-name chocolate bar in the fridge.' ],
         b: [
            '<32>{#p/narrator}* ...',
            '<32>* Do you want to try it?',
            choicer.create('* (Take the chocolate?)', 8, 7, 'Yes', 'No')
         ],
         b1: [ '<32>{#p/human}* (You let the chocolate bar be.)' ],
         b2: [ '<32>{#p/human}* (You got the chocolate bar.)' ],
         c: [ "<32>{#p/narrator}* There's nothing of value in there." ],
         d: [ "<32>{#p/human}* (You're carrying too much.)" ]
      },
      front1: [
         "<32>{#p/monster}* ...just don't know if we can let them in, Ma'am...",
         '<25>{#p/toriel}{#f/1}* I promise you, this child will be on their best behavior.',
         '<32>{#p/monster}* Are you sure?',
         '<25>{#p/toriel}* Positive.',
         '<32>{#p/monster}* ...',
         '<32>* Alright, I trust you.\n* Looking forward to seeing them, I guess.'
      ],
      front2: () => [
         '<25>{#p/toriel}{#f/2}* How long have you been standing there!?',
         '<25>{#f/5}* ...',
         '<25>{#f/0}* I suppose it matters not.',
         '<25>* From now on, you should not have to deal with any more FIGHTs.',
         '<25>{#f/0}* Oh, and the party club is now open to visitors!',
         '<25>{#f/1}* If you ever get bored of wandering, please...',
         '<25>{#f/0}* Take the time to visit them.',
         ...(save.data.n.state_wastelands_mash === 1
            ? [
                 '<26>{#f/3}* In other news, that little white dog has raided my kitchen again.',
                 '<25>{#f/4}* You should see the state of that pie...',
                 '<25>{#f/0}* Still, I have done my best to salvage it for you.',
                 '<25>{#f/1}* I hope you like it...'
              ]
            : [ '<25>{#f/0}* It is not often they get to see new faces.' ]),
         '<25>{#f/0}* That being said, I will be in the living room if you need me!'
      ],
      front3: () => [
         '<25>{#p/toriel}* Good morning, little one!',
         '<25>{#f/5}* ...',
         ...(save.data.n.state_wastelands_mash === 1
            ? [
                 '<25>{#f/3}* That little white dog has once again raided my kitchen.',
                 '<25>{#f/4}* You should see the state of that pie...',
                 '<25>{#f/0}* Still, I have done my best to salvage it for you.',
                 '<25>{#f/1}* I hope you like it...'
              ]
            : [ '<25>{#f/1}* It is a rather nice day today, is it not?', '<25>* At least, it has been so for me...' ]),
         '<25>{#f/0}* Anywho, I will be in the living room if you need me.'
      ],
      front4: () => [
         '<25>{#p/toriel}* Good morning, little one.',
         '<25>{#f/5}* ...',
         '<25>* The OUTLANDS have been unusually silent today.',
         '<25>* No fussing, no bussing... nothing.',
         ...(save.data.n.state_wastelands_mash === 1
            ? [
                 '<25>{#f/3}* Apart from the little white dog raiding my kitchen again, that is.',
                 '<25>{#f/4}* You should see the state of that pie...',
                 '<25>{#f/0}* Still, I have done my best to salvage it for you.',
                 '<25>{#f/1}* I hope you like it...'
              ]
            : [
                 '<25>{#f/0}* In an odd way, it is... kind of peaceful.',
                 '<25>{#f/1}* Still, it would be nice if just one monster were to say hello...'
              ]),
         '<25>{#f/0}* Anywho, I will be in the living room if you need me.'
      ],
      goodbye1: [ '<25>{#p/toriel}{#f/10}* ...', '<25>{#f/20}{*}* Come here- {%}' ],
      goodbye1a: [ '<25>{#p/toriel}{#f/9}* ...', '<25>{#f/19}{*}* Come here- {%}' ],
      goodbye2: [
         '<25>{#p/toriel}{#f/5}* I am sorry for what I have put you through.',
         '<25>{#f/9}* In the end, I cannot keep you here against your will.',
         '<25>{#f/1}* Although...',
         '<25>{#f/0}* Tell you what.',
         '<25>{#f/1}* If you ever need someone to talk to out there...',
         '<25>{#f/0}* Feel free to call me, at any time.',
         '<25>{#f/1}* And if you need to return here for any reason...',
         '<25>{#f/0}* I will do my best to accomedate you during your stay.'
      ],
      goodbye3: [
         '<25>{#p/toriel}{#f/5}* I am sorry for what I have put you through.',
         '<25>{#f/9}* In the end, I cannot keep you here against your will.',
         '<25>{#f/10}* I will miss you, my child...',
         '<25>{#f/14}* Be good, alright?'
      ],
      goodbye4: [ '<25>{#p/toriel}{#f/1}* Be good, alright?' ],
      goodbye5a: [
         '<25>{#p/toriel}{#f/5}* You changed your mind...',
         '<25>{#f/9}* ...',
         '<25>{#f/10}* Perhaps you really are different from them...',
         '<25>{#f/14}* ...well then.',
         '<25>{#f/0}* I will finish up here, and meet you back at the house.',
         '<25>{#f/1}* Thank you for listening, my child.',
         '<25>{#f/0}* It means a lot to me.'
      ],
      goodbye5b: [
         '<25>{#p/toriel}{#f/5}* You changed your mind...',
         '<25>{#f/9}* Forgive me, my child...',
         '<25>{#f/10}* I... think I lost it there for a moment...',
         '<25>{#f/14}* ...well then.',
         '<25>{#f/0}* I will finish up here, and meet you back at the house.',
         '<25>{#f/1}* Thank you for listening, my child.',
         '<25>{#f/0}* It means a lot to me.'
      ],
      guard: {
         a: pager.create(
            'random',
            () =>
               world.bullied
                  ? [ "<32>{#p/monster}{#n1}* We don't take kindly to bullies 'round here, kid..." ]
                  : [ "<32>{#p/monster}{#n1}* Eyy, this place ain't for newcomers, kid..." ],
            world.bullied
               ? [ "<32>{#p/monster}{#n1}* We don't like your aggressive type 'round here..." ]
               : [ '<32>{#p/monster}{#n1}* Eyy, this place is off limits...' ],
            world.bullied
               ? [ "<32>{#p/monster}{#n1}* Not gonna letcha thru after what you've done, pal..." ]
               : [ '<32>{#p/monster}{#n1}* Not gonna letcha thru, pal...' ]
         )
      },
      halo: {
         a: [ '<32>{#p/human}* (You got the halo.)' ],
         b: [ "<32>{#p/human}* (You're carrying too much to take that.)" ]
      },
      indie1: [
         '<25>{#p/toriel}* So far, we have learned how to solve puzzles and win battles.',
         '<25>{#f/0}* Now, there is a far more important lesson you must learn.',
         '<25>{#f/1}* ...',
         '<25>{#f/1}* Tell me, do you think you can make it to the end of this room...',
         '<25>{#f/1}* ...without my help?',
         choicer.create('* (What do you say?)', 8, 7, 'Yes', 'No')
      ],
      indie1a: [
         '<25>{#p/toriel}{#f/1}* Are you sure?',
         '<25>{#f/5}* It is only a short distance away...',
         choicer.create('* (Change your mind?)', 8, 7, 'Yes', 'No')
      ],
      indie1b: [
         '<25>{#p/toriel}{#f/1}* Um...',
         '<25>{#f/1}* It IS important to do things on your own, correct?',
         choicer.create('* (Change your mind?)', 8, 7, 'Yes', 'No')
      ],
      indie2a: [ '<25>{#p/toriel}{#f/1}* Alright then...', '<25>{#f/0}* Good luck!' ],
      indie2b: [ '<25>{#p/toriel}{#f/5}* ...', '<25>{#f/9}* ...' ],
      indie2b1: [
         '<25>{#p/toriel}{#f/10}* Worry not, my child.',
         '<25>{#f/1}* If you truly do not wish to leave my side, then...',
         '<25>{#f/0}* I will guide you through the remainder of the OUTLANDS.',
         '<25>{#f/1}* ...',
         '<25>{#f/5}* Take my hand, young one...',
         "<25>{#f/9}* We're going home."
      ],
      indie2c: [ '<32>{#p/human}* (As Toriel escorts you home, her soothing grip...)' ],
      indie2d: [
         '<32>{#p/human}* (It seems oddly familiar.)',
         '<32>* (Like a memory, except...)',
         "<32>* (It's not something you've ever felt, not in the past.)",
         '<32>{#p/narrator}* Is that supposed to mean something?'
      ],
      indie2e: [ "<32>{#p/human}* (It's not like something you've ever felt before.)" ],
      indie2f: [
         "<32>{#p/narrator}* Soon enough, you arrive at Toriel's home.",
         '<32>* For some reason, she feels the need to put you to bed right away.',
         '<32>* With a pat on the head, you begin to drift off to sleep.',
         '<32>{#p/human}* (A feeling of serenity washes over you...)'
      ],
      indie3a: [ '<25>{#p/toriel}* Ah, you made it!' ],
      indie3b: [
         '<25>{#p/toriel}{#f/3}* My child, what took you so long??',
         '<25>{#f/4}* Are you alright?',
         '<25>{#f/5}* Hmm...\n* You do seem to be fine...',
         '<25>{#f/5}* ...',
         '<25>{#f/0}* Well, regardless, it is good to see you again.'
      ],
      indie4: [
         '<25>{#p/toriel}* Do not worry, you were never in any danger.',
         '<25>{#f/1}* This was merely a test of your independence, for you see...',
         '<25>{#f/0}* I have some important errands to run.',
         '<25>{#f/9}* It is for this reason that I must leave you alone for a while.',
         '<25>{#f/5}* For your own safety, I advise you not to leave this room.',
         '<25>{#f/1}* There are a few puzzles I have yet to explain, and...',
         '<25>{#s/equip}{#f/0}* Well, in the meantime, I will give you a CELL PHONE.',
         '<25>{#p/toriel}{#f/1}* If you need anything, please...',
         '<25>{#f/0}* Do not hesitate to call.',
         '<25>{#f/5}* ...',
         '<25>{#f/1}* Be good, alright?'
      ],
      indie5: [
         [
            '<25>{#p/toriel}* Hello!\n* This is TORIEL.',
            '<25>* My errands are taking longer than I thought they would.',
            '<25>* You must wait a little longer.',
            '<25>{#f/1}* Oh, and...\n* Thank you for being patient...',
            '<25>{#f/0}* You are a very good child.'
         ],
         [
            '<25>{#p/toriel}* Hello...\n* This is TORIEL.',
            '<25>{#f/1}* I found what I was looking for...',
            '<25>{#f/0}* But a small, white puppy snatched it away!\n* How odd.',
            '<25>{#f/1}* Do dogs even like flour?',
            '<25>{#f/0}* Err, that is an unrelated question, of course.',
            '<25>* Regardless, it will take a little longer for me to return.',
            '<25>* Thanks again for being so patient.'
         ],
         [
            '<32>{#p/monster}* (...)',
            '<32>{#p/human}* (You hear heavy panting on the other end of the phone.)',
            '<32>{#s/bark}{#p/event}* Bark!\n* Bark!',
            '<32>{#p/human}* (You hear a distant voice.)',
            '<25>{#p/toriel}{#f/2}* Stop, please!',
            '<32>{#s/bark}{#p/event}* Bark!\n* Bark!',
            '<25>{#p/toriel}{#f/1}* Come back here with my CELL PHONE!'
         ],
         [
            '<32>{#p/monster}* (...)',
            '<32>{#p/human}* (It sounds like a small, white dog is sleeping on the cell phone.)',
            '<32>{#p/monster}* (Snore... snore...)',
            '<32>{#p/human}* (You hear a distant voice.)',
            '<25>{#p/toriel}{#f/1}* Hellooo?\n* Little puppy...?',
            '<25>{#f/1}* Where are youuu?',
            '<25>{#f/0}* I will give you a nice pat on the head!',
            '<32>{#p/human}* (The snoring stops.)',
            '<25>{#p/toriel}* ...if you return with my CELL PHONE.',
            '<32>{#p/human}* (The snoring resumes.)'
         ],
         [
            '<32>{#p/monster}* (...)',
            '<32>{#p/monster}* (Achoo!)',
            '<32>{#p/human}* (It sounds like a small, white dog sneezing in its sleep.)',
            '<25>* (You hear a distant voice.)',
            '<25>{#p/toriel}{#f/1}* Aha!\n* I heard that, you little white dog...',
            '<25>{#f/0}* Now I am going to find you!',
            '<32>{#p/human}* (The snoring stops.)\n* (The dog now seems to be on the run from something.)',
            '<25>{#p/toriel}{#f/8}* Hee hee, there is no escape!'
         ],
         [
            '<32>{#p/human}* (You hear a distant voice.)',
            '<25>{#p/toriel}{#f/1}* Hello...\n* This is... TORIEL...',
            '<32>{#s/bark}{#p/event}* Bark!\n* Bark!',
            '<25>{#p/toriel}{#f/2}* No, bad puppy!',
            '<32>{#p/monster}* (Whimper... whimper...)',
            '<25>{#p/toriel}* There, there...\n* I will find another CELL PHONE for you.',
            '<25>{#f/1}* Does that sound good?',
            '<32>{#p/monster}* (...)',
            '<32>{#s/bark}{#p/event}* Bark!',
            '<25>{#p/toriel}* Ah, I am glad to hear it.',
            '<32>{#p/human}* (The dog could be heard walking away.)',
            '<25>{#p/toriel}* Please, forgive me for all of this nonsense.',
            '<25>{#f/1}* It is not every day a dog steals your CELL PHONE...',
            '<25>{#f/0}* Anywho, I will be back to pick you up shortly.',
            '<25>* See you soon.'
         ]
      ],
      indie6: [
         '<25>{#p/toriel}* Hello?\n* This is TORIEL.',
         '<25>{#f/1}* You have not left the room, have you?',
         '<25>{#f/0}* There are many dangers out there, and I do not want you to get hurt.',
         '<25>* Take care of yourself, alright?'
      ],
      indie6a: [ '<32>{#p/narrator}* So much for being patient...' ],
      indie6b: [ '<32>* ...eh, at least you waited a little before leaving the room.' ],
      indie7: [ '<25>{#p/narrator}* A few minutes later...' ],
      indie8: [
         '<25>{#p/toriel}* I have returned!',
         '<25>{#p/toriel}* I am glad that you have been so patient with me, my child.',
         '<25>* It is not very often those your age behave this well.',
         '<25>{#f/1}* But now, it is time I took you home...',
         '<25>{#f/0}* Please, allow me to lead the way!'
      ],
      lobby_puzzle1: [
         '<25>{#p/toriel}* Welcome to our humble outpost, innocent one.',
         '<25>{#f/1}* This place may seem strange to you now, but...',
         '<25>{#f/0}* With time, and a little guidance, you will grow accustomed to it.',
         '<25>* Before that can begin, however, we must make it to the next room.',
         '<25>* Allow me to educate you in the operation of the OUTLANDS.'
      ],
      lobby_puzzle2: [
         '<25>{#p/toriel}* This old place is full of puzzles.',
         '<25>{#f/1}* While some are more difficult than others...',
         '<25>{#f/0}* One must still unlock them to move from room to room.',
         '<25>* Please, adjust yourself to the sight of them.'
      ],
      lobby_puzzle3: [ '<25>{#p/toriel}* When you are ready, we may proceed.' ],
      loox: {
         a: [
            "<32>{#p/monster}{#n1}* I heard you're quite flirty, for a human.",
            "<32>* That's it, I just wanted to mention that.",
            '<32>* What?\n* Were you expecting some kind of advice?',
            '<32>* Get outta here...\n* There is no good advice when it comes to flirting.',
            '<32>* Only awkwardness.',
            '<32>* Lots and lots of awkwardness.'
         ],
         b: [
            '<32>{#p/monster}{#n1}* Hey human, have you tried flirting yet?',
            "<32>* Ha!\n* I can tell by the look on your face that you haven't yet.",
            "<32>* I gotta tell you, it's tons of fun.",
            "<32>* Your enemies won't know what to do with themselves!"
         ],
         c: [
            "<32>{#p/monster}{#n1}* Hey human, now that you've started flirting...",
            '<32>* How does it feel?',
            "<32>* It's pretty great, right?",
            '<32>* Yeah.\n* Keep it up!'
         ],
         d: [
            "<32>{#p/monster}{#n1}* I hear you're somewhat of a bully around here.",
            '<32>* Hah!\n* Join the club, pal.',
            "<32>* You're talking to the number one bully around."
         ]
      },
      manana: {
         a: pager.create(
            'limit',
            [
               '<32>{#p/monster}* Finally someone speaks to me!',
               "<32>* Let me tell ya, I've been standing out here for ages, and nobody's taken my offer.",
               "<32>* I'm looking for someone to buy this limited edition Super Starwalker comic strip.",
               "<32>* You interested?\n* All I'm asking for is 15 G.",
               choicer.create('* (Buy the comic strip?)', 8, 7, 'Yes', 'No')
            ],
            [
               '<32>* Interested in buying my limited edition Super Starwalker comic strip?',
               choicer.create('* (Buy the comic strip?)', 8, 7, 'Yes', 'No')
            ]
         ),
         b: [
            "<32>{#p/monster}* I'll be honest, that doesn't look like 15 G...",
            '<32>* Heh.\n* Sorry, bud.',
            "<32>* Guess you'll have to find some more gold."
         ],
         c: [
            '<32>{#p/monster}* Not interested, huh?',
            "<32>* Well, that's alright, not everyone's into this kinda thing."
         ],
         d: [ '<32>{#p/monster}* Splendid, enjoy the comic!' ],
         e: [
            '<32>{#p/monster}* Back again, huh?',
            "<32>* Sorry, I've got nothing left to sell.",
            '<32>* Maybe another time, bud.'
         ],
         f: [
            '<32>{#p/monster}* Splendid!',
            '<32>* ...wait a sec, are you sure you can carry this?',
            "<32>* Those pockets are lookin' kinda full, bud..."
         ]
      },
      patron: {
         a: pager.create(
            'limit',
            () =>
               save.data.b.napsta_performance
                  ? [
                       '<32>{#p/monster}{#n1}* That was a neat song.',
                       "<32>* Too bad the composer didn't think so. We'll probably never hear it again."
                    ]
                  : [
                       '<32>{#p/monster}{#n1}* I\'m sad.\n* This "real" steak isn\'t living up to my expectations.',
                       "<32>* I was promised something new, but it's just a cheap copy...",
                       '<32>{#n1!}{#n2}* Hey! ;)\n* Quit bad-mouthing my shop in front of the customers! ;)',
                       '<32>* Besides, what if your sense of taste just went bad... ;)',
                       "<32>{#n2!}{#n1}* You don't know that..."
                    ],
            () =>
               save.data.b.napsta_performance
                  ? [ "<32>{#p/monster}{#n1}* That's just the way it is sometimes..." ]
                  : [
                       "<32>{#p/monster}{#n1}* Don't get me wrong, it's decent steak.",
                       '<32>* But it\'s not "real" like he says it is...'
                    ]
         )
      },
      pie: () =>
         save.data.n.state_wastelands_mash === 1
            ? [ '<32>{#p/human}* (You got the pie soup.)' ]
            : save.data.b.snail_pie
            ? [ '<32>{#p/human}* (You got the Snail Pie.)' ]
            : [ '<32>{#p/human}* (You got the Butterscotch Pie.)' ],
      plot_call: {
         a: [
            '<32>{#p/event}* Ring, ring...',
            '<25>{#p/toriel}* Hello?\n* This is TORIEL.',
            '<25>{#f/1}* For no reason in particular...',
            '<25>{#f/0}* Which do you prefer?\n* Cinnamon or Butterscotch?',
            choicer.create('* (Which do you prefer?)', 8, 7, 'Bscotch', 'Cinnamon'),
            '<25>{#p/toriel}* Oh, I see!',
            '<25>* Thank you very much.'
         ],
         b: () => [
            '<32>{#p/event}* Ring, ring...',
            '<25>{#p/toriel}* Hello?\n* This is TORIEL.',
            [
               '<25>{#f/1}* You do not DISLIKE cinnamon, do you?',
               '<25>{#f/1}* You do not DISLIKE butterscotch, do you?'
            ][save.data.n.choice_flavor],
            '<25>{#f/1}* I know what your preference is, but...',
            '<25>{#f/1}* Would you turn up your nose if you found it on your plate?',
            choicer.create('* (What do you say?)', 8, 7, 'No', 'Yes')
         ],
         b1: [ '<25>{#p/toriel}* Right, right, I understand.', '<25>* I had to make sure!' ],
         b2: [
            '<25>{#p/toriel}{#f/5}* ...',
            '<25>{#f/0}* Well then.',
            '<25>{#f/1}* ...',
            '<25>{#f/0}* I will call you back later, my child.'
         ],
         c: [
            '<32>{#p/event}* Ring, ring...',
            '<25>{#p/toriel}* Hello?',
            '<25>{#f/1}* You do not have any allergies, do you?',
            '<25>{#f/5}* Um...',
            '<25>{#f/0}* You know what, forget I asked.'
         ],
         d: [
            '<32>{#p/event}* Ring, ring...',
            '<25>{#p/toriel}* Hello?',
            '<25>{#f/1}* I realize now that it has been a while since I cleaned up...',
            '<25>{#f/0}* I was not expecting company so soon.',
            '<25>{#f/0}* There are likely plenty of things strewn about.',
            '<25>{#f/0}* You can pick them up if you want, but do not carry too much.',
            '<25>{#f/1}* What if you see something you really like?',
            '<25>{#f/0}* You will want to leave space in your pockets for that.'
         ]
      },
      puzzle1A: [ '<32>{#p/narrator}* The switch is stuck.' ],
      puzzle3A: [ '<32>{#p/narrator}* The switch is stuck.\n* Again.' ],
      return1: [ '<25>{#p/toriel}{#f/1}* My child, how did you get here!?', '<25>* Are you alright?' ],
      return2a: [ '<25>{#p/toriel}* Not a scratch!\n* I was... not expecting that.' ],
      return2b: [ '<25>{#p/toriel}{#f/4}* You look hurt...', '<25>{#f/10}* There, there, I will heal you.' ],
      return2c: [
         '<25>{#p/toriel}{#f/3}* ...',
         '<25>{#f/11}* Who did this to you?\n* Someone is going to answer for this.'
      ],
      return2d: [
         '<25>{#p/toriel}{#f/5}* ...',
         "<25>{#f/1}* You're covered in dust...",
         '<25>{#f/0}* Perhaps the OUTLANDS is not as clean as I thought it was.'
      ],
      return2e: [ '<32>{#p/narrator}* As if anybody can...' ],
      return3: [
         '<25>{#p/toriel}* I apologize, young one.\n* It was foolish of me to leave you on your own.',
         '<25>* Come!\n* I have a surprise for you.'
      ],
      return4: () =>
         save.data.b.snail_pie
            ? [
                 '<25>{#p/toriel}* Welcome to my parlor!',
                 '<25>{#f/1}* Can you smell that?',
                 '<25>{#f/0}* Surprise!\n* It is a homemade snail pie.',
                 '<25>{#f/1}* Now, it has been a long time since I have cared for anyone...',
                 '<25>{#f/0}* But I still want you to have a nice time living here.',
                 '<25>{#f/0}* Follow me!\n* I have another surprise for you.'
              ]
            : [
                 '<25>{#p/toriel}* Welcome to my parlor!',
                 '<25>{#f/1}* Can you smell that?',
                 '<25>{#f/0}* Surprise!\n* It is a butterscotch- cinnamon pie.',
                 '<25>{#f/0}* I thought you might prefer that instead of snail pie for tonight.',
                 '<25>{#f/1}* Now, it has been a long time since I have cared for anyone...',
                 '<25>{#f/0}* But I still want you to have a nice time living here.',
                 '<25>{#f/0}* Follow me!\n* I have another surprise for you.'
              ],
      return5: [
         "<25>{#p/toriel}* Would you look at that!\n* It's a room of your very own.",
         '<25>{#f/1}* I hope you like it...'
      ],
      return6: [
         '<25>{#p/toriel}{#f/1}* Well, I have to go check on the pie.',
         '<25>{#f/0}* Please, make yourself at home!'
      ],
      runaway1: [
         [ '<25>{#p/toriel}{#f/1}* Should you not play at the house instead?', '<25>{#f/0}* Come now.' ],
         [ '<25>{#p/toriel}{#f/5}* Child, it is dangerous to play out here.' ],
         [ '<25>{#p/toriel}{#f/5}* It is drafty here.\n* You will catch a cold.' ],
         [ '<25>{#p/toriel}{#f/5}* It is dusty here.\n* You will catch a cough.' ],
         [ '<25>{#p/toriel}{#f/5}* There is really nothing to see out here...' ],
         [ '<25>{#p/toriel}{#f/1}* Would you like to read a book with me?' ],
         [ '<25>{#p/toriel}{#f/5}* I cannot do this all day, young one.' ],
         [
            '<25>{#p/toriel}{#f/17}* ...',
            '<25>{#f/15}* I do not like the game you are playing.' // wow, rude...
         ],
         [ '<25>{#p/toriel}{#f/17}* ...' ]
      ],
      runaway2: [
         '<25>{#p/toriel}{#f/1}* Please come back to the house, little one...',
         '<25>{#f/0}* I have something to show you!'
      ],
      silencio: {
         a: pager.create(
            'limit',
            [
               '<32>{#p/monster}{#n1}* Hey there.\n* Nice to meet you.',
               "<32>* The name's Silencio... well, that's what they call me, anyway.",
               '<32>* You wanna know why they call me that?',
               "<32>* I'm like a ninja, silent as the most silent of nights.",
               '<32>* I can slip out of any danger, no exceptions.',
               "<32>* Don't believe me?\n* Try something funny, and you'll see how fast I run."
            ],
            [
               '<32>{#p/monster}{#n1}* What you still talking to me for, huh?',
               "<32>* I've already said everything I'm willing to."
            ]
         ),
         b: pager.create(
            'limit',
            [
               '<32>{#p/monster}{#n1}* Hey there.',
               "<32>* How's it going?",
               '<32>* Sorry, what was that?',
               "<32>* Never mind.\n* It's hard to hear you through all the dust, anyway.",
               '<32>* ...'
            ],
            [ '<32>{#p/monster}{#n1}* Get outta my sight.' ]
         )
      },
      // cetadel i swear if you say "socks" one more time-
      socks1: pager.create('limit', () => [
         '<32>{#p/human}* (You peek inside.)',
         "<32>{#p/narrator}* Scandalous!\n* It's Toriel's sock collection.\n* A little messy...",
         world.population < 7
            ? choicer.create('* (Make it messier?)', 8, 7, 'No', 'Yes')
            : choicer.create('* (Clean up the mess?)', 8, 7, 'Yes', 'No')
      ]),
      socks2: () =>
         world.population < 7
            ? [ '<33>{#p/human}* (You make a mess of the socks.)' ]
            : [
                 '<32>{#p/human}* (You organize the socks into matching pairs.)',
                 ...(save.data.b.oops
                    ? []
                    : [
                         '<32>{#p/narrator}* What the...',
                         "<32>{#p/narrator}* There's a switch hidden in the drawer here.",
                         choicer.create('* (Pull the switch?)', 8, 7, 'Yes', 'No')
                      ])
              ],
      socks3: [
         "<32>{#p/narrator}* There's a switch hidden in the drawer here.",
         choicer.create('* (Pull the switch?)', 8, 7, 'Yes', 'No')
      ],
      socks4: [ '<32>{#p/human}* (You let the socks be.)' ],
      socks5: [ '<32>{#p/human}* (You pulled the switch.)' ],
      socks6: [ '<32>{#p/human}* (You let the switch be.)' ],
      socks7: [ "<32>{#p/human}* (You can't stop looking at the re-arranged socks.)" ],
      soupguy: {
         a: pager.create(
            'limit',
            [ '<32>{#p/monster}{#n1}* YIPPIE, that music made me wanna DANCE!', "* Too bad I don't have legs..." ],
            [ '<32>{#p/monster}{#n1}* Could you dance for me?' ]
         ),
         b: pager.create(
            'limit',
            [
               '<32>{#p/monster}{#n1}* I WANT SOUP!\n* I WANT SOUP!',
               '<32>* Do you have any soup!?',
               '<32>* Oh wait...',
               '<32>* I forgot it was here already.'
            ],
            [
               '<32>{#p/monster}{#n1}* I shouted for so long that the soup got cold.',
               "<32>* And I can't just leave because it would be rude."
            ]
         ),
         c: pager.create(
            'limit',
            [
               '<32>{#p/monster}{#n1}* All the other people went home a while ago.',
               '<32>* But I stayed behind to guard my soup.',
               '<32>* MUST GUARD THE SOUP!'
            ],
            [ '<32>{#p/monster}{#n1}* This is a way of life for me.' ]
         )
      },
      steaksale: {
         a: pager.create(
            'limit',
            [
               '<32>{#p/monster}{#n1}* Sup, lassy ;)',
               "<32>* The boss-man sent me out here to see what you country peeps are up to, y'know? ;)",
               "<32>* You could say we're expanding our enterprise ;)",
               "<32>* What's our enterprise, you ask? ;)",
               "<32>* Well, it's quite simple really... we sell steak ;)",
               "<32>* And this ain't the replicated stuff, aw naw ;)",
               '<32>* This stuff is REAL, yo ;)',
               '<32>* Anyone who says otherwise is a poser, ya feel me? ;)',
               '<32>* That being said... ;)',
               "<32>* Why don'tcha check out what's for sale? ;)"
            ],
            [ "<32>{#p/monster}{#n1}* Why don'tcha check out what's for sale? ;)" ]
         ),
         a1: [ '<32>{#p/monster}{#n1}* Thanks for everything, lassy ;)' ],
         b: [
            '<32>{#p/narrator}{#n1!}* "Sizzli Steak" - 30 G\n* Smells like hyperbole.',
            choicer.create('* (Buy this item?)', 8, 7, 'Yes', 'No')
         ],
         b1: pager.create(
            'limit',
            [ '<32>{#p/human}{#n1!}* (You got the Sizzli Steak.)', '<32>{#p/monster}{#n1}* Slick choice, lassy ;)' ],
            [ '<32>{#p/human}{#n1!}* (You got the Sizzli Steak.)' ]
         ),
         b2: [ '<32>{#p/human}{#n1!}* (You left the Sizzli Steak on the table.)' ],
         c: [
            '<32>{#p/narrator}{#n1!}* "Fizzli Soda" - 15 G\n* Who would buy this?',
            choicer.create('* (Buy this item?)', 8, 7, 'Yes', 'No')
         ],
         c1: pager.create(
            'limit',
            [ '<32>{#p/human}{#n1!}* (You got the Fizzli Soda.)', "<32>{#p/monster}{#n1}* Careful, it's sweet ;)" ],
            [ '<32>{#p/human}{#n1!}* (You got the Fizzli Soda.)' ]
         ),
         c2: [ '<32>{#p/human}{#n1!}* (You left the Fizzli Soda on the table.)' ],
         d: pager.create(
            'limit',
            [
               "<32>{#p/human}{#n1!}* (You don't have enough G.)",
               '<32>{#p/monster}{#n1}* Not enough money, huh? ;)',
               '<32>{#p/monster}* You must be new around here ;)'
            ],
            [ "<32>{#p/human}{#n1!}* (You don't have enough G.)" ]
         ),
         e: pager.create(
            'limit',
            [ '<32>{#p/narrator}{#n1!}* ..', '<32>{#p/monster}{#n1}* Maybe you should come back later ;)' ],
            [ '<32>{#p/narrator}{#n1!}* ..' ]
         ),
         f: [ '<32>{#p/human}{#n1!}* (You took the Sizzli Steak.)' ],
         g: [ '<32>{#p/human}{#n1!}* (You took the Fizzli Soda.)' ],
         h: [ '<32>{#p/narrator}{#n1!}* ..' ],
         i: [
            "<32>{#p/monster}{#n1}* And with that, we're outta stock ;)",
            "<32>* Seems you can't get enough of our stuff ;)",
            '<32>* Say, if- no, when you meet the boss-man... tell him this ;)',
            '<32>{#p/human}{#n1!}* (Aaron whispered something in your ear.)',
            '<32>{#p/monster}{#n1}* Good luck out there, lassy ;)'
         ]
      },
      supervisor: {
         a: pager.create(
            'limit',
            [
               '<32>{#p/monster}{#n1}* Kid, do you know anyone who can operate that DJ set?',
               '<32>* Our usual host called in sick today.',
               choicer.create('* (Mention Napstablook?)', 8, 7, 'Yes', 'No')
            ],
            [
               '<32>{#p/monster}{#n1}* So, about that backup gig for today...',
               choicer.create('* (Mention Napstablook?)', 8, 7, 'Yes', 'No')
            ]
         ),
         a2: [ "<32>{#p/monster}{#n1}* Thanks for helpin' me with the show, kid." ],
         a3: [ "<32>{#p/monster}{#n1}* We've already tried asking 'em, kid...", '<32>* No point in doing it again.' ],
         a4: [
            "<32>{#p/monster}{#n1}* It's a shame, really...",
            '<32>* Tonight was supposed to be DJ night.',
            "<32>* Too bad we didn't have anyone to operate the table..."
         ],
         a5: pager.create(
            'limit',
            [
               '<32>{#p/monster}{#n1}* Kid, do you know anyone who can operate that DJ set?',
               '<32>* Our usual host called in sick today.',
               "<32>* ...huh?\n* You don't know anyone?",
               "<32>* Oh... that's a shame."
            ],
            [ "<32>* Hope you don't mind not having a party today, kid..." ]
         ),
         aa: [
            '<32>{#p/monster}{#n1}* That could work...',
            "<32>* Tell you what, I'll give 'em a call right now.",
            '<32>{#p/event}{#n1!}* Ring, ring...',
            "<32>{#p/monster}{#n1}* Hey, I was just callin' to see if you'd be up for a gig?",
            '<32>* Little kid here says they vouch for ya.{#n1!}'
         ],
         aa1: [
            [ "<32>{#p/napstablook}* oh, that'd be great...", '<32>* tell them i said thanks' ],
            [
               '<32>{#p/napstablook}* heh, of course they would want me to do that...',
               "<32>* sure, i can host tonight's show"
            ],
            [ '<32>{#p/napstablook}* ...' ],
            [ '<32>{#p/napstablook}* uh... i guess?', "<32>* well, i'll give it a try..." ],
            [ '<32>{#p/napstablook}* no thank you...' ]
         ],
         aa1a: [ "<32>{#p/monster}{#n1}* Sorry bud, doesn't seem like they're interested." ],
         aa1b: [ '<32>{#p/monster}{#n1}* Well now.\n* Seems we got a gig for tonight after all.{#n1!}' ],
         aa1c: [ '<32>{#p/narrator}* Later...' ],
         ab: [
            '<32>{#p/monster}* Well, let me know if something comes up, yeah?',
            '<32>* We could really use the help.'
         ],
         b: [
            '<32>{#p/napstablook}* so, uhm...\n* this is a little tune i wrote a while ago...',
            "<32>* it's nothing special, but...",
            "<32>* hopefully, it's good enough for this club",
            '<32>* well, here we go...'
         ],
         c: [
            [ '<32>{*}{#p/monster}{#x1}* Ooh, bells ;){^31}{%}' ],
            [
               '<32>{*}{#p/monster}* Eh, not my style.{^31}{%}',
               '<32>{*}{#p/monster}{#x2}* Fair enough, but I like it!{^31}{%}'
            ],
            [
               "<32>{*}{#p/monster}{#x3}* Hold up-\n* This doesn't sound that bad- {%}",
               '<32>{*}{#p/monster}{#x5}* Shush, here comes the drop!!{^31}{%}'
            ],
            [ '<25>{*}{#p/toriel}{#f/7}* Why has Napstablook never mentioned this??\n* This is good!{^31}{%}' ],
            [ "<32>{*}{#p/monster}* I mean, it's okay...{^31}{%}" ],
            [ '<32>{*}{#p/monster}{#x4}* Mmmh!{^31}{%}' ],
            [ '<32>{*}{#p/monster}* Whew, that was... something.{^31}{%}', '<32>{*}{#p/monster}* Yup.{^31}{%}' ],
            [ '<32>{*}{#p/monster}{#x6}* Wait, I thought it was over-{^31}{%}' ],
            [ "<32>{*}{#p/monster}{#x7}* Ah, there's the ending.{^31}{%}" ]
         ],
         d: [
            '<32>{#p/napstablook}* well, that was it',
            '<32>{#p/napstablook}* oh well...\n* i probably bored you guys...',
            "<32>{#p/napstablook}* sorry...\n* i'll be going now...",
            '<32>{#p/napstablook}* cya...'
         ],
         e: [
            '<25>{#p/toriel}{#f/1}* No wait, that was actually...',
            "<32>{#p/monster}* I don't think they can hear you, Toriel.",
            '<25>{#p/toriel}{#f/5}* No...',
            '<25>{#p/toriel}{#f/9}* Oh, who am I kidding.',
            '<25>{#p/toriel}{#f/5}* And to think this time would be different...'
         ]
      },
      terminal: {
         a: [
            '<32>{#p/human}* (You activate the terminal and read the message.)',
            '<32>{#p/narrator}* "Outpost Bulletin: The Foundry\'s fluid network is in disrepair again."',
            '<32>* "The workers have promised a short turnaround, but things are looking bleak."',
            '<32>* "Please, if anyone out there can help... we need you."'
         ],
         b: [
            '<32>{#p/human}* (You activate the terminal and read the message.)',
            "<32>{#p/narrator}* \"Come see DJ Red perform her hit single 'Kamikaze' live at tonight's club meet!\"",
            '<32>* "P.S. the fuel injector broke again, so we threw it in storage."',
            ...(world.azzie && save.flag.n.ga_asrielOutlands4++ < 1
               ? [ '<25>{#p/asriel2}{#f/8}* Those things were never reliable anyway...' ]
               : [])
         ],
         c: () =>
            save.data.b.genocide
               ? [
                    '<32>{#p/human}* (You activate the terminal and read the transit logs.)',
                    '<32>{#p/narrator}* "Arrival: Toriel, 5m"\n* "Arrival: Napstablook, 4h"\n* "Depature: Red, 4h"',
                    '<32>* "Departure: Silencio, 10m"',
                    '<32>* "No further log entries present."'
                 ]
               : [
                    '<32>{#p/human}* (You activate the terminal and read the transit logs.)',
                    '<32>{#p/narrator}* "Arrival: Toriel, 5m"\n* "Arrival: Napstablook, 4h"\n* "Depature: Red, 4h"',
                    '<32>* "No further log entries present."'
                 ],
         d: () => [
            '<32>{#p/human}* (You activate the terminal and read the message.)',
            '<32>{#p/monster}* "OUTLANDS NEWSLETTER"\n* "The party club will be hosting DJ night tomorrow."',
            '<32>* "Expect to see DJ Red make her stunning return!"',
            '<32>* "In other news, one of Glyde\'s dealers has arrived from Aerialis."',
            '<32>* "We\'ve already started getting complaints about him..."',
            ...(world.azzie && save.flag.n.ga_asrielOutlands1++ < 1
               ? [
                    "<25>{#p/asriel2}{#f/3}* I don't know about you, but I don't see anyone here.",
                    '<25>{#p/asriel2}{#f/4}* Not bad, $(name).'
                 ]
               : [])
         ]
      },
      torieldanger: {
         a: [ '<25>{#p/toriel}{#f/1}* Have you tried checking the terminal?' ],
         b: [ '<25>{#p/toriel}{#f/1}* The password terminal is right over there, little one.' ]
      },
      latetoriel1: [
         '<25>{#p/toriel}{#npc/a}{#f/2}* ...!',
         '<25>{#f/5}* What are you doing out here, my ch...',
         '<25>{#f/9}* ...child...',
         '<25>{#f/5}* I cannot care for you any longer, child.\n* Nor should I.',
         '<25>{#f/5}* You have places to be, things to see...',
         '<25>{#f/1}* Who am I to keep you from that?',
         '<25>{#f/9}* ...',
         '<25>{#f/14}* Please, take the reigns and carry on...',
         '<25>{#f/10}* ...because, for once, I believe in you.',
         '<25>{#f/10}* I know you will do the right thing with or without me.'
      ],
      latetoriel2: [ '<25>{#p/toriel}{#npc/a}{#f/10}* Go on, young one.' ],
      trivia: {
         w_backstage_cabinet: () => [
            '<32>{#p/human}* (You look inside the cabinet...)',
            "<32>{#p/narrator}* It's overflowing with papers, all written in an odd font.",
            "<32>{#p/narrator}* You won't be able to make any of this out.",
            ...(world.azzie && save.flag.n.ga_asrielOutlands2++ < 1
               ? [ "<25>{#p/asriel2}{#f/10}* Dr. Roman's paperwork...", "<25>* What's it doing here?" ]
               : [])
         ],
         w_backstage_coatrack: [ '<32>{#p/narrator}* The coats on this rack have not seen much use.' ],
         w_candy: [ '<32>{#p/narrator}* "Careful, the vending machine is prone to malfunctions."\nµ - Tom Cryme' ],
         w_clay: [ '<32>{#p/narrator}* A spilled bucket of clay substrate.', "<32>* What's clay substrate, anyway?" ],
         w_danger1: [ '<32>{#p/narrator}* "If you cannot reach the terminal, please, ask me for help."' ],
         w_djtable: [ '<32>{#p/narrator}* A fancy DJ table with tons of little knobs and sliders.' ],
         w_doorBlue: pager.create(
            'limit',
            () =>
               world.population < 8
                  ? [
                       '<32>{#p/human}* (You ring the buzzer...)',
                       world.bullied
                          ? '<32>{#p/narrator}* ...but everybody ran.'
                          : '<32>{#p/narrator}* ...but nobody came.'
                    ]
                  : [
                       '<32>{#p/human}* (You ring the buzzer...)',
                       "<32>{#p/monster}* Finally, you've arrived!",
                       "<32>* So uh, I've been meaning to tell you...",
                       "<32>* I took a pencil from the supervisor's office, and...",
                       "<32>* I dunno what I'm gonna do if he finds out!",
                       '<32>{#p/monster}* So uh...\n* Yeah...',
                       '<32>* Wait a sec.',
                       "<32>* Is this Tom I'm speaking to, or...",
                       '<32>* ...',
                       "<32>* Shoot...\n* It's not, is it...",
                       '<32>* ...',
                       '<32>* Ok, listen, I obviously dunno who you are.',
                       "<32>* But ya can't tell anyone about this, yeah?",
                       "<32>* If the supervisor finds out about this, I'm toast!",
                       "<32>* And when I say toast, I'm not talking about the buttered kind.",
                       "<32>* We're talking burnt, like, to a crisp burnt, y'hear?",
                       '<32>* So you better keep quiet, yeah?',
                       '<32>* Heh, thanks pal.'
                    ],
            () =>
               world.population < 8
                  ? [
                       '<32>{#p/human}* (You ring the buzzer...)',
                       world.bullied
                          ? '<32>{#p/narrator}* ...but everybody ran.'
                          : '<32>{#p/narrator}* ...but nobody came.'
                    ]
                  : [
                       '<32>{#p/human}* (You ring the buzzer...)',
                       "<32>* Oh hey, it's you again.",
                       "<32>{#p/monster}* You're not gonna tell anyone about our little secret, are you?",
                       '<32>* ...',
                       "<32>* Naahhh, you're a good fella.\n* You'd never do that to me.",
                       '<32>* Well, see ya.'
                    ]
         ),
         w_doorCyan: pager.create(
            'limit',
            () =>
               world.population < 6
                  ? [
                       '<32>{#p/human}* (You ring the buzzer...)',
                       world.bullied
                          ? '<32>{#p/narrator}* ...but everybody ran.'
                          : '<32>{#p/narrator}* ...but nobody came.'
                    ]
                  : [
                       '<32>{#p/human}* (You ring the buzzer...)',
                       "<32>{#p/monster}* Sorry friend, can't answer that.",
                       "<32>* I'm waiting for someone to get back to me on OuterNet.",
                       "<32>* I want to be there the moment they say anything.\n* Can't risk missing it!"
                    ],
            () =>
               world.population < 6
                  ? [
                       '<32>{#p/human}* (You ring the buzzer...)',
                       world.bullied
                          ? '<32>{#p/narrator}* ...but everybody ran.'
                          : '<32>{#p/narrator}* ...but nobody came.'
                    ]
                  : [
                       '<32>{#p/human}* (You ring the buzzer again...)',
                       '<32>{#p/monster}* Sorry, still waiting on my friend... maybe later!'
                    ]
         ),
         w_doorGreen: () =>
            world.population < 10
               ? [
                    '<32>{#p/human}* (You ring the buzzer...)',
                    world.bullied
                       ? '<32>{#p/narrator}* ...but everybody ran.'
                       : '<32>{#p/narrator}* ...but nobody came.'
                 ]
               : [
                    '<32>{#p/human}* (You ring the buzzer...)',
                    '<32>{#p/monster}* Uh, hello?\n* Hold on, I will be right there...',
                    '<32>{#p/human}* (You hear enthusiastic footsteps coming towards the door.)',
                    "<32>{#p/monster}* Alright, I'm here!\n* Do you need anything?",
                    '<32>* Uhm, what was that?\n* Forgive me, I am a little hard of hearing...',
                    '<32>* Uh... hello?\n* Are you still there?',
                    "<32>* Oh, I've done it again...",
                    '<32>{#p/human}* (Somber footsteps are heard walking away from the door.)'
                 ],
         w_doorOrange: pager.create(
            'limit',
            () =>
               world.population < 2
                  ? [
                       '<32>{#p/human}* (You ring the buzzer...)',
                       world.bullied
                          ? '<32>{#p/narrator}* ...but everybody ran.'
                          : '<32>{#p/narrator}* ...but nobody came.'
                    ]
                  : [
                       "<32>{#p/human}* (You ring the buzzer... it sounds like someone's mono- loguing to themselves.)",
                       '<32>{#p/monster}* This is it.\n* Now is the time.\n* Today is the day.',
                       "<32>* It won't be easy, and it'll definitely be fear-inducing.\n* But I can do this.",
                       '<32>* I WILL do this.\n* I WILL make a difference.',
                       "<32>* I'll show them what it means to be a REAL hero!"
                    ],
            () =>
               world.population < 2
                  ? [
                       '<32>{#p/human}* (You ring the buzzer...)',
                       world.bullied
                          ? '<32>{#p/narrator}* ...but everybody ran.'
                          : '<32>{#p/narrator}* ...but nobody came.'
                    ]
                  : [
                       '<32>{#p/human}* (You ring the buzzer... seems the monologue is over.)',
                       "<32>* Huh??\n* Who's there?",
                       '<32>* Hmm... maybe I should focus on my next grand monologue.'
                    ]
         ),
         w_doorPurple: pager.create(
            'limit',
            () =>
               world.population < 4
                  ? [
                       '<32>{#p/human}* (You ring the buzzer...)',
                       world.bullied
                          ? '<32>{#p/narrator}* ...but everybody ran.'
                          : '<32>{#p/narrator}* ...but nobody came.'
                    ]
                  : [
                       '<32>{#p/human}* (You ring the buzzer... the sound of hurried panting echoes from within.)',
                       "<32>{#p/monster}* Can't stop... won't stop...",
                       '<32>* Stupid treadmill...',
                       '<32>* Oh- uh, is there someone there??',
                       "<32>* Sorry, but I can't... answer that right now... I'm stuck on a treadmill!",
                       "<32>* BUT!!\n* Uh, don't worry about me!",
                       "<32>* I'll figure it out!"
                    ],
            () =>
               world.population < 4
                  ? [
                       '<32>{#p/human}* (You ring the buzzer...)',
                       world.bullied
                          ? '<32>{#p/narrator}* ...but everybody ran.'
                          : '<32>{#p/narrator}* ...but nobody came.'
                    ]
                  : [
                       '<32>{#p/human}* (You ring the buzzer... the sound of hurried panting still echoes from within.)',
                       "<32>* Hey, I said I'll figure it out!"
                    ]
         ),
         w_froggit: [
            '<32>{#p/monster}* Ribbit, ribbit.\n* (Excuse me, human...)',
            '<32>* (I have some advice for you about battling monsters.)',
            '<32>* (If you ACT a certain way or FIGHT until you almost defeat them...)',
            '<32>* (They might not want to battle you anymore.)',
            '<32>* (If a monster does not want to fight you, please...)',
            '<32>* (Use some MERCY, human.)\n* Ribbit.'
         ],
         w_froggit_view: [
            "<32>{#p/narrator}* It's a view of outer space.",
            '<32>* Certainly no shortage of those around here, is there?'
         ],
         w_froggit1: [
            '<32>{#p/narrator}* "The vending machine is free for public use."',
            '<32>* "However, that doesn\'t mean you should loot it!"'
         ],
         w_kitchenwall: [ '<25>{#p/toriel}{#f/1}* Have patience, my child!' ],
         w_lobby1: [ '<32>{#p/narrator}* "Even when you stumble, the will to push onward shows through."' ],
         w_pacing_view: [
            '<32>{#p/narrator}* To think the only thing between you and the endless expanse is a sheet of glass...',
            "<32>* Despite all common sense, this doesn't seem to bother you."
         ],
         w_pacing1: [
            '<32>{#p/monster}* Ribbit, ribbit.\n* (Sigh...)',
            '<32>* (My friend never respects me.)',
            '<32>* (If given the option, they choose to be negative.)',
            "<32>* (That's right.......)\n* (Being negative............)\n* (................)",
            '<32>* (At least you respect me.)\n* Ribbit.'
         ],
         w_pacing2: [
            '<32>{#p/monster}* Ribbit, ribbit.\n* (Hello, human...)',
            '<32>* (Have you ever tried checking your ITEMs?)',
            "<32>* (If you've picked up anything, that's where you'll find it.)",
            '<32>* (What do I have in my ITEMs, you ask?)',
            "<32>* (Oh, you're silly... monsters don't have ITEMs!)\n* Ribbit."
         ],
         w_pacing3: [
            '<32>{#p/monster}* Ribbit, ribbit.\n* (Where did you come from, human?)',
            '<32>* (We saw no craft, and heard no crash...)',
            '<32>* (Intriguing... it is almost like you appeared out of thin air.)',
            '<32>* (What could this mean?)',
            '<32>* (The answer must be somewhere...)\n* Ribbit.'
         ],
         w_puzzle1_view: [
            '<32>{#p/narrator}* Why does it feel like some of these rooms were just made to be lookout areas?'
         ],
         w_puzzle2: [
            '<32>{#p/narrator}* "Space is like a deep blue sea, navigating its waters requires patience."',
            '<32>* "And a little foreknowledge."'
         ],
         w_puzzle3_view: [ "<32>{#p/narrator}* As nice as this view is, it sadly won't help in solving any puzzles." ],
         w_puzzle4: [
            '<32>{#p/narrator}* "Attention: There\'s steak for sale in the lower level!"',
            '<32>* "If you\'re a BOSS like me, you\'ll pay my dealer a visit!"\nµ - Glyde'
         ],
         w_restricted1: [ '<32>{#p/narrator}* There is a door here.\n* It is locked.' ],
         w_ta_box: [
            '<32>{#p/narrator}* A box of model starships!\n* And... shattered glass?',
            '<32>* Looks like someone broke their little ships.',
            "<32>* ...these toys don't interest you at all."
         ],
         w_ta_cabinet: [ '<32>{#p/narrator}* A cabinet full of blue and yellow striped shirts.' ],
         w_ta_chest: () =>
            save.data.b.oops
               ? [ '<32>{#p/narrator}* A locked chest, jammed shut.', "<32>* You're definitely not getting this open." ]
               : [ '<32>{#p/narrator}* A locked chest, jammed shut.', "<32>* Perhaps one day it'll be opened...?" ],
         w_ta_frame: [ '<32>{#p/narrator}* An empty photo frame.', "<32>* There's not much else to say." ],
         w_ta_paper: [
            "<32>{#p/narrator}* A children's drawing, depicting a giant monster with rainbow wings.",
            "<32>* It's just like the one at home..."
         ],
         w_tf_bookshelf: pager.create(
            'sequence',
            ...CosmosUtils.populate(
               3,
               index => () =>
                  world.genocide
                     ? [
                          "<32>{#p/narrator}* It's a bookshelf.",
                          '<32>{#p/human}* (You pick out a book...)',
                          '<32>{#p/narrator}* "When a Boss Monster dies, their SOUL persists after death."',
                          '<33>* "However, legends speak of a peculiar phenomenon..."',
                          '<32>* "...where the very identity of the SOUL\'s owner disappears without a trace."',
                          '<32>{#p/human}* (You put the book back on the shelf.)'
                       ]
                     : [
                          [
                             "<32>{#p/narrator}* It's a bookshelf.",
                             '<32>{#p/human}* (You pick out a book...)',
                             '<32>{#p/narrator}* "When a Boss Monster is born, a magical link forms between the parents and the child."',
                             '<32>* "Through this, their SOUL is created, ageing the parents along with the child."',
                             '<32>* "The SOUL of a fully-grown boss monster is the strongest known to monsterkind..."',
                             '<32>* "Able to persist after death, if only for the briefest of periods."',
                             '<32>{#p/human}* (You put the book back on the shelf.)'
                          ],
                          [
                             "<32>{#p/narrator}* It's a bookshelf.",
                             '<32>{#p/human}* (You pick out a book...)',
                             '<32>{#p/narrator}* "Howdy, fellow gardeners."',
                             '<32>* "When it comes to starlings, the difference between growth and stagnation..."',
                             '<32>* "Is giving the plant access to open space."',
                             '<32>* "That is why starlings are commonly grown in Aerialis..."',
                             '<32>* "It is the most open area of the outpost."',
                             '<32>{#p/human}* (You put the book back on the shelf.)'
                          ],
                          [
                             "<32>{#p/narrator}* It's a bookshelf.",
                             '<32>{#p/human}* (You pick out a book...)',
                             '<32>{#p/narrator}* "Today we honor the memory of sir T. N. Roman."',
                             '<32>* "An example to all skeletons, he was dilligent, attentive, and above all, KIND."',
                             '<32>* "He may have acted a little LAZY at times, but then again..."',
                             '<32>* "His cousin is likely to blame for THAT."',
                             '<32>* "Fuhuhu... we\'re gonna miss you real bad, man."',
                             '<32>* "Everyone is."',
                             '<32>{#p/human}* (You put the book back on the shelf.)'
                          ]
                       ][index]
            )
         ),
         w_tf_couch: () =>
            save.data.b.genocide
               ? [
                    '<32>{#p/narrator}* A comfortable-looking couch.',
                    '<32>* The temptation to sink into its luscious cushions is hard to resist...',
                    "<32>* But you'd part with your rich coating of dust."
                 ]
               : save.data.b.oops
               ? [
                    '<32>{#p/narrator}* A comfortable-looking couch.',
                    '<32>* The temptation to sink into its luscious cushions is hard to resist...',
                    "<32>* But you've got other things to take care of."
                 ]
               : [
                    '<32>{#p/narrator}* A comfortable-looking couch.',
                    '<32>* The temptation to sink into its luscious cushions is hard to resist...',
                    "<32>* But you've got more important things to take care of."
                 ],
         w_tf_table: [ "<32>{#p/narrator}* An unremarkable end table.\n* There's really nothing special about it." ],
         w_tf_window: [ "<32>{#p/narrator}* It's a beautiful view of outer space." ],
         w_th_door: [ '<32>{#p/narrator}* "Room under renovations."' ],
         w_th_mirror: () =>
            save.data.b.genocide ? [ '<32>{#p/narrator}* Is it really you?' ] : [ "<32>{#p/narrator}* It's you!" ],
         w_th_plant: () =>
            save.data.b.genocide
               ? [ '<32>{#p/narrator}* This plant is not very happy see you.' ]
               : save.data.b.oops
               ? [ '<32>{#p/narrator}* This plant is happy to see you.' ]
               : [ '<32>{#p/narrator}* This plant is ecstatic about seeing you!' ],
         w_th_sausage: [ "<32>{#p/narrator}* It's an odd-looking plant." ],
         w_th_table1: [
            '<32>{#p/human}* (You look under the table and find a set of crayons.)',
            '<32>{#p/narrator}* Only the blue crayon is missing from the set.',
            '<32>{#p/narrator}* The ever-evasive blue crayon... truly a legend of our time.'
         ],
         w_th_table2: [
            '<32>{#p/human}* (You look under the table and find a deck of cards.)',
            '<32>{#p/narrator}* All the cards have been ripped to shreds...'
         ],
         w_tk_counter: () =>
            save.data.b.genocide
               ? [ "<32>{#p/narrator}* Toriel's cutting board.\n* A fantastic tool that every kitchen needs." ]
               : [ "<32>{#p/narrator}* Toriel's cutting board.\n* Nothing to write home about." ],
         w_tk_sink: [ '<32>{#p/narrator}* There are clumps of white fur stuck in the drain.' ],
         w_tk_stove: [ '<32>{#p/narrator}* The stovetop is very clean.\n* Toriel must use fire magic instead.' ],
         w_tk_trash: [ '<32>{#p/narrator}* There is a crumpled up recipe for Starling Tea.' ],
         w_tl_azzychair: () =>
            save.data.b.genocide
               ? [ "<32>{#p/narrator}* One of Toriel's dining chairs.\n* Fit for a prince." ]
               : save.data.b.oops
               ? [ "<32>{#p/narrator}* One of Toriel's dining chairs.\n* Fit for... a child.\n* Like you!" ]
               : [ "<32>{#p/narrator}* One of Toriel's dining chairs.\n* Fit for... a little angel.\n* Like you!" ],
         w_tl_bookshelf: pager.create(
            'sequence',
            ...CosmosUtils.populate(
               3,
               index => () =>
                  world.genocide
                     ? [
                          "<32>{#p/narrator}* It's a bookshelf.",
                          '<32>{#p/human}* (You pick out a book...)',
                          '<32>{#p/narrator}* "We often worry about what would happen if a human attacked us."',
                          '<33>* "But what if one of our own attacked instead...?"',
                          '<32>* "Would we as a kingdom be able to handle such a betrayal?"',
                          '<32>{#p/human}* (You put the book back on the shelf.)'
                       ]
                     : [
                          [
                             "<32>{#p/narrator}* It's a bookshelf.",
                             '<32>{#p/human}* (You pick out a book...)',
                             '<32>{#p/narrator}* "Our homeworld gone... our people dead... but why?"',
                             '<32>* "Surely, the humans must\'ve had a reason for their attacks."',
                             '<32>* "Nevertheless, we had been cornered, and there was nowhere else to go."',
                             '<32>* "Capitulation was our only shot at survival."',
                             '<32>{#p/human}* (You put the book back on the shelf.)'
                          ],
                          [
                             "<32>{#p/narrator}* It's a bookshelf.",
                             '<32>{#p/human}* (You pick out a book...)',
                             '<32>{#p/narrator}* "A symbol of our people, a symbol of our hope, a symbol of our future."',
                             '<32>* "That\'s what they call the DELTA RUNE."',
                             '<32>* "Some denounce its legend, but I, for one, uphold it."',
                             '<32>* "That symbol is what unites us, binds us together..."',
                             '<32>* "Without it, we\'d be a scattered bunch of unimportant outcasts."',
                             '<32>{#p/human}* (You put the book back on the shelf.)'
                          ],
                          [
                             "<32>{#p/narrator}* It's a bookshelf.",
                             '<32>{#p/human}* (You pick out a book...)',
                             '<32>{#p/narrator}* "In my opinion, the DELTA RUNE is an outdated relic."',
                             '<32>* "That so-called legend it represents is nothin\' but an old wives\' tale."',
                             '<32>* "Freedom this, angel that..."\n* "Give me a break."',
                             '<32>* "Besides, do kingdoms like ours really need emblems like that?"',
                             '<32>* "We\'re stronger together, with or without a banner."',
                             '<32>{#p/human}* (You put the book back on the shelf.)'
                          ]
                       ][index]
            )
         ),
         w_tl_goreychair: [ "<32>{#p/narrator}* One of Toriel's dining chairs.\n* Fit for a king." ],
         w_tl_table: [ "<32>{#p/narrator}* A decorative plant on Toriel's dining table." ],
         w_tl_tools: [
            '<32>{#p/narrator}* A rack of advanced musical instruments.',
            '<32>* Upon closer inspection, you realize these are in fact fire pokers.',
            "<32>* It's hard to tell, given that these tools were likely made...",
            '<32>* Before the outpost itself even existed.'
         ],
         w_tl_torichair: [ "<32>{#p/narrator}* One of Toriel's dining chairs.\n* Fit for a queen." ],
         w_toriel_toriel: () => [
            '<32>{#p/narrator}* The door is locked.',
            toriSV()
               ? save.data.n.plot < 17.001
                  ? '<32>{#p/narrator}* It sounds like Toriel is crying...'
                  : '<32>{#p/narrator}* It sounds like Toriel is asleep...'
               : '<32>{#p/narrator}* It sounds like Toriel is looking for something...'
         ],
         w_tt_bed: [ "<32>{#p/narrator}* It's Toriel's bed.", '<32>* Certainly too big for the likes of you.' ],
         w_tt_bookshelf: pager.create(
            'sequence',
            ...CosmosUtils.populate(
               3,
               index => () =>
                  world.genocide
                     ? [
                          "<32>{#p/narrator}* It's Toriel's private bookshelf.",
                          '<32>{#p/human}* (You pick out a book...)',
                          '<32>{#p/narrator}* "This talking starling seems to know quite a lot about my past."',
                          '<32>* "One thing struck me as odd, though...."',
                          '<32>* "Why would someone I\'ve never met before be so interested in $(name)?"',
                          '<32>{#p/human}* (You put the book back on the shelf.)'
                       ]
                     : [
                          [
                             "<32>{#p/narrator}* It's Toriel's private bookshelf.",
                             '<32>{#p/human}* (You pick out a book...)',
                             '<32>{#p/narrator}* "Dreemurr Family Recipes: Snail Pie"',
                             '<32>* "Snail Pie is a coveted tradition among members of the Dreemurr family line."',
                             '<32>* "Making it is a simple process, and can be broken down into five steps."',
                             '<32>* "First, prepare the bottom crust by laying it on top of a pie plate."',
                             '<32>* "Next, whisk evaporated milk, eggs, and spices together in a bowl until smooth."',
                             '<32>* "Then, take several live snails, and thoroughly incorporate into the mixture."',
                             '<32>* "After that, pour the contents of the bowl into the bottom crust."',
                             '<32>* "Last, prepare the top crust by cutting sheet into strips and forming a lattice."',
                             '<32>* "Then just bake the pie!"',
                             '<32>* "Once the pie is ready, take it out of the oven, let it cool, and serve!"',
                             '<32>{#p/human}* (You put the book back on the shelf.)'
                          ],
                          [
                             "<32>{#p/narrator}* It's Toriel's private bookshelf.",
                             '<32>{#p/human}* (You pick out a book...)',
                             '<32>{#p/narrator}* "Did you know that snails have a chainsaw-like tounge called a radula?"',
                             '<32>* "Not many folks know about that one."',
                             '<32>* "Another neat thing about \'em is how their digestive systems flip as they mature."',
                             '<32>* "Oh, and did I mention..."',
                             '<32>* "Snails Talk.{^5} Really.{^5} Slowly."',
                             '<32>* "Just kiddin\', snails don\'t talk."',
                             '<32>* "I mean, could you imagine a world with talking snails?"\n* "I know I couldn\'t."',
                             '<32>{#p/human}* (You put the book back on the shelf.)'
                          ],
                          [
                             "<32>{#p/narrator}* It's Toriel's private bookshelf.",
                             '<32>{#p/human}* (You pick out a book...)',
                             '<32>{#p/narrator}* "Regardless of your view on humanity, you can\'t argue with their resolve."',
                             '<32>* "Their will to keep fighting, even in the face of insurmountable odds..."',
                             '<32>* "Perhaps us monsters need learn a thing or two from those folk."',
                             '<32>* "It could be the key to our freedom one day."',
                             '<32>{#p/human}* (You put the book back on the shelf.)'
                          ]
                       ][index]
            )
         ),
         w_tt_cactus: [ '<32>{#p/narrator}* Ah, the cactus.\n* Truly the most tsundere of plants.' ],
         w_tt_chair: [ "<32>{#p/narrator}* Toriel's dedicated reading chair.", '<32>* Smells like lazybones.' ],
         w_tt_diary: pager.create(
            'limit',
            [
               '<32>{#p/human}* (You look to the circled paragraph.)',
               '<32>{#p/narrator}* "Question: Why did the skeleton want a friend?"',
               '<32>* "Answer: Because he was feeling BONELY..."',
               '<32>* The rest of the page is filled with jokes of a similar caliber.'
            ],
            [
               '<32>{#p/human}* (You look to another paragraph.)',
               '<32>{#p/narrator}* "Question: What\'s another name for a skeleton\'s vices?"',
               '<32>* "Answer: HOLLOW pursuits..."',
               "<32>* There's no sense in continuing to read these."
            ],
            [
               '<32>{#p/human}* (You look to another paragraph.)',
               '<32>{#p/narrator}* "Question: How does a skeleton say goodbye?"',
               '<32>* "Answer: See you to-MARROW..."',
               "<32>* That one wasn't even REMOTELY funny."
            ],
            [
               '<32>{#p/human}* (You look to another paragraph.)',
               "<32>{#p/narrator}* You can't get enough of these lame puns.",
               '<32>* "Question: Why did the skeleton drool in their sleep?"',
               '<32>* "Answer: Because they were having a FEMUR dream..."',
               '<32>* This is getting old...'
            ],
            [
               '<32>{#p/human}* (You look to another paragraph.)',
               "<32>{#p/narrator}* You still can't get enough of these lame puns.",
               '<32>* "Question: What does a skeleton say to start a fight?"',
               '<32>* "Answer: I\'ve got a BONE to pick with you..."',
               "<32>* Seriously?\n* That wasn't even a pun!"
            ],
            [
               '<32>{#p/human}* (You look to another paragraph.)',
               "<32>{#p/narrator}* We're losing brain cells here...",
               "<32>* \"'What's up stairs?' asked the skeleton.\"",
               '<32>* "...the stairs did not reply."',
               '<32>* ...',
               '<32>{#p/human}* (You hear a little giggle.)',
               "<32>{#p/narrator}* W-what?\n* I wasn't laughing!"
            ],
            [
               '<32>{#p/human}* (You look to the final paragraph.)',
               "<32>{#p/narrator}* Huh?\n* This one's not a joke...",
               '<32>{#p/toriel}{#f/21}* "A human has arrived in the OUTLANDS today."',
               '<32>* "I do not know what SANS intends to do if they leave here, but..."',
               '<32>* "I would rather not force him to make that decision."',
               '<32>* "Besides, can one royal sentry really protect them from the rest of the outpost?"',
               '<32>* "Hopefully those kinds of questions will soon be pointless."',
               '<32>{#p/narrator}* ...'
            ],
            [ '<32>{#p/human}* (There are no more written entries here.)' ]
         ),
         w_tt_plant: [ "<32>{#p/narrator}* It's a houseplant.", '<32>* What more is there to say?' ],
         w_tt_trash: pager.create(
            'limit',
            () =>
               world.genocide
                  ? [ '<32>* Snails.' ]
                  : [
                       "<32>{#p/narrator}* It's Toriel's private trash can, containing...",
                       '<32>* Snails.',
                       '<32>* Oodles and oodles of snails.'
                    ],
            () => (world.genocide ? [ '<32>* Snails.' ] : [ '<32>{#p/narrator}* Nothing but snails.' ]),
            () => (world.genocide ? [ '<32>* Snails.' ] : [ '<32>{#p/narrator}* Did I mention the snails?' ]),
            () => (world.genocide ? [ '<32>* Snails.' ] : [ '<32>{#p/narrator}* Snails.' ])
         ),
         w_tutorial_view: [ '<32>{#p/narrator}* The first of many windows in this part of the Outlands.' ],
         w_tutorial1: () => [
            '<32>{#p/narrator}* "A good relationship requires trust and kindness to move forward."',
            ...(world.azzie && save.flag.n.ga_asrielOutlands7++ < 1
               ? [
                    '<25>{#p/asriel2}{#f/6}* Trust?\n* Certainly.',
                    '<25>{#f/8}* As for kindness?\n* ...',
                    "<25>{#f/7}* I'm not so sure."
                 ]
               : [])
         ],
         w_wreckage: () => [
            '<32>{#p/narrator}* An old CITADEL-issued shuttlecraft, circa 251X.',
            ...(world.genocide
               ? world.azzie && save.flag.n.ga_asrielWreckage++ < 1
                  ? [
                       "<25>{#p/asriel2}{#f/3}* Look at that.\n* It's the shuttle you arrived on...",
                       "<25>{#p/asriel2}{#f/4}* Too bad it's a century out of date."
                    ]
                  : []
               : [ '<32>* Ten decades worth of use has clearly taken its toll.' ])
         ]
      },
      piecheck: () =>
         save.data.n.plot < 8
            ? [ '<32>{#p/narrator}* There is a faint, circular ring on this countertop.' ]
            : save.data.n.state_wastelands_mash > 0
            ? [ '<32>{#p/narrator}* There is simply nothing more to be done here.' ]
            : world.population < 7
            ? [
                 '<32>{#p/human}* (The size of the pie does not intimidate you at all.)',
                 '<32>{#p/human}* (In fact, it might even be intimidated by you...)',
                 choicer.create('* (Smash the pie?)', 8, 7, 'No', 'Yes')
              ]
            : [ '<32>{#p/human}* (The size of the pie intimidates you too much to eat it.)' ],
      piesmash1: [ '<32>{#p/human}* (You let the pie be.)' ],
      piesmash2: [ '<32>{#p/narrator}* (You take a swing...!)' ],
      piesmash3: [ "<32>{#p/narrator}* It's been utterly destroyed." ],
      tutorial_puzzle1: [ '<25>{#p/toriel}* Some measures can only be bypassed...' ],
      tutorial_puzzle2: [
         '<25>{#f/0}{#p/toriel}* ...with the help of another monster.',
         '<25>{#f/0}* Now, try stepping on that switch to my left.'
      ],
      tutorial_puzzle2a: [ '<25>{#p/toriel}* Try stepping on that switch to my left.' ],
      tutorial_puzzle3: [ '<25>{#p/toriel}* Simple, right?\n* Let us move forward.' ],
      tutorial_puzzle4: [ '<25>* Now, it is your turn.' ],
      tutorial_puzzle4a: [ '<25>{#p/toriel}* Your turn.' ],
      tutorial_puzzle5: [ '<25>{#p/toriel}* Well done!\n* Only one row left.' ],
      tutorial_puzzle6: [ '<25>{#p/toriel}* Yes, yes!\n* I am proud of you.' ],
      tutorial_puzzle7: [ '<25>{#p/toriel}* Please, follow me into the next room.' ],
      tutorial_puzzle8: [ '<25>{#p/toriel}{#f/1}* Go on...' ],
      twinkly1: [
         "<25>{#p/twinkly}{#f/5}* Howdy!\n* I'm {@fill:#ff0}TWINKLY{@fill:#fff}.\n* {@fill:#ff0}TWINKLY{@fill:#fff} the {@fill:#ff0}STAR{@fill:#fff}!"
      ],
      twinkly2: [
         "<25>{#f/5}* Can't say I've seen you before.",
         '<25>{#f/5}* What brings you to the outpost, huh?',
         '<25>{#f/8}* ...',
         "<25>{#f/8}* You're lost, aren't you...",
         "<25>{#f/10}* Well, good thing I'm here for you!",
         '<25>{#f/5}* Someone ought to teach you how we do things around here.',
         "<25>* Let's get started, shall we?"
      ],
      twinkly3: [
         "<25>{#f/7}* But you already KNEW that, didn'tcha?",
         "<25>{#f/5}* Still, it's up to me to show you the ropes.",
         "<25>* Let's get started, shall we?"
      ],
      twinkly4: [
         "<25>{#p/twinkly}{#f/6}* Alright, that's enough.",
         '<25>{#f/8}* If you wanna keep resetting, then by all means...',
         '<25>{#f/6}* Do as you wish.',
         "<25>{#f/7}* Just don't expect to get past me any easier."
      ],
      twinkly5: [ "<25>{#p/twinkly}{#f/6}* Don't you have anything better to do?" ],
      twinkly6: [
         "<25>{#p/twinkly}{#f/6}* Resetting right after you've taken your first hit, huh?",
         '<25>{#f/7}* How pathetic.'
      ],
      twinkly6a: [
         "<25>{#p/twinkly}{#f/11}* As if you think I'd forget about what you did...",
         '<25>{#f/7}* Filthy shard dodger.'
      ],
      twinkly7: [ '<25>{#p/twinkly}{#f/7}* I can play this game all day, idiot.' ],
      twinkly8: [ "<25>{#f/11}* Either way, since you already know what's coming next...{%15}" ],
      twinkly9: [
         '<25>{#p/twinkly}{#f/6}* Howdy.',
         "<25>* Seems I'll be burned if I stick around.",
         '<25>{#f/8}* A shame, really...',
         '<25>{#f/7}* I was gonna have SO much fun with you.',
         '<25>{#f/6}* ...',
         '<25>* Welp.',
         '<25>* Guess I better be on my way.',
         '<25>{#f/8}* (Besides, I can already hear her coming...)',
         "<25>{#f/5}* Be seeyin' ya!"
      ],
      twinkly9a: [
         '<25>{#p/twinkly}{#f/12}{#v/0}* What the HELL are you doing, $(name)?',
         '<25>{#f/12}{#v/0}* We had the kingdom at our mercy!'
      ],
      twinkly9a1: [ '<25>{#f/6}{#v/0}* All we had to do was follow the plan.' ],
      twinkly9a2: [
         '<25>{#f/6}{#v/0}* All we had to do was get through the Foundry...',
         '<25>* Finish off the guards...',
         '<25>* And make it to the Citadel!'
      ],
      twinkly9a3: [
         '<25>{#f/6}{#v/0}* All we had to do was finish off the guards...',
         '<25>* And get through the Citadel!'
      ],
      twinkly9a4: [
         '<25>{#f/6}{#v/0}* All we had to do was KILL that stupid robot...',
         '<25>* And get through the Citadel!'
      ],
      twinkly9a5: [ '<25>{#f/6}{#v/0}* All we had to do was get through the Citadel!' ],
      twinkly9a6: [
         /**/
      ],
      twinkly9a7: [
         /**/
      ],
      twinkly9a8: [ '<25>{#f/8}{#v/0}* Coward...' ],
      twinkly10: [
         "<20>{#f/5}See that heart? That's your SOUL, the very culmination of your being!",
         '<20>{#f/10}Your SOUL is an important part of you. It needs LOVE to sustain itself.'
      ],
      twinkly11: [
         "<20>{*}{#f/5}Out here, LOVE is shared through... {#f/8}little white... {#f/11}'happiness shards.'",
         "<20>{*}{#f/5}To get you started on the right path, I'll share some of my own LOVE.",
         '<20>{*}{#f/10}Be ready, they tend to move fast.',
         '<20>{*}{#f/5}Just try to get as many as you can!{^20}{#x1}{%}'
      ],
      twinkly12: [
         '<20>{*}{#f/8}It looks like you... missed them?',
         "<20>{*}{#f/11}But uh, that's ok!",
         "<20>{*}{#f/5}{#x2}Here, I'll send you some more!{^20}{#x1}{%}"
      ],
      twinkly13: [
         '<20>{*}{#f/12}What the-... a-are you braindead or something??',
         '<20>{*}Run. Into. The. {#x2}Bullets!!{^20}{#x1}{^999}'
      ],
      twinkly14: 'Run. Into. The. happiness shards~',
      twinkly15: [
         '<20>{#v/1}Hee hee hee...',
         "<20>In this world, it's KILL or BE killed.",
         "<20>You've given me a golden opportunity I can't refuse."
      ],
      twinkly16: [
         "<20>{#v/1}Nah, you know what's going on here, don'tcha?",
         "<20>You just wanted to torment little old TWINKLY, didn'tcha?",
         '<20>Hee hee hee...'
      ],
      twinkly17: [ "<20>{#v/1}We'll just have to cut straight to the point, won't we?", '<20>Hee hee hee...' ],
      twinkly18: [ '<20>{*}{@random:1.1,1.1}Die.{^20}{%}' ],
      twinkly19: [ '<20>{#p/toriel}What a terrible creature, torturing such a poor, innocent youth...' ],
      twinkly20: [
         '<20>Ah, do not fear, little one. I am TORIEL, overseer of the OUTLANDS.',
         '<20>I come by every day to check for those who may have gotten stranded.',
         '<20>Follow me, child. I will guide you through the outskirts.'
      ],
      twinkly21: [
         '<25>{#p/toriel}{#f/1}* Oh my! Are you alright out here, little one?',
         '<25>{#f/0}* Please, do not fear.\n* I am TORIEL, overseer of the OUTLANDS.',
         '<25>* I come by every day to check for those who may have gotten stranded.',
         '<25>* Follow me, child.\n* I will guide you through the outskirts.'
      ],
      twinkly22: [ '<25>{#f/1}* This way.' ],
      w_coffin1: pager.create(
         'limit',
         () => [
            '<32>{#p/narrator}* This coffin is very old.\n* There is nothing remarkable about it.',
            ...(world.azzie && save.flag.n.ga_asrielCoffin++ < 1
               ? [
                    '<25>{#p/asriel2}{#f/3}* Oh, look at that.\n* They made a cute little coffin for you.',
                    '<25>{#p/asriel2}{#f/4}* How touching.'
                 ]
               : [])
         ],
         [ "<32>{#p/narrator}* It's a coffin." ]
      ),
      w_coffin2: pager.create(
         'limit',
         [
            '<32>{#p/narrator}* This coffin dates back to 251X.',
            '<32>* There is an old record-keeping manifest stashed next to it.',
            choicer.create('* (Access the manifest?)', 8, 7, 'Yes', 'No')
         ],
         [
            '<32>{#p/human}* (You once again pick up the manifest.)',
            choicer.create('* (Access the manifest?)', 8, 7, 'Yes', 'No')
         ]
      ),
      w_coffin3: [ choicer.create('* (Read the next page?)', 8, 7, 'Yes', 'No') ],
      w_coffin4: [ '<32>{#p/narrator}* ...but there were no further pages.' ],
      w_coffin5: [ '<32>{#p/human}* (You put the manifest back where it belongs.)' ],
      w_dummy1: [ '<32>{#p/narrator}* A training dummy, circa 251X.\n* CITADEL standard-issue.' ],
      wonder1: [
         '<32>{#p/narrator}* Can you hear it?\n* The song of the stars?',
         "<32>* At certain places on the outpost, like this one... it's there.",
         '<32>* You just have to be listening for it.'
      ],
      wonder2: [
         '<32>{#p/narrator}* Some say this tune has been ringing out for millenia.',
         '<32>* Refusing to let go.\n* Unable to move on.',
         '<32>* ...',
         '<32>* Heh.\n* Kind of reminds me of myself...'
      ],
      wonder3: [
         "<32>{#p/narrator}* Not that I can't move on from things.\n* It's just...",
         '<32>{#p/human}* (You hear a sigh.)',
         '<32>{#p/narrator}* Look, my life is complicated.',
         "<32>* ...I doubt you'd understand."
      ],
      wonder4: [
         "<32>{#p/narrator}* I guess I'm just tired.",
         '<32>* Tired of waiting for something good to happen.',
         "<32>* It's been so long since I had someone who really...",
         '<32>* ...',
         "<32>* But maybe now's not the right time for that."
      ],
      wonder5: [
         "<32>{#p/narrator}* It's funny, though.",
         "<32>* I don't think I've seen a human quite like you before.",
         '<32>* That choice to show kindness at every turn...',
         '<32>* ...no matter the cost.',
         "<32>* Part of me wants to believe you're different than the others.",
         "<32>* Then again, that's what part of me always wants to believe."
      ],
      wonder6: [
         '<32>{#p/narrator}* I should probably get back to narrating now.',
         "<32>* It's not like I have anything better to do."
      ]
   },

   b_group_froggitWhimsun: [ '<32>{#p/story}* Space frogs and Starflies!\n* Or something of the like.' ],
   b_group_froggitWhimsun2a: [ '<32>{#p/story}* Space frogs...?' ],
   b_group_froggitWhimsun2b: [ '<32>{#p/story}* Starflies...?' ],
   b_group_looxMigospMushy: [ "<32>{#p/story}* It's the troublesome trio!" ],
   b_group_looxMigospMushy2: [ '<32>{#p/story}* The trio has become a duo.' ],
   b_group_looxMigospMushy3: [ '<32>{#p/story}* Only one remains.' ],
   b_group_moldsmalMigosp: [ '<32>{#p/story}* Silente and company present themselves!' ],

   b_opponent_froggit: {
      act_check: [ '<32>{#p/story}* FROGGIT - ATK 4 DEF 5\n* Life is difficult for this monster.' ],
      act_compliment: [ "<32>{#p/narrator}* Froggit didn't understand what you said..." ],
      act_flirt: [ "<32>{#p/narrator}* Froggit didn't understand what you said..." ],
      act_translate0: [ "<32>{#p/narrator}* You tried to translate, but you haven't said anything yet..." ],
      act_translate1: [
         '<32>{#p/narrator}* After your translation, Froggit understands you.',
         '<32>* Froggit is flattered.'
      ],
      act_translate2: [
         '<32>{#p/narrator}* After your translation, Froggit understands you.',
         '<32>* Froggit is blushing.',
         '<32>* Not physically though, just internally.',
         "<32>* Don't ask me how I know that."
      ],
      confuseText: [ '<08>{~}Ribbit, ribbit?' ],
      flirtText: [ '<08>{~}(Blushes deeply.)\nRibbit..' ],
      idleText1: [ '<08>{~}Ribbit, ribbit.' ],
      idleText2: [ '<08>{~}Croak, croak.' ],
      idleText3: [ '<08>{~}Hop, hop.' ],
      idleText4: [ '<08>{~}Meow.' ],
      mercyStatus: [ '<32>{#p/story}* Froggit seems reluctant to fight you.' ],
      name: '* Froggit',
      niceText: [ '<08>{~}(Blushes softly.)\nRibbit..' ],
      perilStatus: [ '<32>{#p/story}* Froggit is trying to run away.' ],
      status1: [ '<32>{#p/story}* Froggit hops near!' ],
      status2: [ '<32>{#p/story}* The battlefield is filled with the smell of crystherium utilia.' ],
      status3: [ "<32>{#p/story}* Froggit doesn't seem to know why it's here." ],
      status4: [ '<32>{#p/story}* Froggit hops to and fro.' ]
   },
   b_opponent_whimsun: {
      act_check: [ '<32>{#p/story}* FLUTTERLYTE - ATK 5 DEF 0\n* This monster is still just learning how to fly...' ],
      act_console: [
         '<32>{#p/narrator}* You helped Flutterlyte fly higher into the air.',
         '<32>* Flutterlyte thanked you, and flew away...'
      ],
      act_flirt: [
         '<32>{#p/narrator}* You flirted with Flutterlyte.',
         '<32>* Unable to handle the compliment, Flutterlyte burst into tears and hovered away...'
      ],
      act_terrorize: [
         '<32>{#p/narrator}* You tricked Flutterlyte into flying into the ground.',
         "<32>{#p/narrator}* Luckily, they're not skilled enough to actually do it..."
      ],
      idleTalk1: [ '<08>{~}Why is this so hard..' ],
      idleTalk2: [ '<08>{~}I need help..' ],
      idleTalk3: [ "<08>{~}I can't keep myself up.." ],
      idleTalk4: [ "<08>{~}I can't do this.." ],
      idleTalk5: [ '<08>{~}\x00*sniff sniff*' ],
      name: '* Flutterlyte',
      perilStatus: [ '<32>{#p/story}* Flutterlyte is hanging on by a thread.' ],
      status1: [ '<32>{#p/story}* Flutterlyte comes forth!' ],
      status2: [ '<32>{#p/story}* Flutterlyte continues to mutter apologies.' ],
      status3: [ '<32>{#p/story}* Flutterlyte is hovering.' ],
      status4: [ "<32>{#p/story}* It's starting to smell like peaches." ],
      status5: [ '<32>{#p/story}* Flutterlyte is hyperventilating.' ],
      status6: [ '<32>{#p/story}* Flutterlyte avoids eye contact.' ]
   },
   b_opponent_loox: {
      act_check: [ '<32>{#p/story}* OCULOUX - ATK 6 DEF 6\n* Staring contest master.\n* Family name: Eyewalker' ],
      act_dontpick: [
         '<32>{#p/narrator}* You stared at Oculoux.\n* Oculoux stares back harder.',
         '<32>{#p/narrator}* A moment passes... then...',
         '<32>{#p/narrator}* Oculoux bows!'
      ],
      act_flirt: [ '<32>{#p/narrator}* You flirted with Oculoux.' ],
      act_pick: [ '<32>{#p/narrator}* You rudely lectured Oculoux about staring at people.' ],
      checkTalk1: [ '<08>{~}Do you dare to stare?' ],
      dontDeny1: [ '<08>{~}Well, you changed your mind.' ],
      dontTalk1: [ '<99>{~}The gaze\nis\nstrong\nwith\nthis one.', '<08>{~}You are worthy.' ],
      flirtDeny1: [ '<08>{~}How tsundere of you.' ],
      flirtTalk1: [ '<08>{~}What? N-no way!' ],
      hurtStatus: [ '<32>{#p/story}* Oculoux is watering.' ],
      idleTalk1: [ "<08>{~}I've got my eye on you." ],
      idleTalk2: [ "<08>{~}Don't tell me what to do." ],
      idleTalk3: [ '<08>{~}Staring is caring.' ],
      idleTalk4: [ '<08>{~}What an eyesore.' ],
      idleTalk5: [ '<08>{~}How about a staring contest?' ],
      name: '* Oculoux',
      pickTalk1: [ '<08>{~}How dare you!', '<08>{~}Staring is our way of life!' ],
      spareStatus: [ "<32>{#p/story}* Oculoux doesn't care about fighting anymore." ],
      status1: [ '<32>{#p/story}* A pair of Oculoux walked in!' ],
      status2: [ '<32>{#p/story}* Oculoux is staring right through you.' ],
      status3: [ '<32>{#p/story}* Oculoux gnashes its teeth.' ],
      status4: [ '<32>{#p/story}* Smells like eyedrops.' ],
      status5: [ '<32>{#p/story}* Oculoux has gone bloodshot.' ],
      status6: [ '<32>{#p/story}* Oculoux is gazing at you.' ],
      status7: [ '<32>{#p/story}* Oculoux is now alone.' ]
   },
   b_opponent_migosp: {
      act_check: [ "<32>{#p/story}* SILENTE - ATK 7 DEF 5\n* It seems evil, but it's just with the wrong crowd..." ],
      act_flirt: [ '<32>{#p/narrator}* You flirted with Silente.' ],
      act_talk: [ '<32>{#p/narrator}* You introduced yourself to Silente.' ],
      flirtTalk: [ '<08>{~}How sweet of you~' ],
      groupInsult: [ '<32>{#p/narrator}* You tried insulting Silente, but they were too focused on the others.' ],
      groupStatus1: [ '<32>{#p/story}* Silente is whispering to the others.' ],
      groupStatus2: [ "<32>{#p/story}* It's starting to smell like a roach motel." ],
      groupTalk1: [ '<08>{#p/monster}FILTHY SINGLE MINDER\n..' ],
      groupTalk2: [ '<08>{#p/monster}OBEY THE OVERMIND\n..' ],
      groupTalk3: [ '<08>{#p/monster}LEGION! WE ARE LEGION!' ],
      groupTalk4: [ '<08>{#p/monster}HEED THE SWARM\n..' ],
      groupTalk5: [ '<08>{#p/monster}IN UNISON, NOW\n..' ],
      groupTalk6: [ "<08>{#p/monster}I DON'T CARE." ],
      name: '* Silente',
      perilStatus: [ '<32>{#p/story}* Silente refuses to give up.' ],
      soloInsult: [ '<32>{#p/narrator}* You tried insulting Silente, but they were too happy to care.' ],
      soloStatus: [ "<32>{#p/story}* Silente doesn't have a care in the world." ],
      soloTalk1: [ "<08>{~}Bein' me is the best!" ],
      soloTalk2: [ '<08>{~}La la~ Just be your- self~' ],
      soloTalk3: [ "<08>{~}Nothin' like alone time!" ],
      soloTalk4: [ '<08>{~}Mmm, cha cha cha!' ],
      soloTalk5: [ '<08>{~}Swing your arms, baby~' ],
      talkTalk: [ '<08>{~}Hiya~' ]
   },
   b_opponent_mushy: {
      act_challenge: [ '<32>{#p/narrator}* You challenged Mushy to a duel.' ],
      act_check: [ '<32>{#p/story}* MUSHY - ATK 6 DEF 6\n* Huge fan of westerns.\n* Gunslinger.' ],
      act_flirt: [ '<32>{#p/narrator}* You flirted with Mushy.' ],
      act_taunt: [ '<32>{#p/narrator}* You taunted Mushy.' ],
      challengeStatus: [ '<32>{#p/story}* Mushy awaits your next challenge.' ],
      challengeTalk1: [ "<08>{~}Let's see what you got." ],
      challengeTalk2: [ '<08>{~}Think you can take me?' ],
      flirtStatus1: [ '<32>{#p/story}* Mushy, the confused and the aroused.' ],
      flirtTalk1: [ '<08>{~}H-hey, knock it off!' ],
      hurtStatus: [ '<32>{#p/story}* Mushy makes a last stand.' ],
      idleTalk1: [ '<08>{~}Bang!\nBang!\nBang!' ],
      idleTalk2: [ '<08>{~}Saddle up!' ],
      idleTalk3: [ "<08>{~}All in a day's." ],
      name: '* Mushy',
      spareStatus: [ '<32>{#p/story}* Mushy bows out of respect.' ],
      status1: [ '<32>{#p/story}* Mushy stormed in!' ],
      status2: [ '<32>{#p/story}* Mushy adjusts their stance.' ],
      status3: [ '<32>{#p/story}* Mushy is preparing for a grand standoff.' ],
      status4: [ '<32>{#p/story}* Mushy reaches for their holster.' ],
      status5: [ '<32>{#p/story}* Smells like petricore.' ],
      tauntStatus1: [ "<32>{#p/story}* Mushy pretends they aren't bothered by your taunts." ],
      tauntTalk1: [ "<08>{~}As if that'll work on me." ]
   },
   b_opponent_napstablook: {
      act_check: [
         "<32>{#p/story}* NAPSTABLOOK - ATK 10 DEF 255\n* This monster doesn't seem to have a sense of humor..."
      ],
      awkwardTalk: [ '<11>{#p/napstablook}{@swirl:0.4,1.4,15}uh... OK?' ],
      checkTalk: [ "<11>{#p/napstablook}{@swirl:0.4,1.4,15}oh, i'm REAL funny." ],
      cheer0: [ '<32>{#p/narrator}* You tried to console Napstablook...' ],
      cheer1: [ '<32>{#p/narrator}* You gave Napstablook a patient smile.' ],
      cheer2: [ '<32>{#p/narrator}* You told Napstablook a little joke.' ],
      cheer3: [ '<32>{#p/narrator}* You congratulated Napstablook on their top hat.' ],
      cheerTalk1: [ '<11>{#p/napstablook}{@swirl:0.4,1.4,15}...?' ],
      cheerTalk2: [ '<11>{#p/napstablook}{@swirl:0.4,1.4,15}heh heh...' ],
      cheerTalk3: [
         '<11>{*}{#p/napstablook}{@swirl:0.4,1.4,15}let me {#x1}try...{^20}{#x2}{^20}{%}',
         "<11>{*}{#p/napstablook}{@swirl:0.4,1.4,15}i call it {#x3}'dapper blook'{^40}{%}",
         '<11>{*}{#p/napstablook}{@swirl:0.4,1.4,15}do you like it?{^40}{%}'
      ],
      cheerTalk4: [ '<11>{#p/napstablook}{@swirl:0.4,1.4,15}oh gee.....' ],
      consoleTalk1: [ '<11>{#p/napstablook}{@swirl:0.4,1.4,15}yeah, yeah...' ],
      consoleTalk2: [ '<11>{#p/napstablook}{@swirl:0.4,1.4,15}not buying it...' ],
      consoleTalk3: [ "<11>{#p/napstablook}{@swirl:0.4,1.4,15}you're not sorry..." ],
      critic1: [ "<32>{#p/narrator}* You offered constructive criticism on Napstablook's top hat." ],
      criticTalk: [ "<11>{#p/napstablook}{@swirl:0.4,1.4,15}uh...\ni'll keep that in mind..." ],
      deadTalk: [
         "<11>{#p/napstablook}{@swirl:0.4,1.4,15}umm... you do know you can't kill ghosts, right?",
         "<11>{@swirl:0.4,1.4,15}we're sorta incorporeal and all",
         "<11>{@swirl:0.4,1.4,15}i was just lowering my hp because i didn't want to be rude",
         '<11>{@swirl:0.4,1.4,15}sorry... i just made this more awkward...',
         '<11>{@swirl:0.4,1.4,15}pretend you beat me...',
         '<11>{@swirl:0.4,1.4,15}ooooooooo'
      ],
      flirt0: [ "<32>{#p/narrator}* You couldn't think of anything to say." ],
      flirt1: [ '<32>{#p/narrator}* You flirted with Napstablook.' ],
      flirt2: [ '<32>{#p/narrator}* You tried your best pickup line on Napstablook.' ],
      flirt3: [ '<32>{#p/narrator}* You gave Napstablook a heartfelt compliment.' ],
      flirt4: [ '<32>{#p/narrator}* You reassure Napstablook of your feelings towards them.' ],
      flirtTalk1: [ "<11>{#p/napstablook}{@swirl:0.4,1.4,15}i'd just weigh you down" ],
      flirtTalk2: [ "<11>{#p/napstablook}{@swirl:0.4,1.4,15}oh.....\ni've heard that one....." ],
      flirtTalk3: [ '<11>{#p/napstablook}{@swirl:0.4,1.4,15}uh... you really think so?' ],
      flirtTalk4: [ "<11>{#p/napstablook}{@swirl:0.4,1.4,15}oh, you're serious...", '<11>{@swirl:0.4,1.4,15}oh no.....' ],
      idleTalk1: [ "<11>{#p/napstablook}{@swirl:0.4,1.4,15}i'm fine, thanks" ],
      idleTalk2: [ "<11>{#p/napstablook}{@swirl:0.4,1.4,15}just pluggin' along..." ],
      idleTalk3: [ "<11>{#p/napstablook}{@swirl:0.4,1.4,15}just vibin'" ],
      insultTalk1: [ '<11>{#p/napstablook}{@swirl:0.4,1.4,15}i knew it...' ],
      insultTalk2: [ '<11>{#p/napstablook}{@swirl:0.4,1.4,15}whatever...' ],
      insultTalk3: [ '<11>{#p/napstablook}{@swirl:0.4,1.4,15}say what you will...' ],
      insultTalk4: [ '<11>{#p/napstablook}{@swirl:0.4,1.4,15}oh, do let it all out...' ],
      name: '* Napstablook',
      silentTalk: [ '<11>{#p/napstablook}{@swirl:0.4,1.4,15}...' ],
      sincere: [ "<32>{#p/narrator}* You flirtatiously commented on Napstablook's hat." ],
      sincereTalk: [ '<11>{#p/napstablook}{@swirl:0.4,1.4,15}heh... thanks' ],
      status1: [ '<32>{#p/story}* Here comes Napstablook.' ],
      status2: [ '<32>{#p/story}* Napstablook looks just a little better.' ],
      status3: [ '<32>{#p/story}* Napstablook wants to show you something.' ],
      status3a: [ '<32>{#p/story}* Napstablook eargerly awaits your feedback.' ],
      status4: [ "<32>{#p/story}* Napstablook's eyes are glistening." ],
      status5: [ '<32>{#p/story}* Napstablook is clearly not sure how to handle this.' ],
      status5a: [ '<32>{#p/story}* Napstablook is questioning everything.' ],
      status6: [ '<32>{#p/story}* Napstablook is biding their time.' ],
      status7: [ '<32>{#p/story}* Napstablook is waiting for your next move.' ],
      status8: [ '<32>{#p/story}* Napstablook is staring off into the distance.' ],
      status9: [ "<32>{#p/story}* Napstablook is wishing they weren't here." ],
      status10: [ '<32>{#p/story}* Napstablook is trying their best to ignore you.' ],
      suck: [ '<32>{#p/narrator}* You told Napstablook their hat sucked bad.' ],
      talk0: [ '<32>{#p/narrator}* You had no idea what to say.' ],
      talk1: [ '<32>{#p/narrator}* You complained to Napstablook about the weather.' ],
      talk2: [ '<32>{#p/narrator}* You and Napstablook talked politics.' ],
      talk3: [ '<32>{#p/narrator}* You asked Napstablook where ghosts come from.' ],
      talk4: [ '<32>{#p/narrator}* You told Napstablook about Toriel.' ],
      talk5: [ "<32>{#p/narrator}* You asked Napstablook why they're here." ],
      talk6: [ '<32>{#p/narrator}* You continued talking with Napstablook.' ],
      talk7: [ '<32>{#p/narrator}* You asked Napstablook about Twinkly.' ],
      talkTalk1: [
         '<11>{#p/napstablook}{@swirl:0.4,1.4,15}what weather?',
         "<11>{#p/napstablook}{@swirl:0.4,1.4,15}we're in space..."
      ],
      talkTalk2: [ '<11>{#p/napstablook}{@swirl:0.4,1.4,15}not my favorite subject' ],
      talkTalk3: [
         "<11>{#p/napstablook}{@swirl:0.4,1.4,15}trust me, it's a long story...",
         "<11>{#p/napstablook}{@swirl:0.4,1.4,15}you'd get bored if i told it to you..."
      ],
      talkTalk4: [
         "<11>{#p/napstablook}{@swirl:0.4,1.4,15}yeah, she's nice...",
         '<11>{@swirl:0.4,1.4,15}have you tried her desserts?'
      ],
      talkTalk5: [
         "<11>{#p/napstablook}{@swirl:0.4,1.4,15}oh, i'm just visiting...",
         '<11>{#p/napstablook}{@swirl:0.4,1.4,15}i visit this place often'
      ],
      talkTalk6: [ '<11>{#p/napstablook}{@swirl:0.4,1.4,15}heh, yeah...' ],
      talkTalk7: [ "<11>{#p/napstablook}{@swirl:0.4,1.4,15}that's true..." ],
      talkTalk8: [ '<11>{#p/napstablook}{@swirl:0.4,1.4,15}that makes sense...' ],
      talkTalk9: [
         '<11>{#p/napstablook}{@swirl:0.4,1.4,15}i heard he had a diary...',
         '<11>{#p/napstablook}{@swirl:0.4,1.4,15}can talking starlings have diaries?'
      ],
      threat: [ '<32>{#p/narrator}* You insulted Napstablook.' ]
   },
   b_opponent_toriel: {
      spannerText: [ '<32>{#p/narrator}* Toriel picked up the spanner and returned it to you.' ],
      spannerTalk: [ '<11>{#p/toriel}{#f/3}That will accomplish nothing, young one.' ],
      spannerTalkRepeat: [ '<11>{#p/toriel}{#f/4}...' ],
      act_check: [ '<32>{#p/story}* TORIEL - ATK 80 DEF 80\n* Knows best for you.' ],
      criminal1: [
         '<20>{*}{#p/asriel2}{#f/3}Howdy, $(name).',
         "<20>{*}{#f/3}It's me, Asriel...",
         "<20>{*}{#f/3}Don't you recognize me?",
         '<20>{*}{#f/4}...',
         "<20>{*}{#f/2}Heh... don't pretend it's not you.",
         "<20>{*}{#f/1}I know you're empty inside, just like me.",
         "<20>{*}{#f/5}We're still inseperable after all these years...",
         '<20>{*}{#f/1}Listen.\nI have a plan to become all powerful.',
         '<20>{*}{#f/1}Even more powerful than us and our stolen SOULs.',
         "<20>{*}{#f/1}Let's destroy everything in this wretched world.",
         '<21>{*}{#f/2}Everyone and everything in these worthless memories...',
         "<20>{*}{#f/1}Let's turn 'em all to dust."
      ],
      criminal2: [
         '<20>{*}{#p/asriel2}{#f/3}Howdy, $(name).',
         "<20>{*}{#f/3}Looks like we're finally back on track.",
         '<20>{*}{#f/4}...',
         '<20>{*}{#f/4}Try not to screw it all up this time, will you?'
      ],
      criminal3: [
         '<20>{*}{#p/asriel2}{#f/3}Howdy, $(name).',
         '<20>{*}{#f/4}...',
         "<20>{*}{#f/4}Let's just get moving."
      ],
      cutscene1: [
         "<32>{#p/narrator}* Maybe because I'm the only one you'll listen to.",
         '<25>{#p/toriel}{#f/16}* ...!?',
         "<32>{#p/narrator}* But what do I know?\n* I'm just a sweet, innocent little child.",
         "<32>* Isn't that right, 'Mom?'",
         '<25>{#p/toriel}{#f/3}* ...'
      ],
      cutscene2: [
         '<25>{#f/4}* No...\n* This is impossible...',
         '<25>{#f/0}* I must be dreaming.\n* Or hallucinating.\n* Or perhaps...',
         '<32>{#p/narrator}* No, this is real.\n* This is now.',
         '<25>{#f/5}* You died, $(name).',
         '<25>{#f/9}* You cannot possibly be here now.',
         '<32>{#p/narrator}* ...tough.',
         '<25>{#p/toriel}{#f/18}* ...',
         '<32>{#p/narrator}* Yeah, yeah.\n* I get it, okay?',
         '<32>* "Oh no, $(name)\'s back, whatever will we do?"',
         "<32>* But I didn't just pop in to say hello.",
         '<32>* ...',
         '<32>* You know how I feel about humanity, right?',
         '<32>* But this kid...',
         '<32>* You have to believe me when I say that something about them is different.',
         "<32>* I know you've said it time and time again...",
         '<32>* "My child, the force field cannot be passed through..."',
         "<32>* But you and I both know that's not entirely true, is it?",
         '<32>* And, given the number of SOULs gathered thus far...',
         '<25>{#p/toriel}{#f/11}* OK already!',
         '<25>{#f/12}* Perhaps it really is you, $(name).',
         '<25>{#f/13}* Perhaps it is not.',
         '<25>{#f/9}* Regardless, you have made your point loud and clear.',
         '<32>{*}{#p/narrator}* So you understand why I- {%}',
         '<25>{#p/toriel}{#f/13}* No, listen...\n* You are right about what you said.',
         '<25>{#f/13}* Or at least, what you were trying to say...',
         '<25>{#f/9}* I only wish they could have stayed here a little longer.',
         '<32>{#p/narrator}* ...',
         "<32>{#p/narrator}* ...you want your family back, don't you?",
         "<32>* No, I get it.\n* It's not like I haven't thought about the same thing.",
         '<25>{#p/toriel}{#f/18}* ...',
         '<25>{#p/toriel}{#f/19}* Oh, $(name)...',
         '<25>{#f/20}* You always were the observant one, were you not?',
         '<32>{#p/narrator}* Yeah, I guess I was a bit of a snoop back in those days.',
         '<25>{#p/toriel}{#f/14}* $(name)...',
         '<25>{#f/10}* You do not know the things I would do to have you back.',
         '<25>{#f/9}* ...but you know why that can never happen.',
         '<32>{#p/narrator}* ...\n* Yeah, I guess.',
         '<25>{#p/toriel}{#f/18}* ...so what happens now?',
         '<32>{#p/narrator}* Well, I can only talk to you like this for a short time.',
         '<32>* I think it has something to do with the battle...',
         '<32>* I guess now would be a good time to make your goodbyes.',
         '<25>{#p/toriel}{#f/18}* No...\n* That will not be necessary.',
         '<25>{#f/13}* After everything that has happened between us...',
         '<25>{#f/9}* I do not believe I deserve such niceties.',
         '<32>{#p/narrator}* ...\n* Have it your way.',
         "<32>* But when they leave, don't just cut contact with them, yeah?",
         "<32>* They've got a phone, you know.",
         '<25>{#p/toriel}{#f/13}* ...',
         '<32>{#p/narrator}* Goodbye, Toriel.'
      ],
      death1: [
         '<11>{*}{#p/toriel}{#f/21}{#v/1}{#i/80}{#x1}{@random:1.1,1.1}Urgh...',
         '<11>{*}{#v/1}{#i/80}{#x1}{@random:1.1,1.1}To strike me down at my weakest moment...',
         '<11>{*}{#v/1}{#i/90}{#x1}{@random:1.1,1.1}...',
         '<11>{*}{#v/2}{#i/110}{#x2}{@random:1.1,1.1}Ha...\nHa...',
         '<11>{*}{#v/2}{#i/110}{#x2}{@random:1.1,1.1}It seems, young one...',
         '<11>{*}{#v/3}{#i/120}{#x2}{@random:1.2,1.2}I was a fool for trusting you... all along...'
      ],
      death2: [
         '<11>{*}{#p/toriel}{#f/21}{#v/1}{#i/80}{#x1}{@random:1.1,1.1}Urgh...',
         '<11>{*}{#v/1}{#i/80}{#x3}{@random:1.1,1.1}To think I was protecting you from them...',
         '<11>{*}{#v/1}{#i/90}{#x4}{@random:1.1,1.1}...',
         '<11>{*}{#v/2}{#i/110}{#x2}{@random:1.1,1.1}Ha...\nHa...',
         '<11>{*}{#v/2}{#i/110}{#x1}{@random:1.1,1.1}It seems, young one...',
         '<11>{*}{#v/3}{#i/140}{#x2}{@random:1.2,1.2}I was actually protecting them... from you...'
      ],
      death3: [
         '<11>{*}{#p/toriel}{#f/21}{#v/1}{#i/80}{#x1}{@random:1.1,1.1}Urgh...',
         '<11>{*}{#v/1}{#i/80}{#x1}{@random:1.1,1.1}You are stronger than I thought...',
         '<11>{*}{#v/1}{#i/80}{#x3}{@random:1.1,1.1}Listen to me, young one...',
         '<11>{*}{#v/1}{#i/80}{#x3}{@random:1.1,1.1}In a few moments, I will turn to dust...',
         '<11>{*}{#v/1}{#i/90}{#x3}{@random:1.1,1.1}When that happens, you must take my SOUL...',
         '<11>{*}{#v/1}{#i/90}{#x1}{@random:1.1,1.1}It is the only real way you can escape this place.',
         "<11>{*}{#v/2}{#i/110}{#x3}{@random:1.1,1.1}You cannot... allow ASGORE's plan to... succeed...",
         '<11>{*}{#v/2}{#i/110}{#x1}{@random:1.1,1.1}...',
         '<11>{*}{#v/3}{#i/140}{#x2}{@random:1.2,1.2}My child...',
         "<11>{*}{#v/3}{#i/140}{#x4}{@random:1.2,1.2}Be good... won't you?"
      ],
      magic1: [ "<20>{*}{#p/asriel2}{#f/3}You won't be needing this anymore." ],
      magic2: [ '<20>{*}{#p/asriel2}Useless.' ],
      name: '* Toriel',
      spareTalk1: [ '<11>{#p/toriel}{#f/11}...' ],
      spareTalk2: [ '<11>{#p/toriel}{#f/11}...\n...' ],
      spareTalk3: [ '<11>{#p/toriel}{#f/11}...\n...\n...' ],
      spareTalk4: [ '<11>{#p/toriel}{#f/17}...?' ],
      spareTalk5: [ '<11>{#p/toriel}{#f/17}What are you doing?' ],
      spareTalk6: [ '<11>{#p/toriel}{#f/17}...' ],
      spareTalk7: [ '<11>{#p/toriel}{#f/17}What are you trying to prove?' ],
      spareTalk8: [ '<11>{#p/toriel}{#f/17}...' ],
      spareTalk9: [ '<11>{#p/toriel}{#f/12}Fight me or leave!' ],
      spareTalk10: [ '<11>{#p/toriel}{#f/12}Stop looking at me that way!' ],
      spareTalk11: [ '<11>{#p/toriel}{#f/12}Go away!' ],
      spareTalk12: [ '<11>{#p/toriel}{#f/13}...' ],
      spareTalk13: [ '<11>{#p/toriel}{#f/13}...\n...' ],
      spareTalk14: [ '<11>{#p/toriel}{#f/13}...\n...\n...' ],
      spareTalk15: [
         '<11>{#p/toriel}{#f/13}I know you want to go home...',
         '<11>{#p/toriel}{#f/9}But you may die trying to get there.'
      ],
      spareTalk16: [ '<11>{#p/toriel}{#f/14}So please... go back the other way.' ],
      spareTalk17: [
         '<11>{#p/toriel}{#f/14}I know we do not have much, but...',
         '<11>{#p/toriel}{#f/14}But we can still have a good life.'
      ],
      spareTalk18: [
         '<11>{#p/toriel}{#f/14}You and I, like a family...',
         '<11>{#p/toriel}{#f/14}Does that not sound good?'
      ],
      spareTalk19: [ '<11>{#p/toriel}{#f/21}...' ],
      spareTalk20: [ '<11>{#p/toriel}{#f/18}Why are you making this so difficult?' ],
      spareTalk21: [ '<11>{#p/toriel}{#f/21}...' ],
      spareTalk22: [ '<11>{#p/toriel}{#f/18}Please, just...', '<11>{#p/toriel}{#f/9}Go back the other way.' ],
      spareTalk23: [ '<11>{#p/toriel}{#f/21}...' ],
      spareTalk24: [ '<11>{#p/toriel}{#f/18}Oh, child...' ],
      spareTalk28a: [
         '<11>{#p/toriel}{#f/9}Maybe it was foolish of me...',
         '<11>{#f/13}Trying to stop you like this...',
         '<11>{#f/9}Maybe I should have just listened to you, $(name).',
         '<11>{#f/9}...',
         '<11>{#f/9}Forgive me, my child...',
         '<11>{#f/13}For everything that has transpired here.',
         '<11>{#f/9}...',
         '<11>{#f/13}Before I go...',
         '<11>{#f/13}I wanted to ask you...',
         '<11>{#f/17}That dust you always seem to be covered in...',
         '<11>{#f/17}Is that...\nUhm...',
         '<11>{#f/9}...',
         '<11>{#f/9}No, an innocent child like you would never...',
         '<11>{#f/9}...',
         '<11>{#f/13}I am sorry, little one.',
         '<11>{#f/13}I should not be asking such questions of you.'
      ],
      spareTalk28b: [
         '<11>{#p/toriel}{#f/9}Maybe it was foolish of me...',
         '<11>{#f/13}Trying to stop you like this...',
         '<11>{#f/9}Maybe I should have just listened to you, $(name).',
         '<11>{#f/9}...',
         '<11>{#f/9}Forgive me, my child...',
         '<11>{#f/13}For everything that has transpired here.'
      ],
      spareTalk28c: [ '<11>{#p/toriel}{#f/17}...?', '<11>{#f/17}Why are you calling out for "$(name)?"' ],
      status1: [ '<32>{#p/story}* Toriel now stands before you.' ],
      status2: [ '<32>{#p/story}* Toriel prepares a magical attack.' ],
      status3: [ '<32>{#p/story}* Toriel is acting aloof.' ],
      status4: [ '<32>{#p/story}* Toriel is looking through you.' ],
      status5: [ '<32>{#p/story}* ...' ],
      talk0: [ '<32>{#p/narrator}* ...' ],
      talk1: [ '<32>{#p/narrator}* You asked Toriel to let you through...', '<32>* No effect.' ],
      talk2: [ "<32>{#p/narrator}* You asked Toriel why she's really doing this.", '<32>* She winces briefly.' ],
      talk3: [
         '<32>{#p/narrator}* You begged Toriel to stop.',
         '<32>* She hesitates for a moment...',
         '<32>* But, perhaps there is too much at stake for her.'
      ],
      talk4: [ '<32>{#p/narrator}* You once again begged Toriel to stop.', '<32>* No reaction.' ],
      talk5: [ '<32>{#p/narrator}* You yelled at Toriel.', '<32>* She closes her eyes and takes a deep breath...' ],
      talk6: [
         '<32>{#p/narrator}* You once again yelled at Toriel.',
         '<32>* ...',
         "<32>* Perhaps talking won't do anymore good."
      ],
      assistStatus: [ '<32>{#p/narrator}* ...\n* There must be another way...' ],
      talk7: [ '<32>{#p/narrator}* You tried to think of something else to say, but...' ],
      talk8: [ '<32>{#p/narrator}* No sense in doing that now.' ],
      theft: [ '<20>{*}{#p/twinkly}Mine.{^15}{%}' ]
   },

   c_about1: [
      '<25>{#p/toriel}{#f/1}* You want to know more about me...?',
      '<25>{#f/0}* Well, I am afraid there is not much to say.',
      '<25>{#f/0}* I am but a silly old lady who worries too often!'
   ],
   c_about2: [
      '<25>{#p/toriel}{#f/1}* If you really want to know more about me...',
      '<25>{#f/1}* Why not take a look around the OUTLANDS...?',
      '<25>{#f/0}* I have built or at least helped to build much of what you see.',
      "<25>{#f/0}* I did say I was this place's overseer, did I not?"
   ],

   c_name_hello: 'Say Hello',
   c_name_about: 'About Yourself',
   c_name_mom: 'Call You "Mom"',
   c_name_flirt: 'Flirt',
   c_name_toriel: "Toriel's Phone",
   c_name_puzzle: 'Puzzle Help',

   c_flirt1: [
      '<25>{#p/toriel}{#f/7}* ...\n* ...huh?',
      '<25>{#f/1}* Oh, heh... heh...',
      '<25>{#f/6}* Hahaha!\n* I could pinch your cheek!',
      '<25>{#f/0}* You can certainly find better than an old woman like me.'
   ],
   c_flirt2: [
      '<25>{#p/toriel}{#f/5}* ...\n* Oh dear, are you serious...?',
      '<25>{#f/1}* My child, I do not know if this is pathetic or endearing.'
   ],
   c_flirt3: [
      '<25>{#p/toriel}{#f/5}* ...\n* Oh dear, are you serious...?',
      '<25>{#f/5}* And after you called me "Mother..."',
      '<25>{#f/1}* Well then.\n* You are a very "interesting" child.'
   ],
   c_hello: [
      [
         '<25>{#p/toriel}* This is TORIEL.',
         '<25>{#f/1}* You only wanted to say hello...?',
         "<25>{#f/0}* Well then.\n* 'Hello!'",
         '<25>{#f/0}* I hope that suffices.\n* Hee hee.'
      ],
      [
         '<25>{#p/toriel}* This is TORIEL.',
         '<25>{#f/1}* You wanted to say hello again?',
         "<25>{#f/0}* 'Salutations!'",
         '<25>{#f/1}* Is that enough?'
      ],
      [
         '<25>{#p/toriel}{#f/1}* Are you bored?',
         '<25>{#f/1}* I should have given you something to do...',
         '<25>{#f/0}* My apologies.',
         '<25>{#f/1}* Why not use your imagination to distract yourself?',
         '<25>{#f/0}* Pretend you are... a fighter pilot!',
         '<25>{#f/1}* Twisting and twirling, doing barrel rolls at light speed...',
         '<25>{#f/1}* Can you do that for me?'
      ],
      [
         '<25>{#p/toriel}{#f/5}* Hello, small one.',
         '<25>{#f/9}* I am sorry, but I do not have much to say.',
         '<25>{#f/1}* It was nice to hear your voice, though...'
      ]
   ],
   c_mom1: [
      '<25>{#p/toriel}* ...',
      '<25>{#f/7}* Huh?\n* Did you just call me "Mom?"',
      '<25>{#f/1}* Well...\n* I suppose...',
      '<25>{#f/1}* Would that make you happy?',
      '<25>{#f/1}* To call me...\n* "Mother?"',
      '<25>{#f/0}* Well then.\n* Call me whatever you like!'
   ],
   c_mom2: [
      '<25>{#p/toriel}{#f/7}* ...\n* Oh my... again?',
      '<25>{#f/0}* Hee hee...\n* You are a very sweet child.',
      '<25>{#f/0}* I am more than happy to be your mother, little one.'
   ],
   c_mom3: [
      '<25>{#p/toriel}{#f/7}* ...\n* Oh my... again?',
      '<25>{#f/1}* And after you flirted with me, too...',
      '<25>{#f/0}* My my.\n* You are a very "interesting" child.'
   ],
   c_puzzle1: [
      '<25>{#p/toriel}{#f/1}* Help with a puzzle...?',
      '<25>{#f/1}* You have not left the room yet, have you?',
      '<25>{#f/0}* Wait for me to return, and we can solve it together.'
   ],

   i_candy: {
      battle: {
         description: 'Has a distinct, non-licorice flavor.',
         name: 'Candy'
      },
      drop: [ '<32>{#p/human}* (You threw away the Monster Candy.)' ],
      info: [ '<32>{#p/narrator}* "Monster Candy" Heals 10 HP\n* Has a distinct, non-licorice flavor.' ],
      name: 'Monster Candy',
      use: [ '<32>{#p/human}* (You ate the Monster Candy.)' ]
   },
   i_chocolate: {
      battle: {
         description: 'A well-deserved chocolate bar.',
         name: 'Chocolate'
      },
      drop: [
         '<32>{#p/human}* (You threw away the Chocolate.)',
         '<32>{#p/narrator}* ...',
         "<32>* I'll take that as a sign of humility on your part.",
         '<32>* I sure as hell hope it is.'
      ],
      info: [ '<32>{#p/narrator}* "Chocolate" Heals 19 HP\n* A well-deserved chocolate bar.' ],
      name: 'Chocolate',
      use: [ '<32>{#p/human}* (You ate the Chocolate.)' ]
   },
   i_delta: {
      battle: {
         description: 'A small tablet that sublimates itself upon intake.',
         name: 'Δ-9'
      },
      drop: [ '<32>{#p/human}* (You threw away the Δ-9.)' ],
      info: [ '<32>{#p/narrator}* "Δ-9" Heals 5 HP\n* A small tablet that sublimates itself upon intake.' ],
      name: 'Δ-9',
      use: [ '<32>{#p/human}* (You ingested the Δ-9.)', '<32>{#p/narrator}* Tastes like relaxation...' ]
   },
   i_halo: {
      battle: {
         description: 'A headband with its own gravity field.',
         name: 'Halo'
      },
      drop: [ '<32>{#p/human}* (You flung away the halo like a frisbee.)' ],
      info: [ '<32>{#p/narrator}* "Halo" (3 DF)\n* A headband with its own gravity field.' ],
      name: 'Halo',
      use: [ '<32>{#p/human}* (You donned the halo.)' ]
   },
   i_little_dipper: {
      battle: {
         description: 'A whacking spoon.',
         name: 'Dipper'
      },
      drop: [ '<32>{#p/human}* (You threw away the little dipper.)' ],
      info: [ '<32>{#p/narrator}* "Little Dipper" (3 AT)\n* A whacking spoon.' ],
      name: 'Little Dipper',
      use: [ '<32>{#p/human}* (You equipped the little dipper.)' ]
   },
   i_pie: {
      battle: {
         description: 'Homemade butterscotch-cinnamon pie, one slice.',
         name: 'Pie'
      },
      drop: [ '<32>{#p/human}* (You threw away the pie.)' ],
      info: [ '<32>{#p/narrator}* "Butterscotch Pie" Heals 99 HP\n* Homemade butterscotch-cinnamon pie, one slice.' ],
      name: 'Butterscotch Pie',
      use: [ '<32>{#p/human}* (You ate the pie.)' ]
   },
   i_pie2: {
      battle: {
         description: 'Classic family recipe.',
         name: 'Snail Pie'
      },
      drop: [ '<32>{#p/human}* (You threw away the pie.)' ],
      info: [ '<32>{#p/narrator}* "Snail Pie" Heals 99 HP\n* Classic family recipe.' ],
      name: 'Snail Pie',
      use: [ '<32>{#p/human}* (You ate the pie.)' ]
   },
   i_pie3: {
      battle: {
         description: 'Despite being beaten down, the pie remains delicious.',
         name: 'Pie Mash'
      },
      drop: [ '<32>{#p/human}* (You dumped the mash and the spoon that came with it.)' ],
      info: [ '<32>{#p/narrator}* "Pie Mash" Heals 99 HP\n* Despite being beaten down, the pie remains delicious.' ],
      name: 'Pie Mash',
      use: [ '<32>{#p/human}* (You consumed the mash with the provided spoon.)' ]
   },
   i_snails: {
      battle: {
         description: 'A plate of fried snails, for breakfast of course.',
         name: 'Snails'
      },
      drop: [ '<32>{#p/human}* (You threw away the Fried Snails.)' ],
      info: [ '<32>{#p/narrator}* "Fried Snails" Heals 19 HP\n* A plate of fried snails, for breakfast of course.' ],
      name: 'Fried Snails',
      use: [ '<32>{#p/human}* (You ate the Fried Snails.)' ]
   },
   i_soda: {
      battle: {
         description: 'A sickly, dark yellow liquid.',
         name: 'Soda'
      },
      drop: [ '<32>{#p/human}* (You threw away the Fizzli Soda.)', '<32>{#p/narrator}* Good riddance.' ],
      info: [ '<32>{#p/narrator}* "Fizzli Soda" Heals 8 HP\n* A sickly, dark yellow liquid.' ],
      name: 'Fizzli Soda',
      use: [ '<32>{#p/human}* (You drank the Fizzli Soda.)', '<32>{#p/narrator}* Eugh!' ]
   },
   i_spacesuit: {
      battle: {
         description: 'It came with the craft you crash-landed in.',
         name: 'Spacesuit'
      },
      drop: [ '<32>{#p/human}* (You threw away the spacesuit.)' ],
      info: [ '<32>{#p/narrator}* "Dead Spacesuit" Heals 10 HP\n* It came with the craft you crash-landed in.' ],
      name: 'Dead Spacesuit',
      use: [ '<32>{#p/human}* (You used the last heal-pak from the spacesuit and threw it away.)' ]
   },
   i_spanner: {
      battle: {
         description: 'A rusty old wrench.',
         name: 'Spanner'
      },
      drop: [ '<32>{#p/human}* (You threw away the spanner.)' ],
      info: [ '<32>{#p/narrator}* A rusty old wrench.' ],
      name: 'Rusty Spanner',
      use: () => [
         '<32>{#p/human}* (You threw the spanner.)',
         ...(battler.active && battler.target?.opponent.metadata.reactSpanner
            ? []
            : [ '<32>{#p/human}* (Nothing happened.)' ])
      ]
   },
   i_starbertA: {
      battle: {
         description: 'Super Starwalker, limited issue #1.',
         name: 'Starwalker 1'
      },
      drop: [ '<32>{#p/human}* (You threw away the comic.)' ],
      info: [ '<32>{#p/narrator}* A limited issue of the Super Starwalker comic series.\n* The first of three.' ],
      name: 'Super Starwalker 1',
      use: () => (battler.active ? [ '<32>{#p/human}* (You read the comic...)', '<32>* (No effect in battle.)' ] : [])
   },
   i_starbertB: {
      battle: {
         description: 'Super Starwalker, limited issue #2.',
         name: 'Starwalker 2'
      },
      drop: [ '<32>{#p/human}* (You threw away the comic.)' ],
      info: [ '<32>{#p/narrator}* A limited issue of the Super Starwalker comic series.\n* The second of three.' ],
      name: 'Super Starwalker 2',
      use: () =>
         battler.active
            ? [
                 '<32>{#p/human}* (You read the comic...)',
                 ...(save.data.b.stargum
                    ? [ '<32>* (No effect in battle.)' ]
                    : [
                         '<32>* (You found a piece of gum taped to the comic strip.)',
                         choicer.create('* (Chew the gum?)', 8, 7, 'Yes', 'No')
                      ])
              ]
            : []
   },
   i_starbertC: {
      battle: {
         description: 'Super Starwalker, limited issue #3.',
         name: 'Starwalker 3'
      },
      drop: [ '<32>{#p/human}* (You threw away the comic.)' ],
      info: [ '<32>{#p/narrator}* A limited issue of the Super Starwalker comic series.\n* The last of three.' ],
      name: 'Super Starwalker 3',
      use: () => (battler.active ? [ '<32>{#p/human}* (You read the comic...)', '<32>* (No effect in battle.)' ] : [])
   },
   i_steak: {
      battle: {
         description: 'Questionable and overpriced.',
         name: 'Steak'
      },
      drop: [ '<32>{#p/human}* (You threw away the Sizzli Steak.)', "<32>{#p/narrator}* Heh.\n* That's fair." ],
      info: [ '<32>{#p/narrator}* "Sizzli Steak" Heals 14 HP\n* Questionable and overpriced.' ],
      name: 'Sizzli Steak',
      use: [ '<32>{#p/human}* (You ate the Sizzli Steak.)', "<32>{#p/narrator}* Wow.\n* It's DEFINITELY replicated." ]
   },

   p_toriel: (() => {
      const w_alley1 = () =>
         save.data.n.plot < 14
            ? [ '<25>{#p/toriel}{#f/17}* ...' ]
            : [
                 '<25>{#p/toriel}{#f/5}* That is where I lectured you about leaving...',
                 '<25>{#f/9}* ...',
                 '<25>{#f/5}* I now realize the error in my ways, my child.',
                 '<25>{#f/5}* I was acting on my own silly desires.',
                 '<25>{#f/1}* Though, I am sure you have already forgiven me...'
              ];
      const w_puzzle1 = [
         '<25>{#p/toriel}{#f/1}* The old puzzle rooms...',
         '<25>{#f/0}* They were originally designed to stop human intruders.',
         '<25>{#f/1}* As the years went by, and no humans came...',
         '<25>{#f/0}* They became less of a security measure and more of a tradition.',
         '<25>{#f/0}* Now, solving these is just a part of our lives.'
      ];
      const s_human = [
         "<25>{#p/toriel}* I heard SANS's brother wants to join the royal guard someday.",
         '<25>{#f/1}* Such an aspirational young skeleton...',
         '<25>{#f/0}* Despite what I think of the guard, it is good to see someone dream.',
         '<25>{#f/5}* Sometimes, I worry that too many have given up on their dreams...',
         '<25>{#f/0}* But not him!\n* That skeleton knows what is best for him.'
      ];
      const s_doggo = pager.create('limit', () =>
         game.room === 's_doggo' && player.y > 60
            ? [
                 '<25>{#p/toriel}{#f/1}* That sound...',
                 '<25>{#f/2}* Is that a builder bot!?',
                 '<25>{#f/1}* My, those old robots... what a past they have.',
                 '<25>{#f/5}* That poor thing must be the last of its kind.',
                 '<25>{#f/0}* Still, it is nice to know that it has survived for this long.'
              ]
            : [
                 '<25>{#p/toriel}{#f/1}* Is the royal guard giving you too much trouble?',
                 '<25>{#f/0}* I did tell SANS to discourage them from FIGHTing you.',
                 '<25>{#f/1}* I know that I should be more worried...',
                 '<25>{#f/0}* But something tells me you will be alright.',
                 '<25>{#f/1}* It is like... instinct?'
              ]
      );
      const s_battle = [
         '<25>{#p/toriel}{#f/1}* If you ever decide to leave Starton, well...',
         '<25>{#f/5}* My CELL PHONE is old, and cannot reach many areas of the factory.',
         '<25>{#f/5}* You would be without me for a while...',
         '<25>{#f/1}* So please, take care of yourself, alright?'
      ];
      const s_puzzle1 = [
         '<25>{#p/toriel}{#f/1}* The Starton puzzles...',
         '<25>{#f/5}* They are surely altered now, but I never liked their original design.',
         '<25>{#f/2}* There were no written instructions anywhere!'
      ];
      const f_exit = pager.create(
         'limit',
         [
            '<25>{#p/toriel}{#f/1}* You are near the end of the factory, my child...',
            '<25>{#f/0}* Take heart.\n* There are brighter pastures up ahead.',
            '<25>{#f/2}* Not to mention, my CELL phone will be able to reach you there!'
         ],
         [ '<25>{#p/toriel}{#f/3}* I should really get an upgrade...' ]
      );
      const a_path2 = pager.create(
         'limit',
         [
            '<25>{#p/toriel}{#f/0}* Welcome to Aerialis.',
            '<25>{#f/0}* Here you will find the royal lab and the newfound "rec center."',
            '<25>{#f/0}* I have never been to the rec center, but I hear it is nice.',
            '<25>{#f/1}* Perhaps you could call me again when you get there?',
            '<25>{#f/0}* Maybe that way I could hear more about it.'
         ],
         [ '<25>{#p/toriel}{#f/5}* I am afraid do not have much else to say about this area...' ]
      );
      const a_rg1 = pager.create(
         'limit',
         [
            '<25>{#p/toriel}{#f/0}* I have heard the royal guards in Aerialis love salmon.',
            '<25>{#p/toriel}{#f/1}* Or was it ice cream?',
            '<25>{#p/toriel}{#f/2}* Wait, no, I think it was pizza!',
            '<25>{#p/toriel}{#f/9}* All of which are in short supply on the outpost.'
         ],
         [ '<25>{#p/toriel}{#f/5}* I wonder if humans still enjoy monster delicacies like these.' ]
      );
      const a_puzzle1 = pager.create(
         'limit',
         [
            '<25>{#p/toriel}{#f/1}* What kind of puzzles do they have in Aerialis?',
            '<25>{#f/0}* Are they laser-based?',
            '<25>{#f/3}* Do they entangle you back to the start when you fail them?',
            '<25>{#f/1}* My, do we already have enough of that here.'
         ],
         [ '<25>{#p/toriel}{#f/2}* I do not enjoy being moved against my will, thank you very much!' ]
      );
      const a_mettaton1 = pager.create(
         'limit',
         () => [
            '<25>{#p/toriel}{#f/0}* Word of your performances has spread far, little one!',
            save.data.n.plot < 60
               ? '<25>{#f/0}* I did not know you had such "fabulous" moves.'
               : save.data.n.plot < 65
               ? save.data.n.state_aerialis_crafterresult === 0
                  ? '<25>{#f/3}* I did not know you were such a daring spirit.'
                  : '<25>{#f/2}* I had no idea you were so skilled with a one- time use jetpack!'
               : '<25>{#f/0}* I did not know you had such a clever mind for prices.'
         ],
         [ '<25>{#p/toriel}{#f/0}* I look forward to seeing what you do next!' ]
      );
      const a_barricade1 = pager.create(
         'limit',
         [
            '<25>{#p/toriel}{#f/1}* Barricades, hmm?',
            '<25>{#f/0}* My child. When it comes to getting through walls...',
            '<25>{#f/10}* I am not the one you should call.',
            '<25>{#f/5}* Surely the royal scientist would be a better choice, no?'
         ],
         [
            '<25>{#p/toriel}{#f/1}* Individuals in that position, they um...',
            '<25>{#f/1}* They tend to become obsessed with getting through walls.'
         ]
      );
      const a_elevator1 = pager.create(
         'limit',
         [
            '<25>{#p/toriel}{#f/0}* I will never forget the time we first tried out the elevator.',
            '<25>{#f/3}* That music...',
            '<25>{#f/4}* ...was unspeakable.',
            '<25>{#f/0}* Never again.'
         ],
         [ '<25>{#p/toriel}{#f/2}* Please, do not tell me you actually enjoy it!' ]
      );
      return <Partial<CosmosKeyed<CosmosProvider<string[]>, string>>>{
         w_alley1,
         w_alley2: w_alley1,
         w_alley3: w_alley1,
         w_alley4: () =>
            save.data.b.w_state_fightroom
               ? [
                    '<25>{#p/toriel}{#f/1}* Although that place may not evoke the best of feelings for us...',
                    '<25>{#f/0}* It is still one of my favorite places in the OUTLANDS.',
                    '<25>{#f/1}* There is someone I know who visits me here sometimes...',
                    '<25>{#f/0}* Perhaps you are already aware of him.'
                 ]
               : [
                    '<25>{#p/toriel}{#f/1}* Calling so soon...?',
                    '<25>{#f/0}* ...I have not even gotten back to the house yet!',
                    '<25>{#f/0}* Please, wait a moment before calling again.'
                 ],
         w_annex: [
            '<25>{#p/toriel}* That is the pathway to the local taxi stop.',
            '<25>{#f/0}* From there, you can access other areas of the outpost.',
            "<25>{#f/1}* I don't know the taxi driver very well...",
            '<25>{#f/0}* They can be a bit, er, mysterious.'
         ],
         w_basement: [
            '<25>{#p/toriel}* You must be in the residential wing.',
            '<25>{#f/1}* That area is home to several monsters...',
            '<25>{#f/0}* Including a few who have lived there since the early days.',
            '<25>{#f/0}* The monsters there do not often leave the lower level.',
            '<25>{#f/1}* I have tried to encourage them to explore...',
            '<25>{#f/0}* Perhaps they are content with the status quo.'
         ],
         w_blooky: () =>
            !save.data.b.a_state_hapstablook || save.data.n.plot < 68
               ? [
                    '<25>{#p/toriel}* Oh, that is where Napstablook often stays!',
                    '<25>{#f/0}* Their company is always nice, even if they do not see it that way.',
                    '<25>{#f/1}* I have tried comforting them on several occasions...',
                    '<25>{#f/9}* Nothing seems to cheer them up for long.',
                    '<25>{#f/5}* I suspect someone else is to blame for their wallows...'
                 ]
               : [
                    '<25>{#p/toriel}* Oh, that is where Napstablook often stays!',
                    '<25>{#f/0}* Their company is always nice, even if they do not see it that way.',
                    '<25>{#f/1}* Although, lately they have seemed happier...',
                    '<25>{#f/0}* I do hope their good moods continue.'
                 ],
         w_bridge: () =>
            save.data.n.plot < 16.1
               ? [
                    '<25>{#p/toriel}{#f/1}* The OUTLANDS bridge, hmm?',
                    '<25>{#f/5}* And to think I was about to...',
                    '<25>{#f/9}* ...',
                    '<25>{#f/0}* Well, there is nothing to worry about now.',
                    '<25>{#f/1}* Carry on, my child...'
                 ]
               : save.data.n.plot < 30
               ? [
                    '<25>{#p/toriel}* Greetings!',
                    '<25>{#f/1}* I can see you standing outside from my window.',
                    '<25>{#f/5}* What brings you back here so soon?'
                 ]
               : [
                    '<25>{#p/toriel}{#f/2}* How long have you been standing out there!?',
                    '<25>{#f/1}* Did you come back all this way just to call me again?',
                    '<25>{#f/14}* My child...',
                    '<25>{#f/14}* It... it is nice to see you again...',
                    '<25>{#f/13}* Umm...'
                 ],
         w_candy: () => [
            ...(save.data.n.state_wastelands_candy < 4
               ? []
               : [
                    '<25>{#p/toriel}{#f/1}* Oh dear, is the vending machine broken again?',
                    '<25>{#f/9}* ...\n* I apologize for that, my child.'
                 ]),
            '<25>{#p/toriel}{#f/5}* That vending machine has broken down more times than I can count.',
            '<25>{#f/1}* I fear much of the technology around here is out of date...',
            "<25>{#f/0}* Perhaps it's time I replace some of it."
         ],
         w_coffin: [ '<25>{#p/toriel}{#f/5}* ...' ],
         w_courtyard: [
            '<25>{#p/toriel}* Ah, you must be in my front yard.',
            '<25>{#f/0}* Well, I call it it a yard.',
            '<25>{#f/0}* It is more of a junction between my home and the exit.',
            '<25>{#f/1}* That room was originally going to be larger...',
            '<25>{#f/0}* Then, we realized there would be no use for the extra space.',
            '<25>{#f/1}* Interesting, is it not?'
         ],
         w_start: [
            '<25>{#p/toriel}{#f/1}* The very edge of the outpost...',
            '<25>{#f/1}* Are you feeling nostalgic, my child?',
            '<25>{#f/5}* Or perhaps you are looking for something...',
            '<25>{#f/0}* Well, in any case, please do not stay out for too long.',
            '<25>{#f/6}* You would not want to forget the way back!'
         ],
         w_danger: () =>
            save.data.n.state_wastelands_froggit === 3
               ? [
                    '<25>{#p/toriel}{#f/1}* Oho, I know where you are...',
                    '<25>{#f/0}* The ambient noise of that room is unmistakable.',
                    '<25>{#f/6}* Not to mention, that terminal was much too tall for you.',
                    '<25>{#f/1}* Well, most of the terminals in the OUTLANDS are short...',
                    '<25>{#f/0}* How odd. That particular one happened to be different.'
                 ]
               : [
                    '<25>{#p/toriel}{#f/1}* I must say, I am not proud of how I dealt with that Froggit...',
                    '<25>{#f/5}* That could have been a great learning exercise!',
                    '<25>{#f/5}* ...',
                    '<25>{#f/1}* I suppose there is no sense in worrying about it now.',
                    '<25>{#f/0}* The past cannot changed, after all.'
                 ],
         w_dummy: () =>
            [
               [
                  '<25>{#p/toriel}{#f/1}* The DUMMY room...?',
                  '<25>{#f/0}* Hee hee, I am still proud of the way you handled that test.',
                  '<25>{#f/1}* Talking it out is preferable to violence...',
                  '<25>{#f/0}* Even when it seems unrealistic.'
               ],
               [
                  '<25>{#p/toriel}{#f/1}* The DUMMY room...?',
                  '<25>{#f/5}* ...',
                  '<25>{#f/5}* Although you did not handle that test well...',
                  '<25>{#f/0}* I am sure you learned from it going forward.',
                  '<25>{#f/1}* That was the idea, was it not...?'
               ],
               [
                  '<25>{#p/toriel}{#f/1}* The DUMMY room...?',
                  '<25>{#f/1}* Oh, how could I forget the way you ran...',
                  '<25>{#f/5}* Perhaps you were not ready for a battle at the time.',
                  '<25>{#f/1}* Although, considering what happened between us...',
                  '<25>{#f/0}* I highly doubt it is an issue for you now.'
               ],
               [
                  '<25>{#p/toriel}{#f/1}* The DUMMY room...?',
                  '<25>{#f/1}* ...',
                  '<25>{#f/0}* Truthfully, I still do not know how to react to what happened.',
                  '<25>{#f/1}* It was mesmerising to watch, though...',
                  '<25>{#f/3}* Just... the two of you... staring at each other...',
                  '<25>{#f/4}* ...'
               ],
               [
                  '<25>{#p/toriel}{#f/1}* The DUMMY room...?',
                  '<25>{#f/0}* Ah, how could I forget how adorable you were...',
                  '<25>{#f/0}* I have taught many... erm, monsters, how to handle FIGHTs.',
                  '<25>{#f/0}* None of them ever did it quite like you.',
                  '<25>{#f/0}* I would even go as far as to say you had the better idea!'
               ],
               [
                  '<25>{#p/toriel}{#f/1}* The DUMMY room...?',
                  '<25>{#f/5}* ...',
                  '<25>{#f/5}* The next time you come across a dummy...',
                  '<25>{#f/3}* Slapping them might not be a great idea.',
                  '<25>{#f/4}* Or it is a great idea, and I am simply the crazy one here.',
                  '<25>{#f/2}* Who knows!'
               ],
               [
                  '<25>{#p/toriel}{#f/1}* The DUMMY room...?',
                  '<25>{#f/5}* ...',
                  '<25>{#f/7}* ...',
                  '<25>{#f/8}* Hahahahaha!\n* Ah- I could not hold in the laughter!',
                  '<25>{#f/1}* Never in my life did I expect you to FLIRT...',
                  '<25>{#f/0}* Let alone like the way you did!',
                  '<25>{#f/1}* Listen to me, my child...',
                  '<25>{#f/9}* Flirting with your adversaries is almost never ideal.',
                  '<25>{#f/10}* But YOU...',
                  '<25>{#f/0}* You seem to have a knack for it.',
                  '<25>{#f/0}* Maybe you could use that to your advantage at some point.'
               ]
            ][save.data.n.state_wastelands_dummy],
         w_entrance: [
            '<25>{#p/toriel}{#f/1}* That is where I introduced myself to you, is it not?',
            '<25>{#f/0}* Who would have thought you would come all this way.',
            '<25>{#f/1}* ...',
            '<25>{#f/0}* I suppose there is not much else to say.'
         ],
         w_exit: () =>
            save.data.n.plot < 16.1
               ? [
                    '<25>{#p/toriel}{#f/1}* Are you leaving the OUTLANDS, my child?',
                    '<25>{#f/5}* ...',
                    '<25>{#f/0}* I want you to remember something.',
                    '<25>{#f/1}* Whatever happens out there, no matter how bad it is...',
                    '<25>{#f/0}* I want you to know that I have faith in you.',
                    '<25>{#f/1}* I know you want to continue to do the right thing, and...',
                    '<25>{#f/0}* I know you can.',
                    '<25>{#f/1}* So, remember that for me, alright?',
                    '<25>{#f/1}* ...',
                    '<25>{#f/1}* I love you, little one...',
                    '<25>{#f/0}* Good luck.'
                 ]
               : save.data.n.plot < 30
               ? [
                    '<25>{#p/toriel}* Greetings!',
                    '<25>{#f/1}* I can see you standing outside from my window.',
                    '<25>{#f/5}* What brings you back here so soon?'
                 ]
               : [
                    '<25>{#p/toriel}{#f/2}* How long have you been standing out there!?',
                    '<25>{#f/1}* Did you come back all this way just to call me again?',
                    '<25>{#f/14}* My child...',
                    '<25>{#f/14}* It... it is nice to see you again...',
                    '<25>{#f/13}* Umm...'
                 ],
         w_froggit: [
            '<25>{#p/toriel}* Ah, the room I did not want you to enter.',
            '<25>{#f/5}* And for good reason...',
            '<25>{#f/1}* It is where you tend to run into the more, erm, "active" monsters.',
            '<25>{#f/9}* Ones that believe it is their duty to defend the kingdom.',
            '<25>{#f/1}* While they have every right to do so...',
            '<25>{#f/9}* That does not mean I have to agree with it.'
         ],
         w_junction: [
            '<25>{#p/toriel}* That is perhaps the least interesting room in the OUTLANDS.',
            '<25>{#f/1}* However, even boring rooms do have their history...',
            '<25>{#f/0}* At one time, that area was going to be the community centre...',
            '<25>{#f/0}* Given that it is only a few steps away from the taxi stop.',
            '<25>{#f/1}* But, over time, our plans for the area changed...',
            '<25>{#f/0}* Now it is nothing more than a simple junction point.'
         ],
         w_lobby: [
            '<25>{#p/toriel}{#f/1}* That is where I introduced myself to you, is it not?',
            '<25>{#f/0}* Who would have thought you would come all this way.',
            '<25>{#f/1}* ...',
            '<25>{#f/0}* I suppose there is not much else to say.'
         ],
         w_mouse: [
            '<25>{#p/toriel}{#f/1}* I do wonder...',
            '<25>{#f/1}* Did they ever fix the power lines in that room?',
            '<25>{#f/0}* Well, perhaps I should go take a look at that sometime.'
         ],
         w_pacing: [
            '<25>{#p/toriel}{#f/5}* Are those Froggits STILL sitting there?',
            '<25>{#f/1}* They never seem to be anywhere else...',
            '<25>{#f/0}* Truly, it is an odd way to live.',
            '<25>{#f/1}* How does one eat?\n* How does one drink?',
            '<25>{#f/1}* We may never know the answers to these questions, my child...'
         ],
         w_party: [
            '<25>{#p/toriel}{#f/1}* Is that the sound of the club house...?',
            '<25>{#f/0}* Hee hee, they host performances there from time to time.',
            '<25>{#f/1}* Music, drama, and the arts, of course...',
            '<25>{#f/0}* It is always good to see people expressing themselves.',
            '<25>{#f/1}* I once attended a comedy show there...',
            '<25>{#f/0}* It was the hardest I have ever laughed in my life!'
         ],
         w_puzzle1,
         w_puzzle2: w_puzzle1,
         w_puzzle3: w_puzzle1,
         w_puzzle4: w_puzzle1,
         w_restricted: [
            '<25>{#p/toriel}{#f/1}* That area is almost never visited by anyone...',
            '<25>{#f/0}* Truthfully, there is a good reason for that.',
            '<25>{#f/1}* It is the same reason there is a locked door nearby.',
            '<25>{#f/5}* ...',
            '<25>{#f/9}* Perhaps it would be best if we did not discuss it.'
         ],
         w_stairs: [
            '<25>{#p/toriel}* Ah, the lower level.',
            '<25>{#f/1}* I do not visit that area often, mainly because...',
            '<25>{#f/5}* I get nervous about falling through.',
            '<25>{#f/5}* That glass... it...',
            '<25>{#f/1}* This silly old woman simply cannot help but worry about it!'
         ],
         w_storage: [
            '<25>{#p/toriel}{#f/2}* My child, what are you doing in a storage closet!?',
            '<25>{#f/0}* ...\n* Let me guess.',
            '<25>{#f/1}* Are you one of those who believe in "dark worlds?"',
            '<25>{#f/0}* Silly child.\n* You will not find any worlds like that here.'
         ],
         w_toriel_asriel: () =>
            save.data.n.plot < 14
               ? [ '<25>{#p/toriel}* Ah, that must be your room!', '<25>{#f/1}* I really do hope you like it...' ]
               : [
                    '<25>{#p/toriel}* Ah, that must be your room!',
                    '<25>{#f/5}* Well, I say YOUR room...',
                    '<25>{#f/0}* Perhaps it is no longer as such.',
                    '<25>{#f/1}* Still, I am glad that you could get some rest.'
                 ],
         w_toriel_front: [
            '<25>{#p/toriel}{#f/1}* Did you know that my home used to have a basement?',
            '<25>{#f/0}* In fact, it used to lead to the exit of the OUTLANDS.',
            '<25>{#f/1}* However, there were issues with the gravity in that section, and...',
            '<25>{#f/1}* Well, we do not want monsters floating away, do we?',
            '<25>{#f/0}* My, that would be terrible!'
         ],
         w_toriel_hallway: [
            '<25>{#p/toriel}{#f/1}* There is not much to say about the hallway...',
            '<25>{#f/0}* Hmm, that unrenovated room could certainly use some work.',
            '<25>{#f/1}* I suppose when I built this colorful replica of the royal house...',
            '<25>{#f/0}* I did not get around to completing that room.'
         ],
         w_toriel_kitchen: [
            '<25>{#p/toriel}{#f/1}* Do you know why there is so much fur in my sink?',
            '<25>{#f/0}* You see, lately, I had to shed quite a bit of mine.',
            '<25>{#f/6}* You can imagine where all of that ended up.',
            '<25>{#f/1}* What? This is perfectly normal for boss monsters.'
         ],
         w_toriel_living: () =>
            toriCheck()
               ? [ '<25>{#p/toriel}{#f/3}* There is no need to call me when I am right here, little one.' ]
               : [
                    '<25>{#p/toriel}{#f/1}* Rummaging around in the living room, are we?',
                    '<25>{#f/0}* Do not worry, I do not mind at all.',
                    '<25>{#f/1}* Say, have you read all of the books on the bookshelves?',
                    '<25>{#f/0}* There is so much interesting material!'
                 ],
         w_tutorial: [
            '<25>{#p/toriel}* Oh, that is my favorite puzzle room!',
            '<25>{#f/5}* ...that sounded better in my head.',
            '<26>{#f/1}* But there is something nice about how it teaches collaboration...',
            '<25>{#f/0}* Oh, I sound like a veritable scholar!',
            '<25>{#f/1}* Well, actually, my dream job is to become a caregiver.',
            '<25>{#f/0}* There is just something rewarding about helping children grow.'
         ],
         w_twinkly: () =>
            save.data.b.toriel_twinkly
               ? [
                    '<25>{#p/toriel}{#f/1}* That is where I found you, is it not?',
                    '<25>{#f/5}* To think you could have been killed by that awful thing...',
                    '<25>{#f/9}* He has been a pest here for some time.',
                    '<25>{#f/1}* I do wonder where he came from...',
                    '<25>{#f/1}* Perhaps there are other talking starlings out there...?'
                 ]
               : [
                    '<25>{#p/toriel}{#f/1}* That is where I found you, is it not?',
                    '<25>{#f/5}* All alone out there, by yourself...',
                    '<25>{#f/0}* It is a good thing I was there to bring you in.',
                    '<25>{#f/1}* Who knows what awful things could have happened otherwise...'
                 ],
         w_wonder: [
            '<25>{#p/toriel}{#f/1}* Although it is just a simple taxi stop...',
            '<25>{#f/0}* I often see monsters walk out there to take their mind off things.',
            '<25>{#f/1}* I suppose, here in the OUTLANDS...',
            '<25>{#f/0}* We really can make anything multi-purpose.'
         ],
         w_zigzag: [
            '<25>{#p/toriel}{#f/1}* There is a reason why that room is so long and windy...',
            '<25>{#f/0}* The idea was that it would slow down invading human forces.',
            '<25>{#f/1}* Can you imagine how difficult it would be...',
            '<25>{#f/1}* For an army of foot soldiers to traverse that path?',
            '<25>{#f/0}* Well, that was the intention, anyway.',
            '<25>{#f/0}* It seems that, in truth, we had nothing to worry about.'
         ],
         s_start: () =>
            save.data.n.plot < 17.001
               ? [
                    '<25>{#p/toriel}{#f/1}* Calling this early...?',
                    '<25>{#f/5}* You should really get going, my child...',
                    '<25>{#f/0}* I promise everything will be okay.',
                    '<25>{#f/1}* Be good, will you not?'
                 ]
               : save.data.n.plot < 30
               ? [
                    '<25>{#p/toriel}* Greetings!',
                    '<25>{#f/1}* I can see you standing outside from my window.',
                    '<25>{#f/5}* What brings you back here so soon?'
                 ]
               : [
                    '<25>{#p/toriel}{#f/2}* How long have you been standing out there!?',
                    '<25>{#f/1}* Did you come back all this way just to call me again?',
                    '<25>{#f/14}* My child...',
                    '<25>{#f/14}* It... it is nice to see you again...',
                    '<25>{#f/13}* Umm...'
                 ],
         s_sans: () =>
            save.data.n.plot < 17.001
               ? [
                    '<25>{#p/toriel}{#f/1}* Calling this early...?',
                    '<25>{#f/5}* You should really get going, my child...',
                    '<25>{#f/0}* I promise everything will be okay.',
                    '<25>{#f/1}* Be good, will you not?'
                 ]
               : save.data.n.plot < 30
               ? [
                    '<25>{#p/toriel}{#f/1}* Have you met SANS?',
                    '<25>{#f/0}* I sure hope he and his brother are taking good care of you.',
                    '<25>{#f/0}* Nothing less for such a sweet little bean!'
                 ]
               : [
                    '<25>{#p/toriel}{#f/1}* Oh, SANS...',
                    '<25>{#f/0}* You must have several hilarious stories to tell about him.',
                    '<25>{#f/1}* He may be an OLD SOUL...',
                    "<25>{#f/6}* But he's got a real PENSION for humor!"
                 ],
         s_crossroads: [
            '<25>{#p/toriel}{#f/3}* An old landing pad?',
            '<25>{#f/1}* From your description, it sounds like...',
            '<25>{#f/0}* Like the pad I helped set up for the early Starton engineers!',
            '<25>{#f/6}* At the time, Starton was our biggest project to date.',
            '<25>{#f/1}* Workers complained about long commutes to the build site...',
            '<25>{#f/0}* So we threw in a spacecraft landing pad for quick access!',
            '<25>{#f/0}* Progress on Starton sped up quite a ways, and...',
            '<25>{#f/1}* ...um, am I rambling again?'
         ],
         s_human,
         s_papyrus: s_human,
         s_doggo,
         s_maze: pager.create(
            'limit',
            [
               "<25>{#p/toriel}* SANS has told me all about his brother's fondness for puzzles.",
               '<25>{#f/1}* I hear he has even created some of his own...?',
               '<25>{#f/0}* It sounds exciting.',
               '<25>{#f/0}* I would love to try one sometime!'
            ],
            [ '<25>{#p/toriel}{#f/1}* Alas, I must oversee these OUTLANDS...' ]
         ),
         s_dogs: pager.create(
            'limit',
            [
               '<25>{#p/toriel}{#f/1}* Please, can somebody explain "dog marriage?"',
               '<25>{#f/7}* It is an odd phrase I continue to hear at least once per week.',
               '<25>{#f/5}* I do know of one little puppy that likes to visit the OUTLANDS...',
               '<25>{#f/0}* But "marriage" would imply at least two dogs.',
               '<25>{#f/1}* Hmm...'
            ],
            [ '<25>{#p/toriel}{#f/1}* Hmm...' ]
         ),
         s_lesser: pager.create(
            'limit',
            [
               '<25>{#p/toriel}* I wonder what kind of food is sold in Starton these days.',
               '<25>{#f/1}* Cakes?\n* Pies?',
               '<25>{#f/0}* Well.\n* I sure hope it is nice.'
            ],
            [ '<25>{#p/toriel}{#f/15}* It better not be rationed ice cream.' ]
         ),
         s_bros: pager.create(
            'limit',
            [
               "<25>{#p/toriel}{#f/1}* SANS's fondness for spot-the-difference puzzles...",
               '<25>{#f/5}* Has always been confusing to me.',
               '<25>{#f/5}* Knowing him, I get the strangest feeling...',
               '<25>{#f/5}* That there is more to it than meets the eye.',
               '<25>{#f/0}* Or, eye-socket in his case, I suppose.\n* Hee hee.'
            ],
            [ '<25>{#p/toriel}{#f/1}* Why would someone want to solve a near- impossible puzzle?' ]
         ),
         s_spaghetti: pager.create(
            'limit',
            [
               "<25>{#p/toriel}* SANS never stops talking about his brother's spaghetti.",
               '<25>{#f/6}* But just imagine the PASTABILITIES...',
               '<25>{#f/0}* Rigatoni!\n* Fettuccine!\n* Acini Di Pepe!',
               '<25>{#f/1}* Some variety could really help him go FARFALLE.'
            ],
            [ '<25>{#p/toriel}{#f/1}* Go BIGOLI or go home, as they say!' ]
         ),
         s_math: [
            '<25>{#p/toriel}{#f/5}* Math is certainly not my favorite subject...',
            '<25>{#f/0}* ...but it does make for a good puzzle!',
            '<25>{#f/0}* Umm... most of the time, it does.',
            '<25>{#f/1}* But umm...',
            '<25>{#f/1}* Who has time for that, anyway?'
         ],
         s_jenga: [
            '<25>{#p/toriel}* To my knowledge, ALPHYS is the current royal scientist.',
            '<25>{#f/1}* She may never replace the brilliance of sir ROMAN...',
            '<25>{#f/0}* But I am sure her skills are more than up to the task.',
            '<25>{#f/0}* This may surprise you, but I have a certain respect for scientists.',
            '<25>{#f/1}* Such analytical minds!'
         ],
         s_pacing: [
            '<25>{#p/toriel}* If I were you, I would steer clear of dubious salesfolk.',
            '<25>{#f/1}* You never know what strings they may pull...',
            '<25>{#f/5}* A lesson I have had to learn the hard way, unfortunately.'
         ],
         s_greater: s_doggo,
         s_bridge: [
            '<25>{#p/toriel}* It is fortunate most of Starton is outdoors.',
            '<25>{#f/2}* Otherwise, I would not be able to take your calls!',
            '<25>{#f/0}* My, I should think about getting an upgrade.',
            '<25>{#f/1}* With quality this wooden, it is a wonder we can call at all...'
         ],
         s_town1: [
            '<25>{#p/toriel}{#f/1}* You must have crossed into town by now...',
            '<25>{#f/1}* What do you think?',
            '<25>{#f/1}* Napstablook often tells of how friendly it is...',
            '<25>{#f/0}* I am glad that such an environment could be fostered out there.'
         ],
         s_town2: [
            '<25>{#p/toriel}* SANS says his house is on the south side of town.',
            '<25>{#f/1}* Last I checked, there were no "sides" to town...',
            '<25>{#f/0}* The town I remember was one large square.',
            '<25>{#f/1}* Perhaps there was a split at some point?'
         ],
         s_battle,
         s_exit: s_battle,
         s_puzzle1,
         s_puzzle2: s_puzzle1,
         s_puzzle3: s_puzzle1,
         f_quiche: pager.create(
            'limit',
            [
               '<25>{#p/toriel}{#f/1}* Oh, hello...!',
               '<25>{#f/5}* So you found a spot with good reception, it seems...?',
               '<25>{#f/0}* A good can be rather hard to come by out there.',
               '<25>{#f/6}* Though, my old device might have something to do with that.',
               '<25>{#f/0}* It is good to hear from you, though.',
               '<25>{#f/1}* Please, keep yourself safe out there, will you?',
               '<25>{#f/9}* I have heard the guards there are... ruthless.'
            ],
            [ '<25>{#p/toriel}{#f/5}* Especially the dogs.' ]
         ),
         f_chase: pager.create(
            'limit',
            [
               '<25>{#p/toriel}{#f/0}* Ah, there you are.',
               '<25>{#f/5}* I hope that royal guard captain is not giving you trouble.',
               "<25>{#f/1}* An OUTLANDS visitor once said they're obsessed with spears...",
               '<25>{#f/0}* Funny.\n* The captain I recall was into sabers.'
            ],
            [ '<25>{#p/toriel}{#f/1}* I wonder if you know who the "Saber of Justice" is...' ]
         ),
         f_entrance: [
            '<25>{#p/toriel}{#f/1}* Oh no...',
            '<25>{#f/2}* Synthbushes!',
            '<25>{#f/3}* Oh, those things are HORRID to get stuck in...',
            '<25>{#f/4}* They get you all itchy and scratchy...',
            '<25>{#f/0}* But I know you are smart enough to avoid the danger.'
         ],
         f_bird: pager.create(
            'limit',
            () =>
               save.data.n.plot < 42 || save.data.s.state_foundry_deathroom === 'f_bird'
                  ? [
                       '<25>{#p/toriel}{#f/5}* Things sound oughly silent where you are...',
                       '<25>{#f/5}* As if there is something missing...',
                       '<25>{#f/5}* Something important...',
                       '<25>{#f/0}* Well, no matter.\n* My imagination can run wild sometimes...'
                    ]
                  : [
                       '<25>{#p/toriel}{#f/1}* Nothing like the chirp of a fearsome little bird...',
                       '<25>{#f/0}* That bird has always been there for us.',
                       '<25>{#f/1}* Taking us places...',
                       '<25>{#f/2}* I once used its services to carry grocies!',
                       '<25>{#f/9}* ...back when we all lived in that cramped factory.'
                    ],
            () =>
               save.data.n.plot < 42 || save.data.s.state_foundry_deathroom === 'f_bird'
                  ? [ '<25>{#p/toriel}{#f/1}* Chirp, chirp, chirp...' ]
                  : [ '<25>{#p/toriel}{#f/5}* Being trapped there is not a memory I like to revisit.' ]
         ),
         f_view: [
            '<25>{#p/toriel}{#f/1}* For all the dark and dingy places in that factory...',
            '<25>{#f/0}* There are pockets of beauty to be found.',
            '<25>{#f/1}* Carpe diem, little one.\n* Do not pass up the chance to see them...'
         ],
         f_exit,
         a_start: pager.create(
            'limit',
            () =>
               save.data.n.plot < 65
                  ? [
                       '<25>{#p/toriel}{#f/0}* Welcome to Aerialis.',
                       '<25>{#f/0}* Here you will find the royal lab and the newfound "rec center."',
                       '<25>{#f/0}* I have never been to the rec center, but I hear it is nice.',
                       '<25>{#f/1}* Perhaps you could call me again when you get there?',
                       '<25>{#f/0}* Maybe that way I could hear more about it.'
                    ]
                  : [
                       '<25>{#p/toriel}{#f/1}* I take it you have been in Aerialis for a while now?',
                       '<25>{#f/0}* Hee hee.\n* Exploration is not such a bad thing!',
                       '<25>{#f/3}* Just be sure not to turn purple like the rest of the place.'
                    ],
            () =>
               save.data.n.plot < 65
                  ? [ '<25>{#p/toriel}{#f/5}* I am afraid do not have much else to say about this area...' ]
                  : [ '<25>{#p/toriel}{#f/4}* It is a very serious condition, my child.' ]
         ),
         a_path1: [
            '<25>{#p/toriel}{#f/0}* The royal lab is such a great place to learn.',
            '<25>{#f/0}* Being the home of so many breakthroughs, it is quite storied.',
            '<25>{#f/0}* If I ever become a teacher, I would host a field trip here!',
            "<25>{#f/1}* With ALPHYS's permission of course."
         ],
         a_path2,
         a_path3: a_path2,
         a_rg1,
         a_path4: [
            '<25>{#p/toriel}{#f/1}* I wonder if Aerialis is still full of scaffolding...',
            '<25>{#f/1}* They should have finished the project by now...',
            '<25>{#f/0}* ...',
            '<25>{#f/3}* Somehow, I am not filled with confidence.'
         ],
         a_barricade1,
         a_puzzle1,
         a_mettaton1,
         a_elevator1,
         a_elevator2: a_elevator1,
         a_sans: [
            '<25>{#p/toriel}{#f/1}* Oh, I had almost forgotten about SANS.',
            '<25>{#f/1}* He is still looking after you, is he not?',
            '<25>{#f/5}* That, or he has once again started selling corn dogs.',
            '<25>{#f/2}* Why do I get the feeling it is the latter.',
            '<25>{#f/1}* Silly skeleton.'
         ],
         a_pacing: [
            '<25>{#p/toriel}{#f/0}* When hearing about your hijinks with METTATON...',
            '<25>{#f/0}* I had a thought.',
            '<25>{#f/1}* How could a robot like him exist after our ban on AI programs?',
            '<25>{#f/5}* Surely ALPHYS would not break such a well- established rule...',
            '<25>{#f/0}* There must be some other explanation.'
         ],
         a_prepuzzle: a_path2,
         a_puzzle2: a_puzzle1,
         a_mettaton2: a_mettaton1,
         a_rg2: a_rg1,
         a_barricade2: a_barricade1,
         a_split: pager.create(
            'limit',
            [
               '<25>{#p/toriel}{#f/0}* A fountain?\n* I do not remember any fountains out there.',
               '<25>{#f/1}* Then again, I have been away for a long time...',
               '<25>{#f/0}* I am sure I would be very surprised if I came out there.',
               '<25>{#f/0}* I wonder what other wild things they have built!'
            ],
            [ '<25>{#p/toriel}{#f/1}* Spire houses, perhaps?' ]
         ),
         a_offshoot1: [
            '<25>{#p/toriel}{#f/5}* Be wary of abandoned side pathways in Aerialis.',
            '<25>{#f/1}* You may find secrets you wish you had not stumbled upon...'
         ],
         a_elevator3: [
            '<25>{#p/toriel}{#f/5}* If you enter the rec center, I will not be able to reach you.',
            '<25>{#f/5}* Past the rec center is the CORE... and the CITADEL.',
            '<25>{#f/9}* This could very well be the last time I hear from you...',
            "<25>{#f/10}* Please, young one... be good, won't you?",
            '<25>{#f/5}* ...',
            '<25>{#f/9}* I am so sorry I cannot be with you on the rest of your journey.'
         ]
      };
   })(),

   s_save: {
      w_courtyard: {
         name: 'Outlands - Courtyard',
         text: () =>
            save.data.n.plot > 16
               ? [
                    areaKills() < 4
                       ? '<32>{#p/human}* (Even when visiting, this little home still fills you with determination.)'
                       : '<32>{#p/human}* (Even when visiting, houses like these still fill you with determination.)'
                 ]
               : areaKills() < 4
               ? [ '<32>{#p/human}* (This cute little home fills you with determination.)' ]
               : [ '<32>{#p/human}* (A house amidst the power station fills you with determination.)' ]
      },
      w_entrance: {
         name: 'Outlands - Entrance',
         text: () =>
            save.data.n.plot < 48
               ? [
                    '<32>{#p/human}* (The industrious Outlands lies ahead, filling you with determination.)',
                    '<32>{#p/human}* (HP fully restored.)'
                 ]
               : [
                    '<32>{#p/human}* (Returning to where it all began, after so long...)',
                    '<32>{#p/human}* (This fills you with determination.)',
                    '<32>{#p/human}* (HP fully restored.)'
                 ]
      },
      w_froggit: {
         name: 'Outlands - Checkpoint',
         text: () =>
            areaKills() < 3
               ? [
                    '<32>{#p/human}* (The sight of weird and wonderful creatures fills you with determination.)',
                    '<32>{#p/human}* (HP fully restored.)'
                 ]
               : save.data.n.plot < 8.1
               ? [
                    '<32>{#p/human}* (The air grows stale.)\n* (Somehow, this fills you with determination.)',
                    '<32>{#p/human}* (HP fully restored.)'
                 ]
               : save.data.n.state_wastelands_toriel === 2
               ? [
                    '<32>{#p/human}* (The air has fully dried up.)\n* (Indeed, this fills you with determination.)',
                    '<32>{#p/human}* (HP fully restored.)'
                 ]
               : areaKills() < 5
               ? [
                    '<32>{#p/human}* (The air comes alive again.)\n* (This fills you with determination.)',
                    '<32>{#p/human}* (HP fully restored.)'
                 ]
               : [
                    '<32>{#p/human}* (The air remains stale.)\n* (Somehow, this fills you with determination.)',
                    '<32>{#p/human}* (HP fully restored.)'
                 ]
      },
      w_mouse: {
         name: 'Outlands - Stærmite Hole',
         text: () =>
            areaKills() < 2
               ? [
                    '<32>{#p/human}* (Knowing that the stærmite will one day emerge...)',
                    '<32>{#p/human}* (The thought fills you with determinætion.)'
                 ]
               : [
                    '<32>{#p/human}* (Even if the stærmite may never emerge again...)',
                    '<32>{#p/human}* (The situation fills you with determinætion.)'
                 ]
      },
      w_start: {
         name: 'Unknown Location',
         text: []
      }
   }
};

export default text;

CosmosUtils.status(`LOAD MODULE: OUTLANDS TEXT (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
