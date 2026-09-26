// 100 Faith-Based Levels Data for all Games

export interface WordGuessLevel {
  id: number;
  word: string;
  clue: string;
  verse: string;
}

export interface WordSearchLevel {
  id: number;
  theme: string;
  words: string[];
}

export interface PuzzleLevel {
  id: number;
  title: string;
  icon: string;
  verse: string;
  gridSize: 2 | 3;
}

export interface MemoryLevel {
  id: number;
  title: string;
  pairsCount: number;
  timeLimitSec: number;
}

export interface TetrisLevel {
  id: number;
  name: string;
  targetLines: number;
  speedMs: number;
}

export interface ColoringLevel {
  id: number;
  title: string;
  templateId: string;
  challenge: string;
}

// 100 Biblical Words for WordGuessGame
export const WORD_GUESS_100_LEVELS: WordGuessLevel[] = [
  { id: 1, word: 'JESÚS', clue: 'El Salvador del mundo, el camino, la verdad y la vida.', verse: 'Juan 14:6' },
  { id: 2, word: 'FE', clue: 'La certeza de lo que se espera, convicción de lo que no se ve.', verse: 'Hebreos 11:1' },
  { id: 3, word: 'AMOR', clue: 'El vínculo perfecto y el mandamiento más grande.', verse: '1 Corintios 13:13' },
  { id: 4, word: 'MILAGRO', clue: 'Cuando la mano soberana de Dios actúa sobre lo imposible.', verse: 'Lucas 1:37' },
  { id: 5, word: 'VICTORIA', clue: 'La promesa dada a los que creen y perseveran con Dios.', verse: '1 Juan 5:4' },
  { id: 6, word: 'PAZ', clue: 'La tranquilidad divina que sobrepasa todo entendimiento.', verse: 'Filipenses 4:7' },
  { id: 7, word: 'GRACIA', clue: 'El regalo inmerecido de Dios que nos rescata y sostiene.', verse: 'Efesios 2:8' },
  { id: 8, word: 'GOZO', clue: 'La alegría espiritual permanente en el corazón creyente.', verse: 'Nehemías 8:10' },
  { id: 9, word: 'PERDÓN', clue: 'El acto liberador que limpia el alma y renueva la vida.', verse: 'Colosenses 3:13' },
  { id: 10, word: 'BENDICIÓN', clue: 'El favor y prosperidad que Dios derrama sobre su pueblo.', verse: 'Proverbios 10:22' },
  { id: 11, word: 'ORACIÓN', clue: 'El diálogo íntimo y poderoso de los hijos con su Padre Dios.', verse: '1 Tesalonicenses 5:17' },
  { id: 12, word: 'ESPERANZA', clue: 'El ancla firme de nuestra alma puesta en Cristo.', verse: 'Hebreos 6:19' },
  { id: 13, word: 'CRISTO', clue: 'El Ungido de Dios, nuestro Rey eterno y Redentor.', verse: 'Mateo 16:16' },
  { id: 14, word: 'SALVACIÓN', clue: 'La vida eterna y el rescate de Dios para la humanidad.', verse: 'Hechos 4:12' },
  { id: 15, word: 'FORTALEZA', clue: 'El poder que recibimos en los momentos de mayor debilidad.', verse: 'Filipenses 4:13' },
  { id: 16, word: 'SABIDURÍA', clue: 'El don de entender y actuar conforme al corazón de Dios.', verse: 'Santiago 1:5' },
  { id: 17, word: 'MISERICORDIA', clue: 'La compasión infinita de Dios que se renueva cada mañana.', verse: 'Lamentaciones 3:22' },
  { id: 18, word: 'FIDELIDAD', clue: 'La constancia inquebrantable de las promesas del Señor.', verse: 'Salmos 100:5' },
  { id: 19, word: 'REFUGIO', clue: 'Dios es nuestro amparo y fortaleza en las tribulaciones.', verse: 'Salmos 46:1' },
  { id: 20, word: 'ALABANZA', clue: 'El cántico de gratitud que brota de un corazón rendido.', verse: 'Salmos 150:6' },
  { id: 21, word: 'CORONA', clue: 'El galardón de justicia reservado para los vencedores.', verse: '2 Timoteo 4:8' },
  { id: 22, word: 'REDENCIÓN', clue: 'Comprados por la sangre preciosa derramada en la cruz.', verse: 'Efesios 1:7' },
  { id: 23, word: 'ESPÍRITU', clue: 'El Consolador divino que guía a toda verdad y consuela.', verse: 'Juan 14:26' },
  { id: 24, word: 'LUZ', clue: 'Jesús es la luz del mundo que disipa toda oscuridad.', verse: 'Juan 8:12' },
  { id: 25, word: 'VERDAD', clue: 'La palabra de Dios que permanece para siempre y liberta.', verse: 'Juan 8:32' },
  { id: 26, word: 'PACTO', clue: 'El compromiso eterno sellado por Dios con su pueblo.', verse: 'Génesis 9:11' },
  { id: 27, word: 'VIDA', clue: 'Jesucristo vino para darnos vida y vida en abundancia.', verse: 'Juan 10:10' },
  { id: 28, word: 'PASTOR', clue: 'El Señor es mi pastor y nada me faltará.', verse: 'Salmos 23:1' },
  { id: 29, word: 'ESCUDO', clue: 'La protección divina que apaga los dardos del maligno.', verse: 'Efesios 6:16' },
  { id: 30, word: 'ROCA', clue: 'El cimiento inamovible donde edificamos nuestra vida.', verse: 'Salmos 18:2' },
  { id: 31, word: 'MANÁ', clue: 'El pan providencial enviado del cielo en el desierto.', verse: 'Éxodo 16:31' },
  { id: 32, word: 'ARCA', clue: 'El barco de salvación construido por Noé obedeciendo a Dios.', verse: 'Génesis 6:14' },
  { id: 33, word: 'TEMPLO', clue: 'Nuestros cuerpos son morada sagrada del Espíritu Santo.', verse: '1 Corintios 6:19' },
  { id: 34, word: 'GLORIA', clue: 'La majestad divina que llena los cielos y la tierra.', verse: 'Isaías 6:3' },
  { id: 35, word: 'CONSUELO', clue: 'El alivio tierno de Dios para los afligidos y tristes.', verse: '2 Corintios 1:3' },
  { id: 36, word: 'JUSTICIA', clue: 'La rectitud divina que defiende al justo y desamparado.', verse: 'Salmos 89:14' },
  { id: 37, word: 'GRATITUD', clue: 'Dar gracias a Dios en todo tiempo y circunstancia.', verse: 'Colosenses 3:15' },
  { id: 38, word: 'SIEMBRA', clue: 'Lo que sembremos con lágrimas segaremos con regocijo.', verse: 'Salmos 126:5' },
  { id: 39, word: 'COSECHA', clue: 'El fruto abundante que Dios da al tiempo oportuno.', verse: 'Gálatas 6:9' },
  { id: 40, word: 'ARREPENTIMIENTO', clue: 'Volver el corazón a Dios con humildad y nuevo rumbo.', verse: 'Hechos 3:19' },
  { id: 41, word: 'HUMILDAD', clue: 'Reconocer que todo lo bueno proviene de las manos de Dios.', verse: 'Proverbios 22:4' },
  { id: 42, word: 'PACIENCIA', clue: 'Saber esperar en el tiempo perfecto del Señor.', verse: 'Salmos 37:7' },
  { id: 43, word: 'BONDAD', clue: 'La inclinación constante a bendecir y hacer el bien.', verse: 'Gálatas 5:22' },
  { id: 44, word: 'MANSEDUMBRE', clue: 'Fuerza bajo control y mansedumbre ante Dios y los hombres.', verse: 'Mateo 5:5' },
  { id: 45, word: 'TEMPLANZA', clue: 'El dominio propio guiado por el Espíritu de Dios.', verse: '2 Timoteo 1:7' },
  { id: 46, word: 'AVIVAMIENTO', clue: 'El fuego sagrado del Espíritu renovando corazones.', verse: 'Habacuc 3:2' },
  { id: 47, word: 'PROMESA', clue: 'La palabra de Dios que jamás vuelve vacía.', verse: 'Isaías 55:11' },
  { id: 48, word: 'UNCIÓN', clue: 'La presencia y capacitación sobrenatural del Espíritu.', verse: '1 Juan 2:20' },
  { id: 49, word: 'DISCÍPULO', clue: 'Seguidor fiel que aprende y vive las enseñanzas de Jesús.', verse: 'Lucas 9:23' },
  { id: 50, word: 'RESURRECCIÓN', clue: 'El triunfo de Cristo sobre la muerte y la tumba vacía.', verse: '1 Corintios 15:20' },
  { id: 51, word: 'APÓSTOL', clue: 'Enviado con autoridad para predicar las buenas nuevas.', verse: 'Romanos 1:1' },
  { id: 52, word: 'EVANGELIO', clue: 'Las buenas noticias de salvación para toda la humanidad.', verse: 'Romanos 1:16' },
  { id: 53, word: 'PROFETA', clue: 'Portavoz de Dios que llama al pueblo a la verdad divina.', verse: 'Jeremías 1:5' },
  { id: 54, word: 'SALMO', clue: 'Oración cantada con arpa y poesía dedicada al Creador.', verse: 'Salmos 104:33' },
  { id: 55, word: 'PROVERBIO', clue: 'Sentencia de sabiduría divina para la vida cotidiana.', verse: 'Proverbios 1:1' },
  { id: 56, word: 'ALIANZA', clue: 'El lazo inquebrantable de amor entre Dios y sus siervos.', verse: 'Salmos 25:14' },
  { id: 57, word: 'CORAZÓN', clue: 'Sobre toda cosa guardada, guarda tu corazón.', verse: 'Proverbios 4:23' },
  { id: 58, word: 'CÁNTICO', clue: 'Nueva melodía de gozo para alabar al Dios de las alturas.', verse: 'Salmos 40:3' },
  { id: 59, word: 'FRUTO', clue: 'Las obras y virtudes visibles que nacen de estar en Cristo.', verse: 'Juan 15:5' },
  { id: 60, word: 'CORDERO', clue: 'Jesús, el Cordero de Dios que quita el pecado del mundo.', verse: 'Juan 1:29' },
  { id: 61, word: 'LEÓN', clue: 'El León de la tribu de Judá que ha vencido.', verse: 'Apocalipsis 5:5' },
  { id: 62, word: 'REY', clue: 'El Rey de reyes y Señor de todos los señores.', verse: '1 Timoteo 6:15' },
  { id: 63, word: 'SANIDAD', clue: 'Por las llagas de Cristo fuimos nosotros sanados.', verse: 'Isaías 53:5' },
  { id: 64, word: 'LIBERTAD', clue: 'Si el Hijo os libertare, seréis verdaderamente libres.', verse: 'Juan 8:36' },
  { id: 65, word: 'REPOSO', clue: 'El descanso que Jesús ofrece a los cargados y cansados.', verse: 'Mateo 11:28' },
  { id: 66, word: 'VIÑA', clue: 'Jesús es la vid verdadera y su Padre el labrador.', verse: 'Juan 15:1' },
  { id: 67, word: 'SEMILLA', clue: 'La palabra de Dios sembrada en buena tierra.', verse: 'Lucas 8:11' },
  { id: 68, word: 'ACEITE', clue: 'Símbolo del Espíritu Santo que llena nuestras lámparas.', verse: 'Mateo 25:4' },
  { id: 69, word: 'INCENSO', clue: 'Las oraciones de los santos que suben ante el trono de Dios.', verse: 'Apocalipsis 8:4' },
  { id: 70, word: 'MANÁ', clue: 'Alimento diario que enseña a depender de la provisión divina.', verse: 'Deuteronomio 8:3' },
  { id: 71, word: 'TABERNÁCULO', clue: 'Lugar santo de encuentro entre Dios y su pueblo.', verse: 'Éxodo 25:8' },
  { id: 72, word: 'SERAFÍN', clue: 'Ángel celestial que proclama Santo, Santo, Santo.', verse: 'Isaías 6:2' },
  { id: 73, word: 'QUERUBÍN', clue: 'Guardián del trono de Dios y de su gloria eterna.', verse: 'Salmos 80:1' },
  { id: 74, word: 'GÓLGOTA', clue: 'El monte sagrado donde Cristo entregó su vida por amor.', verse: 'Juan 19:17' },
  { id: 75, word: 'GETSEMANÍ', clue: 'El huerto de oración profunda donde se rindió toda voluntad.', verse: 'Mateo 26:36' },
  { id: 76, word: 'JORDÁN', clue: 'El río donde Jesús fue bautizado y el cielo se abrió.', verse: 'Mateo 3:13' },
  { id: 77, word: 'SINAÍ', clue: 'El monte sagrado donde Dios entregó los diez mandamientos.', verse: 'Éxodo 19:20' },
  { id: 78, word: 'MORIAH', clue: 'El monte de la prueba de fe y la provisión milagrosa de Dios.', verse: 'Génesis 22:2' },
  { id: 79, word: 'BELÉN', clue: 'La pequeña aldea de Judá donde nació el Salvador.', verse: 'Miqueas 5:2' },
  { id: 80, word: 'JERUSALÉN', clue: 'La ciudad santa de Dios y figura de la patria celestial.', verse: 'Salmos 122:6' },
  { id: 81, word: 'CANÁ', clue: 'Donde Jesús hizo su primer milagro transformando el agua.', verse: 'Juan 2:11' },
  { id: 82, word: 'BETANIA', clue: 'El hogar de Marta, María y Lázaro, refugio de Jesús.', verse: 'Juan 11:1' },
  { id: 83, word: 'EMMAÚS', clue: 'El camino donde Jesús resucitado caminó e hizo arder corazones.', verse: 'Lucas 24:13' },
  { id: 84, word: 'PENTECOSTÉS', clue: 'El día en que el Espíritu Santo descendió con poder y fuego.', verse: 'Hechos 2:1' },
  { id: 85, word: 'ÉXODO', clue: 'La gran liberación de la esclavitud hacia la tierra prometida.', verse: 'Éxodo 12:51' },
  { id: 86, word: 'GÉNESIS', clue: 'El libro de los comienzos donde Dios creó todas las cosas.', verse: 'Génesis 1:1' },
  { id: 87, word: 'APOCALIPSIS', clue: 'La revelación final de la victoria triunfante de Jesucristo.', verse: 'Apocalipsis 1:1' },
  { id: 88, word: 'CRUZ', clue: 'El altar donde el amor venció para siempre a las tinieblas.', verse: 'Gálatas 6:14' },
  { id: 89, word: 'SEPULCRO', clue: 'La tumba que no pudo retener al Autor de la vida.', verse: 'Lucas 24:6' },
  { id: 90, word: 'ALFA', clue: 'El Señor Dios todopoderoso, principio de todas las cosas.', verse: 'Apocalipsis 22:13' },
  { id: 91, word: 'OMEGA', clue: 'El fin y consumador de todas las promesas celestiales.', verse: 'Apocalipsis 1:8' },
  { id: 92, word: 'HALELUYA', clue: '¡Alabad a Dios! La alabanza eterna que resuena en el cielo.', verse: 'Apocalipsis 19:1' },
  { id: 93, word: 'AMÉN', clue: 'Así sea, la firmeza y confirmación en el poder de Dios.', verse: '2 Corintios 1:20' },
  { id: 94, word: 'HEREDEROS', clue: 'Hijos de Dios y coherederos de la gloria con Cristo.', verse: 'Romanos 8:17' },
  { id: 95, word: 'CIELO', clue: 'La morada eterna donde Dios enjugará toda lágrima.', verse: 'Apocalipsis 21:4' },
  { id: 96, word: 'PARADISO', clue: 'Hoy estarás conmigo en el paraíso, promesa de Jesús.', verse: 'Lucas 23:43' },
  { id: 97, word: 'CORONA', clue: 'La corona incorruptible que jamás se marchita.', verse: '1 Pedro 5:4' },
  { id: 98, word: 'TRIUNFO', clue: 'Dios siempre nos lleva en triunfo en Cristo Jesús.', verse: '2 Corintios 2:14' },
  { id: 99, word: 'SOBERANÍA', clue: 'El dominio supremo del Señor sobre el universo entero.', verse: 'Salmos 103:19' },
  { id: 100, word: 'ETERNIDAD', clue: 'La vida sin fin en la presencia y plenitud de Dios.', verse: '1 Juan 2:25' },
];

