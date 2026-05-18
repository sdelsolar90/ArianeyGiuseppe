export const TRANSPORT = {
  itTaxi: {
    appStore: "https://apps.apple.com/es/app/ittaxi/id527559443",
    playStore:
      "https://play.google.com/store/apps/details?id=it.ud.microtek.ITTaxi&hl=es",
  },
  free2move: {
    url: "https://www.free2move.com",
  },
} as const;

export const CONTACTS = {
  email: "bodaenroma@proton.me",
  people: [
    { name: "Ariane", phone: "+34 682 357 754" },
    { name: "Giuseppe", phone: "+39 335 596 7257" },
    { name: "Greta", role: "Wedding Planner", phone: "+39 346 318 2294" },
  ],
} as const;

export const GIFTS = {
  giuseppe: {
    holder: "Giuseppe Episcopo",
    fields: [
      { label: "IBAN", value: "IT28 F030 3203 1000 0135 792" },
      { label: "BIC / SWIFT", value: "BACRIT21581" },
    ],
  },
  ariane: {
    holder: "Ariane Bebko",
    fields: [
      { label: "Cuenta $ BCP", value: "19104696198132" },
      { label: "CCI", value: "00219110469619813253" },
    ],
  },
} as const;

export const PLAYLIST = {
  spotifyUrl:
    "https://open.spotify.com/playlist/5myVNHaQRdiv1CYu0uRTho?si=YzmAWDpfSBuyqiisJ4dXGA&pt=1bd344cf9c3019c239e2fa4336ed766d&pi=EFyNkV2IS2i5v",
  tracks: [
    { title: "Yes I Know My Way", artist: "Pino Daniele" },
    { title: "Tintarella di Luna", artist: "Mina" },
    { title: "La Canzone del Sole", artist: "Lucio Battisti" },
    { title: "Azzurro", artist: "Adriano Celentano" },
    { title: "Volare", artist: "Domenico Modugno" },
    { title: "Via con Me", artist: "Paolo Conte" },
    { title: "Più Bella Cosa", artist: "Eros Ramazzotti" },
    { title: "Caruso", artist: "Lucio Dalla" },
  ],
} as const;

export const WEDDING = {
  coupleName: "Ariane & Giuseppe",
  date: "2026-10-10",
  dateDisplay: "10 · 10 · 26",
  weekday: { es: "Sábado", en: "Saturday", it: "Sabato" },
  time: "12:30",
  busDeparture: "10:30",
  venue: {
    name: "Residenza Antica Flaminia",
    city: "Roma",
    mapsUrl: "https://maps.google.com/?q=Residenza+Antica+Flaminia,+Roma",
  },
  hotelNhow: {
    name: "Hotel Nhow Roma",
    address: "Corso d'Italia 1, Roma",
    mapsUrl:
      "https://maps.google.com/?q=Hotel+Nhow+Roma,+Corso+d%27Italia+1",
    bookingEmail: "hotelbooking@wedinrome.com",
  },
  hotelRio: {
    name: "Hotel Rio Coverino",
    address: "Civita Castellana",
    mapsUrl:
      "https://maps.google.com/?q=Hotel+Rio+Coverino,+Civita+Castellana",
  },
} as const;
