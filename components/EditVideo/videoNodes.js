// CONSTANTS //
const MIN_OCCURRENCES = 12;
const MIN_WORD_LENGTH = 8;
const MIN_TIME_LENGTH = 15;
class PhraseNode {
    constructor(phrase, videoURL, timeStart, timeEnd, child=null, parent=null){
        this.phrase = phrase;
        this.wordLength = phrase.split(' ').length;
        this.timeStart = timeStart;
        this.timeEnd = timeEnd;
        this.timeLength = timeEnd - timeStart;
        this.videoURL = videoURL;
        this.parent = parent;
        this.child = child;
    }

}

class WordNode{
    constructor(word, PhraseNodes=[]){
        this.WordNodeParents = null;
        this.WordNodeChildren = null;
        this.PhraseNodes = PhraseNodes;
        this.word = word;
    }
    addPhraseNode(PhraseNode){
        this.PhraseNodes.push(PhraseNode);
    }
    getNumberOfChildrenWithWord(word){
        let count = 0;
        for(let PN of this.PhraseNodes){
            if(PN.child == word) count++;
        }
        return count;
    }
    getChildrenWithWord(word){
        if((!!word) && this.WordNodeChildren.includes(word)){
            let ans = [];
            for(let pn of this.PhraseNodes){
                if(pn.child == word){
                    ans.push(pn);
                }
            }
            return ans;
        }
        return [];
    }
    wordInChildren(word){
        for(let child of this.WordNodeChildren){
            if(child.word == word){
                return child;
            }
        }
        return null;
    }
    wordInParents(word){
        for(let parent of this.WordNodeParents){
            if(parent.word == word){
                return parent;
            }
        }
        return null;
    }
    addChild(word){
        if(! word){
            return;
        }
        if(! this.WordNodeChildren){
            this.WordNodeChildren = [];
        }
        if(this.WordNodeChildren.includes(word)){
            return;
        }
        this.WordNodeChildren.push(word);
    }
    addParent(word){
        if(! word){
            return;
        }
        if(! this.WordNodeParents){
            this.WordNodeParents = [];
        }
        if(this.WordNodeParents.includes(word)){
            return;
        }
        this.WordNodeParents.push(word);
    }
}

function addToWordNodes(word, lastWord, nextWord, phrase, videoURL, timeStart, timeEnd){
    console.log(`Adding ${word}, with parent ${lastWord}, child ${nextWord}, phrase ${phrase}, url ${videoURL}, timestart ${timeStart}, timeend ${timeEnd}`)
    pn = new PhraseNode(phrase, videoURL, timeStart, timeEnd, lastWord, nextWord);
    if(!(word in WordNodes)){
        WordNodes[word] = new WordNode(word);
        console.log('flag')
    }
    WordNodes[word].addPhraseNode(pn);
    if(!!lastWord){
        WordNodes[word].addParent(lastWord);
    }
    if(!!nextWord){
        WordNodes[word].addChild(lastWord);
    }
}