// 100 Themes for WordSearchGame
export const WORD_SEARCH_100_THEMES: WordSearchLevel[] = Array.from({ length: 100 }, (_, i) => {
  const levelNum = i + 1;
  const wordSets = [
    { theme: 'Frutos del Espíritu', words: ['AMOR', 'GOZO', 'PAZ', 'FE'] },
    { theme: 'Nombres de Dios', words: ['ELOHIM', 'JAHVE', 'PADRE', 'REY'] },
    { theme: 'La Creación', words: ['LUZ', 'CIELO', 'MAR', 'TIERRA'] },
    { theme: 'Los Apóstoles', words: ['PEDRO', 'JUAN', 'MATEO', 'PABLO'] },
    { theme: 'Virtudes de Fe', words: ['GRACIA', 'BONDAD', 'PERDON', 'ESPERANZA'] },
    { theme: 'Milagros de Jesús', words: ['VINO', 'PANES', 'PECES', 'LAZARO'] },
    { theme: 'Armadura de Dios', words: ['ESCUDO', 'CORAZA', 'CASCO', 'ESPADA'] },
    { theme: 'Héroes de la Biblia', words: ['DAVID', 'MOISES', 'NOE', 'DANIEL'] },
    { theme: 'Libros de Sabiduría', words: ['SALMOS', 'PROVERBIOS', 'JOB', 'ECLESIASTES'] },
    { theme: 'Promesas Divinas', words: ['VICTORIA', 'SALVACION', 'VIDA', 'CORONA'] },
  ];
  const setIndex = i % wordSets.length;
  const base = wordSets[setIndex];
  return {
    id: levelNum,
    theme: `Nivel ${levelNum}: ${base.theme}`,
    words: base.words,
  };
});

