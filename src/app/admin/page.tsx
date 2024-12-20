"use client"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    question: z.string().min(5, {
        message: "Question must be at least 5 characters.",
    }),
    choices: z.array(z.string().min(1, { message: "Choice must not be empty." })).min(2, {
        message: "At least two choices are required.",
    }),
    file: z.instanceof(File).optional(), // Optional file upload (PDF, Image)
})

export default function AdminQuestionForm() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            // Set default value for choices as an empty array
            choices: ['', '', '', ''], // Add default empty choices
            username: "",
            question: "",
            file: "",
        },
    })

    const onSubmit = async (data: any) => {
        console.log("Form Data:", data)
        // Handle file upload and other form data as needed
        if (data.file) {
            const formData = new FormData()
            formData.append("file", data.file)
            formData.append("question", data.question)
            formData.append("choices", JSON.stringify(data.choices))
            formData.append("username", data.username)

            // Perform your API call to submit form data with file upload
            // Example: await fetch("/api/submit-question", { method: "POST", body: formData })
        }
    }

    return (
        <div className="min-h-screen bg-gray-200">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6 bg-white rounded-lg shadow-lg w-full max-w-2xl mx-auto">
                    {/* Username */}
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-lg font-medium">Username</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your username"
                                        {...field}
                                        className="w-full px-4 py-3 mt-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )}
                    />

                    {/* Question */}
                    <FormField
                        control={form.control}
                        name="question"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-lg font-medium">Question</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Enter the question"
                                        {...field}
                                        className="w-full px-4 py-3 mt-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is the question you want to post.
                                </FormDescription>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )}
                    />

                    {/* Choices */}
                    <FormField
                        control={form.control}
                        name="choices"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-lg font-medium">Choices</FormLabel>
                                <FormControl>
                                    <div className="space-y-2">
                                        {field.value.map((choice: string, index: number) => (
                                            <Input
                                                key={index}
                                                placeholder={`Choice ${index + 1}`}
                                                value={choice || ""}
                                                onChange={(e) => {
                                                    const updatedChoices = [...field.value]
                                                    updatedChoices[index] = e.target.value
                                                    field.onChange(updatedChoices)
                                                }}
                                                className="w-full px-4 py-3 mt-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                            />
                                        ))}
                                    </div>
                                </FormControl>
                                <FormDescription>
                                    Provide at least two choices.
                                </FormDescription>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )}
                    />

                    {/* File Upload */}
                    <FormField
                        control={form.control}
                        name="file"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-lg font-medium">Upload an Image/PDF</FormLabel>
                                <FormControl>
                                    <input
                                        type="file"
                                        accept="image/*,application/pdf"
                                        {...field}
                                        onChange={(e) => field.onChange(e.target.files?.[0])}
                                        className="w-full p-3 mt-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                    />
                                </FormControl>
                                <FormDescription>
                                    You can upload an image or PDF file with the question.
                                </FormDescription>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )}
                    />

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full py-3 mt-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                    >
                        Submit Question
                    </Button>
                </form>
            </Form>
        </div>
    )
}
