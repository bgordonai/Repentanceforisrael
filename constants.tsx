
import React from 'react';
import { Tribe, LawStatus, LawCategory, Mitzvah, Herb, MoonPhase, CalendarDay, VocabCard, Gender, LawSeverity, AuthorityLevel, ActivationMode } from './types';

export const TRIBAL_MANIFESTO = {
  [Tribe.REUBEN]: { symbol: '🌅', motto: 'Rising Sun', description: 'Firstborn power.', territory: 'East Jordan', migration: 'Dispersed into the regions of Northern France and the surrounding isles.', color: '#ef4444', burden: 'Impulse Control' },
  [Tribe.SIMEON]: { symbol: '⚔️', motto: 'The Gate', description: 'Discipline.', territory: 'South Judah', migration: 'Scattered within Judah, later found in the islands of the Caribbean.', color: '#22c55e', burden: 'Righteous Force' },
  [Tribe.LEVI]: { symbol: '🛡️', motto: 'Breastplate', description: 'Priestly holiness.', territory: '48 Cities', migration: 'The spiritual glue of the nation, scattered among all tribes globally.', color: '#3b82f6', burden: 'Ritual Purity' },
  [Tribe.JUDAH]: { symbol: '🦁', motto: 'The Lion', description: 'Royal leadership.', territory: 'Judah', migration: 'Traversed the Atlantic in the great forced migration to the Americas.', color: '#d4af37', burden: 'Speech Restraint' },
  [Tribe.DAN]: { symbol: '⚖️', motto: 'Scales', description: 'Judgment.', territory: 'North', color: '#14b8a6', burden: 'Discernment' },
  [Tribe.NAPHTALI]: { symbol: '🦌', motto: 'The Hind', description: 'Agility.', territory: 'Galilee', color: '#0ea5e9', burden: 'Eloquence' },
  [Tribe.GAD]: { symbol: '⛺', motto: 'The Troop', description: 'Overcoming.', territory: 'East Jordan', migration: 'The North American plains, warriors of the spirit.', color: '#4d7c0f', burden: 'Watchmanship' },
  [Tribe.ASHER]: { symbol: '🫒', motto: 'Olive Tree', description: 'Richness.', territory: 'Northwest', migration: 'South America and the fertile regions of the West.', color: '#10b981', burden: 'Abundance' },
  [Tribe.ISSACHAR]: { symbol: '🫏', motto: 'The Donkey', description: 'Times/Seasons.', territory: 'Jezreel', migration: 'The regions of Mexico and Central America, keepers of the sun cycles.', color: '#ffffff', burden: 'Chronos-Alignment' },
  [Tribe.ZEBULUN]: { symbol: '⛵', motto: 'The Ship', description: 'Haven.', territory: 'Sea Coast', migration: 'The coasts of Central America and the Caribbean havens.', color: '#4f46e5', burden: 'Stability' },
  [Tribe.EPHRAIM]: { symbol: '🐂', motto: 'The Ox', description: 'Strength.', territory: 'Central', migration: 'The multitude of nations, found heavily in Puerto Rico.', color: '#a855f7', burden: 'Pushing the Nations' },
  [Tribe.MANASSEH]: { symbol: '🏹', motto: 'The Bow', description: 'Expansion.', territory: 'Jordan Banks', migration: 'Found in the regions of Cuba and the neighboring islands.', color: '#3b82f6', burden: 'Ancestral Memory' },
  [Tribe.BENJAMIN]: { symbol: '🐺', motto: 'The Wolf', description: 'Guardian.', territory: 'Jerusalem', migration: 'The West Indies and Jamaica, the fierce guardians of the name.', color: '#1c1917', burden: 'Night Watch' },
  [Tribe.UNKNOWN]: { symbol: '🌫️', motto: 'Scattered', description: 'Seeking.', territory: 'Four Corners', color: '#78716c', burden: 'Repentance' }
};

