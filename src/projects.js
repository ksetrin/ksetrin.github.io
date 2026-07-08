import mebixVideo from './assets/video/mebix_video.mp4';
import mebixPoster from './assets/images/project_preview/mebix_video_poster.jpg';

const previewModules = import.meta.glob('./assets/images/project_preview/*.png', { eager: true, import: 'default' });
const screenshotModules = import.meta.glob('./assets/images/screenshots/**/*.png', { eager: true, import: 'default' });

const preview = (file) => previewModules[`./assets/images/project_preview/${file}`];

const screensFor = (dir) =>
  Object.entries(screenshotModules)
    .filter(([filePath]) => filePath.includes(`/screenshots/${dir}/`))
    .sort((a, b) => a[0].localeCompare(b[0], undefined, { numeric: true }))
    .map(([, url]) => url);

export const projects = [
  {
    key: 'mebix',
    title: 'Mebix',
    year: '2021–2025',
    domain: 'healthcare',
    tech: 'React Native · TypeScript · Redux · Firebase',
    preview: preview('mebix.png'),
    video: mebixVideo,
    videoPoster: mebixPoster,
    screens: screensFor('mebix'),
    links: {
      website: 'https://www.mebix.de/',
      appStore: 'https://apps.apple.com/de/app/mebix-die-diabetes-typ-2-app/id1603216448'
    }
  },
  {
    key: 'tapcar',
    title: 'TapCar',
    year: '2019–2021',
    domain: 'automotive',
    tech: 'React Native · Node.js · BLE · OEM',
    preview: preview('tapcar.png'),
    screens: screensFor('tapcar'),
    links: {
      website: 'https://www.tapcar.no/',
      appStore: 'https://apps.apple.com/no/app/tapcar-bildeling/id1567367431'
    }
  },
  {
    key: 'znaj',
    title: 'Znaj.by',
    year: '2019–2021',
    domain: 'education',
    tech: 'React Native · AWS · Redux',
    preview: preview('znajby.png'),
    screens: screensFor('znaj'),
    links: {
      appStore: 'https://apps.apple.com/by/app/%D0%B7%D0%BD%D0%B0%D0%B9-%D0%B1%D0%B0%D0%B9/id1500741599',
      googlePlay: 'https://play.google.com/store/apps/details?id=by.znaj2'
    }
  },
  {
    key: 'carmix',
    title: 'Apollo CarMix',
    year: '2024',
    domain: 'automotive',
    tech: 'React Native · Redux · AR · IoT',
    preview: preview('carmix.png'),
    screens: screensFor('carmix'),
    links: {
      appStore: 'https://apps.apple.com/ar/app/apollo-carmix/id6476922567?l=en-GB',
      googlePlay: 'https://play.google.com/store/apps/details?id=com.torai.tor_equip.apollo&hl=en_GB&pli=1'
    }
  },
  {
    key: 'chelyabinskgorgaz',
    title: 'Chelyabinskgorgaz',
    year: '2018',
    domain: 'utilities',
    tech: 'React Native · Redux · Payments',
    preview: preview('gazcom.png'),
    screens: screensFor('gazcom'),
    links: {}
  },
  {
    key: 'preco',
    title: 'URC / SUTU',
    year: '2017',
    domain: 'healthcare',
    tech: 'React Native · Redux',
    preview: preview('preco.png'),
    screens: screensFor('preco'),
    links: {}
  }
];

export const projectByKey = Object.fromEntries(projects.map((project) => [project.key, project]));

export default projects;
