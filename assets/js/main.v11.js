/* BNS V1 — experience engine: theme, menu, cursor, reveals, phased assembly 3D */
(function(){
'use strict';
/* .js + theme are applied synchronously by the head init script (no flash, no race);
   the engine only re-syncs toggle UI to the already-applied theme. */
var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var $ = function(s,c){ return (c||document).querySelector(s); };
var $$ = function(s,c){ return Array.prototype.slice.call((c||document).querySelectorAll(s)); };

/* ---------- THEME ---------- */
var rootEl = document.documentElement;
function paintTheme(t){
  rootEl.setAttribute('data-theme', t);
  $$('.themebtn').forEach(function(b){
    var light = (t === 'light');
    b.setAttribute('aria-pressed', light ? 'true' : 'false');
    b.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
  });
  var m = document.querySelector('meta[name="theme-color"]');
  if(m) m.setAttribute('content', t === 'light' ? '#F4F1EA' : '#0C0C10');
}
(function syncThemeUI(){
  var cur = rootEl.getAttribute('data-theme');
  paintTheme(cur === 'light' ? 'light' : 'dark');
})();
$$('.themebtn').forEach(function(b){
  b.addEventListener('click', function(){
    var n = rootEl.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    try{ window.localStorage.setItem('bns-v1', n); }catch(e){}
    paintTheme(n);
  });
});

/* ---------- PROGRESS + NAV ---------- */
var prog = $('#progress');
var nav = $('#nav');
function onScroll(){
  var h = document.documentElement.scrollHeight - window.innerHeight;
  if(prog && h > 0) prog.style.width = ((window.scrollY||0) / h * 100) + '%';
  if(nav) nav.classList.toggle('scrolled', (window.scrollY||0) > 30);
}
var tick = false;
window.addEventListener('scroll', function(){
  if(!tick){ requestAnimationFrame(function(){ onScroll(); tick = false; }); tick = true; }
}, {passive:true});
onScroll();

/* active link */
var page = (window.location.pathname.split('/').pop() || 'index.html');
$$('.nav-links a').forEach(function(a){
  var h = a.getAttribute('href') || '';
  if(h === page || (page === '' && h === 'index.html')) a.classList.add('on');
});

/* ---------- MOBILE MENU ---------- */
var burger = $('#burger'), mmenu = $('#mmenu');
if(burger && mmenu){
  burger.addEventListener('click', function(){
    var open = mmenu.classList.toggle('open');
    burger.classList.toggle('x', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
  });
  $$('a', mmenu).forEach(function(a){
    a.addEventListener('click', function(){
      mmenu.classList.remove('open'); burger.classList.remove('x');
      burger.setAttribute('aria-expanded','false'); document.body.style.overflow = '';
    });
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && mmenu.classList.contains('open')){
      mmenu.classList.remove('open'); burger.classList.remove('x');
      burger.setAttribute('aria-expanded','false'); document.body.style.overflow = '';
      burger.focus();
    }
  });
}

/* ---------- CURSOR ---------- */
var dot = $('#cdot'), ring = $('#cring');
if(dot && ring && window.matchMedia('(hover:hover) and (pointer:fine)').matches && !reduced){
  var mx = -100, my = -100, rx = -100, ry = -100;
  document.addEventListener('mousemove', function(e){
    mx = e.clientX; my = e.clientY;
    dot.style.transform = 'translate(' + (mx) + 'px,' + (my) + 'px) translate(-50%,-50%)';
  }, {passive:true});
  (function loop(){
    rx += (mx - rx) * .16; ry += (my - ry) * .16;
    ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px) translate(-50%,-50%)';
    requestAnimationFrame(loop);
  })();
  document.addEventListener('mouseover', function(e){
    if(e.target.closest('a,button,.frame,.phase,input,select,textarea,.prow')) ring.classList.add('big');
  });
  document.addEventListener('mouseout', function(e){
    if(e.target.closest('a,button,.frame,.phase,input,select,textarea,.prow')) ring.classList.remove('big');
  });
}

/* ---------- REVEALS ---------- */
function revealAll(){
  $$('.rv,.ml').forEach(function(el){ el.classList.add('in'); });
}
if(!reduced && 'IntersectionObserver' in window){
  var io = new IntersectionObserver(function(es){
    es.forEach(function(en){
      if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, {threshold:.12, rootMargin:'0px 0px -8% 0px'});
  $$('.rv,.ml').forEach(function(el){ io.observe(el); });
  /* hero masked lines get .in on load */
  $$('.stage-h .ml').forEach(function(el,i){
    el.style.transitionDelay = (.15 + i * .12) + 's';
    setTimeout(function(){ el.classList.add('in'); }, 60);
  });
  /* fallback: guarantee hero copy settles even if timers were throttled */
  setTimeout(function(){
    $$('.stage-h .ml').forEach(function(el){ el.classList.add('in'); });
  }, 2600);
}else{ revealAll(); }
/* engine alive: cancel the no-JS boot guard fallback */
window.__bnsBoot = true;

/* staged children */
if(!reduced && 'IntersectionObserver' in window){
  var so = new IntersectionObserver(function(es){
    es.forEach(function(en){
      if(!en.isIntersecting) return;
      $$('[data-stagger]', en.target).forEach(function(ch, i){
        ch.style.setProperty('--d', (i * .09) + 's');
        ch.classList.add('in');
      });
      so.unobserve(en.target);
    });
  }, {threshold:.1});
  $$('[data-stagger-group]').forEach(function(g){ so.observe(g); });
}else{
  $$('[data-stagger]').forEach(function(ch){ ch.classList.add('in'); });
}

/* ---------- PHASE READOUT (hero) ---------- */
var phases = $$('.phase');
var pIdx = 0, pTimer = null;
function setPhase(i){
  pIdx = i % Math.max(phases.length, 1);
  phases.forEach(function(p, k){
    p.classList.remove('on');
    if(k === pIdx){ void p.offsetWidth; p.classList.add('on'); }
  });
}
if(phases.length && !reduced){
  setPhase(0);
  pTimer = setInterval(function(){ setPhase(pIdx + 1); }, 3200);
}else if(phases.length){ setPhase(0); }

/* ---------- SYSTEM PROGRESS + PROCESS LIT ---------- */
function litOnScroll(){
  var bar = $('#sysprog');
  if(bar){
    var r = bar.getBoundingClientRect();
    var vh = window.innerHeight;
    var p = Math.min(Math.max((vh * .85 - r.top) / (vh * .6), 0), 1);
    bar.firstElementChild.style.width = (p * 100) + '%';
  }
  var rail = $('#prail');
  if(rail){
    var steps = $$('.pstep', rail);
    var rr = rail.getBoundingClientRect();
    var q = Math.min(Math.max((window.innerHeight * .8 - rr.top) / (rr.height || 1), 0), 1);
    var n = Math.ceil(q * steps.length);
    steps.forEach(function(s, i){ s.classList.toggle('lit', i < n); });
    var l = $('#prailline');
    if(l) l.style.width = (q * 100) + '%';
  }
}
window.addEventListener('scroll', function(){
  if(!tick){ requestAnimationFrame(function(){ litOnScroll(); tick = false; }); tick = true; }
}, {passive:true});
litOnScroll();

/* ---------- SVG FIGURE ANIMATION ---------- */
function drawFigure(box){
  var id = box.id || '';
  $$('.draw', box).forEach(function(el, i){
    try{
      var L = el.getTotalLength();
      el.style.strokeDasharray = L; el.style.strokeDashoffset = L;
      el.style.transition = 'stroke-dashoffset 1s cubic-bezier(.22,1,.36,1) ' + (i * .12) + 's';
      requestAnimationFrame(function(){ el.style.strokeDashoffset = '0'; });
    }catch(e){}
  });
  $$('.pop', box).forEach(function(el, i){
    el.style.opacity = '0'; el.style.transition = 'opacity .6s ease ' + (.2 + i * .1) + 's';
    requestAnimationFrame(function(){ requestAnimationFrame(function(){ el.style.opacity = '1'; }); });
  });
}
if(!reduced && 'IntersectionObserver' in window){
  var fo = new IntersectionObserver(function(es){
    es.forEach(function(en){
      if(en.isIntersecting){ drawFigure(en.target); fo.unobserve(en.target); }
    });
  }, {threshold:.3});
  $$('.frame').forEach(function(f){ fo.observe(f); });
}

/* ---------- ASSEMBLY 3D (phased: scatter → build → connect → expand) ---------- */
var canvas = $('#stage3d');
if(canvas && typeof THREE !== 'undefined' && !reduced){
  initAssembly();
}else if(canvas){
  canvas.style.background = 'transparent';
}
function initAssembly(){
  try{
    var holder = canvas.parentElement;
    var isMobile = window.innerWidth < 768;
    var W = holder.clientWidth || window.innerWidth;
    var H = holder.clientHeight || window.innerHeight;
    var scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0c0c10, 22, 46);
    var camera = new THREE.PerspectiveCamera(44, W / H, .1, 120);
    camera.position.set(0, 3.2, 19);
    var renderer = new THREE.WebGLRenderer({canvas:canvas, alpha:true, antialias:!isMobile});
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.2 : 1.7));
    renderer.setClearColor(0x000000, 0);

    scene.add(new THREE.AmbientLight(0xffffff, .55));
    var key = new THREE.DirectionalLight(0xffffff, .8);
    key.position.set(6, 10, 8); scene.add(key);
    var cobaltL = new THREE.PointLight(0x2e4bff, 1.1, 34);
    cobaltL.position.set(-4, 4, 6); scene.add(cobaltL);
    var limeL = new THREE.PointLight(0xc6f24e, .55, 16);
    limeL.position.set(5, 1, 2); scene.add(limeL);

    var sys = new THREE.Group(); scene.add(sys);
    function M(c, o){
      o = o || {};
      return new THREE.MeshStandardMaterial({color:c, roughness:o.r!==undefined?o.r:.55,
        metalness:o.m!==undefined?o.m:.3, transparent:!!o.t, opacity:o.o!==undefined?o.o:1,
        emissive:o.e||0x000000, emissiveIntensity:o.ei||0});
    }
    var mGraphite = M(0x232329,{r:.5,m:.45});
    var mPanel   = M(0x2b2b33,{r:.4,m:.5});
    var mCobalt  = M(0x2e4bff,{r:.35,m:.3,e:0x2e4bff,ei:.25});
    var mLime    = M(0xc6f24e,{r:.4,m:.2,e:0xc6f24e,ei:.5});
    var mSilver  = M(0xb9bdc7,{r:.5,m:.4});
    var mCopper  = M(0xc07a45,{r:.35,m:.55,e:0xc07a45,ei:.2});
    var edgeCob  = new THREE.LineBasicMaterial({color:0x5b74ff, transparent:true, opacity:.55});
    var edgeLime = new THREE.LineBasicMaterial({color:0xc6f24e, transparent:true, opacity:.7});

    /* floor grid */
    var grid = new THREE.GridHelper(isMobile?26:40, isMobile?26:40, 0x2e4bff, 0x23232b);
    grid.position.y = -3.4; grid.material.transparent = true; grid.material.opacity = .35;
    sys.add(grid);

    var TX = isMobile ? [0,0,0] : [-6.6, 0, 6.6];
    var TZ = isMobile ? [-1,-3.4,-5.6] : [0,-1.1,-2.2];

    /* BUILD: interface fragments that fly together */
    var build = new THREE.Group(); build.position.set(TX[0], 0, TZ[0]); sys.add(build);
    var slabs = [];
    var slabDefs = isMobile
      ? [{s:[3.2,.5,2],y:-2.3},{s:[3.2,1,2],y:-1.3},{s:[3.2,.45,2],y:-.2}]
      : [{s:[3.6,.5,2.2],y:-2.3},{s:[3.6,1.1,2.2],y:-1.3},{s:[1.65,1,2.2],y:-.2,x:-.95},{s:[1.65,1,2.2],y:-.2,x:.95},{s:[3.6,.42,2.2],y:.85}];
    slabDefs.forEach(function(d,i){
      var m = new THREE.Mesh(new THREE.BoxGeometry(d.s[0],d.s[1],d.s[2]), i===slabDefs.length-1?mCobalt:(i%2?mPanel:mGraphite));
      var sx = (d.x||0) + (i%2? 9 : -9), sy2 = d.y - 4 - i;
      m.position.set(sx, sy2, 3);
      m.rotation.set(.6,.5,.3);
      m.userData = {tx:d.x||0, ty:d.y, sx:sx, sy:sy2, dl:.3+i*.3};
      m.add(new THREE.LineSegments(new THREE.EdgesGeometry(m.geometry), edgeCob));
      build.add(m); slabs.push(m);
    });
    /* floating interface fragments */
    var frags = [];
    for(var f=0; f<(isMobile?3:5); f++){
      var fg = new THREE.PlaneGeometry(1.5,.9);
      var fm = new THREE.Mesh(fg, M(0x2e4bff,{t:true,o:.1,r:.3,m:.2}));
      fm.add(new THREE.LineSegments(new THREE.EdgesGeometry(fg), edgeCob));
      fm.position.set(TX[0]+(f-2)*1.1, 1.6+(f%2), -1-f*.3);
      fm.userData = {p:f*.9, y:fm.position.y};
      build.add(fm); frags.push(fm);
    }

    /* NAVIGATE: hub + links + orbiters */
    var navG = new THREE.Group(); navG.position.set(TX[1], .3, TZ[1]); sys.add(navG);
    var hub = new THREE.Mesh(new THREE.CylinderGeometry(.9,.9,.5,6), mCobalt);
    hub.position.y = -6; hub.userData = {ty:-.5, dl:2.4};
    navG.add(hub);
    var ring = new THREE.Mesh(new THREE.TorusGeometry(1.5,.04,10,56), M(0xc6f24e,{e:0xc6f24e,ei:.6}));
    ring.rotation.x = Math.PI/2; ring.position.y = -.5; ring.material.transparent = true; ring.material.opacity = 0;
    navG.add(ring);
    var sats = [], links = [];
    var nS = isMobile?4:6;
    for(var s=0;s<nS;s++){
      var a = (s/nS)*Math.PI*2+.4, R = isMobile?2.3:2.9;
      var sm = new THREE.Mesh(new THREE.OctahedronGeometry(.3), s%2?mSilver:mCopper);
      sm.userData = {a:a, R:R, y:-.5+(s%2)*.5, sp:.14+(s%3)*.035};
      sm.position.set(Math.cos(a)*R*1.8, -4, Math.sin(a)*R);
      navG.add(sm); sats.push(sm);
      var lg = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0,-.5,0), new THREE.Vector3(Math.cos(a)*R, sm.userData.y, Math.sin(a)*R*.55)]);
      var ln = new THREE.Line(lg, new THREE.LineBasicMaterial({color:0x5b74ff, transparent:true, opacity:0}));
      ln.userData = {dl:3 + s*.18};
      navG.add(ln); links.push(ln);
    }

    /* SCALE: ascender tower + copper rail */
    var tower = new THREE.Group(); tower.position.set(TX[2], 0, TZ[2]); sys.add(tower);
    var steps = [];
    var nSt = isMobile?3:4;
    for(var k=0;k<nSt;k++){
      var h = .9+k*.9;
      var st = new THREE.Mesh(new THREE.BoxGeometry(1.15,h,1.15), k===nSt-1?mCopper:(k%2?mGraphite:mPanel));
      st.position.set((k-(nSt-1)/2)*1.35, -7, 0);
      st.userData = {ty:-2.9+h/2, dl:4.4+k*.32, p:k};
      st.add(new THREE.LineSegments(new THREE.EdgesGeometry(st.geometry), k===nSt-1?edgeLime:edgeCob));
      tower.add(st); steps.push(st);
    }
    var rail = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-2.4,-2.2,0), new THREE.Vector3(2.4,2.7,0)]),
      new THREE.LineBasicMaterial({color:0xc07a45, transparent:true, opacity:0}));
    rail.userData = {dl:5.6}; tower.add(rail);

    /* data packets travelling build → scale */
    var path = isMobile
      ? new THREE.CatmullRomCurve3([new THREE.Vector3(0,-1,-1), new THREE.Vector3(0,.4,-3.4), new THREE.Vector3(0,1.8,-5.6)])
      : new THREE.CatmullRomCurve3([new THREE.Vector3(-6.6,-.5,0), new THREE.Vector3(-3,.3,-.5), new THREE.Vector3(0,.9,-1.1), new THREE.Vector3(3.4,1.3,-1.7), new THREE.Vector3(6.6,2.5,-2.2)]);
    var packets = [];
    for(var pk=0; pk<3; pk++){
      var pm = new THREE.Mesh(new THREE.SphereGeometry(pk===0?.2:.12, 14, 14), mLime);
      pm.material.transparent = true; pm.material.opacity = 0;
      pm.userData = {off:pk/3};
      sys.add(pm); packets.push(pm);
    }
    var trail = new THREE.Line(new THREE.BufferGeometry().setFromPoints(path.getPoints(70)),
      new THREE.LineBasicMaterial({color:0xc6f24e, transparent:true, opacity:0}));
    sys.add(trail);

    /* dust: restrained */
    var dn = isMobile?50:110, dp = new Float32Array(dn*3);
    for(var d=0; d<dn; d++){ dp[d*3]=(Math.random()-.5)*30; dp[d*3+1]=Math.random()*9-3.5; dp[d*3+2]=Math.random()*-14-1; }
    var dg = new THREE.BufferGeometry(); dg.setAttribute('position', new THREE.BufferAttribute(dp,3));
    var dust = new THREE.Points(dg, new THREE.PointsMaterial({color:0x5b74ff, size:.05, transparent:true, opacity:.45}));
    sys.add(dust);

    var tMX=0,tMY=0,mX=0,mY=0;
    if(!isMobile){
      document.addEventListener('mousemove', function(e){
        tMX = (e.clientX/window.innerWidth-.5)*2; tMY = (e.clientY/window.innerHeight-.5)*2;
      }, {passive:true});
    }
    function ez(x){ return 1-Math.pow(1-x,3); }
    var clock = new THREE.Clock();
    var t0 = performance.now()/1000, running = true;
    function phase(el){ return (performance.now()/1000 - t0 - el) / 1.1; }

    function animate(){
      if(!running) return;
      requestAnimationFrame(animate);
      var t = clock.getElapsedTime();
      var sy = window.scrollY || 0;
      mX += (tMX-mX)*.04; mY += (tMY-mY)*.04;

      slabs.forEach(function(m){
        var p = phase(m.userData.dl);
        if(p<=0){ m.position.set(m.userData.sx, m.userData.sy, 3); }
        else if(p>=1){ m.position.set(m.userData.tx, m.userData.ty + Math.sin(t*.7+m.userData.dl)*.05, 0); m.rotation.set(0, Math.sin(t*.25+m.userData.dl)*.06, 0); }
        else{ var e=ez(p); m.position.set(m.userData.sx+(m.userData.tx-m.userData.sx)*e, m.userData.sy+(m.userData.ty-m.userData.sy)*e, 3*(1-e)); m.rotation.x*=.96; m.rotation.y*=.96; }
      });
      frags.forEach(function(fm,i){
        fm.position.y = fm.userData.y + Math.sin(t*.8+fm.userData.p)*.22;
        fm.rotation.y = Math.sin(t*.3+i)*.35;
      });
      var hp = phase(hub.userData.dl);
      hub.position.y = hp<=0 ? -6 : (hp>=1 ? hub.userData.ty + Math.sin(t*.8)*.05 : -6+(hub.userData.ty+6)*ez(hp));
      hub.rotation.y = t*.4;
      ring.material.opacity = Math.max(0, Math.min(1, (performance.now()/1000-t0-3.4)))*(.55+Math.sin(t*1.4)*.2);
      ring.rotation.z = t*.25;
      sats.forEach(function(sm,i){
        var a = sm.userData.a + t*sm.userData.sp;
        var want = Math.max(0, Math.min(1, (performance.now()/1000-t0-3-sm.userData.sp*4)));
        var rr = sm.userData.R*(1.8-.8*ez(Math.min(1,want*1.4)));
        sm.position.x = Math.cos(a)*rr;
        sm.position.z = Math.sin(a)*sm.userData.R*.55;
        sm.position.y += ((sm.userData.y + Math.sin(t*.9+i)*.1) - sm.position.y)*.04;
        sm.rotation.y = t*.6+i;
      });
      links.forEach(function(ln){
        var p = (performance.now()/1000-t0-ln.userData.dl)/.9;
        ln.material.opacity = p<=0?0:(p>=1?.45:.45*p);
      });
      steps.forEach(function(st){
        var p = phase(st.userData.dl);
        if(p<=0) st.position.y = -7;
        else if(p>=1) st.position.y = st.userData.ty + Math.sin(t*.7+st.userData.p)*.04;
        else st.position.y = -7 + (st.userData.ty+7)*ez(p);
      });
      var rp = (performance.now()/1000-t0-rail.userData.dl)/1.1;
      rail.material.opacity = rp<=0?0:(rp>=1?.8:.8*rp);
      var tp = (performance.now()/1000-t0-4.8)/1;
      trail.material.opacity = tp<=0?0:(tp>=1?.32:.32*tp);
      packets.forEach(function(pm){
        var lt = (t*.11 + pm.userData.off) % 1;
        pm.position.copy(path.getPointAt(lt));
        pm.material.opacity = tp<=0?0:.95;
        var sc = pm.userData.off===0?1+Math.sin(t*5)*.18:1;
        pm.scale.setScalar(sc);
      });
      limeL.position.copy(path.getPointAt((t*.11)%1));

      sys.rotation.y = Math.sin(t*.08)*.05 + mX*.12;
      sys.rotation.x = mY*-.05;
      dust.rotation.y = t*.008;

      /* scroll: expand + dolly */
      var HH = H || window.innerHeight;
      var sp = Math.min(Math.max(sy/HH,0),1);
      if(!isMobile){
        build.position.z = TZ[0] + sp*2.4;
        tower.position.z = TZ[2] - sp*2.4;
        tower.position.y = sp*1.4; build.position.y = sp*-1.2;
        camera.position.z = 19 + sp*5.5;
        camera.position.y = 3.2 + sp*2.2;
      }
      camera.position.x = mX*1.4;
      camera.lookAt(mX*.8, .2+sp*.6, -2);

      /* hero copy yields */
      var hc = document.querySelector('.stage-main');
      if(hc && HH){
        var fp = Math.min(Math.max((sy-HH*.25)/(HH*.55),0),1);
        hc.style.opacity = String(1-fp*.8);
        hc.style.transform = 'translateY('+(fp*44).toFixed(1)+'px)';
      }
      renderer.render(scene, camera);
    }
    animate();
    window.addEventListener('resize', function(){
      var nw = holder.clientWidth||window.innerWidth, nh = holder.clientHeight||window.innerHeight;
      camera.aspect = nw/nh; camera.updateProjectionMatrix(); renderer.setSize(nw,nh);
    }, {passive:true});
    var heroSec = document.querySelector('.stage');
    if(heroSec && 'IntersectionObserver' in window){
      var co = new IntersectionObserver(function(es){
        es.forEach(function(en){
          if(!en.isIntersecting && en.boundingClientRect.top<0) running = false;
          else if(en.isIntersecting && !running){ running = true; clock.getDelta(); animate(); }
        });
      }, {threshold:0});
      co.observe(heroSec);
    }
    /* pause when tab hidden (performance) */
    document.addEventListener('visibilitychange', function(){
      if(document.hidden){ running = false; }
      else if(!running){ running = true; clock.getDelta(); animate(); }
    });
  }catch(err){ if(window.console) console.warn('assembly:', err); }
}