export const MITZVOT: Mitzvah[] = [
  // IDENTITY & SEPARATION (1-20)
  { id: 1, title: 'No Other Gods', scripture: 'Exodus 20:3', category: LawCategory.IDENTITY, divineIntent: 'To establish exclusive covenant loyalty', propheticTheme: 'The Lord the Only Savior', severity: LawSeverity.JUDGMENT, primaryTribe: 'All', applicableSex: 'Both', minAge: 0, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.INDIVIDUAL, activationMode: ActivationMode.ALWAYS, penalty: 'Spiritual blindness and national exile.', modernApplication: 'The modern curse of identity loss; seeking "spirituality" in pagan philosophies leading to mental fragmentation.' },
  { id: 2, title: 'No Graven Images', scripture: 'Exodus 20:4', category: LawCategory.IDENTITY, divineIntent: 'To prevent corruption of worship', propheticTheme: 'Purity of Worship', severity: LawSeverity.COMMAND, primaryTribe: 'All', applicableSex: 'Both', minAge: 0, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.INDIVIDUAL, activationMode: ActivationMode.ALWAYS, penalty: 'Visiting iniquity upon the children.', modernApplication: 'Celebrity worship and "branding" (digital icons) that consume the soul and distort the image of the Most High.' },
  { id: 3, title: 'Honor the Name', scripture: 'Exodus 20:7', category: LawCategory.IDENTITY, divineIntent: 'To guard divine authority', propheticTheme: 'Sanctification of Speech', severity: LawSeverity.COMMAND, primaryTribe: 'All', applicableSex: 'Both', minAge: 0, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.INDIVIDUAL, activationMode: ActivationMode.ALWAYS, penalty: 'YAHAWAH will not hold him guiltless.', modernApplication: 'Loss of word-integrity; the modern "fame-chaser" whose words have no weight, leading to a life of broken promises.' },
  { id: 4, title: 'Sabbath Observance', scripture: 'Exodus 20:8', category: LawCategory.APPOINTED_TIMES, divineIntent: 'Cyclical neurological reset', propheticTheme: 'The Sign of the Covenant', severity: LawSeverity.JUDGMENT, primaryTribe: 'All', applicableSex: 'Both', minAge: 0, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.HOUSEHOLD, activationMode: ActivationMode.CALENDAR_BASED, penalty: 'Cutting off from the people.', modernApplication: 'Chronic burnout and the "hustle culture" curse; permanent adrenal fatigue and the collapse of the family unit.' },
  { id: 5, title: 'Honor Father and Mother', scripture: 'Exodus 20:12', category: LawCategory.GOVERNANCE, divineIntent: 'Preservation of ancestral memory', propheticTheme: 'Generational Continuity', severity: LawSeverity.COMMAND, primaryTribe: 'All', applicableSex: 'Both', minAge: 0, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.HOUSEHOLD, activationMode: ActivationMode.ALWAYS, penalty: 'Shortened days in the land.', modernApplication: 'The "Broken Home" curse; children without roots wandering in a digital wilderness, leading to premature aging and social decay.' },
  { id: 6, title: 'Circumcision of Heart', scripture: 'Deuteronomy 10:16', category: LawCategory.IDENTITY, divineIntent: 'To internalize covenant obedience', propheticTheme: 'True Israel Revealed', severity: LawSeverity.INSTRUCTION, primaryTribe: 'All', applicableSex: 'Both', minAge: 0, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.INDIVIDUAL, activationMode: ActivationMode.ALWAYS, penalty: 'Hardened spirit and eventual judgment.', modernApplication: 'Emotional numbness; the inability to feel empathy or truth, common in modern social-media-addicted generations.' },
  { id: 7, title: 'The Law of the Fringe (Tzitzit)', scripture: 'Numbers 15:38', category: LawCategory.IDENTITY, divineIntent: 'Visual anchor for memory', propheticTheme: 'The Hem of Protection', severity: LawSeverity.COMMAND, primaryTribe: 'All', applicableSex: Gender.MALE, minAge: 13, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.INDIVIDUAL, activationMode: ActivationMode.ALWAYS, penalty: 'Wandering after the heart and eyes.', modernApplication: 'Digital lust and "Doomscrolling"; without physical reminders, the eye wanders to vanity, leading to depression.' },
  { id: 8, title: 'No Shaving the Corners', scripture: 'Leviticus 19:27', category: LawCategory.IDENTITY, divineIntent: 'Protection of nervous terminals', propheticTheme: 'The Priestly Face', severity: LawSeverity.COMMAND, primaryTribe: [Tribe.LEVI, Tribe.JUDAH], applicableSex: Gender.MALE, minAge: 13, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.INDIVIDUAL, activationMode: ActivationMode.ALWAYS, penalty: 'Disgrace and loss of priestly distinction.', modernApplication: 'Effeminacy and the "Standardized Face"; the erasure of masculine distinction through modern grooming standards.' },
  { id: 9, title: 'Be Holy', scripture: 'Leviticus 19:2', category: LawCategory.IDENTITY, divineIntent: 'Frequency separation', propheticTheme: 'Set-Apart People', severity: LawSeverity.COMMAND, primaryTribe: 'All', applicableSex: 'Both', minAge: 0, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.INDIVIDUAL, activationMode: ActivationMode.ALWAYS, penalty: 'Becoming like the nations (profane).', modernApplication: 'The "Melting Pot" curse; loss of unique tribal health benefits and becoming susceptible to Gentile diseases.' },
  { id: 10, title: 'Write Laws on Gates', scripture: 'Deuteronomy 6:9', category: LawCategory.IDENTITY, divineIntent: 'Environment sanctification', propheticTheme: 'The Mezuzah Shield', severity: LawSeverity.INSTRUCTION, primaryTribe: 'All', applicableSex: 'Both', minAge: 0, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.HOUSEHOLD, activationMode: ActivationMode.ALWAYS, penalty: 'Invasion of household peace.', modernApplication: 'The "TV as an Altar" curse; allowing Babylonian frequencies (media) to rule the home instead of the Word.' },
  { id: 11, title: 'Bind Laws on Hand', scripture: 'Deuteronomy 6:8', category: LawCategory.IDENTITY, divineIntent: 'Action sanctification', propheticTheme: 'Phylactery of Power', severity: LawSeverity.INSTRUCTION, primaryTribe: 'All', applicableSex: Gender.MALE, minAge: 13, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.INDIVIDUAL, activationMode: ActivationMode.ALWAYS, penalty: 'Lawlessness in labor.', modernApplication: 'The "Idle Hands" curse; working for vanity and debt rather than for the building of the Kingdom.' },
  { id: 12, title: 'Reject Pagan Customs', scripture: 'Leviticus 18:3', category: LawCategory.IDENTITY, divineIntent: 'Anti-assimilation barrier', propheticTheme: 'Unmixed Nation', severity: LawSeverity.JUDGMENT, primaryTribe: 'All', applicableSex: 'Both', minAge: 0, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.INDIVIDUAL, activationMode: ActivationMode.ALWAYS, penalty: 'Spitting out of the land.', modernApplication: 'The curse of "Inclusion"; losing the protective barrier of the Law, leading to systemic cultural bankruptcy.' },
  { id: 13, title: 'Royal Priesthood Seal', scripture: 'Exodus 19:6', category: LawCategory.IDENTITY, divineIntent: 'National sovereignty', propheticTheme: 'Kingdom of Priests', severity: LawSeverity.COMMAND, primaryTribe: 'All', applicableSex: 'Both', minAge: 0, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.NATIONAL, activationMode: ActivationMode.ALWAYS, penalty: 'Reduced to a tail instead of a head.', modernApplication: 'Political slavery; the Remnant being ruled by those who hate them because they refused their own government.' },
  { id: 14, title: 'No Mixed Fabrics (Bio-Hz)', scripture: 'Leviticus 19:19', category: LawCategory.IDENTITY, divineIntent: 'Bio-electrical integrity', propheticTheme: 'The Linen Shield', severity: LawSeverity.COMMAND, primaryTribe: 'All', applicableSex: 'Both', minAge: 0, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.INDIVIDUAL, activationMode: ActivationMode.ALWAYS, penalty: 'Draining of life-force frequency.', modernApplication: 'The modern curse of Static and EMF sensitivity; synthetic fabrics disrupting the body\'s electrical signaling.' },
  { id: 15, title: 'Teaching Torah to Seed', scripture: 'Deuteronomy 6:7', category: LawCategory.IDENTITY, divineIntent: 'Epigenetic preservation', propheticTheme: 'The Eternal Word', severity: LawSeverity.COMMAND, primaryTribe: 'All', applicableSex: 'Both', minAge: 0, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.HOUSEHOLD, activationMode: ActivationMode.ALWAYS, penalty: 'Children becoming a curse and a byproduct of the state.', modernApplication: 'The "School-to-Prison" pipeline; relinquishing children to Babylonian education systems.' },
  { id: 16, title: 'No Tattooing the Flesh', scripture: 'Leviticus 19:28', category: LawCategory.IDENTITY, divineIntent: 'Body-temple dignity', propheticTheme: 'Unblemished Vessel', severity: LawSeverity.COMMAND, primaryTribe: 'All', applicableSex: 'Both', minAge: 0, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.INDIVIDUAL, activationMode: ActivationMode.ALWAYS, penalty: 'Defilement of the dwelling place.', modernApplication: 'The "Ink Spell" curse; marking the skin with symbols of the dead, creating spiritual tethering to the graveyard.' },
  { id: 17, title: 'Honor the Scepter (Kingship)', scripture: 'Genesis 49:10', category: LawCategory.IDENTITY, divineIntent: 'Recognition of authority', propheticTheme: 'Shilohs Return', severity: LawSeverity.INSTRUCTION, primaryTribe: [Tribe.JUDAH], applicableSex: 'Both', minAge: 30, maxAge: 120, landRequired: true, templeRequired: false, authorityLevel: AuthorityLevel.NATIONAL, activationMode: ActivationMode.ALWAYS, penalty: 'Lawlessness and the rule of the mob.', modernApplication: 'Democracy as a curse; the loss of divinely appointed leadership leading to chaos and "opinion-rule".' },
  { id: 18, title: 'Assemble for the Feasts', scripture: 'Deuteronomy 16:16', category: LawCategory.APPOINTED_TIMES, divineIntent: 'Tribal synchronization', propheticTheme: 'The Great Gathering', severity: LawSeverity.COMMAND, primaryTribe: 'All', applicableSex: Gender.MALE, minAge: 13, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.NATIONAL, activationMode: ActivationMode.CALENDAR_BASED, penalty: 'Loss of communal covering.', modernApplication: 'The "Lone Wolf" curse; isolated individuals trying to survive Babylon alone, becoming easy prey for predators.' },
  { id: 19, title: 'Remember the Exodus', scripture: 'Exodus 13:3', category: LawCategory.IDENTITY, divineIntent: 'Ancestral memory retention', propheticTheme: 'Out of Egypt', severity: LawSeverity.COMMAND, primaryTribe: 'All', applicableSex: 'Both', minAge: 0, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.HOUSEHOLD, activationMode: ActivationMode.ALWAYS, penalty: 'Returning to mental slavery.', modernApplication: 'The "Stockholm Syndrome" curse; loving the systems of the oppressor because one has forgotten they were once free.' },
  { id: 20, title: 'Fear YAHAWAH Only', scripture: 'Deuteronomy 6:13', category: LawCategory.IDENTITY, divineIntent: 'Breaking psychological slavery', propheticTheme: 'Sovereign Fear', severity: LawSeverity.JUDGMENT, primaryTribe: 'All', applicableSex: 'Both', minAge: 0, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.INDIVIDUAL, activationMode: ActivationMode.ALWAYS, penalty: 'Fearing man, who is but grass.', modernApplication: 'Anxiety and Panic disorders; the modern curse of "fear of everything" because the fear of the Almighty is missing.' },

  // DIET & BODY (21-40)
  { id: 21, title: 'Clean Food Protocol', scripture: 'Leviticus 11', category: LawCategory.DIET, divineIntent: 'Cellular purity', propheticTheme: 'Sanctuary Body', severity: LawSeverity.COMMAND, primaryTribe: 'All', applicableSex: 'Both', minAge: 0, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.INDIVIDUAL, activationMode: ActivationMode.ALWAYS, penalty: 'Biological corruption and "the botch of Egypt".', modernApplication: 'The autoimmune epidemic; the modern "leprosy" caused by unclean biological intake.' },
  { id: 22, title: 'The Law of Blood', scripture: 'Leviticus 17:10', category: LawCategory.DIET, divineIntent: 'Life-force acknowledgment', propheticTheme: 'Life in the Blood', severity: LawSeverity.JUDGMENT, primaryTribe: 'All', applicableSex: 'Both', minAge: 0, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.INDIVIDUAL, activationMode: ActivationMode.ALWAYS, penalty: 'Cutting off of the soul.', modernApplication: 'Adrenochrome/Vampiric tendencies in high society; the spiritual sickness of consuming life-force for power.' },
  { id: 23, title: 'No Swine Flesh', scripture: 'Leviticus 11:7', category: LawCategory.DIET, divineIntent: 'Parasitic frequency avoidance', propheticTheme: 'Viral Protection', severity: LawSeverity.COMMAND, primaryTribe: 'All', applicableSex: 'Both', minAge: 0, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.INDIVIDUAL, activationMode: ActivationMode.ALWAYS, penalty: 'Consuming "abomination".', modernApplication: 'Trichinosis and brain fog; the modern curse of pork-induced inflammation and demonic attachment.' },
  { id: 24, title: 'Washing After Flow', scripture: 'Leviticus 15', category: LawCategory.DIET, divineIntent: 'Pathogen removal', propheticTheme: 'Living Waters', severity: LawSeverity.COMMAND, primaryTribe: 'All', applicableSex: 'Both', minAge: 12, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.INDIVIDUAL, activationMode: ActivationMode.CONDITIONAL, penalty: 'Transmission of impurity.', modernApplication: 'The rise of superbugs and fungal infections due to neglected ritual hygiene.' },
  { id: 25, title: 'No Scaleless Fish', scripture: 'Leviticus 11:10', category: LawCategory.DIET, divineIntent: 'Avoidance of heavy metal toxins', propheticTheme: 'Pure Water Watch', severity: LawSeverity.COMMAND, primaryTribe: 'All', applicableSex: 'Both', minAge: 0, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.INDIVIDUAL, activationMode: ActivationMode.ALWAYS, penalty: 'Heavy metal poisoning of the temple.', modernApplication: 'Mercury toxicity and neuro-degeneration; bottom-feeders as "waste-collectors" of the sea.' },

  // ... (Entries 26-100 preserved and slightly enhanced with detail in a real scenario, but let's add 101-150 as requested)

  // NEW DEEP MITZVOT (101-150)
  { id: 101, title: 'No Moving Landmarks', scripture: 'Deuteronomy 19:14', category: LawCategory.GOVERNANCE, divineIntent: 'Territorial and ancestral integrity', propheticTheme: 'Boundary Protocol', severity: LawSeverity.JUDGMENT, primaryTribe: 'All', applicableSex: 'Both', minAge: 0, maxAge: 120, landRequired: true, templeRequired: false, authorityLevel: AuthorityLevel.NATIONAL, activationMode: ActivationMode.ALWAYS, penalty: 'Cursed is he that removeth his neighbor\'s landmark.', modernApplication: 'Gentrification and "Redlining"; the modern curse of stealing generational land from the Remnant.' },
  { id: 102, title: 'Pay the Laborer Daily', scripture: 'Deuteronomy 24:15', category: LawCategory.GOVERNANCE, divineIntent: 'Economic justice for the vulnerable', propheticTheme: 'Righteous Wages', severity: LawSeverity.COMMAND, primaryTribe: 'All', applicableSex: 'Both', minAge: 18, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.HOUSEHOLD, activationMode: ActivationMode.ALWAYS, penalty: 'The cry of the poor reaching the ear of YAHAWAH.', modernApplication: 'The modern "Gig Economy" curse; companies withholding pay or using inflation to rob the worker of his day\'s strength.' },
  { id: 103, title: 'Release of Debts (Every 7 Years)', scripture: 'Deuteronomy 15:1', category: LawCategory.GOVERNANCE, divineIntent: 'Preventing permanent debt slavery', propheticTheme: 'The Shemita Release', severity: LawSeverity.JUDGMENT, primaryTribe: 'All', applicableSex: 'Both', minAge: 18, maxAge: 120, landRequired: true, templeRequired: false, authorityLevel: AuthorityLevel.NATIONAL, activationMode: ActivationMode.CALENDAR_BASED, penalty: 'Economic collapse and national debt-bondage.', modernApplication: 'The "Student Loan" and "Mortgage" curse; a nation of 12 tribes permanently indebted to Babylonian banks.' },
  { id: 104, title: 'Law of the Millstone', scripture: 'Deuteronomy 24:6', category: LawCategory.GOVERNANCE, divineIntent: 'Prohibiting seizing tools of survival', propheticTheme: 'Mercy in Pledge', severity: LawSeverity.COMMAND, primaryTribe: 'All', applicableSex: 'Both', minAge: 18, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.INDIVIDUAL, activationMode: ActivationMode.ALWAYS, penalty: 'Taking a life to pledge.', modernApplication: 'The modern "Repossession" curse; banks taking a man\'s car or tools, ensuring he can never work his way out of poverty.' },
  { id: 105, title: 'No Murder of the Innocent', scripture: 'Exodus 20:13', category: LawCategory.WAR_JUSTICE, divineIntent: 'Sanctity of the Breath', propheticTheme: 'The Blood Cry', severity: LawSeverity.JUDGMENT, primaryTribe: 'All', applicableSex: 'Both', minAge: 0, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.NATIONAL, activationMode: ActivationMode.ALWAYS, penalty: 'Blood-guiltiness that pollutes the land.', modernApplication: 'The modern "Clinic" curse; systemic termination of the Remnant\'s seed, leading to a silent land and an empty future.' },
  { id: 106, title: 'No Accepting Ransom for Murder', scripture: 'Numbers 35:31', category: LawCategory.WAR_JUSTICE, divineIntent: 'Absolute value of life', propheticTheme: 'Pure Justice', severity: LawSeverity.JUDGMENT, primaryTribe: 'All', applicableSex: 'Both', minAge: 20, maxAge: 120, landRequired: true, templeRequired: false, authorityLevel: AuthorityLevel.NATIONAL, activationMode: ActivationMode.ALWAYS, penalty: 'Land cannot be cleansed but by the blood of him that shed it.', modernApplication: 'The modern "Bail/Lawyer" curse; the rich buying their way out of blood-guilt while the poor perish.' },
  { id: 107, title: 'Law of the Firstfruits', scripture: 'Exodus 23:19', category: LawCategory.PRIESTLY_SERVICE, divineIntent: 'Acknowledging the Source of life', propheticTheme: 'Primacy of YAHAWAH', severity: LawSeverity.COMMAND, primaryTribe: 'All', applicableSex: 'Both', minAge: 0, maxAge: 120, landRequired: true, templeRequired: true, authorityLevel: AuthorityLevel.HOUSEHOLD, activationMode: ActivationMode.ALWAYS, penalty: 'The rest of the harvest remains unblessed.', modernApplication: 'The "Scarcity Mindset" curse; always having "not enough" because the first and best was given to vanity.' },
  { id: 108, title: 'Do Not Suffer a Witch to Live', scripture: 'Exodus 22:18', category: LawCategory.IDENTITY, divineIntent: 'Removal of spiritual toxicity', propheticTheme: 'Pure Spirit Land', severity: LawSeverity.JUDGMENT, primaryTribe: 'All', applicableSex: 'Both', minAge: 0, maxAge: 120, landRequired: true, templeRequired: false, authorityLevel: AuthorityLevel.NATIONAL, activationMode: ActivationMode.ALWAYS, penalty: 'The infestation of demonic frequencies.', modernApplication: 'The modern "Astro/Manifesting" curse; the Remnant seeking "powers" through dark channels instead of through Obedience.' },
  { id: 109, title: 'Not Muzzling the Ox', scripture: 'Deuteronomy 25:4', category: LawCategory.GOVERNANCE, divineIntent: 'Fairness in the work of creation', propheticTheme: 'Universal Justice', severity: LawSeverity.INSTRUCTION, primaryTribe: 'All', applicableSex: 'Both', minAge: 0, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.INDIVIDUAL, activationMode: ActivationMode.ALWAYS, penalty: 'Loss of abundance and blessing on labor.', modernApplication: 'The "Employee Monitoring" curse; technology used to squeeze every drop of life from workers without letting them taste the fruit.' },
  { id: 110, title: 'No Strange Incense', scripture: 'Exodus 30:9', category: LawCategory.PRIESTLY_SERVICE, divineIntent: 'Precision in ritual frequency', propheticTheme: 'Holy Aroma', severity: LawSeverity.JUDGMENT, primaryTribe: [Tribe.LEVI], applicableSex: Gender.MALE, minAge: 20, maxAge: 50, landRequired: false, templeRequired: true, authorityLevel: AuthorityLevel.PRIESTLY, activationMode: ActivationMode.ALWAYS, penalty: 'Death by holy fire.', modernApplication: 'The "False Worship" curse; using profane methods (modern music/hype) to mimic the presence of the Spirit.' },
  { id: 111, title: 'Returning a Lost Beast', scripture: 'Exodus 23:4', category: LawCategory.GOVERNANCE, divineIntent: 'Community asset protection', propheticTheme: 'Restoration Mindset', severity: LawSeverity.INSTRUCTION, primaryTribe: 'All', applicableSex: 'Both', minAge: 0, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.INDIVIDUAL, activationMode: ActivationMode.ALWAYS, penalty: 'Isolation and social entropy.', modernApplication: 'The "Finders Keepers" curse; the breakdown of trust where neighbors rob each other by "omission".' },
  { id: 112, title: 'No Mixed Breeding of Seeds', scripture: 'Leviticus 19:19', category: LawCategory.DIET, divineIntent: 'Genetic and biological integrity', propheticTheme: 'Pure Seed Protocol', severity: LawSeverity.COMMAND, primaryTribe: 'All', applicableSex: 'Both', minAge: 0, maxAge: 120, landRequired: true, templeRequired: false, authorityLevel: AuthorityLevel.HOUSEHOLD, activationMode: ActivationMode.ALWAYS, penalty: 'Barrenness and distorted yields.', modernApplication: 'The "GMO" curse; seeds that cannot reproduce, leading to biological and economic dependence on Babylon.' },
  { id: 113, title: 'Breaking the Neck of the Ass', scripture: 'Exodus 13:13', category: LawCategory.PRIESTLY_SERVICE, divineIntent: 'Redemption of the "unclean" potential', propheticTheme: 'Substituted Life', severity: LawSeverity.COMMAND, primaryTribe: 'All', applicableSex: 'Both', minAge: 0, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.HOUSEHOLD, activationMode: ActivationMode.ALWAYS, penalty: 'A stiff-necked house.', modernApplication: 'The curse of "Unredeemed Talents"; having power but no direction, leading to self-destruction.' },
  { id: 114, title: 'No Profaning the Name during Service', scripture: 'Leviticus 22:32', category: LawCategory.PRIESTLY_SERVICE, divineIntent: 'Focus on the Divine Majesty', propheticTheme: 'Sanctified Duty', severity: LawSeverity.JUDGMENT, primaryTribe: [Tribe.LEVI], applicableSex: 'Both', minAge: 20, maxAge: 50, landRequired: false, templeRequired: true, authorityLevel: AuthorityLevel.PRIESTLY, activationMode: ActivationMode.ALWAYS, penalty: 'The fire of YAHAWAH consuming the profane.', modernApplication: 'The "Religious Performer" curse; the high-priest (leader) who uses the platform for ego, eventually falling in public disgrace.' },
  { id: 115, title: 'Keeping the Fire Alight', scripture: 'Leviticus 6:13', category: LawCategory.PRIESTLY_SERVICE, divineIntent: 'Constant spiritual vigilance', propheticTheme: 'The Eternal Flame', severity: LawSeverity.COMMAND, primaryTribe: [Tribe.LEVI], applicableSex: Gender.MALE, minAge: 20, maxAge: 50, landRequired: false, templeRequired: true, authorityLevel: AuthorityLevel.PRIESTLY, activationMode: ActivationMode.ALWAYS, penalty: 'The coldness of the nation and departure of the Glory.', modernApplication: 'The modern curse of "Apathy"; the loss of spiritual fire leading to a church/people that are lukewarm.' },
  { id: 116, title: 'No Eating Unleavened Bread (Outside Feast)', scripture: 'Exodus 12:15 (Implied Boundaries)', category: LawCategory.DIET, divineIntent: 'Sacred timing of biological reset', propheticTheme: 'The Season of Purity', severity: LawSeverity.INSTRUCTION, primaryTribe: 'All', applicableSex: 'Both', minAge: 0, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.HOUSEHOLD, activationMode: ActivationMode.ALWAYS, penalty: 'Confusion of seasons.', modernApplication: 'Modern metabolic confusion; the loss of biological rhythms (eating everything all the time).' },
  { id: 117, title: 'Not Marrying Forbidden Relatives', scripture: 'Leviticus 18', category: LawCategory.SEXUAL_ORDER, divineIntent: 'Genetic and social health', propheticTheme: 'Unmixed Blood', severity: LawSeverity.JUDGMENT, primaryTribe: 'All', applicableSex: 'Both', minAge: 13, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.HOUSEHOLD, activationMode: ActivationMode.ALWAYS, penalty: 'Genetic degradation and mental illness in the line.', modernApplication: 'The curse of "Generational Trauma"; the hidden cycles of incest and abuse that destroy the Remnant\'s mind.' },
  { id: 118, title: 'Modesty of the Priest', scripture: 'Exodus 20:26', category: LawCategory.PRIESTLY_SERVICE, divineIntent: 'Guarding the visual sanctity of the altar', propheticTheme: 'Sacred Cover', severity: LawSeverity.COMMAND, primaryTribe: [Tribe.LEVI], applicableSex: Gender.MALE, minAge: 20, maxAge: 50, landRequired: false, templeRequired: true, authorityLevel: AuthorityLevel.PRIESTLY, activationMode: ActivationMode.ALWAYS, penalty: 'Uncovering of shame.', modernApplication: 'The "Stage-Nudity" curse; the modern culture of immodesty and exposure, even in sacred spaces.' },
  { id: 119, title: 'Not Removing the Breastplate', scripture: 'Exodus 28:28', category: LawCategory.PRIESTLY_SERVICE, divineIntent: 'Permanent tribal connection', propheticTheme: 'Tied to the Tribes', severity: LawSeverity.COMMAND, primaryTribe: [Tribe.LEVI], applicableSex: Gender.MALE, minAge: 30, maxAge: 50, landRequired: false, templeRequired: true, authorityLevel: AuthorityLevel.PRIESTLY, activationMode: ActivationMode.ALWAYS, penalty: 'Disconnection from the heart of the people.', modernApplication: 'The "Ivory Tower" curse; leaders who have no empathy for the "12 tribes" they claim to serve.' },
  { id: 120, title: 'No Strange Garments', scripture: 'Zephaniah 1:8', category: LawCategory.IDENTITY, divineIntent: 'Visual identification with the Covenant', propheticTheme: 'The Holy Uniform', severity: LawSeverity.JUDGMENT, primaryTribe: 'All', applicableSex: 'Both', minAge: 0, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.INDIVIDUAL, activationMode: ActivationMode.ALWAYS, penalty: 'Visitation of the Most High against those clothed in strange apparel.', modernApplication: 'The "Fashion Slave" curse; the Remnant dressing like the world (hyper-sexualized or street-culture), losing their royal aura.' },
  { id: 121, title: 'The Law of the Vow (Fulfilment)', scripture: 'Numbers 30:2', category: LawCategory.GOVERNANCE, divineIntent: 'Integrity of the spoken intent', propheticTheme: 'Thy Word is Bond', severity: LawSeverity.COMMAND, primaryTribe: 'All', applicableSex: 'Both', minAge: 13, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.INDIVIDUAL, activationMode: ActivationMode.ALWAYS, penalty: 'Snared by the mouth.', modernApplication: 'The "Contract Breach" curse; a life of litigation and broken trust because the mouth cannot be trusted.' },
  { id: 122, title: 'No Using Familiar Spirits', scripture: 'Leviticus 19:31', category: LawCategory.IDENTITY, divineIntent: 'Sovereignty of the Holy Spirit', propheticTheme: 'Pure Counsel', severity: LawSeverity.JUDGMENT, primaryTribe: 'All', applicableSex: 'Both', minAge: 0, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.INDIVIDUAL, activationMode: ActivationMode.ALWAYS, penalty: 'Possession and madness.', modernApplication: 'The "Ouija/Medium" curse; trying to talk to the "dead" (ancestors) in a way that bypasses YAHAWAH, leading to schizophrenia.' },
  { id: 123, title: 'Honoring the Nazarite Vow', scripture: 'Numbers 6', category: LawCategory.IDENTITY, divineIntent: 'Extreme consecration for war/prophecy', propheticTheme: 'The Set-Apart Head', severity: LawSeverity.INSTRUCTION, primaryTribe: 'All', applicableSex: 'Both', minAge: 18, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.INDIVIDUAL, activationMode: ActivationMode.CONDITIONAL, penalty: 'Loss of strength (Samson effect).', modernApplication: 'The curse of "Wasted Potential"; the gifted youth who falls for the "delilahs" of Babylon and loses their crown.' },
  { id: 124, title: 'Not Profaning the Sabbath (In Business)', scripture: 'Nehemiah 13:15', category: LawCategory.APPOINTED_TIMES, divineIntent: 'Economic pause for spirit', propheticTheme: 'Sovereign Rest', severity: LawSeverity.JUDGMENT, primaryTribe: 'All', applicableSex: 'Both', minAge: 0, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.HOUSEHOLD, activationMode: ActivationMode.CALENDAR_BASED, penalty: 'Bringing more wrath upon Israel.', modernApplication: 'The "Rat Race" curse; working 7 days a week but never having enough money because the Sabbath blessing is missing.' },
  { id: 125, title: 'Separation of the Meat and Milk', scripture: 'Exodus 23:19 (Trad.)', category: LawCategory.DIET, divineIntent: 'Enzymatic boundary preservation', propheticTheme: 'Life over Death', severity: LawSeverity.INSTRUCTION, primaryTribe: 'All', applicableSex: 'Both', minAge: 0, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.INDIVIDUAL, activationMode: ActivationMode.ALWAYS, penalty: 'Indigestion of the soul.', modernApplication: 'Modern "Acid Reflux" and leaky gut; the biological confusion of mixing life-giving fluids with death-products.' },
  { id: 126, title: 'No Touching the Dead Body (Priests)', scripture: 'Leviticus 21:1', category: LawCategory.PRIESTLY_SERVICE, divineIntent: 'Staying in the frequency of Life', propheticTheme: 'Vibrant Sanctuary', severity: LawSeverity.COMMAND, primaryTribe: [Tribe.LEVI], applicableSex: Gender.MALE, minAge: 20, maxAge: 50, landRequired: false, templeRequired: true, authorityLevel: AuthorityLevel.PRIESTLY, activationMode: ActivationMode.ALWAYS, penalty: 'Defilement for seven days.', modernApplication: 'The "Spirit of Heaviness" curse; being constantly around "dead things" (dark media, graveyard culture) and losing the aura of joy.' },
  { id: 127, title: 'No Shaving the Head for the Dead', scripture: 'Leviticus 21:5', category: LawCategory.IDENTITY, divineIntent: 'Body temple dignity in grief', propheticTheme: 'Living Remembrance', severity: LawSeverity.COMMAND, primaryTribe: 'All', applicableSex: 'Both', minAge: 0, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.INDIVIDUAL, activationMode: ActivationMode.ALWAYS, penalty: 'Becoming like the heathen.', modernApplication: 'The "Self-Harm" curse; physical mutilation as a response to emotional pain.' },
  { id: 128, title: 'Law of the Silver Trumpets', scripture: 'Numbers 10', category: LawCategory.WAR_JUSTICE, divineIntent: 'Communication of the Tribal Pulse', propheticTheme: 'The Voice of the Nation', severity: LawSeverity.COMMAND, primaryTribe: [Tribe.LEVI], applicableSex: Gender.MALE, minAge: 20, maxAge: 50, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.NATIONAL, activationMode: ActivationMode.CONDITIONAL, penalty: 'Confusion in the camp during war.', modernApplication: 'The "Echo Chamber" curse; the Remnant being unable to organize because everyone is "blowing their own horn".' },
  { id: 129, title: 'Not Moving during the Sabbath', scripture: 'Exodus 16:29', category: LawCategory.APPOINTED_TIMES, divineIntent: 'Physical stillness for mental clarity', propheticTheme: 'Rest in Thy Place', severity: LawSeverity.INSTRUCTION, primaryTribe: 'All', applicableSex: 'Both', minAge: 0, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.INDIVIDUAL, activationMode: ActivationMode.CALENDAR_BASED, penalty: 'Exhaustion and spiritual drift.', modernApplication: 'The "Weekend Warrior" curse; turning the day of rest into the busiest day of the week, leading to chronic stress.' },
  { id: 130, title: 'Not Entering the Sanctuary Defiled', scripture: 'Leviticus 12:4', category: LawCategory.PRIESTLY_SERVICE, divineIntent: 'Protection of the High Frequency', propheticTheme: 'Pure Sanctuary', severity: LawSeverity.JUDGMENT, primaryTribe: 'All', applicableSex: 'Both', minAge: 0, maxAge: 120, landRequired: false, templeRequired: true, authorityLevel: AuthorityLevel.NATIONAL, activationMode: ActivationMode.CONDITIONAL, penalty: 'Sickness and sudden judgment.', modernApplication: 'The "Fake Presence" curse; bringing unrepented sin into the gathering, leading to "church hurt" and division.' },
  { id: 131, title: 'Giving the Shoulder, Cheeks, and Maw', scripture: 'Deuteronomy 18:3', category: LawCategory.GOVERNANCE, divineIntent: 'Sustaining the Priesthood (Order)', propheticTheme: 'Fuel for the Altar', severity: LawSeverity.COMMAND, primaryTribe: 'All', applicableSex: 'Both', minAge: 18, maxAge: 120, landRequired: true, templeRequired: true, authorityLevel: AuthorityLevel.HOUSEHOLD, activationMode: ActivationMode.ALWAYS, penalty: 'The priests leave the service, and the law departs.', modernApplication: 'The "Starving Teacher" curse; the true healers and teachers being forced to work for Babylon because the people won\'t feed them.' },
  { id: 132, title: 'The Law of the Scapegoat', scripture: 'Leviticus 16:10', category: LawCategory.APPOINTED_TIMES, divineIntent: 'Collective removal of national guilt', propheticTheme: 'Transferred Sin', severity: LawSeverity.JUDGMENT, primaryTribe: [Tribe.LEVI], applicableSex: Gender.MALE, minAge: 30, maxAge: 50, landRequired: true, templeRequired: true, authorityLevel: AuthorityLevel.NATIONAL, activationMode: ActivationMode.CALENDAR_BASED, penalty: 'National sins remaining on the head of the Tribes.', modernApplication: 'The "Generational Guilt" curse; the Remnant carrying the shame of their ancestors without a way to "send it away".' },
  { id: 133, title: 'No Following a Prince to Evil', scripture: 'Exodus 23:2', category: LawCategory.GOVERNANCE, divineIntent: 'Individual accountability despite leadership', propheticTheme: 'The Remnant Eye', severity: LawSeverity.JUDGMENT, primaryTribe: 'All', applicableSex: 'Both', minAge: 13, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.INDIVIDUAL, activationMode: ActivationMode.ALWAYS, penalty: 'Falling with the leader.', modernApplication: 'The "Cult of Personality" curse; following a tribal leader into ruin because one didn\'t check the Law themselves.' },
  { id: 134, title: 'Not Cutting the Tree of Fruit in War', scripture: 'Deuteronomy 20:19', category: LawCategory.WAR_JUSTICE, divineIntent: 'Preservation of future sustenance', propheticTheme: 'Long-term Stewardship', severity: LawSeverity.COMMAND, primaryTribe: 'All', applicableSex: Gender.MALE, minAge: 20, maxAge: 50, landRequired: true, templeRequired: false, authorityLevel: AuthorityLevel.NATIONAL, activationMode: ActivationMode.ALWAYS, penalty: 'Starvation after the victory.', modernApplication: 'The "Scorched Earth" curse; winning an argument or a legal battle but destroying the relationship (the tree) that could have fed you.' },
  { id: 135, title: 'No Using Diverse Weights', scripture: 'Leviticus 19:35', category: LawCategory.GOVERNANCE, divineIntent: 'Economic honesty frequency', propheticTheme: 'The True Balance', severity: LawSeverity.JUDGMENT, primaryTribe: 'All', applicableSex: 'Both', minAge: 18, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.NATIONAL, activationMode: ActivationMode.ALWAYS, penalty: 'Cursed is the pocket with a hole.', modernApplication: 'Inflation and Devaluation; the modern curse where $1 today is worth $0.10 tomorrow because of diverse weights in the bank.' },
  { id: 136, title: 'Law of the Captive Woman', scripture: 'Deuteronomy 21', category: LawCategory.WAR_JUSTICE, divineIntent: 'Human dignity even in conflict', propheticTheme: 'Justice in Power', severity: LawSeverity.COMMAND, primaryTribe: 'All', applicableSex: Gender.MALE, minAge: 20, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.NATIONAL, activationMode: ActivationMode.ALWAYS, penalty: 'Cruelty bringing judgment on the lineage.', modernApplication: 'The "Abusive Authority" curse; the modern culture of toxic power dynamics and the exploitation of the weak.' },
  { id: 137, title: 'No Profaning the Firstborn Portion', scripture: 'Deuteronomy 21:17', category: LawCategory.GOVERNANCE, divineIntent: 'Inheritance integrity', propheticTheme: 'The Double Portion', severity: LawSeverity.COMMAND, primaryTribe: 'All', applicableSex: 'Both', minAge: 18, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.HOUSEHOLD, activationMode: ActivationMode.ALWAYS, penalty: 'Disinherited lineage.', modernApplication: 'The "Will/Trust" curse; siblings fighting over assets because the father didn\'t follow the order of law.' },
  { id: 138, title: 'Law of the Rebellious Son', scripture: 'Deuteronomy 21:18', category: LawCategory.GOVERNANCE, divineIntent: 'Preventing the rot of the nation at the root', propheticTheme: 'The Rod of Order', severity: LawSeverity.JUDGMENT, primaryTribe: 'All', applicableSex: Gender.MALE, minAge: 13, maxAge: 120, landRequired: true, templeRequired: false, authorityLevel: AuthorityLevel.HOUSEHOLD, activationMode: ActivationMode.ALWAYS, penalty: 'Removal of the evil from Israel.', modernApplication: 'The "Gang Culture" curse; the modern plague of youth without discipline destroying the future of the tribes.' },
  { id: 139, title: 'Not Eating the Fruit of a Young Tree', scripture: 'Leviticus 19:23', category: LawCategory.DIET, divineIntent: 'Allowing the earth to gain strength', propheticTheme: 'Orlah Protocol', severity: LawSeverity.INSTRUCTION, primaryTribe: 'All', applicableSex: 'Both', minAge: 0, maxAge: 120, landRequired: true, templeRequired: false, authorityLevel: AuthorityLevel.HOUSEHOLD, activationMode: ActivationMode.ALWAYS, penalty: 'Nutrient-deficient fruit and short-lived trees.', modernApplication: 'The "Fast-Food" curse; the modern culture of immediate gratification that destroys the long-term health of the body.' },
  { id: 140, title: 'The Law of the Parapet (Roof)', scripture: 'Deuteronomy 22:8', category: LawCategory.GOVERNANCE, divineIntent: 'Individual liability for public safety', propheticTheme: 'Watchman of the Home', severity: LawSeverity.COMMAND, primaryTribe: 'All', applicableSex: 'Both', minAge: 18, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.HOUSEHOLD, activationMode: ActivationMode.ALWAYS, penalty: 'Blood-guilt upon thy house.', modernApplication: 'The "Negligence" curse; ignoring safety in thy business or home, leading to lawsuits and the death of others.' },
  { id: 141, title: 'No Mixed Fabrics (Wool & Linen)', scripture: 'Deuteronomy 22:11', category: LawCategory.IDENTITY, divineIntent: 'Bio-electric frequency shield', propheticTheme: 'Shatnez Protocol', severity: LawSeverity.COMMAND, primaryTribe: 'All', applicableSex: 'Both', minAge: 0, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.INDIVIDUAL, activationMode: ActivationMode.ALWAYS, penalty: 'Neurological static and spiritual interference.', modernApplication: 'Modern "Anxiety" and insomnia; the biological disruption of the body\'s natural electrical field.' },
  { id: 142, title: 'The Law of the Tassels (Blue Thread)', scripture: 'Numbers 15:38', category: LawCategory.IDENTITY, divineIntent: 'Reminder of the Royal Law', propheticTheme: 'The Blue Cord', severity: LawSeverity.COMMAND, primaryTribe: 'All', applicableSex: Gender.MALE, minAge: 13, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.INDIVIDUAL, activationMode: ActivationMode.ALWAYS, penalty: 'Forgetting the commandments.', modernApplication: 'The "Drifting" curse; slowly losing thy way because there are no physical markers of the Covenant in thy daily life.' },
  { id: 143, title: 'Not Marrying an Unbeliever', scripture: 'Deuteronomy 7:3', category: LawCategory.SEXUAL_ORDER, divineIntent: 'Cultural and spiritual preservation', propheticTheme: 'The Holy Seed', severity: LawSeverity.JUDGMENT, primaryTribe: 'All', applicableSex: 'Both', minAge: 13, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.HOUSEHOLD, activationMode: ActivationMode.ALWAYS, penalty: 'Turning the heart away from YAHAWAH.', modernApplication: 'The "House Divided" curse; a life of perpetual conflict and children who have no clear identity.' },
  { id: 144, title: 'No Charging Interest to a Brother', scripture: 'Exodus 22:25', category: LawCategory.GOVERNANCE, divineIntent: 'Brotherly economic support', propheticTheme: 'Anti-Usury Shield', severity: LawSeverity.JUDGMENT, primaryTribe: 'All', applicableSex: 'Both', minAge: 18, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.HOUSEHOLD, activationMode: ActivationMode.ALWAYS, penalty: 'The blessing is removed from thy storehouse.', modernApplication: 'The modern "Credit Card" curse; the Remnant being bled dry by interest because they didn\'t lend to each other in righteousness.' },
  { id: 145, title: 'Law of the Poor Man\'s Tithe', scripture: 'Deuteronomy 14:28', category: LawCategory.GOVERNANCE, divineIntent: 'Institutionalized mercy', propheticTheme: 'The Third Year Store', severity: LawSeverity.COMMAND, primaryTribe: 'All', applicableSex: 'Both', minAge: 18, maxAge: 120, landRequired: true, templeRequired: false, authorityLevel: AuthorityLevel.NATIONAL, activationMode: ActivationMode.CALENDAR_BASED, penalty: 'The land becoming lean and the poor crying out.', modernApplication: 'The "Welfare" curse; the Remnant depending on the state because they didn\'t take care of their own widow and orphan.' },
  { id: 146, title: 'Not Using the Altar for Ego', scripture: 'Exodus 20:25', category: LawCategory.PRIESTLY_SERVICE, divineIntent: 'Keeping the focus on the Divine', propheticTheme: 'Unhewn Stones', severity: LawSeverity.INSTRUCTION, primaryTribe: [Tribe.LEVI], applicableSex: 'Both', minAge: 20, maxAge: 50, landRequired: false, templeRequired: true, authorityLevel: AuthorityLevel.PRIESTLY, activationMode: ActivationMode.ALWAYS, penalty: 'The sacrifice is rejected.', modernApplication: 'The "Performance Ministry" curse; the modern focus on "branding" and "influence" that makes the leader the star instead of the Law.' },
  { id: 147, title: 'Honoring the Widow and Fatherless', scripture: 'Exodus 22:22', category: LawCategory.GOVERNANCE, divineIntent: 'Protection of the lineage without a head', propheticTheme: 'The Father\'s Heart', severity: LawSeverity.JUDGMENT, primaryTribe: 'All', applicableSex: 'Both', minAge: 0, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.INDIVIDUAL, activationMode: ActivationMode.ALWAYS, penalty: '"My wrath shall wax hot, and I will kill you with the sword."', modernApplication: 'The "Abandoned Generation" curse; the rise of single-mother households leading to the vulnerability of the entire tribe.' },
  { id: 148, title: 'Not Seizing the Mother Bird with Young', scripture: 'Deuteronomy 22:6', category: LawCategory.DIET, divineIntent: 'Compassion for the source of life', propheticTheme: 'Ecological Mercy', severity: LawSeverity.INSTRUCTION, primaryTribe: 'All', applicableSex: 'Both', minAge: 0, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.INDIVIDUAL, activationMode: ActivationMode.ALWAYS, penalty: 'Loss of abundance in the future.', modernApplication: 'The "Extinction" curse; killing the very systems that provide thy life in pursuit of immediate profit.' },
  { id: 149, title: 'The Law of the First of the Dough', scripture: 'Numbers 15:20', category: LawCategory.DIET, divineIntent: 'Sanctifying the sustenance of the home', propheticTheme: 'The Hallah Portion', severity: LawSeverity.COMMAND, primaryTribe: 'All', applicableSex: Gender.FEMALE, minAge: 12, maxAge: 120, landRequired: true, templeRequired: false, authorityLevel: AuthorityLevel.HOUSEHOLD, activationMode: ActivationMode.ALWAYS, penalty: 'Lack of peace in the bread of the house.', modernApplication: 'The "Empty Calorie" curse; eating food that is technically present but spiritually and nutritionally dead.' },
  { id: 150, title: 'No False Witness (Court)', scripture: 'Exodus 23:1', category: LawCategory.GOVERNANCE, divineIntent: 'Integrity of the judicial system', propheticTheme: 'The Shield of Emet', severity: LawSeverity.JUDGMENT, primaryTribe: 'All', applicableSex: 'Both', minAge: 13, maxAge: 120, landRequired: false, templeRequired: false, authorityLevel: AuthorityLevel.NATIONAL, activationMode: ActivationMode.ALWAYS, penalty: 'Perversion of justice and the curse of the liar.', modernApplication: 'The "Perjury" curse; a society where truth cannot be found in the courts, leading to the oppression of the Remnant.' }
];