var WordNodes = {}
var stopwords = ['sé','a','día','días','dijiste','acuerdo','acuerdas','acordás','actualmente','adelante','además','afirmó','agregó','ahora','ahí','al','algo','alguna','algunas','alguno','algunos','algún','alrededor','ambos','ampleamos','ante','anterior','antes','apenas','aproximadamente','aquel','aquellas','aquellos','aqui','aquí','arriba','aseguró','así','atras','aunque','ayer','añadió','aún','bajo','bastante','bien','buen','buena','buenas','bueno','buenos','cada','casi','cerca','cierta','ciertas','cierto','ciertos','cinco','comentó','como','con','conocer','conseguimos','conseguir','considera','consideró','consigo','consigue','consiguen','consigues','contra','cosas','creo','cual','cuales','cualquier','cuando','cuanto','cuatro','cuenta','cómo','da','dado','dan','dar','de','debe','deben','debido','decir','dejó','del','demás','dentro','desde','después','dice','dicen','dicho','dieron','diferente','diferentes','dijeron','dijo','dio','donde','dos','durante','e','ejemplo','el','ella','ellas','ello','ellos','embargo','empleais','emplean','emplear','empleas','empleo','en','encima','encuentra','entonces','entre','era','erais','eramos','eran','eras','eres','es','esa','esas','ese','eso','esos','esta','estaba','estabais','estaban','estabas','estad','estada','estadas','estado','estados','estais','estamos','estan','estando','estar','estaremos','estará','estarán','estarás','estaré','estaréis','estaría','estaríais','estaríamos','estarían','estarías','estas','este','estemos','esto','estos','estoy','estuve','estuviera','estuvierais','estuvieran','estuvieras','estuvieron','estuviese','estuvieseis','estuviesen','estuvieses','estuvimos','estuviste','estuvisteis','estuviéramos','estuviésemos','estuvo','está','estábamos','estáis','están','estás','esté','estéis','estén','estés','ex','existe','existen','explicó','expresó','fin','fue','fuera','fuerais','fueran','fueras','fueron','fuese','fueseis','fuesen','fueses','fui','fuimos','fuiste','fuisteis','fuéramos','fuésemos','gran','grandes','gueno','ha','haber','habida','habidas','habido','habidos','habiendo','habremos','habrá','habrán','habrás','habré','habréis','habría','habríais','habríamos','habrían','habrías','habéis','había','habíais','habíamos','habían','habías','hace','haceis','hacemos','hacen','hacer','hacerlo','haces','hacia','haciendo','hago','han','has','hasta','hay','haya','hayamos','hayan','hayas','hayáis','he','hecho','hemos','hicieron','hizo','hoy','hube','hubiera','hubierais','hubieran','hubieras','hubieron','hubiese','hubieseis','hubiesen','hubieses','hubimos','hubiste','hubisteis','hubiéramos','hubiésemos','hubo','igual','incluso','indicó','informó','intenta','intentais','intentamos','intentan','intentar','intentas','intento','ir','junto','la','lado','largo','las','le','les','llegó','lleva','llevar','lo','los','luego','lugar','manera','manifestó','mayor','me','mediante','mejor','mencionó','menos','mi','mientras','mio','mis','misma','mismas','mismo','mismos','modo','momento','mucha','muchas','mucho','muchos','muy','más','mí','mía','mías','mío','míos','nada','nadie','ni','ninguna','ningunas','ninguno','ningunos','ningún','no','nos','nosotras','nosotros','nuestra','nuestras','nuestro','nuestros','nueva','nuevas','nuevo','nuevos','nunca','o','ocho','os','otra','otras','otro','otros','para','parece','parte','partir','pasada','pasado','pero','pesar','poca','pocas','poco','pocos','podeis','podemos','poder','podria','podriais','podriamos','podrian','podrias','podrá','podrán','podría','podrían','poner','por','por qué','porque','posible','primer','primera','primero','primeros','principalmente','propia','propias','propio','propios','próximo','próximos','pudo','pueda','puede','pueden','puedo','pues','que','quedó','queremos','quien','quienes','quiere','quién','qué','realizado','realizar','realizó','respecto','sabe','sabeis','sabemos','saben','saber','sabes','se','sea','seamos','sean','seas','segunda','segundo','según','seis','ser','seremos','será','serán','serás','seré','seréis','sería','seríais','seríamos','serían','serías','seáis','señaló','si','sido','siempre','siendo','siete','sigue','siguiente','sin','sino','sobre','sois','sola','solamente','solas','solo','solos','somos','son','soy','su','sus','suya','suyas','suyo','suyos','sí','sólo','tal','también','tampoco','tan','tanto','te','tendremos','tendrá','tendrán','tendrás','tendré','tendréis','tendría','tendríais','tendríamos','tendrían','tendrías','tened','teneis','tenemos','tener','tenga','tengamos','tengan','tengas','tengo','tengáis','tenida','tenidas','tenido','tenidos','teniendo','tenéis','tenía','teníais','teníamos','tenían','tenías','tercera','ti','tiempo','tiene','tienen','tienes','toda','todas','todavía','todo','todos','total','trabaja','trabajais','trabajamos','trabajan','trabajar','trabajas','trabajo','tras','trata','través','tres','tu','tus','tuve','tuviera','tuvierais','tuvieran','tuvieras','tuvieron','tuviese','tuvieseis','tuviesen','tuvieses','tuvimos','tuviste','tuvisteis','tuviéramos','tuviésemos','tuvo','tuya','tuyas','tuyo','tuyos','tú','ultimo','un','una','unas','uno','unos','usa','usais','usamos','usan','usar','usas','uso','usted','va','vais','valor','vamos','van','varias','varios','vaya','veces','ver','verdad','verdadera','verdadero','vez','vosotras','vosotros','voy','vuestra','vuestras','vuestro','vuestros','y','ya','yo','él','éramos','ésta','éstas','éste','éstos','última','últimas','último','últimos', 'vos', 'tipo'];
var wordMap = {}

fetch('https://biografoimaginario.com:8888/getAllVideos').then((res) => {res.json().then(
    (data) => {
        videos = data;
        for(let video of videos){
            video['transcription'] = JSON.parse(video['transcription'])
            for(let i = 0; i < video['transcription'].length; i++){
                video['transcription'][i]['word'] = video['transcription'][i]['word'].toLowerCase()
            }
            transcription = video['transcription']
            for(let i = 0; i < transcription.length; i++){
                if(stopwords.includes(transcription[i]['word'])){
                    continue
                } else {  
                    if(transcription[i]['word'] in wordMap){
                        wordMap[transcription[i]['word']] += 1;
                    } else {
                        wordMap[transcription[i]['word']] = 1;
                    }
                }
            }
        }

        for(let key in wordMap){
            if(wordMap[key] < MIN_OCCURRENCES){
                delete wordMap[key]
            }
        }

        for(let video of videos){
            if(video['transcription'].length == 0){
                continue;
            }
            let transcription = video['transcription'];
            let word = transcription[0]['word'];
            let phrase = word;
            let lastWord = null;
            let timeStart = transcription[0]['startTime'];
            for(let i = 1; i < transcription.length; i++){
                while((i >= transcription.length) || !(transcription[i]['word'] in wordMap)){
                    if(i >= transcription.length){
                    addToWordNodes(word, lastWord, null, phrase, video['videoURL'], timeStart, transcription[i-1]['endTime']);
                    break;
                    }
                    phrase += ' ' + transcription[i]['word'];
                    i++;
                }
                if(i == transcription.length){
                    break;
                }
                if(transcription[i]['endTime'] - timeStart < MIN_TIME_LENGTH ){
                    phrase += ' ' + transcription[i]['word'];
                    continue;
                }
                if(phrase.split(' ').length < MIN_WORD_LENGTH){
                    phrase += ' ' + transcription[i]['word'];
                    continue;
                }
                console.log(`i: ${i} word: ${transcription[i].word}`)
                addToWordNodes(word, lastWord, transcription[i].word, phrase, video['videoURL'], timeStart, transcription[i-1]['endTime']);
                lastWord = word;
                word = transcription[i]['word'];
                phrase = word;
                timeStart = transcription[i]['startTime'];
            }
        }
    }
)})