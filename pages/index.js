import Head from 'next/head'
import OtpInput from 'react-otp-input';
import { useEffect, useState } from 'react';

export default function Home() {
  const shacode = 'f255558f690f72c6d96c90f99d525669c4ac052db9eb69e2898ac1529d41c17e';
  const [state, setState] = useState('');
  const [count, setCount] = useState(64);
  const [guesses, setGuesses] = useState([]);
  useEffect(() => {
    const count = 64 - state.length;

    if (count == 0) {
      guesses.push(state);
      setState('');
      if (state.toUpperCase() == shacode.toUpperCase()) {
        setTimeout(() => {
          alert('You\'ve guessed the SHA256 hash!')
        }, 1000);
      }
    };

    if (guesses.length >= 15) {
      alert('Better luck next time!');
      setGuesses([]);
    }

    setCount(count);
  }, [state]);

  const renderCol = (letter, index) => {
    const _shacode = shacode.toUpperCase();
    const isMatched = _shacode[index] == letter.toUpperCase();
    const isInArray = _shacode.includes(letter.toUpperCase());
    const globalRegex = new RegExp('^[0-9A-F]$', 'g');
    const isNotSHAChar = !globalRegex.test(letter);

    if (isMatched) {
      return <div key={index} className='w-6 text-center block bg-green-500'>{letter}</div>
    }

    if (isInArray) {
      return <div key={index} className='w-6 text-center block bg-yellow-500'>{letter}</div>
    }

    if (isNotSHAChar) {
      return <div key={index} className='w-6 text-center block bg-gray-400'>{letter}</div>
    }

    return (
      <div key={index} className='w-6 text-center block bg-gray-200'>{letter}</div>
    )
  }

  const renderRow = text => {
    return (
      <div className='flex'>
        {
          [...text].map((letter, i) => renderCol(letter, i))
        }
      </div>
    )
  }

  const renderGuesses = () => (
    <div className="w-full">
      {guesses.map(guess => renderRow(guess))}
    </div>
  )

  return (
    <div className='w-full'>
      <Head>
        <title>SHA256LE+</title>
        <meta name="description" content="SHA256+ by Andrei Trinidad" />
        <meta property="og:image" content="/preview.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className='flex item-center py-3 mb-6 justify-center flex-col border-b text-center w-screen'>
        <h1 className="text-3xl font-bold font-mono">
          SHA256LE+
        </h1>
        <a href="https://github.com/andreitrinidad" target="_blank" rel="noreferrer">by andreitrinidad</a>
      </nav>
      <main className='flex justify-center flex-col  px-6 '>
        <OtpInput
          value={state || ``}
          onChange={(otp) => setState(otp.toUpperCase())}
          numInputs={64}
          isInputNum={false}
          inputStyle={"border appearance-none outline-none w-6"}
          containerStyle=""
          shouldAutoFocus
        />
        <div className='flex justify-between'>
        <p className='text-gray-500'>{count} characters remaining</p>
        <p className='text-gray-500'>{15 - guesses.length} guess(es) left</p>
        </div>
  
        {renderGuesses()}
      </main>
    </div>
  )
}