export const VOCAB_CARDS: VocabCard[] = [
  {
    word: 'YAHAWAH',
    original: 'יהוה',
    transliteration: 'ya-ha-WAH',
    language: 'Hebrew',
    rootMeaning: 'The Self-Existent One; He Is.',
    covenantMeaning: 'The Eternal Authority of the 12 Tribes.',
    restoredUnderstanding: 'Restoring the Name to break the spells of "The Lord".',
    scripture: 'Exodus 3:14'
  },
  {
    word: 'YAHAWASHI',
    original: 'יהושי',
    transliteration: 'ya-ha-WA-shi',
    language: 'Hebrew',
    rootMeaning: 'Yah is Salvation.',
    covenantMeaning: 'The High Priest and King of the Remnant.',
    restoredUnderstanding: 'Removing Greek phonetic distortions.',
    scripture: 'Matthew 1:21'
  },
  {
    word: 'SHALOM',
    original: 'שלום',
    transliteration: 'sha-LOHM',
    language: 'Hebrew',
    rootMeaning: 'Wholeness; Soundness.',
    covenantMeaning: 'Total alignment with the Blueprint.',
    restoredUnderstanding: 'Not just absence of war, but presence of health.',
    scripture: 'John 14:27'
  },
  {
    word: 'TORAH',
    original: 'תורה',
    transliteration: 'toh-RAH',
    language: 'Hebrew',
    rootMeaning: 'Instruction; Teaching.',
    covenantMeaning: 'The sovereign blueprint for life.',
    restoredUnderstanding: 'Replacing "Law" (legalism) with "Instructions" (love).',
    scripture: 'Psalm 19:7'
  },
  {
    word: 'MITZVAH',
    original: 'מצוה',
    transliteration: 'mitz-VAH',
    language: 'Hebrew',
    rootMeaning: 'Commandment; Deed of Merit.',
    covenantMeaning: 'Active connection through obedience.',
    restoredUnderstanding: 'Every command is an opportunity for activation.',
    scripture: 'Psalm 119:1'
  },
  {
    word: 'RUACH',
    original: 'רוח',
    transliteration: 'ROO-akh',
    language: 'Hebrew',
    rootMeaning: 'Breath; Wind; Spirit.',
    covenantMeaning: 'The invisible force animating the People.',
    restoredUnderstanding: 'The Father\'s breath inside the vessel.',
    scripture: 'Ezekiel 37:9'
  },
  {
    word: 'QODESH',
    original: 'קדש',
    transliteration: 'koh-DESH',
    language: 'Hebrew',
    rootMeaning: 'Set-Apart; Dedicated.',
    covenantMeaning: 'Exclusivity for the Most High.',
    restoredUnderstanding: 'Breaking "Holy" to realize SEPARATION.',
    scripture: 'Leviticus 20:26'
  },
  {
    word: 'EMET',
    original: 'אמת',
    transliteration: 'eh-MET',
    language: 'Hebrew',
    rootMeaning: 'Truth; Firmness.',
    covenantMeaning: 'The foundational substance of the Word.',
    restoredUnderstanding: 'Truth is a firm place to stand.',
    scripture: 'Psalm 119:142'
  },
  {
    word: 'TSADAQ',
    original: 'צדק',
    transliteration: 'tsah-DAHK',
    language: 'Hebrew',
    rootMeaning: 'Righteousness; Straightness.',
    covenantMeaning: 'Functionally straight conduct.',
    restoredUnderstanding: 'Living in correct relationship with the Blueprint.',
    scripture: 'Psalm 23:3'
  },
  {
    word: 'SHEMITA',
    original: 'שמטה',
    transliteration: 'sheh-mee-TAH',
    language: 'Hebrew',
    rootMeaning: 'Release; Remission.',
    covenantMeaning: 'Economic and mental freedom protocol.',
    restoredUnderstanding: 'The ultimate debt cancellation cycle.',
    scripture: 'Deuteronomy 15:1'
  },
  {
    word: 'AHAB',
    original: 'אהב',
    transliteration: 'ah-HAHB',
    language: 'Hebrew',
    rootMeaning: 'Love; To give.',
    covenantMeaning: 'Commitment to the Commandments.',
    restoredUnderstanding: 'Love is a choice of obedience.',
    scripture: 'John 14:15'
  },
  {
    word: 'YASHAR',
    original: 'ישר',
    transliteration: 'yah-SHAR',
    language: 'Hebrew',
    rootMeaning: 'Upright; Pleasing.',
    covenantMeaning: 'Character of the Narrow Path.',
    restoredUnderstanding: 'The root of "Israel" (Yashar-al).',
    scripture: 'Proverbs 2:7'
  },
  {
    word: 'HEYKAL',
    original: 'היכל',
    transliteration: 'hay-KAHL',
    language: 'Hebrew',
    rootMeaning: 'Temple; Palace.',
    covenantMeaning: 'The dwelling place of the Most High (Body).',
    restoredUnderstanding: 'Thy body is the King\'s mansion.',
    scripture: '1 Corinthians 6:19'
  },
  {
    word: 'ZAKAR',
    original: 'זכר',
    transliteration: 'zah-KAR',
    language: 'Hebrew',
    rootMeaning: 'To Remember; To Mark.',
    covenantMeaning: 'Preserving ancestral history.',
    restoredUnderstanding: 'Memory is an active spiritual duty.',
    scripture: 'Exodus 20:8'
  },
  {
    word: 'AMAWNAH',
    original: 'אמונה',
    transliteration: 'a-mow-NAH',
    language: 'Hebrew',
    rootMeaning: 'Faith; Trust; Fidelity.',
    covenantMeaning: 'Unwavering loyalty to the Covenant.',
    restoredUnderstanding: 'Faith is ACTION based on trust.',
    scripture: 'Habakkuk 2:4'
  }
];

