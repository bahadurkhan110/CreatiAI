"use client";

import * as z from "zod";
import axios from "axios";
import Header from "@/components/header";
import { MessageSquareIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Avatar } from "@radix-ui/react-avatar";
import { UserAvatar } from "@/components/user-picture";
import { CreatiAIAvatar } from "@/components/ai-picture";

const MessagePage = () => {
  const router = useRouter();

  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionMessageParam = {
        role: "user",
        content: values.prompt,
      };

      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/message", {
        messages: newMessages,
      });

      setMessages((current) => [...current, userMessage, response.data]);
    } catch (error) {
      console.log(error);
    } finally {
      router.refresh();
    }
    form.reset();
  };

  return (
    <div>
      <Header
        title="Message"
        description="Talk to our Most advanced LLM Model"
        icon={MessageSquareIcon}
        iconcolor="text-red-700"
        bgcolor="bg-red-500/10"
      />

      <div className="px-4 lg:px-8 mt-5">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-lg border w-full p-4 px-4 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-none foucs-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="Enter your Message to chat with the Bot here"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            ></FormField>

            <Button className="col-span-12 lg:col-span-2">Chat</Button>
          </form>
        </Form>
      </div>
      <h2 className="pl-8 font-bold mt-4">Conversations:</h2>
      <div>
        {messages.map((message) => (
          <div
            key={message.content}
            className={cn(
              "p-4 ml-8 mt-3 gap-x-4 flex item-start rounded-lg mr-8",
              message.role === "user"
                ? "bg-white border border-black/10"
                : "bg-muted"
            )}
          >
            {message.role === "user" ? <UserAvatar /> : <CreatiAIAvatar />}
            <p className="text-sm">{message.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessagePage;
