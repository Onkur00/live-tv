/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RawChannelData, EnhancedChannel } from './types.ts';

export const rawChannels: RawChannelData[] = [
  { tvgId: "EkusheyTV", tvgName: "Ekushey TV", tvgLogo: "https://s4.gifyu.com/images/image534fa27d7683f33d.png", groupTitle: "Akash Go", url: "http://210.4.72.204/hls-live/livepkgr/_definst_/liveevent/livestream3.m3u8" },
  { tvgId: "DeeptoTV", tvgName: "Deepto TV", tvgLogo: "https://upload.wikimedia.org/wikipedia/en/3/31/Deepto_TV_logo.png", groupTitle: "Akash Go", url: "https://byphdgllyk.gpcdn.net/hls/deeptotv/0_1/index.m3u8" },
  { tvgId: "DesheBideshe", tvgName: "Deshe Bideshe", tvgLogo: "https://pbs.twimg.com/profile_images/739539785304281088/zMwNO936_400x400.jpg", groupTitle: "BANGLA", url: "https://dbcanada.sonarbanglatv.com/deshebideshe/dbtv/index.m3u8" },
  { tvgId: "BBCNews", tvgName: "BBC News", tvgLogo: "https://seeklogo.com/images/B/bbc-news-logo-8648ABD044-seeklogo.com.png", groupTitle: "Akash Go", url: "https://cdn4.skygo.mn/live/disk1/BBC_News/HLSv3-FTA/BBC_News-avc1_3000000=8-mp4a_208000_eng=2.m3u8" },
  { tvgId: "MUSICBANGLA", tvgName: "MUSIC BANGLA", tvgLogo: "https://static.wikia.nocookie.net/logopedia/images/7/75/Music_Bangla_new.jpeg", groupTitle: "Bangla", url: "http://live.matribhumitv.com/music-bangla/index.m3u8" },
  { tvgId: "deshitv.bd", tvgName: "MY TV", tvgLogo: "https://raw.githubusercontent.com/subirkumarpaul/Logo/main/My%20TV.svg.png", groupTitle: "Bangla", url: "https://mytvbangla.com/0.m3u8" },
  { tvgId: "MAASRANGA.bd", tvgName: "MAASRANGA HD", tvgLogo: "https://static.wikia.nocookie.net/etv-gspn-bangla/images/a/a3/Maasranga_TV_HD_logo.png", groupTitle: "Bangla", url: "http://mtv.sunplex.live/MAASRANGA-TV/index.m3u8" },
  { tvgId: "98000", tvgName: "Somoy TV", tvgLogo: "https://tstatic.akash-go.com/cms-ui/images/custom-content/1735560559088.png", groupTitle: "News", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1702/output/index.m3u8" },
  { tvgId: "97000", tvgName: "Jamuna TV", tvgLogo: "https://tstatic.akash-go.com/cms-ui/images/custom-content/1735560213832.png", groupTitle: "News", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1701/output/index.m3u8" },
  { tvgId: "185000", tvgName: "DBC News HD", tvgLogo: "https://tstatic.akash-go.com/cms-ui/images/custom-content/1770186306600.png", groupTitle: "News", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1728/output/index.m3u8" },
  { tvgId: "229000", tvgName: "Maasranga TV", tvgLogo: "https://tstatic.akash-go.com/cms-ui/images/custom-content/1773680325498.png", groupTitle: "Entertainment", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1722/output/index.m3u8" },
  { tvgId: "102000", tvgName: "Ekattor HD", tvgLogo: "https://tstatic.akash-go.com/cms-ui/images/custom-content/1739963327549.png", groupTitle: "News", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1705/output/index.m3u8" },
  { tvgId: "94000", tvgName: "Channel 24 HD", tvgLogo: "https://tstatic.akash-go.com/cms-ui/images/custom-content/1735556516924.png", groupTitle: "News", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1703/output/index.m3u8" },
  { tvgId: "93000", tvgName: "ATN News", tvgLogo: "https://tstatic.akash-go.com/cms-ui/images/custom-content/1739962961772.png", groupTitle: "News", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1706/output/index.m3u8" },
  { tvgId: "186000", tvgName: "News 24 HD", tvgLogo: "https://tstatic.akash-go.com/cms-ui/images/custom-content/1770186895850.png", groupTitle: "News", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1708/output/index.m3u8" },
  { tvgId: "191000", tvgName: "Star News", tvgLogo: "https://tstatic.akash-go.com/cms-ui/images/custom-content/1770189826301.png", groupTitle: "News", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1710/output/index.m3u8" },
  { tvgId: "223000", tvgName: "Islamic TV", tvgLogo: "https://tstatic.akash-go.com/cms-ui/images/custom-content/1772728412891.png", groupTitle: "Infotainment", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1724/output/index.m3u8" },
  { tvgId: "134000", tvgName: "Deepto TV HD", tvgLogo: "https://tstatic.akash-go.com/cms-ui/images/custom-content/1742713000749.png", groupTitle: "Entertainment", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1711/output/index.m3u8" },
  { tvgId: "188000", tvgName: "Channel 9 HD", tvgLogo: "https://tstatic.akash-go.com/cms-ui/images/custom-content/1770188008067.png", groupTitle: "Entertainment", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1729/output/index.m3u8" },
  { tvgId: "141000", tvgName: "SRK TV", tvgLogo: "https://tstatic.akash-go.com/cms-ui/images/custom-content/1746005940155.png", groupTitle: "Entertainment", url: "https://srknowapp.ncare.live/srktvhlswodrm/srktv.stream/playlist.m3u8" },
  { tvgId: "132000", tvgName: "Channel I HD", tvgLogo: "https://tstatic.akash-go.com/cms-ui/images/custom-content/1740567626692.png", groupTitle: "Entertainment", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1723/output/index.m3u8" },
  { tvgId: "197000", tvgName: "Cineedge HD", tvgLogo: "https://tstatic.akash-go.com/cms-ui/images/custom-content/1770347851305.png", groupTitle: "Movies", url: "https://nomawnoijl.gpcdn.net/akash/cineedge/playlist.m3u8" },
  { tvgId: "196000", tvgName: "Uniques HD", tvgLogo: "https://tstatic.akash-go.com/cms-ui/images/custom-content/1770347327658.png", groupTitle: "Movies", url: "https://nomawnoijl.gpcdn.net/akash/uniques/playlist.m3u8" },
  { tvgId: "198000", tvgName: "Superrix HD", tvgLogo: "https://tstatic.akash-go.com/cms-ui/images/custom-content/1770348388925.png", groupTitle: "Movies", url: "https://nomawnoijl.gpcdn.net/akash/superrix/playlist.m3u8" },
  { tvgId: "100000", tvgName: "Bangla Vision", tvgLogo: "https://tstatic.akash-go.com/cms-ui/images/custom-content/1735561344354.png", groupTitle: "Entertainment", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1715/output/index.m3u8" },
  { tvgId: "99000", tvgName: "NTV", tvgLogo: "https://tstatic.akash-go.com/cms-ui/images/custom-content/1735560841094.png", groupTitle: "Entertainment", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1716/output/index.m3u8" },
  { tvgId: "192000", tvgName: "Screem", tvgLogo: "https://tstatic.akash-go.com/cms-ui/images/custom-content/1770312098339.png", groupTitle: "Movies", url: "https://nomawnoijl.gpcdn.net/akash/screem/playlist.m3u8" },
  { tvgId: "205000", tvgName: "Sports Legends", tvgLogo: "https://tstatic.akash-go.com/cms-ui/images/custom-content/1770377900139.png", groupTitle: "Sports", url: "https://nomawnoijl.gpcdn.net/akash/sportslegends/playlist.m3u8" },
  { tvgId: "206000", tvgName: "Flash Guys HD", tvgLogo: "https://tstatic.akash-go.com/cms-ui/images/custom-content/1770378074527.png", groupTitle: "Sports", url: "https://nomawnoijl.gpcdn.net/akash/flashguys/playlist.m3u8" },
  { tvgId: "212000", tvgName: "BuddyStar HD", tvgLogo: "https://tstatic.akash-go.com/cms-ui/images/custom-content/1770379038530.png", groupTitle: "Kids", url: "https://nomawnoijl.gpcdn.net/akash/buddystar/playlist.m3u8" },
  { tvgId: "209000", tvgName: "Luxel HD", tvgLogo: "https://tstatic.akash-go.com/cms-ui/images/custom-content/1770378560772.png", groupTitle: "Infotainment", url: "https://nomawnoijl.gpcdn.net/akash/luxell/playlist.m3u8" },
  { tvgId: "211000", tvgName: "Joy", tvgLogo: "https://tstatic.akash-go.com/cms-ui/images/custom-content/1770378874717.png", groupTitle: "Kids", url: "https://nomawnoijl.gpcdn.net/akash/joy/playlist.m3u8" },
  { tvgId: "213000", tvgName: "Funny Junior HD", tvgLogo: "https://tstatic.akash-go.com/cms-ui/images/custom-content/1770379573329.png", groupTitle: "Kids", url: "https://nomawnoijl.gpcdn.net/akash/funnyjunior/playlist.m3u8" },
  { tvgId: "214000", tvgName: "Crimes", tvgLogo: "https://tstatic.akash-go.com/cms-ui/images/custom-content/1770380126540.png", groupTitle: "Movies", url: "https://nomawnoijl.gpcdn.net/akash/crimes/playlist.m3u8" },
  { tvgId: "215000", tvgName: "True Stories", tvgLogo: "https://tstatic.akash-go.com/cms-ui/images/custom-content/1770380306806.png", groupTitle: "Movies", url: "https://nomawnoijl.gpcdn.net/akash/truestories/playlist.m3u8" },
  { tvgId: "216000", tvgName: "Intelligence", tvgLogo: "https://tstatic.akash-go.com/cms-ui/images/custom-content/1770380460488.png", groupTitle: "Movies", url: "https://nomawnoijl.gpcdn.net/akash/intelligence/playlist.m3u8" },
  { tvgId: "217000", tvgName: "Sports Range", tvgLogo: "https://tstatic.akash-go.com/cms-ui/images/custom-content/1770380601958.png", groupTitle: "Sports", url: "https://nomawnoijl.gpcdn.net/akash/sportrange/playlist.m3u8" },
  { tvgId: "218000", tvgName: "Thunder Er", tvgLogo: "https://tstatic.akash-go.com/cms-ui/images/custom-content/1770380791303.png", groupTitle: "Sports", url: "https://nomawnoijl.gpcdn.net/akash/thunder/playlist.m3u8" },
  { tvgId: "219000", tvgName: "Fighters", tvgLogo: "https://tstatic.akash-go.com/cms-ui/images/custom-content/1770380942670.png", groupTitle: "Sports", url: "https://nomawnoijl.gpcdn.net/akash/fighter/playlist.m3u8" },
  { tvgId: "220000", tvgName: "Smarty", tvgLogo: "https://tstatic.akash-go.com/cms-ui/images/custom-content/1770381107924.png", groupTitle: "Kids", url: "https://nomawnoijl.gpcdn.net/akash/smarty/playlist.m3u8" },
  { tvgId: "221000", tvgName: "Lucky Family", tvgLogo: "https://tstatic.akash-go.com/cms-ui/images/custom-content/1770381248531.png", groupTitle: "Kids", url: "https://nomawnoijl.gpcdn.net/akash/luckyfamily/playlist.m3u8" },
  { tvgId: "222000", tvgName: "Kids Stars", tvgLogo: "https://tstatic.akash-go.com/cms-ui/images/custom-content/1770381398090.png", groupTitle: "Kids", url: "https://nomawnoijl.gpcdn.net/akash/kidsstars/playlist.m3u8" },
  { tvgId: "240000", tvgName: "BTV", tvgLogo: "https://tstatic.akash-go.com/cms-ui/images/custom-content/1778082545894.png", groupTitle: "Entertainment", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1709/output/index.m3u8" },
  { tvgId: "169000", tvgName: "Al Jazeera", tvgLogo: "https://tstatic.akash-go.com/cms-ui/images/custom-content/1777454219313.png", groupTitle: "News", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1721/output/index.m3u8" },
  { tvgId: "241000", tvgName: "Party Universe", tvgLogo: "https://tstatic.akash-go.com/cms-ui/images/custom-content/1778083145889.png", groupTitle: "Music", url: "https://nomawnoijl.gpcdn.net/akash/partyuniverse/playlist.m3u8" },
  { tvgId: "245000", tvgName: "Al Quran", tvgLogo: "https://tstatic.akash-go.com/cms-ui/images/custom-content/1778086065071.png", groupTitle: "Infotainment", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1713/output/index.m3u8" },
  { tvgId: "247000", tvgName: "Independent TV", tvgLogo: "https://tstatic.akash-go.com/cms-ui/images/custom-content/1778087037971.png", groupTitle: "News", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1704/output/index.m3u8" },
  { tvgId: "242000", tvgName: "Nikki", tvgLogo: "https://tstatic.akash-go.com/cms-ui/images/custom-content/1778083459294.png", groupTitle: "Kids", url: "https://nomawnoijl.gpcdn.net/akash/nikky/playlist.m3u8" },
  { tvgId: "243000", tvgName: "Originals", tvgLogo: "https://tstatic.akash-go.com/cms-ui/images/custom-content/1778085327477.png", groupTitle: "Movies", url: "https://nomawnoijl.gpcdn.net/akash/originals/playlist.m3u8" },
  { tvgId: "244000", tvgName: "Crazy Ex", tvgLogo: "https://tstatic.akash-go.com/cms-ui/images/custom-content/1778085745609.png", groupTitle: "Sports", url: "https://nomawnoijl.gpcdn.net/akash/crazy_ex/playlist.m3u8" },
  { tvgId: "246000", tvgName: "Delicious", tvgLogo: "https://tstatic.akash-go.com/cms-ui/images/custom-content/1778086478755.png", groupTitle: "Infotainment", url: "https://nomawnoijl.gpcdn.net/akash/delicious/playlist.m3u8" }
];

export const enhancedChannels: EnhancedChannel[] = rawChannels.map(ch => {
  const mapping: { [key: string]: string } = {
    "Bangla": "bangla",
    "BANGLA": "bangla",
    "News": "news",
    "Sports": "sports",
    "Kids": "kids",
    "Hindi": "hindi",
    "English": "english"
  };

  const category = mapping[ch.groupTitle] || ch.groupTitle.toLowerCase();

  return {
    id: ch.tvgId,
    name: ch.tvgName,
    short: ch.tvgName.split(' ')[0],
    url: ch.url,
    category,
    logoUrl: ch.tvgLogo,
    groupTitle: ch.groupTitle,
    original: ch
  };
});
