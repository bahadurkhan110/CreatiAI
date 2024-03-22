"use client";

import * as z from "zod";
import axios from "axios";
import Header from "@/components/header";
import { Download, ImageIcon, MessageSquareIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectContent } from "@/components/ui/select";

import { resolutionOptions, amountOptions, formSchema } from "./constants";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";

const ImagePage = () => {
  const router = useRouter();

  const [images, setImages] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages("");
      const response = await axios.post("/api/image", values);
      // const urls = response.data.map((item) => item.url);
      const urls = response.data.url;
      console.log(urls);
      setImages(urls);
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
        title="Image Generator"
        description="A text to image converter"
        icon={ImageIcon}
        iconcolor="text-yellow-700"
        bgcolor="bg-red-yellow-700/10"
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
                <FormItem className="col-span-12 lg:col-span-8">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-none foucs-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="A cat in a forest"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {amountOptions.map((images) => (
                        <SelectItem key={images.value} value={images.value}>
                          {images.label}{" "}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <Button className="col-span-12 lg:col-span-2">Generate</Button>
          </form>
        </Form>
      </div>
      <h2 className="pl-8 font-bold mt-4">Images:</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div>
          {/* Render your component based on isLoading */}
          {isLoading ? <p>Loading...</p> : <img src={images} alt="Image" />}
        </div>
      </div>
    </div>
  );
};

export default ImagePage;
