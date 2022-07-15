import { useState, createContext, useEffect } from 'react';

export const Context = createContext();

const randomNmb = () => Math.floor(Math.random() * 8 + 2);

const getSqrt = (a, b) => Math.ceil(Math.sqrt(a * b));

// Doğru cevapların şıklar üzerinde yerlerinin random şekilde atanmasını sağlıyor.
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const Provider = ({ children }) => {
    const [tour, setTour] = useState(0);
    const [questionsArr, setQuestionsArr] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState({});
    const [currentNumber, setCurrentNumber] = useState(0);
    const [score, setScore] = useState(0);
    const [bgColor, setBgColor] = useState('#2d2d2d');
    const [isClick, setIsClick] = useState(false);
    const [clickBtnId, setClickBtnId] = useState(null);
    const [resultQuestions, setResultQuestions] = useState([]);
    const [trueAnswerCount, setTrueAnswerCount] = useState(0);
    const [totalResult, setTotalResult] = useState({ totalScore: 0, totalQuestions: 0, correctAnswers: 0 });

    const setAllQuestion = () => {
        const newArr = []; // Boş bir dizi tanımlıyoruz
        setCurrentNumber(0); // Aktif numara 0'dan başlayacak
        setResultQuestions([]); // Çözdüğümüz soruların ilk hali boş olacak

        for (let i = 0; i < 10; i++) { // Quizin sorularını tanımlayacak döngümüz
            const numA = randomNmb();
            const numB = randomNmb();
            const scorePoint = getSqrt(numA, numB); // Quiz puanlaması
            const trueAnswer = numA * numB;
            const answerObj = { // Yanlış cevapların oluşturulması
                a1: numA * numB,
                a2: (numA + 1) * numB,
                a3: numA * (numB - 1)
            };
            let answerArr = Object.values(answerObj); // Yanıtları array içerisinde tanımladık
            answerArr = shuffleArray(answerArr); // Arrayin karıştırılmasını sağladık

            newArr.push({ //Elde ettiğimiz değerleri arrayimize yolladık
                numA,
                numB,
                scorePoint,
                trueAnswer,
                answerArr,
                result: null
            });
        }
        setCurrentQuestion(newArr[currentNumber]); // Yeni soruyu getirdik
        setQuestionsArr(newArr); // Ana arrayimizi oluşturduğumuz arraye atadık
    };

    const checkAnswer = (answer, btnId) => { // Doğru şıkkı kontrol ediyoruz
        const isTrue = answer === currentQuestion.trueAnswer;
        const resultQuestionText = `${currentQuestion.numA} x ${currentQuestion.numB} = ${currentQuestion.trueAnswer}`;
        setIsClick(true);
        setClickBtnId(btnId);

        if (isTrue) { // Doğru Şık için background color tanımladık
            setResultQuestions([...resultQuestions, {
                resultQuestionText,
                isAnswerTrue: true
            }]);
            setTrueAnswerCount(trueAnswerCount + 1);
            setBgColor('green');
        } else { // Yanlış Şık için background color tanımladık
            setResultQuestions([...resultQuestions, {
                resultQuestionText,
                isAnswerTrue: false
            }]);
            setBgColor('red');
        }

        setTimeout(() => { // Aktif soru da cevaplanınca diğer şıkları kapatma ve bekleme süresini tanımladık
            if (isTrue) {
                setScore(score + currentQuestion.scorePoint);
            }
            setBgColor('#2d2d2d');
            setCurrentNumber(currentNumber + 1);
            setClickBtnId(null);
            setIsClick(false);
        }, 3000);
    };

    const setTotalResultToStorage = (data) => { // Tutulan ilerleme değerlerini güncelliyoruz 
        if (data) {
            setTotalResult(data);
        } else {
            setTotalResult(prevState => (
                {
                    ...prevState,
                    totalScore: prevState.totalScore + score,
                    totalQuestions: prevState.totalQuestions + questionsArr.length,
                    correctAnswers: prevState.correctAnswers + trueAnswerCount
                }));
        }
    };

    useEffect(() => { // Yeni soruya geçiriyoruz
        if (questionsArr.length > 0) {
            setCurrentQuestion(questionsArr[currentNumber]);
        }
    }, [currentNumber]);

    useEffect(() => { // Değerleri Local Storage'e yolluyoruz
        localStorage.setItem('totalResult', JSON.stringify(totalResult));
    }, [totalResult]);

    useEffect(() => { // Değerleri Local Storage'e yolluyoruz
        localStorage.setItem('tour', JSON.stringify(tour));
    }, [tour]);

    return (
        <Context.Provider value={{
            tour,
            questionsArr,
            score,
            currentQuestion,
            isClick,
            currentNumber,
            bgColor,
            clickBtnId,
            resultQuestions,
            trueAnswerCount,
            totalResult,
            setTour,
            checkAnswer,
            setAllQuestion,
            setTotalResultToStorage
        }}>
            {children}
        </Context.Provider>
    );
};

export default Provider;