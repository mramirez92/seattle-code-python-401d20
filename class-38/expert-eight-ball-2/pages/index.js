import Head from 'next/head';
import Link from 'next/link';
import { replies } from '../data';
import { useState } from 'react';
import Header from '../components/Header';
import QuestionForm from '../components/QuestionForm';
import EightBall from '../components/EightBall';


export default function Home() {

    // const [reply, setReply] = useState('Ask A Question!');
    const [answeredQuestions, setAnsweredQuestions] = useState([]);

    function questionAskedHandler(event) {
        event.preventDefault();

        // get a random reply from data.js
        const randomReply = replies[Math.floor(Math.random() * replies.length)];

        // build an object representing the question and reply
        const answeredQuestion = {
            question: event.target.question.value,
            reply: randomReply,
            id: answeredQuestions.length,
        };

        // alert(event.target.question.value);
        // alert(randomReply);
        // setReply(randomReply);
        setAnsweredQuestions([...answeredQuestions, answeredQuestion]);
    }

    function getLatestReply() {
        if (answeredQuestions.length === 0) {
            return 'Ask A Question';
        }

        return answeredQuestions[answeredQuestions.length - 1].reply;
    }

    return (
        <>
            <Head>
                <title>Expert Eight Ball</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header answeredQuestions={answeredQuestions} />

            <main className=''>

                <QuestionForm questionAskedHandler={questionAskedHandler} />

                {/* Eight Ball */}
                {/* <div className="w-96 h-96 mx-auto my-4 bg-gray-900 rounded-full">
                    <div className="relative flex items-center justify-center w-48 h-48 rounded-full bg-gray-50 top-16 left-16">
                        <p className="text-xl text-center">{getLatestReply()}</p>
                    </div>
                </div> */}
                <EightBall getLatestReply={getLatestReply} />


                {/* Table of Responses */}
                <table className="w-1/2 mx-auto my-4">
                    <thead>
                        <tr>
                            <th className="border border-gray-700">No.</th>
                            <th className="border border-gray-700">Question</th>
                            <th className="border border-gray-700">Response</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <tr>
                            <td className="pl-2 border border-gray-700">1. </td>
                            <td className="pl-2 border border-gray-700">Will it rain?</td>
                            <td className="pl-2 border border-gray-700">Yes.</td>
                        </tr> */}
                        {
                            answeredQuestions.map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <td className="pl-2 border border-gray-700">{item.id}</td>
                                        <td className="pl-2 border border-gray-700">{item.question}</td>
                                        <td className="pl-2 border border-gray-700">{item.reply}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </main>

            <footer className='p-4 mt-8 bg-gray-500 text-gray-50'>
                <Link href="/careers">
                    Careers
                </Link>
            </footer>
        </>
    );
}
