
export enum Tribe {
  REUBEN = 'Reuben',
  SIMEON = 'Simeon',
  LEVI = 'Levi',
  JUDAH = 'Judah',
  DAN = 'Dan',
  NAPHTALI = 'Naphtali',
  GAD = 'Gad',
  ASHER = 'Asher',
  ISSACHAR = 'Issachar',
  ZEBULUN = 'Zebulun',
  JOSEPH = 'Joseph',
  EPHRAIM = 'Ephraim',
  MANASSEH = 'Manasseh',
  BENJAMIN = 'Benjamin',
  UNKNOWN = 'Exile / Seeking'
}

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female'
}

export enum LifeStage {
  CHILD = 'Child',
  YOUTH = 'Youth',
  ADULT = 'Adult',
  ELDER = 'Elder'
}

export enum ScoreTier {
  DIM = 'Dim (Exile Fog)',
  KINDLED = 'Kindled (Awakening)',
  BURNING = 'Burning (Remnant)',
  SEALED = 'Sealed (Royal Priesthood)',
  ETERNAL = 'Eternal (Seal Watch)'
}

export enum LawSeverity {
  INSTRUCTION = 'instruction',
  COMMAND = 'command',
  JUDGMENT = 'judgment'
}

export enum AuthorityLevel {
  INDIVIDUAL = 'individual',
  HOUSEHOLD = 'household',
  TRIBAL = 'tribal',
  NATIONAL = 'national',
  PRIESTLY = 'priestly'
}

export enum ActivationMode {
  ALWAYS = 'always',
  CALENDAR_BASED = 'calendar_based',
  CONDITIONAL = 'conditional',
  DORMANT = 'dormant'
}

export enum LawStatus {
  ACTIVE = 'active',
  TRAINING = 'training',
  DORMANT = 'dormant',
  VIOLATED = 'violated',
  FULFILLED = 'fulfilled',
  INACTIVE = 'inactive'
}

export enum LawCategory {
  IDENTITY = 'Identity',
  DIET = 'Diet',
  APPOINTED_TIMES = 'AppointedTimes',
  GOVERNANCE = 'Governance',
  SEXUAL_ORDER = 'SexualOrder',
  PRIESTLY_SERVICE = 'PriestlyService',
  WAR_JUSTICE = 'WarJustice'
}

export enum ConsecrationType {
  RESET_3 = '3-Day Reset',
  FOOD_7 = '7-Day Daniel Fast',
  DISCIPLINE_14 = '14-Day Discipline'
}

export enum ProtocolStatus {
  ROYAL_STANDARD_UPHELD = 'Royal Standard Upheld'
}

export enum MannaSlot {
  MORNING = 'Morning Watch',
  AFTERNOON = 'Midday Duty',
  NIGHT = 'Evening Seal'
}

export enum WitnessShift {
  SPIRITUAL = 'Spiritual',
  PHYSICAL = 'Physical',
  MENTAL = 'Mental',
  EMOTIONAL = 'Emotional'
}

export enum WitnessEase {
  EASY = 'Easy',
  RESISTED = 'Resisted'
}

export interface CodexRevelation {
  title: string;
  focus: string;
  scriptureRoot: string;
  whatYouLearn: string;
  covenantPurpose: string;
}

export interface Mitzvah {
  id: number;
  title: string;
  scripture: string;
  category: LawCategory;
  divineIntent: string;
  propheticTheme?: string;
  severity: LawSeverity;
  primaryTribe: Tribe[] | 'All';
  applicableSex: Gender | 'Both';
  minAge: number;
  maxAge: number;
  landRequired: boolean;
  templeRequired: boolean;
  authorityLevel: AuthorityLevel;
  activationMode: ActivationMode;
  modernApplication?: string;
  penalty?: string;
}

export interface Herb {
  name: string;
  hebrewName: string;
  category: string;
  scriptures: string[];
  spiritualFunction: string;
  physicalApplication: string;
  emotionalRoot: string;
  bodySystems: string[];
  curseBroken: string;
  violationLink: string;
  preparation: string;
}

export interface VocabCard {
  word: string;
  original: string;
  transliteration: string;
  language: 'Hebrew' | 'Greek';
  rootMeaning: string;
  covenantMeaning: string;
  restoredUnderstanding: string;
  scripture: string;
}

export interface WitnessRecord {
  id: string;
  timestamp: number;
  shift: WitnessShift;
  ease: WitnessEase;
  note?: string;
  scriptureRef: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export enum MoonPhase {
  NEW = 'New Moon',
  WAXING_CRESCENT = 'Waxing Crescent',
  FIRST_QUARTER = 'First Quarter',
  WAXING_GIBBOUS = 'Waxing Gibbous',
  FULL = 'Full Moon',
  WANING_GIBBOUS = 'Waning Gibbous',
  LAST_QUARTER = 'Last Quarter',
  WANING_CRESCENT = 'Waning Crescent'
}

export interface CelestialState {
  timeOfDay: 'Dawn' | 'Morning' | 'Midday' | 'Afternoon' | 'Dusk' | 'Night';
  moonPhase: MoonPhase;
  lunarAge: number; // 0 to 29.5
  isWaxing: boolean;
  insight: string;
}

export interface CalendarDay {
  day: number;
  month: string;
  moon: string;
  tribe: Tribe | 'All Tribes';
  remedyName: string;
  aura: string;
  lore?: string;
  codex_remedy?: string;
}

export interface UserLawContext {
  tribe: Tribe;
  sex: Gender;
  age: number;
  location: 'land' | 'exile';
  currentFeast: string;
}

export interface Testimony {
  id: string;
  tribe: Tribe;
  gender: Gender;
  text: string;
  timestamp: number;
  type: string;
}
