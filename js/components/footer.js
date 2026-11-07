/* Site footer. Social links are listed only when real URLs are set in LZ.config.social. */
LZ.footer=()=>{const r=LZ.root,soc=Object.entries(LZ.config.social||{}).filter(s=>/^https?:/.test(s[1]));
 LZ.$('#site-footer').innerHTML=`<footer class="site-footer"><div class="container"><div class="row g-4 g-lg-5">
 <div class="col-lg-4"><h2>LetsZu</h2><p>Loose leaf tea and chai, sourced from the garden and sent to your kitchen.</p>
 <form data-newsletter class="d-flex gap-2" novalidate><label class="visually-hidden" for="fNews">Email address</label><input id="fNews" type="email" class="form-control" placeholder="Your email" autocomplete="email" required><button class="btn btn-gold">Join</button></form>
 ${soc.length?`<p class="mt-3 mb-0 d-flex gap-3">${soc.map(s=>`<a href="${s[1]}" rel="noopener" target="_blank">${s[0]}</a>`).join('')}</p>`:''}</div>
 <div class="col-6 col-lg-2"><h2>Shop</h2><ul class="list-unstyled"><li><a href="${r}pages/shop.html">All teas</a></li><li><a href="${r}pages/categories.html">Collections</a></li><li><a href="${r}pages/wishlist.html">Wishlist</a></li><li><a href="${r}pages/cart.html">Cart</a></li></ul></div>
 <div class="col-6 col-lg-2"><h2>Learn</h2><ul class="list-unstyled"><li><a href="${r}pages/tea-finder.html">Tea Finder</a></li><li><a href="${r}pages/brewing-guide.html">Brewing Guide</a></li><li><a href="${r}pages/our-story.html">Our Story</a></li><li><a href="${r}pages/faq.html">FAQ</a></li></ul></div>
 <div class="col-6 col-lg-2"><h2>Help</h2><ul class="list-unstyled"><li><a href="${r}pages/contact.html">Contact</a></li><li><a href="${r}pages/login.html">Log in</a></li><li><a href="${r}pages/signup.html">Sign up</a></li></ul></div>
 <div class="col-6 col-lg-2"><h2>Legal</h2><ul class="list-unstyled"><li><a href="${r}pages/legal/privacy-policy.html">Privacy</a></li><li><a href="${r}pages/legal/terms.html">Terms</a></li><li><a href="${r}pages/legal/shipping-returns.html">Shipping &amp; returns</a></li></ul></div>
 </div><hr style="border-color:rgba(247,243,233,.18)"><small>© ${new Date().getFullYear()} LetsZu. Demo store: no real payments are taken and no orders are placed.</small></div></footer>`};
