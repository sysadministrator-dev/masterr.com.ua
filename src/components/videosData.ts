export interface VideoItem {
  id: number;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
}

function youtubeThumb(videoId: string) {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

// Кожна позиція редагується окремо: thumbnailUrl — прев'ю з YouTube, videoUrl — посилання на відео.
export const VIDEOS: VideoItem[] = [
  {
    id: 1,
    title: "Робота одностворчатої розсувної решітки",
    thumbnailUrl: youtubeThumb("YbXfX7MTaDo"),
    videoUrl: "https://www.youtube.com/shorts/YbXfX7MTaDo",
  },
  {
    id: 2,
    title: "Робота двостворчатої розсувної решітки",
    thumbnailUrl: youtubeThumb("76ejW2HMzQA"),
    videoUrl: "https://www.youtube.com/shorts/76ejW2HMzQA",
  },
  {
    id: 3,
    title: "Процес замикання розсувної решітки",
    thumbnailUrl: youtubeThumb("suXZvYZGsuM"),
    videoUrl: "https://www.youtube.com/shorts/suXZvYZGsuM",
  },
  {
    id: 4,
    title: "Одностворчата віконна розсувна решітка",
    thumbnailUrl: youtubeThumb("JSGf-zFmndM"),
    videoUrl: "https://www.youtube.com/shorts/JSGf-zFmndM",
  },
  {
    id: 5,
    title: "Двостворчата віконна розсувна решітка",
    thumbnailUrl: youtubeThumb("u-TPs2Yvd28"),
    videoUrl: "https://www.youtube.com/watch?v=u-TPs2Yvd28",
  },
  {
    id: 6,
    title: "Розсувна решітка з врізними замками",
    thumbnailUrl: youtubeThumb("i_78-hNQn0E"),
    videoUrl: "https://www.youtube.com/shorts/i_78-hNQn0E",
  },
  {
    id: 7,
    title: "Робота розсувної решітки великих розмірів",
    thumbnailUrl: youtubeThumb("B7XTXN_FCjY"),
    videoUrl: "https://www.youtube.com/shorts/B7XTXN_FCjY",
  },
  {
    id: 8,
    title: "Повний процес виготовлення розсувних решіток",
    thumbnailUrl: youtubeThumb("JWY4t0Yp0qc"),
    videoUrl: "https://www.youtube.com/watch?v=JWY4t0Yp0qc",
  },
  {
    id: 9,
    title: "Порядок збірки та монтажу розсувних решіток",
    thumbnailUrl: youtubeThumb("P4otQ0sSwbA"),
    videoUrl: "https://www.youtube.com/watch?v=P4otQ0sSwbA",
  },
];