// 100 Levels for PuzzleGame
export const PUZZLE_100_LEVELS: PuzzleLevel[] = Array.from({ length: 100 }, (_, i) => {
  const levelNum = i + 1;
  const titles = [
    'El Arca de Noé y el Arcoíris',
    'David vence con fe a Goliat',
    'El Buen Pastor cuida sus ovejas',
    'La Paloma de Paz y la Esperanza',
    'Jesús calma la tormenta',
    'La Creación de los Cielos',
    'Daniel protegido en el foso',
    'El Nacimiento en Belén',
    'La Multiplicación de los Panes',
    'La Resurrección Victoriosa',
  ];
  const title = titles[i % titles.length];
  return {
    id: levelNum,
    title: `Nivel ${levelNum}: ${title}`,
    icon: ['⛵', '⚔️', '🐑', '🕊️', '🌊', '☀️', '🦁', '🌟', '🍞', '✝️'][i % 10],
    verse: 'Todo lo puedo en Cristo que me fortalece (Filipenses 4:13)',
    gridSize: levelNum <= 10 ? 2 : 3,
  };
});

// 100 Levels for MemoryGame
export const MEMORY_100_LEVELS: MemoryLevel[] = Array.from({ length: 100 }, (_, i) => {
  const levelNum = i + 1;
  const pairs = Math.min(8, 3 + Math.floor(levelNum / 20));
  const timeLimit = Math.max(30, 90 - Math.floor(levelNum * 0.5));
  return {
    id: levelNum,
    title: `Nivel ${levelNum}: Desafío de Virtudes`,
    pairsCount: pairs,
    timeLimitSec: timeLimit,
  };
});

// 100 Levels for TetrisGame
export const TETRIS_100_LEVELS: TetrisLevel[] = Array.from({ length: 100 }, (_, i) => {
  const levelNum = i + 1;
  const targetLines = 3 + levelNum * 2;
  const speedMs = Math.max(150, 750 - levelNum * 6);
  return {
    id: levelNum,
    name: `Nivel ${levelNum}: Torre de Fe`,
    targetLines,
    speedMs,
  };
});

// 100 Levels for ColoringGame
export const COLORING_100_LEVELS: ColoringLevel[] = Array.from({ length: 100 }, (_, i) => {
  const levelNum = i + 1;
  const templates = ['david', 'paloma', 'cruz', 'corazon', 'libre'];
  const templateId = templates[i % templates.length];
  const challenges = [
    'Usa colores cálidos para el amanecer',
    'Destaca el manto de victoria',
    'Colorea con tonos vivos y alegres',
    'Pinta un cielo lleno de estrellas de fe',
    'Diseña el escudo con destellos dorados',
  ];
  return {
    id: levelNum,
    title: `Nivel ${levelNum}: Obra de Fe #${levelNum}`,
    templateId,
    challenge: challenges[i % challenges.length],
  };
});