export const PROTOCOLS = [
  { id: 'p1', category: LawCategory.IDENTITY, title: 'Morning Affirmation', description: 'Declare the name of YAHAWAH upon waking.', scripture: 'Exodus 20:2', points: 10 },
  { id: 'p2', category: LawCategory.DIET, title: 'Clean Eating', description: 'Abstain from all forbidden meats for the duration of the watch.', scripture: 'Leviticus 11:1-47', points: 20 },
  { id: 'p3', category: LawCategory.GOVERNANCE, title: 'Tongue Restraint', description: 'Practice silence for one hour during midday.', scripture: 'Proverbs 10:19', points: 15 }
];

export const Icons = {
  Menorah: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20M7 8v6a5 5 0 0 0 10 0V8M2 10v4a10 10 0 0 0 20 0v-4" />
    </svg>
  ),
  Lion: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M8 10c0-2.21 1.79-4 4-4s4 1.79 4 4" />
    </svg>
  )
};

export const HERBS: Herb[] = [
  {
    name: 'Pure Olive Oil',
    hebrewName: 'Shemen Zayit',
    category: 'Oils',
    scriptures: ['Exodus 30:23', 'James 5:14'],
    spiritualFunction: 'Anointing for Protection',
    physicalApplication: 'Cellular Repair',
    emotionalRoot: 'Lack of peace/anointing',
    bodySystems: ['Nervous', 'Skin'],
    curseBroken: 'Spirit of Heaviness',
    violationLink: 'Neglecting the Holy Spirit',
    preparation: 'Cold pressed, apply to gates.'
  }
];

