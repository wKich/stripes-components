import { find } from 'lodash';

// This list is derived from the table provided at https://www.loc.gov/standards/iso639-2/ascii_8bits.html
// It uses the ISO 639-2 standard. Not all language names have both a two-character and three-character
// code, but both are provided when available.
const languages = [
  { alpha3: 'aar', alpha2: 'aa', name: 'Afar' },
  { alpha3: 'abk', alpha2: 'ab', name: 'Abkhazian' },
  { alpha3: 'ace', alpha2: '', name: 'Achinese' },
  { alpha3: 'ach', alpha2: '', name: 'Acoli' },
  { alpha3: 'ada', alpha2: '', name: 'Adangme' },
  { alpha3: 'ady', alpha2: '', name: 'Adyghe; Adygei' },
  { alpha3: 'afa', alpha2: '', name: 'Afro-Asiatic languages' },
  { alpha3: 'afh', alpha2: '', name: 'Afrihili' },
  { alpha3: 'afr', alpha2: 'af', name: 'Afrikaans' },
  { alpha3: 'ain', alpha2: '', name: 'Ainu' },
  { alpha3: 'aka', alpha2: 'ak', name: 'Akan' },
  { alpha3: 'akk', alpha2: '', name: 'Akkadian' },
  { alpha3: 'alb', alpha2: 'sq', name: 'Albanian' },
  { alpha3: 'ale', alpha2: '', name: 'Aleut' },
  { alpha3: 'alg', alpha2: '', name: 'Algonquian languages' },
  { alpha3: 'alt', alpha2: '', name: 'Southern Altai' },
  { alpha3: 'amh', alpha2: 'am', name: 'Amharic' },
  { alpha3: 'ang', alpha2: '', name: 'English, Old (ca.450-1100)' },
  { alpha3: 'anp', alpha2: '', name: 'Angika' },
  { alpha3: 'apa', alpha2: '', name: 'Apache languages' },
  { alpha3: 'ara', alpha2: 'ar', name: 'Arabic' },
  { alpha3: 'arc', alpha2: '', name: 'Official Aramaic (700-300 BCE); Imperial Aramaic (700-300 BCE)' },
  { alpha3: 'arg', alpha2: 'an', name: 'Aragonese' },
  { alpha3: 'arm', alpha2: 'hy', name: 'Armenian' },
  { alpha3: 'arn', alpha2: '', name: 'Mapudungun; Mapuche' },
  { alpha3: 'arp', alpha2: '', name: 'Arapaho' },
  { alpha3: 'art', alpha2: '', name: 'Artificial languages' },
  { alpha3: 'arw', alpha2: '', name: 'Arawak' },
  { alpha3: 'asm', alpha2: 'as', name: 'Assamese' },
  { alpha3: 'ast', alpha2: '', name: 'Asturian; Bable; Leonese; Asturleonese' },
  { alpha3: 'ath', alpha2: '', name: 'Athapascan languages' },
  { alpha3: 'aus', alpha2: '', name: 'Australian languages' },
  { alpha3: 'ava', alpha2: 'av', name: 'Avaric' },
  { alpha3: 'ave', alpha2: 'ae', name: 'Avestan' },
  { alpha3: 'awa', alpha2: '', name: 'Awadhi' },
  { alpha3: 'aym', alpha2: 'ay', name: 'Aymara' },
  { alpha3: 'aze', alpha2: 'az', name: 'Azerbaijani' },
  { alpha3: 'bad', alpha2: '', name: 'Banda languages' },
  { alpha3: 'bai', alpha2: '', name: 'Bamileke languages' },
  { alpha3: 'bak', alpha2: 'ba', name: 'Bashkir' },
  { alpha3: 'bal', alpha2: '', name: 'Baluchi' },
  { alpha3: 'bam', alpha2: 'bm', name: 'Bambara' },
  { alpha3: 'ban', alpha2: '', name: 'Balinese' },
  { alpha3: 'baq', alpha2: 'eu', name: 'Basque' },
  { alpha3: 'bas', alpha2: '', name: 'Basa' },
  { alpha3: 'bat', alpha2: '', name: 'Baltic languages' },
  { alpha3: 'bej', alpha2: '', name: 'Beja; Bedawiyet' },
  { alpha3: 'bel', alpha2: 'be', name: 'Belarusian' },
  { alpha3: 'bem', alpha2: '', name: 'Bemba' },
  { alpha3: 'ben', alpha2: 'bn', name: 'Bengali' },
  { alpha3: 'ber', alpha2: '', name: 'Berber languages' },
  { alpha3: 'bho', alpha2: '', name: 'Bhojpuri' },
  { alpha3: 'bih', alpha2: 'bh', name: 'Bihari languages' },
  { alpha3: 'bik', alpha2: '', name: 'Bikol' },
  { alpha3: 'bin', alpha2: '', name: 'Bini; Edo' },
  { alpha3: 'bis', alpha2: 'bi', name: 'Bislama' },
  { alpha3: 'bla', alpha2: '', name: 'Siksika' },
  { alpha3: 'bnt', alpha2: '', name: 'Bantu languages' },
  { alpha3: 'bos', alpha2: 'bs', name: 'Bosnian' },
  { alpha3: 'bra', alpha2: '', name: 'Braj' },
  { alpha3: 'bre', alpha2: 'br', name: 'Breton' },
  { alpha3: 'btk', alpha2: '', name: 'Batak languages' },
  { alpha3: 'bua', alpha2: '', name: 'Buriat' },
  { alpha3: 'bug', alpha2: '', name: 'Buginese' },
  { alpha3: 'bul', alpha2: 'bg', name: 'Bulgarian' },
  { alpha3: 'bur', alpha2: 'my', name: 'Burmese' },
  { alpha3: 'byn', alpha2: '', name: 'Blin; Bilin' },
  { alpha3: 'cad', alpha2: '', name: 'Caddo' },
  { alpha3: 'cai', alpha2: '', name: 'Central American Indian languages' },
  { alpha3: 'car', alpha2: '', name: 'Galibi Carib' },
  { alpha3: 'cat', alpha2: 'ca', name: 'Catalan; Valencian' },
  { alpha3: 'cau', alpha2: '', name: 'Caucasian languages' },
  { alpha3: 'ceb', alpha2: '', name: 'Cebuano' },
  { alpha3: 'cel', alpha2: '', name: 'Celtic languages' },
  { alpha3: 'cha', alpha2: 'ch', name: 'Chamorro' },
  { alpha3: 'chb', alpha2: '', name: 'Chibcha' },
  { alpha3: 'che', alpha2: 'ce', name: 'Chechen' },
  { alpha3: 'chg', alpha2: '', name: 'Chagatai' },
  { alpha3: 'chi', alpha2: 'zh', name: 'Chinese' },
  { alpha3: 'chk', alpha2: '', name: 'Chuukese' },
  { alpha3: 'chm', alpha2: '', name: 'Mari' },
  { alpha3: 'chn', alpha2: '', name: 'Chinook jargon' },
  { alpha3: 'cho', alpha2: '', name: 'Choctaw' },
  { alpha3: 'chp', alpha2: '', name: 'Chipewyan; Dene Suline' },
  { alpha3: 'chr', alpha2: '', name: 'Cherokee' },
  {
    alpha3: 'chu',
    alpha2: 'cu',
    name: 'Church Slavic; Old Slavonic; Church Slavonic; Old Bulgarian; Old Church Slavonic'
  },
  { alpha3: 'chv', alpha2: 'cv', name: 'Chuvash' },
  { alpha3: 'chy', alpha2: '', name: 'Cheyenne' },
  { alpha3: 'cmc', alpha2: '', name: 'Chamic languages' },
  { alpha3: 'cnr', alpha2: '', name: 'Montenegrin' },
  { alpha3: 'cop', alpha2: '', name: 'Coptic' },
  { alpha3: 'cor', alpha2: 'kw', name: 'Cornish' },
  { alpha3: 'cos', alpha2: 'co', name: 'Corsican' },
  { alpha3: 'cpe', alpha2: '', name: 'Creoles and pidgins, English based' },
  { alpha3: 'cpf', alpha2: '', name: 'Creoles and pidgins, French-based' },
  { alpha3: 'cpp', alpha2: '', name: 'Creoles and pidgins, Portuguese-based' },
  { alpha3: 'cre', alpha2: 'cr', name: 'Cree' },
  { alpha3: 'crh', alpha2: '', name: 'Crimean Tatar; Crimean Turkish' },
  { alpha3: 'crp', alpha2: '', name: 'Creoles and pidgins' },
  { alpha3: 'csb', alpha2: '', name: 'Kashubian' },
  { alpha3: 'cus', alpha2: '', name: 'Cushitic languages' },
  { alpha3: 'cze', alpha2: 'cs', name: 'Czech' },
  { alpha3: 'dak', alpha2: '', name: 'Dakota' },
  { alpha3: 'dan', alpha2: 'da', name: 'Danish' },
  { alpha3: 'dar', alpha2: '', name: 'Dargwa' },
  { alpha3: 'day', alpha2: '', name: 'Land Dayak languages' },
  { alpha3: 'del', alpha2: '', name: 'Delaware' },
  { alpha3: 'den', alpha2: '', name: 'Slave (Athapascan)' },
  { alpha3: 'dgr', alpha2: '', name: 'Dogrib' },
  { alpha3: 'din', alpha2: '', name: 'Dinka' },
  { alpha3: 'div', alpha2: 'dv', name: 'Divehi; Dhivehi; Maldivian' },
  { alpha3: 'doi', alpha2: '', name: 'Dogri' },
  { alpha3: 'dra', alpha2: '', name: 'Dravidian languages' },
  { alpha3: 'dsb', alpha2: '', name: 'Lower Sorbian' },
  { alpha3: 'dua', alpha2: '', name: 'Duala' },
  { alpha3: 'dum', alpha2: '', name: 'Dutch, Middle (ca.1050-1350)' },
  { alpha3: 'dut', alpha2: 'nl', name: 'Dutch; Flemish' },
  { alpha3: 'dyu', alpha2: '', name: 'Dyula' },
  { alpha3: 'dzo', alpha2: 'dz', name: 'Dzongkha' },
  { alpha3: 'efi', alpha2: '', name: 'Efik' },
  { alpha3: 'egy', alpha2: '', name: 'Egyptian (Ancient)' },
  { alpha3: 'eka', alpha2: '', name: 'Ekajuk' },
  { alpha3: 'elx', alpha2: '', name: 'Elamite' },
  { alpha3: 'eng', alpha2: 'en', name: 'English' },
  { alpha3: 'enm', alpha2: '', name: 'English, Middle (1100-1500)' },
  { alpha3: 'epo', alpha2: 'eo', name: 'Esperanto' },
  { alpha3: 'est', alpha2: 'et', name: 'Estonian' },
  { alpha3: 'ewe', alpha2: 'ee', name: 'Ewe' },
  { alpha3: 'ewo', alpha2: '', name: 'Ewondo' },
  { alpha3: 'fan', alpha2: '', name: 'Fang' },
  { alpha3: 'fao', alpha2: 'fo', name: 'Faroese' },
  { alpha3: 'fat', alpha2: '', name: 'Fanti' },
  { alpha3: 'fij', alpha2: 'fj', name: 'Fijian' },
  { alpha3: 'fil', alpha2: '', name: 'Filipino; Pilipino' },
  { alpha3: 'fin', alpha2: 'fi', name: 'Finnish' },
  { alpha3: 'fiu', alpha2: '', name: 'Finno-Ugrian languages' },
  { alpha3: 'fon', alpha2: '', name: 'Fon' },
  { alpha3: 'fre', alpha2: 'fr', name: 'French' },
  { alpha3: 'frm', alpha2: '', name: 'French, Middle (ca.1400-1600)' },
  { alpha3: 'fro', alpha2: '', name: 'French, Old (842-ca.1400)' },
  { alpha3: 'frr', alpha2: '', name: 'Northern Frisian' },
  { alpha3: 'frs', alpha2: '', name: 'Eastern Frisian' },
  { alpha3: 'fry', alpha2: 'fy', name: 'Western Frisian' },
  { alpha3: 'ful', alpha2: 'ff', name: 'Fulah' },
  { alpha3: 'fur', alpha2: '', name: 'Friulian' },
  { alpha3: 'gaa', alpha2: '', name: 'Ga' },
  { alpha3: 'gay', alpha2: '', name: 'Gayo' },
  { alpha3: 'gba', alpha2: '', name: 'Gbaya' },
  { alpha3: 'gem', alpha2: '', name: 'Germanic languages' },
  { alpha3: 'geo', alpha2: 'ka', name: 'Georgian' },
  { alpha3: 'ger', alpha2: 'de', name: 'German' },
  { alpha3: 'gez', alpha2: '', name: 'Geez' },
  { alpha3: 'gil', alpha2: '', name: 'Gilbertese' },
  { alpha3: 'gla', alpha2: 'gd', name: 'Gaelic; Scottish Gaelic' },
  { alpha3: 'gle', alpha2: 'ga', name: 'Irish' },
  { alpha3: 'glg', alpha2: 'gl', name: 'Galician' },
  { alpha3: 'glv', alpha2: 'gv', name: 'Manx' },
  { alpha3: 'gmh', alpha2: '', name: 'German, Middle High (ca.1050-1500)' },
  { alpha3: 'goh', alpha2: '', name: 'German, Old High (ca.750-1050)' },
  { alpha3: 'gon', alpha2: '', name: 'Gondi' },
  { alpha3: 'gor', alpha2: '', name: 'Gorontalo' },
  { alpha3: 'got', alpha2: '', name: 'Gothic' },
  { alpha3: 'grb', alpha2: '', name: 'Grebo' },
  { alpha3: 'grc', alpha2: '', name: 'Greek, Ancient (to 1453)' },
  { alpha3: 'gre', alpha2: 'el', name: 'Greek, Modern (1453-)' },
  { alpha3: 'grn', alpha2: 'gn', name: 'Guarani' },
  { alpha3: 'gsw', alpha2: '', name: 'Swiss German; Alemannic; Alsatian' },
  { alpha3: 'guj', alpha2: 'gu', name: 'Gujarati' },
  { alpha3: 'gwi', alpha2: '', name: 'Gwich\'in' },
  { alpha3: 'hai', alpha2: '', name: 'Haida' },
  { alpha3: 'hat', alpha2: 'ht', name: 'Haitian; Haitian Creole' },
  { alpha3: 'hau', alpha2: 'ha', name: 'Hausa' },
  { alpha3: 'haw', alpha2: '', name: 'Hawaiian' },
  { alpha3: 'heb', alpha2: 'he', name: 'Hebrew' },
  { alpha3: 'her', alpha2: 'hz', name: 'Herero' },
  { alpha3: 'hil', alpha2: '', name: 'Hiligaynon' },
  { alpha3: 'him', alpha2: '', name: 'Himachali languages; Western Pahari languages' },
  { alpha3: 'hin', alpha2: 'hi', name: 'Hindi' },
  { alpha3: 'hit', alpha2: '', name: 'Hittite' },
  { alpha3: 'hmn', alpha2: '', name: 'Hmong; Mong' },
  { alpha3: 'hmo', alpha2: 'ho', name: 'Hiri Motu' },
  { alpha3: 'hrv', alpha2: 'hr', name: 'Croatian' },
  { alpha3: 'hsb', alpha2: '', name: 'Upper Sorbian' },
  { alpha3: 'hun', alpha2: 'hu', name: 'Hungarian' },
  { alpha3: 'hup', alpha2: '', name: 'Hupa' },
  { alpha3: 'iba', alpha2: '', name: 'Iban' },
  { alpha3: 'ibo', alpha2: 'ig', name: 'Igbo' },
  { alpha3: 'ice', alpha2: 'is', name: 'Icelandic' },
  { alpha3: 'ido', alpha2: 'io', name: 'Ido' },
  { alpha3: 'iii', alpha2: 'ii', name: 'Sichuan Yi; Nuosu' },
  { alpha3: 'ijo', alpha2: '', name: 'Ijo languages' },
  { alpha3: 'iku', alpha2: 'iu', name: 'Inuktitut' },
  { alpha3: 'ile', alpha2: 'ie', name: 'Interlingue; Occidental' },
  { alpha3: 'ilo', alpha2: '', name: 'Iloko' },
  { alpha3: 'ina', alpha2: 'ia', name: 'Interlingua (International Auxiliary Language Association)' },
  { alpha3: 'inc', alpha2: '', name: 'Indic languages' },
  { alpha3: 'ind', alpha2: 'id', name: 'Indonesian' },
  { alpha3: 'ine', alpha2: '', name: 'Indo-European languages' },
  { alpha3: 'inh', alpha2: '', name: 'Ingush' },
  { alpha3: 'ipk', alpha2: 'ik', name: 'Inupiaq' },
  { alpha3: 'ira', alpha2: '', name: 'Iranian languages' },
  { alpha3: 'iro', alpha2: '', name: 'Iroquoian languages' },
  { alpha3: 'ita', alpha2: 'it', name: 'Italian' },
  { alpha3: 'jav', alpha2: 'jv', name: 'Javanese' },
  { alpha3: 'jbo', alpha2: '', name: 'Lojban' },
  { alpha3: 'jpn', alpha2: 'ja', name: 'Japanese' },
  { alpha3: 'jpr', alpha2: '', name: 'Judeo-Persian' },
  { alpha3: 'jrb', alpha2: '', name: 'Judeo-Arabic' },
  { alpha3: 'kaa', alpha2: '', name: 'Kara-Kalpak' },
  { alpha3: 'kab', alpha2: '', name: 'Kabyle' },
  { alpha3: 'kac', alpha2: '', name: 'Kachin; Jingpho' },
  { alpha3: 'kal', alpha2: 'kl', name: 'Kalaallisut; Greenlandic' },
  { alpha3: 'kam', alpha2: '', name: 'Kamba' },
  { alpha3: 'kan', alpha2: 'kn', name: 'Kannada' },
  { alpha3: 'kar', alpha2: '', name: 'Karen languages' },
  { alpha3: 'kas', alpha2: 'ks', name: 'Kashmiri' },
  { alpha3: 'kau', alpha2: 'kr', name: 'Kanuri' },
  { alpha3: 'kaw', alpha2: '', name: 'Kawi' },
  { alpha3: 'kaz', alpha2: 'kk', name: 'Kazakh' },
  { alpha3: 'kbd', alpha2: '', name: 'Kabardian' },
  { alpha3: 'kha', alpha2: '', name: 'Khasi' },
  { alpha3: 'khi', alpha2: '', name: 'Khoisan languages' },
  { alpha3: 'khm', alpha2: 'km', name: 'Central Khmer' },
  { alpha3: 'kho', alpha2: '', name: 'Khotanese; Sakan' },
  { alpha3: 'kik', alpha2: 'ki', name: 'Kikuyu; Gikuyu' },
  { alpha3: 'kin', alpha2: 'rw', name: 'Kinyarwanda' },
  { alpha3: 'kir', alpha2: 'ky', name: 'Kirghiz; Kyrgyz' },
  { alpha3: 'kmb', alpha2: '', name: 'Kimbundu' },
  { alpha3: 'kok', alpha2: '', name: 'Konkani' },
  { alpha3: 'kom', alpha2: 'kv', name: 'Komi' },
  { alpha3: 'kon', alpha2: 'kg', name: 'Kongo' },
  { alpha3: 'kor', alpha2: 'ko', name: 'Korean' },
  { alpha3: 'kos', alpha2: '', name: 'Kosraean' },
  { alpha3: 'kpe', alpha2: '', name: 'Kpelle' },
  { alpha3: 'krc', alpha2: '', name: 'Karachay-Balkar' },
  { alpha3: 'krl', alpha2: '', name: 'Karelian' },
  { alpha3: 'kro', alpha2: '', name: 'Kru languages' },
  { alpha3: 'kru', alpha2: '', name: 'Kurukh' },
  { alpha3: 'kua', alpha2: 'kj', name: 'Kuanyama; Kwanyama' },
  { alpha3: 'kum', alpha2: '', name: 'Kumyk' },
  { alpha3: 'kur', alpha2: 'ku', name: 'Kurdish' },
  { alpha3: 'kut', alpha2: '', name: 'Kutenai' },
  { alpha3: 'lad', alpha2: '', name: 'Ladino' },
  { alpha3: 'lah', alpha2: '', name: 'Lahnda' },
  { alpha3: 'lam', alpha2: '', name: 'Lamba' },
  { alpha3: 'lao', alpha2: 'lo', name: 'Lao' },
  { alpha3: 'lat', alpha2: 'la', name: 'Latin' },
  { alpha3: 'lav', alpha2: 'lv', name: 'Latvian' },
  { alpha3: 'lez', alpha2: '', name: 'Lezghian' },
  { alpha3: 'lim', alpha2: 'li', name: 'Limburgan; Limburger; Limburgish' },
  { alpha3: 'lin', alpha2: 'ln', name: 'Lingala' },
  { alpha3: 'lit', alpha2: 'lt', name: 'Lithuanian' },
  { alpha3: 'lol', alpha2: '', name: 'Mongo' },
  { alpha3: 'loz', alpha2: '', name: 'Lozi' },
  { alpha3: 'ltz', alpha2: 'lb', name: 'Luxembourgish; Letzeburgesch' },
  { alpha3: 'lua', alpha2: '', name: 'Luba-Lulua' },
  { alpha3: 'lub', alpha2: 'lu', name: 'Luba-Katanga' },
  { alpha3: 'lug', alpha2: 'lg', name: 'Ganda' },
  { alpha3: 'lui', alpha2: '', name: 'Luiseno' },
  { alpha3: 'lun', alpha2: '', name: 'Lunda' },
  { alpha3: 'luo', alpha2: '', name: 'Luo (Kenya and Tanzania)' },
  { alpha3: 'lus', alpha2: '', name: 'Lushai' },
  { alpha3: 'mac', alpha2: 'mk', name: 'Macedonian' },
  { alpha3: 'mad', alpha2: '', name: 'Madurese' },
  { alpha3: 'mag', alpha2: '', name: 'Magahi' },
  { alpha3: 'mah', alpha2: 'mh', name: 'Marshallese' },
  { alpha3: 'mai', alpha2: '', name: 'Maithili' },
  { alpha3: 'mak', alpha2: '', name: 'Makasar' },
  { alpha3: 'mal', alpha2: 'ml', name: 'Malayalam' },
  { alpha3: 'man', alpha2: '', name: 'Mandingo' },
  { alpha3: 'mao', alpha2: 'mi', name: 'Maori' },
  { alpha3: 'map', alpha2: '', name: 'Austronesian languages' },
  { alpha3: 'mar', alpha2: 'mr', name: 'Marathi' },
  { alpha3: 'mas', alpha2: '', name: 'Masai' },
  { alpha3: 'may', alpha2: 'ms', name: 'Malay' },
  { alpha3: 'mdf', alpha2: '', name: 'Moksha' },
  { alpha3: 'mdr', alpha2: '', name: 'Mandar' },
  { alpha3: 'men', alpha2: '', name: 'Mende' },
  { alpha3: 'mga', alpha2: '', name: 'Irish, Middle (900-1200)' },
  { alpha3: 'mic', alpha2: '', name: 'Mi\'kmaq; Micmac' },
  { alpha3: 'min', alpha2: '', name: 'Minangkabau' },
  { alpha3: 'mis', alpha2: '', name: 'Uncoded languages' },
  { alpha3: 'mkh', alpha2: '', name: 'Mon-Khmer languages' },
  { alpha3: 'mlg', alpha2: 'mg', name: 'Malagasy' },
  { alpha3: 'mlt', alpha2: 'mt', name: 'Maltese' },
  { alpha3: 'mnc', alpha2: '', name: 'Manchu' },
  { alpha3: 'mni', alpha2: '', name: 'Manipuri' },
  { alpha3: 'mno', alpha2: '', name: 'Manobo languages' },
  { alpha3: 'moh', alpha2: '', name: 'Mohawk' },
  { alpha3: 'mon', alpha2: 'mn', name: 'Mongolian' },
  { alpha3: 'mos', alpha2: '', name: 'Mossi' },
  { alpha3: 'mul', alpha2: '', name: 'Multiple languages' },
  { alpha3: 'mun', alpha2: '', name: 'Munda languages' },
  { alpha3: 'mus', alpha2: '', name: 'Creek' },
  { alpha3: 'mwl', alpha2: '', name: 'Mirandese' },
  { alpha3: 'mwr', alpha2: '', name: 'Marwari' },
  { alpha3: 'myn', alpha2: '', name: 'Mayan languages' },
  { alpha3: 'myv', alpha2: '', name: 'Erzya' },
  { alpha3: 'nah', alpha2: '', name: 'Nahuatl languages' },
  { alpha3: 'nai', alpha2: '', name: 'North American Indian languages' },
  { alpha3: 'nap', alpha2: '', name: 'Neapolitan' },
  { alpha3: 'nau', alpha2: 'na', name: 'Nauru' },
  { alpha3: 'nav', alpha2: 'nv', name: 'Navajo; Navaho' },
  { alpha3: 'nbl', alpha2: 'nr', name: 'Ndebele, South; South Ndebele' },
  { alpha3: 'nde', alpha2: 'nd', name: 'Ndebele, North; North Ndebele' },
  { alpha3: 'ndo', alpha2: 'ng', name: 'Ndonga' },
  { alpha3: 'nds', alpha2: '', name: 'Low German; Low Saxon; German, Low; Saxon, Low' },
  { alpha3: 'nep', alpha2: 'ne', name: 'Nepali' },
  { alpha3: 'new', alpha2: '', name: 'Nepal Bhasa; Newari' },
  { alpha3: 'nia', alpha2: '', name: 'Nias' },
  { alpha3: 'nic', alpha2: '', name: 'Niger-Kordofanian languages' },
  { alpha3: 'niu', alpha2: '', name: 'Niuean' },
  { alpha3: 'nno', alpha2: 'nn', name: 'Norwegian Nynorsk; Nynorsk, Norwegian' },
  { alpha3: 'nob', alpha2: 'nb', name: 'Bokmål, Norwegian; Norwegian Bokmål' },
  { alpha3: 'nog', alpha2: '', name: 'Nogai' },
  { alpha3: 'non', alpha2: '', name: 'Norse, Old' },
  { alpha3: 'nor', alpha2: 'no', name: 'Norwegian' },
  { alpha3: 'nqo', alpha2: '', name: 'N\'Ko' },
  { alpha3: 'nso', alpha2: '', name: 'Pedi; Sepedi; Northern Sotho' },
  { alpha3: 'nub', alpha2: '', name: 'Nubian languages' },
  { alpha3: 'nwc', alpha2: '', name: 'Classical Newari; Old Newari; Classical Nepal Bhasa' },
  { alpha3: 'nya', alpha2: 'ny', name: 'Chichewa; Chewa; Nyanja' },
  { alpha3: 'nym', alpha2: '', name: 'Nyamwezi' },
  { alpha3: 'nyn', alpha2: '', name: 'Nyankole' },
  { alpha3: 'nyo', alpha2: '', name: 'Nyoro' },
  { alpha3: 'nzi', alpha2: '', name: 'Nzima' },
  { alpha3: 'oci', alpha2: 'oc', name: 'Occitan (post 1500)' },
  { alpha3: 'oji', alpha2: 'oj', name: 'Ojibwa' },
  { alpha3: 'ori', alpha2: 'or', name: 'Oriya' },
  { alpha3: 'orm', alpha2: 'om', name: 'Oromo' },
  { alpha3: 'osa', alpha2: '', name: 'Osage' },
  { alpha3: 'oss', alpha2: 'os', name: 'Ossetian; Ossetic' },
  { alpha3: 'ota', alpha2: '', name: 'Turkish, Ottoman (1500-1928)' },
  { alpha3: 'oto', alpha2: '', name: 'Otomian languages' },
  { alpha3: 'paa', alpha2: '', name: 'Papuan languages' },
  { alpha3: 'pag', alpha2: '', name: 'Pangasinan' },
  { alpha3: 'pal', alpha2: '', name: 'Pahlavi' },
  { alpha3: 'pam', alpha2: '', name: 'Pampanga; Kapampangan' },
  { alpha3: 'pan', alpha2: 'pa', name: 'Panjabi; Punjabi' },
  { alpha3: 'pap', alpha2: '', name: 'Papiamento' },
  { alpha3: 'pau', alpha2: '', name: 'Palauan' },
  { alpha3: 'peo', alpha2: '', name: 'Persian, Old (ca.600-400 B.C.)' },
  { alpha3: 'per', alpha2: 'fa', name: 'Persian' },
  { alpha3: 'phi', alpha2: '', name: 'Philippine languages' },
  { alpha3: 'phn', alpha2: '', name: 'Phoenician' },
  { alpha3: 'pli', alpha2: 'pi', name: 'Pali' },
  { alpha3: 'pol', alpha2: 'pl', name: 'Polish' },
  { alpha3: 'pon', alpha2: '', name: 'Pohnpeian' },
  { alpha3: 'por', alpha2: 'pt', name: 'Portuguese' },
  { alpha3: 'pra', alpha2: '', name: 'Prakrit languages' },
  { alpha3: 'pro', alpha2: '', name: 'Provençal, Old (to 1500); Occitan, Old (to 1500)' },
  { alpha3: 'pus', alpha2: 'ps', name: 'Pushto; Pashto' },
  { alpha3: 'qaa-qtz', alpha2: '', name: 'Reserved for local use' },
  { alpha3: 'que', alpha2: 'qu', name: 'Quechua' },
  { alpha3: 'raj', alpha2: '', name: 'Rajasthani' },
  { alpha3: 'rap', alpha2: '', name: 'Rapanui' },
  { alpha3: 'rar', alpha2: '', name: 'Rarotongan; Cook Islands Maori' },
  { alpha3: 'roa', alpha2: '', name: 'Romance languages' },
  { alpha3: 'roh', alpha2: 'rm', name: 'Romansh' },
  { alpha3: 'rom', alpha2: '', name: 'Romany' },
  { alpha3: 'rum', alpha2: 'ro', name: 'Romanian; Moldavian; Moldovan' },
  { alpha3: 'run', alpha2: 'rn', name: 'Rundi' },
  { alpha3: 'rup', alpha2: '', name: 'Aromanian; Arumanian; Macedo-Romanian' },
  { alpha3: 'rus', alpha2: 'ru', name: 'Russian' },
  { alpha3: 'sad', alpha2: '', name: 'Sandawe' },
  { alpha3: 'sag', alpha2: 'sg', name: 'Sango' },
  { alpha3: 'sah', alpha2: '', name: 'Yakut' },
  { alpha3: 'sai', alpha2: '', name: 'South American Indian languages' },
  { alpha3: 'sal', alpha2: '', name: 'Salishan languages' },
  { alpha3: 'sam', alpha2: '', name: 'Samaritan Aramaic' },
  { alpha3: 'san', alpha2: 'sa', name: 'Sanskrit' },
  { alpha3: 'sas', alpha2: '', name: 'Sasak' },
  { alpha3: 'sat', alpha2: '', name: 'Santali' },
  { alpha3: 'scn', alpha2: '', name: 'Sicilian' },
  { alpha3: 'sco', alpha2: '', name: 'Scots' },
  { alpha3: 'sel', alpha2: '', name: 'Selkup' },
  { alpha3: 'sem', alpha2: '', name: 'Semitic languages' },
  { alpha3: 'sga', alpha2: '', name: 'Irish, Old (to 900)' },
  { alpha3: 'sgn', alpha2: '', name: 'Sign Languages' },
  { alpha3: 'shn', alpha2: '', name: 'Shan' },
  { alpha3: 'sid', alpha2: '', name: 'Sidamo' },
  { alpha3: 'sin', alpha2: 'si', name: 'Sinhala; Sinhalese' },
  { alpha3: 'sio', alpha2: '', name: 'Siouan languages' },
  { alpha3: 'sit', alpha2: '', name: 'Sino-Tibetan languages' },
  { alpha3: 'sla', alpha2: '', name: 'Slavic languages' },
  { alpha3: 'slo', alpha2: 'sk', name: 'Slovak' },
  { alpha3: 'slv', alpha2: 'sl', name: 'Slovenian' },
  { alpha3: 'sma', alpha2: '', name: 'Southern Sami' },
  { alpha3: 'sme', alpha2: 'se', name: 'Northern Sami' },
  { alpha3: 'smi', alpha2: '', name: 'Sami languages' },
  { alpha3: 'smj', alpha2: '', name: 'Lule Sami' },
  { alpha3: 'smn', alpha2: '', name: 'Inari Sami' },
  { alpha3: 'smo', alpha2: 'sm', name: 'Samoan' },
  { alpha3: 'sms', alpha2: '', name: 'Skolt Sami' },
  { alpha3: 'sna', alpha2: 'sn', name: 'Shona' },
  { alpha3: 'snd', alpha2: 'sd', name: 'Sindhi' },
  { alpha3: 'snk', alpha2: '', name: 'Soninke' },
  { alpha3: 'sog', alpha2: '', name: 'Sogdian' },
  { alpha3: 'som', alpha2: 'so', name: 'Somali' },
  { alpha3: 'son', alpha2: '', name: 'Songhai languages' },
  { alpha3: 'sot', alpha2: 'st', name: 'Sotho, Southern' },
  { alpha3: 'spa', alpha2: 'es', name: 'Spanish; Castilian' },
  { alpha3: 'srd', alpha2: 'sc', name: 'Sardinian' },
  { alpha3: 'srn', alpha2: '', name: 'Sranan Tongo' },
  { alpha3: 'srp', alpha2: 'sr', name: 'Serbian' },
  { alpha3: 'srr', alpha2: '', name: 'Serer' },
  { alpha3: 'ssa', alpha2: '', name: 'Nilo-Saharan languages' },
  { alpha3: 'ssw', alpha2: 'ss', name: 'Swati' },
  { alpha3: 'suk', alpha2: '', name: 'Sukuma' },
  { alpha3: 'sun', alpha2: 'su', name: 'Sundanese' },
  { alpha3: 'sus', alpha2: '', name: 'Susu' },
  { alpha3: 'sux', alpha2: '', name: 'Sumerian' },
  { alpha3: 'swa', alpha2: 'sw', name: 'Swahili' },
  { alpha3: 'swe', alpha2: 'sv', name: 'Swedish' },
  { alpha3: 'syc', alpha2: '', name: 'Classical Syriac' },
  { alpha3: 'syr', alpha2: '', name: 'Syriac' },
  { alpha3: 'tah', alpha2: 'ty', name: 'Tahitian' },
  { alpha3: 'tai', alpha2: '', name: 'Tai languages' },
  { alpha3: 'tam', alpha2: 'ta', name: 'Tamil' },
  { alpha3: 'tat', alpha2: 'tt', name: 'Tatar' },
  { alpha3: 'tel', alpha2: 'te', name: 'Telugu' },
  { alpha3: 'tem', alpha2: '', name: 'Timne' },
  { alpha3: 'ter', alpha2: '', name: 'Tereno' },
  { alpha3: 'tet', alpha2: '', name: 'Tetum' },
  { alpha3: 'tgk', alpha2: 'tg', name: 'Tajik' },
  { alpha3: 'tgl', alpha2: 'tl', name: 'Tagalog' },
  { alpha3: 'tha', alpha2: 'th', name: 'Thai' },
  { alpha3: 'tib', alpha2: 'bo', name: 'Tibetan' },
  { alpha3: 'tig', alpha2: '', name: 'Tigre' },
  { alpha3: 'tir', alpha2: 'ti', name: 'Tigrinya' },
  { alpha3: 'tiv', alpha2: '', name: 'Tiv' },
  { alpha3: 'tkl', alpha2: '', name: 'Tokelau' },
  { alpha3: 'tlh', alpha2: '', name: 'Klingon; tlhIngan-Hol' },
  { alpha3: 'tli', alpha2: '', name: 'Tlingit' },
  { alpha3: 'tmh', alpha2: '', name: 'Tamashek' },
  { alpha3: 'tog', alpha2: '', name: 'Tonga (Nyasa)' },
  { alpha3: 'ton', alpha2: 'to', name: 'Tonga (Tonga Islands)' },
  { alpha3: 'tpi', alpha2: '', name: 'Tok Pisin' },
  { alpha3: 'tsi', alpha2: '', name: 'Tsimshian' },
  { alpha3: 'tsn', alpha2: 'tn', name: 'Tswana' },
  { alpha3: 'tso', alpha2: 'ts', name: 'Tsonga' },
  { alpha3: 'tuk', alpha2: 'tk', name: 'Turkmen' },
  { alpha3: 'tum', alpha2: '', name: 'Tumbuka' },
  { alpha3: 'tup', alpha2: '', name: 'Tupi languages' },
  { alpha3: 'tur', alpha2: 'tr', name: 'Turkish' },
  { alpha3: 'tut', alpha2: '', name: 'Altaic languages' },
  { alpha3: 'tvl', alpha2: '', name: 'Tuvalu' },
  { alpha3: 'twi', alpha2: 'tw', name: 'Twi' },
  { alpha3: 'tyv', alpha2: '', name: 'Tuvinian' },
  { alpha3: 'udm', alpha2: '', name: 'Udmurt' },
  { alpha3: 'uga', alpha2: '', name: 'Ugaritic' },
  { alpha3: 'uig', alpha2: 'ug', name: 'Uighur; Uyghur' },
  { alpha3: 'ukr', alpha2: 'uk', name: 'Ukrainian' },
  { alpha3: 'umb', alpha2: '', name: 'Umbundu' },
  { alpha3: 'und', alpha2: '', name: 'Undetermined' },
  { alpha3: 'urd', alpha2: 'ur', name: 'Urdu' },
  { alpha3: 'uzb', alpha2: 'uz', name: 'Uzbek' },
  { alpha3: 'vai', alpha2: '', name: 'Vai' },
  { alpha3: 'ven', alpha2: 've', name: 'Venda' },
  { alpha3: 'vie', alpha2: 'vi', name: 'Vietnamese' },
  { alpha3: 'vol', alpha2: 'vo', name: 'Volapük' },
  { alpha3: 'vot', alpha2: '', name: 'Votic' },
  { alpha3: 'wak', alpha2: '', name: 'Wakashan languages' },
  { alpha3: 'wal', alpha2: '', name: 'Wolaitta; Wolaytta' },
  { alpha3: 'war', alpha2: '', name: 'Waray' },
  { alpha3: 'was', alpha2: '', name: 'Washo' },
  { alpha3: 'wel', alpha2: 'cy', name: 'Welsh' },
  { alpha3: 'wen', alpha2: '', name: 'Sorbian languages' },
  { alpha3: 'wln', alpha2: 'wa', name: 'Walloon' },
  { alpha3: 'wol', alpha2: 'wo', name: 'Wolof' },
  { alpha3: 'xal', alpha2: '', name: 'Kalmyk; Oirat' },
  { alpha3: 'xho', alpha2: 'xh', name: 'Xhosa' },
  { alpha3: 'yao', alpha2: '', name: 'Yao' },
  { alpha3: 'yap', alpha2: '', name: 'Yapese' },
  { alpha3: 'yid', alpha2: 'yi', name: 'Yiddish' },
  { alpha3: 'yor', alpha2: 'yo', name: 'Yoruba' },
  { alpha3: 'ypk', alpha2: '', name: 'Yupik languages' },
  { alpha3: 'zap', alpha2: '', name: 'Zapotec' },
  { alpha3: 'zbl', alpha2: '', name: 'Blissymbols; Blissymbolics; Bliss' },
  { alpha3: 'zen', alpha2: '', name: 'Zenaga' },
  { alpha3: 'zgh', alpha2: '', name: 'Standard Moroccan Tamazight' },
  { alpha3: 'zha', alpha2: 'za', name: 'Zhuang; Chuang' },
  { alpha3: 'znd', alpha2: '', name: 'Zande languages' },
  { alpha3: 'zul', alpha2: 'zu', name: 'Zulu' },
  { alpha3: 'zun', alpha2: '', name: 'Zuni' },
  { alpha3: 'zxx', alpha2: '', name: 'No linguistic content; Not applicable' },
  { alpha3: 'zza', alpha2: '', name: 'Zaza; Dimili; Dimli; Kirdki; Kirmanjki; Zazaki' },
];

// Returns the language object from the above list specified by code, which can be either
// the alpha2 or alpha3 code.
export const languageByCode = code => find(languages, entry => entry.alpha3 === code || entry.alpha2 === code);

// For a given language (specified by code, either alpha2 or alpha3), return the alpha2 code if there is
// one, alpha3 otherwise. This is because react-intl's formatDisplayName function will not return the name
// of a language for the alpha3 code if it also has an alpha2!
export const intlPreferredLanguageCode = code => languageByCode(code).alpha2 || languageByCode(code).alpha3;

export default languages;