/* ---------- CONTACT FORM (truthful: compose email, never fake-send) ---------- */
var cform = $('#cform');
if(cform){
  cform.addEventListener('submit', function(e){
    e.preventDefault();
    var ok = $('#fok'), err = $('#ferr'), go = $('#fgo');
    if(ok) ok.style.display = 'none';
    if(err) err.style.display = 'none';
    function val(id){ var el = document.getElementById(id); return el ? el.value.trim() : ''; }
    var name = val('fname'), email = val('femail'), co = val('fco'),
        svc = val('fservice'), msg = val('fmsg');
    var budgetEl = document.getElementById('fbudget');
    var budget = budgetEl ? budgetEl.options[budgetEl.selectedIndex].text : '';
    var consentEl = document.getElementById('fconsent');
    var consent = consentEl ? consentEl.checked : false;
    function fail(m){
      if(!err) return;
      err.style.display = 'flex';
      err.querySelector('span').textContent = m;
      err.scrollIntoView({behavior: reduced ? 'auto' : 'smooth', block:'center'});
    }
    if(!name || !email || !svc || !msg || !consent){ fail('Fill every required field, pick a project type, and tick consent.'); return; }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ fail('That email doesn\'t look right — check it and try again.'); return; }
    var subject = encodeURIComponent('Project enquiry — ' + svc + ' — ' + name);
    var body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\nBusiness: ' + (co || '—') + '\nProject type: ' + svc + '\nBudget: ' + (budget || 'Prefer to discuss') + '\n\n' + msg);
    if(go) go.href = 'mailto:buildnavigatescale@gmail.com?subject=' + subject + '&body=' + body;
    if(ok){
      ok.style.display = 'flex';
      ok.scrollIntoView({behavior: reduced ? 'auto' : 'smooth', block:'center'});
    }
    cform.reset();
  });
}
})();
