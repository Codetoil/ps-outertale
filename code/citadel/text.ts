import { CosmosUtils } from '../engine/utils';
import { pager, world } from '../mantle';

export default {
   a_citadel: {
      genotext: {},
      truetext: {},
      npc: {},
      story: {},
      overworld: {},
      trivia: {
         // front room
         c_af_window: [ '<32>{#p/narrator}*' ],
         c_af_bookshelf: pager.create(
            'sequence',
            ...CosmosUtils.populate(
               3,
               index => () =>
                  world.genocide
                     ? [
                          "<32>{#p/narrator}* It's a bookshelf.",
                          '<32>{#p/human}* (You pick out a book...)',
                          '<32>{#p/narrator}* ""',
                          '<33>* ""',
                          '<32>* ""',
                          '<32>{#p/human}* (You put the book back on the shelf.)'
                       ]
                     : [
                          [
                             "<32>{#p/narrator}* It's a bookshelf.",
                             '<32>{#p/human}* (You pick out a book...)',
                             '<32>{#p/narrator}* "hint at trust"',
                             '<32>* ""',
                             '<32>{#p/human}* (You put the book back on the shelf.)'
                          ],
                          [
                             "<32>{#p/narrator}* It's a bookshelf.",
                             '<32>{#p/human}* (You pick out a book...)',
                             '<32>{#p/narrator}* "kindness"',
                             '<32>* ""',
                             '<32>{#p/human}* (You put the book back on the shelf.)'
                          ],
                          [
                             "<32>{#p/narrator}* It's a bookshelf.",
                             '<32>{#p/human}* (You pick out a book...)',
                             '<32>{#p/narrator}* "hint at archive"',
                             '<32>* ""',
                             '<32>{#p/human}* (You put the book back on the shelf.)'
                          ]
                       ][index]
            )
         ),
         // living room
         c_al_bookshelf: pager.create(
            'sequence',
            ...CosmosUtils.populate(
               3,
               index => () =>
                  world.genocide
                     ? [
                          "<32>{#p/narrator}* It's a bookshelf.",
                          '<32>{#p/human}* (You pick out a book...)',
                          '<32>{#p/narrator}* ""',
                          '<33>* ""',
                          '<32>* ""',
                          '<32>{#p/human}* (You put the book back on the shelf.)'
                       ]
                     : [
                          [
                             "<32>{#p/narrator}* It's a bookshelf.",
                             '<32>{#p/human}* (You pick out a book...)',
                             '<32>{#p/narrator}* ""',
                             '<32>* ""',
                             '<32>{#p/human}* (You put the book back on the shelf.)'
                          ],
                          [
                             "<32>{#p/narrator}* It's a bookshelf.",
                             '<32>{#p/human}* (You pick out a book...)',
                             '<32>{#p/narrator}* ""',
                             '<32>* ""',
                             '<32>{#p/human}* (You put the book back on the shelf.)'
                          ],
                          [
                             "<32>{#p/narrator}* It's a bookshelf.",
                             '<32>{#p/human}* (You pick out a book...)',
                             '<32>{#p/narrator}* ""',
                             '<32>* ""',
                             '<32>{#p/human}* (You put the book back on the shelf.)'
                          ]
                       ][index]
            )
         ),
         c_al_chair1: [ '<32>{#p/narrator}*' ],
         c_al_chair2: [ '<32>{#p/narrator}*' ],
         c_al_chair3: [ '<32>{#p/narrator}*' ],
         c_al_chair4: [ '<32>{#p/narrator}*' ],
         // kitchen
         c_ak_sink: [ '<32>{#p/narrator}*' ],
         c_ak_counter: [ '<32>{#p/narrator}*' ],
         c_ak_tea: [ '<32>{#p/narrator}*' ],
         c_ak_stove: [ '<32>{#p/narrator}*' ],
         c_ak_trash: [ '<32>{#p/narrator}*' ],
         // hallway
         c_ah_door: [ '<32>{#p/narrator}* "Room under renovations."' ],
         c_ah_mirror: [ "<32>{#p/narrator}* Despite everything, it's still you." ],
         // asriel's room
         c_aa_flower: [ '<32>{#p/narrator}*' ],
         c_aa_cabinet: [ '<32>{#p/narrator}*' ],
         c_aa_box: [ '<32>{#p/narrator}*' ],
         c_aa_frame: [ '<32>{#p/narrator}*' ],
         c_aa_paper: [ '<32>{#p/narrator}*' ],
         c_aa_deathbed: [ '<32>{#p/narrator}*' ],
         // asgore's room
         c_aa_chair: [ '<32>{#p/narrator}*' ],
         c_aa_bed: [ '<32>{#p/narrator}*' ],
         c_aa_diary: [ '<32>{#p/narrator}*' ],
         c_aa_bureau: [ '<32>{#p/narrator}*' ],
         c_aa_macaroni: [ "<32>{#p/narrator}* It's a hand-made macaroni art of a starling." ],
         c_aa_underwear: [ '<32>{#p/narrator}*' ]
      }
   },
   s_save: {
      c_courtyard: {
         name: 'Citadel - Courtyard',
         text: []
      }
   }
};

CosmosUtils.status(`LOAD MODULE: CITADEL TEXT (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