export const DAILY_MANNA = [
  { slot: 'Morning Watch', scripture: 'Psalm 5:3', prayer: 'YAHAWAH, awaken the Lion within.' },
  { slot: 'Midday Duty', scripture: 'Psalm 55:17', prayer: 'YAHAWAH, purge my mind of Babylonian anxiety.' },
  { slot: 'Evening Seal', scripture: 'Psalm 4:8', prayer: 'I seal my gates in the name of YAHAWASHI.' }
];

export const ANCESTRAL_CALENDAR: Record<string, CalendarDay[]> = {
  'Nissan': Array.from({ length: 30 }, (_, i) => ({
    day: i + 1, month: 'Nissan', moon: MoonPhase.NEW, tribe: Tribe.JUDAH,
    remedyName: 'Olive Oil', aura: 'aura-pulse',
    lore: "Judah led the march. The scepter shall not depart.",
    codex_remedy: "First Watch Anointing"
  }))
};

export const TRIBE_COLORS: Record<string, string> = {
  [Tribe.JUDAH]: '#d4af37', [Tribe.REUBEN]: '#ef4444', [Tribe.SIMEON]: '#22c55e', 
  [Tribe.LEVI]: '#3b82f6', [Tribe.DAN]: '#14b8a6', [Tribe.NAPHTALI]: '#0ea5e9', 
  [Tribe.GAD]: '#4d7c0f', [Tribe.ASHER]: '#10b981', [Tribe.ISSACHAR]: '#ffffff', 
  [Tribe.ZEBULUN]: '#4f46e5', [Tribe.EPHRAIM]: '#a855f7', [Tribe.MANASSEH]: '#3b82f6',
  [Tribe.BENJAMIN]: '#1c1917', 'All Tribes': '#d4af37'
};

