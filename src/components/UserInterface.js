import React, { useState } from 'react';
// import { useRef, useEffect } from "react";
import SequenceDisplay from './SequenceDisplay';
import data from '../data.json';
import Hero from '../assets/images/hero.png'
import Logo from '../assets/images/logo.png'
// import successSoundFile from "../assets/audio/music.mp3";

const UserInterface = () => {
    const [gameHasStarted, setGameHasStarted] = useState(false);
    const [unitNumber, setUnitNumber] = useState('');
    const [content, setContent] = useState(null);

    // const [musicOn, setMusicOn] = useState(false);

    // const successSoundRef = useRef(null);

    // useEffect(() => {
    //     if (gameHasStarted) {
    //         successSoundRef.current.play();
    //     }
    // }, [gameHasStarted]);


    const handleReset = () => {
        setGameHasStarted(() => false)
        setUnitNumber(() => '')
        setContent(() => null)
    }

    const handleShowUnitValues = (event) => {
        event.preventDefault();
        const number = parseInt(unitNumber, 10);

        if (number >= 1 && number <= 102) {
            const unitValues = data[number];

            if (unitValues) {
                setContent(<SequenceDisplay values={unitValues} />);
            } else {
                setContent(
                    <p className="error-message">عفوًا هذا السؤال غير متوفر </p>
                );
            }
        } else {
            setContent(
                <p className="error-message">عفوًا هذا السؤال غير متوفر
                </p>
            );
        }
    };
    if (gameHasStarted) {
        return (
            <>
                <div className="navigation-bar">

                    <img className="logo" src={Logo} alt='logo' onClick={handleReset} />

                </div>
                <div className='answers-page'>
                    <form onSubmit={handleShowUnitValues}>
                        <div className='answers'>
                            <label htmlFor="unitNumber" className='title'>ادخل رقم السؤال </label>
                            <input
                                className='input'
                                type="number"
                                id="unitNumber"
                                value={unitNumber}
                                onChange={(event) => setUnitNumber(event.target.value)}
                            />
                            <button type='submit' className='large-btn'>عرض الإجابة</button>
                            {content}
                        </div>
                    </form>
                </div>
                {/* Completion Sound Effect */}
                {/* <audio ref={successSoundRef} hidden>
                    <source src={successSoundFile} type="audio/mpeg"  />
                </audio> */}
            </>
        );
    } else {
        return (
            <div className='landing'>
                <div className="navigation-bar">
                    <img className="logo" src={Logo} alt='logo' />
                </div>
                <div className='hero'>
                    <img src={Hero} alt='hero image' />
                    <button className='large-btn' onClick={() => {
                        setGameHasStarted(() => (true))
                    }}>ابدأ اللعبة</button>
                    <div className='rules'>

                    <h2 className='title'>قوانين اللعبة</h2>
                    <ol >
                        <li className='rules'>عدد الفرق 2 أو أكثر.</li>
             
                        <li className='rules'>اضافة نقطة للفريق صاحب الإجابة الصحيحة.</li>
                        <li className='rules'>المباراة من 6 جولات، وسؤال إضافى فى حالة التعادل. </li>
                    </ol>
                    <h2 className='title'>طريقة اللعب</h2>
                    <ol >
                        <li className='rules'>بعد سماع السؤال، يرسل الفريق المنافس اجابتين للحكم لتشتيت الفريق صاحب السؤال.</li>
                        <li className='rules'>يتم الاختيار من بين الثلاث اجابات.</li>
                   </ol>
                    </div>

                </div>



            </div>
        );
    }
};

export default UserInterface;
