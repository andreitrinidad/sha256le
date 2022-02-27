import Head from 'next/head'
import OtpInput from 'react-otp-input';
import { useEffect, useState } from 'react';

export default function Home() {
  const shacode = 'c21c7591c269bd25db04cdca561d2b7a174f0cdf68f78c5db9c45e761b1f5477';
  const [state, setState] = useState('');
  const [count, setCount] = useState(64);
  const [guesses, setGuesses] = useState([]);
  useEffect(() => {
    const count = 64 - state.length;

    if (count == 0) {
      guesses.push(state);
      setState('');
      if (state == shacode) {
        setTimeout(() => {
          alert('You\'ve guessed the SHA256 hash!')
        }, 1000);
      }
    };

    setCount(count);
  }, [state]);

  const renderCol = (letter, index) => {
    const isMatched = shacode[index] == letter;
    const isInArray = shacode.includes(letter);
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
        <title>SHA256+</title>
        <meta name="description" content="SHA256+ by Andrei Trinidad" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className='flex item-center py-3 mb-6 justify-center flex-col border-b text-center w-screen'>
        <h1 className="text-3xl font-bold font-mono">
          SHA256LE+
        </h1>
        <a href="https://github.com/andreitrinidad" target="_blank">by andreitrinidad</a>
      </nav>
      <main className='flex justify-center flex-col  px-6 '>
        <OtpInput
          value={state || ``}
          onChange={(otp) => setState(otp)}
          numInputs={64}
          isInputNum={false}
          inputStyle={"border appearance-none outline-none w-6"}
          containerStyle=""
          shouldAutoFocus
        />
        <p className='text-gray-500'>{count} characters remaining</p>
        {renderGuesses()}
      </main>
    </div>
  )
}
