"use client"

import { FC, useEffect, useState } from 'react'
import axios from 'axios'
import { questions } from '@/helpers/question'
import { Question } from '@/types'

interface pageProps {

}

const page: FC<pageProps> = ({ }) => {
    const [questionsState, setQuestionsState] = useState<Question[]>([])

    useEffect(() => {
        setTimeout(() => setQuestionsState(questions), 1000)
    }, [])

    return <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
        <div className="max-w-3xl w-full bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Test Questions</h1>

            {questionsState.map((question) => (
                <div key={question.id} className="mb-6 p-6 bg-gray-50 rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">{question.id}. {question.question}</h2>

                    <ul className="space-y-3">
                        {question.choices.map((choice, index) => (
                            <li key={index} className="flex items-center space-x-3">
                                <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
                                <span className="text-gray-600">{choice}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    </div>
}

export default page

