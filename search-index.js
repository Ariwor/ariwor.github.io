/* Site-wide search index for Ctrl+K palette */
const SEARCH_INDEX = [
  // Quick redirects
  { label: 'Synthetic Biology', category: 'Quick Link', keywords: ['synthetic biology', 'synbio', 'cybergenetics', 'gene circuits', 'cell therapy'], url: '/projects/#synbio' },
  { label: 'iGEM', category: 'Quick Link', keywords: ['igem', 'international genetically engineered machine', 'igem greece', 'pandorra'], url: '/projects/#igem' },
  { label: 'Space Biology', category: 'Quick Link', keywords: ['space biology', 'biology in space', 'satellite biology', 'orbital biology', 'acubesat'], url: '/projects/#acubesat' },
  { label: 'Aerospace Engineering', category: 'Quick Link', keywords: ['aerospace engineering', 'space engineering', 'cubesat', 'satellite'], url: '/projects/#acubesat' },
  // Home
  // Projects
  { label: 'Projects overview', category: 'Projects', keywords: ['research', 'projects', 'work', 'all projects'], url: '/projects/' },
  { label: 'AcubeSAT satellite', category: 'Projects', keywords: ['satellite', 'esa', 'cubesat', 'space', 'spacedot', 'fly your satellite', 'aerospace', 'biology in orbit'], url: '/projects/#acubesat' },
  { label: 'iGEM Greece', category: 'Projects', keywords: ['igem', 'pandorra', 'gold medal', 'colorectal cancer', 'rnai', 'logic circuits', 'synthetic biology team'], url: '/projects/#igem' },
  { label: 'Cybergenetics', category: 'Projects', keywords: ['phd', 'eth', 'gene circuits', 'feedback control', 'homeostatic', 'khammash', 'cell therapy', 'immune'], url: '/projects/#synbio' },
  { label: 'Amgen Scholars — Cambridge', category: 'Projects', keywords: ['cambridge', 'neural stem cells', 'neuroscience', 'amgen', 'svz', 'kazanis'], url: '/projects/#neurosci' },
  { label: 'AUTh — Stem cell research', category: 'Projects', keywords: ['auth', 'auth.', 'mesenchymal stem cells', 'antioxidative', 'proteasome', 'koliakos'], url: '/projects/#aging-stem' },
  { label: 'NeMo — Brain-Computer Interface', category: 'Projects', keywords: ['eeg', 'brain computer interface', 'rc car', 'tedx', 'bci', 'nemo', 'neural motors'], url: '/projects/#misc' },
  { label: 'Computational neuroscience', category: 'Projects', keywords: ['epilepsy', 'neural mass model', 'modeling', 'comp-neuro', 'github'], url: '/projects/#misc' },
  { label: 'DIY microfluidics', category: 'Projects', keywords: ['microfluidics', 'pdms', 'spin-coating', 'life sciences'], url: '/projects/#misc' },
  { label: 'Hand sanitizer project', category: 'Projects', keywords: ['sanitizer', 'covid', 'alcohol', 'formulation'], url: '/projects/#misc' },
  { label: 'Biosensors — directed evolution', category: 'Projects', keywords: ['biosensor', 'short-chain fatty acids', 'directed evolution', 'gut monitoring', 'platt'], url: '/projects/#biosensors' },
  { label: 'EPFL SRP — Cell-free DNA replication', category: 'Projects', keywords: ['epfl', 'cell-free', 'dna replication', 'maerkl', 'rsf1010', 'mitomi'], url: '/projects/#minimal-cell' },
  // Awards
  { label: 'Awards & Honors', category: 'Awards', keywords: ['jacobs fellowship', 'eth scholarship', 'gold medal', 'epfl srp', 'amgen', 'uwc', 'fens'], url: '/awards/' },
  // Publications
  { label: 'Publications overview', category: 'Publications', keywords: ['publications', 'papers', 'preprints', 'book chapter', 'research output'], url: '/publications/' },
  { label: 'PNAS 2022 feedback control circuit', category: 'Publications', keywords: ['pnas', 'genetic mammalian proportional integral feedback control', 'gene regulation', 'khammash', 'frei', 'chang'], url: '/publications/' },
  { label: 'Engineering cybergenetic cell-based therapies (preprint)', category: 'Publications', keywords: ['biorxiv', 'cybergenetic', 'cell-based therapies', 'preprint', '2026'], url: '/publications/' },
  { label: 'Being a neural stem cell (book chapter)', category: 'Publications', keywords: ['book chapter', 'stem cell microenvironments and beyond', 'neural stem cell', '2017'], url: '/publications/' },
  // Talks
  { label: 'Talks & Events', category: 'Talks', keywords: ['presentations', 'igem meetup', 'poster', 'jamboree', 'fens', 'talks', 'recording', 'nanosatellite', 'auth', 'audiovisual'], url: '/talks/' },
  // Teaching
  { label: 'Mentorship & Community', category: 'Mentorship', keywords: ['mentorship', 'community', 'teaching', 'msc supervisor', 'teaching assistant', 'mentor', 'igem mentor', 'anatomy', 'acubesat'], url: '/mentorship/' },
  // Other
  { label: 'Interests & iFAQ', category: 'Other', keywords: ['other', 'faq', 'contact', 'taekwondo', 'triathlon', 'dnd', 'dungeons dragons', 'interests', 'hobbies', 'films', 'books'], url: '/other/' },
  { label: 'Erdős–Bacon–Sabbath Number', category: 'Other', keywords: ['erdos', 'bacon', 'sabbath', 'number', 'kevin bacon', 'paul erdos', 'black sabbath', '4:5:4'], url: '/other/#ebs' },
  { label: 'Name', category: 'Other', keywords: ['asterios', 'asteris', 'ariwor', 'aster', 'star', 'name'], url: '/other/#name' },
  // CV
  { label: 'CV', category: 'CV', keywords: ['cv', 'resume', 'curriculum vitae', 'pdf'], url: '/assets/A.Arampatzis_CV.pdf' },
];
