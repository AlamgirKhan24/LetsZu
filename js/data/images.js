/* ---------------------------------------------------------------
   IMAGES: all photos come from Unsplash (free to use, see docs/image-credits.md).
   - U(id, w, h) builds a sized Unsplash link from a photo id.
   - To swap a photo, change the id (or paste any direct image link instead of U(...)).
   - Empty values fall back to the built-in SVG art automatically.
---------------------------------------------------------------- */
const U=(id,w=800,h=1000)=>`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=${w}&h=${h}`;
LZ.U=U;
LZ.images={
 hero:U('1576092768241-dec231879fc3',1000,1250),
 categories:{
  green:U('1582785513054-8d1bf9d69c1a',800,640),
  black:U('1491720731493-223f97d92c21',800,640),
  matcha:U('1589698272390-0501a07619bb',800,640),
  herbal:U('1648455321715-e8ed86188c0e',800,640),
  chai:U('1643067077447-78239a403a18',800,640),
  accessories:U('1683558654439-8b9986cbf1dd',800,640)
 },
 lifestyle:{                      // used by [data-photo="key"] blocks on the pages
  story:U('1567922045116-2a00fae2ed03',1600,700),
  storyA:U('1563822249366-3efb23b8e0c9',900,700),
  storyB:U('1563822249548-9a72b6353cd1',900,700),
  offer:U('1643067077447-78239a403a18',1400,700),
  finder:U('1563822249366-3efb23b8e0c9',900,500),
  brew:U('1593532320143-0fe08058387a',900,500),
  about:U('1567922045116-2a00fae2ed03',900,500),
  shop:U('1560228022-f1a3298022e9',1600,500),
  categories:U('1486240036762-6db0544d5f46',1600,500),
  login:U('1514733670139-4d87a1941d55',900,1100),
  signup:U('1573784540576-21ddeff9479b',900,1100),
  contact:U('1612706965205-7570f423e339',900,1100),
  notfound:U('1604520024165-2f48dfca2a8b',1600,800),
  brewBanner:U('1593532320143-0fe08058387a',1600,600),
  finderBanner:U('1563822249366-3efb23b8e0c9',1600,600),
  newsletter:U('1518881922778-bacb4debc3d7',1600,600)
 },
 products:{                       // up to 3 photos per product; the first is the card image
  'sencha-morning':[U('1536256263959-770b48d82b0a'),U('1563822249366-3efb23b8e0c9'),U('1627435601361-ec25f5b1d0e5')],
  'jasmine-pearl':[U('1573784540576-21ddeff9479b'),U('1514733670139-4d87a1941d55'),U('1563822249366-3efb23b8e0c9')],
  'assam-gold':[U('1491720731493-223f97d92c21'),U('1567922045116-2a00fae2ed03'),U('1571934811356-5cc061b6821f')],
  'earl-grey-royale':[U('1421986872218-300a0fea5895'),U('1612706965205-7570f423e339'),U('1458819714733-e5ab3d536722')],
  'ceremonial-matcha':[U('1589698272390-0501a07619bb'),U('1565117661210-fd54898de423'),U('1624893578106-a98840591afc')],
  'latte-matcha':[U('1717603545758-88cc454db69b'),U('1708573106073-e27e43ec7fda'),U('1566373049939-704ea187ef98')],
  'chamomile-honey':[U('1648455321715-e8ed86188c0e'),U('1596344084757-b83f2081da8b'),U('1576092768241-dec231879fc3')],
  'mint-garden':[U('1627435601361-ec25f5b1d0e5'),U('1547825407-2d060104b7f8'),U('1521012012373-6a85bade18da')],
  'masala-chai':[U('1643067077447-78239a403a18'),U('1563822249548-9a72b6353cd1'),U('1544787219-7f47ccb76574')],
  'saffron-chai':[U('1563822249548-9a72b6353cd1'),U('1604520024165-2f48dfca2a8b'),U('1518881922778-bacb4debc3d7')],
  'glass-teapot':[U('1609016617751-e80552ae6ec2'),U('1627828094454-accc9a7c20e9'),U('1593532320143-0fe08058387a')],
  'bamboo-whisk':[U('1717603545586-208c9d67fcbe'),U('1624893578106-a98840591afc'),U('1589698272390-0501a07619bb')]
 }
};
LZ.data=LZ.data||{};
