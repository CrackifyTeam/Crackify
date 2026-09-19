import React,{useEffect,useState} from 'react';
import {createRoot} from 'react-dom/client';
import './style.css';

const songs=[
 {id:1,title:'Midnight Drive',artist:'Demo Artist',album:'After Dark',cover:'https://picsum.photos/seed/midnight/700/700',duration:'3:42'},
 {id:2,title:'Neon Skies',artist:'Demo Artist',album:'City Lights',cover:'https://picsum.photos/seed/neon/700/700',duration:'3:18'},
 {id:3,title:'Golden Hour',artist:'Demo Artist',album:'Summer Tape',cover:'https://picsum.photos/seed/golden/700/700',duration:'2:56'},
 {id:4,title:'Lost Again',artist:'Demo Artist',album:'Late Nights',cover:'https://picsum.photos/seed/lost/700/700',duration:'4:04'},
 {id:5,title:'Ocean Eyes',artist:'Demo Artist',album:'Blue',cover:'https://picsum.photos/seed/ocean/700/700',duration:'3:27'}
];

function Icon({children}){return <span className="ico">{children}</span>}
function App(){
 const [tab,setTab]=useState('home'),[current,setCurrent]=useState(songs[0]),[playing,setPlaying]=useState(false),[query,setQuery]=useState(''),[liked,setLiked]=useState([]),[installed,setInstalled]=useState(false);
 useEffect(()=>{ if('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(()=>{}); },[]);
 const filtered=songs.filter(s=>(s.title+' '+s.artist+' '+s.album).toLowerCase().includes(query.toLowerCase()));
 const play=(s)=>{setCurrent(s);setPlaying(true)};
 return <div className="app">
   <header><div className="brand"><span className="brandDot"></span>SpotLite</div><button className="avatar">M</button></header>
   <main>
    {tab==='home'&&<Home play={play} current={current} setTab={setTab} installed={installed} setInstalled={setInstalled}/>}
    {tab==='search'&&<Search query={query} setQuery={setQuery} songs={filtered} play={play}/>}
    {tab==='library'&&<Library liked={liked} songs={songs} play={play}/>}
    {tab==='profile'&&<Profile/>}
   </main>
   <div className="mini" onClick={()=>setPlaying(true)}><img src={current.cover}/><div><b>{current.title}</b><small>{current.artist}</small></div><button onClick={e=>{e.stopPropagation();setPlaying(!playing)}}>{playing?'Ⅱ':'▶'}</button></div>
   <nav>{[['home','⌂','Home'],['search','⌕','Suche'],['library','▤','Bibliothek'],['profile','◯','Profil']].map(x=><button className={tab===x[0]?'active':''} onClick={()=>setTab(x[0])} key={x[0]}><Icon>{x[1]}</Icon><small>{x[2]}</small></button>)}</nav>
   {playing&&<Player song={current} playing={playing} setPlaying={setPlaying} liked={liked} setLiked={setLiked}/>}
 </div>
}
function Home({play,setTab,installed,setInstalled}){
 return <section>
  <div className="hero"><div><p className="eyebrow">DEINE MUSIK</p><h1>Guten Tag 👋</h1><p className="muted">Dein cleaner Music Player.</p></div></div>
  <h2>Zuletzt gehört</h2><div className="horizontal">{songs.slice(0,4).map(s=><article className="tile" onClick={()=>play(s)} key={s.id}><img src={s.cover}/><b>{s.title}</b><small>{s.artist}</small></article>)}</div>
  <h2>Deine Playlists</h2><div className="playlist" onClick={()=>setTab('library')}><div className="gradientCover">♫</div><div><b>Meine Playlist</b><small>5 Songs · synchronisiert mit Spotify</small></div><span>›</span></div>
  {!installed&&<button className="install" onClick={()=>setInstalled(true)}>＋ App installieren</button>}
 </section>
}
function Search({query,setQuery,songs,play}){return <section><h1>Suche</h1><input autoFocus value={query} onChange={e=>setQuery(e.target.value)} placeholder="Songs, Künstler, Alben …"/><div className="results">{songs.map(s=><div className="row" onClick={()=>play(s)} key={s.id}><img src={s.cover}/><div><b>{s.title}</b><small>{s.artist} · {s.album}</small></div><span>▶</span></div>)}</div></section>}
function Library({liked,songs,play}){let ls=songs.filter(s=>liked.includes(s.id));return <section><h1>Bibliothek</h1><div className="playlist"><div className="gradientCover">♥</div><div><b>Gefällt mir</b><small>{ls.length} Songs</small></div></div><h2>Playlists</h2><div className="results">{songs.map(s=><div className="row" onClick={()=>play(s)} key={s.id}><img src={s.cover}/><div><b>{s.title}</b><small>{s.artist}</small></div><span>›</span></div>)}</div></section>}
function Profile(){return <section><div className="profileHead"><div className="bigAvatar">M</div><h1>Mein Profil</h1><p className="muted">Spotify nicht verbunden</p><button className="spotify">Mit Spotify verbinden</button></div><div className="stats"><div><b>0</b><small>Follower</small></div><div><b>0</b><small>Folge ich</small></div><div><b>5</b><small>Songs</small></div></div><div className="notice">Spotify OAuth, echte Playlists und Follows werden über deine eigenen API-Zugangsdaten aktiviert. Diese Demo enthält keine fremden Zugangsdaten.</div></section>}
function Player({song,playing,setPlaying,liked,setLiked}){return <div className="player"><button className="close" onClick={()=>setPlaying(false)}>⌄</button><img className="bigCover" src={song.cover}/><div className="playerMeta"><div><h1>{song.title}</h1><p>{song.artist} · {song.album}</p></div><button onClick={()=>setLiked(liked.includes(song.id)?liked.filter(x=>x!==song.id):[...liked,song.id])}>{liked.includes(song.id)?'♥':'♡'}</button></div><div className="bar"><span></span></div><div className="times"><span>0:42</span><span>{song.duration}</span></div><div className="controls"><button>↶</button><button className="play" onClick={()=>setPlaying(!playing)}>{playing?'Ⅱ':'▶'}</button><button>↷</button></div><button className="lyrics">Lyrics　⌃</button><div className="lyricsBox"><p>Lyrics werden hier aus einer lizenzierten Lyrics-Quelle geladen.</p><p className="muted">Demo-Ansicht – keine urheberrechtlich geschützten Songtexte eingebaut.</p></div></div>}
createRoot(document.getElementById('root')).render(<App/>);