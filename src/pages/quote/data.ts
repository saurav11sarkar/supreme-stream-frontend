export interface CarpetRoomType {
  id: string;
  name: string;
  cleanPrice: number;
  protectPrice: number;
  deodorizePrice: number;
}

export interface UpholsteryPieceType {
  id: string;
  name: string;
  cleanPrice: number;
  protectPrice: number;
  deodorizePrice: number;
}

export interface RugType {
  id: string;
  name: string;
  cleanPrice: number;
  protectPrice: number;
  deodorizePrice: number;
}

export const allServices = [
  { id: 'carpet-cleaning',         name: 'Carpet Cleaning',                 icon: 'ri-home-2-line',        description: 'Deep steam cleaning with optional Scotchgard protection and deodorizer per room.' },
  { id: 'upholstery-cleaning',     name: 'Upholstery Cleaning',             icon: 'ri-armchair-line',      description: 'Professional cleaning for sofas, loveseats, recliners, sectionals & more.' },
  { id: 'area-rug-cleaning',       name: 'Area Rug Cleaning',               icon: 'ri-layout-grid-line',   description: 'Specialized care for synthetic, wool, shag and silk rugs.' },
  { id: 'tile-grout-cleaning',     name: 'Tile & Grout Cleaning',           icon: 'ri-grid-line',          description: 'Professional tile and grout restoration & color sealing.' },
  { id: 'hardwood-cleaning',       name: 'Hardwood Floor Cleaning',         icon: 'ri-bar-chart-box-line', description: 'Clean, clean & coat, or full strip, clean & coat services.' },
  { id: 'air-duct-cleaning',       name: 'Air Duct Cleaning',               icon: 'ri-temp-cold-line',     description: 'Complete HVAC system cleaning for healthier indoor air quality.' },
  { id: 'dryer-vent-cleaning',     name: 'Dryer Vent Cleaning',             icon: 'ri-fire-line',          description: 'Standard (15 ft or less) or extended vent cleaning.' },
  { id: 'emergency-water-damage',  name: '24-Hr Emergency Water Damage',    icon: 'ri-drop-line',          description: 'On-site evaluation required for emergency restoration.' },
];

export const carpetRoomTypes: CarpetRoomType[] = [
  { id: 'rooms',           name: 'Room(s)',           cleanPrice: 60, protectPrice: 35, deodorizePrice: 30 },
  { id: 'bath-or-laundry', name: 'Bath or Laundry',   cleanPrice: 40, protectPrice: 25, deodorizePrice: 20 },
  { id: 'entry-or-hall',   name: 'Entry or Hall',     cleanPrice: 25, protectPrice: 20, deodorizePrice: 15 },
  { id: 'staircase',       name: 'Staircase',         cleanPrice: 60, protectPrice: 35, deodorizePrice: 30 },
];

export const upholsteryPieceTypes: UpholsteryPieceType[] = [
  { id: 'sofa',                name: 'Sofa',                          cleanPrice: 150, protectPrice: 40, deodorizePrice: 35 },
  { id: 'loveseat',            name: 'Loveseat',                      cleanPrice: 120, protectPrice: 35, deodorizePrice: 30 },
  { id: 'recliner',            name: 'Recliner Chair',                cleanPrice: 60,  protectPrice: 25, deodorizePrice: 20 },
  { id: 'sectional',           name: 'Sectional (up to 15 ft)',      cleanPrice: 250, protectPrice: 60, deodorizePrice: 50 },
  { id: 'dining-chair-full',   name: 'Dining Chair (Seat & Back)',    cleanPrice: 25,  protectPrice: 10, deodorizePrice: 8 },
  { id: 'dining-chair-seat',   name: 'Dining Chair (Seat Only)',     cleanPrice: 15,  protectPrice: 8,  deodorizePrice: 6 },
  { id: 'ottoman',             name: 'Ottoman',                       cleanPrice: 30,  protectPrice: 12, deodorizePrice: 10 },
];

export const rugTypes: RugType[] = [
  { id: 'synthetic',  name: 'Synthetic',   cleanPrice: 60, protectPrice: 25, deodorizePrice: 20 },
  { id: 'wool',       name: 'Wool',        cleanPrice: 80, protectPrice: 30, deodorizePrice: 25 },
  { id: 'shag-silk',  name: 'Shag / Silk', cleanPrice: 100, protectPrice: 35, deodorizePrice: 30 },
];

export const hardwoodServices = [
  { id: 'clean',           name: 'Clean',                pricePerSqFt: 1.50 },
  { id: 'clean-coat',      name: 'Clean & Coat',         pricePerSqFt: 2.00 },
  { id: 'strip-clean-coat',name: 'Strip, Clean & Coat',  pricePerSqFt: 2.50 },
];

export const tileServices = [
  { id: 'clean',         name: 'Clean',             pricePerSqFt: 1.50 },
  { id: 'sealer',        name: 'Sealer (Add-on)',    pricePerSqFt: 0.50 },
  { id: 'clean-colorseal',name:'Clean & Colorseal',  pricePerSqFt: 3.00 },
];

export const dryerVentOptions = [
  { id: 'standard', name: 'Standard (15 ft or less)', price: 150 },
  { id: 'extended', name: 'Extended (over 15 ft)',     price: 250 },
];

export const carpetRoomOptions = [
  { value: 1, label: '1–2 Rooms', price: '$120' },
  { value: 3, label: '3 Rooms', price: '$180' },
  { value: 4, label: '4 Rooms', price: '$240' },
  { value: 5, label: '5+ Rooms', price: '$300' },
];

// ZIP code prefixes we serve (all of LA, Orange, western Riverside,
// San Bernardino, and Ventura counties — within ~60 miles of Azusa, CA)
export const serviceAreaPrefixes = [
  '900','901','902','903','904','905','906','907','908',
  '910','911','912','913','914','915','916','917','918',
  '923','924','926','927','928','930',
];

// Specific ZIPs to exclude even though their prefix is in the service area
export const excludedServiceAreaZips = [
  // Far high desert (San Bernardino County, well beyond 60 miles)
  '92310','92311','92312','92327','92332','92338','92339',
  '92363','92364','92365','92384','92389','92398',
  // Temecula / Murrieta (Riverside County, beyond 60 miles)
  '92562','92563','92564','92589','92590','92591','92592','92593',
];