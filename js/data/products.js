LZ.data=LZ.data||{};
(function(){
const P=(id,name,cat,price,rating,count,origin,notes,ingredients,caf,mood,badge,desc,brew,tea)=>({id,name,cat,price,rating,count,origin,notes,ingredients,caf,mood,badge,desc,brew,tea});
const NB={temp:0,time:0,amount:''};
LZ.data.products=[
P('sencha-morning','Morning Sencha','green',12,4.7,128,'Shizuoka, Japan',['Grassy','Sweet','Fresh'],'Steamed sencha leaves','medium','focus','Signature','Bright steamed leaves with a clean, sweet finish.',{temp:75,time:90,amount:'2 g per 150 ml'}),
P('jasmine-pearl','Jasmine Pearl','green',16,4.8,96,'Fujian, China',['Floral','Delicate','Smooth'],'Green tea, jasmine blossoms','medium','calm','','Hand-rolled pearls scented with jasmine.',{temp:80,time:120,amount:'3 g per 150 ml'}),
P('assam-gold','Assam Gold','black',11,4.6,210,'Assam, India',['Malty','Bold','Rich'],'Assam black tea','high','energy','Seasonal','A strong breakfast black tea with deep malt.',{temp:95,time:240,amount:'2.5 g per 200 ml'}),
P('earl-grey-royale','Earl Grey Royale','black',13,4.5,142,'Darjeeling, India',['Citrus','Bergamot','Crisp'],'Black tea, bergamot oil, cornflower','high','focus','','Classic bergamot with a floral twist.',{temp:95,time:210,amount:'2.5 g per 200 ml'}),
P('ceremonial-matcha','Ceremonial Matcha','matcha',28,4.9,87,'Uji, Japan',['Umami','Creamy','Vegetal'],'Shade-grown tencha leaves','medium','focus','Premium','Vivid green, stone-ground and naturally sweet.',{temp:80,time:30,amount:'2 g whisked in 70 ml'}),
P('latte-matcha','Latte Matcha','matcha',19,4.4,64,'Kagoshima, Japan',['Earthy','Smooth'],'Culinary grade matcha','medium','energy','','Made for lattes and baking.',{temp:80,time:30,amount:'2 g whisked in 70 ml'}),
P('chamomile-honey','Chamomile & Honey','herbal',10,4.6,119,'Nile Delta, Egypt',['Honeyed','Soft','Apple'],'Chamomile, honey crystals','none','sleep','','A soft evening cup with no caffeine.',{temp:100,time:300,amount:'3 g per 200 ml'}),
P('mint-garden','Moroccan Mint Garden','herbal',10,4.5,73,'Meknes, Morocco',['Cooling','Sweet'],'Spearmint, peppermint, lemon verbena','none','calm','New','Fresh mint, lovely hot or iced.',{temp:100,time:240,amount:'3 g per 200 ml'}),
P('masala-chai','Kashmiri Masala Chai','chai',14,4.9,305,'Peshawar, Pakistan',['Spiced','Creamy','Warm'],'Black tea, cardamom, cinnamon, clove, ginger','high','comfort','Signature','Brew with milk and a little sugar for a proper chai.',{temp:100,time:300,amount:'2 tsp per 250 ml milk and water'}),
P('saffron-chai','Saffron Cardamom Chai','chai',24,4.8,58,'Kashmir',['Floral','Luxurious'],'Black tea, saffron, green cardamom','high','comfort','Premium','A festive chai finished with saffron.',{temp:100,time:300,amount:'2 tsp per 250 ml'}),
P('glass-teapot','Glass Teapot 800 ml','accessories',34,4.7,41,'Handmade',['Heat-proof'],'Borosilicate glass with infuser','none','','','Watch your leaves unfurl.',NB,false),
P('bamboo-whisk','Bamboo Matcha Whisk','accessories',18,4.6,52,'Nara, Japan',['Hand-carved'],'Bamboo','none','','','100-tine whisk for frothy matcha.',NB,false)
];
})();