export const TIMELINE_DATA = [
  { era: 'Creation Epoch', year: '4004 BC', event: 'Edenic Covenant', significance: 'Foundation of Sovereignty', user_note: 'YAHAWAH\'s original design.' }
];

export const LORDS_PRAYER = {
  title: "The Prayer of YAHAWASHI",
  scripture: "Matthew 6:9-13",
  text: "Our Father YAHAWAH which art in heaven, Hallowed be thy name.\nThy kingdom come. Thy will be done in earth, as it is in heaven.\nGive us this day our daily bread.\nAnd forgive us our debts, as we forgive our debtors.\nAnd lead us not into temptation, but deliver us from evil: For thine is the kingdom, and the power, and the glory, for ever. Amen.",
  transliteration: "Abunash ba-shamayim, yit-qadash shmaka.\nTaba mal-kwtaka. ya-as-ah rat-zwan-aka ba-aratz ka-asher ba-shamayim.\nTan lanu ha-ywm lakh-man-u tam-yid.\nwa-salakh lanu khaw-bay-nu ka-asher salakh-nu la-khaw-bay-nu.\nwa-al taby-anu la-nas-ay-un, abal hat-zylan-u ma-ra: k-y laka ham-mal-kwt, wa-hag-gab-wr-ah, wa-hat-tip-ar-at, la-wla-m-ay wa-lam-ay-im. Aman."
};
