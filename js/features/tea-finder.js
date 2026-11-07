LZ.finder={
 questions:[
  {k:'taste',q:'What flavour do you reach for?',o:[['Fresh and grassy','green'],['Bold and malty','black'],['Spiced and creamy','chai'],['Sweet and floral','herbal']]},
  {k:'caf',q:'How much caffeine do you want?',o:[['None, please','none'],['A gentle lift','medium'],['The strong stuff','high']]},
  {k:'mood',q:'What do you need from this cup?',o:[['Focus','focus'],['Calm','calm'],['Energy','energy'],['Comfort','comfort'],['Sleep','sleep']]},
  {k:'serve',q:'How will you drink it?',o:[['Hot and plain','plain'],['With milk','milk'],['Iced','iced']]}],
 recommend(a){
  return LZ.products.all().filter(p=>p.tea!==false).map((p,i)=>{let s=0;
   if(p.cat===a.taste||(a.taste==='green'&&p.cat==='matcha'))s+=3;
   if(p.caf===a.caf)s+=3;if(p.mood===a.mood)s+=2;
   if(a.serve==='milk'&&(p.cat==='chai'||p.cat==='black'))s+=2;
   if(a.serve==='iced'&&(p.cat==='herbal'||p.cat==='green'))s+=2;
   if(a.serve==='plain'&&p.cat!=='chai')s+=1;return{p,s:s-i*.001}}).sort((x,y)=>y.s-x.s).slice(0,3).map(x=>x.p)}};
